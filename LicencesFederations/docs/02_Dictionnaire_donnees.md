# Dictionnaire de données

> Document **généré** par `tools/generer_documentation.py` à partir des fichiers TMDL. Ne pas modifier à la main.

## Vue d'ensemble

| Table | Type | Colonnes | Mesures | Rôle |
|---|---|---:|---:|---|
| `Comparaison` | Groupe de calcul | 2 | 0 | Groupe de calcul (3 éléments) appliqué aux mesures d'évolution : Sélection (mesure telle quelle), Regroupement (famille, sous-famille ou groupe de la sélection  |
| `F_Licences` | Power Query (M) | 10 | 0 | Table de faits : licences annuelles INJEP-MEDES 2016-2025 (millésime 2025). Grain : fédération x année x sexe x âge x département (environ 8,2 M lignes). Source |
| `F_Population` | Power Query (M) | 5 | 0 | Population INSEE au 1er janvier (estimations, fichier data/estim-pop-dep-sexe-aq-1975-2026.xlsx, feuilles 2016-2025), par département, sexe et tranche d'âge qui |
| `P_Appartenance` | Power Query (M) | 2 | 0 | Table pont fédération -> regroupements : une ligne par couple (Cle de regroupement, CodeReference), plus une ligne « Ensemble » par fédération. Construite en Po |
| `P_Federation` | Power Query (M) | 35 | 0 | Colonnes du segment Fédération : une ligne par fédération (CodeReference), une colonne par regroupement (« F · », « SF · », « G · » + nom) contenant le nom cour |
| `P_Niveaux` | Power Query (M) | 7 | 0 | Liste des regroupements pour le segment Regroupement : une ligne par famille, sous-famille ou groupe (clé Cle) + une ligne « Ensemble ». Construite en Power Que |
| `P_TerrAppartenance` | Table calculée (DAX) | 2 | 0 | Liaison territoire du segment (P_TerrChoix[Id territoire]) → départements (T_Territoire[Code_DEP]). Équivalent de P_Appartenance. Basée sur les codes (Code_GDER |
| `P_TerrChoix` | Table calculée (DAX) | 5 | 0 | Liste du segment Territoire (équivalent de P_Niveaux pour les fédérations). Clé stable : Id territoire (TOT, MDR, MET, R + code région INSEE, DROM, COM, AUT). L |
| `P_TerrDep` | Table calculée (DAX) | 20 | 0 | Colonnes du segment Département (équivalent de P_Federation) : une ligne par département (clé Code_DEP), une colonne par territoire du segment nommée par son Id |
| `Param_Departement` | Table calculée (DAX) | 4 | 0 | Paramètre de champ du segment Département (équivalent de Param_Federation) : chaque ligne pointe vers la colonne de P_TerrDep du territoire. Filtré par P_TerrCh |
| `Param_Federation` | Table calculée (DAX) | 5 | 0 | Paramètre de champ du segment Fédération : chaque ligne pointe vers une colonne de P_Federation. Filtré par P_Niveaux via Cle (1-1), il affiche les fédérations  |
| `Param_Niveau` | Table calculée (DAX) | 3 | 0 | Paramètre de champ du segment Niveau : Famille, Sous-famille ou Groupe (colonnes de P_Niveaux). Changer de niveau vide la sélection du segment Regroupement. Ne  |
| `T_Annee` | Power Query (M) | 2 | 0 | Dimension Année (référentiel Excel, onglet T_Annee) : 2016-2025 et statut de la donnée (def = définitif, semidef = semi-définitif). Segment Année. |
| `T_AnneeAxe` | Table calculée (DAX) | 1 | 0 | Copie déconnectée des années pour l'axe du graphique d'évolution : le graphique montre toujours 2016-2025 et l'année choisie dans le segment Année est mise en é |
| `T_Assistant_Bloc` | Table calculée (DAX) | 3 | 0 | Assistant : une ligne par bloc HTML du visuel (HTML Content, colonne Ordre dans Content + mesure HTML Assistant). Chaque bloc reste sous 32 767 caractères (limi |
| `T_CarteAffichage` | Table calculée (DAX) | 6 | 0 | Liaison territoire du segment (P_TerrChoix[Id territoire], relation) × niveau affiché (1 = régions, 2 = départements) → contours à afficher (Id carte du GeoJSON |
| `T_CarteIndicateur` | Table calculée (DAX) | 2 | 0 | Liste des indicateurs de la carte (segment déroulant sur la carte). |
| `T_CarteZone` | Table calculée (DAX) | 7 | 0 | Zones du fichier de contours Cartes/Contours_France_regions_departements.geojson (propriété id_carte = Id carte) : 13 régions (R-code région INSEE) et 96 départ |
| `T_CarteZoneDep` | Table calculée (DAX) | 2 | 0 | Liaison zone de carte (Id carte) → départements (T_Territoire[Code_DEP]) : D-31 → 31 ; R-76 → ses départements de métropole. Utilisée uniquement par Carte Valeu |
| `T_Federation` | Power Query (M) | 9 | 0 | Dimension Fédération (référentiel Excel data/Referentiel_Excel.xlsx, onglet T_Federation). Le classeur est synchronisé avec les vues SQL (fonction Power Query f |
| `T_MAJ` | Table calculée (DAX) | 1 | 0 | Date de dernière actualisation du modèle (NOW() recalculé à chaque actualisation). Utilisée par la mesure Date MAJ. |
| `T_NiveauGeo` | Table calculée (DAX) | 2 | 0 | Liste du segment Niveau géo de la carte (sans relation) : 1 = Région, 2 = Département. Lu par la mesure Carte Niveau ; un département choisi force le niveau 2. |
| `T_Sexe` | Power Query (M) | 3 | 0 | Dimension Sexe (référentiel Excel, onglet T_Sexe) : F, H, NR - Non réparti. La colonne Genre (Femmes, Hommes, Non réparti) alimente le segment Public. |
| `T_Territoire` | Power Query (M) | 7 | 0 | Dimension Territoire (référentiel Excel, onglet T_Territoire) : un département par ligne, avec sa région, ses codes (Code_DEP, Code_GDEREG) et ses zones de segm |
| `T_TrancheAge` | Power Query (M) | 3 | 0 | Dimension Grande tranche d'âge (référentiel Excel, onglet T_TrancheAge) : Enfants (1-13), Jeunes (14-20), Adultes (21-55), Seniors (56-99), Non réparti. Reliée  |
| `T_VueEvol` | Table calculée (DAX) | 2 | 0 | Bascule du graphique d'évolution (segment en tuiles) : Volume ou Base 100. |
| `_Mesures` | Table calculée (DAX) | 1 | 114 | Table de mesures (aucune donnée). Dossiers : 00 charte graphique, 01-06 indicateurs et outils, 07 page Portrait, 08 pages Comparer, 09 panneau gauche. |

## Relations

| De (côté N) | Vers (côté 1) | Cardinalité | Filtrage |
|---|---|---|---|
| `F_Licences.CodeReference` | `T_Federation.CodeReference` | N-1 | simple |
| `F_Licences.Sexe` | `T_Sexe.Sexe` | N-1 | simple |
| `F_Licences.GrandeTrancheAge` | `T_TrancheAge.TrancheAge` | N-1 | simple |
| `F_Licences.Annee` | `T_Annee.Annee` | N-1 | simple |
| `P_Niveaux.Cle` | `Param_Federation.Cle` | 1-1 | bidirectionnel |
| `T_Federation.CodeReference` | `P_Federation.CodeReference` | 1-1 | bidirectionnel |
| `P_Appartenance.Cle` | `P_Niveaux.Cle` | N-1 | simple |
| `P_Appartenance.CodeReference` | `T_Federation.CodeReference` | N-1 | bidirectionnel |
| `P_TerrChoix.'Id territoire'` | `Param_Departement.'Id territoire'` | 1-1 | bidirectionnel |
| `P_TerrAppartenance.'Id territoire'` | `P_TerrChoix.'Id territoire'` | N-1 | simple |
| `P_TerrAppartenance.Code_DEP` | `T_Territoire.Code_DEP` | N-1 | bidirectionnel |
| `P_TerrDep.Code_DEP` | `T_Territoire.Code_DEP` | 1-1 | bidirectionnel |
| `T_CarteAffichage.'Id territoire'` | `P_TerrChoix.'Id territoire'` | N-1 | simple |
| `F_Licences.Code_DEP` | `T_Territoire.Code_DEP` | N-1 | simple |
| `F_Population.Code_DEP` | `T_Territoire.Code_DEP` | N-1 | simple |
| `F_Population.Annee` | `T_Annee.Annee` | N-1 | simple |
| `F_Population.Sexe` | `T_Sexe.Sexe` | N-1 | simple |

## Comparaison

Groupe de calcul (3 éléments) appliqué aux mesures d'évolution : Sélection (mesure telle quelle), Regroupement (famille, sous-famille ou groupe de la sélection selon Param_Niveau), Ensemble (toutes les fédérations). Utilisé par Evo Indice sélection / regroupement / ensemble.

**Type** : Groupe de calcul

| Colonne | Type | Masquée | Description |
|---|---|:-:|---|
| `Comparaison` | string |  | Élément du groupe de calcul : Sélection, Regroupement ou Ensemble. |
| `Ordinal` | int64 | oui | Ordre des éléments du groupe de calcul. |

## F_Licences

Table de faits : licences annuelles INJEP-MEDES 2016-2025 (millésime 2025). Grain : fédération x année x sexe x âge x département (environ 8,2 M lignes). Source : SQL Server diouet / BDD, table dbo.Licences_Federation, alimentée par les CSV data/2025/Lics_<année>_<def|semidef>.csv (scripts sql/ du dépôt). Colonnes masquées : utiliser les mesures de _Mesures.

**Type** : Power Query (M)

| Colonne | Type | Masquée | Description |
|---|---|:-:|---|
| `Annee` | int64 | oui | Année du recensement (saison N ou N-1/N selon les fédérations). Clé vers T_Annee. |
| `Statut` | string | oui | Traçabilité : def = résultats définitifs (après géocodage), semidef = semi-définitifs. Déduit du nom du fichier CSV. |
| `MillesimeReference` | int64 | oui | Traçabilité : millésime de la nomenclature des codes fédération (2025). |
| `CodeReference` | string | oui | Code fédération dans la nomenclature 2025 (colonne « Code 2025 » des CSV). Clé vers T_Federation. |
| `Sexe` | string | oui | Sexe du licencié (F, H, NR - Non réparti). Clé vers T_Sexe. |
| `Age` | int64 | oui | Âge au 1er janvier de l'année N. Vide = non réparti (« NR - Non réparti » dans la source). |
| `GrandeTrancheAge` | string | oui | Grande tranche d'âge au 1er janvier (1 - Enfants (1-13) … NR - Non réparti). Clé vers T_TrancheAge. |
| `NbLicences` | int64 | oui | Nombre de licences annuelles de la ligne (colonne « Licences annuelles » des CSV). Utiliser la mesure _Mesures[NB Licences] plutôt que la colonne. |
| `Fichier` | string | oui | Traçabilité : fichier CSV d'origine (Lics_<année>_<statut>.csv). |
| `Code_DEP` | string | oui | Code département (« 31 », « 2A », « 971 », « NR »), extrait du libellé source en Power Query. Clé vers T_Territoire. |

## F_Population

Population INSEE au 1er janvier (estimations, fichier data/estim-pop-dep-sexe-aq-1975-2026.xlsx, feuilles 2016-2025), par département, sexe et tranche d'âge quinquennale (AgeDebut = premier âge de la tranche ; 95 = 95 ans et plus). Sert uniquement au taux de licences pour 1 000 habitants.

**Type** : Power Query (M)

| Colonne | Type | Masquée | Description |
|---|---|:-:|---|
| `Annee` | int64 | oui | Année de l'estimation (population au 1er janvier). Clé vers T_Annee. |
| `Code_DEP` | string | oui | Code département INSEE. Clé vers T_Territoire. |
| `Sexe` | string | oui | F ou H. Clé vers T_Sexe. |
| `AgeDebut` | int64 | oui | Premier âge de la tranche quinquennale (0, 5, ... 95 = 95 ans et plus). |
| `Population` | int64 | oui | Population estimée au 1er janvier. |

## P_Appartenance

Table pont fédération -> regroupements : une ligne par couple (Cle de regroupement, CodeReference), plus une ligne « Ensemble » par fédération. Construite en Power Query à partir de T_Federation (dépivotage des 3 niveaux). Relie P_Niveaux à T_Federation (filtre bidirectionnel).

**Type** : Power Query (M)

| Colonne | Type | Masquée | Description |
|---|---|:-:|---|
| `Cle` | string |  | Clé du regroupement (« F · … », « SF · … », « G · … » ou « Ensemble »). Relation vers P_Niveaux. |
| `CodeReference` | string |  | Code fédération. Relation vers T_Federation. |

## P_Federation

Colonnes du segment Fédération : une ligne par fédération (CodeReference), une colonne par regroupement (« F · », « SF · », « G · » + nom) contenant le nom court si la fédération en fait partie, sinon vide. Construite en Power Query (pivot de T_Federation). Param_Federation pointe vers ces colonnes.

**Type** : Power Query (M)

| Colonne | Type | Masquée | Description |
|---|---|:-:|---|
| `CodeReference` | string |  | Code fédération (clé, relation 1-1 bidirectionnelle avec T_Federation). |
| `Ensemble` | string |  | Nom court de chaque fédération (toutes les fédérations). |
| `F · Activités d'expression, de la forme et de la force` | string |  | Nom court des fédérations du regroupement « F · Activités d'expression, de la forme et de la force » (vide sinon). |
| `F · Généraliste` | string |  | Nom court des fédérations du regroupement « F · Généraliste » (vide sinon). |
| `F · Para-sport` | string |  | Nom court des fédérations du regroupement « F · Para-sport » (vide sinon). |
| `F · Sport scolaire et universitaire` | string |  | Nom court des fédérations du regroupement « F · Sport scolaire et universitaire » (vide sinon). |
| `F · Sports Individuels` | string |  | Nom court des fédérations du regroupement « F · Sports Individuels » (vide sinon). |
| `F · Sports collectifs` | string |  | Nom court des fédérations du regroupement « F · Sports collectifs » (vide sinon). |
| `F · Sports d'opposition` | string |  | Nom court des fédérations du regroupement « F · Sports d'opposition » (vide sinon). |
| `F · Sports de nature` | string |  | Nom court des fédérations du regroupement « F · Sports de nature » (vide sinon). |
| `G · Affinitaire` | string |  | Nom court des fédérations du regroupement « G · Affinitaire » (vide sinon). |
| `G · Délégataire non-olympique` | string |  | Nom court des fédérations du regroupement « G · Délégataire non-olympique » (vide sinon). |
| `G · Olympique` | string |  | Nom court des fédérations du regroupement « G · Olympique » (vide sinon). |
| `G · Para-sport` | string |  | Nom court des fédérations du regroupement « G · Para-sport » (vide sinon). |
| `G · Scolaire` | string |  | Nom court des fédérations du regroupement « G · Scolaire » (vide sinon). |
| `SF · Activités Aériennes` | string |  | Nom court des fédérations du regroupement « SF · Activités Aériennes » (vide sinon). |
| `SF · Activités Nautiques` | string |  | Nom court des fédérations du regroupement « SF · Activités Nautiques » (vide sinon). |
| `SF · Activités Terrestres` | string |  | Nom court des fédérations du regroupement « SF · Activités Terrestres » (vide sinon). |
| `SF · Activités aquatiques` | string |  | Nom court des fédérations du regroupement « SF · Activités aquatiques » (vide sinon). |
| `SF · Activités athlétiques ` | string |  | Nom court des fédérations du regroupement « SF · Activités athlétiques  » (vide sinon). |
| `SF · Activités d'adresse, précision` | string |  | Nom court des fédérations du regroupement « SF · Activités d'adresse, précision » (vide sinon). |
| `SF · Activités de la forme et de la force` | string |  | Nom court des fédérations du regroupement « SF · Activités de la forme et de la force » (vide sinon). |
| `SF · Activités gymniques et d'expression` | string |  | Nom court des fédérations du regroupement « SF · Activités gymniques et d'expression » (vide sinon). |
| `SF · Arts martiaux` | string |  | Nom court des fédérations du regroupement « SF · Arts martiaux » (vide sinon). |
| `SF · Généraliste` | string |  | Nom court des fédérations du regroupement « SF · Généraliste » (vide sinon). |
| `SF · Para-sport` | string |  | Nom court des fédérations du regroupement « SF · Para-sport » (vide sinon). |
| `SF · Sport scolaire` | string |  | Nom court des fédérations du regroupement « SF · Sport scolaire » (vide sinon). |
| `SF · Sport universitaire` | string |  | Nom court des fédérations du regroupement « SF · Sport universitaire » (vide sinon). |
| `SF · Sports collectif Glace` | string |  | Nom court des fédérations du regroupement « SF · Sports collectif Glace » (vide sinon). |
| `SF · Sports collectifs Grands Terrains` | string |  | Nom court des fédérations du regroupement « SF · Sports collectifs Grands Terrains » (vide sinon). |
| `SF · Sports collectifs Petits Terrains et salles` | string |  | Nom court des fédérations du regroupement « SF · Sports collectifs Petits Terrains et salles » (vide sinon). |
| `SF · Sports de combats` | string |  | Nom court des fédérations du regroupement « SF · Sports de combats » (vide sinon). |
| `SF · Sports duels` | string |  | Nom court des fédérations du regroupement « SF · Sports duels » (vide sinon). |
| `SF · Sports mécaniques` | string |  | Nom court des fédérations du regroupement « SF · Sports mécaniques » (vide sinon). |
| `SF · Sports raquettes` | string |  | Nom court des fédérations du regroupement « SF · Sports raquettes » (vide sinon). |

## P_Niveaux

Liste des regroupements pour le segment Regroupement : une ligne par famille, sous-famille ou groupe (clé Cle) + une ligne « Ensemble ». Construite en Power Query à partir de T_Federation. Param_Niveau choisit la colonne affichée (Famille, Sous-famille ou Groupe).

**Type** : Power Query (M)

| Colonne | Type | Masquée | Description |
|---|---|:-:|---|
| `Cle` | string | oui | Clé unique du regroupement : « F · » famille, « SF · » sous-famille, « G · » groupe, ou « Ensemble ». Relie P_Niveaux à Param_Federation[Cle] et P_Appartenance[Cle]. |
| `Famille` | string |  | Familles de fédérations (issues du référentiel Excel). La ligne « Ensemble » = toutes les fédérations. Affichée dans le segment Regroupement quand le niveau Famille est choisi. |
| `Sous-famille` | string |  | Sous-familles de fédérations (référentiel Excel). La ligne « Ensemble » = toutes les fédérations. Affichée dans le segment Regroupement quand le niveau Sous-famille est choisi. |
| `Groupe` | string |  | Groupes de fédérations (référentiel Excel). La ligne « Ensemble » = toutes les fédérations. Affichée dans le segment Regroupement quand le niveau Groupe est choisi. |
| `OrdreFamille` | int64 | oui | Ordre de tri de la colonne Famille (0 = Ensemble, puis alphabétique, 9999 = vide). |
| `OrdreSousFamille` | int64 | oui | Ordre de tri de la colonne Sous-famille (0 = Ensemble, puis alphabétique, 9999 = vide). |
| `OrdreGroupe` | int64 | oui | Ordre de tri de la colonne Groupe (0 = Ensemble, puis alphabétique, 9999 = vide). |

## P_TerrAppartenance

Liaison territoire du segment (P_TerrChoix[Id territoire]) → départements (T_Territoire[Code_DEP]). Équivalent de P_Appartenance. Basée sur les codes (Code_GDEREG, GD_Zone_Slicer_Ordre : 1 métropole, 2 DROM, 3 COM, 4 autres, 5 non réparti).

**Type** : Table calculée (DAX)

| Colonne | Type | Masquée | Description |
|---|---|:-:|---|
| `Id territoire` |  |  | Territoire du segment (TOT, MDR, MET, R + code région, DROM, COM, AUT). |
| `Code_DEP` |  |  | Département appartenant au territoire. |

<details><summary>Expression DAX</summary>

```dax
VAR T = ALLNOBLANKROW(T_Territoire[Code_DEP], T_Territoire[Code_GDEREG], T_Territoire[GD_Zone_Slicer_Ordre])
RETURN
    UNION(
        SELECTCOLUMNS(T, "Id territoire", "TOT", "Code_DEP", T_Territoire[Code_DEP]),
        SELECTCOLUMNS(FILTER(T, T_Territoire[GD_Zone_Slicer_Ordre] IN {"1", "2"}), "Id territoire", "MDR", "Code_DEP", T_Territoire[Code_DEP]),
        SELECTCOLUMNS(FILTER(T, T_Territoire[GD_Zone_Slicer_Ordre] = "1"), "Id territoire", "MET", "Code_DEP", T_Territoire[Code_DEP]),
        SELECTCOLUMNS(FILTER(T, T_Territoire[GD_Zone_Slicer_Ordre] = "1"), "Id territoire", "R" & T_Territoire[Code_GDEREG], "Code_DEP", T_Territoire[Code_DEP]),
        SELECTCOLUMNS(FILTER(T, T_Territoire[GD_Zone_Slicer_Ordre] = "2"), "Id territoire", "DROM", "Code_DEP", T_Territoire[Code_DEP]),
        SELECTCOLUMNS(FILTER(T, T_Territoire[GD_Zone_Slicer_Ordre] = "3"), "Id territoire", "COM", "Code_DEP", T_Territoire[Code_DEP]),
        SELECTCOLUMNS(FILTER(T, T_Territoire[GD_Zone_Slicer_Ordre] IN {"4", "5"}), "Id territoire", "AUT", "Code_DEP", T_Territoire[Code_DEP])
    )
```

</details>

## P_TerrChoix

Liste du segment Territoire (équivalent de P_Niveaux pour les fédérations). Clé stable : Id territoire (TOT, MDR, MET, R + code région INSEE, DROM, COM, AUT). Libellés des régions lus dans T_Territoire. Reliée à Param_Departement (1-1) et à P_TerrAppartenance.

**Type** : Table calculée (DAX)

| Colonne | Type | Masquée | Description |
|---|---|:-:|---|
| `Id territoire` |  |  | Clé stable du territoire : TOT, MDR, MET, R + code région INSEE, DROM, COM, AUT. |
| `Libellé` |  |  | Libellé du territoire. |
| `Type` |  | oui | Total ou Région. |
| `Ordre` |  | oui | Ordre d'affichage dans le segment. |
| `Territoire` |  |  | Libellé affiché dans le segment (régions indentées). |

<details><summary>Expression DAX</summary>

```dax
-- Régions de métropole (GD_Zone_Slicer_Ordre = 1), clé = R + code région
VAR Reg =
    SELECTCOLUMNS(
        FILTER(ALLNOBLANKROW(T_Territoire[Code_GDEREG], T_Territoire[Zone_Slicer], T_Territoire[GD_Zone_Slicer_Ordre]), T_Territoire[GD_Zone_Slicer_Ordre] = "1"),
        "Id territoire", "R" & T_Territoire[Code_GDEREG],
        "Libellé", T_Territoire[Zone_Slicer],
        "Type", "Région"
    )
VAR RegO = ADDCOLUMNS(Reg, "Ordre", VAR l = [Libellé] RETURN 10 + COUNTROWS(FILTER(Reg, [Libellé] <= l)))
-- Totaux et zones (clés fixes)
VAR Fixes =
    DATATABLE("Id territoire", STRING, "Libellé", STRING, "Type", STRING, "Ordre", INTEGER, {
        {"TOT", "Total", "Total", 1}, {"MDR", "Métropole + DROM", "Total", 2}, {"MET", "Métropole", "Total", 3},
        {"DROM", "DROM", "Total", 50}, {"COM", "COM", "Total", 51}, {"AUT", "Autres", "Total", 52}
    })
RETURN
    ADDCOLUMNS(UNION(Fixes, RegO),
        "Territoire", IF([Type] = "Région", REPT(UNICHAR(8195), 2) & [Libellé], [Libellé]))
```

</details>

## P_TerrDep

Colonnes du segment Département (équivalent de P_Federation) : une ligne par département (clé Code_DEP), une colonne par territoire du segment nommée par son Id (TOT, MDR, MET, R11…R94, DROM, COM, AUT). Reliée à T_Territoire[Code_DEP] (1-1).

**Type** : Table calculée (DAX)

| Colonne | Type | Masquée | Description |
|---|---|:-:|---|
| `Code_DEP` |  |  | Code département (clé, relation 1-1 avec T_Territoire). |
| `TOT` |  |  | Libellé des départements du territoire TOT (vide sinon). Pointée par Param_Departement. |
| `MDR` |  |  | Libellé des départements du territoire MDR (vide sinon). Pointée par Param_Departement. |
| `MET` |  |  | Libellé des départements du territoire MET (vide sinon). Pointée par Param_Departement. |
| `R11` |  |  | Libellé des départements du territoire R11 (vide sinon). Pointée par Param_Departement. |
| `R24` |  |  | Libellé des départements du territoire R24 (vide sinon). Pointée par Param_Departement. |
| `R27` |  |  | Libellé des départements du territoire R27 (vide sinon). Pointée par Param_Departement. |
| `R28` |  |  | Libellé des départements du territoire R28 (vide sinon). Pointée par Param_Departement. |
| `R32` |  |  | Libellé des départements du territoire R32 (vide sinon). Pointée par Param_Departement. |
| `R44` |  |  | Libellé des départements du territoire R44 (vide sinon). Pointée par Param_Departement. |
| `R52` |  |  | Libellé des départements du territoire R52 (vide sinon). Pointée par Param_Departement. |
| `R53` |  |  | Libellé des départements du territoire R53 (vide sinon). Pointée par Param_Departement. |
| `R75` |  |  | Libellé des départements du territoire R75 (vide sinon). Pointée par Param_Departement. |
| `R76` |  |  | Libellé des départements du territoire R76 (vide sinon). Pointée par Param_Departement. |
| `R84` |  |  | Libellé des départements du territoire R84 (vide sinon). Pointée par Param_Departement. |
| `R93` |  |  | Libellé des départements du territoire R93 (vide sinon). Pointée par Param_Departement. |
| `R94` |  |  | Libellé des départements du territoire R94 (vide sinon). Pointée par Param_Departement. |
| `DROM` |  |  | Libellé des départements du territoire DROM (vide sinon). Pointée par Param_Departement. |
| `COM` |  |  | Libellé des départements du territoire COM (vide sinon). Pointée par Param_Departement. |
| `AUT` |  |  | Libellé des départements du territoire AUT (vide sinon). Pointée par Param_Departement. |

<details><summary>Expression DAX</summary>

```dax
-- Une ligne par département (clé Code_DEP), une colonne par territoire du segment (nom de colonne = Id territoire).
-- La colonne contient le libellé du département s'il appartient au territoire, sinon vide.
-- Param_Departement pointe vers ces colonnes : changer de territoire change de colonne et vide la sélection Département.
VAR T = ALLNOBLANKROW(T_Territoire[Code_DEP], T_Territoire[Departement], T_Territoire[Code_GDEREG], T_Territoire[GD_Zone_Slicer_Ordre])
VAR Pivot =
    SELECTCOLUMNS(T,
        "Code_DEP", T_Territoire[Code_DEP],
        "TOT", T_Territoire[Departement],
        "MDR", IF(T_Territoire[GD_Zone_Slicer_Ordre] IN {"1", "2"}, T_Territoire[Departement]),
        "MET", IF(T_Territoire[GD_Zone_Slicer_Ordre] = "1", T_Territoire[Departement]),
        "R11", IF(T_Territoire[GD_Zone_Slicer_Ordre] = "1" && T_Territoire[Code_GDEREG] = "11", T_Territoire[Departement]),
        "R24", IF(T_Territoire[GD_Zone_Slicer_Ordre] = "1" && T_Territoire[Code_GDEREG] = "24", T_Territoire[Departement]),
        "R27", IF(T_Territoire[GD_Zone_Slicer_Ordre] = "1" && T_Territoire[Code_GDEREG] = "27", T_Territoire[Departement]),
        "R28", IF(T_Territoire[GD_Zone_Slicer_Ordre] = "1" && T_Territoire[Code_GDEREG] = "28", T_Territoire[Departement]),
        "R32", IF(T_Territoire[GD_Zone_Slicer_Ordre] = "1" && T_Territoire[Code_GDEREG] = "32", T_Territoire[Departement]),
        "R44", IF(T_Territoire[GD_Zone_Slicer_Ordre] = "1" && T_Territoire[Code_GDEREG] = "44", T_Territoire[Departement]),
        "R52", IF(T_Territoire[GD_Zone_Slicer_Ordre] = "1" && T_Territoire[Code_GDEREG] = "52", T_Territoire[Departement]),
        "R53", IF(T_Territoire[GD_Zone_Slicer_Ordre] = "1" && T_Territoire[Code_GDEREG] = "53", T_Territoire[Departement]),
        "R75", IF(T_Territoire[GD_Zone_Slicer_Ordre] = "1" && T_Territoire[Code_GDEREG] = "75", T_Territoire[Departement]),
        "R76", IF(T_Territoire[GD_Zone_Slicer_Ordre] = "1" && T_Territoire[Code_GDEREG] = "76", T_Territoire[Departement]),
        "R84", IF(T_Territoire[GD_Zone_Slicer_Ordre] = "1" && T_Territoire[Code_GDEREG] = "84", T_Territoire[Departement]),
        "R93", IF(T_Territoire[GD_Zone_Slicer_Ordre] = "1" && T_Territoire[Code_GDEREG] = "93", T_Territoire[Departement]),
        "R94", IF(T_Territoire[GD_Zone_Slicer_Ordre] = "1" && T_Territoire[Code_GDEREG] = "94", T_Territoire[Departement]),
        "DROM", IF(T_Territoire[GD_Zone_Slicer_Ordre] = "2", T_Territoire[Departement]),
        "COM", IF(T_Territoire[GD_Zone_Slicer_Ordre] = "3", T_Territoire[Departement]),
        "AUT", IF(T_Territoire[GD_Zone_Slicer_Ordre] IN {"4", "5"}, T_Territoire[Departement]))
RETURN Pivot
```

</details>

## Param_Departement

Paramètre de champ du segment Département (équivalent de Param_Federation) : chaque ligne pointe vers la colonne de P_TerrDep du territoire. Filtré par P_TerrChoix via Id territoire (1-1) : il affiche les départements du territoire choisi et vide la sélection quand on change de territoire.

**Type** : Table calculée (DAX)

| Colonne | Type | Masquée | Description |
|---|---|:-:|---|
| `Paramètre` |  |  | Territoire affiché par le segment. |
| `Paramètre Champs` |  | oui | Colonne de P_TerrDep pointée (NAMEOF). |
| `Paramètre Commande` |  | oui | Ordre d'affichage. |
| `Id territoire` |  |  | Clé du territoire, relation 1-1 avec P_TerrChoix. |

<details><summary>Expression DAX</summary>

```dax
{
    ("Total", NAMEOF('P_TerrDep'[TOT]), 1, "TOT"),
    ("Métropole + DROM", NAMEOF('P_TerrDep'[MDR]), 2, "MDR"),
    ("Métropole", NAMEOF('P_TerrDep'[MET]), 3, "MET"),
    ("  Île-de-France", NAMEOF('P_TerrDep'[R11]), 11, "R11"),
    ("  Centre-Val de Loire", NAMEOF('P_TerrDep'[R24]), 12, "R24"),
    ("  Bourgogne-Franche-Comté", NAMEOF('P_TerrDep'[R27]), 13, "R27"),
    ("  Normandie", NAMEOF('P_TerrDep'[R28]), 14, "R28"),
    ("  Hauts-de-France", NAMEOF('P_TerrDep'[R32]), 15, "R32"),
    ("  Grand Est", NAMEOF('P_TerrDep'[R44]), 16, "R44"),
    ("  Pays de la Loire", NAMEOF('P_TerrDep'[R52]), 17, "R52"),
    ("  Bretagne", NAMEOF('P_TerrDep'[R53]), 18, "R53"),
    ("  Nouvelle-Aquitaine", NAMEOF('P_TerrDep'[R75]), 19, "R75"),
    ("  Occitanie", NAMEOF('P_TerrDep'[R76]), 20, "R76"),
    ("  Auvergne-Rhône-Alpes", NAMEOF('P_TerrDep'[R84]), 21, "R84"),
    ("  Provence-Alpes-Côte d'Azur", NAMEOF('P_TerrDep'[R93]), 22, "R93"),
    ("  Corse", NAMEOF('P_TerrDep'[R94]), 23, "R94"),
    ("DROM", NAMEOF('P_TerrDep'[DROM]), 50, "DROM"),
    ("COM", NAMEOF('P_TerrDep'[COM]), 51, "COM"),
    ("Autres", NAMEOF('P_TerrDep'[AUT]), 52, "AUT")
}
```

</details>

## Param_Federation

Paramètre de champ du segment Fédération : chaque ligne pointe vers une colonne de P_Federation. Filtré par P_Niveaux via Cle (1-1), il affiche les fédérations du regroupement choisi et vide la sélection quand on change de regroupement. Code à régénérer (requête Code_Parametre) quand un NOUVEAU regroupement apparaît dans l'Excel.

**Type** : Table calculée (DAX)

| Colonne | Type | Masquée | Description |
|---|---|:-:|---|
| `Paramètre` |  |  | Regroupement affiché par le segment. |
| `Paramètre Champs` |  | oui | Colonne de P_Federation pointée (NAMEOF). |
| `Paramètre Commande` |  | oui | Ordre d'affichage. |
| `Niveau` |  |  | Niveau du regroupement : Ensemble, Famille, Sous-famille ou Groupe. |
| `Cle` |  |  | Clé du regroupement, relation 1-1 avec P_Niveaux. |

<details><summary>Expression DAX</summary>

```dax
{
    ("Ensemble", NAMEOF('P_Federation'[Ensemble]), 0, "Ensemble", "Ensemble"),
    ("Activités d'expression, de la forme et de la force", NAMEOF('P_Federation'[F · Activités d'expression, de la forme et de la force]), 1, "Famille", "F · Activités d'expression, de la forme et de la force"),
    ("Généraliste", NAMEOF('P_Federation'[F · Généraliste]), 2, "Famille", "F · Généraliste"),
    ("Para-sport", NAMEOF('P_Federation'[F · Para-sport]), 3, "Famille", "F · Para-sport"),
    ("Sport scolaire et universitaire", NAMEOF('P_Federation'[F · Sport scolaire et universitaire]), 4, "Famille", "F · Sport scolaire et universitaire"),
    ("Sports Individuels", NAMEOF('P_Federation'[F · Sports Individuels]), 5, "Famille", "F · Sports Individuels"),
    ("Sports collectifs", NAMEOF('P_Federation'[F · Sports collectifs]), 6, "Famille", "F · Sports collectifs"),
    ("Sports d'opposition", NAMEOF('P_Federation'[F · Sports d'opposition]), 7, "Famille", "F · Sports d'opposition"),
    ("Sports de nature", NAMEOF('P_Federation'[F · Sports de nature]), 8, "Famille", "F · Sports de nature"),
    ("Activités Aériennes", NAMEOF('P_Federation'[SF · Activités Aériennes]), 9, "Sous-famille", "SF · Activités Aériennes"),
    ("Activités Nautiques", NAMEOF('P_Federation'[SF · Activités Nautiques]), 10, "Sous-famille", "SF · Activités Nautiques"),
    ("Activités Terrestres", NAMEOF('P_Federation'[SF · Activités Terrestres]), 11, "Sous-famille", "SF · Activités Terrestres"),
    ("Activités aquatiques", NAMEOF('P_Federation'[SF · Activités aquatiques]), 12, "Sous-famille", "SF · Activités aquatiques"),
    ("Activités athlétiques ", NAMEOF('P_Federation'[SF · Activités athlétiques ]), 13, "Sous-famille", "SF · Activités athlétiques "),
    ("Activités d'adresse, précision", NAMEOF('P_Federation'[SF · Activités d'adresse, précision]), 14, "Sous-famille", "SF · Activités d'adresse, précision"),
    ("Activités de la forme et de la force", NAMEOF('P_Federation'[SF · Activités de la forme et de la force]), 15, "Sous-famille", "SF · Activités de la forme et de la force"),
    ("Activités gymniques et d'expression", NAMEOF('P_Federation'[SF · Activités gymniques et d'expression]), 16, "Sous-famille", "SF · Activités gymniques et d'expression"),
    ("Arts martiaux", NAMEOF('P_Federation'[SF · Arts martiaux]), 17, "Sous-famille", "SF · Arts martiaux"),
    ("Généraliste", NAMEOF('P_Federation'[SF · Généraliste]), 18, "Sous-famille", "SF · Généraliste"),
    ("Para-sport", NAMEOF('P_Federation'[SF · Para-sport]), 19, "Sous-famille", "SF · Para-sport"),
    ("Sport scolaire", NAMEOF('P_Federation'[SF · Sport scolaire]), 20, "Sous-famille", "SF · Sport scolaire"),
    ("Sport universitaire", NAMEOF('P_Federation'[SF · Sport universitaire]), 21, "Sous-famille", "SF · Sport universitaire"),
    ("Sports collectif Glace", NAMEOF('P_Federation'[SF · Sports collectif Glace]), 22, "Sous-famille", "SF · Sports collectif Glace"),
    ("Sports collectifs Grands Terrains", NAMEOF('P_Federation'[SF · Sports collectifs Grands Terrains]), 23, "Sous-famille", "SF · Sports collectifs Grands Terrains"),
    ("Sports collectifs Petits Terrains et salles", NAMEOF('P_Federation'[SF · Sports collectifs Petits Terrains et salles]), 24, "Sous-famille", "SF · Sports collectifs Petits Terrains et salles"),
    ("Sports de combats", NAMEOF('P_Federation'[SF · Sports de combats]), 25, "Sous-famille", "SF · Sports de combats"),
    ("Sports duels", NAMEOF('P_Federation'[SF · Sports duels]), 26, "Sous-famille", "SF · Sports duels"),
    ("Sports mécaniques", NAMEOF('P_Federation'[SF · Sports mécaniques]), 27, "Sous-famille", "SF · Sports mécaniques"),
    ("Sports raquettes", NAMEOF('P_Federation'[SF · Sports raquettes]), 28, "Sous-famille", "SF · Sports raquettes"),
    ("Affinitaire", NAMEOF('P_Federation'[G · Affinitaire]), 29, "Groupe", "G · Affinitaire"),
    ("Délégataire non-olympique", NAMEOF('P_Federation'[G · Délégataire non-olympique]), 30, "Groupe", "G · Délégataire non-olympique"),
    ("Olympique", NAMEOF('P_Federation'[G · Olympique]), 31, "Groupe", "G · Olympique"),
    ("Para-sport", NAMEOF('P_Federation'[G · Para-sport]), 32, "Groupe", "G · Para-sport"),
    ("Scolaire", NAMEOF('P_Federation'[G · Scolaire]), 33, "Groupe", "G · Scolaire")
}
```

</details>

## Param_Niveau

Paramètre de champ du segment Niveau : Famille, Sous-famille ou Groupe (colonnes de P_Niveaux). Changer de niveau vide la sélection du segment Regroupement. Ne change jamais.

**Type** : Table calculée (DAX)

| Colonne | Type | Masquée | Description |
|---|---|:-:|---|
| `Paramètre` |  |  | Niveau de regroupement choisi (Famille, Sous-famille, Groupe). |
| `Paramètre Champs` |  | oui | Colonne de P_Niveaux pointée (NAMEOF). |
| `Paramètre Commande` |  | oui | Ordre d'affichage (Groupe = 0). |

<details><summary>Expression DAX</summary>

```dax
{
    ("Famille",      NAMEOF('P_Niveaux'[Famille]),      1),
    ("Sous-famille", NAMEOF('P_Niveaux'[Sous-famille]), 2),
    ("Groupe",       NAMEOF('P_Niveaux'[Groupe]),       0)
}
```

</details>

## T_Annee

Dimension Année (référentiel Excel, onglet T_Annee) : 2016-2025 et statut de la donnée (def = définitif, semidef = semi-définitif). Segment Année.

**Type** : Power Query (M)

| Colonne | Type | Masquée | Description |
|---|---|:-:|---|
| `Annee` | string |  | Année du recensement (clé). |
| `Statut` | string | oui | def = définitif, semidef = semi-définitif. |

## T_AnneeAxe

Copie déconnectée des années pour l'axe du graphique d'évolution : le graphique montre toujours 2016-2025 et l'année choisie dans le segment Année est mise en évidence.

**Type** : Table calculée (DAX)

| Colonne | Type | Masquée | Description |
|---|---|:-:|---|
| `Annee` | string |  | Année de l'axe du graphique d'évolution (table déconnectée). |

<details><summary>Expression DAX</summary>

```dax
SELECTCOLUMNS(ALL(T_Annee[Annee]), "Annee", T_Annee[Annee])
```

</details>

## T_Assistant_Bloc

Assistant : une ligne par bloc HTML du visuel (HTML Content, colonne Ordre dans Content + mesure HTML Assistant). Chaque bloc reste sous 32 767 caractères (limite d'une valeur texte dans un visuel). Les blocs de données (Texte) sont précalculés à l'actualisation et ignorent les segments ; les blocs ui/txt/js sont fournis par les mesures du dossier 10. Assistant. Blocs v2 : séries fédération x région (serr), séries féminines (serf, sertf), pyramides des âges (pyr, pyrt). Formats : voir src/html/assistant/LISEZMOI.md.

**Type** : Table calculée (DAX)

| Colonne | Type | Masquée | Description |
|---|---|:-:|---|
| `Ordre` |  |  |  |
| `Type` |  |  |  |
| `Texte` |  |  |  |

<details><summary>Expression DAX</summary>

```dax
VAR _N = CALCULATE ( MAX ( F_Licences[Annee] ), REMOVEFILTERS () )
VAR _AnRef = 2019
// ---------- Cube fédération x département : licences N, N-1, 2019 et femmes N ----------
VAR _V = CALCULATETABLE (
    ADDCOLUMNS ( SUMMARIZE ( F_Licences, F_Licences[Code_DEP], F_Licences[CodeReference] ),
        "n", CALCULATE ( SUM ( F_Licences[NbLicences] ), F_Licences[Annee] = _N ),
        "p", CALCULATE ( SUM ( F_Licences[NbLicences] ), F_Licences[Annee] = _N - 1 ),
        "r", CALCULATE ( SUM ( F_Licences[NbLicences] ), F_Licences[Annee] = _AnRef ),
        "f", CALCULATE ( SUM ( F_Licences[NbLicences] ), F_Licences[Annee] = _N, F_Licences[Sexe] = "F" ) ),
    REMOVEFILTERS (), F_Licences[Annee] IN { _N, _N - 1, _AnRef } )
VAR _V2 = SELECTCOLUMNS ( _V, "d", F_Licences[Code_DEP], "c", F_Licences[CodeReference], "x", F_Licences[CodeReference] & "," & [n] & "," & [p] & "," & [r] & "," & [f] )
VAR _D = ADDCOLUMNS ( DISTINCT ( SELECTCOLUMNS ( _V2, "d", [d] ) ), "s", VAR _d = [d] RETURN _d & "|" & CONCATENATEX ( FILTER ( _V2, [d] = _d ), [x], ";", [c] ) )
VAR _D2 = ADDCOLUMNS ( _D, "L", LEN ( [s] ) + 1 )
VAR _D3 = ADDCOLUMNS ( _D2, "m", VAR _d = [d] RETURN INT ( ( SUMX ( FILTER ( _D2, [d] < _d ), [L] ) + 0 ) / 25000 ) )
VAR _Cube = SELECTCOLUMNS (
    ADDCOLUMNS ( DISTINCT ( SELECTCOLUMNS ( _D3, "m", [m] ) ), "T", VAR _m = [m] RETURN CONCATENATEX ( FILTER ( _D3, [m] = _m ), [s], "~", [d] ) ),
    "Ordre", 20 + [m], "Type", "cube", "Texte", [T] )
// ---------- Fédérations : code|nom court|famille|sous-famille|groupe|libellé officiel ----------
VAR _Fed = CONCATENATEX ( T_Federation, T_Federation[CodeReference] & "|" & T_Federation[Nom court] & "|" & T_Federation[Famille de fédérations] & "|" & T_Federation[Sous-famille de fédérations] & "|" & T_Federation[Groupe de fédérations] & "|" & T_Federation[Federation], "~", T_Federation[CodeReference] )
// ---------- Territoires : code|nom|code région|région|zone|pop N|pop N-1|pop 2019 ----------
VAR _Pop = CALCULATETABLE ( ADDCOLUMNS ( SUMMARIZE ( F_Population, F_Population[Code_DEP], F_Population[Annee] ), "v", CALCULATE ( SUM ( F_Population[Population] ) ) ), REMOVEFILTERS (), F_Population[Annee] IN { _N, _N - 1, _AnRef } )
VAR _Ter = CONCATENATEX ( T_Territoire,
    VAR _c = T_Territoire[Code_DEP]
    VAR _nom = T_Territoire[Departement]
    VAR _pos = SEARCH ( " - ", _nom, 1, 0 )
    RETURN _c & "|" & IF ( _pos > 0, MID ( _nom, _pos + 3, 200 ), _nom ) & "|" & T_Territoire[Code_GDEREG] & "|" & T_Territoire[Zone_Slicer] & "|" & T_Territoire[GD_Zone_Slicer]
        & "|" & SUMX ( FILTER ( _Pop, F_Population[Code_DEP] = _c && F_Population[Annee] = _N ), [v] )
        & "|" & SUMX ( FILTER ( _Pop, F_Population[Code_DEP] = _c && F_Population[Annee] = _N - 1 ), [v] )
        & "|" & SUMX ( FILTER ( _Pop, F_Population[Code_DEP] = _c && F_Population[Annee] = _AnRef ), [v] ),
    "~", T_Territoire[Code_DEP] )
// ---------- Séries 2016-N : par fédération (France) et par territoire (toutes fédérations) ----------
VAR _Annees = SELECTCOLUMNS ( CALCULATETABLE ( VALUES ( T_Annee[Annee] ), REMOVEFILTERS () ), "a", VALUE ( T_Annee[Annee] ) )
VAR _SF = CALCULATETABLE ( ADDCOLUMNS ( SUMMARIZE ( F_Licences, F_Licences[CodeReference], F_Licences[Annee] ), "v", CALCULATE ( SUM ( F_Licences[NbLicences] ) ) ), REMOVEFILTERS () )
VAR _Ser = CONCATENATEX ( T_Federation, VAR _c = T_Federation[CodeReference] RETURN _c & "|" & CONCATENATEX ( _Annees, VAR _a = [a] RETURN SUMX ( FILTER ( _SF, F_Licences[CodeReference] = _c && F_Licences[Annee] = _a ), [v] ), ",", [a], ASC ), "~", T_Federation[CodeReference] )
VAR _ST = CALCULATETABLE ( ADDCOLUMNS ( SUMMARIZE ( F_Licences, F_Licences[Code_DEP], F_Licences[Annee] ), "v", CALCULATE ( SUM ( F_Licences[NbLicences] ) ) ), REMOVEFILTERS () )
VAR _SerT = CONCATENATEX ( T_Territoire, VAR _c = T_Territoire[Code_DEP] RETURN _c & "|" & CONCATENATEX ( _Annees, VAR _a = [a] RETURN SUMX ( FILTER ( _ST, F_Licences[Code_DEP] = _c && F_Licences[Annee] = _a ), [v] ), ",", [a], ASC ), "~", T_Territoire[Code_DEP] )
// ---------- Profils N : code|âge moyen|enfants,jeunes,adultes,seniors,non répartis ----------
VAR _AF = CALCULATETABLE ( ADDCOLUMNS ( SUMMARIZE ( F_Licences, F_Licences[CodeReference] ),
        "sa", CALCULATE ( SUMX ( F_Licences, F_Licences[Age] * F_Licences[NbLicences] ) ),
        "la", CALCULATE ( SUM ( F_Licences[NbLicences] ), NOT ISBLANK ( F_Licences[Age] ) ) ), REMOVEFILTERS (), F_Licences[Annee] = _N )
VAR _TF = CALCULATETABLE ( ADDCOLUMNS ( SUMMARIZE ( F_Licences, F_Licences[CodeReference], F_Licences[GrandeTrancheAge] ), "v", CALCULATE ( SUM ( F_Licences[NbLicences] ) ) ), REMOVEFILTERS (), F_Licences[Annee] = _N )
VAR _Pro = CONCATENATEX ( T_Federation,
    VAR _c = T_Federation[CodeReference]
    VAR _sa = SUMX ( FILTER ( _AF, F_Licences[CodeReference] = _c ), [sa] )
    VAR _la = SUMX ( FILTER ( _AF, F_Licences[CodeReference] = _c ), [la] )
    RETURN _c & "|" & FORMAT ( DIVIDE ( _sa, _la ), "0.0", "en-US" ) & "|"
        & SUMX ( FILTER ( _TF, F_Licences[CodeReference] = _c && LEFT ( F_Licences[GrandeTrancheAge], 1 ) = "1" ), [v] ) & ","
        & SUMX ( FILTER ( _TF, F_Licences[CodeReference] = _c && LEFT ( F_Licences[GrandeTrancheAge], 1 ) = "2" ), [v] ) & ","
        & SUMX ( FILTER ( _TF, F_Licences[CodeReference] = _c && LEFT ( F_Licences[GrandeTrancheAge], 1 ) = "3" ), [v] ) & ","
        & SUMX ( FILTER ( _TF, F_Licences[CodeReference] = _c && LEFT ( F_Licences[GrandeTrancheAge], 1 ) = "4" ), [v] ) & ","
        & SUMX ( FILTER ( _TF, F_Licences[CodeReference] = _c && LEFT ( F_Licences[GrandeTrancheAge], 1 ) = "N" ), [v] ),
    "~", T_Federation[CodeReference] )
VAR _AT = CALCULATETABLE ( ADDCOLUMNS ( SUMMARIZE ( F_Licences, F_Licences[Code_DEP] ),
        "sa", CALCULATE ( SUMX ( F_Licences, F_Licences[Age] * F_Licences[NbLicences] ) ),
        "la", CALCULATE ( SUM ( F_Licences[NbLicences] ), NOT ISBLANK ( F_Licences[Age] ) ) ), REMOVEFILTERS (), F_Licences[Annee] = _N )
VAR _TT = CALCULATETABLE ( ADDCOLUMNS ( SUMMARIZE ( F_Licences, F_Licences[Code_DEP], F_Licences[GrandeTrancheAge] ), "v", CALCULATE ( SUM ( F_Licences[NbLicences] ) ) ), REMOVEFILTERS (), F_Licences[Annee] = _N )
VAR _ProT = CONCATENATEX ( T_Territoire,
    VAR _c = T_Territoire[Code_DEP]
    VAR _sa = SUMX ( FILTER ( _AT, F_Licences[Code_DEP] = _c ), [sa] )
    VAR _la = SUMX ( FILTER ( _AT, F_Licences[Code_DEP] = _c ), [la] )
    RETURN _c & "|" & FORMAT ( DIVIDE ( _sa, _la ), "0.0", "en-US" ) & "|"
        & SUMX ( FILTER ( _TT, F_Licences[Code_DEP] = _c && LEFT ( F_Licences[GrandeTrancheAge], 1 ) = "1" ), [v] ) & ","
        & SUMX ( FILTER ( _TT, F_Licences[Code_DEP] = _c && LEFT ( F_Licences[GrandeTrancheAge], 1 ) = "2" ), [v] ) & ","
        & SUMX ( FILTER ( _TT, F_Licences[Code_DEP] = _c && LEFT ( F_Licences[GrandeTrancheAge], 1 ) = "3" ), [v] ) & ","
        & SUMX ( FILTER ( _TT, F_Licences[Code_DEP] = _c && LEFT ( F_Licences[GrandeTrancheAge], 1 ) = "4" ), [v] ) & ","
        & SUMX ( FILTER ( _TT, F_Licences[Code_DEP] = _c && LEFT ( F_Licences[GrandeTrancheAge], 1 ) = "N" ), [v] ),
    "~", T_Territoire[Code_DEP] )
// ---------- (v2) Séries 2016-N par fédération x région (métropole et DROM) : code|reg:v,v,…;reg:… (vide = 0) ----------
VAR _SRp = CALCULATETABLE ( ADDCOLUMNS ( SUMMARIZE ( F_Licences, F_Licences[CodeReference], T_Territoire[Code_GDEREG] ),
    "s", CONCATENATEX ( _Annees, VAR _a = [a] VAR _v = CALCULATE ( SUM ( F_Licences[NbLicences] ), F_Licences[Annee] = _a ) RETURN IF ( _v > 0, _v ), ",", [a], ASC ) ),
    REMOVEFILTERS (), NOT ( T_Territoire[Code_GDEREG] IN { "COM", "980", "ETR", "NR" } ) )
VAR _SRf = ADDCOLUMNS ( DISTINCT ( SELECTCOLUMNS ( _SRp, "c", F_Licences[CodeReference] ) ),
    "t", VAR _c = [c] RETURN _c & "|" & CONCATENATEX ( FILTER ( _SRp, F_Licences[CodeReference] = _c ), T_Territoire[Code_GDEREG] & ":" & [s], ";", T_Territoire[Code_GDEREG] ) )
VAR _SRl = ADDCOLUMNS ( _SRf, "L", LEN ( [t] ) + 1 )
VAR _SRm = ADDCOLUMNS ( _SRl, "m", VAR _c = [c] RETURN INT ( ( SUMX ( FILTER ( _SRl, [c] < _c ), [L] ) + 0 ) / 25000 ) )
VAR _SerR = SELECTCOLUMNS (
    ADDCOLUMNS ( DISTINCT ( SELECTCOLUMNS ( _SRm, "m", [m] ) ), "T", VAR _m = [m] RETURN CONCATENATEX ( FILTER ( _SRm, [m] = _m ), [t], "~", [c] ) ),
    "Ordre", 40 + [m], "Type", "serr", "Texte", [T] )
// ---------- (v2) Séries 2016-N des licences féminines : par fédération (France) et par territoire (toutes fédérations) ----------
VAR _SerF = CONCATENATEX ( CALCULATETABLE ( ADDCOLUMNS ( SUMMARIZE ( F_Licences, F_Licences[CodeReference] ),
    "s", CONCATENATEX ( _Annees, VAR _a = [a] VAR _v = CALCULATE ( SUM ( F_Licences[NbLicences] ), F_Licences[Annee] = _a ) RETURN IF ( _v > 0, _v ), ",", [a], ASC ) ), REMOVEFILTERS (), F_Licences[Sexe] = "F" ),
    F_Licences[CodeReference] & "|" & [s], "~", F_Licences[CodeReference] )
VAR _SerTF = CONCATENATEX ( CALCULATETABLE ( ADDCOLUMNS ( SUMMARIZE ( F_Licences, F_Licences[Code_DEP] ),
    "s", CONCATENATEX ( _Annees, VAR _a = [a] VAR _v = CALCULATE ( SUM ( F_Licences[NbLicences] ), F_Licences[Annee] = _a ) RETURN IF ( _v > 0, _v ), ",", [a], ASC ) ), REMOVEFILTERS (), F_Licences[Sexe] = "F" ),
    F_Licences[Code_DEP] & "|" & [s], "~", F_Licences[Code_DEP] )
// ---------- (v2) Pyramides N : 17 tranches de 5 ans (0-4 … 80+), femmes puis hommes ----------
VAR _Bins = SELECTCOLUMNS ( GENERATESERIES ( 0, 16 ), "b", [Value] )
VAR _PyrF = CONCATENATEX ( CALCULATETABLE ( ADDCOLUMNS ( SUMMARIZE ( F_Licences, F_Licences[CodeReference] ),
    "s", CONCATENATEX ( _Bins, VAR _b = [b] VAR _v = CALCULATE ( SUM ( F_Licences[NbLicences] ), F_Licences[Sexe] = "F", F_Licences[Age] >= _b * 5, OR ( _b = 16, F_Licences[Age] < _b * 5 + 5 ) ) RETURN IF ( _v > 0, _v ), ",", [b], ASC )
      & "," & CONCATENATEX ( _Bins, VAR _b = [b] VAR _v = CALCULATE ( SUM ( F_Licences[NbLicences] ), F_Licences[Sexe] = "H", F_Licences[Age] >= _b * 5, OR ( _b = 16, F_Licences[Age] < _b * 5 + 5 ) ) RETURN IF ( _v > 0, _v ), ",", [b], ASC ) ),
    REMOVEFILTERS (), F_Licences[Annee] = _N ), F_Licences[CodeReference] & "|" & [s], "~", F_Licences[CodeReference] )
VAR _PyrT = CONCATENATEX ( CALCULATETABLE ( ADDCOLUMNS ( SUMMARIZE ( F_Licences, F_Licences[Code_DEP] ),
    "s", CONCATENATEX ( _Bins, VAR _b = [b] VAR _v = CALCULATE ( SUM ( F_Licences[NbLicences] ), F_Licences[Sexe] = "F", F_Licences[Age] >= _b * 5, OR ( _b = 16, F_Licences[Age] < _b * 5 + 5 ) ) RETURN IF ( _v > 0, _v ), ",", [b], ASC )
      & "," & CONCATENATEX ( _Bins, VAR _b = [b] VAR _v = CALCULATE ( SUM ( F_Licences[NbLicences] ), F_Licences[Sexe] = "H", F_Licences[Age] >= _b * 5, OR ( _b = 16, F_Licences[Age] < _b * 5 + 5 ) ) RETURN IF ( _v > 0, _v ), ",", [b], ASC ) ),
    REMOVEFILTERS (), F_Licences[Annee] = _N ), F_Licences[Code_DEP] & "|" & [s], "~", F_Licences[Code_DEP] )
// ---------- (v3) Séries 2016-N par grande tranche d'âge (1 enfants, 2 jeunes, 3 adultes, 4 seniors) : code|t1;t2;t3;t4 (années séparées par des virgules) ----------
VAR _Tr = { "1", "2", "3", "4" }
VAR _SerTr = CONCATENATEX ( CALCULATETABLE ( ADDCOLUMNS ( SUMMARIZE ( F_Licences, F_Licences[CodeReference] ),
    "s", CONCATENATEX ( _Tr, VAR _g = [Value] RETURN CONCATENATEX ( _Annees, VAR _a = [a] VAR _v = CALCULATE ( SUM ( F_Licences[NbLicences] ), F_Licences[Annee] = _a, LEFT ( F_Licences[GrandeTrancheAge], 1 ) = _g ) RETURN IF ( _v > 0, _v ), ",", [a], ASC ), ";", [Value], ASC ) ),
    REMOVEFILTERS () ), F_Licences[CodeReference] & "|" & [s], "~", F_Licences[CodeReference] )
VAR _SerTTr = CONCATENATEX ( CALCULATETABLE ( ADDCOLUMNS ( SUMMARIZE ( F_Licences, F_Licences[Code_DEP] ),
    "s", CONCATENATEX ( _Tr, VAR _g = [Value] RETURN CONCATENATEX ( _Annees, VAR _a = [a] VAR _v = CALCULATE ( SUM ( F_Licences[NbLicences] ), F_Licences[Annee] = _a, LEFT ( F_Licences[GrandeTrancheAge], 1 ) = _g ) RETURN IF ( _v > 0, _v ), ",", [a], ASC ), ";", [Value], ASC ) ),
    REMOVEFILTERS () ), F_Licences[Code_DEP] & "|" & [s], "~", F_Licences[Code_DEP] )
// ---------- (v5) Champ constant : licences des fédérations hors champ constant (présentes certaines années seulement) par département ----------
// code|licences|licences féminines|t1;t2;t3;t4 (séries 2016-N) ; l'assistant les retire des séries des territoires pour calculer les évolutions (méthode INJEP)
VAR _HC = CONCATENATEX ( CALCULATETABLE ( ADDCOLUMNS ( SUMMARIZE ( F_Licences, F_Licences[Code_DEP] ),
    "s", CONCATENATEX ( _Annees, VAR _a = [a] VAR _v = CALCULATE ( SUM ( F_Licences[NbLicences] ), F_Licences[Annee] = _a ) RETURN IF ( _v > 0, _v ), ",", [a], ASC ),
    "sf", CONCATENATEX ( _Annees, VAR _a = [a] VAR _v = CALCULATE ( SUM ( F_Licences[NbLicences] ), F_Licences[Annee] = _a, F_Licences[Sexe] = "F" ) RETURN IF ( _v > 0, _v ), ",", [a], ASC ),
    "st", CONCATENATEX ( _Tr, VAR _g = [Value] RETURN CONCATENATEX ( _Annees, VAR _a = [a] VAR _v = CALCULATE ( SUM ( F_Licences[NbLicences] ), F_Licences[Annee] = _a, LEFT ( F_Licences[GrandeTrancheAge], 1 ) = _g ) RETURN IF ( _v > 0, _v ), ",", [a], ASC ), ";", [Value], ASC ) ),
    REMOVEFILTERS (), T_Federation[Champ constant] = "Non" ), F_Licences[Code_DEP] & "|" & [s] & "|" & [sf] & "|" & [st], "~", F_Licences[Code_DEP] )
// ---------- Infos générales : année N|année de référence|première année|date de mise à jour ----------
VAR _Meta = _N & "|" & _AnRef & "|" & MINX ( _Annees, [a] ) & "|" & [Date MAJ]
VAR _Fixe = {
    ( 0, "meta", _Meta ), ( 1, "fed", _Fed ), ( 2, "ter", _Ter ), ( 3, "ser", _Ser ), ( 4, "sert", _SerT ), ( 5, "pro", _Pro ), ( 6, "prot", _ProT ),
    ( 7, "serf", _SerF ), ( 8, "sertf", _SerTF ), ( 9, "pyr", _PyrF ), ( 10, "pyrt", _PyrT ),
    ( 11, "sertr", _SerTr ), ( 12, "serttr", _SerTTr ), ( 13, "serhc", _HC ),
    ( 90, "ui", BLANK () ), ( 91, "txt", BLANK () ), ( 92, "txt", BLANK () ), ( 95, "js", BLANK () ), ( 96, "js", BLANK () ), ( 97, "js", BLANK () ), ( 98, "js", BLANK () )
}
RETURN UNION ( SELECTCOLUMNS ( _Fixe, "Ordre", [Value1], "Type", [Value2], "Texte", [Value3] ), _Cube, _SerR )
```

</details>

## T_CarteAffichage

Liaison territoire du segment (P_TerrChoix[Id territoire], relation) × niveau affiché (1 = régions, 2 = départements) → contours à afficher (Id carte du GeoJSON) et leur rôle : Zone (remplie), Sélection (remplie + contour mis en évidence), Contour (contour seul). Aucune ligne pour DROM, COM et AUT (hors carte).

**Type** : Table calculée (DAX)

| Colonne | Type | Masquée | Description |
|---|---|:-:|---|
| `Id territoire` |  |  | Territoire du segment (relation vers P_TerrChoix). |
| `Niveau affiché` |  |  | 1 = régions, 2 = départements. |
| `Id carte` |  |  | Zone du GeoJSON à dessiner. |
| `Rôle` |  |  | Zone, Sélection ou Contour. |
| `Latitude` |  |  | Point intérieur de la zone (Azure Maps). |
| `Longitude` |  |  | Point intérieur de la zone (Azure Maps). |

<details><summary>Expression DAX</summary>

```dax
-- Territoires du segment : TOT, MDR, MET, DROM, COM, AUT et les régions de métropole (R + code région)
-- Groupe d'une zone : METRO, DROM, COM ou AUT (Monaco, Étranger, Non réparti)
-- Zones affichées selon le territoire choisi :
--   TOT = tout | MDR = métropole + DROM | MET = métropole seule | une région de métropole = métropole seule
--   DROM = DROM seuls | COM = COM seuls | AUT = Autres seuls (Monaco, Étranger, Non réparti)
-- Outre-mer : toujours dessiné par territoire (D-97x, D-98x) avec son propre indicateur, y compris les COM sur TOT ;
--   seul l'encart Autres est un carré unique (R-AUT) au niveau région sur TOT ; au niveau département, 3 carrés (D-980, D-ETR, D-NR)
VAR Totaux  = {"TOT", "MDR", "MET"}
VAR Groupes = {"DROM", "COM", "AUT"}
VAR Zones0  = SELECTCOLUMNS(T_CarteZone, "Id carte", T_CarteZone[Id carte], "@niv", T_CarteZone[Ordre niveau], "@code", T_CarteZone[Code_GDEREG], "Latitude", T_CarteZone[Latitude], "Longitude", T_CarteZone[Longitude])
VAR Zones   =
    ADDCOLUMNS(Zones0,
        "@reg", "R" & [@code],
        "@grp", SWITCH(TRUE(), [@code] IN {"01", "02", "03", "04", "05", "06"}, "DROM", [@code] = "COM", "COM", [@code] IN {"980", "ETR", "NR", "AUT"}, "AUT", "METRO"))
VAR Choix   =
    UNION(
        SELECTCOLUMNS(UNION(Totaux, Groupes), "Id territoire", [Value]),
        SELECTCOLUMNS(FILTER(Zones, [@niv] = 1 && [@grp] = "METRO"), "Id territoire", [@reg]))
VAR Combi   =
    FILTER(CROSSJOIN(Choix, Zones),
        SWITCH([Id territoire],
            "TOT", TRUE(),
            "MDR", [@grp] IN {"METRO", "DROM"},
            "MET", [@grp] = "METRO",
            "DROM", [@grp] = "DROM",
            "COM", [@grp] = "COM",
            "AUT", [@grp] = "AUT",
            [@grp] = "METRO"))
-- Niveau affiché 1 : régions de métropole ; DROM et COM par territoire ; Autres en R-AUT sur TOT, par territoire sinon ; le territoire choisi (région ou groupe) a le rôle Sélection
VAR NivRegion =
    SELECTCOLUMNS(
        FILTER(Combi, IF([@grp] = "METRO" || ([Id territoire] = "TOT" && [@grp] IN {"DROM", "AUT"}), [@niv] = 1, [@niv] = 2)),
        "Id territoire", [Id territoire], "Niveau affiché", 1, "Id carte", [Id carte],
        "Rôle", IF([@reg] = [Id territoire] || [@grp] = [Id territoire], "Sélection", "Zone"),
        "Latitude", [Latitude], "Longitude", [Longitude])
-- Niveau affiché 2 : uniquement des départements (tous les visibles pour les totaux, ceux du territoire choisi sinon) ; pas de contour de région
VAR NivDep =
    SELECTCOLUMNS(
        FILTER(Combi, [@niv] = 2 && ([Id territoire] IN Totaux || [@reg] = [Id territoire] || [@grp] = [Id territoire])),
        "Id territoire", [Id territoire], "Niveau affiché", 2, "Id carte", [Id carte],
        "Rôle", "Zone",
        "Latitude", [Latitude], "Longitude", [Longitude])
RETURN UNION(NivRegion, NivDep)
```

</details>

## T_CarteIndicateur

Liste des indicateurs de la carte (segment déroulant sur la carte).

**Type** : Table calculée (DAX)

| Colonne | Type | Masquée | Description |
|---|---|:-:|---|
| `Ordre` | int64 | oui | Ordre d'affichage. |
| `Indicateur` | string |  | Indicateur de la carte (Licences, évolutions, part des femmes, indice de spécificité, licences pour 1 000 hab.). |

<details><summary>Expression DAX</summary>

```dax
DATATABLE("Ordre", INTEGER, "Indicateur", STRING, {{1, "Licences"}, {2, "Évolution sur 1 an"}, {3, "Évolution depuis 2019"}, {4, "Part des femmes"}, {5, "Indice de spécificité"}, {6, "Licences pour 1 000 hab."}})
```

</details>

## T_CarteZone

Zones du fichier de contours Cartes/Contours_France_regions_departements.geojson (propriété id_carte = Id carte) : 13 régions (R-code région INSEE) et 96 départements (D-code département) de métropole. Uniquement des codes : Code_DEP / Code_GDEREG de T_Territoire. Latitude/longitude = point intérieur de la forme.

**Type** : Table calculée (DAX)

| Colonne | Type | Masquée | Description |
|---|---|:-:|---|
| `Id carte` |  |  | Identifiant de la zone dans le GeoJSON (propriété id_carte) : R-xx région, D-xx département. |
| `Niveau` |  |  | Région ou Département. |
| `Ordre niveau` |  |  | 1 = région, 2 = département. |
| `Code_DEP` |  |  | Code département (zones départementales). |
| `Code_GDEREG` |  |  | Code région / groupe (01-06 DROM, COM, AUT...). |
| `Latitude` |  |  | Point intérieur de la zone. |
| `Longitude` |  |  | Point intérieur de la zone. |

<details><summary>Expression DAX</summary>

```dax
-- Zones du fichier de contours (Id carte = propriété id_carte du GeoJSON) et point intérieur
-- Métropole : 13 régions et 96 départements. Hors métropole (encarts à côté de la France) : DROM (R-01 à R-06, D-971 à D-976), COM (R-COM, D-975/977/978/986/987/988), Autres = Monaco, Étranger, Non réparti (1 carré R-AUT au niveau région, 3 carrés D-980, D-ETR, D-NR au niveau département).
VAR BaseMetropole = DATATABLE("Id carte", STRING, "Latitude", DOUBLE, "Longitude", DOUBLE, {{"R-11",48.675,2.531},{"R-24",47.643,1.716},{"R-27",47.274,4.954},{"R-28",49.122,0.023},{"R-32",49.963,2.890},{"R-44",48.800,5.758},{"R-52",47.419,-1.144},{"R-53",48.158,-2.675},{"R-75",44.977,0.107},{"R-76",43.689,2.119},{"R-84",45.449,4.804},{"R-93",44.078,6.230},{"R-94",42.176,9.071},{"D-01",46.057,5.280},{"D-02",49.460,3.592},{"D-03",46.368,3.156},{"D-04",44.165,6.177},{"D-05",44.657,6.352},{"D-06",43.923,7.241},{"D-07",44.818,4.404},{"D-08",49.696,4.669},{"D-09",42.947,1.408},{"D-10",48.314,4.196},{"D-11",43.061,2.516},{"D-12",44.314,2.508},{"D-13",43.537,5.379},{"D-14",49.095,-0.239},{"D-15",45.044,2.701},{"D-16",45.665,0.101},{"D-17",45.724,-0.829},{"D-18",47.032,2.565},{"D-19",45.338,1.815},{"D-21",47.470,4.754},{"D-22",48.454,-2.755},{"D-23",46.067,2.049},{"D-24",45.148,0.633},{"D-25",47.061,6.240},{"D-26",44.738,5.200},{"D-27",49.075,0.987},{"D-28",48.446,1.405},{"D-29",48.247,-4.047},{"D-2A",41.873,9.009},{"D-2B",42.419,9.099},{"D-30",43.957,4.296},{"D-31",43.306,0.971},{"D-32",43.687,0.404},{"D-33",44.892,-0.602},{"D-34",43.594,3.377},{"D-35",48.162,-1.652},{"D-36",46.812,1.535},{"D-37",47.229,0.685},{"D-38",45.292,5.637},{"D-39",46.781,5.783},{"D-40",44.028,-0.634},{"D-41",47.659,1.303},{"D-42",45.754,4.051},{"D-43",45.095,3.844},{"D-44",47.345,-1.879},{"D-45",47.910,2.300},{"D-46",44.627,1.664},{"D-47",44.370,0.453},{"D-48",44.537,3.523},{"D-49",47.396,-0.391},{"D-50",49.099,-1.244},{"D-51",48.963,4.320},{"D-52",48.136,5.257},{"D-53",48.143,-0.656},{"D-54",48.957,5.985},{"D-55",49.010,5.427},{"D-56",47.820,-2.791},{"D-57",49.017,6.545},{"D-58",47.120,3.545},{"D-59",50.531,3.083},{"D-60",49.420,2.408},{"D-61",48.579,0.044},{"D-62",50.521,2.230},{"D-63",45.771,3.082},{"D-64",43.186,-0.730},{"D-65",43.144,0.160},{"D-66",42.622,2.507},{"D-67",48.597,7.532},{"D-68",47.866,7.236},{"D-69",45.879,4.615},{"D-70",47.642,6.098},{"D-71",46.658,4.558},{"D-72",48.029,0.245},{"D-73",45.495,6.380},{"D-74",46.047,6.345},{"D-75",48.861,2.321},{"D-76",49.661,0.938},{"D-77",48.617,3.035},{"D-78",48.764,1.897},{"D-79",46.541,-0.300},{"D-80",49.962,2.373},{"D-81",43.790,2.132},{"D-82",44.083,1.205},{"D-83",43.416,6.268},{"D-84",44.002,5.183},{"D-85",46.675,-1.293},{"D-86",46.613,0.463},{"D-87",45.921,1.207},{"D-88",48.160,6.378},{"D-89",47.853,3.645},{"D-90",47.631,6.900},{"D-91",48.529,2.232},{"D-92",48.845,2.197},{"D-93",48.909,2.455},{"D-94",48.778,2.464},{"D-95",49.068,2.212}})
VAR BaseHorsMetropole = DATATABLE("Id carte", STRING, "Latitude", DOUBLE, "Longitude", DOUBLE, {{"R-01",49.922,-8.033},{"R-02",47.218,-7.726},{"R-03",44.814,-7.670},{"R-04",46.129,-7.710},{"R-06",48.556,-7.702},{"R-COM",49.955,10.204},{"R-AUT",43.200,-7.700},{"D-971",49.922,-8.033},{"D-972",47.218,-7.726},{"D-973",44.814,-7.670},{"D-974",46.129,-7.710},{"D-976",48.556,-7.702},{"D-975",49.955,10.204},{"D-977",48.900,10.300},{"D-978",47.869,10.318},{"D-986",46.889,9.963},{"D-987",45.755,10.445},{"D-988",44.700,10.201},{"D-980",43.200,-8.600},{"D-ETR",43.200,-7.700},{"D-NR",43.200,-6.800}})
VAR Base = UNION(BaseMetropole, BaseHorsMetropole)
VAR Ref = ALLNOBLANKROW(T_Territoire[Code_DEP], T_Territoire[Code_GDEREG])
RETURN
    SELECTCOLUMNS(Base,
        "Id carte", [Id carte],
        "Niveau", IF(LEFT([Id carte], 1) = "R", "Région", "Département"),
        "Ordre niveau", IF(LEFT([Id carte], 1) = "R", 1, 2),
        "Code_DEP", IF(LEFT([Id carte], 1) = "D", MID([Id carte], 3, 3)),
        "Code_GDEREG",
            VAR c = MID([Id carte], 3, 3)
            RETURN IF(LEFT([Id carte], 1) = "R", c, MAXX(FILTER(Ref, T_Territoire[Code_DEP] = c), T_Territoire[Code_GDEREG])),
        "Latitude", [Latitude],
        "Longitude", [Longitude])
```

</details>

## T_CarteZoneDep

Liaison zone de carte (Id carte) → départements (T_Territoire[Code_DEP]) : D-31 → 31 ; R-76 → ses départements de métropole. Utilisée uniquement par Carte Valeur (TREATAS) et Carte Rôle.

**Type** : Table calculée (DAX)

| Colonne | Type | Masquée | Description |
|---|---|:-:|---|
| `Id carte` |  |  | Zone de la carte. |
| `Code_DEP` |  |  | Département couvert par la zone. |

<details><summary>Expression DAX</summary>

```dax
-- Toutes les zones de la carte (métropole, DROM, COM, Autres) → leurs codes département ; R-AUT regroupe Monaco, Étranger et Non réparti
VAR Ref = SELECTCOLUMNS(ALLNOBLANKROW(T_Territoire[Code_DEP], T_Territoire[Code_GDEREG]), "@dep", T_Territoire[Code_DEP], "@reg", T_Territoire[Code_GDEREG])
VAR Zones = SELECTCOLUMNS(T_CarteZone, "Id carte", T_CarteZone[Id carte], "@niv", T_CarteZone[Ordre niveau], "@code", COALESCE(T_CarteZone[Code_DEP], T_CarteZone[Code_GDEREG]))
RETURN
    SELECTCOLUMNS(
        FILTER(CROSSJOIN(Zones, Ref),
            IF([@niv] = 1,
                IF([@code] = "AUT", [@reg] IN {"980", "ETR", "NR"}, [@reg] = [@code]),
                [@dep] = [@code])),
        "Id carte", [Id carte],
        "Code_DEP", [@dep])
```

</details>

## T_Federation

Dimension Fédération (référentiel Excel data/Referentiel_Excel.xlsx, onglet T_Federation). Le classeur est synchronisé avec les vues SQL (fonction Power Query fnSynchro du classeur) puis enrichi à la main : famille, sous-famille, groupe, logo. Clé : CodeReference. Nom court calculé en Power Query.

**Type** : Power Query (M)

| Colonne | Type | Masquée | Description |
|---|---|:-:|---|
| `CodeReference` | string |  | Code fédération (clé, texte). Relie F_Licences, P_Federation et P_Appartenance. |
| `Federation` | string |  | Libellé officiel de la fédération (source INJEP). |
| `Famille de fédérations` | string |  | Famille (saisie dans le référentiel Excel). |
| `Sous-famille de fédérations` | string |  | Sous-famille (saisie dans le référentiel Excel). |
| `Groupe de fédérations` | string |  | Groupe : Olympique, Délégataire non-olympique, Affinitaire, Para-sport, Scolaire. |
| `Fichier logo` | string |  | Nom du fichier logo (assets/logos), saisi dans le référentiel Excel. |
| `Nom court` | string |  | Nom de la fédération sans le préfixe « Fédération Française de … » (calculé dans Power Query). Utilisé dans les segments, titres et légendes. |
| `Logo URL` | string (calculée) | oui | Adresse complète du logo = [Logo URL base] + Fichier logo (ou Fichier logo s'il contient déjà une adresse http). |
| `Champ constant` | string (calculée) |  | Oui si la fédération a des licences chaque année de la période (champ constant de l'INJEP : 109 fédérations sur 2016-2025). Non pour les fédérations entrées en cours de période (licences annuelles depuis 2022 ou 2023) ou sorties. Les évolutions des regroupements, des territoires et du total se calculent sur les seules fédérations Oui ; les volumes portent sur toutes les fédérations. Calcul automatique, mis à jour avec les nouvelles années. |

## T_MAJ

Date de dernière actualisation du modèle (NOW() recalculé à chaque actualisation). Utilisée par la mesure Date MAJ.

**Type** : Table calculée (DAX)

| Colonne | Type | Masquée | Description |
|---|---|:-:|---|
| `Actualisé le` |  |  | Date et heure de la dernière actualisation (NOW()). |

<details><summary>Expression DAX</summary>

```dax
-- Date et heure de la dernière actualisation du modèle (recalculée à chaque actualisation)
ROW("Actualisé le", NOW())
```

</details>

## T_NiveauGeo

Liste du segment Niveau géo de la carte (sans relation) : 1 = Région, 2 = Département. Lu par la mesure Carte Niveau ; un département choisi force le niveau 2.

**Type** : Table calculée (DAX)

| Colonne | Type | Masquée | Description |
|---|---|:-:|---|
| `Niveau géo` |  |  | Région ou Département. |
| `Ordre` |  | oui | 1 = Région, 2 = Département. |

<details><summary>Expression DAX</summary>

```dax
DATATABLE("Niveau géo", STRING, "Ordre", INTEGER, {{"Région", 1}, {"Département", 2}})
```

</details>

## T_Sexe

Dimension Sexe (référentiel Excel, onglet T_Sexe) : F, H, NR - Non réparti. La colonne Genre (Femmes, Hommes, Non réparti) alimente le segment Public.

**Type** : Power Query (M)

| Colonne | Type | Masquée | Description |
|---|---|:-:|---|
| `Sexe` | string |  | Code source : F, H, NR - Non réparti (clé). |
| `Ordre` | string | oui | Ordre d'affichage. |
| `Genre` | string (calculée) |  | Libellé affiché : Femmes, Hommes, Non réparti. |

## T_Territoire

Dimension Territoire (référentiel Excel, onglet T_Territoire) : un département par ligne, avec sa région, ses codes (Code_DEP, Code_GDEREG) et ses zones de segment. Clé des relations : Code_DEP.

**Type** : Power Query (M)

| Colonne | Type | Masquée | Description |
|---|---|:-:|---|
| `Departement` | string |  | Libellé source du département (« 01 - Ain »). |
| `Region` | string |  | Libellé source de la région (« 84 - Auvergne-Rhône-Alpes »). |
| `Code_DEP` | string |  | Code département (clé des relations). |
| `Code_GDEREG` | string |  | Code région INSEE, ou groupe hors métropole (01-06 DROM, COM, 980, ETR, NR). |
| `Zone_Slicer` | string |  | Libellé de la zone pour les segments. |
| `GD_Zone_Slicer` | string |  | Grande zone : Métropole, DROM, COM, Autres. |
| `GD_Zone_Slicer_Ordre` | string |  | 1 = Métropole, 2 = DROM, 3 = COM, 4-5 = Autres (Monaco, Étranger, Non réparti). |

## T_TrancheAge

Dimension Grande tranche d'âge (référentiel Excel, onglet T_TrancheAge) : Enfants (1-13), Jeunes (14-20), Adultes (21-55), Seniors (56-99), Non réparti. Reliée à F_Licences[GrandeTrancheAge].

**Type** : Power Query (M)

| Colonne | Type | Masquée | Description |
|---|---|:-:|---|
| `TrancheAge` | string |  | Grande tranche d'âge (clé, libellé source). |
| `Ordre` | string | oui | Ordre d'affichage. |
| `Catégorie d'âge` | string (calculée) |  | Libellé affiché (sans le préfixe numérique). |

## T_VueEvol

Bascule du graphique d'évolution (segment en tuiles) : Volume ou Base 100.

**Type** : Table calculée (DAX)

| Colonne | Type | Masquée | Description |
|---|---|:-:|---|
| `Ordre` | int64 | oui | Ordre d'affichage. |
| `Vue` | string |  | Volume ou Base 100. |

<details><summary>Expression DAX</summary>

```dax
DATATABLE("Ordre", INTEGER, "Vue", STRING, {{1, "Volume"}, {2, "Base 100"}})
```

</details>
