import Link from "next/link";

import MapView from "@/components/open-spot/spot/map-view";
import { LocationDetail } from "@/components/open-spot/spot/shared-spot/location-detail";
import { ForecastDetail } from "@/components/open-spot/spot/shared-spot/forecast-detail";
import Header from "@/components/open-spot/header";

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
    <div className="h-[100vh] grid grid-rows-[10vh_1fr_10vh] bg-gradient-to-br from-blue-200 via-rose-200 to-slate-200">
      <Header>
        <nav className="ml-auto hidden md:flex gap-4 sm:gap-6">
          <h1 className="font-bold">{name}</h1>
        </nav>
      </Header>

      <main className="container mx-auto p-2 md:p-8">
        <div className="relative h-[88vh] md:h-[80vh]">
          <div className="">
            <MapView latitude={latitude} longitude={longitude} />
            <LocationDetail {...spot} />
            <ForecastDetail {...spot} />
          </div>
        </div>
      </main>
    </div>
  );
}
