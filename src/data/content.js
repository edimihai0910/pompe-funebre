// Continut text preluat din designul original Cori&Flo Pompe Funebre Ogrezeni

export const BUSINESS = {
  name: 'Cori&Flo',
  full: 'Cori&Flo Pompe Funebre Ogrezeni',
  tagline: 'Pompe Funebre Ogrezeni',
  phone: '0765 377 740',
  phoneHref: 'tel:+40765377740',
  address: 'Strada Principală 238',
  city: 'Ogrezeni, județul Giurgiu',
  // Coordonate reale (OpenStreetMap) — Strada Principală, Ogrezeni, Giurgiu
  coords: { lat: 44.4027838, lng: 25.7800284 },
  // Coordonate exacte in loc de cautare dupa text — Waze/Google confundau
  // "Strada Principala" cu comuna vecina Cosoba. ll = pin fix pe Ogrezeni.
  waze: 'https://waze.com/ul?ll=44.4027838,25.7800284&navigate=yes',
  gmaps: 'https://www.google.com/maps/search/?api=1&query=44.4027838,25.7800284',
}

export const NAV = [
  { href: '#servicii', label: 'Servicii' },
  { href: '#pachete', label: 'Pachete' },
  { href: '#portofoliu', label: 'Portofoliu' },
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
    title: 'Cruci și troițe',
    text: 'Cruci de lemn simple sau sculptate, vopsite, cu inscripționare completă a numelui și a datelor.',
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
    text: 'Coroane, jerbe și aranjamente din flori naturale sau artificiale, pregătite pentru ziua slujbei.',
    tag: 'flori naturale · la comandă',
  },
  {
    title: 'Acte și formalități',
    text: 'Certificat de deces, adeverință de înhumare, dosarul pentru ajutorul de deces, programarea slujbei cu preotul.',
    tag: 'ne ocupăm noi de tot',
  },
  {
    title: 'Capelă și veghe',
    text: 'Amenajare pentru veghe la domiciliu sau la capelă: catafalc, sfeșnice, draperii, scaune, sonorizare.',
    tag: 'amenajare completă',
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
    price: 'de la 1590 lei',
    featured: false,
  },
  {
    name: 'Pachet Complet',
    desc: 'Ne ocupăm de absolut tot, de la ridicare până la pomană.',
    items: [
      'Sicriu din fag sau stejar',
      'Cruce, coroane și jerbe',
      'Trusou complet, lumânări, prosoape',
      'Pregătirea și cosmetizarea defunctului',
      'Amenajare capelă și sonorizare',
      'Transport, acte, programare slujbă',
    ],
    price: 'de la 2990 lei',
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
    price: 'preț la cerere',
    featured: false,
  },
]

// Cheile de imagine corespund ilustratiilor din components/Illustrations.jsx
export const PORTFOLIO = [
  { key: 'hearse', title: 'Mașina funerară' },
  { key: 'coffins', title: 'Sicrie din expoziție' },
  { key: 'crosses', title: 'Cruci și troițe' },
  { key: 'wreaths', title: 'Coroane și jerbe' },
  { key: 'chapel', title: 'Capelă amenajată' },
  { key: 'trousseau', title: 'Trusou și îmbrăcăminte' },
]
