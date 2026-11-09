// Table de faits : licences annuelles INJEP 2016-2025.
// Source : SQL Server « diouet », base « BDD », table dbo.Licences_Federation,
// alimentée depuis les CSV INJEP par les scripts du dossier sql/ (procédure dbo.usp_Charger_Millesime_Licences).
let
    Source      = Sql.Database("diouet", "BDD"),
    Licences    = Source{[Schema = "dbo", Item = "Licences_Federation"]}[Data],
    // Colonnes utiles au modèle uniquement (repli de requête : le SELECT est limité côté SQL)
    Colonnes    = Table.SelectColumns(Licences, {"Annee", "Statut", "MillesimeReference", "CodeReference", "Sexe", "Age",
                      "GrandeTrancheAge", "Departement", "NbLicences", "Fichier"}),
    // Clé territoire stable : code département (« 31 », « 2A », « 971 », « NR »), indépendante du libellé
    CodeDep     = Table.AddColumn(Colonnes, "Code_DEP", each Text.Trim(Text.BeforeDelimiter(Text.From([Departement]), " - ")), type text),
    // Le libellé n'est plus utile : les noms de territoires viennent de T_Territoire
    SansLibelle = Table.RemoveColumns(CodeDep, {"Departement"})
in
    SansLibelle
