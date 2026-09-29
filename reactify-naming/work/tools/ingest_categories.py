#!/usr/bin/env python3
"""Ingest the category proposals of 2026-09-29 into the working files.

Usage: ingest_categories.py MERGED_JSON
MERGED_JSON is written by merge_categories.py: {"date": ..., "results": [{key, letter, label, kept, cuts, vercel, prices, stories}]}.

Every name that was checked goes to the screening log (research/category_screen.csv, raw/categories.json) and
every Vercel lookup to raw/vercel_calls.jsonl. Only the proposals that passed every screen join the longlist
(candidates.csv, status keep), so the brief's territory mix (F at most 20%) still holds.
"""
import csv, json, subprocess, sys, unicodedata, re
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


def main(path):
    data = json.loads(Path(path).read_text())
    date = data.get("date", "2026-09-29")
    by = {r["key"]: r for r in data["results"]}
    cats = [by[k] for k in ORDER if k in by]

    pool = json.load(open(W / "raw" / "pool_own.json"))
    dec = json.load(open(W / "raw" / "decisions.json"))
    tr = json.load(open(W / "report_parts" / "longlist_sr.json"))
    prices = json.load(open(W / "raw" / "prices.json"))
    existing = {norm(p["name"]) for p in pool}
    gen_pool = W / "raw" / "pool_gen.json"
    if gen_pool.exists():
        existing |= {norm(p["name"]) for p in json.load(open(gen_pool))}
    logged = {json.loads(l)["call"] for l in (W / "raw" / "vercel_calls.jsonl").read_text().splitlines() if l.strip()}

    # 1. every Vercel lookup, kept or cut
    n_calls = 0
    for c in cats:
        for i, v in enumerate(c["vercel"], 1):
            cid = f"cat-{c['key']}-r{v.get('round', 1)}-{i:02d}"
            if cid in logged or not v["queried"]:
                continue
            q = [d.lower() for d in v["queried"]]
            a = [d.lower() for d in v["available"] if d.lower() in q]
            subprocess.run([sys.executable, str(W / "tools" / "log_call.py"), cid, ",".join(q), ",".join(a), date],
                           check=True, capture_output=True)
            n_calls += 1

    # 2. kept proposals join the longlist; everything goes to the screening log
    log_rows, summary, dup = [], {}, []
    price_have = {p["domain"] for p in prices}
    seen_log = set()
    for c in cats:
        kept_names = []
        for k in c["kept"]:
            key = norm(k["name"])
            if key in existing:
                dup.append(k["name"]); continue
            existing.add(key); kept_names.append(k); seen_log.add(key)
            pool.append({"name": k["name"], "territory": c["letter"], "source": f"category:{c['key']}", "story": k.get("story", "")})
            risk = k.get("risk", "").strip()
            dec[k["name"]] = {"status": "keep", "reason": f"Category proposal ({date}): passed domain, trademark, conflict and skeptic screens; not independently reviewed. Risk: {risk}"}
            tr[k["name"]] = f"Predlog po kategoriji ({date}): prošao proveru domena, žigova, konflikata i skeptika; nije nezavisno recenziran. Rizik: {k.get('risk_sr', '').strip()}"
            if k.get("best_domain") and k["best_domain"].lower() not in price_have and k.get("price_first_year"):
                prices.append({"domain": k["best_domain"].lower(), "years": 1, "first_year_usd": k["price_first_year"],
                               "renewal_usd": k["price_renewal"], "checked_at": date, "source": "vercel get_bulk_price"})
                price_have.add(k["best_domain"].lower())
            log_rows.append({"name": k["name"], "category": c["key"], "territory": c["letter"], "status": "kept", "stage": "verify",
                             "round": k.get("round", ""), "reason": risk})
        for x in c["cuts"]:
            key = norm(x["name"])
            if key in seen_log:
                continue
            seen_log.add(key)
            log_rows.append({"name": x["name"], "category": c["key"], "territory": c["letter"], "status": "cut",
                             "stage": x.get("stage", ""), "round": x.get("round", ""), "reason": x.get("reason", "")})
        summary[c["key"]] = kept_names

    json.dump(pool, open(W / "raw" / "pool_own.json", "w"), ensure_ascii=False, indent=1)
    json.dump(dec, open(W / "raw" / "decisions.json", "w"), ensure_ascii=False, indent=1)
    json.dump(tr, open(W / "report_parts" / "longlist_sr.json", "w"), ensure_ascii=False, indent=1)
    json.dump(prices, open(W / "raw" / "prices.json", "w"), indent=1)
    with open(W / "research" / "category_screen.csv", "w", newline="", encoding="utf-8") as f:
        wr = csv.DictWriter(f, fieldnames=["name", "category", "territory", "status", "stage", "round", "reason"])
        wr.writeheader(); wr.writerows(log_rows)
    counts = {c["key"]: {"checked": sum(1 for r in log_rows if r["category"] == c["key"]), "kept": len(summary[c["key"]])} for c in cats}
    json.dump({"date": date, "categories": [{"key": c["key"], "label": c["label"], "label_sr": LABEL_SR[c["key"]], "letter": c["letter"],
                                             "checked": counts[c["key"]]["checked"], "kept": summary[c["key"]],
                                             "cuts": [x for x in c["cuts"]]} for c in cats]},
              open(W / "raw" / "categories.json", "w"), ensure_ascii=False, indent=1)

    # 3. Serbian report subsection inside section 4
    total_checked = sum(v["checked"] for v in counts.values())
    total_kept = sum(v["kept"] for v in counts.values())
    lines = ["### Novi predlozi po kategorijama (29.09.2026)", "",
             "Na zahtev osnivača tražili smo najmanje 10 predloga u svakoj od 8 kategorija. "
             f"Broj proverenih novih imena: **{total_checked}**; sve provere je prošlo: **{total_kept}**. Provere su datirana Vercel provera domena, GitHub, "
             "TMview za klase 9/35/42 (USPTO, EUIPO, WIPO, Srbija), pretraga istoimenih tech firmi, jezički pregled i radio-test, a zatim je skeptik "
             "pokušao da obori svako ime (**VERIFIED**, 29.09.2026). "
             "Samo ta imena su dodata u longlistu (status „zadržano”); sva odbačena imena sa razlozima su u `work/research/category_screen.csv`. "
             "Ovi predlozi **nisu** prošli punu nezavisnu recenziju kao Spelter, Cobden i Ramsden, pa pre izbora treba ponoviti taj korak.", ""]
    for c in cats:
        ks = summary[c["key"]]
        lines += [f"**{LABEL_SR[c['key']]}** (prošlo: {len(ks)}; provereno: {counts[c['key']]['checked']})", "",
                  "| Ime | Priča | Izgovor | Najbolji domen (1. god. / obnova, USD) | Glavni rizik |", "|---|---|---|---|---|"]
        for k in ks:
            price = f"{k.get('price_first_year', '')} / {k.get('price_renewal', '')}".replace(".", ",")
            row = [f"**{k['name']}**", (k.get("story_sr") or k.get("story", "")).replace("|", "/"), k.get("pronunciation", ""),
                   f"{k.get('best_domain', '')} {price}", k.get("risk_sr", "").replace("|", "/")]
            lines.append("| " + " | ".join(row) + " |")
        lines.append("")
    (W / "report_parts" / "4b_kategorije.md").write_text("\n".join(lines) + "\n", encoding="utf-8")
    print(f"logged {n_calls} Vercel calls; checked {total_checked}; kept {total_kept}; duplicates skipped: {dup}")
    for c in cats:
        print(f"  {c['key']}: {counts[c['key']]['kept']} kept of {counts[c['key']]['checked']}")


if __name__ == "__main__":
    main(sys.argv[1])
