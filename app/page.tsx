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
    <main className="max-h-[100vh] grid grid-rows-[10vh_90vh]">
      <Header />
      <div className="flex flex-col mx-auto gap-4">
        <SpotsList className="mt-8" />
        <LocationAutocomplete />
      </div>
      {/* <Footer /> */}
      {showBackToTop && (
        <Button
          className="fixed bottom-4 right-4 p-2 rounded-full shadow-lg bg-red-500"
          onClick={scrollToTop}
          aria-label={texts.backToTop}
        >
          <ChevronUp className="h-6 w-6" />
        </Button>
      )}
    </main>
  );
}
