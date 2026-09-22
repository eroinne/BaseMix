import { familyById } from '../data/categories'
import type { Cocktail } from '../data/types'
import { fullName } from '../lib/labels'
import { ratioSpine } from '../lib/units'

interface Props {
  cocktail: Cocktail
  missing?: string[]
  onOpen: () => void
}

export default function CocktailCard({ cocktail, missing = [], onOpen }: Props) {
  const fam = familyById[cocktail.family]
  return (
    <button type="button" className="drink" onClick={onOpen}>
      <span className="drink-top">
        <h3>{cocktail.name}</h3>
        <span className="family-badge" style={{ background: fam.color }}>
          {fam.name}
        </span>
      </span>
      <span className="drink-meta">
        {cocktail.technique} · {cocktail.glass} · {ratioSpine(cocktail.parts)}
      </span>
      {missing.length > 0 ? (
        <span className="drink-missing">
          Missing {missing.map((m) => fullName(m).toLowerCase()).join(' and ')}
        </span>
      ) : null}
    </button>
  )
}
