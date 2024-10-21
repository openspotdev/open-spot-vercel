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

  const handleDetail = (guid: string) => console.log("details");

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading spots</div>;

  return (
    <div className="space-y-4">
      {spots?.map((spot: Spot) => (
        <SpotCard key={spot.guid} {...spot} />
      ))}
    </div>
  );
}
