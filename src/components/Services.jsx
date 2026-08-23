import Reveal from './Reveal'
import { SERVICES } from '../data/content'
import './Sections.css'

export default function Services() {
  return (
    <section id="servicii" className="section section--alt">
      <Reveal>
        <p className="eyebrow">Servicii</p>
        <h2 className="h2" style={{ marginBottom: 40 }}>
          Tot ce este necesar, într-un singur loc
        </h2>
      </Reveal>

      <div className="cards">
        {SERVICES.map((svc, i) => (
          <Reveal key={svc.title} className="card" delay={(i % 4) * 90}>
            <h3 className="card__title">{svc.title}</h3>
            <p className="card__text">{svc.text}</p>
            <p className="card__tag">{svc.tag}</p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
