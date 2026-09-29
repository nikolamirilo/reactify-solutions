#!/usr/bin/env python3
"""Ingest the category-proposal workflow results (2026-09-29) into the working files.

Usage: ingest_categories.py OUTPUT_JSON [OUTPUT_JSON ...]
Each OUTPUT_JSON is a workflow task output file whose "result" holds {date, results: [...]}.
Writes: raw/vercel_calls.jsonl (via log_call.py), raw/pool_own.json, raw/decisions.json,
raw/prices.json, raw/categories.json, report_parts/longlist_sr.json, report_parts/4b_kategorije.md.
"""
import json, subprocess, sys, unicodedata, re
from pathlib import Path

W = Path(__file__).resolve().parent.parent
ORDER = ["english", "compound", "acronym", "serbian", "foreign", "latin", "namelike", "invented"]
LABEL_SR = {"english": "Engleske reči", "compound": "Spojene reči (kombinacije)", "acronym": "Akronimi",
            "serbian": "Srpske reči", "foreign": "Druge strane reči", "latin": "Latinski i grčki koreni",
            "namelike": "Imena (istorijski majstori)", "invented": "Izmišljene reči (kovanice)"}


def norm(s):
    s = unicodedata.normalize("NFKD", s)
    s = "".join(c for c in s if not unicodedata.combining(c))
    return re.sub(r"[^a-z0-9]", "", s.lower())


def load(paths):
    results = []
    for p in paths:
        data = json.loads(Path(p).read_text())
        data = data.get("result", data)
        results += data["results"]
    by = {r["key"]: r for r in results}
    return [by[k] for k in ORDER if k in by], data.get("date", "2026-09-29")


def main(paths):
    cats, date = load(paths)
    pool = json.load(open(W / "raw" / "pool_own.json"))
    dec = json.load(open(W / "raw" / "decisions.json"))
    tr = json.load(open(W / "report_parts" / "longlist_sr.json"))
    prices = json.load(open(W / "raw" / "prices.json"))
    existing = {norm(p["name"]) for p in pool}
    gen_pool = W / "raw" / "pool_gen.json"
    if gen_pool.exists():
        existing |= {norm(p["name"]) for p in json.load(open(gen_pool))}
    logged = {json.loads(l)["call"] for l in (W / "raw" / "vercel_calls.jsonl").read_text().splitlines() if l.strip()}

    # 1. Vercel calls
    n_calls = 0
    for c in cats:
        for i, v in enumerate(c["vercel"], 1):
            cid = f"cat-{c['key']}-r{v.get('round', 1)}-{i:02d}"
            if cid in logged or not v["queried"]:
                continue
            q = [d.lower() for d in v["queried"]]
            a = [d.lower() for d in v["available"] if d.lower() in q]
            subprocess.run([sys.executable, str(W / "tools" / "log_call.py"), cid, ",".join(q), ",".join(a), date], check=True, capture_output=True)
            n_calls += 1

    # 2. names, decisions, translations
    added, dup, summary = 0, [], {}
    price_have = {p["domain"] for p in prices}
    for c in cats:
        kept_names = []
        for k in c["kept"]:
            key = norm(k["name"])
            if key in existing:
                dup.append(k["name"]); continue
            existing.add(key); added += 1; kept_names.append(k)
            pool.append({"name": k["name"], "territory": c["letter"], "source": f"category:{c['key']}", "story": k.get("story", "")})
            risk = k.get("risk", "").strip()
            dec[k["name"]] = {"status": "keep", "reason": f"Category proposal ({date}): passed domain, trademark, conflict and skeptic screens; not independently reviewed. Risk: {risk}"}
            tr[k["name"]] = f"Predlog po kategoriji ({date}): prošao proveru domena, žigova, konflikata i skeptika; nije nezavisno recenziran. Rizik: {k.get('risk_sr', '').strip()}"
            if k["best_domain"].lower() not in price_have and k.get("price_first_year"):
                prices.append({"domain": k["best_domain"].lower(), "years": 1, "first_year_usd": k["price_first_year"], "renewal_usd": k["price_renewal"], "checked_at": date, "source": "vercel get_bulk_price"})
                price_have.add(k["best_domain"].lower())
        for x in c["cuts"]:
            key = norm(x["name"])
            if key in existing:
                continue
            existing.add(key); added += 1
            story = (c["stories"].get(x["name"]) or {}).get("story", "") or x["name"]
            pool.append({"name": x["name"], "territory": c["letter"], "source": f"category:{c['key']}", "story": story})
            dec[x["name"]] = {"status": "cut", "reason": x["reason"]}
            if x.get("reason_sr"):
                tr[x["name"]] = x["reason_sr"]
        summary[c["key"]] = kept_names

    json.dump(pool, open(W / "raw" / "pool_own.json", "w"), ensure_ascii=False, indent=1)
    json.dump(dec, open(W / "raw" / "decisions.json", "w"), ensure_ascii=False, indent=1)
    json.dump(tr, open(W / "report_parts" / "longlist_sr.json", "w"), ensure_ascii=False, indent=1)
    json.dump(prices, open(W / "raw" / "prices.json", "w"), indent=1)
    json.dump({"date": date, "categories": [{"key": c["key"], "label": c["label"], "letter": c["letter"], "kept": summary[c["key"]],
                                             "cut_count": len(c["cuts"])} for c in cats]},
              open(W / "raw" / "categories.json", "w"), ensure_ascii=False, indent=1)

    # 3. report part (Serbian)
    lines = ["### Novi predlozi po kategorijama (29.09.2026)", "",
             "Na zahtev osnivača generisali smo najmanje 10 predloga u svakoj kategoriji. Svaki predlog je prošao datiranu Vercel proveru domena, "
             "TMview pretragu za klase 9/35/42 (USPTO, EUIPO, WIPO, Srbija), pretragu istoimenih tech firmi, jezički pregled i radio-test, "
             "a zatim ga je skeptik pokušao da obori (**VERIFIED**, 29.09.2026, `work/raw/categories.json`). Ovi predlozi **nisu** prošli punu "
             "nezavisnu recenziju kao Spelter, Cobden i Ramsden, pa pre izbora treba ponoviti taj korak.", ""]
    for c in cats:
        ks = summary[c["key"]]
        lines += [f"**{LABEL_SR[c['key']]}** ({len(ks)})", "",
                  "| Ime | Priča | Izgovor | Najbolji domen (1. god. / obnova, USD) | Glavni rizik |", "|---|---|---|---|---|"]
        for k in ks:
            price = f"{k.get('price_first_year', '')} / {k.get('price_renewal', '')}".replace(".", ",")
            row = [f"**{k['name']}**", k.get("story_sr", "").replace("|", "/"), k.get("pronunciation", ""),
                   f"{k['best_domain']} {price}", k.get("risk_sr", "").replace("|", "/")]
            lines.append("| " + " | ".join(row) + " |")
        lines.append("")
    (W / "report_parts" / "4b_kategorije.md").write_text("\n".join(lines) + "\n", encoding="utf-8")
    print(f"logged {n_calls} Vercel calls; added {added} names; duplicates skipped: {dup}")
    for c in cats:
        print(c["key"], len(summary[c["key"]]), "kept;", len(c["cuts"]), "cut")


if __name__ == "__main__":
    main(sys.argv[1:])
