"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import Link from "next/link";

export default function ServiceDetail({ id, title, description, features, image, number, align = "left" }) {
  const isLeft = align === "left";

  return (
    <section id={id} className="w-screen h-screen shrink-0 bg-white overflow-hidden relative flex items-center">
       <div className="container mx-auto px-6 md:px-12 h-full flex flex-col md:flex-row items-center justify-center gap-12 md:gap-24">
         
         {/* Image Side */}
         <div className={`w-full md:w-1/2 h-[40vh] md:h-[70vh] relative ${isLeft ? 'order-1 md:order-1' : 'order-1 md:order-2'}`}>
            <div className="absolute inset-0 bg-sr-beige/20 rounded-[3rem] transform rotate-3 scale-95" />
            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative h-full w-full rounded-[2.5rem] overflow-hidden shadow-2xl"
            >
                <img src={image} alt={title} className="w-full h-full object-cover" />
                
                {/* Overlay Number */}
                <div className="absolute -bottom-4 -right-4 md:-bottom-10 md:-right-10 text-[8rem] md:text-[12rem] font-serif font-bold text-white/20 pointer-events-none leading-none">
                    {number}
                </div>
            </motion.div>
         </div>

         {/* Content Side */}
         <div className={`w-full md:w-1/2 ${isLeft ? 'order-2 md:order-2' : 'order-2 md:order-1'}`}>
            <motion.div
                initial={{ opacity: 0, x: isLeft ? 30 : -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
            >
                <h2 className="text-4xl md:text-6xl font-serif font-bold text-sr-black mb-6 leading-tight">
                    {title}
                </h2>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-xl">
                    {description}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
                    {features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                            <div className="w-6 h-6 rounded-full bg-sr-orange/10 flex items-center justify-center shrink-0">
                                <Check size={14} className="text-sr-orange" />
                            </div>
                            <span className="text-gray-700 font-medium">{feature}</span>
                        </div>
                    ))}
                </div>

                <Link 
                    href="/contact#contact-form" 
                    className="inline-flex items-center justify-center bg-sr-orange text-white px-8 py-4 rounded-full font-medium hover:bg-orange-600 transition-all duration-300 shadow-lg shadow-sr-orange/30 hover:shadow-xl hover:scale-105"
                >
                    Request Consultation
                </Link>
            </motion.div>
         </div>

       </div>
    </section>
  );
}

