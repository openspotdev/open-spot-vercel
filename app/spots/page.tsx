"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import Image from "next/image";

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
  // <main className="flex flex-col h-[100vh] md:mx-auto space-y-8 min-h-screen bg-gradient-to-br from-blue-500 via-yellow-400 to-red-500 ">
  //   <div className="relative">
  {
    /* </div>
    </main> */
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 via-rose-200 to-slate-200">
      <div className="relative">
        <header className="sticky flex justify-center px-2 top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <nav className="container flex h-14 items-center">
            <Link
              className="flex items-center justify-center space-x-2"
              href="/"
            >
              <span className="icon-[circle-flags--olympics] w-12 h-12"></span>
              <span className="font-bold">Volver</span>
            </Link>

            <nav className="ml-auto hidden md:flex gap-4 sm:gap-6">
              {navItems.map((item, index) => (
                <h1 key={index} className="font-bold">
                  {"Tus Spots favoritos"}
                </h1>
              ))}
            </nav>
          </nav>
        </header>

        <section className="mx-auto w-[92vw] md:w-[48vw] py-8">
          <LocationAutocomplete />
          <SpotsList />
        </section>
      </div>
    </div>
  );
}
