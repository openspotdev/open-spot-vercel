import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MapPin, Car, Building, Info, Trash2 } from "lucide-react";

import { useDeleteSpot, Spot } from "@/lib/hooks/useSpotsRepository";
import { CurrentForecast } from "@/components/open-spot/spots/current-forecast";

export default function SpotCard({
  guid,
  name,
  country,
  city,
  state,
  latitude,
  longitude,
}: Spot & { guid: string }) {
  const router = useRouter();
  const { mutate: deleteSpot, isPending: isDeleting } = useDeleteSpot();

  const handleDelete = async () => {
    try {
      await deleteSpot(guid);
      router.push("/spots");
    } catch (error) {
      console.error("Error deleting spot:", error);
    }
  };

  return (
    <Card className="w-full hover:shadow-lg transition-shadow duration-300 bg-slate-50">
      <CardContent className="p-3">
        <div className="flex justify-between mb-2">
          <div className="">
            <h3 className="font-semibold text-base mb-1">{name}</h3>
            <div className="text-xs text-gray-500 mb-2 flex items-center">
              <Building className="h-3 w-3 mr-1 text-primary" />
              <span>
                {city}, {state}, {country}{" "}
              </span>
            </div>
          </div>
          <CurrentForecast guid={guid} />
        </div>
        <div className="grid grid-cols-4 gap-2 text-xs">
          <Button size="sm" variant="default" asChild className="w-full">
            <Link href={`/spot/${guid}/${latitude}/${longitude}`}>
              <Info className="h-3 w-3 mr-1" />
              Mapa
            </Link>
          </Button>
          <Button size="sm" variant="outline" asChild className="w-full">
            <Link
              href={`https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MapPin className="h-3 w-3 mr-1" />
              G-Maps
            </Link>
          </Button>
          <Button size="sm" variant="outline" asChild className="w-full">
            <Link
              href={`https://www.waze.com/ul?ll=${latitude}%2C${longitude}&navigate=yes`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Car className="h-3 w-3 mr-1" />
              Waze
            </Link>
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={handleDelete}
            disabled={isDeleting}
            className="w-full"
          >
            <Trash2 className="h-3 w-3 mr-1" />
            {isDeleting ? "Borrando..." : ""}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
