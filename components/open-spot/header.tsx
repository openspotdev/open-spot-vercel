"use client";

import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useLanguage } from "@/app/languageContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, setLanguage, texts } = useLanguage();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const navItems = [
    // { href: "/spots", label: texts.menu.home },
    // { href: "/shools", label: texts.menu.schooltitle },
    // { href: "/shop", label: texts.shop },
  ];

  const languageOptions = [
    { value: "en", label: "English", flag: "🇬🇧" },
    { value: "es", label: "Español", flag: "🇪🇸" },
    { value: "fr", label: "Français", flag: "🇫🇷" },
  ];

  return (
    <>
      <header className="sticky flex justify-center items-center px-2 top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <nav className="container flex h-14 items-center justify-between">
          <Link className="flex items-center justify-center space-x-2" href="/">
            <span className="icon-[circle-flags--olympics] w-12 h-12"></span>
            <span className="font-bold">{texts.title}</span>
          </Link>
          {/* <section className="max-w-[30vw]">
            <Select
              value={language}
              onValueChange={(value) =>
                // setLanguage(value as "en" | "es" | "fr")
                setLanguage(value as "es")
              }
            >
              <SelectTrigger className="text-sm font-medium bg-transparent border-none cursor-pointer">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                {languageOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {`${option.flag} ${option.label}`}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </section> */}
          {/* <nav className="ml-auto hidden md:flex gap-4 sm:gap-6 md:items-center">
            {navItems.map((item, index) => (
              <Link
                key={index}
                className="text-sm font-medium hover:underline underline-offset-4"
                href={item.href}
              >
                {item.label}
              </Link>
            ))}
            <Select
              value={language}
              onValueChange={(value) =>
                // setLanguage(value as "en" | "es" | "fr")
                setLanguage(value as "es")
              }
            >
              <SelectTrigger className="text-sm font-medium bg-transparent border-none cursor-pointer">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                {languageOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {`${option.flag} ${option.label}`}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </nav> */}
          {/* <Button
            variant="ghost"
            className="ml-auto md:hidden"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            <Menu className="h-6 w-6" />
          </Button> */}
        </nav>
      </header>
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm md:hidden">
          <div className="fixed inset-y-0 right-0 w-full max-w-xs bg-background shadow-lg">
            <div className="flex h-14 items-center px-4">
              <h2 className="text-lg font-semibold">{texts.menu.menu}</h2>
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
              {/* <select
                value={language}
                onChange={(e) =>
                  // setLanguage(e.target.value as "en" | "es" | "fr")
                  setLanguage(e.target.value as "es")
                }
                className="text-sm font-medium bg-transparent border-none cursor-pointer"
              >
                {languageOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select> */}
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
