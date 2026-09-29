#!/usr/bin/env python3
"""Merge the pre-restart category state (raw/categories/cat_state.json) with the continuation workflow outputs.

Usage: merge_categories.py OUT_JSON CONTINUATION_OUTPUT [CONTINUATION_OUTPUT ...]
Each CONTINUATION_OUTPUT is a workflow task output whose "result" holds {date, results: [{key, keptNew, cutsNew, vercelNew, pricesNew, storiesNew}]}.
"""
import json, sys
from pathlib import Path

W = Path(__file__).resolve().parent.parent


def main(out_path, inputs):
    state = json.load(open(W / "raw" / "categories" / "cat_state.json"))
    new = {}
    date = "2026-09-29"
    for p in inputs:
        d = json.loads(Path(p).read_text())
        d = d.get("result", d)
        date = d.get("date", date)
        for r in d["results"]:
            new[r["key"]] = r
    results = []
    for key, old in state.items():
        n = new.get(key, {})
        stories = {**old["stories"], **n.get("storiesNew", {})}
        pending = {v["name"].lower(): v for v in old.get("pending_verify", [])}
        kept = list(old["kept"])
        for k in n.get("keptNew", []):
            base = pending.get(k["name"].lower(), {}) if k.get("from_pending") else {}
            kept.append({**stories.get(k["name"], {}), **base, **k})
        results.append({"key": key, "letter": old["letter"], "label": old["label"], "kept": kept,
                        "cuts": old["cuts"] + n.get("cutsNew", []), "vercel": old["vercel"] + n.get("vercelNew", []),
                        "prices": old["prices"] + n.get("pricesNew", []), "stories": stories,
                        "notes": n.get("notes", [])})
        print(f"{key}: {len(kept)} kept, {len(results[-1]['cuts'])} cut, {len(results[-1]['vercel'])} Vercel calls"
              + (f", notes: {n['notes']}" if n.get("notes") else ""))
    Path(out_path).write_text(json.dumps({"date": date, "results": results}, ensure_ascii=False))


if __name__ == "__main__":
    main(sys.argv[1], sys.argv[2:])
