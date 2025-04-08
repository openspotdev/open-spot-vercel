"use client";

import { useMemo, Suspense } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L, { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import { Button } from "@/components/ui/button";
import { useRadiusStore } from "@/lib/stores/radius-store";
import { useLocationStore } from "@/lib/stores/location-store";

import SpotCard from "@/components/open-spot/spots/spot-card-map";

interface MapViewProps {
  latitude: string;
  longitude: string;
  spots: Spot[];
}

interface Spot {
  place_id: string;
  name: string;
  vicinity: string;
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
}

const customIcon = L.icon({ iconUrl: "/location.png", iconSize: [48, 48] });
const userLocationIcon = L.icon({
  iconUrl: "/user-location.png",
  iconSize: [64, 64],
});

const calculateZoomLevel = (radius: number): number => {
  // Constants for zoom calculation
  const MIN_ZOOM = 9.6;
  const MAX_ZOOM = 12.2;
  const MIN_RADIUS = 10; // km
  const MAX_RADIUS = 24; // km

  // Calculate zoom level based on radius
  // The formula is: zoom = MAX_ZOOM - (radius - MIN_RADIUS) * (MAX_ZOOM - MIN_ZOOM) / (MAX_RADIUS - MIN_RADIUS)
  const zoom =
    MAX_ZOOM -
    ((radius - MIN_RADIUS) * (MAX_ZOOM - MIN_ZOOM)) / (MAX_RADIUS - MIN_RADIUS);

  // Ensure zoom level stays within bounds
  return Math.min(Math.max(zoom, MIN_ZOOM), MAX_ZOOM);
};

const MapView: React.FC<MapViewProps> = ({ latitude, longitude, spots }) => {
  const center = useMemo(
    () => [Number(latitude), Number(longitude)] as LatLngExpression,
    [latitude, longitude]
  );

  const radius = useRadiusStore((state) => state.radius);

  const zoomLevel = useMemo(() => calculateZoomLevel(radius), [radius]);

  const tileLayer = useMemo(
    () => (
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        {...({} as any)}
      />
    ),
    []
  );

  const userLocationMarker = useMemo(
    () => (
      <Marker
        key={`user-location-${latitude}-${longitude}`}
        position={center}
        icon={userLocationIcon}
        {...({} as any)}
      >
        <Popup>
          <article className="flex gap-2 flex-col p-2">
            <h3 className="font-bold text-sm">Your Location</h3>
            <p className="text-xs text-gray-600">
              {latitude}, {longitude}
            </p>
          </article>
        </Popup>
      </Marker>
    ),
    [latitude, longitude, center]
  );

  return (
    <div className="h-[65vh] md:h-[70vh] rounded-lg overflow-hidden shadow-lg">
      <Suspense key={crypto.randomUUID()} fallback={<>Loading map...</>}>
        <MapContainer
          center={center}
          zoom={zoomLevel}
          style={{ height: "100%", width: "100%" }}
          zoomControl={true}
          className="z-0"
          {...({} as any)}
        >
          {tileLayer}
          {userLocationMarker}

          {spots.map((spot) => (
            <Marker
              key={spot.place_id}
              position={
                [
                  spot?.geometry?.location?.lat,
                  spot?.geometry?.location?.lng,
                ] as LatLngExpression
              }
              icon={customIcon}
              {...({} as any)}
            >
              <Popup>
                <SpotCard
                  guid={spot.place_id}
                  name={spot?.name || "Unknown"}
                  country={"Colombia"}
                  city={"Bogotá"}
                  state={"Cundinamarca"}
                  latitude={spot?.geometry.location.lat.toString()}
                  longitude={spot?.geometry.location.lng.toString()}
                  language={"es"}
                  selected={false}
                  type={"spot"}
                />
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </Suspense>
    </div>
  );
};

export default MapView;
