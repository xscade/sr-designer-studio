"use client";

import { motion, useInView, useMotionValue, useSpring, animate } from "framer-motion";
import { useRef, useEffect } from "react";

const stats = [
  { label: "Projects Completed", value: 150, suffix: "+" },
  { label: "Happy Families", value: 120, suffix: "+" },
  { label: "Years of Excellence", value: 12, suffix: "+" },
  { label: "Design Awards", value: 15, suffix: "" },
];

export default function StatsSection() {
  return (
    <section className="py-24 bg-sr-black text-white">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <Counter key={index} stat={stat} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Counter({ stat }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const count = useMotionValue(0);
  const rounded = useSpring(count, { stiffness: 50, damping: 20 });
  const displayValue = useRef(null);

  useEffect(() => {
    if (isInView) {
      animate(count, stat.value, { duration: 2 });
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
    <div ref={ref} className="text-center">
      <div className="text-4xl md:text-6xl font-bold font-serif text-sr-orange mb-2 flex justify-center items-baseline">
        <span ref={displayValue}>0</span>
        <span>{stat.suffix}</span>
      </div>
      <p className="text-gray-400 uppercase tracking-widest text-xs md:text-sm font-medium">{stat.label}</p>
    </div>
  );
}
