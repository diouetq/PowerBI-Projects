# Catalogue des mesures DAX

> Document **généré** par `tools/generer_documentation.py`. Ne pas modifier à la main.

**114 mesures**, toutes dans la table `_Mesures`, rangées par dossier d'affichage.

## Sommaire

| Dossier | Mesures |
|---|---:|
| 00. Charte graphique\Blocs CSS | 7 |
| 00. Charte graphique\Couleurs et police | 35 |
| 00. Charte graphique\Ressources | 1 |
| 00. Charte graphique\Tailles | 5 |
| 01. Indicateurs de base | 4 |
| 02. Évolutions | 7 |
| 03. Publics | 2 |
| 04. Comparaisons | 3 |
| 05. Sélection et libellés | 9 |
| 06. Segments | 3 |
| 07. Page Portrait\Carte | 11 |
| 07. Page Portrait\En-tête et chiffres clés | 2 |
| 07. Page Portrait\Profil | 4 |
| 07. Page Portrait\Évolution | 7 |
| 08. Pages Comparer | 2 |
| 08. Pages Comparer\Moteur commun | 2 |
| 09. Panneau gauche | 2 |
| 10. Assistant | 8 |

## 00. Charte graphique\Blocs CSS

| Mesure | Format | Masquée | Description |
|---|---|:-:|---|
| `Style CSS cadre` |  |  | Charte : style du cadre blanc d'un bloc (fond, bordure, arrondi, marges). La hauteur est ajoutée par chaque visuel. |
| `Style CSS commun` |  |  | Charte : balise <style> commune à tous les blocs HTML (infobulles .tt/.tip, survol SVG .pt, texte tronqué .el, chiffres insécables .nb). À placer une fois au début de chaque mesure HTML. |
| `Style CSS ligne titre` |  |  | Charte : ligne qui porte la pastille de rubrique et le titre du bloc. |
| `Style CSS légende` |  |  | Charte : texte des légendes. |
| `Style CSS rubrique` |  |  | Charte : pastille de rubrique (COMBIEN, OÙ, QUI…). |
| `Style CSS sous-titre` |  |  | Charte : sous-titre d'un bloc. |
| `Style CSS titre bloc` |  |  | Charte : titre d'un bloc. |

<details><summary><code>Style CSS cadre</code></summary>

```dax
-- Cadre blanc d'un bloc HTML (HTML Évolution, HTML Carte, HTML Qui).
-- height:100vh!important : le cadre prend TOUJOURS la hauteur réelle du visuel (redimensionnement libre,
-- jamais de barre de défilement). La valeur _HauteurCadre des mesures ne sert plus que de repère.
"box-sizing:border-box;width:100%;height:100vh!important;display:flex;flex-direction:column;overflow:hidden;font-family:" & [Style Police]
    & ";background:" & [Style Couleur fond cadre]
    & ";border:1px solid " & [Style Couleur bordure]
    & ";border-radius:14px;padding:16px 16px 12px 16px"
```

</details>

<details><summary><code>Style CSS commun</code></summary>

```dax
-- =====================================================================
-- Style CSS commun : classes partagées par tous les blocs HTML
--   .tt  : élément qui porte une infobulle (.tip à l'intérieur)
--   .tip : infobulle sombre, affichée au survol de .tt
--          (alignée à gauche pour le 1er élément d'une ligne, à droite pour le dernier)
--   .bas : infobulle affichée sous l'élément (pour le haut des blocs)
--   .pt  : groupe SVG survolable ; .hl (surbrillance) et .ptip (infobulle SVG) visibles au survol
--   .el  : texte tronqué avec « … » (le texte complet est dans l'infobulle)
--   .nb  : valeur chiffrée, jamais coupée
-- =====================================================================
VAR _Fond  = [Style Couleur texte]
VAR _Petit = [Style Taille petit]
RETURN
    "<style>html,body{margin:0;padding:0;overflow:hidden}*{box-sizing:border-box}"
    & ".tt{position:relative}"
    & ".tt .tip{opacity:0;visibility:hidden;pointer-events:none;position:absolute;z-index:20;left:50%;bottom:calc(100% + 8px);transform:translateX(-50%);"
    & "background:" & _Fond & ";color:#FFFFFF;font-size:" & _Petit & "px;font-weight:400;line-height:1.45;text-align:left;letter-spacing:0;"
    & "padding:8px 11px;border-radius:8px;white-space:nowrap;box-shadow:0 8px 20px rgba(16,24,40,.22);transition:opacity .12s}"
    & ".tt:first-child .tip{left:0;transform:none}.tt:last-child .tip{left:auto;right:0;transform:none}"
    & ".tt .tip.bas{bottom:auto;top:calc(100% + 8px)}"
    & ".tt:hover .tip{opacity:1;visibility:visible}.tip b{font-weight:600}.tip span{color:#B7C0CF}"
    & ".pt .ptip,.pt .hl{opacity:0;transition:opacity .12s}.pt:hover .ptip,.pt:hover .hl{opacity:1}"
    & ".el{min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}"
    & ".nb{flex:none;white-space:nowrap;font-variant-numeric:tabular-nums}</style>"
```

</details>

<details><summary><code>Style CSS ligne titre</code></summary>

```dax
"display:flex;align-items:center;gap:10px;flex-wrap:wrap"
```

</details>

<details><summary><code>Style CSS légende</code></summary>

```dax
-- Texte des légendes
"font-size:" & [Style Taille texte] & "px;line-height:1.3;color:" & [Style Couleur texte secondaire]
```

</details>

<details><summary><code>Style CSS rubrique</code></summary>

```dax
-- Pastille de thème d'un bloc (ÉVOLUTION, TERRITOIRES, PROFIL)
"font-size:13px;font-weight:700;letter-spacing:.08em;color:" & [Style Couleur accent]
    & ";background:" & [Style Couleur accent fond] & ";border-radius:6px;padding:4px 9px"
```

</details>

<details><summary><code>Style CSS sous-titre</code></summary>

```dax
-- Sous-titre d'un bloc (ce que montre le bloc, périmètre)
"font-size:" & [Style Taille petit] & "px;color:" & [Style Couleur texte discret] & ";margin-top:4px;line-height:1.35"
```

</details>

<details><summary><code>Style CSS titre bloc</code></summary>

```dax
-- Titre d'un bloc
"font-size:" & [Style Taille titre] & "px;font-weight:600;letter-spacing:-.01em;color:" & [Style Couleur texte]
```

</details>

## 00. Charte graphique\Couleurs et police

| Mesure | Format | Masquée | Description |
|---|---|:-:|---|
| `Style Couleur accent` |  |  | Charte : couleur d'accent (pastilles de rubrique). |
| `Style Couleur accent fond` |  |  | Charte : fond clair de l'accent (pastilles, bande de l'année choisie). |
| `Style Couleur baisse` |  |  | Charte : baisse (rouge). |
| `Style Couleur baisse fond` |  |  | Charte : fond clair de la baisse. |
| `Style Couleur bordure` |  |  | Charte : bordure des cadres. |
| `Style Couleur bordure forte` |  |  | Charte : bordure appuyée (pointillés, séparateurs, tiret vide). |
| `Style Couleur ensemble` |  |  | Charte : série de l'ensemble des fédérations. |
| `Style Couleur femmes` |  |  | Charte : femmes (bloc Qui). |
| `Style Couleur filtre actif bordure` |  |  | Charte : pastille d'un filtre actif – bordure. |
| `Style Couleur filtre actif fond` |  |  | Charte : pastille d'un filtre actif (genre, âge) – fond. |
| `Style Couleur filtre actif point` |  |  | Charte : pastille d'un filtre actif – point. |
| `Style Couleur filtre actif texte` |  |  | Charte : pastille d'un filtre actif – texte (aussi titre d'alerte « hors carte »). |
| `Style Couleur fond cadre` |  |  | Charte : fond des cadres. |
| `Style Couleur fond neutre` |  |  | Charte : fond gris très clair (pistes de barres). |
| `Style Couleur grille` |  |  | Charte : lignes de grille des graphiques. |
| `Style Couleur hausse` |  |  | Charte : hausse (vert). |
| `Style Couleur hausse fond` |  |  | Charte : fond clair de la hausse. |
| `Style Couleur hommes` |  |  | Charte : hommes (bloc Qui). |
| `Style Couleur icône` |  |  | Charte : trait des icônes (titre, en-tête). |
| `Style Couleur marine` |  |  | Charte : bleu nuit (panneau de gauche, contour de sélection de la carte). |
| `Style Couleur marine 2` |  |  | Charte : bleu de fin du dégradé de la carte Licences (chiffres clés). |
| `Style Couleur neutre` |  |  | Charte : gris neutre (éléments non sélectionnés, texte très discret). |
| `Style Couleur neutre clair` |  |  | Charte : gris neutre clair. |
| `Style Couleur poids` |  |  | Charte : carte Poids de la fédération (violet). |
| `Style Couleur poids fond` |  |  | Charte : fond clair du poids. |
| `Style Couleur regroupement` |  |  | Charte : série du regroupement. |
| `Style Couleur sans donnée` |  |  | Charte : couleur des zones sans donnée ou non calculables (carte, graphiques). |
| `Style Couleur sélection` |  |  | Charte : série de la sélection (fédération ou regroupement choisi). |
| `Style Couleur sélection clair` |  |  | Charte : version claire de la sélection (autres années en mode Volume). |
| `Style Couleur texte` |  |  | Charte : texte principal (titres, valeurs). |
| `Style Couleur texte discret` |  |  | Charte : texte discret (sous-titres, axes). |
| `Style Couleur texte fort` |  |  | Charte : texte appuyé (chiffres secondaires). |
| `Style Couleur texte libellé` |  |  | Charte : libellés (« Territoire », « Année »…). |
| `Style Couleur texte secondaire` |  |  | Charte : texte courant (légendes, étiquettes). |
| `Style Police` |  |  | Charte commune des visuels HTML : police. |

<details><summary><code>Style Couleur accent</code></summary>

```dax
"#4361EE"
```

</details>

<details><summary><code>Style Couleur accent fond</code></summary>

```dax
"#EEF1FE"
```

</details>

<details><summary><code>Style Couleur baisse</code></summary>

```dax
"#B42318"
```

</details>

<details><summary><code>Style Couleur baisse fond</code></summary>

```dax
"#FEF3F2"
```

</details>

<details><summary><code>Style Couleur bordure</code></summary>

```dax
"#E4E7EC"
```

</details>

<details><summary><code>Style Couleur bordure forte</code></summary>

```dax
"#D0D5DD"
```

</details>

<details><summary><code>Style Couleur ensemble</code></summary>

```dax
"#0B1C4F"
```

</details>

<details><summary><code>Style Couleur femmes</code></summary>

```dax
"#8B5CF6"
```

</details>

<details><summary><code>Style Couleur filtre actif bordure</code></summary>

```dax
"#C7D0FB"
```

</details>

<details><summary><code>Style Couleur filtre actif fond</code></summary>

```dax
"#EEF1FE"
```

</details>

<details><summary><code>Style Couleur filtre actif point</code></summary>

```dax
"#4361EE"
```

</details>

<details><summary><code>Style Couleur filtre actif texte</code></summary>

```dax
"#2E46C9"
```

</details>

<details><summary><code>Style Couleur fond cadre</code></summary>

```dax
"#FFFFFF"
```

</details>

<details><summary><code>Style Couleur fond neutre</code></summary>

```dax
"#F2F4F7"
```

</details>

<details><summary><code>Style Couleur grille</code></summary>

```dax
"#EAECF0"
```

</details>

<details><summary><code>Style Couleur hausse</code></summary>

```dax
"#067647"
```

</details>

<details><summary><code>Style Couleur hausse fond</code></summary>

```dax
"#ECFDF3"
```

</details>

<details><summary><code>Style Couleur hommes</code></summary>

```dax
"#0EA5E9"
```

</details>

<details><summary><code>Style Couleur icône</code></summary>

```dax
"#2E46C9"
```

</details>

<details><summary><code>Style Couleur marine</code></summary>

```dax
"#0B1C4F"
```

</details>

<details><summary><code>Style Couleur marine 2</code></summary>

```dax
"#1E3480"
```

</details>

<details><summary><code>Style Couleur neutre</code></summary>

```dax
"#98A2B3"
```

</details>

<details><summary><code>Style Couleur neutre clair</code></summary>

```dax
"#E4E7EC"
```

</details>

<details><summary><code>Style Couleur poids</code></summary>

```dax
"#4361EE"
```

</details>

<details><summary><code>Style Couleur poids fond</code></summary>

```dax
"#EEF1FE"
```

</details>

<details><summary><code>Style Couleur regroupement</code></summary>

```dax
"#F2A93B"
```

</details>

<details><summary><code>Style Couleur sans donnée</code></summary>

```dax
"#B3B9C6"
```

</details>

<details><summary><code>Style Couleur sélection</code></summary>

```dax
"#4361EE"
```

</details>

<details><summary><code>Style Couleur sélection clair</code></summary>

```dax
"#C7D0FB"
```

</details>

<details><summary><code>Style Couleur texte</code></summary>

```dax
"#101828"
```

</details>

<details><summary><code>Style Couleur texte discret</code></summary>

```dax
"#8A94A6"
```

</details>

<details><summary><code>Style Couleur texte fort</code></summary>

```dax
"#344054"
```

</details>

<details><summary><code>Style Couleur texte libellé</code></summary>

```dax
"#667085"
```

</details>

<details><summary><code>Style Couleur texte secondaire</code></summary>

```dax
"#475467"
```

</details>

<details><summary><code>Style Police</code></summary>

```dax
"Segoe UI, sans-serif"
```

</details>

## 00. Charte graphique\Ressources

| Mesure | Format | Masquée | Description |
|---|---|:-:|---|
| `Logo URL base` |  | oui | Adresse de base des logos (dépôt GitHub via jsDelivr). L'adresse d'un logo = cette base + nom du fichier (colonne Logo de T_Federation). Un seul endroit à modifier pour changer d'hébergement. |

<details><summary><code>Logo URL base</code></summary>

```dax
"https://cdn.jsdelivr.net/gh/diouetq/PowerBI-Projects@main/LicencesFederations/assets/logos/"
```

</details>

## 00. Charte graphique\Tailles

| Mesure | Format | Masquée | Description |
|---|---|:-:|---|
| `Style Taille chiffre` |  |  | Charte : taille du chiffre principal d'une carte ou d'une section, en px. |
| `Style Taille petit` |  |  | Charte : taille des notes, axes et sous-titres, en px. |
| `Style Taille texte` |  |  | Charte : taille du texte courant (libellés, légendes, valeurs secondaires), en px. |
| `Style Taille titre` |  |  | Charte : taille du titre d'un bloc (px, nombre en texte). Page de 1920 x 1400 : tailles pensées pour rester lisibles une fois la page réduite à l'écran. |
| `Style Taille valeur` |  |  | Charte : taille d'une valeur mise en avant dans une liste ou une légende, en px. |

<details><summary><code>Style Taille chiffre</code></summary>

```dax
"32"
```

</details>

<details><summary><code>Style Taille petit</code></summary>

```dax
"14"
```

</details>

<details><summary><code>Style Taille texte</code></summary>

```dax
"15"
```

</details>

<details><summary><code>Style Taille titre</code></summary>

```dax
"22"
```

</details>

<details><summary><code>Style Taille valeur</code></summary>

```dax
"17"
```

</details>

## 01. Indicateurs de base

| Mesure | Format | Masquée | Description |
|---|---|:-:|---|
| `Licences pour 1 000 hab` | 0.0 |  | Licences pour 1 000 habitants : licences de l'année divisées par la population INSEE au 1er janvier, × 1 000 (même année, même sexe, même catégorie d'âge). Rapport des sommes sur la zone. Seuls les départements ayant une population entrent au numérateur (COM, Monaco, étranger et non réparti exclus). Compte des licences, pas des personnes. |
| `NB Licences` | #,0 |  | Nombre de licences annuelles. Si plusieurs années sont sélectionnées (ou aucune), prend la plus récente de la sélection, pour ne jamais additionner des années entre elles. |
| `Population` | #,0 |  | Population INSEE au 1er janvier de l'année (la plus récente de la sélection), pour le territoire, le sexe et la catégorie d'âge filtrés. Les tranches de 5 ans sont réparties également entre leurs âges pour recoller aux catégories (Enfants 1-13, Jeunes 14-20, Adultes 21-55, Seniors 56-99). Vide pour les territoires sans population (COM, Monaco, étranger, non réparti). |
| `Âge moyen` | 0.0 |  | Âge moyen des licenciés (âge exact de la table, pondéré par le nombre de licences), année la plus récente de la sélection. Licences sans âge exclues. |

<details><summary><code>Licences pour 1 000 hab</code></summary>

```dax
VAR _Pop = [Population]
VAR _Lic =
    CALCULATE(
        [NB Licences],
        KEEPFILTERS(TREATAS(ALL(F_Population[Code_DEP]), T_Territoire[Code_DEP]))
    )
RETURN IF(NOT ISBLANK(_Pop), DIVIDE(_Lic, _Pop) * 1000)
```

</details>

<details><summary><code>NB Licences</code></summary>

```dax
VAR _AnneeRef = MAX(T_Annee[Annee])          -- année la plus récente de la sélection
RETURN
    CALCULATE(
        SUM(F_Licences[NbLicences]),
        T_Annee[Annee] = _AnneeRef
    )
```

</details>

<details><summary><code>Population</code></summary>

```dax
VAR _An    = MAX(T_Annee[Annee])
VAR _Sel   = ISFILTERED(T_TrancheAge)
VAR _Cats  = DATATABLE("Ordre", STRING, "Lo", INTEGER, "Hi", INTEGER, {{"T", 0, 120}, {"1", 1, 13}, {"2", 14, 20}, {"3", 21, 55}, {"4", 56, 99}})
VAR _Ch    = FILTER(_Cats, IF(_Sel, [Ordre] <> "T" && [Ordre] IN VALUES(T_TrancheAge[Ordre]), [Ordre] = "T"))
VAR _Pop   =
    CALCULATE(
        SUMX(
            VALUES(F_Population[AgeDebut]),
            VAR _b = F_Population[AgeDebut]
            VAR _f = SUMX(_Ch, MAX(0, MIN([Hi], _b + 4) - MAX([Lo], _b) + 1)) / 5
            RETURN _f * CALCULATE(SUM(F_Population[Population]))
        ),
        T_Annee[Annee] = _An
    )
RETURN IF(_Pop > 0, _Pop)
```

</details>

<details><summary><code>Âge moyen</code></summary>

```dax
VAR _AnneeRef = MAX(T_Annee[Annee])
RETURN
    CALCULATE(
        DIVIDE(SUMX(F_Licences, F_Licences[Age] * F_Licences[NbLicences]), SUM(F_Licences[NbLicences])),
        T_Annee[Annee] = _AnneeRef,
        NOT ISBLANK(F_Licences[Age])
    )
```

</details>

## 02. Évolutions

| Mesure | Format | Masquée | Description |
|---|---|:-:|---|
| `Champ constant mention` |  |  | Phrase affichée sous les évolutions quand la sélection contient des fédérations hors champ constant : nombre de fédérations retenues, fédérations exclues et leurs licences (pour qu'un lecteur qui refait la somme retrouve le total). Vide sinon. |
| `Champ constant note` |  |  | Version courte (HTML, 2 lignes) de Champ constant mention, pour les infobulles des blocs HTML (Chiffres clés, Évolution). Vide quand la sélection ne contient aucune fédération hors champ constant. |
| `Licences 2019` | #,0 |  | Licences en 2019 (année de comparaison avant crise sanitaire), mêmes filtres, à champ constant (fédérations présentes chaque année). |
| `Licences N-1` | #,0 |  | Licences de l'année précédant l'année de référence, mêmes filtres, à champ constant (fédérations présentes chaque année) : base de l'évolution sur 1 an. |
| `Licences champ constant` | #,0 |  | Licences de l'année de référence sur les seules fédérations à champ constant (T_Federation[Champ constant] = Oui), base de toutes les évolutions. Si la sélection ne contient aucune fédération à champ constant (une fédération récente seule), on garde toutes ses licences : son évolution reste la sienne. |
| `Évol 1 an` | +0.0 %;-0.0 %;0.0 % |  | Évolution des licences par rapport à l'année précédente, à champ constant (méthode INJEP : fédérations présentes chaque année de la période). |
| `Évol depuis 2019` | +0.0 %;-0.0 %;0.0 % |  | Évolution des licences depuis 2019, à champ constant (méthode INJEP : fédérations présentes chaque année de la période). |

<details><summary><code>Champ constant mention</code></summary>

```dax
VAR _AnMin  = MINX(ALL(T_Annee[Annee]), VALUE(T_Annee[Annee]))
VAR _AnMax  = MAXX(ALL(T_Annee[Annee]), VALUE(T_Annee[Annee]))
VAR _An     = MAX(T_Annee[Annee])
VAR _NbCC   = CALCULATE(DISTINCTCOUNT(F_Licences[CodeReference]), REMOVEFILTERS(T_Annee), KEEPFILTERS(T_Federation[Champ constant] = "Oui"))
VAR _NbHors = CALCULATE(DISTINCTCOUNT(F_Licences[CodeReference]), KEEPFILTERS(T_Federation[Champ constant] = "Non"))
VAR _LicHors = CALCULATE([NB Licences], KEEPFILTERS(T_Federation[Champ constant] = "Non"))
RETURN
    IF(_NbCC > 0 && _NbHors > 0,
        "Évolutions à champ constant (méthode INJEP) : " & _NbCC & " fédérations présentes chaque année de " & _AnMin & " à " & _AnMax & ". "
        & IF(_NbHors > 1, _NbHors & " fédérations hors champ constant sont exclues des évolutions", "1 fédération hors champ constant est exclue des évolutions")
        & " (" & FORMAT(_LicHors, "#,0") & " licences en " & _An & "), mais comptées dans les volumes.")
```

</details>

<details><summary><code>Champ constant note</code></summary>

```dax
VAR _AnMin  = MINX(ALL(T_Annee[Annee]), VALUE(T_Annee[Annee]))
VAR _AnMax  = MAXX(ALL(T_Annee[Annee]), VALUE(T_Annee[Annee]))
VAR _An     = MAX(T_Annee[Annee])
VAR _NbCC   = CALCULATE(DISTINCTCOUNT(F_Licences[CodeReference]), REMOVEFILTERS(T_Annee), KEEPFILTERS(T_Federation[Champ constant] = "Oui"))
VAR _NbHors = CALCULATE(DISTINCTCOUNT(F_Licences[CodeReference]), KEEPFILTERS(T_Federation[Champ constant] = "Non"))
VAR _LicHors = CALCULATE([NB Licences], KEEPFILTERS(T_Federation[Champ constant] = "Non"))
RETURN
    IF(_NbCC > 0 && _NbHors > 0,
        "Évolution à champ constant (méthode INJEP) : " & _NbCC & " fédérations présentes de " & _AnMin & " à " & _AnMax & ".<br>"
        & "Hors champ constant : " & _NbHors & IF(_NbHors > 1, " fédérations", " fédération") & " (" & FORMAT(_LicHors, "#,0") & " licences en " & _An & ").")
```

</details>

<details><summary><code>Licences 2019</code></summary>

```dax
CALCULATE([Licences champ constant], REMOVEFILTERS(T_Annee), T_Annee[Annee] = "2019")
```

</details>

<details><summary><code>Licences N-1</code></summary>

```dax
VAR _A = [Annee Ref]
RETURN CALCULATE([Licences champ constant], REMOVEFILTERS(T_Annee), T_Annee[Annee] = FORMAT(_A - 1, "0"))
```

</details>

<details><summary><code>Licences champ constant</code></summary>

```dax
-- Base des évolutions : fédérations présentes chaque année de la période (champ constant, méthode INJEP).
-- Les volumes affichés ([NB Licences]) restent sur toutes les fédérations.
VAR _AvecCC = NOT ISEMPTY(CALCULATETABLE(VALUES(F_Licences[CodeReference]), REMOVEFILTERS(T_Annee), KEEPFILTERS(T_Federation[Champ constant] = "Oui")))
RETURN IF(_AvecCC, CALCULATE([NB Licences], KEEPFILTERS(T_Federation[Champ constant] = "Oui")), [NB Licences])
```

</details>

<details><summary><code>Évol 1 an</code></summary>

```dax
VAR _P = [Licences N-1]
RETURN IF(NOT ISBLANK(_P), DIVIDE([Licences champ constant], _P) - 1)
```

</details>

<details><summary><code>Évol depuis 2019</code></summary>

```dax
VAR _P = [Licences 2019]
RETURN IF(NOT ISBLANK(_P), DIVIDE([Licences champ constant], _P) - 1)
```

</details>

## 03. Publics

| Mesure | Format | Masquée | Description |
|---|---|:-:|---|
| `Licences femmes` | #,0 |  | Licences féminines (ignore le segment Sexe). |
| `Part femmes` | 0.0 % |  | Part des femmes parmi les licences (ignore le segment Sexe). |

<details><summary><code>Licences femmes</code></summary>

```dax
CALCULATE([NB Licences], REMOVEFILTERS(T_Sexe), T_Sexe[Sexe] = "F")
```

</details>

<details><summary><code>Part femmes</code></summary>

```dax
DIVIDE([Licences femmes], CALCULATE([NB Licences], REMOVEFILTERS(T_Sexe)))
```

</details>

## 04. Comparaisons

| Mesure | Format | Masquée | Description |
|---|---|:-:|---|
| `Indice de spécificité` | 0.00 |  | Poids de la sélection dans le territoire divisé par son poids en France entière. 1 = même poids qu'en France ; 1,45 = 45 % de plus. |
| `Licences ensemble` | #,0 |  | Licences de toutes les fédérations (retire les filtres fédération, garde territoire, public et année). |
| `Part dans l'ensemble` | 0.0 % |  | Poids de la sélection dans l'ensemble des licences du même territoire. |

<details><summary><code>Indice de spécificité</code></summary>

```dax
DIVIDE(
    [Part dans l'ensemble],
    CALCULATE(
        [Part dans l'ensemble],
        REMOVEFILTERS(T_Territoire), REMOVEFILTERS(P_TerrChoix), REMOVEFILTERS(P_TerrAppartenance),
        REMOVEFILTERS(P_TerrDep), REMOVEFILTERS(Param_Departement)
    )
)
```

</details>

<details><summary><code>Licences ensemble</code></summary>

```dax
CALCULATE(
    [NB Licences],
    REMOVEFILTERS(T_Federation), REMOVEFILTERS(P_Federation), REMOVEFILTERS(P_Niveaux),
    REMOVEFILTERS(P_Appartenance), REMOVEFILTERS(Param_Federation)
)
```

</details>

<details><summary><code>Part dans l'ensemble</code></summary>

```dax
DIVIDE([NB Licences], [Licences ensemble])
```

</details>

## 05. Sélection et libellés

| Mesure | Format | Masquée | Description |
|---|---|:-:|---|
| `Annee Ref` | 0 | oui | Année de référence (la plus récente de la sélection), en nombre. |
| `Date MAJ` |  |  | Date de dernière actualisation du modèle (table T_MAJ), au format jj/mm/aaaa. |
| `Libellé territoire` |  | oui | Nom du territoire sélectionné (France entière, zone, région ou département). |
| `Niveau choisi` |  | oui | Nom du niveau de regroupement choisi dans le segment Niveau (Sous-famille par défaut). |
| `Nom regroupement` |  |  | Nom du regroupement de la sélection au niveau choisi (vide si la sélection couvre plusieurs regroupements). |
| `Sélection libellé` |  |  | Libellé de la sélection pour les titres et légendes : nom court de la fédération, nom du regroupement, « Plusieurs fédérations » ou « Ensemble des fédérations ». |
| `Sélection liste` |  |  | Liste des fédérations sélectionnées (noms courts, par licences décroissantes), limitée à _NbMax noms puis « et n autres ». Sert aux infobulles quand plusieurs fédérations sont choisies. |
| `Sélection mode` |  |  | Nature de la sélection fédération : Ensemble (rien de choisi ou Ensemble), Regroupement (famille, sous-famille ou groupe sans fédération), Fédération (une seule), Plusieurs fédérations. Référence commune de tous les blocs HTML. |
| `Sélection nb fédérations` | 0 |  | Nombre de fédérations dans la sélection (toutes si rien n'est choisi). |

<details><summary><code>Annee Ref</code></summary>

```dax
VALUE(MAX(T_Annee[Annee]))
```

</details>

<details><summary><code>Date MAJ</code></summary>

```dax
VAR _d = MAX(T_MAJ[Actualisé le])
RETURN IF(NOT ISBLANK(_d), FORMAT(_d, "dd/mm/yyyy"))
```

</details>

<details><summary><code>Libellé territoire</code></summary>

```dax
-- Segment Territoire (Param_Departement ou P_TerrChoix) et segment Département (valeurs du champ Param_Departement → P_TerrDep)
VAR _DepChoisi = ISFILTERED(P_TerrDep)
VAR _NbDep     = COUNTROWS(VALUES(T_Territoire[Code_DEP]))
VAR _NbTot     = COUNTROWS(ALLNOBLANKROW(T_Territoire[Code_DEP]))
VAR _Choix     = IF(ISCROSSFILTERED(P_TerrChoix), SELECTEDVALUE(P_TerrChoix[Libellé]))
VAR _Dep       = SELECTEDVALUE(T_Territoire[Departement])
RETURN
    SWITCH(TRUE(),
        _DepChoisi && _NbDep = 1, TRIM(MID(_Dep, SEARCH(" - ", _Dep, 1, 0) + 3, 100)),
        _DepChoisi, "Plusieurs départements",
        NOT ISBLANK(_Choix) && SELECTEDVALUE(P_TerrChoix[Id territoire]) = "TOT", "Tous territoires",
        NOT ISBLANK(_Choix), _Choix,
        NOT ISCROSSFILTERED(T_Territoire) || _NbDep >= _NbTot, "Tous territoires",
        _NbDep = 1, TRIM(MID(_Dep, SEARCH(" - ", _Dep, 1, 0) + 3, 100)),
        HASONEVALUE(T_Territoire[Zone_Slicer]), SELECTEDVALUE(T_Territoire[Zone_Slicer]),
        HASONEVALUE(T_Territoire[GD_Zone_Slicer]), SELECTEDVALUE(T_Territoire[GD_Zone_Slicer]),
        "Plusieurs territoires")
```

</details>

<details><summary><code>Niveau choisi</code></summary>

```dax
SWITCH(SELECTEDVALUE(Param_Niveau[Paramètre Commande], 1), 0, "Famille", 1, "Sous-famille", 2, "Groupe")
```

</details>

<details><summary><code>Nom regroupement</code></summary>

```dax
IF(
    ISCROSSFILTERED(T_Federation),
    SWITCH(
        SELECTEDVALUE(Param_Niveau[Paramètre Commande], 1),
        0, SELECTEDVALUE(T_Federation[Famille de fédérations]),
        1, TRIM(SELECTEDVALUE(T_Federation[Sous-famille de fédérations])),
        2, SELECTEDVALUE(T_Federation[Groupe de fédérations])
    )
)
```

</details>

<details><summary><code>Sélection libellé</code></summary>

```dax
-- =====================================================================
-- Sélection libellé : texte affiché pour la sélection fédération
-- Le regroupement se lit dans la clé « F · Nom », « SF · Nom » ou « G · Nom »
-- (P_Niveaux[Cle] pour le segment Regroupement, Param_Federation[Cle] en secours).
-- =====================================================================
VAR _Mode   = [Sélection mode]
VAR _CleReg = COALESCE(
                  IF(HASONEVALUE(P_Niveaux[Cle]), VALUES(P_Niveaux[Cle])),
                  SELECTEDVALUE(Param_Federation[Cle]))
VAR _NomReg = TRIM(MID(_CleReg, SEARCH(" · ", _CleReg, 1, 0) + 3, 200))
RETURN
    SWITCH(_Mode,
        "Fédération",            SELECTEDVALUE(T_Federation[Nom court]),
        "Plusieurs fédérations", "Plusieurs fédérations",
        "Regroupement",           COALESCE(_NomReg, [Nom regroupement], "Regroupement"),
        "Ensemble des fédérations")
```

</details>

<details><summary><code>Sélection liste</code></summary>

```dax
-- =====================================================================
-- Sélection liste : noms des fédérations choisies (infobulles)
-- =====================================================================
-- 1. Réglages
VAR _NbMax = 6
VAR _Sep   = ", "
-- 2. Données
VAR _Feds  = ADDCOLUMNS(VALUES(T_Federation[Nom court]), "@Lic", [NB Licences])
VAR _Nb    = COUNTROWS(_Feds)
VAR _Top   = TOPN(_NbMax, _Feds, [@Lic], DESC, T_Federation[Nom court], ASC)
-- 3. Résultat
RETURN
    CONCATENATEX(_Top, T_Federation[Nom court], _Sep, [@Lic], DESC)
        & IF(_Nb > _NbMax, " et " & (_Nb - _NbMax) & " autre" & IF(_Nb - _NbMax > 1, "s", ""))
```

</details>

<details><summary><code>Sélection mode</code></summary>

```dax
-- =====================================================================
-- Sélection mode : nature de la sélection fédération (texte)
--   Segment Regroupement = P_Niveaux[Famille | Sous-famille | Groupe] (paramètre Param_Niveau)
--                          → clé P_Niveaux[Cle] (« Ensemble » = pas de regroupement)
--   Segment Fédération   = colonnes de P_Federation (paramètre Param_Federation)
-- Résultat : Ensemble | Regroupement | Fédération | Plusieurs fédérations
-- =====================================================================
VAR _FedFiltree = ISFILTERED(P_Federation)
VAR _NbFed      = COUNTROWS(VALUES(T_Federation[CodeReference]))
VAR _CleNiv     = IF(ISFILTERED(P_Niveaux) && HASONEVALUE(P_Niveaux[Cle]), VALUES(P_Niveaux[Cle]))
VAR _ClePar     = IF(ISFILTERED(Param_Federation) && HASONEVALUE(Param_Federation[Cle]), VALUES(Param_Federation[Cle]))
VAR _CleReg     = COALESCE(_CleNiv, _ClePar)
RETURN
    SWITCH(TRUE(),
        _FedFiltree && _NbFed = 1, "Fédération",
        _FedFiltree && _NbFed > 1, "Plusieurs fédérations",
        NOT ISBLANK(_CleReg) && _CleReg <> "Ensemble", "Regroupement",
        "Ensemble")
```

</details>

<details><summary><code>Sélection nb fédérations</code></summary>

```dax
COUNTROWS(VALUES(T_Federation[CodeReference]))
```

</details>

## 06. Segments

| Mesure | Format | Masquée | Description |
|---|---|:-:|---|
| `Filtre Fede non vide` | 0 |  | Filtre visuel du segment Fédération (est 1) : masque l'élément « (Vide) ». Une fédération = 1 ligne de P_Federation ; (Vide) = plusieurs. |
| `Filtre Niveau non vide` | 0 |  | Filtre visuel du segment Regroupement (est 1) : masque l'élément « (Vide) ». Un regroupement = 1 ligne de P_Niveaux ; (Vide) = plusieurs. |
| `Segment Niveau géo masqué` | 0 |  | 1 quand le segment Niveau géo n'a plus d'effet (un département est choisi, ou territoire DROM, COM ou Autres) : il doit disparaître. Lu par les mesures Segment Niveau géo … |

<details><summary><code>Filtre Fede non vide</code></summary>

```dax
IF(COUNTROWS(P_Federation) = 1, 1)
```

</details>

<details><summary><code>Filtre Niveau non vide</code></summary>

```dax
IF(COUNTROWS(P_Niveaux) = 1, 1)
```

</details>

<details><summary><code>Segment Niveau géo masqué</code></summary>

```dax
-- 1 = le segment Niveau géo n'a plus d'effet : un département est choisi (segment Département, champ de Param_Departement → P_TerrDep),
-- ou le territoire choisi est DROM, COM ou Autres (zones toujours dessinées par territoire)
IF(ISFILTERED(P_TerrDep) || SELECTEDVALUE(P_TerrChoix[Id territoire]) IN {"DROM", "COM", "AUT"}, 1, 0)
```

</details>

## 07. Page Portrait\Carte

| Mesure | Format | Masquée | Description |
|---|---|:-:|---|
| `Carte Contour couleur` |  |  | Couleur du contour des zones (Azure Maps, fx valeur de champ) : bleu nuit pour la sélection, blanc sinon. |
| `Carte Couleur` |  |  | Couleur de remplissage d'une zone (Azure Maps, fx valeur de champ) : dégradé de Carte Palette. Volumes et parts : l'échelle mélange la valeur (30 %) et le rang parmi les zones affichées (70 %). Évolutions et indice : l'intensité mélange le rang et la valeur parmi les zones du même sens (hausses d'un côté, baisses de l'autre), pour que quelques zones exceptionnelles n'écrasent pas les autres. Couleur « sans donnée » si la valeur est absente (ou 0 licence) ; transparent pour une zone en rôle Contour ; vide pour une zone masquée. Les valeurs de toutes les zones sont calculées une seule fois (requête de la carte 5 fois plus rapide). |
| `Carte Max` |  | oui | Plus grande valeur de l'indicateur parmi les zones dessinées au niveau courant (régions, ou départements et territoires d'outre-mer). |
| `Carte Min` |  | oui | Plus petite valeur de l'indicateur parmi les zones dessinées au niveau courant (régions, ou départements et territoires d'outre-mer). |
| `Carte Niveau` | 0 |  | Niveau affiché sur la carte : 1 = régions, 2 = départements (segment T_NiveauGeo). Un département choisi dans le segment Département force le niveau 2. |
| `Carte Nom` |  |  | Nom de la zone survolée (infobulle de la carte). |
| `Carte Palette` |  | oui | RÉGLAGES DES COULEURS DE LA CARTE (lus par Carte Couleur et HTML Carte). Renvoie « début\|milieu\|fin » (codes #RRGGBB). Palette continue pour volumes et parts, divergente pour évolutions et indice de spécificité. |
| `Carte Rôle` |  |  | Rôle de la zone : Zone (remplie), Sélection (remplie + contour mis en évidence), Contour (contour seul). Vient de T_CarteAffichage ; un département choisi dans le segment Département passe en Sélection. |
| `Carte Valeur` |  |  | Valeur de l'indicateur pour la zone dessinée (Id carte) : ignore les segments territoire et applique les départements de la zone (T_CarteZoneDep, codes). Seul TREATAS de la carte. |
| `Carte Visible` | 0 |  | 1 si la zone est dessinée (filtre du visuel Azure Maps : Carte Visible = 1). Zones données par T_CarteAffichage (territoire × niveau) ; sans territoire choisi, celles de TOT. |
| `HTML Carte` |  |  | Cadre du bloc TERRITOIRES (visuel HTML Content placé sous la carte Azure Maps) : titre, sous-titre sur 1 ligne pleine largeur suivi d'une icône note de lecture (définition et calcul de l'indicateur, au survol) et d'une alerte si l'indicateur n'est pas calculable ; les infobulles s'ouvrent sous le sous-titre, alignées à gauche, sans être coupées. Légende des couleurs (même rendu que la carte), case « sans donnée », territoire choisi. Charte : dossier 0. Style. |

<details><summary><code>Carte Contour couleur</code></summary>

```dax
```
-- Charte commune (dossier 0. Style)
-- Sélection : bleu nuit foncé, lisible sur les palettes indigo, rouge/vert et gris
VAR _CouleurSelection = "#0B1B4D"
VAR _CouleurZone      = "rgba(0, 0, 0, 0.1)"
RETURN SWITCH([Carte Rôle], "Sélection", _CouleurSelection, "Contour", _CouleurSelection, _CouleurZone)

```
```

</details>

<details><summary><code>Carte Couleur</code></summary>

```dax
-- =====================================================================
-- Carte Couleur : couleur #RRGGBB d'une zone de la carte
-- =====================================================================
-- Performance (nov. 2026, 1,3 s -> 0,24 s sur la requête du visuel, couleurs identiques) :
--   les zones affichées (_Vis, même règle que Carte Visible) et leurs valeurs (_Tab) sont calculées une seule fois,
--   au lieu d'appeler Carte Valeur dans chaque FILTER, dans Carte Min et dans Carte Max ;
--   rien n'est calculé pour une zone masquée (variables évaluées seulement si elles servent).
-- 1. Réglages
VAR _ContourSeul = "rgba(0,0,0,0)"            -- zone dont on ne montre que le contour
VAR _SansDonnee  = [Style Couleur sans donnée] -- pas de licence, pas de population ou calcul impossible
VAR _PartRang    = 0.7                          -- poids du rang (0 = valeur seule, 1 = rang seul) : plus il est haut, plus les nuances sont réparties entre les zones
-- 2. Valeur de la zone et valeurs de toutes les zones affichées
VAR _Ind    = SELECTEDVALUE(T_CarteIndicateur[Ordre], 1)
VAR _Diverg = _Ind IN {2, 3, 5}
VAR _Centre = IF(_Ind = 5, 1, 0)
VAR _V      = [Carte Valeur]
VAR _Vide   = ISBLANK(_V) || (_Ind IN {1, 6} && _V = 0)
-- zones affichées : même règle que Carte Visible, calculée une fois pour toutes les zones
VAR _Niv = [Carte Niveau]
VAR _Cross = ISCROSSFILTERED(P_TerrChoix)
VAR _Vis =
    CALCULATETABLE(VALUES(T_CarteAffichage[Id carte]),
        REMOVEFILTERS(T_CarteAffichage[Id carte], T_CarteAffichage[Latitude], T_CarteAffichage[Longitude], T_CarteAffichage[Rôle]),
        T_CarteAffichage[Niveau affiché] = _Niv,
        FILTER(ALL(T_CarteAffichage[Id territoire]), _Cross || T_CarteAffichage[Id territoire] = "TOT"))
VAR _Tab =
    CALCULATETABLE(
        ADDCOLUMNS(_Vis, "@v", [Carte Valeur]),
        REMOVEFILTERS(T_CarteAffichage[Id carte], T_CarteAffichage[Latitude], T_CarteAffichage[Longitude], T_CarteAffichage[Rôle])
    )
-- 2b. Volumes et parts : échelle qui mélange le rang parmi toutes les zones et la valeur
VAR _Lo      = MINX(_Tab, [@v])
VAR _Hi      = MAXX(_Tab, [@v])
VAR _NbZones = COUNTROWS(_Tab)
VAR _Rang    = IF(_Diverg || _Vide, 0, COUNTROWS(FILTER(_Tab, [@v] < _V)))
VAR _TRang   = DIVIDE(_Rang, _NbZones - 1, 0.5)
VAR _TLin    = DIVIDE(_V - _Lo, _Hi - _Lo, 0.5)
VAR _TVol    = _PartRang * _TRang + (1 - _PartRang) * _TLin
-- 2c. Évolutions et indice : l'intensité (distance au centre) est calculée séparément pour les hausses et pour les baisses,
--     en mélangeant le rang parmi les zones du même sens et la valeur ; une zone exceptionnelle n'écrase donc pas les autres
VAR _Sens    = IF(ISBLANK(_V), 0, SIGN(_V - _Centre))
VAR _ZSens   = FILTER(_Tab, NOT ISBLANK([@v]) && SIGN([@v] - _Centre) = _Sens)
VAR _NbSens  = COUNTROWS(_ZSens)
VAR _AmpSens = IF(COUNTROWS(_ZSens) >= 5, PERCENTILEX.INC(_ZSens, ABS([@v] - _Centre), 0.9), MAXX(_ZSens, ABS([@v] - _Centre)))   -- 90e centile : quelques valeurs extrêmes n'écrasent pas l'échelle
VAR _RangS   = COUNTROWS(FILTER(_ZSens, ABS([@v] - _Centre) < ABS(_V - _Centre)))
VAR _IRang   = DIVIDE(_RangS, _NbSens - 1, 1)
VAR _ILin    = MIN(1, DIVIDE(ABS(_V - _Centre), _AmpSens, 0))
VAR _IDiv    = _PartRang * _IRang + (1 - _PartRang) * _ILin
VAR _TDiv    = 0.5 + _Sens * _IDiv / 2
VAR _T       = MAX(0, MIN(1, IF(_Diverg, IF(_Sens = 0, 0.5, _TDiv), _TVol)))
-- 3. Interpolation entre deux couleurs de la palette
VAR _Pal = [Carte Palette]
VAR _C1  = LEFT(_Pal, 7)
VAR _C2  = MID(_Pal, 9, 7)
VAR _C3  = RIGHT(_Pal, 7)
VAR _CA  = IF(_T <= 0.5, _C1, _C2)
VAR _CB  = IF(_T <= 0.5, _C2, _C3)
VAR _U   = IF(_T <= 0.5, _T / 0.5, (_T - 0.5) / 0.5)
VAR _Hex = "0123456789ABCDEF"
VAR _Degrade =
    "#" & CONCATENATEX(
        GENERATESERIES(0, 2),
        VAR _P = 2 + 2 * [Value]
        VAR _A = (SEARCH(MID(_CA, _P, 1), _Hex) - 1) * 16 + SEARCH(MID(_CA, _P + 1, 1), _Hex) - 1
        VAR _B = (SEARCH(MID(_CB, _P, 1), _Hex) - 1) * 16 + SEARCH(MID(_CB, _P + 1, 1), _Hex) - 1
        VAR _X = ROUND(_A + (_B - _A) * _U, 0)
        RETURN MID(_Hex, INT(_X / 16) + 1, 1) & MID(_Hex, MOD(_X, 16) + 1, 1),
        "", [Value], ASC)
-- 4. Résultat
RETURN
    SWITCH(TRUE(),
        NOT HASONEVALUE(T_CarteAffichage[Id carte]), BLANK(),
        [Carte Visible] <> 1, BLANK(),
        [Carte Rôle] = "Contour", _ContourSeul,
        _Vide, _SansDonnee,
        _Degrade)
```

</details>

<details><summary><code>Carte Max</code></summary>

```dax
CALCULATE(
    MAXX(FILTER(VALUES(T_CarteAffichage[Id carte]), [Carte Visible] = 1), [Carte Valeur]),
    REMOVEFILTERS(T_CarteAffichage[Id carte], T_CarteAffichage[Latitude], T_CarteAffichage[Longitude], T_CarteAffichage[Rôle])
)
```

</details>

<details><summary><code>Carte Min</code></summary>

```dax
CALCULATE(
    MINX(FILTER(VALUES(T_CarteAffichage[Id carte]), [Carte Visible] = 1), [Carte Valeur]),
    REMOVEFILTERS(T_CarteAffichage[Id carte], T_CarteAffichage[Latitude], T_CarteAffichage[Longitude], T_CarteAffichage[Rôle])
)
```

</details>

<details><summary><code>Carte Niveau</code></summary>

```dax
VAR _NiveauSegment = SELECTEDVALUE(T_NiveauGeo[Ordre], 1)
RETURN IF(ISFILTERED(P_TerrDep), 2, _NiveauSegment)
```

</details>

<details><summary><code>Carte Nom</code></summary>

```dax
VAR _Id = SELECTEDVALUE(T_CarteAffichage[Id carte])
VAR _Code = MID(_Id, 3, 10)
VAR _EstDep = LEFT(_Id, 1) = "D"
VAR _Lib =
    IF(
        _EstDep,
        MAXX(FILTER(T_Territoire, T_Territoire[Code_DEP] = _Code), T_Territoire[Departement]),
        MAXX(FILTER(T_Territoire, T_Territoire[Code_GDEREG] = _Code), T_Territoire[Region])
    )
VAR _Nom = IF(ISBLANK(_Lib), _Code, MID(_Lib, FIND(" - ", _Lib, 1, 0) + 3, 100))
VAR _Ind = SELECTEDVALUE(T_CarteIndicateur[Ordre], 1)
VAR _NomZ = SWITCH(_Id, "R-COM", "Collectivités d'outre-mer", "R-AUT", "Autres (Monaco, Étranger, Non réparti)", _Nom)
-- évolutions : zone non calculée quand la base compte moins de 20 licences
VAR _Petite = _Ind IN {2, 3} && ISBLANK([Carte Valeur]) && NOT ISBLANK(_Id)
RETURN IF(_Petite, _NomZ & " · évolution non calculée (moins de 20 licences en " & IF(_Ind = 3, "2019", FORMAT([Annee Ref] - 1, "0")) & ")", _NomZ)
```

</details>

<details><summary><code>Carte Palette</code></summary>

```dax
-- =====================================================================
-- Carte Palette : 3 couleurs « début|milieu|fin » (codes #RRGGBB à 7 caractères)
-- =====================================================================
-- 1. Réglages : palette continue (volumes, parts), indigo soutenu dès le début
VAR _Debut  = "#B4C2F8"
VAR _Milieu = "#6580EA"
VAR _Fin    = [Style Couleur icône]
-- 2. Réglages : palette divergente (évolutions, indice de spécificité)
--    le neutre (valeur proche de 0) est très clair pour ne pas ressembler à « sans donnée » (gris plus soutenu, Style Couleur sans donnée)
VAR _Baisse = "#E5484D"
VAR _Neutre = "#F1F3F7"
VAR _Hausse = "#12A150"
-- 3. Choix selon l'indicateur
VAR _Ind = SELECTEDVALUE(T_CarteIndicateur[Ordre], 1)
RETURN IF(_Ind IN {2, 3, 5}, _Baisse & "|" & _Neutre & "|" & _Hausse, _Debut & "|" & _Milieu & "|" & _Fin)
```

</details>

<details><summary><code>Carte Rôle</code></summary>

```dax
VAR _Niv = [Carte Niveau]
-- Territoire choisi : segment sur Param_Departement (ou P_TerrChoix), d'où ISCROSSFILTERED
VAR _RoleTable =
    IF(ISCROSSFILTERED(P_TerrChoix),
        CALCULATE(MAX(T_CarteAffichage[Rôle]), T_CarteAffichage[Niveau affiché] = _Niv),
        "Zone")
VAR _Ids      = VALUES(T_CarteAffichage[Id carte])
VAR _DepsZone = SELECTCOLUMNS(FILTER(T_CarteZoneDep, T_CarteZoneDep[Id carte] IN _Ids), "Code_DEP", T_CarteZoneDep[Code_DEP])
VAR _DepChoisi =
    ISFILTERED(P_TerrDep)
        && LEFT(SELECTEDVALUE(T_CarteAffichage[Id carte]), 1) = "D"
        && NOT ISEMPTY(INTERSECT(_DepsZone, VALUES(T_Territoire[Code_DEP])))
RETURN IF(HASONEVALUE(T_CarteAffichage[Id carte]), IF(_DepChoisi, "Sélection", _RoleTable))
```

</details>

<details><summary><code>Carte Valeur</code></summary>

```dax
VAR _Ind  = SELECTEDVALUE(T_CarteIndicateur[Ordre], 1)
-- départements (codes) de la zone dessinée
VAR _Ids  = VALUES(T_CarteAffichage[Id carte])
VAR _Deps = SELECTCOLUMNS(FILTER(T_CarteZoneDep, T_CarteZoneDep[Id carte] IN _Ids), "Code_DEP", T_CarteZoneDep[Code_DEP])
RETURN
    CALCULATE(
        SWITCH(_Ind,
            1, [NB Licences],
            2, IF([Licences N-1] >= 20, [Évol 1 an]),          -- base trop petite (< 20 licences) : évolution non calculée
            3, IF([Licences 2019] >= 20, [Évol depuis 2019]),
            4, [Part femmes],
            5, [Indice de spécificité],
            6, [Licences pour 1 000 hab]
        ),
        REMOVEFILTERS(T_Territoire), REMOVEFILTERS(P_TerrChoix), REMOVEFILTERS(P_TerrAppartenance),
        REMOVEFILTERS(P_TerrDep), REMOVEFILTERS(Param_Departement),
        TREATAS(_Deps, T_Territoire[Code_DEP])
    )
```

</details>

<details><summary><code>Carte Visible</code></summary>

```dax
-- Territoire choisi : segment sur Param_Departement (ou P_TerrChoix), d'où ISCROSSFILTERED
VAR _Niv = [Carte Niveau]
VAR _NbLignes =
    IF(ISCROSSFILTERED(P_TerrChoix),
        CALCULATE(COUNTROWS(T_CarteAffichage), T_CarteAffichage[Niveau affiché] = _Niv),
        CALCULATE(COUNTROWS(T_CarteAffichage), T_CarteAffichage[Niveau affiché] = _Niv, T_CarteAffichage[Id territoire] = "TOT"))
RETURN IF(_NbLignes > 0, 1)
```

</details>

<details><summary><code>HTML Carte</code></summary>

```dax
-- =====================================================================
-- HTML Carte | bloc TERRITOIRES | page Portrait | visuel HTML Content ~745 x 500
-- Visuel placé SOUS la carte Azure Maps (marges intérieures 0, arrière-plan désactivé) :
-- la carte (fond transparent) se pose dans la zone vide entre le titre et la légende.
-- Sous-titre sur 1 ligne pleine largeur, suivi d'une icône « note de lecture » (infobulle au survol)
-- et d'alertes (infobulle au survol) : indicateur non calculable, calculable en partie seulement,
-- ou population estimée par âge (taux de licences avec une catégorie d'âge choisie).
-- Les infobulles du sous-titre s'ouvrent sous la ligne, alignées à son bord gauche : jamais coupées.
-- =====================================================================
-- 1. Réglages
VAR _HauteurCadre   = 572      -- hauteur du visuel - 20 environ (barre de défilement sinon)
VAR _PlaceSegments  = 380      -- place libre en haut à droite (segments Indicateur et Niveau géo) pour la ligne du titre
VAR _LargeurDegrade = 180      -- largeur de la barre de couleurs
VAR _LargeurInfo    = 400      -- largeur max des infobulles (note de lecture, alerte)
VAR _EspaceSousTitre = 12      -- espace au-dessus du sous-titre (px)
VAR _OpaciteCarte   = ".85"    -- même opacité que le remplissage des zones dans Azure Maps (à caler sur la carte)
-- 2. Charte
VAR _ColTxt  = [Style Couleur texte]
VAR _ColSel  = [Style Couleur marine]          -- contour du territoire choisi sur la carte
VAR _ColVide = [Style Couleur sans donnée]
VAR _TxtPet  = [Style Taille petit]
-- 3. Données
VAR _Ind    = SELECTEDVALUE(T_CarteIndicateur[Ordre], 1)
VAR _Nom    = SELECTEDVALUE(T_CarteIndicateur[Indicateur], "Licences")
VAR _Diverg = _Ind IN {2, 3, 5}
VAR _Centre = IF(_Ind = 5, 1, 0)
VAR _Fmt    = SWITCH(_Ind, 1, "#,0", 4, "0.0 %", 5, "0.00", 6, "#,0.0", "+0.0 %;-0.0 %;0.0 %")
VAR _Lo     = [Carte Min]
VAR _Hi     = [Carte Max]
VAR _Amp    = MAX(ABS(_Hi - _Centre), ABS(_Lo - _Centre))
VAR _Pal    = [Carte Palette]
VAR _C1     = LEFT(_Pal, 7)
VAR _C2     = MID(_Pal, 9, 7)
VAR _C3     = RIGHT(_Pal, 7)
VAR _Niv    = [Carte Niveau]
VAR _Force  = ISFILTERED(P_TerrDep) && SELECTEDVALUE(T_NiveauGeo[Ordre], 1) = 1
VAR _Groupe = SELECTEDVALUE(P_TerrChoix[Id territoire]) IN {"DROM", "COM", "AUT"}
VAR _Annee  = VALUE(MAX(T_Annee[Annee]))   -- T_Annee[Annee] est un texte
VAR _Terr   = [Libellé territoire]
VAR _SurCarte = NOT ISEMPTY(FILTER(ALL(T_CarteAffichage[Id carte]), [Carte Visible] = 1))
VAR _SousTitre =
    _Nom & IF(_Ind IN {1, 4, 5, 6}, " " & _Annee, " (" & _Annee & ")")
    & " · " & [Sélection libellé]
    & " · " & IF(_Groupe, "par territoire", IF(_Niv = 1, "par région", "par département" & IF(_Force, " (département choisi)")))
-- zones affichées sans valeur (taux de licences : territoires sans population INSEE)
VAR _NbSansPop =
    IF(_Ind = 6,
        COUNTROWS(
            CALCULATETABLE(
                FILTER(VALUES(T_CarteAffichage[Id carte]), [Carte Visible] = 1 && ISBLANK([Carte Valeur])),
                REMOVEFILTERS(T_CarteAffichage[Id carte], T_CarteAffichage[Latitude], T_CarteAffichage[Longitude], T_CarteAffichage[Rôle])
            )
        ))
-- évolutions et indice : bornes de la légende = 90e centile de chaque côté (mêmes bornes que Carte Couleur), « ≤ » / « ≥ » si des zones les dépassent
VAR _TabZ = CALCULATETABLE(ADDCOLUMNS(FILTER(VALUES(T_CarteAffichage[Id carte]), [Carte Visible] = 1), "@v", [Carte Valeur]), REMOVEFILTERS(T_CarteAffichage[Id carte], T_CarteAffichage[Latitude], T_CarteAffichage[Longitude], T_CarteAffichage[Rôle]))
VAR _ZP = FILTER(_TabZ, NOT ISBLANK([@v]) && [@v] > _Centre)
VAR _ZN = FILTER(_TabZ, NOT ISBLANK([@v]) && [@v] < _Centre)
VAR _MaxP = MAXX(_ZP, [@v] - _Centre)
VAR _MaxN = MAXX(_ZN, _Centre - [@v])
VAR _AmpP = IF(COUNTROWS(_ZP) >= 5, PERCENTILEX.INC(_ZP, [@v] - _Centre, 0.9), _MaxP)
VAR _AmpN = IF(COUNTROWS(_ZN) >= 5, PERCENTILEX.INC(_ZN, _Centre - [@v], 0.9), _MaxN)
VAR _L1 = IF(_Diverg, IF(_MaxN > _AmpN, "≤ ") & FORMAT(_Centre - COALESCE(_AmpN, _AmpP, 0), _Fmt), FORMAT(_Lo, _Fmt))
VAR _L2 = IF(_Diverg, "<span>" & FORMAT(_Centre, _Fmt) & "</span>", "")
VAR _L3 = IF(_Diverg, IF(_MaxP > _AmpP, "≥ ") & FORMAT(_Centre + COALESCE(_AmpP, _AmpN, 0), _Fmt), FORMAT(_Hi, _Fmt))
-- 4. Note de lecture par indicateur (infobulle du sous-titre) et raison d'un calcul impossible
VAR _Lecture =
    SWITCH(_Ind,
        1, "<b>Licences</b> : nombre de licences de la sélection dans chaque zone en " & _Annee & ".<br>Plus la couleur est foncée, plus la zone compte de licences (couleurs réparties par rang entre les zones affichées).",
        2, "<b>Évolution sur 1 an</b> : (licences " & _Annee & " − licences " & (_Annee - 1) & ") ÷ licences " & (_Annee - 1) & ".<br>Vert = hausse, rouge = baisse.<br>À champ constant (méthode INJEP) : seules les fédérations présentes chaque année depuis 2016 comptent.<br>Zones de moins de 20 licences l'année de départ : non calculées (pourcentage trop instable).<br>Couleurs bornées au 90e centile : les évolutions extrêmes prennent la couleur la plus foncée.",
        3, "<b>Évolution depuis 2019</b> : (licences " & _Annee & " − licences 2019) ÷ licences 2019, 2019 étant l'année d'avant la crise sanitaire.<br>Vert = hausse, rouge = baisse.<br>À champ constant (méthode INJEP) : seules les fédérations présentes chaque année depuis 2016 comptent.<br>Zones de moins de 20 licences l'année de départ : non calculées (pourcentage trop instable).<br>Couleurs bornées au 90e centile : les évolutions extrêmes prennent la couleur la plus foncée.",
        4, "<b>Part de femmes</b> : licences féminines ÷ licences de la zone en " & _Annee & ".<br>Plus la couleur est foncée, plus la part est élevée.",
        5, "<b>Indice de spécificité</b> : poids de la sélection dans la zone ÷ son poids dans l'ensemble des licences (territoire Total).<br>Poids = licences de la sélection ÷ toutes les licences de la zone.<br>1 = même poids qu'au total ; 1,45 = 45 % de plus ; 0,80 = 20 %
-- … (code tronqué : 14 317 caractères au total  voir le fichier TMDL)
```

</details>

## 07. Page Portrait\En-tête et chiffres clés

| Mesure | Format | Masquée | Description |
|---|---|:-:|---|
| `HTML Chiffres clés` |  |  | Chiffres clés de la page Portrait (visuel HTML Content, ~1500 x 205) : 4 cartes. Licences (+ logo de la fédération) ; évolution sur 1 an ; évolution depuis 2019 ; poids. Libellés longs tronqués avec « … » et texte complet au survol ; chiffres jamais coupés ; infobulles de lecture. |
| `HTML En-tête` |  |  | En-tête de page sur deux lignes (visuel HTML Content). Ligne 1 = identité : logo, type, nom, famille / sous-famille / groupe. Ligne 2 = barre « Votre sélection » : territoire et année (texte avec icône), genre et âge en pastilles orange s'ils sont choisis. |

<details><summary><code>HTML Chiffres clés</code></summary>

```dax
-- =====================================================================
-- HTML Chiffres clés | page Portrait | visuel HTML Content ~1558 x 205
-- 4 cartes : Licences / Évolution 1 an / Évolution depuis 2019 / Poids
-- Mise en page FIXE : chaque carte garde les mêmes lignes quels que soient les segments
-- (une valeur sans objet s'affiche « – » en gris, avec la raison au survol).
-- Dépend de : Sélection mode, Sélection libellé, Évol 1 an, Évol depuis 2019,
--             Licences ensemble, charte (dossier 0. Style)
-- =====================================================================
-- 1. Réglages
VAR _Colonnes        = "1fr 1fr 1fr 1.15fr"   -- largeur relative des 4 cartes
VAR _AnneeAvantCovid = 2019
VAR _FmtEvol         = "+0.0 %;-0.0 %;0.0 %"
VAR _FmtEcart        = "+#,0;-#,0;0"
VAR _TexteHerosClair = "#B7C9F0"
-- 2. Charte
VAR _Police  = [Style Police]
VAR _ColTxt  = [Style Couleur texte]
VAR _ColFort = [Style Couleur texte fort]
VAR _ColLib  = [Style Couleur texte libellé]
VAR _ColNeut = [Style Couleur neutre]
VAR _ColGril = [Style Couleur grille]
VAR _ColVide = [Style Couleur bordure forte]
VAR _TxtTxt  = [Style Taille texte]
VAR _TxtPet  = [Style Taille petit]
VAR _TxtChif = [Style Taille chiffre]
-- 3. Contexte (sélection)
VAR _Mode    = [Sélection mode]
VAR _UneFed  = _Mode = "Fédération"
VAR _AvecReg = _Mode IN {"Fédération", "Plusieurs fédérations"} && NOT ISBLANK([Nom regroupement])
VAR _NomSel  = [Sélection libellé]
VAR _ModeReg = _Mode = "Regroupement"      -- regroupement entier sélectionné : il occupe la ligne « regroupement » (orange)
VAR _NomReg  = IF(_AvecReg, [Niveau choisi] & " · " & [Nom regroupement], IF(_ModeReg, [Niveau choisi] & " · " & _NomSel, "Regroupement"))
VAR _PourquoiPasReg =
    SWITCH(_Mode,
        "Ensemble",     "Aucun regroupement : choisissez une fédération ou un regroupement.",
        "Regroupement", "La sélection est déjà un regroupement.",
        "Les fédérations choisies n'appartiennent pas au même regroupement.")
VAR _AnRef   = VALUE(MAX(T_Annee[Annee]))
VAR _Logo    = IF(_UneFed, SELECTEDVALUE(T_Federation[Logo URL]))
-- 4. Données
VAR _Lic     = [NB Licences]
VAR _LicN1   = [Licences N-1]
VAR _Lic19   = [Licences 2019]
VAR _LicCC   = [Licences champ constant]   -- base des évolutions (champ constant, méthode INJEP)
VAR _CCN     = [Champ constant note]
VAR _CCaff   = NOT ISBLANK(_CCN)   -- la sélection compte des fédérations hors champ constant
VAR _HorsN   = CALCULATE(DISTINCTCOUNT(F_Licences[CodeReference]), KEEPFILTERS(T_Federation[Champ constant] = "Non"))
VAR _HorsL   = CALCULATE([NB Licences], KEEPFILTERS(T_Federation[Champ constant] = "Non"))
VAR _CCTitre = IF(_CCaff, "<span style='font-weight:400;color:" & _ColNeut & "'> · champ constant</span>")
VAR _E1      = [Évol 1 an]
VAR _E19     = IF(_AnRef > _AnneeAvantCovid, [Évol depuis 2019])
VAR _E1Reg   = IF(_AvecReg, CALCULATE([Évol 1 an], Comparaison[Comparaison] = "Regroupement"), IF(_ModeReg, _E1))
VAR _E19Reg  = IF(_AvecReg && _AnRef > _AnneeAvantCovid, CALCULATE([Évol depuis 2019], Comparaison[Comparaison] = "Regroupement"), IF(_ModeReg, _E19))
VAR _E1Ens   = CALCULATE([Évol 1 an], Comparaison[Comparaison] = "Ensemble")
VAR _E19Ens  = IF(_AnRef > _AnneeAvantCovid, CALCULATE([Évol depuis 2019], Comparaison[Comparaison] = "Ensemble"))
VAR _LicEns  = [Licences ensemble]
VAR _Groupe  = IF(_UneFed, SELECTEDVALUE(T_Federation[Groupe de fédérations]))
VAR _Famille = IF(_UneFed, SELECTEDVALUE(T_Federation[Famille de fédérations]))
VAR _LicGroupe = IF(_UneFed, CALCULATE([NB Licences], REMOVEFILTERS(T_Federation), REMOVEFILTERS(P_Federation), REMOVEFILTERS(P_Niveaux), REMOVEFILTERS(P_Appartenance), REMOVEFILTERS(Param_Federation), T_Federation[Groupe de fédérations] = _Groupe))
VAR _LicFam    = IF(_UneFed, CALCULATE([NB Licences], REMOVEFILTERS(T_Federation), REMOVEFILTERS(P_Federation), REMOVEFILTERS(P_Niveaux), REMOVEFILTERS(P_Appartenance), REMOVEFILTERS(Param_Federation), T_Federation[Famille de fédérations] = _Famille))
VAR _Ecart1  = IF(NOT ISBLANK(_LicN1), _LicCC - _LicN1)
VAR _Ecart19 = IF(_AnRef > _AnneeAvantCovid && NOT ISBLANK(_Lic19), _LicCC - _Lic19)
-- 5. Icônes (CC = couleur du trait, PP = tracé de la flèche)
VAR _Svg     = "<svg width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='CC' stroke-width='2.2' stroke-linecap='round' stroke-linejoin='round'>"
VAR _IcoLic  = _Svg & "<circle cx='9' cy='8' r='3.2'/><path d='M3 20c.7-3.4 3-5.2 6-5.2s5.3 1.8 6 5.2'/><circle cx='17' cy='9' r='2.4'/><path d='M16.5 14.6c2.3.2 4 1.8 4.5 4.4'/></svg>"
VAR _IcoE1   = _Svg & "<path d='M4 17l6-6 4 4 6-7'/><path d='M14 8h6v6'/></svg>"
VAR _IcoE19  = _Svg & "<path d='M3 12a9 9 0 1 0 3-6.7'/><path d='M3 4v5h5'/><path d='M12 8v4l3 2'/></svg>"
VAR _IcoPds  = _Svg & "<path d='M12 3a9 9 0 1 0 9 9h-9z'/><path d='M15 3.5A9 9 0 0 1 20.5 9H15z'/></svg>"
VAR _Fleche  = "<svg width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='CC' stroke-width='2.6' stroke-linecap='round' stroke-linejoin='round'><path d='PP'/></svg>"
VAR _Haut    = "M12 19V5M5 12l7-7 7 7"
VAR _Bas     = "M12 5v14M5 12l7 7 7-7"
-- 6. Gabarits
VAR _Carte   = "<div style='background:#FFFFFF;border:1px solid " & _ColGril & ";border-radius:16px;padding:12px 16px;display:flex;flex-direction:column;min-width:0;box-shadow:0 1px 2px rgba(16,24,40,.04)'>"
VAR _Tete    = "<div style='display:flex;align-items:center;gap:10px;padding-bottom:8px;border-bottom:1px solid " & [Style Couleur fond neutre] & "'><span style='flex:none;display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;border-radius:8px;background:"
VAR _TeteMil = "'>"
VAR _TeteTxt = "</span><span class='el' style='font-size:" & _TxtTxt & "px;font-weight:700;color:" & _ColTxt & "'>"
VAR _TeteFin = "</span></div>"
VAR _Note    = "<div class='el' style='font-size:" & _TxtPet & "px;color:" & _ColNeut & ";margin-top:4px'>"
VAR _Vide    = "<span style='font-size:" & _TxtChif & "px;font-weight:700;color:" & _ColVide & ";line-height:1'>–</sp
-- … (code tronqué : 19 559 caractères au total  voir le fichier TMDL)
```

</details>

<details><summary><code>HTML En-tête</code></summary>

```dax
-- =====================================================================
-- HTML En-tête | haut de page Portrait | visuel HTML Content ~1527 x 150 (marges 0)
-- Ligne 1 : identité de la sélection (logo, nom, rattachement ou nombre de fédérations)
-- Ligne 2 : barre « Votre sélection » (territoire, année, public)
-- Mise en page FIXE : mêmes lignes et mêmes emplacements quels que soient les segments.
-- Hauteur bloquée (100vh + overflow:hidden) : jamais de barre de défilement ;
-- les infobulles de la ligne 2 s'ouvrent donc vers le haut.
-- Dépend de : Sélection mode / libellé / liste / nb fédérations, Libellé territoire, charte
-- =====================================================================
-- 1. Réglages
VAR _TailleLogo = 72           -- carré du logo (px)
VAR _MargeLogo  = 8
VAR _TailleNom  = 26
-- 2. Charte
VAR _Police  = [Style Police]
VAR _ColTxt  = [Style Couleur texte]
VAR _ColLib  = [Style Couleur texte libellé]
VAR _ColDisc = [Style Couleur texte discret]
VAR _ColBord = [Style Couleur bordure]
VAR _ColFond = [Style Couleur fond cadre]
VAR _ColReg  = [Style Couleur regroupement]
-- 3. Contexte
VAR _Mode    = [Sélection mode]
VAR _UneFed  = _Mode = "Fédération"
VAR _Logo    = IF(_UneFed, SELECTEDVALUE(T_Federation[Logo URL]))
VAR _NomLong = IF(_UneFed, SELECTEDVALUE(T_Federation[Federation]), [Sélection libellé])
VAR _AnRef   = MAX(T_Annee[Annee])
VAR _Statut  = CALCULATE(MAX(T_Annee[Statut]), REMOVEFILTERS(T_Annee), T_Annee[Annee] = _AnRef)
VAR _NbFed   = [Sélection nb fédérations]
VAR _Terr    = [Libellé territoire]
VAR _Genres  = IF(ISFILTERED(T_Sexe), CONCATENATEX(VALUES(T_Sexe[Genre]), T_Sexe[Genre], " + "))
VAR _Ages    = IF(ISFILTERED(T_TrancheAge), CONCATENATEX(SUMMARIZE(T_TrancheAge, T_TrancheAge[Catégorie d'âge], T_TrancheAge[Ordre]), T_TrancheAge[Catégorie d'âge], " + ", T_TrancheAge[Ordre], ASC))
-- 4. Gabarits
VAR _Gras    = "<b style='color:" & _ColTxt & ";font-weight:600'>"
VAR _Pastille = "<span class='tt' style='display:inline-flex;align-items:center;gap:6px;height:26px;padding:0 11px;border-radius:13px;background:" & _ColFond & ";border:1px solid " & _ColBord & ";font-size:13px;color:" & _ColLib & ";white-space:nowrap'>"
VAR _Ico     = "<svg width='15' height='15' viewBox='0 0 24 24' fill='none' stroke='" & _ColDisc & "' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'>"
VAR _IcoTerr = _Ico & "<path d='M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z'/><circle cx='12' cy='9.5' r='2.5'/></svg>"
VAR _IcoAn   = _Ico & "<rect x='4' y='5' width='16' height='15' rx='2'/><path d='M4 10h16M9 3v4M15 3v4'/></svg>"
VAR _IcoPub  = _Ico & "<circle cx='9' cy='8' r='3.2'/><path d='M3 20c.7-3.4 3-5.2 6-5.2s5.3 1.8 6 5.2'/></svg>"
VAR _IcoToutes = "<svg width='38' height='38' viewBox='0 0 24 24' fill='none' stroke='" & [Style Couleur icône] & "' stroke-width='1.8'><rect x='4' y='4' width='7' height='7' rx='1.5'/><rect x='13' y='4' width='7' height='7' rx='1.5'/><rect x='4' y='13' width='7' height='7' rx='1.5'/><rect x='13' y='13' width='7' height='7' rx='1.5'/></svg>"
-- 5. Ligne 1 : identité
VAR _Visuel =
    IF(NOT ISBLANK(_Logo) && _Logo <> "",
        "<img src='" & SUBSTITUTE(_Logo, "'", "%27") & "' style='max-width:" & (_TailleLogo - 2 * _MargeLogo) & "px;max-height:" & (_TailleLogo - 2 * _MargeLogo) & "px;object-fit:contain'/>",
        _IcoToutes)
VAR _Rattachement =      -- pastilles sous le nom : rattachement (une fédération) ou nombre de fédérations
    SWITCH(_Mode,
        "Fédération",
            _Pastille & "Famille " & _Gras & SELECTEDVALUE(T_Federation[Famille de fédérations]) & "</b></span>"
            & _Pastille & "Sous-famille " & _Gras & TRIM(SELECTEDVALUE(T_Federation[Sous-famille de fédérations])) & "</b></span>"
            & _Pastille & "Groupe " & _Gras & SELECTEDVALUE(T_Federation[Groupe de fédérations]) & "</b></span>",
        "Regroupement",
            _Pastille & "<i style='width:8px;height:8px;border-radius:50%;background:" & _ColReg & "'></i>" & [Niveau choisi] & " " & _Gras & _NomLong & "</b></span>"
            & _Pastille & _Gras & _NbFed & "</b> fédération" & IF(_NbFed > 1, "s") & "<span class='tip bas'>" & [Sélection liste] & "</span></span>",
        "Plusieurs fédérations",
            _Pastille & _Gras & _NbFed & "</b> fédérations choisies<span class='tip bas'>" & [Sélection liste] & "</span></span>",
        _Pastille & _Gras & _NbFed & "</b> fédérations agréées en " & _AnRef & "</span>")
VAR _Ligne1 =
    "<div style='display:flex;align-items:center;gap:18px'>"
    & "<div style='width:" & _TailleLogo & "px;height:" & _TailleLogo & "px;flex:none;border-radius:16px;background:#FFFFFF;border:1px solid " & _ColBord & ";box-shadow:0 1px 2px rgba(16,24,40,.05);display:flex;align-items:center;justify-content:center'>" & _Visuel & "</div>"
    & "<div style='min-width:0;flex:1'>"
    & "<div class='tt' style='display:flex;min-width:0'><span class='el' style='font-size:" & _TailleNom & "px;font-weight:700;color:" & _ColTxt & ";line-height:1.2;letter-spacing:-.01em'>" & SUBSTITUTE(_NomLong, "&", "&amp;") & "</span>"
    & "<span class='tip bas'><b>" & SUBSTITUTE(_NomLong, "&", "&amp;") & "</b>" & IF(_Mode = "Plusieurs fédérations", "<br>" & [Sélection liste]) & "</span></div>"
    & "<div style='display:flex;gap:8px;flex-wrap:nowrap;overflow:hidden;margin-top:8px'>" & _Rattachement & "</div>"
    & "</div></div>"
-- 6. Ligne 2 : votre sélection (territoire, année, public)
VAR _Elem   = "<span class='tt' style='display:inline-flex;align-items:center;gap:6px;font-size:14px;color:" & _ColLib & ";white-space:nowrap'>"
VAR _Sep    = "<span style='flex:none;width:4px;height:4px;border-radius:50%;background:" & [Style Couleur bordure forte] & "'></span>"
VAR _Actif  = "<span style='display:inline-flex;align-items:center;gap:7px;height:26px;padding:0 11px;border-radius:13px;background:" & [Style Couleur filtre actif fond] & ";border:1px solid " & [Style Couleur filtre actif bordure] & ";font-size:13px;color:" & [Style 
-- … (code tronqué : 7 434 caractères au total  voir le fichier TMDL)
```

</details>

## 07. Page Portrait\Profil

| Mesure | Format | Masquée | Description |
|---|---|:-:|---|
| `HTML Qui` |  |  | Bloc PROFIL de la page Portrait (visuel HTML Content ~680 x 870) : assemble les sections Genre (HTML Qui Profil), Âge (HTML Qui Âges) et Pyramide (HTML Qui Pyramide). |
| `HTML Qui Profil` |  | oui | Bloc PROFIL, section Genre : part de femmes (ou d'hommes si filtré), effectifs au-dessus de la barre, comparaison au regroupement et à l'ensemble, infobulles. |
| `HTML Qui Pyramide` |  | oui | Bloc PROFIL, section Pyramide des âges : tranches calées sur les grandes catégories (âge exact), échelle en nombre de licences, courbe de comparaison (regroupement ou ensemble, à effectif égal), total au centre, infobulles. Styles SVG en classes pour rester sous la taille maximale d'un texte (32 000 caractères). |
| `HTML Qui Âges` |  | oui | Bloc PROFIL, section Âge : âge moyen (âge exact), parts par grande catégorie au-dessus de la barre, comparaison au regroupement et à l'ensemble, infobulles. |

<details><summary><code>HTML Qui</code></summary>

```dax
-- =====================================================================
-- HTML Qui | bloc PROFIL | page Portrait | visuel HTML Content ~680 x 984
-- Assemble : HTML Qui Profil (Genre), HTML Qui Âges (Âge), HTML Qui Pyramide
-- =====================================================================
-- 1. Réglages
VAR _HauteurCadre = 985      -- hauteur du visuel (984) - 19 : jamais de barre de défilement
-- 2. Contexte : filtres de public actifs (pastille en haut à droite)
VAR _GSel  = IF(ISFILTERED(T_Sexe) && HASONEVALUE(T_Sexe[Sexe]), SELECTEDVALUE(T_Sexe[Sexe]))
VAR _CSel  = IF(ISFILTERED(T_TrancheAge) && HASONEVALUE(T_TrancheAge[Ordre]), SELECTEDVALUE(T_TrancheAge[Ordre]))
VAR _CLib  = IF(NOT ISBLANK(_CSel), SELECTEDVALUE(T_TrancheAge[TrancheAge]))
VAR _CNom  = IF(NOT ISBLANK(_CLib), TRIM(MID(_CLib, 5, SEARCH("(", _CLib, 1, LEN(_CLib) + 1) - 5)))
VAR _GNom  = SWITCH(_GSel, "F", "Femmes", "H", "Hommes")
VAR _Actif = CONCATENATEX(FILTER({_GNom, _CNom}, NOT ISBLANK([Value])), [Value], " · ")
VAR _NbLic = CALCULATE([NB Licences], REMOVEFILTERS(T_Sexe))
-- 3. Gabarits
VAR _Pastille =
    IF(NOT ISBLANK(_Actif),
        "<span class='tt' style='flex:none;display:inline-flex;align-items:center;gap:6px;height:26px;padding:0 11px;border-radius:13px;background:" & [Style Couleur filtre actif fond] & ";border:1px solid " & [Style Couleur filtre actif bordure] & ";color:" & [Style Couleur filtre actif texte] & ";font-size:" & [Style Taille petit] & "px;font-weight:600'><i style='width:6px;height:6px;border-radius:50%;background:" & [Style Couleur filtre actif point] & "'></i>" & _Actif
        & "<span class='tip bas'>Filtre de public actif : les chiffres portent sur ce public.<br><span>Le genre ou l'âge choisi est mis en évidence dans les graphiques.</span></span></span>")
VAR _Titre =
    "<div style='display:flex;align-items:flex-start;justify-content:space-between;gap:12px'>"
    & "<div style='min-width:0'><div style='" & [Style CSS ligne titre] & "'>"
    & "<span style='" & [Style CSS rubrique] & "'>PROFIL</span>"
    & "<span style='" & [Style CSS titre bloc] & "'>Profil des licenciés</span></div>"
    & "<div class='el' style='" & [Style CSS sous-titre] & "'>Genre et âge · " & [Sélection libellé] & " · " & [Libellé territoire] & " · " & MAX(T_Annee[Annee]) & "</div></div>"
    & _Pastille & "</div>"
VAR _Corps =
    IF(ISBLANK(_NbLic),
        "<div style='flex:1;margin-top:16px;border:1.5px dashed " & [Style Couleur bordure forte] & ";border-radius:10px;display:flex;flex-direction:column;gap:4px;align-items:center;justify-content:center;text-align:center;font-size:" & [Style Taille texte] & "px;color:" & [Style Couleur texte libellé] & "'><b style='color:" & [Style Couleur texte] & "'>Aucune licence pour cette sélection</b><span style='font-size:" & [Style Taille petit] & "px'>Élargissez un filtre (fédération, territoire, public).</span></div>",
        "<div style='display:grid;grid-template-columns:1fr 1fr;gap:40px;margin-top:20px'>" & [HTML Qui Profil] & [HTML Qui Âges] & "</div>"
        & "<div style='margin-top:30px'>" & [HTML Qui Pyramide] & "</div>")
-- 4. Assemblage
RETURN
    [Style CSS commun]
    & "<div style='" & [Style CSS cadre] & ";height:" & _HauteurCadre & "px;color:" & [Style Couleur texte] & "'>"
    & _Titre & _Corps & "</div>"
```

</details>

<details><summary><code>HTML Qui Profil</code></summary>

```dax
-- =====================================================================
-- HTML Qui Profil | section « Genre » du bloc PROFIL (assemblée par HTML Qui)
-- Hiérarchie : chiffre clé > valeurs F / H (libellé, effectif, part) > barre > comparaison (valeurs)
-- Même structure que HTML Qui Âges : les deux colonnes restent alignées ligne à ligne.
-- Mise en page FIXE : les 2 lignes de comparaison sont toujours là (grisées si sans objet).
-- Regroupement entier sélectionné : il occupe la ligne « regroupement » (orange).
-- =====================================================================
-- 1. Charte
VAR _ColF    = [Style Couleur femmes]
VAR _ColH    = [Style Couleur hommes]
VAR _ColInac = [Style Couleur neutre clair]
VAR _ColEns  = [Style Couleur ensemble]
VAR _ColReg  = [Style Couleur regroupement]
VAR _ColTxt  = [Style Couleur texte]
VAR _ColLib  = [Style Couleur texte libellé]
VAR _ColFort = [Style Couleur texte fort]
VAR _ColNeut = [Style Couleur neutre]
VAR _ColPist = [Style Couleur fond neutre]
VAR _TxtTxt  = [Style Taille texte]
VAR _TxtVal  = [Style Taille valeur]
VAR _TxtChif = [Style Taille chiffre]
VAR _Gris    = "opacity:.4;"
-- 2. Contexte
VAR _Mode    = [Sélection mode]
VAR _ModeReg = _Mode = "Regroupement"
VAR _AvecSel = _Mode <> "Ensemble"
VAR _AvecReg = _Mode IN {"Fédération", "Plusieurs fédérations"} && NOT ISBLANK([Nom regroupement])
VAR _NomReg  = SWITCH(TRUE(), _ModeReg, [Sélection libellé], _AvecReg, [Niveau choisi] & " · " & [Nom regroupement], "Regroupement")
VAR _PourquoiPasReg = IF(_Mode = "Ensemble", "Choisissez une fédération ou un regroupement.", "Les fédérations choisies n'appartiennent pas au même regroupement.")
VAR _GSel    = IF(ISFILTERED(T_Sexe) && HASONEVALUE(T_Sexe[Sexe]), SELECTEDVALUE(T_Sexe[Sexe]))
VAR _OnF     = ISBLANK(_GSel) || _GSel = "F"
VAR _OnH     = ISBLANK(_GSel) || _GSel = "H"
-- 3. Données
VAR _F    = CALCULATE([NB Licences], REMOVEFILTERS(T_Sexe), T_Sexe[Sexe] = "F") + 0
VAR _H    = CALCULATE([NB Licences], REMOVEFILTERS(T_Sexe), T_Sexe[Sexe] = "H") + 0
VAR _PF   = DIVIDE(_F, _F + _H)
VAR _Cible = IF(_GSel = "H", "H", "F")
VAR _PartC = IF(_Cible = "H", 1 - _PF, _PF)
VAR _ColC  = IF(_Cible = "H", _ColH, _ColF)
VAR _LibC  = IF(_Cible = "H", "d'hommes", "de femmes")
VAR _RegF = IF(_AvecReg, CALCULATE([NB Licences], REMOVEFILTERS(T_Sexe), T_Sexe[Sexe] = "F", Comparaison[Comparaison] = "Regroupement"))
VAR _RegH = IF(_AvecReg, CALCULATE([NB Licences], REMOVEFILTERS(T_Sexe), T_Sexe[Sexe] = "H", Comparaison[Comparaison] = "Regroupement"))
VAR _EnsF = CALCULATE([NB Licences], REMOVEFILTERS(T_Sexe), T_Sexe[Sexe] = "F", Comparaison[Comparaison] = "Ensemble")
VAR _EnsH = CALCULATE([NB Licences], REMOVEFILTERS(T_Sexe), T_Sexe[Sexe] = "H", Comparaison[Comparaison] = "Ensemble")
VAR _PRegF = IF(_ModeReg, _PF, DIVIDE(_RegF, _RegF + _RegH))          -- part de femmes du regroupement
VAR _PEnsF = IF(_AvecSel, DIVIDE(_EnsF, _EnsF + _EnsH))                -- part de femmes de l'ensemble
VAR _RegC  = IF(NOT ISBLANK(_PRegF), IF(_Cible = "H", 1 - _PRegF, _PRegF))
VAR _EnsC  = IF(NOT ISBLANK(_PEnsF), IF(_Cible = "H", 1 - _PEnsF, _PEnsF))
-- 4. Valeurs F / H au-dessus de la barre : libellé / effectif / part (3 lignes, comme les âges)
VAR _TipF = "<div class='tip'><b>Femmes</b> · " & FORMAT(_PF, "0.0 %") & " des licences<br>" & FORMAT(_F, "#,0") & " licences" & IF(_AvecSel, "<br><span>Ensemble des fédérations : " & FORMAT(_PEnsF, "0.0 %") & "</span>") & "</div>"
VAR _TipH = "<div class='tip'><b>Hommes</b> · " & FORMAT(1 - _PF, "0.0 %") & " des licences<br>" & FORMAT(_H, "#,0") & " licences" & IF(_AvecSel, "<br><span>Ensemble des fédérations : " & FORMAT(1 - _PEnsF, "0.0 %") & "</span>") & "</div>"
VAR _Item = "<div class='tt' style='min-width:0;ALI'><div style='font-size:13px;color:" & _ColNeut & ";white-space:nowrap'><i style='display:inline-block;width:8px;height:8px;border-radius:50%;margin-right:6px;background:COL'></i>NOM</div><div class='nb' style='font-size:12px;color:" & _ColNeut & ";margin-top:1px'>SUB</div><b class='nb' style='display:block;font-size:" & _TxtVal & "px;font-weight:700;color:" & _ColTxt & ";margin-top:2px'>PCT</b>TIP</div>"
VAR _Valeurs =
    "<div style='display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:20px'>"
    & SUBSTITUTE(SUBSTITUTE(SUBSTITUTE(SUBSTITUTE(SUBSTITUTE(SUBSTITUTE(_Item, "ALI", IF(_OnF, "", _Gris)), "COL", _ColF), "NOM", "Femmes"), "SUB", FORMAT(_F, "#,0") & " licences"), "PCT", FORMAT(_PF, "0.0 %")), "TIP", _TipF)
    & SUBSTITUTE(SUBSTITUTE(SUBSTITUTE(SUBSTITUTE(SUBSTITUTE(SUBSTITUTE(_Item, "ALI", "text-align:right;" & IF(_OnH, "", _Gris)), "COL", _ColH), "NOM", "Hommes"), "SUB", FORMAT(_H, "#,0") & " licences"), "PCT", FORMAT(1 - _PF, "0.0 %")), "TIP", _TipH)
    & "</div>"
-- 5. Barre de répartition (un genre sans licence n'est pas dessiné)
VAR _Barre =
    "<div style='display:flex;gap:2px;height:14px;margin-top:8px'>"
    & IF(_F > 0, "<div class='tt' style='width:" & FORMAT(_PF * 100, "0.0", "en-US") & "%;border-radius:4px;background:" & IF(_OnF, _ColF, _ColInac) & "'>" & _TipF & "</div>")
    & IF(_H > 0, "<div class='tt' style='flex:1;border-radius:4px;background:" & IF(_OnH, _ColH, _ColInac) & "'>" & _TipH & "</div>")
    & "</div>"
-- 6. Comparaison : part de la cible pour le regroupement et l'ensemble (toujours 2 lignes)
VAR _LigneComp = "<div class='tt' style='display:flex;align-items:center;gap:8px;font-size:" & [Style Taille petit] & "px;color:" & _ColLib & ";OPA'><i style='flex:none;width:8px;height:8px;border-radius:50%;background:COL'></i><span class='el' style='flex:1'>NOM</span><b class='nb' style='font-size:15px;font-weight:700;color:" & _ColFort & "'>VAL</b><div class='tip'>TIP</div></div>"
VAR _Comp =
    "<div style='margin-top:auto;padding-top:22px;display:flex;flex-direction:column;gap:8px'>"
    & "<div style='font-size:13px;color:" & _ColNeut & ";padding-top:10px;border-top:1px dashed " & [Style Couleur grille] & "'>Comparaison · part " & _LibC & "</div>"
    & SUBSTITUTE(SUBSTITU
-- … (code tronqué : 8 764 caractères au total  voir le fichier TMDL)
```

</details>

<details><summary><code>HTML Qui Pyramide</code></summary>

```dax
-- =====================================================================
-- HTML Qui Pyramide | section « Pyramide des âges » du bloc PROFIL (assemblée par HTML Qui)
-- Barres femmes / hommes par tranche d'âge exact, regroupées par grande catégorie.
-- Courbe de comparaison : répartition du regroupement (ou de l'ensemble) ramenée
-- au même nombre total de licences que la sélection (« à effectif égal »).
-- Présentation alignée sur la section Âge : pastille de la catégorie dans la couleur du genre filtré (ou couleur neutre),
-- avec la même transparence par catégorie (Enfants 1, Ados .72, Adultes .5, Seniors .3 ; catégorie choisie 1, autres .18),
-- part en gras (1 décimale), nombre de licences en plus petit ; infobulle de la charte (fond sombre).
-- ATTENTION TAILLE : le bloc PROFIL (HTML Qui = Genre + Âge + Pyramide) ne doit pas dépasser 32 000 caractères
-- (erreur mémoire sinon), y compris avec la comparaison (regroupement ou ensemble). Pire cas mesuré : environ 29 700.
-- Garder les infobulles courtes et les styles en classes (.py ...).
-- Mise en page FIXE : légende complète et alerte « effectif faible » dans l'en-tête (rien ne se décale).
-- =====================================================================
-- 1. Réglages
VAR _Bandes =
DATATABLE("Lo", INTEGER, "Hi", INTEGER, "Cat", INTEGER, {   -- âge min, âge max, catégorie (1 Enfants … 4 Seniors)
{1, 5, 1}, {6, 9, 1}, {10, 13, 1},
{14, 17, 2}, {18, 20, 2},
{21, 25, 3}, {26, 30, 3}, {31, 35, 3}, {36, 40, 3}, {41, 45, 3}, {46, 50, 3}, {51, 55, 3},
{56, 60, 4}, {61, 65, 4}, {66, 70, 4}, {71, 75, 4}, {76, 80, 4}, {81, 99, 4}
})
VAR _SeuilFaible = 2000      -- en dessous : alerte « effectif faible »
VAR _Wp  = 678               -- largeur SVG
VAR _Gl  = 134               -- colonne des catégories à gauche (pastille, nom, tranche et part, nombre)
VAR _Lc  = 128               -- colonne centrale (âge + total)
VAR _Hr  = 22                -- hauteur d'une ligne (bloc de 984 px de haut)
VAR _Hb  = 13                -- épaisseur d'une barre
VAR _Gap = 8                 -- espace entre deux catégories
VAR _FondCat = "#FAFBFF"     -- fond d'une catégorie : bleu-violet extrêmement clair
-- 2. Charte
VAR _ColF    = [Style Couleur femmes]
VAR _ColH    = [Style Couleur hommes]
VAR _ColInac = [Style Couleur neutre clair]
VAR _ColTxt  = [Style Couleur texte]
VAR _ColLib  = [Style Couleur texte libellé]
VAR _ColFort = [Style Couleur texte fort]
VAR _ColNeut = [Style Couleur neutre]
VAR _ColPist = [Style Couleur fond neutre]
VAR _ColGril = [Style Couleur grille]
VAR _TxtTxt  = [Style Taille texte]
VAR _TxtPet  = [Style Taille petit]
-- 3. Contexte
VAR _Mode    = [Sélection mode]
VAR _AvecSel = _Mode <> "Ensemble"
VAR _AvecReg = _Mode IN {"Fédération", "Plusieurs fédérations"} && NOT ISBLANK([Nom regroupement])
VAR _Comp    = IF(_AvecReg, "Regroupement", IF(_AvecSel, "Ensemble"))
VAR _NomComp = IF(_AvecReg, [Niveau choisi] & " · " & [Nom regroupement], "Ensemble des fédérations")
VAR _ColComp = IF(_AvecReg, [Style Couleur regroupement], [Style Couleur ensemble])
VAR _GSel    = IF(ISFILTERED(T_Sexe) && HASONEVALUE(T_Sexe[Sexe]), SELECTEDVALUE(T_Sexe[Sexe]))
VAR _CSel    = IF(ISFILTERED(T_TrancheAge) && HASONEVALUE(T_TrancheAge[Ordre]), VALUE(SELECTEDVALUE(T_TrancheAge[Ordre])))
VAR _ColA    = SWITCH(_GSel, "F", _ColF, "H", _ColH, [Style Couleur poids])   -- couleur du genre filtré, sinon neutre (comme la section Âge)
VAR _ClF     = IF(ISBLANK(_GSel) || _GSel = "F", "bf", "bi")   -- classe des barres femmes
VAR _ClH     = IF(ISBLANK(_GSel) || _GSel = "H", "bh", "bi")   -- classe des barres hommes
-- 4. Données (toutes catégories, deux genres : la sélection est mise en évidence)
VAR _TabP =
ADDCOLUMNS(_Bandes,
"@ft", VAR _a = [Lo] VAR _b = [Hi] RETURN CALCULATE([NB Licences], REMOVEFILTERS(T_Sexe), REMOVEFILTERS(T_TrancheAge), T_Sexe[Sexe] = "F", F_Licences[Age] >= _a, F_Licences[Age] <= _b) + 0,
"@ht", VAR _a = [Lo] VAR _b = [Hi] RETURN CALCULATE([NB Licences], REMOVEFILTERS(T_Sexe), REMOVEFILTERS(T_TrancheAge), T_Sexe[Sexe] = "H", F_Licences[Age] >= _a, F_Licences[Age] <= _b) + 0,
"@fc", VAR _a = [Lo] VAR _b = [Hi] RETURN IF(NOT ISBLANK(_Comp), CALCULATE([NB Licences], REMOVEFILTERS(T_Sexe), REMOVEFILTERS(T_TrancheAge), T_Sexe[Sexe] = "F", F_Licences[Age] >= _a, F_Licences[Age] <= _b, Comparaison[Comparaison] = _Comp) + 0),
"@hc", VAR _a = [Lo] VAR _b = [Hi] RETURN IF(NOT ISBLANK(_Comp), CALCULATE([NB Licences], REMOVEFILTERS(T_Sexe), REMOVEFILTERS(T_TrancheAge), T_Sexe[Sexe] = "H", F_Licences[Age] >= _a, F_Licences[Age] <= _b, Comparaison[Comparaison] = _Comp) + 0))
VAR _TotP   = SUMX(_TabP, [@ft] + [@ht])
VAR _TotC   = SUMX(_TabP, [@fc] + [@hc])
VAR _Ratio  = DIVIDE(_TotP, _TotC)          -- comparaison ramenée à l'effectif de la sélection
VAR _MaxCat = MAXX(_TabP, [Cat])
VAR _TabP2  = ADDCOLUMNS(_TabP, "@i", VAR _a = [Lo] RETURN COUNTROWS(FILTER(_Bandes, [Lo] > _a)))
VAR _TabP3  = ADDCOLUMNS(_TabP2, "@y", [@i] * _Hr + (_MaxCat - [Cat]) * _Gap + 2)
VAR _yAxe   = MAXX(_TabP3, [@y]) + _Hr + 6
VAR _Hp     = _yAxe + 22
-- 5. Échelle en nombre de licences (graduation ronde)
VAR _Sd      = (_Wp - _Gl - _Lc) / 2
VAR _Wmax    = _Sd - 6
VAR _Cx      = _Gl + _Sd + _Lc / 2
VAR _MaxV    = MAX(MAXX(_TabP, MAX(MAX([@ft], [@ht]), MAX([@fc], [@hc]) * _Ratio)), 1)
VAR _PasBrut = _MaxV * 1.04 / 3
VAR _Mag     = POWER(10, INT(LOG10(_PasBrut)))
VAR _Norm    = _PasBrut / _Mag
VAR _Pas     = SWITCH(TRUE(), _Norm <= 1, 1, _Norm <= 2, 2, _Norm <= 2.5, 2.5, _Norm <= 5, 5, 10) * _Mag
VAR _NbT     = MAX(CEILING(_MaxV / _Pas, 1), 1)
VAR _Echelle = _NbT * _Pas
-- 6. Styles SVG (classes)
VAR _Css =
"<style>.py .bf{fill:" & _ColF & "}.py .bh{fill:" & _ColH & "}.py .bi{fill:" & _ColInac & "}.py .dim{opacity:.25}"
& ".py .lb{font-size:" & _TxtPet & "px;font-weight:600;fill:" & _ColFort & "}.py .tv{font-size:13px;fill:" & _ColNeut & "}.py .ax{font-size:13px;fill:" & _ColNeut & "}"
& ".py .hl{fill:" & _ColInac & ";fill-opacity:.55}.py .tb{fill:" & _ColTxt & "}"
& ".py .t1{font-si
-- … (code tronqué : 16 044 caractères au total  voir le fichier TMDL)
```

</details>

<details><summary><code>HTML Qui Âges</code></summary>

```dax
-- =====================================================================
-- HTML Qui Âges | section « Âge » du bloc PROFIL (assemblée par HTML Qui)
-- Hiérarchie : âge moyen > catégories (libellé, tranche, part) > barre > comparaison (valeurs)
-- Même structure que HTML Qui Profil : les deux colonnes restent alignées ligne à ligne.
-- Mise en page FIXE : les 2 lignes de comparaison sont toujours là (grisées si sans objet).
-- Regroupement entier sélectionné : il occupe la ligne « regroupement » (orange).
-- =====================================================================
-- 1. Charte
VAR _ColF    = [Style Couleur femmes]
VAR _ColH    = [Style Couleur hommes]
VAR _ColEns  = [Style Couleur ensemble]
VAR _ColReg  = [Style Couleur regroupement]
VAR _ColTxt  = [Style Couleur texte]
VAR _ColLib  = [Style Couleur texte libellé]
VAR _ColFort = [Style Couleur texte fort]
VAR _ColNeut = [Style Couleur neutre]
VAR _ColPist = [Style Couleur fond neutre]
VAR _TxtTxt  = [Style Taille texte]
VAR _TxtVal  = [Style Taille valeur]
VAR _TxtChif = [Style Taille chiffre]
VAR _Gris    = "opacity:.4;"
-- 2. Contexte
VAR _Mode    = [Sélection mode]
VAR _ModeReg = _Mode = "Regroupement"
VAR _AvecSel = _Mode <> "Ensemble"
VAR _AvecReg = _Mode IN {"Fédération", "Plusieurs fédérations"} && NOT ISBLANK([Nom regroupement])
VAR _NomReg  = SWITCH(TRUE(), _ModeReg, [Sélection libellé], _AvecReg, [Niveau choisi] & " · " & [Nom regroupement], "Regroupement")
VAR _PourquoiPasReg = IF(_Mode = "Ensemble", "Choisissez une fédération ou un regroupement.", "Les fédérations choisies n'appartiennent pas au même regroupement.")
VAR _GSel    = IF(ISFILTERED(T_Sexe) && HASONEVALUE(T_Sexe[Sexe]), SELECTEDVALUE(T_Sexe[Sexe]))
VAR _CSel    = IF(ISFILTERED(T_TrancheAge) && HASONEVALUE(T_TrancheAge[Ordre]), SELECTEDVALUE(T_TrancheAge[Ordre]))
VAR _ColA    = SWITCH(_GSel, "F", _ColF, "H", _ColH, [Style Couleur poids])   -- couleur du genre filtré, sinon neutre
-- 3. Âge moyen (genre choisi, toutes catégories)
VAR _Moy    = CALCULATE([Âge moyen], REMOVEFILTERS(T_TrancheAge))
VAR _MoyReg = SWITCH(TRUE(), _ModeReg, _Moy, _AvecReg, CALCULATE([Âge moyen], REMOVEFILTERS(T_TrancheAge), Comparaison[Comparaison] = "Regroupement"))
VAR _MoyEns = IF(_AvecSel, CALCULATE([Âge moyen], REMOVEFILTERS(T_TrancheAge), Comparaison[Comparaison] = "Ensemble"))
-- 4. Grandes catégories : sélection (@v) et ensemble (@e)
VAR _TabA =
    ADDCOLUMNS(
        FILTER(ALL(T_TrancheAge[Ordre], T_TrancheAge[TrancheAge]), T_TrancheAge[Ordre] IN {"1", "2", "3", "4"}),
        "@v", VAR _o = T_TrancheAge[Ordre] RETURN CALCULATE([NB Licences], REMOVEFILTERS(T_TrancheAge), T_TrancheAge[Ordre] = _o) + 0,
        "@e", VAR _o = T_TrancheAge[Ordre] RETURN CALCULATE([NB Licences], REMOVEFILTERS(T_TrancheAge), T_TrancheAge[Ordre] = _o, Comparaison[Comparaison] = "Ensemble") + 0)
VAR _TotA = SUMX(_TabA, [@v])
VAR _TotE = SUMX(_TabA, [@e])
VAR _TabA2 =
    ADDCOLUMNS(_TabA,
        "@p",  DIVIDE([@v], _TotA),
        "@pe", DIVIDE([@e], _TotE),
        "@op", VAR _o = T_TrancheAge[Ordre] RETURN IF(ISBLANK(_CSel), SWITCH(_o, "1", "1", "2", ".72", "3", ".5", ".3"), IF(_CSel = _o, "1", ".18")),
        "@nm", VAR _L = T_TrancheAge[TrancheAge] RETURN TRIM(MID(_L, 5, SEARCH("(", _L, 1, LEN(_L) + 1) - 5)),
        "@tr", VAR _L = T_TrancheAge[TrancheAge] RETURN SUBSTITUTE(MID(_L, SEARCH("(", _L, 1, LEN(_L)) + 1, SEARCH(")", _L, 1, LEN(_L) + 1) - SEARCH("(", _L, 1, LEN(_L)) - 1), "-", "–") & " ans")
VAR _Tip =
    "<div class='tip'><b>NM</b> (TR) · PP des licences<br>NN licences" & IF(_AvecSel, "<br><span>Ensemble des fédérations : EE</span>") & "</div>"
-- 5. Valeurs au-dessus de la barre : libellé / tranche / part (3 lignes, comme le genre)
VAR _Valeurs =
    "<div style='display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-top:20px'>"
    & CONCATENATEX(_TabA2,
        VAR _o = T_TrancheAge[Ordre]
        VAR _Actif = ISBLANK(_CSel) || _CSel = _o
        RETURN
            "<div class='tt' style='min-width:0;" & IF(_Actif, "", _Gris) & "'>"
            & "<div style='font-size:13px;color:" & _ColNeut & ";white-space:nowrap'><i style='display:inline-block;width:8px;height:8px;border-radius:50%;margin-right:6px;background:" & _ColA & ";opacity:" & IF(ISBLANK(_CSel), [@op], "1") & "'></i>" & [@nm] & "</div>"
            & "<div class='nb' style='font-size:12px;color:" & _ColNeut & ";margin-top:1px'>" & [@tr] & "</div>"
            & "<b class='nb' style='display:block;font-size:" & _TxtVal & "px;font-weight:700;color:" & _ColTxt & ";margin-top:2px'>" & FORMAT([@p], "0.0 %") & "</b>"
            & SUBSTITUTE(SUBSTITUTE(SUBSTITUTE(SUBSTITUTE(SUBSTITUTE(_Tip, "NM", [@nm]), "TR", [@tr]), "PP", FORMAT([@p], "0.0 %")), "NN", FORMAT([@v], "#,0")), "EE", FORMAT([@pe], "0.0 %")) & "</div>",
        "", T_TrancheAge[Ordre], ASC)
    & "</div>"
-- 6. Barre de répartition (une catégorie sans licence n'est pas dessinée)
VAR _Barre =
    "<div style='display:flex;gap:2px;height:14px;margin-top:8px'>"
    & CONCATENATEX(FILTER(_TabA2, [@v] > 0),
        "<div class='tt' style='width:" & FORMAT([@p] * 100, "0.0", "en-US") & "%;border-radius:4px;background:" & _ColA & ";opacity:" & [@op] & "'>"
        & SUBSTITUTE(SUBSTITUTE(SUBSTITUTE(SUBSTITUTE(SUBSTITUTE(_Tip, "NM", [@nm]), "TR", [@tr]), "PP", FORMAT([@p], "0.0 %")), "NN", FORMAT([@v], "#,0")), "EE", FORMAT([@pe], "0.0 %")) & "</div>",
        "", T_TrancheAge[Ordre], ASC)
    & "</div>"
-- 7. Comparaison de l'âge moyen (toujours 2 lignes)
VAR _LigneComp = "<div class='tt' style='display:flex;align-items:center;gap:8px;font-size:" & [Style Taille petit] & "px;color:" & _ColLib & ";OPA'><i style='flex:none;width:8px;height:8px;border-radius:50%;background:COL'></i><span class='el' style='flex:1'>NOM</span><b class='nb' style='font-size:15px;font-weight:700;color:" & _ColFort & "'>VAL</b><div class='tip'>TIP</div></div>"
VAR _Comp =
    "<div style='margin-top:auto;padding-top:22px;display:flex;flex-direction:column;gap:8px'>"
    & "<d
-- … (code tronqué : 8 869 caractères au total  voir le fichier TMDL)
```

</details>

## 07. Page Portrait\Évolution

| Mesure | Format | Masquée | Description |
|---|---|:-:|---|
| `Evo Indice` | 0.0 | oui | Base 100 = première année disponible, sur l'axe T_AnneeAxe, à champ constant (fédérations présentes chaque année de la période, méthode INJEP). |
| `Evo Indice ensemble` | 0.0 |  | Ligne 3 du graphique Base 100 : toutes les fédérations. |
| `Evo Indice regroupement` | 0.0 |  | Ligne 2 du graphique Base 100 : regroupement de la sélection au niveau choisi. |
| `Evo Indice sélection` | 0.0 |  | Ligne 1 du graphique Base 100. |
| `Evo Licences` | #,0 |  | Licences de l'année de l'axe (T_AnneeAxe). Ignore le segment Année pour que le graphique montre toujours toute la période. |
| `Evo Licences champ constant` | #,0 | oui | Licences à champ constant pour l'année de l'axe T_AnneeAxe (base de l'évolution sur 1 an dans les bulles du graphique Évolution). |
| `HTML Évolution` |  |  | Bloc ÉVOLUTION de la page Portrait (visuel HTML Content ~745 x 390) : licences par année (vue Volume) ou indice base 100 (vue Base 100) pour la sélection, son regroupement et l'ensemble. Courbes tracées seulement quand l'indice est calculable ; étiquettes de l'année choisie réparties sans chevauchement ; infobulles au survol. |

<details><summary><code>Evo Indice</code></summary>

```dax
VAR _A0 = CALCULATE(MIN(T_Annee[Annee]), REMOVEFILTERS(T_Annee))
RETURN
    DIVIDE(
        CALCULATE([Licences champ constant], REMOVEFILTERS(T_Annee), TREATAS(VALUES(T_AnneeAxe[Annee]), T_Annee[Annee])),
        CALCULATE([Licences champ constant], REMOVEFILTERS(T_Annee), T_Annee[Annee] = _A0)
    ) * 100
```

</details>

<details><summary><code>Evo Indice ensemble</code></summary>

```dax
CALCULATE([Evo Indice], Comparaison[Comparaison] = "Ensemble")
```

</details>

<details><summary><code>Evo Indice regroupement</code></summary>

```dax
CALCULATE([Evo Indice], Comparaison[Comparaison] = "Regroupement")
```

</details>

<details><summary><code>Evo Indice sélection</code></summary>

```dax
CALCULATE([Evo Indice], Comparaison[Comparaison] = "Sélection")
```

</details>

<details><summary><code>Evo Licences</code></summary>

```dax
CALCULATE(
    [NB Licences],
    REMOVEFILTERS(T_Annee),
    TREATAS(VALUES(T_AnneeAxe[Annee]), T_Annee[Annee])
)
```

</details>

<details><summary><code>Evo Licences champ constant</code></summary>

```dax
CALCULATE(
    [Licences champ constant],
    REMOVEFILTERS(T_Annee),
    TREATAS(VALUES(T_AnneeAxe[Annee]), T_Annee[Annee])
)
```

</details>

<details><summary><code>HTML Évolution</code></summary>

```dax
-- =====================================================================
-- HTML Évolution | page Portrait | visuel HTML Content ~745 x 390
-- Vue Volume (T_VueEvol = 1) : barres des licences par année
-- Vue Base 100 (T_VueEvol = 2) : indice de la sélection, du regroupement, de l'ensemble
-- Regroupement entier sélectionné : courbe orange (couleur regroupement), entrée « Fédération » grisée.
-- Mise en page FIXE : la légende garde ses 3 entrées quel que soit le segment (grisées si sans objet)
-- Si l'indice de la sélection est impossible, regroupement et ensemble restent tracés.
-- Dépend de : Evo Licences, Evo Indice sélection / regroupement / ensemble,
--             Sélection mode, Sélection libellé, Sélection liste, charte
-- =====================================================================
-- 1. Réglages
VAR _HauteurCadre = 370      -- hauteur du visuel - 20 environ (barre de défilement sinon)
VAR _PlaceSegment = 230      -- place libre en haut à droite pour le segment Volume / Base 100
VAR _W = 709                 -- zone du graphique (unités SVG)
VAR _H = 272
VAR _PL = 66                 -- marge gauche (axe)
VAR _PR = 78                 -- marge droite (étiquettes de la dernière année)
VAR _PT = 26
VAR _PB = 34
VAR _LargeurBulle = 300
VAR _EcartEtiq = 27          -- écart vertical minimal entre deux étiquettes
-- 2. Charte
VAR _Police  = [Style Police]
VAR _ColSel  = [Style Couleur sélection]
VAR _ColReg  = [Style Couleur regroupement]
VAR _ColEns  = [Style Couleur ensemble]
VAR _ColBar  = [Style Couleur sélection clair]
VAR _ColBand = [Style Couleur accent fond]
VAR _ColGril = [Style Couleur grille]
VAR _ColAxe  = [Style Couleur texte discret]
VAR _ColEtiq = [Style Couleur texte secondaire]
VAR _ColTxt  = [Style Couleur texte]
VAR _TxtPet  = [Style Taille petit]
VAR _TxtTxt  = [Style Taille texte]
VAR _F1      = "0.0"
-- 3. Contexte (sélection, vue, année)
VAR _Mode    = [Sélection mode]
VAR _AvecSel = _Mode <> "Ensemble"
VAR _AvecReg = _Mode IN {"Fédération", "Plusieurs fédérations"} && NOT ISBLANK([Nom regroupement])
VAR _Vue     = SELECTEDVALUE(T_VueEvol[Ordre], 2)
VAR _AnSel   = MAX(T_Annee[Annee])
VAR _NomSel  = [Sélection libellé]
VAR _NomReg  = [Nom regroupement]
VAR _NomSelB = IF(LEN(_NomSel) > 26, LEFT(_NomSel, 25) & "…", _NomSel)
VAR _NomRegB = IF(LEN(_NomReg) > 26, LEFT(_NomReg, 25) & "…", _NomReg)
VAR _Liste   = IF(_Mode = "Plusieurs fédérations", [Sélection liste])
-- regroupement entier sélectionné (sans fédération) : sa courbe prend la couleur « regroupement »
VAR _ModeReg   = _Mode = "Regroupement"
VAR _ColCourbe = IF(_ModeReg, _ColReg, _ColSel)
-- 4. Données (une ligne par année de l'axe)
VAR _A0  = MINX(ALL(T_AnneeAxe[Annee]), VALUE(T_AnneeAxe[Annee]))
VAR _ColHors  = "#F59E0B"   -- licences hors champ constant (haut des barres, au moins 4 px pour rester visible)
VAR _Tab0 =
ADDCOLUMNS(
ALL(T_AnneeAxe[Annee]),
"@i", VALUE(T_AnneeAxe[Annee]) - _A0,
"@v", [Evo Licences],
"@c", [Evo Licences champ constant],
"@s", [Evo Indice sélection],
"@r", IF(_AvecReg, [Evo Indice regroupement]),
"@e", IF(_AvecSel, [Evo Indice ensemble])
)
VAR _Tab  = ADDCOLUMNS(_Tab0, "@p", VAR _Rang = [@i] RETURN MAXX(FILTER(_Tab0, [@i] = _Rang - 1), [@v]), "@cp", VAR _Rang = [@i] RETURN MAXX(FILTER(_Tab0, [@i] = _Rang - 1), [@c]))
VAR _N    = COUNTROWS(_Tab)
VAR _ISel = VALUE(_AnSel) - _A0
VAR _YAn  = _H - 8
VAR _Css  = [Style CSS commun]
VAR _Ombre = "<defs><filter id='omb' x='-20%' y='-20%' width='140%' height='160%'><feDropShadow dx='0' dy='3' stdDeviation='4' flood-color='#101828' flood-opacity='.14'/></filter></defs>"
-- 5. Vue Volume (grands nombres en M / k ; valeur exacte dans l'infobulle)
VAR _VMax    = MAXX(_Tab, [@v])
VAR _PasBrut = MAX(_VMax, 1) * 1.12 / 4
VAR _Mag     = POWER(10, INT(LOG10(_PasBrut)))
VAR _Norm    = _PasBrut / _Mag
VAR _Pas     = SWITCH(TRUE(), _Norm <= 1, 1, _Norm <= 2, 2, _Norm <= 2.5, 2.5, _Norm <= 3, 3, _Norm <= 4, 4, _Norm <= 5, 5, 10) * _Mag
VAR _Plafond = 4 * _Pas
VAR _StV     = (_W - _PL - 4) / _N
VAR _YV0     = _H - _PB
VAR _FmtAxeK = SWITCH(TRUE(), _Plafond >= 2000000, "M", _Plafond >= 10000, "k", "")
VAR _GrilleV =
CONCATENATEX(GENERATESERIES(0, 4),
VAR _t = _Plafond * [Value] / 4
VAR _y = _YV0 - (_t / _Plafond) * (_H - _PT - _PB)
RETURN "<line x1='" & _PL & "' x2='" & (_W - 4) & "' y1='" & FORMAT(_y, _F1, "en-US") & "' y2='" & FORMAT(_y, _F1, "en-US") & "' stroke='" & _ColGril & "'/>"
& "<text x='" & (_PL - 14) & "' y='" & FORMAT(_y + 5, _F1, "en-US") & "' text-anchor='end' font-size='" & _TxtPet & "' fill='" & _ColAxe & "'>"
& SWITCH(_FmtAxeK,
"M", FORMAT(_t / 1000000, IF(MOD(_t, 1000000) = 0, "0", "0.0")) & " M",
"k", FORMAT(_t / 1000, IF(MOD(_t, 1000) = 0, "#,0", "#,0.0")) & " k",
FORMAT(_t, "#,0")) & "</text>",
"", [Value], ASC)
-- fédérations récentes (hors champ constant) : différence entre toutes les licences et le champ constant
VAR _AvecHors = NOT ISEMPTY(FILTER(_Tab, NOT ISBLANK([@v]) && [@v] - [@c] > 0))
VAR _HorsSel  = MAXX(FILTER(_Tab, [@i] = _ISel), [@v] - [@c])
VAR _Barres =
CONCATENATEX(FILTER(_Tab, NOT ISBLANK([@v])),
VAR _x  = _PL + [@i] * _StV + _StV * 0.17
VAR _bw = _StV * 0.66
VAR _y  = _YV0 - DIVIDE([@v], _Plafond) * (_H - _PT - _PB)
VAR _cx = _x + _bw / 2
VAR _Lab = SWITCH(TRUE(), [@v] >= 1000000, FORMAT([@v] / 1000000, "0.00") & " M", [@v] >= 10000, FORMAT([@v] / 1000, "#,0") & " k", FORMAT([@v], "#,0"))
VAR _EstSel = [@i] = _ISel
RETURN
"<rect x='" & FORMAT(_x, _F1, "en-US") & "' y='" & FORMAT(_y, _F1, "en-US") & "' width='" & FORMAT(_bw, _F1, "en-US") & "' height='" & FORMAT(_YV0 - _y, _F1, "en-US") & "' rx='4' fill='" & IF(_EstSel, _ColSel, _ColBar) & "'/>"
& IF([@v] - [@c] > 0, "<rect x='" & FORMAT(_x, _F1, "en-US") & "' y='" & FORMAT(_y, _F1, "en-US") & "' width='" & FORMAT(_bw, _F1, "en-US") & "' height='" & FORMAT(MAX(4, DIVIDE([@v] - [@c], _Plafond) * (_H - _PT - _PB)), _F1, "en-US") & "' rx='4' fill='" & _ColHors & "'/>")
& IF(_EstSel,
"<rect x='" & FORMAT(_cx - 38, _F1, "en-US") & "' y='" & FORMAT(_y - 27, _F1,
-- … (code tronqué : 23 833 caractères au total  voir le fichier TMDL)
```

</details>

## 08. Pages Comparer

| Mesure | Format | Masquée | Description |
|---|---|:-:|---|
| `HTML Comparaison Federations` |  |  | Tableau HTML interactif de comparaison des fédérations (HTML Content édition standard, script) : tri par en-tête, vue liste / par regroupement, mise en évidence, mini-graphiques et infobulles. |
| `HTML Comparaison Territoires` |  |  | Tableau HTML interactif de comparaison des territoires (même moteur [HTML Tableau JS] et mêmes styles [HTML Comparaison CSS] que HTML Comparaison Federations). |

<details><summary><code>HTML Comparaison Federations</code></summary>

```dax
-- =====================================================================
-- HTML Comparaison Federations | visuel HTML Content (edition standard, scripts actifs)
-- Donnees : une ligne par federation (nombres en base 64). Moteur commun : [HTML Tableau JS] ; styles communs : [HTML Comparaison CSS]
-- (les memes que HTML Comparaison Territoires : modifier une seule fois). Sans regroupement choisi = liste ; regroupement choisi = par regroupement.
-- Toutes les federations presentes dans les donnees sont affichees, meme a 0 pour la selection.
-- Champ constant (methode INJEP) : champ selection = 1 (selectionnee) + 2 (federation hors champ constant) ; le moteur exclut ces federations des evolutions des regroupements et du total.
-- TAILLE : rester sous ~32 700 caracteres (verifier LEN apres modification).
-- =====================================================================
VAR _Pre    = [Logo URL base]   -- adresse de base des logos (dossier 00. Charte graphique)
VAR _AnRef  = 2019
VAR _An     = VALUE(MAX(T_Annee[Annee]))
VAR _Sx     = IF(ISFILTERED(T_Sexe), CONCATENATEX(VALUES(T_Sexe[Sexe]), T_Sexe[Sexe], ","))
VAR _Ag     = IF(ISFILTERED(T_TrancheAge), CONCATENATEX(VALUES(T_TrancheAge[Ordre]), T_TrancheAge[Ordre], ","))
VAR _GeL    = IF(ISFILTERED(T_Sexe), CONCATENATEX(VALUES(T_Sexe[Genre]), T_Sexe[Genre], " + "))
VAR _AgL    = IF(ISFILTERED(T_TrancheAge), CONCATENATEX(SUMMARIZE(T_TrancheAge, T_TrancheAge[Catégorie d'âge], T_TrancheAge[Ordre]), T_TrancheAge[Catégorie d'âge], " + ", T_TrancheAge[Ordre], ASC))
VAR _B64    = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_"
VAR _Niveau = SWITCH(SELECTEDVALUE(Param_Niveau[Paramètre Commande]), 2, "Sous-famille", 0, "Groupe", "Famille")
VAR _Fil    = ISCROSSFILTERED(T_Federation)
VAR _SelSet = VALUES(T_Federation[CodeReference])
VAR _Pop    = [Population]
VAR _RG     = ISFILTERED(P_Niveaux) && NOT ("Ensemble" IN VALUES(P_Niveaux[Cle]))
VAR _S =
    ADDCOLUMNS(
        CALCULATETABLE(
            SUMMARIZECOLUMNS(F_Licences[CodeReference], F_Licences[Annee], "@n", SUM(F_Licences[NbLicences])),
            REMOVEFILTERS(T_Federation), REMOVEFILTERS(P_Federation), REMOVEFILTERS(P_Niveaux), REMOVEFILTERS(P_Appartenance), REMOVEFILTERS(Param_Federation), REMOVEFILTERS(T_Annee)),
        "@b", (VAR _n0 = INT([@n] + 0) RETURN MID(MID(_B64, MOD(INT(_n0 / 262144), 64) + 1, 1) & MID(_B64, MOD(INT(_n0 / 4096), 64) + 1, 1) & MID(_B64, MOD(INT(_n0 / 64), 64) + 1, 1) & MID(_B64, MOD(_n0, 64) + 1, 1), (_n0 < 262144) + (_n0 < 4096) + (_n0 < 64) + 1, 4)))
VAR _P =
    ADDCOLUMNS(
        CALCULATETABLE(
            SUMMARIZECOLUMNS(F_Licences[CodeReference],
                "@f", CALCULATE(SUM(F_Licences[NbLicences]), REMOVEFILTERS(T_Sexe), F_Licences[Sexe] = "F"),
                "@h", CALCULATE(SUM(F_Licences[NbLicences]), REMOVEFILTERS(T_Sexe), F_Licences[Sexe] = "H"),
                "@a1", CALCULATE(SUM(F_Licences[NbLicences]), REMOVEFILTERS(T_TrancheAge), T_TrancheAge[Ordre] = "1"),
                "@a2", CALCULATE(SUM(F_Licences[NbLicences]), REMOVEFILTERS(T_TrancheAge), T_TrancheAge[Ordre] = "2"),
                "@a3", CALCULATE(SUM(F_Licences[NbLicences]), REMOVEFILTERS(T_TrancheAge), T_TrancheAge[Ordre] = "3"),
                "@a4", CALCULATE(SUM(F_Licences[NbLicences]), REMOVEFILTERS(T_TrancheAge), T_TrancheAge[Ordre] = "4"),
                "@np", CALCULATE(SUM(F_Licences[NbLicences]), KEEPFILTERS(TREATAS(ALL(F_Population[Code_DEP]), T_Territoire[Code_DEP])))),
            REMOVEFILTERS(T_Federation), REMOVEFILTERS(P_Federation), REMOVEFILTERS(P_Niveaux), REMOVEFILTERS(P_Appartenance), REMOVEFILTERS(Param_Federation), REMOVEFILTERS(T_Annee), F_Licences[Annee] = _An),
        "@b", (VAR _n1 = INT([@f] + 0) RETURN MID(MID(_B64, MOD(INT(_n1 / 262144), 64) + 1, 1) & MID(_B64, MOD(INT(_n1 / 4096), 64) + 1, 1) & MID(_B64, MOD(INT(_n1 / 64), 64) + 1, 1) & MID(_B64, MOD(_n1, 64) + 1, 1), (_n1 < 262144) + (_n1 < 4096) + (_n1 < 64) + 1, 4)) & "." & (VAR _n2 = INT([@h] + 0) RETURN MID(MID(_B64, MOD(INT(_n2 / 262144), 64) + 1, 1) & MID(_B64, MOD(INT(_n2 / 4096), 64) + 1, 1) & MID(_B64, MOD(INT(_n2 / 64), 64) + 1, 1) & MID(_B64, MOD(_n2, 64) + 1, 1), (_n2 < 262144) + (_n2 < 4096) + (_n2 < 64) + 1, 4)) & "." & (VAR _n3 = INT([@a1] + 0) RETURN MID(MID(_B64, MOD(INT(_n3 / 262144), 64) + 1, 1) & MID(_B64, MOD(INT(_n3 / 4096), 64) + 1, 1) & MID(_B64, MOD(INT(_n3 / 64), 64) + 1, 1) & MID(_B64, MOD(_n3, 64) + 1, 1), (_n3 < 262144) + (_n3 < 4096) + (_n3 < 64) + 1, 4)) & "." & (VAR _n4 = INT([@a2] + 0) RETURN MID(MID(_B64, MOD(INT(_n4 / 262144), 64) + 1, 1) & MID(_B64, MOD(INT(_n4 / 4096), 64) + 1, 1) & MID(_B64, MOD(INT(_n4 / 64), 64) + 1, 1) & MID(_B64, MOD(_n4, 64) + 1, 1), (_n4 < 262144) + (_n4 < 4096) + (_n4 < 64) + 1, 4)) & "." & (VAR _n5 = INT([@a3] + 0) RETURN MID(MID(_B64, MOD(INT(_n5 / 262144), 64) + 1, 1) & MID(_B64, MOD(INT(_n5 / 4096), 64) + 1, 1) & MID(_B64, MOD(INT(_n5 / 64), 64) + 1, 1) & MID(_B64, MOD(_n5, 64) + 1, 1), (_n5 < 262144) + (_n5 < 4096) + (_n5 < 64) + 1, 4)) & "." & (VAR _n6 = INT([@a4] + 0) RETURN MID(MID(_B64, MOD(INT(_n6 / 262144), 64) + 1, 1) & MID(_B64, MOD(INT(_n6 / 4096), 64) + 1, 1) & MID(_B64, MOD(INT(_n6 / 64), 64) + 1, 1) & MID(_B64, MOD(_n6, 64) + 1, 1), (_n6 < 262144) + (_n6 < 4096) + (_n6 < 64) + 1, 4)) & "." & (VAR _n7 = INT([@np] + 0) RETURN MID(MID(_B64, MOD(INT(_n7 / 262144), 64) + 1, 1) & MID(_B64, MOD(INT(_n7 / 4096), 64) + 1, 1) & MID(_B64, MOD(INT(_n7 / 64), 64) + 1, 1) & MID(_B64, MOD(_n7, 64) + 1, 1), (_n7 < 262144) + (_n7 < 4096) + (_n7 < 64) + 1, 4)))
VAR _Yrs = FILTER(SELECTCOLUMNS(ALL(T_Annee[Annee]), "@y", VALUE(T_Annee[Annee])), VAR _yy = [@y] RETURN SUMX(FILTER(_S, F_Licences[Annee] = _yy), [@n]) > 0)
-- toutes les federations presentes dans les donnees, meme a 0 pour la selection (ligne toujours affichee)
VAR _AllF = CALCULATETABLE(VALUES(F_Licences[CodeReference]), REMOVEFILTERS())
VAR _B =
    FILTER(
        ADDCOLUMNS(
            ALL(T_Federation[CodeReference], T_Federation[Federatio
-- … (code tronqué : 8 898 caractères au total  voir le fichier TMDL)
```

</details>

<details><summary><code>HTML Comparaison Territoires</code></summary>

```dax
-- =====================================================================
-- HTML Comparaison Territoires | visuel HTML Content (edition standard, scripts actifs)
-- Meme moteur ([HTML Tableau JS]) et memes styles ([HTML Comparaison CSS]) que HTML Comparaison Federations.
-- Lignes = departements regroupes par region ; DROM, COM et Autres forment chacun une categorie. Tous les departements sont affiches, meme a 0.
-- Metropole / Metropole + DROM choisis = tableau limite a ce perimetre ; region (avec ou sans departement) choisie = par region (choix en haut, deplie,
-- departement surligne) ; departement seul = surligne dans la liste. Niveau geo = Region -> liste des regions (sauf departement / DROM / COM / Autres choisi).
-- Segment Region / zone = Param_Departement (relie a P_TerrChoix) ; segment Departement = P_TerrDep.
-- Les segments federation filtrent les chiffres. Colonne finale : Specificite (selection de federations) ou 1re federation (ensemble).
-- TAILLE : rester sous ~31 000 caracteres (verifier LEN apres modification).
-- =====================================================================
VAR _AnRef  = 2019
VAR _An     = VALUE(MAX(T_Annee[Annee]))
VAR _Sx     = IF(ISFILTERED(T_Sexe), CONCATENATEX(VALUES(T_Sexe[Sexe]), T_Sexe[Sexe], ","))
VAR _Ag     = IF(ISFILTERED(T_TrancheAge), CONCATENATEX(VALUES(T_TrancheAge[Ordre]), T_TrancheAge[Ordre], ","))
VAR _GeL    = IF(ISFILTERED(T_Sexe), CONCATENATEX(VALUES(T_Sexe[Genre]), T_Sexe[Genre], " + "))
VAR _AgL    = IF(ISFILTERED(T_TrancheAge), CONCATENATEX(SUMMARIZE(T_TrancheAge, T_TrancheAge[Catégorie d'âge], T_TrancheAge[Ordre]), T_TrancheAge[Catégorie d'âge], " + ", T_TrancheAge[Ordre], ASC))
VAR _B64    = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_"
VAR _DepSel = ISFILTERED(P_TerrDep)
VAR _IdSel  = IF(ISFILTERED(Param_Departement) || ISFILTERED(P_TerrChoix), SELECTEDVALUE(P_TerrChoix[Id territoire]))
VAR _RegCh  = NOT ISBLANK(_IdSel) && NOT (_IdSel IN {"TOT", "MDR", "MET"})
VAR _Fil    = ISCROSSFILTERED(T_Territoire) && (_DepSel || _RegCh)
VAR _SelSet = VALUES(T_Territoire[Code_DEP])
-- par region si une region (ou DROM / COM / Autres) est choisie, avec ou sans departement ; departement seul = liste
VAR _RG     = _Fil && (_RegCh || NOT _DepSel)
VAR _LV     = IF(SELECTEDVALUE(T_NiveauGeo[Ordre], 2) = 1 && [Segment Niveau géo masqué] <> 1, "g", "i")
VAR _NSel   = CALCULATE(DISTINCTCOUNT(F_Licences[CodeReference]), REMOVEFILTERS(T_Territoire), REMOVEFILTERS(P_TerrChoix), REMOVEFILTERS(P_TerrAppartenance), REMOVEFILTERS(P_TerrDep), REMOVEFILTERS(Param_Departement), REMOVEFILTERS(T_Annee), F_Licences[Annee] = _An)
VAR _NAll   = CALCULATE(DISTINCTCOUNT(F_Licences[CodeReference]), REMOVEFILTERS(T_Territoire), REMOVEFILTERS(P_TerrChoix), REMOVEFILTERS(P_TerrAppartenance), REMOVEFILTERS(P_TerrDep), REMOVEFILTERS(Param_Departement), REMOVEFILTERS(T_Federation), REMOVEFILTERS(P_Federation), REMOVEFILTERS(P_Niveaux), REMOVEFILTERS(P_Appartenance), REMOVEFILTERS(Param_Federation), REMOVEFILTERS(T_Annee), F_Licences[Annee] = _An)
VAR _FS     = _NSel < _NAll
-- departements et categorie (region de metropole ; DROM ; COM ; Autres = Monaco, etranger, non reparti)
VAR _D =
    ADDCOLUMNS(
        FILTER(ALL(T_Territoire[Code_DEP], T_Territoire[Departement], T_Territoire[Region], T_Territoire[Code_GDEREG]), NOT ISBLANK(T_Territoire[Code_DEP])),
        "@g", VAR _r = T_Territoire[Code_GDEREG]
              RETURN SWITCH(TRUE(), _r = "COM", "Collectivités d'outre-mer", _r IN {"980", "ETR", "NR"}, "Autres (Monaco, étranger, non réparti)",
                         _r IN {"01", "02", "03", "04", "06"}, "DROM", TRIM(MID(T_Territoire[Region], SEARCH(" - ", T_Territoire[Region], 1, 0) + 3, 100))),
        "@k", VAR _r = T_Territoire[Code_GDEREG] RETURN SWITCH(TRUE(), _r IN {"01", "02", "03", "04", "06"}, "D", _r IN {"COM", "980", "ETR", "NR"}, "A", "M"))
-- perimetre : Metropole (MET) ou Metropole + DROM (MDR) choisis = seulement ces departements ; sinon tous
VAR _D2 = FILTER(_D, SWITCH(_IdSel, "MET", [@k] = "M", "MDR", [@k] <> "A", TRUE()))
VAR _DC = SELECTCOLUMNS(_D2, "@d", T_Territoire[Code_DEP])
VAR _TN = SWITCH(_IdSel, "MET", "Métropole", "MDR", "Métropole + DROM", "Total")
-- champ constant (methode INJEP) : la selection compte-t-elle des federations presentes chaque annee ?
VAR _CCA = NOT ISEMPTY(CALCULATETABLE(VALUES(F_Licences[CodeReference]), REMOVEFILTERS(T_Territoire), REMOVEFILTERS(P_TerrChoix), REMOVEFILTERS(P_TerrAppartenance), REMOVEFILTERS(P_TerrDep), REMOVEFILTERS(Param_Departement), REMOVEFILTERS(T_Annee), KEEPFILTERS(T_Federation[Champ constant] = "Oui")))
VAR _S =
    ADDCOLUMNS(
        CALCULATETABLE(
            SUMMARIZECOLUMNS(F_Licences[Code_DEP], F_Licences[Annee], "@n", SUM(F_Licences[NbLicences]), "@x", CALCULATE(SUM(F_Licences[NbLicences]), KEEPFILTERS(T_Federation[Champ constant] = "Non"))),
            REMOVEFILTERS(T_Territoire), REMOVEFILTERS(P_TerrChoix), REMOVEFILTERS(P_TerrAppartenance), REMOVEFILTERS(P_TerrDep), REMOVEFILTERS(Param_Departement), REMOVEFILTERS(T_Annee)),
        "@b", (VAR _n0 = INT([@n] + 0) RETURN MID(MID(_B64, MOD(INT(_n0 / 262144), 64) + 1, 1) & MID(_B64, MOD(INT(_n0 / 4096), 64) + 1, 1) & MID(_B64, MOD(INT(_n0 / 64), 64) + 1, 1) & MID(_B64, MOD(_n0, 64) + 1, 1), (_n0 < 262144) + (_n0 < 4096) + (_n0 < 64) + 1, 4)), "@bx", (VAR _nx = INT([@x] + 0) RETURN MID(MID(_B64, MOD(INT(_nx / 262144), 64) + 1, 1) & MID(_B64, MOD(INT(_nx / 4096), 64) + 1, 1) & MID(_B64, MOD(INT(_nx / 64), 64) + 1, 1) & MID(_B64, MOD(_nx, 64) + 1, 1), (_nx < 262144) + (_nx < 4096) + (_nx < 64) + 1, 4)))
VAR _P =
    ADDCOLUMNS(
        CALCULATETABLE(
            SUMMARIZECOLUMNS(F_Licences[Code_DEP],
                "@f", CALCULATE(SUM(F_Licences[NbLicences]), REMOVEFILTERS(T_Sexe), F_Licences[Sexe] = "F"),
                "@h", CALCULATE(SUM(F_Licences[NbLicences]), REMOVEFILTERS(T_Sexe), F_Licences[Sexe] = "H"),
                "@a1", CALCULATE(SUM(F_Licences[NbLicences]), REMOVEFILTERS(T_TrancheAge), T_
-- … (code tronqué : 15 709 caractères au total  voir le fichier TMDL)
```

</details>

## 08. Pages Comparer\Moteur commun

| Mesure | Format | Masquée | Description |
|---|---|:-:|---|
| `HTML Comparaison CSS` |  | oui | Styles COMMUNS aux tableaux HTML Comparaison Federations et HTML Comparaison Territoires (modifier ici une seule fois). Ne pas utiliser de guillemets doubles. |
| `HTML Tableau JS` |  | oui | Moteur commun (minifié) des tableaux HTML Comparaison Federations et HTML Comparaison Territoires : tri par en-tête, liste / par regroupement, mise en évidence, mini-graphiques, infobulles. Variables attendues : K, TI, IL, NV, LV, RG, FS, Y, AN, REF, POP, AP, SX, AG, GE, AGL, B1, G, GT, TT, FN, F. Source lisible : eng.js. Ne pas utiliser de guillemets doubles. |

<details><summary><code>HTML Comparaison CSS</code></summary>

```dax
"#hd,#sf{position:fixed;left:0;right:0;font-family:'Segoe UI',sans-serif;color:#101828;box-sizing:border-box}#hd{top:0;height:124px;padding:2px 2px 0;overflow:hidden;background:#fff}#sf{top:128px;bottom:0;overflow-y:auto;overflow-x:hidden;font-size:14.5px;background:#fff}#hd .r1{display:flex;align-items:center;gap:16px}#hd .ico{width:58px;height:58px;flex:none;border-radius:16px;border:1px solid #e4e7ec;box-shadow:0 1px 2px rgba(16,24,40,.05);display:flex;align-items:center;justify-content:center}#hd .ti{font-size:24px;font-weight:700;letter-spacing:-.01em;line-height:1.2}#hd .pls{display:flex;gap:8px;margin-top:7px;overflow:hidden}#hd .pl{display:inline-flex;align-items:center;gap:6px;height:26px;padding:0 11px;border-radius:13px;border:1px solid #e4e7ec;font-size:13px;color:#667085;white-space:nowrap}#hd b{color:#101828;font-weight:600}#hd .dg{width:8px;height:8px;border-radius:50%;background:#f2a93b}#hd .tg{display:flex;align-items:center;gap:6px;flex:none}#hd .hint{font-size:12.5px;color:#667085;margin-right:6px}#hd button{border:1px solid #d0d5dd;background:#fff;color:#344054;padding:5px 12px;border-radius:8px;cursor:pointer;font:600 12.5px 'Segoe UI',sans-serif}#hd button:hover{background:#f2f4f7}#hd .r2{display:flex;align-items:center;gap:14px;margin-top:12px;padding:0 14px;height:42px;border-radius:10px;border:1px solid #e4e7ec;white-space:nowrap;overflow:hidden}#hd .vs{font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#8a94a6}#hd .e2{display:inline-flex;align-items:center;gap:6px;font-size:14px;color:#667085}#hd .sp{width:4px;height:4px;border-radius:50%;background:#d0d5dd;flex:none}#hd .ac{display:inline-flex;align-items:center;gap:7px;height:26px;padding:0 11px;border-radius:13px;background:#eef1fe;border:1px solid #c7d0fb;font-size:13px;color:#2e46c9;font-weight:600}#hd .ac i{width:7px;height:7px;border-radius:50%;background:#4361ee}#hd .lg{margin-left:auto;display:flex;align-items:center;gap:12px;font-size:12.5px;color:#475467}#hd .lg i{display:inline-block;width:11px;height:11px;border-radius:3px;margin-right:5px;vertical-align:-1px}#hd .lg .of{opacity:.35}#hd .lg b{margin-left:6px}.ca{display:inline-flex;align-items:center;justify-content:center;width:18px;height:18px;border-radius:50%;background:#4361ee;color:#fff;font-weight:700;font-size:14px;line-height:1;margin-right:9px;vertical-align:-3px}#sf table{border-collapse:separate;border-spacing:0;width:100%;min-width:0}#sf th{position:sticky;top:0;background:#0b1c4f;color:#fff;font-weight:600;text-align:right;padding:11px 8px;cursor:pointer;white-space:nowrap;z-index:2;user-select:none}#sf th.so{background:#2e46c9}#sf td.tl,#sf td:first-child,#sf th:first-child,#sf th[data-c=g]{text-align:left}#sf td{padding:7px 8px;border-bottom:1px solid #eaecf0;text-align:right;white-space:nowrap}#sf td:nth-child(3),#sf td:nth-child(4),#sf td:nth-child(5),#sf td:nth-child(9),#sf td:nth-child(10),#sf th:nth-child(3),#sf th:nth-child(4),#sf th:nth-child(5),#sf th:nth-child(9),#sf th:nth-child(10){text-align:center}#sf td.tf{text-align:left}#sf td.tf .nm{max-width:170px}#sf td.in{padding-left:38px}#sf tr.f:hover td{background:#f8f9fc}#sf tr.g td{background:#f2f4f7;font-weight:600;cursor:pointer;border-top:1px solid #d0d5dd}#sf tr.g:hover td{background:#e4e7ec}#sf tr.op .ca{background:#0b1c4f}#sf tr.gs td{background:#dce3fd}#sf tr.fs td{background:#eef1fe;font-weight:700}#sf tr.fs td:first-child{box-shadow:inset 4px 0 #4361ee}#sf tr.t td{background:#0b1c4f;color:#fff;font-weight:700;position:sticky;bottom:0;z-index:1}#sf .lo{width:24px;height:24px;object-fit:contain;vertical-align:middle;margin-right:8px;display:inline-block}#sf .nm{display:inline-block;max-width:330px;overflow:hidden;text-overflow:ellipsis;vertical-align:middle}#sf td.tl{color:#475467;max-width:230px;overflow:hidden;text-overflow:ellipsis}#sf .nb{color:#667085;font-weight:400;margin-left:4px}#sf tr.t .nb{color:#c7d0fb}#sf .lb{display:block;height:3px;background:#eaecf0;border-radius:2px;margin-top:3px}#sf .lb i{display:block;height:3px;background:#4361ee;border-radius:2px;margin-left:auto}#sf tr.g .lb i{background:#0b1c4f}#sf .up{color:#067647}#sf .dn{color:#b42318}#sf .eq{color:#667085}#sf .nd{color:#98A2B3}#sf .ap{color:#b54708}#sf tr.t .ap,#sf tr.t .dn,#sf tr.t .eq,#sf tr.t .up{color:#fff}#sf .sb{display:flex;width:118px;height:19px;border-radius:4px;overflow:hidden;margin-left:auto;background:#f2f4f7}#sf .sb i{display:flex;align-items:center;justify-content:center;font-style:normal;font-size:11.5px}#sf .hi{display:inline-flex;align-items:center;justify-content:center;width:16px;height:16px;border-radius:50%;font-size:11px;font-weight:700;margin-left:6px;background:rgba(255,255,255,.22);cursor:help}#sf .hw{background:#fedf89;color:#b54708}#sftip{position:fixed;display:none;z-index:9;background:#101828;color:#fff;padding:8px 11px;border-radius:8px;font:14px 'Segoe UI',sans-serif;max-width:340px;pointer-events:none;box-shadow:0 8px 20px rgba(16,24,40,.22);line-height:1.45}#sftip table{border-collapse:collapse;margin-top:4px}#sftip td{padding:1px 8px 1px 0;text-align:right}#sftip td:first-child{text-align:left}#sftip tr.ts td{color:#B7C0CF;font-weight:700}#sftip .dt{display:inline-block;width:9px;height:9px;border-radius:2px;margin-right:6px}#sftip em{color:#B7C0CF}"
```

</details>

<details><summary><code>HTML Tableau JS</code></summary>

```dax
"!function(){var n=document.getElementById('sf'),t=document.getElementById('hd'),e=document.getElementById('sftip');if(n){var s='T'===K,a=Y.length,r=Y.indexOf(AN),i=Y.indexOf(AN-1),l=AN>REF?Y.indexOf(REF):-1,o='#8B5CF6',c='#0EA5E9',p=['#C7D0FB','#8FA2F6','#4361EE','#0B1C4F'],u=['#0B1C4F','#0B1C4F','#fff','#fff'],d=['Enfants 1-13 ans','Jeunes 14-20 ans','Adultes 21-55 ans','Seniors 56 ans et +'],f=SX?SX.split(','):[],h=AG?AG.split(','):[],g=F.map(function(n){var t=n[4].split('.').map(C);return{n:n[0],l:n[1]?n[1].replace('~','federation-francaise-')+(n[1].indexOf('.')<0?'.png':''):'',c:n[2],sel:1&n[3],nc:n[3]>>1,x:n[6]?n[6].split('.').map(C):null,s:t.slice(0,a),f:t[a],h:t[a+1],a:t.slice(a+2,a+6),p:t[a+6],q:t[a+7]||0,t:t[a+8]||0,top:I(n[5]),k:1}}),v='undefined'!=typeof CCA&&CCA;g.forEach(function(n){if(s&&v&&n.x){var t=n.s.slice();[r,i,l,0].forEach(function(e,s){e>=0&&(t[e]=Math.max(0,t[e]-(n.x[s]||0)))}),n.sc=t}}),g.forEach(B);var m=G.map(function(n,t){var e=g.filter(function(n){return n.c===t}),s=B(S(n,e,GT[t]));return s.sel=e.some(function(n){return n.sel}),s.all=e.length&&e.every(function(n){return n.sel}),s.open=s.sel,s}).filter(function(n){return n.k});g.forEach(function(n){n.gn=G[n.c],n.ga=m.filter(function(t){return t.n===n.gn})[0].all});var x=B(S(window.TN||(s?'Total':'Ensemble des fédérations'),g,TT)),b=g.concat(m,[x]);b.forEach(function(n,t){n.ix=t}),g.concat(m).forEach(function(n){n.is=n.t&&x.t&&x.v?n.v/n.t/(x.v/x.t):null});var y='g'===LV,E=g.filter(function(n){return n.sel}),A=m.filter(function(n){return n.sel}),w=!y&&RG&&E.length>0,k={c:'v',d:-1},L=x.sc?' '+(s?'':'Regroupements et total : ')+'à champ constant : seules les fédérations présentes chaque année comptent (méthode INJEP).':'',T=[['n',y?NV:IL,'',0],['v','Licences '+AN,'Licences '+AN+' pour '+(s?'la sélection de fédérations, ':'')+'le genre, l\'âge'+(s?'':' et le territoire')+' choisis.',0],['pt','Part','Part dans le total '+(s?(window.TN||'Total')+'.':'des fédérations.'),0],['e1','Évol. 1 an',i<0?'Pas de données pour '+(AN-1)+' : évolution indisponible.':'Évolution entre '+(AN-1)+' et '+AN+'.'+L,i<0],['e2','Évol. depuis '+REF,l<0?'Année choisie antérieure ou égale à '+REF+' : évolution indisponible.':'Évolution entre '+REF+' (avant Covid) et '+AN+'.'+L,l<0],['es','Tendance','Licences par année de '+Y[0]+' à '+Y[a-1]+', année choisie en point bleu. Survolez pour le détail. Tri : évolution depuis la première année.',0],['pf','Genre','Répartition femmes / hommes'+(h.length?' pour l\'âge choisi':'')+', sans le filtre de genre'+(f.length?' : le genre choisi est en couleur pleine':'')+'. Tri : part de femmes.',0],['pa','Âge','Répartition par catégorie d\'âge'+(f.length?' pour le genre choisi':'')+', sans le filtre d\'âge'+(h.length?' : la catégorie choisie est en couleur pleine. Tri : part de la catégorie choisie.':'. Tri : part des moins de 21 ans.'),0],['tx','Pour 1 000 hab.',(AP?'Taux approximatif : population par âge estimée (tranches de 5 ans de l\'INSEE réparties également). ':'')+'Licences pour 1 000 habitants (population INSEE'+(s?' du territoire ; vide pour COM, Monaco, étranger':'')+'). Compte des licences, pas des personnes.',AP]];s&&T.push(FS?['is','Spécificité','Indice de spécificité : part de la sélection dans les licences du territoire, divisée par cette part en France. Au-dessus de 1 : sur-représentée.',0]:['tn','1re fédération','Fédération qui compte le plus de licences dans le territoire, et sa part.',0]),document.body.addEventListener('click',function(n){var t=n.target.closest('[data-c],[data-g],[data-x]');if(t){var e=t.dataset;e.c?k.c===e.c?k.d=-k.d:(k.c=e.c,k.d='n'===e.c||'tn'===e.c?1:-1):e.g?b[+e.g].open=!b[+e.g].open:e.x&&m.forEach(function(n){n.open='1'===e.x}),W()}}),n.addEventListener('mousemove',function(n){var t=n.target.closest('[data-t]');if(t){e.innerHTML=function(n){var t=n.split(':'),e=+t[1];if('h'===t[0])return'<b>'+T[e][1]+'</b><br>'+T[e][2];var s=b[e],a='<b>'+M(s.n)+'</b>';return's'===t[0]?(a+='<table>',s.s.forEach(function(n,t){if(n){var e=t?s.s[t-1]:0;a+='<tr'+(t===r?' class=ts':'')+'><td>'+Y[t]+'</td><td>'+q(n)+'</td><td>'+(e?H(n/e-1,1):'–')+'</td></tr>'}}),a+'</table>'):'f'===t[0]?a+'<br><i class=dt style=background:'+o+'></i>Femmes : '+q(s.f)+' ('+H(s.pf)+')<br><i class=dt style=background:'+c+'></i>Hommes : '+q(s.h)+' ('+H(1-s.pf)+')'+(h.length?'<br><em>Pour l\'âge choisi</em>':''):(d.forEach(function(n,t){a+='<br><i class=dt style=background:'+p[t]+'></i>'+(V(t)&&h.length?'<b>'+n+'</b>':n)+' : '+q(s.a[t])+' ('+H(s.pa?s.pa[t]:null)+')'}),a+(f.length?'<br><em>Pour le genre choisi</em>':''))}(t.dataset.t),e.style.display='block';var s=e.offsetWidth,a=e.offsetHeight,i=n.clientX+14,l=n.clientY+14;i+s>innerWidth-4&&(i=n.clientX-s-14),l+a>innerHeight-4&&(l=n.clientY-a-14),e.style.left=Math.max(4,i)+'px',e.style.top=Math.max(4,l)+'px'}else e.style.display='none'}),n.addEventListener('mouseleave',function(){e.style.display='none'}),function(){var n,e='<svg width=15 height=15 viewBox=\'0 0 24 24\' fill=none stroke=#8A94A6 stroke-width=2 stroke-linecap=round stroke-linejoin=round>',a='<span class=sp></span>',r='<span class=pl>',i=1===E.length&&!(w&&E[0].ga),l=y?m.length:g.length,u=(y?NV:IL).toLowerCase()+'s';n=E.length?i?r+IL+' <b>'+M(E[0].n)+'</b></span>'+r+NV+' <b>'+M(E[0].gn)+'</b></span>':A.map(function(n){return r+'<i class=dg></i>'+NV+' <b>'+M(n.n)+'</b></span>'}).join('')+r+'<b>'+E.length+'</b> '+IL.toLowerCase()+(E.length>1?'s':'')+'</span>':r+'<b>'+l+'</b> '+u+(s?'':' agréées en '+AN)+'</span>';var f=GE||AGL?'<span class=e2>'+e+'<circle cx=9 cy=8 r=3.2 /><path d=\'M3 20c.7-3.4 3-5.2 6-5.2s5.3 1.8 6 5.2\'/></svg>Public</span>'+(GE?'<span class=ac><i></i>'+GE+'</span>':'')+(AGL?'<span class=ac><i></i>'+AGL+'</span>':''):'<span class=e2>'+e+'<circle cx=9 cy=8 r=3.2 /><path d=\'M3 20c.7-3.4 3-5.2 6-5.2s5.3 1.8 6 5.2\'/></svg>Tous publics</span>',h='<span class=lg><b>Genre</b><span'+(j('F')?'':' class=of')+'><i style=background:'+o+'></i>Femmes</span><span'+(j('H')?'':' class=of')+'><i st
-- … (code tronqué : 12 694 caractères au total  voir le fichier TMDL)
```

</details>

## 09. Panneau gauche

| Mesure | Format | Masquée | Description |
|---|---|:-:|---|
| `HTML Auteur` |  |  | Carte Auteur du panneau gauche (HTML Content ~230 x 200, fond transparent) : nom, titre, lien LinkedIn (à renseigner) et projet GitHub, e-mail. Liens : activer Autoriser l'ouverture des URL ; e-mail sélectionnable : activer Autoriser la sélection de texte. |
| `HTML Sources` |  |  | Bloc Sources du panneau gauche (HTML Content ~230 x 230, fond transparent). Liens cliquables : activer Autoriser l'ouverture des URL dans le format du visuel. |

<details><summary><code>HTML Auteur</code></summary>

```dax
-- =====================================================================
-- HTML Auteur | panneau gauche (fond bleu nuit) | visuel HTML Content ~230 x 220, arrière-plan transparent
-- Carte blanche pour ressortir sur le bandeau bleu.
-- Liens : Format du visuel > Mise en forme du contenu > Autoriser l'ouverture des URL = Activé
-- E-mail copiable : Autoriser la sélection de texte = Activé (le lien mailto n'est pas ouvert par le visuel)
-- =====================================================================
VAR _Nom       = "Quentin Diouet"
VAR _Initiales = "QD"
VAR _Titre     = "Consultant indépendant<br>Data Analyst · Power BI"
VAR _LinkedIn  = "https://www.linkedin.com/in/quentin-diouet"
VAR _Projet    = "https://github.com/diouetq/PowerBI-Projects/tree/main/LicencesFederations"
VAR _Mail      = "diouet.pro@gmail.com"
-- styles
VAR _Btn = "display:flex;align-items:center;justify-content:center;gap:7px;flex:1;height:36px;border-radius:8px;font-size:14px;font-weight:600;text-decoration:none;color:#FFFFFF"
VAR _IcoIn  = "<svg width='16' height='16' viewBox='0 0 24 24' fill='#FFFFFF'><path d='M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z'/></svg>"
VAR _IcoGh  = "<svg width='17' height='17' viewBox='0 0 24 24' fill='#FFFFFF'><path d='M12 .3a12 12 0 0 0-3.8 23.38c.6.12.83-.26.83-.57L9 21.07c-3.34.72-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.08-.74.09-.73.09-.73 1.2.09 1.83 1.24 1.83 1.24 1.07 1.83 2.81 1.3 3.5 1 .1-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.14-.3-.54-1.52.1-3.18 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.28-1.55 3.29-1.23 3.29-1.23.64 1.66.24 2.88.12 3.18a4.65 4.65 0 0 1 1.23 3.22c0 4.61-2.8 5.63-5.48 5.92.42.36.81 1.1.81 2.22l-.01 3.29c0 .32.21.69.82.57A12 12 0 0 0 12 .3'/></svg>"
VAR _IcoMail = "<svg width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='#475467' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><rect x='3' y='5' width='18' height='14' rx='2'/><path d='M3 7l9 6 9-6'/></svg>"
RETURN
    "<div style='font-family:Segoe UI,sans-serif;color:#101828;padding:14px;border-radius:12px;background:#FFFFFF;box-shadow:0 4px 14px rgba(0,0,0,.25)'>"
    & "<div style='display:flex;align-items:center;gap:12px'>"
    & "<div style='flex:none;width:46px;height:46px;border-radius:50%;background:#4361EE;color:#FFFFFF;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:17px'>" & _Initiales & "</div>"
    & "<div style='min-width:0'><div style='font-size:18px;font-weight:700;line-height:1.2'>" & _Nom & "</div>"
    & "<div style='font-size:14px;color:#475467;line-height:1.35;margin-top:3px'>" & _Titre & "</div></div></div>"
    & "<div style='display:flex;gap:6px;margin-top:12px'>"
    & IF(_LinkedIn <> "", "<a href='" & _LinkedIn & "' target='_blank' style='" & _Btn & ";background:#0A66C2'>" & _IcoIn & "LinkedIn</a>")
    & "<a href='" & _Projet & "' target='_blank' style='" & _Btn & ";background:#0B1C4F'>" & _IcoGh & "GitHub</a>"
    & "</div>"
    & "<div style='display:flex;align-items:center;gap:7px;margin-top:10px;font-size:14px;color:#344054;user-select:all'>" & _IcoMail & _Mail & "</div>"
    & "</div>"
```

</details>

<details><summary><code>HTML Sources</code></summary>

```dax
-- =====================================================================
-- HTML Sources | panneau gauche (fond bleu nuit) | visuel HTML Content ~230 x 330, arrière-plan transparent
-- Liens cliquables : Format du visuel > Mise en forme du contenu > Autoriser l'ouverture des URL = Activé
-- =====================================================================
VAR _Auteur   = "Quentin Diouet"
VAR _UrlInjep = "https://injep.fr/donnee/recensement-des-licences-et-clubs-sportifs-2025/#tab02"
VAR _UrlInsee = "https://www.insee.fr/fr/statistiques/8721456"
VAR _AnMin    = MINX(ALL(T_Annee[Annee]), VALUE(T_Annee[Annee]))
VAR _AnMax    = MAXX(ALL(T_Annee[Annee]), VALUE(T_Annee[Annee]))
VAR _Statut   = CALCULATE(MAX(T_Annee[Statut]), REMOVEFILTERS(T_Annee), T_Annee[Annee] = FORMAT(_AnMax, "0"))
VAR _Semi     = CONTAINSSTRING(_Statut, "semi")
VAR _Maj      = [Date MAJ]
-- styles
VAR _Tit  = "font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#C7D0FB;display:flex;align-items:center;gap:6px;margin-bottom:10px"
VAR _Item = "font-size:13px;line-height:1.45;color:#E4E7EC;margin-bottom:12px"
VAR _Btn  = "display:inline-flex;align-items:center;gap:5px;margin-top:5px;padding:3px 10px;border-radius:999px;background:#4361EE;color:#FFFFFF;font-size:12px;font-weight:600;text-decoration:none"
VAR _Fl   = "<svg width='11' height='11' viewBox='0 0 24 24' fill='none' stroke='#FFFFFF' stroke-width='2.6' stroke-linecap='round' stroke-linejoin='round'><path d='M7 17L17 7M9 7h8v8'/></svg>"
VAR _Pet  = "font-size:12px;line-height:1.45;color:#A9B4D9"
VAR _Ico  = "<svg width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='#C7D0FB' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M4 4h12l4 4v12H4z'/><path d='M8 12h8M8 16h6'/></svg>"
RETURN
    "<div style='font-family:Segoe UI,sans-serif;padding:2px 4px'>"
    & "<div style='" & _Tit & "'>" & _Ico & "Sources</div>"
    & "<div style='" & _Item & "'><b style='color:#FFFFFF'>INJEP-MEDES</b> · Recensement des licences et clubs sportifs, fédérations agréées, " & _AnMin & "-" & _AnMax & IF(_Semi, " (" & _AnMax & " semi-définitif)") & ".<br><a href='" & _UrlInjep & "' target='_blank' style='" & _Btn & "'>Voir la source " & _Fl & "</a></div>"
    & "<div style='" & _Item & "'><b style='color:#FFFFFF'>Insee</b> · Estimation de la population au 1er janvier, par département, sexe et âge (parution du 13/01/2026).<br><a href='" & _UrlInsee & "' target='_blank' style='" & _Btn & "'>Voir la source " & _Fl & "</a></div>"
    & "<div style='" & _Pet & "'>Traitements : " & _Auteur & ". Les chiffres présentés et leur interprétation n'engagent que leur auteur.</div>"
    & IF(NOT ISBLANK(_Maj), "<div style='" & _Pet & ";margin-top:8px;color:#C7D0FB'>Mise à jour : <b style='color:#FFFFFF'>" & _Maj & "</b></div>")
    & "</div>"
```

</details>

## 10. Assistant

| Mesure | Format | Masquée | Description |
|---|---|:-:|---|
| `HTML Assistant` |  |  | Assistant (visuel HTML Content édition standard) : mettre T_Assistant_Bloc[Ordre] puis cette mesure dans Content. Renvoie un bloc par ligne, chacun sous 32 767 caractères : données précalculées (script text/plain), interface, textes et moteur JS. Les blocs communiquent par le document, leur ordre d'affichage est sans importance. |
| `HTML Assistant CSS` |  |  | Assistant : feuille de style (minifiée) du panneau. Les couleurs et tailles sont des variables --as-* posées par HTML Assistant UI depuis la charte. Source lisible : src/html/assistant/src/assistant.css (régénérer avec src/html/assistant/build.js). Ne pas utiliser de guillemets doubles. |
| `HTML Assistant JS 1` |  |  | Assistant : moteur (minifié), partie 1. Lit les blocs de données (script.as-d de T_Assistant_Bloc), construit le modèle, calcule les indicateurs avec les règles des mesures du rapport, analyse la question. Partage ses fonctions par document.__as. Source lisible : src/html/assistant/src/assistant-1-moteur.js (régénérer avec src/html/assistant/build.js). Ne pas utiliser de guillemets doubles. |
| `HTML Assistant JS 2` |  |  | Assistant : réponses et interface (minifié), partie 2. Aiguillage des questions, réponses chiffrées (valeur, classements, comparaisons, séries, fiches), textes, panneau de discussion. Source lisible : src/html/assistant/src/assistant-2-reponses.js (régénérer avec src/html/assistant/build.js). Ne pas utiliser de guillemets doubles. |
| `HTML Assistant JS 3` |  |  | Assistant : graphiques et interface (minifié), partie 3. Mini-graphiques SVG (courbe des années, carte de France en tuiles, pyramide des âges), phrases d’analyse automatiques, écran d’accueil et panneau de discussion. Source lisible : src/html/assistant/src/assistant-3-graphiques.js (régénérer avec src/html/assistant/build.js). Ne pas utiliser de guillemets doubles. |
| `HTML Assistant JS 4` |  |  | Assistant : questions avancées (minifié), partie 4. Listes (membres d’un regroupement, familles, départements), rangs, deux années au choix, seuils et comptages, critères combinés, tranches d’âge, homonymes, questions proches. Source lisible : src/html/assistant/src/assistant-4-questions.js (régénérer avec src/html/assistant/build.js). Ne pas utiliser de guillemets doubles. |
| `HTML Assistant Textes` |  |  | Assistant : textes rédigés (définitions, méthode, usage du rapport, fiches). Format : clé\|question\|mots-clés séparés par des virgules\|réponse HTML, enregistrements séparés par ~. Clés : def:, info:, use:, fiche:<code fédération>. Source lisible : src/html/assistant/src/assistant-textes.txt. Ne pas utiliser de guillemets doubles, ni \| ni ~ dans les textes. |
| `HTML Assistant UI` |  |  | Assistant : bloc d'interface. Pose les variables de la charte (dossier 00), la feuille de style et la balise racine div#as. Ses attributs data-* transmettent au moteur le nombre de blocs attendus et la sélection en cours du rapport (fédérations, territoire) pour répondre en contexte. |

<details><summary><code>HTML Assistant</code></summary>

```dax
VAR _O = SELECTEDVALUE ( T_Assistant_Bloc[Ordre] )
VAR _T = SELECTEDVALUE ( T_Assistant_Bloc[Type] )
RETURN
    SWITCH (
        TRUE (),
        ISBLANK ( _O ), BLANK (),
        _T = "ui", [HTML Assistant UI],
        _O = 91, [HTML Assistant Textes],
        _O = 95, [HTML Assistant JS 1],
        _O = 96, [HTML Assistant JS 2],
        _O = 97, [HTML Assistant JS 3],
        _O = 98, [HTML Assistant JS 4],
        _T IN { "txt", "js" }, BLANK (),
        "<script type='text/plain' class='as-d' data-t='" & _T & "'>"
            & SELECTEDVALUE ( T_Assistant_Bloc[Texte] ) & "</script>"
    )
```

</details>

<details><summary><code>HTML Assistant CSS</code></summary>

```dax
"html,body{margin:0;padding:0;background:transparent}#as{--as-v2:#7C5CF6;--as-grad:linear-gradient(135deg,var(--as-accent),var(--as-v2));position:fixed;inset:0;display:flex;flex-direction:column;font-family:var(--as-police);font-size:calc(var(--as-t) + 3px);color:var(--as-texte);background:linear-gradient(180deg,#F5F3FF 0%,#EEF2FF 45%,#F8FAFF 100%);box-sizing:border-box;overflow:hidden;border-radius:18px}#as *{box-sizing:border-box}#as button{font-family:inherit;cursor:pointer}#as b{font-weight:650}.as-tete{display:flex;align-items:center;gap:14px;padding:18px 18px 14px}.as-logo{flex:none;width:46px;height:46px;border-radius:14px;background:var(--as-grad);display:flex;align-items:center;justify-content:center;box-shadow:0 6px 16px rgba(91,76,240,.35)}.as-id{flex:1;min-width:0}.as-titre{display:flex;align-items:center;flex-wrap:wrap;gap:8px;font-size:calc(var(--as-t) + 8px);font-weight:700;line-height:1.15;color:var(--as-marine)}.as-badge{font-size:calc(var(--as-p) - 1px);font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:var(--as-v2);background:#fff;border:1.5px solid var(--as-v2);border-radius:999px;padding:2px 9px;line-height:1.3}.as-sous{font-size:calc(var(--as-p) + 1px);color:var(--as-texte2);margin-top:4px;line-height:1.35}.as-nouv{flex:none;width:42px;height:42px;border-radius:12px;border:1px solid #DCD7FE;background:#fff;color:var(--as-v2);display:flex;align-items:center;justify-content:center;transition:all .15s}.as-nouv:hover{background:var(--as-grad);color:#fff;border-color:transparent}.as-fil{flex:1;overflow-y:auto;padding:6px 18px 16px;display:flex;flex-direction:column;gap:14px;scroll-behavior:smooth}.as-fil::-webkit-scrollbar{width:8px}.as-fil::-webkit-scrollbar-thumb{background:#D6D1FB;border-radius:8px}.as-accueil{display:flex;flex-direction:column;gap:14px}.as-hero{display:flex;align-items:flex-start;gap:12px}.as-robot{flex:none;width:84px;height:84px;filter:drop-shadow(0 8px 14px rgba(67,97,238,.28))}.as-bienv{flex:1;background:rgba(255,255,255,.85);border:1px solid #E4E0FD;border-radius:18px;border-top-left-radius:6px;padding:14px 16px;line-height:1.5;box-shadow:0 4px 18px rgba(67,56,202,.08)}.as-bienv .as-h{font-size:calc(var(--as-t) + 6px);font-weight:700;color:var(--as-marine);margin-bottom:6px}.as-bienv p{margin:0 0 8px}.as-bienv p:last-child{margin:0}.as-sim{display:flex;gap:8px;align-items:flex-start;background:#F3F0FF;border:1px dashed #B9AEFB;border-radius:12px;padding:9px 11px;font-size:calc(var(--as-p) + 1px);color:#4B3FA8;line-height:1.4}.as-sim svg{flex:none;margin-top:2px}.as-ex{font-weight:700;color:var(--as-marine);margin-top:2px}.as-onglets{display:flex;flex-wrap:wrap;gap:8px}.as-onglet{border:1px solid #DCD7FE;background:rgba(255,255,255,.8);color:var(--as-texte2);border-radius:999px;padding:6px 14px;font-size:calc(var(--as-p) + 1px);transition:all .15s}.as-onglet:hover{border-color:var(--as-v2);color:var(--as-v2)}.as-onglet.as-on{background:var(--as-grad);border-color:transparent;color:#fff;box-shadow:0 4px 10px rgba(91,76,240,.3)}.as-liste{display:flex;flex-direction:column;gap:9px}.as-rel{display:flex;flex-wrap:wrap;gap:8px;margin-top:10px}.as-sugg{display:inline-flex;align-items:center;gap:10px;align-self:flex-start;max-width:100%;text-align:left;border:1px solid #E1DCFD;background:#fff;color:var(--as-marine);border-radius:999px;padding:9px 16px;font-size:calc(var(--as-t) + 1px);line-height:1.3;box-shadow:0 2px 6px rgba(67,56,202,.07);transition:all .15s}.as-sugg::before{content:'\2192';flex:none;color:var(--as-v2);font-weight:700}.as-sugg:hover{border-color:var(--as-v2);background:#F6F4FF;transform:translateX(2px)}.as-rel .as-sugg{padding:6px 13px;font-size:calc(var(--as-p) + 1px)}.as-ligne{display:flex;gap:10px;align-items:flex-start}.as-av{flex:none;width:34px;height:34px;border-radius:11px;background:var(--as-grad);display:flex;align-items:center;justify-content:center;margin-top:2px}.as-msg{line-height:1.5;border-radius:18px;padding:12px 15px}.as-msg p{margin:0 0 8px}.as-msg p:last-child{margin-bottom:0}.as-moi{align-self:flex-end;background:var(--as-grad);color:#fff;border-bottom-right-radius:6px;max-width:85%;box-shadow:0 4px 12px rgba(91,76,240,.25)}.as-ia{flex:1;min-width:0;background:#fff;border:1px solid #E8E5FD;border-top-left-radius:6px;box-shadow:0 4px 16px rgba(67,56,202,.07)}.as-appar{animation:asIn .3s ease-out}@keyframes asIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}.as-attente{flex:none;display:flex;gap:5px;padding:14px 16px}.as-attente span{width:8px;height:8px;border-radius:50%;background:var(--as-v2);animation:asPt 1s infinite}.as-attente span:nth-child(2){animation-delay:.15s}.as-attente span:nth-child(3){animation-delay:.3s}@keyframes asPt{0%,80%,100%{opacity:.25;transform:translateY(0)}40%{opacity:1;transform:translateY(-3px)}}.as-chapo{color:var(--as-discret);font-size:var(--as-t)}.as-info{color:var(--as-texte2);font-size:var(--as-t);border-left:3px solid var(--as-v2);padding-left:9px}.as-note{color:var(--as-discret);font-size:calc(var(--as-p) + 0px);margin-top:8px!important}.as-up{color:var(--as-hausse);font-weight:650}.as-down{color:var(--as-baisse);font-weight:650}.as-neutre{color:var(--as-texte2)}.as-tab{width:100%;border-collapse:collapse;margin:8px 0 6px;font-size:calc(var(--as-p) + 1px);background:#FBFAFF;border-radius:10px;overflow:hidden}.as-tab th{text-align:left;font-weight:650;color:var(--as-discret);padding:7px 8px;border-bottom:1px solid #E4E0FD;white-space:nowrap}.as-tab td{padding:6px 8px;border-bottom:1px solid #EFEDFB;vertical-align:middle}.as-tab tr:last-child td{border-bottom:0}.as-tab td:first-child{max-width:210px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.as-num{text-align:right!important;white-space:nowrap;font-variant-numeric:tabular-nums}.as-barre{width:20%;min-width:44px}.as-barre span{display:block;height:8px;border-radius:5px;background:var(--as-grad)}.as-barre span.as-neg{background:var(--as-baisse)}.as-serie{display:flex;align-item
-- … (code tronqué : 10 550 caractères au total  voir le fichier TMDL)
```

</details>

<details><summary><code>HTML Assistant JS 1</code></summary>

```dax
"<script>!function(){'use strict';var e=document,n=e.__as=e.__as||{};function r(e){return String(e||'').toLowerCase().replace(/œ/g,'oe').replace(/æ/g,'ae').normalize('NFD').split('').filter(function(e){var n=e.charCodeAt(0);return n<768||n>879}).join('').replace(/[^a-z0-9+]+/g,' ').trim()}function t(e){return e.length>3&&'s'===e.charAt(e.length-1)&&'s'!==e.charAt(e.length-2)?e.slice(0,-1):'aux'===e?'au':e}function i(e){var n=r(e);return n?' '+n.split(' ').map(t).join(' ')+' ':' '}var a={};function s(e){return a[e]?a[e]:a[e]=(' '===e.charAt(0)?' ':'')+r(e).split(' ').map(t).join(' ')+(' '===e.charAt(e.length-1)?' ':'')}function o(e,n){for(var r=0;r<n.length;r++)if(e.indexOf(s(n[r]))>=0)return!0;return!1}function u(e){return''===e||null==e?0:+e}function l(e,n){(e||[]).join('~').split('~').forEach(function(e){e&&n(e.split('|'))})}n.norm=r,n.cle=i,n.a=o,n.lireBlocs=function(){var n={};return Array.prototype.forEach.call(e.querySelectorAll('script.as-d'),function(e){var r=e.getAttribute('data-t');(n[r]=n[r]||[]).push(e.textContent)}),n};var c={11:'en Île-de-France',24:'en Centre-Val de Loire',27:'en Bourgogne-Franche-Comté',28:'en Normandie',32:'dans les Hauts-de-France',44:'dans le Grand Est',52:'en Pays de la Loire',53:'en Bretagne',75:'en Nouvelle-Aquitaine',76:'en Occitanie',84:'en Auvergne-Rhône-Alpes',93:'en Provence-Alpes-Côte d’Azur',94:'en Corse','01':'en Guadeloupe','02':'en Martinique','03':'en Guyane','04':'à La Réunion','06':'à Mayotte'};function p(e,r){var t=n.M,i=e.codes.filter(function(e){return t.F[e]&&t.F[e].cc});return r&&i.length?i:e.codes}n.construire=function(e){var a={F:{},Fl:[],T:{},Tl:[],byF:{},byT:{},L:{},Ll:[],S:{},Sl:[],txt:[],cache:{}},s=((e.meta||[])[0]||'').split('|');function o(e){return(e[1]||'').split(';').map(function(e){return e.split(',').map(u)})}a.N=+s[0]||2025,a.R=+s[1]||2019,a.A0=+s[2]||2016,a.maj=s[3]||'',a.P=a.N-1,l(e.fed,function(e){var n={code:e[0],nom:e[1],fam:e[2]||'',sfam:e[3]||'',grp:e[4]||'',lib:e[5]||e[1],ser:[],age:null,tr:null};a.F[n.code]=n,a.Fl.push(n)}),l(e.ter,function(e){var n={code:e[0],nom:e[1],reg:e[2],regNom:e[3]||'',zone:e[4]||'',pop:[u(e[5]),u(e[6]),u(e[7])],ser:[],age:null,tr:null};a.T[n.code]=n,a.Tl.push(n)}),l(e.ser,function(e){var n=a.F[e[0]];n&&(n.ser=(e[1]||'').split(',').map(u))}),l(e.sert,function(e){var n=a.T[e[0]];n&&(n.ser=(e[1]||'').split(',').map(u))}),l(e.pro,function(e){var n=a.F[e[0]];n&&(n.age=''===e[1]?null:+e[1],n.tr=(e[2]||'').split(',').map(u))}),l(e.prot,function(e){var n=a.T[e[0]];n&&(n.age=''===e[1]?null:+e[1],n.tr=(e[2]||'').split(',').map(u))}),l(e.serr,function(e){var n=a.F[e[0]];n&&(n.serR={},(e[1]||'').split(';').forEach(function(e){var r=e.indexOf(':');r>0&&(n.serR[e.slice(0,r)]=e.slice(r+1).split(',').map(u))}))}),l(e.serf,function(e){var n=a.F[e[0]];n&&(n.serF=(e[1]||'').split(',').map(u))}),l(e.sertf,function(e){var n=a.T[e[0]];n&&(n.serF=(e[1]||'').split(',').map(u))}),l(e.pyr,function(e){var n=a.F[e[0]];n&&(n.pyr=(e[1]||'').split(',').map(u))}),l(e.pyrt,function(e){var n=a.T[e[0]];n&&(n.pyr=(e[1]||'').split(',').map(u))}),a.v2=!(!e.serr||!e.serr.length),l(e.sertr,function(e){var n=a.F[e[0]];n&&(n.trS=o(e))}),l(e.serttr,function(e){var n=a.T[e[0]];n&&(n.trS=o(e))}),l(e.serhc,function(e){var n=a.T[e[0]];n&&(n.hc=(e[1]||'').split(',').map(u),n.hcF=(e[2]||'').split(',').map(u),n.hcT=(e[3]||'').split(';').map(function(e){return e.split(',').map(u)}))}),(e.cube||[]).forEach(function(e){e.split('~').forEach(function(e){var n=e.indexOf('|');if(!(n<0)){var r=e.slice(0,n);e.slice(n+1).split(';').forEach(function(e){var n=e.split(',');if(n[0]){var t={d:r,f:n[0],n:u(n[1]),p:u(n[2]),r:u(n[3]),w:u(n[4])};(a.byF[t.f]=a.byF[t.f]||[]).push(t),(a.byT[r]=a.byT[r]||[]).push(t)}})}})}),l(e.txt,function(e){a.txt.push({cle:e[0],q:e[1]||'',mots:(e[2]||'').split(',').map(i).filter(function(e){return e.trim()}),rep:e[3]||''})}),a.annees=[];for(var p=a.A0;p<=a.N;p++)a.annees.push(p);function h(e,n,r,t,i,s){var o={id:e,type:n,nom:r,deps:t,set:{},prep:i};for(var u in s||{})o[u]=s[u];return t.forEach(function(e){o.set[e]=1}),a.L[e]=o,a.Ll.push(o),o}function v(e){return a.Tl.filter(e).map(function(e){return e.code})}a.Fl.forEach(function(e){e.cc=e.ser.length>=a.annees.length&&e.ser.every(function(e){return e>0})}),a.nbCC=a.Fl.filter(function(e){return e.cc}).length,h('TOT','zone','Tous territoires',v(function(){return!0}),'tous territoires confondus'),h('MET','zone','Métropole',v(function(e){return'Métropole'===e.zone}),'en métropole'),h('DROM','zone','DROM',v(function(e){return'DROM'===e.zone}),'dans les DROM'),h('COM','zone','COM',v(function(e){return'COM'===e.zone}),'dans les COM'),h('OM','zone','Outre-mer',v(function(e){return'DROM'===e.zone||'COM'===e.zone}),'en outre-mer'),h('MDR','zone','Métropole et DROM',v(function(e){return'Métropole'===e.zone||'DROM'===e.zone}),'en métropole et dans les DROM');var g={};function b(e,n,r,t,i){var s={id:e,type:n,nom:r,codes:t};for(var o in i||{})s[o]=i[o];return a.S[e]=s,a.Sl.push(s),s}return a.Tl.forEach(function(e){if('Métropole'===e.zone||'DROM'===e.zone){var n='DROM'===e.zone?e.nom:e.regNom;(g[e.reg]=g[e.reg]||{nom:n,deps:[]}).deps.push(e.code)}}),Object.keys(g).forEach(function(e){h('R'+e,'region',g[e].nom,g[e].deps,c[e]||'en '+g[e].nom,{reg:e})}),a.Ll.forEach(function(e){var n=Object.keys(g).filter(function(n){return g[n].deps.every(function(n){return e.set[n]})}),r={};n.forEach(function(e){g[e].deps.forEach(function(e){r[e]=1})});var t=e.deps.filter(function(e){return!r[e]});e.regs=!n.length||0!==t.length&&'TOT'!==e.id?null:n}),a.Tl.forEach(function(e){h('D'+e.code,'dep',e.nom,[e.code],'dans le '+e.code+' ('+e.nom+')',{court:e.nom+' ('+e.code+')'})}),b('ALL','all','Toutes fédérations',a.Fl.map(function(e){return e.code}),{all:!0}),a.Fl.forEach(function(e){b('F'+e.code,'fed',e.nom,[e.code],{f:e})}),[['fam','famille'],['sfam','sous-famille'],['grp','groupe']].forEach(function(e){var n={};a.Fl.forEach(function(r){var t=r[e[0]];t&&(n[t]=n[t]||[]).push(r.code)}),Object.keys(n).forEa
-- … (code tronqué : 29 084 caractères au total  voir le fichier TMDL)
```

</details>

<details><summary><code>HTML Assistant JS 2</code></summary>

```dax
"<script>!function(){'use strict';var e,n,t,r,i,s,o,u,l,a,p,c,f,d,m=document,v=m.__as=m.__as||{},g=function(e,n){return v.a(e,n)};function h(e){return e.prep}function L(e){return e.all?'Toutes fédérations confondues':e.nom}function b(e,n){return e.all&&'TOT'===n.id?'Ensemble des licences (toutes fédérations, tous territoires)':L(e)+', '+h(n)}function T(){var m=v.F;f=v.G,d=v.I,e=m.n0,n=m.dec,t=m.pct,r=m.fm,i=m.fmc,o=m.SIGNE,s=m.LIB,m.cls,u=m.b,l=m.evoTxt,a=m.tableau,p=m.note,c=m.titre}function q(e,n){var t=null,r=0;return v.M.txt.forEach(function(i){if(!n||n.some(function(e){return 0===i.cle.indexOf(e)})){var s=0;i.mots.forEach(function(n){e.indexOf(n)>=0&&(s+=n.length)}),s>r&&(r=s,t=i)}}),r>=4?t:null}function R(i,s,o,c){var m,g=v.M,L=c.ans[0];if('pop'===o)return'<p>Population '+h(s)+' au 1er janvier '+g.N+' : '+u(e(v.val(i,s,'pop')))+' habitants (Insee).</p>';if('age'===o)return function(n,i){var s=v.M,o=v.profil(n,i);if(!o){var l='<p>L’âge est disponible pour une fédération tous territoires confondus, ou pour un territoire toutes fédérations confondues.</p>',p=v.profil(n,s.L.TOT),c=v.profil(s.S.ALL,i);return p&&(l+='<p>'+n.nom+', tous territoires confondus : âge moyen '+u(r('age',p.age))+'.</p>'),c&&'TOT'!==i.id&&(l+='<p>Toutes fédérations '+h(i)+' : âge moyen '+u(r('age',c.age))+'.</p>'),l}var m=o.tr,g=m[0]+m[1]+m[2]+m[3]+m[4],L='<p>'+b(n,i)+' en '+s.N+' : âge moyen '+u(r('age',o.age))+'.</p>',T=(n.all,v.profil(s.S.ALL,s.L.TOT));!T||n.all&&'TOT'===i.id||(L+='<p>Moyenne de l’ensemble des licences, tous territoires confondus : '+r('age',T.age)+'.</p>'),L+=a([{t:'Tranche',f:function(e){return e.n}},{t:'Licences',f:function(n){return e(n.v)}},{t:'Part',f:function(e){return t(g?e.v/g:null)}}],[{n:'Enfants (1-13 ans)',v:m[0]},{n:'Jeunes (14-20 ans)',v:m[1]},{n:'Adultes (21-55 ans)',v:m[2]},{n:'Seniors (56 ans et plus)',v:m[3]}].concat(m[4]?[{n:'Âge non renseigné',v:m[4]}]:[]),{v:function(e){return e.v}});var q=v.pyramide(n,i);return q&&(L+='<p class=as-chapo>Pyramide des âges '+s.N+' (femmes à gauche, hommes à droite) :</p>'+f.pyramide(q)+d.pyramide(q)),L}(i,s);if('fem'===o){var T=v.val(i,s,'fem'),q=v.agg(i,s);if(m='<p>'+b(i,s)+' en '+g.N+' : '+u(t(T))+' de femmes, soit '+e(q.w)+' licences féminines sur '+e(q.n)+'.</p>',!i.all){var R=v.val(g.S.ALL,s,'fem');m+='<p>Toutes fédérations confondues, la part est de '+t(R)+' : '+(T>R?'c’est plus féminisé que la moyenne':'c’est moins féminisé que la moyenne')+'.</p>'}return(c.q.indexOf(' homme')>=0||c.q.indexOf(' masculin')>=0)&&(m+=p('Les hommes et les licences non réparties par sexe représentent le reste, soit '+t(1-T)+'.')),m}if('p100'===o){var S=v.val(i,s,'p100');if(null==S)return'<p>Pas de population Insee pour ce territoire : le nombre de licences pour 1 000 habitants n’est pas calculable.</p>';if(m='<p>'+b(i,s)+' en '+g.N+' : '+u(r('p100',S)+' licences pour 1 000 habitants')+' ('+e(v.agg(i,s).n)+' licences, '+e(v.val(i,s,'pop'))+' habitants).</p>','TOT'!==s.id){var x=v.val(i,g.L.TOT,'p100');m+='<p>En métropole et DROM : '+r('p100',x)+' pour 1 000 habitants, soit '+(S>x?u(t(S/x-1))+' de plus':u(t(1-S/x))+' de moins')+' '+h(s)+'.</p>'}return m}if('ind'===o||'part'===o){if(i.all)return'<p>La part et l’indice de spécificité se calculent pour une fédération ou un regroupement : précisez lequel, par exemple « indice du rugby en Occitanie ».</p>';var A=v.val(i,s,'part'),N=v.val(i,s,'ind');return m='<p>'+i.nom+' pèse '+u(t(A))+' des licences '+h(s)+' en '+g.N+'.</p>','TOT'!==s.id&&null!=N&&(m+='<p>Indice de spécificité : '+u(n(N,2))+', '+(N>=1?'soit un poids '+t(N-1)+' plus élevé':'soit un poids '+t(1-N)+' plus faible')+' qu’au total ('+t(v.val(i,g.L.TOT,'part'))+').</p>'),m}if(/^t[npde][1-4]$/.test(o))return v.Q.valeurTranche(i,s,o);if(O[o]||'femn'===o||'dif1'===o||'difR'===o)return y(i,s,o);if(L&&L!==g.N){var C=v.licAn(i,s,L);if(null==C)return'<p>Pour ce croisement, j’ai les années '+g.R+', '+g.P+' et '+g.N+'. Le détail année par année existe pour une fédération (tous territoires confondus) ou dans une région, et pour un territoire toutes fédérations confondues.</p>';var P=v.val(i,s,'lic'),E=v.licAnCC(i,s,L),j=v.licAnCC(i,s,g.N);return'<p>'+b(i,s)+' en '+L+' : '+u(e(C)+' licences')+'.</p><p>En '+g.N+' : '+e(P)+' licences, soit '+l(E?j/E-1:null)+' depuis '+L+'.</p>'+v.noteCC(i,s)}var z=v.agg(i,s);if(!z.n&&!z.p&&!z.r)return'<p>Aucune licence '+(i.all?'':'de '+i.nom+' ')+h(s)+' dans les données.</p>';m='<p>'+b(i,s)+' en '+g.N+' : '+u(e(z.n)+' licences')+'.</p>';var F=z.cc?z.c:z;if(m+='<p>Évolution : '+l(v.val(i,s,'evo1'))+' sur un an ('+e(F.p)+' en '+g.P+') et '+l(v.val(i,s,'evoR'))+' depuis '+v.M.R+' ('+e(F.r)+').</p>'+v.noteCC(i,s),i.all){if('TOT'!==s.id){var Q=v.val(i,s,'p100');null!=Q&&(m+='<p>Soit '+n(Q,1)+' licences pour 1 000 habitants (métropole et DROM : '+n(v.val(i,v.M.L.TOT,'p100'),1)+').</p>')}}else{var k=v.val(i,s,'part');m+='<p>Cela représente '+t(k)+' des licences '+h(s);var I=v.val(i,s,'ind');'TOT'!==s.id&&null!=I&&(m+=' (indice de spécificité '+n(I,2)+')'),m+='.</p>'}var w=v.serie(i,s);return w&&(m+=f.courbe([{nom:M(i),v:w}],g.annees,{ref:g.R})),m+d.valeur(i,s)}var O={fevoR:1,fdifR:1,fptR:1};function y(n,r,s){var o,a=v.M,c=v.agg(n,r);if('femn'===s)return o='<p>'+b(n,r)+' en '+a.N+' : '+u(e(c.w)+' licences féminines')+', soit '+t(c.n?c.w/c.n:null)+' des licences.</p>',n.all||(o+='<p>Cela représente '+t(v.agg(a.S.ALL,r).w?c.w/v.agg(a.S.ALL,r).w:null)+' de toutes les licences féminines '+h(r)+'.</p>'),o;if('dif1'===s||'difR'===s){var m=c.cc?c.c:c,g='dif1'===s?m.p:m.r,L='dif1'===s?a.P:a.R,T=v.val(n,r,s);return(o='<p>'+b(n,r)+' : '+u(i(s,T)+' licences')+' entre '+L+' et '+a.N+' ('+e(g)+' → '+e(m.n)+'), soit '+l(g?m.n/g-1:null)+'.</p>'+v.noteCC(n,r))+d.valeur(n,r)}var q=v.serie(n,r,'F',1);if(!q)return'<p>L’historique des licences féminines existe pour une fédération (ou un regroupement) tous territoires confondus, et pour un territoire toutes fédérations confondues.</p>'+('TOT'===r.id||n.all?'':'<p>'+M(n)+', tous territoires confondus : '+i(
-- … (code tronqué : 28 188 caractères au total  voir le fichier TMDL)
```

</details>

<details><summary><code>HTML Assistant JS 3</code></summary>

```dax
"<script>!function(){'use strict';var e=document,t=e.__as=e.__as||{};t.ICO={etoile:'<svg viewBox=\'0 0 24 24\' width=\'24\' height=\'24\'><path d=\'M12 2l2.2 6.3L20.5 10.5l-6.3 2.2L12 19l-2.2-6.3L3.5 10.5l6.3-2.2z\' fill=\'#fff\'/><path d=\'M19 15l.9 2.1 2.1.9-2.1.9L19 21l-.9-2.1L16 18l2.1-.9z\' fill=\'#fff\' opacity=\'.85\'/></svg>',mini:'<svg viewBox=\'0 0 24 24\' width=\'18\' height=\'18\'><path d=\'M12 3l2 5.6 5.6 2-5.6 2L12 18.2l-2-5.6-5.6-2 5.6-2z\' fill=\'#fff\'/></svg>',nouv:'<svg viewBox=\'0 0 24 24\' width=\'20\' height=\'20\' fill=\'none\' stroke=\'currentColor\' stroke-width=\'2.2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'><path d=\'M20 11a8 8 0 1 0-2.3 5.7\'/><path d=\'M20 4v7h-7\'/></svg>',envoi:'<svg viewBox=\'0 0 24 24\' width=\'20\' height=\'20\'><path d=\'M3.4 11.1L19.6 4c.8-.3 1.5.4 1.2 1.2l-7.1 16.2c-.3.8-1.5.7-1.7-.1l-1.6-6.5-6.5-1.6c-.8-.2-.9-1.4-.1-1.7z\' fill=\'#fff\'/></svg>',cible:'<svg viewBox=\'0 0 24 24\' width=\'18\' height=\'18\' fill=\'none\' stroke=\'currentColor\' stroke-width=\'2\' stroke-linecap=\'round\'><circle cx=\'12\' cy=\'12\' r=\'8\'/><circle cx=\'12\' cy=\'12\' r=\'3\'/><path d=\'M12 1v3M12 20v3M1 12h3M20 12h3\'/></svg>',ampoule:'<svg viewBox=\'0 0 24 24\' width=\'18\' height=\'18\' fill=\'none\' stroke=\'currentColor\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'><path d=\'M9 18h6M10 21h4\'/><path d=\'M12 3a6 6 0 0 0-3.6 10.8c.6.5 1 1.2 1 2V16h5.2v-.2c0-.8.4-1.5 1-2A6 6 0 0 0 12 3z\'/></svg>',info:'<svg viewBox=\'0 0 24 24\' width=\'16\' height=\'16\' fill=\'none\' stroke=\'currentColor\' stroke-width=\'2\'><circle cx=\'12\' cy=\'12\' r=\'9\'/><path d=\'M12 11v6M12 7.5v.5\' stroke-linecap=\'round\'/></svg>',fiole:'<svg viewBox=\'0 0 24 24\' width=\'18\' height=\'18\' fill=\'none\' stroke=\'currentColor\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'><path d=\'M9 3h6M10 3v6l-5 9a2 2 0 0 0 1.8 3h10.4a2 2 0 0 0 1.8-3l-5-9V3\'/><path d=\'M7.5 15h9\'/></svg>',robot:'<svg viewBox=\'0 0 100 100\' width=\'84\' height=\'84\'><defs><linearGradient id=\'asG\' x1=\'0\' y1=\'0\' x2=\'1\' y2=\'1\'><stop offset=\'0\' stop-color=\'#ffffff\'/><stop offset=\'1\' stop-color=\'#E3E7FF\'/></linearGradient></defs><path d=\'M50 6l2 5.5 5.5 2-5.5 2L50 21l-2-5.5-5.5-2 5.5-2z\' fill=\'#7C5CF6\'/><line x1=\'50\' y1=\'20\' x2=\'50\' y2=\'28\' stroke=\'#4361EE\' stroke-width=\'3\'/><rect x=\'10\' y=\'44\' width=\'9\' height=\'18\' rx=\'4\' fill=\'#4361EE\'/><rect x=\'81\' y=\'44\' width=\'9\' height=\'18\' rx=\'4\' fill=\'#4361EE\'/><rect x=\'16\' y=\'27\' width=\'68\' height=\'54\' rx=\'22\' fill=\'url(#asG)\' stroke=\'#C9CFFB\' stroke-width=\'2\'/><rect x=\'25\' y=\'38\' width=\'50\' height=\'30\' rx=\'14\' fill=\'#0B1C4F\'/><ellipse cx=\'40\' cy=\'51\' rx=\'5\' ry=\'6\' fill=\'#5EEAD4\'/><ellipse cx=\'60\' cy=\'51\' rx=\'5\' ry=\'6\' fill=\'#5EEAD4\'/><path d=\'M43 60q7 5 14 0\' stroke=\'#5EEAD4\' stroke-width=\'3\' fill=\'none\' stroke-linecap=\'round\'/><path d=\'M32 81h36l-4 12H36z\' fill=\'#4361EE\'/><circle cx=\'50\' cy=\'87\' r=\'3\' fill=\'#fff\'/></svg>'};var n='101:lm|102:lm|106:f|109:lf|110:lf|112:p|113:f|114:lf|118:f|119:f|128:f|135:f|201:lm|202:lf|203:lf|204:f:FFAAA (aïkido, aïkibudo, kinomichi)|205:f:FFAB (budo)|212:f|213:m:bowling et sport de quilles|215:f|216:f|217:f|219:f|220:p|221:p:sports sous-marins|224:lm|228:f|231:f|241:f|242:f:pétanque et jeu provençal|243:m:planeur ultraléger motorisé (ULM)|244:f|245:f|249:m:sauvetage et secourisme|251:f|254:p|255:p:sports de traîneau et canicross|265:f|266:f:force athlétique|267:pf|268:f|269:pf:voitures radio commandées|270:p:sports et loisirs canins|271:p:clubs alpins et de montagne|402:f:FFEPGV|403:f:fédération Sports pour tous|404:f:FFRS (retraite sportive)|405:f:FFST (sport travailliste)|406:f:FCD (clubs de la Défense)|407:f:FNSMR (sport en milieu rural)|408:f:fédération sportive et culturelle de France (FSCF)|409:f:fédération Maccabi|410:f:FSGT|411:f:fédération sportive de la police nationale|413:lf:UFOLEP|415:f:2FOPEN|417:lf:Union nationale sportive Léo Lagrange|418:f:FFSE (sport d’entreprise)|420:f:fédération des ASPTT|421:f:FFSP (sports populaires)|422:f:FFCO (clubs omnisports)|423:f:FNOMS (offices municipaux des sports)|424:lf:UCPA Sport Loisirs|425:lf:UCPA Sport Vacances|426:f:fédération sportive LGBT+|501:m:handisport|503:m:sport adapté|601:f:FFSU (sport universitaire)|602:lf:UGSEL|603:f:FFCU (clubs universitaires)|604:lf:UNSS|605:lf:USEP'.split('|').reduce(function(e,t){var n=t.split(':');return e[n[0]]={g:n[1],l:n.slice(2).join(':')},e},{}),r=t.N={};r.info=function(e){if(!e||e.all)return{g:'lm',l:'ensemble des fédérations'};if('multi'===e.type)return{g:'f',l:'sélection ('+e.codes.length+' fédérations)'};if('grp'===e.type)return'Olympique'===e.nom?{g:'pf',l:'fédérations olympiques'}:'groupe'===e.niv?{g:'pf',l:'fédérations du groupe « '+e.nom+' »'}:{g:'f',l:e.niv+' « '+e.nom+' »'};var t=n[e.f.code]||{g:'m',l:''},r=t.l||e.nom.split(/,| et | \(/)[0].trim().toLowerCase().replace(/ xiii$/,' XIII');return{g:t.g,l:r}},r.nom=function(e,t){var n=r.info(e),i=n.g,l=n.l;return t?{le:{m:'le ',f:'la ',lm:'l’',lf:'l’',p:'les ',pf:'les '},de:{m:'du ',f:'de la ',lm:'de l’',lf:'de l’',p:'des ',pf:'des '},a:{m:'au ',f:'à la ',lm:'à l’',lf:'à l’',p:'aux ',pf:'aux '}}[t][i]+l:l},r.Nom=function(e,t){var n=r.nom(e,t);return n.charAt(0).toUpperCase()+n.slice(1)},r.fem=function(e){var t=r.info(e).g;return'f'===t||'lf'===t||'pf'===t},r.plur=function(e){var t=r.info(e).g;return'p'===t||'pf'===t};var i={TOT:'lm:ensemble des territoires',MET:'f:métropole',DROM:'p:DROM',COM:'p:COM',OM:'lm:outre-mer',MDR:'f:métropole et les DROM',R11:'lf',R24:'m',R27:'f',R28:'f',R32:'p',R44:'m',R52:'p',R53:'f',R75:'f',R76:'lf',R84:'lf',R93:'f',R94:'f',R01:'f',R02:'f',R03:'f',R04:'0',R06:'0'};r.lieu=function(e,t){if('dep'===e.type)return{le:'le ',de:'du ',a:'au '}[t||'le']+e.deps[0];var n=(i[e.id]||'f').split(':'),r=n[0],l=n[1]||e.nom;return'0'===r?{le:'',de:'de ',a:'à '}[t||'le']+l:{le:{m:
-- … (code tronqué : 22 838 caractères au total  voir le fichier TMDL)
```

</details>

<details><summary><code>HTML Assistant JS 4</code></summary>

```dax
"<script>!function(){'use strict';var e=document,n=e.__as=e.__as||{},t=n.Q={},r=function(e,t){return n.a(e,t)};function i(){return n.F}function s(){return n.M.Sl.filter(function(e){return'fed'===e.type})}function l(e,n){return e+(1===e?n?'<sup>re</sup>':'<sup>er</sup>':'<sup>e</sup>')}var u=/ qui (progress|augment|monte|grimpe|gagne|croi|rebondi)[a-z]*| en (hausse|progression|croissance)/,o=/ qui (recul|baiss|perd|diminu|chute|decroch)[a-z]*| en (baisse|recul|declin)/,a=[' feminin',' femme',' jeune',' age',' habitant',' specifique',' plus de licence',' plus gros',' plus grand',' plus pratique',' populaire',' senior',' enfant',' licence feminine'];function c(e,t,r){var s=i();return s.tableau([{t:'Fédération',f:function(e){return e.nom}},{t:'Licences '+r.N,f:function(e){return s.n0(n.agg(e,t).n)}},{t:'Depuis '+r.R,f:function(e){return s.fmc('evoR',n.val(e,t,'evoR'))}},{t:'Femmes',f:function(e){return s.pct(n.val(e,t,'fem'))}}],e,{v:function(e){return n.agg(e,t).n}})}function p(e,n,t){var r=t(n);if(null==r)return null;var i=e.map(t).filter(function(e){return null!=e});return{r:i.filter(function(e){return e>r}).length+1,n:i.length,v:r}}function f(e){return'<div class=as-kpis>'+e.filter(function(e){return e&&null!=e[1]&&'–'!==e[1]}).map(function(e){return'<div class=as-kpi><span>'+e[0]+'</span><b>'+e[1]+'</b>'+(e[2]?'<i>'+e[2]+'</i>':'')+'</div>'}).join('')+'</div>'}function d(e,n){return'<p class=as-fiche-t>'+e+'</p>'+(n?'<p class=as-chapo>'+n+'</p>':'')}function m(e){return'<p class=as-sect>'+e+'</p>'}t.prep=function(e){var t=e.q,s=[],l=[],c=/ (?:de |avec |ayant |qui ont |qui compte )?(plu|moin|au moin|au dessu|en dessou|au dela)(?: de)? (\d[\d ]*)( k| mille| million| 000)? (?:licence|licencie|pratiquant|adherent)/.exec(t);if(c){var p=+c[2].replace(/ /g,''),f=(c[3]||'').trim();'k'!==f&&'mille'!==f||(p*=1e3),'million'===f&&(p*=1e6),'000'===f&&(p*=1e3);var d=!/moin|dessou/.test(c[1]);s.push(function(e,t){var r=n.agg(e,t).n;return d?r>p:r<p}),l.push((d?'de plus de ':'de moins de ')+i().n0(p)+' licences'),t=t.replace(c[0],' ')}var m=r(t.replace(u,' ').replace(o,' '),a)||e.S.some(function(e){return'grp'===e.type||'multi'===e.type})||!!c,g=r(t,[' sur un an',' 1 an',' an dernier']);return m&&u.test(t)?(s.push(function(e,t){return n.val(e,t,g?'evo1':'evoR')>0}),l.push('en hausse '+(g?'sur un an':'depuis '+n.M.R)),t=t.replace(u,' ')):m&&o.test(t)&&(s.push(function(e,t){return n.val(e,t,g?'evo1':'evoR')<0}),l.push('en baisse '+(g?'sur un an':'depuis '+n.M.R)),t=t.replace(o,' ')),r(t,[' majoritairement feminin',' plus de femme que d homme',' majorite feminine',' majorite de femme'])&&(s.push(function(e,t){return n.val(e,t,'fem')>.5}),l.push('majoritairement féminines'),t=t.replace(/ (majoritairement feminin\w*|plu de femme que d homme|majorite (feminine|de femme))/,' ')),s.length&&(e.filtre={f:function(e,n){return s.every(function(t){return t(e,n)})},txt:l.join(' et ')},e.q=t.replace(/ +/g,' ')),e},t.essayer=function(e){var t=e.A,u=e.q,o=(n.M,r(u,[' liste',' lister',' enumere',' quelles sont les',' quels sont les',' compose',' composent',' fait partie',' font partie',' appartien',' membre',' contient',' comprend',' regroupe ',' dans quel groupe',' quelle famille',' quel groupe',' quelle sous famille',' toutes les federation',' tous les sport'])),a=r(u,[' rang',' combientieme',' combien ieme',' quelle place',' quelle position',' se classe',' classement du',' classement de la',' classement de l ',' classee',' classe t il',' classe t elle']),f=r(u,[' combien de federation',' combien de sport',' nombre de federation',' combien de discipline',' combien de region',' combien de departement']),d=r(u,[' top',' classement',' le plus',' la plus',' les plus',' le moins',' les moins',' progressent le plus',' reculent le plus']),m=e.Ss[0];if(m&&'fed'===m.type&&1===e.Ss.length&&u.trim().split(' ').length<=2){var g=n.norm(m.nom).split(' ')[0],v=s().filter(function(e){return e!==m&&(' '+n.norm(e.nom)+' ').indexOf(' '+g+' ')>=0});if(g.length>=4&&v.length)return{html:'<p>Plusieurs fédérations correspondent à « '+t.brut.trim()+' » : '+[m].concat(v).map(function(e){return i().b(e.nom)}).join(', ')+'. Laquelle voulez-vous ?</p>',rel:[m].concat(v).slice(0,4).map(function(e){return'Parle-moi de '+e.nom.split(',')[0]})}}if(o){var h=function(e,t){var l=n.M,u=i(),o=e.Ls[0]||l.L.TOT,a=e.Ss[0];if(a&&'fed'===a.type&&r(t,[' appartien',' fait partie',' quelle famille',' quel groupe',' quelle sous famille',' dans quel groupe',' classee'])){var p=a.f;return{html:'<p>'+u.b(p.lib)+' :</p>'+u.tableau([{t:'Niveau',f:function(e){return e[0]}},{t:'Regroupement',f:function(e){return e[1]||'–'}}],[['Famille',p.fam],['Sous-famille',p.sfam],['Groupe',p.grp]]),rel:p.grp?['Liste des fédérations '+('Olympique'===p.grp?'olympiques':'du groupe '+p.grp)]:[],garde:{S:a,L:l.L.TOT}}}if(a&&('grp'===a.type||'multi'===a.type)){var f=s().filter(function(e){return a.codes.indexOf(e.codes[0])>=0});f.sort(function(e,t){return n.agg(t,o).n-n.agg(e,o).n});var d=n.agg(a,o).n;return{html:'<p>'+('grp'===a.type?a.niv.charAt(0).toUpperCase()+a.niv.slice(1)+' '+u.b(a.nom):u.b(a.nom))+' : '+u.b(f.length+' fédérations')+', '+u.n0(d)+' licences '+o.prep+' en '+l.N+' :</p>'+c(f,o,l),rel:['Quelle fédération '+('Olympique'===a.nom?'olympique':'de ce regroupement')+' progresse le plus ?','Parle-moi '+n.N.nom(a,'de')],garde:{S:a,L:o,rank:{cible:'fed',m:'lic',dans:a}}}}var m=r(t,[' sous famille'])?'sous-famille':r(t,[' groupe'])?'groupe':r(t,[' famille',' regroupement',' categorie'])?'famille':null;if(m&&!a){var g=n.M.Sl.filter(function(e){return'grp'===e.type&&e.niv===m});return g.sort(function(e,t){return n.agg(t,o).n-n.agg(e,o).n}),{html:'<p>Les '+g.length+' '+('groupe'===m?'groupes':'famille'===m?'familles':'sous-familles')+' de fédérations :</p>'+u.tableau([{t:'Regroupement',f:function(e){return e.nom}},{t:'Fédérations',f:function(e){return e.codes.length}},{t:'Licences '+l.N,f:function(e){return u.n0(n.agg(e,o).n)}},{t:'Depuis '+l.R,f:function(e){return u.fmc('evoR',n.va
-- … (code tronqué : 28 247 caractères au total  voir le fichier TMDL)
```

</details>

<details><summary><code>HTML Assistant Textes</code></summary>

```dax
"<script type='text/plain' class='as-d' data-t='txt'>def:licence|Une licence, c’est quoi ?|une licence,licence c est,licencie,une personne,licence personne,c est une personne,nombre de sportif,pratiquant|Une <b>licence</b> est l’adhésion annuelle à une fédération sportive, prise le plus souvent dans un club. Les chiffres comptent donc des licences et non des personnes : une personne inscrite dans deux fédérations est comptée deux fois. La pratique sportive en dehors des fédérations n’est pas couverte.~def:p100|Licences pour 1 000 habitants|pour 1000,pour mille,1000 habitant,pour 100,par habitant,100 habitant,taux de licence,densite|Les <b>licences pour 1 000 habitants</b> rapportent le nombre de licences à la population Insee au 1er janvier de la même année, pour le même sexe et la même tranche d’âge. Seuls les départements qui ont une population Insee entrent dans le calcul : les COM, Monaco, l’étranger et les licences non réparties sont exclus. C’est l’indicateur le plus juste pour comparer des territoires de tailles différentes.~def:indice|Indice de spécificité|specificite,indice,surrepresent,sur represent,typique|L’<b>indice de spécificité</b> compare le poids d’une fédération dans un territoire à son poids dans l’ensemble des licences (tous territoires confondus). Exemple : si le rugby pèse 3 % des licences en Occitanie et 1,5 % au total, l’indice vaut 2 : le rugby y est deux fois plus présent que la moyenne. Un indice de 1 signifie le même poids qu’au total, en dessous de 1 un poids plus faible.~def:part|Part dans l’ensemble|part dans l ensemble,part,poids,pourcentage|La <b>part dans l’ensemble</b> est le poids de la sélection parmi toutes les licences du même territoire, de la même année et du même public. Elle se lit avec l’indice de spécificité, qui compare cette part à celle de l’ensemble des licences.~def:evo|Évolutions|evolution,evol,variation,1 an,sur un an,progression|Deux évolutions sont calculées : <b>sur 1 an</b>, par rapport à l’année précédente, et <b>depuis 2019</b>, la dernière saison complète avant la crise sanitaire. Elles comparent les licences à filtres identiques (territoire, sexe, âge). Pour un regroupement, un territoire ou le total, elles sont calculées <b>à champ constant</b> (méthode INJEP) : seules les fédérations présentes chaque année de la période comptent ; une fédération seule garde sa propre évolution.~info:2019|Pourquoi comparer à 2019 ?|pourquoi 2019,pourquoi comparer a 2019,comparer a 2019,pourquoi compare,2019,covid,crise sanitaire,avant covid,reference|<b>2019</b> est la dernière année complète avant la crise sanitaire. Les licences ont fortement chuté avec les confinements et la fermeture des équipements, puis sont remontées. Comparer à 2019 permet de savoir si une fédération a retrouvé, dépassé ou non son niveau d’avant crise.~def:femmes|Part de femmes|part de femme,femme,feminin,mixite,feminisation|La <b>part de femmes</b> est le nombre de licences féminines divisé par l’ensemble des licences, y compris les quelques licences dont le sexe n’est pas renseigné. Elle ne tient pas compte du segment Sexe.~def:age|Âge moyen et tranches d’âge|age moyen,age,tranche,enfant,senior,jeune|L’<b>âge moyen</b> est l’âge au 1er janvier, pondéré par le nombre de licences ; les licences sans âge sont exclues. Les tranches suivent les grandes catégories de l’INJEP : enfants (1-13 ans), jeunes (14-20), adultes (21-55) et seniors (56 et plus).~info:nr|Licences non réparties|non reparti,non repartie,nr,sans departement,comparable,fiabilite|Une partie des licences n’a pas de sexe, d’âge ou de département connu : elles sont classées <b>non réparties</b>. Elles comptent dans le total France mais dans aucun territoire. L’INJEP prévient que les répartitions par sexe, âge et territoire sont moins comparables dans le temps à cause de ces non-répartis.~info:sources|D’où viennent les données ?|source,donnee,d ou vien,injep,insee,medes,fiable,origine|Les licences viennent du <b>recensement des licences sportives de l’INJEP-MEDES</b> (licences annuelles 2016-2025, millésime 2025), qui couvre plus d’une centaine de fédérations agréées. La population vient de l’<b>Insee</b> (estimations au 1er janvier par département, sexe et âge). Les liens sont dans le bloc Sources du panneau de gauche.~info:maj|Mise à jour|mise a jour,a jour,actualis,date,quand,recent,derniere annee|Les données sont annuelles : la dernière année disponible est 2025. La date de la dernière actualisation du rapport est affichée en bas du panneau de gauche.~def:annee|Que représente une année ?|annee,saison,millesime,recensement|L’année est celle du recensement : selon les fédérations, elle correspond à la saison N ou à la saison N-1/N. Les années sont comparables entre elles pour une même fédération.~def:regroupement|Familles, sous-familles et groupes|famille,sous famille,groupe,regroupement,olympique,affinitaire,delegataire,categorie|Les fédérations sont classées à trois niveaux : la <b>famille</b> (sports collectifs, sports de nature…), la <b>sous-famille</b> (sports raquettes, arts martiaux…) et le <b>groupe</b> : olympique, délégataire non olympique, affinitaire (multisports), para-sport et scolaire. Le segment Niveau choisit lequel utiliser.~def:territoire|Zones et territoires|zone,territoire,drom,com,metropole,outre mer,monaco,etranger,france entiere|Le territoire <b>Total</b> regroupe toutes les licences. Il se découpe en Métropole (13 régions), DROM (Guadeloupe, Martinique, Guyane, La Réunion, Mayotte), COM (collectivités d’outre-mer), Autres (Monaco, étranger) et non répartis. Les COM et les Autres n’ont pas de population Insee.~def:base100|Vue Base 100|base 100,indice 100,volume,graphique d evolution|La vue <b>Base 100</b> du graphique d’évolution ramène chaque courbe à 100 la première année. Elle compare des rythmes d’évolution entre la sélection, son regroupement et l’ensemble, quelle que soit leur taille. La vue Volume montre les nombres de licences.~use:federation|Comment choisir une fédération ?|
-- … (code tronqué : 11 331 caractères au total  voir le fichier TMDL)
```

</details>

<details><summary><code>HTML Assistant UI</code></summary>

```dax
VAR _Mode = [Sélection mode]
VAR _Fed =
    IF (
        _Mode IN { "Fédération", "Plusieurs fédérations", "Regroupement" },
        CONCATENATEX ( VALUES ( T_Federation[CodeReference] ), T_Federation[CodeReference], "," )
    )
VAR _Ter =
    IF (
        COUNTROWS ( VALUES ( T_Territoire[Code_DEP] ) ) < COUNTROWS ( ALL ( T_Territoire[Code_DEP] ) ),
        CONCATENATEX ( VALUES ( T_Territoire[Code_DEP] ), T_Territoire[Code_DEP], "," )
    )
VAR _Nb = COUNTROWS ( FILTER ( ALL ( T_Assistant_Bloc ), NOT ISBLANK ( T_Assistant_Bloc[Texte] ) ) ) + 1
VAR _Vars =
    "--as-police:" & [Style Police]
        & ";--as-texte:" & [Style Couleur texte]
        & ";--as-texte2:" & [Style Couleur texte secondaire]
        & ";--as-discret:" & [Style Couleur texte discret]
        & ";--as-accent:" & [Style Couleur accent]
        & ";--as-accent-fond:" & [Style Couleur accent fond]
        & ";--as-fond:" & [Style Couleur fond cadre]
        & ";--as-bordure:" & [Style Couleur bordure]
        & ";--as-marine:" & [Style Couleur marine]
        & ";--as-sel:" & [Style Couleur sélection]
        & ";--as-hausse:" & [Style Couleur hausse]
        & ";--as-baisse:" & [Style Couleur baisse]
        & ";--as-neutre-fond:" & [Style Couleur fond neutre]
        & ";--as-neutre:" & [Style Couleur neutre]
        & ";--as-grille:" & [Style Couleur grille]
        & ";--as-t:" & [Style Taille texte] & "px;--as-p:" & [Style Taille petit] & "px"
RETURN
    "<style>#as{" & _Vars & "}" & [HTML Assistant CSS] & "</style>"
        & "<div id='as' data-nb='" & _Nb & "' data-titre='Assistant IA'"
        & " data-mode='" & _Mode & "' data-fed='" & _Fed
        & "' data-nom='" & SUBSTITUTE ( [Sélection libellé], "'", "&#39;" )
        & "' data-ter='" & _Ter
        & "' data-ternom='" & SUBSTITUTE ( [Libellé territoire], "'", "&#39;" ) & "'></div>"
```

</details>
