// Onglet T_Territoire du référentiel : un département par ligne (clé = libellé source « 01 - Ain »),
// avec ses codes (Code_DEP, Code_GDEREG) et ses zones de segment (calculés dans Excel).
let
    Source = fnLireReferentiel("T_Territoire", {"EnBase"})
in
    Source
