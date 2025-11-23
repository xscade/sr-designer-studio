"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardTitle } from "./ui/Card";
import { Ruler, Sofa, Leaf, Trees } from "lucide-react";

const services = [
  {
    title: "Architectural Design",
    icon: Ruler,
    description: "Blueprints that blend form and function seamlessly.",
    gradient: "from-sr-red/10 to-sr-orange/10",
  },
  {
    title: "Interior Design",
    icon: Sofa,
    description: "Curated interiors reflecting your personal narrative.",
    gradient: "from-sr-orange/10 to-sr-beige/20",
  },
  {
    title: "Sustainable Design",
    icon: Leaf,
    description: "Eco-conscious materials for a healthier home.",
    gradient: "from-green-500/10 to-emerald-500/10",
  },
  {
    title: "Landscape Architecture",
    icon: Trees,
    description: "Outdoor spaces that extend your living area.",
    gradient: "from-blue-500/10 to-cyan-500/10",
  },
];

export default function ServicesGrid() {
  return (
    <div className="w-full max-w-[100vw] px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-sr-black mb-4 font-serif">Our Expertise</h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg">
            Comprehensive design solutions tailored to your lifestyle.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
            >
              <Card className={`h-full border-none shadow-lg bg-gradient-to-br ${service.gradient} hover:shadow-xl min-h-[300px]`}>
                <CardContent className="p-8 flex flex-col items-center text-center h-full justify-center gap-6">
                  <div className="p-4 bg-white rounded-full shadow-sm">
                    <service.icon className="w-8 h-8 text-sr-black" />
                  </div>
                  <CardTitle className="text-2xl font-serif">{service.title}</CardTitle>
                  <p className="text-gray-600 leading-relaxed">
                    {service.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
    </div>
  );
}
