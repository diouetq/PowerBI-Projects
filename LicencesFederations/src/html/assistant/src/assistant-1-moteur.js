/* Assistant « Licences sportives » : partie 1, le moteur.
   Lit les blocs de données (script.as-d, table T_Assistant_Bloc), construit le modèle,
   calcule les indicateurs avec les mêmes règles que les mesures du rapport et analyse la question.
   Les deux parties communiquent par document.__as (les variables window ne passent pas d’un bloc à l’autre
   dans HTML Content). Règle d’écriture : aucun guillemet double (le texte est collé dans une chaîne DAX). */
(function () {
  'use strict';
  var D = document;
  var AS = D.__as = D.__as || {};

  /* ===================== Texte ===================== */
  function norm(t) {
    return String(t || '').toLowerCase().replace(/œ/g, 'oe').replace(/æ/g, 'ae')
      .normalize('NFD').split('').filter(function (c) { var k = c.charCodeAt(0); return k < 768 || k > 879; }).join('')
      .replace(/[^a-z0-9+]+/g, ' ').trim();
  }
  function stem(w) { return w.length > 3 && w.charAt(w.length - 1) === 's' && w.charAt(w.length - 2) !== 's' ? w.slice(0, -1) : (w === 'aux' ? 'au' : w); }
  /* forme de comparaison : sans accents, sans pluriel simple, entourée d’espaces */
  function cle(t) { var n = norm(t); return n ? ' ' + n.split(' ').map(stem).join(' ') + ' ' : ' '; }
  /* les motifs passent par la même normalisation que la question (pluriels, accents), en gardant leurs espaces de bord */
  var MC = {};
  function nm(m) {
    if (MC[m]) return MC[m];
    return (MC[m] = (m.charAt(0) === ' ' ? ' ' : '') + norm(m).split(' ').map(stem).join(' ') + (m.charAt(m.length - 1) === ' ' ? ' ' : ''));
  }
  function a(q, motifs) { for (var i = 0; i < motifs.length; i++) if (q.indexOf(nm(motifs[i])) >= 0) return true; return false; }
  function lev(s, t) {
    if (Math.abs(s.length - t.length) > 2) return 9;
    var d = [], i, j;
    for (i = 0; i <= s.length; i++) d[i] = [i];
    for (j = 0; j <= t.length; j++) d[0][j] = j;
    for (i = 1; i <= s.length; i++) for (j = 1; j <= t.length; j++)
      d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (s[i - 1] === t[j - 1] ? 0 : 1));
    return d[s.length][t.length];
  }
  AS.norm = norm; AS.cle = cle; AS.a = a;

  /* ===================== Données ===================== */
  function num(x) { return x === '' || x == null ? 0 : +x; }
  function rec(arr, fn) { (arr || []).join('~').split('~').forEach(function (r) { if (r) fn(r.split('|')); }); }

  AS.lireBlocs = function () {
    var B = {};
    Array.prototype.forEach.call(D.querySelectorAll('script.as-d'), function (s) {
      var t = s.getAttribute('data-t'); (B[t] = B[t] || []).push(s.textContent);
    });
    return B;
  };

  var PREP_REG = { '11': 'en Île-de-France', '24': 'en Centre-Val de Loire', '27': 'en Bourgogne-Franche-Comté', '28': 'en Normandie',
    '32': 'dans les Hauts-de-France', '44': 'dans le Grand Est', '52': 'en Pays de la Loire', '53': 'en Bretagne', '75': 'en Nouvelle-Aquitaine',
    '76': 'en Occitanie', '84': 'en Auvergne-Rhône-Alpes', '93': 'en Provence-Alpes-Côte d’Azur', '94': 'en Corse',
    '01': 'en Guadeloupe', '02': 'en Martinique', '03': 'en Guyane', '04': 'à La Réunion', '06': 'à Mayotte' };

  AS.construire = function (B) {
    var M = { F: {}, Fl: [], T: {}, Tl: [], byF: {}, byT: {}, L: {}, Ll: [], S: {}, Sl: [], txt: [], cache: {} };
    var meta = ((B.meta || [])[0] || '').split('|');
    M.N = +meta[0] || 2025; M.R = +meta[1] || 2019; M.A0 = +meta[2] || 2016; M.maj = meta[3] || ''; M.P = M.N - 1;
    rec(B.fed, function (x) {
      var f = { code: x[0], nom: x[1], fam: x[2] || '', sfam: x[3] || '', grp: x[4] || '', lib: x[5] || x[1], ser: [], age: null, tr: null };
      M.F[f.code] = f; M.Fl.push(f);
    });
    rec(B.ter, function (x) {
      var t = { code: x[0], nom: x[1], reg: x[2], regNom: x[3] || '', zone: x[4] || '', pop: [num(x[5]), num(x[6]), num(x[7])], ser: [], age: null, tr: null };
      M.T[t.code] = t; M.Tl.push(t);
    });
    rec(B.ser, function (x) { var f = M.F[x[0]]; if (f) f.ser = (x[1] || '').split(',').map(num); });
    rec(B.sert, function (x) { var t = M.T[x[0]]; if (t) t.ser = (x[1] || '').split(',').map(num); });
    rec(B.pro, function (x) { var f = M.F[x[0]]; if (f) { f.age = x[1] === '' ? null : +x[1]; f.tr = (x[2] || '').split(',').map(num); } });
    rec(B.prot, function (x) { var t = M.T[x[0]]; if (t) { t.age = x[1] === '' ? null : +x[1]; t.tr = (x[2] || '').split(',').map(num); } });
    /* v2 : séries par région (fédération x région), séries féminines, pyramides par tranches de 5 ans */
    rec(B.serr, function (x) {
      var f = M.F[x[0]]; if (!f) return; f.serR = {};
      (x[1] || '').split(';').forEach(function (r) { var i = r.indexOf(':'); if (i > 0) f.serR[r.slice(0, i)] = r.slice(i + 1).split(',').map(num); });
    });
    rec(B.serf, function (x) { var f = M.F[x[0]]; if (f) f.serF = (x[1] || '').split(',').map(num); });
    rec(B.sertf, function (x) { var t = M.T[x[0]]; if (t) t.serF = (x[1] || '').split(',').map(num); });
    rec(B.pyr, function (x) { var f = M.F[x[0]]; if (f) f.pyr = (x[1] || '').split(',').map(num); });
    rec(B.pyrt, function (x) { var t = M.T[x[0]]; if (t) t.pyr = (x[1] || '').split(',').map(num); });
    M.v2 = !!(B.serr && B.serr.length);
    /* v3 : séries par grande tranche d’âge (enfants, jeunes, adultes, seniors) : par fédération (France) et par territoire */
    function tr(x) { return (x[1] || '').split(';').map(function (z) { return z.split(',').map(num); }); }
    rec(B.sertr, function (x) { var f = M.F[x[0]]; if (f) f.trS = tr(x); });
    rec(B.serttr, function (x) { var t = M.T[x[0]]; if (t) t.trS = tr(x); });
    /* v5 : licences des fédérations hors champ constant par département (licences|femmes|tranches), pour les évolutions */
    rec(B.serhc, function (x) { var t = M.T[x[0]]; if (t) { t.hc = (x[1] || '').split(',').map(num); t.hcF = (x[2] || '').split(',').map(num); t.hcT = (x[3] || '').split(';').map(function (z) { return z.split(',').map(num); }); } });
    (B.cube || []).forEach(function (bloc) {
      bloc.split('~').forEach(function (dp) {
        var i = dp.indexOf('|'); if (i < 0) return;
        var d = dp.slice(0, i);
        dp.slice(i + 1).split(';').forEach(function (c) {
          var v = c.split(','); if (!v[0]) return;
          var x = { d: d, f: v[0], n: num(v[1]), p: num(v[2]), r: num(v[3]), w: num(v[4]) };
          (M.byF[x.f] = M.byF[x.f] || []).push(x); (M.byT[d] = M.byT[d] || []).push(x);
        });
      });
    });
    rec(B.txt, function (x) { M.txt.push({ cle: x[0], q: x[1] || '', mots: (x[2] || '').split(',').map(cle).filter(function (m) { return m.trim(); }), rep: x[3] || '' }); });
    M.annees = []; for (var y = M.A0; y <= M.N; y++) M.annees.push(y);
    /* champ constant (méthode INJEP) : fédération présente chaque année de la période */
    M.Fl.forEach(function (f) { f.cc = f.ser.length >= M.annees.length && f.ser.every(function (v) { return v > 0; }); });
    M.nbCC = M.Fl.filter(function (f) { return f.cc; }).length;

    /* --- lieux --- */
    function lieu(id, type, nom, deps, prep, extra) {
      var l = { id: id, type: type, nom: nom, deps: deps, set: {}, prep: prep };
      for (var k in extra || {}) l[k] = extra[k];
      deps.forEach(function (d) { l.set[d] = 1; });
      M.L[id] = l; M.Ll.push(l); return l;
    }
    function deps(fn) { return M.Tl.filter(fn).map(function (t) { return t.code; }); }
    lieu('TOT', 'zone', 'Tous territoires', deps(function () { return true; }), 'tous territoires confondus');
    lieu('MET', 'zone', 'Métropole', deps(function (t) { return t.zone === 'Métropole'; }), 'en métropole');
    lieu('DROM', 'zone', 'DROM', deps(function (t) { return t.zone === 'DROM'; }), 'dans les DROM');
    lieu('COM', 'zone', 'COM', deps(function (t) { return t.zone === 'COM'; }), 'dans les COM');
    lieu('OM', 'zone', 'Outre-mer', deps(function (t) { return t.zone === 'DROM' || t.zone === 'COM'; }), 'en outre-mer');
    lieu('MDR', 'zone', 'Métropole et DROM', deps(function (t) { return t.zone === 'Métropole' || t.zone === 'DROM'; }), 'en métropole et dans les DROM');
    var regs = {};
    M.Tl.forEach(function (t) {
      if (t.zone !== 'Métropole' && t.zone !== 'DROM') return;
      var nom = t.zone === 'DROM' ? t.nom : t.regNom;
      (regs[t.reg] = regs[t.reg] || { nom: nom, deps: [] }).deps.push(t.code);
    });
    Object.keys(regs).forEach(function (r) { lieu('R' + r, 'region', regs[r].nom, regs[r].deps, PREP_REG[r] || ('en ' + regs[r].nom), { reg: r }); });
    /* régions qui composent exactement chaque zone (pour les séries fédération x région) */
    M.Ll.forEach(function (l) {
      var rs = Object.keys(regs).filter(function (r) { return regs[r].deps.every(function (d) { return l.set[d]; }); });
      var cov = {}; rs.forEach(function (r) { regs[r].deps.forEach(function (d) { cov[d] = 1; }); });
      var horsPop = l.deps.filter(function (d) { return !cov[d]; });
      l.regs = rs.length && (horsPop.length === 0 || l.id === 'TOT') ? rs : null;
    });
    M.Tl.forEach(function (t) { lieu('D' + t.code, 'dep', t.nom, [t.code], 'dans le ' + t.code + ' (' + t.nom + ')', { court: t.nom + ' (' + t.code + ')' }); });

    /* --- sujets (fédérations et regroupements) --- */
    function sujet(id, type, nom, codes, extra) {
      var s = { id: id, type: type, nom: nom, codes: codes };
      for (var k in extra || {}) s[k] = extra[k];
      M.S[id] = s; M.Sl.push(s); return s;
    }
    sujet('ALL', 'all', 'Toutes fédérations', M.Fl.map(function (f) { return f.code; }), { all: true });
    M.Fl.forEach(function (f) { sujet('F' + f.code, 'fed', f.nom, [f.code], { f: f }); });
    [['fam', 'famille'], ['sfam', 'sous-famille'], ['grp', 'groupe']].forEach(function (nv) {
      var vus = {};
      M.Fl.forEach(function (f) { var v = f[nv[0]]; if (v) (vus[v] = vus[v] || []).push(f.code); });
      Object.keys(vus).forEach(function (v) { if (!M.S['G' + v]) sujet('G' + v, 'grp', v, vus[v], { niv: nv[1] }); });
    });
    AS.M = M;
    AS.dico = construireDico(M);
    return M;
  };

  /* ===================== Calculs ===================== */
  function cellules(S, L) {
    var M = AS.M, out = [];
    if (S.all) L.deps.forEach(function (d) { (M.byT[d] || []).forEach(function (x) { out.push(x); }); });
    else S.codes.forEach(function (c) { (M.byF[c] || []).forEach(function (x) { if (L.set[x.d]) out.push(x); }); });
    return out;
  }
  /* agrégat sujet x lieu, avec les règles des mesures : pour 1 000 hab = départements ayant une population */
  AS.agg = function (S, L) {
    var M = AS.M, k = S.id + '@' + L.id;
    if (M.cache[k]) return M.cache[k];
    var g = { n: 0, p: 0, r: 0, w: 0, nPop: [0, 0, 0], pop: [0, 0, 0], c: { n: 0, p: 0, r: 0 }, cc: 0, hx: 0, hf: {} };
    cellules(S, L).forEach(function (x) {
      var t = M.T[x.d], f = M.F[x.f]; g.n += x.n; g.p += x.p; g.r += x.r; g.w += x.w;
      if (f && f.cc) { g.cc = 1; g.c.n += x.n; g.c.p += x.p; g.c.r += x.r; } else if (x.n) { g.hx += x.n; g.hf[x.f] = 1; }
      if (t && t.pop[0]) g.nPop[0] += x.n; if (t && t.pop[1]) g.nPop[1] += x.p; if (t && t.pop[2]) g.nPop[2] += x.r;
    });
    L.deps.forEach(function (d) { var t = M.T[d]; if (t) for (var i = 0; i < 3; i++) g.pop[i] += t.pop[i]; });
    return (M.cache[k] = g);
  };
  /* valeur d’un indicateur ; an = 'n' (N), 'p' (N-1) ou 'r' (2019) */
  AS.val = function (S, L, m, an) {
    var M = AS.M, g = AS.agg(S, L), i = { n: 0, p: 1, r: 2 }[an || 'n'], v = g[an || 'n'], e = g.cc ? g.c : g; /* e : base des évolutions (champ constant) */
    switch (m) {
      case 'lic': return v;
      case 'evo1': return e.p ? e.n / e.p - 1 : null;
      case 'evoR': return e.r ? e.n / e.r - 1 : null;
      case 'fem': return g.n ? g.w / g.n : null;
      case 'p100': return g.pop[i] ? g.nPop[i] / g.pop[i] * 1000 : null;
      case 'part': var t = AS.agg(M.S.ALL, L)[an || 'n']; return t ? v / t : null;
      case 'ind':
        var pl = AS.val(S, L, 'part', an), pf = AS.val(S, M.L.TOT, 'part', an);
        return pl != null && pf ? pl / pf : null;
      case 'pop': return g.pop[i] || null;
      case 'age': var pr = AS.profil(S, L); return pr ? pr.age : null;
      /* v2 : variations en nombre de licences et indicateurs sur les licences féminines */
      case 'dif1': return e.n || e.p ? e.n - e.p : null;
      case 'difR': return e.n || e.r ? e.n - e.r : null;
      case 'femn': return g.n ? g.w : null;
      default:
        /* v3 : tranches d’âge, indicateur t + n (nombre), p (part), e (évolution en %), d (évolution en nombre) + numéro 1 à 4 */
        var tm = /^t([npde])([1-4])$/.exec(m); if (!tm) return null;
        var ev = /[de]/.test(tm[1]), ts = AS.tranche(S, L, +tm[2] - 1, ev); if (!ts) return null;
        var yN = M.N - M.A0, yR = M.R - M.A0, tot = AS.serie(S, L) || [];
        if (tm[1] === 'n') return ts[yN];
        if (tm[1] === 'p') return tot[yN] ? ts[yN] / tot[yN] : null;
        if (tm[1] === 'd') return ts[yN] - ts[yR];
        return ts[yR] ? ts[yN] / ts[yR] - 1 : null;
      case 'fevoR': case 'fdifR': case 'fptR':
        /* évolutions des licences féminines à champ constant ; écart de part de femmes sur toutes les licences (niveaux) */
        var sf = AS.serie(S, L, 'F', m !== 'fptR'); if (!sf) return null;
        var wr = sf[M.R - M.A0], wn = sf[M.N - M.A0];
        if (m === 'fdifR') return wn - wr;
        if (m === 'fevoR') return wr ? wn / wr - 1 : null;
        return g.n && g.r ? wn / g.n - wr / g.r : null;
    }
    return null;
  };
  /* âge moyen et tranches : par fédération ou regroupement en France, ou toutes fédérations sur un territoire */
  AS.profil = function (S, L) {
    var M = AS.M, items = null;
    if (L.id === 'TOT' && !S.all) items = S.codes.map(function (c) { return M.F[c]; });
    else if (S.all) items = L.deps.map(function (d) { return M.T[d]; });
    if (!items) return null;
    var sa = 0, la = 0, tr = [0, 0, 0, 0, 0];
    items.forEach(function (o) {
      if (!o || !o.tr) return;
      var avec = o.tr[0] + o.tr[1] + o.tr[2] + o.tr[3];
      if (o.age != null) { sa += o.age * avec; la += avec; }
      for (var i = 0; i < 5; i++) tr[i] += o.tr[i] || 0;
    });
    return la ? { age: sa / la, tr: tr } : null;
  };
  /* série annuelle : une fédération ou un regroupement en France, ou toutes fédérations sur un territoire */
  /* série annuelle de licences (sexe = 'F' : licences féminines) :
     fédération ou regroupement en France, toutes fédérations sur un territoire,
     ou fédération sur une région (ou un ensemble de régions) grâce aux séries par région (v2) */
  /* cc = 1 : série à champ constant (pour les évolutions) : fédérations hors champ retirées s’il en reste d’autres */
  function codesCC(S, cc) { var M = AS.M, k = S.codes.filter(function (c) { return M.F[c] && M.F[c].cc; }); return cc && k.length ? k : S.codes; }
  AS.serie = function (S, L, sexe, cc) {
    var M = AS.M, s = M.annees.map(function () { return 0; }), ok = false, F = sexe === 'F';
    function add(arr, sg) { if (arr && arr.length) { ok = true; arr.forEach(function (v, i) { s[i] += (sg || 1) * (v || 0); }); } }
    if (L.id === 'TOT' && !S.all) codesCC(S, cc).forEach(function (c) { add(M.F[c] && (F ? M.F[c].serF : M.F[c].ser)); });
    else if (S.all) L.deps.forEach(function (d) { var t = M.T[d]; add(t && (F ? t.serF : t.ser)); if (cc && t && t.hc) add(F ? t.hcF : t.hc, -1); });
    else if (!F && L.regs && L.id !== 'TOT') codesCC(S, cc).forEach(function (c) { var f = M.F[c]; if (f && f.serR) L.regs.forEach(function (r) { add(f.serR[r] || [0]); }); });
    else return null;
    return ok ? s : null;
  };
  /* série d’une grande tranche d’âge k (0 = enfants 1-13, 1 = jeunes 14-20, 2 = adultes 21-55, 3 = seniors 56+) */
  AS.tranche = function (S, L, k, cc) {
    var M = AS.M, s = M.annees.map(function () { return 0; }), ok = false;
    function add(o) { if (o && o.trS && o.trS[k]) { ok = true; o.trS[k].forEach(function (v, i) { s[i] += v || 0; }); } }
    if (L.id === 'TOT' && !S.all) codesCC(S, cc).forEach(function (c) { add(M.F[c]); });
    else if (S.all) L.deps.forEach(function (d) { var t = M.T[d]; add(t); if (cc && t && t.hcT && t.hcT[k]) t.hcT[k].forEach(function (v, i) { s[i] -= v || 0; }); });
    else return null;
    return ok ? s : null;
  };
  /* pyramide des âges (année N) : 17 tranches de 5 ans, femmes puis hommes */
  AS.pyramide = function (S, L) {
    var M = AS.M, p = [], ok = false, i;
    for (i = 0; i < 34; i++) p.push(0);
    function add(arr) { if (arr && arr.length) { ok = true; for (var k = 0; k < 34; k++) p[k] += arr[k] || 0; } }
    if (L.id === 'TOT' && !S.all) S.codes.forEach(function (c) { add(M.F[c] && M.F[c].pyr); });
    else if (S.all) L.deps.forEach(function (d) { add(M.T[d] && M.T[d].pyr); });
    else return null;
    return ok ? { f: p.slice(0, 17), h: p.slice(17) } : null;
  };
  /* licences d’une année pour les évolutions : à champ constant (méthode INJEP) */
  AS.licAnCC = function (S, L, y) {
    var M = AS.M, g = AS.agg(S, L), e = g.cc ? g.c : g;
    if (y === M.N) return e.n; if (y === M.P) return e.p; if (y === M.R) return e.r;
    var s = AS.serie(S, L, '', 1); return s ? s[y - M.A0] : null;
  };
  /* note : fédérations hors champ constant exclues des évolutions de cet agrégat */
  AS.noteCC = function (S, L) {
    var g = AS.agg(S, L), n = Object.keys(g.hf).length;
    if (!g.cc || !n) return '';
    return '<p class=as-note>Évolutions à champ constant (méthode INJEP) : ' + (n > 1 ? n + ' fédérations hors champ constant en sont exclues' : '1 fédération hors champ constant en est exclue') + ' (' + AS.F.n0(g.hx) + ' licences en ' + AS.M.N + ', comptées dans le total).</p>';
  };
  /* licences pour une année quelconque */
  AS.licAn = function (S, L, y) {
    var M = AS.M;
    if (y === M.N) return AS.val(S, L, 'lic', 'n');
    if (y === M.P) return AS.val(S, L, 'lic', 'p');
    if (y === M.R) return AS.val(S, L, 'lic', 'r');
    var s = AS.serie(S, L); return s ? s[y - M.A0] : null;
  };

  /* ===================== Dictionnaire des noms ===================== */
  var VIDES = ' de du des la le les l d et a en au aux sur pour par un une sport sports federation francaise francais discipline disciplines associee associees '.split(' ').reduce(function (o, w) { if (w) o[w] = 1; return o; }, {});
  /* surnoms : expression -> code(s) fédération, ou G:nom de regroupement, ou L:id de lieu */
  var ALIAS = {
    /* v3 : gentilés et noms courants de territoires */
    'breton': 'L:R53', 'normand': 'L:R28', 'francilien': 'L:R11', 'occitan': 'L:R76', 'parisien': 'L:D75', 'marseillais': 'L:D13', 'lyonnais': 'L:D69',
    'toulousain': 'L:D31', 'bordelais': 'L:D33', 'lillois': 'L:D59', 'nantais': 'L:D44', 'nicois': 'L:D06', 'reunionnais': 'L:R04', 'guadeloupeen': 'L:R01',
    'martiniquais': 'L:R02', 'guyanais': 'L:R03', 'mahorais': 'L:R06', 'ultramarin': 'L:OM', 'corse du sud': 'L:D2A', 'haute corse': 'L:D2B',
    'foot': '111', 'football': '111', 'soccer': '111', 'basket': '105', 'basket ball': '105', 'hand': '115', 'hand ball': '115', 'volley ball': '129',
    'ping pong': '124', 'pingpong': '124', 'ping': '124', 'tennis de table': '124', 'gym': '113', 'gymnastique': '113', 'nage': '119', 'piscine': '119',
    'velo': '108', 'vtt': '108', 'cheval': '109', 'chevaux': '109', 'judo': '117', 'jujitsu': '117', 'ju jitsu': '117', 'kendo': '117', 'karate': '229',
    'escalade': '135', 'alpinisme': '135', 'montagne': '135', 'rando': '245', 'randonnee': '245', 'marche': '245', 'petanque': '242', 'boule': '211',
    'rugby a 13': '248', 'rugby a xiii': '248', 'rugby xiii': '248', 'jeu a xiii': '248', 'treize': '248', 'rugby a xv': '133', 'rugby a 15': '133',
    'skate': '136', 'skateboard': '136', 'roller': '136', 'kayak': '107', 'canoe': '107', 'pagaie': '107', 'athle': '101', 'course a pied': '101',
    'boxe francaise': '212', 'savate': '212', 'boxe anglaise': '106', 'boxe americaine': '268', 'kick boxing': '261', 'muay thai': '261',
    'patinage': '112', 'muscu': '114', 'musculation': '114', 'halterophilie': '114', 'plongee': '221', 'apnee': '265', 'peche': '267', 'moto': '233',
    'auto': '206', 'automobile': '206', 'para': '501', 'handisport': '501', 'sport adapte': '503', 'unss': '604', 'usep': '605', 'ugsel': '602',
    'ufolep': '413', 'epgv': '402', 'gymnastique volontaire': '402', 'gym volontaire': '402', 'bad': '103', 'tir a l arc': '126', 'archerie': '126',
    'hockey sur glace': '131', 'hockey sur gazon': '116', 'foot us': '140', 'football americain': '140', 'base ball': '138', 'softball': '138',
    'tennis': '123', 'padel': '123', 'ski': '121', 'voile': '128', 'surf': '137', 'golf': '132', 'aïkido': '204,205', 'echec': '220', 'danse': '219',
    'triathlon': '127', 'aviron': '102', 'escrime': '110', 'natation': '119', 'cyclisme': '108', 'equitation': '109', 'billard': '210', 'bowling': '213',
    'parachutisme': '237', 'speleologie': '251', 'speleo': '251', 'course d orientation': '217', 'orientation': '217', 'ultimate': '264', 'frisbee': '264',
    'twirling': '256', 'cyclotourisme': '218', 'pelote basque': '241', 'ball trap': '209', 'retraite sportive': '404', 'ucpa': '424,425', 'fsgt': '410', 'ffaaa': '204', 'ffab': '205', 'ulm': '243', 'ffrs': '404', 'ffst': '405', 'fcd': '406', 'fnsmr': '407', 'fscf': '408', 'fspn': '411', 'ufolep': '413', '2fopen': '415', 'unsll': '417', 'ffse': '418', 'ffsp': '421', 'ffco': '422', 'fnoms': '423', 'ffsu': '601', 'ffcu': '603', 'asptt': '420', 'ffepgv': '402', 'sport universitaire': '601',
    'sport collectif': 'G:Sports collectifs', 'sports collectifs': 'G:Sports collectifs', 'jeux de ballon': 'G:Sports collectifs',
    'sport de raquette': 'G:Sports raquettes', 'sports de raquettes': 'G:Sports raquettes', 'raquette': 'G:Sports raquettes',
    'sport de combat': 'G:Sports de combats', 'sports de combat': 'G:Sports de combats', 'combat': 'G:Sports de combats',
    'art martial': 'G:Arts martiaux', 'arts martiaux': 'G:Arts martiaux', 'sport nautique': 'G:Activités Nautiques', 'sports nautiques': 'G:Activités Nautiques',
    'sport aerien': 'G:Activités Aériennes', 'sports aeriens': 'G:Activités Aériennes', 'sport mecanique': 'G:Sports mécaniques', 'sports mecaniques': 'G:Sports mécaniques',
    'sport de nature': 'G:Sports de nature', 'sports de nature': 'G:Sports de nature', 'sport d opposition': 'G:Sports d’opposition',
    'olympique': 'G:Olympique', 'olympiques': 'G:Olympique', 'non olympique': 'G:Délégataire non-olympique', 'non olympiques': 'G:Délégataire non-olympique',
    'delegataire': 'G:Délégataire non-olympique', 'affinitaire': 'G:Affinitaire', 'affinitaires': 'G:Affinitaire', 'scolaire': 'G:Scolaire',
    'sport scolaire': 'G:Sport scolaire', 'universitaire': 'G:Sport universitaire', 'para sport': 'G:Para-sport', 'parasport': 'G:Para-sport',
    'generaliste': 'G:Généraliste', 'multisport': 'G:Généraliste', 'omnisport': 'G:Généraliste',
    'france': 'L:TOT', 'france entiere': 'L:TOT', 'au total': 'L:TOT', 'tous territoires': 'L:TOT', 'tout territoire': 'L:TOT', 'ensemble des territoires': 'L:TOT', 'niveau national': 'L:TOT', 'echelle nationale': 'L:TOT', 'metropole': 'L:MET', 'hexagone': 'L:MET',
    'france metropolitaine': 'L:MET', 'drom': 'L:DROM', 'dom': 'L:DROM', 'outre mer': 'L:OM', 'outremer': 'L:OM', 'dom tom': 'L:OM', 'com': 'L:COM',
    'idf': 'L:R11', 'region parisienne': 'L:R11', 'paca': 'L:R93', 'region sud': 'L:R93', 'ara': 'L:R84', 'aura': 'L:R84', 'auvergne': 'L:R84',
    'rhone alpes': 'L:R84', 'bfc': 'L:R27', 'bourgogne': 'L:R27', 'franche comte': 'L:R27', 'hdf': 'L:R32', 'nord pas de calais': 'L:R32', 'picardie': 'L:R32',
    'centre': 'L:R24', 'alsace': 'L:R44', 'lorraine': 'L:R44', 'champagne': 'L:R44', 'aquitaine': 'L:R75', 'limousin': 'L:R75', 'poitou charentes': 'L:R75',
    'languedoc': 'L:R76', 'midi pyrenees': 'L:R76', 'reunion': 'L:R04', 'la reunion': 'L:R04', 'corse': 'L:R94'
  };
  var PIEGES = ' tous populaire sportive sportif culturelle etude national nationale union loisir club vacance travail jeu course education sauvetage traineau force glace adapte physique '.split(' ').reduce(function (o, w) { if (w) o[w] = 1; return o; }, {});
  function construireDico(M) {
    var K = {}, prio = {};
    function ajoute(expr, ent, p) { var k = cle(expr); if (k.trim().length > 1 && (!prio[k] || p > prio[k])) { K[k] = ent; prio[k] = p; } }
    M.Fl.forEach(function (f) {
      var ent = { t: 'S', id: 'F' + f.code };
      ajoute(f.nom, ent, 3); ajoute(f.lib, ent, 3);
      /* chaque morceau du nom (« Judo, Jujitsu, Kendo… », « Haltérophilie, Musculation ») */
      f.nom.replace(/\(.*?\)/g, ' ').split(/,| et /).forEach(function (p) {
        var mots = norm(p).split(' ').filter(function (w) { return w && !VIDES[w]; });
        if (!mots.length) return;
        if (mots.length === 1 && (mots[0].length < 5 || PIEGES[stem(mots[0])] || PIEGES[mots[0]])) return;
        ajoute(mots.join(' '), ent, 1);
      });
      var sig = (f.nom.match(/\(([^)]+)\)/) || [])[1]; if (sig) ajoute(sig, ent, 4);
    });
    M.Sl.forEach(function (s) { if (s.type === 'grp') ajoute(s.nom, { t: 'S', id: s.id }, 2); });
    M.Ll.forEach(function (l) {
      if (l.type === 'dep' || l.type === 'region') ajoute(l.nom, { t: 'L', id: l.id }, 3);
      if (l.type === 'dep') ajoute(l.nom.replace(/^St-/, 'Saint-'), { t: 'L', id: l.id }, 3);
    });
    Object.keys(ALIAS).forEach(function (k) {
      var v = ALIAS[k], ent;
      if (v.indexOf('G:') === 0) { if (M.S['G' + v.slice(2)]) ent = { t: 'S', id: 'G' + v.slice(2) }; }
      else if (v.indexOf('L:') === 0) { if (M.L[v.slice(2)]) ent = { t: 'L', id: v.slice(2) }; }
      else {
        var codes = v.split(',').filter(function (c) { return M.F[c]; });
        if (codes.length === 1) ent = { t: 'S', id: 'F' + codes[0] };
        else if (codes.length > 1) {
          var id = 'X' + codes.join('_');
          if (!M.S[id]) { var s = { id: id, type: 'multi', nom: k.charAt(0).toUpperCase() + k.slice(1) + ' (' + codes.length + ' fédérations)', codes: codes }; M.S[id] = s; M.Sl.push(s); }
          ent = { t: 'S', id: id };
        }
      }
      if (ent) ajoute(k, ent, 5);
    });
    var E = Object.keys(K).map(function (k) { return { k: k, ent: K[k] }; });
    E.sort(function (x, y) { return y.k.length - x.k.length; });
    /* mots isolés connus, pour corriger les fautes de frappe */
    var mots = {};
    E.forEach(function (e) { var w = e.k.trim(); if (w.indexOf(' ') < 0 && w.length >= 5) mots[w] = e.ent; });
    return { E: E, mots: mots };
  }

  /* ===================== Analyse de la question ===================== */
  /* pratiques sans fédération propre dans les données */
  var NOTES = {
    'padel': 'Le padel n’a pas de fédération à part : il dépend de la Fédération française de tennis, ses licences sont comptées avec le tennis.',
    'pickleball': 'Le pickleball n’a pas de fédération à part dans les données.',
    'yoga': 'Le yoga n’a pas de fédération délégataire : il se pratique surtout hors licence ou dans les fédérations multisports.',
    'fitnes': 'Le fitness se pratique surtout en salle privée, hors licence. En club, il relève notamment de la gymnastique volontaire (FFEPGV).',
    'crossfit': 'Le CrossFit se pratique surtout en salle privée, hors licence fédérale.',
    'pilate': 'Le Pilates se pratique surtout hors licence, ou dans la gymnastique volontaire (FFEPGV).',
    'esport': 'L’e-sport n’est pas une fédération sportive agréée : il n’est pas dans les données.',
    'marathon': 'Les courses sur route relèvent de la Fédération d’athlétisme, mais beaucoup de coureurs n’ont pas de licence.'
  };
  /* mots courants jamais corrigés vers un nom de sport ou de lieu */
  var OUTILS = (' combien quel quelle quelles quels comment pourquoi depuis entre compare comparer comparaison compte licence licencie licencies femme homme'
    + ' evolution region departement federation sport classement nombre moyenne moyen habitant population annee pratique pratiquant total progression baisse hausse'
    + ' plus moins ville partout toute toutes autre autres avant apres niveau encore surtout beaucoup chaque discipline activite jeune vieux enfant senior adulte'
    + ' garcon fille monde europe indice taux densite poids tendance historique graphique courbe donnee source rapport page filtre segment bouton carte tableau'
    + ' specifique specificite feminin masculin pratiquent progresse progressent recule reculent dernier derniere premier premiere meilleur meilleure grande grand'
    + ' petite petit forte fort faible combien parle presente fiche portrait resume cette celle celui ceux leurs notre votre selection territoire territoires zone'
    + ' saison effectif nombreux nombreuse represente representent environ parmi pourcentage proportion quelque quelques peux pouvez donne donner affiche afficher').split(' ').reduce(function (o, w) { if (w) { o[w] = 1; o[stem(w)] = 1; } return o; }, {});
  AS.analyser = function (texte) {
    var M = AS.M, Dc = AS.dico, q = cle(texte), reste = q, ents = [], corr = [];
    /* 1. codes de département explicites : « le 31 », « département 64 », « (2A) » */
    q.replace(/ (?:le|du|dan le|departement|dep|dpt|en) (\d{2,3}|2a|2b) /g, function (m0, c) {
      var code = c.toUpperCase(); if (M.L['D' + code]) ents.push({ t: 'L', id: 'D' + code, pos: q.indexOf(m0) });
      return m0;
    });
    /* 2. expressions connues, la plus longue d’abord */
    Dc.E.forEach(function (e) {
      var i = reste.indexOf(e.k);
      while (i >= 0) {
        ents.push({ t: e.ent.t, id: e.ent.id, pos: i });
        reste = reste.slice(0, i) + new Array(e.k.length).join('#') + ' ' + reste.slice(i + e.k.length);
        i = reste.indexOf(e.k);
      }
    });
    /* 3. fautes de frappe sur les mots restants */
    reste.split(' ').forEach(function (w) {
      if (w.length < 5 || /\d|#/.test(w) || OUTILS[w]) return;
      var best = null, bd = 9;
      Object.keys(Dc.mots).forEach(function (k) { if (k.charAt(0) !== w.charAt(0)) return; var d = lev(w, k); if (d < bd) { bd = d; best = k; } });
      if (best && bd <= (w.length >= 9 ? 2 : 1)) { ents.push({ t: Dc.mots[best].t, id: Dc.mots[best].id, pos: q.indexOf(w) }); corr.push(best); }
    });
    ents.sort(function (x, y) { return x.pos - y.pos; });
    var S = [], L = [], vu = {};
    ents.forEach(function (e) {
      if (vu[e.id]) return; vu[e.id] = 1;
      if (e.t === 'S') S.push(M.S[e.id]); else L.push(M.L[e.id]);
    });
    /* années */
    var ans = []; q.replace(/ (20\d\d) /g, function (m0, y) { y = +y; if (y >= M.A0 && y <= M.N && ans.indexOf(y) < 0) ans.push(y); return m0; });
    if (a(q, [' an dernier ', ' annee derniere ', ' l an passe ', ' annee precedente ', ' n 1 '])) ans.push(M.P);
    if (a(q, [' covid', ' avant crise', ' crise sanitaire', ' pandemie', ' confinement', ' avant la crise'])) { if (ans.indexOf(M.R) < 0) ans.push(M.R); }
    /* nombre du classement */
    var nb = null; q.replace(/ (?:top|les|premier|premiere|dernier|derniere|meilleur|meilleure) (\d{1,2}) (?!an )/, function (m0, n) { nb = +n; return m0; });
    if (nb === null) q.replace(/ (\d{1,2}) (?:premier|premiere|dernier|derniere|plu|meilleur|meilleure|sport|federation|region|departement|discipline|activite|famille|groupe) /, function (m0, n) { nb = +n; return m0; });
    if (nb !== null && (nb < 1 || nb > 30)) nb = null;
    var notes = [];
    Object.keys(NOTES).forEach(function (k) { if (q.indexOf(' ' + k) >= 0) notes.push(NOTES[k]); });
    return { q: q, brut: texte, S: S, L: L, ans: ans, nb: nb, corr: corr, notes: notes };
  };

  /* indicateur demandé */
  /* en valeur absolue (nombre de licences) plutôt qu’en pourcentage ? */
  var ABS = [' en valeur', ' en nombre', ' en volume', ' brut', ' absolu', ' le plus de licence', ' le moins de licence', ' plus de licencie', ' licence en plus', ' licence en moin',
    ' licence gagne', ' licence perdu', ' gagne le plus de', ' perd le plus de', ' perdu le plus de', ' gagne combien', ' combien de licence en plus', ' nombre de licence gagne', ' nouvelles licence', ' nouveaux licencie'];
  var PCT = [' en pourcentage', ' pourcent', ' relatif', ' relativement', ' en proportion', ' taux d evolution', ' taux de croissance'];
  var TRANCHES = [[' enfant', ' gamin', ' moins de 14 an', ' 1 13 an'], [' les jeune', ' des jeune', ' de jeune', ' aux jeune', ' jeunes de', ' ado', ' adolescent', ' 14 20 an', ' lyceen', ' junior'],
    [' adulte', ' 21 55 an'], [' senior', ' personne agee', ' retraite', ' plus de 55 an', ' plus de 56 an', ' aine ', ' 3e age', ' troisieme age']];
  /* tranche d’âge citée comme public (« chez les jeunes », « pour les seniors ») : 1 à 4, sinon 0 */
  AS.trancheDe = function (q) {
    if (a(q, [' plus jeune', ' moins jeune', ' plus vieux', ' age moyen'])) return 0;
    for (var k = 0; k < 4; k++) if (a(q, TRANCHES[k])) return k + 1; return 0;
  };
  AS.indicateur = function (q, brut) {
    var pc = a(q, PCT) || /%/.test(brut || ''), ab = !pc && a(q, ABS);
    var tk = AS.trancheDe(q);
    if (tk) {
      var ev = a(q, [' evolu', ' progress', ' augment', ' hausse', ' baisse', ' diminu', ' recul', ' croissance', ' gagne', ' perd', ' variation', ' dynamique', ' depuis ']);
      if (ev) return (ab ? 'td' : 'te') + tk;
      return (pc || a(q, [' part ', ' proportion', ' pourcentage', ' majorit', ' surtout'])) ? 'tp' + tk : 'tn' + tk;
    }
    var fem = a(q, [' femme', ' feminin', ' fille', ' feminisation', ' feminise', ' pratiquante', ' licenciee']);
    var evo = a(q, [' se feminis', ' feminisent', ' feminisation', ' evolu', ' progress', ' augment', ' hausse', ' baisse', ' diminu', ' recul', ' croissance', ' croit', ' gagne', ' perdu', ' perd ', ' perdent', ' perde ', ' variation', ' rebond', ' chute', ' dynamique', ' grimpe', ' monte', ' depuis ']);
    var un = a(q, [' sur un an', ' 1 an', ' un an ', ' an dernier', ' annee derniere', ' l an passe', ' annuel', ' n 1 ']);
    /* licences féminines : nombre, évolution, part */
    if (fem && !a(q, [' homme', ' masculin', ' garcon'])) {
      var part = a(q, [' part ', ' proportion', ' taux de femme', ' feminis', ' mixite', ' parite', ' ratio']);
      if (evo && !un) return part && !pc ? 'fptR' : (ab || (!pc && a(q, [' nombre', ' combien'])) ? 'fdifR' : 'fevoR');
      part = part || pc;
      if (!evo && !part && (ab || a(q, [' nombre de femme', ' combien de femme', ' le plus de femme', ' plus de femme', ' moins de femme', ' licence feminine', ' licencie feminine', ' de pratiquante', ' de licenciee']))) return 'femn';
      return 'fem';
    }
    if (evo && ab && !a(q, [' femme'])) return un ? 'dif1' : 'difR';
    if (a(q, [' specificite', ' specifique', ' surrepresent', ' sur represent', ' sous represent', ' typique', ' caracteristique', ' surpondere', ' indice '])) return 'ind';
    if (a(q, [' pour 1000', ' pour 1 000', ' pour mille', ' pour 100', ' pour cent habitant', ' par habitant', ' taux de licence', ' taux de pratique', ' densite', ' rapporte a la population', ' rapport a la population', ' penetration', ' par rapport a la population', ' proportion d habitant', ' 100 habitant'])) return 'p100';
    if (a(q, [' femme', ' feminin', ' fille', ' feminisation', ' mixite', ' parite', ' homme', ' masculin', ' garcon', ' sexe ', ' genre '])) return 'fem';
    if (a(q, [' pyramide', ' age', ' vieux', ' vieille', ' ancien ', ' plus jeune', ' moins jeune', ' jeunesse', ' tranche', ' enfant', ' senior', ' adulte', ' ado '])) return 'age';
    if (a(q, [' evolu', ' progress', ' augment', ' hausse', ' baisse', ' diminu', ' recul', ' croissance', ' croit', ' gagne', ' perdu', ' perd ', ' perdent', ' perde ', ' variation', ' tendance', ' rebond', ' retrouve', ' depuis ', ' chute', ' dynamique', ' grimpe', ' monte', ' decroch', ' remont'])) {
      return un ? 'evo1' : 'evoR';
    }
    if (a(q, [' part ', ' poids', ' pourcentage', ' proportion', ' represente', ' quote part', ' pese '])) return 'part';
    if (a(q, [' habitant', ' population', ' peuple'])) return a(q, [' licence', ' licencie', ' pratiquant']) ? 'p100' : 'pop';
    return null;
  };

  /* ===================== Mise en forme ===================== */
  function n0(x) { return x == null ? '–' : Math.round(x).toLocaleString('fr-FR'); }
  function dec(x, d) { return x == null ? '–' : x.toFixed(d).replace('.', ','); }
  function pct(x, signe) {
    if (x == null || !isFinite(x)) return '–';
    var s = (Math.abs(x) * 100).toFixed(1).replace('.', ',') + String.fromCharCode(160) + '%';
    return signe ? (x > 0.0005 ? '+' : x < -0.0005 ? '−' : '') + s : s;
  }
  var LIB = { lic: 'licences', evo1: 'évolution sur 1 an', evoR: 'évolution depuis 2019', fem: 'part de femmes', p100: 'licences pour 1 000 habitants',
    part: 'part dans l’ensemble', ind: 'indice de spécificité', age: 'âge moyen', pop: 'population',
    dif1: 'licences gagnées ou perdues en 1 an', difR: 'licences gagnées ou perdues depuis 2019', femn: 'licences féminines',
    fevoR: 'évolution des licences féminines depuis 2019', fdifR: 'licences féminines gagnées depuis 2019', fptR: 'évolution de la part de femmes depuis 2019' };
  var SIGNE = { evo1: 1, evoR: 1, dif1: 1, difR: 1, fevoR: 1, fdifR: 1, fptR: 1 };
  var TNOM = ['enfants (1-13 ans)', 'jeunes (14-20 ans)', 'adultes (21-55 ans)', 'seniors (56 ans et plus)'];
  [1, 2, 3, 4].forEach(function (k) {
    var n = TNOM[k - 1];
    LIB['tn' + k] = 'licences ' + n; LIB['tp' + k] = 'part des ' + n; LIB['te' + k] = 'évolution des ' + n + ' depuis 2019'; LIB['td' + k] = 'licences ' + n + ' gagnées depuis 2019';
    SIGNE['te' + k] = 1; SIGNE['td' + k] = 1;
  });
  AS.TNOM = TNOM;
  /* indicateur dont le texte dépend de l’année de comparaison */
  function sg(v, t) { return (v > 0 ? '+' : v < 0 ? '−' : '') + t; }
  function fm(m, v) {
    switch (m) {
      case 'lic': case 'pop': return n0(v);
      case 'evo1': case 'evoR': return pct(v, true);
      case 'fem': case 'part': return pct(v);
      case 'p100': return v != null && v < 1 ? dec(v, 2) : dec(v, 1);
      case 'ind': return dec(v, 2);
      case 'age': return v == null ? '–' : dec(v, 1) + ' ans';
      case 'femn': return n0(v);
      default:
        var t = /^t([npde])[1-4]$/.exec(m || ''); if (!t) break;
        return t[1] === 'n' ? n0(v) : t[1] === 'p' ? pct(v) : t[1] === 'e' ? pct(v, true) : v == null ? '–' : sg(v, n0(Math.abs(v)));
      case 'dif1': case 'difR': case 'fdifR': return v == null ? '–' : sg(v, n0(Math.abs(v)));
      case 'fevoR': return pct(v, true);
      case 'fptR': return v == null ? '–' : sg(v, dec(Math.abs(v) * 100, 1) + String.fromCharCode(160) + 'pt');
    }
    return String(v);
  }
  /* valeur formatée et colorée (hausse en vert, baisse en rouge) */
  function fmc(m, v) { return SIGNE[m] ? '<span class=' + (cls(v) || 'as-neutre') + '>' + fm(m, v) + '</span>' : fm(m, v); }
  function cls(v) { return v == null ? '' : v > 0.0005 ? 'as-up' : v < -0.0005 ? 'as-down' : ''; }
  function b(x) { return '<b>' + x + '</b>'; }
  function evoTxt(v) { return '<span class=' + (cls(v) || 'as-neutre') + '>' + pct(v, true) + '</span>'; }

  /* tableau avec barres ; col = { t: titre, f: fonction(ligne), m: indicateur pour la barre } */
  function tableau(cols, lignes, barre) {
    var max = 0;
    if (barre) lignes.forEach(function (l) { var v = Math.abs(barre.v(l) || 0); if (v > max) max = v; });
    var h = '<table class=as-tab><thead><tr>' + cols.map(function (c, i) { return '<th' + (i ? ' class=as-num' : '') + '>' + c.t + '</th>'; }).join('') + (barre ? '<th></th>' : '') + '</tr></thead><tbody>';
    lignes.forEach(function (l) {
      h += '<tr' + (l.hl ? ' class=as-hl' : '') + '>' + cols.map(function (c, i) { return '<td' + (i ? ' class=as-num' : '') + '>' + c.f(l) + '</td>'; }).join('');
      if (barre) { var v = barre.v(l) || 0; h += '<td class=as-barre><span class=' + (v < 0 ? 'as-neg' : '') + ' style=width:' + (max ? Math.max(2, Math.round(Math.abs(v) / max * 100)) : 0) + '%></span></td>'; }
      h += '</tr>';
    });
    return h + '</tbody></table>';
  }
  function note(t) { return '<p class=as-note>' + t + '</p>'; }

  /* titre d’un classement selon l’indicateur et le sens */
  function titre(quoi, m, asc, n) {
    var fem = /régions|familles|sous-familles|fédérations/.test(quoi), e = fem ? 'es' : 's';
    var t = {
      lic: asc ? 'Les ' + quoi + ' qui comptent le moins de licences' : 'Les ' + n + ' ' + quoi + ' qui comptent le plus de licences',
      evoR: asc ? 'Les plus fortes baisses depuis ' + AS.M.R + ' (en %)' : 'Les plus fortes hausses depuis ' + AS.M.R + ' (en %)',
      evo1: asc ? 'Les plus fortes baisses sur un an (en %)' : 'Les plus fortes hausses sur un an (en %)',
      fem: asc ? 'Les ' + quoi + ' les moins féminisé' + e : 'Les ' + quoi + ' les plus féminisé' + e,
      age: asc ? 'Les ' + quoi + ' les plus jeunes (âge moyen)' : 'Les ' + quoi + ' les plus âgé' + e + ' (âge moyen)',
      p100: asc ? 'Les ' + quoi + ' avec le moins de licences pour 1 000 habitants' : 'Les ' + quoi + ' avec le plus de licences pour 1 000 habitants',
      ind: asc ? 'Les ' + quoi + ' les moins représenté' + e + ' (indice de spécificité)' : 'Les ' + quoi + ' les plus spécifiques (indice de spécificité)',
      part: asc ? 'Les ' + quoi + ' qui pèsent le moins' : 'Les ' + quoi + ' qui pèsent le plus',
      pop: 'Les ' + quoi + ' les plus peuplé' + e,
      dif1: asc ? 'Les plus fortes pertes de licences sur un an (en nombre)' : 'Les plus forts gains de licences sur un an (en nombre)',
      difR: asc ? 'Les plus fortes pertes de licences depuis ' + AS.M.R + ' (en nombre)' : 'Les plus forts gains de licences depuis ' + AS.M.R + ' (en nombre)',
      femn: asc ? 'Les ' + quoi + ' qui comptent le moins de licences féminines' : 'Les ' + quoi + ' qui comptent le plus de licences féminines',
      fevoR: asc ? 'Les plus fortes baisses des licences féminines depuis ' + AS.M.R + ' (en %)' : 'Les plus fortes hausses des licences féminines depuis ' + AS.M.R + ' (en %)',
      fdifR: asc ? 'Les plus fortes pertes de licences féminines depuis ' + AS.M.R + ' (en nombre)' : 'Les plus forts gains de licences féminines depuis ' + AS.M.R + ' (en nombre)',
      fptR: asc ? 'Les plus forts reculs de la part de femmes depuis ' + AS.M.R : 'Les plus fortes progressions de la part de femmes depuis ' + AS.M.R
    };
    var tk = /^t([npde])([1-4])$/.exec(m || '');
    if (tk) {
      var nn = TNOM[tk[2] - 1];
      return { n: 'Les ' + quoi + ' qui comptent le ' + (asc ? 'moins' : 'plus') + (/^[aeiouy]/.test(nn) ? ' d’' : ' de ') + nn, p: 'Les ' + quoi + ' où la part des ' + nn + ' est la plus ' + (asc ? 'faible' : 'forte'),
        e: 'Les plus fortes ' + (asc ? 'baisses' : 'hausses') + ' des ' + nn + ' depuis ' + AS.M.R + ' (en %)', d: 'Les plus forts ' + (asc ? 'reculs' : 'gains') + ' de licences ' + nn + ' depuis ' + AS.M.R + ' (en nombre)' }[tk[1]];
    }
    return t[m] || t.lic;
  }
  AS.F = { n0: n0, dec: dec, pct: pct, fm: fm, fmc: fmc, LIB: LIB, SIGNE: SIGNE, cls: cls, b: b, evoTxt: evoTxt, tableau: tableau, note: note, titre: titre };

  AS.pret = AS.pret || {}; AS.pret.p1 = true;
  if (AS.demarrer) AS.demarrer();
})();
