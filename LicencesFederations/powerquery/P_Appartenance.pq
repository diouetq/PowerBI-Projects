let
    Source   = T_Federation,
    Colonnes = Table.SelectColumns(Source, {"CodeReference", "Famille de fédérations", "Sous-famille de fédérations", "Groupe de fédérations"}),
    Deplie   = Table.UnpivotOtherColumns(Colonnes, {"CodeReference"}, "Niveau", "Valeur"),
    SansVide = Table.SelectRows(Deplie, each [Valeur] <> null and [Valeur] <> ""),
    Cle      = Table.AddColumn(SansVide, "Cle", each
                   (if [Niveau] = "Famille de fédérations" then "F · "
                    else if [Niveau] = "Sous-famille de fédérations" then "SF · " else "G · ") & [Valeur], type text),
    Liens    = Table.SelectColumns(Cle, {"Cle", "CodeReference"}),
    // "Ensemble" = toutes les fédérations
    Ensemble = Table.AddColumn(Table.SelectColumns(Source, {"CodeReference"}), "Cle", each "Ensemble", type text),
    Resultat = Table.Combine({Liens, Table.SelectColumns(Ensemble, {"Cle", "CodeReference"})})
in
    Resultat
