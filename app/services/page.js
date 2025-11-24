"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import ServiceDetail from "@/components/ServiceDetail";
import Footer from "@/components/Footer";

gsap.registerPlugin(ScrollTrigger);

const servicesList = [
    {
        title: "Architectural Design",
        description: "We believe architecture is the art of creating environments that inspire. Our approach combines structural integrity with aesthetic brilliance, ensuring every building tells a unique story while remaining functional and enduring.",
        image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?q=80&w=2000&auto=format&fit=crop",
        features: ["Residential Planning", "Commercial Complexes", "Structural Analysis", "3D Visualization"],
        align: "left"
    },
    {
        title: "Interior Design",
        description: "Your space is a reflection of your personality. We curate interiors that blend luxury with comfort, using bespoke furniture, lighting, and textures to create an atmosphere of understated elegance.",
        image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop",
        features: ["Space Planning", "Custom Furniture", "Lighting Design", "Art Curation"],
        align: "right"
    },
    {
        title: "Sustainable Design",
        description: "Future-forward design that respects the planet. We implement eco-friendly practices, energy-efficient systems, and sustainable materials to reduce carbon footprints without compromising on luxury.",
        image: "https://images.unsplash.com/photo-1518542698889-ca82262f08d5?q=80&w=2000&auto=format&fit=crop",
        features: ["Energy Efficiency", "Eco-friendly Materials", "Passive Cooling", "Green Certifications"],
        align: "left"
    },
    {
        title: "Landscape Architecture",
        description: "Extending your living space into nature. Our landscape designs create seamless transitions between indoors and outdoors, featuring lush gardens, water bodies, and functional outdoor living areas.",
        image: "https://images.unsplash.com/photo-1558904541-efa843a96f01?q=80&w=2000&auto=format&fit=crop",
        features: ["Garden Design", "Hardscaping", "Water Features", "Outdoor Lighting"],
        align: "right"
    }
];

export default function ServicesPage() {
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
                    // Start of section
                    snapPoints.push(start / totalScroll);
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
          
          {/* Hero Section */}
          <section className="w-screen h-screen shrink-0 relative bg-sr-black flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 z-0">
                <img 
                    src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=90&w=2000&auto=format&fit=crop" 
                    alt="Services Hero" 
                    className="w-full h-full object-cover opacity-30"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-sr-black/80 to-transparent" />
            </div>
            
            <div className="relative z-10 px-6 max-w-6xl mx-auto w-full">
                <motion.h1 
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-6xl md:text-8xl lg:text-9xl font-serif font-bold text-white mb-8 leading-none"
                >
                    Our <br />
                    <span className="text-sr-orange italic">Services</span>
                </motion.h1>
                <motion.p 
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-xl md:text-2xl text-gray-300 font-light max-w-xl border-l-2 border-sr-orange pl-6"
                >
                    From conceptualization to execution, we offer a holistic suite of design services to bring your vision to life.
                </motion.p>
            </div>
          </section>

          {/* Service Sections */}
          {servicesList.map((service, index) => (
            <ServiceDetail 
                key={index} 
                {...service} 
                number={`0${index + 1}`}
            />
          ))}

          {/* Footer */}
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

