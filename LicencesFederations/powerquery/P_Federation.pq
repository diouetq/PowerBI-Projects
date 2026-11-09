let
    Source   = T_Federation,
    // Le segment Fédération affiche le nom court (sans « Fédération Française de … »)
    Colonnes = Table.SelectColumns(Source, {"CodeReference", "Nom court", "Famille de fédérations", "Sous-famille de fédérations", "Groupe de fédérations"}),
    Deplie   = Table.UnpivotOtherColumns(Colonnes, {"CodeReference", "Nom court"}, "Niveau", "Valeur"),
    SansVide = Table.SelectRows(Deplie, each [Valeur] <> null and [Valeur] <> ""),
    NomCol   = Table.AddColumn(SansVide, "Col", each
                   (if [Niveau] = "Famille de fédérations" then "F · "
                    else if [Niveau] = "Sous-famille de fédérations" then "SF · " else "G · ") & [Valeur], type text),
    // Copie du nom AVANT le pivot (le pivot consomme la colonne Nom court)
    Copie    = Table.AddColumn(NomCol, "Ensemble", each [Nom court], type text),
    Pivot    = Table.Pivot(Table.SelectColumns(Copie, {"CodeReference", "Ensemble", "Nom court", "Col"}),
                   List.Sort(List.Distinct(Copie[Col])), "Col", "Nom court", List.First)
in
    Pivot
