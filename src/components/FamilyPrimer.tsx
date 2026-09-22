import { categories, families } from '../data/categories'
import { cocktails } from '../data/cocktails'
import UnitSwitch from './UnitSwitch'

const MECHANICS = [
  {
    key: 'complementary',
    name: 'Complementary',
    stroke: 'solid',
    text: 'Same direction — shared flavours that deepen each other. Whiskey and vanilla, rum and tropical fruit, gin and herbs.',
  },
  {
    key: 'contrasting',
    name: 'Contrasting',
    stroke: 'dashed',
    text: 'Opposite directions held in tension. Sweet against sour, sweet against bitter, smoke against sugar, salt against sweet.',
  },
  {
    key: 'bridge',
    name: 'Bridge',
    stroke: 'dotted',
    text: 'A third thing that makes two others get along. Bitters between spirit and sugar; orange liqueur between spirit and citrus; maraschino between gin and lime.',
  },
] as const

/** The theory from docs/COCKTAIL-KNOWLEDGE.md, in the app where you need it. */
export default function FamilyPrimer() {
  return (
    <>
      <section className="card">
        <p className="eyebrow">How to read the circle</p>
        <h2>Three kinds of link</h2>
        {MECHANICS.map((m) => (
          <div className="mech" key={m.key}>
            <svg className="key" width="30" height="16" aria-hidden>
              <line
                x1="1"
                y1="8"
                x2="29"
                y2="8"
                stroke="var(--ink)"
                strokeWidth="2"
                strokeDasharray={
                  m.stroke === 'dashed' ? '5 3.5' : m.stroke === 'dotted' ? '1.4 3' : undefined
                }
              />
            </svg>
            <p style={{ margin: 0, fontSize: 14 }}>
              <strong>{m.name}.</strong> {m.text}
            </p>
          </div>
        ))}
        <p className="muted" style={{ fontSize: 13, marginBottom: 0 }}>
          The faintest links are drawn from the recipes themselves: two ingredients that keep
          turning up in the same drinks are related, whether or not anyone wrote down why.
        </p>
      </section>

      <section className="card">
        <p className="eyebrow">Every cocktail is one of six</p>
        <h2>The root recipes</h2>
        <p className="muted" style={{ marginTop: 0, fontSize: 13.5 }}>
          Learn the root and you can improvise the whole branch. From <em>Cocktail Codex</em>.
        </p>
        {families.map((f) => {
          const count = cocktails.filter((c) => c.family === f.id).length
          return (
            <article className="family-card" key={f.id} style={{ borderLeftColor: f.color }}>
              <h3>{f.name}</h3>
              <p className="eyebrow" style={{ margin: '0 0 4px' }}>
                {f.root} · {count} drinks
              </p>
              <p className="formula">{f.formula}</p>
              <p className="muted" style={{ margin: 0, fontSize: 13.5 }}>
                {f.lesson} <em>{f.technique}</em>, into a {f.glass}.
              </p>
            </article>
          )
        })}
      </section>

      <section className="card">
        <p className="eyebrow">Balance</p>
        <h2>The sour spine</h2>
        <p className="formula">2 spirit : ¾ citrus : ¾ sweet</p>
        <p className="muted" style={{ fontSize: 14 }}>
          Start there and bend it. A thicker or louder sweetener — honey, orgeat, raspberry — comes
          back to 15–22 ml. Shake anything with juice, egg or dairy; stir anything that is all
          alcohol. Dilution is an ingredient: about 20 % water stirred, 25 % shaken.
        </p>
        <p className="muted" style={{ fontSize: 14, marginBottom: 0 }}>
          <strong>What does not work:</strong> citrus with cream or egg yolk (it curdles), two loud
          amari together, juice in a stirred drink, and bubbles in a shaker.
        </p>
      </section>

      <section className="card">
        <p className="eyebrow">The ten families</p>
        <h2>What each sector does</h2>
        {categories.map((c) => (
          <div key={c.id} style={{ display: 'flex', gap: 10, padding: '7px 0', borderBottom: '1px dotted var(--gold-soft)' }}>
            <span
              style={{
                width: 10,
                height: 10,
                borderRadius: 999,
                background: c.color,
                flex: 'none',
                marginTop: 5,
              }}
            />
            <p style={{ margin: 0, fontSize: 13.5 }}>
              <strong>{c.label}.</strong> <span className="muted">{c.blurb}</span>
            </p>
          </div>
        ))}
      </section>

      <section className="card">
        <p className="eyebrow">Settings</p>
        <h2>Measurements</h2>
        <p className="muted" style={{ fontSize: 13.5, marginTop: 0 }}>
          Every recipe is stored in millilitres and converted as you read it. “Parts” shows the
          ratio instead of the volume, which is how the family formulas are written.
        </p>
        <UnitSwitch />
      </section>

      <p className="muted" style={{ fontSize: 12, textAlign: 'center', padding: '10px 0 0' }}>
        The full write-up lives in <code>docs/COCKTAIL-KNOWLEDGE.md</code>. Drink responsibly.
      </p>
    </>
  )
}
