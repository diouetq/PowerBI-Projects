/* Assistant « Licences sportives » : partie 4, les questions avancées.
   Listes (« liste des fédérations olympiques »), rangs (« quel est le rang du judo ? »), deux années au choix
   (« entre 2022 et 2024 »), seuils et comptages (« fédérations de plus de 100 000 licences », « combien progressent ? »),
   critères combinés (« les plus féminins qui progressent »), homonymes (« boxe »), tranches d’âge, questions proches.
   Utilise les parties 1 à 3 (document.__as). Aucun guillemet double (le code est collé dans une chaîne DAX). */
(function () {
  'use strict';
  var D = document;
  var AS = D.__as = D.__as || {};
  var Q = AS.Q = {};
  var a = function (q, m) { return AS.a(q, m); };
  function F() { return AS.F; }
  function feds() { return AS.M.Sl.filter(function (s) { return s.type === 'fed'; }); }
  function nomL(L) { return L.court || L.nom; }
  function ord(r, fem) { return r + (r === 1 ? (fem ? '<sup>re</sup>' : '<sup>er</sup>') : '<sup>e</sup>'); }

  /* ===================== Préparation : seuils et critères combinés ===================== */
  var HAUSSE = / qui (progress|augment|monte|grimpe|gagne|croi|rebondi)[a-z]*| en (hausse|progression|croissance)/;
  var BAISSE = / qui (recul|baiss|perd|diminu|chute|decroch)[a-z]*| en (baisse|recul|declin)/;
  var AUTRE = [' feminin', ' femme', ' jeune', ' age', ' habitant', ' specifique', ' plus de licence', ' plus gros', ' plus grand', ' plus pratique', ' populaire', ' senior', ' enfant', ' licence feminine'];
  Q.prep = function (A) {
    var q = A.q, f = [], txt = [];
    /* seuil de licences : « de plus de 100 000 licences », « au moins 50 k licenciés » */
    var ms = / (?:de |avec |ayant |qui ont |qui compte )?(plu|moin|au moin|au dessu|en dessou|au dela)(?: de)? (\d[\d ]*)( k| mille| million| 000)? (?:licence|licencie|pratiquant|adherent)/.exec(q);
    if (ms) {
      var n = +ms[2].replace(/ /g, ''); var u = (ms[3] || '').trim();
      if (u === 'k' || u === 'mille') n *= 1000; if (u === 'million') n *= 1e6; if (u === '000') n *= 1000;
      var sup = !/moin|dessou/.test(ms[1]);
      f.push(function (s, L) { var v = AS.agg(s, L).n; return sup ? v > n : v < n; });
      txt.push((sup ? 'de plus de ' : 'de moins de ') + F().n0(n) + ' licences');
      q = q.replace(ms[0], ' ');
    }
    /* « qui progressent » ou « en baisse » combiné à un autre critère : devient un filtre */
    var autre = a(q.replace(HAUSSE, ' ').replace(BAISSE, ' '), AUTRE) || A.S.some(function (s) { return s.type === 'grp' || s.type === 'multi'; }) || !!ms;
    var un = a(q, [' sur un an', ' 1 an', ' an dernier']);
    if (autre && HAUSSE.test(q)) { f.push(function (s, L) { return AS.val(s, L, un ? 'evo1' : 'evoR') > 0; }); txt.push('en hausse ' + (un ? 'sur un an' : 'depuis ' + AS.M.R)); q = q.replace(HAUSSE, ' '); }
    else if (autre && BAISSE.test(q)) { f.push(function (s, L) { return AS.val(s, L, un ? 'evo1' : 'evoR') < 0; }); txt.push('en baisse ' + (un ? 'sur un an' : 'depuis ' + AS.M.R)); q = q.replace(BAISSE, ' '); }
    /* « majoritairement féminins », « plus de femmes que d’hommes » */
    if (a(q, [' majoritairement feminin', ' plus de femme que d homme', ' majorite feminine', ' majorite de femme'])) {
      f.push(function (s, L) { return AS.val(s, L, 'fem') > 0.5; }); txt.push('majoritairement féminines');
      q = q.replace(/ (majoritairement feminin\w*|plu de femme que d homme|majorite (feminine|de femme))/, ' ');
    }
    if (f.length) { A.filtre = { f: function (s, L) { return f.every(function (g) { return g(s, L); }); }, txt: txt.join(' et ') }; A.q = q.replace(/ +/g, ' '); }
    return A;
  };

  /* ===================== Aiguillage des questions avancées ===================== */
  Q.essayer = function (c) {
    var A = c.A, q = c.q, M = AS.M;
    var liste = a(q, [' liste', ' lister', ' enumere', ' quelles sont les', ' quels sont les', ' compose', ' composent', ' fait partie', ' font partie', ' appartien', ' membre', ' contient', ' comprend', ' regroupe ', ' dans quel groupe', ' quelle famille', ' quel groupe', ' quelle sous famille', ' toutes les federation', ' tous les sport']);
    var rangQ = a(q, [' rang', ' combientieme', ' combien ieme', ' quelle place', ' quelle position', ' se classe', ' classement du', ' classement de la', ' classement de l ', ' classee', ' classe t il', ' classe t elle']);
    var compte = a(q, [' combien de federation', ' combien de sport', ' nombre de federation', ' combien de discipline', ' combien de region', ' combien de departement']);
    var classQ = a(q, [' top', ' classement', ' le plus', ' la plus', ' les plus', ' le moins', ' les moins', ' progressent le plus', ' reculent le plus']);
    var S0 = c.Ss[0];
    /* 1. homonymes : question courte sur un nom qui désigne plusieurs fédérations (« boxe », « tennis ») */
    if (S0 && S0.type === 'fed' && c.Ss.length === 1 && q.trim().split(' ').length <= 2) {
      var mot = AS.norm(S0.nom).split(' ')[0], alt = feds().filter(function (s) { return s !== S0 && (' ' + AS.norm(s.nom) + ' ').indexOf(' ' + mot + ' ') >= 0; });
      if (mot.length >= 4 && alt.length) return { html: '<p>Plusieurs fédérations correspondent à « ' + A.brut.trim() + ' » : ' + [S0].concat(alt).map(function (s) { return F().b(s.nom); }).join(', ') + '. Laquelle voulez-vous ?</p>', rel: [S0].concat(alt).slice(0, 4).map(function (s) { return 'Parle-moi de ' + s.nom.split(',')[0]; }) };
    }
    /* 2. listes */
    if (liste) { var l = rListe(c, q); if (l) return l; }
    if (A.filtre && !c.m && !classQ && !compte) return rListeFiltre(c);
    /* 3. rangs */
    if (rangQ && (S0 || c.Ls.length)) return rRang(c, q);
    /* 4. deux années au choix */
    var ans = A.ans.slice().sort();
    if (ans.length >= 2 && ans[0] !== ans[ans.length - 1]) return classQ && !(S0 && S0.type === 'fed') ? rClasseAnnees(c, ans[0], ans[ans.length - 1]) : rDeuxAnnees(c, ans[0], ans[ans.length - 1]);
    /* 5. comptages avec condition */
    if (compte && (A.filtre || a(q, [' progress', ' hausse', ' augment', ' recul', ' baisse', ' perd']))) return rCompte(c, q);
    return null;
  };

  /* ===================== Listes ===================== */
  function tabFeds(lst, L, M) {
    var f = F();
    return f.tableau([{ t: 'Fédération', f: function (s) { return s.nom; } }, { t: 'Licences ' + M.N, f: function (s) { return f.n0(AS.agg(s, L).n); } },
      { t: 'Depuis ' + M.R, f: function (s) { return f.fmc('evoR', AS.val(s, L, 'evoR')); } }, { t: 'Femmes', f: function (s) { return f.pct(AS.val(s, L, 'fem')); } }], lst, { v: function (s) { return AS.agg(s, L).n; } });
  }
  function rListe(c, q) {
    var M = AS.M, f = F(), L = c.Ls[0] || M.L.TOT, S0 = c.Ss[0];
    /* classement d’une fédération dans les regroupements */
    if (S0 && S0.type === 'fed' && a(q, [' appartien', ' fait partie', ' quelle famille', ' quel groupe', ' quelle sous famille', ' dans quel groupe', ' classee'])) {
      var x = S0.f;
      return { html: '<p>' + f.b(x.lib) + ' :</p>' + f.tableau([{ t: 'Niveau', f: function (r) { return r[0]; } }, { t: 'Regroupement', f: function (r) { return r[1] || '–'; } }],
        [['Famille', x.fam], ['Sous-famille', x.sfam], ['Groupe', x.grp]]), rel: x.grp ? ['Liste des fédérations ' + (x.grp === 'Olympique' ? 'olympiques' : 'du groupe ' + x.grp)] : [], garde: { S: S0, L: M.L.TOT } };
    }
    /* membres d’un regroupement */
    if (S0 && (S0.type === 'grp' || S0.type === 'multi')) {
      var mb = feds().filter(function (s) { return S0.codes.indexOf(s.codes[0]) >= 0; });
      mb.sort(function (u, v) { return AS.agg(v, L).n - AS.agg(u, L).n; });
      var tot = AS.agg(S0, L).n;
      return { html: '<p>' + (S0.type === 'grp' ? (S0.niv.charAt(0).toUpperCase() + S0.niv.slice(1)) + ' ' + f.b(S0.nom) : f.b(S0.nom)) + ' : ' + f.b(mb.length + ' fédérations') + ', ' + f.n0(tot) + ' licences ' + L.prep + ' en ' + M.N + ' :</p>' + tabFeds(mb, L, M),
        rel: ['Quelle fédération ' + (S0.nom === 'Olympique' ? 'olympique' : 'de ce regroupement') + ' progresse le plus ?', 'Parle-moi ' + AS.N.nom(S0, 'de')], garde: { S: S0, L: L, rank: { cible: 'fed', m: 'lic', dans: S0 } } };
    }
    /* liste des regroupements d’un niveau */
    var niv = a(q, [' sous famille']) ? 'sous-famille' : a(q, [' groupe']) ? 'groupe' : a(q, [' famille', ' regroupement', ' categorie']) ? 'famille' : null;
    if (niv && !S0) {
      var gs = AS.M.Sl.filter(function (s) { return s.type === 'grp' && s.niv === niv; });
      gs.sort(function (u, v) { return AS.agg(v, L).n - AS.agg(u, L).n; });
      return { html: '<p>Les ' + gs.length + ' ' + (niv === 'groupe' ? 'groupes' : niv === 'famille' ? 'familles' : 'sous-familles') + ' de fédérations :</p>' + f.tableau([{ t: 'Regroupement', f: function (s) { return s.nom; } }, { t: 'Fédérations', f: function (s) { return s.codes.length; } },
        { t: 'Licences ' + M.N, f: function (s) { return f.n0(AS.agg(s, L).n); } }, { t: 'Depuis ' + M.R, f: function (s) { return f.fmc('evoR', AS.val(s, L, 'evoR')); } }], gs, { v: function (s) { return AS.agg(s, L).n; } }) + (gs.some(function (s) { return Object.keys(AS.agg(s, L).hf).length; }) ? f.note('Évolution depuis ' + M.R + ' à champ constant (méthode INJEP) : seules les fédérations présentes chaque année comptent ; les licences ' + M.N + ' portent sur toutes les fédérations.') : ''),
        rel: gs.slice(0, 2).map(function (s) { return 'Liste des fédérations ' + (s.nom === 'Olympique' ? 'olympiques' : 'de la ' + niv + ' ' + s.nom); }) };
    }
    /* départements d’une région */
    var L0 = c.Ls[0];
    if (L0 && L0.type !== 'dep' && a(q, [' departement']) && L0.id !== 'TOT') {
      var ds = M.Ll.filter(function (l) { return l.type === 'dep' && l.deps.every(function (d) { return L0.set[d]; }); });
      ds.sort(function (u, v) { return AS.agg(M.S.ALL, v).n - AS.agg(M.S.ALL, u).n; });
      return { html: '<p>Les ' + ds.length + ' départements ' + L0.prep + ' :</p>' + f.tableau([{ t: 'Département', f: function (l) { return nomL(l); } }, { t: 'Licences ' + M.N, f: function (l) { return f.n0(AS.agg(M.S.ALL, l).n); } },
        { t: 'Pour 1 000 hab.', f: function (l) { return f.dec(AS.val(M.S.ALL, l, 'p100'), 1); } }, { t: 'Depuis ' + M.R, f: function (l) { return f.fmc('evoR', AS.val(M.S.ALL, l, 'evoR')); } }], ds, { v: function (l) { return AS.val(M.S.ALL, l, 'p100'); } }) };
    }
    /* toutes les fédérations (d’un territoire) */
    if (!S0 && a(q, [' federation', ' sport', ' discipline'])) {
      var tout = feds().filter(function (s) { return AS.agg(s, L).n > 0 && (!c.A.filtre || c.A.filtre.f(s, L)); });
      tout.sort(function (u, v) { return AS.agg(v, L).n - AS.agg(u, L).n; });
      return { html: '<p>' + f.b(tout.length + ' fédérations') + (c.A.filtre ? ' ' + c.A.filtre.txt : '') + ' ont des licences ' + L.prep + ' en ' + M.N + (tout.length > 30 ? ' (les 30 premières) :' : ' :') + '</p>' + tabFeds(tout.slice(0, 30), L, M), rel: ['Classement des familles de sports'] };
    }
    return null;
  }
  function rListeFiltre(c) {
    var M = AS.M, f = F(), L = c.Ls[0] || M.L.TOT;
    var lst = (c.Ss[0] && c.Ss[0].type !== 'fed' ? feds().filter(function (s) { return c.Ss[0].codes.indexOf(s.codes[0]) >= 0; }) : feds()).filter(function (s) { return AS.agg(s, L).n > 0 && c.A.filtre.f(s, L); });
    lst.sort(function (u, v) { return AS.agg(v, L).n - AS.agg(u, L).n; });
    if (!lst.length) return { html: '<p>Aucune fédération ' + c.A.filtre.txt + ' ' + L.prep + ' en ' + M.N + '.</p>' };
    return { html: '<p>' + f.b(lst.length + ' fédérations') + ' ' + c.A.filtre.txt + (c.Ss[0] && c.Ss[0].type !== 'fed' ? ' dans le regroupement ' + c.Ss[0].nom : '') + ' ' + L.prep + ' en ' + M.N + (lst.length > 30 ? ' (les 30 premières) :' : ' :') + '</p>' + tabFeds(lst.slice(0, 30), L, M) };
  }

  /* ===================== Rangs ===================== */
  function rangDe(liste, cible, val) {
    var v = val(cible); if (v == null) return null;
    var vals = liste.map(val).filter(function (x) { return x != null; });
    return { r: vals.filter(function (x) { return x > v; }).length + 1, n: vals.length, v: v };
  }
  function rRang(c, q) {
    var M = AS.M, f = F(), S0 = c.Ss[0], L = c.Ls[0] || M.L.TOT;
    /* une fédération (ou un regroupement) parmi ses pairs */
    if (S0 && !S0.all) {
      var pairs = S0.type === 'grp' ? M.Sl.filter(function (s) { return s.type === 'grp' && s.niv === S0.niv; }) : feds();
      var seuil = L.id === 'TOT' ? 300 : 20;
      var vivants = pairs.filter(function (s) { return AS.agg(s, L).n >= seuil || s === S0; });
      var lignes = [['lic', 'Licences ' + M.N], ['evoR', 'Évolution depuis ' + M.R], ['evo1', 'Évolution sur 1 an'], ['difR', 'Licences gagnées depuis ' + M.R], ['fem', 'Part de femmes']];
      if (L.id !== 'TOT') lignes.push(['ind', 'Indice de spécificité']); else lignes.push(['age', 'Âge moyen (du plus jeune)']);
      var res = lignes.map(function (x) {
        var asc = x[0] === 'age';
        var r = rangDe(vivants, S0, function (s) { var v = x[0] === 'age' ? (AS.profil(s, L) || {}).age : AS.val(s, L, x[0]); return v == null ? null : asc ? -v : v; });
        return r ? { t: x[1], m: x[0], r: r, v: asc ? -r.v : r.v } : null;
      }).filter(Boolean);
      if (!res.length) return { html: '<p>Pas de données pour classer ' + S0.nom + ' ' + L.prep + '.</p>' };
      var p = res[0], quoi = S0.type === 'grp' ? S0.niv + 's' : 'fédérations';
      var voisins = vivants.slice().sort(function (u, v) { return AS.agg(v, L).n - AS.agg(u, L).n; }), i = voisins.indexOf(S0);
      var masc = S0.type === 'grp' && S0.niv === 'groupe';
      var h = '<p>' + f.b(S0.nom) + ' est ' + (masc ? 'le ' : 'la ') + f.b(ord(p.r.r, !masc)) + ' ' + (S0.type === 'grp' ? S0.niv : 'fédération') + ' ' + L.prep + ' en nombre de licences (' + f.n0(p.v) + ') sur ' + p.r.n + ' ' + quoi
        + (i > 0 ? ', juste derrière ' + voisins[i - 1].nom : '') + (i >= 0 && i < voisins.length - 1 ? (i > 0 ? ' et devant ' : ', devant ') + voisins[i + 1].nom : '') + '.</p>';
      h += f.tableau([{ t: 'Indicateur', f: function (x) { return x.t; } }, { t: 'Valeur', f: function (x) { return x.m === 'age' ? f.fm('age', x.v) : f.fmc(x.m, x.v); } }, { t: 'Rang', f: function (x) { return ord(x.r.r, true) + ' / ' + x.r.n; } }], res);
      if (L.id === 'TOT' && S0.type === 'fed') h += f.note('Classement parmi les fédérations d’au moins 300 licences.');
      return { html: h, rel: ['Top 10 des fédérations ' + L.prep, AS.N.ou(S0)], garde: { S: S0, L: L } };
    }
    /* un territoire parmi les régions ou les départements */
    var L0 = c.Ls[0], S = S0 || M.S.ALL;
    var niveau = L0.type === 'dep' ? 'dep' : 'region';
    var pairsL = M.Ll.filter(function (l) { if (l.type !== niveau) return false; if (niveau === 'dep') { var t = M.T[l.deps[0]]; return t && (t.zone === 'Métropole' || t.zone === 'DROM'); } return true; });
    var crit = [['p100', 'Licences pour 1 000 habitants'], ['lic', 'Licences ' + M.N], ['evoR', 'Évolution depuis ' + M.R], ['fem', 'Part de femmes']];
    if (S.all) crit.push(['age', 'Âge moyen']);
    var resL = crit.map(function (x) {
      var r = rangDe(pairsL, L0, function (l) { return x[0] === 'age' ? (AS.profil(S, l) || {}).age : AS.val(S, l, x[0]); });
      return r ? { t: x[1], m: x[0], r: r, v: r.v } : null;
    }).filter(Boolean);
    if (!resL.length) return null;
    var nomN = niveau === 'dep' ? 'département' : 'région', fem = niveau !== 'dep';
    var h2 = '<p>' + (S.all ? '' : S.nom + ' : ') + f.b(L0.type === 'dep' ? L0.court : S.all ? AS.N.Lieu(L0, 'le') : AS.N.lieu(L0, 'le')) + ' se classe ' + f.b(ord(resL[0].r.r, fem)) + ' ' + nomN + ' sur ' + resL[0].r.n + ' pour les licences par habitant' + (S.all ? '' : ' ' + AS.N.nom(S, 'de')) + '.</p>';
    h2 += f.tableau([{ t: 'Indicateur', f: function (x) { return x.t; } }, { t: 'Valeur', f: function (x) { return x.m === 'age' ? f.fm('age', x.v) : f.fmc(x.m, x.v); } }, { t: 'Rang', f: function (x) { return ord(x.r.r, fem) + ' / ' + x.r.n; } }], resL);
    if (a(q, [' age'])) h2 += f.note('Pour l’âge moyen, le 1<sup>er</sup> rang correspond au public le plus âgé.');
    return { html: h2, rel: ['Parle-moi ' + AS.N.lieu(L0, 'de'), 'Quelle région a le plus de licences par habitant ?'], garde: { S: S, L: L0 } };
  }

  /* ===================== Deux années au choix ===================== */
  function rDeuxAnnees(c, y1, y2) {
    var M = AS.M, f = F(), S = c.S, L = c.L;
    var v1 = AS.licAn(S, L, y1), v2 = AS.licAn(S, L, y2), c1 = AS.licAnCC(S, L, y1), c2 = AS.licAnCC(S, L, y2);
    if (v1 == null || v2 == null) return { html: '<p>Pour ce croisement, les années disponibles sont ' + M.R + ', ' + M.P + ' et ' + M.N + '. Le détail année par année existe pour une fédération tous territoires confondus ou dans une région, et pour un territoire toutes fédérations confondues.</p>' };
    var h = '<p>' + (S.all ? 'Toutes fédérations confondues' : S.nom) + ', ' + L.prep + ' : ' + f.b(f.n0(v1)) + ' licences en ' + y1 + ', ' + f.b(f.n0(v2)) + ' en ' + y2 + ', soit ' + f.fmc('evoR', c1 ? c2 / c1 - 1 : null) + ' (' + f.fmc('difR', c2 - c1) + ' licences).</p>' + AS.noteCC(S, L);
    var s = AS.serie(S, L);
    if (s) {
      var sous = s.slice(y1 - M.A0, y2 - M.A0 + 1), an = M.annees.slice(y1 - M.A0, y2 - M.A0 + 1);
      if (sous.length > 2) {
        h += AS.G.courbe([{ nom: AS.R.court(S), v: sous }], an, { ref: M.R });
        var tam = Math.pow(c2 / c1, 1 / (y2 - y1)) - 1;
        h += AS.I.phrase('Soit ' + f.pct(tam, true) + ' par an en moyenne entre ' + y1 + ' et ' + y2 + (s.indexOf(Math.max.apply(null, sous)) === y2 - M.A0 ? ' ; ' + y2 + ' est le point haut de la période.' : '.'));
      }
    }
    if (!S.all) { var e1 = AS.licAnCC(M.S.ALL, L, y1), e2 = AS.licAnCC(M.S.ALL, L, y2); if (e1 && e2) h += f.note('Ensemble des fédérations ' + L.prep + ' sur la même période : ' + f.pct(e2 / e1 - 1, true) + '.'); }
    return { html: h, rel: ['Évolution ' + (S.all ? 'des licences' : AS.N.nom(S, 'de')) + ' depuis ' + M.A0], garde: { S: S, L: L } };
  }
  function rClasseAnnees(c, y1, y2) {
    var M = AS.M, f = F(), L = c.L, dans = c.Ss[0] && c.Ss[0].type !== 'fed' ? c.Ss[0] : null;
    var nb = (c.A.nb || 5), ab = a(c.q, [' en nombre', ' en valeur', ' en volume', ' brut', ' licence gagne', ' gagne le plus de']);
    var l = feds().filter(function (s) { return !dans || dans.codes.indexOf(s.codes[0]) >= 0; }).map(function (s) {
      var v1 = AS.licAn(s, L, y1), v2 = AS.licAn(s, L, y2);
      return { s: s, a: v1, b: v2, v: v1 && v2 != null ? (ab ? v2 - v1 : v2 / v1 - 1) : null };
    }).filter(function (x) { return x.v != null && x.a >= (L.id === 'TOT' ? 300 : 20); });
    if (!l.length) return { html: '<p>Ce classement entre deux années existe tous territoires confondus et par région.</p>' };
    l.sort(function (u, v) { return c.asc ? u.v - v.v : v.v - u.v; });
    var m = ab ? 'difR' : 'evoR', pos = l.filter(function (x) { return x.v > 0; }).length;
    var h = '<p>' + (c.asc ? 'Les plus fortes baisses' : 'Les plus fortes hausses') + ' entre ' + y1 + ' et ' + y2 + (ab ? ' (en nombre de licences)' : ' (en %)') + (dans ? ' parmi les fédérations du regroupement ' + dans.nom : '') + ' ' + L.prep + ' :</p>';
    h += f.tableau([{ t: 'Fédération', f: function (x) { return x.s.nom; } }, { t: String(y1), f: function (x) { return f.n0(x.a); } }, { t: String(y2), f: function (x) { return f.n0(x.b); } }, { t: 'Évolution', f: function (x) { return f.fmc(m, x.v); } }], l.slice(0, nb), { v: function (x) { return x.v; } });
    h += AS.I.phrase(pos + ' fédérations sur ' + l.length + ' progressent entre ' + y1 + ' et ' + y2 + '.');
    return { html: h, rel: [ab ? 'Et en % ?' : 'Et en nombre de licences ?'] };
  }

  /* ===================== Comptages ===================== */
  function rCompte(c, q) {
    var M = AS.M, f = F(), L = c.L, un = a(q, [' sur un an', ' 1 an', ' an dernier']), m = un ? 'evo1' : 'evoR';
    var base = feds().filter(function (s) { return AS.agg(s, L).n > 0 && (!c.Ss[0] || c.Ss[0].type === 'fed' || c.Ss[0].codes.indexOf(s.codes[0]) >= 0); });
    var cond = c.A.filtre ? c.A.filtre.f : null, txt = c.A.filtre ? c.A.filtre.txt : '';
    if (!cond) {
      var bas = a(q, [' recul', ' baisse', ' perd']);
      cond = function (s, l) { var v = AS.val(s, l, m); return v != null && (bas ? v < 0 : v > 0); }; txt = (bas ? 'en baisse ' : 'en hausse ') + (un ? 'sur un an' : 'depuis ' + M.R);
    }
    var ok = base.filter(function (s) { return cond(s, L); });
    ok.sort(function (u, v) { return AS.agg(v, L).n - AS.agg(u, L).n; });
    var h = '<p>' + f.b(ok.length + ' fédérations sur ' + base.length) + (/^de /.test(txt) ? ' ont ' + txt.slice(3) : ' sont ' + txt) + ' ' + L.prep + (c.Ss[0] && c.Ss[0].type !== 'fed' ? ' dans le regroupement ' + c.Ss[0].nom : '') + ' (' + M.N + ').</p>';
    if (ok.length) h += '<p class=as-chapo>Les plus grosses :</p>' + tabFeds(ok.slice(0, 8), L, M);
    return { html: h, rel: ['Quelles fédérations progressent le plus depuis ' + M.R + ' ?'] };
  }

  /* ===================== Tranches d’âge ===================== */
  Q.valeurTranche = function (S, L, m) {
    var M = AS.M, f = F(), k = +m.charAt(2) - 1, nom = AS.TNOM[k], ts = AS.tranche(S, L, k);
    if (!ts) {
      var vF = AS.tranche(S, M.L.TOT, k), vT = AS.tranche(M.S.ALL, L, k);
      return '<p>Les tranches d’âge existent pour une fédération tous territoires confondus, et pour un territoire toutes fédérations confondues.</p>'
        + (vF ? '<p>' + S.nom + ', tous territoires confondus : ' + f.b(f.n0(vF[M.N - M.A0])) + ' licences ' + nom + '.</p>' : '') + (vT && L.id !== 'TOT' ? '<p>Toutes fédérations ' + L.prep + ' : ' + f.b(f.n0(vT[M.N - M.A0])) + ' licences ' + nom + '.</p>' : '');
    }
    var yN = M.N - M.A0, yR = M.R - M.A0, tot = AS.serie(S, L), part = tot && tot[yN] ? ts[yN] / tot[yN] : null;
    var h = '<p>' + (S.all ? 'Toutes fédérations confondues' : S.nom) + ', ' + L.prep + ' en ' + M.N + ' : ' + f.b(f.n0(ts[yN]) + ' licences ' + nom) + (part != null ? ', soit ' + f.b(f.pct(part)) + ' des licences' : '') + '.</p>';
    h += '<p>Depuis ' + M.R + ' : ' + f.fmc('evoR', ts[yR] ? ts[yN] / ts[yR] - 1 : null) + ' (' + f.fmc('difR', ts[yN] - ts[yR]) + ' licences), contre ' + f.fmc('evoR', AS.val(S, L, 'evoR')) + ' pour l’ensemble de ses licences.</p>';
    if (tot) h += AS.G.courbe([{ nom: nom.charAt(0).toUpperCase() + nom.slice(1), v: ts }, { nom: 'Toutes les licences', v: tot }], M.annees, { ref: M.R, base100: true }) + f.note('Courbes en base 100 = ' + M.A0 + '.');
    if (!S.all) { var ref = AS.tranche(M.S.ALL, L, k), rt = AS.serie(M.S.ALL, L); if (ref && rt && part != null) { var pa = ref[yN] / rt[yN]; h += AS.I.phrase('La part des ' + nom + ' est ' + (part > pa ? 'plus élevée' : 'plus faible') + ' que dans l’ensemble des fédérations (' + f.pct(pa) + ').'); } }
    return h;
  };

  /* ===================== Questions proches (question non comprise) ===================== */
  Q.proches = function (q) {
    var mots = q.split(' ').filter(function (w) { return w.length >= 4; });
    if (!mots.length) return [];
    var cand = [];
    Object.keys(AS.SUGG || {}).forEach(function (k) { AS.SUGG[k].forEach(function (s) { cand.push(s); }); });
    AS.M.txt.forEach(function (t) { if (t.q) cand.push(t.q); });
    return cand.map(function (s) { var c = AS.cle(s), sc = 0; mots.forEach(function (w) { if (c.indexOf(' ' + w) >= 0) sc += w.length; }); return { s: s, sc: sc }; })
      .filter(function (x) { return x.sc >= 4; }).sort(function (u, v) { return v.sc - u.sc; }).slice(0, 3).map(function (x) { return x.s; });
  };

  /* ===================== v4 : accueil selon la sélection du rapport ===================== */
  function ctxSujetQ() {
    var c = AS.ctx || {}, M = AS.M;
    if (!c.fed || !c.fed.length) return null;
    if (c.fed.length === 1 && M.S['F' + c.fed[0]]) return M.S['F' + c.fed[0]];
    if (c.mode === 'Regroupement' && M.S['G' + c.nom]) return M.S['G' + c.nom];
    return null;
  }
  function ctxLieuQ() {
    var c = AS.ctx || {}, M = AS.M;
    if (!c.ter || !c.ter.length) return null;
    var cand = M.Ll.filter(function (l) { return l.deps.length === c.ter.length && c.ter.every(function (d) { return l.set[d]; }); });
    return cand.length && cand[0].id !== 'TOT' ? cand[0] : null;
  }
  Q.accueilCtx = function () {
    var S = ctxSujetQ(), L = ctxLieuQ(), M = AS.M;
    if (!S && !L) return null;
    var N = AS.N, n = S ? AS.R.court(S) : '', le = S ? N.nom(S, 'le') : '', du = S ? N.nom(S, 'de') : '', sugg;
    if (S && L) sugg = ['Raconte-moi ' + le + ' ' + L.prep, 'Évolution ' + du + ' ' + L.prep + ' depuis ' + M.A0, 'Quel est le rang ' + du + ' ' + L.prep + ' ?', N.ou(S)];
    else if (S && S.type === 'grp') sugg = ['Liste des fédérations ' + (S.nom === 'Olympique' ? 'olympiques' : 'du regroupement ' + S.nom), 'Quelle fédération ' + (S.nom === 'Olympique' ? 'olympique' : 'du regroupement ' + S.nom) + ' progresse le plus ?', 'Raconte-moi ' + le, N.ou(S)];
    else if (S) sugg = ['Raconte-moi ' + le, 'Quel est le rang ' + du + ' ?', 'Évolution ' + du + ' depuis ' + M.A0, N.ou(S)];
    else sugg = ['Raconte-moi ' + N.lieu(L, 'le'), 'Top 10 des fédérations ' + L.prep, N.Lieu(L, 'le') + ' est combien-ième ?', 'Fédérations spécifiques ' + (L.type === 'dep' ? 'au ' + L.deps[0] : L.prep)];
    return { txt: (S ? n : '') + (S && L ? ' · ' : '') + (L ? L.nom : ''), sugg: sugg };
  };

  /* ===================== v4 : « Le saviez-vous ? » ===================== */
  Q.saviez = function () {
    var M = AS.M, f = F(), T = M.L.TOT, out = [], N = AS.N, B = function (s, a) { return f.b(N.nom(s, a)); },
      pool = feds().filter(function (s) { return s.f.grp !== 'Scolaire'; }), gros = pool.filter(function (s) { return AS.agg(s, T).n >= 10000; });
    /* fédérations scolaires et universitaires exclues : leur public (élèves, étudiants) rendrait les faits évidents */
    function top(lst, val) { var b = null, bv = -Infinity; lst.forEach(function (x) { var v = val(x); if (v != null && v > bv) { bv = v; b = x; } }); return b ? { x: b, v: bv } : null; }
    var a1 = top(gros, function (s) { return AS.val(s, T, 'evoR'); });
    if (a1) out.push({ t: 'Depuis ' + M.R + ', la plus forte progression parmi les fédérations de plus de 10 000 licences est celle ' + B(a1.x, 'de') + ' : ' + f.fmc('evoR', a1.v) + '.', q: 'Quelles fédérations progressent le plus depuis ' + M.R + ' ?' });
    var a2 = top(pool, function (s) { return AS.val(s, T, 'difR'); });
    if (a2) out.push({ t: f.b(N.Nom(a2.x, 'le')) + ' a gagné ' + f.b(f.n0(a2.v) + ' licences') + ' depuis ' + M.R + ', le plus fort gain en nombre.', q: 'Qui gagne le plus de licences depuis ' + M.R + ' en valeur ?' });
    var regs = M.Ll.filter(function (l) { return l.type === 'region'; });
    var a3 = top(regs, function (l) { return AS.val(M.S.ALL, l, 'p100'); });
    if (a3) out.push({ t: f.b(N.Lieu(a3.x, 'le')) + ' est la région qui compte le plus de licences par habitant : ' + f.dec(a3.v, 1) + ' pour 1 000 habitants, contre ' + f.dec(AS.val(M.S.ALL, T, 'p100'), 1) + ' en métropole et DROM.', q: 'Quelle région a le plus de licences par habitant ?' });
    var r = regs.filter(function (l) { return l.deps.length > 1; }); r = r[Math.floor(Math.random() * r.length)];
    if (r) { var a4 = top(pool.filter(function (s) { return AS.agg(s, r).n >= 500; }), function (s) { return AS.val(s, r, 'ind'); }); if (a4) out.push({ t: 'La fédération la plus spécifique ' + r.prep + ' est celle ' + B(a4.x, 'de') + ' : elle y pèse ' + f.dec(a4.v, 1) + ' fois plus qu’au total.', q: 'Fédérations spécifiques ' + r.prep }); }
    var a5 = top(gros, function (s) { return AS.val(s, T, 'fem'); });
    if (a5) out.push({ t: 'Parmi les fédérations de plus de 10 000 licences, la plus féminine est celle ' + B(a5.x, 'de') + ', avec ' + f.pct(a5.v) + ' de femmes.', q: 'Quelles fédérations sont les plus féminines ?' });
    var a6 = top(gros.filter(function (s) { return s.f.grp === 'Olympique' || s.f.grp === 'Délégataire non-olympique'; }), function (s) { var p = AS.profil(s, T); return p ? -p.age : null; });
    if (a6) out.push({ t: 'Parmi les fédérations sportives de plus de 10 000 licences, le public le plus jeune est celui ' + B(a6.x, 'de') + ' : ' + f.fm('age', -a6.v) + ' de moyenne d’âge, contre ' + f.fm('age', AS.profil(M.S.ALL, T).age) + ' pour l’ensemble.', q: 'Quelles fédérations ont le public le plus jeune ?' });
    var s = AS.serie(M.S.ALL, T);
    if (s && s[s.length - 1] === Math.max.apply(null, s)) out.push({ t: M.N + ' est l’année record : ' + f.b(f.n0(s[s.length - 1]) + ' licences') + ', ' + f.pct(AS.val(M.S.ALL, T, 'evoR'), true) + ' par rapport à ' + M.R + ' (à champ constant)' + ', l’année d’avant la crise sanitaire.', q: 'Évolution des licences depuis ' + M.A0 });
    var nd = gros.filter(function (x) { return AS.val(x, T, 'evoR') >= 1; }).length;
    if (nd) out.push({ t: f.b(nd + ' fédération' + (nd > 1 ? 's' : '')) + ' de plus de 10 000 licences ' + (nd > 1 ? 'ont' : 'a') + ' au moins doublé depuis ' + M.R + '.', q: 'Quelles fédérations progressent le plus depuis ' + M.R + ' ?' });
    return out.length ? out[Math.floor(Math.random() * out.length)] : null;
  };

  /* ===================== v4 : « Comment c’est calculé ? » ===================== */
  Q.methode = function (m, L, S) {
    var M = AS.M, tk = /^t[npde]([1-4])$/.exec(m || ''), r = [];
    var F_ = {
      lic: 'Nombre de licences annuelles ' + M.N + ', somme des fédérations et départements concernés.',
      evo1: 'Évolution = licences ' + M.N + ' / licences ' + M.P + ' − 1.', evoR: 'Évolution = licences ' + M.N + ' / licences ' + M.R + ' − 1. ' + M.R + ' sert de référence : c’est la dernière année avant la crise sanitaire.',
      dif1: 'Différence = licences ' + M.N + ' − licences ' + M.P + '.', difR: 'Différence = licences ' + M.N + ' − licences ' + M.R + ' (référence d’avant la crise sanitaire).',
      fem: 'Part de femmes = licences féminines / toutes les licences, non réparties comprises.', femn: 'Nombre de licences détenues par des femmes en ' + M.N + '.',
      fevoR: 'Évolution des licences féminines = licences féminines ' + M.N + ' / ' + M.R + ' − 1.', fdifR: 'Licences féminines ' + M.N + ' − licences féminines ' + M.R + '.', fptR: 'Part de femmes ' + M.N + ' − part de femmes ' + M.R + ', en points.',
      p100: 'Licences pour 1 000 habitants = licences / population Insee au 1er janvier × 1 000. Seuls les départements qui ont une population Insee comptent (les licences étrangères ou non réparties sont exclues).',
      part: 'Part = licences de la sélection / licences de toutes les fédérations sur le même territoire.', ind: 'Indice de spécificité = part de la fédération sur le territoire / sa part sur l’ensemble des licences. Au-dessus de 1, elle pèse plus que la moyenne nationale.',
      age: 'Âge moyen = moyenne des âges au 1er janvier, pondérée par le nombre de licences ; les âges non renseignés sont exclus.', pop: 'Population estimée au 1er janvier ' + M.N + ' par l’Insee.'
    };
    r.push(tk ? 'Grandes tranches d’âge INJEP au 1er janvier : enfants 1-13 ans, jeunes 14-20 ans, adultes 21-55 ans, seniors 56 ans et plus. ' + (/^te/.test(m) ? 'Évolution = licences de la tranche ' + M.N + ' / ' + M.R + ' − 1.' : /^tp/.test(m) ? 'Part = licences de la tranche / toutes les licences.' : '') : (F_[m] || F_.lic));
    if (/^(evo|dif|fevo|fdif|t[ed])/.test(m || '')) r.push('Évolutions à champ constant (méthode INJEP) : seules les ' + M.nbCC + ' fédérations présentes chaque année de ' + M.A0 + ' à ' + M.N + ' sont comptées (une fédération seule garde sa propre évolution) ; les volumes portent sur toutes les fédérations.');
    r.push('Mêmes règles que les mesures du rapport (pages Portrait et Comparer) : les chiffres sont identiques.');
    var lim = [];
    if (m === 'fem' || m === 'femn' || /^f[edp]/.test(m) || tk || m === 'age' || (L && L.id !== 'TOT')) lim.push('Les licences dont le sexe, l’âge ou le département n’est pas connu sont classées « non réparties » ; leur part varie selon les années, ce qui fragilise les comparaisons dans le temps par sexe, âge ou territoire (mise en garde de l’INJEP).');
    lim.push('Les chiffres comptent des licences et non des pratiquants : une même personne peut être licenciée dans plusieurs fédérations.');
    lim.push('Les années les plus récentes sont semi-définitives (avant géocodage).');
    return '<div class=as-calc-c><p>' + r.join(' ') + '</p><p class=as-note>Source : INJEP-MEDES, recensement des licences ' + M.A0 + '-' + M.N + (m === 'p100' || m === 'pop' ? ' ; Insee, estimations de population' : '') + '. ' + lim.join(' ') + '</p></div>';
  };

  /* ===================== v4 : fiches complètes « Raconte-moi… » ===================== */
  function kpis(l) {
    return '<div class=as-kpis>' + l.filter(function (k) { return k && k[1] != null && k[1] !== '–'; }).map(function (k) { return '<div class=as-kpi><span>' + k[0] + '</span><b>' + k[1] + '</b>' + (k[2] ? '<i>' + k[2] + '</i>' : '') + '</div>'; }).join('') + '</div>';
  }
  function titreF(t, sous) { return '<p class=as-fiche-t>' + t + '</p>' + (sous ? '<p class=as-chapo>' + sous + '</p>' : ''); }
  function sect(t) { return '<p class=as-sect>' + t + '</p>'; }
  Q.fiche = function (S) {
    var M = AS.M, f = F(), T = M.L.TOT, g = AS.agg(S, T), pr = AS.profil(S, T), txt = null;
    AS.M.txt.forEach(function (x) { if (x.cle === (S.type === 'fed' ? 'fiche:' + S.f.code : 'fiche:' + S.nom)) txt = x; });
    var rang = S.type === 'fed' ? feds().filter(function (s) { return AS.agg(s, T).n > g.n; }).length + 1 : null;
    var h = titreF(S.type === 'fed' ? S.f.lib : (S.niv ? S.niv.charAt(0).toUpperCase() + S.niv.slice(1) + ' ' : '') + S.nom,
      S.type === 'fed' ? [S.f.fam, S.f.sfam, S.f.grp].filter(Boolean).join(' · ') : S.codes.length + ' fédérations');
    h += kpis([['Licences ' + M.N, f.n0(g.n), rang ? ord(rang, true) + ' fédération' : f.pct(AS.val(S, T, 'part')) + ' du total'], ['Depuis ' + M.R, f.pct(AS.val(S, T, 'evoR'), true), f.fmc('difR', AS.val(S, T, 'difR')) + ' licences'],
      ['Femmes', f.pct(AS.val(S, T, 'fem')), 'Total : ' + f.pct(AS.val(M.S.ALL, T, 'fem'))], pr ? ['Âge moyen', f.fm('age', pr.age), 'Total : ' + f.fm('age', AS.profil(M.S.ALL, T).age)] : null]);
    if (txt) h += '<p>' + txt.rep + '</p>';
    var se = AS.serie(S, T);
    if (se) h += sect('Évolution ' + M.A0 + '-' + M.N) + AS.G.courbe([{ nom: AS.R.court(S), v: se }], M.annees, { ref: M.R }) + AS.I.serie(AS.serie(S, T, '', 1) || se, M.annees, M.R);
    var vals = {}, n = 0; M.Ll.forEach(function (l) { if (l.type === 'region') { var v = AS.val(S, l, 'p100'); if (v != null) { vals[l.reg] = v; n++; } } });
    if (n >= 3) h += sect('Où se pratique-t-' + (S.type === 'grp' ? 'on' : 'il') + ' ? Licences pour 1 000 habitants') + AS.G.carte(vals, { fmt: function (v) { return f.dec(v, 1); }, fmtc: function (v) { return f.dec(v, v < 10 ? 1 : 0); } });
    var py = AS.pyramide(S, T);
    if (py) h += sect('Qui pratique ? Pyramide des âges ' + M.N) + AS.G.pyramide(py) + AS.I.pyramide(py);
    return h + AS.I.valeur(S, T) + AS.noteCC(S, T);
  };
  Q.ficheLieu = function (L) {
    var M = AS.M, f = F(), A = M.S.ALL, T = M.L.TOT, g = AS.agg(A, L), pr = AS.profil(A, L);
    var nom = L.nom.charAt(0).toUpperCase() + L.nom.slice(1) + (L.type === 'dep' ? ' (' + L.deps[0] + ')' : '');
    var h = titreF(nom, L.type === 'dep' ? 'Département' + (AS.M.T[L.deps[0]] ? ' · ' + AS.M.T[L.deps[0]].regNom : '') : L.type === 'region' ? 'Région · ' + L.deps.length + ' département' + (L.deps.length > 1 ? 's' : '') : 'Zone');
    h += kpis([['Licences ' + M.N, f.n0(g.n), f.fmc('evoR', AS.val(A, L, 'evoR')) + ' depuis ' + M.R], L.id !== 'TOT' ? ['Pour 1 000 hab.', f.dec(AS.val(A, L, 'p100'), 1), 'Métropole et DROM : ' + f.dec(AS.val(A, T, 'p100'), 1)] : null,
      ['Femmes', f.pct(AS.val(A, L, 'fem')), 'Total : ' + f.pct(AS.val(A, T, 'fem'))], pr ? ['Âge moyen', f.fm('age', pr.age), 'Total : ' + f.fm('age', AS.profil(A, T).age)] : null]);
    var se = AS.serie(A, L);
    if (se) h += sect('Évolution ' + M.A0 + '-' + M.N) + AS.G.courbe([{ nom: L.nom, v: se }], M.annees, { ref: M.R }) + AS.I.serie(AS.serie(A, L, '', 1) || se, M.annees, M.R);
    var lst = feds().map(function (s) { return { s: s, n: AS.agg(s, L).n, i: AS.val(s, L, 'ind') }; }).filter(function (x) { return x.n; });
    lst.sort(function (u, v) { return v.n - u.n; });
    h += sect('Les fédérations les plus importantes') + f.tableau([{ t: 'Fédération', f: function (x) { return x.s.nom; } }, { t: 'Licences', f: function (x) { return f.n0(x.n); } }, { t: 'Part', f: function (x) { return f.pct(g.n ? x.n / g.n : null); } }], lst.slice(0, 5), { v: function (x) { return x.n; } });
    if (L.id !== 'TOT') {
      var sp = lst.filter(function (x) { return x.n >= (L.type === 'dep' ? 20 : 50) && x.i; }); sp.sort(function (u, v) { return v.i - u.i; });
      if (sp.length) h += sect('Les fédérations qui font la différence (indice de spécificité)') + '<p>' + sp.slice(0, 3).map(function (x) { return f.b(x.s.nom) + ' (' + f.dec(x.i, 1) + ' fois plus qu’au total)'; }).join(', ') + '.</p>';
    }
    var py = AS.pyramide(A, L);
    if (py) h += sect('Qui pratique ? Pyramide des âges ' + M.N) + AS.G.pyramide(py) + AS.I.pyramide(py);
    return h + AS.I.valeur(A, L) + AS.noteCC(A, L);
  };
  Q.ficheCroise = function (S, L) {
    var M = AS.M, f = F(), g = AS.agg(S, L);
    var vivants = feds().filter(function (s) { return AS.agg(s, L).n >= 20 || s === S; }), rang = S.type === 'fed' ? vivants.filter(function (s) { return AS.agg(s, L).n > g.n; }).length + 1 : null;
    var h = titreF(AS.R.court(S) + ' ' + L.prep, S.type === 'fed' ? S.f.lib : S.codes.length + ' fédérations');
    h += kpis([['Licences ' + M.N, f.n0(g.n), rang ? ord(rang, true) + ' fédération ' + L.prep : null], ['Depuis ' + M.R, f.pct(AS.val(S, L, 'evoR'), true), 'Total : ' + f.pct(AS.val(S, M.L.TOT, 'evoR'), true)],
      ['Pour 1 000 hab.', f.dec(AS.val(S, L, 'p100'), 1), 'Métropole et DROM : ' + f.dec(AS.val(S, M.L.TOT, 'p100'), 1)], L.id !== 'TOT' ? ['Indice de spécificité', f.dec(AS.val(S, L, 'ind'), 2), 'Femmes : ' + f.pct(AS.val(S, L, 'fem'))] : null]);
    var se = AS.serie(S, L);
    if (se) h += sect('Évolution ' + M.A0 + '-' + M.N) + AS.G.courbe([{ nom: AS.R.court(S), v: se }], M.annees, { ref: M.R }) + AS.I.serie(AS.serie(S, L, '', 1) || se, M.annees, M.R);
    var ds = M.Ll.filter(function (l) { return l.type === 'dep' && L.type !== 'dep' && l.deps.every(function (d) { return L.set[d]; }); });
    if (ds.length > 1) {
      var dl = ds.map(function (l) { return { L: l, v: AS.val(S, l, 'p100'), n: AS.agg(S, l).n }; }).filter(function (x) { return x.n; }); dl.sort(function (u, v) { return v.v - u.v; });
      h += sect('Par département') + f.tableau([{ t: 'Département', f: function (x) { return x.L.court; } }, { t: 'Licences', f: function (x) { return f.n0(x.n); } }, { t: 'Pour 1 000 hab.', f: function (x) { return f.dec(x.v, 1); } }], dl.slice(0, 8), { v: function (x) { return x.v; } });
    }
    return h + AS.I.valeur(S, L) + AS.noteCC(S, L);
  };

  AS.pret = AS.pret || {}; AS.pret.p4 = true;
  if (AS.demarrer) AS.demarrer();
})();
