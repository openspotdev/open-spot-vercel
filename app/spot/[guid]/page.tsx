import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import MapView from "@/components/open-spot/spot/map-view";
import { LocationDetail } from "@/components/open-spot/spot/location-detail";
import { ForecastDetail } from "@/components/open-spot/spot/forecast-detail";
import { getSpotForecastByLocation } from "@/lib/data/spots";
import Footer from "@/components/open-spot/footer";
import Header from "@/components/open-spot/header";

export default async function Home({
  params,
  searchParams,
}: {
  params: { guid: string };
  searchParams?: { lat: string; lon: string; lan: string };
}) {
  const guid = params?.["guid"] || "";
  const latitude = searchParams.lat || "";
  const longitude = searchParams.lon || "";
  const language = searchParams.lan || "";

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["spot-forecast", latitude, longitude, language],
    queryFn: async () =>
      await getSpotForecastByLocation({ latitude, longitude, language }),
  });

  return (
    <div className="h-[100vh] grid grid-rows-[10vh_1fr_10vh] bg-gradient-to-br from-blue-200 via-rose-200 to-slate-200">
      <Header />
      <main className="container mx-auto p-2 md:p-8">
        <div className="relative h-[88vh] md:h-[80vh]">
          <HydrationBoundary state={dehydrate(queryClient)}>
            <MapView latitude={latitude} longitude={longitude} />
            <div className="flex-1">
              <LocationDetail guid={guid} />
              <ForecastDetail guid={guid} />
            </div>
          </HydrationBoundary>
        </div>
      </main>
    </div>
  );
}
