import { useMemo, useRef, useState } from 'react'
import { categories, categoryById } from '../../data/categories'
import { ingredients, ingredientById } from '../../data/ingredients'
import type { CategoryId } from '../../data/types'
import {
  CX,
  CY,
  R,
  VIEW,
  arcLabelPath,
  arcPath,
  layoutWheel,
  radialLabel,
  sectorShares,
} from '../../lib/geometry'
import { useTweenedArray } from '../../hooks/useTween'
import {
  buildAffinityGraph,
  edgesWithin,
  otherEnd,
  partnersOf,
  restingEdges,
  type Edge,
} from '../../lib/graph'
import { shortName } from '../../lib/labels'
import Chords, { type ChordSpec } from './Chords'
import Hub from './Hub'

interface Props {
  focusNode: string | null
  focusCategory: CategoryId | null
  selected: Set<string>
  matchCount: number
  onNodeTap: (id: string) => void
  onSectorTap: (id: CategoryId) => void
  onReset: () => void
}

const ORDER = categories.map((c) => c.id)
const DRAG_SLOP = 7

/** Uppercase, letter-spaced text along an arc has no automatic fitting in SVG, so the
 *  label picks itself: the full family name if the sector is wide enough, otherwise the
 *  one-word version, shrunk until it fits the arc it has to sit on. */
function fitSectorLabel(
  full: string,
  short: string,
  span: number,
): { text: string; size: number } | null {
  const arc = (span / 360) * 2 * Math.PI * ((R.bandInner + R.bandOuter) / 2 - 2.6)
  // 0.62 em per glyph plus the 0.3em tracking from .sector-label.
  const widthAt = (text: string, size: number) => text.length * size * 0.92
  for (const text of [full.toUpperCase(), short.toUpperCase()]) {
    for (const size of [7.4, 6.8, 6.2, 5.6]) {
      if (widthAt(text, size) <= arc * 0.88) return { text, size }
    }
  }
  // A squeezed sector says nothing rather than showing a clipped word.
  return null
}

export default function Wheel({
  focusNode,
  focusCategory,
  selected,
  matchCount,
  onNodeTap,
  onSectorTap,
  onReset,
}: Props) {
  const [rotation, setRotation] = useState(0)
  const svgRef = useRef<SVGSVGElement>(null)
  const drag = useRef<{ startAngle: number; startRotation: number; moved: number } | null>(null)

  const { usage } = buildAffinityGraph()
  /** The shape the wheel is heading for. With one ingredient focused the whole circle
   *  matters, because its partners are scattered across every other family — so the zoom
   *  relaxes to keep them apart. */
  const targetShares = useMemo(
    () => sectorShares(ORDER, ingredients, focusCategory, focusNode ? 0.34 : undefined),
    [focusCategory, focusNode],
  )

  // Tweening the slice sizes and re-laying out each frame is what makes the bands grow,
  // the dots slide around the rim and the chords follow, instead of snapping.
  const shares = useTweenedArray(targetShares)

  const layout = useMemo(
    () => layoutWheel(ORDER, ingredients, { focus: focusCategory, rotation, shares }),
    [focusCategory, rotation, shares],
  )

  /** Which chords to draw, and how loudly. Four states: a focused ingredient, a set of
   *  locked picks, a zoomed sector, or rest. */
  const chords: ChordSpec[] = useMemo(() => {
    if (focusNode) {
      const own = partnersOf(focusNode).slice(0, 16)
      const rest = restingEdges(30).filter((e) => e.a !== focusNode && e.b !== focusNode)
      return [
        ...rest.map((edge) => ({ edge, opacity: 0.07 })),
        ...own.map((edge) => ({
          edge,
          opacity: edge.source === 'curated' ? 0.92 : 0.5,
          emphasis: true,
        })),
      ]
    }

    if (selected.size > 0) {
      const within = edgesWithin(selected)
      const reach: Edge[] = []
      for (const id of selected) {
        for (const e of partnersOf(id)) {
          if (e.strength === 3 && !selected.has(otherEnd(e, id))) reach.push(e)
        }
      }
      return [
        ...reach.slice(0, 26).map((edge) => ({ edge, opacity: 0.22 })),
        ...within.map((edge) => ({ edge, opacity: 0.95, emphasis: true })),
      ]
    }

    if (focusCategory) {
      const inCat = buildAffinityGraph()
        .edges.filter(
          (e) =>
            ingredientById[e.a]?.category === focusCategory ||
            ingredientById[e.b]?.category === focusCategory,
        )
        .filter((e) => e.source === 'curated')
        .slice(0, 60)
      return inCat.map((edge) => ({ edge, opacity: edge.strength === 3 ? 0.7 : 0.4 }))
    }

    return restingEdges().map((edge) => ({ edge, opacity: 0.4 }))
  }, [focusNode, focusCategory, selected])

  /** Labels are shown on demand, never all at once — 110 names around a phone-sized
   *  circle is unreadable. */
  const labelled = useMemo(() => {
    const set = new Set<string>(selected)
    if (focusNode) {
      set.add(focusNode)
      for (const e of partnersOf(focusNode).slice(0, 10)) set.add(otherEnd(e, focusNode))
    }
    if (focusCategory) {
      for (const ing of ingredients) if (ing.category === focusCategory) set.add(ing.id)
    }
    return set
  }, [focusNode, focusCategory, selected])

  const partnerSet = useMemo(() => {
    if (!focusNode) return null
    const s = new Set<string>()
    for (const e of partnersOf(focusNode)) s.add(otherEnd(e, focusNode))
    return s
  }, [focusNode])

  function angleAt(clientX: number, clientY: number): number {
    const rect = svgRef.current?.getBoundingClientRect()
    if (!rect) return 0
    const x = clientX - (rect.left + rect.width / 2)
    const y = clientY - (rect.top + rect.height / 2)
    return (Math.atan2(y, x) * 180) / Math.PI + 90
  }

  function onPointerDown(e: React.PointerEvent) {
    drag.current = {
      startAngle: angleAt(e.clientX, e.clientY),
      startRotation: rotation,
      moved: 0,
    }
    ;(e.target as Element).setPointerCapture?.(e.pointerId)
  }

  function onPointerMove(e: React.PointerEvent) {
    const d = drag.current
    if (!d) return
    const delta = angleAt(e.clientX, e.clientY) - d.startAngle
    d.moved = Math.max(d.moved, Math.abs(delta))
    if (d.moved > 1.5) setRotation(d.startRotation + delta)
  }

  function endDrag(e: React.PointerEvent) {
    ;(e.target as Element).releasePointerCapture?.(e.pointerId)
    // Leave the flag in place for the click that follows, then clear it.
    const d = drag.current
    window.setTimeout(() => {
      if (drag.current === d) drag.current = null
    }, 0)
  }

  /** A tap only counts if the wheel was not being spun. */
  const wasDragged = () => (drag.current?.moved ?? 0) > DRAG_SLOP

  const focusIng = focusNode ? ingredientById[focusNode] : null
  const hub = focusIng
    ? {
        sub: categoryById[focusIng.category].short,
        title: focusIng.name,
        detail: `${partnersOf(focusIng.id).length} pairings`,
        accent: categoryById[focusIng.category].color,
      }
    : selected.size > 0
      ? {
          sub: `${selected.size} picked`,
          title: `${matchCount} drinks`,
          detail: 'within reach',
          accent: 'var(--gold)',
        }
      : focusCategory
        ? {
            sub: 'Family',
            title: categoryById[focusCategory].label,
            detail: `${ingredients.filter((i) => i.category === focusCategory).length} bottles`,
            accent: categoryById[focusCategory].color,
          }
        : { sub: 'Mixwheel', title: 'Tap a dot', detail: 'or a band', accent: 'var(--gold)' }

  return (
    <div className="wheel-wrap">
      <svg
        ref={svgRef}
        className="wheel"
        viewBox={`0 0 ${VIEW} ${VIEW}`}
        role="img"
        aria-label="Circle of cocktail ingredient families, linked by their affinities"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        {/* deco: concentric hairlines */}
        <circle cx={CX} cy={CY} r={R.chord + 3} fill="none" stroke="var(--gold-soft)" strokeWidth={0.4} opacity={0.6} />
        <circle cx={CX} cy={CY} r={R.hub + 9} fill="none" stroke="var(--gold-soft)" strokeWidth={0.4} opacity={0.5} />

        <Chords chords={chords} nodeById={layout.nodeById} />

        {/* sector bands */}
        {layout.sectors.map((s) => {
          const cat = categoryById[s.id]
          const dim = focusCategory && focusCategory !== s.id
          const label = fitSectorLabel(cat.label, cat.short, s.a1 - s.a0)
          return (
            <g key={s.id}>
              <path
                className="sector-band"
                d={arcPath(CX, CY, R.bandInner, R.bandOuter, s.a0, s.a1)}
                fill={cat.color}
                opacity={dim ? 0.35 : 0.95}
                onClick={() => {
                  if (!wasDragged()) onSectorTap(s.id)
                }}
              />
              {label ? (
                <>
                  <path
                    id={`arc-${s.id}`}
                    d={arcLabelPath(CX, CY, (R.bandInner + R.bandOuter) / 2 - 2.6, s.a0, s.a1)}
                    fill="none"
                  />
                  <text className="sector-label" style={{ fontSize: label.size }}>
                    <textPath href={`#arc-${s.id}`} startOffset="50%" textAnchor="middle">
                      {label.text}
                    </textPath>
                  </text>
                </>
              ) : null}
            </g>
          )
        })}

        {/* ingredient nodes */}
        {layout.sectors.map((s) =>
          s.nodes.map((n) => {
            const cat = categoryById[n.category]
            const isFocus = focusNode === n.id
            const isPicked = selected.has(n.id)
            const isPartner = partnerSet?.has(n.id) ?? false
            const dimmed = (focusNode && !isFocus && !isPartner) || (focusCategory && focusCategory !== n.category)
            const size = 1.9 + Math.min(1.6, (usage.get(n.id) ?? 0) * 0.22)
            const r = isFocus ? size + 2.4 : isPicked ? size + 1.5 : size
            const label = labelled.has(n.id)
            const place = radialLabel(n.angle)
            return (
              <g key={n.id}>
                {isPicked ? (
                  <circle cx={n.point.x} cy={n.point.y} r={r + 2.4} fill="none" stroke="var(--gold)" strokeWidth={1.1} />
                ) : null}
                <circle
                  className="node-dot"
                  cx={n.point.x}
                  cy={n.point.y}
                  r={r}
                  fill={cat.color}
                  opacity={dimmed ? 0.25 : 1}
                  onClick={() => {
                    if (!wasDragged()) onNodeTap(n.id)
                  }}
                />
                {/* a generous invisible hit area — 44px targets on a 360-unit viewBox */}
                <circle
                  cx={n.point.x}
                  cy={n.point.y}
                  r={7}
                  fill="transparent"
                  onClick={() => {
                    if (!wasDragged()) onNodeTap(n.id)
                  }}
                />
                {label ? (
                  <text
                    className={`node-label${isFocus ? ' is-focus' : ''}`}
                    transform={place.transform}
                    textAnchor={place.anchor}
                    opacity={dimmed ? 0.35 : 1}
                    style={isPicked ? { fill: 'var(--ink)', fontWeight: 700 } : undefined}
                  >
                    {shortName(n.id)}
                  </text>
                ) : null}
              </g>
            )
          }),
        )}

        <Hub {...hub} resettable={Boolean(focusNode || focusCategory)} onTap={onReset} />
      </svg>
    </div>
  )
}
