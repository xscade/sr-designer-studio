"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Play, Pause } from "lucide-react";

export default function VideoShowcase() {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <section className="w-full h-full flex items-center justify-center px-6 md:px-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative w-full max-w-6xl mx-auto aspect-video rounded-[2rem] overflow-hidden shadow-2xl border border-white/10 group"
      >
        {/* Video Element */}
        <video
          ref={videoRef}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
            isPlaying ? "opacity-100" : "opacity-40"
          }`}
          loop
          playsInline
          // Remove autoPlay to rely on user interaction or muted autoplay logic if preferred
          // keeping muted autoplay as a fallback background if not playing audio
          muted={!isPlaying} 
        >
          <source src="https://player.vimeo.com/external/434045526.sd.mp4?s=c27eecc69a27dbc4ff2b87d38afc35f1a9e7c02d&profile_id=164&oauth2_token_id=57447761" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Dark Overlay when paused to make text readable */}
        <div className={`absolute inset-0 bg-black/50 transition-opacity duration-500 ${isPlaying ? "opacity-0 pointer-events-none" : "opacity-100"}`} />

        {/* Content Overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 p-8 text-center">
            {/* Play Button */}
            <motion.button
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handlePlayPause}
              className={`w-24 h-24 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center mb-8 transition-all duration-300 group-hover:bg-white/30 ${isPlaying ? "opacity-0 group-hover:opacity-100" : "opacity-100"}`}
            >
              {isPlaying ? (
                 <Pause className="w-8 h-8 text-white fill-white" />
              ) : (
                 <Play className="w-8 h-8 text-white fill-white ml-1" />
              )}
            </motion.button>

            {/* Text Content (Hides when playing for immersive view) */}
            <motion.div
                animate={{ opacity: isPlaying ? 0 : 1, y: isPlaying ? 20 : 0 }}
                transition={{ duration: 0.5 }}
                className="pointer-events-none"
            >
                <h3 className="text-5xl md:text-7xl font-serif font-bold text-white mb-4 tracking-tight">
                  The Detail
                </h3>
                <p className="text-lg md:text-xl text-white/80 font-light tracking-wide max-w-lg mx-auto">
                  See how we bring sketches to life with uncompromising quality.
                </p>
            </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
