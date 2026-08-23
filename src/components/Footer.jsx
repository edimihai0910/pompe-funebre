import { BUSINESS } from '../data/content'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <p className="footer__brand">{BUSINESS.full}</p>
      <p className="footer__meta">
        {BUSINESS.address}, Ogrezeni · {BUSINESS.phone} · non-stop
      </p>
    </footer>
  )
}
