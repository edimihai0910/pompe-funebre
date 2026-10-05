/* ===========================================================
   Ilustratie SVG sobra, in paleta site-ului, pentru fundalul
   din hero. Portofoliul foloseste fotografii (src/images).
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
