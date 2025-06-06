"use client";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Wind, Droplets } from "lucide-react";

import { getSpotWeatherByLocation } from "@/lib/data/spots";
import { useLanguage } from "@/app/languageContext";

const WeatherIcon = ({ icon, description }) => {
  return (
    <Image
      width={64}
      height={64}
      className="h-16 w-16"
      src={`${process.env.NEXT_PUBLIC_URL_WEATHER_IMG}/img/wn/${icon}@4x.png`}
      alt={`Weather icon for ${description}`}
    />
  );
};

const InfoItem = ({ icon: Icon, label, value }) => (
  <div className="flex items-center whitespace-nowrap">
    <Icon className="mr-2 h-4 w-4" />
    <span className="text-slate-600 text-xs mr-2">{`${label}:`} </span>
    <span className="font-semibold">{`${value ?? "N/A"}`}</span>
  </div>
);

export const ForecastDetail = ({
  latitude,
  longitude,
}: {
  latitude: string;
  longitude: string;
}) => {
  const router = useRouter();
  const { language } = useLanguage();
  const {
    data: forecast,
    isLoading: isLoadingForecast,
    error: forecastError,
  } = useQuery({
    queryKey: ["spot-weather", latitude, longitude],
    queryFn: async () => {
      return await getSpotWeatherByLocation({
        latitude,
        longitude,
        language,
      });
    },
    enabled: !!latitude && !!longitude,
  });

  if (isLoadingForecast) {
    return <LoadingSkeleton />;
  }

  if (forecastError) {
    return <ErrorAlert error={forecastError} />;
  }

  if (!forecast) {
    return <NotFoundAlert />;
  }

  return <SpotDetails forecast={forecast} />;
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

const SpotDetails = ({ forecast }) => {
  const tempCelsius = forecast?.data?.main?.temp
    ? (forecast.data.main.temp - 273.15).toFixed(1)
    : "N/A";

  return (
    <Card className="p-2 absolute z-10 bottom-44 left-1/2 w-[90vw] md:w-[350px] md:rigth-auto md:left-10 bg-white/50 backdrop-blur-md shadow-lg -translate-x-1/2 md:translate-x-0">
      <p className="text-slate-80 text-xl font-bold capitalize ml-2">{`${forecast?.data.weather?.[0]?.description}`}</p>
      <div className="flex gap-4">
        <div className="w-fit flex items-center justify-center bg-slate-400 rounded-lg p-2 px-4">
          <WeatherIcon
            icon={forecast?.data.weather?.[0]?.icon}
            description={forecast?.data.weather?.[0]?.description}
          />
          <p className="text-slate-80 text-3xl font-bold">{`${tempCelsius}°C`}</p>
        </div>
        <div className="w-fit">
          <InfoItem
            icon={Wind}
            label="Viento"
            value={`${forecast?.data.wind.speed ?? "N/A"} m/s`}
          />
          <InfoItem
            icon={Droplets}
            label="Humedad"
            value={`${forecast?.data.main?.humidity ?? "N/A"}%`}
          />
        </div>
      </div>
    </Card>
  );
};
