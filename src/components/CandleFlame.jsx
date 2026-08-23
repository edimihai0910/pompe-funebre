import './CandleFlame.css'

/**
 * CandleFlame — lumanare cu flacara animata (CSS pur, bucla ~9s, fara sunet).
 * Se aseaza in prim-plan, jos-centru, peste imaginea hero.
 */
export default function CandleFlame() {
  return (
    <div className="candle" aria-hidden="true">
      <div className="flame__glow" />
      <div className="flame" />
      <div className="flame__core" />
      <div className="candle__body">
        <span className="candle__rim" />
        <span className="candle__wick" />
      </div>
    </div>
  )
}
