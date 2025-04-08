"use client";

import { useEffect } from "react";
import { useLocationStore } from "@/lib/stores/location-store";

export function LocationInitializer() {
  const { initializeGeolocation } = useLocationStore();

  useEffect(() => {
    // Initialize geolocation only on the client
    initializeGeolocation();
  }, [initializeGeolocation]);

  // This component doesn't render anything
  return null;
}
