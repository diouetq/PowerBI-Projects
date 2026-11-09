# 01 · Conception

Ce document explique **pourquoi** le rapport est construit ainsi : les besoins, les partis pris, puis chaque choix technique avec ses raisons et ses limites.

---

## 1. Besoins

| Besoin | Réponse dans le rapport |
|---|---|
| Voir le poids et la dynamique d'une fédération | Page **Portrait** : 4 chiffres clés (licences, évolution sur 1 an, évolution depuis 2019, poids et rang) |
| Comparer une fédération à sa famille et à l'ensemble | Graphique d'évolution en **base 100** : trois courbes Sélection / Regroupement / Ensemble (groupe de calcul `Comparaison`) |
| Raisonner par familles de sports | Trois niveaux de regroupement saisis dans le référentiel (famille, sous-famille, groupe), avec des segments en cascade |
| Comprendre le public | Bloc **Profil** : part de femmes, âge moyen, grandes catégories d'âge, pyramide des âges |
| Lire la géographie | Carte **Azure Maps** (régions ou départements) avec 6 indicateurs, dont l'**indice de spécificité** et les **licences pour 1 000 habitants** |
| Classer et comparer | Pages **Comparer** : tableaux triables, groupables, avec mini-graphiques |
| Inspirer confiance | Sources citées avec liens, date de mise à jour, mises en garde INJEP, auteur identifié |

## 2. Partis pris

- **Une question par page** : *Portrait* (zoom), *Comparer les fédérations*, *Comparer les territoires* (classements).
- **Panneau de gauche constant** : les mêmes segments, au même endroit, sur toutes les pages (synchronisation des segments).
- **Lecture en « rubriques »** : chaque bloc porte une pastille (COMBIEN, OÙ, QUI, ÉVOLUTION), un titre et un sous-titre qui rappelle la sélection (fédération, territoire, année, public).
- **Pas de « (Vide) » et pas de liste ingérable** : les segments ne montrent que ce qui a du sens dans le contexte (fédérations du regroupement choisi, départements du territoire choisi).
- **Charte sobre « Marine »** : bleu nuit pour la structure, un seul bleu vif pour la sélection, vert et rouge réservés aux hausses et aux baisses, violet et bleu ciel pour femmes et hommes.

## 3. Données

### 3.1 Licences (INJEP-MEDES)

- Une ligne = fédération × année × sexe × âge × région × département, avec le nombre de licences.
- Les codes de fédération changent dans le temps. La colonne **« Code 2025 »** (`CodeReference`) rattache toutes les années à la nomenclature du millésime : c'est la clé du modèle.
- Les **non-répartis** (`NR - Non réparti`) sont conservés. Exclure les non-répartis aurait faussé les évolutions, puisque leur part baisse d'année en année.
- **Piège rencontré** : dans l'archive 2025, l'ordre des deux premières colonnes diffère entre les fichiers définitifs (2019-2023 : *Code année N* puis *Code 2025*) et les autres. Le chargement SQL remet les colonnes en ordre selon le fichier (voir [04](04_Integration_SQL_PowerQuery.md)).

### 3.2 Population (Insee)

- Estimations au 1er janvier par département, sexe et tranche quinquennale (onglets 2016 à 2025 du classeur).
- Usage unique : le dénominateur des **licences pour 1 000 habitants**.
- Quand un filtre d'âge est actif, les grandes catégories d'âge INJEP ne tombent pas exactement sur les tranches quinquennales. Le taux est alors signalé comme **approximatif** dans les infobulles.

### 3.3 Référentiel Excel

Le classeur `data/Referentiel_Excel.xlsx` joue le rôle de **MDM léger**.
Les colonnes « source » viennent des vues SQL, rafraîchies par la fonction Power Query `fnSynchro` du classeur.
Les colonnes « métier » sont saisies à la main : famille, sous-famille, groupe, logo, codes géographiques, zones de segment.
La synchronisation ne détruit jamais une saisie manuelle et garde l'ordre des lignes, ce qui préserve les formules Excel. Elle marque `EnBase = Non` les valeurs disparues de la base.

## 4. Modèle

### 4.1 Étoile

`F_Licences` est au centre, avec 5 dimensions conformes : Fédération, Territoire, Année, Sexe, Tranche d'âge.
`F_Population` partage Territoire, Année et Sexe. Elle n'a ni fédération ni tranche INJEP : les mesures neutralisent ces filtres quand il le faut.

### 4.2 Segments en cascade (paramètres de champ)

| Segment | Table affichée | Mécanisme |
|---|---|---|
| Niveau | `Param_Niveau` | Paramètre de champ qui pointe vers `P_Niveaux[Famille | Sous-famille | Groupe]` |
| Regroupement | `P_Niveaux` (colonne choisie) | Ligne « Ensemble » commune aux trois niveaux, filtre `Filtre Niveau non vide` |
| Fédération | `Param_Federation` → colonnes de `P_Federation` | Une colonne par regroupement contient les noms courts de ses fédérations. Le paramètre est relié 1-1 à `P_Niveaux[Cle]` : choisir un regroupement **change de colonne**, donc la liste se réduit et la sélection précédente est vidée |
| Territoire | `Param_Departement` ↔ `P_TerrChoix` | Clés stables `TOT`, `MDR`, `MET`, `R + code région`, `DROM`, `COM`, `AUT` |
| Département | colonnes de `P_TerrDep` | Une colonne par territoire. Même principe que pour les fédérations |

`P_Appartenance` et `P_TerrAppartenance` sont les **tables ponts** qui propagent le choix d'un regroupement ou d'un territoire vers les fédérations ou les départements. Ce sont les seules relations bidirectionnelles, et elles sont maîtrisées.

### 4.3 Groupe de calcul `Comparaison`

Trois éléments : `Sélection` (mesure inchangée), `Regroupement` (retire les filtres fédération et applique la famille, sous-famille ou groupe de la sélection selon le niveau choisi), `Ensemble` (toutes les fédérations).
Les trois courbes de l'évolution en base 100 sont donc la **même mesure** évaluée dans trois contextes. Aucune logique n'est dupliquée.

### 4.4 Tables d'interface

- `T_AnneeAxe` : copie **déconnectée** des années. Le graphique d'évolution montre toujours 2016-2025, et l'année choisie dans le segment est seulement mise en avant.
- `T_VueEvol`, `T_CarteIndicateur`, `T_NiveauGeo` : listes des segments « bascule », lues par `SELECTEDVALUE` dans les mesures.
- `T_MAJ` : `NOW()` figé à chaque actualisation, pour la mesure `Date MAJ`.

## 5. Mesures DAX

### 5.1 Organisation

102 mesures, toutes dans `_Mesures`, rangées par dossier :

| Dossier | Contenu |
|---|---|
| `00. Charte graphique` | Couleurs, police, tailles, blocs CSS, adresse de base des logos |
| `01. Indicateurs de base` | `NB Licences`, `Licences pour 1 000 hab`, `Population`, `Âge moyen` |
| `02. Évolutions` | Licences N-1, licences 2019, évolutions |
| `03. Publics` | Licences et part des femmes |
| `04. Comparaisons` | Licences de l'ensemble, part, indice de spécificité |
| `05. Sélection et libellés` | Nature et libellé de la sélection, territoire, niveau, date de mise à jour |
| `06. Segments` | Filtres visuels des segments et masquage du segment Niveau géo |
| `07. Page Portrait` | En-tête, chiffres clés, évolution, profil, carte |
| `08. Pages Comparer` | Tableaux de comparaison et leur moteur commun (JS et CSS) |
| `09. Panneau gauche` | Sources et carte auteur |

### 5.2 Règles d'écriture

- **Année de référence** : quand plusieurs années sont sélectionnées, les indicateurs prennent la plus récente (`MAX(T_Annee[Annee])`). Un titre n'est donc jamais faux.
- Variables nommées `_Xxx`, en-tête de commentaire pour chaque mesure longue, réglages regroupés en tête (`-- 1. Réglages`).
- `DIVIDE` systématique. Une évolution n'est affichée que si la base existe (`IF(NOT ISBLANK(...))`).
- Détection de la sélection par `ISFILTERED` (segment touché) ou `ISCROSSFILTERED` (filtré indirectement), en comparant le nombre d'éléments sélectionnés au total. Un segment qui ne restreint rien n'est pas pris pour une sélection.

### 5.3 Indicateurs clés

```dax
-- Indice de spécificité : poids de la sélection dans le territoire / poids en France
Indice de spécificité =
DIVIDE(
    [Part dans l'ensemble],
    CALCULATE([Part dans l'ensemble],
        REMOVEFILTERS(T_Territoire), REMOVEFILTERS(P_TerrChoix), REMOVEFILTERS(P_TerrAppartenance),
        REMOVEFILTERS(P_TerrDep), REMOVEFILTERS(Param_Departement)))

-- Licences pour 1 000 habitants : numérateur limité aux départements couverts par l'Insee
Licences pour 1 000 hab =
VAR _Pop = [Population]
VAR _Lic = CALCULATE([NB Licences], KEEPFILTERS(TREATAS(ALL(F_Population[Code_DEP]), T_Territoire[Code_DEP])))
RETURN IF(NOT ISBLANK(_Pop), DIVIDE(_Lic, _Pop) * 1000)

-- Évolutions à champ constant (méthode INJEP) : base = fédérations présentes chaque année de la période
-- (colonne calculée T_Federation[Champ constant]) ; une sélection sans aucune de ces fédérations garde toutes ses licences
Licences champ constant =
VAR _AvecCC = NOT ISEMPTY(CALCULATETABLE(VALUES(F_Licences[CodeReference]), REMOVEFILTERS(T_Annee), KEEPFILTERS(T_Federation[Champ constant] = "Oui")))
RETURN IF(_AvecCC, CALCULATE([NB Licences], KEEPFILTERS(T_Federation[Champ constant] = "Oui")), [NB Licences])

Évol depuis 2019 = VAR _P = [Licences 2019] RETURN IF(NOT ISBLANK(_P), DIVIDE([Licences champ constant], _P) - 1)
```

**Pourquoi le champ constant.** Sept fédérations n'ont des licences annuelles que depuis 2022 ou 2023 (clubs omnisports, UCPA, sports canins…) et une a cessé en 2025 (jeu de paume). Sans correction, leur entrée ferait monter l'évolution du total sans aucun licencié de plus (+7,4 % au lieu de +7,05 % depuis 2019 ; plus de 2 points pour le groupe Affinitaire). Les chiffres obtenus sont identiques à ceux du fichier INJEP « Évolution des licences 2016-2025 à champ constant ». Les volumes restent sur toutes les fédérations, et chaque visuel affiche la part hors champ constant.

**Carte : évolutions bornées.** Une zone de moins de 20 licences l'année de départ n'a pas d'évolution calculée (pourcentage instable), et l'échelle des couleurs est bornée au 90e centile de chaque côté (légende « ≤ » / « ≥ »).

## 6. Visuels

### 6.1 Pourquoi du HTML

Les visuels natifs ne permettent pas : un en-tête qui combine logo, textes et pastilles conditionnelles ; des cartes de chiffres clés avec comparaison et rang ; des barres empilées avec libellés au-dessus ; des tableaux avec mini-courbes, groupes dépliables et infobulles riches.
Ces blocs sont donc des **mesures qui renvoient du HTML et du SVG**, affichées par le visuel *HTML Content*. Toutes les couleurs et tailles viennent des mesures `Style …` : la charte reste unique.

### 6.2 Tableaux de comparaison

Voir [06 · Visuels HTML et moteur JS](06_Visuels_HTML_JS.md). En résumé :

- la mesure DAX calcule **toutes** les lignes (fédérations ou départements, même à 0) et les **encode** de façon compacte ;
- le moteur JavaScript commun (`HTML Tableau JS`) et la feuille de style commune (`HTML Comparaison CSS`) font le rendu ;
- le mode s'adapte à la sélection : liste quand rien n'est choisi, vue groupée avec dépliage du groupe sélectionné, liste des régions au niveau régional.

### 6.3 Carte

- Contours personnalisés (GeoJSON : 13 régions, 96 départements, et des encarts pour les DROM, les COM et les « Autres »), reliés par `Id carte`.
- `T_CarteAffichage` décide des zones visibles selon le territoire choisi et le niveau (région ou département).
- `Carte Couleur` : palette séquentielle pour les volumes et les parts, divergente pour les évolutions et l'indice. Le dégradé mélange **rang** (70 %) et **valeur** (30 %), ce qui évite qu'une valeur extrême (Paris, Nord) écrase toutes les nuances.
- `Carte Rôle` et `Carte Contour couleur` : la zone sélectionnée est mise en évidence par son contour.

## 7. Performance

- Faits en **import**, colonnes réduites au strict nécessaire (6 colonnes de libellés supprimées de `F_Licences` lors du nettoyage).
- Colonnes à faible cardinalité et clés texte courtes (`Code_DEP`).
- Mesures HTML : agrégats faits une seule fois dans des variables de table (`SUMMARIZECOLUMNS`), puis lus par `MAXX(FILTER())`. Pas de `GENERATESERIES` ni de `UNION` par ligne. Encodage base 64 en arithmétique (`MOD`, `INT`) plutôt qu'en boucle.
- Taille des chaînes renvoyées surveillée (moins de 31 000 caractères par mesure de tableau).

## 8. Limites connues

- Le visuel *HTML Content* doit être en **édition standard** pour exécuter les scripts des tableaux. L'édition « sécurisée » les retire.
- Les liens `mailto:` ne s'ouvrent pas dans le visuel. L'adresse e-mail est donc affichée en texte sélectionnable.
- Taux pour 1 000 habitants approximatif quand un filtre d'âge est actif (tranches INJEP ≠ tranches Insee).
- Les répartitions par sexe, âge et territoire sont peu comparables dans le temps, à cause de la baisse des non-répartis (mise en garde INJEP).

## 9. Historique du projet

| Étape | Contenu |
|---|---|
| Socle | Chargement SQL des CSV, référentiel Excel synchronisé, modèle en étoile |
| Page Portrait | En-tête, chiffres clés, carte Azure Maps, profil, évolution |
| Segments | Cascade Niveau → Regroupement → Fédération, puis Territoire → Département |
| Comparaisons | Tableau des fédérations, puis des territoires sur le même moteur |
| Finitions | Sources, auteur, date de mise à jour, émojis de pages |
| Nettoyage (06/11/2026) | 29 mesures, 5 tables et 9 colonnes inutilisées supprimées. Mesures rangées en 10 dossiers. Descriptions sur 100 % des objets. Power Query factorisé et commenté. Documentation générée |
