"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { useSpotById } from "@/lib/hooks/useSpotsRepository";
import { getSpotWeatherByLocation } from "@/lib/data/spots";
import { useLanguage } from "@/app/languageContext";
import DeleteSpot from "@/components/open-spot/delete-spot";
import { ShareButton } from "@/components/open-spot/share-button";
import { WazeButton } from "@/components/open-spot/waze-button";
import { GMapsButton } from "@/components/open-spot/gmaps-button";

export const LocationDetail = ({ guid }: { guid: string }) => {
  const router = useRouter();
  const { language } = useLanguage();
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
    queryKey: ["spot-weather", spot?.latitude, spot?.longitude],
    queryFn: async () => {
      if (!spot) return null;
      return await getSpotWeatherByLocation({
        latitude: spot.latitude?.toString(),
        longitude: spot.longitude?.toString(),
        language,
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
          <GMapsButton
            guid={spot.guid}
            latitude={spot.latitude}
            longitude={spot.longitude}
          />
          <WazeButton
            guid={spot.guid}
            latitude={spot.latitude}
            longitude={spot.longitude}
          />
          <ShareButton guid={spot.guid} />
          <DeleteSpot guid={spot.guid} />
        </div>
      </CardHeader>
    </Card>
  );
};
