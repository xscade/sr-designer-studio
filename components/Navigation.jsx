"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronLeft, ChevronRight, Menu } from "lucide-react";

const navItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "Services", href: "/services" },
  { name: "Process", href: "/#process-section" },
  { name: "Contact", href: "/contact" },
];

export default function Navigation() {
  const pathname = usePathname();
  const [isExpanded, setIsExpanded] = useState(true);
  const [isCollapsedByScroll, setIsCollapsedByScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Check if we are in the AI Generator section
      // You can refine this logic by using Intersection Observer if needed,
      // but checking scroll position relative to viewport height is simpler for this specific layout.
      
      // Assuming standard h-screen sections. 
      // The AI Generator is roughly the 7th-8th section based on the page layout.
      // However, horizontal scroll layouts are tricky with window.scrollY.
      // But since the main scroll is vertical (GSAP translates it to horizontal), 
      // window.scrollY increases normally.
      
      // We need to find the scroll trigger point for the AI Generator section.
      // A safer way is to check if the element is in view.
      const aiSection = document.querySelector('#ai-generator-section');
      const footerSection = document.querySelector('#footer-section');
      
      let shouldCollapse = false;

      if (aiSection) {
        const rect = aiSection.getBoundingClientRect();
        // Check if the section is significantly in the viewport (e.g., taking up >50%)
        if (rect.left < window.innerWidth * 0.5 && rect.right > window.innerWidth * 0.5) {
            shouldCollapse = true;
        }
      }

      if (footerSection) {
        const rect = footerSection.getBoundingClientRect();
        // Check if the section is significantly in the viewport
        if (rect.left < window.innerWidth * 0.5 && rect.right > window.innerWidth * 0.5) {
            shouldCollapse = true;
        }
      }
      
      if (shouldCollapse && !isCollapsedByScroll) {
          setIsExpanded(false);
          setIsCollapsedByScroll(true);
      } else if (!shouldCollapse && isCollapsedByScroll) {
          setIsExpanded(true);
          setIsCollapsedByScroll(false);
      }
    };

    // Add scroll listener to the window or the container if it's a custom scroller
    // Since GSAP scrollTrigger uses native scroll, window scroll event should work.
    window.addEventListener('scroll', handleScroll);
    // Also listen to resize/GSAP updates if possible, but scroll is main driver
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isCollapsedByScroll]);

  const handleNavClick = (e, href) => {
    // Check if it's a hash link for the homepage
    if (href.startsWith("/#")) {
      const targetId = href.replace("/#", "");
      
      // If we are already on the homepage, scroll manually
      if (pathname === "/") {
        e.preventDefault();
        
        const wrapper = document.querySelector("#horizontal-wrapper");
        const section = document.getElementById(targetId);

        if (wrapper && section) {
            const scrollWidth = wrapper.scrollWidth;
            const windowWidth = window.innerWidth;
            const offsetLeft = section.offsetLeft;
            
            const maxScroll = scrollWidth - windowWidth;
            if (maxScroll > 0) {
                const progress = offsetLeft / maxScroll;
                const scrollPos = progress * scrollWidth;
                
                window.scrollTo({
                    top: scrollPos,
                    behavior: "smooth"
                });
                
                // Update URL without jumping
                history.pushState(null, null, href);
            }
        }
      }
      // If not on homepage, let Link handle navigation to "/" with hash
    }
  };

  return (
    <>
      {/* Collapsible Glassmorphic Menu Bar - Top Right */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-6 right-8 z-50 hidden md:flex items-start"
      >
        <motion.nav 
            animate={{ width: isExpanded ? "auto" : "50px" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="bg-sr-black/60 backdrop-blur-xl border border-white/10 rounded-full shadow-2xl flex items-center overflow-hidden h-[70px]"
        >
            {/* Inner Glow Effect */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
            
            {/* Toggle Button */}
            <button 
                onClick={() => setIsExpanded(!isExpanded)}
                className="w-[50px] h-full flex items-center justify-center text-white/80 hover:text-white z-20 shrink-0 order-last"
                aria-label={isExpanded ? "Collapse menu" : "Expand menu"}
            >
                {isExpanded ? <ChevronRight size={20} /> : <Menu size={20} />}
            </button>

            {/* Menu Items */}
            <AnimatePresence>
                {isExpanded && (
                    <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.2 }}
                        className="flex items-center pl-2"
                    >
                        <ul className="flex items-center relative z-10">
                            {navItems.map((item) => {
                                const isActive = pathname === item.href;
                                return (
                                    <li key={item.name}>
                                        <Link
                                            href={item.href}
                                            onClick={(e) => handleNavClick(e, item.href)}
                                            className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 block mx-1 ${
                                                isActive 
                                                ? "text-sr-black bg-white shadow-sm" 
                                                : "text-white/80 hover:text-white hover:bg-white/10"
                                            }`}
                                        >
                                            {item.name}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                        
                        {/* Call to Action Button in Menu */}
                        <div className="ml-2 pl-2 border-l border-white/10">
                            <Link 
                                href="/contact" 
                                className="bg-sr-orange hover:bg-orange-600 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors shadow-lg whitespace-nowrap"
                            >
                                Book Now
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
      </motion.div>

      {/* Mobile Menu Toggle (Simple for now) */}
      <div className="fixed top-6 left-6 z-50 md:hidden">
         <div className="bg-sr-black/80 backdrop-blur-md p-3 rounded-full border border-white/10">
             <Menu className="text-white w-5 h-5" />
         </div>
      </div>
    </>
  );
}
