"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Bike, Menu, X, Linkedin, Twitter, Mail } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function TeamPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const navItems = [{ href: "/", label: "Home" }];

  const teamMembers = [
    {
      name: "Eduardo Abella",
      role: "Especialista en patinaje, director del programa juvenil y fundador",
      bio: "Eduardo se especializa en introducir a niños y adolescentes a los placeres del patinaje sobre ruedas y el running. Su enérgico estilo de enseñanza y su enfoque en la seguridad han hecho que nuestros programas para jóvenes sean increíblemente populares.",
      image: "icon-[openmoji--man-dark-skin-tone-beard]",
    },
    {
      name: "Camilo Fiallo",
      role: "Especialista en Running y Fundadora",
      bio: "Camilo es corredor de maratón y entrenador de carrera certificado. Con su experiencia en biomecánica y entrenamiento de resistencia, ayuda a nuestros estudiantes a lograr sus mejores resultados personales en el running.",
      image: "icon-[openmoji--man-light-skin-tone-beard]",
    },
    {
      name: "Gabriel Alfonso",
      role: "Especialista en patinaje y fundador",
      bio: "Gabriel es un ex patinador profesional con más de 15 años de experiencia como entrenador. Juntos fundaron Olympico Academy con la visión de crear una comunidad de apoyo para los entusiastas del patinaje y el running.",
      image: "icon-[openmoji--man-medium-light-skin-tone-beard]",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-tr from-blue-300 via-green-300 to-slate-300">
      <header className="sticky flex justify-center px-2 top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <nav className="container flex h-14 items-center">
          <Link className="flex items-center justify-center space-x-2" href="/">
            <span className="icon-[circle-flags--olympics] w-12 h-12"></span>
            <span className="font-bold">Volver</span>
          </Link>

          <nav className="ml-auto hidden md:flex gap-4 sm:gap-6">
            {navItems.map((item, index) => (
              <h1 key={index} className="font-bold">
                {"Equipo de Trabajo"}
              </h1>
            ))}
          </nav>
        </nav>
      </header>
      <main className="flex-1">
        <section className="flex justify-center w-full py-12 md:py-24 lg:py-32 bg-gray-100">
          <div className="container px-4 md:px-6">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-center mb-8">
              Conoce a nuestro equipo
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed text-center mb-12">
              Nuestros instructores experimentados y apasionados están dedicados
              a ayudarle a alcanzar sus objetivos en patinaje sobre ruedas y
              carrera.
            </p>
            <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
              {teamMembers.map((member, index) => (
                <Card key={index} className="overflow-hidden ">
                  <CardContent className="p-0 text-center">
                    <span
                      className={`${member.image} w-32 h-32 mx-auto`}
                    ></span>
                    <div className="p-6">
                      <h2 className="text-2xl font-bold mb-2">{member.name}</h2>
                      <h3 className="text-lg text-gray-500 mb-4">
                        {member.role}
                      </h3>
                      <p className="text-sm text-gray-600 mb-4">{member.bio}</p>
                      <div className="flex space-x-4">
                        <Link href="#" aria-label={`${member.name}'s LinkedIn`}>
                          <Linkedin className="h-5 w-5 text-gray-600 hover:text-primary" />
                        </Link>
                        <Link href="#" aria-label={`${member.name}'s Twitter`}>
                          <Twitter className="h-5 w-5 text-gray-600 hover:text-primary" />
                        </Link>
                        <Link href="#" aria-label={`Email ${member.name}`}>
                          <Mail className="h-5 w-5 text-gray-600 hover:text-primary" />
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        <section
          id="contact"
          className="flex justify-center w-full py-12 md:py-24 lg:py-32"
        >
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Contáctenos
                </h2>
                <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  ¿Tienes preguntas sobre nuestro equipo o nuestros programas?
                  ¡Nos encantaría saber de ti!
                </p>
              </div>
              <Button size="lg" asChild>
                <Link href="mailto:info@olympicoacademy.com">Contáctenos</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full py-6 bg-gray-100">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-xs text-gray-500">
              © 2024 Olympico Academy. All rights reserved.
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
    </div>
  );
}
