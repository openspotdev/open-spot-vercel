"use client";

import { Button } from "@/components/ui/button";

import { useSpotById } from "@/lib/hooks/useSpotsRepository";

interface ShareButtonProps {
  guid: string;
}

export function GMapsButton({ guid }: ShareButtonProps) {
  const { data: spot } = useSpotById(guid);

  return (
    <Button
      className="w-fit px-2"
      variant="link"
      onClick={() =>
        window.open(
          `https://www.google.com/maps/search/?api=1&query=${spot?.latitude},${spot?.longitude}`,
          "_blank"
        )
      }
      disabled={!spot?.latitude || !spot?.longitude}
    >
      <span className="icon-[logos--google-maps] w-5 h-5"></span>
    </Button>
  );
}
