// Contrôle des chiffres : compare les valeurs calculées par l’assistant (sur les vrais blocs de T_Assistant_Bloc)
// à celles des mesures DAX du rapport.
//   node test/controle_dax.js requete   -> écrit test/controle.dax (requête à exécuter dans Power BI / DAX Studio)
//   node test/controle_dax.js comparer resultat.json  -> compare (résultat de la requête : lignes {id, v})
const fs = require('fs'), vm = require('vm');
const doc = { querySelectorAll: () => [], getElementById: () => null, createElement: () => ({}) };
const ctx = vm.createContext({ document: doc, console, setTimeout: () => 0 });
['assistant-1-moteur.js', 'assistant-2-reponses.js', 'assistant-3-graphiques.js', 'assistant-4-questions.js'].forEach(f => vm.runInContext(fs.readFileSync(__dirname + '/../src/' + f, 'utf8'), ctx));
const AS = doc.__as; AS.construire(require('./blocs_reels.json')); const M = AS.M;
// cas : [sujet, lieu, indicateur, année]  sujet = F<code> | G<regroupement> | ALL ; lieu = TOT | R<reg> | D<dep>
const CAS = [
  ['ALL', 'TOT', 'lic'], ['ALL', 'TOT', 'evo1'], ['ALL', 'TOT', 'evoR'], ['ALL', 'TOT', 'fem'], ['ALL', 'TOT', 'p100'],
  ['F111', 'TOT', 'lic'], ['F111', 'TOT', 'evoR'], ['F111', 'TOT', 'fem'], ['F111', 'TOT', 'age'], ['F123', 'TOT', 'evo1'],
  ['F133', 'R76', 'lic'], ['F133', 'R76', 'ind'], ['F133', 'R76', 'p100'], ['F133', 'R76', 'part'], ['F117', 'R53', 'evoR'],
  ['F111', 'D31', 'lic'], ['F111', 'D31', 'fem'], ['F137', 'D40', 'ind'], ['ALL', 'R53', 'p100'], ['ALL', 'R53', 'age'],
  ['ALL', 'D971', 'lic'], ['ALL', 'D2A', 'evoR'], ['GOlympique', 'TOT', 'lic'], ['GOlympique', 'R11', 'evoR'], ['GSports collectifs', 'R94', 'lic'],
  // séries fédération x région (v2) et années quelconques
  ['F117', 'R53', 'lic', 2016], ['F117', 'R53', 'lic', 2021], ['F111', 'R76', 'lic', 2017], ['F123', 'R11', 'lic', 2020], ['F133', 'R75', 'lic', 2018],
  ['F109', 'R04', 'lic', 2022], ['F111', 'MET', 'lic', 2016], ['ALL', 'R84', 'lic', 2018], ['F123', 'TOT', 'lic', 2021],
  // licences féminines (v2)
  ['F111', 'TOT', 'femR'], ['F133', 'TOT', 'femR'], ['ALL', 'R53', 'femR'], ['F111', 'TOT', 'femn'], ['ALL', 'D31', 'femn']
];
const MES = { lic: '[NB Licences]', evo1: '[Évol 1 an]', evoR: '[Évol depuis 2019]', fem: '[Part femmes]', p100: '[Licences pour 100 hab]', ind: '[Indice de spécificité]', part: "[Part dans l'ensemble]", age: '[Âge moyen]', femn: '[Licences femmes]', femR: '[Licences femmes]' };
function moteur(c) {
  const S = M.S[c[0]], L = M.L[c[1]];
  if (c[3]) return AS.licAn(S, L, c[3]);
  if (c[2] === 'femR') { const s = AS.serie(S, L, 'F'); return s ? s[M.R - M.A0] : null; }
  if (c[2] === 'age') { const p = AS.profil(S, L); return p ? p.age : null; }
  return AS.val(S, L, c[2]);
}
function filtres(c) {
  const f = [], an = c[3] || (c[2] === 'femR' ? M.R : M.N);
  f.push('TREATAS ( { ' + an + ' }, T_Annee[Annee] )');
  if (c[0].startsWith('F')) f.push('T_Federation[CodeReference] = "' + c[0].slice(1) + '"');
  if (c[0].startsWith('G')) { const S = M.S[c[0]], col = { famille: 'Famille de fédérations', 'sous-famille': 'Sous-famille de fédérations', groupe: 'Groupe de fédérations' }[S.niv]; f.push('T_Federation[' + col + '] = "' + S.nom + '"'); }
  const L = M.L[c[1]];
  if (L.type === 'region') f.push('T_Territoire[Code_GDEREG] = "' + L.reg + '"');
  else if (L.type === 'dep') f.push('T_Territoire[Code_DEP] = "' + L.deps[0] + '"');
  else if (c[1] === 'MET') f.push('T_Territoire[GD_Zone_Slicer] = "Métropole"');
  return f.join(', ');
}
const id = c => c.join(':');
if (process.argv[2] === 'requete') {
  const q = 'EVALUATE UNION (\n' + CAS.map(c => '  ROW ( "id", "' + id(c) + '", "v", CALCULATE ( ' + MES[c[2]] + ', ' + filtres(c) + ' ) + 0 )').join(',\n') + '\n)';
  fs.writeFileSync(__dirname + '/controle.dax', q); console.log(q.length + ' caractères -> test/controle.dax');
} else {
  const res = JSON.parse(fs.readFileSync(process.argv[3], 'utf8')); const ref = {}; res.forEach(r => { const v = Object.values(r); ref[v[0]] = v[1]; });
  let ok = 0, ko = 0;
  CAS.forEach(c => {
    const a = moteur(c), b = ref[id(c)], tol = Math.max(1e-6, Math.abs(b || 0) * 1e-6) + (c[2] === 'age' ? 0.051 : 0);
    const bon = (a == null && !b) || (a != null && b != null && Math.abs(a - b) <= tol);
    if (bon) ok++; else ko++;
    console.log((bon ? 'OK ' : 'KO ') + id(c).padEnd(34) + ' assistant=' + a + '  DAX=' + b);
  });
  console.log('==> ' + ok + ' identiques, ' + ko + ' écarts');
}
