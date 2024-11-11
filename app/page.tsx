"use client";

import { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";

import LocationAutocomplete from "@/components/open-spot/spots/location-autocomplete";
import SpotsList from "@/components/open-spot/spots/list";
import Header from "@/components/open-spot/header";
import { useLanguage } from "@/app/languageContext";
import Footer from "@/components/open-spot/footer";

export default function Home() {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const { texts } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="h-[100vh] grid grid-rows-[10vh_1fr_10vh] bg-gradient-to-br from-blue-200 via-rose-200 to-slate-200">
      <Header />
      <main className="flex-1 md:mx-auto p-4">
        {/* <h1 className="text-md font-bold mb-6 text-center text-slate-800">
          {texts.spots.title}
        </h1> */}
        <div className="max-w-2xl mx-auto flex flex-col justify-between h-full">
          <SpotsList />
          <LocationAutocomplete />
        </div>
      </main>
      <Footer />
      {showBackToTop && (
        <Button
          className="fixed bottom-4 right-4 p-2 rounded-full shadow-lg bg-red-500"
          onClick={scrollToTop}
          aria-label={texts.backToTop}
        >
          <ChevronUp className="h-6 w-6" />
        </Button>
      )}
    </div>
  );
}
