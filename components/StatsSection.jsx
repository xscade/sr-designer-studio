"use client";

import { motion, useInView, useMotionValue, useSpring, animate } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const stats = [
  { 
    label: "Projects Completed", 
    value: 157, 
    suffix: "+",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=90&w=1200&auto=format&fit=crop", // Dark Marble Kitchen
    description: "Creating culinary sanctuaries."
  },
  { 
    label: "Happy Families", 
    value: 128, 
    suffix: "+",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=90&w=1200&auto=format&fit=crop", // Modern Dark Living
    description: "Spaces designed for life."
  },
  { 
    label: "Years of Excellence", 
    value: 14, 
    suffix: "+",
    image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=90&w=1200&auto=format&fit=crop", // Moody Bedroom
    description: "A decade of defining luxury."
  },
  { 
    label: "Design Awards", 
    value: 23, 
    suffix: "",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=90&w=1200&auto=format&fit=crop", // Architectural Hall
    description: "Recognized for perfection."
  },
];

export default function StatsSection() {
  return (
    <div className="w-full h-screen flex flex-col md:flex-row bg-black">
      {stats.map((stat, index) => (
        <div key={index} className="relative w-full md:w-1/4 h-1/4 md:h-full group overflow-hidden border-r border-white/10 last:border-r-0">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <img 
                    src={stat.image} 
                    alt={stat.label} 
                    className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
                />
            </div>

            {/* Overlay 1: Permanent Bottom Shadow (Keeps bottom black) */}
            <div className="absolute inset-0 z-10 bg-gradient-to-t from-black via-black/80 to-transparent opacity-100" />
            
            {/* Overlay 2: Top Veil (Fades out on hover) */}
            <div className="absolute inset-0 z-20 bg-black/60 transition-opacity duration-700 ease-in-out group-hover:opacity-0" />

            {/* Content */}
            <div className="relative z-30 w-full h-full flex flex-col items-center justify-end pb-24 md:pb-32 px-6">
                <Counter stat={stat} />
                
                {/* Decorative Line */}
                <div className="w-[1px] h-16 bg-gradient-to-b from-sr-orange to-transparent mt-8 opacity-50 group-hover:h-24 transition-all duration-500" />
            </div>
        </div>
      ))}
    </div>
  );
}

function Counter({ stat }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  // Calculate a random starting point between 10% and 40% of the target value
  // This ensures it never looks like "0" and has a dynamic start
  const randomStart = Math.floor(stat.value * (0.1 + Math.random() * 0.3));
  
  const count = useMotionValue(randomStart);
  const rounded = useSpring(count, { stiffness: 40, damping: 30 });
  const displayValue = useRef(null);

  useEffect(() => {
    if (isInView) {
      animate(count, stat.value, { duration: 2.5, ease: "circOut" });
    }
  }, [isInView, stat.value, count]);

  useEffect(() => {
    const unsubscribe = rounded.on("change", (latest) => {
      if (displayValue.current) {
        displayValue.current.textContent = Math.round(latest);
      }
    });
    return unsubscribe;
  }, [rounded]);
  
  return (
    <div ref={ref} className="text-center flex flex-col items-center">
        {/* Number - Changed to Medium weight for better visibility */}
      <div className="relative mb-4">
          <div className="text-6xl md:text-8xl font-serif font-medium text-white flex justify-center items-baseline tracking-tight leading-none drop-shadow-2xl">
            <span ref={displayValue} className="tabular-nums">{randomStart}</span>
            <span className="text-sr-orange ml-1 text-4xl md:text-6xl font-medium">{stat.suffix}</span>
          </div>
      </div>

      {/* Label - Explicitly using font-sans */}
      <div className="overflow-hidden">
          <h3 className="text-white/90 font-sans uppercase tracking-[0.3em] text-xs md:text-sm font-semibold transform transition-transform duration-500 group-hover:-translate-y-1 shadow-black/50 drop-shadow-lg">
            {stat.label}
          </h3>
      </div>
      
      {/* Description - Changed to font-sans for readability */}
      <div className="overflow-hidden h-0 group-hover:h-auto transition-all duration-500 ease-out mt-0 group-hover:mt-4 opacity-0 group-hover:opacity-100">
          <p className="text-white/70 font-sans text-sm md:text-base transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-100 max-w-[200px] leading-relaxed">
              {stat.description}
          </p>
      </div>
    </div>
  );
}
