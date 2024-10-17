"use client";

// import { redirect } from "next/navigation";
import { ArrowRight } from "lucide-react";

import { Button } from "@/app/components/ui/button";

export default function AthleteWeatherLanding() {
  return (
    <Button onClick={() => console.log("back")}>
      <ArrowRight />
      Back
    </Button>
  );
}
