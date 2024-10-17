"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";
// import { Label } from "@/components/ui/label";

export default function SpotsList() {
  const [spots, setSpots] = useState([]);
  useEffect(() => {
    const strJson = localStorage.getItem("spots");
    if (!strJson) setSpots([]);
    const list = JSON.parse(strJson);
    setSpots(list);
  }, []);

  const handleDelete = (guid: string) => {
    const strJson = localStorage.getItem("spots");
    if (!strJson) return;
    const listOld = JSON.parse(strJson);
    const list = listOld.filter((item) => item.guid !== guid);
    localStorage.setItem("spots", JSON.stringify(list));
    setSpots(list);
  };

  return (
    <div className="flex flex-col gap-2">
      {spots?.map((spot) => (
        <Card key={spot.guid}>
          <CardHeader>
            <CardTitle>{spot.name}</CardTitle>
            <CardDescription>
              Deploy your new project in one-click.
            </CardDescription>
          </CardHeader>
          <CardContent></CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => handleDelete(spot.guid)}>
              Delete
            </Button>
            <Button>Detail</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
