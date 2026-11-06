'use client'

import 'leaflet/dist/leaflet.css'
import { CircleMarker, MapContainer, TileLayer, useMapEvents } from 'react-leaflet'

type Props = {
  value: { lat: number; lng: number } | null
  onChange: (p: { lat: number; lng: number }) => void
}

function ClickHandler({ onChange }: Pick<Props, 'onChange'>) {
  useMapEvents({ click: (e) => onChange({ lat: e.latlng.lat, lng: e.latlng.lng }) })
  return null
}

/** Small map for placing the pin where the sign is. */
export default function PinPicker({ value, onChange }: Props) {
  return (
    <MapContainer
      center={value ? [value.lat, value.lng] : [41.85, -87.68]}
      zoom={value ? 16 : 10.5}
      zoomSnap={0.5}
      minZoom={10}
      maxZoom={18}
      className="h-72 w-full rounded-lg border border-border"
      key={value ? 'pinned' : 'empty'}
    >
      <TileLayer
        url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}"
        attribution="Basemap &copy; Esri, HERE, Garmin, OpenStreetMap contributors"
        maxNativeZoom={18}
      />
      <ClickHandler onChange={onChange} />
      {value && (
        <CircleMarker
          center={[value.lat, value.lng]}
          radius={9}
          pathOptions={{ color: '#fff', weight: 3, fillColor: '#e4002b', fillOpacity: 1 }}
        />
      )}
    </MapContainer>
  )
}
