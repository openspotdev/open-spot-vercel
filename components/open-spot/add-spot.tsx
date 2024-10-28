"use client";

import { Button } from "@/components/ui/button";
import { useSpotById, useAddSpot, Spot } from "@/lib/hooks/useSpotsRepository";
import { useRouter } from "next/navigation";

export default function AddSpot(newSpot: Spot) {
  const router = useRouter();
  const {
    data: spot,
    isLoading: isLoadingSpot,
    error: spotError,
  } = useSpotById(newSpot.guid);

  const addSpotMutation = useAddSpot();

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSpot) return;
    addSpotMutation.mutate(newSpot);
    router.push("/spots");
  };

  return (
    <div className="flex w-full space-x-1 justify-between">
      <form id="spot-form" onSubmit={handleSave} className="mb-6 gap-2">
        {!spot && (
          <Button type="submit" variant="link">
            <span className="icon-[icon-park--add] w-8 h-8"></span>
          </Button>
        )}
      </form>
    </div>
  );
}
