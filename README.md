# Mixwheel

A mobile-first web app for learning **what mixes with what** — not just recipes, but why a
particular spirit wants a particular acid, sweetener, bitter or bubble.

The centrepiece is a circle cut into ten ingredient families, with coloured chords drawn across
the inside linking ingredients that belong together. Tap to explore, lock picks in to build a drink.

```bash
npm install
npm run dev -- --host     # open the LAN URL on your phone
```

| | |
|---|---|
| `npm run dev` | Vite dev server on :5173 |
| `npm run build` | typecheck + production build to `dist/` |
| `npm test` | vitest over the pure logic and the data integrity checks |

## How the circle works

- **Ten sectors** — brown spirits, fortified wine, bitters & amari, liqueurs, sweeteners, rich,
  citrus, fresh & aromatic, white spirits, fizz. Ordered so families that pair constantly sit near
  each other and the busiest chords stay short.
- **Tap a band** and that family expands to just over half the circle, spreading its bottles out
  and labelling them. Tap the hub to reset.
- **Tap a dot** and its affinities light up: every other chord fades, its partners are labelled, and
  a card explains each link in a sentence.
- **Drag** anywhere on the wheel to spin it.
- **Add to shaker** and the matching drinks appear in the sheet at the bottom, grouped into what you
  can make now, what is one ingredient away, and what is two.

Three chord styles, which the Learn tab explains:

| Style | Mechanic | Example |
|---|---|---|
| solid | complementary — same direction | aged rum + orgeat |
| dashed | contrasting — held in tension | gin + Campari |
| dotted | bridge — one makes the other two work | bitters between spirit and sugar |

The faintest chords are not editorial at all: they are derived from the recipe data, where two
ingredients turn up together in two or more drinks.

## Where the knowledge lives

[`docs/COCKTAIL-KNOWLEDGE.md`](docs/COCKTAIL-KNOWLEDGE.md) is the source of truth — cocktail
structure, the six root families from *Cocktail Codex*, the three pairing mechanics, a full
ingredient reference, affinity tables, technique, glassware, substitution rules, 83 recipes and
the sources. The files in `src/data` are transcribed from it. If they disagree, the document wins,
and `npm test` checks that every id in the data actually resolves.

## Layout

```
docs/COCKTAIL-KNOWLEDGE.md   the written knowledge base
src/data/                    categories · ingredients · pairings · cocktails (typed, no build step)
src/lib/                     geometry · graph · matching · units · labels   (pure, tested)
src/components/Wheel/        the SVG chord wheel
src/components/              tray, sheet, cards, recipe detail, learn tab
src/styles/theme.css         design tokens: art-deco geometry, bright colour on warm paper
```

## Measurements

Every amount is stored in **millilitres** and converted at render time: `ml`, `cl` (how the IBA
prints its own specs), `oz` snapped to real jigger fractions (`1½`, `¾`, `⅓`), or `parts`, which
divides the recipe by its smallest measure so the family formula is visible. The switch sits in the
recipe header and in Learn → Settings, and is remembered per browser. Dashes, rinses, eggs and
"top with soda" pass through every unit unchanged.

## Adding to the data

1. Write it into `docs/COCKTAIL-KNOWLEDGE.md` first.
2. Add the ingredient to `src/data/ingredients.ts` (id, category, role, notes, blurb, substitutes).
3. Add a short wheel label in `src/lib/labels.ts` if the name is longer than about twelve characters.
4. Add the recipe to `src/data/cocktails.ts` in millilitres, with `display` for anything that is not
   a volume.
5. Add any curated affinities to `src/data/pairings.ts` — each one needs a `why`.
6. `npm test` will tell you if an id does not resolve.

*Drink responsibly.*
