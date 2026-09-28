#!/usr/bin/env python3
"""Build domains.json from raw/vercel_calls.jsonl (+ raw/rdap.jsonl) for every candidate in candidates.csv.
A domain belongs to a candidate when its first label is the normalized name, optionally with a
labs/hq/studio/co/works suffix or a get/try/use prefix."""
import csv, json, re, unicodedata
from pathlib import Path
W = Path(__file__).resolve().parent.parent
def norm(s):
    s = unicodedata.normalize("NFKD", s); s = "".join(c for c in s if not unicodedata.combining(c))
    return re.sub(r"[^a-z0-9]", "", s.lower().replace("&", "and"))
names = [r["name"].strip() for r in csv.DictReader(open(W / "candidates.csv", encoding="utf-8")) if r.get("name", "").strip()]
keymap = {}
for n in names:
    k = norm(n)
    for v in [k] + [k + s for s in ("labs", "hq", "studio", "co", "works", "inc")] + [p + k for p in ("get", "try", "use")]:
        keymap.setdefault(v, n)
out, seen = [], {}
def add(entry):
    key = (entry["domain"], entry["source"])
    if key in seen:  # keep the latest check of the same domain and source
        out[seen[key]] = entry
    else:
        seen[key] = len(out); out.append(entry)
for line in (W / "raw" / "vercel_calls.jsonl").read_text().splitlines():
    if not line.strip(): continue
    call = json.loads(line); avail = set(call["available"])
    for d in call["queried"]:
        n = keymap.get(d.split(".")[0])
        if n: add({"name": n, "domain": d, "available": d in avail, "checked_at": call["checked_at"], "source": "vercel", "call": call["call"]})
rdap = W / "raw" / "rdap.jsonl"
if rdap.exists():
    for line in rdap.read_text().splitlines():
        if line.strip():
            e = json.loads(line); n = keymap.get(e["domain"].split(".")[0])
            if n: add({"name": n, "domain": e["domain"], "available": e["available"], "checked_at": e["checked_at"], "source": "rdap", "note": e.get("note", "")})
(W / "domains.json").write_text(json.dumps(out, indent=1, ensure_ascii=False) + "\n")
missing = [n for n in names if not any(e["name"] == n for e in out)]
print(f"{len(out)} entries for {len(names)} candidates; {sum(e['available'] for e in out)} available; no lookup: {missing}")
