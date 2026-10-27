import { useEffect, useRef, useState } from 'react'
import './LightMotes.css'

/**
 * LightMotes — luminite calde care plutesc lent (Three.js), ca praful in lumina unei
 * lumanari. Umple elementul parinte (care trebuie sa fie pozitionat).
 *   variant: 'hero' (cu un sir de luminite care urca din flacara `anchor`) | 'stage'
 * Biblioteca se incarca abia cand zona ajunge pe ecran, animatia se opreste cand iese din
 * ecran, iar efectul lipseste cu totul daca vizitatorul a cerut miscare redusa.
 */
export default function LightMotes({ variant = 'stage', anchor }) {
  const ref = useRef(null)
  const [ready, setReady] = useState(false)
  const [enabled] = useState(
    () =>
      typeof window !== 'undefined' &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches &&
      !navigator.connection?.saveData,
  )

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    let scene = null
    let loading = false
    let visible = false
    let cancelled = false

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting
        if (scene) scene.setActive(visible)
        if (!visible || scene || loading) return
        loading = true
        import('./lightMotesScene').then(({ createScene }) => {
          if (cancelled) return
          scene = createScene(canvas, { variant, anchor })
          if (!scene) return
          scene.setActive(visible)
          setReady(true)
        })
      },
      { rootMargin: '120px 0px' },
    )
    io.observe(canvas)

    return () => {
      cancelled = true
      io.disconnect()
      if (scene) scene.dispose()
    }
  }, [variant, anchor])

  if (!enabled) return null
  return <canvas ref={ref} className={`motes ${ready ? 'is-ready' : ''}`} aria-hidden="true" />
}
