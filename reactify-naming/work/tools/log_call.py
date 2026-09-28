#!/usr/bin/env python3
"""Append one Vercel availability call to raw/vercel_calls.jsonl.
Usage: log_call.py CALL_ID "queried,domains,..." "available,domains,..." [date]
Every queried domain not in the available list is recorded as available=false."""
import json, sys
from pathlib import Path
call_id, queried, available = sys.argv[1], sys.argv[2], sys.argv[3]
checked = sys.argv[4] if len(sys.argv) > 4 else "2026-09-28"
q = [d.strip().lower() for d in queried.split(",") if d.strip()]
a = [d.strip().lower() for d in available.split(",") if d.strip()]
bad = [d for d in a if d not in q]
assert not bad, f"available but not queried: {bad}"
path = Path(__file__).resolve().parent.parent / "raw" / "vercel_calls.jsonl"
existing = [json.loads(l)["call"] for l in path.read_text().splitlines() if l.strip()]
assert call_id not in existing, f"duplicate call id {call_id}"
with path.open("a") as f:
    f.write(json.dumps({"call": call_id, "checked_at": checked, "tool": "get_bulk_availability", "queried": q, "available": a}) + "\n")
print(f"{call_id}: {len(q)} queried, {len(a)} available")
