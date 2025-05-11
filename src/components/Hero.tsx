"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    
    const listener = () => {
      setMatches(media.matches);
    };
    
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [matches, query]);

  return matches;
}


const carouselItems = [
  {
    id: 1,
    title: "Community Powered Marketplace",
    description: "Connect with artisans, sellers, and influencers in a unified ecosystem",
    image: "/images/hero1.png",
    badge: "New",
  },
  {
    id: 2,
    title: "Seamless Seller Onboarding",
    description: "Start selling your products with our easy-to-use platform",
    image: "/images/hero2.png",
    badge: "Featured",
  },
  {
  id: 3,
  title: "Discover Through Reels",
  description: "Watch engaging product videos and connect with influencers showcasing unique items",
  image: "/images/hero3.png",
  mobileImage: "/images/hero3-mobile.png",
  badge: "New Feature",
},
  {
    id: 4,
    title: "Discover Unique Products",
    description: "Find handcrafted items from local artisans around the world",
    image: "/images/hero4.png",
    badge: "Trending",
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const isMobile = useMediaQuery("(max-width: 768px)");
  
  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === carouselItems.length - 1 ? 0 : prev + 1));
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  const next = () => {
    setCurrent((prev) => (prev === carouselItems.length - 1 ? 0 : prev + 1));
  };
  
  const prev = () => {
    setCurrent((prev) => (prev === 0 ? carouselItems.length - 1 : prev - 1));
  };
  
  return (
    <section className="relative overflow-hidden pt-16 pb-24">
      {/* 60-40 division with background colors */}
      <div className="absolute inset-0 flex">
        <div className="w-[60%] bg-background"></div>
        <div className="w-[40%] bg-accent"></div>
      </div>
      
      {/* KIVA background pattern on the right side */}
      <div className="absolute right-0 top-0 w-[40%] h-full overflow-hidden">
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
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="order-2 lg:order-1 pl-4 lg:pl-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                {carouselItems[current].badge && (
                  <Badge variant="secondary" className="bg-primary/10 text-primary">
                    {carouselItems[current].badge}
                  </Badge>
                )}
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-gray-900 leading-tight">
                  {carouselItems[current].title.split(' ').map((word, i, arr) =>
                    i === arr.length - 2 ? (
                      <span key={i}>
                        <span className="text-primary">{word}</span>{' '}
                      </span>
                    ) : (
                      <span key={i}>{word}{' '}</span>
                    )
                  )}
                </h1>

                
                <p className="text-lg text-gray-600 max-w-lg">
                  {carouselItems[current].description}
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <div className="text-background">
                  <a href="#waitlist">
                    <Button size="lg" className="w-full sm:w-auto">
                      Join Waitlist
                    </Button>
                  </a>
                  </div>
                  
                  <a href="#mockups">
                    <Button size="lg" variant="outline" className="w-full sm:w-auto">
                      See Mockups
                    </Button>
                  </a>
                </div>
                
                <div className="flex items-center space-x-4 pt-4">
  <div className="flex">
    {[1, 2, 3, 4].map((i) => (
      <div
        key={i}
        className="w-8 h-8 rounded-full border-2 border-white overflow-hidden relative"
        style={{
          marginLeft: i === 1 ? '0' : '-16px',
          zIndex: 5 - i // Higher index items appear on top
        }}
      >
        <Image
          src={`/images/avatar-${i}.png`}
          alt={`User ${i}`}
          width={32}
          height={32}
          className="object-cover"
        />
      </div>
    ))}
  </div>
  <p className="text-sm text-gray-600">
    <span className="font-semibold text-primary">20+</span> people already joined
  </p>
</div>

              </motion.div>
            </AnimatePresence>
            
            {/* Carousel Controls */}
            <div className="flex items-center space-x-4 mt-8">
              <button
                onClick={prev}
                className="p-2 rounded-full border border-gray-200 hover:bg-gray-50"
                aria-label="Previous slide"
              >
                <ChevronLeft className="h-5 w-5 text-gray-600" />
              </button>
              
              <div className="flex space-x-2">
                {carouselItems.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrent(index)}
                    className={`w-2 h-2 rounded-full ${
                      index === current ? "bg-primary" : "bg-gray-300"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
              
              <button
                onClick={next}
                className="p-2 rounded-full border border-gray-200 hover:bg-gray-50"
                aria-label="Next slide"
              >
                <ChevronRight className="h-5 w-5 text-gray-600" />
              </button>
            </div>
          </div>
          
          {/* Right Content - Image */}
          <div className="order-1 lg:order-2 relative pl-4 lg:pr-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.5 }}
                className="relative h-[400px] md:h-[500px] w-[95%] rounded-2xl overflow-hidden shadow-xl"
              >
                <Image
              src={isMobile && carouselItems[current].mobileImage ? carouselItems[current].mobileImage : carouselItems[current].image}
              alt={carouselItems[current].title}
              fill
              className="object-cover"
              priority
            />
                
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </motion.div>
            </AnimatePresence>
            
            {/* Decorative elements */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />
          </div>
        </div>
      </div>
      
      {/* Wave divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 100"
          className="w-full h-auto"
        >
          <path
            fill="#fff9f9"
            fillOpacity="1"
            d="M0,32L60,42.7C120,53,240,75,360,74.7C480,75,600,53,720,42.7C840,32,960,32,1080,37.3C1200,43,1320,53,1380,58.7L1440,64L1440,100L1380,100C1320,100,1200,100,1080,100C960,100,840,100,720,100C600,100,480,100,360,100C240,100,120,100,60,100L0,100Z"
          ></path>
        </svg>
      </div>
    </section>
  );
}