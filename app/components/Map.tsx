"use client";

import { MapContainer, TileLayer, Marker, Tooltip } from "react-leaflet";
import type { LatLngTuple } from "leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
delete (L.Icon.Default.prototype as any)._getIconUrl;

/* Gold pin icon */
const goldIcon = L.icon({
  iconUrl: "/assets/images/media/download.svg",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

/* Locations */
const locations: {
  name: string;
  position: LatLngTuple;
}[] = [
  {
    name: "Continental Heights",
    position: [18.97811985503911, 72.83883567466287],
  },
  {
    name: "Continental Horizon",
    position: [18.975607855117634, 72.84052297466285],
  },
];

export default function Map() {
  return (
    <div className="relative w-full h-112.5 rounded-lg overflow-hidden">
      {/* Brand base color */}
      <div className="absolute inset-0 bg-secondary" />

      {/* Map */}
      <MapContainer
        center={[18.9769, 72.8397]}
        zoom={15}
        scrollWheelZoom={false}
        dragging={false}
        zoomControl={false}
        className="absolute inset-0 z-10"
      >
        {/* Clean, no-POI tiles */}
        <TileLayer
          attribution="&copy; OpenStreetMap contributors & CARTO"
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />

        {locations.map((loc) => (
          <Marker key={loc.name} position={loc.position} icon={goldIcon}>
            <Tooltip
              permanent
              direction="top"
              offset={[0, -28]}
              opacity={1}
              className="map-label"
            >
              {loc.name}
            </Tooltip>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
