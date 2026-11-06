# Licences sportives en France

Rapport Power BI sur les licences et affiliations des fédérations sportives agréées (données INJEP).

## Organisation du dossier

| Dossier | Contenu |
|---|---|
| `reports/` | Projet Power BI : `Licences_Federations.pbip`, `.Report` (pages et visuels) et `.SemanticModel` (modèle, mesures DAX) |
| `assets/logos/` | Un logo par fédération, nommé en minuscules sans accents. Chargé par le rapport via une adresse en ligne. |
| `assets/icones/` | Icônes de l'interface du rapport |
| `assets/cartes/` | Fonds de carte (régions et départements, GeoJSON) |
| `assets/theme/` | Thème Power BI |
| `docs/` | Captures et documentation |
| `data/` | Données sources et référentiel (`Referentiel_Excel.xlsx`) |

## Ouvrir le projet

1. Ouvrir `reports/Licences_Federations.pbip` dans Power BI Desktop.
2. Dans les paramètres du modèle, vérifier que `Dossier` pointe vers le dossier `data/` de ce projet.

## Logos

La feuille `T_Federation` du référentiel contient la colonne `Fichier logo`.
Le modèle construit l'adresse du logo en ajoutant ce nom de fichier à une adresse de base unique.
Pour changer d'hébergement, il suffit de modifier cette adresse de base.
