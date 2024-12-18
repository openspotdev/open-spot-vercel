"use client";

import React from "react";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2, MapPin } from "lucide-react";

import SpotCard from "./spot-card";
import { useSpots, Spot } from "@/lib/hooks/useSpotsRepository";
import { useLanguage } from "@/app/languageContext";
import SkeletonCard from "./skeleton";

interface Props {
  className?;
}

export default function List({ className }: Props) {
  const { language } = useLanguage();
  const { data: spots, isLoading, isError } = useSpots();

  if (isLoading) return <SkeletonCard />;

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
    <div className={cn("space-y-2 pb-32", className)}>
      {ordered?.map((spot: Spot) => (
        <SpotCard key={spot.guid} {...spot} language={language} />
      ))}
    </div>
  );
}
