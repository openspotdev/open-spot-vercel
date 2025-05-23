import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

import { Spot } from "@/lib/hooks/useSpotsRepository";
import { CurrentForecast } from "@/components/open-spot/spots/current-forecast-near";
import DeleteSpot from "@/components/open-spot/delete-spot";
import { ShareButton } from "@/components/open-spot/share-button";
import { WazeButton } from "@/components/open-spot/waze-button";
import { GMapsButton } from "@/components/open-spot/gmaps-button";

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
    <Card className="flex flex-col justify-between w-full min-w-[90vw] md:min-w-[10vw] hover:shadow-lg transition-shadow duration-300 bg-white p-4">
      <div className="flex flex-col justify-between md:w-1/2">
        <div className="w-full">
          <div className="text-[10px] text-gray-500 flex items-center">
            <span className="icon-[duo-icons--location] w-5 h-5 mr-1"></span>
            {/* <span className="truncate max-w-[64ch] overflow-hidden whitespace-nowrap"> */}
            <span className="whitespace-nowrap">
              {city}, {state}, {country}
            </span>
          </div>
          <h3 className="font-semibold text-base mb-1 capitalize whitespace-nowrap">
            {name}
          </h3>
        </div>
      </div>
      <div className="flex justify-between items-center text-xs">
        <article className="">
          <Link
            href={{
              pathname: `/spot/${guid}`,
              query: {
                name: name,
                lat: latitude,
                lon: longitude,
                lan: language,
              },
            }}
          >
            <CurrentForecast
              guid={guid}
              latitude={latitude}
              longitude={longitude}
            />
          </Link>
        </article>
        <div className="flex flex-row">
          <GMapsButton guid={guid} latitude={latitude} longitude={longitude} />
          <WazeButton guid={guid} latitude={latitude} longitude={longitude} />
          <ShareButton guid={guid} />
          <DeleteSpot guid={guid} />
        </div>
      </div>
    </Card>
  );
}
