import { useRef } from 'react'

/**
 * useSwipe — glisare orizontala pe ecran tactil. Intoarce handler-ele de pus pe element;
 * o miscare mai mult pe verticala e lasata derularii paginii.
 */
export function useSwipe(onPrev, onNext, threshold = 45) {
  const start = useRef(null)

  return {
    onTouchStart: (e) => {
      start.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }
    },
    onTouchEnd: (e) => {
      if (!start.current) return
      const dx = e.changedTouches[0].clientX - start.current.x
      const dy = e.changedTouches[0].clientY - start.current.y
      start.current = null
      if (Math.abs(dx) < threshold || Math.abs(dx) < Math.abs(dy) * 1.5) return
      dx < 0 ? onNext() : onPrev()
    },
  }
}
