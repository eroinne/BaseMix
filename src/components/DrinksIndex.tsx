import { useMemo, useState } from 'react'
import { cocktails } from '../data/cocktails'
import { families } from '../data/categories'
import { ingredientById } from '../data/ingredients'
import type { Cocktail, FamilyId } from '../data/types'
import CocktailCard from './CocktailCard'

interface Props {
  onOpen: (c: Cocktail) => void
}

/** The whole book, searchable by drink or by what is in it. */
export default function DrinksIndex({ onOpen }: Props) {
  const [q, setQ] = useState('')
  const [family, setFamily] = useState<FamilyId | null>(null)

  const list = useMemo(() => {
    const needle = q.trim().toLowerCase()
    return cocktails.filter((c) => {
      if (family && c.family !== family) return false
      if (!needle) return true
      if (c.name.toLowerCase().includes(needle)) return true
      return c.parts.some((p) => ingredientById[p.id]?.name.toLowerCase().includes(needle))
    })
  }, [q, family])

  return (
    <>
      <input
        className="search"
        type="search"
        placeholder="Search a drink, or an ingredient…"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        aria-label="Search drinks"
      />

      <div className="filter-row">
        <button type="button" aria-pressed={family === null} onClick={() => setFamily(null)}>
          All {cocktails.length}
        </button>
        {families.map((f) => (
          <button
            key={f.id}
            type="button"
            aria-pressed={family === f.id}
            onClick={() => setFamily(family === f.id ? null : f.id)}
          >
            {f.name}
          </button>
        ))}
      </div>

      {list.map((c) => (
        <CocktailCard key={c.id} cocktail={c} onOpen={() => onOpen(c)} />
      ))}

      {list.length === 0 ? (
        <p className="muted" style={{ padding: '20px 0' }}>
          Nothing by that name. Try a spirit — “mezcal”, “rye”, “Chartreuse”.
        </p>
      ) : null}
    </>
  )
}
