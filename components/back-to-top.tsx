"use client";

import { useState, useEffect } from "react";
import { ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/app/languageContext";

export default function BackToTopButton() {
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

  if (!showBackToTop) return null;

  return (
    <Button
      className="fixed bottom-20 right-8 p-2 rounded-4 shadow-lg bg-red-500"
      onClick={scrollToTop}
      aria-label={texts?.backToTop || "Back to top"}
    >
      <ChevronUp className="h-6 w-6" />
    </Button>
  );
}
