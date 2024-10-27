"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
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

import { useSpotById } from "@/lib/hooks/useSpotsRepository";
import { ShareButton } from "@/components/open-spot/share-button";
import { getSpotForecastByLocation } from "@/lib/data/spots";
import DeleteSpot from "@/components/open-spot/delete-spot";

export const LocationDetail = ({ guid }: { guid: string }) => {
  const router = useRouter();
  const {
    data: spot,
    isLoading: isLoadingSpot,
    error: spotError,
  } = useSpotById(guid);

  const {
    data: forecast,
    isLoading: isLoadingForecast,
    error: forecastError,
  } = useQuery({
    queryKey: ["spot-forecast", spot?.latitude, spot?.longitude],
    queryFn: async () => {
      if (!spot) return null;
      return await getSpotForecastByLocation({
        latitude: spot.latitude?.toString(),
        longitude: spot.longitude?.toString(),
      });
    },
    enabled: !!spot?.latitude && !!spot?.longitude,
  });

  if (isLoadingSpot || isLoadingForecast) {
    return <LoadingSkeleton />;
  }

  if (spotError || forecastError) router.back();

  if (!spot || !forecast) {
    return <NotFoundAlert />;
  }

  return <SpotDetails spot={spot} />;
};

const LoadingSkeleton = () => (
  <Card className="absolute z-10 w-[90vw] md:w-[25vw] bg-white/40 backdrop-blur-sm shadow-lg left-1/2 -translate-x-1/2 top-2 md:top-10 md:left-auto md:right-10 md:translate-x-0">
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

const ErrorAlert = ({ error }) => (
  <Alert
    variant="destructive"
    className="absolute z-10 w-[90vw] md:w-[25vw] left-1/2 -translate-x-1/2 top-2 md:top-10 md:left-auto md:right-10 md:translate-x-0"
  >
    <AlertTitle>Error</AlertTitle>
    <AlertDescription>
      {error?.message ?? "An unknown error occurred"}
    </AlertDescription>
  </Alert>
);

const NotFoundAlert = () => (
  <Alert className="absolute z-10 w-[90vw] md:w-[25vw] left-1/2 -translate-x-1/2 top-2 md:top-10 md:left-auto md:right-10 md:translate-x-0">
    <AlertTitle>Not Found</AlertTitle>
    <AlertDescription>Spot or forecast data not found</AlertDescription>
  </Alert>
);

const SpotDetails = ({ spot }) => {
  return (
    <Card
      className="absolute z-10 top-2 md:left-10 md:top-10 md:w-fit bg-white/50 backdrop-blur-md shadow-lg -translate-x-1/2 md:translate-x-0
    left-1/2 w-[90vw] md:right-10
    "
    >
      <CardHeader className="py-2 flex md:flex-row gap-1 md:gap-4">
        <CardTitle className="text-xl font-bold">
          {spot?.name ?? "Unknown Location"}
          <p className="text-sm font-thin text-gray-500">{`${
            spot?.city ?? "N/A"
          }, ${spot?.state ?? "N/A"}, ${spot?.country ?? "N/A"}`}</p>
        </CardTitle>

        <div className="flex flex-row items-start">
          <ShareButton
            guid={spot.guid}
            latitude={spot.latitude}
            longitude={spot.longitude}
          />
          <Button
            className="w-fit px-2"
            variant="link"
            onClick={() =>
              window.open(
                `https://www.google.com/maps/search/?api=1&query=${spot?.latitude},${spot?.longitude}`,
                "_blank"
              )
            }
            disabled={!spot?.latitude || !spot?.longitude}
          >
            <span className="icon-[logos--google-maps] w-5 h-5"></span>
          </Button>
          <Button
            className="w-fit px-2"
            variant="link"
            onClick={() =>
              window.open(
                `https://www.waze.com/ul?ll=${spot?.latitude},${spot?.longitude}&navigate=yes`,
                "_blank"
              )
            }
            disabled={!spot?.latitude || !spot?.longitude}
          >
            <span className="icon-[hugeicons--waze] w-5 h-5 text-blue-500"></span>
          </Button>
        </div>
      </CardHeader>
    </Card>
  );
};
