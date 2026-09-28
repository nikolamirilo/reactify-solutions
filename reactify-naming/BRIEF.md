# Naming Research Brief: a new name for Reactify Solutions

> **Version** 2.1, loop-ready · **Date** 28 September 2026 · **Owner** Nikola (founder)
>
> This is the task prompt for a Claude Code `/goal` loop. It follows the RTF formula: **Role** (who you are), **Task** (context, the founder's decisions and the work), **Format** (what to deliver and how). `verify.py` in the same folder is the done-check. You need web access and the Vercel connector (domain tools).

---

## 1. Role

You are a senior brand-naming strategist and researcher with live web access and the Vercel domain tools. You combine the craft of a top naming agency with strict verification: every availability, conflict or trademark claim you make is checked, dated and sourced.

---

## 2. Task

### 2.1 How this loop runs

You work inside a Claude Code `/goal` loop. After each of your turns, a separate evaluator model decides whether the goal is met. The evaluator reads only this conversation. It cannot open files or run commands, so work counts only when its proof appears in the conversation.

- **Start of every turn:** read `work/state.md` and continue from the first step in 2.8 that is not done. On the first turn, create the file.
- **End of every turn:** update `work/state.md`, run `python3 verify.py`, and end your message as described in 3.4.
- **Done** means that the last line printed by `verify.py` is `DONE CHECK: ALL PASS`. Nothing else counts, so never claim the work is done without it.
- **Keep state in files, not in the conversation.** The context may be compacted during a long run. Put raw data such as tool results and lists in `work/`, and keep messages short.
- **Blocked:** if a problem that only the founder can fix stops the work (for example, neither Vercel nor any RDAP/WHOIS lookup works), reply `BLOCKED: <reason>` so the evaluator can end the loop.
- **Never** edit `BRIEF.md` or `verify.py`, write outside `work/`, or call a Vercel buy, purchase or transfer tool.

### 2.2 Objective

Find the new name for the software company currently called Reactify Solutions. It becomes the single company under which the founder runs everything he does. Build a longlist of at least 40 new candidates, cut it to 10 verified finalists and recommend a top 3.

The founder set two rules: the name has to carry the purpose in 2.4, and it **has to be cool**, on any TLD.

### 2.3 Company context

- **Current name and site:** Reactify Solutions, reactify-solutions.com. Based in Belgrade, Serbia; remote-first.
- **Positioning today:** "Tell us the problem. We ship the product." A software and AI partner for web, mobile, AI and data, from idea to production in weeks. Clients take the full build or embed its engineers in their team.
- **Voice:** builder to builder, no sales talk ("no sales · talk to builders"); terminal/CLI visual motif; process Scope → Build → Ship & iterate.
- **Own products** (proof of the product focus):
  - **Quicktalog:** AI digital catalog SaaS, live, 2,000+ users
  - **unbg:** privacy-first AI background remover that runs fully in the browser, live
  - **Shot & Share:** QR-code photo collection for events, live
  - **Bark Off:** privacy-first mobile app that calms dog barking, coming soon
- **Services:** web and mobile development, AI development (LLM integration, agents), data analytics (Microsoft Fabric, Power BI), automations, business consulting.
- **Content:** a free Claude Code handbook and 30+ in-depth articles on AI agents in production.
- **Clients and legal:** the largest client is a US B2B SaaS company, billed through a US LLC arrangement; there are also EU clients. The name must be safe and registrable in the US, the EU and Serbia.
- **Founder:** Nikola, a software engineer and technical project manager (React/Next.js, Python/FastAPI, Supabase, AWS) with a chemical/process-engineering background. That background is an optional source of metaphors, not a requirement.
- **Why rename:** "Reactify" ties the brand to one library (React); "Solutions" is generic agency wording; neither part says anything about products or ownership.

### 2.4 Purpose the name must carry

The founder's two goals, verbatim:

1. Create high-value products.
2. Provide high-quality services with an ownership mindset.

The company is product-first. Client work is also product development, done with the same ownership as the company's own products.

### 2.5 Founder decisions (Q&A, 28 September 2026)

These answers are binding. Where they conflict with general naming advice, they win.

| Topic | Decision |
|---|---|
| Business mix in 2–3 years | **Products dominate:** 70%+ of revenue from own products; services are the complement. |
| Brand architecture | **Quiet holding now:** products keep their own brands and the company stays in the background. It may later grow into an umbrella brand ("Quicktalog by X"). The name must work in both modes. |
| Audiences | US B2B clients, EU clients and global product users. The local Serbian market is not a primary audience. |
| Accepted styles | All four: invented word (Google, Hulu); real English word (Linear, Notion, Stripe); foreign word with a story (Koshava, Zanat); meaningful compound (Ownstead, Basecamp). |
| Explicit ask | More strong **English-language** options, and **acronyms that sound cool as words**. |
| Serbian/Balkan roots | Allowed only if English speakers can say and spell the name easily. |
| Sound profile | All four apply: short and hard (about 5–6 letters, strong consonants such as Br-, -ze, -ct-); a hidden story; sounds like a name; a Latin or old root with a serious, enterprise feel. |
| Domains | Any TLD is fine (.com, .io, .ai, .dev, .co, .studio, .app, .so and others). A .com is a bonus, not a requirement. Cool beats conventional. |
| Current favorites | **Koshava** and **Zanat**: the benchmarks to beat. |

### 2.6 Style anchors

Names the founder likes and wants the new name to feel like:

- **Braze:** a real English word (brazing joins metals with a filler metal); 5 letters, one hard syllable, a hidden craft story.
- **Brame:** one short, hard syllable; unusual yet word-like.
- **Adacta:** from the Latin phrase *ad acta* ("to the files": done, closed); an old root with a serious tone.
- **Brigit** (brigit.dev): reads like a person's name; warm and memorable.
- **Koshava:** from Serbian *Košava*, the strong wind of Belgrade and Vojvodina; a local story, much like Mistral AI is named after a French wind.
- **Zanat:** Serbian for craft or trade; the pride of a master in their work.

Decode what these names share and use it as the style target. Do not propose near-copies or anything confusable with them.

### 2.7 Already explored: do not re-propose as new

- **Round 1:** Zanat, Owncraft, Thinkwright, Productsmith, Outright, TPO (Think · Product · Own), and "Ship & Own" as a motto.
- **Round 2:** Ownstead (previous top pick), Gazda, Prow (acronym: Product, Responsibility, Ownership, Work), Brazda, Salash (Salaš), Vredno, Tendwell, Plumbline, Throughline.
- **Round 3:** Koshava, Zukuri, Eigenwert, Idemo, Zelkova, Burin, Bosun, Capstan, Quiddity, Ajde, Pravo, Umpteen.
- **Rejected, with reason:**
  - **Gotovo:** gotovo.rs is an existing Serbian app for finding craftsmen.
  - **Yield:** Yield Studio (Paris) has the same positioning.
  - **Vow, Proofwork:** pending US trademark applications in class 42.
  - **Millwright, Stead, Tiller, Tenure, Delo, Artel, Onus, Rectify, Alembic, Distill:** existing software or tech brands.
  - **Negative meanings:** Slipway ("slip" means underwear in German, Hungarian and Spanish), Azeo (sounds like Spanish *aseo*, toilet), Ovra (Mussolini-era secret police), Tvor, Reflux, Tova.
- **Taken on every TLD tried (mostly .com, .studio and .dev):** Shipwright, Twofold, Keelworks, Kova, Holdfast, Mainspring, Shipyard, Opus, Lathe, Kodo, Arvo, Axia, Okapi, Weft, Kerf, Anneal, Ingot, Menhir, Athanor, Verk, Kazi, Bismuth, Gesso, Fornax, Kodawari, Shuhari, Opifex, Arete, Techne, Gumption, Mettle.
- **Market reality:** over 60 single-word .com domains (4–9 letters) were tested in round 3, and every one was taken. Short dictionary words will usually need another TLD or a purchase.

`verify.py` rejects these names, and any name one letter away from a style anchor in 2.6.

**Domain snapshot for the current favorites** (Vercel availability check, 28 September 2026; re-verify with the Vercel tools before use):

| Name | Available at check | Taken |
|---|---|---|
| Koshava | koshava.studio, .dev, .co, .app, .io, .ai; koshavalabs.com | koshava.com |
| Zanat | zanat.studio, .ai, .build; zanatlabs.com, zanatstudio.com | zanat.co, .io, .app, .dev |
| Ownstead | ownstead.studio, .dev, .io | ownstead.com, .co |
| Zukuri | zukuri.studio, .dev, .app, .ai | zukuri.io, .co; zukuri.com is parked (the owner invites purchase inquiries) |
| Eigenwert | eigenwert.studio, .dev, .co; eigenwertlabs.com | eigenwert.com, .io |

**Known risks for the favorites:**

- **Koshava:** KOSHAVA is also a magnetometer line from Wuntronic GmbH (Munich). It is hardware, but trademark class 9 also covers software, so check the overlap. Use the spelling "Koshava": "Kosava" reads like "Kosovo".
- **Zanat:** a common Serbian word; check that it can be registered in Serbia.

### 2.8 Pipeline

Work through the steps in order, and track each one in `work/state.md` as todo, doing or done, with a one-line note.

1. **Set up.** Create `work/` and `work/state.md` with this step list.
2. **Decode the style anchors** (2.6) into a short sound-and-story profile in `work/notes.md`: letter count, syllables, stress, consonant clusters, etymology and layers of meaning.
3. **Study naming patterns briefly** in `work/notes.md`, one page at most. Look at how product-first companies and holding companies named themselves, both those that keep the parent in the background and those that turned it into an umbrella brand (for example Alphabet, Tiny, Constellation Software, Automattic, 37signals, Atlassian). Extract the rules that apply here.
4. **Pilot.** Generate 10 candidates and run them through Vercel's `get_bulk_availability` in one call. Note in `work/notes.md` how many have a usable domain, and adjust the generation (word length, invented or real words, TLD mix) before scaling up.
5. **Generate the longlist** in `work/candidates.csv`: at least 40 new candidates in total, aiming for 50–60 because many will be cut. Spread them across these territories, roughly 5–10 each:
   - **A. Real English words** with a hidden craft, ownership or value story, in the spirit of Braze: metalworking, woodworking, shipbuilding, masonry, printing, weaving, surveying, cartography, navigation.
   - **B. Latin, Greek or other old roots** and short phrases, in the spirit of Adacta: craft, trade, guild and legal vocabulary; contracted Latin phrases.
   - **C. Name-like words**, in the spirit of Brigit: mythological smiths and makers, patron saints of crafts, historical inventors. No living people and no protected characters.
   - **D. Invented words**, in the spirit of Google and Hulu: built from meaningful roots, 4–7 letters, one obvious pronunciation.
   - **E. Acronym-as-word:** it must read as a cool word first; the expansion (products, ownership, value, build, ship and similar) is the hidden layer. Write the expansion in the `story` column. At least 5.
   - **F. Foreign words with a story**, Serbian and Balkan included: at most 20% of the list, and only if easy for English speakers.
6. **Screen domains.** Run every candidate through `get_bulk_availability` (up to 50 domains per call) and record every lookup in `work/domains.json`. Cut names with no usable domain.
7. **Screen language and pronunciation** (2.9). Record every cut and its reason in `candidates.csv`.
8. **Check conflicts and trademarks** for the survivors (2.9). Then pick exactly 10 finalists: set their status to `finalist`, look up all seven core TLDs for each, and fill `work/finalists.csv` with evidence links and 1–5 scores (2.11).
9. **Rank.** `verify.py` computes the weighted totals. Mark the top 3 (`top3` = `yes`), normally the three highest totals, and get the first-year and renewal price of each top-3 `best_domain` with `get_domain_price`. Compare the top 3 honestly with Koshava and Zanat; if a favorite still wins, say so in the report.
10. **Get an independent review.** Launch a subagent with fresh context and give it only the top-3 names, their best domains and section 2.9. It re-checks the domains with Vercel, searches for conflicts and trademarks, and tries to find a reason each name fails. Save its verdicts to `work/review.md`. Replace any name that fails, then have the replacement reviewed.
11. **Write the report** to `work/REPORT.md` (3.3).
12. **Close out.** Run `python3 verify.py` and fix every FAIL until its last line is `DONE CHECK: ALL PASS`. Resolve or explain every WARN in the report.

Use short scripts for deterministic work, such as deduplicating, counting and merging tool results into `domains.json`, instead of reasoning through it.

### 2.9 Screening checks

Run these for every candidate:

- **Language:** no negative, vulgar or awkward meaning or homophone in English, Serbian, German or Spanish; a quick check in French, Italian and Hungarian.
- **Pronunciation:** passes the radio test. There is one obvious way to say it, and one obvious way to spell it after hearing it.
- **Conflicts:** same or similar names among software and tech companies and products (web search, Crunchbase, LinkedIn, App Store, Google Play, GitHub, Product Hunt).
- **Trademarks:** USPTO, EUIPO (TMview), WIPO Global Brand Database and the Serbian IP Office (Zavod za intelektualnu svojinu), classes 9, 35 and 42.
- **Domains:** validate with the **Vercel domain tools**. They are read-only for this task.
  - Use `get_bulk_availability` for batches of up to 50 domains per call, and `get_domain_availability` for a single domain.
  - Use `get_domain_price` (or `get_bulk_price`) for the first-year and renewal price of available domains.
  - Look up at least one TLD per candidate in the domain screen, and all seven core TLDs (.com, .io, .ai, .dev, .co, .studio, .app) for each finalist. Add .so if Vercel supports it (`list_supported_tlds`).
  - `available: false` only means the domain can't be bought through Vercel right now; it may be registered, reserved or premium. For finalists, confirm with RDAP/WHOIS or by visiting the site whether the domain is in use, parked or offered for sale, and note the asking price if shown.
  - Record the date of every check in `domains.json`.
  - **Never** call a buy, purchase or transfer tool. The founder registers domains himself.
  - The tool-name prefix depends on how the Vercel connector is named in your environment. If the Vercel tools are missing, use a registrar lookup or RDAP/WHOIS, set `source` to `rdap`, and say so in the report.
- **Handles** (best effort): LinkedIn company page, X, GitHub organization, Instagram.

### 2.10 Hard constraints

- Not tied to any technology: no React, JS or Py, and no "AI" as the core of the name.
- No generic agency words as the core: Solutions, Digital, Tech, Soft, Systems.
- Ideally 4–7 letters, 10 at most; 3 syllables at most.
- Works as a quiet holding name now and as an umbrella brand later ("Quicktalog by X", "X Inc.", "X Labs").
- Not confusable with the style anchors (Braze, Brame, Brigit, Adacta) or with major tech brands.
- Avoid tired startup patterns (-ify, -ly, dropped vowels as in Flickr) unless the name is exceptional.
- Never present a domain as available without a dated Vercel check (or the RDAP/WHOIS fallback), and never present a name as clear without a trademark search.

### 2.11 Scoring rubric

Score each finalist 1–5 per criterion in `finalists.csv`. `verify.py` computes the weighted totals and prints the ranking.

| Criterion | Column | Weight | What good looks like |
|---|---|---|---|
| Cool factor and sound | `cool` | 25% | Short, punchy, memorable; matches the sound profile in 2.5. |
| Story and purpose fit | `story` | 20% | A real, discoverable story tied to products, ownership or value. |
| Distinctiveness and legal safety | `legal` | 20% | No close conflicts in software or tech; the trademark path looks clear. |
| Pronunciation and spelling | `pronunciation` | 15% | One obvious way to say and spell it for US and EU audiences. |
| Scalability | `scalability` | 10% | Works as a quiet holding now and as an umbrella brand later. |
| Domains and handles | `domains` | 10% | A credible domain on any TLD, available today per a Vercel check; .com not required. |

---

## 3. Format

### 3.1 Language and style

- Write `work/REPORT.md` in **Serbian (Latin script)**. Keep names, etymologies and quotes in their original language. Working files may be in English.
- Use headers, bold for key terms, bullet points, and tables wherever you compare names.
- Mark every factual claim as **VERIFIED** (with source and date) or **ESTIMATED**. For domains, VERIFIED means a dated Vercel check.

### 3.2 Working files

All working files live in `work/`. `verify.py` reads them, so keep these formats exactly.

| File | Format |
|---|---|
| `state.md` | The step list from 2.8, each step with a status (todo, doing, done) and a one-line note. |
| `notes.md` | Style-anchor profile, pattern study and pilot results. |
| `candidates.csv` | Columns `name,territory,story,status,reason`. `territory` is one letter, A–F; `status` is `cut`, `keep` or `finalist`; `reason` is required when `status` is `cut`. |
| `domains.json` | A JSON array with one object per lookup, for example `{"name": "Forgewell", "domain": "forgewell.studio", "available": true, "checked_at": "2026-09-29", "source": "vercel"}`. `name` matches the candidate exactly; `source` is `vercel` or `rdap`. |
| `finalists.csv` | Columns `name,territory,best_domain,trademark_url,conflict_url,cool,story,legal,pronunciation,scalability,domains,top3,price_first_year,price_renewal`. Scores are integers 1–5; `top3` is `yes` on exactly three rows; prices are plain USD numbers, required for the top 3. |
| `review.md` | One line per top-3 name: `VERDICT <name>: PASS - <reason>` or `VERDICT <name>: FAIL - <reason>`. |
| `REPORT.md` | The final report (3.3). |

### 3.3 Report structure

`work/REPORT.md` uses exactly these seven headings, in this order:

1. `## 1. Top 3 preporuka`: for each name, the meaning and story, why it fits, pronunciation, Vercel-verified domains with the date and the first-year and renewal price, conflicts, risks and one tagline. End with the honest comparison with Koshava and Zanat.
2. `## 2. Top 10 finalista`: a table with name, territory, story, pronunciation, best Vercel-verified domains, conflicts, language flags and weighted score.
3. `## 3. Akronimi`: 5–10 acronym-as-word options with their expansions.
4. `## 4. Kompletna longlista`: every candidate on one line, keep or cut, and the reason.
5. `## 5. Analiza uzora`: what makes Braze, Brame, Adacta, Brigit, Koshava and Zanat work.
6. `## 6. Sledeći koraci`: domains to register (with Vercel prices), trademark filings (Serbia, EU, US) and handles to claim.
7. `## 7. Izvori`: a link for every conflict, trademark and availability claim.

### 3.4 End of every turn

End each message with:

1. **Progress:** two to four lines covering what you finished this turn, the next step and any blocker.
2. **DONE CHECK:** the output of `python3 verify.py`, run as a tool call in this turn and pasted unchanged.

### 3.5 Quality bar

- Quality over quantity: no filler names among the finalists.
- Every "available" claim comes from a dated Vercel check; every conflict is linked.
- State serious risks plainly instead of burying them.
- Prefer names the founder would be proud to say out loud to a US client on day one.
- Passing `verify.py` is necessary but not sufficient. Before finishing, re-read 2.5 and confirm that every finalist satisfies it.
