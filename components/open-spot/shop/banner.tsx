"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

const sports = ["rollerblade", "rollerskate", "downhill", "urban"];

export default function Component() {
  const [currentSport, setCurrentSport] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSport((prev) => (prev + 1) % sports.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* <motion.img
        key={currentSport}
        src={`/shop/${sports[currentSport]}.svg`}
        alt={sports[currentSport]}
        className="absolute inset-0 w-full h-full object-cover"
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      /> */}
      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-white p-8">
        <motion.h1
          className="text-4xl md:text-6xl font-bold text-center mb-4"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Extreme Thrills Await
        </motion.h1>
        <AnimatePresence mode="wait">
          <motion.p
            key={currentSport}
            className="text-xl md:text-2xl text-center mb-8"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            Gear up for {sports[currentSport]}
          </motion.p>
        </AnimatePresence>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Button size="lg" variant="secondary" className="text-lg">
            Shop Now
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
