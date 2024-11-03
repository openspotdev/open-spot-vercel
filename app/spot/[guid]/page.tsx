import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import MapViewTW from "@/components/open-spot/spot/map-view";
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
    <div className="min-h-screen bg-gradient-to-br from-blue-200 via-rose-200 to-slate-200">
      <Header />
      <main className="container mx-auto p-2">
        <div className="relative h-screen">
          <div className="h-full w-full">
            <HydrationBoundary state={dehydrate(queryClient)}>
              <MapViewTW latitude={latitude} longitude={longitude} />
              <LocationDetail guid={guid} />
              <ForecastDetail guid={guid} />
            </HydrationBoundary>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
