/* Assistant « Licences sportives » : partie 3, les mini-graphiques (SVG) et les phrases d’analyse.
   Utilise le moteur (partie 1, document.__as). Aucun guillemet double (le code est collé dans une chaîne DAX).
   Graphiques : courbe des années, carte de France en tuiles (régions), pyramide des âges.
   Analyse : une phrase de lecture automatique ajoutée sous les réponses chiffrées. */
(function () {
  'use strict';
  var D = document;
  var AS = D.__as = D.__as || {};
  /* icônes de l’interface (utilisées par la partie 2) (dessins originaux, SVG en ligne) */
  AS.ICO = {
    etoile: "<svg viewBox='0 0 24 24' width='24' height='24'><path d='M12 2l2.2 6.3L20.5 10.5l-6.3 2.2L12 19l-2.2-6.3L3.5 10.5l6.3-2.2z' fill='#fff'/><path d='M19 15l.9 2.1 2.1.9-2.1.9L19 21l-.9-2.1L16 18l2.1-.9z' fill='#fff' opacity='.85'/></svg>",
    mini: "<svg viewBox='0 0 24 24' width='18' height='18'><path d='M12 3l2 5.6 5.6 2-5.6 2L12 18.2l-2-5.6-5.6-2 5.6-2z' fill='#fff'/></svg>",
    nouv: "<svg viewBox='0 0 24 24' width='20' height='20' fill='none' stroke='currentColor' stroke-width='2.2' stroke-linecap='round' stroke-linejoin='round'><path d='M20 11a8 8 0 1 0-2.3 5.7'/><path d='M20 4v7h-7'/></svg>",
    envoi: "<svg viewBox='0 0 24 24' width='20' height='20'><path d='M3.4 11.1L19.6 4c.8-.3 1.5.4 1.2 1.2l-7.1 16.2c-.3.8-1.5.7-1.7-.1l-1.6-6.5-6.5-1.6c-.8-.2-.9-1.4-.1-1.7z' fill='#fff'/></svg>",
    cible: "<svg viewBox='0 0 24 24' width='18' height='18' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round'><circle cx='12' cy='12' r='8'/><circle cx='12' cy='12' r='3'/><path d='M12 1v3M12 20v3M1 12h3M20 12h3'/></svg>",
    ampoule: "<svg viewBox='0 0 24 24' width='18' height='18' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M9 18h6M10 21h4'/><path d='M12 3a6 6 0 0 0-3.6 10.8c.6.5 1 1.2 1 2V16h5.2v-.2c0-.8.4-1.5 1-2A6 6 0 0 0 12 3z'/></svg>",
    info: "<svg viewBox='0 0 24 24' width='16' height='16' fill='none' stroke='currentColor' stroke-width='2'><circle cx='12' cy='12' r='9'/><path d='M12 11v6M12 7.5v.5' stroke-linecap='round'/></svg>",
    fiole: "<svg viewBox='0 0 24 24' width='18' height='18' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M9 3h6M10 3v6l-5 9a2 2 0 0 0 1.8 3h10.4a2 2 0 0 0 1.8-3l-5-9V3'/><path d='M7.5 15h9'/></svg>",
    robot: "<svg viewBox='0 0 100 100' width='84' height='84'><defs><linearGradient id='asG' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='#ffffff'/><stop offset='1' stop-color='#E3E7FF'/></linearGradient></defs>" +
      "<path d='M50 6l2 5.5 5.5 2-5.5 2L50 21l-2-5.5-5.5-2 5.5-2z' fill='#7C5CF6'/><line x1='50' y1='20' x2='50' y2='28' stroke='#4361EE' stroke-width='3'/>" +
      "<rect x='10' y='44' width='9' height='18' rx='4' fill='#4361EE'/><rect x='81' y='44' width='9' height='18' rx='4' fill='#4361EE'/>" +
      "<rect x='16' y='27' width='68' height='54' rx='22' fill='url(#asG)' stroke='#C9CFFB' stroke-width='2'/>" +
      "<rect x='25' y='38' width='50' height='30' rx='14' fill='#0B1C4F'/>" +
      "<ellipse cx='40' cy='51' rx='5' ry='6' fill='#5EEAD4'/><ellipse cx='60' cy='51' rx='5' ry='6' fill='#5EEAD4'/>" +
      "<path d='M43 60q7 5 14 0' stroke='#5EEAD4' stroke-width='3' fill='none' stroke-linecap='round'/>" +
      "<path d='M32 81h36l-4 12H36z' fill='#4361EE'/><circle cx='50' cy='87' r='3' fill='#fff'/></svg>"
  };
  /* ===================== noms avec article (« le football », « de la natation », « l’UNSS ») =====================
     Genre et libellé de chaque fédération : m (masculin), f (féminin), lm / lf (élision « l’ »), p / pf (pluriel).
     Libellé vide = nom court de la fédération en minuscules. */
  var GENRE = ('101:lm|102:lm|106:f|109:lf|110:lf|112:p|113:f|114:lf|118:f|119:f|128:f|135:f|201:lm|202:lf|203:lf|204:f:FFAAA (aïkido, aïkibudo, kinomichi)|205:f:FFAB (budo)|'
    + '212:f|213:m:bowling et sport de quilles|215:f|216:f|217:f|219:f|220:p|221:p:sports sous-marins|224:lm|228:f|231:f|241:f|242:f:pétanque et jeu provençal|243:m:planeur ultraléger motorisé (ULM)|244:f|245:f|249:m:sauvetage et secourisme|251:f|254:p|255:p:sports de traîneau et canicross|'
    + '265:f|266:f:force athlétique|267:pf|268:f|269:pf:voitures radio commandées|270:p:sports et loisirs canins|271:p:clubs alpins et de montagne|402:f:FFEPGV|403:f:fédération Sports pour tous|404:f:FFRS (retraite sportive)|'
    + '405:f:FFST (sport travailliste)|406:f:FCD (clubs de la Défense)|407:f:FNSMR (sport en milieu rural)|408:f:fédération sportive et culturelle de France (FSCF)|409:f:fédération Maccabi|410:f:FSGT|411:f:fédération sportive de la police nationale|413:lf:UFOLEP|'
    + '415:f:2FOPEN|417:lf:Union nationale sportive Léo Lagrange|418:f:FFSE (sport d’entreprise)|420:f:fédération des ASPTT|421:f:FFSP (sports populaires)|422:f:FFCO (clubs omnisports)|423:f:FNOMS (offices municipaux des sports)|'
    + '424:lf:UCPA Sport Loisirs|425:lf:UCPA Sport Vacances|426:f:fédération sportive LGBT+|501:m:handisport|503:m:sport adapté|601:f:FFSU (sport universitaire)|602:lf:UGSEL|603:f:FFCU (clubs universitaires)|604:lf:UNSS|605:lf:USEP')
    .split('|').reduce(function (o, x) { var p = x.split(':'); o[p[0]] = { g: p[1], l: p.slice(2).join(':') }; return o; }, {});
  var N = AS.N = {};
  N.info = function (S) {
    if (!S || S.all) return { g: 'lm', l: 'ensemble des fédérations' };
    if (S.type === 'multi') return { g: 'f', l: 'sélection (' + S.codes.length + ' fédérations)' };
    if (S.type === 'grp') return S.nom === 'Olympique' ? { g: 'pf', l: 'fédérations olympiques' } : S.niv === 'groupe' ? { g: 'pf', l: 'fédérations du groupe « ' + S.nom + ' »' } : { g: 'f', l: S.niv + ' « ' + S.nom + ' »' };
    var x = GENRE[S.f.code] || { g: 'm', l: '' }, lab = x.l || S.nom.split(/,| et | \(/)[0].trim().toLowerCase().replace(/ xiii$/, ' XIII');
    return { g: x.g, l: lab };
  };
  /* f : 'le' (le football), 'de' (du football), 'a' (au football), '' (football) */
  N.nom = function (S, f) {
    var x = N.info(S), g = x.g, l = x.l;
    if (!f) return l;
    var A = { le: { m: 'le ', f: 'la ', lm: 'l’', lf: 'l’', p: 'les ', pf: 'les ' }, de: { m: 'du ', f: 'de la ', lm: 'de l’', lf: 'de l’', p: 'des ', pf: 'des ' }, a: { m: 'au ', f: 'à la ', lm: 'à l’', lf: 'à l’', p: 'aux ', pf: 'aux ' } };
    return A[f][g] + l;
  };
  N.Nom = function (S, f) { var t = N.nom(S, f); return t.charAt(0).toUpperCase() + t.slice(1); };
  N.fem = function (S) { var g = N.info(S).g; return g === 'f' || g === 'lf' || g === 'pf'; };
  N.plur = function (S) { var g = N.info(S).g; return g === 'p' || g === 'pf'; };
  /* territoires : « la Bretagne », « les Hauts-de-France », « le 29 » */
  var GL = { TOT: 'lm:ensemble des territoires', MET: 'f:métropole', DROM: 'p:DROM', COM: 'p:COM', OM: 'lm:outre-mer', MDR: 'f:métropole et les DROM', R11: 'lf', R24: 'm', R27: 'f', R28: 'f', R32: 'p', R44: 'm', R52: 'p', R53: 'f', R75: 'f', R76: 'lf', R84: 'lf', R93: 'f', R94: 'f', R01: 'f', R02: 'f', R03: 'f', R04: '0', R06: '0' };
  N.lieu = function (L, f) {
    if (L.type === 'dep') return { le: 'le ', de: 'du ', a: 'au ' }[f || 'le'] + L.deps[0];
    var x = (GL[L.id] || 'f').split(':'), g = x[0], l = x[1] || L.nom;
    if (g === '0') return { le: '', de: 'de ', a: 'à ' }[f || 'le'] + l;
    return { le: { m: 'le ', f: 'la ', lm: 'l’', lf: 'l’', p: 'les ' }, de: { m: 'du ', f: 'de la ', lm: 'de l’', lf: 'de l’', p: 'des ' }, a: { m: 'au ', f: 'à la ', lm: 'à l’', lf: 'à l’', p: 'aux ' } }[f || 'le'][g] + l;
  };
  N.Lieu = function (L, f) { var t = N.lieu(L, f); return t.charAt(0).toUpperCase() + t.slice(1); };
  /* « Où le football est-il le plus pratiqué ? » */
  N.ou = function (S) {
    if (!S || S.all) return 'Quelle région a le plus de licences par habitant ?';
    var fe = N.fem(S), pl = N.plur(S);
    return 'Où ' + N.nom(S, 'le') + (pl ? ' sont-' : ' est-') + (fe ? 'elle' : 'il') + (pl ? 's' : '') + ' le plus pratiqué' + (fe ? 'e' : '') + (pl ? 's' : '') + ' ?';
  };
  var G = AS.G = {}, I = AS.I = {};
  var COUL = ['#4361EE', '#7C5CF6', '#98A2B3', '#0EA5E9'];

  function n0(x) { return x == null ? '–' : Math.round(x).toLocaleString('fr-FR'); }
  function court(x) {
    if (x == null) return '–';
    var v = Math.abs(x);
    if (v >= 1e6) return (x / 1e6).toFixed(v >= 1e7 ? 0 : 1).replace('.', ',') + ' M';
    if (v >= 1e4) return Math.round(x / 1e3) + ' k';
    if (v >= 1e3) return (x / 1e3).toFixed(1).replace('.', ',') + ' k';
    return String(Math.round(x));
  }
  function at(v) { return "'" + v + "'"; }  /* valeur d’attribut entre apostrophes (jamais de guillemets doubles) */
  function esc(t) { return String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;'); }
  function pctS(x) { return x == null ? '–' : (x > 0.0005 ? '+' : x < -0.0005 ? '−' : '') + (Math.abs(x) * 100).toFixed(1).replace('.', ',') + String.fromCharCode(160) + '%'; }

  /* ===================== Courbe des années =====================
     series : [{ nom, v: [valeurs par année] }], annees : [2016…], o : { ref: 2019, base100: bool } */
  G.courbe = function (series, annees, o) {
    o = o || {};
    var W = 640, H = 210, gx = 46, dx = 14, hy = 16, by = 28, n = annees.length;
    var data = series.map(function (s) {
      if (!o.base100) return s.v;
      var b = s.v[0]; return s.v.map(function (v) { return b ? v / b * 100 : null; });
    });
    var tout = []; data.forEach(function (d) { d.forEach(function (v) { if (v != null) tout.push(v); }); });
    if (!tout.length) return '';
    var mn = Math.min.apply(null, tout), mx = Math.max.apply(null, tout);
    if (!o.base100) mn = Math.min(mn, mx * 0.75);
    var pad = (mx - mn) * 0.12 || mx * 0.1 || 1; mn = Math.max(0, mn - pad); mx = mx + pad;
    var X = function (i) { return gx + (W - gx - dx) * (n === 1 ? 0.5 : i / (n - 1)); };
    var Y = function (v) { return hy + (H - hy - by) * (1 - (v - mn) / (mx - mn)); };
    var h = '<svg class=as-svg viewBox=0,0,' + W + ',' + H + ' role=img>';
    /* bande Covid et repère de l’année de référence */
    var iC = annees.indexOf(2020), iC2 = annees.indexOf(2021);
    if (iC >= 0 && iC2 >= 0) h += '<rect x=' + (X(iC) - 10) + ' y=' + hy + ' width=' + (X(iC2) - X(iC) + 20) + ' height=' + (H - hy - by) + ' fill=#F2F4F7 rx=6></rect><text x=' + ((X(iC) + X(iC2)) / 2) + ' y=' + (hy + 12) + ' class=as-ax text-anchor=middle>Covid</text>';
    for (var k = 0; k <= 3; k++) {
      var gv = mn + (mx - mn) * k / 3, yy = Y(gv);
      h += '<line x1=' + gx + ' x2=' + (W - dx) + ' y1=' + yy + ' y2=' + yy + ' stroke=#EAECF0></line><text x=' + (gx - 6) + ' y=' + (yy + 4) + ' class=as-ax text-anchor=end>' + (o.base100 ? Math.round(gv) : court(gv)) + '</text>';
    }
    annees.forEach(function (an, i) { if (n <= 12 || i % 2 === 0 || i === n - 1) h += '<text x=' + X(i) + ' y=' + (H - 8) + ' class=as-ax text-anchor=middle>' + an + '</text>'; });
    var iR = annees.indexOf(o.ref);
    if (iR >= 0) h += '<line x1=' + X(iR) + ' x2=' + X(iR) + ' y1=' + hy + ' y2=' + (H - by) + ' stroke=#B9AEFB stroke-dasharray=4,4></line>';
    data.forEach(function (d, j) {
      var c = COUL[j % COUL.length], pts = [];
      d.forEach(function (v, i) { if (v != null) pts.push(X(i).toFixed(1) + ',' + Y(v).toFixed(1)); });
      if (j === 0 && data.length === 1) h += '<polygon points=' + at(X(0).toFixed(1) + ',' + (H - by) + ' ' + pts.join(' ') + ' ' + X(n - 1).toFixed(1) + ',' + (H - by)) + ' fill=' + c + ' opacity=.08></polygon>';
      h += '<polyline points=' + at(pts.join(' ')) + ' fill=none stroke=' + c + ' stroke-width=3 stroke-linejoin=round stroke-linecap=round></polyline>';
      d.forEach(function (v, i) {
        if (v == null) return;
        var der = i === n - 1;
        h += '<circle cx=' + X(i).toFixed(1) + ' cy=' + Y(v).toFixed(1) + ' r=' + (der ? 5 : 3.5) + ' fill=' + (der ? c : '#fff') + ' stroke=' + c + ' stroke-width=2><title>' + esc(series[j].nom) + ' · ' + annees[i] + ' : ' + (o.base100 ? Math.round(v) : n0(v)) + '</title></circle>';
      });
    });
    h += '</svg>';
    if (series.length > 1) h += '<div class=as-leg>' + series.map(function (s, j) { return '<span><i style=background:' + COUL[j % COUL.length] + '></i>' + esc(s.nom) + '</span>'; }).join('') + '</div>';
    return '<div class=as-graph>' + h + '</div>';
  };

  /* ===================== Carte de France en tuiles (régions) =====================
     vals : { code région : valeur }, o : { fmt: fonction, div: bool (échelle divergente), sel: code } */
  var TUILES = [['28', 1, 0, 'Normandie'], ['32', 2, 0, 'Hauts-de-France'], ['53', 0, 1, 'Bretagne'], ['52', 1, 1, 'Pays de la Loire'], ['11', 2, 1, 'Île-de-France'],
    ['44', 3, 1, 'Grand Est'], ['75', 0, 2, 'Nouvelle-Aquitaine'], ['24', 1, 2, 'Centre-Val de Loire'], ['27', 2, 2, 'Bourgogne-Franche-Comté'], ['84', 3, 2, 'Auvergne-Rhône-Alpes'],
    ['76', 1, 3, 'Occitanie'], ['93', 3, 3, 'Provence-Alpes-Côte d’Azur'], ['94', 4, 3, 'Corse']];
  var ABR = { '28': 'NOR', '32': 'HDF', '53': 'BRE', '52': 'PDL', '11': 'IDF', '44': 'GES', '75': 'NAQ', '24': 'CVL', '27': 'BFC', '84': 'ARA', '76': 'OCC', '93': 'PACA', '94': 'COR',
    '01': 'GUA', '02': 'MTQ', '03': 'GUY', '04': 'RÉU', '06': 'MAY' };
  var DROM = [['01', 'Guadeloupe'], ['02', 'Martinique'], ['03', 'Guyane'], ['04', 'La Réunion'], ['06', 'Mayotte']];
  function mix(c1, c2, t) {
    var a = [1, 3, 5].map(function (i) { return parseInt(c1.substr(i, 2), 16); }), b = [1, 3, 5].map(function (i) { return parseInt(c2.substr(i, 2), 16); });
    return 'rgb(' + a.map(function (x, i) { return Math.round(x + (b[i] - x) * t); }).join(',') + ')';
  }
  G.carte = function (vals, o) {
    o = o || {};
    var liste = Object.keys(vals).filter(function (k) { return vals[k] != null; }).map(function (k) { return vals[k]; });
    if (liste.length < 3) return '';
    var mn = Math.min.apply(null, liste), mx = Math.max.apply(null, liste), lim = Math.max(Math.abs(mn), Math.abs(mx)) || 1;
    var fond = function (v) {
      if (v == null) return '#F2F4F7';
      if (o.div) return v >= 0 ? mix('#ECFDF3', '#067647', Math.min(1, v / lim)) : mix('#FEF3F2', '#B42318', Math.min(1, -v / lim));
      return mix('#EEF1FE', '#3A2DB8', mx > mn ? (v - mn) / (mx - mn) : 0.5);
    };
    var clair = function (v) { return v == null ? true : o.div ? Math.abs(v) / lim < 0.55 : (mx > mn ? (v - mn) / (mx - mn) : 0.5) < 0.55; };
    var tw = 100, th = 54, g = 6, W = 5 * tw + 4 * g, H = 4 * th + 3 * g;
    var h = '<svg class=as-svg viewBox=0,0,' + W + ',' + (H + th * 0.8 + 16) + ' role=img>';
    function tuile(code, x, y, w, hh, nom) {
      var v = vals[code], c = fond(v), t = clair(v) ? '#0B1C4F' : '#fff', sel = o.sel === code;
      return '<g><title>' + esc(nom) + ' : ' + (v == null ? 'non disponible' : (o.fmt ? o.fmt(v) : n0(v))) + '</title><rect x=' + x + ' y=' + y + ' width=' + w + ' height=' + hh + ' rx=10 fill=' + c + (sel ? ' stroke=#0B1C4F stroke-width=3' : '') + '></rect>'
        + '<text x=' + (x + w / 2) + ' y=' + (y + hh * 0.42) + ' text-anchor=middle class=as-tk fill=' + t + '>' + ABR[code] + '</text>'
        + '<text x=' + (x + w / 2) + ' y=' + (y + hh * 0.78) + ' text-anchor=middle class=as-tv fill=' + t + '>' + (v == null ? '–' : (o.fmtc ? o.fmtc(v) : court(v))) + '</text></g>';
    }
    TUILES.forEach(function (t) { h += tuile(t[0], t[1] * (tw + g), t[2] * (th + g), tw, th, t[3]); });
    var y2 = H + 16, w2 = (W - 4 * g) / 5;
    DROM.forEach(function (d, i) { h += tuile(d[0], i * (w2 + g), y2, w2, th * 0.8, d[1]); });
    h += '</svg>';
    var lg = o.div ? '<span class=as-ech style=background:linear-gradient(90deg,#B42318,#FEF3F2,#ECFDF3,#067647)></span>' : '<span class=as-ech style=background:linear-gradient(90deg,#EEF1FE,#3A2DB8)></span>';
    h += '<div class=as-leg><span>' + (o.fmtc ? o.fmtc(o.div ? -lim : mn) : court(mn)) + '</span>' + lg + '<span>' + (o.fmtc ? o.fmtc(o.div ? lim : mx) : court(mx)) + '</span></div>';
    return '<div class=' + at('as-graph as-carte') + '>' + h + '</div>';
  };

  /* ===================== Pyramide des âges =====================
     p : { f: [17], h: [17] } (0-4 … 80 et plus) */
  G.pyramide = function (p) {
    if (!p) return '';
    var mx = Math.max.apply(null, p.f.concat(p.h)); if (!mx) return '';
    var W = 520, rh = 12, gap = 2, mid = 260, lab = 30, H = 17 * (rh + gap) + 26;
    var w = function (v) { return (mid - lab - 6) * v / mx; };
    var h = '<svg class=as-svg viewBox=0,0,' + W + ',' + H + ' role=img>';
    for (var i = 16; i >= 0; i--) {
      var y = (16 - i) * (rh + gap), et = i === 16 ? '80+' : (i * 5) + '-' + (i * 5 + 4);
      h += '<rect x=' + (mid - lab - w(p.f[i])).toFixed(1) + ' y=' + y + ' width=' + w(p.f[i]).toFixed(1) + ' height=' + rh + ' rx=3 fill=#7C5CF6><title>Femmes ' + et + ' ans : ' + n0(p.f[i]) + '</title></rect>';
      h += '<rect x=' + (mid + lab) + ' y=' + y + ' width=' + w(p.h[i]).toFixed(1) + ' height=' + rh + ' rx=3 fill=#0EA5E9><title>Hommes ' + et + ' ans : ' + n0(p.h[i]) + '</title></rect>';
      if (i % 2 === 0 || i === 16) h += '<text x=' + mid + ' y=' + (y + rh - 2) + ' text-anchor=middle class=as-ax>' + et + '</text>';
    }
    var tf = p.f.reduce(function (s, v) { return s + v; }, 0), tm = p.h.reduce(function (s, v) { return s + v; }, 0);
    h += '<text x=' + (mid - lab - 4) + ' y=' + (H - 6) + ' text-anchor=end class=as-tk fill=#7C5CF6>Femmes ' + court(tf) + '</text><text x=' + (mid + lab + 4) + ' y=' + (H - 6) + ' class=as-tk fill=#0EA5E9>Hommes ' + court(tm) + '</text>';
    return '<div class=as-graph>' + h + '</svg></div>';
  };

  /* ===================== Phrases d’analyse ===================== */
  function phrase(t) { return t ? '<p class=as-analyse>' + AS.ICO.ampoule + '<span>' + t + '</span></p>' : ''; }
  I.phrase = phrase;

  /* lecture d’une série annuelle */
  I.serie = function (s, annees, R) {
    if (!s || s.length < 3) return '';
    var n = s.length, a0 = annees[0], aN = annees[n - 1], v0 = s[0], vN = s[n - 1];
    if (!v0 || !vN) return '';
    var tam = Math.pow(vN / v0, 1 / (n - 1)) - 1, iR = annees.indexOf(R), i21 = annees.indexOf(2021), i20 = annees.indexOf(2020);
    var t = 'Sur ' + (n - 1) + ' ans, la tendance est de ' + pctS(tam) + ' par an en moyenne';
    if (iR >= 0 && i21 >= 0 && s[iR]) {
      var creux = Math.min(s[i20] || s[iR], s[i21]) / s[iR] - 1;
      if (creux < -0.05) t += ' ; la crise sanitaire a coûté ' + pctS(creux) + ' par rapport à ' + R + ', et ' + (vN >= s[iR] ? 'le niveau d’avant-crise est retrouvé (' + pctS(vN / s[iR] - 1) + ')' : 'le niveau d’avant-crise n’est pas encore retrouvé (' + pctS(vN / s[iR] - 1) + ')');
      else if (vN / s[iR] - 1 > 0.05) t += ' ; la crise sanitaire n’a pas freiné la croissance';
    }
    var iMax = s.indexOf(Math.max.apply(null, s));
    t += iMax === n - 1 ? '. ' + aN + ' est l’année record.' : '.';
    return phrase(t);
  };

  /* lecture d’un classement : écart entre les premiers, concentration, nombre en hausse */
  I.classement = function (l, m, total, quoi) {
    if (!l || l.length < 2) return '';
    var v0 = l[0].v, v1 = l[1].v, t = '';
    var nom = function (x, deb) { return x.s ? (deb ? N.Nom(x.s, 'le') : N.nom(x.s, 'le')) : x.L.type === 'dep' ? (x.L.court || x.L.nom) : (deb ? N.Lieu(x.L, 'le') : N.lieu(x.L, 'le')); };
    var vb = function (x, v) { var p = x.s ? N.plur(x.s) : /^p/.test(GL[x.L.id] || ''); return p ? v + 'nt' : v; };
    if (m === 'lic' || m === 'femn') {
      var s3 = 0; l.slice(0, 3).forEach(function (x) { s3 += x.v; });
      t = nom(l[0], 1) + ' ' + vb(l[0], 'devance') + ' ' + nom(l[1]) + ' de ' + n0(v0 - v1) + ' licences' + (total ? ' ; les trois premiers réunissent ' + pctS(s3 / total).replace('+', '') + ' du total' : '') + '.';
    } else if (AS.F.SIGNE[m]) {
      var pos = total && total.pos != null ? total.pos : null;
      t = nom(l[0], 1) + ' ' + vb(l[0], 'arrive') + ' en tête (' + AS.F.fm(m, v0) + ')' + (v1 != null ? ', devant ' + nom(l[1]) + ' (' + AS.F.fm(m, v1) + ')' : '') + '.' + (pos != null ? ' Au total, ' + pos + ' ' + quoi + ' sur ' + total.n + ' sont en hausse.' : '');
    } else {
      var pts = m === 'fem' || m === 'part';
      t = nom(l[0], 1) + ' ' + vb(l[0], 'arrive') + ' en tête avec ' + AS.F.fm(m, v0) + ', ' + (v1 == null ? 'loin devant' : pts ? (Math.abs(v0 - v1) * 100).toFixed(1).replace('.', ',') + (v0 >= v1 ? ' points de plus que ' : ' points de moins que ') + nom(l[1]) : 'soit ' + pctS(Math.abs(v0 / v1 - 1)).replace('+', '') + (v0 >= v1 ? ' de plus que ' : ' de moins que ') + nom(l[1])) + '.';
    }
    return phrase(t);
  };

  /* lecture d’une valeur : rang, comparaison à l’ensemble et au territoire */
  I.valeur = function (S, L) {
    var M = AS.M, g = AS.agg(S, L), t = [];
    if (!g.n) return '';
    var eR = AS.val(S, L, 'evoR'), eA = AS.val(M.S.ALL, L, 'evoR');
    if (!S.all && eR != null && eA != null) t.push('depuis ' + M.R + ', ' + (eR > eA + 0.01 ? 'la progression est plus forte que celle de l’ensemble des fédérations (' + pctS(eA) + ')' : eR < eA - 0.01 ? 'l’évolution est moins favorable que celle de l’ensemble des fédérations (' + pctS(eA) + ')' : 'l’évolution suit celle de l’ensemble des fédérations (' + pctS(eA) + ')'));
    if (!S.all && S.type === 'fed') {
      var rang = M.Sl.filter(function (s) { return s.type === 'fed'; }).filter(function (s) { return AS.agg(s, L).n > g.n; }).length + 1;
      t.unshift('c’est la ' + rang + (rang === 1 ? '<sup>re</sup>' : '<sup>e</sup>') + ' fédération ' + L.prep);
    }
    if (S.all && L.type === 'region') {
      var regs = M.Ll.filter(function (l) { return l.type === 'region'; }).map(function (l) { return AS.val(S, l, 'p100'); }).filter(function (v) { return v != null; });
      var me = AS.val(S, L, 'p100'), rg = regs.filter(function (v) { return v > me; }).length + 1;
      if (me != null) t.push(rg === 1 ? 'c’est la région qui compte le plus de licences par habitant (sur ' + regs.length + ')' : 'elle se classe ' + rg + '<sup>e</sup> région sur ' + regs.length + ' pour les licences par habitant');
    }
    var f = AS.val(S, L, 'fem'), fa = AS.val(M.S.ALL, M.L.TOT, 'fem');
    if (!S.all && f != null && fa != null && Math.abs(f - fa) > 0.1) t.push(f > fa ? 'le public est nettement plus féminin que la moyenne (' + pctS(fa).replace('+', '') + ')' : 'le public est nettement plus masculin que la moyenne');
    if (!t.length) return '';
    var s = t.join(' ; '); return phrase(s.charAt(0).toUpperCase() + s.slice(1) + '.');
  };

  /* lecture d’une pyramide : tranche la plus nombreuse et équilibre femmes / hommes */
  I.pyramide = function (p) {
    if (!p) return '';
    var tot = p.f.map(function (v, i) { return v + p.h[i]; }), iM = tot.indexOf(Math.max.apply(null, tot));
    var tf = p.f.reduce(function (s, v) { return s + v; }, 0), th = p.h.reduce(function (s, v) { return s + v; }, 0);
    var jeunes = 0; for (var i = 0; i < 4; i++) jeunes += tot[i];
    var et = iM === 16 ? '80 ans et plus' : (iM * 5) + '-' + (iM * 5 + 4) + ' ans';
    return phrase('La tranche la plus nombreuse est celle des ' + et + ' ; les moins de 20 ans représentent ' + pctS(jeunes / (tf + th)).replace('+', '') + ' des licences, et les femmes ' + pctS(tf / (tf + th)).replace('+', '') + '.');
  };

  /* ===================== Suggestions de l’écran d’accueil ===================== */
  var SUGG = {
    'Chiffres': ['Combien de licences au total ?', 'Top 10 des fédérations', 'Quel est le rang du judo ?', 'Fédérations de plus de 100 000 licences', 'Compare le judo et le karaté'],
    'Territoires': ['Où le rugby est-il le plus pratiqué ?', 'Quelle région a le plus de licences par habitant ?', 'La Bretagne est combien-ième ?', 'Fédérations spécifiques à la Corse', 'Quels sont les départements de Bretagne ?'],
    'Évolutions': ['Quelles fédérations progressent le plus depuis 2019 ?', 'Qui gagne le plus de licences depuis 2019 en valeur ?', 'Évolution du tennis entre 2021 et 2025', 'Évolution du judo en Bretagne depuis 2016', 'Combien de fédérations progressent depuis 2019 ?'],
    'Regroupements': ['Liste des fédérations olympiques', 'Quelle fédération olympique progresse le plus ?', 'Liste des familles de fédérations', 'Quelles fédérations de sports collectifs gagnent le plus de licences ?', 'À quelle famille appartient le judo ?'],
    'Publics': ['Quelles fédérations sont les plus féminines ?', 'Les fédérations les plus féminines qui progressent', 'Quelles fédérations comptent le plus d’enfants ?', 'Quelles fédérations progressent le plus chez les jeunes ?', 'Pyramide des âges du judo'],
    'Aide': ['C’est quoi l’indice de spécificité ?', 'Pourquoi comparer à 2019 ?', 'Une licence, c’est une personne ?', 'Comment choisir un département ?', 'D’où viennent les données ?']
  };
  AS.SUGG = SUGG;

  /* ===================== Interface ===================== */
  function el(tag, c, html) { var e = D.createElement(tag); if (c) e.className = c; if (html != null) e.innerHTML = html; return e; }
  AS.hist = AS.hist || [];
  AS.interface = function (root) {
    var M = AS.M, ICO = AS.ICO;
    root.innerHTML = '';
    var tete = el('div', 'as-tete', '<div class=as-logo>' + ICO.etoile + '</div><div class=as-id><div class=as-titre>' + (root.getAttribute('data-titre') || 'Assistant IA') +
      ' <span class=as-badge title=\'Pas d’IA générative : réponses calculées sur les données du rapport\'>Simulateur</span></div>' +
      '<div class=as-sous>Posez vos questions sur les licences sportives · données ' + M.N + ' INJEP et Insee</div></div>');
    var nouv = el('button', 'as-nouv', ICO.nouv); nouv.type = 'button'; nouv.title = 'Nouvelle conversation'; tete.appendChild(nouv);
    var fil = el('div', 'as-fil'), pied = el('div', 'as-pied'), form = el('form', 'as-saisie'), zone = el('textarea'), env = el('button', 'as-env', ICO.envoi);
    zone.rows = 1; zone.placeholder = 'Posez votre question ici…'; env.type = 'submit'; env.title = 'Envoyer';
    form.appendChild(zone); form.appendChild(env); pied.appendChild(form);
    pied.appendChild(el('div', 'as-avert', ICO.info + '<span>Simulateur d’assistant IA : aucune IA générative, les réponses sont calculées sur les données du rapport. Vérifiez les informations importantes.</span>'));
    root.appendChild(tete); root.appendChild(fil); root.appendChild(pied);

    function accueil() {
      var c = el('div', 'as-accueil', '<div class=as-hero><div class=as-robot>' + ICO.robot + '</div><div class=as-bienv>' +
        '<div class=as-h>Bonjour !</div>' +
        '<p><b>Je peux vous aider</b> à analyser les licences, comparer des fédérations ou des territoires, et répondre à vos questions sur les publics et les évolutions.</p>' +
        '<div class=as-sim>' + ICO.fiole + '<span><b>Simulateur d’assistant IA</b> : je ne suis pas une IA générative. Je repère les mots de votre question et je calcule la réponse sur les données du rapport.</span></div>' +
        '</div></div>');
      /* v4 : la sélection du rapport et un « Le saviez-vous ? » tiré des données */
      var cx = AS.Q && AS.Q.accueilCtx ? AS.Q.accueilCtx() : null, sv = AS.Q && AS.Q.saviez ? AS.Q.saviez() : null;
      if (cx) {
        var bx = el('div', 'as-ctx', '<div class=as-ctx-t>' + ICO.cible + '<span>Vous regardez : <b>' + cx.txt + '</b></span></div>'), lx = el('div', 'as-liste');
        cx.sugg.forEach(function (s) { var p = el('button', 'as-sugg', s); p.type = 'button'; p.onclick = function () { poser(s); }; lx.appendChild(p); });
        bx.appendChild(lx); c.appendChild(bx);
      }
      if (sv) {
        var bs = el('div', 'as-saviez', '<div class=as-saviez-t>' + ICO.ampoule + '<b>Le saviez-vous ?</b></div><p>' + sv.t + '</p>'), ps = el('button', 'as-lien', 'En savoir plus →');
        ps.type = 'button'; ps.onclick = function () { poser(sv.q); }; bs.appendChild(ps); c.appendChild(bs);
      }
      c.appendChild(el('div', 'as-ex', cx ? 'Autres exemples :' : 'Quelques exemples :'));
      var onglets = el('div', 'as-onglets'), liste = el('div', 'as-liste');
      Object.keys(SUGG).forEach(function (k, i) {
        var o = el('button', 'as-onglet' + (i ? '' : ' as-on'), k); o.type = 'button';
        o.onclick = function () { Array.prototype.forEach.call(onglets.children, function (x) { x.classList.remove('as-on'); }); o.classList.add('as-on'); remplir(k); };
        onglets.appendChild(o);
      });
      function remplir(k) { liste.innerHTML = ''; SUGG[k].forEach(function (s) { var p = el('button', 'as-sugg', s); p.type = 'button'; p.onclick = function () { poser(s); }; liste.appendChild(p); }); }
      remplir(Object.keys(SUGG)[0]);
      c.appendChild(onglets); c.appendChild(liste);
      return c;
    }
    function bulle(qui, html, rel, rep) {
      var m = el('div', 'as-msg as-' + qui, html), boite = m;
      /* v4 : dépliant « Comment c’est calculé ? » sous les réponses chiffrées */
      if (rep && rep.m && AS.Q && AS.Q.methode) { var d = el('details', 'as-calc', '<summary>Comment c’est calculé ?</summary>' + AS.Q.methode(rep.m, rep.L, rep.S)); m.appendChild(d); }
      if (rel && rel.length) { var r = el('div', 'as-rel'); rel.forEach(function (s) { var p = el('button', 'as-sugg', s); p.type = 'button'; p.onclick = function () { poser(s); }; r.appendChild(p); }); m.appendChild(r); }
      if (qui.indexOf('ia') === 0) { boite = el('div', 'as-ligne', '<div class=as-av>' + ICO.mini + '</div>'); boite.appendChild(m); }
      fil.appendChild(boite); fil.scrollTop = fil.scrollHeight; return boite;
    }
    function echap(t) { return t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
    var occupe = false;
    function poser(t, rapide) {
      t = (t || '').trim(); if (!t || occupe) return;
      var acc = fil.querySelector('.as-accueil'); if (acc) acc.remove();
      bulle('moi', echap(t)); zone.value = ''; zone.style.height = '';
      var rep; try { rep = AS.repondre(t); } catch (e) { rep = { html: '<p>Désolé, une erreur est survenue sur cette question.</p>', rel: [] }; }
      if (!rapide) AS.hist.push({ q: t });
      if (rapide) { bulle('ia', rep.html, rep.rel, rep); return; }
      occupe = true;
      var att = bulle('ia as-attente', '<span></span><span></span><span></span>');
      setTimeout(function () { att.remove(); var mm = bulle('ia', rep.html, rep.rel, rep); mm.classList.add('as-appar'); occupe = false; }, 380 + Math.min(700, rep.html.length / 6));
    }
    form.addEventListener('submit', function (e) { e.preventDefault(); poser(zone.value); });
    zone.addEventListener('keydown', function (e) { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); poser(zone.value); } });
    zone.addEventListener('input', function () { zone.style.height = ''; zone.style.height = Math.min(110, zone.scrollHeight) + 'px'; });
    nouv.onclick = function () { AS.hist = []; AS.mem = {}; fil.innerHTML = ''; fil.appendChild(accueil()); zone.focus(); };
    /* le visuel se redessine à chaque changement de segment : on rejoue la conversation sans animation */
    if (AS.hist.length) { var h = AS.hist.slice(); AS.hist = []; AS.mem = {}; h.forEach(function (x) { poser(x.q, true); AS.hist.push(x); }); }
    else fil.appendChild(accueil());
  };

  /* ===================== Démarrage ===================== */
  AS.demarrer = function () {
    if (!AS.pret || !AS.pret.p1 || !AS.pret.p2 || !AS.pret.p3 || !AS.pret.p4) return;
    var essais = 0;
    (function essai() {
      var root = D.getElementById('as');
      var attendus = root ? +root.getAttribute('data-nb') || 0 : 0, recus = D.querySelectorAll('script.as-d').length;
      if (!root || (recus < attendus && essais < 40) || !AS.analyser || !AS.repondre) { essais++; if (essais < 80) setTimeout(essai, 60); return; }
      if (root.getAttribute('data-pret')) return;
      root.setAttribute('data-pret', '1');
      AS.construire(AS.lireBlocs());
      var ds = function (k) { return root.getAttribute('data-' + k) || ''; };
      AS.ctx = { mode: ds('mode'), fed: ds('fed') ? ds('fed').split(',') : [], nom: ds('nom'), ter: ds('ter') ? ds('ter').split(',') : [], ternom: ds('ternom') };
      AS.interface(root);
    })();
  };
  AS.pret = AS.pret || {}; AS.pret.p3 = true;
  if (AS.demarrer) AS.demarrer();
})();
