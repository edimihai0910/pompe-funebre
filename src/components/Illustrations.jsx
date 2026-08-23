/* ===========================================================
   Ilustratii SVG sobre, in paleta site-ului.
   Inlocuiesc fotografiile (in designul original erau doar
   placeholdere). Pot fi schimbate ulterior cu poze reale.
   =========================================================== */

/* --- HERO: zori linistiti peste o capela de tara cu cruce --- */
export function HeroScene({ className = '', style = {} }) {
  return (
    <svg
      className={className}
      style={style}
      viewBox="0 0 1600 900"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      role="img"
    >
      <defs>
        <linearGradient id="heroSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4a3d30" />
          <stop offset="38%" stopColor="#6b5540" />
          <stop offset="66%" stopColor="#a07b4f" />
          <stop offset="100%" stopColor="#d8b483" />
        </linearGradient>
        <radialGradient id="heroSun" cx="50%" cy="82%" r="55%">
          <stop offset="0%" stopColor="#f6dca6" stopOpacity="0.95" />
          <stop offset="35%" stopColor="#e9c07d" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#e9c07d" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="heroHill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3b2f24" />
          <stop offset="100%" stopColor="#2a2119" />
        </linearGradient>
      </defs>

      <rect width="1600" height="900" fill="url(#heroSky)" />
      <rect width="1600" height="900" fill="url(#heroSun)" />

      {/* ceata joasa */}
      <ellipse cx="800" cy="720" rx="1100" ry="140" fill="#e9cf9f" opacity="0.18" />
      <ellipse cx="560" cy="780" rx="900" ry="120" fill="#f2ddb2" opacity="0.14" />

      {/* siluete de copaci in departare */}
      <g fill="#2f261d" opacity="0.55">
        <path d="M120 640c8-70 18-70 26 0 20-2 20 30 0 34v40h-26v-40c-20-4-20-36 0-34z" />
        <path d="M1440 660c7-58 16-58 22 0 17-2 17 26 0 30v34h-22v-34c-17-4-17-32 0-30z" />
      </g>

      {/* dealuri */}
      <path d="M0 690 Q400 620 820 675 T1600 660 V900 H0 Z" fill="url(#heroHill)" />
      <path d="M0 760 Q520 700 980 745 T1600 735 V900 H0 Z" fill="#241c15" />

      {/* capela cu turla si cruce */}
      <g transform="translate(720 470)">
        <rect x="0" y="120" width="160" height="150" fill="#2c231b" />
        <path d="M-14 120 L80 60 L174 120 Z" fill="#372c21" />
        <rect x="58" y="10" width="44" height="112" fill="#2c231b" />
        <path d="M50 10 L80 -22 L110 10 Z" fill="#372c21" />
        {/* cruce */}
        <rect x="76" y="-62" width="8" height="40" fill="#d8b483" />
        <rect x="66" y="-50" width="28" height="7" fill="#d8b483" />
        {/* fereastra luminata */}
        <rect x="64" y="150" width="32" height="60" rx="16" fill="#f2c987" opacity="0.9" />
        <rect x="20" y="170" width="22" height="42" rx="11" fill="#e9b878" opacity="0.55" />
        <rect x="118" y="170" width="22" height="42" rx="11" fill="#e9b878" opacity="0.55" />
      </g>

      {/* stalp cu felinar cald in prim-plan (stanga) */}
      <g transform="translate(250 470)" opacity="0.92">
        <rect x="18" y="60" width="8" height="300" fill="#1f1811" />
        <rect x="2" y="30" width="40" height="40" rx="6" fill="#1f1811" />
        <rect x="10" y="38" width="24" height="24" rx="3" fill="#f4c987" opacity="0.9" />
      </g>
    </svg>
  )
}

/* --- Portofoliu: fiecare cheie -> o scena --- */

function Frame({ children, bg = '#efe6d4' }) {
  return (
    <svg
      viewBox="0 0 800 600"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      role="img"
      style={{ width: '100%', height: '100%', display: 'block' }}
    >
      <rect width="800" height="600" fill={bg} />
      {children}
    </svg>
  )
}

function Hearse() {
  return (
    <Frame bg="#e7ddca">
      <defs>
        <linearGradient id="hFloor" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#e7ddca" />
          <stop offset="100%" stopColor="#d3c6ac" />
        </linearGradient>
      </defs>
      <rect y="300" width="800" height="300" fill="url(#hFloor)" />
      <ellipse cx="400" cy="470" rx="330" ry="34" fill="#b7a988" opacity="0.5" />
      {/* corp masina */}
      <g>
        <path
          d="M120 420 L150 320 Q160 300 190 298 L470 298 Q500 300 540 330 L650 360 Q690 372 690 410 L690 430 L120 430 Z"
          fill="#2c2620"
        />
        <path
          d="M210 316 L455 316 Q470 316 480 336 L500 372 L210 372 Z"
          fill="#4b4239"
          opacity="0.85"
        />
        <line x1="360" y1="316" x2="360" y2="372" stroke="#2c2620" strokeWidth="6" />
        {/* geam cu perdele */}
        <rect x="520" y="330" width="120" height="46" rx="6" fill="#6b6155" opacity="0.5" />
        {/* cruce discreta pe usa */}
        <g stroke="#d8b483" strokeWidth="5">
          <line x1="300" y1="392" x2="300" y2="418" />
          <line x1="289" y1="402" x2="311" y2="402" />
        </g>
      </g>
      {/* roti */}
      <g fill="#1d1812">
        <circle cx="250" cy="432" r="46" />
        <circle cx="560" cy="432" r="46" />
      </g>
      <g fill="#8a7c66">
        <circle cx="250" cy="432" r="20" />
        <circle cx="560" cy="432" r="20" />
      </g>
    </Frame>
  )
}

function Coffins() {
  return (
    <Frame bg="#eae1cf">
      <defs>
        <linearGradient id="wood" x1="0" y1="0" x2="1" y2="0.4">
          <stop offset="0%" stopColor="#8a6437" />
          <stop offset="50%" stopColor="#a67c48" />
          <stop offset="100%" stopColor="#7c5c33" />
        </linearGradient>
      </defs>
      <rect y="430" width="800" height="170" fill="#ddd0b7" />
      {[0, 1].map((i) => (
        <g key={i} transform={`translate(${120 + i * 300} ${180 + i * 40})`}>
          <path
            d="M0 60 L34 0 L206 0 L240 60 L240 300 Q240 320 220 320 L20 320 Q0 320 0 300 Z"
            fill="url(#wood)"
            stroke="#5a4225"
            strokeWidth="3"
          />
          {/* capitonaj interior */}
          <path d="M22 58 L44 20 L196 20 L218 58 L218 130 L22 130 Z" fill="#f3ead8" opacity="0.9" />
          {/* manere metalice */}
          <g fill="#c9b48a">
            <rect x="8" y="180" width="16" height="70" rx="8" />
            <rect x="216" y="180" width="16" height="70" rx="8" />
          </g>
          {/* fibra lemnului */}
          <g stroke="#5a4225" strokeWidth="1.5" opacity="0.35">
            <line x1="60" y1="150" x2="60" y2="300" />
            <line x1="120" y1="150" x2="120" y2="300" />
            <line x1="180" y1="150" x2="180" y2="300" />
          </g>
        </g>
      ))}
    </Frame>
  )
}

function Crosses() {
  return (
    <Frame bg="#e6ddc9">
      <defs>
        <linearGradient id="crossWood" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#8a6437" />
          <stop offset="100%" stopColor="#6a4e2c" />
        </linearGradient>
      </defs>
      <rect y="470" width="800" height="130" fill="#cabb9d" />
      <ellipse cx="400" cy="480" rx="300" ry="26" fill="#b3a37f" opacity="0.5" />
      {[
        { x: 250, s: 1, y: 120 },
        { x: 470, s: 1.28, y: 70 },
        { x: 600, s: 0.82, y: 170 },
      ].map((c, i) => (
        <g key={i} transform={`translate(${c.x} ${c.y}) scale(${c.s})`}>
          <rect x="-14" y="0" width="28" height="360" rx="4" fill="url(#crossWood)" stroke="#5a4225" strokeWidth="2" />
          <rect x="-70" y="70" width="140" height="28" rx="4" fill="url(#crossWood)" stroke="#5a4225" strokeWidth="2" />
          <circle cx="0" cy="84" r="9" fill="#d8b483" />
        </g>
      ))}
    </Frame>
  )
}

function Wreaths() {
  const petals = 22
  return (
    <Frame bg="#e9e0cd">
      <defs>
        <radialGradient id="wreathGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fbf6ea" />
          <stop offset="100%" stopColor="#e9e0cd" />
        </radialGradient>
      </defs>
      <rect width="800" height="600" fill="url(#wreathGlow)" />
      <g transform="translate(400 300)">
        {/* verdeata */}
        <circle r="180" fill="none" stroke="#5f6b3e" strokeWidth="54" opacity="0.9" />
        <circle r="180" fill="none" stroke="#4c5733" strokeWidth="54" strokeDasharray="30 26" opacity="0.5" />
        {/* flori pe coroana */}
        {Array.from({ length: petals }).map((_, i) => {
          const a = (i / petals) * Math.PI * 2
          const x = Math.cos(a) * 180
          const y = Math.sin(a) * 180
          const cols = ['#f4ede1', '#e9c9c2', '#d8b483', '#f4ede1']
          return (
            <g key={i} transform={`translate(${x} ${y})`}>
              <circle r="20" fill={cols[i % cols.length]} stroke="#c9b48a" strokeWidth="1.5" />
              <circle r="7" fill="#b08a50" />
            </g>
          )
        })}
        {/* panglica */}
        <path d="M-26 150 L-26 250 L0 226 L26 250 L26 150 Z" fill="#3b322a" />
        <path d="M-26 150 L26 150 L26 172 L-26 172 Z" fill="#2a231c" />
      </g>
    </Frame>
  )
}

function Chapel() {
  return (
    <Frame bg="#2c2419">
      <defs>
        <linearGradient id="chapWall" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3a2f22" />
          <stop offset="100%" stopColor="#221b12" />
        </linearGradient>
        <radialGradient id="candGlow" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#f7d79a" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#f7d79a" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="800" height="600" fill="url(#chapWall)" />
      {/* draperii */}
      <g fill="#4a3a28" opacity="0.8">
        <path d="M0 0 L120 0 Q90 300 120 600 L0 600 Z" />
        <path d="M800 0 L680 0 Q710 300 680 600 L800 600 Z" />
      </g>
      {/* aura calda centrala */}
      <ellipse cx="400" cy="300" rx="320" ry="260" fill="url(#candGlow)" />
      {/* catafalc cu drapaj */}
      <g>
        <rect x="230" y="380" width="340" height="120" rx="10" fill="#e9dcc4" />
        <path d="M230 380 L570 380 L590 430 L210 430 Z" fill="#f3ead8" />
        <rect x="250" y="360" width="300" height="34" rx="10" fill="#7c5c33" opacity="0.5" />
      </g>
      {/* sfesnice cu flacari */}
      {[300, 500].map((x, i) => (
        <g key={i} transform={`translate(${x} 250)`}>
          <rect x="-6" y="40" width="12" height="120" fill="#c9b48a" />
          <rect x="-16" y="158" width="32" height="14" rx="3" fill="#a88f5f" />
          <ellipse cx="0" cy="18" rx="18" ry="30" fill="#f6c56a" opacity="0.5" />
          <path d="M0 6 q10 14 0 30 q-10 -16 0 -30z" fill="#f7a83a" />
          <path d="M0 14 q5 8 0 18 q-5 -10 0 -18z" fill="#fde3a7" />
        </g>
      ))}
      {/* cruce pe perete */}
      <g fill="#d8b483" opacity="0.85" transform="translate(400 130)">
        <rect x="-5" y="-40" width="10" height="90" rx="2" />
        <rect x="-26" y="-16" width="52" height="10" rx="2" />
      </g>
    </Frame>
  )
}

function Trousseau() {
  return (
    <Frame bg="#ece3d1">
      <defs>
        <linearGradient id="cloth" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fbf6ec" />
          <stop offset="100%" stopColor="#e5d8c0" />
        </linearGradient>
      </defs>
      <rect y="360" width="800" height="240" fill="#d9cbb0" />
      {/* teanc de prosoape / lenjerie pliata */}
      <g>
        {[0, 1, 2].map((i) => (
          <g key={i} transform={`translate(140 ${300 - i * 46})`}>
            <rect width="240" height="42" rx="8" fill="url(#cloth)" stroke="#cdbb98" strokeWidth="2" />
            <line x1="0" y1="21" x2="240" y2="21" stroke="#d8b483" strokeWidth="3" opacity="0.6" />
          </g>
        ))}
      </g>
      {/* lumanari */}
      <g transform="translate(470 150)">
        {[0, 1, 2].map((i) => (
          <g key={i} transform={`translate(${i * 46} ${i % 2 ? 12 : 0})`}>
            <rect x="0" y="40" width="20" height="180" rx="6" fill="#f3ead6" stroke="#d8c9a8" strokeWidth="1.5" />
            <rect x="8" y="26" width="4" height="16" fill="#6e6257" />
            <path d="M10 8 q7 10 0 22 q-7 -12 0 -22z" fill="#f7a83a" />
            <path d="M10 15 q3 6 0 13 q-3 -7 0 -13z" fill="#fde3a7" />
          </g>
        ))}
      </g>
      {/* cruciulita / accesoriu */}
      <g transform="translate(600 380)" fill="#b08a50">
        <rect x="-4" y="-30" width="8" height="70" rx="2" />
        <rect x="-20" y="-14" width="40" height="8" rx="2" />
      </g>
    </Frame>
  )
}

const MAP = {
  hearse: Hearse,
  coffins: Coffins,
  crosses: Crosses,
  wreaths: Wreaths,
  chapel: Chapel,
  trousseau: Trousseau,
}

export function PortfolioIllustration({ name }) {
  const Cmp = MAP[name] || Coffins
  return <Cmp />
}
