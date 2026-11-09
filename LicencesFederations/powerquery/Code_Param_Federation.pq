let
    Source  = T_Federation,
    Deplie  = Table.UnpivotOtherColumns(
                  Table.SelectColumns(Source, {"Famille de fédérations", "Sous-famille de fédérations", "Groupe de fédérations"}),
                  {}, "NiveauSrc", "Valeur"),
    Uniques = Table.Distinct(Table.SelectRows(Deplie, each [Valeur] <> null and [Valeur] <> "")),
    Infos   = Table.AddColumn(Uniques, "Info", each
                  if [NiveauSrc] = "Famille de fédérations" then [p = "F · ", n = "Famille", o = 1]
                  else if [NiveauSrc] = "Sous-famille de fédérations" then [p = "SF · ", n = "Sous-famille", o = 2]
                  else [p = "G · ", n = "Groupe", o = 3]),
    Tri     = Table.Sort(Infos, {{each [Info][o], Order.Ascending}, {"Valeur", Order.Ascending}}),
    Index   = Table.AddIndexColumn(Tri, "i", 1, 1),
    Q       = (t as text) => """" & Text.Replace(t, """", """""") & """",
    Lignes  = Table.AddColumn(Index, "Ligne", each
                  "    (" & Q([Valeur]) &
                  ", NAMEOF('P_Federation'[" & Text.Replace([Info][p] & [Valeur], "]", "]]") & "]), " &
                  Text.From([i]) & ", " & Q([Info][n]) & ", " & Q([Info][p] & [Valeur]) & ")"),
    Code    = "Param_Federation = {#(lf)" &
              "    (""Ensemble"", NAMEOF('P_Federation'[Ensemble]), 0, ""Ensemble"", ""Ensemble""),#(lf)" &
              Text.Combine(Lignes[Ligne], ",#(lf)") & "#(lf)}"
in
    Code
