import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

import { Spot } from "@/lib/hooks/useSpotsRepository";
import { CurrentForecast } from "@/components/open-spot/spots/current-forecast-near";
import DeleteSpot from "@/components/open-spot/delete-spot";
import { ShareButton } from "@/components/open-spot/share-button";
import { WazeButton } from "@/components/open-spot/waze-button";
import { GMapsButton } from "@/components/open-spot/gmaps-button";
import { getSpotDistanceByLocation } from "@/lib/data/spots";
import { useQuery } from "@tanstack/react-query";
import { useLocationStore } from "@/lib/stores/location-store";
import { Loader2 } from "lucide-react";

interface DistanceResponse {
  distance: string;
}

export default function SpotCard({
  guid,
  name,
  country,
  city,
  state,
  latitude,
  longitude,
  language,
}: Spot) {
  const {
    location,
    error: locationError,
    isLoading: isLoadingLocation,
  } = useLocationStore();

  const {
    data: distance,
    isLoading: isLoadingDistance,
    error: distanceError,
  } = useQuery<DistanceResponse>({
    queryKey: ["spot-distance", latitude, longitude],
    queryFn: async () => {
      const response = await getSpotDistanceByLocation({
        latitude1: location.lat.toString(),
        longitude1: location.lng.toString(),
        latitude2: latitude.toString(),
        longitude2: longitude.toString(),
      });
      return response as DistanceResponse;
    },
    enabled: !!latitude && !!longitude,
  });

  return (
    <div className="group relative flex flex-col w-full min-w-[90vw] md:min-w-[18vw] bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100">
      {/* Header Section */}
      <div className="px-3 py-2 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
        <div className="flex items-center gap-1.5 text-gray-500">
          <span className="icon-[duo-icons--location] w-3.5 h-3.5 text-gray-400"></span>
          <span className="text-[11px] truncate">
            {city}, {state}, {country}
          </span>
        </div>
        <h3 className="text-sm font-semibold text-gray-900 truncate">{name}</h3>
      </div>

      <div className="px-3 py-2 bg-gradient-to-b from-white to-gray-50">
        <div className="flex items-center justify-between gap-2">
          <div className="flex-1 min-w-0">
            <Link
              href={{
                pathname: `/spot/${guid}`,
                query: {
                  name: name,
                  lat: latitude,
                  lon: longitude,
                  lan: language,
                },
              }}
              className="block"
            >
              <CurrentForecast
                guid={guid}
                latitude={latitude}
                longitude={longitude}
              />
            </Link>
          </div>
        </div>
      </div>

      {/* Distance Section */}
      {!isLoadingDistance && distance?.distance && (
        <div className="py-1.5 bg-gray-50 border-b border-gray-100">
          <div className="flex items-center justify-center gap-1.5 text-xs text-gray-600">
            <span className="icon-[duo-icons--distance] w-3.5 h-3.5 text-gray-400"></span>
            <span>Distancia: {distance.distance}</span>
            <div className="flex items-center gap-1">
              <GMapsButton
                guid={guid}
                latitude={latitude}
                longitude={longitude}
              />
              <WazeButton
                guid={guid}
                latitude={latitude}
                longitude={longitude}
              />
              <ShareButton guid={guid} />
              <DeleteSpot guid={guid} />
            </div>
          </div>
        </div>
      )}

      {/* Loading State for Distance */}
      {isLoadingDistance && (
        <div className="px-3 py-1.5 bg-gray-50 border-b border-gray-100">
          <div className="flex items-center justify-center gap-1.5 text-xs text-gray-500">
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
            <span>Calculando...</span>
          </div>
        </div>
      )}
    </div>
  );
}
