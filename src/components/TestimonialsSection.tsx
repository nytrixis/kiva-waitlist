"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { motion, useAnimation, useInView } from "framer-motion";
import { Star, Quote, CheckCircle2, BarChart3, Users, ShoppingBag, Megaphone, Globe, Video, TrendingUp } from "lucide-react";

// Survey insights data
const surveyInsights = [
  {
    id: 1,
    statistic: "78%",
    challenge: "of small business owners struggle with finding the right platform to showcase their products",
    solution: "Kiva provides a dedicated marketplace specifically designed for artisans and small businesses",
    icon: <ShoppingBag className="h-6 w-6 text-primary" />,
  },
  {
    id: 2,
    statistic: "65%",
    challenge: "find it difficult to connect with the right audience for their handcrafted products",
    solution: "Our platform connects sellers with buyers who specifically value handmade and artisanal goods",
    icon: <Users className="h-6 w-6 text-primary" />,
  },
  {
    id: 3,
    statistic: "82%",
    challenge: "lack resources to effectively market their products online",
    solution: "Kiva offers built-in marketing tools and visibility to help artisans reach more customers",
    icon: <Megaphone className="h-6 w-6 text-primary" />,
  },
  {
    id: 4,
    statistic: "73%",
    challenge: "struggle to create engaging video content to promote their products",
    solution: "Our integrated Reels feature allows sellers to easily create and share product videos directly on the platform",
    icon: <Video className="h-6 w-6 text-primary" />,
  },
  {
    id: 5,
    statistic: "68%",
    challenge: "have difficulty connecting with influencers to promote their products",
    solution: "Kiva's influencer marketplace connects sellers with relevant content creators to boost visibility",
    icon: <TrendingUp className="h-6 w-6 text-primary" />,
  },
  {
    id: 6,
    statistic: "74%",
    challenge: "want to expand beyond local markets but don't know how",
    solution: "Our platform enables artisans to reach customers across India and eventually globally",
    icon: <Globe className="h-6 w-6 text-primary" />,
  },
];

// Duplicate insights to create seamless infinite loop
const duplicatedInsights = [...surveyInsights, ...surveyInsights];

export default function TestimonialsSection() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });
  const controls = useAnimation();
  
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);
  
  // Infinite scroll animation
  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;
    
    // Clone the first set of items and append to the end for seamless looping
    const scrollWidth = carousel.scrollWidth / 2;
    let scrollPos = 0;
    
    const scroll = () => {
      if (!carousel) return;
      
      scrollPos += 0.5; // Adjust speed here
      
      // Reset position when we've scrolled through the first set
      if (scrollPos >= scrollWidth) {
        scrollPos = 0;
        carousel.scrollLeft = 0;
      } else {
        carousel.scrollLeft = scrollPos;
      }
      
      requestAnimationFrame(scroll);
    };
    
    const animation = requestAnimationFrame(scroll);
    
    return () => cancelAnimationFrame(animation);
  }, []);
  
  return (
    <section
      ref={sectionRef}
      className="py-24 relative overflow-hidden bg-background"
    >
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-64 bg-primary/5"></div>
      <div className="absolute bottom-0 right-0 w-1/3 h-1/3 rounded-tl-full bg-primary/5"></div>
      <div className="absolute top-1/4 left-1/4 w-12 h-12 rounded-full bg-primary/10"></div>
      <div className="absolute bottom-1/3 right-1/4 w-20 h-20 rounded-full bg-primary/10"></div>
      
      {/* Large chart icon */}
      <div className="absolute top-20 right-20 text-primary/5">
        <BarChart3 className="w-40 h-40" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-4xl md:text-5xl text-foreground mb-4">
            Market <span className="text-primary">Research</span> Insights
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Based on our survey of small business owners and artisans across India, 
            we've identified key challenges that Kiva is designed to solve.
          </p>
        </motion.div>
        
        {/* Insights carousel */}
        <div className="relative">
          {/* Gradient overlays for seamless effect */}
          <div className="absolute left-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-r from-background to-transparent"></div>
          <div className="absolute right-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-l from-background to-transparent"></div>
          
          {/* Infinite scroll container */}
          <div
            ref={carouselRef}
            className="flex overflow-x-hidden gap-6 py-8 hide-scrollbar"
          >
            {duplicatedInsights.map((insight, index) => (
              <motion.div
                key={`${insight.id}-${index}`}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: Math.min(index * 0.1, 0.5) }}
                className="flex-shrink-0 w-[350px] bg-white rounded-2xl shadow-md overflow-hidden"
              >
                {/* Card header with accent color */}
                <div className="bg-primary/10 p-6">
                  <div className="flex items-center gap-4">
                    {/* Icon */}
                    <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-sm">
                      {insight.icon}
                    </div>
                    
                    <div>
                      <h3 className="font-medium text-3xl text-primary">{insight.statistic}</h3>
                      <p className="text-sm text-gray-600">of surveyed businesses</p>
                    </div>
                  </div>
                </div>
                
                {/* Insight content */}
                <div className="p-6 relative">
                  {/* Challenge */}
                  <p className="text-gray-700 mb-4 relative z-10">
                    {insight.challenge}
                  </p>
                  
                  {/* Solution */}
                  <div className="bg-accent/30 rounded-lg p-4">
                    <div className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <p className="text-primary font-medium ml-2">
                        {insight.solution}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center justify-center bg-primary/10 rounded-full px-6 py-2 text-primary text-sm font-medium">
            <CheckCircle2 className="h-4 w-4 mr-2" />
            Based on a survey of 50+ small business owners and artisans
          </div>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Join Kiva today and be part of the solution for artisans and small businesses across India
          </p>
          <a 
            href="#waitlist" 
            className="mt-6 inline-block bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-full transition-colors"
          >
            Join the Waitlist
          </a>
        </motion.div>
      </div>
      
      {/* Custom styles for hiding scrollbar but allowing scroll */}
      <style jsx global>{`
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
