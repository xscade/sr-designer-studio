"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";

const navItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "Services", href: "/#services" },
  { name: "Process", href: "/#process" },
  { name: "Contact", href: "/contact" },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const menuRef = useRef(null);

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <>
      {/* Floating Navigation Bubble Container - Top Right */}
      <div className="fixed top-8 right-8 z-50 flex flex-col items-end">
        
        {/* Menu Toggle Button (Bubble Trigger) */}
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-2xl border border-white/20 text-white shadow-2xl z-50 relative overflow-hidden"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Toggle menu"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-50" />
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className="w-6 h-6 text-white drop-shadow-md" />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Menu className="w-6 h-6 text-white drop-shadow-md" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>

        {/* Glassmorphic Menu Bubble */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              ref={menuRef}
              initial={{ opacity: 0, scale: 0.8, y: -20, x: 20, borderRadius: "50%" }}
              animate={{ 
                opacity: 1, 
                scale: 1, 
                y: 16, 
                x: 0, 
                borderRadius: "24px",
                transition: { type: "spring", stiffness: 300, damping: 30 }
              }}
              exit={{ 
                opacity: 0, 
                scale: 0.8, 
                y: -20, 
                x: 20, 
                borderRadius: "50%",
                transition: { duration: 0.2 }
              }}
              className="absolute top-16 right-0 w-64 bg-sr-black/60 backdrop-blur-3xl border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] overflow-hidden z-40"
            >
              {/* Inner Noise/Texture Layer for iOS feel */}
              <div className="absolute inset-0 bg-white/5 opacity-10 pointer-events-none mix-blend-overlay" />
              
              <nav className="relative py-4 px-2">
                <ul className="space-y-1">
                  {navItems.map((item, index) => (
                    <motion.li
                      key={item.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link
                        href={item.href}
                        className={`block px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                          pathname === item.href
                            ? "bg-white/20 text-white shadow-sm backdrop-blur-sm"
                            : "text-white/80 hover:bg-white/10 hover:text-white hover:backdrop-blur-md"
                        }`}
                        onClick={() => setIsOpen(false)}
                      >
                        {item.name}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
                
                <div className="mt-4 pt-4 border-t border-white/10 px-4">
                   <p className="text-[10px] text-white/40 uppercase tracking-widest font-medium text-center">
                      SR Designer Studio
                   </p>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
