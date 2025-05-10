"use client";

import {
  ShoppingBag,
  Users,
  Shield,
  MapPin,
  BarChart3,
  Film
} from "lucide-react";
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

const features = [
  {
    icon: <ShoppingBag className="h-6 w-6 text-white" />,
    title: "Unified Marketplace",
    description:
      "Browse and purchase products from verified sellers across various categories in one place.",
  },
  {
    icon: <Users className="h-6 w-6 text-white" />,
    title: "Influencer Marketing",
    description:
      "Connect with verified influencers to promote your products and reach a wider audience.",
  },
  {
    icon: <Shield className="h-6 w-6 text-white" />,
    title: "Buyer Protection",
    description:
      "Shop with confidence knowing that your purchases are protected by our guarantee.",
  },
  {
    icon: <MapPin className="h-6 w-6 text-white" />,
    title: "Near Me Features",
    description:
      "Discover local sellers and products in your vicinity with our location-based recommendations.",
  },
  {
    icon: <BarChart3 className="h-6 w-6 text-white" />,
    title: "CRM for Sellers",
    description:
      "Manage customer relationships, track sales, and analyze performance with our built-in CRM tools.",
  },
  {
    icon: <Film className="h-6 w-6 text-white" />,
    title: "Peeks (Reels)",
    description:
      "Create and share short video content to showcase your products and connect with your audience.",
  },
];

export default function FeaturesSection() {
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
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };
  
  const iconVariants = {
    hidden: { scale: 0 },
    visible: { 
      scale: 1,
      transition: { 
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: 0.1
      }
    }
  };
  
  return (
    <section id="features" className="py-20 bg-white" ref={sectionRef}>
      <div className="container mx-auto px-4 overflow-hidden">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-4">
            Why Choose Kiva?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our platform is designed to create meaningful connections between sellers, buyers, and influencers,
            with features that prioritize trust, quality, and community.
          </p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-accent/30 rounded-xl p-8 hover:shadow-md transition-shadow border border-accent relative"
              variants={itemVariants}
              whileHover={{ 
                y: -5, 
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)" 
              }}
            >
              {/* Background pattern */}
              <div className="absolute inset-0 opacity-5 overflow-hidden">
                <div className="absolute right-0 bottom-0 w-32 h-32 bg-primary rounded-full -mr-10 -mb-10"></div>
                <div className="absolute left-10 top-10 w-16 h-16 bg-primary rounded-full -ml-8 -mt-8"></div>
              </div>
              
              <div className="relative z-10">
                <h3 className="text-xl font-heading font-semibold text-primary mb-3">
                  {feature.title}
                </h3>
                
                {/* Divider line */}
                <motion.div 
                  className="w-12 h-0.5 bg-primary mb-4"
                  initial={{ width: 0 }}
                  animate={isInView ? { width: 48 } : { width: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + (index * 0.1) }}
                ></motion.div>
                
                <p className="text-gray-600">{feature.description}</p>
              </div>
              
              {/* Icon circle positioned at the top, coinciding with the bottom left corner */}
              <motion.div 
                className="absolute -top-6 -left-6 z-30"
                variants={iconVariants}
              >
                <div className="w-12 h-12 rounded-full bg-[#6c5a7c] flex items-center justify-center shadow-md z-10">
                  {feature.icon}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* CTA Banner */}
        <motion.div 
          className="mt-16 bg-accent/40 rounded-xl p-8 md:p-12 text-center border border-accent"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <h3 className="text-2xl font-heading font-semibold text-primary mb-4">
            Ready to experience Kiva?
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Join our waitlist today and be among the first to access our platform when we launch.
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
