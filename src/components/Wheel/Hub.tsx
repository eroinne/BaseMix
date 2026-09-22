import { CX, CY, R } from '../../lib/geometry'

interface Props {
  title: string
  sub: string
  /** Second line under the title, e.g. the role of the focused ingredient. */
  detail?: string
  accent: string
  /** Only offer the reset hint when there is actually something to clear. */
  resettable?: boolean
  onTap: () => void
}

/** The middle of the wheel is the readout: how many drinks are in the book, what you
 *  have focused, or how many recipes your picks already match. */
export default function Hub({ title, sub, detail, accent, resettable, onTap }: Props) {
  const long = title.length > 13
  return (
    <g className="hub-hit" onClick={onTap}>
      <circle cx={CX} cy={CY} r={R.hub} fill="var(--paper-2)" />
      <circle
        cx={CX}
        cy={CY}
        r={R.hub - 1}
        fill="none"
        stroke="var(--gold)"
        strokeWidth={0.7}
        opacity={0.9}
      />
      <circle
        cx={CX}
        cy={CY}
        r={R.hub - 5}
        fill="none"
        stroke="var(--gold-soft)"
        strokeWidth={0.5}
      />
      <circle cx={CX} cy={CY} r={3} fill={accent} opacity={0.85} />

      {/* Keyed on their own text so a changed readout remounts and fades in — a CSS
          animation does not restart when only the contents of an element change. */}
      <text
        key={sub}
        className="hub-sub"
        x={CX}
        y={CY - 19}
        textAnchor="middle"
        style={{ fill: accent, opacity: 0.9 }}
      >
        {sub}
      </text>
      <text
        key={title}
        className="hub-title"
        x={CX}
        y={CY - 1}
        textAnchor="middle"
        style={{ fontSize: long ? 10 : 13 }}
      >
        {title}
      </text>
      {detail ? (
        <text key={detail} className="hub-sub" x={CX} y={CY + 14} textAnchor="middle">
          {detail}
        </text>
      ) : null}
      {resettable ? (
        <text className="hub-sub" x={CX} y={CY + 30} textAnchor="middle" style={{ opacity: 0.5 }}>
          tap to reset
        </text>
      ) : null}
    </g>
  )
}
