"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navigation from "@/components/Navigation";
import { Card, CardContent } from "@/components/ui/Card";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const projects = [
  {
    id: 1,
    title: "Seaview Penthouse",
    category: "Luxury Residential",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2653&auto=format&fit=crop",
    description: "A 5,000 sq ft penthouse with panoramic ocean views, featuring minimalist luxury and sustainable materials.",
  },
  {
    id: 2,
    title: "Azure Villa",
    category: "Architectural",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2653&auto=format&fit=crop",
    description: "Modern villa design integrating indoor-outdoor living with native landscaping and energy-efficient systems.",
  },
  {
    id: 3,
    title: "Urban Loft",
    category: "Interior",
    image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=2670&auto=format&fit=crop",
    description: "Industrial-chic loft transformation in the heart of the city, maximizing space with smart storage solutions.",
  },
  {
    id: 4,
    title: "Eco Sanctuary",
    category: "Sustainable",
    image: "https://images.unsplash.com/photo-1600210492493-0946911123ea?q=80&w=2674&auto=format&fit=crop",
    description: "Net-zero energy home featuring reclaimed materials, solar integration, and rainwater harvesting.",
  },
  {
    id: 5,
    title: "Minimalist Haven",
    category: "Interior",
    image: "https://images.unsplash.com/photo-1600607687644-c7171b42498f?q=80&w=2670&auto=format&fit=crop",
    description: "Scandinavian-inspired apartment with clean lines, natural textures, and curated art collection.",
  },
  {
    id: 6,
    title: "Heritage Restoration",
    category: "Architectural",
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2670&auto=format&fit=crop",
    description: "Careful restoration of a 1920s colonial bungalow, preserving heritage while adding modern amenities.",
  },
];

export default function Portfolio() {
  const containerRef = useRef(null);
  const wrapperRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    let ctx = gsap.context(() => {
      const container = containerRef.current;
      const wrapper = wrapperRef.current;
      
      if (!container || !wrapper) return;

      const getScrollAmount = () => {
          let scrollWidth = wrapper.scrollWidth;
          return -(scrollWidth - window.innerWidth);
      };

      gsap.to(wrapper, {
        x: getScrollAmount,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          pin: true,
          scrub: 1,
          end: () => `+=${wrapper.scrollWidth}`,
          invalidateOnRefresh: true,
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <main className="overscroll-none bg-white selection:bg-sr-orange selection:text-white overflow-hidden">
      <div ref={containerRef} className="w-full h-full">
        <div ref={wrapperRef} className="flex h-screen w-fit">
        
        {/* Section 1: Intro (Full Screen) */}
        <section className="w-screen h-screen shrink-0 relative bg-sr-black text-white flex items-center justify-center border-r border-white/10">
           <div className="text-center max-w-4xl px-6">
              <span className="text-sr-orange font-sans tracking-[0.3em] uppercase text-sm mb-8 block">
                 Our Collection
              </span>
              <h1 className="text-[10vw] font-serif font-bold leading-none mb-8">
                 Selected <br/> Works
              </h1>
              <p className="text-xl font-light font-sans text-white/60 max-w-xl mx-auto">
                 A curation of spaces that define modern luxury living.
              </p>
           </div>
        </section>

        {/* Projects Horizontal Flow */}
        {projects.map((project, index) => (
           <section key={project.id} className="w-[80vw] md:w-[60vw] h-screen shrink-0 relative group overflow-hidden border-r border-gray-100">
              <Link href={`/portfolio/${project.id}`} className="block w-full h-full">
                 <div className="absolute inset-0">
                    <img 
                       src={project.image} 
                       alt={project.title} 
                       className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors duration-500" />
                 </div>
                 
                 <div className="absolute bottom-0 left-0 w-full p-16 md:p-24 text-white z-10">
                    <div className="overflow-hidden mb-4">
                       <p className="text-sr-orange font-sans uppercase tracking-widest text-sm translate-y-full group-hover:translate-y-0 transition-transform duration-500 delay-100">
                          {project.category}
                       </p>
                    </div>
                    <h2 className="text-5xl md:text-7xl font-serif font-bold mb-6 translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                       {project.title}
                    </h2>
                    <div className="flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                       <span className="font-sans text-lg border-b border-sr-orange pb-1">View Case Study</span>
                       <ArrowRight className="w-6 h-6 text-sr-orange" />
                    </div>
                 </div>
              </Link>
           </section>
        ))}

        {/* Outro / Contact CTA */}
        <section className="w-screen h-screen shrink-0 bg-white flex items-center justify-center">
           <div className="text-center">
              <h2 className="text-6xl font-serif font-bold text-sr-black mb-8">
                 Have a vision?
              </h2>
              <Link href="/contact" className="group flex flex-col items-center">
                 <div className="w-32 h-32 rounded-full bg-sr-orange flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300 cursor-pointer shadow-xl shadow-orange-500/20">
                    <ArrowRight className="w-12 h-12 text-white" />
                 </div>
                 <p className="mt-6 font-sans text-gray-500 uppercase tracking-widest group-hover:text-sr-orange transition-colors font-semibold">Let's build it</p>
              </Link>
           </div>
        </section>

      </div>
      </div>
    </main>
  );
}

