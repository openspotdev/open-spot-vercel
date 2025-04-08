"use client";

import { Button } from "@/components/ui/button";

interface ShareButtonProps {
  guid: string;
  latitude: string;
  longitude: string;
}

export function GMapsButton({ guid, latitude, longitude }: ShareButtonProps) {
  return (
    <Button
      className="w-fit px-2"
      variant="link"
      onClick={() =>
        window.open(
          `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`,
          "_blank"
        )
      }
      disabled={!latitude || !longitude}
    >
      <span className="icon-[logos--google-maps] w-5 h-5"></span>
    </Button>
  );
}
