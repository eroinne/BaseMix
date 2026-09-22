import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react'
import type { Unit } from '../lib/units'

const KEY = 'mixwheel.unit'

const UnitContext = createContext<{ unit: Unit; setUnit: (u: Unit) => void }>({
  unit: 'ml',
  setUnit: () => {},
})

function read(): Unit {
  // Storage can throw or come back empty in a private window — ml is always a safe answer.
  try {
    const v = localStorage.getItem(KEY)
    if (v === 'ml' || v === 'cl' || v === 'oz' || v === 'parts') return v
  } catch {
    /* ignore */
  }
  return 'ml'
}

export function UnitProvider({ children }: { children: ReactNode }) {
  const [unit, setUnitState] = useState<Unit>(read)

  useEffect(() => {
    try {
      localStorage.setItem(KEY, unit)
    } catch {
      /* ignore */
    }
  }, [unit])

  const setUnit = useCallback((u: Unit) => setUnitState(u), [])

  return <UnitContext.Provider value={{ unit, setUnit }}>{children}</UnitContext.Provider>
}

export function useUnit() {
  return useContext(UnitContext)
}
