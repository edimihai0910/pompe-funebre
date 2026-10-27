// Petalele de sakura din sectiunea Servicii, ca imagini SVG: alb-rozaliu, crem si fildes,
// foarte stinse (mai aproape de florile albe dintr-o coroana decat de rozul de cires).

const SHAPE = 'M20 46C9 40 3 28 5 17C6 9 12 4 17 5L20 10L23 5C28 4 34 9 35 17C37 28 31 40 20 46Z'

/** Petala ca SVG; viewBox 48 x 56 (cu loc pentru umbra moale din spatele ei) */
export const petalSvg = (base, tip, shade = 0.26) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-4 -2 48 56">
<defs>
<linearGradient id="g" x1="0" y1="1" x2="0.15" y2="0">
<stop offset="0" stop-color="${base}"/><stop offset="0.85" stop-color="${tip}"/>
</linearGradient>
<filter id="s" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="1.8"/></filter>
</defs>
<path d="${SHAPE}" transform="translate(0.5 3)" fill="rgba(90,66,37,${shade})" filter="url(#s)"/>
<path d="${SHAPE}" fill="url(#g)" stroke="rgba(130,92,60,0.34)" stroke-width="0.8"/>
<path d="M20 43Q19 28 20 13" fill="none" stroke="rgba(255,255,255,0.75)" stroke-width="0.9"
 stroke-linecap="round"/>
</svg>`

/** Inaltime / latime a unei petale (dupa viewBox) */
export const PETAL_RATIO = 56 / 48

// [baza, varf] pentru fata petalei si pentru dosul ei (putin mai inchis), pe culori:
// alb-rozaliu, crem, fildes
export const PETAL_COLORS = [
  { front: ['#e2b8b4', '#fff7f4'], back: ['#d2a39e', '#f4e3de'] },
  { front: ['#d9c096', '#fffaf0'], back: ['#c8ad80', '#efe3cc'] },
  { front: ['#e3d0ae', '#fffdf8'], back: ['#d2bd98', '#f1e8d8'] },
]

const url = (svg) => `url("data:image/svg+xml,${encodeURIComponent(svg)}")`

/** Valori gata de pus in `background-image` (petala de langa colt, la hover) */
export const PETALS = PETAL_COLORS.map(({ front }) => url(petalSvg(...front)))
