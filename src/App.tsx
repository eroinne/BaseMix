import { useCallback, useMemo, useState } from 'react'
import Wheel from './components/Wheel/Wheel'
import Tray from './components/Tray'
import IngredientCard from './components/IngredientCard'
import MatchSheet from './components/MatchSheet'
import CocktailDetail from './components/CocktailDetail'
import FamilyPrimer from './components/FamilyPrimer'
import DrinksIndex from './components/DrinksIndex'
import { ingredientById } from './data/ingredients'
import type { Cocktail, CategoryId } from './data/types'
import { matchCocktails } from './lib/matching'

type Tab = 'circle' | 'drinks' | 'learn'

const TABS: { id: Tab; label: string }[] = [
  { id: 'circle', label: 'Circle' },
  { id: 'drinks', label: 'Drinks' },
  { id: 'learn', label: 'Learn' },
]

export default function App() {
  const [tab, setTab] = useState<Tab>('circle')
  const [focusNode, setFocusNode] = useState<string | null>(null)
  const [focusCategory, setFocusCategory] = useState<CategoryId | null>(null)
  const [selected, setSelected] = useState<string[]>([])
  const [openDrink, setOpenDrink] = useState<Cocktail | null>(null)

  const selectedSet = useMemo(() => new Set(selected), [selected])
  const matches = useMemo(() => matchCocktails(selectedSet), [selectedSet])

  const toggle = useCallback((id: string) => {
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))
  }, [])

  /** First tap focuses an ingredient and lights up its chords; the card that appears is
   *  where you lock it in. Tapping the same node again clears the focus. */
  const onNodeTap = useCallback((id: string) => {
    setFocusNode((cur) => (cur === id ? null : id))
    setFocusCategory(ingredientById[id]?.category ?? null)
  }, [])

  const onSectorTap = useCallback((id: CategoryId) => {
    setFocusNode(null)
    setFocusCategory((cur) => (cur === id ? null : id))
  }, [])

  const reset = useCallback(() => {
    setFocusNode(null)
    setFocusCategory(null)
  }, [])

  return (
    <div className="app">
      <header className="masthead">
        <h1>Mixwheel</h1>
        <span className="rule" />
        <span className="kicker">what mixes with what</span>
      </header>

      {tab === 'circle' ? (
        <>
          <Tray
            selected={selected}
            onRemove={toggle}
            onClear={() => setSelected([])}
          />

          <Wheel
            focusNode={focusNode}
            focusCategory={focusCategory}
            selected={selectedSet}
            matchCount={matches.filter((m) => m.tier === 'perfect').length}
            onNodeTap={onNodeTap}
            onSectorTap={onSectorTap}
            onReset={reset}
          />

          {focusNode ? (
            <IngredientCard
              id={focusNode}
              picked={selectedSet.has(focusNode)}
              onPick={() => toggle(focusNode)}
              onOpen={(id) => {
                setFocusNode(id)
                setFocusCategory(ingredientById[id]?.category ?? null)
              }}
              onClose={reset}
            />
          ) : (
            <section className="card">
              <p className="eyebrow">Start here</p>
              <h2>Tap any dot on the rim</h2>
              <p className="muted" style={{ marginTop: 0 }}>
                The circle is cut into ten ingredient families — hard spirits at the top, then
                fortified wine, bitters, liqueurs, sugar, richness, citrus, herbs, white spirits and
                bubbles. The lines across the middle are the affinities between them: solid where
                two flavours run the same way, dashed where they pull against each other, dotted
                where one ingredient exists to bridge the other two.
              </p>
              <p className="muted" style={{ fontSize: 13.5, marginBottom: 0 }}>
                Tap a family band to spread it open, drag the circle to spin it, and add what you
                have to the shaker to see what you can pour.
              </p>
            </section>
          )}
        </>
      ) : null}

      {tab === 'drinks' ? <DrinksIndex onOpen={setOpenDrink} /> : null}
      {tab === 'learn' ? <FamilyPrimer /> : null}

      {tab === 'circle' && selected.length > 0 ? (
        <MatchSheet
          matches={matches}
          onOpen={setOpenDrink}
          onAdd={(id) => toggle(id)}
        />
      ) : null}

      {openDrink ? (
        <CocktailDetail
          cocktail={openDrink}
          onClose={() => setOpenDrink(null)}
          onOpenIngredient={(id) => {
            if (!ingredientById[id]) return
            setOpenDrink(null)
            setTab('circle')
            setFocusNode(id)
            setFocusCategory(ingredientById[id].category)
          }}
        />
      ) : null}

      <nav className="nav">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            aria-current={tab === t.id}
            onClick={() => setTab(t.id)}
          >
            {t.label}
          </button>
        ))}
      </nav>
    </div>
  )
}
