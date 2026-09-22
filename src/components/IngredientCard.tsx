import { categoryById } from '../data/categories'
import { ingredientById } from '../data/ingredients'
import { CHORD_LABEL, otherEnd, partnersOf } from '../lib/graph'
import { ROLE_LABEL, fullName } from '../lib/labels'
import { cocktailById } from '../data/cocktails'

interface Props {
  id: string
  picked: boolean
  onPick: () => void
  onOpen: (id: string) => void
  onClose: () => void
}

/** What the wheel cannot say on its own: why these two things belong together. */
export default function IngredientCard({ id, picked, onPick, onOpen, onClose }: Props) {
  const ing = ingredientById[id]
  if (!ing) return null
  const cat = categoryById[ing.category]
  const edges = partnersOf(id).slice(0, 8)

  return (
    <section className="card" aria-live="polite">
      <p className="eyebrow" style={{ color: cat.color }}>
        {cat.label} · {ROLE_LABEL[ing.role]}
        {ing.abv ? ` · ${ing.abv}%` : ''}
      </p>
      <h2>{ing.name}</h2>
      <p className="muted" style={{ margin: '4px 0 0' }}>
        {ing.blurb}
      </p>

      <ul className="chips">
        {ing.notes.map((n) => (
          <li key={n} className="chip">
            {n}
          </li>
        ))}
      </ul>

      <div className="btn-row">
        <button type="button" className="btn" onClick={onPick}>
          {picked ? 'Remove from shaker' : 'Add to shaker'}
        </button>
        <button type="button" className="btn ghost" onClick={onClose}>
          Close
        </button>
      </div>

      <p className="eyebrow" style={{ marginTop: 16 }}>
        Pairs with
      </p>
      <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
        {edges.map((e) => {
          const other = otherEnd(e, id)
          const otherCat = categoryById[ingredientById[other]?.category]
          return (
            <li
              key={`${e.a}-${e.b}`}
              style={{ padding: '8px 0', borderBottom: '1px dotted var(--gold-soft)' }}
            >
              <button
                type="button"
                className="chip chip-btn"
                onClick={() => onOpen(other)}
                style={{ marginBottom: 4 }}
              >
                <span className="swatch" style={{ background: otherCat?.color }} />
                {fullName(other)}
              </button>
              <span
                className="chip"
                style={{ marginLeft: 6, borderStyle: 'dashed', fontSize: 10 }}
              >
                {CHORD_LABEL[e.type]}
              </span>
              <p className="muted" style={{ margin: '4px 0 0', fontSize: 13 }}>
                {e.why ??
                  `They turn up together in ${e.recipes.length} drinks — ${e.recipes
                    .slice(0, 3)
                    .map((r) => cocktailById[r]?.name)
                    .filter(Boolean)
                    .join(', ')}.`}
              </p>
            </li>
          )
        })}
      </ul>

      {ing.substitutes?.length ? (
        <p className="muted" style={{ fontSize: 13, marginTop: 12 }}>
          <strong>No {ing.name.toLowerCase()}?</strong> Try{' '}
          {ing.substitutes.map((s) => fullName(s).toLowerCase()).join(' or ')}.
        </p>
      ) : null}
    </section>
  )
}
