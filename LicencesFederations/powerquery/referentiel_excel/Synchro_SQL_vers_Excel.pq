// =====================================================================
// Requêtes Power Query du classeur data/Referentiel_Excel.xlsx (extraites du classeur, non modifié).
// Rôle : synchroniser les onglets du référentiel avec les vues SQL (vw_Dim_*) SANS écraser
// les colonnes saisies à la main (familles, sous-familles, groupes, logos, zones).
//   - lignes connues     : colonnes SQL mises à jour, EnBase = "Oui"
//   - lignes disparues   : conservées, EnBase = "Non"
//   - nouvelles lignes   : ajoutées en fin de tableau, EnBase = "Oui" (colonnes manuelles à compléter)
//   - ordre des lignes conservé (index _pos) pour ne pas décaler les formules Excel
// =====================================================================
section Section1;

shared Serveur = "diouet" meta [IsParameterQuery=true, Type="Text", IsParameterQueryRequired=true];

shared Base = "BDD" meta [IsParameterQuery=true, Type="Text", IsParameterQueryRequired=true];

shared fnSynchro = (vueSql as text, nomTable as text, cle as text) as table =>
let
    Vue     = Table.Buffer(Sql.Database(Serveur, Base){[Schema = "dbo", Item = vueSql]}[Data]),
    ColsSql = Table.ColumnNames(Vue),
    VueK    = Table.AddColumn(Vue, "_k", each Text.From(Record.Field(_, cle)), type text),

    Actuel0 = Table.Buffer(try Excel.CurrentWorkbook(){[Name = nomTable]}[Content] otherwise #table(ColsSql, {})),
    ColsAct = List.Intersect({ColsSql, Table.ColumnNames(Actuel0)}),
    Actuel  = Table.AddIndexColumn(
                  Table.AddColumn(Table.SelectColumns(Actuel0, ColsAct), "_k",
                      each let v = Record.FieldOrDefault(_, cle, null) in if v = null then null else Text.From(v), type text),
                  "_pos", 0, 1),

    Fusion     = Table.NestedJoin(Table.SelectColumns(Actuel, {"_k", "_pos"}), {"_k"}, VueK, {"_k"}, "_sql", JoinKind.LeftOuter),
    AvecSql    = Table.Buffer(Table.AddColumn(Fusion, "_ok", each not Table.IsEmpty([_sql]), type logical)),
    Presentes  = Table.AddColumn(
                     Table.ExpandTableColumn(Table.SelectRows(AvecSql, each [_ok]), "_sql", ColsSql),
                     "EnBase", each "Oui", type text),

    PosAbsentes = List.Buffer(Table.SelectRows(AvecSql, each not [_ok])[_pos]),
    Absentes    = Table.AddColumn(Table.SelectRows(Actuel, each List.Contains(PosAbsentes, [_pos])),
                      "EnBase", each "Non", type text),

    ClesConnues = List.Buffer(List.RemoveNulls(Actuel[_k])),
    Nouvelles   = Table.AddIndexColumn(
                      Table.AddColumn(
                          Table.Sort(Table.SelectRows(VueK, each not List.Contains(ClesConnues, [_k])), {{cle, Order.Ascending}}),
                          "EnBase", each "Oui", type text),
                      "_pos", 1000000, 1),

    Tout     = Table.Sort(Table.Combine({Presentes, Absentes, Nouvelles}), {{"_pos", Order.Ascending}}),
    Resultat = Table.SelectColumns(Tout, ColsSql & {"EnBase"}, MissingField.UseNull)
in
    Resultat;

shared T_Federation = fnSynchro("vw_Dim_Federation", "T_Federation", "CodeReference");

shared T_Territoire = fnSynchro("vw_Dim_Territoire", "T_Territoire", "Departement");

shared T_TrancheAge = fnSynchro("vw_Dim_TrancheAge", "T_TrancheAge", "TrancheAge");

shared T_Sexe = fnSynchro("vw_Dim_Sexe", "T_Sexe", "Sexe");

shared T_Annee = fnSynchro("vw_Dim_Annee", "T_Annee", "Annee");