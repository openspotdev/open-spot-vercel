"use client";

import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getNearestSpotByLocation } from "@/lib/data/spots";
import LocationAutocomplete from "@/components/open-spot/spots/location-autocomplete";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { useRadiusStore } from "@/lib/stores/radius-store";
import { useLocationStore } from "@/lib/stores/location-store";
import MapView from "@/components/open-spot/spots/map-view";
import DistanceSlider from "./distance-slider";
import { PostVisits } from "@/lib/actions/visits";

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

type SpotsResponse =
  | { spots: Spot[] }
  | { data: Spot[]; error: string }
  | { data: Spot[] }
  | Spot[];

const MapWithSpots = ({
  location,
}: {
  location: { lat: number; lng: number };
  radius: number;
}) => {
  const { radius } = useRadiusStore();
  const { data: spotsData, isLoading } = useQuery<SpotsResponse>({
    queryKey: ["spot-nearest-map", location, radius],
    queryFn: async () => {
      if (!location) return { data: [] };
      const response = await getNearestSpotByLocation({
        latitude: location.lat,
        longitude: location.lng,
        radius: radius * 1000,
      });
      return response;
    },
    enabled: !!location?.lat && !!location?.lng,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8 h-[70vh]">
        <Loader2 className="h-32 w-32 animate-spin text-primary" />
      </div>
    );
  }

  const spots = Array.isArray(spotsData)
    ? spotsData
    : "spots" in spotsData
    ? spotsData.spots
    : "data" in spotsData
    ? spotsData.data
    : [];

  return (
    <MapView
      latitude={location.lat.toString()}
      longitude={location.lng.toString()}
      spots={spots}
    />
  );
};

export default function NearSpots() {
  const { radius } = useRadiusStore();
  const {
    location,
    error: locationError,
    isLoading: isLoadingLocation,
    initializeGeolocation,
  } = useLocationStore();

  // Initialize geolocation on component mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      initializeGeolocation();
    }
  }, [initializeGeolocation]);

  // Post location data to visits API when location is available
  useEffect(() => {
    if (location) {
      const postLocationData = async () => {
        try {
          const body = JSON.stringify({
            latitude: location.lat,
            longitude: location.lng,
          });
          await PostVisits({ body });
        } catch (error) {
          console.error("Failed to post visit data:", error);
        }
      };

      postLocationData();
    }
  }, [location]);

  if (isLoadingLocation) {
    return (
      <div className="flex items-center justify-center p-8 h-[70vh]">
        <Loader2 className="h-32 w-32 animate-spin text-primary" />
      </div>
    );
  }

  if (locationError) {
    return (
      <div className="space-y-4 p-4">
        <Card className="m-4">
          <CardContent className="p-4 text-destructive">
            {locationError}
          </CardContent>
        </Card>
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-4">Search spots manually</h3>
          <LocationAutocomplete />
        </div>
      </div>
    );
  }

  if (!location) {
    return (
      <Card className="m-4">
        <CardContent className="p-4">
          <p className="text-muted-foreground">Getting your location...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4 p-4">
      <MapWithSpots location={location} radius={radius} />
      <div className="p-2">
        <DistanceSlider />
        <LocationAutocomplete />
      </div>
    </div>
  );
}
