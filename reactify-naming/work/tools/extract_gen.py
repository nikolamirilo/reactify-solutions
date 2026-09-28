#!/usr/bin/env python3
"""Extract generator candidates (and their pre-screen domain checks) from the workflow journal into raw/pool_gen.json and raw/gen_domains.json."""
import json, sys
from pathlib import Path
W = Path(__file__).resolve().parent.parent
journal = Path(sys.argv[1])
own = {c["name"].lower() for c in json.load(open(W / "raw" / "pool_own.json"))}
pool, doms, seen = [], [], set()
for line in journal.read_text().splitlines():
    e = json.loads(line)
    if e.get("type") != "result":
        continue
    r = e.get("result") or e.get("value")
    if isinstance(r, str):
        r = json.loads(r)
    if not isinstance(r, dict) or "candidates" not in r:
        continue
    for c in r["candidates"]:
        k = c["name"].lower()
        doms += [{"name": c["name"], **d} for d in c.get("domains_checked", [])]
        if k in seen or k in own:
            continue
        seen.add(k)
        pool.append({"name": c["name"], "territory": c["territory"], "source": "generator " + e.get("agentId", "")[:6],
                     "story": c["story"], "pronunciation": c.get("pronunciation", ""), "risks": c.get("risks", ""),
                     "why_cool": c.get("why_cool", "")})
json.dump(pool, open(W / "raw" / "pool_gen.json", "w"), indent=1, ensure_ascii=False)
json.dump(doms, open(W / "raw" / "gen_domains.json", "w"), indent=1, ensure_ascii=False)
print(len(pool), "generator candidates;", len(doms), "generator domain checks (pre-screen, not used as evidence)")
