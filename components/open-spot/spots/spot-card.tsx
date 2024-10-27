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
}: Spot) {
  return (
    <Card className="flex flex-col md:flex-row justify-between w-full hover:shadow-lg transition-shadow duration-300 bg-slate-50 p-4">
      <div className="flex md:flex-row flex-col justify-between md:w-1/2">
        <div className="w-full">
          <div className="text-[10px] text-gray-500 flex items-center">
            <span className="icon-[duo-icons--location] w-5 h-5 mr-1"></span>
            <span>
              {city}, {state}, {country}{" "}
            </span>
          </div>
          <h3 className="font-semibold text-base mb-1">{name}</h3>
        </div>
      </div>
      <div className="flex md:w-1/2 justify-between items-center gap-1 text-xs">
        <Button variant="link" asChild className="bg-slate-300">
          <Link href={`/spot/${guid}/${latitude}/${longitude}`}>
            <CurrentForecast guid={guid} />
          </Link>
        </Button>
        <div className="flex flex-row">
          <ShareButton guid={guid} latitude={latitude} longitude={longitude} />
          <DeleteSpot guid={guid} />
        </div>
      </div>
    </Card>
  );
}
