import Reveal from './Reveal'
import MenuPacks from './MenuPacks'
import { PACKAGES } from '../data/content'
import './Sections.css'

export default function Packages() {
  return (
    <section id="pachete" className="section">
      <Reveal className="pack-head">
        <div>
          <p className="eyebrow">Pachete</p>
          <h2 className="h2">Pe baza talonului de pensie</h2>
        </div>
        <p className="pack-head__note">
          Cu talonul de pensie și actele defunctului întocmim dosarul de ajutor de deces, iar
          pachetul poate fi acoperit integral din acesta. Nu cereți bani de la nimeni în ziua aceea.
        </p>
      </Reveal>

      <div className="packs">
        {PACKAGES.map((p, i) => (
          <Reveal
            key={p.name}
            className={`pack ${p.featured ? 'pack--featured' : ''}`}
            delay={i * 120}
          >
            {p.badge && <span className="pack__badge">{p.badge}</span>}
            <h3 className="pack__name">{p.name}</h3>
            <p className="pack__desc">{p.desc}</p>
            <ul className="pack__list">
              {p.items.map((it) => (
                <li key={it}>{it}</li>
              ))}
            </ul>
            <p className="pack__price">{p.price}</p>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <p className="pack__foot">
          Aduceți la noi doar actul de identitate al defunctului, talonul de pensie și certificatul
          de naștere sau de căsătorie. Dacă nu le găsiți acum, vă ajutăm să le obțineți.
        </p>
      </Reveal>

      <MenuPacks />
    </section>
  )
}
