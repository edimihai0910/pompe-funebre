import { useEffect, useRef } from 'react'
import { BUSINESS, LEGAL } from '../data/content'
import './Legal.css'

const OSM_PRIVACY = 'https://osmfoundation.org/wiki/Privacy_Policy'

function Operator() {
  return (
    <p>
      <strong>{LEGAL.company || BUSINESS.full}</strong>
      {LEGAL.seat && (
        <>
          <br />
          Sediul social: {LEGAL.seat}
        </>
      )}
      <br />
      {LEGAL.seat ? 'Punct de lucru: ' : ''}
      {BUSINESS.address}, {BUSINESS.city}
      {LEGAL.cui && (
        <>
          <br />
          CUI {LEGAL.cui}
        </>
      )}
      {LEGAL.regCom && (
        <>
          <br />
          Nr. Registrul Comerțului {LEGAL.regCom}
        </>
      )}
      {LEGAL.euid && (
        <>
          <br />
          EUID {LEGAL.euid}
        </>
      )}
      <br />
      Telefon: <a href={BUSINESS.phoneHref}>{BUSINESS.phone}</a>
      {LEGAL.email && (
        <>
          <br />
          E-mail: <a href={`mailto:${LEGAL.email}`}>{LEGAL.email}</a>
        </>
      )}
    </p>
  )
}

function CookiePolicy() {
  return (
    <>
      <h2 id="legal-title">Politica de cookie-uri</h2>
      <p className="legal__date">Ultima actualizare: {LEGAL.updated}</p>

      <h3>Pe scurt</h3>
      <p>
        Site-ul {BUSINESS.full} nu folosește cookie-uri de publicitate, de analiză a traficului sau
        de rețele sociale și nu vă urmărește de la o vizită la alta. Pe dispozitivul dumneavoastră
        se păstrează o singură înregistrare, strict necesară: alegerea privind afișarea hărții.
      </p>

      <h3>Ce sunt cookie-urile</h3>
      <p>
        Cookie-urile și tehnologiile asemănătoare (cum este „stocarea locală” a browserului) sunt
        mici înregistrări pe care un site le salvează pe telefonul sau pe calculatorul
        dumneavoastră.
      </p>

      <h3>Ce păstrăm pe dispozitivul dumneavoastră</h3>
      <dl className="legal__record">
        <dt>Denumire</dt>
        <dd>cf-consent</dd>
        <dt>Tip</dt>
        <dd>Stocare locală, strict necesară</dd>
        <dt>Rol</dt>
        <dd>
          Reține dacă ați acceptat sau ați refuzat încărcarea hărții, ca să nu vă întrebăm la
          fiecare vizită.
        </dd>
        <dt>Durată</dt>
        <dd>12 luni sau până o ștergeți din browser</dd>
      </dl>
      <p>
        Fiind strict necesară pentru funcționarea site-ului, această înregistrare nu are nevoie de
        acord (art. 4 alin. (6) din Legea nr. 506/2004). Pentru orice altceva vă cerem acordul
        înainte, potrivit art. 4 alin. (5) din aceeași lege.
      </p>

      <h3>Conținut de la terți</h3>
      <ul>
        <li>
          <strong>Harta (OpenStreetMap).</strong> Se încarcă numai după ce apăsați „Accept” sau
          „Afișează harta”. Din acel moment, browserul dumneavoastră se conectează la serverele
          OpenStreetMap, care primesc adresa IP și date tehnice despre browser. Detalii în{' '}
          <a href={OSM_PRIVACY} target="_blank" rel="noopener">
            politica de confidențialitate OpenStreetMap
          </a>
          .
        </li>
        <li>
          <strong>Waze, Google Maps și ANPC.</strong> Butoanele din secțiunea Contact și
          legătura ANPC din subsol sunt simple legături. Nu se transmite nimic către aceste
          servicii până nu apăsați pe ele; după aceea se aplică politicile lor.
        </li>
        <li>
          <strong>Fonturi, imagini și efecte.</strong> Sunt găzduite pe acest site, nu sunt
          preluate de la terți.
        </li>
      </ul>

      <h3>Cum vă schimbați alegerea</h3>
      <p>
        Oricând, din „Setări cookie-uri”, în subsolul paginii. Puteți, de asemenea, să ștergeți
        datele salvate de site din setările browserului.
      </p>

      <p>
        Vedeți și <a href="#confidentialitate">Politica de confidențialitate</a>.
      </p>
    </>
  )
}

function PrivacyPolicy() {
  return (
    <>
      <h2 id="legal-title">Politica de confidențialitate</h2>
      <p className="legal__date">Ultima actualizare: {LEGAL.updated}</p>

      <h3>Cine răspunde de datele dumneavoastră</h3>
      <Operator />

      <h3>Ce date prelucrăm prin site</h3>
      <p>
        Site-ul este unul de prezentare: nu are formulare, conturi sau plăți online și nu adună
        date despre dumneavoastră pentru publicitate ori statistici.
      </p>
      <ul>
        <li>
          <strong>Date tehnice de acces.</strong> Ca la orice site, serverul pe care este găzduit
          primește adresa IP și date tehnice ale browserului, pentru a putea afișa pagina și
          pentru securitate (interes legitim – art. 6 alin. (1) lit. f) din Regulamentul (UE)
          2016/679, „GDPR”).
        </li>
        <li>
          <strong>Harta.</strong> Dacă acceptați afișarea ei, adresa IP ajunge la OpenStreetMap
          (OpenStreetMap Foundation, Regatul Unit). Temeiul este consimțământul dumneavoastră
          (art. 6 alin. (1) lit. a) GDPR), pe care îl puteți retrage oricând din „Setări
          cookie-uri”.
        </li>
        <li>
          <strong>Locația dumneavoastră.</strong> Doar dacă apăsați „Arată unde sunt eu” și
          permiteți accesul în browser. Locația este folosită numai pe dispozitivul dumneavoastră,
          pentru a calcula distanța până la sediu; nu ajunge la noi și nu este salvată.
        </li>
        <li>
          <strong>Alegerea privind harta.</strong> Se păstrează pe dispozitivul dumneavoastră –
          vedeți <a href="#politica-cookies">Politica de cookie-uri</a>.
        </li>
      </ul>

      <h3>Când ne sunați</h3>
      <p>
        Folosim numărul de telefon și informațiile pe care ni le dați doar pentru a vă răspunde și
        pentru a organiza serviciile cerute (art. 6 alin. (1) lit. b) GDPR). Informarea completă
        privind datele necesare pentru contract și pentru acte o primiți la încheierea
        contractului.
      </p>

      <h3>Cui transmitem datele</h3>
      <p>
        Nu vindem date și nu le transmitem în scopuri de marketing. La datele tehnice de mai sus
        au acces furnizorul de găzduire a site-ului și, dacă ați acceptat harta, OpenStreetMap.
      </p>

      <h3>Drepturile dumneavoastră</h3>
      <p>
        Aveți dreptul de acces la date, de rectificare, de ștergere, de restricționare a
        prelucrării, de opoziție și de portabilitate, precum și dreptul de a vă retrage
        consimțământul. Pentru oricare dintre ele, ne puteți contacta la datele de mai sus.
      </p>
      <p>
        Dacă socotiți că datele v-au fost prelucrate nelegal, puteți depune plângere la
        Autoritatea Națională de Supraveghere a Prelucrării Datelor cu Caracter Personal
        (ANSPDCP), B-dul G-ral Gheorghe Magheru nr. 28-30, sector 1, București,{' '}
        <a href="https://www.dataprotection.ro" target="_blank" rel="noopener">
          www.dataprotection.ro
        </a>
        .
      </p>
    </>
  )
}

const DOCS = { cookies: CookiePolicy, privacy: PrivacyPolicy }

/** Fereastra cu politicile legale; `doc` = 'cookies' | 'privacy' | null (inchisa). */
export default function Legal({ doc, onClose }) {
  const ref = useRef(null)
  const Doc = DOCS[doc]

  useEffect(() => {
    const dialog = ref.current
    if (doc && !dialog.open) dialog.showModal()
    if (!doc && dialog.open) dialog.close()
  }, [doc])

  return (
    <dialog
      ref={ref}
      className="legal"
      aria-labelledby="legal-title"
      onClose={onClose}
      // click pe fundalul intunecat (in afara continutului) inchide fereastra
      onClick={(e) => e.target === ref.current && onClose()}
    >
      {Doc && (
        // `key` reporneste derularea de sus la trecerea de la o politica la alta
        <div className="legal__body" key={doc}>
          <button type="button" className="legal__close" aria-label="Închide" onClick={onClose}>
            ×
          </button>
          <Doc />
        </div>
      )}
    </dialog>
  )
}
