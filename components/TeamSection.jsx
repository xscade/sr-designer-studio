"use client";

import { motion } from "framer-motion";
import { Instagram, Linkedin, Twitter } from "lucide-react";

const teamMembers = [
  {
    name: "Sarah Johnson",
    role: "Senior Interior Designer",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop",
    bio: "Specializes in minimalist aesthetics and sustainable materials."
  },
  {
    name: "Michael Chen",
    role: "Lead Architect",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&auto=format&fit=crop",
    bio: "Focuses on structural integrity and spatial harmony."
  },
  {
    name: "Emily Davis",
    role: "Decor Specialist",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=800&auto=format&fit=crop",
    bio: "Expert in textiles, color theory, and finishing touches."
  },
  {
    name: "David Wilson",
    role: "Project Manager",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=800&auto=format&fit=crop",
    bio: "Ensures every project is delivered on time and within budget."
  }
];

export default function TeamSection() {
  return (
    <section className="py-24 bg-sr-beige/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif font-bold text-sr-black mb-4">Meet The Minds</h2>
          <p className="text-gray-500 text-lg">The creative force behind our masterpieces.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group"
            >
              <div className="relative overflow-hidden rounded-2xl aspect-[3/4] mb-6 shadow-lg">
                <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                    <SocialLink icon={<Linkedin size={20} />} />
                    <SocialLink icon={<Instagram size={20} />} />
                    <SocialLink icon={<Twitter size={20} />} />
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-sr-black">{member.name}</h3>
              <p className="text-sr-orange font-medium text-sm uppercase tracking-wider mb-2">{member.role}</p>
              <p className="text-gray-500 text-sm">{member.bio}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SocialLink({ icon }) {
    return (
        <a href="#" className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-sr-black hover:bg-sr-orange hover:text-white transition-colors transform hover:scale-110">
            {icon}
        </a>
    )
}

