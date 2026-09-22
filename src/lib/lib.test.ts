import { describe, expect, it } from 'vitest'
import { cocktails, cocktailById } from '../data/cocktails'
import { ingredientById, ingredients } from '../data/ingredients'
import { categories } from '../data/categories'
import { pairings } from '../data/pairings'
import { buildAffinityGraph, partnersOf } from './graph'
import { matchCocktails, nextUnlocks } from './matching'
import { formatAmount, formatParts, ratioSpine, toBarFraction } from './units'
import {
  arcPath,
  chordPath,
  easeOutCubic,
  layoutWheel,
  lerpShares,
  polar,
  sectorShares,
} from './geometry'

describe('data integrity', () => {
  it('every ingredient belongs to a real category', () => {
    const ids = new Set(categories.map((c) => c.id))
    for (const ing of ingredients) expect(ids.has(ing.category)).toBe(true)
  })

  it('every recipe part names an ingredient that exists', () => {
    for (const c of cocktails) {
      for (const p of c.parts) {
        expect(ingredientById[p.id], `${c.name} → ${p.id}`).toBeDefined()
      }
    }
  })

  it('every curated pairing names ingredients that exist', () => {
    for (const p of pairings) {
      expect(ingredientById[p.a], `pairing a: ${p.a}`).toBeDefined()
      expect(ingredientById[p.b], `pairing b: ${p.b}`).toBeDefined()
    }
  })

  it('every substitute points at a real ingredient', () => {
    for (const ing of ingredients) {
      for (const s of ing.substitutes ?? []) {
        expect(ingredientById[s], `${ing.id} → ${s}`).toBeDefined()
      }
    }
  })

  it('has no duplicate ids', () => {
    expect(new Set(ingredients.map((i) => i.id)).size).toBe(ingredients.length)
    expect(new Set(cocktails.map((c) => c.id)).size).toBe(cocktails.length)
  })
})

describe('units', () => {
  it('formats millilitres and centilitres', () => {
    expect(formatAmount(45, 'ml')).toBe('45 ml')
    expect(formatAmount(7.5, 'cl')).toBe('0.75 cl')
    expect(formatAmount(45, 'cl')).toBe('4.5 cl')
  })

  it('snaps ounces to the fractions on a jigger', () => {
    expect(formatAmount(30, 'oz')).toBe('1 oz')
    expect(formatAmount(45, 'oz')).toBe('1½ oz')
    expect(formatAmount(22, 'oz')).toBe('¾ oz')
    expect(formatAmount(7.5, 'oz')).toBe('¼ oz')
    expect(formatAmount(20, 'oz')).toBe('⅔ oz')
    expect(formatAmount(60, 'oz')).toBe('2 oz')
  })

  it('rounds a bare fraction without a leading zero', () => {
    expect(toBarFraction(0.5)).toBe('½')
    expect(toBarFraction(2)).toBe('2')
    expect(toBarFraction(1.25)).toBe('1¼')
  })

  it('normalises a recipe into parts', () => {
    const daiquiri = cocktailById['daiquiri']
    const parts = formatParts(daiquiri.parts)
    // 60 / 25 / 20 ml, smallest is 20
    expect(parts.get('white-rum')).toBe('3')
    expect(parts.get('lime-juice')).toBe('1¼')
    expect(parts.get('simple-syrup')).toBe('1')
    expect(ratioSpine(daiquiri.parts)).toBe('3 : 1¼ : 1')
  })

  it('leaves dashes and eggs alone', () => {
    const of = cocktailById['old-fashioned']
    // Angostura is a dash, so it is not part of the ratio.
    expect(formatParts(of.parts).has('angostura')).toBe(false)
  })
})

describe('affinity graph', () => {
  it('merges curated edges with edges derived from the recipes', () => {
    const { edges } = buildAffinityGraph()
    expect(edges.some((e) => e.source === 'curated')).toBe(true)
    expect(edges.some((e) => e.source === 'recipes')).toBe(true)
  })

  it('never lists the same pair twice', () => {
    const { edges } = buildAffinityGraph()
    const keys = edges.map((e) => [e.a, e.b].sort().join('|'))
    expect(new Set(keys).size).toBe(keys.length)
  })

  it('backs a curated pairing with the drinks that prove it', () => {
    const edge = partnersOf('gin').find((e) => e.a === 'gin' && e.b === 'campari')
    expect(edge?.why).toContain('Negroni')
    expect(edge?.recipes).toContain('negroni')
  })

  it('only derives an edge from two or more shared recipes', () => {
    for (const e of buildAffinityGraph().edges) {
      if (e.source === 'recipes') expect(e.recipes.length).toBeGreaterThanOrEqual(2)
    }
  })
})

describe('matching', () => {
  it('finds a drink you can make exactly', () => {
    const picked = new Set(['white-rum', 'lime-juice', 'simple-syrup'])
    const matches = matchCocktails(picked)
    const daiquiri = matches.find((m) => m.cocktail.id === 'daiquiri')
    expect(daiquiri?.tier).toBe('perfect')
    expect(daiquiri?.missing).toEqual([])
  })

  it('ranks perfect matches above near misses', () => {
    const matches = matchCocktails(new Set(['gin', 'campari', 'sweet-vermouth']))
    expect(matches[0].cocktail.id).toBe('negroni')
    expect(matches[0].tier).toBe('perfect')
  })

  it('accepts a substitute the user already has', () => {
    // A Daiquiri asks for white rum; cachaça lists white rum as one of its substitutes.
    const matches = matchCocktails(new Set(['rhum-agricole', 'lime-juice', 'simple-syrup']))
    const daiquiri = matches.find((m) => m.cocktail.id === 'daiquiri')
    expect(daiquiri?.tier).toBe('perfect')
    expect(daiquiri?.substituted['white-rum']).toBe('rhum-agricole')
  })

  it('suggests the ingredient that unlocks the most drinks', () => {
    const matches = matchCocktails(new Set(['gin']))
    const unlocks = nextUnlocks(matches)
    expect(unlocks.length).toBeGreaterThan(0)
    expect(unlocks[0].unlocks).toBeGreaterThanOrEqual(unlocks[unlocks.length - 1].unlocks)
  })

  it('returns nothing for an empty shaker', () => {
    expect(matchCocktails(new Set())).toEqual([])
  })
})

describe('geometry', () => {
  it('puts zero degrees at the top and runs clockwise', () => {
    const top = polar(100, 100, 50, 0)
    expect(top.x).toBeCloseTo(100)
    expect(top.y).toBeCloseTo(50)
    const right = polar(100, 100, 50, 90)
    expect(right.x).toBeCloseTo(150)
    expect(right.y).toBeCloseTo(100)
  })

  it('closes every arc path', () => {
    expect(arcPath(100, 100, 40, 60, 0, 45).endsWith('Z')).toBe(true)
  })

  it('draws a chord as a single quadratic curve between the two ends', () => {
    const d = chordPath({ x: 10, y: 10 }, { x: 90, y: 90 })
    expect(d.startsWith('M 10 10')).toBe(true)
    expect(d).toContain('Q')
    expect(d.endsWith('90 90')).toBe(true)
  })

  it('lays every ingredient out exactly once, inside its own sector', () => {
    const order = categories.map((c) => c.id)
    const layout = layoutWheel(order, ingredients)
    expect(Object.keys(layout.nodeById).length).toBe(ingredients.length)
    for (const s of layout.sectors) {
      for (const n of s.nodes) {
        expect(n.angle).toBeGreaterThanOrEqual(s.a0)
        expect(n.angle).toBeLessThanOrEqual(s.a1)
      }
    }
  })

  it('produces shares that always add up to the whole circle', () => {
    const order = categories.map((c) => c.id)
    const sum = (xs: number[]) => xs.reduce((a, b) => a + b, 0)
    expect(sum(sectorShares(order, ingredients))).toBeCloseTo(1)
    expect(sum(sectorShares(order, ingredients, 'citrus'))).toBeCloseTo(1)
    expect(sum(sectorShares(order, ingredients, 'citrus', 0.34))).toBeCloseTo(1)
  })

  it('eases out, and never leaves the easing curve', () => {
    expect(easeOutCubic(0)).toBe(0)
    expect(easeOutCubic(1)).toBe(1)
    // Decelerating: more than half the distance is covered in the first half of the time.
    expect(easeOutCubic(0.5)).toBeGreaterThan(0.5)
    expect(easeOutCubic(-1)).toBe(0)
    expect(easeOutCubic(2)).toBe(1)
  })

  it('interpolates shares without ever losing the circle', () => {
    const order = categories.map((c) => c.id)
    const from = sectorShares(order, ingredients)
    const to = sectorShares(order, ingredients, 'citrus')
    const sum = (xs: number[]) => xs.reduce((a, b) => a + b, 0)
    for (const t of [0, 0.25, 0.5, 0.75, 1]) {
      const frame = lerpShares(from, to, easeOutCubic(t))
      expect(sum(frame)).toBeCloseTo(1)
      expect(frame.every((v) => v >= 0 && Number.isFinite(v))).toBe(true)
    }
    expect(lerpShares(from, to, 0)).toEqual(from)
    expect(lerpShares(from, to, 1)).toEqual(to)
  })

  it('lays the wheel out from pre-computed shares, so the zoom can be tweened', () => {
    const order = categories.map((c) => c.id)
    const from = sectorShares(order, ingredients)
    const to = sectorShares(order, ingredients, 'bitters')
    // A frame halfway through the animation.
    const half = from.map((v, i) => v + (to[i] - v) * 0.5)
    const layout = layoutWheel(order, ingredients, { shares: half })
    const span = (id: string) => {
      const s = layout.sectors.find((x) => x.id === id)!
      return s.a1 - s.a0
    }
    const spanIn = (shares: number[]) => {
      const l = layoutWheel(order, ingredients, { shares })
      const s = l.sectors.find((x) => x.id === 'bitters')!
      return s.a1 - s.a0
    }
    expect(span('bitters')).toBeGreaterThan(spanIn(from))
    expect(span('bitters')).toBeLessThan(spanIn(to))
    expect(Object.keys(layout.nodeById).length).toBe(ingredients.length)
  })

  it('gives a focused sector more of the circle', () => {
    const order = categories.map((c) => c.id)
    const plain = layoutWheel(order, ingredients)
    const zoomed = layoutWheel(order, ingredients, { focus: 'bitters' })
    const span = (l: typeof plain) => {
      const s = l.sectors.find((x) => x.id === 'bitters')!
      return s.a1 - s.a0
    }
    expect(span(zoomed)).toBeGreaterThan(span(plain) * 2)
  })
})
