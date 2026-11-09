const { chromium } = require('playwright'); const fs = require('fs');
const base = fs.readFileSync(__dirname + '/../dist/test.html', 'utf8');
(async () => {
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1000, height: 2600 }, deviceScaleFactor: 1 });
  const errs = []; p.on('pageerror', e => errs.push(String(e)));
  await p.goto('file://' + __dirname + '/../dist/test.html'); await p.waitForTimeout(1500);
  await p.screenshot({ path: __dirname + '/../dist/v4_accueil.png', clip: { x: 0, y: 0, width: 1000, height: 1100 } });
  const info = await p.evaluate(() => { const M = document.__as.M; const j = M.Sl.find(s => s.type === 'fed' && /judo/i.test(s.nom)); const br = M.Ll.find(l => l.nom === 'Bretagne'); return { fed: j.f.code, ter: br.deps.join(',') }; });
  fs.writeFileSync(__dirname + '/../dist/test_ctx.html', base.replace(/(<div[^>]*id=["']?as["']?)/, `$1 data-mode="Fédération" data-fed="${info.fed}" data-ter="${info.ter}" data-ternom="Bretagne"`));
  await p.goto('file://' + __dirname + '/../dist/test_ctx.html'); await p.waitForTimeout(1500);
  await p.screenshot({ path: __dirname + '/../dist/v4_accueil_ctx.png', clip: { x: 0, y: 0, width: 1000, height: 1300 } });
  const Q = ['Raconte-moi', 'Raconte-moi le judo', 'Raconte-moi la Bretagne', 'Raconte-moi le judo en Bretagne', 'Part de femmes au rugby'];
  for (let i = 0; i < Q.length; i++) {
    await p.click('.as-nouv'); await p.fill('#as textarea', Q[i]); await p.keyboard.press('Enter'); await p.waitForTimeout(2200);
    if (i === 4) await p.click('.as-calc summary');
    const el = await p.$$('.as-ligne'); await el[el.length - 1].screenshot({ path: __dirname + '/../dist/v4_f' + i + '.png' });
  }
  console.log(info, 'erreurs JS :', errs.length ? errs : 'aucune'); await b.close();
})();
