import random, pandas as pd
TAGS = ["tech", "business", "kids", "art", "culture", "food", "entertainment"]
WHO = ["solo", "family", "friends"]

def like_probability(matches, share, kids, who, ent):
    p = 0.05 + 0.45 * share + 0.12 * min(matches, 2)
    if kids:
        p += 0.25 if who == "family" else -0.35
    if ent and who == "friends":
        p += 0.12
    if who == "solo" and ent:
        p -= 0.05
    return max(0.02, min(0.95, p))

def make(path="data/training.csv", visitors=500, per_visitor=10, seed=42):
    random.seed(seed)
    ev = pd.read_csv("data/events.csv").to_dict("records")
    rows = []
    for v in range(visitors):
        interests = random.sample(TAGS, random.randint(1, 3))
        who = random.choice(WHO)
        for e in random.sample(ev, per_visitor):
            tags = e["tags"].split(";")
            matches = sum(t in interests for t in tags)
            p = like_probability(matches, matches / len(tags), e["audience"] == "kids", who, "entertainment" in tags)
            rows.append([v, ";".join(interests), who, e["id"], 1 if random.random() < p else 0])
    pd.DataFrame(rows, columns=["visitor_id", "interests", "who", "event_id", "liked"]).to_csv(path, index=False)
    return len(rows)

if __name__ == "__main__":
    print("rows:", make())
