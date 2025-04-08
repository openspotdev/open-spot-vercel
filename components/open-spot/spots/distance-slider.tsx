import { Card } from "@/components/ui/card";

import { useDebouncedCallback } from "use-debounce";
import { Slider } from "@/components/ui/slider";
import { useRadiusStore } from "@/lib/stores/radius-store";

export default function DistanceSlider() {
  const { radius, setRadius } = useRadiusStore();

  const debouncedSetRadius = useDebouncedCallback((value: number) => {
    setRadius(value);
  }, 500);
  return (
    <div className="flex flex-col justify-between md:w-1/3 mx-auto">
      <Slider
        value={[radius]}
        onValueChange={([value]) => debouncedSetRadius(value)}
        min={10}
        max={24}
        step={1}
      />
      <h2 className="text-sm text-slate-500">Radio de busqueda: {radius} km</h2>
    </div>
  );
}
