let
    Source   = T_Federation,
    Deplie   = Table.UnpivotOtherColumns(
                   Table.SelectColumns(Source, {"Famille de fédérations", "Sous-famille de fédérations", "Groupe de fédérations"}),
                   {}, "Niveau", "Valeur"),
    Uniques  = Table.Distinct(Table.SelectRows(Deplie, each [Valeur] <> null and [Valeur] <> "")),
    Cle      = Table.AddColumn(Uniques, "Cle", each
                   (if [Niveau] = "Famille de fédérations" then "F · "
                    else if [Niveau] = "Sous-famille de fédérations" then "SF · " else "G · ") & [Valeur], type text),
    Famille  = Table.AddColumn(Cle, "Famille",      each if [Niveau] = "Famille de fédérations"      then [Valeur] else null, type text),
    SousFam  = Table.AddColumn(Famille, "Sous-famille", each if [Niveau] = "Sous-famille de fédérations" then [Valeur] else null, type text),
    Groupe   = Table.AddColumn(SousFam, "Groupe",   each if [Niveau] = "Groupe de fédérations"       then [Valeur] else null, type text),
    Colonnes = Table.SelectColumns(Groupe, {"Cle", "Famille", "Sous-famille", "Groupe"}),
    // Une seule ligne "Ensemble", visible dans les 3 niveaux (toutes les fédérations)
    LigneEns = #table(type table [Cle = text, Famille = text, #"Sous-famille" = text, Groupe = text],
                   {{"Ensemble", "Ensemble", "Ensemble", "Ensemble"}}),
    Tout     = Table.Combine({LigneEns, Colonnes}),
    // Ordres de tri : Ensemble en premier, puis ordre alphabétique
    Rang     = (col as text) =>
                   let vals = List.Sort(List.RemoveItems(List.Distinct(List.RemoveNulls(Table.Column(Tout, col))), {"Ensemble"}), Comparer.FromCulture("fr-FR", true))
                   in (v) => if v = null then 9999 else if v = "Ensemble" then 0 else List.PositionOf(vals, v) + 1,
    RF = Rang("Famille"),
    RSF = Rang("Sous-famille"),
    RG = Rang("Groupe"),
    O1 = Table.AddColumn(Tout, "OrdreFamille", each RF([Famille]), Int64.Type),
    O2 = Table.AddColumn(O1, "OrdreSousFamille", each RSF([#"Sous-famille"]), Int64.Type),
    O3 = Table.AddColumn(O2, "OrdreGroupe", each RG([Groupe]), Int64.Type)
in
    O3
