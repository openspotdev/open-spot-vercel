import Link from "next/link";
import LocationAutocomplete from "@/components/open-spot/spots/location-autocomplete";
import SpotsList from "@/components/open-spot/spots/list";
import BackButton from "@/components/open-spot/back-button";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 via-rose-200 to-slate-200">
      <header className="sticky flex justify-center px-2 top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <nav className="container flex h-14 items-center">
          <BackButton />
          <nav className="ml-auto gap-4 sm:gap-6">
            <h1 className="font-bold">{"Spots Favoritos"}</h1>
          </nav>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <LocationAutocomplete />
          <SpotsList />
        </div>
      </main>
    </div>
  );
}
