import { useEffect, useRef, useState } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { BUSINESS } from '../data/content'
import { setConsent, useConsent } from '../hooks/useConsent'

// Pin tematic (divIcon — fara imagini externe, deci nu se strica la build)
function pinIcon(color = '#7C5C33') {
  return L.divIcon({
    className: 'cf-pin',
    html: `
      <svg width="38" height="50" viewBox="0 0 38 50" xmlns="http://www.w3.org/2000/svg">
        <path d="M19 1C9.6 1 2 8.6 2 18c0 12 17 30 17 30s17-18 17-30C36 8.6 28.4 1 19 1z"
              fill="${color}" stroke="#F6F1E8" stroke-width="2"/>
        <circle cx="19" cy="18" r="6.5" fill="#F6F1E8"/>
      </svg>`,
    iconSize: [38, 50],
    iconAnchor: [19, 48],
    popupAnchor: [0, -42],
  })
}

function meIcon() {
  return L.divIcon({
    className: 'cf-pin-me',
    html: `<span class="cf-me-dot"></span>`,
    iconSize: [22, 22],
    iconAnchor: [11, 11],
  })
}

// Distanta Haversine (km)
function distanceKm(a, b) {
  const R = 6371
  const dLat = ((b.lat - a.lat) * Math.PI) / 180
  const dLng = ((b.lng - a.lng) * Math.PI) / 180
  const lat1 = (a.lat * Math.PI) / 180
  const lat2 = (b.lat * Math.PI) / 180
  const h =
    Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2
  return 2 * R * Math.asin(Math.sqrt(h))
}

export default function MapView() {
  const elRef = useRef(null)
  const mapRef = useRef(null)
  const meMarkerRef = useRef(null)
  const [geo, setGeo] = useState({ status: 'idle', text: '' })
  // Harta vine de la un tert (OpenStreetMap) — se incarca doar cu acordul vizitatorului
  const allowed = useConsent()?.external === true

  useEffect(() => {
    if (!allowed || mapRef.current || !elRef.current) return

    const { lat, lng } = BUSINESS.coords
    const map = L.map(elRef.current, {
      center: [lat, lng],
      zoom: 16,
      scrollWheelZoom: false,
      attributionControl: true,
    })
    mapRef.current = map

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; OpenStreetMap',
    }).addTo(map)

    L.marker([lat, lng], { icon: pinIcon() })
      .addTo(map)
      .bindPopup(
        `<strong style="font-family:Marcellus,serif">Cori&amp;Flo Ogrezeni</strong><br>${BUSINESS.address}, ${BUSINESS.city}`,
      )
      .openPopup()

    // Reactiveaza scroll-zoom doar dupa click (nu fura scroll-ul paginii)
    map.on('click', () => map.scrollWheelZoom.enable())
    map.on('mouseout', () => map.scrollWheelZoom.disable())

    // Recalculeaza dimensiunea dupa montare (fix pentru randare in grid)
    let cancelled = false
    const sizeTimer = setTimeout(() => {
      if (!cancelled && mapRef.current === map) map.invalidateSize()
    }, 200)

    return () => {
      cancelled = true
      clearTimeout(sizeTimer)
      map.remove()
      mapRef.current = null
      meMarkerRef.current = null
      setGeo({ status: 'idle', text: '' })
    }
  }, [allowed])

  const locateMe = () => {
    if (!('geolocation' in navigator)) {
      setGeo({ status: 'error', text: 'Geolocația nu este disponibilă pe acest dispozitiv.' })
      return
    }
    setGeo({ status: 'loading', text: 'Se caută locația dumneavoastră…' })
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const me = { lat: position.coords.latitude, lng: position.coords.longitude }
        const map = mapRef.current
        if (!map) return

        if (meMarkerRef.current) meMarkerRef.current.remove()
        meMarkerRef.current = L.marker([me.lat, me.lng], { icon: meIcon() })
          .addTo(map)
          .bindPopup('Locația dumneavoastră')

        const b = BUSINESS.coords
        map.fitBounds(
          [
            [b.lat, b.lng],
            [me.lat, me.lng],
          ],
          { padding: [60, 60], maxZoom: 16 },
        )
        const d = distanceKm(me, b)
        setGeo({
          status: 'done',
          text: `Vă aflați la aproximativ ${d.toFixed(d < 10 ? 1 : 0)} km de sediul nostru.`,
        })
      },
      () => {
        setGeo({
          status: 'error',
          text: 'Nu am putut prelua locația. Verificați permisiunea de localizare din browser.',
        })
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 },
    )
  }

  if (!allowed) {
    return (
      <div className="mapwrap">
        <div className="map map--locked">
          <svg width="38" height="50" viewBox="0 0 38 50" aria-hidden="true">
            <path
              d="M19 1C9.6 1 2 8.6 2 18c0 12 17 30 17 30s17-18 17-30C36 8.6 28.4 1 19 1z"
              fill="#7C5C33"
              stroke="#F6F1E8"
              strokeWidth="2"
            />
            <circle cx="19" cy="18" r="6.5" fill="#F6F1E8" />
          </svg>
          <p className="map__card-name">Cori&amp;Flo Ogrezeni</p>
          <p className="map__card-addr">
            {BUSINESS.address}, {BUSINESS.city}
          </p>
          <button className="map__show" onClick={() => setConsent(true)}>
            Afișează harta
          </button>
          <p className="map__locked-note">
            Harta este încărcată de la OpenStreetMap, un serviciu extern care primește astfel
            adresa IP a dispozitivului. <a href="#politica-cookies">Detalii</a>
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="mapwrap">
      <div ref={elRef} className="map" aria-label="Hartă — sediul Cori&Flo, Strada Principală 238, Ogrezeni" />

      <div className="map__card">
        <p className="map__card-name">Cori&amp;Flo Ogrezeni</p>
        <p className="map__card-addr">{BUSINESS.address}</p>
      </div>

      <button className="map__locate" onClick={locateMe} disabled={geo.status === 'loading'}>
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="3.2" fill="currentColor" />
          <circle cx="12" cy="12" r="7.5" stroke="currentColor" strokeWidth="1.6" />
          <line x1="12" y1="1.5" x2="12" y2="4.5" stroke="currentColor" strokeWidth="1.6" />
          <line x1="12" y1="19.5" x2="12" y2="22.5" stroke="currentColor" strokeWidth="1.6" />
          <line x1="1.5" y1="12" x2="4.5" y2="12" stroke="currentColor" strokeWidth="1.6" />
          <line x1="19.5" y1="12" x2="22.5" y2="12" stroke="currentColor" strokeWidth="1.6" />
        </svg>
        {geo.status === 'loading' ? 'Se localizează…' : 'Arată unde sunt eu'}
      </button>

      {geo.text && (
        <p className={`map__geo map__geo--${geo.status}`} role="status">
          {geo.text}
        </p>
      )}
    </div>
  )
}
