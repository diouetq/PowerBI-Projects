let
    Source  = Excel.Workbook(File.Contents(Dossier & "estim-pop-dep-sexe-aq-1975-2026.xlsx"), null, true),
    Annees  = {2016..2025},
    Lire = (an as number) =>
        let
            Feuille = Source{[Item = Text.From(an), Kind = "Sheet"]}[Data],
            Lignes  = Table.SelectRows(Feuille, each [Column1] <> null and [Column2] <> null and [Column1] <> "Départements"),
            Gen     = List.Combine(List.Transform(Table.ToRows(Lignes), (r) =>
                        List.Combine({
                            List.Transform({0..19}, (i) => {an, Text.Trim(Text.From(r{0})), "H", i * 5, r{23 + i}}),
                            List.Transform({0..19}, (i) => {an, Text.Trim(Text.From(r{0})), "F", i * 5, r{44 + i}})
                        })))
        in
            Gen,
    Toutes  = List.Combine(List.Transform(Annees, Lire)),
    Table   = Table.FromRows(Toutes, type table [Annee = Int64.Type, Code_DEP = text, Sexe = text, AgeDebut = Int64.Type, Population = Int64.Type])
in
    Table
