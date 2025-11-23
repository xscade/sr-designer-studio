"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ClipboardList, Map, PenTool, ShoppingBag, Hammer, Key, ArrowRight } from "lucide-react";

const steps = [
  {
    id: "01",
    title: "Understanding",
    description: "We begin by listening. Understanding your lifestyle, needs, and aspirations is the foundation.",
    icon: ClipboardList,
  },
  {
    id: "02",
    title: "Planning",
    description: "Strategic space planning to optimize flow, functionality, and light.",
    icon: Map,
  },
  {
    id: "03",
    title: "Designing",
    description: "Creating detailed 3D visualizations and material boards for your approval.",
    icon: PenTool,
  },
  {
    id: "04",
    title: "Procurement",
    description: "Sourcing premium materials and furniture from trusted global vendors.",
    icon: ShoppingBag,
  },
  {
    id: "05",
    title: "Assembly",
    description: "Precision execution by our skilled craftsmen under strict supervision.",
    icon: Hammer,
  },
  {
    id: "06",
    title: "Delivery",
    description: "The final reveal. We hand over your key to a fully realized dream home.",
    icon: Key,
  },
];

function TimelineStep({ step, index }) {
  return (
    <div className="w-[80vw] md:w-[30vw] h-full flex-shrink-0 flex flex-col justify-center p-8 md:p-12 border-r border-gray-100 last:border-r-0 relative group">
      <div className="absolute top-0 left-0 w-full h-1 bg-gray-100">
        <div className="h-full bg-sr-orange w-0 group-hover:w-full transition-all duration-700 ease-in-out" />
      </div>
      
      <div className="mb-8">
        <span className="text-6xl md:text-8xl font-serif text-sr-orange/10 font-bold absolute top-12 right-12 select-none">
          {step.id}
        </span>
        <div className="w-16 h-16 rounded-full bg-sr-black text-white flex items-center justify-center mb-6 group-hover:bg-sr-orange transition-colors duration-300 z-10 relative shadow-lg">
          <step.icon className="w-6 h-6" />
        </div>
      </div>
      
      <h3 className="text-3xl font-bold text-sr-black mb-4 font-serif relative z-10 group-hover:translate-x-2 transition-transform duration-300">
        {step.title}
      </h3>
      <p className="text-gray-600 leading-relaxed relative z-10 max-w-md">
        {step.description}
      </p>
    </div>
  );
}

export default function ProcessTimeline() {
  return (
    <section className="h-screen w-fit flex bg-white">
      {/* Intro Panel */}
      <div className="w-[100vw] md:w-[60vw] h-full flex-shrink-0 flex flex-col justify-center px-12 md:px-24 bg-sr-black text-white relative z-10">
         <span className="text-sr-orange font-medium tracking-widest uppercase text-sm mb-4 block">
            Our Process
          </span>
          <h2 className="text-5xl md:text-7xl font-bold mb-6 font-serif leading-tight">
            From Concept to<br/>  Completion
          </h2>
          <p className="text-white/60 max-w-md text-lg mb-12">
             A seamless six-step journey to your dream space.
          </p>
          <div className="flex items-center gap-2 text-white">
            <span>Scroll right</span>
            <ArrowRight className="w-5 h-5 animate-pulse" />
          </div>
      </div>

      {/* Steps */}
      <div className="flex h-full">
        {steps.map((step, index) => (
          <TimelineStep key={index} step={step} index={index} />
        ))}
      </div>
    </section>
  );
}
