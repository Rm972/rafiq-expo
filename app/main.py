from fastapi import FastAPI, HTTPException
from fastapi.responses import RedirectResponse
from fastapi.staticfiles import StaticFiles
from app import logic

app = FastAPI(title="رفيق الزائر الذكي")

def split(text):
    return [x for x in (text or "").split(",") if x]

def check_lang(lang):
    return "en" if lang == "en" else "ar"

@app.get("/")
def home():
    return RedirectResponse("/site/")

@app.get("/api/halls")
def halls():
    return logic.HALLS

@app.get("/api/about")
def about():
    return {"metrics": logic.METRICS, "events": len(logic.EVENTS), "synthetic": True}

@app.get("/api/events")
def events(lang: str = "ar", interests: str = "", who: str = "solo"):
    lang = check_lang(lang)
    ins = split(interests)
    return [logic.view(e, lang, logic.ai_score(e, ins, who), ins, who) for e in logic.EVENTS]

@app.get("/api/event/{event_id}")
def event(event_id: int, interests: str = "", who: str = "solo", lang: str = "ar"):
    ev = logic.BY_ID.get(event_id)
    if ev is None:
        raise HTTPException(404, "رقم الفعالية غير موجود")
    lang = check_lang(lang)
    ins = split(interests)
    d = logic.view(ev, lang, logic.ai_score(ev, ins, who), ins, who)
    d["alternatives"] = logic.alternatives(event_id, ins, who, lang)
    return d

@app.get("/api/recommend")
def recommend(interests: str = "", who: str = "solo", pace: str = "balanced", lang: str = "ar"):
    if who not in ("solo", "family", "friends"):
        raise HTTPException(400, "who must be solo, family or friends")
    return logic.recommend(split(interests), who, pace, check_lang(lang))

@app.get("/api/validate")
def validate(ids: str = "", lang: str = "ar"):
    return logic.validate([int(i) for i in split(ids) if i.isdigit()], check_lang(lang))

@app.get("/api/route")
def route(frm: str = "entrance", to: str = "A"):
    if frm not in logic.HALLS or to not in logic.HALLS:
        raise HTTPException(404, "unknown place")
    return logic.route(frm, to)

@app.get("/api/assistant")
def assistant(q: str, interests: str = "", who: str = "solo", pace: str = "balanced", lang: str = "ar"):
    return logic.assistant(q, split(interests), who, pace, check_lang(lang))

app.mount("/site", StaticFiles(directory="static", html=True), name="site")
