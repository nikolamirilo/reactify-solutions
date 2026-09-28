# Pipeline state (BRIEF.md 2.8)

Folder: `reactify-naming/` in the repo (copied unchanged from the uploaded zip). Tools: Vercel connector = `mcp__Quicktalog_Vercel__*` (read-only use).

| # | Step | Status | Note |
|---|---|---|---|
| 1 | Set up | done | work/ and state.md created 2026-09-28 |
| 2 | Decode style anchors | done | profile in notes.md section 1 |
| 3 | Pattern study | done | 6 companies, 6 rules in notes.md section 2 |
| 4 | Pilot (10 names, 1 bulk call) | done | 5/10 usable; widen TLDs (.build, .studio, labs.com), rarer words |
| 5 | Longlist (40+, aim 50-60) | done | 244 candidates: 97 lead names + 93 from 8 territory generators (raw/pool_gen.json) + 54 replacement-round names after review failures (raw/pool_own.json, source=replacement) |
| 6 | Domain screen | done | 41 calls (pilot-1, screen-02..33, finalist-01..04, benchmark-01) in raw/vercel_calls.jsonl; every candidate has a dated Vercel lookup |
| 7 | Language and pronunciation screen | done | 3 batches, 4 language lenses each: research/language_screen_1..3.json |
| 8 | Conflicts, trademarks, 10 finalists | done | ~75 TMview + web checks (research/early_findings.md); DD of all taken finalist domains (research/dd_finalists.json) found live namesakes for Bract, Moxon, Remek, Yeoman, Sprag -> legal 1 |
| 9 | Rank, top 3, prices | done | top 3 = Spelter 3.75, Cobden 3.70, Ramsden 3.60 (also the 3 highest totals); prices in raw/prices.json; Koshava ~4.35 still ahead (ESTIMATED) |
| 10 | Independent review | done | 3 rounds, 10 names, fresh-context reviewers; PASS: Spelter, Cobden, Ramsden; FAIL: Bract, Moxon, Remek, Pritchel, Saxton, Exerga, Bosk; all in review.md |
| 11 | Report (Serbian) | done | REPORT.md assembled from report_parts/ by tools/build_report.py; sections 1-3, 6, 7 updated for review outcomes |
| 12 | Close out (verify.py) | done | python3 verify.py: DONE CHECK: ALL PASS, no warnings (2026-09-28) |
