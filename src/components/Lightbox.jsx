import { useLayoutEffect, useRef } from 'react'
import { photo } from '../data/media'
import { useSwipe } from '../hooks/useSwipe'
import { Arrow } from './Icons'
import './Lightbox.css'

// pe telefon, o fotografie care se plimba e mai lata decat ecranul
const PAN_SIZES = '(max-width: 720px) and (orientation: portrait) 780px, 100vw'

/**
 * Lightbox — fotografia marita, pe toata fereastra. `index` = pozitia in `items`
 * sau null (inchis). Se rasfoieste cu sagetile, cu tastele stanga/dreapta ori prin
 * glisare; Esc sau un click pe fundal o inchide.
 *
 * Fotografiile cu `pan` (late, cu mai multe vederi) umplu pe telefon inaltimea ecranului
 * si se plimba cu degetul stanga-dreapta, in loc sa fie micsorate cat latimea lui.
 */
export default function Lightbox({ items, index, onIndex, onClose }) {
  const ref = useRef(null)
  const mediaRef = useRef(null)
  const open = index !== null
  const item = open ? items[index] : null
  const many = items.length > 1

  useLayoutEffect(() => {
    const dialog = ref.current
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()

    // o fotografie care se plimba porneste de la mijloc
    const media = mediaRef.current
    if (media) media.scrollLeft = (media.scrollWidth - media.clientWidth) / 2
  }, [open, index])

  const step = (d) => onIndex((index + d + items.length) % items.length)
  // cat timp fotografia se plimba, glisarea ii apartine ei; raman sagetile
  const panning = () => mediaRef.current.scrollWidth > mediaRef.current.clientWidth
  const swipe = useSwipe(
    () => many && !panning() && step(-1),
    () => many && !panning() && step(1),
  )

  const onKeyDown = (e) => {
    if (!many) return
    if (e.key === 'ArrowLeft') step(-1)
    if (e.key === 'ArrowRight') step(1)
  }

  return (
    <dialog
      ref={ref}
      className="lightbox"
      aria-label="Fotografie mărită"
      onClose={onClose}
      onKeyDown={onKeyDown}
      // orice click in afara fotografiei si a butoanelor inchide
      onClick={(e) => !e.target.closest('img, button') && onClose()}
    >
      {item && (
        <div className="lightbox__body" {...swipe}>
          <button type="button" className="lightbox__close" aria-label="Închide" onClick={onClose}>
            ×
          </button>

          <div
            ref={mediaRef}
            className={`lightbox__media ${item.pan ? 'lightbox__media--pan' : ''}`}
          >
            <img
              // `key` reporneste aparitia lina la fiecare fotografie
              key={item.img}
              className={`lightbox__img ${item.cutout ? 'lightbox__img--cutout' : ''}`}
              src={photo(item.img).src}
              srcSet={photo(item.img).srcSet}
              sizes={item.pan ? PAN_SIZES : '100vw'}
              alt={item.alt}
              draggable={false}
            />
          </div>

          <div className="lightbox__caption">
            <p className="lightbox__title">{item.title}</p>
            {item.note && <p className="lightbox__note">{item.note}</p>}
            {item.pan && (
              <p className="lightbox__hint">Glisați fotografia pentru celelalte unghiuri</p>
            )}
            {many && (
              <p className="lightbox__count">
                {index + 1} / {items.length}
              </p>
            )}
          </div>

          {many && (
            <>
              <button
                type="button"
                className="round-arrow round-arrow--prev"
                aria-label="Fotografia anterioară"
                onClick={() => step(-1)}
              >
                <Arrow dir="prev" />
              </button>
              <button
                type="button"
                className="round-arrow round-arrow--next"
                aria-label="Fotografia următoare"
                onClick={() => step(1)}
              >
                <Arrow dir="next" />
              </button>
            </>
          )}
        </div>
      )}
    </dialog>
  )
}
