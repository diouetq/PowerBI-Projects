# 06 · Visuels HTML et moteur JavaScript

Une grande partie de l'interface est produite par des **mesures DAX qui renvoient du HTML**. Le visuel certifié *HTML Content* les affiche.

---

## 1. Blocs HTML de la page Portrait

| Mesure | Bloc | Contenu |
|---|---|---|
| `HTML En-tête` | Bandeau de page | Logo, type (fédération, regroupement, ensemble), nom, famille et sous-famille, puis une ligne de contexte : territoire, année, pastilles des filtres actifs (genre, âge) |
| `HTML Chiffres clés` | 4 cartes | Licences (avec logo), évolution sur 1 an, évolution depuis 2019, poids dans l'ensemble et rang |
| `HTML Évolution` | ÉVOLUTION | Barres annuelles en mode Volume (année choisie en couleur pleine), ou indices base 100 de la sélection, du regroupement et de l'ensemble. SVG avec infobulles |
| `HTML Qui` = `HTML Qui Profil` + `HTML Qui Âges` + `HTML Qui Pyramide` | PROFIL | Part de femmes et effectifs, âge moyen et grandes catégories, pyramide des âges (échelle commune), comparaison à l'ensemble |
| `HTML Carte` | Cadre de la carte | Titre, sous-titre, légende du dégradé (bornes min et max), alerte « hors carte » (Monaco, étranger, non-répartis) |

**Principes communs** :

- Les styles viennent des mesures `Style …` (couleurs, tailles, blocs CSS), injectées dans une balise `<style>` commune (`Style CSS commun` : infobulles `.tt` et `.tip`, survol SVG, texte tronqué).
- Le texte affiché est échappé (apostrophes, `&`). Les nombres insérés dans le SVG sont formatés en `en-US` (point décimal).
- Chaque bloc s'adapte à la sélection : `Sélection mode`, `Sélection libellé`, `Libellé territoire`.

## 2. Tableaux de comparaison

### 2.1 Architecture

```
HTML Comparaison Federations ─┐                        ┌─ <style>  [HTML Comparaison CSS]   (commun)
HTML Comparaison Territoires ─┴─▶ données JS (DAX) ────┼─ <div id=hd> en-tête fixe, <div id=sf> zone défilante
                                                       └─ <script> données + [HTML Tableau JS] (commun)
```

- **La mesure appelante** (une par page) calcule les données et les écrit sous forme de variables JavaScript : `Y`, `AN`, `REF`, `K`, `F`, `G`, etc.
- **Le moteur** (`HTML Tableau JS`, source lisible : [`src/html/moteur_tableau.js`](../src/html/moteur_tableau.js)) lit ces variables et construit le tableau.
- **La feuille de style** (`HTML Comparaison CSS`, source : [`src/html/tableau.css`](../src/html/tableau.css)) est partagée.

Une évolution du moteur ou des styles se fait **une seule fois** pour les deux pages.

### 2.2 Format des données

Chaque ligne de `F` :

```js
['Athlétisme', 'ffathle.png', 3, 1, '1m9X.1n2a.….f.h.a1.a2.a3.a4.np', '12.4kQ']
//  nom          logo          groupe  sélectionnée  série annuelle + profil (base 64)      1re fédération (territoires)
```

- **Base 64** (alphabet `0-9a-zA-Z-_`) : environ 4 caractères par nombre au lieu de 8. Le calcul est fait en DAX par arithmétique (`MOD`, `INT`, `MID`) sur des colonnes précalculées, sans boucle.
- Préfixe de logo `federation-francaise-` abrégé en `~`.
- Toutes les fédérations, ou tous les départements, présents dans les données sont transmis, **même à 0** pour la sélection : aucune ligne ne disparaît.
- Contrainte : moins d'environ 32 000 caractères en sortie de mesure (limite du visuel). Les deux mesures font entre 26 000 et 30 600 caractères selon la sélection.

### 2.3 Modes d'affichage

| Situation | Mode |
|---|---|
| Rien de choisi, ou « Ensemble » | **Liste** triée par licences |
| Un regroupement choisi | **Vue groupée** (famille, sous-famille ou groupe selon le niveau). Le groupe de la sélection est déplié et mis en évidence |
| Une fédération choisie dans « Ensemble » | Liste, avec la fédération en évidence et le défilement jusqu'à elle |
| Territoires, région choisie | Groupes métropole par région, plus DROM, COM et Autres. La région est dépliée et le département choisi mis en évidence |
| Territoires, niveau géographique Région | Liste des **régions** |
| Périmètre Métropole ou Métropole + DROM | La ligne Total devient « Métropole » ou « Métropole + DROM » (`window.TN`) |

### 2.4 Colonnes

Nom (logo) · Licences de l'année · Part · Évol. 1 an · Évol. depuis 2019 · **Tendance** (mini-courbe SVG 2016-2025, année choisie en point bleu) · Genre (barre femmes / hommes) · Âge (barre 4 catégories) · Pour 1 000 hab. · Spécificité (fédérations) ou 1re fédération (territoires).
Chaque en-tête est triable et a une infobulle qui explique le calcul et ses limites (évolution indisponible, taux approximatif…).

### 2.5 Détection de la sélection en DAX

Le segment Niveau filtre aussi `T_Federation`. Une simple vérification `ISCROSSFILTERED` ne suffit donc pas : la sélection n'est considérée comme active que si elle **ne couvre pas toutes** les lignes.

```dax
VAR _Act = _Fil && COUNTROWS(FILTER(_B, T_Federation[CodeReference] IN _SelSet)) < COUNTROWS(_B)
```

Côté territoires, le segment Région est un paramètre de champ (`Param_Departement`), relié à `P_TerrChoix`. Les deux sont testés :

```dax
VAR _IdSel = IF(ISFILTERED(Param_Departement) || ISFILTERED(P_TerrChoix), SELECTEDVALUE(P_TerrChoix[Id territoire]))
```

## 3. Panneau gauche

| Mesure | Contenu |
|---|---|
| `HTML Sources` | INJEP-MEDES et Insee avec boutons « Voir la source ↗ », mises en garde (licence ≠ personne), mention de responsabilité, date de mise à jour (`Date MAJ`) |
| `HTML Auteur` | Carte auteur : initiales, nom, titre, boutons LinkedIn et GitHub (projet), adresse e-mail sélectionnable |

## 4. Assistant

Le panneau de discussion (dossier `10. Assistant`) utilise le même visuel, mais découpe sa sortie en blocs de moins de 32 767 caractères, une ligne par bloc (`T_Assistant_Bloc[Ordre]` dans Content). Voir [07 · Assistant intégré](07_Assistant.md).

## 5. Réglages du visuel HTML Content

- **Édition standard**, obligatoire pour les `<script>` des tableaux (l'édition sécurisée les retire).
- *Autoriser l'ouverture des URL* (liens des sources et de l'auteur).
- *Autoriser la sélection de texte* (copie de l'adresse e-mail).
- Fond transparent pour les blocs posés sur le panneau bleu nuit.
