import type { Category, Family } from './types'

/** The ten sectors of the wheel, in the order they are drawn clockwise from the top.
 *  Ordering matters: categories that pair constantly are placed near each other so the
 *  busiest chords stay short and the circle stays readable on a phone. */
export const categories: Category[] = [
  {
    id: 'brown-spirits',
    label: 'Brown spirits',
    short: 'Brown',
    color: '#D9480F',
    blurb:
      'Aged in wood. Base notes of oak, vanilla, caramel and spice. Almost always the core of a drink.',
  },
  {
    id: 'fortified',
    label: 'Fortified & aromatized wine',
    short: 'Fortified',
    color: '#7048E8',
    blurb:
      'Wine with a backbone. Low proof, herbal, and the balance in every stirred drink.',
  },
  {
    id: 'bitters',
    label: 'Bitters & amari',
    short: 'Bitters',
    color: '#E03131',
    blurb:
      'Seasoning. A few dashes, or a full measure of amaro, decides the finish of the drink.',
  },
  {
    id: 'liqueurs',
    label: 'Liqueurs',
    short: 'Liqueurs',
    color: '#E64980',
    blurb: 'Sugar with an opinion, and the great bridge between a spirit and an acid.',
  },
  {
    id: 'sweeteners',
    label: 'Sweeteners',
    short: 'Sweet',
    color: '#C2255C',
    blurb:
      'Sugar, and the flavour that comes with it. Follow the sweetener back to the spirit it came from.',
  },
  {
    id: 'rich',
    label: 'Rich — egg, cream, coconut',
    short: 'Rich',
    color: '#B08968',
    blurb: 'Texture. Fat and protein round everything off and mute sugar and alcohol alike.',
  },
  {
    id: 'citrus',
    label: 'Citrus, acids & juices',
    short: 'Citrus',
    color: '#F59F00',
    blurb: 'The counterweight. Acid is what stops a sweet drink from being a dessert.',
  },
  {
    id: 'fresh',
    label: 'Fresh & aromatic',
    short: 'Fresh',
    color: '#74B816',
    blurb: 'Herbs, spice and aroma. Small amounts, big effect — a garnish is an ingredient.',
  },
  {
    id: 'white-spirits',
    label: 'White spirits',
    short: 'White',
    color: '#0CA678',
    blurb:
      'Unaged and bright. Top notes of botanicals, cane and agave. The core of everything fresh.',
  },
  {
    id: 'fizz',
    label: 'Fizz & lengtheners',
    short: 'Fizz',
    color: '#1C7ED6',
    blurb: 'Bubbles and length. Carbonation is the ingredient you are actually buying.',
  },
]

export const categoryById = Object.fromEntries(
  categories.map((c) => [c.id, c]),
) as Record<Category['id'], Category>

/** The six root recipes from Cocktail Codex. Every cocktail in the app belongs to one. */
export const families: Family[] = [
  {
    id: 'old-fashioned',
    name: 'Old Fashioned',
    root: 'spirit + sugar + bitters + dilution',
    formula: '60 ml spirit · 7.5 ml rich syrup · 2–4 dashes bitters',
    technique: 'build and stir over one large piece of ice',
    glass: 'rocks',
    lesson:
      'Balance. Nothing hides the spirit, so the spirit has to be good and the dilution exact.',
    color: '#D9480F',
  },
  {
    id: 'martini',
    name: 'Martini',
    root: 'spirit + fortified wine (± bitters)',
    formula: '60 ml spirit · 10–30 ml vermouth · optional bitters',
    technique: 'stir 30 seconds, strain',
    glass: 'chilled coupe',
    lesson: 'Clarity and texture. No juice, no bubbles, nothing to hide behind.',
    color: '#7048E8',
  },
  {
    id: 'daiquiri',
    name: 'Daiquiri',
    root: 'spirit + fresh citrus + sugar',
    formula: '60 ml spirit · 20–25 ml citrus · 20 ml syrup — the 2 : ¾ : ¾ sour spine',
    technique: 'shake hard for 12 seconds, strain',
    glass: 'chilled coupe',
    lesson: 'Acid. Shaking chills, dilutes and aerates the juice in a single move.',
    color: '#F59F00',
  },
  {
    id: 'sidecar',
    name: 'Sidecar',
    root: 'spirit + citrus + liqueur as the sweetener',
    formula: '50 ml spirit · 20 ml liqueur · 20 ml citrus, or 22 / 22 / 22 / 22 equal parts',
    technique: 'shake, strain',
    glass: 'chilled coupe',
    lesson: 'The sweetener can also be a flavour. Every liqueur swap is a sugar swap.',
    color: '#E64980',
  },
  {
    id: 'highball',
    name: 'Highball',
    root: 'spirit + carbonated mixer',
    formula: '45 ml spirit · 135–180 ml mixer — 1 : 3 to 1 : 4',
    technique: 'build in the glass, stir once or not at all',
    glass: 'highball',
    lesson: 'Temperature and carbonation. Ice-cold, tall ice, minimal agitation.',
    color: '#1C7ED6',
  },
  {
    id: 'flip',
    name: 'Flip',
    root: 'spirit + sweetener + egg or dairy',
    formula: '60 ml spirit · 15 ml rich syrup · 1 whole egg',
    technique: 'dry shake to emulsify, shake again with ice, fine strain',
    glass: 'small stemmed',
    lesson: 'Texture. Fat and protein mute sugar and alcohol alike.',
    color: '#B08968',
  },
]

export const familyById = Object.fromEntries(families.map((f) => [f.id, f])) as Record<
  Family['id'],
  Family
>
