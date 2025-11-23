"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { MoveHorizontal } from "lucide-react";

const categories = [
  {
    id: "kitchen",
    label: "Kitchen Interior",
    before: "https://images.unsplash.com/photo-1588854337221-4cf9fa96059c?q=80&w=1920&auto=format&fit=crop", // Empty/Old Kitchen
    after: "https://images.unsplash.com/photo-1556911220-bff31c812dba?q=80&w=1920&auto=format&fit=crop", // Modern Kitchen
  },
  {
    id: "office",
    label: "Office Interior",
    before: "https://images.unsplash.com/photo-1504384308090-c54be3855833?q=80&w=1920&auto=format&fit=crop", // Empty Office
    after: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1920&auto=format&fit=crop", // Modern Office
  },
  {
    id: "living",
    label: "Home Interior",
    before: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1920&auto=format&fit=crop", // Empty Living Room
    after: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1920&auto=format&fit=crop", // Furnished Living Room
  },
  {
    id: "bedroom",
    label: "Bedroom Interior",
    before: "https://images.unsplash.com/photo-1595846519845-68e298c2edd8?q=80&w=1920&auto=format&fit=crop", // Empty Bedroom
    after: "https://images.unsplash.com/photo-1616594039964-408e404cb298?q=80&w=1920&auto=format&fit=crop", // Cozy Bedroom
  },
  {
    id: "hall",
    label: "Hall Interior",
    before: "https://images.unsplash.com/photo-1513161455079-7dc1de15ef3e?q=80&w=1920&auto=format&fit=crop", // Empty Hall
    after: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1920&auto=format&fit=crop", // Luxury Hall
  },
  {
    id: "landscape",
    label: "Landscape Designs",
    before: "https://images.unsplash.com/photo-1558904541-efa843a96f01?q=80&w=1920&auto=format&fit=crop", // Raw Land
    after: "https://images.unsplash.com/photo-1600210491892-03d54cc0d578?q=80&w=1920&auto=format&fit=crop", // Landscaped Garden
  },
];

export default function BeforeAfterGallery() {
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const handleDrag = (e) => {
    if (!containerRef.current) return;
    const { left, width } = containerRef.current.getBoundingClientRect();
    const clientX = e.type.includes("touch") ? e.touches[0].clientX : e.clientX;
    const newPos = ((clientX - left) / width) * 100;
    setSliderPosition(Math.min(100, Math.max(0, newPos)));
  };

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);

  useEffect(() => {
    const handleMove = (e) => {
      if (isDragging) handleDrag(e);
    };
    const handleEnd = () => setIsDragging(false);

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseup", handleEnd);
    window.addEventListener("touchmove", handleMove);
    window.addEventListener("touchend", handleEnd);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseup", handleEnd);
      window.removeEventListener("touchmove", handleMove);
      window.removeEventListener("touchend", handleEnd);
    };
  }, [isDragging]);

  return (
    <section className="h-screen w-screen shrink-0 flex flex-col md:flex-row bg-white relative overflow-hidden">
      
      {/* Sidebar / Controls */}
      <div className="w-full md:w-[25vw] h-[30vh] md:h-full bg-sr-black text-white flex flex-col justify-center p-8 md:p-12 z-20 shrink-0">
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
        >
            <span className="text-sr-orange font-medium tracking-widest uppercase text-sm mb-4 block">
            Transformations
            </span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-8 leading-tight">
            Before & <br/> After
            </h2>
            
            <div className="flex flex-col gap-2">
            {categories.map((category) => (
                <button
                key={category.id}
                onClick={() => {
                    setActiveCategory(category);
                    setSliderPosition(50); // Reset slider on change
                }}
                className={cn(
                    "text-left py-3 px-4 rounded-lg transition-all duration-300 text-lg font-medium border-l-2",
                    activeCategory.id === category.id
                    ? "bg-white/10 border-sr-orange text-white pl-6"
                    : "border-transparent text-white/50 hover:text-white hover:bg-white/5"
                )}
                >
                {category.label}
                </button>
            ))}
            </div>
        </motion.div>
      </div>

      {/* Image Slider Area */}
      <div className="flex-1 h-[70vh] md:h-full relative bg-gray-100 overflow-hidden group select-none" ref={containerRef}>
        
        {/* Before Image (Background) */}
        <img 
            src={activeCategory.before} 
            alt={`${activeCategory.label} Before`}
            className="absolute inset-0 w-full h-full object-cover"
        />
        
        {/* Label: Before (Moved to bottom left, inline with slider hint) */}
        <div className="absolute bottom-8 left-8 bg-black/50 backdrop-blur-md text-white px-4 py-2 rounded-full text-sm font-medium z-30">
            Before
        </div>

        {/* After Image (Foreground - Clipped) */}
        <div 
            className="absolute inset-0 w-full h-full overflow-hidden"
            style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        >
            <img 
                src={activeCategory.after} 
                alt={`${activeCategory.label} After`}
                className="absolute inset-0 w-full h-full object-cover"
            />
            {/* Label: After (Moved to bottom right, inline with slider hint) */}
            <div className="absolute bottom-8 right-8 bg-sr-orange/80 backdrop-blur-md text-white px-4 py-2 rounded-full text-sm font-medium z-30">
                After
            </div>
        </div>

        {/* Slider Handle */}
        <div 
            className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize z-20 shadow-2xl"
            style={{ left: `${sliderPosition}%` }}
            onMouseDown={handleMouseDown}
            onTouchStart={handleMouseDown}
        >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-xl text-sr-black hover:scale-110 transition-transform">
                <MoveHorizontal className="w-6 h-6" />
            </div>
        </div>

        {/* Hint Overlay */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-black/30 backdrop-blur-sm text-white px-6 py-3 rounded-full text-sm pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-30">
            Drag slider to compare
        </div>

      </div>
    </section>
  );
}

