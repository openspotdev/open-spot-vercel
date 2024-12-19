"use client";

import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonCard() {
  return (
    <div className="w-full min-w-[400px] bg-white/40 backdrop-blur-sm shadow-lg mt-8 gap-2">
      <CardHeader className="">
        <Skeleton className="h-1 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
      </CardHeader>
      <CardContent className="grid grid-cols-1">
        <Skeleton className="h-7 w-full" />
      </CardContent>
    </div>
  );
}
