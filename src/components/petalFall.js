// Petale de sakura care vin continuu din stanga si cad lin peste sectiunea Servicii (<canvas>).
//
// Petalele intra pe rand din marginea din stanga, purtate de o adiere care slabeste treptat,
// si coboara incet, rotindu-se si legandu-se usor. Se sting cand ajung spre baza sectiunii
// sau dupa cateva secunde. Fluxul continua cat timp sectiunea se vede si se opreste cand
// nu se mai vede.
import { PETAL_COLORS, PETAL_RATIO, petalSvg } from './petalArt'

const TAU = Math.PI * 2
const SPRITE_W = 64
const SPRITE_H = Math.round(SPRITE_W * PETAL_RATIO)

const rand = (a, b) => a + Math.random() * (b - a)
const sign = () => (Math.random() < 0.5 ? -1 : 1)

/* ---------- Imaginile petalelor ---------- */

async function sprite(svg, blur) {
  const img = new Image()
  img.src = `data:image/svg+xml,${encodeURIComponent(svg)}`
  await img.decode()
  const c = document.createElement('canvas')
  c.width = SPRITE_W
  c.height = SPRITE_H
  const g = c.getContext('2d')
  // petalele foarte apropiate sunt usor nefocalizate, ca intr-o fotografie
  if (blur) {
    g.filter = `blur(${blur}px)`
    g.drawImage(img, 4, 4, SPRITE_W - 8, SPRITE_H - 8)
  } else {
    g.drawImage(img, 0, 0, SPRITE_W, SPRITE_H)
  }
  return c
}

// [culoare][0 = fata, 1 = dos][0 = clara, 1 = nefocalizata]
const loadSprites = () =>
  Promise.all(
    PETAL_COLORS.map(({ front, back }) =>
      Promise.all(
        [petalSvg(...front), petalSvg(...back, 0.16)].map((svg) =>
          Promise.all([sprite(svg, 0), sprite(svg, 3)]),
        ),
      ),
    ),
  )

/* ---------- Miscarea ---------- */

/** Starea petalei la `s` secunde de cand a pornit */
function state(p, s) {
  // adierea o impinge spre dreapta si slabeste lin; ramane o deriva mica, tot spre dreapta
  const wind = p.tau * (1 - Math.exp(-s / p.tau))
  return {
    x: p.x0 + p.v0 * wind + p.vmin * s + p.ax * Math.sin(p.wx * s + p.px),
    y: p.y0 + p.vy * s + p.ay * Math.sin(p.wy * s + p.py),
    angle: p.th0 + p.spin * s + p.wob * Math.sin(p.ww * s + p.pw),
    // majoritatea doar se leagana in aer (se vede forma petalei); cateva se rostogolesc
    flip: p.tumble ? p.f0 + p.fw * s : p.f0 + p.fa * Math.sin(p.fw * s + p.pw),
  }
}

/**
 * Porneste efectul pe `canvas` (lipit de ecran in interiorul stratului `layer`, care acopera
 * sectiunea). Intoarce { setVisible, dispose } sau null daca nu se poate desena.
 */
export function createPetalFall(canvas, layer) {
  const ctx = canvas.getContext('2d')
  if (!ctx) return null

  let sprites = null
  const petals = []
  let visible = false
  let frame = 0
  let nextSpawn = 0
  let dpr = 1

  const resize = () => {
    dpr = Math.min(window.devicePixelRatio || 1, 2)
    canvas.width = Math.round(canvas.clientWidth * dpr)
    canvas.height = Math.round(canvas.clientHeight * dpr)
  }
  resize()
  const ro = new ResizeObserver(resize)
  ro.observe(canvas)

  // unde e ecranul in sectiune (canvasul ramane lipit de ecran cand sectiunea e inalta)
  const view = () => ({
    off: canvas.getBoundingClientRect().top - layer.getBoundingClientRect().top,
    h: canvas.clientHeight,
  })
  const phone = () => layer.clientWidth < 640
  // cate petale noi pe secunda: ~25 pe ecran pe desktop, ~12 pe telefon
  const rate = () => (phone() ? 1.4 : 3)

  /** O petala noua, intrata din stanga; `age` > 0 = deja pornita de atatea secunde */
  function spawn(now, age = 0) {
    const W = layer.clientWidth
    const H = layer.clientHeight
    const { off, h } = view()
    const small = phone()
    const z = Math.random() // adancime: 0 departe, 1 aproape
    const size = (14 + 12 * z) * (small ? 0.85 : 1)
    const vmin = (small ? rand(10, 24) : rand(18, 40)) * (0.8 + 0.4 * z)
    const wx = TAU / rand(2.5, 4)
    petals.push({
      born: now - age,
      W,
      H,
      z,
      size,
      color: Math.random() < 0.45 ? 0 : Math.random() < 0.6 ? 1 : 2,
      blur: z > 0.92 ? 1 : 0,
      alpha: 0.55 + 0.35 * z,
      life: rand(10, 16),
      x0: -size - rand(10, 60),
      y0: Math.min(H - 200, Math.max(10, off + h * rand(-0.05, 0.6))),
      // adierea le duce pe toata latimea: unele cad aproape, altele ajung in dreapta
      v0: (small ? rand(70, 170) : rand(120, 360)) * (0.8 + 0.4 * z),
      tau: rand(2, 4),
      vmin,
      // leganare laterala mica, ca petala sa nu dea niciodata inapoi
      ax: (rand(0.3, 0.7) * vmin) / wx,
      wx,
      px: rand(0, TAU),
      vy: (small ? rand(20, 40) : rand(22, 48)) * (0.8 + 0.4 * z),
      ay: rand(6, 16),
      wy: TAU / rand(2.5, 4.5),
      py: rand(0, TAU),
      th0: rand(0, TAU),
      spin: rand(0.3, 0.9) * sign(),
      wob: rand(0.15, 0.4),
      ww: rand(1, 2),
      pw: rand(0, TAU),
      tumble: Math.random() < 0.3,
      f0: rand(-0.3, 0.3) + (Math.random() < 0.25 ? Math.PI : 0),
      fa: rand(0.6, 1.1),
      fw: rand(1.2, 2.4) * sign(),
    })
    // cele apropiate se deseneaza peste cele departate
    petals.sort((a, b) => a.z - b.z)
  }

  const draw = (nowMs) => {
    frame = 0
    if (!visible) return
    const now = nowMs / 1000
    while (now >= nextSpawn) {
      spawn(now)
      nextSpawn += rand(0.6, 1.4) / rate()
    }

    const { off, h } = view()
    ctx.setTransform(1, 0, 0, 1, 0, 0)
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    for (let n = petals.length - 1; n >= 0; n--) {
      const p = petals[n]
      const s = now - p.born
      const st = state(p, s)
      if (s > p.life || st.x > p.W + 40 || st.y > p.H) {
        petals.splice(n, 1)
        continue
      }
      p.st = st
      // apare lin, se stinge spre sfarsitul vietii sau spre baza sectiunii
      p.a =
        p.alpha *
        Math.min(1, s / 0.8) *
        Math.min(1, (p.life - s) / 1.6) *
        Math.max(0, Math.min(1, (p.H - 20 - st.y) / 100))
    }
    if (sprites) {
      for (const p of petals) {
        const st = p.st
        const y = st.y - off
        if (p.a <= 0 || st.x < -40 || y < -40 || y > h + 40) continue
        // „intoarcerea” in aer: petala se ingusteaza, iar cand isi arata dosul e mai inchisa
        const cf = Math.cos(st.flip)
        const back = cf < 0 ? 1 : 0
        const sx = Math.max(0.12, Math.abs(cf))
        const sy = 0.9 + 0.1 * Math.sin(st.flip * 0.5 + p.pw)
        const k = (p.size / SPRITE_W) * dpr
        const c = Math.cos(st.angle)
        const si = Math.sin(st.angle)
        ctx.globalAlpha = p.a
        ctx.setTransform(c * sx * k, si * sx * k, -si * sy * k, c * sy * k, st.x * dpr, y * dpr)
        ctx.drawImage(sprites[p.color][back][p.blur], -SPRITE_W / 2, -SPRITE_H / 2)
      }
    }
    frame = requestAnimationFrame(draw)
  }

  loadSprites()
    .then((s) => {
      sprites = s
    })
    .catch(() => {})

  return {
    setVisible(v) {
      visible = v
      if (!v) {
        cancelAnimationFrame(frame)
        frame = 0
        return
      }
      const now = performance.now() / 1000
      // la intrarea pe ecran, cateva petale sunt deja in aer: fluxul pare ca exista dinainte
      if (petals.length < 6) {
        const count = Math.round(rate() * 6)
        for (let n = 0; n < count; n++) spawn(now, rand(0, 6))
      }
      nextSpawn = now
      if (!frame) frame = requestAnimationFrame(draw)
    },
    dispose() {
      visible = false
      cancelAnimationFrame(frame)
      ro.disconnect()
      petals.length = 0
    },
  }
}
