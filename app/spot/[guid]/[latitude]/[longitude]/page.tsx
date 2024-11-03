import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import Link from "next/link";

import BackButton from "@/components/open-spot/back-button";
import MapViewTW from "@/components/open-spot/spot/map-view";
import { LocationDetail } from "@/components/open-spot/spot/location-detail";
import { ForecastDetail } from "@/components/open-spot/spot/forecast-detail";
import { getSpotForecastByLocation } from "@/lib/data/spots";
import Footer from "@/components/open-spot/footer";
import Header from "@/components/open-spot/header";

export default async function Home({
  params,
}: {
  params: { guid: string; latitude: string; longitude: string };
}) {
  const guid = params?.["guid"] || "";
  const latitude = params?.["latitude"] || "";
  const longitude = params?.["longitude"] || "";
  const language = params?.["longitude"] || "";

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["spot-forecast", latitude, longitude],
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
              <MapViewTW
                latitude={latitude.toString()}
                longitude={longitude.toString()}
              />
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
