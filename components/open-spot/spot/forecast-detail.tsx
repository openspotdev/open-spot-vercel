//@ts-nocheck
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

import { getSpotForecastByLocation } from "@/lib/data/spots";

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

export const ForecastDetail = ({ guid }: { guid: string }) => {
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

  if (spotError || forecastError) {
    return <ErrorAlert error={spotError || forecastError} />;
  }

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
    <Card className="absolute z-10 bottom-24 left-1/2 w-[90vw] md:w-[350px] md:rigth-auto md:left-10 bg-white/50 backdrop-blur-md shadow-lg -translate-x-1/2 md:translate-x-0">
      <CardHeader className="py-2">
        <CardTitle className="text-xl font-bold">
          {/* {spot?.name ?? "Unknown Location"} */}
        </CardTitle>
        {/* <p className="text-sm text-gray-500">{`${spot?.city ?? "N/A"}, ${
          spot?.state ?? "N/A"
        }, ${spot?.country ?? "N/A"}`}</p> */}
      </CardHeader>
      <CardContent className="flex items-center justify-center gap-2 py-2">
        <div className="w-1/2 flex items-center justify-center bg-gray-100 rounded-lg p-2">
          <WeatherIcon description={forecast?.weather?.[0]?.description} />
          <div className="ml-4">
            <p className="text-3xl font-bold">{`${tempCelsius}°C`}</p>
            <p className="text-sm text-gray-600">
              {forecast?.data.weather?.[0]?.description ?? "N/A"}
            </p>
          </div>
        </div>
        <div className="w-1/2">
          <InfoItem
            icon={Wind}
            label="Wind"
            value={`${forecast?.data.wind.speed ?? "N/A"} m/s`}
          />
          <InfoItem
            icon={Droplets}
            label="Humidity"
            value={`${forecast?.data.main?.humidity ?? "N/A"}%`}
          />
        </div>
      </CardContent>
      {/* <Separator className="my-2" /> */}
      <CardFooter className="flex justify-between py-2">
        {/* <Button
          variant="destructive"
          size="sm"
          onClick={onDelete}
          disabled={isDeleting}
        >
          <Trash2 className="mr-2 h-4 w-4" />
          {isDeleting ? "Deleting..." : "Delete"}
        </Button>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              window.open(
                `https://www.waze.com/ul?ll=${spot?.latitude},${spot?.longitude}&navigate=yes`,
                "_blank"
              )
            }
            disabled={!spot?.latitude || !spot?.longitude}
          >
            <Navigation className="mr-2 h-4 w-4" />
            Waze
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              window.open(
                `https://www.google.com/maps/search/?api=1&query=${spot?.latitude},${spot?.longitude}`,
                "_blank"
              )
            }
            disabled={!spot?.latitude || !spot?.longitude}
          >
            <Map className="mr-2 h-4 w-4" />
            Maps
          </Button>
        </div> */}
      </CardFooter>
    </Card>
  );
};
