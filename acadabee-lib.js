// AcadaBee shared logic: constants, date helpers, bee avatar renderer, world themes.
export const NAMES={p1:"{Z}",p2:"{R}",dad:"Dad"};
export const EMO={p1:"🎨",p2:"🦈",dad:"💼"};
export const ROLE={p1:"Chief Design Officer",p2:"Chief Research Officer",dad:"Investor & Customer No. 1"};
export const WORLD={p1:"Deep Current",p2:"Coral Lagoon",dad:"The Harbour"};
export const LAUNCH="2026-11-15", EXAM_NAME="PA-2", LOCKS_FROM="2026-12-05", ROUND=6;
export const EXAMS={
  p1:[{s:"Maths",d:"2026-11-23",isl:["z-maths","z-arith","z-constr"]},{s:"English",d:"2026-11-25",isl:["z-eng","z-lit"]},{s:"Science",d:"2026-11-27",isl:["z-sci","z-life"]},{s:"Social Science",d:"2026-11-30",isl:["z-sst","z-farm","z-home"]},{s:"Spanish",d:"2026-12-02",isl:["z-spa"]},{s:"Hindi",d:"2026-12-04",isl:["z-hindi","z-muha"]}],
  p2:[{s:"English",d:"2026-11-25",isl:["r-eng","r-tense","r-lit"]},{s:"Social Science",d:"2026-11-27",isl:["r-sst","r-raj"]},{s:"Hindi",d:"2026-11-30",isl:["r-hindi","r-nakli"]},{s:"Science",d:"2026-12-02",isl:["r-sci","r-air"]},{s:"Maths",d:"2026-12-04",isl:["r-maths","r-frac"]}],
  dad:[]
};
export const SUBJ_ICON={"Maths":"📐","Science":"🔬","Social Science":"🏛️","Hindi":"🪶","English":"📚","ICT":"💻","Spanish":"🇪🇸","French":"🇫🇷","PBL":"🧱","GK":"🌍","Specials":"⭐","Business":"📈"};
export const TERM_CHIP={now:["This term","#FFF1A8"],next:["Coming up","#E3F8FF"],t1:["Term 1","#EFE9D2"],special:["Special","#E4F8EC"]};
export const DAY_LETTER=["M","T","W","T","F","S","S"];
export const ISLES=[
  {k:"maths",name:"Maths Island",icon:"📐",subs:["Maths"],deco:"📐 ✏️"},
  {k:"sci",name:"Science City",icon:"🔬",subs:["Science"],deco:"🏙️ 🌊"},
  {k:"sst",name:"SST Island",icon:"🏛️",subs:["Social Science"],deco:"🗺️ 🌾"},
  {k:"lang",name:"Language Island",icon:"🗣️",subs:["English","Hindi","Spanish","French"],lands:true,deco:""},
  {k:"biz",name:"Business Island",icon:"📈",subs:["Business"],deco:"💼"},
  {k:"special",name:"Special Island",icon:"⭐",subs:["Specials","GK","PBL"],deco:"🦈 🐙"},
  {k:"ict",name:"ICT Island",icon:"💻",subs:["ICT"],deco:"🌲 🌲 🌲"}
];
export const LAND={English:"🇬🇧 English land",Hindi:"🪶 हिंदी land",Spanish:"🇪🇸 Tierra española",French:"🇫🇷 Terre française"};
export const KINDS={bug:"🐞 Bug",looks:"🎨 Looks",idea:"💡 Idea",quiz:"📚 Quiz"};
export const PLACES=["Whole app","Start screen","Map","Chapters","Board","A lesson","Notebook"];

/* bees + dress-up */
export const AV_DEFAULT={bee:"honey",hair:"none",hc:"brown",stache:"none",beard:"none",glasses:"none",hat:"none"};
export const HAIRC={black:"#1D1A17",brown:"#6B3F1F",ginger:"#C8541B",blonde:"#E9C46A",blue:"#2F6FEB",pink:"#E85BA5"};
export const BEES={
  honey:{name:"Honey Bee",shape:"round",body:"#FFD83D",stripe:"#2A1B10"},
  ray:{name:"Raybees style",note:"{R}'s design",shape:"square",body:"#FFD83D",stripe:"#2A1B10",earn:"r7"},
  bumble:{name:"Bumble",shape:"round",body:"#F4A93B",stripe:"#4A2E14",earn:"r1"},
  sky:{name:"Sky Bee",shape:"round",body:"#8FD3FF",stripe:"#1F4E8C",earn:"r17"},
  gold:{name:"Golden Bee",shape:"round",body:"#FFD34D",stripe:"#B8860B",earn:"points5k"},
  night:{name:"Night Bee",shape:"square",body:"#7B5CD6",stripe:"#2A1B57",earn:"streak30"},
  mint:{name:"Mint Bee",shape:"round",body:"#7EE0B5",stripe:"#1E5E46",shop:500},
  ruby:{name:"Ruby Bee",shape:"square",body:"#FF6B7A",stripe:"#5A1020",shop:1000},
  galaxy:{name:"Galaxy Bee",shape:"round",body:"#5B4BD6",stripe:"#FFD83D",shop:2000}
};
export const DRESS=[
  ["hair","Hair",[["none","None"],["spiky","Spiky"],["curly","Curly","r9"],["long","Long","r22"],["mohawk","Mohawk","mastery1"]]],
  ["hc","Hair colour",[["brown","Brown"],["black","Black"],["blonde","Blonde","r3"],["ginger","Ginger","r13"],["blue","Blue","streak7"],["pink","Pink","streak14"]]],
  ["stache","Moustache",[["none","None"],["curly","Curly","r2"],["handlebar","Handlebar","r27"]]],
  ["beard","Beard",[["none","None"],["short","Short","r11"],["long","Long","r32"]]],
  ["glasses","Glasses",[["none","None"],["round","Round","r5"],["shades","Shades","streak7"]]],
  ["hat","Hat",[["none","None"],["cap","Cap"],["party","Party hat","r15"],["crown","Crown","points10k"],["wizard","Wizard hat","mastery1"]]]
];
export const EARN={
  points5k:{t:"Reach 5,000 points",ok:s=>s.points>=5000},
  points10k:{t:"Reach 10,000 points",ok:s=>s.points>=10000},
  streak7:{t:"Reach a 7-day streak",ok:s=>s.streak>=7},
  streak14:{t:"Reach a 14-day streak",ok:s=>s.streak>=14},
  streak30:{t:"Reach a 30-day streak",ok:s=>s.streak>=30},
  mastery1:{t:"Master a whole island",ok:s=>s.mastered>=1}
};
[1,2,3,5,7,9,11,13,15,17,22,27,32].forEach(n=>{EARN["r"+n]={n,t:"Finish "+n+" round"+(n>1?"s":""),ok:s=>s.rounds>=n}});
export function itemOf(k){const b=Object.values(BEES).find(B=>B.earn===k);if(b)return b.name;for(const [,,opts] of DRESS){const o=opts.find(x=>x[2]===k);if(o)return o[1]}return k}

/* pools */
export function hashStr(s){let h=5381;for(let i=0;i<s.length;i++)h=((h<<5)+h+s.charCodeAt(i))|0;return (h>>>0).toString(36)}
export function prepPools(LESSONS,BANK){
  if(LESSONS.__prepped)return;LESSONS.__prepped=true;
  Object.keys(LESSONS).forEach(p=>{if(!Array.isArray(LESSONS[p]))return;LESSONS[p].forEach(L=>{
    const extra=(BANK&&BANK[L.id])?BANK[L.id]:[];
    const all=L.qs.concat(extra), seen={};
    L.qs=[];
    all.forEach((Q,i)=>{const id=L.id+":"+hashStr(Q.q);if(seen[id])return;seen[id]=1;Q.id=id;if(!Q.c)Q.c=L.id+"-core-"+i;L.qs.push(Q)});
  })});
}

/* dates */
export function isoOf(d){return d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0")}
export function today(){return isoOf(new Date())}
export function daysAgoISO(n){const d=new Date();d.setDate(d.getDate()-n);return isoOf(d)}
export function parseISO(s){const a=s.split("-").map(Number);return new Date(a[0],a[1]-1,a[2])}
export function addDays(s,n){const d=parseISO(s);d.setDate(d.getDate()+n);return isoOf(d)}
export function mondayOf(s){const d=parseISO(s);d.setDate(d.getDate()-((d.getDay()+6)%7));return isoOf(d)}
export function daysTo(iso){return Math.round((parseISO(iso)-parseISO(today()))/864e5)}
export function fmtDay(s){return parseISO(s).toLocaleDateString("en-IN",{weekday:"short",day:"numeric",month:"short"})}
export function fmtWhen(t){const d=new Date(t);return d.toLocaleDateString("en-IN",{day:"numeric",month:"short"})+", "+d.toLocaleTimeString("en-IN",{hour:"numeric",minute:"2-digit"})}
export function nfmt(n){return Number(n||0).toLocaleString("en-IN")}
export function shuffle(a){for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a}
export const storageOK=(()=>{try{localStorage.setItem("ab_t","1");const ok=localStorage.getItem("ab_t")==="1";localStorage.removeItem("ab_t");return ok}catch(e){return false}})();

export function mergeProg(a,b){
  const out={v:1,isl:{}},ids=new Set([...Object.keys(a.isl||{}),...Object.keys(b.isl||{})]);
  ids.forEach(id=>{
    const x=(a.isl||{})[id],y=(b.isl||{})[id];
    if(!x||!y){out.isl[id]=JSON.parse(JSON.stringify(x||y));return}
    const m={rounds:Math.max(x.rounds||0,y.rounds||0),firstDone:[x.firstDone,y.firstDone].filter(Boolean).sort()[0]||null,lastDone:[x.lastDone,y.lastDone].filter(Boolean).sort().pop()||null,days:{},q:{}};
    new Set([...Object.keys(x.days||{}),...Object.keys(y.days||{})]).forEach(d=>{m.days[d]=Math.max((x.days||{})[d]||0,(y.days||{})[d]||0)});
    new Set([...Object.keys(x.q||{}),...Object.keys(y.q||{})]).forEach(q=>{const s=(x.q||{})[q]||{},t=(y.q||{})[q]||{};
      m.q[q]={seen:Math.max(s.seen||0,t.seen||0),ok:Math.max(s.ok||0,t.ok||0),miss:Math.max(s.miss||0,t.miss||0),last:[s.last,t.last].filter(Boolean).sort().pop()};
      if(s.m||t.m)m.q[q].m=1; if(s.sc||t.sc)m.q[q].sc=1;});
    out.isl[id]=m;});
  return out;
}

/* clay bee avatar → SVG string / data URL */
function mix(hex,w){const n=parseInt(hex.slice(1),16),f=c=>Math.round(c+(255-c)*w).toString(16).padStart(2,"0");return "#"+f(n>>16)+f((n>>8)&255)+f(n&255)}
function dark(hex,w){const n=parseInt(hex.slice(1),16),f=c=>Math.round(c*(1-w)).toString(16).padStart(2,"0");return "#"+f(n>>16)+f((n>>8)&255)+f(n&255)}
let avN=0;
export function avatarSVG(av){
  av=Object.assign({},AV_DEFAULT,av||{});const B=BEES[av.bee]||BEES.honey,hc=HAIRC[av.hc]||HAIRC.brown,id="av"+(++avN),sq=B.shape==="square",K="#2A1B10";
  const body=sq?'<rect x="26" y="34" width="68" height="74" rx="18"/>':'<ellipse cx="60" cy="71" rx="36" ry="38"/>';
  let s='<svg viewBox="0 0 120 124" xmlns="http://www.w3.org/2000/svg"><defs><radialGradient id="g'+id+'" cx="35%" cy="28%" r="80%"><stop offset="0" stop-color="'+mix(B.body,.55)+'"/><stop offset=".5" stop-color="'+B.body+'"/><stop offset="1" stop-color="'+dark(B.body,.28)+'"/></radialGradient><clipPath id="'+id+'">'+body+'</clipPath></defs>';
  s+='<g fill="#EAF6FF" fill-opacity=".92" stroke="#9ED5F2" stroke-width="2"><ellipse cx="17" cy="58" rx="15" ry="11" transform="rotate(-20 17 58)"/><ellipse cx="103" cy="58" rx="15" ry="11" transform="rotate(20 103 58)"/></g>';
  s+='<g fill="url(#g'+id+')">'+body+'</g><g clip-path="url(#'+id+')" fill="'+B.stripe+'"><rect x="0" y="92" width="120" height="7"/><rect x="0" y="104" width="120" height="8"/></g>';
  s+='<g fill="none" stroke="'+dark(B.body,.45)+'" stroke-opacity=".35" stroke-width="2">'+body+'</g><path d="M38 48 Q44 38 56 37" stroke="#fff" stroke-opacity=".75" stroke-width="4" stroke-linecap="round" fill="none"/>';
  const H={spiky:'<polygon points="33,44 37,26 45,38 50,21 56,36 62,19 67,36 73,22 78,38 84,27 87,44" />',
    curly:'<circle cx="38" cy="40" r="7"/><circle cx="46" cy="33" r="7"/><circle cx="55" cy="30" r="7"/><circle cx="65" cy="30" r="7"/><circle cx="74" cy="33" r="7"/><circle cx="82" cy="40" r="7"/>',
    long:'<path d="M27 78 Q22 32 60 30 Q98 32 93 78 L86 78 Q86 46 60 42 Q34 46 34 78 Z"/>',
    mohawk:'<path d="M52 40 Q53 16 60 9 Q67 16 68 40 Z"/>'};
  if(H[av.hair])s+='<g fill="'+hc+'" stroke="'+dark(hc,.4)+'" stroke-width="2" stroke-linejoin="round">'+H[av.hair]+'</g>';
  if(av.hat==="none")s+='<g stroke="'+K+'" stroke-width="3" fill="none" stroke-linecap="round"><path d="M50 38 L44 14"/><path d="M70 38 L76 14"/></g><g fill="'+K+'"><circle cx="44" cy="13" r="4.5"/><circle cx="76" cy="13" r="4.5"/></g>';
  s+='<g fill="#fff"><ellipse cx="48" cy="60" rx="7.5" ry="9.5"/><ellipse cx="72" cy="60" rx="7.5" ry="9.5"/></g><g fill="'+K+'"><circle cx="49" cy="62" r="3.4"/><circle cx="73" cy="62" r="3.4"/></g><g fill="#fff"><circle cx="50.3" cy="60.6" r="1.2"/><circle cx="74.3" cy="60.6" r="1.2"/></g>';
  s+='<g fill="#FF9A8B" fill-opacity=".55"><ellipse cx="40" cy="71" rx="5" ry="3"/><ellipse cx="80" cy="71" rx="5" ry="3"/></g>';
  const BD={short:'<path d="M36 80 Q40 106 60 108 Q80 106 84 80 Q74 92 60 92 Q46 92 36 80 Z"/>',long:'<path d="M34 78 Q36 118 60 119 Q84 118 86 78 Q74 94 60 94 Q46 94 34 78 Z"/>'};
  if(BD[av.beard])s+='<g fill="'+hc+'" stroke="'+dark(hc,.4)+'" stroke-width="2">'+BD[av.beard]+'</g>';
  s+='<path d="M49 80 Q60 90 71 80" fill="'+(av.beard!=="none"?"#fff":"none")+'" stroke="'+K+'" stroke-width="3" stroke-linecap="round"/>';
  const ST={curly:'<path d="M60 75 C54 69 44 71 42 77 C46 75 52 77 60 78 C68 77 74 75 78 77 C76 71 66 69 60 75 Z"/>',handlebar:'<path d="M60 74 C50 69 40 73 36 66 C35 75 46 80 60 77 C74 80 85 75 84 66 C80 73 70 69 60 74 Z"/>'};
  if(ST[av.stache])s+='<g fill="'+hc+'" stroke="'+dark(hc,.4)+'" stroke-width="1.5">'+ST[av.stache]+'</g>';
  if(av.glasses==="round")s+='<g fill="none" stroke="'+K+'" stroke-width="2.6"><circle cx="48" cy="60" r="11"/><circle cx="72" cy="60" r="11"/><path d="M59 60 L61 60"/></g>';
  if(av.glasses==="shades")s+='<g fill="'+K+'"><rect x="36" y="53" width="22" height="14" rx="5"/><rect x="62" y="53" width="22" height="14" rx="5"/><rect x="57" y="57" width="6" height="3"/></g><g fill="#fff" fill-opacity=".35"><rect x="39" y="55" width="8" height="3" rx="1.5"/><rect x="65" y="55" width="8" height="3" rx="1.5"/></g>';
  const HT={cap:'<path d="M33 38 Q60 6 87 38 Z" fill="#FF6F61"/><path d="M80 36 L106 41 L84 42 Z" fill="#E5484D"/><path d="M44 30 Q60 16 76 30" stroke="#fff" stroke-opacity=".5" stroke-width="3" fill="none"/>',
    party:'<path d="M45 36 L60 3 L75 36 Z" fill="#2F6FEB"/><path d="M50 26 L70 26 M54 16 L66 16" stroke="#FFD83D" stroke-width="3"/><circle cx="60" cy="5" r="4.5" fill="#E85BA5"/>',
    crown:'<path d="M36 38 L39 14 L50 28 L60 10 L70 28 L81 14 L84 38 Z" fill="#FFC800"/><circle cx="60" cy="30" r="3.5" fill="#E5484D"/><circle cx="48" cy="33" r="2.5" fill="#45E0E6"/><circle cx="72" cy="33" r="2.5" fill="#45E0E6"/>',
    wizard:'<path d="M38 36 L66 2 L84 36 Z" fill="#6B4BC8"/><ellipse cx="60" cy="37" rx="30" ry="5" fill="#5A3DB0"/><path d="M60 20 l2 4 4 .5-3 3 1 4-4-2-4 2 1-4-3-3 4-.5z" fill="#FFD83D"/>'};
  if(HT[av.hat])s+='<g stroke="rgba(0,0,0,.25)" stroke-width="1.5" stroke-linejoin="round">'+HT[av.hat]+'</g>';
  return s+'</svg>';
}
export function avatarURL(av){return "data:image/svg+xml;charset=utf-8,"+encodeURIComponent(avatarSVG(av))}

/* worlds */
const Y="linear-gradient(180deg,#FFE680,#FFC61A)";
export const THEMES={
  pick:{bg:"linear-gradient(180deg,#0B1E3A 0%,#10637A 48%,#2FC2D9 78%,#8FEBF7 100%)",ink:"#fff",soft:"#C9F3FF",card:"linear-gradient(160deg,#1E4F7A,#0E2C4F)",cardHi:"rgba(255,255,255,.16)",cardLo:"rgba(0,0,0,.35)",shadow:"rgba(0,0,0,.55)",acc:"#45E0E6",accInk:"#06303A",chip:"linear-gradient(180deg,#1A3F66,#0B1E3A)",chipInk:"#fff",opt:"linear-gradient(180deg,#1E4F7A,#122F52)",optInk:"#fff",ring:"rgba(255,255,255,.12)",field:"rgba(0,0,0,.25)",fieldInk:"#fff",line:"rgba(255,255,255,.12)",good:"linear-gradient(160deg,#1F6B4A,#14503A)",goodInk:"#D9FBC9",hint:"linear-gradient(160deg,#6B4F1F,#4A3612)",hintInk:"#FFE9B8"},
  p1:{bg:"linear-gradient(180deg,#0B1E3A 0%,#0F3D5E 45%,#10637A 100%)",ink:"#fff",soft:"#8FD9E8",card:"linear-gradient(160deg,#1E4F7A,#122F52)",cardHi:"rgba(255,255,255,.14)",cardLo:"rgba(0,0,0,.35)",shadow:"rgba(0,0,0,.6)",acc:"#45E0E6",accInk:"#06303A",chip:"linear-gradient(180deg,#1A3F66,#0B1E3A)",chipInk:"#fff",sea:"linear-gradient(180deg,#0E3A5A,#0B2A47)",seaRing:"rgba(143,217,232,.18)",seaDot:"rgba(255,255,255,.08)",opt:"linear-gradient(180deg,#1E4F7A,#122F52)",optInk:"#fff",ring:"rgba(255,255,255,.12)",field:"rgba(0,0,0,.25)",fieldInk:"#fff",line:"rgba(255,255,255,.12)",isleA:"linear-gradient(160deg,#2B6E8F,#1D4F6E)",isleALo:"#0E2E44",isleB:"linear-gradient(160deg,#3B5F8A,#27456B)",isleBLo:"#122540",isleInk:"#fff",isleSoft:"#B9E6F0",stone:"#2B6E8F",stoneLo:"#0E2E44",good:"linear-gradient(160deg,#1F6B4A,#14503A)",goodInk:"#D9FBC9",hint:"linear-gradient(160deg,#6B4F1F,#4A3612)",hintInk:"#FFE9B8"},
  p2:{bg:"linear-gradient(180deg,#BDF2FA 0%,#5ED4E6 45%,#1FA7C4 100%)",ink:"#063B4D",soft:"#2F6F80",card:"linear-gradient(160deg,#FFFFFF,#E8F8FC)",cardHi:"rgba(255,255,255,1)",cardLo:"rgba(20,120,150,.12)",shadow:"rgba(0,60,90,.4)",acc:"#FF6F61",accInk:"#fff",chip:"linear-gradient(180deg,#A86A3B,#7A4A24)",chipInk:"#fff",sea:"linear-gradient(180deg,#5ED4E6,#2FB3CC)",seaRing:"rgba(255,255,255,.35)",seaDot:"rgba(255,255,255,.45)",opt:"linear-gradient(180deg,#FFFFFF,#E3F4F8)",optInk:"#0B2E3F",ring:"#D7EEF3",field:"#fff",fieldInk:"#063B4D",line:"rgba(0,60,90,.12)",isleA:"linear-gradient(160deg,#FFF4D1,#F5D98E)",isleALo:"#C99A4A",isleB:"linear-gradient(160deg,#D6F5C2,#9EDC7A)",isleBLo:"#5E9C45",isleInk:"#2E2410",isleSoft:"#5A4A28",stone:"#F5D98E",stoneLo:"#C99A4A",good:"linear-gradient(160deg,#D9FBC9,#B6F0A0)",goodInk:"#0F4A1C",hint:"linear-gradient(160deg,#FFF1C9,#FFE1A8)",hintInk:"#6B4A10"},
  sunset:{bg:"linear-gradient(180deg,#FFE3C2 0%,#FFB38A 45%,#F07A6A 100%)",ink:"#4A1D12",soft:"#8A4A34",card:"linear-gradient(160deg,#FFFFFF,#FFF1E6)",cardHi:"rgba(255,255,255,1)",cardLo:"rgba(150,60,30,.14)",shadow:"rgba(120,40,20,.4)",acc:"#E8505B",accInk:"#fff",chip:"linear-gradient(180deg,#A86A3B,#7A4A24)",chipInk:"#fff",sea:"linear-gradient(180deg,#FFB38A,#F38B78)",seaRing:"rgba(255,255,255,.35)",seaDot:"rgba(255,255,255,.45)",opt:"linear-gradient(180deg,#FFFFFF,#FFEDE2)",optInk:"#4A1D12",ring:"#FBE0D2",field:"#fff",fieldInk:"#4A1D12",line:"rgba(120,40,20,.12)",isleA:"linear-gradient(160deg,#FFF4D1,#F8D27E)",isleALo:"#C99A4A",isleB:"linear-gradient(160deg,#FFE0EC,#F7A8C4)",isleBLo:"#C0607F",isleInk:"#2E2410",isleSoft:"#5A4A28",stone:"#F8D27E",stoneLo:"#C99A4A",good:"linear-gradient(160deg,#D9FBC9,#B6F0A0)",goodInk:"#0F4A1C",hint:"linear-gradient(160deg,#FFF1C9,#FFE1A8)",hintInk:"#6B4A10"},
  arctic:{bg:"linear-gradient(180deg,#F4FBFF 0%,#CFE8F7 45%,#8DBEDF 100%)",ink:"#0F2A44",soft:"#46698A",card:"linear-gradient(160deg,#FFFFFF,#EEF6FC)",cardHi:"rgba(255,255,255,1)",cardLo:"rgba(40,90,140,.12)",shadow:"rgba(30,70,110,.35)",acc:"#3B82F6",accInk:"#fff",chip:"linear-gradient(180deg,#5B7FA6,#3E5F85)",chipInk:"#fff",sea:"linear-gradient(180deg,#B9DDF2,#8DBEDF)",seaRing:"rgba(255,255,255,.35)",seaDot:"rgba(255,255,255,.45)",opt:"linear-gradient(180deg,#FFFFFF,#EAF3FA)",optInk:"#0F2A44",ring:"#DCEBF5",field:"#fff",fieldInk:"#0F2A44",line:"rgba(0,60,90,.12)",isleA:"linear-gradient(160deg,#FFFFFF,#E3F1FA)",isleALo:"#9DBBD3",isleB:"linear-gradient(160deg,#F2FAFF,#CDE6F5)",isleBLo:"#8FB0C9",isleInk:"#0F2A44",isleSoft:"#46698A",stone:"#E3F1FA",stoneLo:"#9DBBD3",good:"linear-gradient(160deg,#D9FBC9,#B6F0A0)",goodInk:"#0F4A1C",hint:"linear-gradient(160deg,#FFF1C9,#FFE1A8)",hintInk:"#6B4A10"},
  glow:{bg:"linear-gradient(180deg,#120B2E 0%,#2A1659 50%,#4B2A8C 100%)",ink:"#fff",soft:"#C9B8FF",card:"linear-gradient(160deg,#3A2675,#22154A)",cardHi:"rgba(255,255,255,.14)",cardLo:"rgba(0,0,0,.35)",shadow:"rgba(0,0,0,.6)",acc:"#7CF5C8",accInk:"#0B2E24",chip:"linear-gradient(180deg,#3A2675,#1A1038)",chipInk:"#fff",sea:"linear-gradient(180deg,#2A1A5E,#1A1040)",seaRing:"rgba(124,245,200,.2)",seaDot:"rgba(255,255,255,.08)",opt:"linear-gradient(180deg,#3A2675,#26184F)",optInk:"#fff",ring:"rgba(255,255,255,.12)",field:"rgba(0,0,0,.25)",fieldInk:"#fff",line:"rgba(255,255,255,.12)",isleA:"linear-gradient(160deg,#4B3596,#33236E)",isleALo:"#1C1240",isleB:"linear-gradient(160deg,#2F5E7A,#1F4258)",isleBLo:"#102634",isleInk:"#fff",isleSoft:"#D8CCFF",stone:"#4B3596",stoneLo:"#1C1240",good:"linear-gradient(160deg,#1F6B4A,#14503A)",goodInk:"#D9FBC9",hint:"linear-gradient(160deg,#6B4F1F,#4A3612)",hintInk:"#FFE9B8"},
  dad:{bg:"linear-gradient(180deg,#1B2430 0%,#2E3F52 50%,#4F6B7A 100%)",ink:"#fff",soft:"#B8CBD8",card:"linear-gradient(160deg,#3A4F63,#243546)",cardHi:"rgba(255,255,255,.14)",cardLo:"rgba(0,0,0,.35)",shadow:"rgba(0,0,0,.6)",acc:"#FFC61A",accInk:"#3A2600",chip:"linear-gradient(180deg,#2A3A4A,#16222E)",chipInk:"#fff",sea:"linear-gradient(180deg,#22323F,#1A2834)",seaRing:"rgba(184,203,216,.18)",seaDot:"rgba(255,255,255,.07)",opt:"linear-gradient(180deg,#3A4F63,#243546)",optInk:"#fff",ring:"rgba(255,255,255,.12)",field:"rgba(0,0,0,.25)",fieldInk:"#fff",line:"rgba(255,255,255,.12)",isleA:"linear-gradient(160deg,#556B7A,#3F515E)",isleALo:"#26323B",isleB:"linear-gradient(160deg,#6B7F6A,#4E5E4E)",isleBLo:"#2F3A2F",isleInk:"#fff",isleSoft:"#C9D8E0",stone:"#556B7A",stoneLo:"#26323B",good:"linear-gradient(160deg,#1F6B4A,#14503A)",goodInk:"#D9FBC9",hint:"linear-gradient(160deg,#6B4F1F,#4A3612)",hintInk:"#FFE9B8"}
};
export const YELLOW=Y;

/* worlds ({Z}, 7 Nov): pick a world in Profile; your home world is free, the rest unlock as you play */
export const WORLDS={deep:{name:"Deep Current",theme:"p1",ic:"🌊"},coral:{name:"Coral Lagoon",theme:"p2",ic:"🪸"},harbour:{name:"The Harbour",theme:"dad",ic:"⚓"},sunset:{name:"Sunset Reef",theme:"sunset",ic:"🌅"},arctic:{name:"Arctic Ice",theme:"arctic",ic:"🧊"},glow:{name:"Glow Night",theme:"glow",ic:"✨"}};
export const HOME_WORLD={p1:"deep",p2:"coral",dad:"harbour"};
export function worldEarn(p,w){if(w===HOME_WORLD[p])return null;if(w==="sunset")return "r13";if(w==="arctic")return "r22";if(w==="glow")return "streak7";const others=["deep","coral","harbour"].filter(x=>x!==HOME_WORLD[p]);return others.indexOf(w)===0?"r3":"r9"}

/* ---------- Season 1 (game plan approved 9 Nov 2026; starts on go-live day, Sun 15 Nov) ---------- */
export const SEASON=1;
export const LEVELS=[[0,"Egg"],[1000,"Larva"],[3000,"Pupa"],[6000,"Worker Bee"],[10000,"Forager"],[15000,"Scout"],[21000,"Guard"],[28000,"Honey Maker"],[36000,"Hive Hero"],[45000,"Queen's Council"]];
export function levelOf(points){let i=0;while(i+1<LEVELS.length&&points>=LEVELS[i+1][0])i++;const nx=LEVELS[i+1]||null;return {n:i+1,name:LEVELS[i][1],at:LEVELS[i][0],nextAt:nx?nx[0]:null,nextName:nx?nx[1]:null}}
export const GEMS={hive:1000,chest:300,level:200,golden:500,team:300};
/* Dad (from 16 Nov 2026): no islands or points; two goals only: Duolingo every day + an average of DAD_STEPS_AVG steps a day */
export const DAD_STEPS_AVG=7000, DAD_RULE_FROM="2026-11-16";
/* "What's new" pop-up: shown once per device for each new version */
export const APP_VERSION="1.91";
export const CELLS_PER_HIVE=20, DAY_CAP=20, STING_AT=3, SLEEP_FROM=22, SLEEP_TO=6, VAULT_HOUR=21;
export const FREEZER={price:400,max:2};
export const HINDI_ISLANDS=["z-hindi","z-muha","r-hindi","r-nakli","d-hindi"];
export const BADGES={p2:[{ic:"🏅",t:"First to 10,000",s:"Founder badge: the test-app record"}]};
export const MERCH=[{k:"level5",t:"Reach Level 5 (Forager)",ok:s=>s.points>=10000},{k:"golden3",t:"Turn 3 islands golden",ok:s=>s.golden>=3},{k:"streak30",t:"A 30-day streak",ok:s=>s.bestStreak>=30}];
export function freshSeason(){return {season:SEASON,points:0,streak:0,bestStreak:0,lastDay:null,days:[],freezers:1,frozen:[],gems:[],spent:0,cells:0,hives:0,golden:[],owned:[],lastChest:null,updatedAt:0}}
