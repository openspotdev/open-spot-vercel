"use client";

import { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Activity, Bike, Waves } from "lucide-react";

export default function FirstSection() {
  const controls = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <div className="min-h-screen bg-slate-600 py-8 md:pt-16">
      {/* Features Section */}
      <motion.section
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={containerVariants}
        className="container mx-auto p-4"
      >
        <h2 className="text-4xl font-bold mb-12 text-center">
          Athlete-Focused Features
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Run Conditions",
              icon: Activity,
              description:
                "Optimal times for your daily run based on temperature and wind.",
            },
            {
              title: "Cycling Forecast",
              icon: Bike,
              description:
                "Wind direction and speed predictions for your bike routes.",
            },
            {
              title: "Swim Weather",
              icon: Waves,
              description:
                "Water temperature and conditions for open water training.",
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-white bg-opacity-10 p-6 rounded-lg backdrop-blur-sm"
            >
              <feature.icon className="h-12 w-12 mb-4 mx-auto text-slate-300" />
              <h3 className="text-2xl font-semibold mb-4 text-center">
                {feature.title}
              </h3>
              <p className="text-slate-200 text-center">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  );
}
