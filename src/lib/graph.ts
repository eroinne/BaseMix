import { cocktails } from '../data/cocktails'
import { pairings } from '../data/pairings'
import { ingredientById } from '../data/ingredients'
import type { PairingType } from '../data/types'

/** The affinity graph behind the wheel.
 *
 *  Two sources are merged:
 *   1. the curated pairings in src/data/pairings.ts, which carry a reason;
 *   2. co-occurrence in the recipe data — two ingredients used together in two or more
 *      drinks are related whether or not anyone wrote it down.
 *
 *  So every chord can answer "why?", either with a sentence or with the drinks that prove it.
 */

export type EdgeSource = 'curated' | 'recipes'

export interface Edge {
  a: string
  b: string
  strength: number
  type: PairingType | 'shared'
  source: EdgeSource
  why?: string
  /** Cocktail ids that use both ingredients. */
  recipes: string[]
}

export interface AffinityGraph {
  edges: Edge[]
  byIngredient: Map<string, Edge[]>
  /** How many drinks each ingredient appears in — drives node size. */
  usage: Map<string, number>
}

const key = (a: string, b: string) => (a < b ? `${a}|${b}` : `${b}|${a}`)

/** Below this, a shared recipe is a coincidence rather than an affinity. */
const MIN_SHARED_RECIPES = 2

let cached: AffinityGraph | null = null

export function buildAffinityGraph(): AffinityGraph {
  if (cached) return cached

  const shared = new Map<string, string[]>()
  const usage = new Map<string, number>()

  for (const c of cocktails) {
    const ids = c.parts.map((p) => p.id).filter((id) => ingredientById[id])
    for (const id of ids) usage.set(id, (usage.get(id) ?? 0) + 1)
    for (let i = 0; i < ids.length; i++) {
      for (let j = i + 1; j < ids.length; j++) {
        const k = key(ids[i], ids[j])
        const list = shared.get(k)
        if (list) list.push(c.id)
        else shared.set(k, [c.id])
      }
    }
  }

  const edges: Edge[] = []
  const seen = new Set<string>()

  for (const p of pairings) {
    if (!ingredientById[p.a] || !ingredientById[p.b]) continue
    const k = key(p.a, p.b)
    if (seen.has(k)) continue
    seen.add(k)
    edges.push({
      a: p.a,
      b: p.b,
      strength: p.strength,
      type: p.type,
      source: 'curated',
      why: p.why,
      recipes: shared.get(k) ?? [],
    })
  }

  for (const [k, recipes] of shared) {
    if (seen.has(k) || recipes.length < MIN_SHARED_RECIPES) continue
    seen.add(k)
    const [a, b] = k.split('|')
    edges.push({
      a,
      b,
      strength: Math.min(3, recipes.length),
      type: 'shared',
      source: 'recipes',
      recipes,
    })
  }

  const byIngredient = new Map<string, Edge[]>()
  for (const e of edges) {
    if (!byIngredient.has(e.a)) byIngredient.set(e.a, [])
    if (!byIngredient.has(e.b)) byIngredient.set(e.b, [])
    byIngredient.get(e.a)!.push(e)
    byIngredient.get(e.b)!.push(e)
  }
  for (const list of byIngredient.values()) {
    list.sort((x, y) => y.strength - x.strength || (x.source === 'curated' ? -1 : 1))
  }

  cached = { edges, byIngredient, usage }
  return cached
}

export function partnersOf(id: string): Edge[] {
  return buildAffinityGraph().byIngredient.get(id) ?? []
}

export function otherEnd(edge: Edge, id: string): string {
  return edge.a === id ? edge.b : edge.a
}

/** Only the strongest edges, for the wheel's resting state — everything at once is noise. */
export function restingEdges(limit = 46): Edge[] {
  return buildAffinityGraph()
    .edges.filter((e) => e.source === 'curated' && e.strength === 3)
    .slice(0, limit)
}

/** Edges that run between ingredients the user has picked. */
export function edgesWithin(ids: Set<string>): Edge[] {
  return buildAffinityGraph().edges.filter((e) => ids.has(e.a) && ids.has(e.b))
}

export const CHORD_LABEL: Record<Edge['type'], string> = {
  complementary: 'Complementary',
  contrasting: 'Contrasting',
  bridge: 'Bridge',
  shared: 'Shared recipes',
}
