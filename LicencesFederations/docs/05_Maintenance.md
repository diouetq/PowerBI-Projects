# 05 · Maintenance

Procédures courantes, pas à pas.

> Règle générale : Power BI Desktop enregistre le projet au format PBIP (fichiers texte TMDL et JSON). Après toute modification, faites **Ctrl+S**, sinon les changements faits dans Desktop ou par un outil externe (MCP) sont perdus à la fermeture.

---

## 1. Intégrer un nouveau millésime INJEP (ex. 2026)

1. Télécharger l'archive INJEP (*Licences annuelles par millésime*), l'extraire dans `data/2026/`, et lire le `ReadMe` (nouvelles mises en garde, nouvelles colonnes).
2. **Vérifier l'en-tête** de chaque CSV : ordre des colonnes `Code <millésime>` et `Code année N`. Adapter la règle `@CodeNEnPremier` de `dbo.usp_Charger_Fichier_Licences` si l'ordre a changé.
3. Mettre à jour la liste des fichiers dans `dbo.usp_Charger_Millesime_Licences`, puis lancer :
   ```sql
   TRUNCATE TABLE dbo.Licences_Federation;          -- les codes de référence changent avec le millésime
   EXEC dbo.usp_Charger_Millesime_Licences @Dossier = N'C:\...\data\2026\', @Millesime = 2026;
   ```
4. Exécuter `sql/04_controles_qualite.sql` : volumes, codes, unicité, non-répartis.
5. Ouvrir `data/Referentiel_Excel.xlsx`, faire **Données → Actualiser tout**, puis filtrer `EnBase` :
   - `Oui` en fin de tableau = **nouvelles** fédérations ou territoires : compléter famille, sous-famille, groupe et logo ;
   - `Non` = valeurs disparues : les garder (historique) ou les supprimer.
6. Insee : remplacer `data/estim-pop-dep-sexe-aq-*.xlsx` par la nouvelle édition et adapter `Annees = {2016..2026}` dans `F_Population`.
7. Power BI : **Actualiser**. Si les regroupements ont changé, copier le résultat de la requête `Code_Param_Federation` dans l'expression de la table calculée `Param_Federation`.
8. Vérifier les mesures qui figent une année : `_AnRef = 2019` (année de comparaison avant Covid) et le libellé des sources.
9. Enregistrer (Ctrl+S), régénérer la documentation, puis commit.

## 2. Ajouter ou reclasser une fédération

- Modifier les colonnes Famille, Sous-famille, Groupe ou Logo dans l'onglet `T_Federation` du référentiel.
- Logo : déposer le PNG dans `assets/logos/` (nom en minuscules, sans accents), pousser sur GitHub. Il est servi par jsDelivr à l'adresse `[Logo URL base] & Fichier logo`.
- Nouveau regroupement : actualiser, puis régénérer `Param_Federation` (étape 7 ci-dessus).

## 3. Modifier la charte graphique

Tout est dans le dossier de mesures `00. Charte graphique` :

| Pour changer… | Mesure |
|---|---|
| Couleur de la sélection | `Style Couleur sélection` |
| Couleurs hausse / baisse | `Style Couleur hausse`, `Style Couleur baisse` (+ `… fond`) |
| Police | `Style Police` |
| Tailles de texte | `Style Taille titre`, `texte`, `petit`, `chiffre`, `valeur` |
| Cadre des blocs | `Style CSS cadre` |
| Palette de la carte | `Carte Palette` |
| Hébergement des logos | `Logo URL base` |

Pour les tableaux de comparaison : modifier `src/html/tableau.css` ou `src/html/moteur_tableau.js`, minifier (`npx clean-css-cli`, `npx terser -c -m`), puis coller le résultat dans `HTML Comparaison CSS` ou `HTML Tableau JS`. La modification s'applique aux deux pages. Contrôler ensuite que la mesure renvoie moins de 31 000 caractères :

```dax
EVALUATE ROW("taille", LEN([HTML Comparaison Federations]), "taille T", LEN([HTML Comparaison Territoires]))
```

## 4. Régénérer la documentation

```bash
python tools/generer_documentation.py
```

Met à jour `docs/02_Dictionnaire_donnees.md`, `docs/03_Catalogue_mesures.md` et `powerquery/*.pq` depuis le TMDL enregistré. Les descriptions viennent des propriétés **Description** des objets dans Power BI (lignes `///` du TMDL) : documenter un objet dans Desktop suffit.

## 5. Nettoyer le modèle

Avant de supprimer un objet, vérifier qu'il n'est utilisé :

- ni par un visuel, un filtre ou un signet du rapport (`*.Report/definition/**/*.json`) ;
- ni par une autre mesure, une colonne ou une table calculée ;
- ni par une relation, un tri (`sortByColumn`) ou une requête Power Query.

Ce contrôle a été automatisé lors du nettoyage du 06/11/2026 : fermeture des dépendances à partir des références du rapport.

## 6. Points de vigilance

- Visuel **HTML Content** : édition standard (scripts), *Autoriser l'ouverture des URL*, *Autoriser la sélection de texte*.
- Paramètre `Dossier` et nom du serveur SQL (`diouet`) à adapter sur un autre poste.
- Fichiers non versionnés (`.gitignore`) : CSV INJEP, archive `.7z`, sauvegardes `_sauvegarde_avant_refonte_*`, cache `.pbi/cache.abf`.
