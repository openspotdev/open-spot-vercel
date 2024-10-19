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
      role: "Rollerblade Specialist, Youth Program Director & Founder",
      bio: "Eduardo specializes in introducing children and teenagers to the joys of rollerblading and running. Her energetic teaching style and focus on safety have made our youth programs incredibly popular.",
      image: "icon-[openmoji--man-dark-skin-tone-beard]",
    },
    {
      name: "Camilo Fiallo",
      role: "Running Specialist & Founder",
      bio: "Camilo is a marathon runner and certified running coach. With his expertise in biomechanics and endurance training, he helps our students achieve their personal best in running.",
      image: "icon-[openmoji--man-light-skin-tone-beard]",
    },
    {
      name: "Gabriel Alfonso",
      role: "Rollerblade Specialist & Founder",
      bio: "Gabriel is a former professional rollerblader with over 15 years of coaching experience. She founded RollRun Academy with the vision of creating a supportive community for skating and running enthusiasts.",
      image: "icon-[openmoji--man-medium-light-skin-tone-beard]",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky flex justify-center px-2 top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <nav className="container flex h-14 items-center">
          <Link className="flex items-center justify-center space-x-2" href="/">
            <span className="icon-[circle-flags--olympics] w-12 h-12"></span>
            <span className="font-bold">Olympico Academy</span>
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
        <section className="flex justify-center w-full py-12 md:py-24 lg:py-32 bg-gray-100">
          <div className="container px-4 md:px-6">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-center mb-8">
              Meet Our Team
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed text-center mb-12">
              Our experienced and passionate instructors are dedicated to
              helping you achieve your goals in rollerblading and running.
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
                  Get in Touch
                </h2>
                <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Have questions about our team or programs? We d love to hear
                  from you!
                </p>
              </div>
              <Button size="lg" asChild>
                <Link href="mailto:info@rollrunacademy.com">Contact Us</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full py-6 bg-gray-100">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-xs text-gray-500">
              © 2024 RollRun Academy. All rights reserved.
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
