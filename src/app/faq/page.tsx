"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ShoppingBag, Shield, Truck, Users, HelpCircle } from "lucide-react";
import Link from "next/link";

// FAQ categories and questions
const faqData = [
  {
    category: "About Kiva",
    icon: <ShoppingBag className="h-5 w-5" />,
    questions: [
      {
        question: "What is Kiva?",
        answer: "Kiva is a next-gen online marketplace focused on connecting artisans and small businesses with customers who value handcrafted, unique products. Our platform celebrates craftsmanship, cultural heritage, and authentic connections between creators and buyers."
      },
      {
        question: "When is Kiva launching?",
        answer: "We're currently in the early access phase. You can join our waitlist to get updates, exclusive invites, and early access perks before the official launch."
      },
      {
        question: "What categories will Kiva offer?",
        answer: "At launch, we'll feature a wide range of handcrafted and curated products including Clothing & Fashion, Home & Kitchen, Beauty & Personal Care, Jewelry & Accessories, Art & Collectibles, and more with a focus on quality and craftsmanship."
      }
    ]
  },
  {
    category: "For Buyers",
    icon: <Truck className="h-5 w-5" />,
    questions: [
      {
        question: "How is Kiva different from other marketplaces?",
        answer: "We're building a community-focused platform that prioritizes quality over quantity. Think curated collections, verified artisans, direct community feedback loops, and a more human shopping experience that celebrates the stories behind each product."
      },
      {
        question: "Will there be any membership or hidden charges?",
        answer: "No hidden fees. Signing up is free, and we're building everything with transparency in mind. Any discounts, shipping fees, or promotions will be clearly shown during checkout."
      },
      {
        question: "What happens after I join the waitlist?",
        answer: "You'll receive an email confirming your spot, early feature previews, exclusive offers at launch, and priority invites to community feedback sessions."
      }
    ]
  },
  {
    category: "Security & Payments",
    icon: <Shield className="h-5 w-5" />,
    questions: [
      {
        question: "Is my payment information secure?",
        answer: "Yes. We integrate with secure, industry-standard payment gateways to ensure your data and transactions are safe and encrypted."
      },
      {
        question: "Will GST be included in the prices?",
        answer: "Yes, all applicable taxes including GST will be transparently shown before you place your order. No surprises."
      },
      {
        question: "What payment methods will be accepted?",
        answer: "We'll support all major payment methods including credit/debit cards, UPI, net banking, and popular digital wallets."
      }
    ]
  },
  {
    category: "For Sellers",
    icon: <Users className="h-5 w-5" />,
    questions: [
      {
        question: "How does Kiva support sellers?",
        answer: "We're creating a fair platform where artisans and small businesses can showcase their products with transparent policies, timely payouts, and access to insights and tools to grow their business."
      },
      {
        question: "Who can sell on Kiva?",
        answer: "We welcome independent artisans, craftspeople, small businesses, and creators who offer unique, quality products and align with our values of authenticity and craftsmanship."
      },
      {
        question: "How can I become a seller?",
        answer: "You can express your interest by joining our waitlist and selecting Seller as your user type. We'll reach out with more information as we approach launch."
      }
    ]
  },
  {
    category: "Other Questions",
    icon: <HelpCircle className="h-5 w-5" />,
    questions: [
      {
        question: "Where will Kiva be available?",
        answer: "We're starting in India, with plans to scale regionally. Some features and categories may roll out in phases depending on demand and logistics."
      },
      {
        question: "Can I suggest features or products?",
        answer: "Yes! After signing up for our waitlist, you'll be invited to join our early user feedback loop — your opinions will help shape the final experience."
      },
      {
        question: "How can I contact the Kiva team?",
        answer: "You can reach us at contact@kivamarketplace.com with any questions, suggestions, or feedback."
      }
    ]
  }
];

// FAQ Item component
const FAQItem = ({ question, answer, isOpen, toggleOpen }: { question: string; answer: string; isOpen: boolean; toggleOpen: () => void }) => {
  return (
    <div className="border-b border-lavender-300 last:border-none">
      <button
        className="w-full text-left py-4 flex justify-between items-center focus:outline-none"
        onClick={toggleOpen}
      >
        <span className="font-medium text-gray-800">{question}</span>
        <ChevronDown 
          className={`h-5 w-5 text-primary transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="pb-4 text-gray-600">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
// FAQ Category component
const FAQCategory = ({ category, icon, questions }: { category: string, icon: React.ReactNode, questions: { question: string, answer: string }[] }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  
  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-xl shadow-sm overflow-hidden"
    >
      <div className="bg-lavender-100 p-4 flex items-center">
        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
          {icon}
        </div>
        <h3 className="font-heading font-semibold text-lg text-primary">{category}</h3>
      </div>
      
      <div className="p-4">
        {questions.map((faq, index) => (
          <FAQItem
            key={index}
            question={faq.question}
            answer={faq.answer}
            isOpen={openIndex === index}
            toggleOpen={() => toggleQuestion(index)}
          />
        ))}
      </div>
    </motion.div>
  );
};
export default function FAQPage() {
  return (
    <div className="min-h-screen bg-[#F3EFFA]">
      <div className="pt-28 pb-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <h1 className="font-heading text-4xl md:text-5xl text-primary mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-lg text-gray-700">
              Find answers to common questions about Kiva marketplace
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {faqData.map((category, index) => (
              <FAQCategory
                key={index}
                category={category.category}
                icon={category.icon}
                questions={category.questions}
              />
            ))}
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-16 text-center"
          >
            <h3 className="font-heading text-2xl text-primary mb-4">
              Still have questions?
            </h3>
            <p className="text-gray-700 mb-6">
              We are here to help. Reach out to our team and we will get back to you as soon as possible.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:contact@kivamarketplace.com"
                className="px-8 py-3 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors"
              >
                Contact Us
              </a>
              <Link
                href="#waitlist"
                className="px-8 py-3 bg-white text-primary border border-primary rounded-full hover:bg-primary/5 transition-colors"
              >
                Join Waitlist
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Custom styles for lavender shades */}
      <style jsx global>{`
        .bg-lavender-100 {
          background-color: #EDE7F6;
        }
        .border-lavender-300 {
          border-color: #D1C4E9;
        }
      `}</style>
    </div>
  );
}
