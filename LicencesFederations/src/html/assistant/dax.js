// Génère le DAX des mesures littérales (morceaux de 6 000 caractères) et leurs empreintes de contrôle.
const fs = require('fs');
const chk = s => { let c = 0; for (let i = 0; i < s.length; i++) c += s.charCodeAt(i) * ((i % 97) + 1); return c; };
const lit = s => { const p = []; for (let i = 0; i < s.length; i += 6000) p.push('"' + s.slice(i, i + 6000) + '"'); return p.join('\n& '); };
const res = {};
for (const k of ['js1', 'js2', 'js3', 'js4', 'css', 'txt1']) {
  const s = fs.readFileSync('dist/' + k + '.txt', 'utf8');
  fs.writeFileSync('dist/dax_' + k + '.txt', lit(s));
  res[k] = { len: s.length, chk: chk(s), morceaux: Math.ceil(s.length / 6000) };
}
console.log(JSON.stringify(res, null, 1));
