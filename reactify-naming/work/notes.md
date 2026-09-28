# Working notes

## 1. Style-anchor profile (step 2)

| Anchor | Letters | Syllables / stress | Sound | Word type | Story layers |
|---|---|---|---|---|---|
| Braze | 5 | 1 · BRAYZ | voiced Br- onset, long "ay", buzzing -z coda | real English word | brazing joins metals with a filler metal: joining parts into something stronger; echoes "brazen" (bold) |
| Brame | 5 | 1 · BRAYM | Br- onset, long "ay", soft nasal -m coda | word-like, unusual (surname; French *bramer*, the stag's call) | almost none on the surface: pure sound, feels like a name |
| Adacta | 6 | 3 · a-DAK-ta | open a-a-a vowels around a hard -ct- | Latin phrase contracted | *ad acta*, "to the files": done, closed, delivered; legal, serious |
| Brigit | 6 | 2 · BRIJ-it | Br- onset, short i-i | first name (brigit.dev) | Brigid, Irish goddess (and saint) of smithcraft, poetry and healing: warm and a maker |
| Koshava | 7 | 3 · KO-sha-va | hard K, soft -sh-, open a-a | Serbian place-bound word | the Belgrade wind; local story told globally, like Mistral |
| Zanat | 5 | 2 · ZA-nat | voiced Z onset, hard -t coda | Serbian word (from Turkish *zanaat*) | craft, trade: a master's pride in the work |

**What they share (the target):**
- **Length:** 5-7 letters; 1-3 syllables; stress on the first or middle syllable.
- **Sound:** one strong onset (Br-, K-, Z-, or a stop inside: -ct-), the vowel "a" in 5 of 6, and a crisp stop or buzz at the edge (-z, -t, -ct). No soft endings like -ly/-ify.
- **Word type:** a real word or a real name first; never a description of software. Each one is spelled the way it sounds (Brigit is the only mild exception: Brigid/Bridget).
- **Hidden story:** four of six are about **making** (brazing, smithcraft, craft/trade) or **finishing** (ad acta). The story is discoverable, not advertised: you have to ask "why that name?".
- **Register:** old roots (Latin, Irish, Serbian/Turkish, metallurgy) that feel serious and enterprise-grade, but with warmth (a person's name, a wind).
- **Two families:** (1) one-syllable hard words (Braze, Brame); (2) two-to-three-syllable words with open "a" vowels (Adacta, Koshava, Zanat, Brigit).
- **Target formula for new names:** 5-7 letters, strong consonant onset or -ct-/-k-/-z- core, open vowels, a real word/name with a making, ownership or value story; must also read well in "Quicktalog by X" and "X Labs".

## 2. Naming patterns of product-first and holding companies (step 3)

| Company | Name logic | Parent visibility | Lesson |
|---|---|---|---|
| Alphabet (2015) | "alpha-bet" (returns above benchmark) + alphabet (language) | quiet parent; Google, Waymo, Verily keep their brands | a parent name can carry an insider pun about value while staying abstract |
| Tiny (2014) | one small real word that states the philosophy (small teams, long term) | quiet holding; Dribbble, MetaLab, AeroPress keep their names | a short real word can carry a whole operating philosophy |
| Constellation Software (1995) | metaphor: many independent stars that form one pattern | mostly invisible to end users; spin-offs (Topicus, Lumine) | metaphor of independent units under one frame fits a portfolio of products |
| Automattic (2005) | "automatic" + founder Matt | quiet-ish; WordPress.com, Tumblr, WooCommerce lead | a playful twist can work, but founder puns age with the founder |
| 37signals (1999) | the 37 signals SETI flagged as possible alien radio | renamed Basecamp (2014) when single-product, back to 37signals (2022) for HEY and ONCE | never name the parent after one product or one technology; a story-name survives pivots in both directions |
| Atlassian (2002) | Atlas, the titan who carries the sky; mythological root plus a suffix | umbrella brand ("Jira by Atlassian" style) | an old mythological root gives an enterprise feel and scales to an umbrella |

(Sources: company "about" pages and widely reported histories; treated as **ESTIMATED** background, not as claims in the report.)

**Rules for this rename:**
1. The parent must not describe a technology or category (the "Reactify" trap) nor one product (the 37signals/Basecamp lesson).
2. Arbitrary or suggestive, not descriptive: that is also what makes a trademark registrable in classes 9/35/42.
3. The name tells the philosophy (making things of value, owning the outcome), not the service menu.
4. Test every name in three frames: "X" alone on an invoice, "Quicktalog by X", "X Labs / X Inc.".
5. Old roots (myth, Latin, craft vocabulary) give enterprise gravity; a person-like name gives warmth.
6. Short single words are mostly gone as .com; the pattern among recent companies is a clean word on a newer TLD or a suffix (Labs, HQ).

## 3. Pilot (step 4)

Ten candidates across territories, one `get_bulk_availability` call (50 domains, 5 TLDs each: .com .io .co .studio .dev), 2026-09-28, raw result in `raw/vercel_calls.jsonl` (call `pilot-1`).

| Name | Territory | Available at check |
|---|---|---|
| Bract | A | bract.co |
| Kedge | A | kedge.co |
| Keelson | A | none of 5 |
| Faber | B | none of 5 |
| Auctor | B | none of 5 |
| Crispin | C | crispin.studio |
| Brunel | C | brunel.studio |
| Prova | E | none of 5 |
| Hexis | B | none of 5 |
| Kremen | F | kremen.io, kremen.studio |

**Result:** 5 of 10 names have at least one usable domain; 0/10 .com, 0/10 .dev, 1/10 .io, 2/10 .co, 3/10 .studio.

**Adjustments before scaling up:**
- Widen the TLD mix for the screen: .co, .studio, .so, .ai, .app, .build plus the `<name>labs.com` pattern (the brief's own snapshot shows koshavalabs.com, zanatlabs.com as realistic).
- Short common Latin/English words (Faber, Auctor, Hexis, Prova) are fully taken: prefer rarer craft terms, derived forms and invented words from roots.
- .dev was taken for every pilot name; drop it from the first screen and use it only in the finalist 7-TLD lookup.
- Generate 70+ raw names so that 40+ survive into the longlist with a real domain.
