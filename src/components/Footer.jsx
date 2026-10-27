import { BUSINESS, LEGAL } from '../data/content'
import './Footer.css'

export default function Footer({ onCookieSettings }) {
  // Datele de identificare apar doar dupa ce sunt completate in data/content.js
  const company = [
    LEGAL.company,
    LEGAL.cui && `CUI ${LEGAL.cui}`,
    LEGAL.regCom && `Reg. Com. ${LEGAL.regCom}`,
    LEGAL.euid && `EUID ${LEGAL.euid}`,
  ].filter(Boolean)

  return (
    <footer className="footer">
      <p className="footer__brand">{BUSINESS.full}</p>
      <p className="footer__meta">
        {BUSINESS.address}, Ogrezeni · {BUSINESS.phone} · non-stop
      </p>
      <div className="footer__legal">
        {company.length > 0 && (
          <div className="footer__company">
            <p>{company.join(' · ')}</p>
            {LEGAL.seat && <p>Sediul social: {LEGAL.seat}</p>}
          </div>
        )}
        <nav className="footer__links" aria-label="Informații legale">
          <a href="#politica-cookies">Politica de cookie-uri</a>
          <a href="#confidentialitate">Confidențialitate</a>
          <button type="button" onClick={onCookieSettings}>
            Setări cookie-uri
          </button>
          {LEGAL.anpc && (
            <a href={LEGAL.anpc} target="_blank" rel="noopener">
              ANPC – SAL
            </a>
          )}
        </nav>
      </div>
    </footer>
  )
}
