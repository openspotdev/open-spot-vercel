import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Car, Building, Info } from "lucide-react";
import Link from "next/link";

import { Spot } from "@/lib/hooks/useSpotsRepository";

export default function SpotCard({
  guid,
  name,
  country,
  city,
  state,
  latitude,
  longitude,
}: Spot & { guid: string }) {
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
  const wazeUrl = `https://www.waze.com/ul?ll=${latitude}%2C${longitude}&navigate=yes`;

  return (
    <Card className="w-full hover:shadow-lg transition-shadow duration-300 bg-slate-50">
      <CardContent className="p-4">
        <div className="flex flex-col space-y-4">
          <div className="flex justify-between items-start">
            <div className="flex-grow">
              <h3 className="font-semibold text-lg mb-1">{name}</h3>
              <div className="flex items-center text-sm text-gray-500 mb-1">
                <Building className="h-4 w-4 mr-2 text-primary flex-shrink-0" />
                <span>
                  {city}, {state}
                </span>
              </div>
              <div className="flex items-start">
                <MapPin className="h-4 w-4 mr-2 text-primary flex-shrink-0 mt-1" />
                <p className="text-sm">{country}</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col space-y-2">
            <Button
              size="sm"
              variant="default"
              asChild
              className="w-full"
              title="View Details"
            >
              <Link href={`/spot/${guid}`}>
                <Info className="h-4 w-4 mr-2" />
                <span>View Details</span>
              </Link>
            </Button>
            <Button
              size="sm"
              variant="outline"
              asChild
              className="w-full"
              title="Open in Google Maps"
            >
              <Link
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MapPin className="h-4 w-4 mr-2" />
                <span>Google Maps</span>
              </Link>
            </Button>
            <Button
              size="sm"
              variant="outline"
              asChild
              className="w-full"
              title="Open in Waze"
            >
              <Link href={wazeUrl} target="_blank" rel="noopener noreferrer">
                <Car className="h-4 w-4 mr-2" />
                <span>Waze</span>
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
