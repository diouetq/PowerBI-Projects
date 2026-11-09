# Journal des versions

Principales évolutions du rapport « Licences sportives en France ». Le détail des choix est dans [docs/01_Conception.md](docs/01_Conception.md).

## Novembre 2026 · millésime 2025

### Ajouté
- **Évolutions à champ constant**, selon la méthode de l'INJEP : seules les fédérations présentes chaque année de 2016 à 2025 (109) comptent dans les évolutions des regroupements, des territoires et du total. Résultats identiques au fichier de référence de l'INJEP ([data/reference/](data/reference/)).
- Part **hors champ constant** affichée partout : en orange dans le graphique Évolution, en infobulle (total, champ constant, hors champ), dans les chiffres clés et dans l'assistant.
- **Assistant intégré, version 4** : accueil qui suit la sélection du rapport, « Le saviez-vous ? », « Comment c'est calculé ? », fiches complètes, rebond systématique entre pourcentage et nombre de licences.
- Carte : évolution non calculée sous 20 licences l'année de départ, échelle de couleurs bornée au 90e centile (légende « ≤ / ≥ »).

### Modifié
- Indicateur de densité exprimé **pour 1 000 habitants** (au lieu de 100) dans tout le rapport.
- Libellé du segment Territoire : « Total » (les licences comprennent Monaco, l'étranger et les non-répartis).
- Évolution stable affichée « – +0,4 % » dans les tableaux de comparaison.
- Infobulles harmonisées sur tous les visuels HTML ; noms longs abrégés par « … » dans les légendes.
- Carte Azure Maps : requête DAX allégée pour un chargement plus rapide en publication web.

## Octobre 2026
- Refonte complète : format PBIP / TMDL, segments en cascade par paramètres de champ, tableaux de comparaison HTML/JS, documentation générée depuis le modèle.
