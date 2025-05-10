"use client";

import { CheckCircle, Users, ShieldCheck, Globe, BarChart3, Film } from "lucide-react";
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

const missions = [
  {
    icon: <Users className="h-6 w-6 text-white" />,
    title: "Community-Centered",
    description:
      "Building a platform that empowers local artisans and small businesses to reach a global audience.",
  },
  {
    icon: <ShieldCheck className="h-6 w-6 text-white" />,
    title: "Trust & Transparency",
    description:
      "Creating a marketplace where buyers can shop with confidence, knowing they're supporting verified sellers.",
  },
  {
    icon: <Globe className="h-6 w-6 text-white" />,
    title: "Global Reach, Local Impact",
    description:
      "Connecting cultures and communities through commerce, while supporting sustainable local economies.",
  },
];

const goals = [
  "Empower 500+ artisans and small businesses by 2025",
  "Create a sustainable marketplace with fair pricing and transparent policies",
  "Build technology that bridges the gap between traditional crafts and modern commerce",
  "Foster a community of conscious consumers who value authenticity and craftsmanship",
  "Promote cultural exchange and appreciation through commerce",
];

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };
  
  const goalVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({ 
      opacity: 1, 
      x: 0,
      transition: { 
        duration: 0.5,
        delay: 0.3 + (i * 0.1)
      }
    })
  };
  
  return (
    <section id="about" className="py-20 bg-white" ref={sectionRef}>
      <div className="container mx-auto px-4 overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-4">
            Our Mission & Vision
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            At Kiva, we're building more than just a marketplace. We're creating a community that connects artisans, sellers, and buyers in a meaningful way.
          </p>
        </motion.div>
        
        {/* Mission Cards - Styled like Features */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {missions.map((mission, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-accent/30 rounded-xl p-8 hover:shadow-md transition-shadow border border-accent relative"
              whileHover={{ 
                y: -5, 
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)" 
              }}
            >
              {/* Background pattern */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute right-0 bottom-0 w-32 h-32 bg-primary rounded-full -mr-10 -mb-10"></div>
                <div className="absolute left-10 top-10 w-16 h-16 bg-primary rounded-full -ml-8 -mt-8"></div>
              </div>
              
              <div className="relative z-10">
                <h3 className="text-xl font-heading font-semibold text-primary mb-3">
                  {mission.title}
                </h3>
                
                {/* Divider line */}
                <div className="w-12 h-0.5 bg-primary mb-4"></div>
                
                <p className="text-gray-600">{mission.description}</p>
              </div>
              
              {/* Icon circle positioned at the top, coinciding with the bottom left corner */}
              <motion.div 
                className="absolute -top-6 -left-6 z-30"
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : { scale: 0 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 260, 
                  damping: 20, 
                  delay: 0.2 + (index * 0.1) 
                }}
              >
                <div className="w-12 h-12 rounded-full bg-[#6c5a7c] flex items-center justify-center shadow-md z-10">
                  {mission.icon}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Goals Section - Styled like the CTA Banner in Features */}
        <motion.div 
          className="bg-accent/40 rounded-xl p-8 md:p-12 border border-accent"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="max-w-3xl mx-auto">
            <motion.h3 
              className="text-2xl font-heading font-semibold text-primary mb-8 text-center"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Our Goals
            </motion.h3>
            <div className="space-y-4">
              {goals.map((goal, index) => (
                <motion.div 
                  key={index} 
                  className="flex items-start"
                  custom={index}
                  variants={goalVariants}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : { scale: 0 }}
                    transition={{ delay: 0.5 + (index * 0.1) }}
                  >
                    <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5 mr-3" />
                  </motion.div>
                  <p className="text-gray-700">{goal}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
        
        {/* CTA Banner */}
        <motion.div 
          className="mt-16 bg-accent/40 rounded-xl p-8 md:p-12 text-center border border-accent"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <h3 className="text-2xl font-heading font-semibold text-primary mb-4">
            Ready to join our mission?
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Be part of a movement that values craftsmanship, community, and cultural heritage.
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <a href="#waitlist">
              <button className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-full font-medium transition-colors shadow-sm hover:shadow-md">
                Join Waitlist Now
              </button>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
