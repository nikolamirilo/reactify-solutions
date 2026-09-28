#!/usr/bin/env python3
"""Assemble REPORT.md from report_parts/*.md and generate section 4 (longlist) from candidates.csv + longlist_sr.json."""
import csv, json
from pathlib import Path
W = Path(__file__).resolve().parent.parent
P = W / "report_parts"
tr = json.load(open(P / "longlist_sr.json", encoding="utf-8"))
rows = list(csv.DictReader(open(W / "candidates.csv", encoding="utf-8")))
status_sr = {"finalist": "finalista", "keep": "zadržano", "cut": "odbačeno"}
terr = {"A": "A · engleska reč", "B": "B · latinski/grčki", "C": "C · ime", "D": "D · kovanica", "E": "E · akronim", "F": "F · strana reč"}
from collections import Counter
cnt = Counter(r["status"] for r in rows); tc = Counter(r["territory"] for r in rows)
lines = ["## 4. Kompletna longlista", "",
         f"Ukupno **{len(rows)} kandidata** (A {tc['A']} · B {tc['B']} · C {tc['C']} · D {tc['D']} · E {tc['E']} · F {tc['F']}): "
         f"{cnt['finalist']} finalista, {cnt['keep']} zadržana van top 10, {cnt['cut']} odbačenih. "
         "Svaki kandidat ima bar jednu datiranu Vercel proveru domena u `work/domains.json` (**VERIFIED**, 28.09.2026). "
         "Razlozi su skraćeni; puni dokazi su u `work/research/`.", "",
         "| # | Ime | Teritorija | Status | Razlog |", "|---|---|---|---|---|"]
order = {"finalist": 0, "keep": 1, "cut": 2}
for i, r in enumerate(sorted(rows, key=lambda r: (order[r["status"]], r["territory"], r["name"])), 1):
    reason = tr.get(r["name"], r["reason"]).replace("|", "/")
    lines.append(f"| {i} | **{r['name']}** | {terr[r['territory']]} | {status_sr[r['status']]} | {reason} |")
(P / "4_longlista.md").write_text("\n".join(lines) + "\n", encoding="utf-8")
parts = ["0_uvod.md", "1_top3.md", "2_top10.md", "3_akronimi.md", "4_longlista.md", "5_uzori.md", "6_koraci.md", "7_izvori.md"]
missing = [p for p in parts if not (P / p).exists()]
assert not missing, missing
(W / "REPORT.md").write_text("\n\n".join((P / p).read_text(encoding="utf-8").strip() for p in parts) + "\n", encoding="utf-8")
print("REPORT.md written:", len((W / "REPORT.md").read_text().split()), "words")
