"use client";

import { useState } from "react";
import { Menu, X, Mountain, Medal, Footprints, Dumbbell } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import Link from "next/link";

// Simulating internationalization texts
const landingTexts = {
  en: {
    title: "OS Action Sports",
    home: "Home",
    spots: "Spots",
    school: "School",
    heroTitle: "Push Your Limits with Action Sports",
    heroSubtitle:
      "Join our community and elevate your skills in running, Rollerblading, and boxing.",
    ctaButton: "Join Us Now",
    featuresTitle: "Why Choose OS Action Sports School?",
    runningTraining: {
      title: "Running Training",
      description:
        "Enhance your endurance and speed with tailored running programs for all levels.",
    },
    rollerbladingClasses: {
      title: "Rollerblading Classes",
      description:
        "Learn tricks and techniques in a safe environment, from beginner to advanced.",
    },
    boxingSessions: {
      title: "Boxing Sessions",
      description:
        "Get fit and learn self-defense with our expert-led boxing sessions.",
    },
  },
  es: {
    title: "Escuela de Deportes de Acción OS",
    home: "Inicio",
    spots: "Spots",
    school: "Escuela",
    heroTitle: "Supera Tus Límites con Deportes de Acción",
    heroSubtitle:
      "Únete a nuestra comunidad y mejora tus habilidades en correr, patinar y boxear.",
    ctaButton: "Únete Ahora",
    featuresTitle: "¿Por qué elegir la Escuela de Deportes de Acción OS?",
    runningTraining: {
      title: "Entrenamiento de Carrera",
      description:
        "Mejora tu resistencia y velocidad con programas de carrera adaptados a todos los niveles.",
    },
    rollerbladingClasses: {
      title: "Clases de Patinaje",
      description:
        "Aprende trucos y técnicas en un entorno seguro, desde principiantes hasta avanzados.",
    },
    boxingSessions: {
      title: "Sesiones de Boxeo",
      description:
        "Ponte en forma y aprende defensa personal con nuestras sesiones de boxeo dirigidas por expertos.",
    },
  },
};

export default function OSActionSportsLanding() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [language, setLanguage] = useState<"en" | "es">("en");

  const t = landingTexts[language];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-800 via-teal-500 to-green-600 text-white overflow-hidden">
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
              <Mountain className="mr-2" />
              {t.title}
            </Link>
            <div className="hidden md:flex space-x-6 bg-white bg-opacity-10 px-4 p-2 rounded-full backdrop-blur-sm animate-fade-in-up">
              <Link href="/" className="hover:text-blue-200 transition-colors">
                {t.home}
              </Link>
              <Link
                href="/school"
                className="hover:text-blue-200 transition-colors"
              >
                {t.school}
              </Link>
              <Link
                href="/spots"
                className="hover:text-blue-200 transition-colors"
              >
                {t.spots}
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-white p-2 rounded-full">
                <Label htmlFor="language-switch" className="sr-only">
                  Toggle Language
                </Label>
                <span
                  className={`text-sm ${
                    language === "en" ? "text-blue-600" : "text-blue-300"
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
                  className="data-[state=checked]:bg-teal-500"
                />
                <span
                  className={`text-sm pr-2 ${
                    language === "es" ? "text-blue-600" : "text-blue-300"
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
          className={`fixed top-0 right-0 h-full w-64 bg-blue-800 z-40 p-6 transform transition-transform duration-300 ease-in-out ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex flex-col space-y-4 mt-16">
            <Link
              href="/"
              className="text-xl hover:text-blue-200 transition-colors"
            >
              {t.home}
            </Link>
            <Link
              href="/school"
              className="text-xl hover:text-blue-200 transition-colors"
            >
              {t.school}
            </Link>
            <Link
              href="/spots"
              className="text-xl hover:text-blue-200 transition-colors"
            >
              {t.spots}
            </Link>
          </div>
        </div>

        <section className="container mx-auto px-4 pt-10 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 flex items-center justify-center animate-fade-in-up">
            {t.heroTitle}
          </h1>
          <p className="text-xl md:text-2xl mb-10 animate-fade-in-up animation-delay-300">
            {t.heroSubtitle}
          </p>
          <Link href="/spots">
            <button className="bg-white text-blue-600 px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-100 transition-colors inline-flex items-center animate-fade-in-up animation-delay-600">
              {t.ctaButton}
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
                title: t.runningTraining.title,
                icon: Footprints,
                description: t.runningTraining.description,
              },
              {
                title: t.rollerbladingClasses.title,
                icon: Medal,
                description: t.rollerbladingClasses.description,
              },
              {
                title: t.boxingSessions.title,
                icon: Dumbbell,
                description: t.boxingSessions.description,
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white bg-opacity-10 p-6 rounded-lg backdrop-blur-sm animate-fade-in-up"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <feature.icon className="h-12 w-12 mb-4 mx-auto text-blue-200" />
                <h3 className="text-2xl font-semibold mb-4 text-center">
                  {feature.title}
                </h3>
                <p className="text-blue-100 text-center">
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
