import { Card } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Building } from "lucide-react";

import { Spot } from "@/lib/hooks/useSpotsRepository";
import { CurrentForecast } from "@/components/open-spot/spots/current-forecast";
import DeleteSpot from "@/components/open-spot/delete-spot";

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
    <Card className="w-full hover:shadow-lg transition-shadow duration-300 bg-slate-50 p-4">
      <div className="flex md:flex-row flex-col justify-between mb-2">
        <div className="md:w-1/2">
          <div className="text-[10px] text-gray-500 flex items-center">
            <Building className="h-3 w-3 mr-1 text-primary" />
            <span>
              {city}, {state}, {country}{" "}
            </span>
          </div>
          <h3 className="font-semibold text-base mb-1">{name}</h3>
        </div>
        <CurrentForecast guid={guid} />
      </div>
      <div className="flex justify-between gap-2 text-xs">
        <Button variant="default" asChild className="">
          <Link href={`/spot/${guid}/${latitude}/${longitude}`}>
            <span className="icon-[foundation--map] w-5 h-5"></span>
          </Link>
        </Button>
        <Button variant="outline" asChild className="w-full">
          <Link
            href={`https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="icon-[logos--google-maps] w-5 h-5"></span>
          </Link>
        </Button>
        <Button variant="outline" asChild className="w-full">
          <Link
            href={`https://www.waze.com/ul?ll=${latitude}%2C${longitude}&navigate=yes`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="icon-[hugeicons--waze] w-5 h-5 text-blue-500"></span>
          </Link>
        </Button>
        <DeleteSpot guid={guid} />
      </div>
    </Card>
  );
}
