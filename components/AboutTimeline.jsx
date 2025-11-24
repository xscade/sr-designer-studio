"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const timelineEvents = [
  {
    year: "2014",
    title: "Inception",
    description: "SR Designer Studio was born from a small garage with a big vision: to redefine interior aesthetics in Vizag."
  },
  {
    year: "2016",
    title: "First Milestone",
    description: "Completed our 50th project, marking a significant footprint in residential design."
  },
  {
    year: "2019",
    title: "Expansion",
    description: "Moved to a premium studio space and expanded our team of architects and designers."
  },
  {
    year: "2021",
    title: "Awards & Recognition",
    description: "Recognized as one of the Top Emerging Design Studios in South India."
  },
  {
    year: "2024",
    title: "Going Global",
    description: "Launched our international consultation arm and partnered with global furniture brands."
  }
];

export default function AboutTimeline() {
  const containerRef = useRef(null);
  const [pathD, setPathD] = useState("");
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Calculate path logic
  useEffect(() => {
    const calculatePath = () => {
        if (!containerRef.current) return;

        const container = containerRef.current;
        const items = container.querySelectorAll('.timeline-item');
        const dots = container.querySelectorAll('.timeline-dot');
        
        if (dots.length === 0) return;

        const containerRect = container.getBoundingClientRect();
        let d = "";

        // We need positions relative to the container
        const points = Array.from(dots).map(dot => {
            const rect = dot.getBoundingClientRect();
            // Since the container might be transformed by GSAP/Scroll, we need to be careful.
            // However, inside the component, offsetLeft/Top is safer if no internal transforms.
            // But horizontal scroll usually transforms the parent. 
            // Let's rely on offsetLeft/Top relative to the container div.
            
            // Finding offset relative to container:
            // We can't use rect simply if parent is scaled/transformed. 
            // But for drawing SVG *inside* the same container, offset positions work best.
            
            // The dot is inside a relative div, inside the item.
            // Let's traverse up.
            
            // Easier approach: Layout is predictable.
            // Items are flexed.
            // Center Y is roughly containerHeight / 2.
            // X positions are regular.
            
            // Let's get the centers dynamically.
            const centerX = dot.offsetLeft + dot.offsetWidth / 2 + dot.closest('.timeline-item').offsetLeft;
            const centerY = dot.offsetTop + dot.offsetHeight / 2 + dot.closest('.timeline-item').offsetTop;
            
            return { x: centerX, y: centerY };
        });

        if (points.length > 0) {
            d += `M ${points[0].x} ${points[0].y}`;
            
            for (let i = 0; i < points.length - 1; i++) {
                const p1 = points[i];
                const p2 = points[i+1];
                const midX = (p1.x + p2.x) / 2;
                
                // Control points for smooth bezier
                // Creates a wave effect
                d += ` C ${midX} ${p1.y}, ${midX} ${p2.y}, ${p2.x} ${p2.y}`;
            }
        }

        setPathD(d);
        setDimensions({ width: container.scrollWidth, height: container.clientHeight });
    };

    // Initial calc
    // Delay slightly to ensure layout is done
    const timer = setTimeout(calculatePath, 500);
    window.addEventListener('resize', calculatePath);
    
    return () => {
        window.removeEventListener('resize', calculatePath);
        clearTimeout(timer);
    };
  }, []);

  return (
    <section className="h-full flex items-center bg-white relative overflow-hidden" id="timeline-section">
      <div ref={containerRef} className="flex items-center px-24 relative h-full min-w-[150vw] lg:min-w-[120vw]">
        
        {/* Title - Sticky or absolute at start */}
        <div className="absolute left-12 top-12 z-20">
             <h2 className="text-4xl font-serif font-bold text-sr-black">Our Journey</h2>
        </div>

        {/* The Bee Path (SVG) */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" style={{ width: dimensions.width }}>
            {/* Dashed Background Path */}
            <path
                d={pathD}
                fill="none"
                stroke="#E5E7EB"
                strokeWidth="2"
                strokeDasharray="8 8"
            />
            
            {/* Animated Path - We can animate strokeDashoffset for "drawing" effect */}
            <motion.path
                d={pathD}
                fill="none"
                stroke="#D97706"
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 3, ease: "easeInOut" }}
            />
        </svg>

        {/* Timeline Items */}
        <div className="flex items-center w-full justify-between gap-12 mt-12">
            {timelineEvents.map((event, index) => (
                <TimelineItem key={index} event={event} index={index} />
            ))}
        </div>
      </div>
    </section>
  );
}

function TimelineItem({ event, index }) {
  const isUp = index % 2 === 0; // Alternating up/down position relative to center
  
  return (
    <div className={`timeline-item relative flex flex-col items-center w-[300px] shrink-0 ${isUp ? '-mt-32' : 'mt-32'}`}>
      
      {/* Content Bubble */}
      <motion.div 
        initial={{ opacity: 0, y: isUp ? 20 : -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.2 }}
        className={`bg-white p-6 rounded-xl shadow-lg border border-gray-100 text-center relative z-10 mb-4 ${!isUp ? 'order-last mt-4' : ''}`}
      >
         <span className="text-sr-orange font-bold text-3xl font-serif block mb-2">
            {event.year}
         </span>
         <h3 className="text-lg font-bold text-sr-black mb-2">{event.title}</h3>
         <p className="text-sm text-gray-600 leading-relaxed">{event.description}</p>
      </motion.div>

      {/* Dot / Bee Anchor */}
      <div className="timeline-dot relative z-20">
        <div className="w-4 h-4 bg-sr-orange rounded-full ring-4 ring-orange-100">
            <div className="absolute inset-0 bg-sr-orange rounded-full animate-ping opacity-20"></div>
        </div>
      </div>

    </div>
  );
}
