// Onglet T_Annee du référentiel : Annee (clé) et Statut (def / semidef).
// EnBase (marqueur de la synchronisation SQL du classeur) n'est pas utilisé par le rapport.
let
    Source = fnLireReferentiel("T_Annee", {"EnBase"})
in
    Source
