"use client";

import { useMemo } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
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

const MapViewTW: React.FC<MapViewTWProps> = ({ latitude, longitude }) => {
  const tileLayer = useMemo(
    () => (
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        {...({} as any)} // This is a workaround for potential type issues
      />
    ),
    []
  );

  const memoizedMarker = useMemo(
    () => (
      <Marker
        key={`${latitude}-${longitude}`}
        position={[Number(latitude), Number(longitude)]}
        icon={customIcon}
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
    <div className="h-[72vh] rounded-lg overflow-hidden shadow-lg">
      <MapContainer
        center={[Number(latitude), Number(longitude)]}
        zoom={12}
        style={{ height: "100%", width: "100%" }}
        zoomControl={false}
        className="z-0"
      >
        {tileLayer}
        {memoizedMarker}
      </MapContainer>
    </div>
  );
};

export default MapViewTW;
