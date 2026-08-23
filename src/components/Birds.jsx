import './Birds.css'

// Stol lejer: cateva pasari apropiate (aproape de biserica) + cateva razlete.
// top = inaltimea pe cer, size = departarea, dur = viteza traversarii (s).
const BIRDS = [
  { top: '21%', size: 1.0, dur: 24, delay: 0, bob: 12, bobdur: 3.4, flap: 0.6, op: 0.92 },
  { top: '25%', size: 0.78, dur: 27, delay: 1.6, bob: 9, bobdur: 3.0, flap: 0.54, op: 0.82 },
  { top: '18%', size: 0.66, dur: 30, delay: 3.2, bob: 8, bobdur: 3.8, flap: 0.66, op: 0.74 },
  { top: '34%', size: 0.58, dur: 33, delay: 9, bob: 7, bobdur: 4.2, flap: 0.72, op: 0.68 },
  { top: '39%', size: 0.9, dur: 22, delay: 13, bob: 11, bobdur: 3.1, flap: 0.52, op: 0.86 },
]

function BirdShape() {
  return (
    <svg className="bird__svg" viewBox="-26 -14 52 28" width="52" height="28" aria-hidden="true">
      <g className="bird__wing bird__wing--l">
        <path d="M1 0 C -7 -9 -16 -9 -25 -1 C -16 -4 -8 -3 1 3 Z" />
      </g>
      <g className="bird__wing bird__wing--r">
        <path d="M-1 0 C 7 -9 16 -9 25 -1 C 16 -4 8 -3 -1 3 Z" />
      </g>
    </svg>
  )
}

export default function Birds() {
  return (
    <div className="birds" aria-hidden="true">
      {BIRDS.map((b, i) => (
        <div
          key={i}
          className="bird"
          style={{
            '--top': b.top,
            '--size': b.size,
            '--dur': `${b.dur}s`,
            '--delay': `${b.delay}s`,
            '--op': b.op,
          }}
        >
          <div
            className="bird__inner"
            style={{ '--bob': `${b.bob}px`, '--bobdur': `${b.bobdur}s` }}
          >
            <div style={{ '--flap': `${b.flap}s` }}>
              <BirdShape />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
