import { familyById } from '../data/categories'
import { ingredientById } from '../data/ingredients'
import type { Cocktail } from '../data/types'
import { fullName } from '../lib/labels'
import { useUnit } from '../hooks/useUnit'
import { partLabel } from '../lib/units'
import UnitSwitch from './UnitSwitch'

interface Props {
  cocktail: Cocktail
  onClose: () => void
  onOpenIngredient: (id: string) => void
}

const IBA_LABEL: Record<string, string> = {
  unforgettable: 'IBA · The Unforgettables',
  contemporary: 'IBA · Contemporary Classic',
  'new-era': 'IBA · New Era',
}

export default function CocktailDetail({ cocktail, onClose, onOpenIngredient }: Props) {
  const { unit } = useUnit()
  const fam = familyById[cocktail.family]

  const swaps = cocktail.parts
    .map((p) => ingredientById[p.id])
    .filter((i) => i?.substitutes?.length)
    .slice(0, 3)

  return (
    <div className="overlay" role="dialog" aria-label={cocktail.name}>
      <div className="overlay-inner">
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, alignItems: 'center' }}>
          <p className="eyebrow" style={{ margin: 0 }}>
            {cocktail.iba ? IBA_LABEL[cocktail.iba] : 'Modern classic'}
          </p>
          <button type="button" className="btn ghost" onClick={onClose}>
            Close
          </button>
        </div>

        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 30, margin: '6px 0 2px' }}>
          {cocktail.name}
        </h2>
        <p className="muted" style={{ marginTop: 0 }}>
          {cocktail.story}
        </p>

        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
            <p className="eyebrow" style={{ margin: 0 }}>
              Build
            </p>
            <UnitSwitch />
          </div>

          <ul className="recipe-list">
            {cocktail.parts.map((p) => (
              <li key={p.id}>
                <span className="amount">{partLabel(p, unit, cocktail.parts)}</span>
                <span className="ing">
                  <button
                    type="button"
                    onClick={() => onOpenIngredient(p.id)}
                    style={{
                      background: 'none',
                      border: 'none',
                      padding: 0,
                      textAlign: 'left',
                      textDecoration: 'underline',
                      textDecorationColor: 'var(--gold)',
                      textUnderlineOffset: '3px',
                    }}
                  >
                    {fullName(p.id)}
                  </button>
                  {p.optional ? <span className="chip" style={{ marginLeft: 6, fontSize: 10 }}>optional</span> : null}
                  {p.note ? <span className="note">{p.note}</span> : null}
                </span>
              </li>
            ))}
          </ul>

          <p className="muted" style={{ marginTop: 12, fontSize: 13.5 }}>
            <strong>{cocktail.technique}</strong> · serve in a {cocktail.glass} · garnish with{' '}
            {cocktail.garnish}
          </p>
        </div>

        <div className="card">
          <p className="eyebrow">Family · {fam.name}</p>
          <p style={{ margin: '0 0 6px' }}>{fam.root}</p>
          <p className="formula">{fam.formula}</p>
          <p className="muted" style={{ margin: 0, fontSize: 13.5 }}>
            {fam.lesson}
          </p>
        </div>

        {swaps.length ? (
          <div className="card">
            <p className="eyebrow">If you are missing something</p>
            <ul style={{ margin: 0, paddingLeft: 18 }}>
              {swaps.map((i) => (
                <li key={i.id} style={{ marginBottom: 4, fontSize: 14 }}>
                  <strong>{i.name}</strong> → {i.substitutes!.map((s) => fullName(s)).join(' or ')}
                </li>
              ))}
            </ul>
            <p className="muted" style={{ fontSize: 12.5, marginBottom: 0 }}>
              Every liqueur swap is also a sugar swap — taste, then adjust the citrus.
            </p>
          </div>
        ) : null}
      </div>
    </div>
  )
}
