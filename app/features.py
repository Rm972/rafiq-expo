# تحويل (زائر، فعالية) إلى أرقام يفهمها النموذج
def make_features(interests, who, tags, audience):
    tag_list = tags.split(";")
    matches = sum(1 for t in tag_list if t in interests)   # عدد الاهتمامات المتطابقة
    share = matches / len(tag_list)                         # نسبة التطابق من التصنيفات الفعالية
    kids = 1 if audience == "kids" else 0
    family = 1 if who == "family" else 0
    solo = 1 if who == "solo" else 0
    return [matches, share, kids, family, solo]
