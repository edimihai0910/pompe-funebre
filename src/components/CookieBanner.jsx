import { useEffect, useState } from 'react'
import { setConsent, useConsent } from '../hooks/useConsent'
import './CookieBanner.css'

/**
 * Nota de informare + acord pentru continutul extern (harta).
 * La prima vizita apare abia dupa ce vizitatorul trece de hero, ca sa nu
 * acopere butonul de telefon; pana la acord nu se incarca nimic extern.
 * `open` o redeschide din subsol („Setări cookie-uri”).
 */
export default function CookieBanner({ open, onClose }) {
  const consent = useConsent()
  const [pastHero, setPastHero] = useState(false)

  useEffect(() => {
    if (consent || pastHero) return
    const onScroll = () => {
      if (window.scrollY > window.innerHeight * 0.5) setPastHero(true)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [consent, pastHero])

  if (!open && (consent || !pastHero)) return null

  const choose = (external) => () => {
    setConsent(external)
    onClose()
  }

  return (
    <aside className="cookie" role="dialog" aria-labelledby="cookie-title" aria-describedby="cookie-text">
      <h2 id="cookie-title" className="cookie__title">
        Cookie-uri și conținut extern
      </h2>
      <p id="cookie-text" className="cookie__text">
        Site-ul nu folosește cookie-uri de publicitate sau de analiză. Harta din secțiunea Contact
        vine de la un serviciu extern (OpenStreetMap) și se încarcă doar cu acordul dumneavoastră.{' '}
        <a href="#politica-cookies">Politica de cookie-uri</a>
      </p>
      {consent && (
        <p className="cookie__state">
          Alegerea actuală: harta este {consent.external ? 'activată' : 'dezactivată'}.
        </p>
      )}
      <div className="cookie__actions">
        <button type="button" className="cookie__btn" onClick={choose(false)}>
          Refuz
        </button>
        <button type="button" className="cookie__btn" onClick={choose(true)}>
          Accept
        </button>
      </div>
      {consent && (
        <button type="button" className="cookie__close" aria-label="Închide" onClick={onClose}>
          ×
        </button>
      )}
    </aside>
  )
}
