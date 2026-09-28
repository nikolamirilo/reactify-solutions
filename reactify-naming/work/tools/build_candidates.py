#!/usr/bin/env python3
"""Merge raw/pool_own.json + raw/pool_gen.json with raw/decisions.json into candidates.csv.
decisions.json: {name: {"status": "cut|keep|finalist", "reason": "..."}}; names without a decision stay 'keep'."""
import csv, json
from pathlib import Path
W = Path(__file__).resolve().parent.parent
pool = json.load(open(W / "raw" / "pool_own.json"))
gen = W / "raw" / "pool_gen.json"
if gen.exists():
    pool += json.load(open(gen))
dec = json.load(open(W / "raw" / "decisions.json")) if (W / "raw" / "decisions.json").exists() else {}
seen, rows = set(), []
for c in pool:
    k = c["name"].lower()
    if k in seen:
        continue
    seen.add(k)
    d = dec.get(c["name"], {})
    rows.append({"name": c["name"], "territory": c["territory"], "story": c["story"],
                 "status": d.get("status", "keep"), "reason": d.get("reason", "")})
missing = [n for n in dec if n.lower() not in seen]
assert not missing, f"decisions for unknown names: {missing}"
with open(W / "candidates.csv", "w", newline="", encoding="utf-8") as f:
    w = csv.DictWriter(f, fieldnames=["name", "territory", "story", "status", "reason"])
    w.writeheader(); w.writerows(rows)
from collections import Counter
print(len(rows), "candidates;", dict(Counter(r["status"] for r in rows)), dict(Counter(r["territory"] for r in rows)))
