"use client";

import React from "react";
import { CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonCard() {
  return (
    <div className="min-w-[90vw] md:min-w-[30vw] bg-white/40 backdrop-blur-sm shadow-lg mt-8 gap-2">
      <CardHeader>
        <Skeleton className="h-1 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
      </CardHeader>
      <CardContent className="grid grid-cols-1">
        <Skeleton className="h-7 w-full" />
      </CardContent>
    </div>
  );
}
