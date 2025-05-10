"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function IntroAnimation() {
  const [showIntro, setShowIntro] = useState(false);
  const [, setHasVisited] = useState(true);
  
  // In the IntroAnimation component:
useEffect(() => {
  // Check if this is the first visit OR if the URL has a special parameter
  const visited = localStorage.getItem("kiva_visited");
  const urlParams = new URLSearchParams(window.location.search);
  const showIntro = urlParams.get('showIntro');
  
  if (!visited || showIntro === 'true') {
    setShowIntro(true);
    setHasVisited(false);
    // Still set visited flag for future regular visits
    if (!visited) {
      localStorage.setItem("kiva_visited", "true");
    }
  }
}, []);

  
  const handleSkip = () => {
    setShowIntro(false);
  };
  
  // Auto-dismiss after 10 seconds
  useEffect(() => {
    if (showIntro) {
      const timer = setTimeout(() => {
        setShowIntro(false);
      }, 10000);
      
      return () => clearTimeout(timer);
    }
  }, [showIntro]);
  
  if (!showIntro) return null;
  
  return (
    <AnimatePresence>
      {showIntro && (
        <motion.div 
          className="fixed inset-0 z-50 bg-accent flex flex-col items-center justify-center overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Skip button */}
          <Button 
            variant="ghost" 
            size="sm" 
            className="absolute top-4 right-4 text-primary"
            onClick={handleSkip}
          >
            <X className="h-5 w-5 mr-1" />
            Skip
          </Button>
          
          {/* Background pattern with repeating "Kiva" text - styled like the hero section */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 flex flex-wrap justify-center items-center opacity-5">
              {Array(20).fill(0).map((_, i) => (
                <div
                  key={i}
                  className="text-[#6c5a7c] font-heading text-8xl font-bold m-4 rotate-[-10deg]"
                >
                  KIVA
                </div>
              ))}
            </div>
          </div>
          
          {/* Main content */}
          <div className="relative z-10 max-w-3xl text-center px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <h1 className="text-3xl md:text-5xl font-heading font-bold text-primary mb-6">
                This Mother&apos;s Day, Let&apos;s Empower Our Mothers
              </h1>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.0, duration: 0.8 }} // Increased gap between animations
            >
              <p className="text-lg md:text-xl text-gray-700 mb-8">
                Supporting women who took the initiative to build small businesses and create change in their communities.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 3.5, duration: 0.8 }} // Increased gap between animations
            >
              <p className="text-md md:text-lg text-gray-600 italic">
                We&apos;ve heard your stories, your challenges, and your dreams.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 5.0, duration: 0.8 }} // Increased gap between animations
            >
              <p className="text-lg md:text-2xl font-medium text-primary mt-6">
                Here we are with the best gift out there — a platform built for you.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 6.5, duration: 0.8 }} // Increased gap between animations
              className="mt-10"
            >
              <div className="inline-block relative">
                <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full"></div>
                <Button 
                  size="lg" 
                  className="relative bg-primary hover:bg-primary/90 text-white px-8 py-6"
                  onClick={handleSkip}
                >
                  Explore Kiva
                </Button>
              </div>
            </motion.div>
          </div>
          
          {/* Progress bar */}
          <motion.div 
            className="absolute bottom-0 left-0 h-1 bg-primary"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 10, ease: "linear" }} // Changed to 10 seconds
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
