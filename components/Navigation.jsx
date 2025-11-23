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
  { name: "Services", href: "/#services" },
  { name: "Process", href: "/#process" },
  { name: "Contact", href: "/contact" },
];

export default function Navigation() {
  const pathname = usePathname();
  const [isExpanded, setIsExpanded] = useState(true);

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
