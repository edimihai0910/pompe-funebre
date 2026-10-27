import { useEffect, useRef, useState } from 'react'
import { createPetalFall } from '../components/petalFall'

/*
 * usePetalReveal — cardurile din Servicii apar pe rand, de la stanga la dreapta (dinspre
 * partea din care vin petalele), iar peste sectiune cad continuu petale de sakura
 * (components/petalFall.js).
 *
 * Cardurile apar dupa un temporizator, nu dupa desenarea petalelor: ajung vizibile oricum,
 * oricat de repede s-ar derula pagina. Cu miscare redusa (sau fara canvas) nu exista petale,
 * iar cardurile sunt vizibile de la inceput.
 */

const START = 150 // ms dupa ce un card ajunge pe ecran
const STAGGER = 120 // ms intre doua carduri

const motionAllowed = () =>
  typeof window !== 'undefined' &&
  'IntersectionObserver' in window &&
  'ResizeObserver' in window &&
  !window.matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * Intoarce { animated, shown, gridRef, layerRef, canvasRef }: `gridRef` merge pe containerul
 * cardurilor (copiii lui directi sunt cardurile), `layerRef` pe stratul care acopera sectiunea,
 * `canvasRef` pe canvasul din el, iar `shown[i]` spune daca al i-lea card a aparut.
 */
export function usePetalReveal(count) {
  const [animated, setAnimated] = useState(motionAllowed)
  const [shown, setShown] = useState(() => Array(count).fill(false))
  const gridRef = useRef(null)
  const layerRef = useRef(null)
  const canvasRef = useRef(null)

  useEffect(() => {
    if (!animated) return
    const fall = createPetalFall(canvasRef.current, layerRef.current)
    if (!fall) {
      setAnimated(false)
      return
    }
    const items = [...gridRef.current.children]
    const timers = new Set()
    const reveal = (i) => setShown((prev) => (prev[i] ? prev : prev.map((v, k) => v || k === i)))

    const cards = new IntersectionObserver(
      (entries) => {
        const fresh = entries.filter((e) => e.isIntersecting).map((e) => e.target)
        if (!fresh.length) return
        // de la stanga la dreapta, apoi de sus in jos
        const order = fresh
          .map((el) => ({ el, r: el.getBoundingClientRect() }))
          .sort((a, b) => a.r.left - b.r.left || a.r.top - b.r.top)
        order.forEach(({ el }, k) => {
          cards.unobserve(el)
          const id = setTimeout(() => {
            timers.delete(id)
            reveal(items.indexOf(el))
          }, START + k * STAGGER)
          timers.add(id)
        })
      },
      { threshold: 0.2 },
    )
    items.forEach((el) => cards.observe(el))

    // petalele cad doar cat sectiunea se vede
    const section = new IntersectionObserver(([e]) => fall.setVisible(e.isIntersecting))
    section.observe(layerRef.current)

    return () => {
      cards.disconnect()
      section.disconnect()
      timers.forEach(clearTimeout)
      fall.dispose()
    }
  }, [animated])

  return { animated, shown, gridRef, layerRef, canvasRef }
}
