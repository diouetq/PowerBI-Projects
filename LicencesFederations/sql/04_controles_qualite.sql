/* =====================================================================================
   Projet      : Licences sportives en France (INJEP-MEDES) - Power BI
   Script      : 04_controles_qualite.sql
   Objet       : contrôles après chargement. Chaque requête doit renvoyer le résultat
                 indiqué ; sinon, analyser avant d'actualiser Power BI.
   Auteur      : Quentin Diouet
   NOTE        : script RECONSTRUIT (voir 01_creation_structure.sql).
   ===================================================================================== */
USE BDD;
GO

-- 1. Volumétrie par fichier : 10 fichiers, 1 année par fichier, statut cohérent avec le nom.
--    Référence (chargement du 06/11/2026, vérifiée dans Power BI) :
--    2016 805 190 l. / 16 219 479 lic. | 2017 805 866 / 16 370 803 | 2018 824 528 / 16 257 182
--    2019 823 217 / 16 259 965         | 2020 811 589 / 15 715 215 | 2021 756 350 / 12 841 261
--    2022 824 562 / 15 291 830         | 2023 847 477 / 16 535 056 | 2024 857 945 / 17 162 623
--    2025 854 754 / 17 456 435         | Total 8 211 478 lignes
SELECT Fichier, MIN(Annee) AS AnneeMin, MAX(Annee) AS AnneeMax, MAX(Statut) AS Statut,
       COUNT_BIG(*) AS Lignes, SUM(CAST(NbLicences AS BIGINT)) AS Licences,
       COUNT(DISTINCT CodeReference) AS Federations
FROM dbo.Licences_Federation
GROUP BY Fichier
ORDER BY AnneeMin;

-- 2. Ordre des colonnes de code : CodeReference doit appartenir à la nomenclature 2025
--    (même ensemble de codes pour l'année 2025 et pour les autres années). Attendu : 0 ligne.
SELECT DISTINCT l.Annee, l.CodeReference, l.Federation
FROM dbo.Licences_Federation AS l
WHERE NOT EXISTS (SELECT 1 FROM dbo.Licences_Federation AS r
                  WHERE r.Annee = 2025 AND r.CodeReference = l.CodeReference)
  AND l.Annee <> 2025
ORDER BY l.Annee, l.CodeReference;   -- fédérations disparues avant 2025 : à vérifier une à une

-- 3. Valeurs inattendues. Attendu : 0 ligne.
SELECT Controle, Nb
FROM (
    SELECT 'Licences <= 0' AS Controle, COUNT_BIG(*) AS Nb FROM dbo.Licences_Federation WHERE NbLicences <= 0
    UNION ALL SELECT 'Sexe hors liste', COUNT_BIG(*) FROM dbo.Licences_Federation WHERE Sexe NOT IN (N'F', N'H', N'NR - Non réparti')
    UNION ALL SELECT 'Âge hors 0-120', COUNT_BIG(*) FROM dbo.Licences_Federation WHERE Age > 120
    UNION ALL SELECT 'Département vide', COUNT_BIG(*) FROM dbo.Licences_Federation WHERE Departement = N''
) AS c
WHERE Nb > 0;

-- 4. Unicité du grain (fédération x année x sexe x âge x département). Attendu : 0 ligne.
SELECT TOP (20) Annee, CodeReference, Sexe, Age, TrancheAge, Departement, COUNT_BIG(*) AS Doublons
FROM dbo.Licences_Federation
GROUP BY Annee, CodeReference, Sexe, Age, TrancheAge, Departement
HAVING COUNT_BIG(*) > 1;

-- 5. Part des licences non réparties (mise en garde INJEP : à suivre dans le temps,
--    elle baisse avec l'amélioration de la qualité des fichiers des fédérations).
SELECT Annee,
       CAST(100.0 * SUM(CASE WHEN Departement LIKE N'NR%' THEN NbLicences ELSE 0 END) / SUM(NbLicences) AS DECIMAL(5,2)) AS PctDepNR,
       CAST(100.0 * SUM(CASE WHEN Sexe        LIKE N'NR%' THEN NbLicences ELSE 0 END) / SUM(NbLicences) AS DECIMAL(5,2)) AS PctSexeNR,
       CAST(100.0 * SUM(CASE WHEN Age IS NULL             THEN NbLicences ELSE 0 END) / SUM(NbLicences) AS DECIMAL(5,2)) AS PctAgeNR
FROM dbo.Licences_Federation
GROUP BY Annee
ORDER BY Annee;

-- 6. Journal : dernier chargement de chaque fichier en statut OK.
SELECT j.*
FROM dbo.Journal_Chargement AS j
WHERE j.IdChargement IN (SELECT MAX(IdChargement) FROM dbo.Journal_Chargement GROUP BY Fichier)
ORDER BY j.Fichier;
