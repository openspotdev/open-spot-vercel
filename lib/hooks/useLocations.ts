"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getNearestSpotByLocation } from "../data/spots";
import { useRadiusStore } from "../stores/radius-store";
import { useLocationStore } from "../stores/location-store";

export interface Spot {
  guid: string;
  name: string;
  latitude: string;
  longitude: string;
  country: string;
  state: string;
  city: string;
  selected: boolean;
  type: string;
  language?: string;
}

const STORAGE_KEY = "spots";

const getNearSpots = ({ latitude, longitude, radius }): Spot[] => {
  try {
    const storedSpots = localStorage.getItem(STORAGE_KEY);
    return storedSpots ? JSON.parse(storedSpots) : [];
  } catch (error) {
    console.error("Error retrieving spots from localStorage:", error);
    return [];
  }
};

export const useNearSpots = () => {
  const radius = useRadiusStore((state) => state.radius);
  const location = useLocationStore((state) => state.location);

  return useQuery<Spot[], Error>({
    queryKey: ["spots", radius, location],
    queryFn: () => {
      if (!location) return [];
      return Promise.resolve(
        getNearSpots({
          latitude: location.lat,
          longitude: location.lng,
          radius,
        })
      );
    },
    enabled: !!location,
  });
};
