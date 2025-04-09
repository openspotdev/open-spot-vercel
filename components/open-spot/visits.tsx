"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getVisits } from "@/lib/data/spots";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, Users } from "lucide-react";
import { useLocationStore } from "@/lib/stores/location-store";

export const Visits = () => {
  const { location } = useLocationStore();

  const {
    data: visits,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["visits", location],
    queryFn: async () => {
      if (!location) return "0";
      const response = await getVisits({
        latitude: location.lat.toString(),
        longitude: location.lng.toString(),
      });
      return response.toString();
    },
    enabled: !!location?.lat && !!location?.lng,
  });

  if (isLoading) {
    return (
      <Card className="w-full">
        <CardContent className="flex items-center justify-center p-2">
          <Loader2 className="h-4 w-4 animate-spin text-primary" />
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="w-full">
        <CardContent className="p-2 text-destructive text-sm">
          Failed to load visits data
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-fit px-4">
      <CardContent className="p-2">
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium">Total Visits:</span>
          <span className="text-lg font-bold">{visits || "0"}</span>
          <span className="text-xs text-muted-foreground">
            people have visited
          </span>
        </div>
      </CardContent>
    </Card>
  );
};
