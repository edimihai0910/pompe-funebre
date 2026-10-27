import Reveal from './Reveal'
import { SERVICES } from '../data/content'
import { usePetalReveal } from '../hooks/usePetalReveal'
import { PETALS } from './petalArt'
import './Sections.css'
import './Services.css'

// La trecerea mouse-ului peste un card, o singura petala langa coltul lui;
// urmatoarea poate aparea abia dupa ce s-a stins aceasta.
const dropPetal = (e) => {
  if (e.pointerType !== 'mouse') return
  e.currentTarget.querySelector('.card__petal').classList.add('is-drifting')
}
const petalGone = (e) => e.currentTarget.classList.remove('is-drifting')

export default function Services() {
  const { animated, shown, gridRef, layerRef, canvasRef } = usePetalReveal(SERVICES.length)

  return (
    <section id="servicii" className="section section--alt services">
      <Reveal>
        <p className="eyebrow">Servicii</p>
        <h2 className="h2" style={{ marginBottom: 40 }}>
          Tot ce este necesar, într-un singur loc
        </h2>
      </Reveal>

      <div className="cards" ref={gridRef}>
        {SERVICES.map((svc, i) => (
          <div key={svc.title} className={`svc ${animated && !shown[i] ? 'is-waiting' : ''}`}>
            <article className="card" onPointerEnter={dropPetal}>
              <span
                className="card__petal"
                style={{ '--petal': PETALS[i % PETALS.length] }}
                onAnimationEnd={petalGone}
                aria-hidden="true"
              />
              <h3 className="card__title">{svc.title}</h3>
              <p className="card__text">{svc.text}</p>
              <p className="card__tag">{svc.tag}</p>
            </article>
          </div>
        ))}
      </div>

      {/* Petalele care cad peste sectiune: un strat separat, care nu primeste click-uri
          (vezi components/petalFall.js) */}
      {animated && (
        <div className="petals" ref={layerRef} aria-hidden="true">
          <canvas className="petals__canvas" ref={canvasRef} />
        </div>
      )}
    </section>
  )
}
