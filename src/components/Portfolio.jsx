import { useCallback, useEffect, useRef, useState } from 'react'
import Reveal from './Reveal'
import { PORTFOLIO } from '../data/content'
import { useReveal } from '../hooks/useReveal'
import hearse from '../images/masina-funerara.jpg'
import coffins from '../images/sicrie.jpg'
import crosses from '../images/cruci.jpg'
import wreaths from '../images/coroane.jpg'
import rest from '../images/restul.jpg'
import './Portfolio.css'

const IMAGES = { hearse, coffins, crosses, wreaths, rest }

const AUTO_MS = 5000
const n = PORTFOLIO.length

// Slide-uri extinse cu clone la capete pentru bucla continua (fara salt)
const EXT = [PORTFOLIO[n - 1], ...PORTFOLIO, PORTFOLIO[0]]

function Arrow({ dir }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d={dir === 'prev' ? 'M15 5l-7 7 7 7' : 'M9 5l7 7-7 7'}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function Portfolio() {
  const [pos, setPos] = useState(1) // incepe pe primul slide real
  const [anim, setAnim] = useState(true)
  const [paused, setPaused] = useState(false)
  const [sectionRef, inView] = useReveal({ threshold: 0.25 })

  const reduced =
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const active = ((pos - 1) % n + n) % n

  const goNext = useCallback(() => setPos((p) => p + 1), [])
  const goPrev = useCallback(() => setPos((p) => p - 1), [])
  const goTo = useCallback((i) => setPos(i + 1), [])

  // Bucla continua: la atingerea clonelor, sari instant la slide-ul real
  const handleEnd = () => {
    if (pos === n + 1) {
      setAnim(false)
      setPos(1)
    } else if (pos === 0) {
      setAnim(false)
      setPos(n)
    }
  }

  // Reactiveaza tranzitia dupa saltul instant
  useEffect(() => {
    if (anim) return
    const id = requestAnimationFrame(() =>
      requestAnimationFrame(() => setAnim(true)),
    )
    return () => cancelAnimationFrame(id)
  }, [anim])

  // Auto-play bland — doar cand e in vizor si nepauzat
  const [tick, setTick] = useState(0)
  useEffect(() => {
    if (paused || !inView || reduced) return
    const id = setTimeout(() => {
      goNext()
      setTick((t) => t + 1)
    }, AUTO_MS)
    return () => clearTimeout(id)
  }, [pos, paused, inView, reduced, goNext])

  // Swipe pe touch
  const touch = useRef({ x: 0, active: false })
  const onTouchStart = (e) => {
    touch.current = { x: e.touches[0].clientX, active: true }
    setPaused(true)
  }
  const onTouchMove = (e) => {
    if (!touch.current.active) return
    touch.current.dx = e.touches[0].clientX - touch.current.x
  }
  const onTouchEnd = () => {
    const dx = touch.current.dx || 0
    if (Math.abs(dx) > 45) {
      dx < 0 ? goNext() : goPrev()
    }
    touch.current = { x: 0, active: false }
    setPaused(false)
  }

  const manual = (fn) => () => {
    fn()
    setTick((t) => t + 1) // reporneste bara de progres
  }

  return (
    <section id="portofoliu" className="section section--alt" ref={sectionRef}>
      <Reveal>
        <p className="eyebrow">Portofoliu</p>
        <h2 className="h2">Mașina, sicriele și lucrările noastre</h2>
        <p className="lead portfolio__intro">
          Fotografii din expoziția și din lucrările noastre. Imaginile se schimbă singure, lin — sau
          le puteți răsfoi cu săgețile, punctele ori prin glisare pe telefon.
        </p>
      </Reveal>

      <Reveal delay={120}>
        <div
          className="slider"
          role="region"
          aria-roledescription="carusel"
          aria-label="Portofoliu Cori&Flo"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <div className="slider__viewport">
            <div
              className="slider__track"
              onTransitionEnd={handleEnd}
              style={{
                transform: `translate3d(-${pos * 100}%, 0, 0)`,
                transition: anim
                  ? 'transform 1000ms cubic-bezier(0.22, 1, 0.36, 1)'
                  : 'none',
              }}
            >
              {EXT.map((item, i) => (
                <div
                  className="slide"
                  key={`${item.key}-${i}`}
                  aria-hidden={i !== pos}
                  role="group"
                  aria-roledescription="slide"
                >
                  {/* Colajele se vad intregi (contain); fundalul e aceeasi poza, estompata */}
                  <div className="slide__media">
                    <img className="slide__bg" src={IMAGES[item.key]} alt="" loading="lazy" draggable={false} />
                    <img
                      className="slide__img"
                      src={IMAGES[item.key]}
                      alt={item.alt}
                      loading="lazy"
                      draggable={false}
                    />
                  </div>
                  <div className="slide__caption">
                    <h3>{item.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            className="slider__arrow slider__arrow--prev"
            aria-label="Imaginea anterioară"
            onClick={manual(goPrev)}
          >
            <Arrow dir="prev" />
          </button>
          <button
            className="slider__arrow slider__arrow--next"
            aria-label="Imaginea următoare"
            onClick={manual(goNext)}
          >
            <Arrow dir="next" />
          </button>

          <div className="slider__dots" role="tablist" aria-label="Alege imaginea">
            {PORTFOLIO.map((item, i) => (
              <button
                key={item.key}
                className={`slider__dot ${i === active ? 'is-active' : ''}`}
                aria-label={item.title}
                aria-selected={i === active}
                role="tab"
                onClick={manual(() => goTo(i))}
              />
            ))}
          </div>

          {/* Bara de progres a auto-play-ului (se reia la fiecare pas) */}
          <span
            key={tick}
            className={`slider__progress ${
              inView && !paused && !reduced ? 'is-running' : ''
            }`}
            style={{ '--auto-ms': `${AUTO_MS}ms` }}
          />
        </div>
      </Reveal>
    </section>
  )
}
