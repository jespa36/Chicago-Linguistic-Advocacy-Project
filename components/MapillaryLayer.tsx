'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { useMap } from 'react-leaflet'
import L from 'leaflet'

function escapeHtml(text: string) {
  return text.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c] as string)
}

/** Mapillary only publishes sign and coverage features at zoom 14, so the layer waits until the map is that close. */
const MIN_ZOOM = 14

interface MapillaryLayerProps {
  showSigns: boolean
  showCoverage?: boolean
}

export default function MapillaryLayer({
  showSigns,
  showCoverage = false,
}: MapillaryLayerProps) {
  const map = useMap()
  const token = process.env.NEXT_PUBLIC_MAPILLARY_TOKEN
  const [zoom, setZoom] = useState(() => map.getZoom())
  const zoomOk = zoom >= MIN_ZOOM

  useEffect(() => {
    const onZoom = () => setZoom(map.getZoom())
    map.on('zoomend', onZoom)
    return () => {
      map.off('zoomend', onZoom)
    }
  }, [map])

  useEffect(() => {
    if (!token || !zoomOk || (!showSigns && !showCoverage)) return
    if (!map || !map.getContainer()) return

    let active = true
    const layers: L.Layer[] = []

    async function mountVectorLayers() {
      try {
        await import('leaflet.vectorgrid')
        if (!active || !map.getContainer()) return

        const vectorGrid = (L as unknown as { vectorGrid?: { protobuf: Function } })
          .vectorGrid
        if (!vectorGrid) return

        if (showCoverage) {
          const coverageLayer = vectorGrid.protobuf(
            `https://tiles.mapillary.com/maps/vtp/mly1_public/2/{z}/{x}/{y}?access_token=${token}`,
            {
              minNativeZoom: 14,
              maxNativeZoom: 14,
              maxZoom: 20,
              vectorTileLayerStyles: {
                sequence: () => ({
                  color: '#05cb63',
                  weight: 2,
                  opacity: 0.45,
                }),
                image: () => ({
                  radius: 3,
                  fill: true,
                  fillColor: '#05cb63',
                  fillOpacity: 0.7,
                  stroke: true,
                  color: '#047857',
                  weight: 1,
                  opacity: 0.7,
                }),
              },
            }
          )
          coverageLayer.addTo(map)
          layers.push(coverageLayer)
        }

        if (showSigns) {
          const signsLayer = vectorGrid.protobuf(
            `https://tiles.mapillary.com/maps/vtp/mly_map_feature_traffic_sign/2/{z}/{x}/{y}?access_token=${token}`,
            {
              minNativeZoom: 14,
              maxNativeZoom: 14,
              maxZoom: 20,
              interactive: true,
              vectorTileLayerStyles: {
                // Mapillary names the layer inside these tiles "traffic_sign".
                traffic_sign: () => ({
                  radius: 4,
                  fill: true,
                  fillColor: '#f59e0b',
                  fillOpacity: 0.9,
                  stroke: true,
                  color: '#78350f',
                  weight: 1,
                  opacity: 1,
                }),
              },
            }
          )

          signsLayer.on(
            'click',
            (e: { latlng: L.LatLng; layer?: { properties?: Record<string, string> } }) => {
              const props = e.layer?.properties || {}
              const signType = escapeHtml(String(props.value || 'traffic-sign').replaceAll('--', ' · '))
              L.popup()
                .setLatLng(e.latlng)
                .setContent(
                  `<div style="font-size:12px;line-height:1.4">
                    <strong>Mapillary Detected Sign</strong><br/>
                    <span>Type: ${signType}</span><br/>
                    <span style="color:#6b7280">Top-down municipal/street sign layer</span>
                  </div>`
                )
                .openOn(map)
            }
          )

          signsLayer.addTo(map)
          layers.push(signsLayer)
        }
      } catch (err) {
        console.error('Mapillary layer failed to mount:', err)
      }
    }

    mountVectorLayers()

    return () => {
      active = false
      layers.forEach((layer) => {
        try {
          if (map && map.hasLayer(layer)) {
            map.removeLayer(layer)
          }
        } catch {}
      })
    }
  }, [map, token, zoomOk, showSigns, showCoverage])

  if (!showSigns && !showCoverage) return null
  const notice = !token
    ? 'The Mapillary layer is off: this build has no Mapillary token.'
    : !zoomOk
      ? `Zoom in closer to see Mapillary signs (zoom ${Math.round(zoom)}, needs ${MIN_ZOOM} or more).`
      : null
  if (!notice) return null
  return createPortal(
    <div
      role="status"
      style={{
        position: 'absolute',
        top: 12,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 1000,
        background: 'rgba(11,34,51,0.92)',
        color: '#fff',
        padding: '6px 12px',
        fontSize: 13,
        borderRadius: 4,
        pointerEvents: 'none',
        maxWidth: '90%',
        textAlign: 'center',
      }}
    >
      {notice}
    </div>,
    map.getContainer(),
  )
}