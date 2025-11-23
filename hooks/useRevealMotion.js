import { useInView } from "framer-motion";
import { useRef } from "react";

export function useRevealMotion(options = {}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px", ...options });

  const variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }, // Apple-like easing
  };

  return { ref, isInView, variants };
}

