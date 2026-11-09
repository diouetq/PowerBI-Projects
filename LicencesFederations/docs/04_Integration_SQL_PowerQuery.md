# 04 · Intégration SQL et Power Query

Chaîne d'alimentation complète, du fichier INJEP au modèle Power BI.

```
data/2025/Lics_*.csv ──BULK INSERT──▶ stg.Licences_Brut ──typage──▶ dbo.Licences_Federation ──▶ Power BI (F_Licences)
                                                                        │
                                                                        └─▶ vw_Dim_* ──fnSynchro──▶ Referentiel_Excel.xlsx ──▶ Power BI (dimensions)
data/estim-pop-dep-sexe-aq-1975-2026.xlsx ───────────────────────────────────────────────────────────▶ Power BI (F_Population)
```

> **Note sur les scripts SQL**
> Le script d'intégration d'origine a été perdu.
> Les scripts du dossier [`sql/`](../sql/) ont été **reconstruits le 06/11/2026**, à partir de la structure réelle des 10 CSV, des colonnes et des volumes de `F_Licences` (8 211 478 lignes) et des noms de vues appelés par le référentiel Excel.
> Ils produisent la même table. Les noms internes (schéma `stg`, procédures, journal) sont des choix de reconstruction.
> La requête Power Query de synchronisation du référentiel (`fnSynchro`), elle, est **d'origine** : elle a été extraite telle quelle du classeur.

---

## 1. Fichiers source

| Fichier | Année | Statut | Lignes | Licences |
|---|---|---|---:|---:|
| Lics_2016_semidef.csv | 2016 | semi-définitif | 805 190 | 16 219 479 |
| Lics_2017_semidef.csv | 2017 | semi-définitif | 805 866 | 16 370 803 |
| Lics_2018_semidef.csv | 2018 | semi-définitif | 824 528 | 16 257 182 |
| Lics_2019_def.csv | 2019 | définitif | 823 217 | 16 259 965 |
| Lics_2020_def.csv | 2020 | définitif | 811 589 | 15 715 215 |
| Lics_2021_def.csv | 2021 | définitif | 756 350 | 12 841 261 |
| Lics_2022_def.csv | 2022 | définitif | 824 562 | 15 291 830 |
| Lics_2023_def.csv | 2023 | définitif | 847 477 | 16 535 056 |
| Lics_2024_semidef.csv | 2024 | semi-définitif | 857 945 | 17 162 623 |
| Lics_2025_semidef.csv | 2025 | semi-définitif | 854 754 | 17 456 435 |
| **Total** | | | **8 211 478** | |

**Format** : UTF-8 avec BOM, séparateur `;`, champs entre guillemets, 12 colonnes :
`Code 2025 ; Code année N ; Codes 2016-2025 ; Fédération ; Année ; Sexe ; Age ; TrancheAge ; GrandeTrancheAge ; Région ; Département ; Licences annuelles`.

⚠️ Les fichiers **2019 à 2023** commencent par `Code année N ; Code 2025`, avec les deux premières colonnes inversées. Le chargement en tient compte.

Les valeurs inconnues sont codées `NR - Non réparti` (sexe, âge, tranches, département).

---

## 2. Scripts SQL ([`sql/`](../sql/))

| Script | Rôle |
|---|---|
| `01_creation_structure.sql` | Base `BDD` en collation UTF-8. Schéma `stg` et table brute `stg.Licences_Brut` (12 colonnes texte). Table typée `dbo.Licences_Federation` avec **index columnstore cluster**. Journal `dbo.Journal_Chargement` |
| `02_chargement_csv.sql` | `dbo.usp_Charger_Fichier_Licences` : BULK INSERT (SQL dynamique), statut et année tirés du nom de fichier, remise en ordre des colonnes de code, typage (`TRY_CAST` : âge `NR` → `NULL`), suppression puis réinsertion des lignes du fichier (**idempotent**), journalisation, transaction et `TRY…CATCH`. `dbo.usp_Charger_Millesime_Licences` : boucle sur les 10 fichiers et réorganise le columnstore |
| `03_vues_dimensions.sql` | `vw_Dim_Federation` (libellé le plus récent par code, avec `ROW_NUMBER`), `vw_Dim_Territoire`, `vw_Dim_Sexe`, `vw_Dim_TrancheAge`, `vw_Dim_Annee` |
| `04_controles_qualite.sql` | Volumes par fichier (valeurs de référence incluses), cohérence des codes 2025, valeurs hors domaine, unicité du grain, part des non-répartis par année, dernier état du journal |

### Table `dbo.Licences_Federation`

| Colonne | Type | Origine |
|---|---|---|
| Annee | SMALLINT | colonne Année |
| Statut | VARCHAR(10) | nom du fichier (`def` / `semidef`) |
| MillesimeReference | SMALLINT | paramètre (2025) |
| CodeReference | VARCHAR(20) | Code 2025 |
| CodeAnneeN | VARCHAR(20) | Code année N |
| CodesHistorique | VARCHAR(100) | Codes 2016-2025 |
| Federation | NVARCHAR(200) | Fédération |
| Sexe | NVARCHAR(30) | Sexe |
| Age | TINYINT NULL | Age (`NR` → NULL) |
| TrancheAge / GrandeTrancheAge | NVARCHAR(50) | tranches |
| Region / Departement | NVARCHAR(100) | libellés « code - nom » |
| NbLicences | INT | Licences annuelles |
| Fichier | VARCHAR(50) | traçabilité |
| DateChargement | DATETIME2 | horodatage |

---

## 3. Référentiel Excel synchronisé

Fichier : `data/Referentiel_Excel.xlsx`, avec 5 onglets (`T_Federation`, `T_Territoire`, `T_Sexe`, `T_TrancheAge`, `T_Annee`).
Code : [`powerquery/referentiel_excel/Synchro_SQL_vers_Excel.pq`](../powerquery/referentiel_excel/Synchro_SQL_vers_Excel.pq).

```m
shared T_Federation = fnSynchro("vw_Dim_Federation", "T_Federation", "CodeReference");
shared T_Territoire = fnSynchro("vw_Dim_Territoire", "T_Territoire", "Departement");
```

`fnSynchro(vueSql, nomTable, cle)` :

1. lit la vue SQL et le tableau Excel actuel (`Excel.CurrentWorkbook`) ;
2. fait une jointure externe gauche sur la clé : les lignes **présentes** reçoivent les colonnes SQL à jour et `EnBase = "Oui"`, les lignes **disparues** sont gardées avec `EnBase = "Non"` ;
3. ajoute **en fin de tableau** les nouvelles clés, triées ;
4. renvoie les lignes **dans l'ordre d'origine** (index `_pos`). Les colonnes manuelles placées à droite (familles, logos, codes, zones) restent alignées.

Dans Excel, les colonnes calculées (`Code_DEP = GAUCHE(Departement; …)`, familles en formules matricielles) complètent le tableau.

---

## 4. Requêtes Power Query du modèle

Code complet et commenté : dossier [`powerquery/`](../powerquery/), un fichier par requête, régénéré par `tools/generer_documentation.py`.

| Requête | Groupe | Source | Points clés |
|---|---|---|---|
| `Dossier` | Paramètres | — | Chemin du dossier `data/` (à adapter après clonage) |
| `fnLireReferentiel` | Fonctions | Excel | Lecture d'un onglet : en-têtes, erreurs → null, marqueurs `NA`, `N/A`, `n.d` → null, retrait de colonnes techniques. **Une seule logique** pour les 5 dimensions |
| `T_Federation` | Dimensions | Excel | `fnLireReferentiel` + **Nom court** (suppression du préfixe « Fédération Française de … » par une liste ordonnée de préfixes) |
| `T_Territoire`, `T_Sexe`, `T_TrancheAge`, `T_Annee` | Dimensions | Excel | `fnLireReferentiel(onglet, {"EnBase"})` |
| `F_Licences` | Faits | SQL Server | Navigation vers `dbo.Licences_Federation`, **sélection des seules colonnes utiles** (repli de requête → SELECT réduit), clé `Code_DEP` extraite du libellé, libellé supprimé |
| `F_Population` | — | Excel Insee | Fonction locale `Lire(an)` sur les onglets 2016-2025. Chaque ligne départementale est transformée en 40 lignes (2 sexes × 20 tranches) par `List.Transform` sur les positions de colonnes |
| `P_Federation` | — | T_Federation | Dépivotage des 3 niveaux, clé `F · `, `SF · ` ou `G · `, puis **pivot** : une colonne par regroupement, contenant les noms courts |
| `P_Niveaux` | — | T_Federation | Liste unique des regroupements, ligne « Ensemble » et colonnes d'ordre (Ensemble en tête, puis tri alphabétique `fr-FR`) |
| `P_Appartenance` | — | T_Federation | Table pont `Cle` ↔ `CodeReference` (+ « Ensemble ») |
| `Code_Param_Federation` | — | T_Federation | **Générateur de code** : produit le DAX de la table calculée `Param_Federation`. Utilisé après un changement de regroupements (non chargé) |

### Exemple : `F_Licences`

```m
let
    Source      = Sql.Database("diouet", "BDD"),
    Licences    = Source{[Schema = "dbo", Item = "Licences_Federation"]}[Data],
    // Colonnes utiles au modèle uniquement (repli de requête : le SELECT est limité côté SQL)
    Colonnes    = Table.SelectColumns(Licences, {"Annee", "Statut", "MillesimeReference", "CodeReference", "Sexe", "Age",
                      "GrandeTrancheAge", "Departement", "NbLicences", "Fichier"}),
    // Clé territoire stable : code département (« 31 », « 2A », « 971 », « NR »)
    CodeDep     = Table.AddColumn(Colonnes, "Code_DEP", each Text.Trim(Text.BeforeDelimiter(Text.From([Departement]), " - ")), type text),
    SansLibelle = Table.RemoveColumns(CodeDep, {"Departement"})
in
    SansLibelle
```

---

## 5. Tables calculées en DAX

Les tables qui dépendent du modèle plutôt que d'une source (segments territoire, carte, interface) sont calculées en DAX. Elles se recalculent à chaque actualisation, sans requête supplémentaire.
Leurs expressions sont reproduites dans le [dictionnaire de données](02_Dictionnaire_donnees.md).

| Table | Construction |
|---|---|
| `P_TerrChoix` | Totaux fixes (`DATATABLE`) + régions de métropole (`R` + code), libellé indenté pour le segment |
| `P_TerrAppartenance` | `UNION` des appartenances département → TOT, MDR, MET, région, DROM, COM, AUT |
| `P_TerrDep` | Une colonne par territoire (libellé du département s'il y appartient) |
| `Param_Departement`, `Param_Federation`, `Param_Niveau` | Paramètres de champ (`NAMEOF`) |
| `T_CarteZone` | Zones du GeoJSON avec leur point intérieur (`DATATABLE`) |
| `T_CarteZoneDep` | Zone → départements (`CROSSJOIN` filtré) |
| `T_CarteAffichage` | Territoire × zone × niveau → zones à dessiner et leur rôle |
| `T_MAJ` | `ROW("Actualisé le", NOW())` |
