import { useState } from 'react'
import { photo } from '../data/media'
import { Expand } from './Icons'
import Lightbox from './Lightbox'
import './Gallery.css'

/**
 * PhotoTiles — un tablou cu fotografii; un click pe oricare o deschide marita.
 * `variant` alege asezarea (wreaths | hearse | shop, vezi Gallery.css),
 * `sizes` / `wideSizes` spun browserului cat de lata e o placa, `captions` afiseaza titlurile,
 * iar `hint` e indemnul afisat pe ecrane mici, unde placile se deruleaza lateral.
 */
export default function PhotoTiles({
  items,
  variant,
  sizes,
  wideSizes = sizes,
  captions = true,
  hint,
}) {
  const [zoom, setZoom] = useState(null)

  return (
    <div className="frame">
      <ul className={`tiles tiles--${variant}`}>
        {items.map((item, i) => {
          const { src, srcSet } = photo(item.img)
          return (
            <li key={item.img} className={`tiles__item ${item.wide ? 'tiles__item--wide' : ''}`}>
              <button
                type="button"
                className="tile"
                aria-label={`${item.alt} — mărește fotografia`}
                onClick={() => setZoom(i)}
              >
                <img
                  src={src}
                  srcSet={srcSet}
                  sizes={item.wide ? wideSizes : sizes}
                  alt=""
                  loading="lazy"
                  draggable={false}
                  style={item.pos && { objectPosition: item.pos }}
                />
                <span className="tile__zoom">
                  <Expand />
                </span>
              </button>
              {captions && <p className="tile__cap">{item.title}</p>}
            </li>
          )
        })}
      </ul>
      {hint && <p className="tiles__hint">{hint}</p>}

      <Lightbox items={items} index={zoom} onIndex={setZoom} onClose={() => setZoom(null)} />
    </div>
  )
}
