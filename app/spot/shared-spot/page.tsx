import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import Link from "next/link";

import { Spot } from "@/lib/hooks/useSpotsRepository";
import BackButton from "@/components/open-spot/back-button";
import MapViewTW from "@/components/open-spot/spot/map-view";
import { LocationDetail } from "@/components/open-spot/spot/shared-spot/location-detail";
import { ForecastDetail } from "@/components/open-spot/spot/forecast-detail";
import { getSpotForecastByLocation } from "@/lib/data/spots";

export default async function Home({
  searchParams,
}: {
  searchParams?: {
    ["guid"]?: string;
    ["latitude"]?: string;
    ["longitude"]?: string;
    ["country"]?: string;
    ["state"]?: string;
    ["city"]?: string;
    ["name"]?: string;
  };
}) {
  const guid = searchParams?.["guid"] || "";
  const latitude = searchParams?.["latitude"] || "";
  const longitude = searchParams?.["longitude"] || "";
  const country = searchParams?.["country"] || "";
  const state = searchParams?.["state"] || "";
  const city = searchParams?.["city"] || "";
  const name = searchParams?.["name"] || "";

  const spot = {
    guid,
    latitude,
    longitude,
    country,
    state,
    city,
    name,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 via-rose-200 to-slate-200">
      <header className="sticky flex justify-center px-2 top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <nav className="container flex h-14 items-center">
          <Link className="flex items-center justify-center space-x-2" href="/">
            <button className="flex items-center justify-center space-x-2">
              <span className="icon-[circle-flags--olympics] w-12 h-12"></span>
              <span className="font-bold">Volver</span>
            </button>
          </Link>

          <nav className="ml-auto hidden md:flex gap-4 sm:gap-6">
            <h1 className="font-bold">{name}</h1>
          </nav>
        </nav>
      </header>

      <main className="container mx-auto p-2">
        <div className="relative h-screen">
          <div className="h-full w-full">
            {/* <HydrationBoundary state={dehydrate(queryClient)}> */}
            <MapViewTW latitude={latitude} longitude={longitude} />
            <LocationDetail {...spot} />
            <ForecastDetail {...spot} />
            {/* </HydrationBoundary> */}
          </div>
        </div>
      </main>
    </div>
  );
}
