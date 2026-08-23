import { useEffect, useState } from 'react'
import { BUSINESS, NAV } from '../data/content'
import './Header.css'

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M6.6 10.8a15.5 15.5 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.24 11.4 11.4 0 0 0 3.6.58 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11.4 11.4 0 0 0 .58 3.6 1 1 0 0 1-.24 1z"
        fill="currentColor"
      />
    </svg>
  )
}

export default function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Blocheaza scroll-ul cand meniul mobil e deschis
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header className={`header ${scrolled ? 'is-scrolled' : ''}`}>
      <a href="#top" className="brand" onClick={() => setOpen(false)}>
        <span className="brand__name">Cori&amp;Flo</span>
        <span className="brand__sub">{BUSINESS.tagline}</span>
      </a>

      <button
        className={`nav-toggle ${open ? 'is-open' : ''}`}
        aria-label={open ? 'Închide meniul' : 'Deschide meniul'}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span />
        <span />
        <span />
      </button>

      <nav className={`nav ${open ? 'is-open' : ''}`}>
        {NAV.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="nav__link"
            onClick={() => setOpen(false)}
          >
            {item.label}
          </a>
        ))}
        <a href={BUSINESS.phoneHref} className="btn-call" onClick={() => setOpen(false)}>
          <PhoneIcon />
          Sună 24/7
        </a>
      </nav>
    </header>
  )
}
