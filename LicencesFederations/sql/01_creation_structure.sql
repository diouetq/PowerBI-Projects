/* =====================================================================================
   Projet      : Licences sportives en France (INJEP-MEDES) - Power BI
   Script      : 01_creation_structure.sql
   Objet       : crée la base, les schémas, la table de chargement brut (stg), la table
                 de faits typée (dbo.Licences_Federation) et le journal des chargements.
   Cible       : SQL Server 2019+ (serveur « diouet », base « BDD »)
   Auteur      : Quentin Diouet

   NOTE IMPORTANTE
   Le script SQL d'origine a été perdu. Ce script a été RECONSTRUIT le 06/11/2026 à partir :
     - de la structure réelle des 10 fichiers CSV (data/2025/Lics_<année>_<def|semidef>.csv) ;
     - des colonnes et types de la table F_Licences du modèle Power BI (8 211 478 lignes) ;
     - des vues appelées par le référentiel Excel (vw_Dim_Federation, vw_Dim_Territoire, ...).
   Il reproduit le même résultat (mêmes colonnes, mêmes règles) ; les noms internes
   (schéma stg, procédures, journal) sont des choix de reconstruction.

   Ordre d'exécution : 01 -> 02 -> 03 -> 04
   ===================================================================================== */

-- -------------------------------------------------------------------------------------
-- 1. Base de données
-- -------------------------------------------------------------------------------------
IF DB_ID(N'BDD') IS NULL
    CREATE DATABASE BDD COLLATE French_100_CI_AS_SC_UTF8;   -- UTF-8 : accents des libellés INJEP
GO
USE BDD;
GO

-- -------------------------------------------------------------------------------------
-- 2. Schéma de chargement (zone tampon, tout en texte)
-- -------------------------------------------------------------------------------------
IF SCHEMA_ID(N'stg') IS NULL EXEC (N'CREATE SCHEMA stg AUTHORIZATION dbo;');
GO

/* Table brute : reçoit le CSV tel quel (12 colonnes texte, dans l'ordre du fichier).
   Les noms sont génériques (Col01..Col12) car l'ordre des deux premières colonnes
   change selon le millésime :
     - fichiers 2016-2018, 2024, 2025 : "Code 2025" ; "Code année N" ; ...
     - fichiers 2019-2023 (définitifs) : "Code année N" ; "Code 2025" ; ...
   La remise dans le bon ordre est faite à l'insertion dans la table typée (script 02). */
DROP TABLE IF EXISTS stg.Licences_Brut;
CREATE TABLE stg.Licences_Brut
(
    Col01 NVARCHAR(20)  NULL,   -- Code 2025 ou Code année N (selon le fichier)
    Col02 NVARCHAR(20)  NULL,   -- Code année N ou Code 2025 (selon le fichier)
    Col03 NVARCHAR(100) NULL,   -- Codes 2016-2025 (historique des codes)
    Col04 NVARCHAR(200) NULL,   -- Fédération (libellé)
    Col05 NVARCHAR(10)  NULL,   -- Année
    Col06 NVARCHAR(30)  NULL,   -- Sexe (F, H, NR - Non réparti)
    Col07 NVARCHAR(30)  NULL,   -- Age (entier ou « NR - Non réparti »)
    Col08 NVARCHAR(50)  NULL,   -- TrancheAge (« b - de 5 à 9 ans » ...)
    Col09 NVARCHAR(50)  NULL,   -- GrandeTrancheAge (« 1 - Enfants (1-13) » ...)
    Col10 NVARCHAR(100) NULL,   -- Région (« 84 - Auvergne-Rhône-Alpes »)
    Col11 NVARCHAR(100) NULL,   -- Département (« 01 - Ain », « NR - Non réparti »)
    Col12 NVARCHAR(20)  NULL    -- Licences annuelles
);
GO

-- -------------------------------------------------------------------------------------
-- 3. Table de faits typée, lue par Power BI (F_Licences)
-- -------------------------------------------------------------------------------------
DROP TABLE IF EXISTS dbo.Licences_Federation;
CREATE TABLE dbo.Licences_Federation
(
    Annee              SMALLINT       NOT NULL,  -- année du recensement (saison N ou N-1/N)
    Statut             VARCHAR(10)    NOT NULL,  -- def | semidef (déduit du nom de fichier)
    MillesimeReference SMALLINT       NOT NULL,  -- millésime de la nomenclature (2025)
    CodeReference      VARCHAR(20)    NOT NULL,  -- code fédération du millésime de référence ("Code 2025")
    CodeAnneeN         VARCHAR(20)    NULL,      -- code fédération utilisé l'année N
    CodesHistorique    VARCHAR(100)   NULL,      -- ensemble des codes 2016-2025
    Federation         NVARCHAR(200)  NOT NULL,  -- libellé de la fédération
    Sexe               NVARCHAR(30)   NOT NULL,  -- F | H | NR - Non réparti
    Age                TINYINT        NULL,      -- âge au 1er janvier ; NULL = non réparti
    TrancheAge         NVARCHAR(50)   NOT NULL,
    GrandeTrancheAge   NVARCHAR(50)   NOT NULL,
    Region             NVARCHAR(100)  NOT NULL,  -- « code - libellé »
    Departement        NVARCHAR(100)  NOT NULL,  -- « code - libellé » (clé du référentiel territoire)
    NbLicences         INT            NOT NULL,
    Fichier            VARCHAR(50)    NOT NULL,  -- traçabilité : fichier CSV d'origine
    DateChargement     DATETIME2(0)   NOT NULL CONSTRAINT DF_LicFed_Date DEFAULT SYSDATETIME()
);
GO

-- Index columnstore : table analytique (8 M lignes), compression x10 et agrégats rapides
CREATE CLUSTERED COLUMNSTORE INDEX CCI_Licences_Federation ON dbo.Licences_Federation;
GO

-- -------------------------------------------------------------------------------------
-- 4. Journal des chargements (un enregistrement par fichier chargé)
-- -------------------------------------------------------------------------------------
IF OBJECT_ID(N'dbo.Journal_Chargement') IS NULL
CREATE TABLE dbo.Journal_Chargement
(
    IdChargement   INT IDENTITY(1,1) CONSTRAINT PK_Journal PRIMARY KEY,
    Fichier        VARCHAR(50)   NOT NULL,
    LignesLues     INT           NULL,
    LignesChargees INT           NULL,
    TotalLicences  BIGINT        NULL,
    Debut          DATETIME2(0)  NOT NULL,
    Fin            DATETIME2(0)  NULL,
    Statut         VARCHAR(10)   NOT NULL,       -- OK | ERREUR
    Message        NVARCHAR(4000) NULL
);
GO
