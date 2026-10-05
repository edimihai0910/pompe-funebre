import { BUSINESS, LEGAL } from '../data/content'
import './Footer.css'

export default function Footer({ onCookieSettings }) {
  // Datele de identificare apar doar dupa ce sunt completate in data/content.js
  const company = [
    LEGAL.company,
    LEGAL.cui && `CUI ${LEGAL.cui}`,
    LEGAL.regCom && `Reg. Com. ${LEGAL.regCom}`,
  ].filter(Boolean)

  return (
    <footer className="footer">
      <p className="footer__brand">{BUSINESS.full}</p>
      <p className="footer__meta">
        {BUSINESS.address}, Ogrezeni · {BUSINESS.phone} · non-stop
      </p>
      <div className="footer__legal">
        {company.length > 0 && <p className="footer__company">{company.join(' · ')}</p>}
        <nav className="footer__links" aria-label="Informații legale">
          <a href="#politica-cookies">Politica de cookie-uri</a>
          <a href="#confidentialitate">Confidențialitate</a>
          <button type="button" onClick={onCookieSettings}>
            Setări cookie-uri
          </button>
        </nav>
      </div>
    </footer>
  )
}
