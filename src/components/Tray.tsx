import { categoryById } from '../data/categories'
import { ingredientById } from '../data/ingredients'

interface Props {
  selected: string[]
  onRemove: (id: string) => void
  onClear: () => void
}

/** What is currently in the shaker. Tap a chip to take it back out. */
export default function Tray({ selected, onRemove, onClear }: Props) {
  return (
    <div className="tray">
      {selected.length === 0 ? (
        <p className="tray-empty" style={{ margin: 0 }}>
          Your shaker is empty — tap a dot on the circle, then “add to shaker”.
        </p>
      ) : (
        <>
          <div className="tray-scroll">
            {selected.map((id) => {
              const ing = ingredientById[id]
              const cat = categoryById[ing.category]
              return (
                <button
                  key={id}
                  type="button"
                  className="chip chip-btn"
                  onClick={() => onRemove(id)}
                  aria-label={`Remove ${ing.name}`}
                >
                  <span className="swatch" style={{ background: cat.color }} />
                  {ing.name}
                  <span aria-hidden style={{ color: 'var(--ink-3)' }}>
                    ×
                  </span>
                </button>
              )
            })}
          </div>
          <button
            type="button"
            className="chip chip-btn"
            onClick={onClear}
            style={{ flex: 'none' }}
          >
            Clear
          </button>
        </>
      )}
    </div>
  )
}
