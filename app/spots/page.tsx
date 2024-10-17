import { Label } from "@/components/ui/label";

import LocationAutocomplete from "@/components/open-spot/spot/location-autocomplete";
import SpotsList from "@/components/open-spot/spot/list";
import Link from "next/link";

export default function Home() {
  return (
    <main className="p-4 space-y-6">
      <header>
        <Link href="/">Back</Link>
        <Label className="text-6xl">Spots</Label>
      </header>
      <LocationAutocomplete />
      <SpotsList />
    </main>
  );
}
