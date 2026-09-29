#!/usr/bin/env python3
"""Build the "Reactify Name Catalog" HTML page from raw/categories.json.

Usage: build_catalog.py OUT_HTML [SHORTLIST_URL]
"""
import html, json, re, sys
from pathlib import Path

W = Path(__file__).resolve().parent.parent
ORDER = ["english", "compound", "acronym", "serbian", "foreign", "latin", "namelike", "invented"]
TITLE = {"english": "English words", "compound": "Word combinations", "acronym": "Acronyms", "serbian": "Serbian words",
         "foreign": "Other foreign words", "latin": "Latin and Greek roots", "namelike": "Name-like: historic makers",
         "invented": "Invented words"}
ABOUT = {
    "english": "Real English words with a hidden craft, ownership or value story, in the spirit of Braze.",
    "compound": "Two real English words joined into one, in the spirit of Basecamp and Mainspring.",
    "acronym": "Reads as a word first; the expansion is the hidden layer about building, owning and shipping.",
    "serbian": "Serbian and South Slavic words that English speakers can say and spell, in the spirit of Zanat and Koshava.",
    "foreign": "Words from other languages with a craft, making or ownership story.",
    "latin": "Old Latin and Greek roots with a serious enterprise feel, in the spirit of Adacta.",
    "namelike": "Reads as a person, drawn from historic makers, printers and engineers, in the spirit of Brigit.",
    "invented": "Coined words built from meaningful roots, in the spirit of Google and Hulu.",
}
REVIEWED = {
    "english": [("Spelter", "passed independent review")],
    "namelike": [("Cobden", "passed independent review"), ("Ramsden", "passed independent review")],
    "serbian": [("Zanat", "founder's favourite, passed review"), ("Koshava", "failed review on KOCHAVA; conditional")],
}


def esc(s):
    return html.escape(str(s or ""), quote=True)


def rich(s):
    s = esc(s)
    return re.sub(r"\*\*(.+?)\*\*", r"<b>\1</b>", s)


def money(x):
    try:
        v = float(x)
    except (TypeError, ValueError):
        return ""
    return f"{v:,.2f}".rstrip("0").rstrip(".") if v != int(v) else f"{int(v):,}"


def card(k):
    dom = (k.get("best_domain") or "").lower()
    price = ""
    if k.get("price_first_year") not in (None, ""):
        price = f"{money(k.get('price_first_year'))} / {money(k.get('price_renewal'))}"
    links = []
    if k.get("tm_url"):
        links.append(f'<a href="{esc(k["tm_url"])}" target="_blank" rel="noopener">Trademarks</a>')
    if k.get("conflict_url"):
        links.append(f'<a href="{esc(k["conflict_url"])}" target="_blank" rel="noopener">Closest name</a>')
    if k.get("risk_url") and k.get("risk_url") != k.get("conflict_url"):
        links.append(f'<a href="{esc(k["risk_url"])}" target="_blank" rel="noopener">Risk source</a>')
    radio = " · radio test marginal" if k.get("radio") == "marginal" else ""
    text = " ".join([k.get("name", ""), k.get("story", ""), dom, k.get("risk", "")]).lower()
    return f'''<article class="card" data-text="{esc(text)}">
  <h3 class="word">{esc(k.get("name"))}</h3>
  <p class="say">{esc(k.get("pronunciation"))}{esc(radio)}</p>
  <p class="story">{rich(k.get("story"))}</p>
  <div class="best"><span class="dom">{esc(dom)}</span><span class="price">{esc(price)}</span><button class="copy" type="button" data-copy="{esc(dom)}">Copy</button></div>
  <p class="risk"><span class="label">Main risk</span> {esc(k.get("risk"))}</p>
  <div class="links">{" ".join(links)}</div>
</article>'''


def main(out, shortlist_url="https://claude.ai/artifact/TxPykaPWCnaM98pJwsZjnm"):
    data = json.load(open(W / "raw" / "categories.json"))
    cats = {c["key"]: c for c in data["categories"]}
    total_checked = sum(c["checked"] for c in cats.values())
    total_kept = sum(len(c["kept"]) for c in cats.values())
    nav = " ".join(f'<a class="navchip" href="#{k}">{esc(TITLE[k])} <span>{len(cats[k]["kept"])}</span></a>' for k in ORDER if k in cats)
    sections = []
    for k in ORDER:
        if k not in cats:
            continue
        c = cats[k]
        rev = ""
        if k in REVIEWED:
            items = " · ".join(f'<a href="{esc(shortlist_url)}#{n.lower()}" target="_blank" rel="noopener">{esc(n)}</a> ({esc(note)})' for n, note in REVIEWED[k])
            rev = f'<p class="reviewed"><span class="label">Already reviewed</span> {items}</p>'
        cards = "\n".join(card(x) for x in c["kept"])
        sections.append(f'''<section class="cat" id="{k}">
  <div class="cat-head">
    <h2>{esc(TITLE[k])}</h2>
    <p class="count mono">{len(c["kept"])} of {c["checked"]} checked names passed</p>
  </div>
  <p class="about">{esc(ABOUT[k])}</p>
  {rev}
  <div class="grid">
{cards}
  </div>
</section>''')
    page = TEMPLATE.replace("{{NAV}}", nav).replace("{{SECTIONS}}", "\n".join(sections)) \
        .replace("{{CHECKED}}", f"{total_checked:,}").replace("{{KEPT}}", str(total_kept)) \
        .replace("{{SHORTLIST}}", esc(shortlist_url)).replace("{{DATE}}", "29 September 2026")
    Path(out).write_text(page, encoding="utf-8")
    print(f"wrote {out}: {total_kept} names from {total_checked} checked")


TEMPLATE = r'''<title>Reactify Name Catalog</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bodoni+Moda:opsz,wght@6..96,500;6..96,700&family=IBM+Plex+Mono:wght@400;500&family=Public+Sans:wght@400;500;600;700&display=swap">
<style>
/* Layout: a foundry type catalog. Eight sections, one per way of building a name; each proposal is a small specimen card on zinc-grey paper with a brass accent. */
:root {
  --paper: #eef0ee; --surface: #f8f9f8; --ink: #161a19; --muted: #56605c; --rule: #cbd2ce;
  --brass: #8a5a12; --brass-soft: #ecdcbd; --pass: #2c6a43; --pass-soft: #d9eadf;
  --f-display: "Bodoni Moda", "Didot", "Bodoni 72", Georgia, serif;
  --f-body: "Public Sans", "Segoe UI", system-ui, -apple-system, sans-serif;
  --f-mono: "IBM Plex Mono", ui-monospace, "SFMono-Regular", Menlo, monospace;
}
@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) { --paper: #121514; --surface: #181c1b; --ink: #e6e9e7; --muted: #9ba5a1; --rule: #2c3431; --brass: #d9a653; --brass-soft: #3a2e19; --pass: #74c490; --pass-soft: #1b3325; color-scheme: dark; }
}
:root[data-theme="dark"] { --paper: #121514; --surface: #181c1b; --ink: #e6e9e7; --muted: #9ba5a1; --rule: #2c3431; --brass: #d9a653; --brass-soft: #3a2e19; --pass: #74c490; --pass-soft: #1b3325; color-scheme: dark; }
* { box-sizing: border-box; }
body { background: var(--paper); color: var(--ink); font-family: var(--f-body); font-size: 15px; line-height: 1.55; padding-inline: clamp(16px, 4vw, 48px); padding-block: 40px 64px; }
.wrap { max-width: 1180px; margin-inline: auto; display: grid; gap: 48px; }
a { color: var(--brass); text-underline-offset: 2px; }
a:focus-visible, button:focus-visible, input:focus-visible { outline: 2px solid var(--brass); outline-offset: 2px; }
.mono { font-family: var(--f-mono); font-variant-numeric: tabular-nums; }
.label { font-size: 11px; font-weight: 600; letter-spacing: .09em; text-transform: uppercase; color: var(--muted); }
header { display: grid; gap: 18px; border-bottom: 2px solid var(--ink); padding-bottom: 28px; }
header .label { color: var(--brass); }
h1 { font-family: var(--f-display); font-weight: 700; font-size: clamp(40px, 7vw, 76px); line-height: 1; margin: 0; letter-spacing: -.01em; text-wrap: balance; }
.lede { max-width: 70ch; margin: 0; font-size: 16px; }
.facts { display: flex; flex-wrap: wrap; gap: 8px 28px; margin: 0; padding: 0; list-style: none; }
.facts li { display: flex; align-items: baseline; gap: 8px; }
.facts b { font-family: var(--f-mono); font-size: 20px; font-weight: 500; }
.facts span { color: var(--muted); font-size: 13px; }
.tools { display: grid; gap: 14px; position: sticky; top: env(safe-area-inset-top, 0px); background: var(--paper); padding-block: 12px; z-index: 2; border-bottom: 1px solid var(--rule); }
.nav { display: flex; flex-wrap: wrap; gap: 6px 8px; }
.navchip { display: inline-flex; gap: 6px; align-items: baseline; font-size: 13px; font-weight: 600; text-decoration: none; color: var(--ink); border: 1px solid var(--rule); padding: 5px 10px; border-radius: 999px; background: var(--surface); }
.navchip span { font-family: var(--f-mono); font-weight: 500; color: var(--brass); }
.navchip:hover { border-color: var(--brass); }
.filter { display: flex; gap: 10px; align-items: center; flex-wrap: wrap; }
.filter label { font-size: 13px; color: var(--muted); }
.filter input { font: inherit; padding: 7px 10px; border: 1px solid var(--rule); border-radius: 4px; background: var(--surface); color: var(--ink); min-width: 0; width: min(100%, 320px); }
.cat { display: grid; gap: 14px; scroll-margin-top: 140px; }
.cat-head { display: flex; flex-wrap: wrap; justify-content: space-between; align-items: baseline; gap: 6px 20px; border-top: 1px solid var(--ink); padding-top: 18px; }
h2 { font-family: var(--f-display); font-weight: 700; font-size: clamp(26px, 3.4vw, 36px); line-height: 1.1; margin: 0; }
.count { margin: 0; color: var(--muted); font-size: 13px; }
.about { margin: 0; color: var(--muted); max-width: 70ch; }
.reviewed { margin: 0; font-size: 14px; }
.grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(min(100%, 300px), 1fr)); gap: 12px; }
.card { background: var(--surface); border: 1px solid var(--rule); border-radius: 4px; padding: 16px 16px 14px; display: grid; gap: 8px; align-content: start; min-width: 0; }
.word { font-family: var(--f-display); font-weight: 500; font-size: 32px; line-height: 1; margin: 0; letter-spacing: -.01em; overflow-wrap: anywhere; }
.say { margin: 0; font-family: var(--f-mono); font-size: 12px; color: var(--muted); }
.story { margin: 0; font-size: 14px; }
.best { display: flex; flex-wrap: wrap; align-items: center; gap: 6px 12px; border-top: 1px solid var(--rule); padding-top: 8px; }
.dom { font-family: var(--f-mono); font-size: 15px; font-weight: 500; }
.price { font-family: var(--f-mono); font-size: 12px; color: var(--muted); font-variant-numeric: tabular-nums; }
.copy { font: 600 11px/1 var(--f-body); letter-spacing: .06em; text-transform: uppercase; color: var(--brass); background: transparent; border: 1px solid var(--brass); border-radius: 3px; padding: 5px 8px; cursor: pointer; margin-left: auto; }
.copy:hover { background: var(--brass-soft); }
.risk { margin: 0; font-size: 13px; }
.links { display: flex; flex-wrap: wrap; gap: 4px 12px; font-size: 12px; }
.empty { margin: 0; color: var(--muted); }
footer { display: grid; gap: 10px; font-size: 13px; color: var(--muted); border-top: 2px solid var(--ink); padding-top: 20px; }
footer p { margin: 0; max-width: 80ch; }
@media (prefers-reduced-motion: reduce) { * { transition: none !important; } }
</style>

<div class="wrap">
  <header>
    <div class="label">Reactify Solutions · rename · proposals by category · {{DATE}}</div>
    <h1>Names by category</h1>
    <p class="lede">At least ten proposals for each of eight ways to build a name. Every name here passed a dated domain check, a GitHub search, a TMview trademark search in classes 9, 35 and 42, a web search for same-name tech companies, a language and radio test, and a skeptic who tried to reject it. None has had the full independent review that Spelter, Cobden and Ramsden passed, so run that step on anything you shortlist. The reviewed names are on the <a href="{{SHORTLIST}}" target="_blank" rel="noopener">name shortlist</a>.</p>
    <ul class="facts">
      <li><b>{{CHECKED}}</b><span>new names checked</span></li>
      <li><b>{{KEPT}}</b><span>passed every check</span></li>
      <li><b>8</b><span>categories</span></li>
    </ul>
  </header>

  <div class="tools">
    <nav class="nav" aria-label="Categories">{{NAV}}</nav>
    <div class="filter"><label for="q">Filter</label><input id="q" type="search" placeholder="Name, story or domain" autocomplete="off"><span id="shown" class="label"></span></div>
  </div>

{{SECTIONS}}

  <p class="empty" id="none" hidden>No names match the filter.</p>

  <footer>
    <p>Prices are Vercel quotes in USD, first year / renewal, checked on 28 or 29 September 2026 with read-only tools. No buy or transfer tool was used; the founder registers domains himself. Check availability again right before registering.</p>
    <p>Trademark checks are screening searches in TMview (USPTO, EUIPO, WIPO and the Serbian office). Order a full clearance search from a trademark attorney before filing.</p>
    <p>Full screening log with every rejected name and its reason: work/research/category_screen.csv in the reactify-naming folder of the repository.</p>
  </footer>
</div>

<script>
  (function () {
    var q = document.getElementById('q');
    var cards = Array.prototype.slice.call(document.querySelectorAll('.card'));
    var sections = Array.prototype.slice.call(document.querySelectorAll('.cat'));
    var shown = document.getElementById('shown');
    var none = document.getElementById('none');
    function apply() {
      var t = (q.value || '').trim().toLowerCase();
      var n = 0;
      cards.forEach(function (c) { var hit = !t || c.getAttribute('data-text').indexOf(t) !== -1; c.hidden = !hit; if (hit) n++; });
      sections.forEach(function (s) { s.hidden = !s.querySelector('.card:not([hidden])'); });
      shown.textContent = t ? n + ' shown' : '';
      none.hidden = n !== 0;
    }
    q.addEventListener('input', apply);
    document.querySelectorAll('.copy').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var text = btn.getAttribute('data-copy');
        var reset = function (label) { btn.textContent = label; setTimeout(function () { btn.textContent = 'Copy'; }, 1600); };
        var fallback = function () {
          var dom = btn.parentElement.querySelector('.dom');
          var range = document.createRange(); range.selectNodeContents(dom);
          var sel = window.getSelection(); sel.removeAllRanges(); sel.addRange(range);
          reset('Selected');
        };
        try { navigator.clipboard.writeText(text).then(function () { reset('Copied'); }, fallback); } catch (e) { fallback(); }
      });
    });
  })();
</script>
'''

if __name__ == "__main__":
    main(*sys.argv[1:])
