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
    <div className="relative w-6 h-6">
      <Image
        fill
        className="object-contain"
        src={`${process.env.NEXT_PUBLIC_URL_WEATHER_IMG}/img/wn/${icon}@4x.png`}
        alt={`Weather icon for ${description}`}
      />
    </div>
  );
};

interface CurrentForecastProps {
  guid: string;
  latitude: string;
  longitude: string;
}

export const CurrentForecast = ({
  guid,
  latitude,
  longitude,
}: CurrentForecastProps) => {
  const router = useRouter();
  const language = "es";
  const { mutate: deleteSpot, isPending: isDeleting } = useDeleteSpot();

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
        language: "es",
      });
    },
    enabled: !!latitude && !!longitude,
  });

  if (isLoadingForecast) {
    return (
      <div className="flex items-center justify-center p-0.5">
        <Loader2 className="w-3 h-3 animate-spin text-gray-400" />
      </div>
    );
  }

  if (!forecast) {
    return <NotFoundAlert />;
  }

  return <SpotDetails forecast={forecast} isDeleting={isDeleting} />;
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

const SpotDetails = ({ forecast, isDeleting }) => {
  const tempCelsius = forecast?.data?.main?.temp
    ? (forecast.data.main.temp - 273.15).toFixed(1)
    : "N/A";

  return (
    <div className="flex items-center justify-center gap-1.5 p-0.5 bg-gradient-to-br from-slate-300 to-slate-400 rounded-md shadow-sm hover:shadow-md transition-all duration-300">
      <WeatherIcon
        icon={forecast?.data.weather?.[0]?.icon}
        description={forecast?.data.weather?.[0]?.description}
      />
      <div className="flex items-center gap-1.5">
        <p className="text-base font-bold text-slate-800">{`${tempCelsius}°C`}</p>
        <div className="flex items-center gap-1 text-[10px] text-slate-900">
          <div className="flex items-center gap-0.5">
            <span className="icon-[duo-icons--humidity] w-2.5 h-2.5"></span>
            <span>{`Humedad ${forecast?.data.main?.humidity}%`}</span>
          </div>
          <div className="flex items-center gap-0.5">
            <span className="icon-[duo-icons--wind] w-2.5 h-2.5"></span>
            <span>{`Viento ${forecast?.data.wind?.speed} m/s`}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
