"use client";

import { useState, useEffect } from "react";
import Header from "@/components/open-spot/header";
import Link from "next/link";
import { motion } from "framer-motion";
import { useLanguage } from "./languageContext";

export default function LandingPage() {
  const { texts } = useLanguage();

  return (
    <div className="flex flex-col w-full min-h-screen">
      <Header />
      <main className="flex-grow relative bg-sky-200">
        <motion.img
          src={`/shop/olympic.svg`}
          alt={"olympic"}
          className="absolute inset-0 h-full mx-auto"
          initial={{ opacity: 0, scale: 1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 3 }}
        />
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
