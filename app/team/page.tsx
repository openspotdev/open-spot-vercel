"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Bike, Menu, X, Instagram, Twitter, Mail } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useLanguage } from "@/app/languageContext";

export default function TeamPage() {
  const { texts } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const navItems = [{ href: "/", label: texts.home }];

  const teamMembers = [
    {
      name: texts.teamMember1Name,
      role: texts.teamMember1Role,
      bio: texts.teamMember1Bio,
      image: "icon-[openmoji--man-dark-skin-tone-beard]",
      instagram: "roll_abella",
      email: "roll_abella@gmail.com",
    },
    {
      name: texts.teamMember2Name,
      role: texts.teamMember2Role,
      bio: texts.teamMember2Bio,
      image: "icon-[openmoji--man-light-skin-tone-beard]",
      instagram: "davidcarf23",
      email: "davidcarf23@gmail.com",
    },
    {
      name: texts.teamMember3Name,
      role: texts.teamMember3Role,
      bio: texts.teamMember3Bio,
      image: "icon-[openmoji--man-medium-light-skin-tone-beard]",
      instagram: "gabalfa",
      email: "gabalfa@gmail.com",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-200 via-rose-200 to-slate-200">
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
              {texts.meetOurTeam}
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed text-center mb-12">
              {texts.teamDescription}
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
                      <div className="flex space-x-4 justify-center">
                        <Link
                          target="_blank"
                          className="flex text-xs"
                          href={`https://instagram.com/${member.instagram}`}
                          aria-label={`${member.name}'s Instagram`}
                        >
                          <Instagram className="h-5 w-5 text-gray-600 hover:text-primary" />
                        </Link>
                        {/* <Link href="#" aria-label={`${member.name}'s Twitter`}>
                          <Twitter className="h-5 w-5 text-gray-600 hover:text-primary" />
                        </Link> */}
                        <Link
                          href={`email:${member.email}`}
                          aria-label={`Email ${member.name}`}
                        >
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
                  {texts.contactUs}
                </h2>
                <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  {texts.contactDescription}
                </p>
              </div>
              <Button size="lg" asChild>
                <Link href="mailto:info@olympicoacademy.com">{texts.contactUs}</Link>
              </Button>
            </div>
          </div>
        </section>
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
    </div>
  );
}
