import Reveal from './Reveal'
import { ABOUT_STEPS } from '../data/content'
import './Sections.css'

export default function About() {
  return (
    <section className="section about">
      <Reveal>
        <p className="eyebrow">Despre noi</p>
        <h2 className="about__title">
          Grijă, respect și liniște, de la primul telefon până la ultima floare
        </h2>
        <p className="about__p">
          O pierdere nu se pregătește. De aceea răspundem la telefon la orice oră și venim la
          dumneavoastră în cel mai scurt timp. Preluăm toate formalitățile: actele de deces,
          certificatul, transportul, capela, sicriul, crucea, îmbrăcămintea, coroanele și pomenile.
          Nimic nu rămâne pe umerii familiei.
        </p>
        <p className="about__p">
          Suntem o firmă din Ogrezeni, alături de oamenii din comună și din satele vecine. Explicăm
          fiecare pas pe înțelesul tuturor, fără grabă și fără costuri ascunse.
        </p>
      </Reveal>

      <div className="about__steps">
        {ABOUT_STEPS.map((s, i) => (
          <Reveal key={s.n} className="step" delay={120 + i * 120}>
            <span className="step__n">{s.n}</span>
            <div>
              <p className="step__title">{s.title}</p>
              <p className="step__text">{s.text}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
