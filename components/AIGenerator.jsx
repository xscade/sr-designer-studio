"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./ui/Button";
import { Sparkles, Loader2, Check, Upload, Image as ImageIcon, X, Lightbulb, Maximize2, Download, Paperclip, RefreshCw } from "lucide-react";
import { Label } from "@radix-ui/react-label";
import { cn } from "@/lib/utils";

const CONTEXT_TAGS = [
  "Industrial", "Home", "Office", "Bedroom", "Kitchen", "Bathroom", "Balcony", "Landscape", "Minimalist", "Luxury"
];

const SLIDER_IMAGES = [
  "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=90&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=90&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=90&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=90&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?q=90&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=90&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=90&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1600607687644-c7171b42498f?q=90&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?q=90&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?q=90&w=800&auto=format&fit=crop"
];

const DESIGN_QUOTES = [
  "Design is not just what it looks like and feels like. Design is how it works.",
  "Simplicity is the ultimate sophistication.",
  "Architecture starts when you carefully put two bricks together. There it begins.",
  "The details are not the details. They make the design.",
  "Recognizing the need is the primary condition for design.",
  "Form follows function.",
  "Less is more.",
  "Every great design begins with an even better story."
];

export default function AIGenerator() {
  const [prompt, setPrompt] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedTags, setSelectedTags] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [results, setResults] = useState([]); 
  const [error, setError] = useState(null);
  const [ideas, setIdeas] = useState([]);
  const [isLoadingIdeas, setIsLoadingIdeas] = useState(true);
  const [activeImage, setActiveImage] = useState(null);
  const [progress, setProgress] = useState(0); // 0, 1, 2, 3
  const [currentQuote, setCurrentQuote] = useState("");
  const fileInputRef = useRef(null);

  const fetchIdeas = async () => {
    setIsLoadingIdeas(true);
    try {
      const res = await fetch("/api/generate-ideas");
      const data = await res.json();
      if (data.ideas) {
        setIdeas(data.ideas);
      }
    } catch (e) {
      console.error("Failed to fetch ideas", e);
      // Fallback ideas if API fails
      setIdeas([
        "Bohemian bedroom with hanging plants and macrame.",
        "Industrial loft with exposed brick and modern art.",
        "Minimalist living room bathed in natural light, serene.",
        "Luxury bathroom: marble, gold accents, freestanding tub."
      ]);
    } finally {
      setIsLoadingIdeas(false);
    }
  };

  useEffect(() => {
    fetchIdeas();
  }, []);

  const handleImageSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setError(null);

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64String = event.target.result;
      const base64Data = base64String.split(",")[1];
      
      setSelectedImage({
        url: URL.createObjectURL(file),
        base64: base64Data,
        type: file.type,
        name: file.name
      });
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setSelectedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const toggleTag = (tag) => {
    setSelectedTags(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const handleGenerate = async () => {
    if (!prompt && !selectedImage) return;
    setIsGenerating(true);
    setResults([]);
    setError(null);
    setProgress(0);
    
    // Random initial quote
    setCurrentQuote(DESIGN_QUOTES[Math.floor(Math.random() * DESIGN_QUOTES.length)]);

    // Quote rotation interval
    const quoteInterval = setInterval(() => {
        setCurrentQuote(DESIGN_QUOTES[Math.floor(Math.random() * DESIGN_QUOTES.length)]);
    }, 3000);
    
    // Simulated progress steps (purely visual feedback while waiting)
    const progressInterval = setInterval(() => {
        setProgress(prev => {
            if (prev < 2) return prev + 1;
            return prev;
        });
    }, 4000); // Updates roughly every 4 seconds
    
    // Construct enriched prompt
    let finalPrompt = prompt;
    if (selectedTags.length > 0) {
      finalPrompt += `. Context and Style: ${selectedTags.join(", ")}.`;
    }

    try {
      const response = await fetch("/api/generate-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          prompt: finalPrompt,
          image: selectedImage ? selectedImage.base64 : null,
          mimeType: selectedImage ? selectedImage.type : null
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to generate image");
      }

      if (data.results && Array.isArray(data.results)) {
        setProgress(3); // Complete
        setResults(data.results);
      } else if (data.result) {
        setProgress(3); // Complete
        setResults([data.result]);
      } else {
        throw new Error("No result received from AI");
      }
    } catch (error) {
      console.error("Generation failed:", error);
      setError(error.message);
    } finally {
      clearInterval(quoteInterval);
      clearInterval(progressInterval);
      setIsGenerating(false);
    }
  };

  return (
    <div className="w-screen h-screen flex overflow-hidden">
      
      {/* Input Side - 60% Width */}
      <div className="w-full lg:w-[60vw] h-full flex items-center justify-center bg-sr-beige/30 p-8 relative z-10 overflow-hidden">
        <div className="max-w-3xl w-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sr-orange/10 text-sr-orange text-xs font-bold uppercase tracking-wider mb-6 mt-16 md:mt-0">
                <Sparkles className="w-3 h-3" />
                AI Powered
              </div>
              <h2 className="text-4xl md:text-6xl font-bold text-sr-black mb-4 font-serif">Visualize Your Dream Room with SR AI</h2>
              <p className="text-gray-600 mb-8 text-lg">
                Describe your ideal space or upload a photo to reimagine it.
              </p>

              <div className="flex flex-col gap-6">
                
                {/* Prompt Input - Larger & Clearer with Embedded Attach Button */}
                <div className="space-y-2 relative">
                  <Label htmlFor="ai-prompt" className="text-sm font-medium text-sr-black ml-1">
                    Describe your vision
                  </Label>
                  <div className="relative group">
                    <textarea
                        id="ai-prompt"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="E.g., A modern minimalist living room with beige tones, large windows, and indoor plants..."
                        className="w-full p-6 pb-16 rounded-2xl border border-gray-200/50 bg-white/60 backdrop-blur-md focus:bg-white/90 focus:border-sr-orange/50 focus:ring-4 focus:ring-sr-orange/10 outline-none min-h-[160px] resize-none text-lg leading-relaxed transition-all shadow-sm placeholder:text-gray-400"
                    />
                    
                    {/* Bottom Toolbar inside Textarea */}
                    <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center">
                        {/* Image Preview Pill */}
                        <div className="flex items-center">
                            <AnimatePresence>
                                {selectedImage && (
                                    <motion.div 
                                        initial={{ opacity: 0, scale: 0.8, y: 10 }}
                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.8, y: 10 }}
                                        className="flex items-center gap-2 bg-white/90 backdrop-blur-md pl-1 pr-2 py-1 rounded-full border border-gray-200 shadow-sm"
                                    >
                                        <img src={selectedImage.url} alt="Preview" className="w-8 h-8 rounded-full object-cover border border-gray-100" />
                                        <span className="text-xs text-gray-600 max-w-[120px] truncate font-medium">{selectedImage.name}</span>
                                        <button 
                                            onClick={removeImage} 
                                            className="bg-gray-100 hover:bg-red-100 text-gray-400 hover:text-red-500 rounded-full p-1 transition-colors"
                                        >
                                            <X className="w-3 h-3" />
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Attach Button (Paperclip) */}
                        <div className="flex gap-2">
                             <Button 
                                variant="ghost" 
                                size="sm" 
                                className="text-gray-400 hover:text-sr-orange hover:bg-sr-orange/10 rounded-full h-10 w-10 p-0"
                                onClick={() => fileInputRef.current?.click()}
                                title="Attach Reference Image"
                             >
                                <Paperclip className="w-5 h-5" />
                                <span className="sr-only">Attach Image</span>
                             </Button>
                             <input 
                                type="file" 
                                ref={fileInputRef} 
                                className="hidden" 
                                accept="image/*" 
                                onChange={handleImageSelect}
                            />
                        </div>
                    </div>
                  </div>
                </div>

                {/* Context Tags */}
                <div className="space-y-2">
                    <Label className="text-xs font-medium text-gray-500 ml-1 uppercase tracking-widest">Context & Style</Label>
                    <div className="flex flex-wrap gap-2">
                        {CONTEXT_TAGS.map(tag => (
                            <button
                                key={tag}
                                onClick={() => toggleTag(tag)}
                                className={cn(
                                    "px-4 py-2 rounded-full text-sm font-medium transition-all border",
                                    selectedTags.includes(tag) 
                                        ? "bg-sr-black text-white border-sr-black" 
                                        : "bg-white/50 text-gray-600 border-gray-200 hover:border-sr-orange hover:text-sr-orange"
                                )}
                            >
                                {tag}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Generate Button - Full Width */}
                <div className="w-full mt-4">
                    <Button 
                    onClick={handleGenerate} 
                    disabled={isGenerating || (!prompt && !selectedImage)}
                    className="w-full h-16 text-lg rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all bg-sr-orange hover:bg-orange-600 text-white"
                    >
                    {isGenerating ? (
                        <>
                        <Loader2 className="mr-2 h-6 w-6 animate-spin" />
                        Dreaming...
                        </>
                    ) : (
                        <>
                        <Sparkles className="mr-2 h-6 w-6" />
                        Generate Concept
                        </>
                    )}
                    </Button>
                </div>

              </div>
            </motion.div>
        </div>
      </div>

      {/* Result Side - 40% Width, 100vh */}
      <div className="w-full lg:w-[40vw] h-screen relative border-l border-gray-100 shrink-0 flex flex-col overflow-hidden bg-gray-50">
          
          {/* Background AI Gradient Layer */}
          <div className="absolute inset-0 z-0 overflow-hidden bg-white">
             <div className="absolute -top-[10%] -right-[10%] w-[80%] h-[80%] rounded-full bg-gradient-to-br from-sr-orange/40 to-purple-400/30 blur-3xl animate-[pulse_8s_ease-in-out_infinite]" />
             <div className="absolute top-[20%] -left-[10%] w-[70%] h-[70%] rounded-full bg-gradient-to-tr from-blue-300/30 to-sr-beige/60 blur-3xl animate-[pulse_10s_ease-in-out_infinite_reverse]" />
             <div className="absolute inset-0 bg-white/20 backdrop-blur-xl" />
          </div>

          <AnimatePresence mode="wait">
            {results.length === 0 && !isGenerating && !error && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex flex-col p-12 overflow-hidden z-10"
              >
                <div className="flex-1 flex flex-col items-center justify-center text-center min-h-min relative">
                  {selectedImage ? (
                     <div className="opacity-50">
                        <ImageIcon className="w-16 h-16 text-gray-400 mx-auto mb-6" />
                        <p className="text-gray-500 text-lg">Result will appear here</p>
                     </div>
                  ) : (
                     <div className="w-full max-w-md mx-auto flex flex-col h-full justify-center">
                        <div className="text-center mb-8">
                          <Sparkles className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                          <h3 className="text-xl font-serif font-bold text-gray-600 mb-2">Need Inspiration?</h3>
                          <p className="text-gray-500 text-sm">Select an idea to start creating.</p>
                        </div>

                        {isLoadingIdeas ? (
                           <div className="flex justify-center gap-2">
                              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-0"></div>
                              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></div>
                              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-300"></div>
                           </div>
                        ) : (
                           <>
                               <div className="flex flex-wrap justify-center gap-3 mb-6">
                                  {ideas.map((idea, index) => (
                                    <motion.button
                                      key={index}
                                      initial={{ opacity: 0, scale: 0.9 }}
                                      animate={{ opacity: 1, scale: 1 }}
                                      transition={{ delay: index * 0.1 }}
                                      onClick={() => setPrompt(idea)}
                                      className="px-4 py-3 rounded-2xl bg-white/80 hover:bg-sr-orange hover:text-white text-gray-700 text-sm font-medium transition-all text-left border border-white/50 hover:border-sr-orange shadow-sm hover:shadow-lg active:scale-95 backdrop-blur-sm"
                                    >
                                      <div className="flex items-center gap-2">
                                        <Lightbulb className="w-3 h-3 opacity-70" />
                                        {idea}
                                      </div>
                                    </motion.button>
                                  ))}
                               </div>
                               
                               {/* Refresh Bubble Button */}
                               <div className="flex justify-center mb-4 relative z-20">
                                  <Button 
                                    size="icon" 
                                    variant="ghost"
                                    onClick={fetchIdeas}
                                    className="rounded-full w-10 h-10 bg-white shadow-md text-gray-500 hover:text-sr-orange hover:rotate-180 transition-all duration-500"
                                    title="Refresh Ideas"
                                  >
                                    <RefreshCw className="w-5 h-5" />
                                  </Button>
                               </div>
                           </>
                        )}

                        {/* Infinite Slider */}
                        <div className="w-full overflow-hidden relative h-28 mt-auto">
                            <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-white/20 to-transparent z-10" />
                            <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-white/20 to-transparent z-10" />
                            
                            <motion.div 
                                className="flex gap-4 absolute left-0"
                                animate={{ x: ["-50%", "0%"] }} 
                                transition={{ repeat: Infinity, ease: "linear", duration: 30 }}
                                style={{ width: "fit-content" }}
                            >
                                {/* Duplicated list for seamless loop */}
                                {[...SLIDER_IMAGES, ...SLIDER_IMAGES].map((src, idx) => (
                                    <div key={idx} className="w-24 h-24 rounded-lg overflow-hidden shadow-sm border border-white/50 shrink-0">
                                        <img src={src} alt={`Inspiration ${idx + 1}`} className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity" />
                                    </div>
                                ))}
                            </motion.div>
                        </div>
                     </div>
                  )}
                </div>
              </motion.div>
            )}

            {error && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex flex-col items-center justify-center text-center p-12 z-20"
              >
                <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-6">
                  <X className="w-8 h-8 text-sr-red" />
                </div>
                <h3 className="text-xl font-serif font-bold text-sr-black mb-2">Generation Failed</h3>
                <p className="text-gray-600 max-w-xs mx-auto bg-white/80 p-2 rounded-lg">{error}</p>
              </motion.div>
            )}

            {isGenerating && (
               <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex flex-col items-center justify-center bg-white/90 backdrop-blur-md z-20 px-8 text-center"
               >
                  {/* Progress Indicator */}
                  <div className="flex items-center gap-2 mb-8">
                    {[1, 2, 3].map((step) => (
                        <div key={step} className="flex items-center">
                            <motion.div 
                                initial={{ scale: 0.8, opacity: 0.5 }}
                                animate={{ 
                                    scale: progress >= step ? 1.1 : 0.8, 
                                    opacity: progress >= step ? 1 : 0.5,
                                    backgroundColor: progress >= step ? "#E87F02" : "#E5E7EB"
                                }}
                                className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white transition-all duration-500"
                            >
                                {step}
                            </motion.div>
                            {step < 3 && (
                                <div className="w-8 h-0.5 bg-gray-200 mx-1">
                                    <motion.div 
                                        className="h-full bg-sr-orange" 
                                        initial={{ width: "0%" }}
                                        animate={{ width: progress > step ? "100%" : "0%" }}
                                        transition={{ duration: 0.5 }}
                                    />
                                </div>
                            )}
                        </div>
                    ))}
                  </div>

                  <div className="w-20 h-20 border-4 border-sr-orange border-t-transparent rounded-full animate-spin mb-6" />
                  
                  <AnimatePresence mode="wait">
                      <motion.p 
                        key={currentQuote}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="text-sr-black font-serif italic text-xl max-w-md"
                      >
                        "{currentQuote}"
                      </motion.p>
                  </AnimatePresence>
                  
                  <p className="text-gray-400 text-sm mt-4 uppercase tracking-widest">Generating Concepts...</p>
               </motion.div>
            )}

            {results.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 w-full h-full flex flex-col p-6 gap-4 z-10 overflow-y-auto bg-white/95 backdrop-blur-md"
              >
                <div className="flex justify-between items-center mb-2">
                    <h3 className="text-xl font-serif font-bold">Generated Concepts</h3>
                    <Button variant="outline" size="sm" onClick={() => setResults([])}>
                        New Prompt
                    </Button>
                </div>

                <div className="flex-1 grid grid-rows-3 gap-4">
                    {results.map((img, idx) => (
                        <motion.div 
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="relative w-full h-full rounded-xl overflow-hidden shadow-md group bg-gray-100"
                            onClick={() => setActiveImage(img)}
                        >
                             <img src={img} alt={`Variation ${idx + 1}`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 cursor-zoom-in" />
                             <div className="absolute top-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded backdrop-blur-sm">
                                Variation {idx + 1}
                             </div>
                        </motion.div>
                    ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Full Screen Image Modal */}
          <AnimatePresence>
            {activeImage && (
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 md:p-12"
                    onClick={() => setActiveImage(null)}
                >
                    <img src={activeImage} alt="Full View" className="max-w-full max-h-full object-contain rounded-lg shadow-2xl" />
                    <button className="absolute top-6 right-6 text-white bg-white/10 p-2 rounded-full hover:bg-white/20 transition-all">
                        <X className="w-8 h-8" />
                    </button>
                    <div className="absolute bottom-8 flex gap-4">
                         <Button onClick={(e) => { e.stopPropagation(); /* Logic to download */ }} className="bg-white text-black hover:bg-gray-200">
                            <Download className="w-4 h-4 mr-2" /> Download
                         </Button>
                         <Button onClick={(e) => e.stopPropagation()} className="bg-sr-orange text-white border-none">
                            <Check className="w-4 h-4 mr-2" /> Attach to Enquiry
                         </Button>
                    </div>
                </motion.div>
            )}
          </AnimatePresence>
      </div>

    </div>
  );
}
