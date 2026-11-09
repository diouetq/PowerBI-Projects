// Construit les blocs de l'assistant : minifie, vérifie (taille < 30 000, aucun guillemet double), écrit dist/ et la page de test.
const fs = require('fs'), { minify } = require('terser');
const MAX = 30000, src = f => fs.readFileSync(__dirname + '/src/' + f, 'utf8');
(async () => {
  fs.mkdirSync(__dirname + '/dist', { recursive: true });
  const out = {};
  for (const [k, f] of [['js1', 'assistant-1-moteur.js'], ['js2', 'assistant-2-reponses.js'], ['js3', 'assistant-3-graphiques.js'], ['js4', 'assistant-4-questions.js']]) {
    const r = await minify(src(f), { compress: { passes: 2 }, mangle: true, format: { quote_style: 1, comments: false, ascii_only: false } });
    out[k] = '<script>' + r.code + '</script>';
  }
  out.css = src('assistant.css').replace(/\/\*[\s\S]*?\*\//g, '').replace(/\s*\n\s*/g, '').replace(/\s*([{};:,>])\s*/g, '$1').replace(/;}/g, '}');
  const txt = src('assistant-textes.txt').replace(/\r?\n/g, '');
  // les textes en 1 ou 2 blocs, coupés entre deux enregistrements
  const recs = txt.split('~'), blocs = [[]];
  recs.forEach(r => { const cur = blocs[blocs.length - 1]; if ((cur.join('~') + '~' + r).length > MAX - 200) blocs.push([r]); else cur.push(r); });
  blocs.forEach((b, i) => { out['txt' + (i + 1)] = "<script type='text/plain' class='as-d' data-t='txt'>" + b.join('~') + '</script>'; });
  let ok = true;
  for (const [k, v] of Object.entries(out)) {
    const pb = [];
    if (v.length > MAX) pb.push('trop long');
    if (v.includes('"')) pb.push('guillemet double');
    if (k !== 'css' && /<\/script/i.test(v.slice(8, -9))) pb.push('</script> interne');
    console.log(k.padEnd(5), String(v.length).padStart(6), 'car.', pb.length ? '!! ' + pb.join(', ') : 'ok');
    if (pb.length) ok = false;
    fs.writeFileSync(__dirname + '/dist/' + k + '.txt', v);
  }
  // page de test : mêmes blocs, données du banc de test, ordre des blocs mélangé comme dans HTML Content
  const B = fs.existsSync(__dirname + '/test/blocs_reels.json') ? require('./test/blocs_reels.json') : require('./test/fixtures').blocs();
  const data = [];
  Object.entries(B).forEach(([t, arr]) => { if (t !== 'txt') arr.forEach(x => data.push("<script type='text/plain' class='as-d' data-t='" + t + "'>" + x + '</script>')); });
  const vars = '--as-police:Segoe UI, sans-serif;--as-texte:#101828;--as-texte2:#475467;--as-discret:#8A94A6;--as-accent:#4361EE;--as-accent-fond:#EEF1FE;--as-fond:#FFFFFF;--as-bordure:#E4E7EC;--as-marine:#0B1C4F;--as-sel:#4361EE;--as-hausse:#067647;--as-baisse:#B42318;--as-neutre-fond:#F2F4F7;--as-neutre:#98A2B3;--as-grille:#EAECF0;--as-t:15px;--as-p:14px';
  const ui = '<style>#as{' + vars + '}' + out.css + "</style><div id='as' data-nb='" + (data.length + Object.keys(out).filter(k => k.startsWith('txt')).length) + "' data-titre='Assistant IA' data-mode='Ensemble' data-fed='' data-nom='Ensemble des fédérations' data-ter='' data-ternom='Tous territoires'></div>";
  const rows = [out.js2, out.js3, out.js4, ...data.slice(0, 4), ui, ...data.slice(4), out.txt1, out.txt2 || '', out.js1];
  fs.writeFileSync(__dirname + '/dist/test.html', '<!doctype html><html><head><meta charset=utf-8><meta name=viewport content=width=device-width></head><body>' + rows.map(r => '<div>' + r + '</div>').join('') + '</body></html>');
  console.log(ok ? 'BLOCS OK' : 'BLOCS A CORRIGER');
})();
