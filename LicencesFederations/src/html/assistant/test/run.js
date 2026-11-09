// Banc de test : charge les deux parties du moteur dans un faux document et pose une série de questions.
const fs = require('fs'), vm = require('vm');
const doc = { querySelectorAll: () => [], getElementById: () => null, createElement: () => ({}) };
const ctx = vm.createContext({ document: doc, console, setTimeout: () => 0 });
['assistant-1-moteur.js', 'assistant-2-reponses.js', 'assistant-3-graphiques.js', 'assistant-4-questions.js'].forEach(f => vm.runInContext(fs.readFileSync(__dirname + '/../src/' + f, 'utf8'), ctx));
const AS = doc.__as;
const t0 = Date.now(); AS.construire(process.env.FIX ? require('./fixtures').blocs() : Object.assign(require('./blocs_reels.json'), { txt: [require('fs').readFileSync(__dirname + '/../src/assistant-textes.txt', 'utf8').replace(/\r?\n/g, '')] })); const tBuild = Date.now() - t0;
const texte = h => h.replace(/<tr>/g, '\n   ').replace(/<\/t[dh]>/g, ' | ').replace(/<p[^>]*>/g, '\n  ').replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').trim();
const questions = process.argv[2] ? [process.argv.slice(2).join(' ')] : fs.readFileSync(__dirname + '/'+(process.env.Q||'questions.txt'), 'utf8').split('\n').filter(l => l.trim() && !l.startsWith('#'));
let erreurs = 0;
questions.forEach(q => {
  if (q === '---') { AS.mem = {}; return; }
  let r; try { r = AS.repondre(q); } catch (e) { erreurs++; console.log('\n?? ' + q + '\n  ERREUR ' + e.stack.split('\n').slice(0, 3).join(' / ')); return; }
  console.log('\n?? ' + q + '\n  ' + texte(r.html).slice(0, 900) + (r.rel.length ? '\n  [relances] ' + r.rel.join(' / ') : ''));
});
console.log('\n==> ' + questions.length + ' questions, ' + erreurs + ' erreurs, modèle construit en ' + tBuild + ' ms');
