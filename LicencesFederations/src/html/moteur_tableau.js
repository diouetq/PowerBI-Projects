/* =====================================================================================
   Moteur commun des tableaux HTML « Comparer les fédérations » et « Comparer les territoires »
   Projet  : Licences sportives en France (Power BI) - Quentin Diouet
   Rôle    : source LISIBLE de la mesure DAX [HTML Tableau JS] (version minifiée avec terser).
   Exécuté : dans le visuel HTML Content (édition standard, scripts autorisés).

   Contrat d'entrée (variables globales écrites par la mesure DAX appelante) :
     Y    années disponibles            AN   année choisie        REF  année de comparaison (2019)
     K    'F' fédérations | 'T' territoires                      IL   libellé de la 1re colonne
     LV   'i' liste d'items | 'g' liste de régions               RG   1 = vue par regroupement
     F    lignes : [nom, logo, indexGroupe, sélectionné, 'série.f.h.a1.a2.a3.a4.pop(.q.t)', top]
          les nombres sont encodés en base 64 (alphabet 0-9a-zA-Z-_) pour tenir sous ~32 000 caractères
     G    noms des groupes   GT/TT/FN  1re fédération (territoires)   FS  colonne Spécificité
     SX, AG, GE, AGL  filtres de genre et d'âge     POP  population      B1  libellé du territoire
     window.TN        libellé de la ligne Total (Total / Métropole / Métropole + DROM)
     Champ constant (méthode INJEP) : les évolutions des regroupements, des territoires et du total ne comptent que les
     fédérations présentes chaque année. F : r[3] = sélectionné (bit 1) + 2 si fédération hors champ constant.
     T : r[6] = licences hors champ constant 'AN.AN-1.REF.1re année' (absent si nulles), CCA = 1 si la sélection compte
     des fédérations à champ constant.

   Fonctions : tri par en-tête (asc/desc), vue liste ou groupée (groupes dépliables),
   mise en évidence et défilement vers la sélection, mini-courbes SVG (tendance),
   barres empilées genre / âge, infobulles, en-tête fixe.
   ===================================================================================== */
(function(){
var root=document.getElementById('sf'),hd=document.getElementById('hd'),tip=document.getElementById('sftip');if(!root)return;
var B='0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_';
function d64(s){var n=0;for(var i=0;i<s.length;i++)n=n*64+B.indexOf(s.charAt(i));return n}
var KT=K==='T',L='https://cdn.jsdelivr.net/gh/diouetq/PowerBI-Projects@main/LicencesFederations/assets/logos/';
var NY=Y.length,iA=Y.indexOf(AN),i1=Y.indexOf(AN-1),iR=AN>REF?Y.indexOf(REF):-1;
var CF='#8B5CF6',CH='#0EA5E9',CA=['#C7D0FB','#8FA2F6','#4361EE','#0B1C4F'],TA=['#0B1C4F','#0B1C4F','#fff','#fff'],AL=['Enfants 1-13 ans','Jeunes 14-20 ans','Adultes 21-55 ans','Seniors 56 ans et +'];
var SXa=SX?SX.split(','):[],AGa=AG?AG.split(','):[];
function esc(s){return String(s).replace(/&/g,'&amp;')}
function sum(a){var t=0;for(var i=0;i<a.length;i++)t+=a[i];return t}
function top(s){if(!s)return null;var p=s.split('.');return {i:+p[0],n:d64(p[1])}}
/* évolutions sur la série à champ constant (o.sc) quand elle existe ; volumes sur la série complète (o.s) */
function calc(o){o.v=o.s[iA]||0;var u=o.sc||o.s,w=u[iA]||0;o.e1=(i1>=0&&u[i1]>0&&w>0)?w/u[i1]-1:null;o.e2=(iR>=0&&u[iR]>0&&w>0)?w/u[iR]-1:null;
var fh=o.f+o.h;o.pf=fh?o.f/fh:null;var ta=sum(o.a);o.pa=ta?o.a.map(function(x){return x/ta}):null;
o.pa2=o.pa?(AGa.length?AGa.reduce(function(t,k){return t+(o.pa[k-1]||0)},0):o.pa[0]+o.pa[1]):null;
var j=0;while(j<iA&&!u[j])j++;o.es=(j<iA&&u[j]&&w)?w/u[j]-1:null;
var q=KT?o.q:POP;o.tx=q?o.p/q*1000:null;
o.tp=o.top?o.top.n/(o.v||1):null;o.tn=o.top?FN[o.top.i]:null;return o}
var R=F.map(function(r){var v=r[4].split('.').map(d64),o={n:r[0],l:r[1]?r[1].replace('~','federation-francaise-')+(r[1].indexOf('.')<0?'.png':''):'',c:r[2],sel:r[3]&1,nc:r[3]>>1,x:r[6]?r[6].split('.').map(d64):null,s:v.slice(0,NY),f:v[NY],h:v[NY+1],a:v.slice(NY+2,NY+6),p:v[NY+6],q:v[NY+7]||0,t:v[NY+8]||0,top:top(r[5]),k:1};return o});
function agg(n,m,tp){var o={n:n,k:m.length,m:m,s:Y.map(function(_,j){return sum(m.map(function(x){return x.s[j]}))}),a:[0,1,2,3].map(function(j){return sum(m.map(function(x){return x.a[j]}))}),top:top(tp)};
['f','h','p','q','t'].forEach(function(z){o[z]=sum(m.map(function(x){return x[z]}))});/* champ constant : F = membres hors champ exclus ; T = somme des séries à champ constant */
var mm=KT?m:m.filter(function(x){return !x.nc}),hc=KT?m.some(function(x){return x.sc}):(mm.length&&mm.length<m.length);
if(hc)o.sc=Y.map(function(_,j){return sum(mm.map(function(x){return (x.sc||x.s)[j]}))});
return o}
/* territoires : série à champ constant = série - licences des fédérations hors champ (années utiles aux évolutions) */
var CC=typeof CCA!=='undefined'&&CCA;
R.forEach(function(o){if(KT&&CC&&o.x){var t=o.s.slice();[iA,i1,iR,0].forEach(function(j,k){if(j>=0)t[j]=Math.max(0,t[j]-(o.x[k]||0))});o.sc=t}});
R.forEach(calc);
var GS=G.map(function(g,i){var m=R.filter(function(x){return x.c===i});var o=calc(agg(g,m,GT[i]));o.sel=m.some(function(x){return x.sel});o.all=m.length&&m.every(function(x){return x.sel});o.open=o.sel;return o}).filter(function(o){return o.k});
R.forEach(function(x){x.gn=G[x.c];x.ga=GS.filter(function(g){return g.n===x.gn})[0].all});
var TOT=calc(agg(window.TN||(KT?'Total':'Ensemble des fédérations'),R,TT)),ALL=R.concat(GS,[TOT]);ALL.forEach(function(o,i){o.ix=i});
R.concat(GS).forEach(function(o){o.is=(o.t&&TOT.t&&TOT.v)?(o.v/o.t)/(TOT.v/TOT.t):null});
var LG=LV==='g',SF=R.filter(function(x){return x.sel}),SG=GS.filter(function(g){return g.sel}),grp=!LG&&RG&&SF.length>0;
var st={c:'v',d:-1};
var CCT=TOT.sc?' '+(KT?'':'Regroupements et total : ')+'à champ constant : seules les fédérations présentes chaque année comptent (méthode INJEP).':'';
var COLS=[['n',LG?NV:IL,'',0],
['v','Licences '+AN,'Licences '+AN+' pour '+(KT?'la sélection de fédérations, ':'')+'le genre, l\'âge'+(KT?'':' et le territoire')+' choisis.',0],
['pt','Part','Part dans le total '+(KT?(window.TN||'Total')+'.':'des fédérations.'),0],
['e1','Évol. 1 an',i1<0?'Pas de données pour '+(AN-1)+' : évolution indisponible.':'Évolution entre '+(AN-1)+' et '+AN+'.'+CCT,i1<0],
['e2','Évol. depuis '+REF,iR<0?'Année choisie antérieure ou égale à '+REF+' : évolution indisponible.':'Évolution entre '+REF+' (avant Covid) et '+AN+'.'+CCT,iR<0],
['es','Tendance','Licences par année de '+Y[0]+' à '+Y[NY-1]+', année choisie en point bleu. Survolez pour le détail. Tri : évolution depuis la première année.',0],
['pf','Genre','Répartition femmes / hommes'+(AGa.length?' pour l\'âge choisi':'')+', sans le filtre de genre'+(SXa.length?' : le genre choisi est en couleur pleine':'')+'. Tri : part de femmes.',0],
['pa','Âge','Répartition par catégorie d\'âge'+(SXa.length?' pour le genre choisi':'')+', sans le filtre d\'âge'+(AGa.length?' : la catégorie choisie est en couleur pleine. Tri : part de la catégorie choisie.':'. Tri : part des moins de 21 ans.'),0],
['tx','Pour 1 000 hab.',(AP?'Taux approximatif : population par âge estimée (tranches de 5 ans de l\'INSEE réparties également). ':'')+'Licences pour 1 000 habitants (population INSEE'+(KT?' du territoire ; vide pour COM, Monaco, étranger':'')+'). Compte des licences, pas des personnes.',AP]];
if(KT)COLS.push(FS?['is','Spécificité','Indice de spécificité : part de la sélection dans les licences du territoire, divisée par cette part en France. Au-dessus de 1 : sur-représentée.',0]:['tn','1re fédération','Fédération qui compte le plus de licences dans le territoire, et sa part.',0]);
function fN(x){return Math.round(x).toLocaleString('fr-FR')}
function fP(x,s){if(x===null||x===undefined||isNaN(x))return '–';return (s&&x>0?'+':'')+(x*100).toFixed(1).replace('.',',')+' %'}
function ev(x){if(x===null)return '<span class=nd>–</span>';var c=x>0.01?'up':x<-0.01?'dn':'eq';return '<span class='+c+'>'+(c==='up'?'▲ ':c==='dn'?'▼ ':'– ')+fP(x,1)+'</span>'}
function spk(o){var W=104,H=26,ps=[],mx=0,mn=1e15;o.s.forEach(function(v){if(v>0){mx=Math.max(mx,v);mn=Math.min(mn,v)}});if(!mx)return '–';var r=mx-mn,p=null;
o.s.forEach(function(v,j){if(v<=0)return;var x=(4+j*(W-8)/Math.max(1,NY-1)).toFixed(1),y=(r?H-4-(v-mn)/r*(H-10):H/2).toFixed(1);ps.push(x+','+y);if(j===iA)p=[x,y]});
return '<svg width='+W+' height='+H+' style=vertical-align:middle><polyline points=\''+ps.join(' ')+'\' fill=none stroke=#98A2B3 stroke-width=1.6 stroke-linejoin=round />'+(p?'<circle cx='+p[0]+' cy='+p[1]+' r=3.6 fill=#4361EE stroke=#fff />':'')+'</svg>'}
function bar(ps,cs,on,tc){var h='<span class=sb>';ps.forEach(function(p,j){if(!p)return;h+='<i style=\'width:'+(p*100).toFixed(1)+'%;background:'+cs[j]+';opacity:'+(on[j]?1:0.22)+'\'>'+(p>=0.13?'<b style=color:'+tc[j]+'>'+Math.round(p*100)+'</b>':'')+'</i>'});return h+'</span>'}
function onS(k){return !SXa.length||SXa.indexOf(k)>=0}
function onA(j){return !AGa.length||AGa.indexOf(String(j+1))>=0}
function row(o,cls,lv,mx){var nm=esc(o.n),h='<tr class=\''+cls+'\''+(lv==='g'?' data-g='+o.ix+' title=\'Cliquer pour '+(o.open?'replier':'déplier')+'\'':'')+'>';
if(lv==='g')h+='<td><span class=ca>'+(o.open?'−':'+')+'</span>'+nm+' <span class=nb>'+o.k+' '+IL.toLowerCase()+(o.k>1?'s':'')+'</span></td>';
else if(lv==='t'||lv==='r')h+='<td>'+nm+(lv==='t'?' <span class=nb>('+o.k+')</span>':'')+'</td>';
else h+='<td'+(grp?' class=in':'')+'>'+(KT?'':o.l?'<img class=lo src=\''+(o.l.indexOf('http')===0?o.l:L+o.l)+'\'>':'<span class=lo></span>')+'<span class=nm>'+nm+'</span></td>';
h+='<td>'+fN(o.v)+(lv==='t'?'':'<span class=lb><i style=width:'+(o.v/mx*100).toFixed(1)+'%></i></span>')+'</td>';
h+='<td>'+fP(o.v/TOT.v)+'</td><td>'+ev(o.e1)+'</td><td>'+ev(o.e2)+'</td>';
h+='<td data-t=s:'+o.ix+'>'+spk(o)+'</td>';
h+='<td data-t=f:'+o.ix+'>'+(o.pf===null?'–':bar([o.pf,1-o.pf],[CF,CH],[onS('F'),onS('H')],['#fff','#fff']))+'</td>';
h+='<td data-t=a:'+o.ix+'>'+(o.pa?bar(o.pa,CA,[0,1,2,3].map(onA),TA):'–')+'</td>';
h+='<td'+(AP?' class=ap':'')+'>'+(o.tx===null?'–':(AP?'≈ ':'')+o.tx.toFixed(1).replace('.',','))+'</td>';
if(KT)h+=FS?'<td>'+(o.is===null||lv==='t'?'–':'<span class='+(o.is>1.1?'up':o.is<0.9?'dn':'eq')+'>'+o.is.toFixed(2).replace('.',',')+'</span>')+'</td>':'<td class=tf>'+(o.tn?'<span class=nm>'+esc(o.tn)+'</span> <span class=nb>'+fP(o.tp)+'</span>':'–')+'</td>';
return h+'</tr>'}
function key(o,c){return c==='n'?o.n:c==='pt'?o.v:c==='pf'?o.pf:c==='pa'?o.pa2:o[c]}
function srt(a){var c=st.c,d=st.d;return a.slice().sort(function(x,y){var p=key(x,c),q=key(y,c);if(p===null||p===undefined)return 1;if(q===null||q===undefined)return -1;if(typeof p==='string')return d*p.localeCompare(q,'fr');return d*(p-q)})}
function head(){var ic='<svg width=15 height=15 viewBox=\'0 0 24 24\' fill=none stroke=#8A94A6 stroke-width=2 stroke-linecap=round stroke-linejoin=round>',sp='<span class=sp></span>',pl='<span class=pl>',p;
var one=SF.length===1&&!(grp&&SF[0].ga),nb=LG?GS.length:R.length,lab=(LG?NV:IL).toLowerCase()+'s';
if(!SF.length)p=pl+'<b>'+nb+'</b> '+lab+(KT?'':' agréées en '+AN)+'</span>';
else if(one)p=pl+IL+' <b>'+esc(SF[0].n)+'</b></span>'+pl+NV+' <b>'+esc(SF[0].gn)+'</b></span>';
else p=SG.map(function(g){return pl+'<i class=dg></i>'+NV+' <b>'+esc(g.n)+'</b></span>'}).join('')+pl+'<b>'+SF.length+'</b> '+IL.toLowerCase()+(SF.length>1?'s':'')+'</span>';
var pub=(GE||AGL)?'<span class=e2>'+ic+'<circle cx=9 cy=8 r=3.2 /><path d=\'M3 20c.7-3.4 3-5.2 6-5.2s5.3 1.8 6 5.2\'/></svg>Public</span>'+(GE?'<span class=ac><i></i>'+GE+'</span>':'')+(AGL?'<span class=ac><i></i>'+AGL+'</span>':''):'<span class=e2>'+ic+'<circle cx=9 cy=8 r=3.2 /><path d=\'M3 20c.7-3.4 3-5.2 6-5.2s5.3 1.8 6 5.2\'/></svg>Tous publics</span>';
var lg='<span class=lg><b>Genre</b><span'+(onS('F')?'':' class=of')+'><i style=background:'+CF+'></i>Femmes</span><span'+(onS('H')?'':' class=of')+'><i style=background:'+CH+'></i>Hommes</span><b>Âge</b>'+AL.map(function(l,j){return '<span'+(onA(j)?'':' class=of')+'><i style=background:'+CA[j]+'></i>'+l.replace(' ans','').replace(' et +','+')+'</span>'}).join('')+'</span>';
var tl=grp?'<span class=hint>Cliquez sur <span class=ca>+</span> pour déplier, sur un en-tête pour trier</span><button data-x=1>Tout déplier</button><button data-x=0>Tout replier</button>':'<span class=hint>Cliquez sur un en-tête de colonne pour trier</span>';
var b1=KT?ic+'<rect x=4 y=4 width=7 height=7 rx=1.5 /><rect x=13 y=4 width=7 height=7 rx=1.5 /><rect x=4 y=13 width=7 height=7 rx=1.5 /><rect x=13 y=13 width=7 height=7 rx=1.5 /></svg>':ic+'<path d=\'M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z\'/><circle cx=12 cy=9.5 r=2.5 /></svg>';
var big=KT?'<path d=\'M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z\'/><circle cx=12 cy=9.5 r=2.5 />':'<rect x=4 y=4 width=7 height=7 rx=1.5 /><rect x=13 y=4 width=7 height=7 rx=1.5 /><rect x=4 y=13 width=7 height=7 rx=1.5 /><rect x=13 y=13 width=7 height=7 rx=1.5 />';
hd.innerHTML='<div class=r1><div class=ico><svg width=34 height=34 viewBox=\'0 0 24 24\' fill=none stroke=#2E46C9 stroke-width=1.8>'+big+'</svg></div><div style=min-width:0;flex:1><div class=ti>'+TI+'</div><div class=pls>'+p+'</div></div><div class=tg>'+tl+'</div></div>'
+'<div class=r2><span class=vs>Votre sélection</span><span class=e2>'+b1+'<b>'+esc(B1)+'</b></span>'+sp+'<span class=e2>'+ic+'<rect x=4 y=5 width=16 height=15 rx=2 /><path d=\'M4 10h16M9 3v4M15 3v4\'/></svg><b>'+AN+'</b></span>'+sp+pub+lg+'</div>'}
function draw(){var sc=root.scrollTop,h='<table><thead><tr>';
COLS.forEach(function(c,i){var so=st.c===c[0];h+='<th data-c='+c[0]+(so?' class=so':'')+'>'+(c[0]==='n'&&grp?NV+' / '+IL:c[1])+(so?(st.d<0?' ▼':' ▲'):'')+(c[2]?'<span class=\'hi'+(c[3]?' hw':'')+'\' data-t=h:'+i+'>'+(c[3]?'!':'i')+'</span>':'')+'</th>'});
h+='</tr></thead><tbody>';
var mF=Math.max.apply(null,R.map(function(x){return x.v})),mG=Math.max.apply(null,GS.map(function(x){return x.v}));
function fr(x){return row(x,'f'+(x.sel&&!(grp&&x.ga)?' fs':''),'f',mF)}
if(LG)srt(GS).forEach(function(o){h+=row(o,'f'+(o.sel?' fs':''),'r',mG)});
else if(!grp)srt(R).forEach(function(o){h+=fr(o)});
else{var g=srt(GS);g.filter(function(x){return x.sel}).concat(g.filter(function(x){return !x.sel})).forEach(function(o){h+=row(o,'g'+(o.sel?' gs':'')+(o.open?' op':''),'g',mG);if(o.open)srt(o.m).forEach(function(x){h+=fr(x)})})}
h+=row(TOT,'t','t',1);root.innerHTML=h+'</tbody></table>';root.scrollTop=sc}
function tipC(t){var a=t.split(':'),i=+a[1];if(a[0]==='h')return '<b>'+COLS[i][1]+'</b><br>'+COLS[i][2];var o=ALL[i],h='<b>'+esc(o.n)+'</b>';

if(a[0]==='s'){h+='<table>';o.s.forEach(function(v,j){if(!v)return;var pv=j?o.s[j-1]:0;h+='<tr'+(j===iA?' class=ts':'')+'><td>'+Y[j]+'</td><td>'+fN(v)+'</td><td>'+(pv?fP(v/pv-1,1):'–')+'</td></tr>'});return h+'</table>'}
if(a[0]==='f')return h+'<br><i class=dt style=background:'+CF+'></i>Femmes : '+fN(o.f)+' ('+fP(o.pf)+')<br><i class=dt style=background:'+CH+'></i>Hommes : '+fN(o.h)+' ('+fP(1-o.pf)+')'+(AGa.length?'<br><em>Pour l\'âge choisi</em>':'');
AL.forEach(function(l,j){h+='<br><i class=dt style=background:'+CA[j]+'></i>'+(onA(j)&&AGa.length?'<b>'+l+'</b>':l)+' : '+fN(o.a[j])+' ('+fP(o.pa?o.pa[j]:null)+')'});return h+(SXa.length?'<br><em>Pour le genre choisi</em>':'')}
document.body.addEventListener('click',function(e){var t=e.target.closest('[data-c],[data-g],[data-x]');if(!t)return;var d=t.dataset;
if(d.c){if(st.c===d.c)st.d=-st.d;else{st.c=d.c;st.d=(d.c==='n'||d.c==='tn')?1:-1}}else if(d.g){ALL[+d.g].open=!ALL[+d.g].open}else if(d.x)GS.forEach(function(o){o.open=d.x==='1'});draw()});
root.addEventListener('mousemove',function(e){var t=e.target.closest('[data-t]');if(!t){tip.style.display='none';return}tip.innerHTML=tipC(t.dataset.t);tip.style.display='block';
var w=tip.offsetWidth,hh=tip.offsetHeight,x=e.clientX+14,y=e.clientY+14;if(x+w>innerWidth-4)x=e.clientX-w-14;if(y+hh>innerHeight-4)y=e.clientY-hh-14;tip.style.left=Math.max(4,x)+'px';tip.style.top=Math.max(4,y)+'px'});
root.addEventListener('mouseleave',function(){tip.style.display='none'});
head();draw();var z=root.querySelector('tr.fs');if(z)root.scrollTop=z.offsetTop-root.clientHeight/3})();
