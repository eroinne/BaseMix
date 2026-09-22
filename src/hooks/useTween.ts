import { useEffect, useReducer, useRef, useState } from 'react'
import { easeOutCubic, lerpShares } from '../lib/geometry'

/** Honours the OS "reduce motion" setting — with it on, the wheel jumps straight to its
 *  new shape instead of sliding there. */
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(() => {
    if (typeof matchMedia !== 'function') return false
    return matchMedia('(prefers-reduced-motion: reduce)').matches
  })

  useEffect(() => {
    if (typeof matchMedia !== 'function') return
    const mq = matchMedia('(prefers-reduced-motion: reduce)')
    const onChange = () => setReduced(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  return reduced
}

/**
 * Tween an array of numbers toward a new target over `duration` ms.
 *
 * The wheel's sector sizes live in an array like this, so animating it and re-laying the
 * circle out each frame makes every band grow, every dot slide along the rim and every
 * chord follow its ends — all from one interpolation.
 */
export function useTweenedArray(target: number[], duration = 460): number[] {
  const reduced = usePrefersReducedMotion()
  const [, render] = useReducer((n: number) => n + 1, 0)
  const current = useRef<number[]>(target)
  const from = useRef<number[]>(target)
  const frame = useRef(0)
  // Arrays are rebuilt on every render, so compare by value, not identity.
  const key = target.join(',')

  useEffect(() => {
    if (reduced || current.current.length !== target.length) {
      current.current = target
      render()
      return
    }

    from.current = current.current.slice()
    const started = performance.now()

    const tick = (now: number) => {
      const t = Math.min(1, (now - started) / duration)
      current.current = lerpShares(from.current, target, easeOutCubic(t))
      render()
      if (t < 1) frame.current = requestAnimationFrame(tick)
    }

    cancelAnimationFrame(frame.current)
    frame.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame.current)
    // `target` is read through the closure; `key` is what actually changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, duration, reduced])

  return current.current
}
