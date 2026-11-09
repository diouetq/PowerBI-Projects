// =====================================================================
// fnLireReferentiel : lit un onglet du référentiel Excel et le nettoie.
//   Feuille          : nom de l'onglet (T_Federation, T_Territoire, T_Sexe, T_TrancheAge, T_Annee)
//   ColonnesInutiles : colonnes à retirer (ex. EnBase, posée par la synchronisation SQL du classeur)
// Les 5 tables de dimension appellent cette fonction : une seule logique de lecture à maintenir.
// =====================================================================
(Feuille as text, optional ColonnesInutiles as nullable list) as table =>
let
    // 1. Classeur (chemin = paramètre Dossier)
    Source     = Excel.Workbook(File.Contents(Dossier & "Referentiel_Excel.xlsx"), null, true),
    // 2. Onglet demandé (feuille de calcul, pas tableau nommé)
    Onglet     = Source{[Item = Feuille, Kind = "Sheet"]}[Data],
    // 3. Première ligne = en-têtes
    Entetes    = Table.PromoteHeaders(Onglet, [PromoteAllScalars = true]),
    Colonnes   = Table.ColumnNames(Entetes),
    // 4. Erreurs Excel (#N/A, #REF!...) remplacées par null
    SansErreur = Table.ReplaceErrorValues(Entetes, List.Transform(Colonnes, each {_, null})),
    // 5. Valeurs « manquantes » saisies à la main remplacées par null
    SansNA     = Table.ReplaceValue(SansErreur, each _, each _,
                     (v, a, b) => if List.Contains({"NA", "N/A", "#N/A", "n.d", ""}, v) then null else v, Colonnes),
    // 6. Retrait des colonnes techniques (sans erreur si elles n'existent pas)
    Resultat   = Table.RemoveColumns(SansNA, if ColonnesInutiles = null then {} else ColonnesInutiles, MissingField.Ignore)
in
    Resultat
