import { useState } from 'react'
import type { Cocktail } from '../data/types'
import { countByTier, nextUnlocks, type Match, type Tier } from '../lib/matching'
import { fullName } from '../lib/labels'
import CocktailCard from './CocktailCard'

interface Props {
  matches: Match[]
  onOpen: (c: Cocktail) => void
  onAdd: (id: string) => void
}

const TIER_LABEL: Record<Tier, string> = {
  perfect: 'You can make these now',
  'one-away': 'One ingredient away',
  'two-away': 'Two away',
}

const TIERS: Tier[] = ['perfect', 'one-away', 'two-away']

/** A bottom sheet with two states. Tapping the handle opens it; it peeks the rest of
 *  the time so the wheel stays the main event. */
export default function MatchSheet({ matches, onOpen, onAdd }: Props) {
  const [open, setOpen] = useState(false)
  const counts = countByTier(matches)
  const unlocks = nextUnlocks(matches)

  return (
    <div className={`sheet${open ? ' is-open' : ''}`}>
      <button
        type="button"
        className="sheet-handle"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        <span className="grip" />
        <span className="sheet-summary">
          <strong>{counts.perfect}</strong> ready
          <span aria-hidden>·</span>
          <strong>{counts['one-away']}</strong> one away
          <span aria-hidden>·</span>
          {open ? 'close' : 'open'}
        </span>
      </button>

      <div className="sheet-body">
        {unlocks.length > 0 ? (
          <p className="muted" style={{ fontSize: 13.5, marginTop: 2 }}>
            Add{' '}
            {unlocks.map((u, i) => (
              <span key={u.id}>
                {i > 0 ? ', ' : ''}
                <button
                  type="button"
                  className="chip chip-btn"
                  style={{ fontSize: 11 }}
                  onClick={() => onAdd(u.id)}
                >
                  {fullName(u.id).toLowerCase()} +{u.unlocks}
                </button>
              </span>
            ))}{' '}
            to unlock more.
          </p>
        ) : null}

        {TIERS.map((tier) => {
          const list = matches.filter((m) => m.tier === tier)
          if (list.length === 0) return null
          return (
            <section key={tier}>
              <h3 className="tier-head">
                {TIER_LABEL[tier]} ({list.length})
              </h3>
              {list.map((m) => (
                <CocktailCard
                  key={m.cocktail.id}
                  cocktail={m.cocktail}
                  missing={m.missing}
                  onOpen={() => onOpen(m.cocktail)}
                />
              ))}
            </section>
          )
        })}

        {matches.length === 0 ? (
          <p className="muted" style={{ padding: '18px 0' }}>
            Nothing matches yet. Pick a base spirit first — the wheel will show you what it wants next.
          </p>
        ) : null}
      </div>
    </div>
  )
}
