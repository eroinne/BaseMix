import type { Part } from '../data/types'

/** Amounts are stored in millilitres everywhere in src/data and converted here, at
 *  render time, so switching units never touches the data. */

export type Unit = 'ml' | 'cl' | 'oz' | 'parts'

export const UNITS: { id: Unit; label: string; hint: string }[] = [
  { id: 'ml', label: 'ml', hint: 'millilitres — the way most of the world writes a recipe' },
  { id: 'cl', label: 'cl', hint: 'centilitres — how the IBA prints its own specs' },
  { id: 'oz', label: 'oz', hint: 'bar ounces, 30 ml, snapped to the fractions on a jigger' },
  { id: 'parts', label: 'parts', hint: 'the ratio only, so you can see the family formula' },
]

/** One bar ounce. Not the 29.57 ml US fluid ounce — every jigger is sold as 30. */
export const ML_PER_OZ = 30

const VULGAR: [number, string][] = [
  [1 / 8, '⅛'],
  [1 / 6, '⅙'],
  [1 / 4, '¼'],
  [1 / 3, '⅓'],
  [3 / 8, '⅜'],
  [1 / 2, '½'],
  [5 / 8, '⅝'],
  [2 / 3, '⅔'],
  [3 / 4, '¾'],
  [5 / 6, '⅚'],
  [7 / 8, '⅞'],
]

/** Snap a decimal to the nearest fraction that actually appears on a jigger. */
export function toBarFraction(value: number): string {
  const whole = Math.floor(value + 1e-9)
  const frac = value - whole

  if (frac < 1 / 16) return String(whole)

  let best = VULGAR[0]
  let bestDelta = Infinity
  for (const candidate of VULGAR) {
    const delta = Math.abs(frac - candidate[0])
    if (delta < bestDelta) {
      bestDelta = delta
      best = candidate
    }
  }
  // Closer to the next whole number than to any fraction.
  if (1 - frac < bestDelta) return String(whole + 1)

  return whole > 0 ? `${whole}${best[1]}` : best[1]
}

function trim(n: number): string {
  return String(Math.round(n * 100) / 100)
}

/** Format one volume. `parts` is recipe-relative, so it is handled by formatParts instead. */
export function formatAmount(ml: number, unit: Unit): string {
  switch (unit) {
    case 'ml':
      return `${trim(ml)} ml`
    case 'cl':
      return `${trim(ml / 10)} cl`
    case 'oz':
      return `${toBarFraction(ml / ML_PER_OZ)} oz`
    case 'parts':
      return trim(ml)
  }
}

/**
 * Turn a whole recipe into a ratio: divide every measured amount by the smallest one
 * and round to a quarter, so a Daiquiri's 60 / 25 / 20 reads as 3 : 1¼ : 1 and the
 * family formula becomes visible.
 */
export function formatParts(parts: Part[]): Map<string, string> {
  const measured = parts.filter((p) => typeof p.ml === 'number')
  const out = new Map<string, string>()
  if (measured.length === 0) return out

  const min = Math.min(...measured.map((p) => p.ml as number))
  for (const p of measured) {
    const ratio = Math.max(0.25, Math.round(((p.ml as number) / min) * 4) / 4)
    out.set(p.id, toBarFraction(ratio))
  }
  return out
}

/** What a single part reads as, in the chosen unit. Dashes, eggs and rinses pass through. */
export function partLabel(part: Part, unit: Unit, parts: Part[]): string {
  if (part.display) return part.display
  if (typeof part.ml !== 'number') return ''
  if (unit === 'parts') return formatParts(parts).get(part.id) ?? ''
  return formatAmount(part.ml, unit)
}

/** The ratio spine of a drink, e.g. "3 : 1¼ : 1" — shown on recipe cards. */
export function ratioSpine(parts: Part[]): string {
  const map = formatParts(parts)
  return parts
    .filter((p) => map.has(p.id))
    .map((p) => map.get(p.id))
    .join(' : ')
}
