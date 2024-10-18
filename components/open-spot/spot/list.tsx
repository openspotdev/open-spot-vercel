"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useSpots, useDeleteSpot, Spot } from "@/lib/hooks/useSpotsRepository";
import { Label } from "@/components/ui/label";

const List: React.FC = () => {
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
        <Card key={spot.guid}>
          <CardHeader>
            <CardTitle>{spot.name}</CardTitle>
            {/* <CardDescription>View or manage this spot.</CardDescription> */}
          </CardHeader>
          <CardContent className="flex gap-8">
            <Label>{spot.country}</Label>
            <Label>{spot.state}</Label>
            <Label>{spot.city}</Label>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => handleDelete(spot.guid)}>
              Delete
            </Button>
            <Button onClick={() => handleDetail(spot.guid)}>Detail</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default List;
