"use client";

import { useEffect, useRef, use } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navigation from "@/components/Navigation";
import { ArrowLeft, Calendar, MapPin, Ruler, ArrowRight } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

const projects = {
  1: {
    id: 1,
    title: "Seaview Penthouse",
    category: "Luxury Residential",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2653&auto=format&fit=crop",
    description: "A 5,000 sq ft penthouse with panoramic ocean views, featuring minimalist luxury and sustainable materials.",
    year: "2023",
    location: "Visakhapatnam",
    area: "5,000 sq ft",
    fullDescription: "This stunning penthouse redefines coastal luxury living. With floor-to-ceiling windows offering uninterrupted ocean vistas, the design emphasizes natural light and seamless indoor-outdoor flow. The space features custom Italian marble, reclaimed teak flooring, and a state-of-the-art smart home system.",
    images: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2653&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600607687644-c7171b42498f?q=80&w=2670&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=2670&auto=format&fit=crop",
    ],
  },
  2: {
    id: 2,
    title: "Azure Villa",
    category: "Architectural",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2653&auto=format&fit=crop",
    description: "Modern villa design integrating indoor-outdoor living with native landscaping and energy-efficient systems.",
    year: "2022",
    location: "Hyderabad",
    area: "8,500 sq ft",
    fullDescription: "Azure Villa represents a new paradigm in sustainable luxury architecture. The design seamlessly blends contemporary aesthetics with traditional Indian courtyard concepts, creating private outdoor spaces that serve as extensions of the interior living areas.",
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2653&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600210492493-0946911123ea?q=80&w=2674&auto=format&fit=crop",
    ],
  },
};

export default function ProjectDetail({ params }) {
  const { id } = use(params);
  const project = projects[parseInt(id)];
  const containerRef = useRef(null);
  const wrapperRef = useRef(null);

  if (!project) {
    notFound();
  }

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
        
        {/* Section 1: Hero Cover */}
        <section className="w-screen h-screen shrink-0 relative">
           <div className="absolute inset-0">
              <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/30" />
           </div>
           
           {/* Floating Back Button */}
           <Link href="/portfolio" className="absolute top-8 left-8 z-20 flex items-center gap-2 text-white hover:text-sr-orange transition-colors">
              <ArrowLeft className="w-6 h-6" />
              <span className="font-sans text-sm uppercase tracking-widest">Back to Portfolio</span>
           </Link>

           <div className="absolute bottom-0 left-0 w-full p-12 md:p-24 z-10">
              <motion.div 
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 transition={{ duration: 0.8 }}
              >
                 <p className="text-sr-orange font-sans uppercase tracking-[0.2em] text-sm mb-4">{project.category}</p>
                 <h1 className="text-7xl md:text-9xl font-serif font-bold text-white leading-none mb-8">{project.title}</h1>
                 
                 <div className="flex gap-12 text-white/80 font-sans text-lg">
                    <div className="flex items-center gap-3">
                       <Calendar className="w-5 h-5 text-sr-orange" />
                       <span>{project.year}</span>
                    </div>
                    <div className="flex items-center gap-3">
                       <MapPin className="w-5 h-5 text-sr-orange" />
                       <span>{project.location}</span>
                    </div>
                    <div className="flex items-center gap-3">
                       <Ruler className="w-5 h-5 text-sr-orange" />
                       <span>{project.area}</span>
                    </div>
                 </div>
              </motion.div>
           </div>
        </section>

        {/* Section 2: Narrative Description */}
        <section className="w-[50vw] md:w-[40vw] h-screen shrink-0 bg-white flex items-center justify-center px-16">
           <div className="max-w-xl">
              <h2 className="text-4xl font-serif font-bold mb-8 text-sr-black">The Narrative</h2>
              <p className="text-xl font-sans text-gray-600 leading-relaxed">
                 {project.fullDescription}
              </p>
           </div>
        </section>

        {/* Section 3: Image Gallery (Horizontal Strip) */}
        {project.images.map((img, index) => (
           <section key={index} className="w-[80vw] md:w-[60vw] h-screen shrink-0 relative p-12 md:p-24 bg-sr-beige">
              <div className="w-full h-full overflow-hidden shadow-2xl relative group">
                 <img 
                    src={img} 
                    alt={`${project.title} detail ${index}`} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                 />
              </div>
           </section>
        ))}

        {/* Section 4: Next Project CTA */}
        <section className="w-screen h-screen shrink-0 bg-sr-black text-white flex items-center justify-center relative overflow-hidden group">
           <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-500">
              <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2653&auto=format&fit=crop" className="w-full h-full object-cover" />
           </div>
           
           <div className="relative z-10 text-center">
              <p className="text-white/60 font-sans uppercase tracking-widest mb-4">Next Project</p>
              <h2 className="text-6xl md:text-8xl font-serif font-bold mb-8">Azure Villa</h2>
              <Link href="/portfolio/2">
                 <div className="w-24 h-24 rounded-full border border-white/30 flex items-center justify-center mx-auto hover:bg-white hover:text-sr-black transition-all duration-300">
                    <ArrowRight className="w-8 h-8" />
                 </div>
              </Link>
           </div>
        </section>

      </div>
      </div>
    </main>
  );
}

