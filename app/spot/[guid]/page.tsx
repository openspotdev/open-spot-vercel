import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import MapView from "@/components/open-spot/spot/map-view";
import { LocationDetail } from "@/components/open-spot/spot/location-detail";
import { WeatherDetail } from "@/components/open-spot/spot/weather-detail";
import { getSpotWeatherByLocation } from "@/lib/data/spots";
import Footer from "@/components/open-spot/footer";
import Header from "@/components/open-spot/header";

export default async function Home({
  params,
  searchParams,
}: {
  params: { guid: string };
  searchParams?: { name: string; lat: string; lon: string; lan: string };
}) {
  const guid = params?.["guid"] || "";
  const name = searchParams.name || "";
  const latitude = searchParams.lat || "";
  const longitude = searchParams.lon || "";
  const language = searchParams.lan || "";

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["spot-weather", latitude, longitude, language],
    queryFn: async () =>
      await getSpotWeatherByLocation({ latitude, longitude, language }),
  });

  await queryClient.prefetchQuery({
    queryKey: ["spot-forecast", latitude, longitude, language],
    queryFn: async () =>
      await getSpotWeatherByLocation({ latitude, longitude, language }),
  });

  return (
    <div className="h-[100vh] grid grid-rows-[10vh_1fr_10vh] bg-gradient-to-br from-blue-200 via-rose-200 to-slate-200">
      <Header>
        <nav className="ml-auto hidden md:flex gap-4 sm:gap-6">
          <h1 className="font-bold">{name}</h1>
        </nav>
      </Header>
      <main className="container mx-auto p-2 md:p-8">
        <div className="relative h-[88vh] md:h-[80vh]">
          <HydrationBoundary state={dehydrate(queryClient)}>
            <MapView latitude={latitude} longitude={longitude} />
            <div className="flex-1">
              {/* <LocationDetail guid={guid} /> */}
              {/* <WeatherDetail guid={guid} /> */}
            </div>
          </HydrationBoundary>
        </div>
      </main>
    </div>
  );
}
