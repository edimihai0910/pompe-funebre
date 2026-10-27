import { useRef, useState } from 'react'
import { BUSINESS } from '../data/content'
import { HeroScene } from './Illustrations'
import CandleFlame from './CandleFlame'
import Birds from './Birds'
import LightMotes from './LightMotes'
import './Hero.css'

export default function Hero() {
  const heroRef = useRef(null)
  const [hovering, setHovering] = useState(false)

  // Glow cald care urmareste cursorul (efect la hover, in tema)
  const handleMove = (e) => {
    const el = heroRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    el.style.setProperty('--mx', `${x}%`)
    el.style.setProperty('--my', `${y}%`)
  }

  return (
    <section
      id="top"
      ref={heroRef}
      className={`hero ${hovering ? 'is-hovering' : ''}`}
      onMouseMove={handleMove}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <div className="hero__kenburns">
        <HeroScene />
      </div>

      {/* Pasari care plutesc in zare, pe langa biserica */}
      <Birds />

      <div className="hero__scrim" />
      <div className="hero__spotlight" />

      {/* Luminite calde care plutesc si urca din flacara (Three.js) */}
      <LightMotes variant="hero" anchor=".flame" />

      {/* Lumanare cu flacara in prim-plan */}
      <CandleFlame />

      <div className="hero__content">
        <div className="hero__block--eyebrow">
          <p className="hero__eyebrow">Non-stop · Ogrezeni, Giurgiu</p>
          <h1 className="hero__title">Cori&amp;Flo Pompe Funebre Ogrezeni</h1>
        </div>
        <p className="hero__lead">
          Vă stăm alături în cea mai grea zi. Ne ocupăm de tot, cu grijă și discreție, ca
          dumneavoastră să aveți timp pentru familie.
        </p>
        <div className="hero__cta">
          <a href={BUSINESS.phoneHref} className="btn btn--light">
            {BUSINESS.phone}
          </a>
          <a href="#servicii" className="btn btn--ghost">
            Vezi serviciile
          </a>
        </div>
      </div>
    </section>
  )
}
