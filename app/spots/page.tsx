"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Bike, Menu, X, Linkedin, Twitter, Mail } from "lucide-react";
import LocationAutocomplete from "@/components/open-spot/spot/location-autocomplete";
import SpotsList from "@/components/open-spot/spot/list";
import Link from "next/link";

export default function Home() {
  const navItems = [{ href: "/", label: "Home" }];
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <main className="flex flex-col md:mx-auto space-y-8">
      <header className="sticky flex justify-center px-2 top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <nav className="container flex h-14 items-center">
          <Link className="flex items-center justify-center space-x-2" href="/">
            <span className="icon-[circle-flags--olympics] w-12 h-12"></span>
            <span className="font-bold">Volver</span>
          </Link>

          <nav className="ml-auto hidden md:flex gap-4 sm:gap-6">
            {navItems.map((item, index) => (
              <h1 key={index} className="font-bold">
                {"Pronostico del tiempo en tus Spots favoritos"}
              </h1>
            ))}
          </nav>
        </nav>
      </header>

      <section className="mx-auto space-y-8 w-[92vw] md:w-[48vw]">
        <LocationAutocomplete />
        <SpotsList />
      </section>
    </main>
  );
}
