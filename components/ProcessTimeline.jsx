"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
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

function TimelineStep({ step, index, isLast }) {
  return (
    <div className="w-[80vw] md:w-[30vw] h-full flex-shrink-0 flex flex-col justify-center p-8 md:p-12 border-r border-gray-100 last:border-r-0 relative group overflow-visible">
      <div className="absolute top-0 left-0 w-full h-1 bg-gray-100">
        <motion.div 
          className="h-full bg-sr-orange" 
          initial={{ width: "0%" }}
          whileInView={{ width: "100%" }}
          transition={{ duration: 1, delay: 0.5 }}
          viewport={{ once: true }}
        />
      </div>
      
      <div className="mb-8 relative">
        <span className="text-6xl md:text-8xl font-serif text-sr-orange/10 font-bold absolute top-12 right-12 select-none pointer-events-none">
          {step.id}
        </span>
        
        {/* Icon Container */}
        <motion.div 
          className="w-16 h-16 rounded-full bg-sr-black text-white flex items-center justify-center mb-6 relative z-20 shadow-lg"
          whileInView={{ 
            backgroundColor: "#E87F02", // sr-orange
            scale: [1, 1.2, 1],
          }}
          transition={{ 
            duration: 0.5, 
            delay: 0.2, // Slight delay to sync with the incoming line visually
            ease: "easeInOut"
          }}
          viewport={{ once: true, margin: "-50px" }}
        >
          <step.icon className="w-6 h-6" />
        </motion.div>

        {/* Connecting Line (Arc) */}
        {!isLast && (
          <div className="absolute top-8 left-8 w-[calc(100%)] h-32 pointer-events-none z-10 hidden md:block">
             <svg width="100%" height="100%" viewBox="0 0 300 100" fill="none" preserveAspectRatio="none" className="overflow-visible">
                {/* Base grey path */}
                <path 
                  d="M 32,32 Q 150,-50 332,32" 
                  stroke="#E5E7EB" 
                  strokeWidth="2" 
                  strokeDasharray="4 4"
                  fill="none"
                />
                {/* Animated orange path */}
                <motion.path 
                  d="M 32,32 Q 150,-50 332,32" 
                  stroke="#E87F02" 
                  strokeWidth="2"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  transition={{ duration: 1.5, ease: "easeInOut", delay: 0.5 }}
                  viewport={{ once: true }}
                />
             </svg>
          </div>
        )}
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        viewport={{ once: true }}
      >
        <h3 className="text-3xl font-bold text-sr-black mb-4 font-serif relative z-10">
            {step.title}
        </h3>
        <p className="text-gray-600 leading-relaxed relative z-10 max-w-md">
            {step.description}
        </p>
      </motion.div>
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
          <TimelineStep key={index} step={step} index={index} isLast={index === steps.length - 1} />
        ))}
      </div>
    </section>
  );
}
