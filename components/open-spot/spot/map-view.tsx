"use client";

import { useMemo, Suspense } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L, { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import { Button } from "@/components/ui/button";

interface MapViewTWProps {
  latitude: string;
  longitude: string;
}
const customIcon = L.icon({ iconUrl: "/location.png", iconSize: [48, 48] });

const PopupButton = () => (
  <Button className="w-full capitalize bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded transition-colors duration-300">
    See more
  </Button>
);

const MapView: React.FC<MapViewTWProps> = ({ latitude, longitude }) => {
  console.log({ latitude, longitude });

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

  const memoizedMarker = useMemo(
    () => (
      <Marker
        key={`${latitude}-${longitude}`}
        position={[Number(latitude), Number(longitude)] as LatLngExpression}
        icon={customIcon}
        {...({} as any)}
      >
        <Popup>
          <article className="flex gap-4 flex-col py-4">
            <PopupButton />
          </article>
        </Popup>
      </Marker>
    ),
    [latitude, longitude]
  );

  return (
    <div className="h-[80vh] md:h-[80vh] rounded-lg overflow-hidden shadow-lg">
      <Suspense key={crypto.randomUUID()} fallback={<>Loading....</>}>
        <MapContainer
          center={[Number(latitude), Number(longitude)] as LatLngExpression}
          zoom={12}
          style={{ height: "100%", width: "100%" }}
          zoomControl={false}
          className="z-0"
          {...({} as any)}
        >
          {tileLayer}
          {memoizedMarker}
        </MapContainer>
      </Suspense>
    </div>
  );
};

export default MapView;
