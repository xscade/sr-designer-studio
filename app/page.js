"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Hero from "@/components/Hero";
import FounderShowcase from "@/components/FounderShowcase";
import ServicesGrid from "@/components/ServicesGrid";
import Portfolio from "@/components/Portfolio";
import BeforeAfterGallery from "@/components/BeforeAfterGallery";
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

      const mainTween = gsap.to(wrapper, {
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
              let withinProcessSection = false;
              
              // Calculate snap points dynamically based on section positions
              Array.from(wrapper.children).forEach((child) => {
                const start = child.offsetLeft;
                const width = child.offsetWidth;
                const end = start + width;
                
                const startProgress = start / totalScroll;
                const endProgress = end / totalScroll;

                // Add the start of the section
                snapPoints.push(startProgress);

                // Special handling for Process Section: Enable continuous scroll (no intermediate snaps)
                // We check if the current progress is within this section's range
                if (child.id === "process-section") {
                    if (progress > startProgress && progress < endProgress) {
                        withinProcessSection = true;
                    }
                } 
                // For other wide sections (like Portfolio), keep the 100vw snapping
                else if (width > window.innerWidth) {
                  let offset = window.innerWidth;
                  while (offset < width) {
                    const point = (start + offset) / totalScroll;
                    if (point <= 1) snapPoints.push(point);
                    offset += window.innerWidth;
                  }
                }
              });
              
              // Ensure the very end is a snap point
              snapPoints.push(1);

              // If we are inside the Process section, return the current progress (disable snapping)
              // This allows the user to scroll continuously/freely within this specific section
              if (withinProcessSection) {
                  return progress;
              }

              // Find the closest snap point for other sections
              const closest = snapPoints.reduce((prev, curr) => {
                return Math.abs(curr - progress) < Math.abs(prev - progress) ? curr : prev;
              });

              return closest;
            },
            duration: { min: 0.2, max: 0.6 },
            ease: "power1.inOut",
          },
          end: () => `+=${wrapper.scrollWidth}`, // Scroll distance matches width
          invalidateOnRefresh: true,
        }
      });

      // Enhanced UX: Pin the Portfolio Intro Panel while scrolling through projects
      // This creates a "sticky" effect for the intro text while cards scroll by
      gsap.to("#portfolio-panel", {
        x: () => {
            const section = document.querySelector("#portfolio-section");
            if (!section) return 0;
            // Move panel to the right as the container moves left, keeping it visually pinned
            // Distance = Width of section - Width of screen (the amount of overflow)
            return section.offsetWidth - window.innerWidth;
        },
        ease: "none",
        scrollTrigger: {
            trigger: "#portfolio-section",
            containerAnimation: mainTween,
            start: "left left",
            end: "right right",
            scrub: true,
        }
      });
    }, containerRef); // Scope to container

    return () => ctx.revert(); // Cleanup all GSAP animations/triggers
  }, []);

  // Handle hash navigation on mount
  useEffect(() => {
    // Small delay to ensure layout is ready
    const timer = setTimeout(() => {
        const hash = window.location.hash;
        if (hash) {
            const targetId = hash.substring(1);
            const wrapper = document.querySelector("#horizontal-wrapper");
            const section = document.getElementById(targetId);

            if (wrapper && section) {
                const scrollWidth = wrapper.scrollWidth;
                const windowWidth = window.innerWidth;
                const offsetLeft = section.offsetLeft;
                
                // Calculate the scroll position based on the GSAP mapping
                // Formula: P = L / (W - V) -> Scroll = P * W
                const maxScroll = scrollWidth - windowWidth;
                if (maxScroll > 0) {
                    const progress = offsetLeft / maxScroll;
                    const scrollPos = progress * scrollWidth;
                    
                    window.scrollTo({
                        top: scrollPos,
                        behavior: "smooth"
                    });
                }
            }
        }
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="overscroll-none bg-white selection:bg-sr-orange selection:text-white overflow-hidden">
      <div ref={containerRef} className="w-full h-full">
        <div ref={wrapperRef} id="horizontal-wrapper" className="flex h-screen w-fit">
        
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

        {/* Section 5: Before & After Gallery */}
        <div className="h-screen shrink-0">
          <BeforeAfterGallery />
        </div>

        {/* Section 6: Process Timeline (Already Horizontal) */}
        <div id="process-section" className="h-screen shrink-0">
          <ProcessTimeline />
        </div>

        {/* Section 7: Video */}
        <section className="w-screen h-screen shrink-0 bg-sr-black flex items-center justify-center">
            <div className="w-full h-full flex items-center justify-center">
                <VideoShowcase />
            </div>
        </section>

        {/* Section 7: AI Generator */}
         <section id="ai-generator-section" className="w-screen h-screen shrink-0 bg-sr-beige/30 flex items-center justify-center">
            <div className="h-full w-full overflow-y-auto md:overflow-hidden flex items-center">
                <AIGenerator />
            </div>
        </section>

        {/* Section 8: Lead Form */}
        <section className="w-screen h-screen shrink-0 bg-white flex items-center justify-center">
             <div className="h-full w-full overflow-y-auto flex items-center py-12">
                <LeadForm />
             </div>
        </section>

        {/* Section 9: Footer */}
        <section id="footer-section" className="w-screen h-screen shrink-0 bg-sr-black flex items-center justify-center">
             <div className="h-full w-full overflow-y-auto md:overflow-hidden flex items-center">
                <Footer />
             </div>
        </section>
      </div>
      </div>
    </main>
  );
}
