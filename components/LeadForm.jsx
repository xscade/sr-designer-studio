"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "./ui/Button";
import { Label } from "@radix-ui/react-label";
import { UploadCloud, CheckCircle } from "lucide-react";

export default function LeadForm() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="w-full max-w-[100vw] px-6 md:px-12 flex items-center justify-start h-full">
        <div className="max-w-3xl w-full md:ml-12 lg:ml-24">
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
            <form onSubmit={handleSubmit} className="space-y-8 bg-white md:p-12 rounded-3xl md:shadow-2xl md:border md:border-gray-100 max-h-[70vh] overflow-y-auto custom-scrollbar">
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

              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">Upload Reference / Floor Plan</Label>
                <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center hover:border-sr-orange/50 transition-colors cursor-pointer group">
                  <UploadCloud className="w-10 h-10 text-gray-400 mx-auto mb-2 group-hover:text-sr-orange transition-colors" />
                  <p className="text-sm text-gray-500">
                    <span className="text-sr-orange font-medium">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-gray-400 mt-1">SVG, PNG, JPG or PDF (max. 10MB)</p>
                </div>
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
