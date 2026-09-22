/** Shared shapes for the whole dataset. See docs/COCKTAIL-KNOWLEDGE.md — it is the source of truth. */

export type CategoryId =
  | 'brown-spirits'
  | 'white-spirits'
  | 'fortified'
  | 'liqueurs'
  | 'bitters'
  | 'citrus'
  | 'sweeteners'
  | 'fresh'
  | 'fizz'
  | 'rich'

export interface Category {
  id: CategoryId
  /** Full name, used in the ingredient card. */
  label: string
  /** One word — this is what has to fit on the arc of the wheel. */
  short: string
  color: string
  /** The structural job this family does in a drink. */
  blurb: string
}

/** Where an ingredient sits: core / balance / seasoning / texture. */
export type Role = 'core' | 'balance' | 'seasoning' | 'texture'

export interface Ingredient {
  id: string
  name: string
  category: CategoryId
  role: Role
  /** % alcohol by volume, omitted for non-alcoholic ingredients. */
  abv?: number
  /** Three or four flavour descriptors, shown as chips. */
  notes: string[]
  blurb: string
  /** Ingredient ids to reach for when you do not have this one. */
  substitutes?: string[]
}

export type PairingType = 'complementary' | 'contrasting' | 'bridge'

export interface Pairing {
  a: string
  b: string
  /** 3 = canonical, 2 = strong, 1 = works. */
  strength: 1 | 2 | 3
  type: PairingType
  why: string
}

export type FamilyId = 'old-fashioned' | 'martini' | 'daiquiri' | 'sidecar' | 'highball' | 'flip'

export interface Family {
  id: FamilyId
  name: string
  root: string
  formula: string
  technique: string
  glass: string
  lesson: string
  color: string
}

export type Technique = 'stir' | 'shake' | 'build' | 'dry shake' | 'swizzle' | 'muddle' | 'blend'

export interface Part {
  id: string
  /** Canonical volume in millilitres. Absent for dashes, eggs, leaves and tops. */
  ml?: number
  /** Overrides the measured amount: "3 dashes", "1 whole egg", "rinse". */
  display?: string
  note?: string
  optional?: boolean
}

export interface Cocktail {
  id: string
  name: string
  family: FamilyId
  technique: Technique
  glass: string
  garnish: string
  parts: Part[]
  story: string
  iba?: 'unforgettable' | 'contemporary' | 'new-era'
}
