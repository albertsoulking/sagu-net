import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet'
import L from 'leaflet'
import { useMemo } from 'react'

const defaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
})
L.Marker.prototype.options.icon = defaultIcon

const FALLBACK_CENTER: [number, number] = [21.9588, 96.0891]

function isValidCoord(lat?: number, lng?: number): lat is number {
  return lat != null && lng != null && Number.isFinite(lat) && Number.isFinite(lng)
}

interface MapViewProps {
  center?: [number, number]
  zoom?: number
  markers?: { lat: number; lng: number; label: string }[]
  onClick?: (lat: number, lng: number) => void
  height?: string
  /** If true and coordinates are missing, show a subtle message below the map container (caller can also wrap). */
  showNoCoordsHint?: boolean
}

function ClickHandler({ onClick }: { onClick?: (lat: number, lng: number) => void }) {
  useMapEvents({
    click(e) {
      onClick?.(e.latlng.lat, e.latlng.lng)
    },
  })
  return null
}

export function MapView({
  center: centerProp,
  zoom: zoomProp,
  markers = [],
  onClick,
  height = '300px',
  showNoCoordsHint = true,
}: MapViewProps) {
  const primary = markers[0]
  const hasValidPrimary = primary ? isValidCoord(primary.lat, primary.lng) : false

  const { center, zoom, safeMarkers } = useMemo(() => {
    if (centerProp && isValidCoord(centerProp[0], centerProp[1])) {
      return {
        center: centerProp,
        zoom: zoomProp ?? (markers.length ? 14 : 12),
        safeMarkers: markers.filter((m) => isValidCoord(m.lat, m.lng)),
      }
    }
    if (hasValidPrimary) {
      return {
        center: [primary!.lat, primary!.lng] as [number, number],
        zoom: zoomProp ?? 14,
        safeMarkers: markers.filter((m) => isValidCoord(m.lat, m.lng)),
      }
    }
    return {
      center: FALLBACK_CENTER,
      zoom: zoomProp ?? 11,
      safeMarkers: markers.filter((m) => isValidCoord(m.lat, m.lng)),
    }
  }, [centerProp, zoomProp, markers, hasValidPrimary, primary])

  const showHint = showNoCoordsHint && !hasValidPrimary && !centerProp && safeMarkers.length === 0

  return (
    <>
      <div className="relative z-0 block isolate overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-700" style={{ height }}>
        <MapContainer center={center} zoom={zoom} style={{ height: '100%', width: '100%' }}>
          <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {onClick && <ClickHandler onClick={onClick} />}
          {safeMarkers.map((m, i) => (
            <Marker key={`${m.lat}-${m.lng}-${i}`} position={[m.lat, m.lng]}>
              <Popup>{m.label}</Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
      {showHint && (
        <p className="mt-2 text-xs text-slate-500">No installation coordinates on file. Map shows default area.</p>
      )}
    </>
  )
}
