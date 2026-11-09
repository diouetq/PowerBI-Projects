# Assistant « Licences sportives » – sources

Simulateur d'IA intégré au rapport : moteur JavaScript exécuté par le visuel HTML Content (édition standard),
données précalculées dans la table calculée `T_Assistant_Bloc`. Aucune IA externe, aucun appel réseau :
compatible avec la publication sur le web.

## Fichiers
- `src/assistant-1-moteur.js` : lecture des blocs, modèle, calculs (mêmes règles que les mesures), analyse de la question.
- `src/assistant-2-reponses.js` : aiguillage, réponses (valeurs, classements, comparaisons, séries, fiches).
- `src/assistant-3-graphiques.js` : mini-graphiques SVG (courbe, carte de France en tuiles, pyramide), phrases d’analyse, icônes, suggestions, écran d’accueil, panneau de discussion et démarrage.
- `src/assistant-4-questions.js` : questions avancées : listes (membres d’un regroupement, familles, départements), rangs, deux années au choix, seuils et comptages, critères combinés, tranches d’âge, homonymes, questions proches ; v4 : accueil selon la sélection (`Q.accueilCtx`), « Le saviez-vous ? » (`Q.saviez`), « Comment c’est calculé ? » (`Q.methode`), fiches complètes (`Q.fiche`, `Q.ficheLieu`, `Q.ficheCroise`).
- `src/assistant.css` : styles (couleurs et tailles = variables posées par la mesure HTML Assistant UI).
- `src/assistant-textes.txt` : définitions, méthode, usage du rapport, fiches (format `clé|question|mots-clés|réponse`, séparés par `~`).
- `build.js` : minifie, vérifie (< 30 000 caractères par bloc, aucun guillemet double), écrit `dist/` et une page de test.
- `dax.js` : produit le DAX des mesures littérales et leur empreinte de contrôle.
- `test/` : banc de test (`node test/run.js`, `Q=questions2.txt node test/run.js`) et rendu navigateur (`python3 test/ui.py`).

## Mesures (dossier 10. Assistant)
HTML Assistant (aiguillage) · HTML Assistant UI · HTML Assistant CSS · HTML Assistant Textes · HTML Assistant JS 1 · HTML Assistant JS 2 · HTML Assistant JS 3 · HTML Assistant JS 4

## Pièges
- Une valeur texte affichée dans un visuel est limitée à 32 767 caractères : d'où le découpage en blocs (une ligne par bloc).
- Les blocs communiquent par `document.__as` (les variables `window` ne passent pas d'une ligne à l'autre).
- L'ordre d'affichage des lignes n'est pas garanti : le moteur attend tous les blocs (`data-nb`).
- Ni guillemets doubles, ni caractères invisibles dans le JS minifié (accents combinants, espace insécable).
- Après modification : `node build.js && node dax.js`, recoller la mesure, comparer longueur et empreinte.

## Blocs de données (T_Assistant_Bloc)
| Type | Contenu |
|---|---|
| meta | année N, année de référence, première année, date de mise à jour |
| fed / ter | fédérations (regroupements, libellés) / territoires (région, zone, populations) |
| ser / sert | séries 2016-N : par fédération (France) / par territoire (toutes fédérations) |
| serr (v2) | séries 2016-N par fédération x région (`code|reg:v,v,…;reg:…`) |
| serf / sertf (v2) | séries 2016-N des licences féminines : par fédération / par territoire |
| pro / prot | âge moyen et grandes tranches (année N) |
| pyr / pyrt (v2) | pyramides des âges N : 17 tranches de 5 ans, femmes puis hommes |
| sertr / serttr (v3) | séries 2016-N par grande tranche d’âge : `code|enfants;jeunes;adultes;seniors` (années séparées par des virgules) |
| serhc (v5) | licences des fédérations **hors champ constant** par département : `code|licences|femmes|t1;t2;t3;t4` ; retirées des séries des territoires pour les évolutions (méthode INJEP). La fédération est à champ constant si sa série France est non nulle chaque année (`f.cc`). |
| cube | fédération x département : licences N, N-1, 2019, femmes N |

## Indicateurs
lic, evo1, evoR (en %), dif1, difR (en nombre de licences), fem (part), femn (nombre de femmes),
fevoR / fdifR (évolution des licences féminines en % / en nombre), fptR (évolution de la part de femmes, en points),
p100, part, ind, age, pop,
tranches d’âge `t` + `n` (nombre), `p` (part), `e` (évolution en %), `d` (évolution en nombre) + numéro 1 à 4 (enfants, jeunes, adultes, seniors), par exemple `te2`.

## Contrôle des chiffres
`node test/controle_dax.js requete` écrit `test/controle.dax` (39 cas) ; exécuter la requête dans Power BI (DAX Studio ou MCP),
enregistrer le résultat en JSON puis `node test/controle_dax.js comparer resultat.json`.
Dernier contrôle (08/11/2026) : 39 valeurs identiques aux mesures du rapport (âge moyen par territoire : écart < 0,05 an, arrondi des âges départementaux).
`test/blocs_reels.json` : copie des vrais blocs, utilisée par le banc de test (`node test/run.js`, puis `Q=questions2.txt` à `Q=questions6.txt`) ; `node test/run_court.js` affiche une version courte des réponses.

## Ordre de chargement
Chaque partie s’enregistre dans `document.__as` et signale qu’elle est prête (`AS.pret.p1` à `p4`) ; `AS.demarrer` (partie 3) attend les 4 parties et tous les blocs de données (`data-nb`) avant de construire le modèle et l’interface.
