"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FounderShowcase from "@/components/FounderShowcase";
import VideoShowcase from "@/components/VideoShowcase";
import AboutTimeline from "@/components/AboutTimeline";
import TeamSection from "@/components/TeamSection";
import Testimonials from "@/components/Testimonials";
import StatsSection from "@/components/StatsSection";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

export default function AboutPage() {
  const containerRef = useRef(null);
  const wrapperRef = useRef(null);

  useEffect(() => {
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
          snap: {
            snapTo: (progress) => {
                const totalScroll = wrapper.scrollWidth - window.innerWidth;
                const snapPoints = [];
                
                Array.from(wrapper.children).forEach((child) => {
                    const start = child.offsetLeft;
                    const width = child.offsetWidth;
                    
                    // Start of section
                    snapPoints.push(start / totalScroll);

                    // For wide sections (like Timeline), add intermediate snaps
                    if (width > window.innerWidth) {
                        let offset = window.innerWidth;
                        while (offset < width) {
                            const point = (start + offset) / totalScroll;
                            if (point <= 1) snapPoints.push(point);
                            offset += window.innerWidth;
                        }
                    }
                });
                
                snapPoints.push(1);
                
                const closest = snapPoints.reduce((prev, curr) => {
                    return Math.abs(curr - progress) < Math.abs(prev - progress) ? curr : prev;
                });

                return closest;
            },
            duration: { min: 0.2, max: 0.6 },
            ease: "power1.inOut",
          },
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
          
          {/* Section 1: Hero */}
          <section className="w-screen h-screen shrink-0 relative bg-sr-black flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 z-0">
                <img 
                    src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=90&w=2000&auto=format&fit=crop" 
                    alt="About Hero" 
                    className="w-full h-full object-cover opacity-40"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-sr-black" />
            </div>
            
            <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
                <motion.span 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-sr-orange uppercase tracking-[0.2em] text-sm md:text-base font-medium block mb-4"
                >
                    Est. 2014
                </motion.span>
                <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-5xl md:text-7xl lg:text-8xl font-serif font-medium text-white mb-6 leading-tight"
                >
                    Our Story
                </motion.h1>
                <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-lg md:text-xl text-gray-300 font-light max-w-2xl mx-auto"
                >
                    A journey of passion, precision, and transforming empty spaces into living masterpieces.
                </motion.p>
            </div>
          </section>

          {/* Section 2: Founder */}
          <section className="w-screen h-screen shrink-0 flex items-center justify-center bg-sr-beige overflow-hidden">
             <div className="w-full h-full flex items-center overflow-y-auto md:overflow-hidden">
                <FounderShowcase />
             </div>
          </section>

          {/* Section 3: Timeline (Horizontal) */}
          <section className="h-screen shrink-0">
             <AboutTimeline />
          </section>

          {/* Section 4: Stats */}
          <section className="w-screen h-screen shrink-0 bg-sr-black flex items-center justify-center">
             <div className="w-full">
                <StatsSection />
             </div>
          </section>

          {/* Section 5: Team */}
          <section className="w-screen h-screen shrink-0 bg-white flex items-center justify-center overflow-hidden">
             <div className="w-full h-full flex items-center overflow-y-auto md:overflow-hidden">
                <TeamSection />
             </div>
          </section>

          {/* Section 6: Video */}
          <section className="w-screen h-screen shrink-0 bg-sr-black flex items-center justify-center">
             <div className="w-full">
                <VideoShowcase />
             </div>
          </section>

          {/* Section 7: Testimonials */}
          <section className="w-screen h-screen shrink-0 bg-white flex items-center justify-center">
             <div className="w-full">
                <Testimonials />
             </div>
          </section>

          {/* Section 8: Footer */}
          <section className="w-screen h-screen shrink-0 bg-sr-black flex items-center justify-center">
             <div className="w-full h-full flex items-center overflow-y-auto md:overflow-hidden">
                <Footer />
             </div>
          </section>

        </div>
      </div>
    </main>
  );
}
