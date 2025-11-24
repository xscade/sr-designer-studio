"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./ui/Button";
import { ArrowRight } from "lucide-react";

const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=2574&auto=format&fit=crop", // Luxury Villa
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2574&auto=format&fit=crop", // Modern Interior
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2574&auto=format&fit=crop", // Exterior Architecture
  "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=2574&auto=format&fit=crop", // Loft Style
  "https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=2574&auto=format&fit=crop", // Minimalist Space
];

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % HERO_IMAGES.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-screen w-screen overflow-hidden bg-sr-black text-white">
      {/* Background Image Carousel */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="popLayout">
          <motion.img
            key={currentIndex}
            src={HERO_IMAGES[currentIndex]}
            alt="SR Design Portfolio"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 0.8, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </AnimatePresence>
        {/* Persistent Gradient Overlay for readability */}
        <div className="absolute inset-0 bg-black/20 z-10" />
      </div>

      {/* Header Overlay */}
      <div className="absolute top-0 left-0 w-full p-8 md:p-12 flex justify-between items-start z-20 pointer-events-none">
         {/* Logo Area */}
         <div className="flex flex-col pointer-events-auto">
            <div className="w-12 h-12 border border-white/30 flex items-center justify-center mb-2 backdrop-blur-sm">
               <span className="font-serif font-bold text-xl">SR</span>
            </div>
            <span className="text-xs tracking-widest uppercase opacity-80">Studio SR</span>
         </div>

         {/* Top Right Text */}
         <div className="hidden md:block max-w-xs text-right mt-20 mr-8">
            <p className="text-lg font-light leading-relaxed text-white/90 font-sans">
               We are a Visakhapatnam based architecture and design studio with a global reputation for creating innovative spaces.
            </p>
         </div>
      </div>

      {/* Bottom Content - Massive Title */}
      <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 z-20">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1 className="text-[15vw] md:text-[12vw] hero-title leading-[0.85] tracking-tighter text-white mix-blend-overlay opacity-90">
            Building <br /> from Vizag
          </h1>
          
          {/* Optional sub-line or CTA next to the big title if needed */}
          <div className="md:absolute md:bottom-12 md:right-12 mt-8 md:mt-0 pointer-events-auto">
             <Button variant="white" className="rounded-none px-8 py-6 text-lg tracking-wide hover:bg-white hover:text-sr-black transition-colors">
                Explore AI <ArrowRight className="ml-2 w-5 h-5" />
             </Button>
          </div>
        </motion.div>
      </div>

      {/* Right Side Vertical Indicator */}
      <div className="absolute top-1/2 right-12 -translate-y-1/2 hidden md:flex flex-col gap-4 items-center z-20">
         <div className="h-24 w-[1px] bg-white/30" />
         <span className="writing-vertical-rl text-xs tracking-widest uppercase opacity-60 rotate-180">Est. 2014</span>
      </div>
    </section>
  );
}
