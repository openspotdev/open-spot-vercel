"use client";

import { Button } from "@/components/ui/button";

import { useSpotById } from "@/lib/hooks/useSpotsRepository";

interface ShareButtonProps {
  guid: string;
}

export function WazeButton({ guid }: ShareButtonProps) {
  const { data: spot } = useSpotById(guid);

  return (
    <Button
      className="w-fit px-2"
      variant="link"
      onClick={() =>
        window.open(
          `https://www.waze.com/ul?ll=${spot?.latitude},${spot?.longitude}&navigate=yes`,
          "_blank"
        )
      }
      disabled={!spot?.latitude || !spot?.longitude}
    >
      <span className="icon-[hugeicons--waze] w-5 h-5 text-blue-500"></span>
    </Button>
  );
}
