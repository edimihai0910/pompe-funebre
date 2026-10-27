import { useEffect, useRef, useState } from 'react'
import { COFFINS } from '../data/content'
import { photo } from '../data/media'
import { useReveal } from '../hooks/useReveal'
import { useSwipe } from '../hooks/useSwipe'
import { Arrow, Expand } from './Icons'
import Lightbox from './Lightbox'
import LightMotes from './LightMotes'
import './Gallery.css'
import './CoffinGallery.css'

const AUTO_MS = 5500
const n = COFFINS.length

// Formele (4, 6, 8 colturi), in ordinea in care apar, si titlul fiecarui model
const SHAPES = [...new Set(COFFINS.map((c) => c.corners))]
const MODELS = COFFINS.map((c, i) => {
  const same = COFFINS.filter((o) => o.corners === c.corners)
  return {
    ...c,
    ...photo(c.img),
    title: `Sicriu cu ${c.corners} colțuri`,
    model: `Modelul ${same.indexOf(c) + 1} din ${same.length}`,
    alt: `Sicriu cu ${c.corners} colțuri, văzut din trei unghiuri: ${c.note.toLowerCase()}`,
    cutout: true,
    pan: true,
    first: COFFINS.findIndex((o) => o.corners === c.corners) === i,
  }
})

/**
 * CoffinGallery — toate sicriele pe aceeasi scena, cate un model pe rand, cu forma
 * scrisa deasupra. Modelele se schimba singure pana la prima alegere a vizitatorului.
 */
export default function CoffinGallery() {
  const [index, setIndex] = useState(0)
  const [zoom, setZoom] = useState(null)
  const [auto, setAuto] = useState(true)
  const [paused, setPaused] = useState(false)
  // fotografiile se incarca pe masura ce se ajunge la ele (cea curenta si urmatoarea)
  const [loaded, setLoaded] = useState(() => new Set([0]))
  const [rootRef, inView] = useReveal({ threshold: 0.3, once: false })
  const thumbsRef = useRef(null)

  const reduced =
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const current = MODELS[index]
  const running = auto && !paused && inView && !reduced && zoom === null

  // Alegerea vizitatorului opreste schimbarea automata
  const pick = (i) => {
    setAuto(false)
    setIndex((i + n) % n)
  }
  const swipe = useSwipe(
    () => pick(index - 1),
    () => pick(index + 1),
  )

  useEffect(() => {
    if (!running) return
    const id = setTimeout(() => setIndex((i) => (i + 1) % n), AUTO_MS)
    return () => clearTimeout(id)
  }, [index, running])

  useEffect(() => {
    const next = (index + 1) % n
    setLoaded((prev) => (prev.has(index) && prev.has(next) ? prev : new Set([...prev, index, next])))

    // miniatura curenta ramane la vedere (doar banda se deruleaza, nu pagina)
    const strip = thumbsRef.current
    const thumb = strip.children[index]
    strip.scrollTo({
      left: thumb.offsetLeft - (strip.clientWidth - thumb.clientWidth) / 2,
      behavior: reduced ? 'auto' : 'smooth',
    })
  }, [index, reduced])

  // Lumina calda urmareste cursorul pe scena
  const onMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--mx', `${((e.clientX - rect.left) / rect.width) * 100}%`)
    e.currentTarget.style.setProperty('--my', `${((e.clientY - rect.top) / rect.height) * 100}%`)
  }

  return (
    <div
      className="frame coffins"
      ref={rootRef}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="coffins__head">
        {/* anuntat cititoarelor de ecran doar cand vizitatorul alege, nu la schimbarea automata */}
        <div aria-live={auto ? 'off' : 'polite'}>
          <p className="coffins__title">{current.title}</p>
          <p className="coffins__note">{current.note}</p>
        </div>

        <div className="coffins__shapes" role="group" aria-label="Forma sicriului">
          {SHAPES.map((corners) => (
            <button
              key={corners}
              type="button"
              className={`coffins__shape ${corners === current.corners ? 'is-active' : ''}`}
              aria-pressed={corners === current.corners}
              onClick={() => pick(COFFINS.findIndex((c) => c.corners === corners))}
            >
              {corners} colțuri
            </button>
          ))}
        </div>
      </div>

      <div className="coffins__view">
        <div className="stage coffins__stage" onMouseMove={onMouseMove} {...swipe}>
          <span className="stage__glow" />
          <LightMotes />

          {MODELS.map(
            (m, i) =>
              loaded.has(i) && (
                <button
                  key={m.img}
                  type="button"
                  className={`cutout coffins__model ${i === index ? 'is-active' : ''}`}
                  aria-label={`${m.alt} — mărește fotografia`}
                  aria-hidden={i !== index}
                  tabIndex={i === index ? 0 : -1}
                  onClick={() => {
                    pick(i)
                    setZoom(i)
                  }}
                >
                  <img
                    src={m.src}
                    srcSet={m.srcSet}
                    sizes="(max-width: 960px) 92vw, 900px"
                    alt=""
                    loading="lazy"
                    draggable={false}
                  />
                  <span className="cutout__sheen" style={{ '--mask': `url("${m.thumb}")` }} />
                </button>
              ),
          )}

          <span className="coffins__zoom">
            <Expand />
          </span>

          {/* Bara de progres a schimbarii automate (se reia la fiecare model) */}
          {running && (
            <span key={index} className="coffins__progress" style={{ '--auto-ms': `${AUTO_MS}ms` }} />
          )}
        </div>

        {/* Pe ecrane late stau peste scena; pe telefon, pe un rand sub ea (vezi CSS) */}
        <button
          type="button"
          className="round-arrow round-arrow--prev"
          aria-label="Modelul anterior"
          onClick={() => pick(index - 1)}
        >
          <Arrow dir="prev" />
        </button>
        <p className="coffins__count">{current.model}</p>
        <button
          type="button"
          className="round-arrow round-arrow--next"
          aria-label="Modelul următor"
          onClick={() => pick(index + 1)}
        >
          <Arrow dir="next" />
        </button>
      </div>

      <ul className="coffins__thumbs" ref={thumbsRef}>
        {MODELS.map((m, i) => (
          <li key={m.img} className={m.first && i > 0 ? 'coffins__thumb-gap' : undefined}>
            <button
              type="button"
              className={`coffins__thumb ${i === index ? 'is-active' : ''}`}
              aria-label={`${m.title}, ${m.model.toLowerCase()}`}
              aria-current={i === index}
              onClick={() => pick(i)}
            >
              <img src={m.thumb} alt="" loading="lazy" draggable={false} />
              <span>{m.corners} colțuri</span>
            </button>
          </li>
        ))}
      </ul>

      <Lightbox
        items={MODELS}
        index={zoom}
        onIndex={(i) => {
          pick(i)
          setZoom(i)
        }}
        onClose={() => setZoom(null)}
      />
    </div>
  )
}
