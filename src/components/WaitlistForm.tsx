"use client";

import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { CheckCircle, Loader2 } from "lucide-react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { toast } from "sonner";

const formSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  name: z.string().min(2, "Name must be at least 2 characters"),
  feedback: z.string().optional(),
  userType: z.enum(["buyer", "seller", "both"]),
});

type FormValues = z.infer<typeof formSchema>;

export default function WaitlistForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(formRef, { once: false, amount: 0.2 });
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userType: "buyer",
    },
  });
  
  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    
    try {
      // Send data to your API endpoint
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to join waitlist');
      }
      
      // Success
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      // Store email in localStorage to remember the user
      localStorage.setItem('waitlistEmail', data.email);
      
      // Reset form for potential future submissions
      reset();
      
      // Show success toast
      toast.success("You've been added to our waitlist!");
      
    } catch (error) {
      setIsSubmitting(false);
      toast.error(error instanceof Error ? error.message : 'Something went wrong. Please try again.');
      console.error('Waitlist submission error:', error);
    }
  };
  
  const handleJoinAgain = () => {
    setIsSubmitted(false);
  };
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    },
    exit: { 
      opacity: 0,
      y: -20,
      transition: { duration: 0.3 }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4 }
    }
  };
  
  const successVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        type: "spring",
        stiffness: 200,
        damping: 15
      }
    }
  };
  
  return (
    <section id="waitlist" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div 
          className="max-w-3xl mx-auto"
          ref={formRef}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <motion.div 
            className="text-center mb-12"
            variants={itemVariants}
          >
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-4">
              Join Our Waitlist
            </h2>
            <p className="text-lg text-gray-600">
              Be among the first to experience Kiva when we launch. Sign up now to get early access and exclusive updates.
            </p>
          </motion.div>
          
          <AnimatePresence mode="wait">
            {isSubmitted ? (
              <motion.div 
                key="success"
                className="bg-green-50 rounded-xl p-8 text-center"
                variants={successVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                <motion.div 
                  className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1, rotate: [0, 10, -10, 0] }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </motion.div>
                <h3 className="text-2xl font-heading font-semibold text-gray-900 mb-3">
                  Thank You for Joining!
                </h3>
                <p className="text-gray-600 mb-6">
                  You've been added to our waitlist. We'll notify you when Kiva is ready for you to explore.
                </p>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    onClick={handleJoinAgain}
                    variant="outline"
                    className="mx-auto"
                  >
                    Join Again with Another Email
                  </Button>
                </motion.div>
              </motion.div>
            ) : (
              <motion.div 
                key="form"
                className="bg-accent/10 rounded-xl p-6 md:p-8"
                variants={containerVariants}
              >
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <motion.div variants={itemVariants}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <input
                      {...register("name")}
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary/50 focus:border-primary"
                      placeholder="Your name"
                    />
                    {errors.name && (
                      <motion.p 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-1 text-sm text-red-600"
                      >
                        {errors.name.message}
                      </motion.p>
                    )}
                  </motion.div>
                  
                  <motion.div variants={itemVariants}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <input
                      {...register("email")}
                      type="email"
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary/50 focus:border-primary"
                      placeholder="you@example.com"
                    />
                    {errors.email && (
                      <motion.p 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-1 text-sm text-red-600"
                      >
                        {errors.email.message}
                      </motion.p>
                    )}
                  </motion.div>
                  
                  <motion.div variants={itemVariants}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      I'm interested in using Kiva as a:
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-2">
                      <motion.label 
                        className="flex items-center p-3 border border-gray-300 rounded-md cursor-pointer hover:border-primary/50 transition-colors"
                        whileHover={{ scale: 1.02, borderColor: 'rgba(108, 90, 124, 0.5)' }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <input
                          {...register("userType")}
                          type="radio"
                          value="buyer"
                          className="mr-2"
                        />
                        <span>Buyer</span>
                      </motion.label>
                      <motion.label 
                        className="flex items-center p-3 border border-gray-300 rounded-md cursor-pointer hover:border-primary/50 transition-colors"
                        whileHover={{ scale: 1.02, borderColor: 'rgba(108, 90, 124, 0.5)' }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <input
                          {...register("userType")}
                          type="radio"
                          value="seller"
                          className="mr-2"
                        />
                        <span>Seller</span>
                      </motion.label>
                      <motion.label 
                        className="flex items-center p-3 border border-gray-300 rounded-md cursor-pointer hover:border-primary/50 transition-colors"
                        whileHover={{ scale: 1.02, borderColor: 'rgba(108, 90, 124, 0.5)' }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <input
                          {...register("userType")}
                          type="radio"
                          value="influencer"
                          className="mr-2"
                        />
                        <span>Influencer</span>
                      </motion.label>
                    </div>
                  </motion.div>
                  
                  <motion.div variants={itemVariants}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Feedback or Questions (Optional)
                    </label>
                    <textarea
                      {...register("feedback")}
                      rows={4}
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary/50 focus:border-primary"
                      placeholder="Share your thoughts, expectations, or questions about Kiva..."
                    ></textarea>
                  </motion.div>
                  
                  <motion.div 
                    variants={itemVariants}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      type="submit"
                      className="w-full bg-primary hover:bg-primary/90 py-3 text-background"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center justify-center">
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Submitting...
                        </span>
                      ) : (
                        "Join Waitlist"
                      )}
                    </Button>
                  </motion.div>
                  
                  <motion.p 
                    variants={itemVariants}
                    className="text-xs text-gray-500 text-center"
                  >
                    By joining, you agree to receive updates about Kiva. We respect your privacy and will never share your information.
                  </motion.p>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
