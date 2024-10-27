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
import { Separator } from "@/components/ui/separator";
import {
  Globe,
  Building2,
  MapPin,
  Thermometer,
  Wind,
  Droplets,
  Trash2,
  Navigation,
  Map,
  Sun,
  Cloud,
  CloudRain,
} from "lucide-react";

import { useSpotById, useDeleteSpot } from "@/lib/hooks/useSpotsRepository";
import { ShareButton } from "@/components/open-spot/share-button";
import MapViewTW from "@/components/open-spot/spot/map-view";
import { getSpotForecastByLocation } from "@/lib/data/spots";
import DeleteSpot from "@/components/open-spot/delete-spot";

const WeatherIcon = ({ description }) => {
  switch (description?.toLowerCase()) {
    case "clear sky":
      return <Sun className="mr-2 h-4 w-4" />;
    case "few clouds":
    case "scattered clouds":
    case "broken clouds":
      return <Cloud className="mr-2 h-4 w-4" />;
    case "shower rain":
    case "rain":
    case "thunderstorm":
      return <CloudRain className="mr-2 h-4 w-4" />;
    default:
      return null;
  }
};

const InfoItem = ({ icon: Icon, label, value }) => (
  <div className="flex items-center">
    <Icon className="mr-2 h-4 w-4" />
    <span>{`${label}: ${value ?? "N/A"}`}</span>
  </div>
);

export const LocationDetail = ({ guid }: { guid: string }) => {
  const router = useRouter();
  const {
    data: spot,
    isLoading: isLoadingSpot,
    error: spotError,
  } = useSpotById(guid);
  const { mutate: deleteSpot, isPending: isDeleting } = useDeleteSpot();

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

  const handleDelete = async () => {
    try {
      await deleteSpot(guid);
      router.push("/spots");
    } catch (error) {
      console.error("Error deleting spot:", error);
    }
  };
  if (isLoadingSpot || isLoadingForecast) {
    return <LoadingSkeleton />;
  }

  if (spotError || forecastError) router.back();

  if (!spot || !forecast) {
    return <NotFoundAlert />;
  }

  return (
    <SpotDetails
      spot={spot}
      forecast={forecast}
      onDelete={handleDelete}
      isDeleting={isDeleting}
    />
  );
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

const SpotDetails = ({ spot, forecast, onDelete, isDeleting }) => {
  const tempCelsius = forecast?.data?.main?.temp
    ? (forecast.data.main.temp - 273.15).toFixed(1)
    : "N/A";

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

        <div className="flex flex-row justify-between gap-2 md:gap-4">
          <Button
            className="w-1/3"
            variant="outline"
            onClick={() =>
              window.open(
                `https://www.google.com/maps/search/?api=1&query=${spot?.latitude},${spot?.longitude}`,
                "_blank"
              )
            }
            disabled={!spot?.latitude || !spot?.longitude}
          >
            <span className="icon-[logos--google-maps] w-5 h-5 mr-1"></span>
            <span className="font-medium">G-Maps</span>
          </Button>
          <Button
            className="w-1/3"
            variant="outline"
            onClick={() =>
              window.open(
                `https://www.waze.com/ul?ll=${spot?.latitude},${spot?.longitude}&navigate=yes`,
                "_blank"
              )
            }
            disabled={!spot?.latitude || !spot?.longitude}
          >
            <span className="icon-[hugeicons--waze] w-5 h-5 text-blue-500 mr-1"></span>
            <span className="font-medium">Waze</span>
          </Button>
          <ShareButton
            guid={spot.guid}
            latitude={spot.latitude}
            longitude={spot.longitude}
          />
          <DeleteSpot guid={spot.guid} />
        </div>
      </CardHeader>
    </Card>
  );
};
