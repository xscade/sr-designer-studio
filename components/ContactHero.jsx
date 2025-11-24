"use client";

import { motion } from "framer-motion";

export default function ContactHero() {
  return (
    <div className="w-screen h-screen flex items-center justify-center bg-sr-black relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-sr-orange/20 via-sr-black to-sr-black opacity-40" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-sr-orange uppercase tracking-[0.3em] text-sm font-medium block mb-6"
          >
            Contact Us
          </motion.span>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-6xl md:text-8xl lg:text-9xl font-serif font-medium text-white leading-[0.9] mb-8"
          >
            Let's start a<br />
            <span className="text-white/30 italic"> conversation.</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-gray-400 font-light max-w-xl leading-relaxed"
          >
            Whether you have a specific project in mind or just want to explore possibilities, we're here to listen and guide you.
          </motion.p>
        </div>
      </div>
    </div>
  );
}

