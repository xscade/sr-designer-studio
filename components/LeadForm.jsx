"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "./ui/Button";
import { Label } from "@radix-ui/react-label";
import { UploadCloud, CheckCircle } from "lucide-react";

export default function LeadForm() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const lead = {
      name: e.target.name.value,
      phone: e.target.phone.value,
      email: e.target.email.value,
      type: e.target.type.value,
      budget: e.target.budget.value,
      location: e.target.location.value,
    };

    try {
        const response = await fetch("/api/leads", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(lead),
        });

        if (response.ok) {
            setSubmitted(true);
        } else {
            console.error("Failed to submit lead");
        }
    } catch (error) {
        console.error("Error submitting form", error);
    }
  };

  return (
    <div className="w-full max-w-[100vw] px-6 md:px-12 flex items-center justify-start h-full relative">
        {/* Aesthetic Lamp Image - Bottom Right */}
        <div className="absolute bottom-0 right-0 w-[40vw] h-[90vh] pointer-events-none z-0 opacity-80 md:opacity-100">
            <img 
                src="https://storage.googleapis.com/client-web-files/sr%20designer%20studio/Lamp.png" 
                alt="Aesthetic Lamp" 
                className="w-full h-full object-contain object-bottom mix-blend-multiply"
            />
        </div>

        <div className="max-w-3xl w-full md:ml-0 lg:ml-12 relative z-10">
          <div className="text-left mb-8">
            <h2 className="text-4xl md:text-6xl font-bold text-sr-black mb-4 font-serif">Start Your Journey</h2>
            <p className="text-gray-500 text-lg">
              Ready to transform your space? Tell us a bit about your project.
            </p>
          </div>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-green-50 rounded-3xl p-12 text-center border border-green-100"
            >
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-sr-black mb-2 font-serif">Thank You!</h3>
              <p className="text-gray-600">
                Your enquiry has been received. Our team will contact you within 24 hours.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8 bg-white md:p-12 rounded-3xl md:shadow-2xl md:border md:border-gray-100">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium text-gray-700">Full Name</Label>
                  <input
                    id="name"
                    type="text"
                    required
                    className="w-full p-4 rounded-xl bg-gray-50 border border-transparent focus:bg-white focus:border-sr-orange focus:ring-2 focus:ring-sr-orange/20 outline-none transition-all"
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm font-medium text-gray-700">Phone Number</Label>
                  <input
                    id="phone"
                    type="tel"
                    required
                    className="w-full p-4 rounded-xl bg-gray-50 border border-transparent focus:bg-white focus:border-sr-orange focus:ring-2 focus:ring-sr-orange/20 outline-none transition-all"
                    placeholder="+91 98765 43210"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email Address</Label>
                <input
                  id="email"
                  type="email"
                  required
                  className="w-full p-4 rounded-xl bg-gray-50 border border-transparent focus:bg-white focus:border-sr-orange focus:ring-2 focus:ring-sr-orange/20 outline-none transition-all"
                  placeholder="john@example.com"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <Label htmlFor="type" className="text-sm font-medium text-gray-700">Project Type</Label>
                  <select
                    id="type"
                    className="w-full p-4 rounded-xl bg-gray-50 border border-transparent focus:bg-white focus:border-sr-orange focus:ring-2 focus:ring-sr-orange/20 outline-none transition-all appearance-none"
                  >
                    <option>Villa Design</option>
                    <option>Apartment Interior</option>
                    <option>Commercial Space</option>
                    <option>Landscape Architecture</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="budget" className="text-sm font-medium text-gray-700">Budget Range</Label>
                  <select
                    id="budget"
                    className="w-full p-4 rounded-xl bg-gray-50 border border-transparent focus:bg-white focus:border-sr-orange focus:ring-2 focus:ring-sr-orange/20 outline-none transition-all appearance-none"
                  >
                    <option>₹10L - ₹25L</option>
                    <option>₹25L - ₹50L</option>
                    <option>₹50L - ₹1Cr</option>
                    <option>Above ₹1Cr</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location" className="text-sm font-medium text-gray-700">Location</Label>
                <input
                  id="location"
                  type="text"
                  className="w-full p-4 rounded-xl bg-gray-50 border border-transparent focus:bg-white focus:border-sr-orange focus:ring-2 focus:ring-sr-orange/20 outline-none transition-all"
                  placeholder="e.g., Visakhapatnam, AP"
                />
              </div>

              <Button type="submit" size="lg" className="w-full text-lg h-16 bg-sr-orange hover:bg-orange-600 text-white">
                Request Consultation
              </Button>
            </form>
          )}
        </div>
    </div>
  );
}
