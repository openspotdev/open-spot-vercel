"use client";

import { useState, useEffect } from "react";
import Header from "@/components/open-spot/header";
import Link from "next/link";
import { motion } from "framer-motion";
import { useLanguage } from "@/app/languageContext";
import Footer from "@/components/open-spot/footer";

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
      <Footer />
    </div>
  );
}
