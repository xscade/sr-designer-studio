"use client";

import { Card } from "./ui/Card";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const projects = [
  {
    id: 1,
    title: "Seaview Penthouse",
    category: "Luxury Residential",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2653&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Azure Villa",
    category: "Architectural",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2653&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Urban Loft",
    category: "Interior",
    image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=2670&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "Eco Sanctuary",
    category: "Sustainable",
    image: "https://images.unsplash.com/photo-1600210492493-0946911123ea?q=80&w=2674&auto=format&fit=crop",
  },
  {
    id: 5,
    title: "Minimalist Haven",
    category: "Interior",
    image: "https://images.unsplash.com/photo-1600607687644-c7171b42498f?q=80&w=2670&auto=format&fit=crop",
  },
];

export default function Portfolio() {
  return (
    <section className="h-screen w-fit flex items-center bg-sr-black text-white relative">
      {/* Intro Panel */}
      <div className="w-[100vw] md:w-[40vw] shrink-0 h-full flex flex-col justify-center px-12 md:px-24 border-r border-white/10">
        <h2 className="text-5xl md:text-7xl font-serif font-bold mb-6 leading-tight">
            Selected <br/> Works
        </h2>
        <p className="text-white/60 text-xl max-w-md mb-8">
          A curated collection of our finest architectural and interior design projects.
        </p>
      </div>

      {/* Projects */}
      <div className="flex h-full items-center">
        {projects.map((project) => (
          <div key={project.id} className="relative w-[90vw] md:w-[50vw] h-full border-r border-white/10 group shrink-0 overflow-hidden">
             <Link href={`/portfolio/${project.id}`} className="block w-full h-full">
               <div className="absolute inset-0">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-1000"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90" />
               </div>
               
               <div className="absolute bottom-0 left-0 p-12 md:p-24 w-full z-10">
                  <p className="text-sr-orange uppercase tracking-widest text-sm mb-3 font-medium">{project.category}</p>
                  <h3 className="text-4xl md:text-6xl font-serif font-bold mb-6">{project.title}</h3>
                  <div className="flex items-center gap-3 text-white group-hover:translate-x-2 transition-transform duration-300">
                     <span className="text-lg">View Case Study</span>
                     <ArrowRight className="w-5 h-5" />
                  </div>
               </div>
             </Link>
          </div>
        ))}
        
        {/* View All CTA */}
        <div className="w-[100vw] md:w-[40vw] shrink-0 h-full flex items-center justify-center bg-sr-orange cursor-pointer">
            <Link href="/portfolio" className="text-center text-white w-full h-full flex flex-col items-center justify-center">
                <h3 className="text-4xl font-serif font-bold mb-6">Explore All Projects</h3>
                <div className="w-20 h-20 rounded-full border-2 border-white flex items-center justify-center mx-auto hover:bg-white hover:text-sr-orange transition-all">
                    <ArrowRight className="w-8 h-8" />
                </div>
            </Link>
        </div>
      </div>
    </section>
  );
}
