import { memo } from 'react'
import type { Edge } from '../../lib/graph'
import { chordPath, type NodeLayout } from '../../lib/geometry'
import { categoryById } from '../../data/categories'
import { ingredientById } from '../../data/ingredients'

/** Stroke pattern per pairing mechanic — the legend in the Learn tab explains it.
 *  Solid for flavours running the same way, dashed for tension, dotted for a bridge. */
const DASH: Record<Edge['type'], string | undefined> = {
  complementary: undefined,
  contrasting: '5 3.5',
  bridge: '1.2 2.6',
  shared: '0.8 3.2',
}

const WIDTH: Record<number, number> = { 1: 0.8, 2: 1.15, 3: 1.7 }

export interface ChordSpec {
  edge: Edge
  /** 0–1. Dimmed chords stay visible so the circle never looks empty. */
  opacity: number
  emphasis?: boolean
}

interface Props {
  chords: ChordSpec[]
  nodeById: Record<string, NodeLayout>
}

function colorOf(id: string): string {
  const cat = ingredientById[id]?.category
  return (cat && categoryById[cat]?.color) || '#8b93a7'
}

/** Chords are drawn as a gradient between the two sector colours, so a link reads as
 *  belonging to both families at once rather than to whichever end drew it. */
function Chords({ chords, nodeById }: Props) {
  return (
    <g>
      <defs>
        {chords.map(({ edge }) => {
          const a = nodeById[edge.a]
          const b = nodeById[edge.b]
          if (!a || !b) return null
          return (
            <linearGradient
              key={`g-${edge.a}-${edge.b}`}
              id={`chord-${edge.a}-${edge.b}`}
              gradientUnits="userSpaceOnUse"
              x1={a.chordPoint.x}
              y1={a.chordPoint.y}
              x2={b.chordPoint.x}
              y2={b.chordPoint.y}
            >
              <stop offset="0%" stopColor={colorOf(edge.a)} />
              <stop offset="100%" stopColor={colorOf(edge.b)} />
            </linearGradient>
          )
        })}
      </defs>

      {chords.map(({ edge, opacity, emphasis }) => {
        const a = nodeById[edge.a]
        const b = nodeById[edge.b]
        if (!a || !b) return null
        const w = (WIDTH[edge.strength] ?? 1) * (emphasis ? 1.55 : 1)
        return (
          <path
            key={`${edge.a}-${edge.b}`}
            className="chord"
            d={chordPath(a.chordPoint, b.chordPoint)}
            stroke={`url(#chord-${edge.a}-${edge.b})`}
            strokeWidth={w}
            strokeDasharray={DASH[edge.type]}
            opacity={opacity}
          />
        )
      })}
    </g>
  )
}

export default memo(Chords)
