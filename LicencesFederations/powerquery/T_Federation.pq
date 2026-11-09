// Onglet T_Federation du référentiel : une fédération par ligne (clé CodeReference),
// avec ses regroupements (famille, sous-famille, groupe) et son logo saisis dans Excel.
// Colonnes retirées : CodesHistorique et « Champ constant » (non utilisés), EnBase (technique).
let
    Source     = fnLireReferentiel("T_Federation", {"CodesHistorique", "Champ constant ", "EnBase"}),
    // Nom court : nom sans le préfixe « Fédération Française de … » (segments, titres, légendes).
    // Les préfixes sont testés dans l'ordre : les plus longs d'abord.
    Prefixes   = {"Fédération Française de la ", "Fédération Française des ", "Fédération Française de ", "Fédération Française du ",
                  "Fédération Française d'", "Fédération Française d’", "Fédération Française Sportive de ", "Fédération Française ",
                  "Fédération Nationale des ", "Fédération Nationale du ", "Fédération des ", "Fédération de ", "Fédération "},
    NomCourt   = Table.AddColumn(Source, "Nom court", each
                     if [Federation] = null then null else
                     let
                         _Nom     = Text.From([Federation]),
                         _Prefixe = List.First(List.Select(Prefixes, (p) => Text.StartsWith(_Nom, p)), null),
                         _Court   = if _Prefixe = null then _Nom else Text.Middle(_Nom, Text.Length(_Prefixe))
                     in
                         Text.Upper(Text.Start(_Court, 1)) & Text.Middle(_Court, 1), type text)
in
    NomCourt
