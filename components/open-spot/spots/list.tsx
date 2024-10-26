"use client";

import React from "react";
import SpotCard from "./spot-card";

import { useSpots, useDeleteSpot, Spot } from "@/lib/hooks/useSpotsRepository";

export default function List() {
  const { data: spots, isLoading, isError } = useSpots();
  const deleteSpotMutation = useDeleteSpot();

  const handleDelete = (guid: string) => {
    deleteSpotMutation.mutate(guid);
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading spots</div>;
  const reversed = spots.reduce((acc, item) => [item].concat(acc), []);
  return (
    <div className="space-y-4">
      {reversed?.map((spot: Spot) => (
        <SpotCard key={spot.guid} {...spot} />
      ))}
    </div>
  );
}
