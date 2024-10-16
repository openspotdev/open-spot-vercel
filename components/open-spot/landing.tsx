"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { Cloud, Sun, Rainbow, Menu, X, Activity } from "lucide-react";

export default function AthleteWeatherLanding() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuVariants = {
    closed: { x: "100%" },
    open: { x: "0%" },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-700 via-red-400 to-purple-400 text-white overflow-hidden">
      {/* Dynamic background */}
      <div className="absolute inset-0 overflow-hidden min-h-screen">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full mix-blend-overlay filter blur-xl"
            initial={{ opacity: 0.7, scale: 1 }}
            animate={{
              opacity: [0.7, 0.9, 0.7],
              scale: [1, 1.2, 1],
              x: [0, Math.random() * 100 - 50, 0],
              y: [0, Math.random() * 100 - 50, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            style={{
              backgroundColor: `rgba(255, 255, 255, ${
                Math.random() * 0.3 + 0.1
              })`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 300 + 100}px`,
              height: `${Math.random() * 300 + 100}px`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <header className="container mx-auto px-4 py-6">
          <nav className="flex justify-between items-center">
            <a href="#" className="text-2xl font-bold flex items-center">
              <Activity className="mr-2" />
              AthleteWeather
            </a>
            <div className="hidden md:flex space-x-6">
              <a href="#" className="hover:text-slate-300 transition-colors">
                Home
              </a>
              <a href="#" className="hover:text-slate-300 transition-colors">
                Forecast
              </a>
              <a href="#" className="hover:text-slate-300 transition-colors">
                Training Tips
              </a>
              <a href="#" className="hover:text-slate-300 transition-colors">
                About
              </a>
            </div>
            <button
              className="md:hidden z-50"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </nav>
        </header>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={menuVariants}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 h-full w-64 bg-slate-800 z-40 p-6"
            >
              <div className="flex flex-col space-y-4 mt-16">
                <a
                  href="#"
                  className="text-xl hover:text-slate-300 transition-colors"
                >
                  Home
                </a>
                <a
                  href="#"
                  className="text-xl hover:text-slate-300 transition-colors"
                >
                  Forecast
                </a>
                <a
                  href="#"
                  className="text-xl hover:text-slate-300 transition-colors"
                >
                  Training Tips
                </a>
                <a
                  href="#"
                  className="text-xl hover:text-slate-300 transition-colors"
                >
                  About
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Hero Section */}
        <section className="container mx-auto px-4 py-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold mb-2 flex items-center justify-center"
          >
            <Sun className="mx-4 h-16 w-16 text-slate-300" /> OS Action Sports{" "}
            <Rainbow className="mx-4 h-16 w-16 text-slate-300" />
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl mb-10"
          >
            Tailored forecasts for athletes, optimizing your training and
            competition
          </motion.p>
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-slate-200 text-slate-900 px-8 py-3 rounded-full text-lg font-semibold hover:bg-slate-300 transition-colors inline-flex items-center"
          >
            Get Your Forecast <Cloud className="ml-2" />
          </motion.button>
        </section>
      </div>
    </div>
  );
}
