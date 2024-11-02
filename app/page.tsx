"use client";

import { useState, useEffect } from "react";
import Header from "@/components/open-spot/header";
import Link from "next/link";
import { motion } from "framer-motion";

export default function LandingPage() {
  return (
    <div className="flex flex-col w-full min-h-screen">
      <Header />
      <main className="flex-grow relative bg-sky-200">
        {/* <main className="flex-grow relative bg-[url('/bg-675x900.svg')] md:bg-[url('/900x600.svg')] bg-cover bg-center sm:bg-none sm:bg-[#b7e0ff]"> */}
        <motion.img
          src={`/shop/olympic.svg`}
          alt={"olympic"}
          className="absolute inset-0 h-full mx-auto"
          initial={{ opacity: 0, scale: 1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 3 }}
        />
        {/* <motion.img
          src={`/shop/olympic-flame.svg`}
          alt={"olympic"}
          className="md:hidden mx-auto h-[75vh] w-fit"
          initial={{ opacity: 0, scale: 1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 3 }}
        /> */}
      </main>
      <footer className="w-full py-6 bg-gray-100">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-xs text-gray-500">
              © 2024 OS Action Sports. All rights reserved.
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
