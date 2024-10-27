//@ts-nocheck
"use client";
import Image from "next/image";
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

const WeatherIcon = ({ icon, description }) => {
  return (
    <Image
      width={32}
      height={32}
      className="h-8 w-8"
      src={`${process.env.NEXT_PUBLIC_URL_WEATHER_IMG}/img/wn/${icon}@4x.png`}
      alt={`Weather icon for ${description}`}
    />
  );
};

export const CurrentForecast = ({ guid }: { guid: string }) => {
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
    <section className="flex p-2 gap-2 w-full md:w-fit justify-around bg-slate-400 rounded-sm md:px-6">
      <div className="w-1/2 gap-2 flex flex-col">
        <div className="flex items-center text-xs text-gray-700 whitespace-nowrap">
          <span className="text-slate-600">{`Viento`}</span>
          <span className="icon-[la--wind] mx-2 w-6 h-6"></span>
          <span className="text-slate-600">{`${
            forecast?.data.wind.speed + " " + "mt/s" ?? "N/A"
          }`}</span>
        </div>
        <div className="flex items-center text-xs text-gray-700 whitespace-nowrap">
          <span className="text-slate-600">{`Humedad`}</span>
          <span className="icon-[bi--moisture] w-5 h-5 mx-2"></span>
          <span className="text-slate-600">{`${
            forecast?.data.main?.humidity + "%" ?? "N/A"
          }`}</span>
        </div>
      </div>
      <div className="w-1/2 gap-2 flex flex-col p-1 text-right">
        <p className="text-slate-80 text-xs capitalize whitespace-nowrap">{`${forecast?.data.weather?.[0]?.description}`}</p>
        <div className="flex items-center justify-end">
          <WeatherIcon
            icon={forecast?.data.weather?.[0]?.icon}
            description={forecast?.data.weather?.[0]?.description}
          />
          <p className="text-slate-80 text-lg font-bold">{`${tempCelsius}°C`}</p>
        </div>
      </div>
    </section>
  );
};
