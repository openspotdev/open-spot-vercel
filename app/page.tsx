"use client";

import { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";

import SpotsList from "@/components/open-spot/spots/list";
import Header from "@/components/open-spot/header";
import { useLanguage } from "@/app/languageContext";
import Footer from "@/components/open-spot/footer";
import NearSpots from "@/components/open-spot/spots/near-spots";

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

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <main className="max-h-[100vh] grid grid-rows-[10vh_80vh]">
      <Header />
      <div className="flex flex-col min-w-2/3 mx-2 gap-4">
        <NearSpots />
        {/*<SpotsList className="mt-8" />*/}
        {/*<LocationAutocomplete />*/}
      </div>
      {/* <Footer /> */}
      {showBackToTop && (
        <Button
          className="fixed bottom-20 right-8 p-2 rounded-4 shadow-lg bg-red-500"
          onClick={scrollToTop}
          aria-label={texts.backToTop}
        >
          <ChevronUp className="h-6 w-6" />
        </Button>
      )}
    </main>
  );
}
