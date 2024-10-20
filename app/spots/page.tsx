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
            <span className="font-bold">Olympico Academy</span>
          </Link>

          <nav className="ml-auto hidden md:flex gap-4 sm:gap-6">
            {navItems.map((item, index) => (
              <Link
                key={index}
                className="text-sm font-medium hover:underline underline-offset-4"
                href={item.href}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <Button
            variant="ghost"
            className="ml-auto md:hidden"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            <Menu className="h-6 w-6" />
          </Button>
        </nav>
      </header>
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm md:hidden">
          <div className="fixed inset-y-0 right-0 w-full max-w-xs bg-background shadow-lg">
            <div className="flex h-14 items-center px-4">
              <h2 className="text-lg font-semibold">Menu</h2>
              <Button
                variant="ghost"
                className="ml-auto"
                onClick={toggleMobileMenu}
                aria-label="Close menu"
              >
                <X className="h-6 w-6" />
              </Button>
            </div>
            <nav className="flex flex-col space-y-4 p-4">
              {navItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className="text-sm font-medium hover:underline underline-offset-4"
                  onClick={toggleMobileMenu}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
      <section className="mx-auto space-y-8 w-[92vw] md:w-[48vw]">
        <LocationAutocomplete />
        <SpotsList />
      </section>
    </main>
  );
}
