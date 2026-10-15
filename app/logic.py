import json, math, os, re, joblib, pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from app.features import make_features

WALK_SPEED = 80      # متر في الدقيقة
BUFFER_MIN = 5       # دقائق إضافية للدخول والخروج
THRESHOLD = 0.5      # أقل نسبة ملاءمة تُقترح
PACE = {"calm": 3, "balanced": 5, "intense": 7}

TAG_NAMES = {
    "tech": ("التقنية", "Technology"), "business": ("الأعمال", "Business"), "kids": ("الأطفال", "Kids"),
    "art": ("الفنون", "Arts"), "culture": ("الثقافة", "Culture"), "food": ("الطعام", "Food"),
    "entertainment": ("الترفيه", "Entertainment")}

def _boot():
    if not os.path.exists("data/model.joblib"):
        from app import train
        train.train()
_boot()
df = pd.read_csv("data/events.csv")
EVENTS = df.to_dict(orient="records")
BY_ID = {e["id"]: e for e in EVENTS}
HALLS = json.load(open("data/halls.json", encoding="utf-8"))
model = joblib.load("data/model.joblib")
METRICS = json.load(open("data/metrics.json"))

#  الوقت والتنقل 
def to_minutes(t):
    h, m = t.split(":")
    return int(h) * 60 + int(m)

def distance(a, b):
    return math.hypot(HALLS[a]["x"] - HALLS[b]["x"], HALLS[a]["y"] - HALLS[b]["y"])

def walk_minutes(a, b):
    return 0 if a == b else math.ceil(distance(a, b) / WALK_SPEED)

def gap_minutes(a, b):
    return 0 if a == b else walk_minutes(a, b) + BUFFER_MIN

def conflicts(a, b):
    g = gap_minutes(a["hall"], b["hall"])
    sa, ea, sb, eb = to_minutes(a["start"]), to_minutes(a["end"]), to_minutes(b["start"]), to_minutes(b["end"])
    return sa < eb + g and sb < ea + g

#  الذكاء الاصطناعي 
def ai_score(ev, interests, who):
    x = make_features(interests, who, ev["tags"], ev["audience"])
    return float(model.predict_proba([x])[0][1])

def why(ev, interests, who, lang):
    idx = 0 if lang == "ar" else 1
    out = []
    hit = [TAG_NAMES[t][idx] for t in ev["tags"].split(";") if t in interests]
    if hit:
        out.append("تطابق مع اهتماماتك: " + "، ".join(hit) if lang == "ar" else "Matches your interests: " + ", ".join(hit))
    if ev["audience"] == "kids" and who == "family":
        out.append("مناسبة للأطفال وزيارتك مع العائلة" if lang == "ar" else "Suitable for children on a family visit")
    if "entertainment" in ev["tags"] and who == "friends":
        out.append("ممتعة للزيارة مع الأصدقاء" if lang == "ar" else "Fun to visit with friends")
    return out

def view(ev, lang, match=None, interests=(), who="solo"):
    L = "ar" if lang == "ar" else "en"
    h = HALLS[ev["hall"]]
    d = {"id": int(ev["id"]), "hall": ev["hall"], "hall_name": h["name_" + L], "start": ev["start"], "end": ev["end"],
         "tags": ev["tags"].split(";"), "tag_names": [TAG_NAMES[t][0 if L == "ar" else 1] for t in ev["tags"].split(";")],
         "audience": ev["audience"], "title": ev["title_" + L], "desc": ev["desc_" + L]}
    if match is not None:
        d["match"] = round(match, 2)
        d["why"] = why(ev, list(interests), who, L)
    return d

def recommend(interests, who="solo", pace="balanced", lang="ar", window=None, bonus=None):
    """window=(من، إلى) بالدقائق لتقييد الوقت. bonus={id: قيمة} من المساعد."""
    interests = [t for t in interests if t in TAG_NAMES]
    cap = PACE.get(pace, 5)
    items = []
    for ev in EVENTS:
        if window and not (to_minutes(ev["start"]) >= window[0] and to_minutes(ev["start"]) < window[1]):
            continue
        s = ai_score(ev, interests, who) + (bonus or {}).get(ev["id"], 0)
        items.append((min(s, 0.99), ev))
    items.sort(key=lambda t: -t[0])
    plan, skipped = [], []
    for s, ev in items:
        if s < THRESHOLD:
            continue
        if len(plan) == cap:
            break
        blocker = next((p for p in plan if conflicts(ev, p[1])), None)
        if blocker is None:
            plan.append((s, ev))
        else:
            skipped.append((s, ev, blocker[1]))
    plan.sort(key=lambda t: to_minutes(t[1]["start"]))
    out_plan = [view(e, lang, s, interests, who) for s, e in plan]
    out_skip = []
    for s, e, b in skipped[:4]:
        v = view(e, lang, s, interests, who)
        v["conflict_with"] = b["title_" + ("ar" if lang == "ar" else "en")]
        out_skip.append(v)
    return {"plan": out_plan, "skipped": out_skip}

def alternatives(event_id, interests, who, lang):
    base = BY_ID[event_id]
    alts = []
    for ev in EVENTS:
        if ev["id"] == event_id:
            continue
        a, b = to_minutes(base["start"]), to_minutes(base["end"])
        if to_minutes(ev["start"]) < b and a < to_minutes(ev["end"]):
            s = ai_score(ev, [t for t in interests if t in TAG_NAMES], who)
            if s >= THRESHOLD:
                alts.append((s, ev))
    alts.sort(key=lambda t: -t[0])
    return [view(e, lang, s, interests, who) for s, e in alts[:3]]

def validate(ids, lang="ar"):
    L = "ar" if lang == "ar" else "en"
    evs = sorted([BY_ID[i] for i in ids if i in BY_ID], key=lambda e: to_minutes(e["start"]))
    bad, legs = [], []
    for i, a in enumerate(evs):
        for b in evs[i + 1:]:
            if conflicts(a, b):
                bad.append({"a": a["id"], "b": b["id"], "a_title": a["title_" + L], "b_title": b["title_" + L]})
    for a, b in zip(evs, evs[1:]):
        free = to_minutes(b["start"]) - to_minutes(a["end"])
        legs.append({"from": a["id"], "to": b["id"], "walk_min": walk_minutes(a["hall"], b["hall"]), "free_min": free,
                     "ok": free >= gap_minutes(a["hall"], b["hall"])})
    return {"conflicts": bad, "legs": legs}

def route(frm, to):
    a, b = HALLS[frm], HALLS[to]
    return {"from": {"id": frm, "x": a["x"], "y": a["y"]}, "to": {"id": to, "x": b["x"], "y": b["y"]},
            "distance_m": round(distance(frm, to)), "walk_min": max(1, walk_minutes(frm, to))}

# المساعد (ليس نموذجاً لغوياً: كلمات مفتاحية + TF-IDF + نموذج المدرَّب) 
KEYWORDS = {
    "tech": ["تقن", "ذكاء", "روبوت", "برمج", "سيبران", "افتراضي", "tech", "ai", "robot", "cyber", "virtual", "smart"],
    "business": ["اعمال", "أعمال", "استثمار", "شركات", "ريادة", "مستثمر", "business", "startup", "invest", "entrepreneur"],
    "kids": ["طفل", "اطفال", "أطفال", "صغار", "ولد", "بنت", "kid", "child"],
    "art": ["فن", "رسم", "تصوير", "خط", "معرض", "art", "photo", "calligraphy", "gallery"],
    "culture": ["ثقاف", "تراث", "شعر", "عمار", "culture", "heritage", "poetry", "architecture"],
    "food": ["طعام", "اكل", "أكل", "طبخ", "قهوة", "مطعم", "تذوق", "تذوّق", "food", "eat", "coffee", "cook", "taste"],
    "entertainment": ["ترفيه", "حفل", "موسيق", "لعب", "العاب", "ألعاب", "مرح", "entertain", "fun", "music", "game", "concert", "show"]}
WHO_WORDS = {"family": ["عائل", "اسرت", "أسرت", "اولادي", "أولادي", "family"], "solo": ["لحال", "وحدي", "بمفرد", "solo", "alone"],
             "friends": ["اصدقاء", "أصدقاء", "صحاب", "ربع", "friends"]}
TIME_WORDS = [("morning", ["صباح", "morning"], (10 * 60, 12 * 60)), ("afternoon", ["بعد الظهر", "afternoon", "عصر"], (12 * 60, 17 * 60)),
              ("evening", ["مساء", "ليل", "evening", "night"], (17 * 60, 21 * 60))]

_texts = [" ".join([e["title_ar"], e["title_en"], e["desc_ar"], e["desc_en"], e["tags"].replace(";", " ")]).lower() for e in EVENTS]
_vec = TfidfVectorizer(analyzer="char_wb", ngram_range=(2, 4)).fit(_texts)
_mat = _vec.transform(_texts)

def _norm(s):
    return re.sub(r"[ًٌٍَُِّْ]", "", s.lower())

def assistant(q, interests, who, pace, lang):
    L = "ar" if lang == "ar" else "en"
    t = _norm(q)
    found = [tag for tag, ws in KEYWORDS.items() if any(w in t for w in ws)]
    new_who = next((k for k, ws in WHO_WORDS.items() if any(w in t for w in ws)), None)
    window, window_name = None, None
    for name, ws, win in TIME_WORDS:
        if any(w in t for w in ws):
            window, window_name = win, name
            break
    use_interests = found or list(interests)
    who2 = new_who or who
    sims = cosine_similarity(_vec.transform([t]), _mat)[0]
    # من ذكر اهتماماً صراحةً نرفع الفعاليات التي تحمل وسمه قليلاً، ونضيف تشابه النص (TF-IDF)
    bonus = {e["id"]: float(sims[i]) * 0.4 + (0.15 if found and any(t in found for t in e["tags"].split(";")) else 0)
             for i, e in enumerate(EVENTS)}
    res = recommend(use_interests, who2, pace, lang, window, bonus)
    n = len(res["plan"])
    if n == 0:
        reply = ("ما لقيت فعاليات مناسبة لطلبك. جرّب تذكر اهتماماً آخر أو وقتاً مختلفاً." if L == "ar"
                 else "I could not find matching events. Try another interest or time of day.")
    else:
        names = "، ".join(TAG_NAMES[x][0] for x in use_interests) if L == "ar" else ", ".join(TAG_NAMES[x][1] for x in use_interests)
        count = "فعالية واحدة" if n == 1 else ("فعاليتين" if n == 2 else f"{n} فعاليات")
        reply = (f"رشّحت لك {count} بلا تعارض بناءً على: {names}." if L == "ar"
                 else f"I picked {n} conflict-free event{'' if n == 1 else 's'} based on: {names}.")
        if not found:
            reply += (" (استخدمت اهتماماتك المحفوظة)" if L == "ar" else " (I used your saved interests)")
    return {"reply": reply, "detected": {"interests": found, "who": new_who, "time": window_name}, **res}
