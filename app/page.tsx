"use client";

import Header from "@/components/open-spot/header";
import { motion } from "framer-motion";
import { useLanguage } from "@/app/languageContext";
import Footer from "@/components/open-spot/footer";
import Container from "@/components/open-spot/container";

export default function LandingPage() {
  const { texts } = useLanguage();

  return (
    <Container>
      <Header />
      <main className="flex-grow bg-sky-200 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.img
            src={`/shop/olympic.svg`}
            alt={"olympic"}
            className="w-full h-auto max-h-[40vh] object-contain my-8"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5 }}
          />
          <div className="flex flex-col items-center justify-center mt-8 mb-12">
            <motion.h1
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-orange-900 text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              {texts.landing.title}
            </motion.h1>
          </div>
        </div>
      </main>
      <Footer />
    </Container>
  );
}
