"use client";

import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";

import { Separator } from "@/components/ui/separator";
import { Loader2 } from "lucide-react";

import { useSpotById, useDeleteSpot } from "@/lib/hooks/useSpotsRepository";
import { getSpotWeatherByLocation } from "@/lib/data/spots";
import { useLanguage } from "@/app/languageContext";

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
  const { language } = useLanguage();
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
    queryKey: ["spot-weather", spot?.latitude, spot?.longitude, language],
    queryFn: async () => {
      if (!spot) return null;
      return await getSpotWeatherByLocation({
        latitude: spot.latitude?.toString(),
        longitude: spot.longitude?.toString(),
        language,
      });
    },
    enabled: (!!spot?.latitude && !!spot?.longitude) || !!language,
  });

  if (isLoadingSpot || isLoadingForecast) {
    return <Loader2 className="mr-2 w-4 animate-spin" />;
  }

  if (spotError || forecastError) {
    return <ErrorAlert error={spotError || forecastError} />;
  }

  if (!spot || !forecast) {
    return <NotFoundAlert />;
  }

  return (
    <SpotDetails spot={spot} forecast={forecast} isDeleting={isDeleting} />
  );
};

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

const SpotDetails = ({ spot, forecast, isDeleting }) => {
  const tempCelsius = forecast?.data?.main?.temp
    ? (forecast.data.main.temp - 273.15).toFixed(1)
    : "N/A";

  return (
    <Badge className="whitespace-nowrap bg-slate-300 text-slate-800 hover:bg-slate-200">
      <p className="text-slate-80 text-lg font-bold">{`${tempCelsius}°C`}</p>
      <WeatherIcon
        icon={forecast?.data.weather?.[0]?.icon}
        description={forecast?.data.weather?.[0]?.description}
      />
      <span className="truncate max-w-[20ch] overflow-hidden whitespace-nowrap">{`${forecast?.data.weather?.[0]?.description}`}</span>
    </Badge>
  );
};
