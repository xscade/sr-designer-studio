"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Hero from "@/components/Hero";
import FounderShowcase from "@/components/FounderShowcase";
import ServicesGrid from "@/components/ServicesGrid";
import Portfolio from "@/components/Portfolio";
import ProcessTimeline from "@/components/ProcessTimeline";
import AIGenerator from "@/components/AIGenerator";
import VideoShowcase from "@/components/VideoShowcase";
import LeadForm from "@/components/LeadForm";
import Footer from "@/components/Footer";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const containerRef = useRef(null);
  const wrapperRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const container = containerRef.current;
      const wrapper = wrapperRef.current;
      
      if (!container || !wrapper) return;

      // Get total width of the scrolling content
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
          end: () => `+=${wrapper.scrollWidth}`, // Scroll distance matches width
          invalidateOnRefresh: true,
        }
      });
    }, containerRef); // Scope to container

    return () => ctx.revert(); // Cleanup all GSAP animations/triggers
  }, []);

  return (
    <main className="overscroll-none bg-white selection:bg-sr-orange selection:text-white overflow-hidden">
      <div ref={containerRef} className="w-full h-full">
        <div ref={wrapperRef} className="flex h-screen w-fit">
        
        {/* Section 1: Hero */}
        <section className="w-screen h-screen shrink-0 relative">
          <Hero />
        </section>

        {/* Section 2: Founder */}
        <section className="w-screen h-screen shrink-0 bg-sr-beige flex items-center justify-center overflow-hidden">
           <div className="h-full w-full overflow-y-auto md:overflow-hidden">
             <FounderShowcase />
           </div>
        </section>

        {/* Section 3: Services */}
        <section className="w-screen h-screen shrink-0 bg-white flex items-center justify-center overflow-hidden">
             <div className="h-full w-full overflow-y-auto md:overflow-hidden flex items-center">
                <ServicesGrid />
             </div>
        </section>

        {/* Section 4: Portfolio (Already Horizontal) */}
        <div className="h-screen shrink-0">
          <Portfolio />
        </div>

        {/* Section 5: Process Timeline (Already Horizontal) */}
        <div className="h-screen shrink-0">
          <ProcessTimeline />
        </div>

        {/* Section 6: Video */}
        <section className="w-screen h-screen shrink-0 bg-sr-black flex items-center justify-center">
            <div className="w-full h-full flex items-center justify-center">
                <VideoShowcase />
            </div>
        </section>

        {/* Section 7: AI Generator */}
         <section className="w-screen h-screen shrink-0 bg-sr-beige/30 flex items-center justify-center">
            <div className="h-full w-full overflow-y-auto md:overflow-hidden flex items-center">
                <AIGenerator />
            </div>
        </section>

        {/* Section 8: Lead Form */}
        <section className="w-screen h-screen shrink-0 bg-white flex items-center justify-center">
             <div className="h-full w-full overflow-y-auto md:overflow-hidden flex items-center">
                <LeadForm />
             </div>
        </section>

        {/* Section 9: Footer */}
        <section className="w-screen h-screen shrink-0 bg-sr-black flex items-center justify-center">
             <div className="h-full w-full overflow-y-auto md:overflow-hidden flex items-center">
                <Footer />
             </div>
        </section>
      </div>
      </div>
    </main>
  );
}
