const fs = require('fs'), vm = require('vm');
const doc = { querySelectorAll: () => [], getElementById: () => null, createElement: () => ({}) };
const ctx = vm.createContext({ document: doc, console, setTimeout: () => 0 });
['assistant-1-moteur.js', 'assistant-2-reponses.js', 'assistant-3-graphiques.js', 'assistant-4-questions.js'].forEach(f => vm.runInContext(fs.readFileSync(__dirname + '/../src/' + f, 'utf8'), ctx));
const AS = doc.__as;
AS.construire(Object.assign(require('./blocs_reels.json'), { txt: [fs.readFileSync(__dirname + '/../src/assistant-textes.txt', 'utf8').replace(/\r?\n/g, '')] }));
const texte = h => h.replace(/<svg[\s\S]*?<\/svg>/g,'').replace(/<tr>/g, '\n   ').replace(/<\/t[dh]>/g, ' | ').replace(/<p[^>]*>/g, '\n  ').replace(/<[^>]+>/g, '').trim();
const qs = fs.readFileSync(__dirname + '/' + (process.env.Q || 'questions.txt'), 'utf8').split('\n').filter(l => l.trim() && !l.startsWith('#'));
qs.forEach(q => { if (q === '---') { AS.mem = {}; return; } let r; try { r = AS.repondre(q); } catch (e) { console.log('?? ' + q + ' ERREUR ' + e.message); return; } console.log('?? ' + q + '\n  ' + texte(r.html).slice(0,700)); });
