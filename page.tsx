"use client"

import { useEffect } from "react"
import mapboxgl from "mapbox-gl"

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX!

export default function Home() {
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/light-v11",
      center: [-77.5, 40.8],
      zoom: 6
    })

    fetch("/api/firms")
      .then(res => res.json())
      .then(data => {
        data.forEach((firm:any) => {
          if (firm.geom?.coordinates) {
            new mapboxgl.Marker()
              .setLngLat([
                firm.geom.coordinates[0],
                firm.geom.coordinates[1]
              ])
              .addTo(map)
          }
        })
      })
  }, [])

  return <div id="map" style={{ height: "100vh" }} />
}
