import { Label } from "@/components/ui/label";

import LocationAutocomplete from "@/components/open-spot/spot/location-autocomplete";
import SpotsList from "@/components/open-spot/spot/list";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col md:mx-auto space-y-8">
      <header className="flex w-[92vw] md:w-[48vw] bg-slate-200 rounded-md p-4 mt-4 shadow-md justify-between mx-auto items-center">
        <Link href="/">Back</Link>
        <Label className="text-4xl">Spots</Label>
      </header>
      <section className="mx-auto space-y-8 w-[92vw] md:w-[48vw]">
        <LocationAutocomplete />
        <SpotsList />
      </section>
    </main>
  );
}
