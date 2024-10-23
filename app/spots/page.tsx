"use client";

import { useState } from "react";
import Link from "next/link";
import LocationAutocomplete from "@/components/open-spot/spot/location-autocomplete";
import SpotsList from "@/components/open-spot/spot/list";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navItems = [{ href: "/", label: "Home" }];
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 via-rose-200 to-slate-200">
      <header className="sticky flex justify-center px-2 top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <nav className="container flex h-14 items-center">
          <Link className="flex items-center justify-center space-x-2" href="/">
            <span className="icon-[circle-flags--olympics] w-12 h-12"></span>
            <span className="font-bold">Volver</span>
          </Link>

          <nav className="ml-auto hidden md:flex gap-4 sm:gap-6">
            <h1 className="font-bold">{"Spots Favoritos"}</h1>
          </nav>
        </nav>
      </header>

      {isMenuOpen && (
        <div className="md:hidden">
          <nav className="flex flex-col items-center py-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <Link
              href="/"
              className="py-2 font-semibold hover:text-primary transition-colors"
            >
              Home
            </Link>
            <Link
              href="/favorites"
              className="py-2 font-semibold hover:text-primary transition-colors"
            >
              Favorites
            </Link>
          </nav>
        </div>
      )}

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <LocationAutocomplete />
          <SpotsList />
        </div>
      </main>
    </div>
  );
}
