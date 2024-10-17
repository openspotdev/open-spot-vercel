"use client";

import { useEffect, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Spot {
  guid: string;
  name: string;
  // Add other properties as needed
}

export default function SpotsList() {
  const [spots, setSpots] = useState<Spot[]>([]);

  const loadSpots = useCallback(() => {
    const storedSpots = localStorage.getItem("spots");
    setSpots(storedSpots ? JSON.parse(storedSpots) : []);
  }, []);

  useEffect(() => {
    loadSpots();
  }, [loadSpots]);

  const handleDelete = useCallback(
    (guid: string) => {
      const updatedSpots = spots.filter((spot) => spot.guid !== guid);
      localStorage.setItem("spots", JSON.stringify(updatedSpots));
      setSpots(updatedSpots);
    },
    [spots]
  );

  const handleDetail = useCallback((guid: string) => {
    // Implement detail view logic here
    console.log(`Showing details for spot with GUID: ${guid}`);
  }, []);

  if (spots.length === 0) {
    return <p>No spots available.</p>;
  }

  return (
    <div className="flex flex-col gap-2">
      {spots.map((spot) => (
        <SpotCard
          key={spot.guid}
          spot={spot}
          onDelete={handleDelete}
          onDetail={handleDetail}
        />
      ))}
    </div>
  );
}

interface SpotCardProps {
  spot: Spot;
  onDelete: (guid: string) => void;
  onDetail: (guid: string) => void;
}

const SpotCard: React.FC<SpotCardProps> = ({ spot, onDelete, onDetail }) => (
  <Card>
    <CardHeader>
      <CardTitle>{spot.name}</CardTitle>
      <CardDescription>View or manage this spot.</CardDescription>
    </CardHeader>
    <CardContent>{/* Add more spot details here if needed */}</CardContent>
    <CardFooter className="flex justify-between">
      <Button variant="outline" onClick={() => onDelete(spot.guid)}>
        Delete
      </Button>
      <Button onClick={() => onDetail(spot.guid)}>Detail</Button>
    </CardFooter>
  </Card>
);
