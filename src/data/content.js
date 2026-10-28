// Continut text preluat din designul original Cori&Flo Pompe Funebre Ogrezeni

// Pinul exact al sediului, luat din Google Maps. Linkurile Waze/Google folosesc
// coordonatele (nu cautare dupa text) — altfel "Strada Principala" era confundata
// cu comuna vecina Cosoba.
const COORDS = { lat: 44.4207489, lng: 25.7685759 }
const LL = `${COORDS.lat},${COORDS.lng}`

export const BUSINESS = {
  name: 'Cori&Flo',
  full: 'Cori&Flo Pompe Funebre Ogrezeni',
  tagline: 'Pompe Funebre Ogrezeni',
  phone: '0765 377 740',
  phoneHref: 'tel:+40765377740',
  address: 'Strada Principală 238',
  city: 'Ogrezeni, județul Giurgiu',
  coords: COORDS,
  waze: `https://waze.com/ul?ll=${LL}&navigate=yes`,
  gmaps: `https://www.google.com/maps/search/?api=1&query=${LL}`,
}

// Date de identificare (ca la ANAF / Registrul Comertului), afisate in subsol si in
// politicile legale. Campurile goale nu se afiseaza.
export const LEGAL = {
  company: 'CORI&FLO LOGISTIC S.R.L.',
  seat: 'Str. Pridvorului nr. 7, bl. 5, sc. 3, et. 4, ap. 51',
  cui: '50587751',
  regCom: 'J2024024562001',
  euid: 'ROONRC.J2024024562001',
  anpc: 'https://www.anpc.ro/sal', // ANPC — solutionarea alternativa a litigiilor
  updated: '27 octombrie 2026', // data ultimei actualizari a politicilor
}

export const NAV = [
  { href: '#servicii', label: 'Servicii' },
  { href: '#pachete', label: 'Pachete' },
  { href: '#sicrie', label: 'Sicrie' },
  { href: '#magazin', label: 'Magazin' },
  { href: '#contact', label: 'Contact' },
]

export const ABOUT_STEPS = [
  {
    n: '01',
    title: 'Un singur telefon',
    text: 'Ne spuneți ce s-a întâmplat. Restul îl preluăm noi, pas cu pas.',
  },
  {
    n: '02',
    title: 'Toate actele, rezolvate',
    text: 'Certificat de deces, adeverințe, ajutorul de deces — mergem noi pe drumuri.',
  },
  {
    n: '03',
    title: 'Fără plată în avans',
    text: 'Pachetul se poate acoperi din ajutorul de deces, pe baza talonului de pensie.',
  },
]

export const SERVICES = [
  {
    title: 'Sicrie',
    text: 'Modele din lemn masiv de stejar, fag sau brad, capitonate, cu accesorii metalice. Toate mărimile, inclusiv la comandă.',
    tag: 'stejar · fag · brad · capitonaj la alegere',
  },
  {
    title: 'Cruci',
    text: 'Cruci de lemn simple, vopsite, cu inscripționare completă a numelui și a datelor.',
    tag: 'inscripționare inclusă',
  },
  {
    title: 'Îmbrăcăminte și trusou',
    text: 'Costume, rochii, lenjerie, papuci, prosoape, lumânări și toate cele necesare după obicei, pentru bărbați și femei.',
    tag: 'toate mărimile · trusou complet',
  },
  {
    title: 'Transport funerar',
    text: 'Mașină funerară proprie, curată și discretă. Ridicare de la domiciliu, spital sau morgă, transport în țară.',
    tag: 'non-stop · local și în țară',
  },
  {
    title: 'Coroane și flori',
    text: 'Coroane și aranjamente din flori naturale sau artificiale, pregătite pentru ziua slujbei.',
    tag: 'flori naturale · la comandă',
  },
  {
    title: 'Acte și formalități',
    text: 'Certificat de deces, adeverință de înhumare, dosarul pentru ajutorul de deces, programarea slujbei cu preotul.',
    tag: 'ne ocupăm noi de tot',
  },
  {
    title: 'Pregătirea defunctului',
    text: 'Spălare, îmbrăcare, cosmetizare și tanatopraxie, realizate cu respect deplin față de cel plecat.',
    tag: 'personal cu experiență',
  },
]

export const PACKAGES = [
  {
    name: 'Pachet Simplu',
    desc: 'Tot ce trebuie pentru o slujbă demnă, fără nimic în plus.',
    items: [
      'Sicriu din brad, capitonat',
      'Cruce de lemn cu inscripționare',
      'Trusou și îmbrăcăminte',
      'Transport local cu mașina funerară',
      'Acte și ajutor de deces',
    ],
    featured: false,
  },
  {
    name: 'Pachet Complet',
    desc: 'Ne ocupăm de absolut tot, de la ridicare până la pomană.',
    items: [
      'Sicriu din fag sau stejar',
      'Cruce și coroane',
      'Trusou complet, lumânări, prosoape',
      'Pregătirea și cosmetizarea defunctului',
      'Transport, acte, programare slujbă',
    ],
    featured: true,
    badge: 'Cel mai ales',
  },
  {
    name: 'Pachet la alegere',
    desc: 'Alegeți doar ce aveți nevoie. Vă spunem sincer ce se poate lăsa deoparte.',
    items: [
      'Orice sicriu din expoziție',
      'Servicii separate, la bucată',
      'Transport în altă localitate',
      'Repatriere și incinerare',
      'Consiliere gratuită la telefon',
    ],
    featured: false,
  },
]

// Pachetele de pomana (meniuri). `img` = numele fotografiei pregatite in src/images/web
// (vezi scripts/prepare-images.mjs si data/media.js) — la fel in toate listele de mai jos.
export const MENUS = [
  {
    img: 'meniu-standard',
    name: 'Pachet standard dulce',
    price: '65 lei',
    alt: 'Pachet standard dulce, 65 lei: orez cu lapte, colivă, prăjitură, fruct, colăcel, apă, suc la doză, bere 330 ml, iconiță și conservă',
  },
  {
    img: 'meniu-post',
    name: 'Pachet de post',
    price: '70 lei',
    alt: 'Pachet standard de post, 70 lei: orez cu ciuperci sau cu prune, colivă, prăjitură de post, fruct, colăcel, apă, suc la doză, bere 330 ml, iconiță și conservă de post',
  },
]

// Zonele din portofoliu (ancorele din bara de sub titlu)
export const ZONES = [
  { id: 'sicrie', label: 'Sicrie' },
  { id: 'coroane', label: 'Coroane' },
  { id: 'masina', label: 'Mașina funerară' },
  { id: 'magazin', label: 'Magazin' },
]

// Galeria de sicrie: fiecare fotografie arata acelasi model din trei unghiuri.
// `corners` e forma (4, 6 sau 8 colturi) — numarul de modele difera de la o forma la alta.
export const COFFINS = [
  {
    corners: 4,
    img: 'sicriu-4-colturi-1',
    note: 'Maro deschis, cu frunze în relief și mânere aurii',
  },
  {
    corners: 4,
    img: 'sicriu-4-colturi-2',
    note: 'Capac negru lucios, cu frunze de stejar în relief și mânere aurii',
  },
  {
    corners: 6,
    img: 'sicriu-6-colturi-1',
    note: 'Maro, cu ornamente florale în relief și mânere aurii',
  },
  {
    corners: 6,
    img: 'sicriu-6-colturi-2',
    note: 'Lemn lăcuit în nuanțe calde, cu cruce pe capac',
  },
  {
    corners: 6,
    img: 'sicriu-6-colturi-3',
    note: 'Lemn natur lăcuit, cu cruce pe capac',
  },
  {
    corners: 8,
    img: 'sicriu-8-colturi-1',
    note: 'Vișiniu lucios, cu crucifix auriu și volan auriu cu dantelă',
  },
  {
    corners: 8,
    img: 'sicriu-8-colturi-2',
    note: 'Vișiniu lucios, cu interior capitonat în satin auriu și pernă',
  },
]

export const WREATHS = [
  { img: 'coroana-albastra', title: 'Coroană albastră cu alb' },
  { img: 'coroana-rosie', title: 'Coroană roșie cu alb' },
  { img: 'coroana-visinie', title: 'Coroană vișinie cu alb' },
  { img: 'coroana-lila', title: 'Coroană lila cu crem' },
  { img: 'coroana-mov', title: 'Coroană mov cu crem' },
].map((w) => ({ ...w, alt: `${w.title}, pe suport` }))

// `pos` = ce parte din fotografie ramane in cadru cand e taiata pe lat
export const HEARSE = [
  {
    img: 'masina-1',
    title: 'Compartimentul funerar',
    alt: 'Mașina funerară Cori&Flo, cu hayonul ridicat și compartimentul luminat',
    pos: '50% 62%',
  },
  {
    img: 'masina-2',
    title: 'Pregătită de drum',
    alt: 'Mașina funerară Cori&Flo văzută din lateral, cu trei coroane așezate pe geam',
    pos: '50% 56%',
  },
]

export const SHOP = [
  {
    img: 'magazin-lumanari',
    title: 'Lumânări și candele',
    alt: 'Raft cu candele, lumânări de altar și felinare',
  },
  {
    img: 'magazin-prosoape',
    title: 'Prosoape',
    alt: 'Raft cu prosoape albe și crem, cu modele aurii și gri',
  },
  {
    img: 'magazin-vesela',
    title: 'Veselă pentru pomană',
    alt: 'Raft cu farfurii, căni, pahare și boluri',
  },
  {
    img: 'magazin-baticuri',
    title: 'Baticuri',
    alt: 'Stativ cu baticuri: florale, cu buline, negre cu bordură și din dantelă neagră',
    wide: true,
    pos: '46% 20%',
  },
]
