import Reveal from './Reveal'
import CoffinGallery from './CoffinGallery'
import PhotoTiles from './PhotoTiles'
import { HEARSE, SHOP, WREATHS, ZONES } from '../data/content'
import './Gallery.css'
import './Portfolio.css'

function Zone({ id, title, text, children }) {
  return (
    <div className="zone" id={id}>
      <Reveal className="zone__head">
        <h3 className="zone__title">{title}</h3>
        <p className="zone__text">{text}</p>
      </Reveal>
      <Reveal delay={120}>{children}</Reveal>
    </div>
  )
}

export default function Portfolio() {
  return (
    <section id="portofoliu" className="section section--alt">
      <Reveal className="portfolio__head">
        <p className="eyebrow">Portofoliu</p>
        <h2 className="h2">Sicriele, coroanele, mașina și magazinul nostru</h2>
        <p className="lead portfolio__intro">
          Câteva dintre modelele și produsele pe care le găsiți la noi. Apăsați pe orice fotografie
          ca să o vedeți mărită.
        </p>
        <nav className="portfolio__nav" aria-label="Zonele portofoliului">
          {ZONES.map((z) => (
            <a key={z.id} href={`#${z.id}`} className="portfolio__chip">
              {z.label}
            </a>
          ))}
        </nav>
      </Reveal>

      <Zone
        id="sicrie"
        title="Sicrie"
        text="Trei forme — cu 4, 6 și 8 colțuri — fiecare în mai multe modele. Fiecare fotografie arată același sicriu din trei unghiuri."
      >
        <CoffinGallery />
      </Zone>

      <Zone
        id="coroane"
        title="Coroane"
        text="Coroane în mai multe culori, pregătite pentru ziua slujbei."
      >
        <PhotoTiles
          items={WREATHS}
          variant="wreaths"
          sizes="(max-width: 860px) 56vw, 19vw"
          captions={false}
          hint="Glisați spre stânga pentru toate coroanele"
        />
      </Zone>

      <Zone
        id="masina"
        title="Mașina funerară"
        text="Mașină funerară proprie, curată și discretă, pentru transport local și în țară."
      >
        <PhotoTiles
          items={HEARSE}
          variant="hearse"
          sizes="(max-width: 560px) 92vw, 46vw"
        />
      </Zone>

      <Zone
        id="magazin"
        title="Magazin"
        text="Lumânări, candele, prosoape, baticuri și veselă pentru pomană."
      >
        <PhotoTiles
          items={SHOP}
          variant="shop"
          sizes="(max-width: 560px) 46vw, (max-width: 960px) 30vw, 20vw"
          wideSizes="(max-width: 560px) 80vw, (max-width: 960px) 92vw, 38vw"
        />
      </Zone>
    </section>
  )
}
