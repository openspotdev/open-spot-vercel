"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Loader2, MapPin } from "lucide-react";

import SpotCard from "./spot-card";
import { useSpots, Spot } from "@/lib/hooks/useSpotsRepository";
import { useLanguage } from "@/app/languageContext";

export default function List() {
  const { language } = useLanguage();
  const { data: spots, isLoading, isError } = useSpots();

  if (isLoading)
    return (
      <Card className="w-full bg-white/40 backdrop-blur-sm shadow-lg">
        <CardHeader className="space-y-2">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-8 w-1/2" />
        </CardHeader>
        <CardContent className="grid grid-cols-4 gap-2">
          <Skeleton className="h-9 w-full" />
          <Skeleton className="h-9 w-full" />
          <Skeleton className="h-9 w-full" />
          <Skeleton className="h-9 w-full" />
        </CardContent>
      </Card>
    );

  if (isError) return <div>Error loading spots</div>;
  if (spots.length < 1)
    return (
      <Card className="w-full max-w-md mx-auto mt-32">
        <CardHeader>
          <CardTitle className="flex items-center text-lg font-medium">
            <MapPin className="mr-2 h-5 w-5" />
            Aún no tiene Spots guardados
          </CardTitle>
          <CardDescription>
            Busque y guarde los lugares en los que le gustaría entrenar
          </CardDescription>
        </CardHeader>
      </Card>
    );
  const ordered = spots.reduce((acc, item) => [item].concat(acc), []);
  return (
    <div className="space-y-2">
      {ordered?.map((spot: Spot) => (
        <SpotCard key={spot.guid} {...spot} language={language} />
      ))}
    </div>
  );
}
