import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

import { Spot } from "@/lib/hooks/useSpotsRepository";
import { CurrentForecast } from "@/components/open-spot/spots/current-forecast";
import DeleteSpot from "@/components/open-spot/delete-spot";
import { ShareButton } from "@/components/open-spot/share-button";

export default function SpotCard({
  guid,
  name,
  country,
  city,
  state,
  latitude,
  longitude,
  language,
}: Spot) {
  return (
    <Card className="flex flex-col md:flex-row justify-between w-full hover:shadow-lg transition-shadow duration-300 bg-white p-2 px-4">
      <div className="flex md:flex-row flex-col justify-between md:w-1/2">
        <div className="w-full">
          <div className="text-[10px] text-gray-500 flex items-center">
            <span className="icon-[duo-icons--location] w-5 h-5 mr-1"></span>
            <span className="truncate max-w-[32ch] overflow-hidden whitespace-nowrap">
              {city}, {state}, {country}
            </span>
          </div>
          <h3 className="font-semibold text-base mb-1 capitalize">{name}</h3>
        </div>
      </div>
      <div className="flex md:w-1/2 justify-between md:justify-end items-center gap-1 text-xs">
        <article className="">
          <Link
            href={{
              pathname: `/spot/${guid}`,
              query: { lat: latitude, lon: longitude, lan: language },
            }}
          >
            <CurrentForecast guid={guid} />
          </Link>
        </article>
        <div className="flex flex-row">
          <ShareButton guid={guid} />
          <DeleteSpot guid={guid} />
        </div>
      </div>
    </Card>
  );
}
