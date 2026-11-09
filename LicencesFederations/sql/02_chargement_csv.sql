/* =====================================================================================
   Projet      : Licences sportives en France (INJEP-MEDES) - Power BI
   Script      : 02_chargement_csv.sql
   Objet       : charge les 10 fichiers CSV INJEP (2016-2025) dans dbo.Licences_Federation.
                 - BULK INSERT dans stg.Licences_Brut (texte brut)
                 - remise en ordre des colonnes selon le fichier, typage, nettoyage
                 - rechargement idempotent par fichier (suppression puis insertion)
                 - journalisation (dbo.Journal_Chargement)
   Auteur      : Quentin Diouet
   NOTE        : script RECONSTRUIT (voir 01_creation_structure.sql).

   Fichiers source (archive INJEP « Licences-annuelles-par-millesime-2016-2025.7z ») :
     Lics_2016_semidef.csv  Lics_2017_semidef.csv  Lics_2018_semidef.csv
     Lics_2019_def.csv  Lics_2020_def.csv  Lics_2021_def.csv  Lics_2022_def.csv  Lics_2023_def.csv
     Lics_2024_semidef.csv  Lics_2025_semidef.csv
   Format : UTF-8 avec BOM, séparateur « ; », champs entre guillemets, 1 ligne d'en-tête.
   ===================================================================================== */
USE BDD;
GO

/* -------------------------------------------------------------------------------------
   Procédure : charge UN fichier
   @Dossier     : dossier des CSV vu par le SERVICE SQL Server (ex. N'C:\Data\Licences\2025\')
   @Fichier     : nom du fichier (ex. N'Lics_2019_def.csv')
   @Millesime   : millésime de la nomenclature des codes (2025 pour l'archive 2016-2025)
   ------------------------------------------------------------------------------------- */
CREATE OR ALTER PROCEDURE dbo.usp_Charger_Fichier_Licences
    @Dossier   NVARCHAR(400),
    @Fichier   NVARCHAR(100),
    @Millesime SMALLINT = 2025
AS
BEGIN
    SET NOCOUNT ON;
    SET XACT_ABORT ON;

    DECLARE @Debut DATETIME2(0) = SYSDATETIME(),
            @Statut VARCHAR(10),
            @Annee  SMALLINT,
            @CodeNEnPremier BIT,           -- 1 = fichier qui commence par "Code année N"
            @Sql NVARCHAR(MAX),
            @Lues INT, @Chargees INT, @Total BIGINT;

    BEGIN TRY
        /* 1. Métadonnées déduites du nom de fichier : Lics_<année>_<statut>.csv */
        SET @Annee  = TRY_CAST(SUBSTRING(@Fichier, 6, 4) AS SMALLINT);
        SET @Statut = CASE WHEN @Fichier LIKE N'%[_]semidef.csv' THEN 'semidef'
                           WHEN @Fichier LIKE N'%[_]def.csv'     THEN 'def' END;
        IF @Annee IS NULL OR @Statut IS NULL
            THROW 50001, N'Nom de fichier inattendu (attendu : Lics_<année>_<def|semidef>.csv).', 1;

        /* 2. Chargement brut (BULK INSERT n'accepte pas de variable : SQL dynamique) */
        TRUNCATE TABLE stg.Licences_Brut;
        SET @Sql = N'BULK INSERT stg.Licences_Brut FROM ' + QUOTENAME(@Dossier + @Fichier, '''') + N'
                     WITH (FORMAT = ''CSV'', FIELDQUOTE = ''"'', FIELDTERMINATOR = '';'',
                           ROWTERMINATOR = ''0x0a'', FIRSTROW = 2, CODEPAGE = ''65001'',
                           TABLOCK, MAXERRORS = 0);';
        EXEC sys.sp_executesql @Sql;
        SET @Lues = @@ROWCOUNT;

        /* 3. Ordre des deux premières colonnes (constaté dans les en-têtes de l'archive 2025) :
              - Lics_2019_def à Lics_2023_def : "Code année N" ; "Code 2025" ; ...
              - autres fichiers               : "Code 2025" ; "Code année N" ; ...
              À revérifier à chaque nouveau millésime (contrôle n°2 du script 04). */
        SET @CodeNEnPremier = CASE WHEN @Annee BETWEEN 2019 AND 2023 THEN 1 ELSE 0 END;

        /* 4. Insertion typée (idempotente : on remplace les lignes du même fichier) */
        BEGIN TRAN;
            DELETE FROM dbo.Licences_Federation WHERE Fichier = @Fichier;

            INSERT INTO dbo.Licences_Federation
                (Annee, Statut, MillesimeReference, CodeReference, CodeAnneeN, CodesHistorique,
                 Federation, Sexe, Age, TrancheAge, GrandeTrancheAge, Region, Departement,
                 NbLicences, Fichier)
            SELECT
                TRY_CAST(b.Col05 AS SMALLINT)                                   AS Annee,
                @Statut                                                          AS Statut,
                @Millesime                                                       AS MillesimeReference,
                LTRIM(RTRIM(IIF(@CodeNEnPremier = 1, b.Col02, b.Col01)))         AS CodeReference,
                LTRIM(RTRIM(IIF(@CodeNEnPremier = 1, b.Col01, b.Col02)))         AS CodeAnneeN,
                NULLIF(LTRIM(RTRIM(b.Col03)), N'')                               AS CodesHistorique,
                LTRIM(RTRIM(b.Col04))                                            AS Federation,
                LTRIM(RTRIM(b.Col06))                                            AS Sexe,
                TRY_CAST(b.Col07 AS TINYINT)                                     AS Age,   -- « NR - Non réparti » -> NULL
                LTRIM(RTRIM(b.Col08))                                            AS TrancheAge,
                LTRIM(RTRIM(b.Col09))                                            AS GrandeTrancheAge,
                LTRIM(RTRIM(b.Col10))                                            AS Region,
                LTRIM(RTRIM(b.Col11))                                            AS Departement,
                TRY_CAST(b.Col12 AS INT)                                         AS NbLicences,
                @Fichier                                                         AS Fichier
            FROM stg.Licences_Brut AS b
            WHERE TRY_CAST(b.Col12 AS INT) IS NOT NULL;      -- écarte les lignes vides / de fin

            SET @Chargees = @@ROWCOUNT;
        COMMIT;

        SELECT @Total = SUM(CAST(NbLicences AS BIGINT))
        FROM dbo.Licences_Federation WHERE Fichier = @Fichier;

        INSERT INTO dbo.Journal_Chargement (Fichier, LignesLues, LignesChargees, TotalLicences, Debut, Fin, Statut)
        VALUES (@Fichier, @Lues, @Chargees, @Total, @Debut, SYSDATETIME(), 'OK');
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0 ROLLBACK;
        INSERT INTO dbo.Journal_Chargement (Fichier, LignesLues, LignesChargees, Debut, Fin, Statut, Message)
        VALUES (@Fichier, @Lues, NULL, @Debut, SYSDATETIME(), 'ERREUR', ERROR_MESSAGE());
        THROW;
    END CATCH
END;
GO

/* -------------------------------------------------------------------------------------
   Procédure : charge TOUT le millésime (liste des fichiers de l'archive)
   ------------------------------------------------------------------------------------- */
CREATE OR ALTER PROCEDURE dbo.usp_Charger_Millesime_Licences
    @Dossier   NVARCHAR(400),
    @Millesime SMALLINT = 2025
AS
BEGIN
    SET NOCOUNT ON;
    DECLARE @Fichier NVARCHAR(100);

    DECLARE c CURSOR LOCAL FAST_FORWARD FOR
        SELECT f FROM (VALUES
            (N'Lics_2016_semidef.csv'), (N'Lics_2017_semidef.csv'), (N'Lics_2018_semidef.csv'),
            (N'Lics_2019_def.csv'),     (N'Lics_2020_def.csv'),     (N'Lics_2021_def.csv'),
            (N'Lics_2022_def.csv'),     (N'Lics_2023_def.csv'),
            (N'Lics_2024_semidef.csv'), (N'Lics_2025_semidef.csv')
        ) AS l(f);

    OPEN c;
    FETCH NEXT FROM c INTO @Fichier;
    WHILE @@FETCH_STATUS = 0
    BEGIN
        RAISERROR(N'Chargement de %s ...', 0, 1, @Fichier) WITH NOWAIT;
        EXEC dbo.usp_Charger_Fichier_Licences @Dossier = @Dossier, @Fichier = @Fichier, @Millesime = @Millesime;
        FETCH NEXT FROM c INTO @Fichier;
    END
    CLOSE c; DEALLOCATE c;

    -- Réorganise le columnstore après un chargement complet
    ALTER INDEX CCI_Licences_Federation ON dbo.Licences_Federation REORGANIZE WITH (COMPRESS_ALL_ROW_GROUPS = ON);
END;
GO

/* -------------------------------------------------------------------------------------
   Exécution (adapter le chemin : il doit être lisible par le compte de service SQL Server)
   ------------------------------------------------------------------------------------- */
-- EXEC dbo.usp_Charger_Millesime_Licences @Dossier = N'C:\Users\dioue\OneDrive\Bureau\PowerBI-Projects\LicencesFederations\data\2025\';
-- SELECT * FROM dbo.Journal_Chargement ORDER BY IdChargement DESC;
