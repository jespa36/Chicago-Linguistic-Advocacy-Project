import type { FeatureCollection, MultiPolygon, Polygon } from 'geojson'
import boundaries from '@/lib/community-areas.json'

const FC = boundaries as FeatureCollection<Polygon | MultiPolygon, { id: number; name: string }>

type Ring = number[][]

function inRing(lng: number, lat: number, ring: Ring): boolean {
  let inside = false
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const [xi, yi] = ring[i]
    const [xj, yj] = ring[j]
    if (yi > lat !== yj > lat && lng < ((xj - xi) * (lat - yi)) / (yj - yi) + xi) inside = !inside
  }
  return inside
}

function inPolygon(lng: number, lat: number, rings: Ring[]): boolean {
  if (!inRing(lng, lat, rings[0])) return false
  for (let k = 1; k < rings.length; k++) if (inRing(lng, lat, rings[k])) return false
  return true
}

/** Returns the community area id (1–77) containing the point, or null if outside Chicago. */
export function areaAt(lat: number, lng: number): number | null {
  for (const f of FC.features) {
    const g = f.geometry
    const polys = g.type === 'Polygon' ? [g.coordinates] : g.coordinates
    if (polys.some((p) => inPolygon(lng, lat, p as Ring[]))) return f.properties.id
  }
  return null
}

export function areaName(id: number | null): string | null {
  if (id === null) return null
  return FC.features.find((f) => f.properties.id === id)?.properties.name ?? null
}
