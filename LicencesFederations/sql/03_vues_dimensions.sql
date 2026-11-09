/* =====================================================================================
   Projet      : Licences sportives en France (INJEP-MEDES) - Power BI
   Script      : 03_vues_dimensions.sql
   Objet       : vues de dimensions lues par le référentiel Excel (data/Referentiel_Excel.xlsx).
                 Le classeur les interroge avec la fonction Power Query fnSynchro(vue, table, clé) :
                 il ajoute les nouvelles valeurs, met à jour les colonnes SQL, conserve les
                 colonnes saisies à la main (familles, groupes, logos...) et marque EnBase = Oui/Non.
   Auteur      : Quentin Diouet
   NOTE        : script RECONSTRUIT (noms des vues : ceux appelés par le classeur Excel ;
                 colonnes : celles des onglets alimentés par SQL).
   ===================================================================================== */
USE BDD;
GO

/* Fédérations : 1 ligne par code de référence (Code 2025).
   Libellé = celui de l'année la plus récente (les fédérations changent parfois de nom). */
CREATE OR ALTER VIEW dbo.vw_Dim_Federation
AS
SELECT CodeReference, Federation, CodesHistorique
FROM (
    SELECT CodeReference, Federation, CodesHistorique,
           ROW_NUMBER() OVER (PARTITION BY CodeReference ORDER BY Annee DESC, Federation) AS rn
    FROM (SELECT DISTINCT CodeReference, Federation, CodesHistorique, Annee
          FROM dbo.Licences_Federation) AS d
) AS x
WHERE rn = 1;
GO

/* Territoires : 1 ligne par département (libellé source « 01 - Ain », clé du référentiel).
   Les codes géographiques (Code_DEP, Code_GDEREG, zones du segment) sont ajoutés dans Excel. */
CREATE OR ALTER VIEW dbo.vw_Dim_Territoire
AS
SELECT Departement, MIN(Region) AS Region
FROM dbo.Licences_Federation
GROUP BY Departement;
GO

/* Sexe : F, H, NR - Non réparti */
CREATE OR ALTER VIEW dbo.vw_Dim_Sexe
AS
SELECT DISTINCT Sexe FROM dbo.Licences_Federation;
GO

/* Tranches d'âge : grandes tranches (1 - Enfants (1-13) ... NR - Non réparti).
   Nommée TrancheAge dans le référentiel ; reliée à F_Licences[GrandeTrancheAge]. */
CREATE OR ALTER VIEW dbo.vw_Dim_TrancheAge
AS
SELECT DISTINCT GrandeTrancheAge AS TrancheAge FROM dbo.Licences_Federation;
GO

/* Années et statut de la donnée (def / semidef) */
CREATE OR ALTER VIEW dbo.vw_Dim_Annee
AS
SELECT Annee, MAX(Statut) AS Statut
FROM dbo.Licences_Federation
GROUP BY Annee;
GO
