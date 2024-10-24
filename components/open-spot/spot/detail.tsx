"use client";

import { useRouter } from "next/navigation";
import { useSpotById, useDeleteSpot } from "@/lib/hooks/useSpotsRepository";
import MapViewTW from "@/components/open-spot/spot/map-view";

import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  MapPin,
  Globe,
  Building2,
  Navigation,
  Map,
  Trash2,
} from "lucide-react";

export const Detail = ({ guid }: { guid: string }) => {
  const router = useRouter();
  const { data: spot, isLoading, error } = useSpotById(guid);
  const { mutate: deleteSpot, isPending: isDeleting } = useDeleteSpot();

  const handleDelete = async () => {
    try {
      await deleteSpot(guid);
    } catch (error) {
      console.error("Error deleting spot:", error);
    }
    router.push("/spots");
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-8 w-3/4" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-full mb-2" />
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error.message}</AlertDescription>
      </Alert>
    );
  }

  if (!spot) {
    return (
      <Alert>
        <AlertTitle>Not Found</AlertTitle>
        <AlertDescription>Spot not found</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="relative h-screen">
      <Card
        className="absolute z-10 w-[90vw] md:w-[25vw] bg-white/40 backdrop-blur-sm shadow-lg
                   left-1/2 -translate-x-1/2 top-2 md:top-10
                   md:left-auto md:right-10 md:translate-x-0"
      >
        <CardHeader>
          <CardTitle>{spot.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-row gap-2">
            <div className="flex items-center">
              <Globe className="mr-2 h-4 w-4" />
              <span>{spot.country}</span>
            </div>
            <div className="flex items-center">
              <Building2 className="mr-2 h-4 w-4" />
              <span>{spot.state}</span>
            </div>
            <div className="flex items-center">
              <MapPin className="mr-2 h-4 w-4" />
              <span>{spot.city}</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            size="sm"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            {isDeleting ? "Borrando..." : "Borrar"}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              window.open(
                `https://www.waze.com/ul?ll=${spot.latitude},${spot.longitude}&navigate=yes`,
                "_blank"
              )
            }
          >
            <Navigation className="mr-2 h-4 w-4" />
            Waze
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              window.open(
                `https://www.google.com/maps/search/?api=1&query=${spot.latitude},${spot.longitude}`,
                "_blank"
              )
            }
          >
            <Map className="mr-2 h-4 w-4" />G Maps
          </Button>
        </CardFooter>
      </Card>

      <div className="h-full w-full">
        <MapViewTW
          latitude={spot.latitude.toString()}
          longitude={spot.longitude.toString()}
        />
      </div>
    </div>
  );
};
