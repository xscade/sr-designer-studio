"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ContactHero from "@/components/ContactHero";
import ContactDetails from "@/components/ContactDetails";
import LeadForm from "@/components/LeadForm";
import Footer from "@/components/Footer";

gsap.registerPlugin(ScrollTrigger);

export default function ContactPage() {
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
                    const end = start + width;
                    
                    snapPoints.push(start / totalScroll);
                    
                    // For wide sections
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

  // Handle hash navigation on mount
  useEffect(() => {
    const timer = setTimeout(() => {
        const hash = window.location.hash;
        if (hash) {
            const targetId = hash.substring(1);
            const wrapper = wrapperRef.current;
            const section = document.getElementById(targetId);

            if (wrapper && section) {
                const scrollWidth = wrapper.scrollWidth;
                const windowWidth = window.innerWidth;
                const offsetLeft = section.offsetLeft;
                
                // Calculate the scroll position
                // P = offsetLeft / (totalScrollWidth - viewportWidth)
                // ScrollY = P * totalDuration (which is set to scrollWidth in GSAP)
                
                const maxHorizontalScroll = scrollWidth - windowWidth;
                
                if (maxHorizontalScroll > 0) {
                    const progress = offsetLeft / maxHorizontalScroll;
                    // The total vertical scroll distance defined in ScrollTrigger is wrapper.scrollWidth
                    const scrollPos = progress * scrollWidth;
                    
                    window.scrollTo({
                        top: scrollPos,
                        behavior: "smooth"
                    });
                }
            }
        }
    }, 1000); // Slight delay to allow GSAP to initialize and layout to settle
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="overscroll-none bg-white selection:bg-sr-orange selection:text-white overflow-hidden">
      <div ref={containerRef} className="w-full h-full">
        <div ref={wrapperRef} className="flex h-screen w-fit">
          
          {/* Section 1: Hero */}
          <section className="w-screen h-screen shrink-0">
            <ContactHero />
          </section>

          {/* Section 2: Map & Details */}
          <section className="w-screen h-screen shrink-0">
            <ContactDetails />
          </section>

          {/* Section 3: Contact Form */}
          <section id="contact-form" className="w-screen h-screen shrink-0 bg-white flex items-center justify-center">
             <div className="w-full h-full flex items-center overflow-y-auto py-12">
                <LeadForm />
             </div>
          </section>

          {/* Section 4: Footer */}
          <section id="footer-section" className="w-screen h-screen shrink-0 bg-sr-black flex items-center justify-center">
             <div className="w-full h-full flex items-center overflow-y-auto md:overflow-hidden">
                <Footer />
             </div>
          </section>

        </div>
      </div>
    </main>
  );
}

