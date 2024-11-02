"use client";

import { Button } from "@/components/ui/button";
import { ChevronUp } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

import Header from "@/components/open-spot/header";
import Banner from "@/components/open-spot/shop/banner";
import { useLanguage } from "../languageContext";

export default function LandingPage() {
  const { texts } = useLanguage();
  const [showBackToTop, setShowBackToTop] = useState(false);

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
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-200 via-rose-200 to-slate-200">
      <Header />
      <main className="flex-1">
        <Banner />
      </main>
      <footer className="w-full py-6 bg-gray-100">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-xs text-gray-500">
              © 2024 {texts.title}. {texts.footerRights}
            </p>
            <nav className="flex gap-4">
              <Link
                className="text-xs hover:underline underline-offset-4"
                href="#"
              >
                {texts.termsOfService}
              </Link>
              <Link
                className="text-xs hover:underline underline-offset-4"
                href="#"
              >
                {texts.privacyPolicy}
              </Link>
            </nav>
          </div>
        </div>
      </footer>
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
