import { useUnit } from '../hooks/useUnit'
import { UNITS } from '../lib/units'

/** Changing this re-renders every amount in the app at once — the data stays in ml. */
export default function UnitSwitch() {
  const { unit, setUnit } = useUnit()
  return (
    <div className="units" role="group" aria-label="Measurement units">
      {UNITS.map((u) => (
        <button
          key={u.id}
          type="button"
          aria-pressed={unit === u.id}
          title={u.hint}
          onClick={() => setUnit(u.id)}
        >
          {u.label}
        </button>
      ))}
    </div>
  )
}
