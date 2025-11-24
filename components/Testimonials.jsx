"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    id: 1,
    text: "SR Designer Studio transformed our villa into a dream home. The attention to detail is simply unmatched.",
    author: "Priya Reddy",
    role: "Homeowner, Vizag",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop"
  },
  {
    id: 2,
    text: "Professional, creative, and incredibly easy to work with. They understood our vision perfectly.",
    author: "Rajesh Kumar",
    role: "CEO, TechCorp",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop"
  },
  {
    id: 3,
    text: "The team went above and beyond to ensure every corner of our office reflected our brand identity.",
    author: "Anita Desai",
    role: "Director, Creative Agency",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop"
  }
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <Quote className="w-16 h-16 text-sr-orange/20 mx-auto mb-8" />
          
          <div className="relative min-h-[300px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <p className="text-2xl md:text-4xl font-serif font-medium text-sr-black leading-relaxed mb-10">
                  "{testimonials[currentIndex].text}"
                </p>
                
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full overflow-hidden mb-4 border-2 border-sr-orange/20 p-1">
                    <img 
                        src={testimonials[currentIndex].image} 
                        alt={testimonials[currentIndex].author} 
                        className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                  <h4 className="text-xl font-bold text-sr-black">{testimonials[currentIndex].author}</h4>
                  <p className="text-gray-500">{testimonials[currentIndex].role}</p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <button 
                onClick={prevSlide}
                className="absolute left-0 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-sr-orange transition-colors hidden md:block"
            >
                <ChevronLeft size={40} />
            </button>
            <button 
                onClick={nextSlide}
                className="absolute right-0 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-sr-orange transition-colors hidden md:block"
            >
                <ChevronRight size={40} />
            </button>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-3 mt-12">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  idx === currentIndex ? "bg-sr-orange w-8" : "bg-gray-200"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

