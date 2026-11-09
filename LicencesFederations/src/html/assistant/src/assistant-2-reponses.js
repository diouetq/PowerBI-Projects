/* Assistant « Licences sportives » : partie 2, les réponses et l’interface.
   Utilise le moteur de la partie 1 (document.__as). Aucun guillemet double. */
(function () {
  'use strict';
  var D = document;
  var AS = D.__as = D.__as || {};
  var a = function (q, m) { return AS.a(q, m); };

  /* mise en forme : fonctions de la partie 1 (liées au premier appel) */
  var n0, dec, pct, fm, fmc, LIB, SIGNE, cls, b, evoTxt, tableau, note, titre, G, I;
  function ref() { return AS.M.R; }
  function lieuTxt(L) { return L.prep; }
  function sujetTxt(S) { return S.all ? 'Toutes fédérations confondues' : S.nom; }
  function quiOu(S, L) { return S.all && L.id === 'TOT' ? 'Ensemble des licences (toutes fédérations, tous territoires)' : sujetTxt(S) + ', ' + lieuTxt(L); }
  function lier() { var F = AS.F; G = AS.G; I = AS.I; n0 = F.n0; dec = F.dec; pct = F.pct; fm = F.fm; fmc = F.fmc; SIGNE = F.SIGNE; LIB = F.LIB; cls = F.cls; b = F.b; evoTxt = F.evoTxt; tableau = F.tableau; note = F.note; titre = F.titre; }
  /* ===================== Contexte ===================== */
  function ctxSujet() {
    var c = AS.ctx || {}, M = AS.M;
    if (!c.fed || !c.fed.length) return null;
    if (c.fed.length === 1 && M.S['F' + c.fed[0]]) return M.S['F' + c.fed[0]];
    if (c.mode === 'Regroupement' && M.S['G' + c.nom]) return M.S['G' + c.nom];
    return { id: 'SEL', type: 'multi', nom: c.nom || 'Votre sélection', codes: c.fed.filter(function (x) { return M.F[x]; }) };
  }
  function ctxLieu() {
    var c = AS.ctx || {}, M = AS.M;
    if (!c.ter || !c.ter.length) return null;
    var cand = M.Ll.filter(function (l) { return l.deps.length === c.ter.length && c.ter.every(function (d) { return l.set[d]; }); });
    if (cand.length) return cand[0];
    var set = {}; c.ter.forEach(function (d) { set[d] = 1; });
    return { id: 'SELT', type: 'zone', nom: c.ternom || 'votre sélection', deps: c.ter, set: set, prep: 'sur ' + (c.ternom || 'votre sélection') };
  }

  /* ===================== Textes (définitions, usage, fiches) ===================== */
  function chercherTexte(q, prefixes) {
    var best = null, bs = 0;
    AS.M.txt.forEach(function (t) {
      if (prefixes && !prefixes.some(function (p) { return t.cle.indexOf(p) === 0; })) return;
      var s = 0; t.mots.forEach(function (m) { if (q.indexOf(m) >= 0) s += m.length; });
      if (s > bs) { bs = s; best = t; }
    });
    return bs >= 4 ? best : null;
  }
  function texteCle(c) { var r = null; AS.M.txt.forEach(function (t) { if (t.cle === c) r = t; }); return r; }

  /* ===================== Réponses de données ===================== */
  function rValeur(S, L, m, A) {
    var M = AS.M, y = A.ans[0], h;
    if (m === 'pop') return '<p>Population ' + lieuTxt(L) + ' au 1er janvier ' + M.N + ' : ' + b(n0(AS.val(S, L, 'pop'))) + ' habitants (Insee).</p>';
    if (m === 'age') return rProfil(S, L);
    if (m === 'fem') {
      var f = AS.val(S, L, 'fem'), g = AS.agg(S, L);
      h = '<p>' + quiOu(S, L) + ' en ' + M.N + ' : ' + b(pct(f)) + ' de femmes, soit ' + n0(g.w) + ' licences féminines sur ' + n0(g.n) + '.</p>';
      if (!S.all) { var fa = AS.val(M.S.ALL, L, 'fem'); h += '<p>Toutes fédérations confondues, la part est de ' + pct(fa) + ' : ' + (f > fa ? 'c’est plus féminisé que la moyenne' : 'c’est moins féminisé que la moyenne') + '.</p>'; }
      if (A.q.indexOf(' homme') >= 0 || A.q.indexOf(' masculin') >= 0) h += note('Les hommes et les licences non réparties par sexe représentent le reste, soit ' + pct(1 - f) + '.');
      return h;
    }
    if (m === 'p100') {
      var v = AS.val(S, L, 'p100');
      if (v == null) return '<p>Pas de population Insee pour ce territoire : le nombre de licences pour 1 000 habitants n’est pas calculable.</p>';
      h = '<p>' + quiOu(S, L) + ' en ' + M.N + ' : ' + b(fm('p100', v) + ' licences pour 1 000 habitants') + ' (' + n0(AS.agg(S, L).n) + ' licences, ' + n0(AS.val(S, L, 'pop')) + ' habitants).</p>';
      if (L.id !== 'TOT') { var vf = AS.val(S, M.L.TOT, 'p100'); h += '<p>En métropole et DROM : ' + fm('p100', vf) + ' pour 1 000 habitants, soit ' + (v > vf ? b(pct(v / vf - 1)) + ' de plus' : b(pct(1 - v / vf)) + ' de moins') + ' ' + lieuTxt(L) + '.</p>'; }
      return h;
    }
    if (m === 'ind' || m === 'part') {
      if (S.all) return '<p>La part et l’indice de spécificité se calculent pour une fédération ou un regroupement : précisez lequel, par exemple « indice du rugby en Occitanie ».</p>';
      var p = AS.val(S, L, 'part'), i = AS.val(S, L, 'ind');
      h = '<p>' + S.nom + ' pèse ' + b(pct(p)) + ' des licences ' + lieuTxt(L) + ' en ' + M.N + '.</p>';
      if (L.id !== 'TOT' && i != null) h += '<p>Indice de spécificité : ' + b(dec(i, 2)) + ', ' + (i >= 1 ? 'soit un poids ' + pct(i - 1) + ' plus élevé' : 'soit un poids ' + pct(1 - i) + ' plus faible') + ' qu’au total (' + pct(AS.val(S, M.L.TOT, 'part')) + ').</p>';
      return h;
    }
    if (/^t[npde][1-4]$/.test(m)) return AS.Q.valeurTranche(S, L, m);
    if (FEMV[m] || m === 'femn' || m === 'dif1' || m === 'difR') return rValeurV2(S, L, m);
    /* licences et évolutions */
    if (y && y !== M.N) {
      var vy = AS.licAn(S, L, y);
      if (vy == null) return '<p>Pour ce croisement, j’ai les années ' + M.R + ', ' + M.P + ' et ' + M.N + '. Le détail année par année existe pour une fédération (tous territoires confondus) ou dans une région, et pour un territoire toutes fédérations confondues.</p>';
      var vn = AS.val(S, L, 'lic'), cy = AS.licAnCC(S, L, y), cn = AS.licAnCC(S, L, M.N);
      return '<p>' + quiOu(S, L) + ' en ' + y + ' : ' + b(n0(vy) + ' licences') + '.</p><p>En ' + M.N + ' : ' + n0(vn) + ' licences, soit ' + evoTxt(cy ? cn / cy - 1 : null) + ' depuis ' + y + '.</p>' + AS.noteCC(S, L);
    }
    var g2 = AS.agg(S, L);
    if (!g2.n && !g2.p && !g2.r) return '<p>Aucune licence ' + (S.all ? '' : 'de ' + S.nom + ' ') + lieuTxt(L) + ' dans les données.</p>';
    h = '<p>' + quiOu(S, L) + ' en ' + M.N + ' : ' + b(n0(g2.n) + ' licences') + '.</p>';
    var e2 = g2.cc ? g2.c : g2;
    h += '<p>Évolution : ' + evoTxt(AS.val(S, L, 'evo1')) + ' sur un an (' + n0(e2.p) + ' en ' + M.P + ') et ' + evoTxt(AS.val(S, L, 'evoR')) + ' depuis ' + ref() + ' (' + n0(e2.r) + ').</p>' + AS.noteCC(S, L);
    if (!S.all) {
      var pp = AS.val(S, L, 'part');
      h += '<p>Cela représente ' + pct(pp) + ' des licences ' + lieuTxt(L);
      var ii = AS.val(S, L, 'ind');
      if (L.id !== 'TOT' && ii != null) h += ' (indice de spécificité ' + dec(ii, 2) + ')';
      h += '.</p>';
    } else if (L.id !== 'TOT') {
      var pc = AS.val(S, L, 'p100'); if (pc != null) h += '<p>Soit ' + dec(pc, 1) + ' licences pour 1 000 habitants (métropole et DROM : ' + dec(AS.val(S, AS.M.L.TOT, 'p100'), 1) + ').</p>';
    }
    var se = AS.serie(S, L);
    if (se) h += G.courbe([{ nom: court(S), v: se }], M.annees, { ref: M.R });
    return h + I.valeur(S, L);
  }
  var FEMV = { fevoR: 1, fdifR: 1, fptR: 1 };
  /* v2 : nombre de licences féminines, variations en nombre, évolution des licences féminines */
  function rValeurV2(S, L, m) {
    var M = AS.M, g = AS.agg(S, L), h;
    if (m === 'femn') {
      h = '<p>' + quiOu(S, L) + ' en ' + M.N + ' : ' + b(n0(g.w) + ' licences féminines') + ', soit ' + pct(g.n ? g.w / g.n : null) + ' des licences.</p>';
      if (!S.all) h += '<p>Cela représente ' + pct(AS.agg(M.S.ALL, L).w ? g.w / AS.agg(M.S.ALL, L).w : null) + ' de toutes les licences féminines ' + lieuTxt(L) + '.</p>';
      return h;
    }
    if (m === 'dif1' || m === 'difR') {
      var e = g.cc ? g.c : g, base = m === 'dif1' ? e.p : e.r, an = m === 'dif1' ? M.P : M.R, d = AS.val(S, L, m);
      h = '<p>' + quiOu(S, L) + ' : ' + b(fmc(m, d) + ' licences') + ' entre ' + an + ' et ' + M.N + ' (' + n0(base) + ' → ' + n0(e.n) + '), soit ' + evoTxt(base ? e.n / base - 1 : null) + '.</p>' + AS.noteCC(S, L);
      return h + I.valeur(S, L);
    }
    var sf = AS.serie(S, L, 'F', 1);
    if (!sf) return '<p>L’historique des licences féminines existe pour une fédération (ou un regroupement) tous territoires confondus, et pour un territoire toutes fédérations confondues.</p>' + (L.id !== 'TOT' && !S.all ? '<p>' + court(S) + ', tous territoires confondus : ' + fmc(m, AS.val(S, M.L.TOT, m)) + '.</p>' : '');
    var wr = sf[M.R - M.A0], wn = sf[M.N - M.A0], st = AS.serie(S, L, '', 1);
    h = '<p>' + quiOu(S, L) + ' : ' + b(n0(wr) + ' → ' + n0(wn) + ' licences féminines') + ' entre ' + M.R + ' et ' + M.N + ', soit ' + fmc('fdifR', wn - wr) + ' (' + fmc('fevoR', wr ? wn / wr - 1 : null) + ').</p>';
    var sa = AS.serie(S, L, 'F') || sf, wr0 = sa[M.R - M.A0], wn0 = sa[M.N - M.A0];
    h += AS.noteCC(S, L) + '<p>Part de femmes : ' + pct(g.r ? wr0 / g.r : null) + ' en ' + M.R + ', ' + b(pct(g.n ? wn0 / g.n : null)) + ' en ' + M.N + ' (' + fmc('fptR', AS.val(S, L, 'fptR')) + ').</p>';
    h += G.courbe(st ? [{ nom: 'Femmes', v: sf }, { nom: 'Toutes licences', v: st }] : [{ nom: 'Femmes', v: sf }], M.annees, { ref: M.R, base100: !!st });
    if (st) h += note('Courbes en base 100 = ' + M.A0 + ' : elles comparent le rythme des licences féminines à celui de l’ensemble.');
    var eT = AS.val(S, L, 'evoR'), eF = wr ? wn / wr - 1 : null;
    if (eT != null && eF != null) h += I.phrase(eF > eT + 0.01 ? 'Les licences féminines progressent plus vite que l’ensemble (' + pct(eT, true) + ') : la pratique se féminise.' : eF < eT - 0.01 ? 'Les licences féminines évoluent moins bien que l’ensemble (' + pct(eT, true) + ') : la part des femmes recule.' : 'Les licences féminines évoluent au même rythme que l’ensemble.');
    return h;
  }

  function rProfil(S, L) {
    var M = AS.M, pr = AS.profil(S, L);
    if (!pr) {
      var h0 = '<p>L’âge est disponible pour une fédération tous territoires confondus, ou pour un territoire toutes fédérations confondues.</p>';
      var p1 = AS.profil(S, M.L.TOT), p2 = AS.profil(M.S.ALL, L);
      if (p1) h0 += '<p>' + S.nom + ', tous territoires confondus : âge moyen ' + b(fm('age', p1.age)) + '.</p>';
      if (p2 && L.id !== 'TOT') h0 += '<p>Toutes fédérations ' + lieuTxt(L) + ' : âge moyen ' + b(fm('age', p2.age)) + '.</p>';
      return h0;
    }
    var t = pr.tr, tot = t[0] + t[1] + t[2] + t[3] + t[4];
    var h = '<p>' + quiOu(S, L) + ' en ' + M.N + ' : âge moyen ' + b(fm('age', pr.age)) + '.</p>';
    var ens = S.all ? AS.profil(M.S.ALL, M.L.TOT) : AS.profil(M.S.ALL, M.L.TOT);
    if (ens && !(S.all && L.id === 'TOT')) h += '<p>Moyenne de l’ensemble des licences, tous territoires confondus : ' + fm('age', ens.age) + '.</p>';
    h += tableau([{ t: 'Tranche', f: function (l) { return l.n; } }, { t: 'Licences', f: function (l) { return n0(l.v); } }, { t: 'Part', f: function (l) { return pct(tot ? l.v / tot : null); } }],
      [{ n: 'Enfants (1-13 ans)', v: t[0] }, { n: 'Jeunes (14-20 ans)', v: t[1] }, { n: 'Adultes (21-55 ans)', v: t[2] }, { n: 'Seniors (56 ans et plus)', v: t[3] }]
        .concat(t[4] ? [{ n: 'Âge non renseigné', v: t[4] }] : []), { v: function (l) { return l.v; } });
    var py = AS.pyramide(S, L);
    if (py) h += '<p class=as-chapo>Pyramide des âges ' + M.N + ' (femmes à gauche, hommes à droite) :</p>' + G.pyramide(py) + I.pyramide(py);
    return h;
  }

  /* évolutions à champ constant : note si au moins un agrégat compte des fédérations hors champ */
  var EVO = /^(evo|dif|fevo|fdif|t[ed])/;
  function noteCC(lst) {
    var x = lst.some(function (o) { var g = AS.agg(o.s, o.L); return g.cc && Object.keys(g.hf).length; });
    return x ? note('Évolutions à champ constant (méthode INJEP) : seules les fédérations présentes chaque année comptent ; les licences, elles, portent sur toutes les fédérations.') : '';
  }
  var MIN = function (L) { return L.id === 'TOT' ? 300 : L.type === 'dep' ? 20 : 50; };
  function rClassementFeds(L, m, nb, asc, A, groupes, dans) {
    var M = AS.M; m = m || 'lic';
    if ((m === 'age' || FEMV[m] || /^t[npde]/.test(m)) && L.id !== 'TOT') return '<p>' + (m === 'age' ? 'L’âge moyen par fédération n’existe que tous territoires confondus' : FEMV[m] ? 'L’évolution des licences féminines par fédération n’existe que tous territoires confondus' : 'Les tranches d’âge par fédération n’existent que tous territoires confondus') + ' : voici ce classement.</p><p>' + rClassementFeds(M.L.TOT, m, nb, asc, A, groupes, dans).replace(/^<p>/, '');
    if (m === 'pop') m = 'lic';
    var cand = M.Sl.filter(function (s) { return groupes ? s.type === 'grp' && s.niv === groupes : s.type === 'fed' && (!dans || dans.codes.indexOf(s.codes[0]) >= 0); })
      .filter(function (s) { return !A || !A.filtre || A.filtre.f(s, L); });
    var seuil = (m === 'lic' || m === 'part' || m === 'p100') ? 1 : MIN(L), filtre = false;
    var l = cand.map(function (s) { return { s: s, v: m === 'age' ? (AS.profil(s, L) || {}).age : AS.val(s, L, m), n: AS.agg(s, L).n }; })
      .filter(function (x) { if (x.v == null || !x.n) return false; if (x.n < seuil) { filtre = true; return false; } return true; });
    l.sort(function (x, y) { return asc ? x.v - y.v : y.v - x.v; });
    var tot = l.length, plein = l, somme = 0; l.forEach(function (x) { somme += x.v; }); l = l.slice(0, nb || 5);
    if (!l.length) return '<p>Pas de données pour ce classement.</p>';
    var quoi = groupes ? (groupes === 'groupe' ? 'groupes' : groupes === 'famille' ? 'familles' : 'sous-familles') : 'fédérations';
    var h = '<p>' + titre(quoi, m, asc, l.length) + (dans ? ' parmi les ' + cand.length + ' du regroupement ' + dans.nom : '') + (A && A.filtre ? ', ' + A.filtre.txt : '') + ' ' + lieuTxt(L) + ' en ' + M.N + ' :</p>';
    var cols = [{ t: groupes ? 'Regroupement' : 'Fédération', f: function (x) { return x.s.nom; } }, { t: m === 'lic' ? 'Licences' : LIB[m].charAt(0).toUpperCase() + LIB[m].slice(1), f: function (x) { return fmc(m, x.v); } }];
    if (m === 'lic') cols.push({ t: 'Part', f: function (x) { return pct(AS.val(x.s, L, 'part')); } });
    else if (m === 'femn') cols.push({ t: 'Part de femmes', f: function (x) { return pct(AS.val(x.s, L, 'fem')); } });
    else if (FEMV[m]) cols.push({ t: 'Femmes ' + M.N, f: function (x) { return n0(AS.agg(x.s, L).w); } });
    else cols.push({ t: 'Licences', f: function (x) { return n0(x.n); } });
    h += tableau(cols, l, { v: function (x) { return x.v; } });
    if (filtre) h += note('Classement limité aux ' + quoi + ' d’au moins ' + n0(seuil) + ' licences ' + lieuTxt(L) + ' (' + tot + ' retenues).');
    if (m === 'ind') h += note('Indice > 1 : la fédération pèse plus ' + lieuTxt(L) + ' qu’au total.');
    if (m === 'evoR' || m === 'evo1') h += note('En pourcentage. Pour les gains en nombre de licences, demandez « en valeur » ou « en nombre ».');
    if (m === 'difR' || m === 'dif1') h += note('En nombre de licences. Pour les évolutions en pourcentage, demandez « en % ».');
    if (groupes && EVO.test(m)) h += noteCC(l.map(function (x) { return { s: x.s, L: L }; }));
    if (m === 'femn') h += note('En nombre de licences féminines. Pour la part de femmes, demandez « en part de femmes ».');
    var ctx = m === 'lic' || m === 'femn' ? (dans || groupes ? 0 : AS.agg(M.S.ALL, L)[m === 'lic' ? 'n' : 'w']) : SIGNE[m] ? { pos: plein.filter(function (x) { return x.v > 0; }).length, n: tot } : null;
    return h + I.classement(l, m, ctx, quoi);
  }

  function rClassementLieux(S, m, nb, asc, niveau, Lp, A) {
    var M = AS.M; m = m || 'lic';
    if (m === 'age' && !S.all) return '<p>L’âge par territoire est disponible toutes fédérations confondues. ' + rClassementLieux(M.S.ALL, m, nb, asc, niveau, Lp, A).replace(/^<p>/, '');
    if ((m === 'ind' || m === 'part') && S.all) m = 'p100';
    if (/^t[npde]/.test(m) && !S.all) return '<p>Les tranches d’âge par territoire existent toutes fédérations confondues. ' + rClassementLieux(M.S.ALL, m, nb, asc, niveau, Lp, A).replace(/^<p>/, '');
    var cand = M.Ll.filter(function (l) {
      if (niveau === 'dep') { if (l.type !== 'dep') return false; var t = M.T[l.deps[0]]; if (!t || t.zone === 'Autres' || t.zone === 'Non réparti' || l.deps[0] === 'NR' || l.deps[0] === 'ETR' || l.deps[0] === '980') return false; if (t.zone === 'COM' && !(Lp && (Lp.id === 'COM' || Lp.id === 'OM'))) return false; }
      else if (l.type !== 'region') return false;
      if (Lp && Lp.id !== 'TOT') return l.deps.every(function (d) { return Lp.set[d]; });
      return true;
    });
    var seuil = (m === 'lic' || m === 'p100' || m === 'pop') ? 1 : 20, filtre = false;
    var l = cand.map(function (x) { return { L: x, v: m === 'age' ? (AS.profil(S, x) || {}).age : AS.val(S, x, m), n: AS.agg(S, x).n }; })
      .filter(function (x) { if (x.v == null || (m !== 'pop' && !x.n)) return false; if (x.n < seuil) { filtre = true; return false; } return true; });
    l.sort(function (x, y) { return asc ? x.v - y.v : y.v - x.v; });
    var tot = l.length, plein = l; l = l.slice(0, nb || (niveau === 'dep' ? 10 : 5));
    if (!l.length) return '<p>Pas de données pour ce classement.</p>';
    var quoi = niveau === 'dep' ? 'départements' : 'régions';
    var h = '<p>' + sujetTxt(S) + ' : ' + titre(quoi, m, asc, l.length).replace(/^./, function (c) { return c.toLowerCase(); }) + (Lp && Lp.id !== 'TOT' ? ' ' + lieuTxt(Lp) : '') + ' en ' + M.N + ' :</p>';
    var cols = [{ t: niveau === 'dep' ? 'Département' : 'Région', f: function (x) { return x.L.court || x.L.nom; } },
      { t: LIB[m].charAt(0).toUpperCase() + LIB[m].slice(1), f: function (x) { return fmc(m, x.v); } }];
    if (m !== 'lic' && m !== 'pop') cols.push({ t: 'Licences', f: function (x) { return n0(x.n); } });
    else if (m === 'lic') cols.push({ t: 'Pour 1 000 hab.', f: function (x) { return dec(AS.val(S, x.L, 'p100'), 1); } });
    h += tableau(cols, l, { v: function (x) { return x.v; } });
    if (m === 'p100') h += note('Licences pour 1 000 habitants : la mesure la plus juste pour comparer des territoires de tailles différentes.' + (S.all ? '' : ' Métropole et DROM : ' + fm('p100', AS.val(S, M.L.TOT, 'p100')) + '.'));
    if (m === 'ind') h += note('Indice > 1 : ' + S.nom + ' pèse plus dans le territoire qu’au total.');
    if (filtre) h += note('Territoires avec au moins ' + seuil + ' licences (' + tot + ' retenus).');
    if (EVO.test(m)) h += noteCC(l.map(function (x) { return { s: S, L: x.L }; }));
    if (niveau !== 'dep' && !(Lp && Lp.id !== 'TOT')) {
      var vals = {}; M.Ll.forEach(function (x) { if (x.type === 'region') vals[x.reg] = m === 'age' ? (AS.profil(S, x) || {}).age : AS.val(S, x, m); });
      h += '<p class=as-chapo>Carte des régions (' + LIB[m] + ') :</p>' + G.carte(vals, { div: !!SIGNE[m], fmt: function (v) { return fm(m, v); }, fmtc: function (v) { return cartTxt(m, v); } });
    }
    return h + I.classement(l, m, m === 'lic' ? AS.agg(S, M.L.TOT).n : SIGNE[m] ? { pos: plein.filter(function (x) { return x.v > 0; }).length, n: tot } : null, quoi);
  }
  /* valeur courte écrite dans une tuile de la carte */
  function cartTxt(m, v) {
    if (v == null) return '–';
    if (m === 'p100') return dec(v, v < 10 ? 1 : 0);
    if (m === 'ind') return dec(v, 2);
    if (m === 'age') return dec(v, 1);
    if (m === 'fem' || m === 'part' || m === 'evo1' || m === 'evoR' || m === 'fevoR' || /^t[pe]/.test(m)) return (SIGNE[m] && v > 0 ? '+' : '') + Math.round(v * 100) + '%';
    var x = Math.abs(v), t = x >= 1e6 ? dec(x / 1e6, 1) + ' M' : x >= 1e4 ? Math.round(x / 1e3) + ' k' : x >= 1e3 ? dec(x / 1e3, 1) + ' k' : String(Math.round(x));
    return (SIGNE[m] ? (v > 0 ? '+' : v < 0 ? '−' : '') : '') + t;
  }

  function rComparer(Ss, Ls, A) {
    var M = AS.M, parSujet = Ss.length >= 2, items = parSujet ? Ss.map(function (s) { return { s: s, L: Ls[0] || M.L.TOT }; }) : Ls.map(function (l) { return { s: Ss[0] || M.S.ALL, L: l }; });
    var nom = function (x) { return parSujet ? (x.s.all ? 'Toutes fédérations' : x.s.nom) : (x.L.court || x.L.nom); };
    var cols = [{ t: parSujet ? 'Fédération' : 'Territoire', f: nom }, { t: 'Licences ' + M.N, f: function (x) { return n0(AS.val(x.s, x.L, 'lic')); } },
      { t: '1 an', f: function (x) { return evoTxt(AS.val(x.s, x.L, 'evo1')); } }, { t: 'Depuis ' + M.R, f: function (x) { return evoTxt(AS.val(x.s, x.L, 'evoR')); } },
      { t: 'Femmes', f: function (x) { return pct(AS.val(x.s, x.L, 'fem')); } }];
    if (!parSujet) cols.push({ t: 'Pour 1 000 hab.', f: function (x) { return dec(AS.val(x.s, x.L, 'p100'), 1); } });
    else if ((Ls[0] || M.L.TOT).id !== 'TOT') cols.push({ t: 'Indice', f: function (x) { return dec(AS.val(x.s, x.L, 'ind'), 2); } });
    var h = '<p>Comparaison ' + (parSujet ? lieuTxt(Ls[0] || M.L.TOT) : (Ss[0] && !Ss[0].all ? 'pour ' + Ss[0].nom : 'toutes fédérations confondues')) + ' en ' + M.N + ' :</p>';
    h += tableau(cols, items, { v: function (x) { return AS.val(x.s, x.L, parSujet ? 'lic' : 'p100') || AS.val(x.s, x.L, 'lic'); } });
    var v1 = AS.val(items[0].s, items[0].L, parSujet ? 'lic' : 'p100'), v2 = AS.val(items[1].s, items[1].L, parSujet ? 'lic' : 'p100');
    if (v1 && v2) {
      var g = v1 >= v2 ? [items[0], items[1], v1 / v2] : [items[1], items[0], v2 / v1];
      h += noteCC(items) + '<p>' + nom(g[0]) + ' compte ' + (g[2] >= 1.95 ? b(dec(g[2], 1).replace(',0', '') + ' fois plus') : b(pct(g[2] - 1) + ' de plus')) + (parSujet ? ' de licences' : ' de licences par habitant') + ' que ' + nom(g[1]) + '.</p>';
    }
    return h;
  }

  function rSerie(S, L, A, m) {
    var M = AS.M, s = AS.serie(S, L);
    if (FEMV[m] || m === 'fem' || m === 'femn') { var sf = AS.serie(S, L, 'F'); if (sf) return rValeurV2(S, L, 'fevoR'); }
    if (!s) {
      var pts = [[M.R, AS.val(S, L, 'lic', 'r')], [M.P, AS.val(S, L, 'lic', 'p')], [M.N, AS.val(S, L, 'lic', 'n')]];
      return '<p>Pour ce croisement, j’ai trois années :</p>' + tableau([{ t: 'Année', f: function (x) { return x[0]; } }, { t: 'Licences', f: function (x) { return n0(x[1]); } }], pts, { v: function (x) { return x[1]; } })
        + note('L’historique complet existe pour une fédération (tous territoires confondus) ou dans une région, et pour un territoire toutes fédérations confondues.');
    }
    var max = Math.max.apply(null, s), iMin = s.indexOf(Math.min.apply(null, s)), iMax = s.indexOf(max);
    var h = '<p>' + quiOu(S, L) + ', de ' + M.A0 + ' à ' + M.N + ' :</p>';
    var sc = AS.serie(S, L, '', 1) || s, ens = !S.all ? AS.serie(M.S.ALL, L, '', 1) : null, base = !!(ens && a(A.q, [' compar', ' ensemble', ' base 100', ' rythme', ' par rapport', ' moyenne']));
    h += G.courbe(base ? [{ nom: court(S), v: sc }, { nom: 'Toutes fédérations', v: ens }] : [{ nom: court(S), v: s }], M.annees, { ref: M.R, base100: base });
    h += '<p>Plus haut en ' + b(M.A0 + iMax) + ' (' + n0(max) + '), plus bas en ' + b(M.A0 + iMin) + ' (' + n0(s[iMin]) + '). Sur la période : ' + evoTxt(sc[0] ? sc[sc.length - 1] / sc[0] - 1 : null) + ' (' + fmc('difR', sc[sc.length - 1] - sc[0]) + ' licences), depuis ' + M.R + ' : ' + evoTxt(AS.val(S, L, 'evoR')) + '.</p>';
    return h + I.serie(sc, M.annees, M.R) + AS.noteCC(S, L);
  }

  /* fiches (« parle-moi du tennis ») : partie 4, AS.Q.fiche, AS.Q.ficheLieu, AS.Q.ficheCroise */

  /* ===================== Aiguillage ===================== */

  function court(S) { return S.all ? 'toutes fédérations' : S.type === 'multi' ? S.nom.replace(/ \(.*$/, '') : S.nom.split(/,| et | \(/)[0].trim(); }
  function relOu(S) { return AS.N.ou(S); }

  AS.R = { valeur: function (S, L, m, A) { lier(); return rValeur(S, L, m, A); }, feds: function (L, m, nb, asc, A, g, d) { lier(); return rClassementFeds(L, m, nb, asc, A, g, d); }, court: court, cartTxt: function (m, v) { lier(); return cartTxt(m, v); } };
  AS.repondre = function (texte) {
    lier();
    var M = AS.M, A = AS.analyser(texte); if (AS.Q) AS.Q.prep(A); var q = A.q, mem = AS.mem || {}, mots = q.trim().split(' ').length;
    var pre = A.notes.length ? '<p class=as-info>' + A.notes.join(' ') + '</p>' : '';
    var donnees = false;
    /* réponse ; pour une réponse chiffrée, l’indicateur sert au dépliant « Comment c’est calculé ? » */
    var R = function (html, rel, garde) {
      if (garde) AS.mem = garde; rel = rel || [];
      /* une évolution propose toujours l’autre unité (pourcentage ou nombre de licences) */
      var mm = garde && garde.m || m, tg = mm && ({ evoR: 'difR', difR: 'evoR', evo1: 'dif1', dif1: 'evo1', fevoR: 'fdifR', fdifR: 'fevoR', fptR: 'fdifR' }[mm] || (/^te\d$/.test(mm) ? 'td' : /^td\d$/.test(mm) ? 'te' : ''));
      if (donnees && tg && !rel.some(function (x) { return /en pourcentage|en nombre/.test(x); })) rel = rel.concat(/^(evo|fevo|te)/.test(tg) ? 'Et en pourcentage ?' : 'Et en nombre de licences ?');
      return { html: pre + html, rel: rel, m: donnees ? (m || 'lic') : null, S: S, L: L };
    };
    if (!q.trim()) return R('<p>Posez-moi une question sur les licences sportives.</p>');
    if (/^ (bonjour|salut|hello|coucou|bonsoir|hey|yo|hi) /.test(q) && mots <= 4) return R('<p>Bonjour ! Je réponds aux questions sur les licences sportives : volumes, évolutions, territoires, publics et définitions. Par quoi commence-t-on ?</p>', ['Top 10 des fédérations', 'Où le rugby est-il le plus pratiqué ?']);
    if (a(q, [' merci', ' genial', ' parfait ', ' super ', ' cool ', ' top merci']) && mots <= 5) return R('<p>Avec plaisir ! Une autre question ?</p>');
    if (a(q, [' qui es tu', ' qui est tu', ' tu es qui', ' es tu une ia', ' t es une ia', ' es tu un robot', ' intelligence artificielle', ' chatgpt', ' comment tu marche', ' comment fonctionne tu', ' comment tu fonctionne', ' tu fonctionne comment', ' comment tu fais'])) {
      var tq = texteCle('info:assistant');
      return R(tq ? '<p>' + tq.rep + '</p>' : '<p>Je suis l’assistant du rapport : je calcule chaque réponse sur les données du rapport.</p>');
    }
    if (!A.S.length && !A.L.length && a(q, [' aide', ' que peux tu', ' que sais tu faire', ' quoi te demander', ' exemple', ' tu sais faire', ' help ', ' quelle question', ' tu peux faire', ' peux tu faire']))
      return R('<p>Je peux répondre sur les ' + b('volumes') + ' (combien, top 10), les ' + b('territoires') + ' (régions, départements, licences pour 1 000 habitants, spécificités), les ' + b('évolutions') + ' (sur un an, depuis ' + M.R + ', depuis ' + M.A0 + ', en % ou en nombre de licences), les ' + b('regroupements') + ' (familles, sous-familles, groupes : « quelle fédération olympique progresse le plus ? »), les ' + b('publics') + ' (femmes en nombre ou en part, âge, pyramide) et les ' + b('définitions') + '. Quelques idées :</p>', ['Top 10 des fédérations', 'Quelle fédération olympique progresse le plus ?', 'Quelles fédérations gagnent le plus de femmes depuis 2019 ?', 'Pyramide des âges du judo']);

    /* définitions, méthode, usage du rapport */
    var def = a(q, [' c est quoi', ' qu est ce', ' definition', ' defini', ' signifie', ' veut dire', ' comment est calcule', ' comment se calcule', ' comment calcul', ' explique', ' pourquoi 2019', ' pourquoi compar', ' source', ' d ou vien', ' fiable', ' mise a jour', ' a jour ', ' methodolog', ' non reparti', ' qui a fait', ' qui a realise', ' auteur', ' contact', ' c est une personne', ' une personne', ' limite', ' difference entre']);
    var usage = a(q, [' comment ', ' ou trouver', ' ou voir', ' filtre', ' segment', ' bouton', ' page ', ' onglet', ' exporter', ' imprimer', ' reinitialis', ' base 100', ' selectionn', ' choisir', ' cliquer', ' afficher', ' changer ', ' mode d emploi', ' utiliser', ' effacer']);
    if (def || (usage && !AS.indicateur(q, A.brut) && !a(q, [' combien']))) {
      var t = chercherTexte(q, def ? ['def:', 'info:', 'use:'] : ['use:', 'def:', 'info:']);
      if (t) return R('<p>' + t.rep + '</p>', []);
    }

    /* données : qui (sujet), où (lieu), quoi (indicateur) */
    donnees = true;
    var m = AS.indicateur(q, A.brut);
    var Ss = A.S.slice(), Ls = A.L.slice();
    /* une relance (« et en Bretagne ? », « part de femmes ? ») reprend le sujet et le lieu de la question précédente */
    var suite = /^ (et|mai|puis|aussi|idem|pareil) /.test(q) || (mots <= 5 && /^ (en|dan|a|au|chez|pour|sur|du|des) /.test(q)) || (mots <= 4 && !Ss.length && (!!m || !!Ls.length || !!A.ans.length) && !/ (raconte|parle|presente|fiche|portrait|zoom) /.test(q));
    var S = Ss[0], L = Ls[0], viaCtx = false;
    if (!S && suite && mem.S) S = mem.S;
    if (!L && suite && mem.L) L = mem.L;
    var sCtx = false, lCtx = false;
    if (!S && !suite) { S = ctxSujet(); sCtx = !!S; }
    if (!L && !suite) { var cl = ctxLieu(); if (cl) { L = cl; lCtx = true; } }
    viaCtx = sCtx || lCtx;
    S = S || M.S.ALL; L = L || M.L.TOT;
    /* relance qui change seulement l’unité : « et en nombre ? », « et en % ? » */
    if (suite && mem.m && (!m || ((m === 'part' || m === 'lic' || m === 'fem') && /^(evo|dif|fevo|fdif|fpt|t[ed])/.test(mem.m)))) {
      m = null;
      if (a(q, [' en nombre', ' en valeur', ' en volume', ' brut', ' absolu'])) m = { evoR: 'difR', evo1: 'dif1', fevoR: 'fdifR', fptR: 'fdifR', fem: 'femn' }[mem.m] || mem.m.replace(/^te/, 'td');
      else if (a(q, [' pourcent', ' en proportion', ' en part']) || /%/.test(A.brut)) m = { difR: 'evoR', dif1: 'evo1', fdifR: 'fevoR', femn: 'fem' }[mem.m] || mem.m.replace(/^td/, 'te');
      if (m && mem.rank) mem.rank.m = m;
    }
    if (!m && suite && mem.m && !A.ans.length) m = mem.m;
    var ctxInfo = viaCtx ? '<p class=as-info>D’après votre sélection dans le rapport : ' + [sCtx && !S.all ? court(S) : '', lCtx && L.id !== 'TOT' ? L.nom : ''].filter(Boolean).join(', ') + '.</p>' : ''; pre += ctxInfo;
    var asc = a(q, [' moins', ' plus faible', ' plus petit', ' dernier', ' le pire', ' recule', ' recul', ' baisse', ' perd', ' diminu', ' chute', ' plus bas', ' plus jeune']) && !a(q, [' plus de ']);
    if (a(q, [' plus vieux', ' plus age', ' plus ancien', ' moins jeune'])) asc = false;
    if (SIGNE[m] && a(q, [' progress', ' hausse', ' augment', ' croissance', ' gagne', ' monte', ' grimpe', ' rebond'])) asc = false;
    if (SIGNE[m] && a(q, [' perd', ' recul', ' baisse', ' diminu', ' chute'])) asc = true;
    if (m === 'femn' && a(q, [' moins de femme'])) asc = true;
    var garde = { S: S, L: L, m: m };
    /* v3 : listes, rangs, deux années, seuils et comptages, homonymes (partie 4) */
    var hq = AS.Q && AS.Q.essayer({ A: A, q: q, S: S, L: L, m: m, Ss: Ss, Ls: Ls, mem: mem, suite: suite, asc: asc });
    if (hq) return R(hq.html, hq.rel || [], hq.garde);

    if (a(q, [' combien de federation', ' nombre de federation', ' combien de sport', ' combien de discipline', ' combien y a t il de federation'])) {
      var Sg = Ss[0] || M.S.ALL;
      var nf = M.Sl.filter(function (s) { return s.type === 'fed' && (Sg.all || Sg.codes.indexOf(s.codes[0]) >= 0) && AS.agg(s, L).n > 0; }).length;
      return R('<p>' + b(nf + ' fédérations') + ' ont des licences ' + lieuTxt(L) + ' en ' + M.N + (Sg.all ? '' : ' dans le regroupement ' + Sg.nom) + '.</p>', ['Top 10 des fédérations ' + L.prep], { S: M.S.ALL, L: L });
    }
    var cmp = a(q, [' compar', ' vs ', ' versus', ' contre ', ' difference', ' ecart ', ' face a ']);
    if (Ss.length >= 2 || Ls.length >= 2) return R(rComparer(Ss.length >= 2 ? Ss : [S], Ls.length >= 2 ? Ls : [L], A), [], { S: Ss.length >= 2 ? Ss[0] : S, L: Ls.length >= 2 ? Ls[0] : L, m: m });
    if (cmp && Ss.length + Ls.length === 1 && !A.notes.length) pre += '<p class=as-info>Je n’ai reconnu qu’un seul élément à comparer.</p>';

    var motsFed = a(q, [' quel sport', ' quelle federation', ' quelle discipline', ' les sport', ' des sport', ' discipline', ' federation', ' activite', ' sport le plus', ' sport les plus', ' sport sont', ' sport ont', ' sport progress', ' sport recul', ' sport specifique']);
    var motsLieu = a(q, [' region', ' departement', ' territoire', ' dans quel', ' dans quelle', ' ou le ', ' ou la ', ' ou les ', ' ou l ', ' ou y ', ' ou est ', ' ou sont ', ' ou se ', ' ou on ', ' ou il ', ' zone ', ' ou pratique']);
    var motsGrp = a(q, [' sous famille', ' famille', ' groupe ', ' regroupement', ' type de sport', ' categorie']);
    var classement = a(q, [' top', ' classement', ' palmares', ' le plus ', ' la plus ', ' les plus ', ' le moins', ' la moins', ' les moins', ' premier', ' dernier', ' meilleur', ' plus gros', ' plus grand', ' plus petit', ' plus fort', ' plus faible', ' majoritaire', ' dominant', ' populaire', ' en tete', ' quel sport', ' quelle federation', ' quelle region', ' quel departement', ' progressent', ' reculent', ' plus feminin', ' plus jeune', ' plus vieux', ' plus pratique', ' sport specifique', ' specifique a', ' specifique au', ' specifique en']) || (motsLieu && /^ (ou|dan quel|dan quelle|quelle region|quel departement) /.test(q)) || A.nb;
    var cible = null, rk = null;
    if (!classement && suite && mem.rank && (Ss.length || Ls.length || m)) {
      rk = mem.rank; cible = rk.cible; if (!m) m = rk.m; asc = rk.asc; A.nb = A.nb || rk.nb;
      if (cible === 'lieu' && !Ss.length) S = mem.S || M.S.ALL;
      if (cible !== 'lieu' && !Ls.length) L = mem.L || M.L.TOT;
    }
    else if (motsGrp && (classement || !Ss.length)) cible = 'grp';
    else if (classement && motsLieu && (a(q, [' region', ' departement', ' territoire']) || !/ (quel|quelle|quels|quelles) (sport|federation|discipline|activite)| (est|sont) (la|le|les) (federation|sport|discipline)/.test(q))) cible = 'lieu';
    else if (classement && (motsFed || !Ss.length || S.all)) cible = 'fed';
    else if (classement) cible = Ls.length || (Ss[0] && (Ss[0].type === 'grp' || Ss[0].type === 'multi') && !motsLieu) ? 'fed' : 'lieu';
    if (cible === 'grp') {
      var niv = rk ? rk.niv : a(q, [' sous famille']) ? 'sous-famille' : a(q, [' groupe ']) ? 'groupe' : 'famille';
      return R(rClassementFeds(L, m, A.nb, asc, A, niv), [], { S: M.S.ALL, L: L, m: m, rank: { cible: 'grp', m: m, asc: asc, nb: A.nb, niv: niv } });
    }
    if (cible === 'fed') {
      if (m === 'ind' && L.id === 'TOT') return R('<p>L’indice de spécificité compare un territoire à l’ensemble des licences : précisez un territoire, par exemple « fédérations spécifiques à la Bretagne ».</p>', ['Fédérations spécifiques à la Corse']);
      /* classement dans un regroupement : « quelle fédération olympique progresse le plus ? » */
      var dans = !Ss[0] || (Ss[0].type !== 'grp' && Ss[0].type !== 'multi') ? (rk && rk.dans) || null : Ss[0];
      /* indicateurs connus seulement tous territoires confondus : la sélection de territoire du rapport est ignorée, sans message */
      var natOnly = m === 'age' || FEMV[m] || /^t[npde]/.test(m || '');
      if (natOnly && L.id !== 'TOT' && !Ls.length) { pre = pre.replace(ctxInfo, ''); L = M.L.TOT; }
      var rlF = natOnly ? [] : [L.id === 'TOT' ? 'Et en Bretagne ?' : 'Et au total ?'];
      if (m === 'evoR') rlF.push('Et en nombre de licences ?'); else if (m === 'difR') rlF.push('Et en pourcentage ?'); else if (m === 'fem') rlF.push('Et en nombre de femmes ?'); else if (m === 'femn') rlF.push('Et en part de femmes ?');
      return R(rClassementFeds(L, m, A.nb, asc, A, null, dans), rlF, { S: M.S.ALL, L: L, m: m, rank: { cible: 'fed', m: m, asc: asc, nb: A.nb, dans: dans } });
    }
    if (cible === 'lieu') {
      if (!m) m = a(q, [' pratique', ' populaire', ' implante', ' repandu', ' joue', ' present', ' developpe', ' fort ', ' adepte', ' aime', ' sportif', ' sportive', ' dynamique', ' licencie par']) ? 'p100' : 'lic';
      var niveau = a(q, [' departement', ' dpt', ' dep ']) || (Ls[0] && Ls[0].type === 'region') ? 'dep' : a(q, [' region']) ? 'region' : rk ? rk.niveau : 'region';
      return R(rClassementLieux(S, m, A.nb, asc, niveau, Ls[0] || null, A), S.all ? ['Et pour le football ?'] : ['Parle-moi ' + AS.N.nom(S, 'de'), 'Et par département ?'], { S: S, L: M.L.TOT, m: m, rank: { cible: 'lieu', m: m, asc: asc, nb: A.nb, niveau: niveau } });
    }
    var serieQ = a(q, [' historique', ' chaque annee', ' par annee', ' annee par annee', ' depuis ' + M.A0, ' courbe', ' graphique', ' au fil', ' sur 10 an', ' sur dix an', ' tendance', ' serie', ' de ' + M.A0 + ' a']);
    if (serieQ) return R(rSerie(S, L, A, m), [], garde);
    var seul = (Ss.length === 1) !== (Ls.length === 1);
    var fiche = a(q, [' parle moi', ' parle de', ' presente', ' fiche', ' portrait', ' que sais tu sur', ' que peux tu dire', ' resume', ' raconte', ' info sur', ' tout sur', ' zoom sur', ' profil de', ' en bref']) ||
      (!m && !A.ans.length && seul && !/^ (et|ou|mai|puis|aussi|en|dan|a|au|chez) /.test(q) && !a(q, [' combien', ' nombre', ' licence', ' evolution', ' pratiquant']) && mots <= 5);
    if (fiche && (Ss.length || Ls.length)) pre = pre.replace(ctxInfo, '');
    else if (fiche && viaCtx) { Ss = S.all ? [] : [S]; Ls = L.id === 'TOT' ? [] : [L]; }
    if (fiche && Ss.length && Ls.length && !Ss[0].all) return R(AS.Q.ficheCroise(Ss[0], Ls[0]), ['Évolution ' + AS.N.nom(Ss[0], 'de') + ' ' + Ls[0].prep + ' depuis ' + M.A0, 'Raconte-moi ' + AS.N.nom(Ss[0], 'le') + ' au total'], { S: Ss[0], L: Ls[0] });
    if (fiche) {
      if (Ss.length && !Ss[0].all) return R(AS.Q.fiche(Ss[0]), [relOu(Ss[0]), 'Évolution depuis ' + M.A0], { S: Ss[0], L: M.L.TOT });
      if (Ls.length) return R(AS.Q.ficheLieu(Ls[0]), ['Top 10 des fédérations ' + Ls[0].prep, 'Fédérations spécifiques ' + (Ls[0].type === 'dep' ? 'au ' + Ls[0].deps[0] : Ls[0].prep)], { S: M.S.ALL, L: Ls[0] });
    }
    var dataQ = m || Ss.length || Ls.length || A.ans.length || suite || a(q, [' combien', ' nombre', ' licence', ' total', ' pratiquant']);
    if (dataQ) {
      if (m === 'ind' && L.id === 'TOT') return R('<p>L’indice de spécificité compare un territoire à l’ensemble des licences : précisez un territoire, par exemple « indice du rugby en Occitanie ».</p>');
      var rl = [];
      if (!m || m === 'lic') rl = [S.all ? 'Top 10 des fédérations ' + L.prep : relOu(S), 'Part de femmes ?'];
      var h = rValeur(S, L, m || 'lic', A);
      if (a(q, [' a t il progresse', ' a t elle progresse', ' progresse t il', ' progresse t elle', ' est il en hausse', ' est elle en hausse', ' augmente t il', ' augmente t elle', ' a t il augmente', ' a t elle augmente', ' a t il baisse', ' a t elle baisse', ' baisse t il', ' baisse t elle', ' recule t il', ' recule t elle', ' a t il recule', ' a t elle recule']) && !a(q, [' retrouve', ' niveau d avant'])) {
        var e1 = AS.val(S, L, 'evo1'), e2 = AS.val(S, L, 'evoR');
        if (e1 != null) h = '<p>' + b(e1 >= 0 ? 'Oui' : 'Non') + ' sur un an (' + pct(e1, true) + ')' + (e2 != null ? ', ' + (e2 >= 0 ? 'et il est au-dessus de son niveau de ' + M.R + ' (' + pct(e2, true) + ')' : 'mais il reste sous son niveau de ' + M.R + ' (' + pct(e2, true) + ')') : '') + '.</p>' + h;
      }
      if (a(q, [' retrouve', ' depasse', ' revenu', ' niveau d avant', ' rattrape', ' remonte']) && (!m || m === 'lic' || m === 'evoR')) {
        var e = AS.val(S, L, 'evoR');
        if (e != null) h = '<p>' + b(e >= 0 ? 'Oui' : 'Pas encore') + ' : ' + (e >= 0 ? 'le niveau de ' + M.R + ' est dépassé de ' + pct(e) : 'il manque encore ' + pct(-e) + ' pour retrouver le niveau de ' + M.R) + '.</p>' + h;
      }
      return R(h, rl, garde);
    }
    var t2 = chercherTexte(q);
    if (t2) return R('<p>' + t2.rep + '</p>');
    var pr = AS.Q ? AS.Q.proches(q) : [];
    return R('<p>Je n’ai pas compris cette question. Je réponds sur les licences sportives : volumes, évolutions, territoires, femmes et âges, définitions. ' + (pr.length ? 'Questions proches :' : 'Par exemple :') + '</p>', pr.length ? pr : ['Combien de licences de judo en Occitanie ?', 'Quels sports progressent le plus depuis ' + M.R + ' ?', 'C’est quoi l’indice de spécificité ?']);
  };

  AS.pret = AS.pret || {}; AS.pret.p2 = true;
  if (AS.demarrer) AS.demarrer();
})();
