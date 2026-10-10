// Pregateste fotografiile din src/images pentru site si le scrie, optimizate (WebP),
// in src/images/web/<nume>-<latime>.webp. Originalele raman neatinse.
//
//   npm run images
//
// - sicriele si meniurile sunt decupate de pe fundal, ca sa stea toate pe aceeasi scena;
// - colajul cu masina e impartit in doua fotografii;
// - restul fotografiilor sunt doar redimensionate.
import sharp from 'sharp'
import { mkdir, rm } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)))
const SRC = path.join(ROOT, 'src', 'images')
const OUT = path.join(SRC, 'web')

/* ---------- Ce inseamna „fundal” pentru fiecare tip de poza ---------- */

const chroma = (r, g, b) => Math.max(r, g, b) - Math.min(r, g, b)
const BG = {
  // tabla de sah „transparenta” desenata in poza (patrate albe si gri-deschis)
  checker: (r, g, b) => chroma(r, g, b) <= 16 && Math.min(r, g, b) >= 198,
  white: (r, g, b) => Math.min(r, g, b) >= 250,
  black: (r, g, b) => Math.max(r, g, b) <= 24,
  // crem deschis, inclusiv umbra slaba de langa pergament (pergamentul e mult mai saturat)
  cream: (r, g, b) => r - b <= 50 && b >= 150,
}

/* ---------- Sursele ---------- */

// Sicriele: trei vederi ale aceluiasi model, pe o panza comuna 3:2.
// `key: null` = poza are deja transparenta reala; `seeds` = buzunare de fundal inchise intre sicrie;
// `shadow` = sub sicrie e o umbra pe podea, care trebuie scoasa si ea (randul de la care incepe talpa).
const COFFINS = [
  { src: 'Sicriu 4 colturi 2 .png', name: 'sicriu-4-colturi-1', key: null },
  { src: 'Sicriu 4 colturi e.png', name: 'sicriu-4-colturi-2', key: null },
  { src: 'Sicriu 6 colturi - 1.png', name: 'sicriu-6-colturi-1', key: BG.checker },
  { src: 'Siscriu 6 coluturi-2.png', name: 'sicriu-6-colturi-2', key: BG.checker },
  { src: 'Sicriu 6 colturi - 3.png', name: 'sicriu-6-colturi-3', key: BG.checker },
  { src: 'Sicriu 8 colturi.png', name: 'sicriu-8-colturi-1', key: BG.white },
  { src: 'Sicriu 8  colturi.png', name: 'sicriu-8-colturi-2', key: BG.white, seeds: [[536, 685]], shadow: 940 },
]
const COFFIN_CANVAS = { width: 1536, height: 1024, pad: 0.03, widths: [1536, 960, 480] }

// Meniurile de pomana: pergamente pe fundal negru, respectiv crem.
const MENUS = [
  { src: 'pachet standard.jpeg', name: 'meniu-standard', key: BG.black },
  { src: 'pachet standard de post.jpeg', name: 'meniu-post', key: BG.cream },
]
const MENU_CANVAS = { width: 1000, height: 1500, pad: 0.015, widths: [1000, 500] }

// Fotografii obisnuite; `crop` (left, top, width, height) taie o bucata dintr-un colaj.
const PHOTOS = [
  { src: 'Lumanari.png', name: 'magazin-lumanari', widths: [1086, 560] },
  { src: 'Prosoape.png', name: 'magazin-prosoape', widths: [1086, 560] },
  { src: 'Vesela - Farfurii si Pahare.png', name: 'magazin-vesela', widths: [1086, 560] },
  { src: 'Baticuri.png', name: 'magazin-baticuri', widths: [1536, 768] },
  { src: 'masina-funerara.jpg', name: 'masina-1', crop: [0, 0, 887, 887], widths: [887, 560] },
  { src: 'masina-funerara.jpg', name: 'masina-2', crop: [887, 0, 887, 887], widths: [887, 560] },
  // „coroana 4.png” e aceeasi fotografie ca „coroana 3.png”, asa ca nu apare aici
  { src: 'coroana 1.png', name: 'coroana-albastra', widths: [1024, 600] },
  { src: 'coroana 2.png', name: 'coroana-rosie', widths: [1024, 600] },
  { src: 'coroana 3.png', name: 'coroana-visinie', widths: [1024, 600] },
  { src: 'coroana 5.png', name: 'coroana-lila', widths: [1024, 600] },
  { src: 'coroana 6.png', name: 'coroana-mov', widths: [1024, 600] },
]

/* ---------- Decupare ---------- */

/** Pixelii de fundal legati de marginea pozei (sau de punctele `seeds`). */
function floodBackground(rgba, w, h, isBg, seeds = []) {
  const n = w * h
  const bg = new Uint8Array(n)
  const stack = new Int32Array(n)
  let top = 0
  const visit = (i) => {
    if (bg[i]) return
    const p = i * 4
    if (!isBg(rgba[p], rgba[p + 1], rgba[p + 2])) return
    bg[i] = 1
    stack[top++] = i
  }
  for (let x = 0; x < w; x++) {
    visit(x)
    visit((h - 1) * w + x)
  }
  for (let y = 0; y < h; y++) {
    visit(y * w)
    visit(y * w + w - 1)
  }
  for (const [x, y] of seeds) visit(y * w + x)
  while (top) {
    const i = stack[--top]
    const x = i % w
    if (x > 0) visit(i - 1)
    if (x < w - 1) visit(i + 1)
    if (i >= w) visit(i - w)
    if (i < n - w) visit(i + w)
  }
  return bg
}

/**
 * Intinde fundalul peste umbra de pe podea. Peste tot: gri foarte deschis, neutru si neted
 * (dantela e si ea alb-gri, dar nu e neteda). De la randul `soleY` in jos, unde nu mai e
 * dantela, si griul mai inchis de sub talpa sicrielor.
 */
function floodShadow(rgba, w, h, bg, soleY) {
  const n = w * h
  const stack = new Int32Array(n)
  let top = 0
  for (let i = 0; i < n; i++) if (bg[i]) stack[top++] = i
  const visit = (i, from) => {
    if (bg[i]) return
    const p = i * 4
    const c = chroma(rgba[p], rgba[p + 1], rgba[p + 2])
    const low = Math.min(rgba[p], rgba[p + 1], rgba[p + 2])
    const haze = c <= 6 && low >= 226 && Math.abs(rgba[p + 1] - rgba[from * 4 + 1]) <= 3
    const sole = i >= soleY * w && c <= 12 && low >= 110
    if (!haze && !sole) return
    bg[i] = 1
    stack[top++] = i
  }
  while (top) {
    const i = stack[--top]
    const x = i % w
    if (x > 0) visit(i - 1, i)
    if (x < w - 1) visit(i + 1, i)
    if (i >= w) visit(i - w, i)
    if (i < n - w) visit(i + w, i)
  }
}

/** Trece la fundal insulele mici ramase pe langa subiect (resturi de dantela, zgomot). */
function dropSpecks(w, h, bg, minArea = 600) {
  const n = w * h
  const seen = new Uint8Array(n)
  const stack = new Int32Array(n)
  for (let start = 0; start < n; start++) {
    if (bg[start] || seen[start]) continue
    const island = []
    let top = 0
    seen[start] = 1
    stack[top++] = start
    while (top) {
      const i = stack[--top]
      island.push(i)
      const x = i % w
      for (const j of [x > 0 ? i - 1 : -1, x < w - 1 ? i + 1 : -1, i - w, i + w]) {
        if (j < 0 || j >= n || bg[j] || seen[j]) continue
        seen[j] = 1
        stack[top++] = j
      }
    }
    if (island.length < minArea) for (const i of island) bg[i] = 1
  }
}

/**
 * Scoate fundalul si curata marginea: conturul se retrage cu un pixel, primii doi pixeli
 * de la margine iau culoarea din interior (altfel ramane o dunga deschisa din vechiul
 * fundal), iar transparenta se inmoaie putin.
 */
function cutOut(rgba, w, h, { key, seeds, shadow }) {
  const n = w * h
  const bg = floodBackground(rgba, w, h, key, seeds)
  if (shadow) floodShadow(rgba, w, h, bg, shadow)
  dropSpecks(w, h, bg)

  // depth: 0 = fundal, 1..3 = al catelea pixel de la margine, 4 = interior
  const DEEP = 4
  const depth = new Uint8Array(n)
  for (let i = 0; i < n; i++) depth[i] = bg[i] ? 0 : DEEP
  for (let d = 1; d < DEEP; d++) {
    const ring = []
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const i = y * w + x
        if (depth[i] !== DEEP) continue
        let near = false
        for (let dy = -1; dy <= 1 && !near; dy++) {
          for (let dx = -1; dx <= 1; dx++) {
            const xx = x + dx
            const yy = y + dy
            if (xx < 0 || yy < 0 || xx >= w || yy >= h) continue
            if (depth[yy * w + xx] === d - 1) {
              near = true
              break
            }
          }
        }
        if (near) ring.push(i)
      }
    }
    for (const i of ring) depth[i] = d
  }

  // culoarea marginii = media celor mai apropiati pixeli „curati” (depth >= 3)
  const out = Buffer.from(rgba)
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const i = y * w + x
      if (depth[i] !== 1 && depth[i] !== 2) continue
      for (let r = 1; r <= 3; r++) {
        let sr = 0
        let sg = 0
        let sb = 0
        let cnt = 0
        for (let dy = -r; dy <= r; dy++) {
          for (let dx = -r; dx <= r; dx++) {
            if (Math.max(Math.abs(dx), Math.abs(dy)) !== r) continue
            const xx = x + dx
            const yy = y + dy
            if (xx < 0 || yy < 0 || xx >= w || yy >= h) continue
            const j = yy * w + xx
            if (depth[j] < 3) continue
            sr += rgba[j * 4]
            sg += rgba[j * 4 + 1]
            sb += rgba[j * 4 + 2]
            cnt++
          }
        }
        if (cnt) {
          out[i * 4] = sr / cnt
          out[i * 4 + 1] = sg / cnt
          out[i * 4 + 2] = sb / cnt
          break
        }
      }
    }
  }

  // transparenta: retrasa cu un pixel, apoi inmuiata cu un filtru 3x3
  const hard = new Uint8Array(n)
  for (let i = 0; i < n; i++) hard[i] = depth[i] >= 2 ? 255 : 0
  const at = (x, y) => (x < 0 || y < 0 || x >= w || y >= h ? 0 : hard[y * w + x])
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const i = y * w + x
      if (depth[i] === DEEP) {
        out[i * 4 + 3] = 255
        continue
      }
      const sum =
        4 * at(x, y) +
        2 * (at(x - 1, y) + at(x + 1, y) + at(x, y - 1) + at(x, y + 1)) +
        at(x - 1, y - 1) + at(x + 1, y - 1) + at(x - 1, y + 1) + at(x + 1, y + 1)
      out[i * 4 + 3] = sum / 16
    }
  }
  return out
}

/** Taie marginile goale si aseaza decupajul centrat pe o panza de marime fixa. */
async function onCanvas(rgba, w, h, canvas) {
  let x0 = w
  let y0 = h
  let x1 = -1
  let y1 = -1
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      if (rgba[(y * w + x) * 4 + 3] > 8) {
        if (x < x0) x0 = x
        if (x > x1) x1 = x
        if (y < y0) y0 = y
        if (y > y1) y1 = y
      }
    }
  }
  const boxW = Math.round(canvas.width * (1 - 2 * canvas.pad))
  const boxH = Math.round(canvas.height * (1 - 2 * canvas.pad))
  const fitted = await sharp(rgba, { raw: { width: w, height: h, channels: 4 } })
    .extract({ left: x0, top: y0, width: x1 - x0 + 1, height: y1 - y0 + 1 })
    .resize({ width: boxW, height: boxH, fit: 'inside' })
    .png()
    .toBuffer({ resolveWithObject: true })
  const left = Math.floor((canvas.width - fitted.info.width) / 2)
  const top = Math.floor((canvas.height - fitted.info.height) / 2)
  return sharp(fitted.data)
    .extend({
      left,
      top,
      right: canvas.width - fitted.info.width - left,
      bottom: canvas.height - fitted.info.height - top,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png()
    .toBuffer()
}

async function cutouts(items, canvas) {
  for (const item of items) {
    const { data, info } = await sharp(path.join(SRC, item.src))
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true })
    const { width: w, height: h } = info
    const rgba = item.key ? cutOut(data, w, h, item) : data
    const placed = await onCanvas(rgba, w, h, canvas)
    for (const width of canvas.widths) {
      await sharp(placed)
        .resize({ width })
        .webp({ quality: 84, alphaQuality: 92, effort: 6 })
        .toFile(path.join(OUT, `${item.name}-${width}.webp`))
    }
    console.log('decupat ', item.name)
  }
}

async function photos(items) {
  for (const item of items) {
    for (const width of item.widths) {
      let img = sharp(path.join(SRC, item.src))
      if (item.crop) {
        const [left, top, cw, ch] = item.crop
        img = img.extract({ left, top, width: cw, height: ch })
      }
      await img
        .resize({ width, withoutEnlargement: true })
        .webp({ quality: 80, effort: 6 })
        .toFile(path.join(OUT, `${item.name}-${width}.webp`))
    }
    console.log('pregatit', item.name)
  }
}

await rm(OUT, { recursive: true, force: true })
await mkdir(OUT, { recursive: true })
await cutouts(COFFINS, COFFIN_CANVAS)
await cutouts(MENUS, MENU_CANVAS)
await photos(PHOTOS)
