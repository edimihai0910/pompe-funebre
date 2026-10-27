import { useState } from 'react'
import Reveal from './Reveal'
import Lightbox from './Lightbox'
import { BUSINESS, MENUS } from '../data/content'
import { photo } from '../data/media'
import './Gallery.css'
import './MenuPacks.css'

const ITEMS = MENUS.map((m) => ({ ...m, title: `${m.name} — ${m.price}`, cutout: true }))

/** MenuPacks — pachetele de pomana (standard si de post), pe aceeasi scena ca sicriele. */
export default function MenuPacks() {
  const [zoom, setZoom] = useState(null)

  return (
    <div className="zone menus" id="pomana">
      <Reveal className="zone__head">
        <h3 className="zone__title">Pachete pentru pomană</h3>
        <p className="zone__text">
          Pregătim pachete gata de împărțit, în două variante: dulce și de post. Apăsați pe un
          meniu ca să îl vedeți mărit.
        </p>
      </Reveal>

      <Reveal className="frame" delay={120}>
        <div className="stage menus__stage">
          <ul className="menus__list">
            {ITEMS.map((m, i) => (
              <li key={m.img}>
                <button
                  type="button"
                  className="cutout menus__scroll"
                  aria-label={`${m.alt} — mărește meniul`}
                  onClick={() => setZoom(i)}
                >
                  <img
                    src={photo(m.img).src}
                    srcSet={photo(m.img).srcSet}
                    sizes="(max-width: 560px) 86vw, (max-width: 960px) 42vw, 380px"
                    alt=""
                    loading="lazy"
                    draggable={false}
                  />
                </button>
              </li>
            ))}
          </ul>

          <div className="menus__panel">
            <dl className="menus__prices">
              {MENUS.map((m) => (
                <div key={m.img}>
                  <dt>{m.name}</dt>
                  <dd>{m.price}</dd>
                </div>
              ))}
            </dl>
            <p className="menus__text">
              Prețul este pe pachet. Spuneți-ne la telefon câte pachete vă trebuie și pentru ce zi.
            </p>
            <a href={BUSINESS.phoneHref} className="menus__call">
              Sună {BUSINESS.phone}
            </a>
          </div>
        </div>
      </Reveal>

      <Lightbox items={ITEMS} index={zoom} onIndex={setZoom} onClose={() => setZoom(null)} />
    </div>
  )
}
