import json, os, joblib, pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import roc_auc_score
from app.features import make_features
from app import make_data

def load_xy():
    if not os.path.exists("data/training.csv"):
        make_data.make()
    tr = pd.read_csv("data/training.csv")
    ev = pd.read_csv("data/events.csv")
    df = tr.merge(ev, left_on="event_id", right_on="id")
    X = [make_features(r.interests.split(";"), r.who, r.tags, r.audience) for r in df.itertuples()]
    return X, df["liked"].tolist()

def train():
    X, y = load_xy()
    Xtr, Xte, ytr, yte = train_test_split(X, y, test_size=0.2, random_state=42)
    model = RandomForestClassifier(n_estimators=100, max_depth=5, random_state=42)
    model.fit(Xtr, ytr)
    auc = roc_auc_score(yte, model.predict_proba(Xte)[:, 1])
    base = roc_auc_score(yte, [x[0] for x in Xte])          # الخط الأساسي: عدد التطابقات فقط
    metrics = {"model_auc": round(auc, 2), "baseline_auc": round(base, 2), "random_auc": 0.5,
               "rows": len(X), "train_rows": len(Xtr), "test_rows": len(Xte)}
    joblib.dump(model, "data/model.joblib")
    json.dump(metrics, open("data/metrics.json", "w"), indent=1)
    return metrics

if __name__ == "__main__":
    print(train())
