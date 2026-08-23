import Reveal from './Reveal'
import MapView from './MapView'
import { BUSINESS } from '../data/content'
import './Contact.css'

export default function Contact() {
  return (
    <section id="contact" className="section contact">
      <Reveal>
        <p className="eyebrow">Contact</p>
        <h2 className="h2">Suntem aproape, la orice oră</h2>

        <div className="contact__info">
          <div>
            <p className="contact__label">Adresă</p>
            <p className="contact__addr">
              {BUSINESS.address}
              <br />
              {BUSINESS.city}
            </p>
          </div>
          <div>
            <p className="contact__label">Telefon</p>
            <a href={BUSINESS.phoneHref} className="contact__phone">
              {BUSINESS.phone}
            </a>
            <p className="contact__note">Apăsați numărul pentru a suna direct.</p>
          </div>
          <div>
            <p className="contact__label">Program</p>
            <p className="contact__hours">
              Non-stop, 24 de ore din 24, inclusiv sâmbătă, duminică și în sărbători.
            </p>
          </div>
        </div>

        <div className="contact__actions">
          <a href={BUSINESS.phoneHref} className="pill pill--solid">
            Sună acum
          </a>
          <a href={BUSINESS.waze} target="_blank" rel="noopener" className="pill pill--outline">
            Deschide în Waze
          </a>
          <a href={BUSINESS.gmaps} target="_blank" rel="noopener" className="pill pill--outline">
            Google Maps
          </a>
        </div>
      </Reveal>

      <Reveal delay={140}>
        <MapView />
      </Reveal>
    </section>
  )
}
