// Scena Three.js din spatele componentei LightMotes: luminite calde care plutesc lent.
// Toata miscarea e calculata pe placa video (shader), pe procesor se schimba doar timpul.
import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  Clock,
  PerspectiveCamera,
  Points,
  Scene,
  ShaderMaterial,
  WebGLRenderer,
} from 'three'

const FOV = 50
const CAM_Z = 6
const SPAN_K = 2 * Math.tan(((FOV / 2) * Math.PI) / 180) // inaltimea vazuta la distanta 1

// Feluri de luminite: 0 = plutesc, 1 = urca din flacara, 2 = pete mari, nefocalizate
const PRESETS = {
  hero: { float: [140, 70], rise: [34, 22], bokeh: [10, 5], spread: 0.5, intensity: 1 },
  stage: { float: [70, 34], rise: [0, 0], bokeh: [5, 3], spread: 0.22, intensity: 0.75 },
}

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uPixelRatio;
  uniform float uScale;
  uniform float uAspect;
  uniform vec2 uAnchor;
  uniform vec2 uPointer;
  attribute float aSeed;
  attribute float aSize;
  attribute float aSpeed;
  attribute float aKind;
  varying float vAlpha;
  varying float vSeed;
  varying float vSoft;

  void main() {
    vec3 p;
    float alpha;
    if (aKind > 0.5 && aKind < 1.5) {
      // urca din flacara, se leagana tot mai larg si se stinge
      float prog = fract(uTime * aSpeed + aSeed);
      p = vec3(uAnchor, 0.0);
      p.y += prog * 2.4;
      p.x += sin(prog * 5.0 + aSeed * 30.0) * (0.03 + prog * 0.3) + (aSeed - 0.5) * 0.12;
      alpha = smoothstep(0.0, 0.12, prog) * pow(1.0 - prog, 1.6);
    } else {
      // position.xy sunt intre -0.5 si 0.5 din cadrul vazut la adancimea z
      float span = ${SPAN_K.toFixed(6)} * (${CAM_Z.toFixed(1)} - position.z);
      float y = fract(position.y + 0.5 + uTime * aSpeed / span) - 0.5;
      p.z = position.z;
      p.y = y * span * 1.1;
      p.x = position.x * span * uAspect * 1.1
        + sin(uTime * 0.21 + aSeed * 6.2831) * 0.3
        + sin(uTime * 0.09 + aSeed * 17.0) * 0.18;
      // cele din fata se misca mai mult dupa cursor (adancime)
      p.xy += uPointer * (p.z + 3.0) * 0.06;
      alpha = smoothstep(0.5, 0.36, abs(y));
    }
    float twinkle = 0.62 + 0.38 * sin(uTime * (0.7 + aSeed * 1.6) + aSeed * 40.0);
    vAlpha = alpha * (aKind > 1.5 ? 0.1 : aKind > 0.5 ? 1.4 : twinkle);
    vSeed = aSeed;
    vSoft = aKind > 1.5 ? 1.0 : 0.0;

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_PointSize = aSize * uScale * uPixelRatio / -mv.z;
    gl_Position = projectionMatrix * mv;
  }
`

const fragmentShader = /* glsl */ `
  uniform float uIntensity;
  varying float vAlpha;
  varying float vSeed;
  varying float vSoft;

  void main() {
    float d = length(gl_PointCoord - 0.5) * 2.0;
    if (d > 1.0) discard;
    float glow = pow(1.0 - d, mix(2.2, 1.2, vSoft));
    float core = smoothstep(0.32, 0.0, d) * (1.0 - vSoft);
    // de la chihlimbar la auriu pal, ca flacara lumanarii
    vec3 color = mix(vec3(1.0, 0.78, 0.48), vec3(1.0, 0.93, 0.8), vSeed);
    float a = (glow * 0.8 + core * 0.4) * vAlpha * uIntensity;
    gl_FragColor = vec4(color * a, a);
  }
`

function buildGeometry(preset, small) {
  const pick = ([desktop, phone]) => (small ? phone : desktop)
  const counts = [pick(preset.float), pick(preset.rise), pick(preset.bokeh)]
  const total = counts[0] + counts[1] + counts[2]
  const position = new Float32Array(total * 3)
  const seed = new Float32Array(total)
  const size = new Float32Array(total)
  const speed = new Float32Array(total)
  const kind = new Float32Array(total)

  // mai dese spre mijloc cand `spread` e mic (lumina scenei cade la centru)
  const across = (spread) => {
    const r = (Math.random() + Math.random() + Math.random()) / 3 - 0.5
    return spread >= 0.5 ? Math.random() - 0.5 : r * spread * 4
  }

  let i = 0
  counts.forEach((count, k) => {
    for (let n = 0; n < count; n++, i++) {
      kind[i] = k
      seed[i] = Math.random()
      if (k === 1) {
        size[i] = 0.07 + Math.random() * 0.09
        speed[i] = 0.12 + Math.random() * 0.14 // cicluri pe secunda
        continue
      }
      position[i * 3] = across(preset.spread)
      position[i * 3 + 1] = Math.random() - 0.5
      position[i * 3 + 2] = k === 2 ? 1.5 + Math.random() * 2 : -3 + Math.random() * 4.5
      size[i] = k === 2 ? 0.5 + Math.random() * 0.5 : 0.045 + Math.random() * 0.11
      speed[i] = k === 2 ? 0.03 + Math.random() * 0.04 : 0.05 + Math.random() * 0.12
    }
  })

  const geometry = new BufferGeometry()
  geometry.setAttribute('position', new BufferAttribute(position, 3))
  geometry.setAttribute('aSeed', new BufferAttribute(seed, 1))
  geometry.setAttribute('aSize', new BufferAttribute(size, 1))
  geometry.setAttribute('aSpeed', new BufferAttribute(speed, 1))
  geometry.setAttribute('aKind', new BufferAttribute(kind, 1))
  return geometry
}

/**
 * Porneste scena pe `canvas` (care umple parintele). `anchor` = selectorul flacarii din
 * parinte, de unde urca luminitele. Intoarce { setActive, dispose } sau null fara WebGL.
 */
export function createScene(canvas, { variant = 'stage', anchor } = {}) {
  const parent = canvas.parentElement
  const preset = PRESETS[variant] || PRESETS.stage

  let renderer
  try {
    renderer = new WebGLRenderer({ canvas, alpha: true, antialias: false, powerPreference: 'low-power' })
  } catch {
    return null
  }
  renderer.setClearColor(0x000000, 0)

  const scene = new Scene()
  const camera = new PerspectiveCamera(FOV, 1, 0.1, 50)
  camera.position.z = CAM_Z

  const geometry = buildGeometry(preset, parent.clientWidth < 640)
  const material = new ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
      uTime: { value: 0 },
      uPixelRatio: { value: 1 },
      uScale: { value: 1 },
      uAspect: { value: 1 },
      uAnchor: { value: [0, -10] },
      uPointer: { value: [0, 0] },
      uIntensity: { value: preset.intensity },
    },
    transparent: true,
    depthWrite: false,
    blending: AdditiveBlending,
    premultipliedAlpha: true,
  })
  const points = new Points(geometry, material)
  points.frustumCulled = false
  scene.add(points)

  const u = material.uniforms

  const resize = () => {
    const w = parent.clientWidth
    const h = parent.clientHeight
    if (!w || !h) return
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75))
    renderer.setSize(w, h, false)
    camera.aspect = w / h
    camera.updateProjectionMatrix()
    u.uPixelRatio.value = renderer.getPixelRatio()
    u.uScale.value = h / SPAN_K
    u.uAspect.value = w / h

    // flacara: varful ei, trecut in coordonatele scenei (planul z = 0)
    const flame = anchor && parent.querySelector(anchor)
    if (flame) {
      const box = parent.getBoundingClientRect()
      const r = flame.getBoundingClientRect()
      const x = (r.left + r.width / 2 - box.left) / w
      const y = (r.top + r.height * 0.2 - box.top) / h
      const span = SPAN_K * CAM_Z
      u.uAnchor.value = [(x - 0.5) * span * (w / h), (0.5 - y) * span]
    }
  }
  resize()
  const ro = new ResizeObserver(resize)
  ro.observe(parent)
  // lumanarea intra in pagina cu o animatie; o masor din nou dupa ce s-a asezat
  const settle = setTimeout(resize, 2200)

  // cursorul misca usor luminitele din fata (doar mouse, nu atingere)
  const target = [0, 0]
  const onPointer = (e) => {
    if (e.pointerType !== 'mouse') return
    const box = parent.getBoundingClientRect()
    target[0] = ((e.clientX - box.left) / box.width - 0.5) * 2
    target[1] = -((e.clientY - box.top) / box.height - 0.5) * 2
  }
  window.addEventListener('pointermove', onPointer, { passive: true })

  const clock = new Clock()
  let active = false
  let frame = 0
  const tick = () => {
    frame = 0
    if (!active || document.hidden) return
    u.uTime.value = clock.getElapsedTime()
    const p = u.uPointer.value
    p[0] += (target[0] - p[0]) * 0.04
    p[1] += (target[1] - p[1]) * 0.04
    renderer.render(scene, camera)
    frame = requestAnimationFrame(tick)
  }
  const start = () => {
    if (active && !frame && !document.hidden) frame = requestAnimationFrame(tick)
  }
  document.addEventListener('visibilitychange', start)

  return {
    setActive(value) {
      active = value
      start()
    },
    dispose() {
      active = false
      cancelAnimationFrame(frame)
      clearTimeout(settle)
      ro.disconnect()
      window.removeEventListener('pointermove', onPointer)
      document.removeEventListener('visibilitychange', start)
      geometry.dispose()
      material.dispose()
      renderer.dispose()
    },
  }
}
