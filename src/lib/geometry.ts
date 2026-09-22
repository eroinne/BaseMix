import type { CategoryId, Ingredient } from '../data/types'

/** All wheel maths lives here, as pure functions, so it can be tested without a DOM.
 *  Angles are degrees, 0 at twelve o'clock, increasing clockwise. */

export interface Pt {
  x: number
  y: number
}

export const VIEW = 360
export const CX = VIEW / 2
export const CY = VIEW / 2

/** Radii, from the middle outwards. The ring deliberately stops well short of the
 *  viewBox edge: everything between `label` and 180 is room for ingredient names. */
export const R = {
  hub: 50,
  chord: 91,
  node: 99,
  bandInner: 105,
  bandOuter: 123,
  label: 128,
}

export function polar(cx: number, cy: number, r: number, deg: number): Pt {
  const rad = ((deg - 90) * Math.PI) / 180
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) }
}

/** A donut segment between two radii and two angles. */
export function arcPath(
  cx: number,
  cy: number,
  r0: number,
  r1: number,
  a0: number,
  a1: number,
): string {
  const large = a1 - a0 > 180 ? 1 : 0
  const o0 = polar(cx, cy, r1, a0)
  const o1 = polar(cx, cy, r1, a1)
  const i1 = polar(cx, cy, r0, a1)
  const i0 = polar(cx, cy, r0, a0)
  return [
    `M ${o0.x} ${o0.y}`,
    `A ${r1} ${r1} 0 ${large} 1 ${o1.x} ${o1.y}`,
    `L ${i1.x} ${i1.y}`,
    `A ${r0} ${r0} 0 ${large} 0 ${i0.x} ${i0.y}`,
    'Z',
  ].join(' ')
}

/** An open arc, used as the path a sector's label runs along. Flipped in the lower
 *  half of the circle so the text never renders upside down. */
export function arcLabelPath(cx: number, cy: number, r: number, a0: number, a1: number): string {
  const mid = (a0 + a1) / 2
  const flip = mid > 90 && mid < 270
  const [from, to] = flip ? [a1, a0] : [a0, a1]
  const p0 = polar(cx, cy, r, from)
  const p1 = polar(cx, cy, r, to)
  const large = Math.abs(a1 - a0) > 180 ? 1 : 0
  return `M ${p0.x} ${p0.y} A ${r} ${r} 0 ${large} ${flip ? 0 : 1} ${p1.x} ${p1.y}`
}

/** A chord across the inside of the circle. The control point is pulled toward the
 *  centre, and the further apart the two ends are, the deeper the curve — so chords
 *  between neighbouring sectors hug the rim and chords across the circle bow inwards. */
export function chordPath(p1: Pt, p2: Pt, cx = CX, cy = CY, bend = 1): string {
  const mx = (p1.x + p2.x) / 2
  const my = (p1.y + p2.y) / 2
  // 0 when the ends coincide, 1 when they are diametrically opposed.
  const spread = Math.hypot(p1.x - p2.x, p1.y - p2.y) / (2 * R.chord)
  const pull = 0.15 + 0.85 * spread * bend
  const cxp = cx + (mx - cx) * (1 - pull)
  const cyp = cy + (my - cy) * (1 - pull)
  return `M ${p1.x} ${p1.y} Q ${cxp} ${cyp} ${p2.x} ${p2.y}`
}

/** Placement for a label sitting just outside the ring, reading outwards. */
export function radialLabel(
  angle: number,
  r = R.label,
): { transform: string; anchor: 'start' | 'end' } {
  const flip = angle > 180
  return {
    transform: `translate(${CX} ${CY}) rotate(${angle - 90}) translate(${r} 0)${
      flip ? ' rotate(180)' : ''
    }`,
    anchor: flip ? 'end' : 'start',
  }
}

export interface NodeLayout {
  id: string
  angle: number
  category: CategoryId
  point: Pt
  chordPoint: Pt
}

export interface SectorLayout {
  id: CategoryId
  a0: number
  a1: number
  mid: number
  nodes: NodeLayout[]
}

export interface WheelLayout {
  sectors: SectorLayout[]
  nodeById: Record<string, NodeLayout>
}

const GAP = 1.6
/** Share of the full circle a sector takes when it is zoomed into. */
const FOCUS_SHARE = 0.52

/**
 * How much of the circle each sector gets, as fractions summing to 1. Normally that is
 * proportional to how many ingredients the family holds; when one is focused it takes
 * `focusShare` and the rest compress around it.
 *
 * Kept separate from layoutWheel so the two states can be interpolated: the zoom
 * animation tweens this array and re-lays the wheel out each frame.
 */
export function sectorShares(
  order: CategoryId[],
  ingredients: Ingredient[],
  focus: CategoryId | null = null,
  focusShare = FOCUS_SHARE,
): number[] {
  const counts = order.map((id) => ingredients.filter((i) => i.category === id).length)
  const total = counts.reduce((a, b) => a + b, 0) || 1

  if (focus && order.includes(focus)) {
    const focusIdx = order.indexOf(focus)
    const rest = total - counts[focusIdx]
    return counts.map((c, i) =>
      i === focusIdx ? focusShare : (1 - focusShare) * (rest ? c / rest : 0),
    )
  }
  return counts.map((c) => c / total)
}

/** One frame of the zoom animation: the wheel's shape part-way between two share arrays. */
export function lerpShares(from: number[], to: number[], t: number): number[] {
  const clamped = Math.max(0, Math.min(1, t))
  return from.map((v, i) => v + ((to[i] ?? v) - v) * clamped)
}

/** Decelerating curve — fast to start, settling gently, which reads as physical. */
export function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - Math.max(0, Math.min(1, t)), 3)
}

/**
 * Lay the wheel out. Every sector normally gets a slice proportional to how many
 * ingredients it holds; when one is focused it expands to FOCUS_SHARE of the circle and
 * the others compress, which is what gives the zoom its room to breathe.
 */
export function layoutWheel(
  order: CategoryId[],
  ingredients: Ingredient[],
  opts: {
    focus?: CategoryId | null
    rotation?: number
    share?: number
    /** Pre-computed slice sizes, used while a zoom is animating between two layouts. */
    shares?: number[]
  } = {},
): WheelLayout {
  const { focus = null, rotation = 0, share: focusShare = FOCUS_SHARE } = opts
  const byCat = new Map<CategoryId, Ingredient[]>()
  for (const id of order) byCat.set(id, [])
  for (const ing of ingredients) byCat.get(ing.category)?.push(ing)

  const shares =
    opts.shares && opts.shares.length === order.length
      ? opts.shares
      : sectorShares(order, ingredients, focus, focusShare)

  const sectors: SectorLayout[] = []
  const nodeById: Record<string, NodeLayout> = {}
  let cursor = rotation

  order.forEach((id, i) => {
    const span = shares[i] * 360
    const a0 = cursor + GAP / 2
    const a1 = cursor + span - GAP / 2
    cursor += span

    const list = byCat.get(id) ?? []
    // Keep nodes off the sector's own edges so neighbouring sectors never collide.
    const pad = Math.min(6, (a1 - a0) / (list.length + 1))
    const from = a0 + pad
    const to = a1 - pad
    const step = list.length > 1 ? (to - from) / (list.length - 1) : 0

    const nodes = list.map((ing, n) => {
      const angle = list.length === 1 ? (a0 + a1) / 2 : from + n * step
      const node: NodeLayout = {
        id: ing.id,
        angle,
        category: id,
        point: polar(CX, CY, R.node, angle),
        chordPoint: polar(CX, CY, R.chord, angle),
      }
      nodeById[ing.id] = node
      return node
    })

    sectors.push({ id, a0, a1, mid: (a0 + a1) / 2, nodes })
  })

  return { sectors, nodeById }
}

/** Shortest signed distance between two angles, in degrees. */
export function angleDelta(a: number, b: number): number {
  return ((((b - a) % 360) + 540) % 360) - 180
}
