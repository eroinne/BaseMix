import { cocktails } from '../data/cocktails'
import { ingredientById } from '../data/ingredients'
import type { Cocktail } from '../data/types'

/** Score every drink against what the user has locked into the shaker. */

export type Tier = 'perfect' | 'one-away' | 'two-away'

export interface Match {
  cocktail: Cocktail
  tier: Tier
  /** Ingredient ids that are still missing. */
  missing: string[]
  /** Missing ingredient id → the selected ingredient that can stand in for it. */
  substituted: Record<string, string>
  have: number
  required: number
}

/** Parts that carry a `display` string are dashes, eggs, rinses and pinches: things any
 *  bar has. Requiring them would make almost nothing matchable. */
function requiredParts(c: Cocktail): string[] {
  return c.parts
    .filter((p) => !p.optional && typeof p.ml === 'number')
    .map((p) => p.id)
    .filter((id) => ingredientById[id])
}

/** An ingredient counts as available if it is selected, or if something selected is
 *  listed as a substitute for it (see docs/COCKTAIL-KNOWLEDGE.md §8). */
function standIn(id: string, selected: Set<string>): string | null {
  const subs = ingredientById[id]?.substitutes ?? []
  for (const s of subs) if (selected.has(s)) return s
  return null
}

export function matchCocktails(selected: Set<string>, maxMissing = 2): Match[] {
  if (selected.size === 0) return []

  const out: Match[] = []

  for (const c of cocktails) {
    const required = requiredParts(c)
    if (required.length === 0) continue

    const missing: string[] = []
    const substituted: Record<string, string> = {}
    let have = 0

    for (const id of required) {
      if (selected.has(id)) {
        have++
        continue
      }
      const sub = standIn(id, selected)
      if (sub) {
        have++
        substituted[id] = sub
        continue
      }
      missing.push(id)
    }

    // A drink you share no ingredient with is not a near miss, it is a different drink.
    if (have === 0) continue
    if (missing.length > maxMissing) continue

    out.push({
      cocktail: c,
      tier: missing.length === 0 ? 'perfect' : missing.length === 1 ? 'one-away' : 'two-away',
      missing,
      substituted,
      have,
      required: required.length,
    })
  }

  const tierRank: Record<Tier, number> = { perfect: 0, 'one-away': 1, 'two-away': 2 }
  out.sort((a, b) => {
    if (tierRank[a.tier] !== tierRank[b.tier]) return tierRank[a.tier] - tierRank[b.tier]
    // Then the drink that uses most of what you picked.
    const aRatio = a.have / a.required
    const bRatio = b.have / b.required
    if (aRatio !== bRatio) return bRatio - aRatio
    return a.cocktail.name.localeCompare(b.cocktail.name)
  })

  return out
}

export interface Unlock {
  id: string
  /** How many more drinks become makeable if this one ingredient is added. */
  unlocks: number
}

/** "Add lime juice and you unlock 7 more." Ranked by how much each addition buys. */
export function nextUnlocks(matches: Match[], limit = 4): Unlock[] {
  const counts = new Map<string, number>()
  for (const m of matches) {
    if (m.missing.length !== 1) continue
    const id = m.missing[0]
    counts.set(id, (counts.get(id) ?? 0) + 1)
  }
  return [...counts.entries()]
    .map(([id, unlocks]) => ({ id, unlocks }))
    .sort((a, b) => b.unlocks - a.unlocks || a.id.localeCompare(b.id))
    .slice(0, limit)
}

export function countByTier(matches: Match[]): Record<Tier, number> {
  const out: Record<Tier, number> = { perfect: 0, 'one-away': 0, 'two-away': 0 }
  for (const m of matches) out[m.tier]++
  return out
}
