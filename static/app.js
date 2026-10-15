// الحالة 
const TAGS = ["tech","business","kids","art","culture","food","entertainment"];
const T = {
 ar:{app:"رفيق الزائر الذكي",tags:{tech:"التقنية",business:"الأعمال",kids:"الأطفال",art:"الفنون",culture:"الثقافة",food:"الطعام",entertainment:"الترفيه"},
  suggested:"المقترح لي",timeline:"الجدول الزمني",yourDay:"يومك المقترح",events:"فعاليات",hours:"ساعات",walkMin:"دقيقة مشي",noClash:"بلا تعارض",tlHelp:"كل عمود قاعة. اضغط على أي فعالية لتفاصيلها.",tlPlan:"خطتك المقترحة",tlOther:"فعاليات أخرى",tlMine:"✓ في جدولي",allEvents:"كل الفعاليات",allTags:"الكل",tabs:{home:"الرئيسية",schedule:"جدولي",assistant:"المساعد",map:"الخريطة"},
  prefsTitle:"تفضيلاتي",lang:"اللغة",interests:"اهتماماتك",who:"مع من تزور؟",pace:"وتيرة الزيارة",
  who_:{solo:"لحالي",family:"مع العائلة",friends:"مع الأصدقاء"},pace_:{calm:"هادئة",balanced:"متوازنة",intense:"مكثفة"},
  start:"ابدأ الاستكشاف",plan:"جدولك المقترح",skipped:"فعاليات أخرى مناسبة لك",match:"مناسبة لك",
  addAll:"أضف الخطة كاملة لجدولي",add:"أضف لجدولي",remove:"احذف من جدولي",inSched:"في جدولك",howTo:"كيف أصل؟",
  conflictWith:"تتعارض مع فعالية الخطة",alts:"بدائل في نفس الوقت",why:"لماذا رُشّحت لك؟",back:"رجوع",
  noResTitle:"لا توجد نتائج مناسبة",noResText:"اختر اهتماماً واحداً أو أكثر ثم ابدأ، أو وسّع اهتماماتك.",editPrefs:"تعديل التفضيلات",
  schedEmptyTitle:"جدولك فارغ",schedEmptyText:"أضف فعاليات من الصفحة الرئيسية أو اسأل المساعد.",
  walk:"مشي",sameHall:"نفس القاعة",min:"دقيقة",free:"وقت فاضي",tight:"الوقت لا يكفي للتنقل",overlap:"تتداخل مع الفعالية السابقة في الوقت: احذف إحداهما",gapOnly:"الفاصل {f} دقيقة فقط وتحتاج {n} (مشي + 5 للدخول والخروج)",
  conflictMsg:"تتعارض مع «{x}». هل تريد استبدالها؟",replace:"استبدال",cancel:"إلغاء",
  askPh:"اكتب طلبك، مثال: فعاليات للأطفال بعد الظهر",hello:"أهلاً! اكتب ما تحب وسأرشّح لك فعاليات بلا تعارض. أنا لست نموذجاً لغوياً: أفهم الكلمات المفتاحية   .",
  sug:["فعاليات تقنية صباحاً","أكل وقهوة مع العائلة","موسيقى وترفيه مساءً"],
  mapTitle:"خريطة القاعات",from:"من",to:"إلى",you:"المدخل الرئيسي",pickHall:"اختر القاعة",distance:"المسافة",meters:"متر",
  about:"عن الحل",aboutText:"الذكاء الاصطناعي هنا نموذج غابة عشوائية مدرَّب على بيانات اصطناعية (ليست آراء زوار حقيقيين). النسبة المعروضة هي الاحتمال المقدَّر أن تعجبك الفعالية. والكود وحده يضمن عدم التعارض.",
  auc:"جودة النموذج (AUC)",model:"النموذج",baseline:"الخط الأساسي",random:"عشوائي",added:"أُضيفت للجدول",removed:"حُذفت من الجدول",addedAll:"أُضيفت الخطة",skippedN:"تخطّينا {n} تتعارض مع جدولك"},
 en:{app:"Smart Visitor Companion",tags:{tech:"Technology",business:"Business",kids:"Kids",art:"Arts",culture:"Culture",food:"Food",entertainment:"Entertainment"},
  suggested:"Suggested",timeline:"Timeline",yourDay:"Your suggested day",events:"events",hours:"hours",walkMin:"min walking",noClash:"no clashes",tlHelp:"Each column is a hall. Tap any event for details.",tlPlan:"Your suggested plan",tlOther:"Other events",tlMine:"✓ In my schedule",allEvents:"All events",allTags:"All",tabs:{home:"Home",schedule:"My schedule",assistant:"Assistant",map:"Map"},
  prefsTitle:"My preferences",lang:"Language",interests:"Your interests",who:"Who are you visiting with?",pace:"Visit pace",
  who_:{solo:"Solo",family:"Family",friends:"Friends"},pace_:{calm:"Calm",balanced:"Balanced",intense:"Intense"},
  start:"Start exploring",plan:"Your suggested schedule",skipped:"Other events you may like",match:"Match",
  addAll:"Add the whole plan to my schedule",add:"Add to my schedule",remove:"Remove from my schedule",inSched:"In your schedule",howTo:"How do I get there?",
  conflictWith:"Clashes with the plan event",alts:"Alternatives at the same time",why:"Why was this suggested?",back:"Back",
  noResTitle:"No suitable results",noResText:"Pick one or more interests and start, or broaden your interests.",editPrefs:"Edit preferences",
  schedEmptyTitle:"Your schedule is empty",schedEmptyText:"Add events from Home or ask the assistant.",
  walk:"walk",sameHall:"Same hall",min:"min",free:"free time",tight:"Not enough time to get there",overlap:"Overlaps the previous event in time: remove one of them",gapOnly:"only {f} min gap, you need {n} (walk + 5 to leave and enter)",
  conflictMsg:"It clashes with “{x}”. Replace it?",replace:"Replace",cancel:"Cancel",
  askPh:"Type a request, e.g. kids events in the afternoon",hello:"Hi! Tell me what you like and I will suggest conflict-free events. I am not an LLM: I understand keywords and use a trained model.",
  sug:["Tech events in the morning","Food and coffee with family","Music and fun in the evening"],
  mapTitle:"Halls map",from:"From",to:"To",you:"Main Entrance",pickHall:"Pick a hall",distance:"Distance",meters:"m",
  about:"About the solution",aboutText:"The AI is a Random Forest trained on synthetic data (not real visitor opinions). The percentage is the estimated probability you will like the event. Plain code alone guarantees no time clashes.",
  auc:"Model quality (AUC)",model:"Model",baseline:"Baseline",random:"Random",added:"Added to schedule",removed:"Removed from schedule",addedAll:"Plan added",skippedN:"skipped {n} that clash with your schedule"}
};
let S = {lang:"ar", interests:["tech","business"], who:"solo", pace:"balanced", schedule:[], onboarded:false, tab:"home", chat:[], mapTo:"A", view:"plan", filter:""};
try { Object.assign(S, JSON.parse(localStorage.getItem("rafiq") || "{}")); } catch(e) {}
let HALLS = {}, ABOUT = null, CACHE = {plan:null, key:""}, DETAIL = null, SCHED_EVENTS = {};
const $ = s => document.querySelector(s);
const t = () => T[S.lang];
const save = () => { try { localStorage.setItem("rafiq", JSON.stringify({lang:S.lang,interests:S.interests,who:S.who,pace:S.pace,schedule:S.schedule,onboarded:S.onboarded})); } catch(e) {} };
const api = async (path, params={}) => {
  const q = new URLSearchParams({lang:S.lang, ...params}).toString();
  const r = await fetch("/api/" + path + "?" + q);
  if (!r.ok) throw new Error(path);
  return r.json();
};
const ltr = x => `<bdi dir="ltr">${x}</bdi>`;
const hallName = h => { const o = HALLS[h]; return S.lang === "ar" ? o.name_ar : o.name_en; };
function toast(msg){ const d=document.createElement("div"); d.className="toast"; d.textContent=msg; document.body.appendChild(d); setTimeout(()=>d.remove(),1800); }

//  عناصر مشتركة 
const ICONS = {
 home:'<svg viewBox="0 0 24 24"><path d="M3 11l9-8 9 8M5 10v10h14V10"/></svg>',
 schedule:'<svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/></svg>',
 assistant:'<svg viewBox="0 0 24 24"><path d="M4 5h16v11H9l-5 4z"/></svg>',
 map:'<svg viewBox="0 0 24 24"><path d="M12 22s7-6.5 7-12a7 7 0 10-14 0c0 5.5 7 12 7 12z"/><circle cx="12" cy="10" r="2.5"/></svg>'};
function renderChrome(){
  document.documentElement.lang = S.lang; document.documentElement.dir = S.lang === "ar" ? "rtl" : "ltr";
  $("#title").textContent = t().app;
  $("#tabs").innerHTML = ["home","schedule","assistant","map"].map(k =>
    `<button data-tab="${k}" class="${S.tab===k?"on":""}">${ICONS[k]}<span>${t().tabs[k]}</span></button>`).join("");
  $("#tabs").hidden = S.tab === "prefs";
}
const COL = {tech:"#2563EB",business:"#0F766E",kids:"#16A34A",art:"#DB2777",culture:"#B45309",food:"#EA580C",entertainment:"#7C3AED"};
const EMO = {tech:"💻",business:"💼",kids:"🧸",art:"🎨",culture:"🏛️",food:"🍽️",entertainment:"🎉"};
const HALLCOL = {A:"tech",B:"kids",C:"art",D:"food",E:"entertainment",F:"business"};
const pcol = ev => COL[ev.tags[0]];
function ring(m){
  const C = 138.2, pct = Math.round(m*100);
  return `<svg class="ring" viewBox="0 0 52 52"><circle cx="26" cy="26" r="22" class="rg-bg"/><circle cx="26" cy="26" r="22" class="rg" style="--to:${(C*(1-m)).toFixed(1)}" transform="rotate(-90 26 26)"/><text x="26" y="30" text-anchor="middle" direction="ltr">${pct}%</text></svg>`;
}
function tagChips(ev){ return ev.tags.map((k,i)=>`<span class="tg" style="--c:${COL[k]}">${EMO[k]} ${ev.tag_names[i]}</span>`).join(""); }
let CARD_I = 0;
function card(ev, opts={}){
  const inS = S.schedule.includes(ev.id);
  return `<div class="card ${opts.skipped?"skipped":""}" style="--c:${pcol(ev)};animation-delay:${(CARD_I++%8)*45}ms" data-open="${ev.id}">
    <div class="top"><div class="body">
      <div class="meta"><span class="hall">${ev.hall_name}</span><span>${ltr(ev.start+" - "+ev.end)}</span></div>
      <div class="etitle">${ev.title}</div>
      <div class="tgs">${tagChips(ev)}</div></div>
      ${ev.match!==undefined?ring(ev.match):""}</div>
    ${opts.skipped?`<div class="conflict">${t().conflictWith} «${ev.conflict_with}»</div>`:""}
    ${opts.noBtn?"":`<div class="row"><button class="btn small ${inS?"sec":""}" data-toggle="${ev.id}">${inS?t().inSched+" ✓":t().add}</button></div>`}
  </div>`;
}
function empty(title,text,btn){ return `<div class="empty"><b>${title}</b>${text}${btn||""}</div>`; }

//  1) التفضيلات 
function viewPrefs(){
  const lg = ["ar","en"].map(l=>`<button class="chip ${S.lang===l?"on":""}" data-lang="${l}">${l==="ar"?"العربية":"English"}</button>`).join("");
  const ints = TAGS.map(k=>`<button class="chip ${S.interests.includes(k)?"on":""}" data-int="${k}">${t().tags[k]}</button>`).join("");
  const who = ["solo","family","friends"].map(k=>`<button class="chip ${S.who===k?"on":""}" data-who="${k}">${t().who_[k]}</button>`).join("");
  const pace = ["calm","balanced","intense"].map(k=>`<button class="chip ${S.pace===k?"on":""}" data-pace="${k}">${t().pace_[k]}</button>`).join("");
  let about = "";
  if (ABOUT){ const m=ABOUT.metrics; about = `<h2>${t().about}</h2><div class="card" style="cursor:default"><div class="note" style="margin:0 0 8px">${t().aboutText}</div>
    <div class="mrow"><span>${t().model}</span><b>${ltr(m.model_auc)}</b></div><div class="mrow"><span>${t().baseline}</span><b>${ltr(m.baseline_auc)}</b></div><div class="mrow"><span>${t().random}</span><b>${ltr(m.random_auc)}</b></div>
    <div class="note">${t().auc}</div></div>`; }
  return `<h2>${t().lang}</h2><div class="chips">${lg}</div><h2>${t().interests}</h2><div class="chips">${ints}</div>
   <h2>${t().who}</h2><div class="chips">${who}</div><h2>${t().pace}</h2><div class="chips">${pace}</div>
   <button class="btn" id="go">${t().start}</button>`;
}

// = 2) الرئيسية 
function mins(x){ const [h,m]=x.split(":"); return +h*60+ +m; }
async function hero(plan){
  if (!plan.length) return "";
  const v = await api("validate",{ids:plan.map(e=>e.id).join()});
  const hrs = plan.reduce((a,e)=>a+(mins(e.end)-mins(e.start)),0)/60;
  const walk = v.legs.reduce((a,l)=>a+l.walk_min,0);
  const ok = v.conflicts.length===0;
  return `<div class="hero"><div class="hl">${t().yourDay} · ${ltr(plan[0].start+" → "+plan[plan.length-1].end)}</div>
   <div class="hs"><div><b>${plan.length}</b><span>${t().events}</span></div><div><b>${ltr(hrs.toFixed(1).replace(".0",""))}</b><span>${t().hours}</span></div><div><b>${walk}</b><span>${t().walkMin}</span></div><div><b>${ok?"✓":"!"}</b><span>${t().noClash}</span></div></div></div>`;
}
async function viewTimeline(){
  const [all, rec] = await Promise.all([api("events",{interests:S.interests.join(),who:S.who}), api("recommend",{interests:S.interests.join(),who:S.who,pace:S.pace})]);
  all.forEach(e=>SCHED_EVENTS[e.id]=e);
  const planIds = new Set(rec.plan.map(e=>e.id)), PX = 64, T0 = 10*60, HRS = 10;
  const halls = ["A","B","C","D","E","F"];
  const head = halls.map(h=>`<div class="th" style="--c:${COL[HALLCOL[h]]}">${h}</div>`).join("");
  const axis = Array.from({length:HRS},(_,i)=>`<div class="hr" style="top:${i*PX}px">${ltr((10+i)+":00")}</div>`).join("");
  const cols = halls.map(h=>`<div class="tcol" style="height:${HRS*PX}px">${all.filter(e=>e.hall===h).map(e=>{
    const top=(mins(e.start)-T0)/60*PX, hh=(mins(e.end)-mins(e.start))/60*PX-3, p=planIds.has(e.id), ins=S.schedule.includes(e.id);
    return `<div class="blk ${p?"plan":""} ${ins?"mine":""}" style="--c:${pcol(e)};top:${top}px;height:${hh}px" data-open="${e.id}"><b>${ins?"✓ ":""}${e.title}</b></div>`; }).join("")}</div>`).join("");
  return `<div class="note" style="margin:0 0 8px">${t().tlHelp}</div>
   <div class="legend"><span><i class="sw plan"></i>${t().tlPlan}</span><span><i class="sw"></i>${t().tlOther}</span><span>${t().tlMine}</span></div>
   <div class="tl"><div class="tcorner"></div>${head}<div class="taxis" style="height:${HRS*PX}px">${axis}</div>${cols}</div>`;
}
async function viewHome(){
  const modes = [["plan",t().suggested],["time",t().timeline],["all",t().allEvents]];
  const toggleBar = `<div class="chips seg">${modes.map(([k,l])=>`<button class="chip ${S.view===k?"on":""}" data-view="${k}">${l}</button>`).join("")}</div>`;
  CARD_I = 0;
  if (S.view === "time") return toggleBar + await viewTimeline();
  if (S.view === "all"){
    let list = await api("events",{interests:S.interests.join(),who:S.who});
    list.forEach(e=>SCHED_EVENTS[e.id]=e);
    const tagBar = `<div class="chips" style="margin-bottom:12px"><button class="chip ${S.filter===""?"on":""}" data-filter="">${t().allTags}</button>${TAGS.map(k=>`<button class="chip ${S.filter===k?"on":""}" data-filter="${k}">${EMO[k]} ${t().tags[k]}</button>`).join("")}</div>`;
    if (S.filter) list = list.filter(e=>e.tags.includes(S.filter));
    list.sort((a,b)=>a.start.localeCompare(b.start)||a.id-b.id);
    return toggleBar + tagBar + list.map(e=>card(e)).join("");
  }
  const key = [S.lang,S.interests.join(),S.who,S.pace].join("|");
  if (CACHE.key !== key){ CACHE = {plan: await api("recommend",{interests:S.interests.join(),who:S.who,pace:S.pace}), key}; }
  const r = CACHE.plan;
  [...r.plan,...r.skipped].forEach(e=>SCHED_EVENTS[e.id]=e);
  if (!r.plan.length) return toggleBar + empty(t().noResTitle,t().noResText,`<button class="btn" data-prefs>${t().editPrefs}</button>`);
  const names = S.interests.map(k=>EMO[k]+" "+t().tags[k]).join("  ");
  return toggleBar + await hero(r.plan) + `<div class="note" style="margin:8px 0 0">${names} · ${t().who_[S.who]} · ${t().pace_[S.pace]}</div>
   <h2>${t().plan}</h2>${r.plan.map(e=>card(e)).join("")}
   <button class="btn sec" id="addAll">${t().addAll}</button>
   ${r.skipped.length?`<h2>${t().skipped}</h2>${r.skipped.map(e=>card(e,{skipped:true})).join("")}`:""}`;
}

//  3) تفاصيل الفعالية 
async function viewDetail(id){
  const d = await api("event/"+id,{interests:S.interests.join(),who:S.who});
  SCHED_EVENTS[d.id] = d; DETAIL = id;
  const inS = S.schedule.includes(id);
  return `<div class="detail" style="--c:${pcol(d)}"><button class="back" data-back>‹ ${t().back}</button>
   <div class="meta"><span class="hall">${d.hall_name}</span><span>${ltr(d.start+" - "+d.end)}</span></div>
   <div class="etitle" style="font-size:20px">${d.title}</div>
   <div class="tgs" style="margin:8px 0">${tagChips(d)}</div>
   <p style="line-height:1.9">${d.desc}</p>
   <div class="top" style="margin:12px 0"><b>${t().match}</b>${ring(d.match)}</div>
   ${d.why.length?`<h2>${t().why}</h2><ul class="why">${d.why.map(w=>`<li>${w}</li>`).join("")}</ul>`:""}
   <div class="row"><button class="btn small ${inS?"sec":""}" data-toggle="${d.id}">${inS?t().remove:t().add}</button>
   <button class="btn small sec" data-route="${d.hall}">${t().howTo}</button></div>
   ${d.alternatives.length?`<h2>${t().alts}</h2>${d.alternatives.map(a=>card(a,{noBtn:true})).join("")}`:""}</div>`;
}

// 4) جدولي 
async function viewSchedule(){
  if (!S.schedule.length) return empty(t().schedEmptyTitle,t().schedEmptyText);
  const v = await api("validate",{ids:S.schedule.join()});
  const evs = await Promise.all(S.schedule.map(i=>SCHED_EVENTS[i] && SCHED_EVENTS[i].title ? SCHED_EVENTS[i] : api("event/"+i,{interests:S.interests.join(),who:S.who})));
  evs.forEach(e=>SCHED_EVENTS[e.id]=e);
  evs.sort((a,b)=>a.start.localeCompare(b.start));
  let html = "";
  evs.forEach((e,i)=>{
    html += card(e,{noBtn:true}).replace('<div class="etitle">',`<div class="row" style="margin:0"><button class="btn small danger" data-toggle="${e.id}">${t().remove}</button></div><div class="etitle">`);
    const leg = v.legs.find(l=>l.from===e.id);
    if (leg){
      const need = leg.walk_min===0 ? 0 : leg.walk_min+5;
      let msg;
      if (leg.free_min < 0) msg = `⚠ ${t().overlap}`;
      else if (!leg.ok) msg = `🚶 ${leg.walk_min} ${t().min} ${t().walk} · ${t().gapOnly.replace("{f}",leg.free_min).replace("{n}",need)}`;
      else msg = `🚶 ${leg.walk_min===0?t().sameHall:leg.walk_min+" "+t().min+" "+t().walk}${leg.free_min>0?" · "+leg.free_min+" "+t().min+" "+t().free:""}`;
      html += `<div class="leg ${leg.ok?"":"bad"}">${msg}</div>`;
    }
  });
  return html;
}

//5) المساعد 
function viewAssistant(){
  if (!S.chat.length) S.chat.push({role:"bot",text:t().hello});
  const msgs = S.chat.map(m=>`<div class="bubble ${m.role==="me"?"me":"bot"}">${esc(m.text)}${(m.plan||[]).map(e=>`<div class="mini" data-open="${e.id}"><b>${esc(e.title)}</b><br>${ltr(e.start+" - "+e.end)} · ${esc(e.hall_name)} · ${ltr(Math.round(e.match*100)+"%")}</div>`).join("")}</div>`).join("");
  const sug = `<div class="chips" style="margin-bottom:10px">${t().sug.map(s=>`<button class="chip" data-sug="${esc(s)}">${esc(s)}</button>`).join("")}</div>`;
  return `<div class="chat">${msgs}</div>${S.chat.length<2?sug:""}<div style="height:70px"></div>
   <div class="askbar"><input id="q" placeholder="${t().askPh}"><button id="send">›</button></div>`;
}
const esc = s => String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
async function ask(text){
  if (!text.trim()) return;
  S.chat.push({role:"me",text}); show();
  const r = await api("assistant",{q:text,interests:S.interests.join(),who:S.who,pace:S.pace});
  r.plan.forEach(e=>SCHED_EVENTS[e.id]=e);
  S.chat.push({role:"bot",text:r.reply,plan:r.plan}); show();
  window.scrollTo(0,document.body.scrollHeight);
}

// 6) الخريطة 
async function viewMap(){
  const pos = k => HALLS[k];
  const keys = Object.keys(HALLS).filter(k=>k!=="entrance");
  const r = await api("route",{frm:"entrance",to:S.mapTo});
  const sch = new Set(S.schedule.map(i=>SCHED_EVENTS[i]&&SCHED_EVENTS[i].hall).filter(Boolean));
  const rects = keys.map(k=>{ const p=pos(k), on=k===S.mapTo, has=sch.has(k);
    return `<g data-hall="${k}" style="cursor:pointer"><rect x="${p.x-55}" y="${p.y-32}" width="110" height="64" rx="12" fill="${on?COL[HALLCOL[k]]:COL[HALLCOL[k]]+"22"}" stroke="${has?"#1B7F4B":COL[HALLCOL[k]]}" stroke-width="${has?4:1.5}"/>
      <text x="${p.x}" y="${p.y-4}" text-anchor="middle" font-size="22" font-weight="700" fill="${on?"#fff":COL[HALLCOL[k]]}">${k}</text>
      <text x="${p.x}" y="${p.y+18}" text-anchor="middle" font-size="11" fill="${on?"#fff":"#5A5780"}">${hallName(k)}</text></g>`; }).join("");
  const e = pos("entrance"), to = pos(S.mapTo);
  const line = `<path class="route" pathLength="1" d="M${e.x} ${e.y-14} L${e.x} ${to.y+60} L${to.x} ${to.y+60} L${to.x} ${to.y+32}" fill="none" stroke="#4F3FE0" stroke-width="4" stroke-dasharray="8 6" stroke-linecap="round" stroke-linejoin="round"/>`;
  const chips = keys.map(k=>`<button class="chip ${S.mapTo===k?"on":""}" data-mapto="${k}">${k}</button>`).join("");
  return `<h2>${t().mapTitle}</h2><div class="map"><svg viewBox="0 0 600 420">${line}${rects}
    <circle cx="${e.x}" cy="${e.y}" r="11" fill="#1B7F4B"/><circle cx="${e.x}" cy="${e.y}" r="11" fill="none" stroke="#1B7F4B" stroke-width="3" class="pulse"/><text x="${e.x}" y="${e.y+30}" text-anchor="middle" font-size="12" fill="#1B1740">${t().you}</text></svg></div>
    <h3>${t().pickHall}</h3><div class="chips">${chips}</div>
    <div class="walk">${t().from}: ${t().you} → ${t().to}: ${hallName(S.mapTo)}<br>🚶 ${r.walk_min} ${t().min} · ${t().distance} ${r.distance_m} ${t().meters}</div>`;
}

//  التوجيه 
async function show(){
  renderChrome();
  const el = $("#screen");
  el.classList.remove("fade"); void el.offsetWidth; el.classList.add("fade");
  try {
    if (S.tab==="prefs") el.innerHTML = viewPrefs();
    else if (S.tab==="detail") el.innerHTML = await viewDetail(DETAIL);
    else if (S.tab==="home") el.innerHTML = await viewHome();
    else if (S.tab==="schedule") el.innerHTML = await viewSchedule();
    else if (S.tab==="assistant") el.innerHTML = viewAssistant();
    else if (S.tab==="map") el.innerHTML = await viewMap();
  } catch(err){ el.innerHTML = `<div class="empty"><b>⚠</b>${esc(err.message)}</div>`; }
}
function go(tab){ S.tab = tab; show(); window.scrollTo(0,0); }
let prevTab = "home";

async function toggle(id){
  if (S.schedule.includes(id)){ S.schedule = S.schedule.filter(x=>x!==id); save(); toast(t().removed); return show(); }
  const v = await api("validate",{ids:[...S.schedule,id].join()});
  const bad = v.conflicts.filter(c=>c.a===id||c.b===id);
  if (!bad.length){ S.schedule.push(id); save(); toast(t().added); return show(); }
  const other = bad[0].a===id ? bad[0].b : bad[0].a, title = bad[0].a===id ? bad[0].b_title : bad[0].a_title;
  const m = $("#modal"); m.hidden = false;
  m.innerHTML = `<div class="sheet"><p style="line-height:1.8">${t().conflictMsg.replace("{x}",esc(title))}</p>
    <div class="row"><button class="btn small" id="rep">${t().replace}</button><button class="btn small sec" id="cnl">${t().cancel}</button></div></div>`;
  $("#cnl").onclick = () => { m.hidden = true; };
  $("#rep").onclick = () => { S.schedule = S.schedule.filter(x=>!bad.some(c=>c.a===x||c.b===x)); S.schedule.push(id); save(); m.hidden = true; show(); };
}

document.addEventListener("click", async ev=>{
  const c = ev.target.closest("[data-tab],[data-lang],[data-int],[data-who],[data-pace],[data-toggle],[data-open],[data-back],[data-route],[data-mapto],[data-hall],[data-sug],[data-prefs],[data-view],[data-filter],#go,#addAll,#send,#gear");
  if (!c) return;
  if (c.dataset.toggle){ ev.stopPropagation(); return toggle(+c.dataset.toggle); }
  if (c.dataset.tab) return go(c.dataset.tab);
  if (c.id==="gear"||c.dataset.prefs!==undefined){ prevTab = S.tab==="prefs"?"home":S.tab; return go("prefs"); }
  if (c.dataset.lang){ S.lang=c.dataset.lang; S.chat=[]; SCHED_EVENTS={}; CACHE={plan:null,key:""}; save(); return show(); }
  if (c.dataset.int){ const k=c.dataset.int; S.interests = S.interests.includes(k)?S.interests.filter(x=>x!==k):[...S.interests,k]; save(); return show(); }
  if (c.dataset.who){ S.who=c.dataset.who; save(); return show(); }
  if (c.dataset.pace){ S.pace=c.dataset.pace; save(); return show(); }
  if (c.id==="go"){ S.onboarded=true; save(); return go("home"); }
  if (c.id==="addAll"){
    let added=0, skipped=0;
    for (const e of CACHE.plan.plan){
      if (S.schedule.includes(e.id)) continue;
      const v = await api("validate",{ids:[...S.schedule,e.id].join()});
      if (v.conflicts.some(x=>x.a===e.id||x.b===e.id)) skipped++; else { S.schedule.push(e.id); added++; }
    }
    save(); toast(t().addedAll+" ("+added+")"+(skipped?" · "+t().skippedN.replace("{n}",skipped):"")); return go("schedule");
  }
  if (c.dataset.open){ prevTab = S.tab==="detail"?prevTab:S.tab; DETAIL=+c.dataset.open; return go("detail"); }
  if (c.dataset.back!==undefined) return go(prevTab);
  if (c.dataset.route){ S.mapTo=c.dataset.route; return go("map"); }
  if (c.dataset.mapto){ S.mapTo=c.dataset.mapto; return show(); }
  if (c.dataset.hall){ S.mapTo=c.dataset.hall; return show(); }
  if (c.dataset.view){ S.view=c.dataset.view; return show(); }
  if (c.dataset.filter!==undefined){ S.filter=c.dataset.filter; return show(); }
  if (c.dataset.sug) return ask(c.dataset.sug);
  if (c.id==="send"){ const q=$("#q"); const v=q.value; q.value=""; return ask(v); }
});
document.addEventListener("keydown", ev=>{ if (ev.key==="Enter" && ev.target.id==="q"){ const v=ev.target.value; ev.target.value=""; ask(v); } });

(async function init(){
  try { HALLS = await api("halls"); ABOUT = await api("about"); } catch(e) {}
  S.tab = S.onboarded ? "home" : "prefs";
  show();
})();
