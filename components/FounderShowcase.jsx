"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";

export default function FounderShowcase() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 md:py-32 bg-sr-beige text-sr-black overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative"
          >
            <div className="relative aspect-[3/4] md:aspect-square overflow-hidden rounded-2xl shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-500">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2574&auto=format&fit=crop"
                alt="Founder"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>
            {/* Floating Badge */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="absolute -bottom-8 -right-8 bg-white p-6 rounded-xl shadow-xl max-w-[200px]"
            >
              <p className="text-sm font-medium text-sr-black">
                "Design is not just what it looks like and feels like. Design is how it works."
              </p>
            </motion.div>
          </motion.div>

          {/* Content Side */}
          <div ref={ref} className="flex flex-col justify-center">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="text-sr-orange font-semibold tracking-wider uppercase mb-4"
            >
              The Visionary
            </motion.span>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold mb-8 leading-tight font-serif"
            >
              Crafting Lifestyle, <br /> Not Just Interiors.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg text-gray-700 mb-8 leading-relaxed"
            >
              With over a decade of experience transforming spaces in Visakhapatnam, we believe in a philosophy of understated luxury. Every curve, texture, and light source is deliberate.
            </motion.p>

            {/* Animated Signature */}
            <div className="w-48 h-24 relative">
               <svg
                viewBox="0 0 200 100"
                className="w-full h-full stroke-sr-black stroke-2 fill-transparent"
              >
                <motion.path
                  d="M10,80 Q50,10 90,80 T180,50" // Simple wave for now
                  initial={{ pathLength: 0 }}
                  animate={isInView ? { pathLength: 1 } : {}}
                  transition={{ duration: 2, ease: "easeInOut", delay: 0.5 }}
                />
                {/* Add more paths for a realistic signature look if needed */}
              </svg>
              <p className="text-sm text-gray-500 mt-2">Founder & Lead Designer</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

