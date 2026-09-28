#!/usr/bin/env python3
"""Done-check for the Reactify naming research loop (see BRIEF.md). Do not edit.

Reads the working files in ./work, prints a DONE CHECK table and the score
ranking, and exits 0 only when no check fails (warnings are allowed).
Standard library only. Usage: python3 verify.py
"""
from __future__ import annotations

import csv
import json
import re
import sys
import unicodedata
from collections import Counter, defaultdict
from datetime import date, datetime
from pathlib import Path

ROOT = Path(__file__).resolve().parent
WORK = ROOT / "work"

MIN_CANDIDATES = 40
FINALISTS = 10
TOP = 3
MIN_ACRONYMS = 5
MAX_FOREIGN_SHARE = 0.20
MAX_CHECK_AGE_DAYS = 3
MIN_REPORT_LINKS = 10
MIN_SERBIAN_LETTERS = 20
CORE_TLDS = ("com", "io", "ai", "dev", "co", "studio", "app")
TERRITORIES = "ABCDEF"
STATUSES = ("cut", "keep", "finalist")
SOURCES = ("vercel", "rdap")
WEIGHTS = {  # BRIEF.md 2.11
    "cool": 0.25,
    "story": 0.20,
    "legal": 0.20,
    "pronunciation": 0.15,
    "scalability": 0.10,
    "domains": 0.10,
}
CANDIDATE_COLUMNS = ["name", "territory", "story", "status", "reason"]
FINALIST_COLUMNS = ["name", "territory", "best_domain", "trademark_url", "conflict_url",
                    *WEIGHTS, "top3", "price_first_year", "price_renewal"]
REPORT_HEADINGS = [
    "## 1. Top 3 preporuka",
    "## 2. Top 10 finalista",
    "## 3. Akronimi",
    "## 4. Kompletna longlista",
    "## 5. Analiza uzora",
    "## 6. Sledeći koraci",
    "## 7. Izvori",
]
# BRIEF.md 2.7 plus the style anchors: never proposed again.
EXPLORED = """
Zanat Owncraft Thinkwright Productsmith Outright TPO ShipAndOwn ShipOwn
Ownstead Gazda Prow Brazda Salash Salas Vredno Tendwell Plumbline Throughline
Koshava Kosava Zukuri Eigenwert Idemo Zelkova Burin Bosun Capstan Quiddity Ajde Pravo Umpteen
Gotovo Yield Vow Proofwork Millwright Stead Tiller Tenure Delo Artel Onus Rectify Alembic Distill
Slipway Azeo Ovra Tvor Reflux Tova
Shipwright Twofold Keelworks Kova Holdfast Mainspring Shipyard Opus Lathe Kodo Arvo Axia Okapi
Weft Kerf Anneal Ingot Menhir Athanor Verk Kazi Bismuth Gesso Fornax Kodawari Shuhari Opifex
Arete Techne Gumption Mettle
Braze Brame Adacta Brigit
""".split()
# Names one edit away from these are rejected as near-copies.
ANCHORS = ["Braze", "Brame", "Adacta", "Brigit", "Koshava", "Zanat"]
SERBIAN_LETTERS = set("čćšžđČĆŠŽĐ")
URL_RE = re.compile(r"https?://[^\s)>\]]+")
VERDICT_RE = re.compile(r"^\W*VERDICT\W+(.+?)\s*:\W*(PASS|FAIL)\b", re.IGNORECASE)


class CheckFailed(Exception):
    """Raised inside a check to report a FAIL with a message."""


def need(condition: bool, message: str) -> None:
    if not condition:
        raise CheckFailed(message)


def norm(name: str) -> str:
    """Case-, accent- and punctuation-insensitive key for a name."""
    text = unicodedata.normalize("NFKD", str(name))
    text = "".join(ch for ch in text if not unicodedata.combining(ch))
    text = text.lower().replace("&", "and")
    return re.sub(r"[^a-z0-9]", "", text)


def edit_distance(a: str, b: str) -> int:
    prev = list(range(len(b) + 1))
    for i, ca in enumerate(a, 1):
        cur = [i]
        for j, cb in enumerate(b, 1):
            cur.append(min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (ca != cb)))
        prev = cur
    return prev[-1]


def listing(items: list[str], limit: int = 5) -> str:
    shown = ", ".join(items[:limit])
    return shown + (f" (+{len(items) - limit} more)" if len(items) > limit else "")


def is_yes(value: str) -> bool:
    return value.strip().lower() in ("yes", "y", "true", "1")


def tld_of(domain: str) -> str:
    return str(domain).lower().rstrip(".").rsplit(".", 1)[-1]


def as_number(value: str) -> float:
    return float(value.replace("$", "").replace("USD", "").strip())


# ---------------------------------------------------------------- loading


def _clean(value) -> str:
    if isinstance(value, list):
        value = ",".join(v or "" for v in value)
    return (value or "").strip()


def load_csv(filename: str, columns: list[str]) -> list[dict]:
    path = WORK / filename
    need(path.exists(), f"missing work/{filename}")
    with path.open(newline="", encoding="utf-8-sig") as handle:
        reader = csv.DictReader(handle)
        header = [_clean(h) for h in (reader.fieldnames or [])]
        missing = [c for c in columns if c not in header]
        need(not missing, f"work/{filename} lacks columns: {', '.join(missing)}")
        rows = [{(_clean(k) if k else "_extra"): _clean(v) for k, v in row.items()}
                for row in reader]
    return [row for row in rows if any(row.get(c) for c in columns)]


def load_domains() -> list:
    path = WORK / "domains.json"
    need(path.exists(), "missing work/domains.json")
    try:
        data = json.loads(path.read_text(encoding="utf-8"))
    except json.JSONDecodeError as err:
        raise CheckFailed(f"work/domains.json is not valid JSON ({err.msg}, line {err.lineno})")
    need(isinstance(data, list), "work/domains.json must be a JSON array")
    return data


class Data:
    """Loads each working file once; a load error becomes that check's FAIL."""

    def __init__(self) -> None:
        self._cache: dict[str, tuple] = {}
        self.ranking: list[tuple[float, dict]] = []

    def _get(self, key: str, loader):
        if key not in self._cache:
            try:
                self._cache[key] = (loader(), None)
            except CheckFailed as err:
                self._cache[key] = (None, str(err))
        value, error = self._cache[key]
        if error:
            raise CheckFailed(error)
        return value

    def candidates(self) -> list[dict]:
        return self._get("candidates", lambda: load_csv("candidates.csv", CANDIDATE_COLUMNS))

    def finalists(self) -> list[dict]:
        return self._get("finalists", lambda: load_csv("finalists.csv", FINALIST_COLUMNS))

    def domains(self) -> list:
        return self._get("domains", load_domains)

    def domain_index(self) -> dict[str, list[dict]]:
        index: dict[str, list[dict]] = defaultdict(list)
        for entry in self.domains():
            if isinstance(entry, dict) and "name" in entry and "domain" in entry:
                index[norm(entry["name"])].append(entry)
        return index

    def top3(self) -> list[dict]:
        return [row for row in self.finalists() if is_yes(row["top3"])]


# ---------------------------------------------------------------- checks


def check_longlist(data: Data):
    rows = data.candidates()
    problems, seen = [], set()
    for row in rows:
        key = norm(row["name"])
        if not key:
            problems.append("a row has no name")
            continue
        if key in seen:
            problems.append(f"duplicate {row['name']}")
        seen.add(key)
        if row["territory"].upper() not in TERRITORIES or len(row["territory"]) != 1:
            problems.append(f"{row['name']}: territory '{row['territory']}' (use A-F)")
        if row["status"].lower() not in STATUSES:
            problems.append(f"{row['name']}: status '{row['status']}' (use cut/keep/finalist)")
        elif row["status"].lower() == "cut" and not row["reason"]:
            problems.append(f"{row['name']}: cut without a reason")
    need(not problems, listing(problems))
    need(len(rows) >= MIN_CANDIDATES, f"{len(rows)} candidates, need {MIN_CANDIDATES}+")
    status = Counter(row["status"].lower() for row in rows)
    return "PASS", (f"{len(rows)} candidates: {status['finalist']} finalist, "
                    f"{status['keep']} keep, {status['cut']} cut")


def check_new_names(data: Data):
    explored = {norm(name) for name in EXPLORED}
    anchors = {norm(name): name for name in ANCHORS}
    clashes = []
    for row in data.candidates():
        key = norm(row["name"])
        if key in explored:
            clashes.append(f"{row['name']} (already explored)")
        else:
            near = [shown for anchor, shown in anchors.items() if edit_distance(key, anchor) <= 1]
            if near:
                clashes.append(f"{row['name']} (near-copy of {near[0]})")
    need(not clashes, "remove: " + listing(clashes))
    return "PASS", "no explored names, no near-copies of the style anchors"


def check_territories(data: Data):
    rows = data.candidates()
    counts = Counter(row["territory"].upper() for row in rows)
    mix = " · ".join(f"{t} {counts[t]}" for t in TERRITORIES)
    need(counts["E"] >= MIN_ACRONYMS,
         f"{counts['E']} acronym-as-word candidates (E), need {MIN_ACRONYMS}+ ({mix})")
    need(counts["F"] <= MAX_FOREIGN_SHARE * len(rows),
         f"{counts['F']} foreign-word candidates (F) exceed 20% of {len(rows)} ({mix})")
    thin = [t for t in "ABCD" if counts[t] < 3]
    if thin:
        return "WARN", f"fewer than 3 candidates in {', '.join(thin)} ({mix})"
    return "PASS", mix


def check_domain_screen(data: Data):
    entries = data.domains()
    today = date.today()
    problems = []
    sources: Counter = Counter()
    for i, entry in enumerate(entries):
        if not isinstance(entry, dict):
            problems.append(f"entry {i} is not an object")
            continue
        missing = [k for k in ("name", "domain", "available", "checked_at", "source") if k not in entry]
        if missing:
            problems.append(f"entry {i} lacks {', '.join(missing)}")
            continue
        label = entry["domain"]
        if not isinstance(entry["available"], bool):
            problems.append(f"{label}: 'available' must be true or false")
        source = str(entry["source"]).lower()
        sources[source] += 1
        if source not in SOURCES:
            problems.append(f"{label}: source '{entry['source']}' (use vercel or rdap)")
        try:
            checked = datetime.strptime(str(entry["checked_at"]), "%Y-%m-%d").date()
        except ValueError:
            problems.append(f"{label}: checked_at must be YYYY-MM-DD")
            continue
        if abs((today - checked).days) > MAX_CHECK_AGE_DAYS:
            problems.append(f"{label}: checked {checked}, more than {MAX_CHECK_AGE_DAYS} days ago")
    need(not problems, listing(problems))
    index = data.domain_index()
    unchecked = [row["name"] for row in data.candidates() if norm(row["name"]) not in index]
    need(not unchecked, "no domain lookup for: " + listing(unchecked))
    available = sum(1 for e in entries if e["available"] is True)
    detail = (f"{len(entries)} lookups, {available} available; "
              f"vercel {sources['vercel']}, rdap {sources['rdap']}")
    if sources["vercel"] == 0:
        return "WARN", detail + "; no Vercel lookups (brief requires Vercel when it is available)"
    return "PASS", detail


def check_finalists(data: Data):
    finals = data.finalists()
    need(len(finals) == FINALISTS, f"{len(finals)} rows in finalists.csv, need exactly {FINALISTS}")
    keys = [norm(row["name"]) for row in finals]
    need(len(set(keys)) == len(keys), "duplicate names in finalists.csv")
    status = {norm(row["name"]): row["status"].lower() for row in data.candidates()}
    unknown = [row["name"] for row in finals if norm(row["name"]) not in status]
    need(not unknown, "not in candidates.csv: " + listing(unknown))
    wrong = [row["name"] for row in finals if status[norm(row["name"])] != "finalist"]
    need(not wrong, "status is not 'finalist' in candidates.csv: " + listing(wrong))
    extra = [row["name"] for row in data.candidates()
             if row["status"].lower() == "finalist" and norm(row["name"]) not in keys]
    need(not extra, "marked finalist in candidates.csv but missing from finalists.csv: " + listing(extra))
    return "PASS", f"{FINALISTS} finalists, consistent with candidates.csv"


def check_evidence(data: Data):
    index = data.domain_index()
    problems = []
    for row in data.finalists():
        entries = index.get(norm(row["name"]), [])
        tlds = {tld_of(e["domain"]) for e in entries}
        missing = [t for t in CORE_TLDS if t not in tlds]
        if missing:
            problems.append(f"{row['name']}: no lookup for .{', .'.join(missing)}")
        best = row["best_domain"].lower()
        matches = [e for e in entries if str(e["domain"]).lower() == best]
        if not matches:
            problems.append(f"{row['name']}: best_domain '{best}' not in domains.json")
        elif not any(e.get("available") is True for e in matches):
            problems.append(f"{row['name']}: best_domain {best} is not available")
        for column in ("trademark_url", "conflict_url"):
            if not row[column].startswith(("http://", "https://")):
                problems.append(f"{row['name']}: {column} is not a link")
    need(not problems, listing(problems))
    return "PASS", "all core TLDs looked up, best domains available, evidence links present"


def check_scores(data: Data):
    problems, scored = [], []
    for row in data.finalists():
        bad = [f"{c}='{row[c]}'" for c in WEIGHTS if not re.fullmatch(r"[1-5]", row[c])]
        if bad:
            problems.append(f"{row['name']}: {', '.join(bad)}")
            continue
        total = sum(int(row[c]) * weight for c, weight in WEIGHTS.items())
        scored.append((round(total, 2), row))
    need(not problems, "scores must be integers 1-5: " + listing(problems))
    data.ranking = sorted(scored, key=lambda item: -item[0])
    best_total, best_row = data.ranking[0]
    return "PASS", f"weighted totals computed; highest: {best_row['name']} {best_total:.2f}"


def check_top3(data: Data):
    top = data.top3()
    need(len(top) == TOP, f"{len(top)} rows have top3 = yes, need exactly {TOP}")
    problems = []
    for row in top:
        for column in ("price_first_year", "price_renewal"):
            try:
                as_number(row[column])
            except ValueError:
                problems.append(f"{row['name']}: {column} '{row[column]}' is not a number")
    need(not problems, listing(problems))
    names = ", ".join(row["name"] for row in top)
    if len(data.ranking) >= TOP:
        cutoff = data.ranking[TOP - 1][0]
        totals = {norm(r["name"]): t for t, r in data.ranking}
        if any(totals.get(norm(row["name"]), 0) < cutoff for row in top):
            return "WARN", f"top 3 ({names}) are not the 3 highest totals; explain why in the report"
    return "PASS", f"top 3: {names}; domain prices recorded"


def check_review(data: Data):
    top = data.top3()
    need(len(top) == TOP, f"needs exactly {TOP} top-3 rows first")
    path = WORK / "review.md"
    need(path.exists(), "missing work/review.md")
    verdicts = {}
    for line in path.read_text(encoding="utf-8").splitlines():
        match = VERDICT_RE.match(line.strip())
        if match:
            verdicts[norm(match.group(1))] = match.group(2).upper()
    missing = [row["name"] for row in top if norm(row["name"]) not in verdicts]
    need(not missing, "no VERDICT line for: " + listing(missing))
    failed = [row["name"] for row in top if verdicts[norm(row["name"])] != "PASS"]
    need(not failed, "reviewer failed: " + listing(failed) + "; replace them and review again")
    return "PASS", "fresh-context reviewer passed all top-3 names"


def check_report(data: Data):
    path = WORK / "REPORT.md"
    need(path.exists(), "missing work/REPORT.md")
    text = path.read_text(encoding="utf-8")
    lines = [line.strip() for line in text.splitlines()]
    problems, positions, missing = [], [], []
    for heading in REPORT_HEADINGS:
        found = next((i for i, line in enumerate(lines) if line.startswith(heading)), None)
        if found is None:
            missing.append(f"'{heading}'")
        else:
            positions.append(found)
    if missing:
        problems.append("missing headings: " + listing(missing, 7))
    elif positions != sorted(positions):
        problems.append("headings are out of order")
    try:
        lowered = text.lower()
        absent = [row["name"] for row in data.finalists() if row["name"].lower() not in lowered]
        if absent:
            problems.append("finalists not mentioned: " + listing(absent))
    except CheckFailed as err:
        problems.append(f"cannot check finalist mentions ({err})")
    links = URL_RE.findall(text)
    if len(links) < MIN_REPORT_LINKS:
        problems.append(f"{len(links)} links; every conflict, trademark and availability "
                        f"claim needs a source ({MIN_REPORT_LINKS}+ links)")
    if sum(ch in SERBIAN_LETTERS for ch in text) < MIN_SERBIAN_LETTERS:
        problems.append("does not read as Serbian in Latin script (almost no č/ć/š/ž/đ)")
    need(not problems, "; ".join(problems))
    return "PASS", f"7 headings in order, {len(links)} links, {len(text.split())} words"


CHECKS = [
    ("Longlist", check_longlist),
    ("New names only", check_new_names),
    ("Territory mix", check_territories),
    ("Domain screen", check_domain_screen),
    ("Finalists", check_finalists),
    ("Finalist evidence", check_evidence),
    ("Scores", check_scores),
    ("Top 3", check_top3),
    ("Independent review", check_review),
    ("Report", check_report),
]


def cell(text: str) -> str:
    return str(text).replace("|", "/").replace("\n", " ")


def main() -> int:
    data = Data()
    results = []
    for label, check in CHECKS:
        try:
            status, detail = check(data)
        except CheckFailed as err:
            status, detail = "FAIL", str(err)
        except Exception as err:  # a malformed file must not crash the check
            status, detail = "FAIL", f"{type(err).__name__}: {err}"
        results.append((label, status, detail))

    print(f"### DONE CHECK · verify.py · {datetime.now():%Y-%m-%d %H:%M}")
    print()
    print("| # | Check | Result | Detail |")
    print("|---|---|---|---|")
    for number, (label, status, detail) in enumerate(results, 1):
        print(f"| {number} | {label} | {status} | {cell(detail)} |")

    if data.ranking:
        top_keys = set()
        try:
            top_keys = {norm(row["name"]) for row in data.top3()}
        except CheckFailed:
            pass
        print()
        print("**Score ranking** (weights 25/20/20/15/10/10, maximum 5.00)")
        print()
        print("| Rank | Name | Total | Top 3 |")
        print("|---|---|---|---|")
        for rank, (total, row) in enumerate(data.ranking, 1):
            mark = "yes" if norm(row["name"]) in top_keys else ""
            print(f"| {rank} | {cell(row['name'])} | {total:.2f} | {mark} |")

    fails = sum(1 for _, status, _ in results if status == "FAIL")
    warns = sum(1 for _, status, _ in results if status == "WARN")
    print()
    if warns:
        print(f"{warns} warning(s): review them before finishing.")
    print("DONE CHECK: ALL PASS" if fails == 0 else f"DONE CHECK: {fails} FAIL")
    return 0 if fails == 0 else 1


if __name__ == "__main__":
    sys.exit(main())
