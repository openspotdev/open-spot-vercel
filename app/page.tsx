"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Bike,
  CheckCircle,
  Activity,
  Star,
  Users,
  Trophy,
  Zap,
  Users as GroupIcon,
  User as PersonIcon,
  Target as SpecializedIcon,
  ChevronUp,
  Menu,
  X,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function LandingPage() {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const navItems = [
    { href: "#features", label: "Ventajas" },
    { href: "#sports", label: "Escuelas" },
    { href: "#pricing", label: "Precios" },
    { href: "#testimonials", label: "Testimonios" },
    { href: "/team", label: "Equipo" },
    // { href: "/spots", label: "Spots Weather Forecast" },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky flex justify-center px-2 top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <nav className="container flex h-14 items-center">
          <Link className="flex items-center justify-center space-x-2" href="/">
            <span className="icon-[circle-flags--olympics] w-12 h-12"></span>
            <span className="font-bold">Academia Olympico</span>
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
      <main className="flex-1">
        <section className="flex justify-center w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-slate-700 text-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Preparate Olympico
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Únete a Academia Olympico y descubre la emoción del patinaje
                  en línea y la alegría de correr. Te esperan instructores
                  expertos, instalaciones de última generación y una comunidad
                  solidaria.
                </p>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-4">
                {/* <Button asChild size="lg">
                  <Link href="#signup">Get Started</Link>
                </Button> */}
                <Button variant="outline" size="lg" className="text-black">
                  Contactanos
                  <span className="icon-[cib--whatsapp] ml-2 w-6 h-6"></span>
                </Button>
              </div>
            </div>
          </div>
        </section>
        <section
          id="features"
          className="flex justify-center w-full py-12 md:py-24 lg:py-32 bg-gray-100"
        >
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center">
              ¿Por qué elegirnos?
            </h2>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              {[
                {
                  title: "Instructores expertos",
                  icon: "icon-[game-icons--american-football-player]",
                  description:
                    "Aprende de los mejores en el campo, con años de experiencia.",
                },
                {
                  title: "Instalaciones de última generación",
                  icon: "icon-[icon-park--skate]",
                  description:
                    "Entrena en espacios modernos y bien equipados, diseñados para un aprendizaje óptimo.",
                },
                {
                  title: "Comunidad solidaria",
                  icon: "icon-[healthicons--community-meeting-negative]",
                  description:
                    "Únete a una vibrante comunidad de personas afines apasionadas por el movimiento.",
                },
              ].map((feature, index) => (
                <Card key={index}>
                  <CardContent className="flex flex-col items-center space-y-2 p-6 text-center">
                    {/* <feature.icon className="h-12 w-12 mb-4 text-primary" /> */}
                    <span
                      className={`${feature.icon} w-32 h-32 mx-auto`}
                    ></span>
                    <h3 className="text-xl font-bold">{feature.title}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        <section
          id="sports"
          className="flex justify-center w-full py-12 md:py-24 lg:py-32"
        >
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">
              Escuelas
            </h2>
            <Tabs
              defaultValue="rollerblading"
              className="w-full max-w-3xl mx-auto"
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="rollerblading">Patinaje</TabsTrigger>
                <TabsTrigger value="running">Running</TabsTrigger>
              </TabsList>
              <TabsContent value="rollerblading">
                <Card>
                  <CardContent className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 p-6">
                    {/* <Bike className="h-12 w-12 text-primary" /> */}
                    <span className="icon-[icon-park--rollerskates] w-16 h-16"></span>
                    <div>
                      <h3 className="text-xl font-bold">
                        Escuela de Rollerblading, Downhill, Rollerskate y
                        Urbano.
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Desde principiantes hasta patinadores avanzados,
                        nuestras clases de patinaje en línea se adaptan a todos
                        los niveles de habilidad. Aprende técnicas adecuadas,
                        seguridad y trucos emocionantes.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="running">
                <Card>
                  <CardContent className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 p-6">
                    <span className="icon-[noto-v1--running-shoe] w-12 h-12"></span>
                    <div>
                      <h3 className="text-xl font-bold">Escuela de Running</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Cursos intensivos centrados en técnicas avanzadas,
                        preparación para competiciones o habilidades
                        específicas. Lleva tus habilidades al siguiente nivel.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </section>
        <section
          id="pricing"
          className="flex justify-center w-full py-12 md:py-24 lg:py-32 bg-slate-50"
        >
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">
              Planes
            </h2>
            <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-3 lg:gap-12">
              {[
                {
                  title: "Clases Grupales",
                  icon: "icon-[ls--group]",
                  price: "$29mil/sesión",
                  description:
                    "Únete a nuestras dinámicas sesiones en grupo y aprende con tus compañeros. Perfecto para principiantes y aprendices sociales.",
                },
                {
                  title: "Entramiento Personalizado",
                  icon: "icon-[icon-park--focus-one]",
                  price: "$49mil/sesión",
                  description:
                    "Sesiones individuales adaptadas a tus necesidades y objetivos específicos. Acelera tu progreso con atención personalizada.",
                },
                {
                  title: "Cursos Espcializados",
                  icon: "icon-[arcticons--weatherbug-elite]",
                  price: "$89mil/course",
                  description:
                    "Cursos intensivos centrados en técnicas avanzadas, preparación para carreras o habilidades específicas. Lleva tus habilidades al siguiente nivel.",
                },
              ].map((rate, index) => (
                <Card key={index}>
                  <CardContent className="flex flex-col items-center space-y-4 p-6 text-center">
                    {/* <rate.icon className="h-12 w-12 mb-4 text-primary" /> */}
                    {/* <span className="icon-[vaadin--group] w-10 h-10"></span> */}
                    <span className={`${rate.icon} w-32 h-32 mx-auto`}></span>
                    <h3 className="text-xl font-bold">{rate.title}</h3>
                    <p className="text-2xl font-bold text-primary">
                      {rate.price}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {rate.description}
                    </p>
                    <Button className="mt-4">Cotizar</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        <section
          id="testimonials"
          className="flex justify-center w-full py-12 md:py-24 lg:py-32"
        >
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">
              Lo que dicen nuestros estudiantes
            </h2>
            <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-3 lg:gap-12">
              {[
                {
                  name: "Bryan Arango",
                  text: "¡La Academia Olympico transformó mis habilidades de patinaje! ¡Los instructores son de primera!",
                },
                {
                  name: "Richard Jhonson",
                  text: "He mejorado mucho como corredor gracias a las increíbles clases aquí.",
                },
                {
                  name: "Usain Bolt",
                  text: "La comunidad en Olympico es increíble. He hecho amigos para toda la vida aquí.",
                },
              ].map((testimonial, index) => (
                <Card key={index}>
                  <CardContent className="flex flex-col justify-between p-6 text-center h-full">
                    <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
                      {testimonial.text}
                    </p>
                    <p className="font-semibold">{testimonial.name}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        <section
          id="signup"
          className="flex justify-center w-full py-12 md:py-24 lg:py-32 bg-black text-white"
        >
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Listo para comenzar el entrenamiento?
                </h2>
                <p className="mx-auto max-w-[600px] text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Únete a Academia Olympico hoy y da el primer paso hacia el
                  dominio del patinaje en línea y la carrera.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full py-6 bg-gray-100">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-xs text-gray-500">
              © 2024 Academia Olympico. All rights reserved.
            </p>
            <nav className="flex gap-4">
              <Link
                className="text-xs hover:underline underline-offset-4"
                href="#"
              >
                Terms of Service
              </Link>
              <Link
                className="text-xs hover:underline underline-offset-4"
                href="#"
              >
                Privacy
              </Link>
            </nav>
          </div>
        </div>
      </footer>
      {showBackToTop && (
        <Button
          className="fixed bottom-4 right-4 p-2 rounded-full shadow-lg bg-red-500"
          onClick={scrollToTop}
          aria-label="Back to top"
        >
          <ChevronUp className="h-6 w-6" />
        </Button>
      )}
    </div>
  );
}
