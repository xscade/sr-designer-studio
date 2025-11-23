"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function useHorizontalScroll() {
  const containerRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const container = containerRef.current;

    if (!section || !container) return;

    const ctx = gsap.context(() => {
      const scrollWidth = section.scrollWidth;
      const windowWidth = window.innerWidth;

      gsap.to(section, {
        x: () => -(scrollWidth - windowWidth),
        ease: "none",
        scrollTrigger: {
          trigger: container,
          pin: true,
          scrub: 1,
          end: () => `+=${scrollWidth}`,
          invalidateOnRefresh: true,
        },
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return { containerRef, sectionRef };
}

