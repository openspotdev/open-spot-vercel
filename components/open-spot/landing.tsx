"use client";

import { useState } from "react";
import { Cloud, Menu, X, Activity, Bike, Waves } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

import { landingTexts } from "@/app/const/languages-texts";
import Link from "next/link";

export default function AthleteWeatherLanding() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [language, setLanguage] = useState<"en" | "es">("en");

  const t = landingTexts[language];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-700 via-red-500 to-purple-600 text-white overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full mix-blend-overlay filter blur-xl animate-float"
            style={{
              backgroundColor: `rgba(255, 255, 255, ${
                Math.random() * 0.3 + 0.1
              })`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 300 + 100}px`,
              height: `${Math.random() * 300 + 100}px`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${Math.random() * 20 + 10}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10">
        <header className="container mx-auto px-4 py-2">
          <nav className="flex justify-between items-center">
            <Link
              href="#"
              className="text-lg md:text-2xl font-bold flex items-center"
            >
              <Activity className="mr-2" />
              {t.title}
            </Link>
            <div className="hidden md:flex space-x-6 bg-white bg-opacity-10 px-4 p-2 rounded-full backdrop-blur-sm animate-fade-in-up">
              <Link
                href="/spots"
                className="hover:text-slate-300 transition-colors"
              >
                {t.home}
              </Link>
              <Link
                href="/shop"
                className="hover:text-slate-300 transition-colors"
              >
                {t.shop}
              </Link>

              <Link
                href="/school"
                className="hover:text-slate-300 transition-colors"
              >
                {t.school}
              </Link>
              {/*<a href="#" className="hover:text-slate-300 transition-colors">
                {t.about}
              </a> */}
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-slate-100 p-2 rounded-full">
                <Label htmlFor="language-switch" className="sr-only">
                  Toggle Language
                </Label>
                <span
                  className={`text-sm ${
                    language === "en" ? "text-slate-400" : "text-slate-800"
                  }`}
                >
                  EN
                </span>
                <Switch
                  id="language-switch"
                  checked={language === "es"}
                  onCheckedChange={() =>
                    setLanguage((prev) => (prev === "en" ? "es" : "en"))
                  }
                  className="data-[state=checked]:bg-red-500"
                />
                <span
                  className={`text-sm pr-2 ${
                    language === "es" ? "text-slate-400" : "text-slate-800"
                  }`}
                >
                  ES
                </span>
              </div>
              <button
                className="md:hidden z-50"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              >
                {isMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </nav>
        </header>

        <div
          className={`fixed top-0 right-0 h-full w-64 bg-slate-800 z-40 p-6 transform transition-transform duration-300 ease-in-out ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex flex-col space-y-4 mt-16">
            <Link
              href="/"
              className="text-xl hover:text-slate-300 transition-colors"
            >
              {t.home}
            </Link>
            <Link
              href="/shop"
              className="text-xl hover:text-slate-300 transition-colors"
            >
              {t.shop}
            </Link>
            {/* 
            <a
              href="#"
              className="text-xl hover:text-slate-300 transition-colors"
            >
              {t.trainingTips}
            </a>
            <a
              href="#"
              className="text-xl hover:text-slate-300 transition-colors"
            >
              {t.about}
            </a> */}
          </div>
        </div>

        <section className="container mx-auto px-4 pt-10 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 flex items-center justify-center animate-fade-in-up">
            {t.heroTitle}
          </h1>
          <p className="text-xl md:text-2xl mb-10 animate-fade-in-up animation-delay-300">
            {t.heroSubtitle}
          </p>
          <Link href={"/spots"}>
            <button className="bg-slate-200 text-slate-900 px-8 py-3 rounded-full text-lg font-semibold hover:bg-slate-300 transition-colors inline-flex items-center animate-fade-in-up animation-delay-600">
              {t.ctaButton} <Cloud className="ml-2" />
            </button>
          </Link>
        </section>

        <section className="container mx-auto px-4 pt-10">
          <h2 className="text-4xl font-bold mb-12 text-center">
            {t.featuresTitle}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: t.runConditions.title,
                icon: Activity,
                description: t.runConditions.description,
              },
              {
                title: t.cyclingForecast.title,
                icon: Bike,
                description: t.cyclingForecast.description,
              },
              {
                title: t.swimWeather.title,
                icon: Waves,
                description: t.swimWeather.description,
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white bg-opacity-10 p-6 rounded-lg backdrop-blur-sm animate-fade-in-up"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <feature.icon className="h-12 w-12 mb-4 mx-auto text-slate-300" />
                <h3 className="text-2xl font-semibold mb-4 text-center">
                  {feature.title}
                </h3>
                <p className="text-slate-200 text-center">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
