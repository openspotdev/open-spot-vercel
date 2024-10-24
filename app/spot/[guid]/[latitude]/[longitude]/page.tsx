import BackButton from "@/components/open-spot/back-button";
import { Detail } from "@/components/open-spot/spot/detail";

import { getSpotForecastByLocation } from "@/lib/data/spots";
import { QueryClient } from "@tanstack/react-query";

import Link from "next/link";

export default async function Home({
  params,
}: {
  params: { guid: string; latitude: string; longitude: string };
}) {
  const guid = params?.["guid"] || "";
  const latitude = params?.["latitude"] || "";
  const longitude = params?.["longitude"] || "";

  const queryClient = new QueryClient();
  // await queryClient.prefetchQuery({
  //   queryKey: ["spot-forecast", latitude, longitude],
  //   queryFn: () => getSpotForecastByLocation({ latitude, longitude }),
  // });
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 via-rose-200 to-slate-200">
      <header className="sticky flex justify-center px-2 top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <nav className="container flex h-14 items-center">
          <Link className="flex items-center justify-center space-x-2" href="/">
            <BackButton />
          </Link>

          <nav className="ml-auto hidden md:flex gap-4 sm:gap-6">
            <h1 className="font-bold">{"Spots Favoritos"}</h1>
          </nav>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Detail guid={guid} />
      </main>
    </div>
  );
}
