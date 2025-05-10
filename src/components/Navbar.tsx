"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Menu, X, Globe, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Language {
  code: string;
  name: string;
}

// Define Google Translate interface
interface GoogleTranslate {
  TranslateElement: (options: {
    pageLanguage: string;
    includedLanguages: string;
    autoDisplay: boolean;
  }, elementId: string) => void;
}

interface GoogleWindow extends Window {
  google?: {
    translate: GoogleTranslate;
  };
}

// Indian languages for the dropdown
const languages: Language[] = [
  { code: "en", name: "English" },
  { code: "hi", name: "हिन्दी (Hindi)" },
  { code: "bn", name: "বাংলা (Bengali)" },
  { code: "te", name: "తెలుగు (Telugu)" },
  { code: "mr", name: "मराठी (Marathi)" },
  { code: "ta", name: "தமிழ் (Tamil)" },
  { code: "ur", name: "اردو (Urdu)" },
  { code: "gu", name: "ગુજરાતી (Gujarati)" },
  { code: "kn", name: "ಕನ್ನಡ (Kannada)" },
  { code: "ml", name: "മലയാളം (Malayalam)" },
  { code: "pa", name: "ਪੰਜਾਬੀ (Punjabi)" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);
  // const [searchQuery, setSearchQuery] = useState("");
  
  // Function to change language using Google Translate
  const changeLanguage = (languageCode: string) => {
    if (typeof window !== 'undefined' && 
        (window as GoogleWindow).google && 
        (window as GoogleWindow).google?.translate) {
      const selectedLang = languages.find(lang => lang.code === languageCode);
      if (selectedLang) {
        setSelectedLanguage(selectedLang);
        (window as GoogleWindow).google?.translate.TranslateElement({
          pageLanguage: 'en',
          includedLanguages: languageCode,
          autoDisplay: false
        }, 'google_translate_element');
      }
    }
  };

  // const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   console.log("Search query:", searchQuery);
  // };
  
  return (
    <header className="sticky top-0 z-50 shadow-sm">
      {/* 60-40 division with background colors */}
      <div className="relative">
        <div className="absolute inset-0 flex">
          <div className="w-[60%] bg-background"></div>
          <div className="w-[40%] bg-accent"></div>
        </div>
        
        <div className="container mx-auto px-4 relative">
          <div className="flex items-center h-16">
            {/* Left section (60%) - Logo and Navigation */}
            <div className="w-[60%] flex items-center">
              {/* Logo */}
              <Link href="/" className="flex items-center pr-20">
                <div className="relative h-10 w-10 overflow-hidden border border-[#E6E6FA]">
                  <Image
                    src="/images/logob.png"
                    alt="Kiva Logo"
                    fill
                    className="object-cover"
                    sizes="40px"
                    priority
                  />
                </div>
              </Link>
              
              {/* Desktop Navigation - positioned in the left section */}
              <nav className="hidden md:flex items-center space-x-8 ml-10">
                <Link href="#features" className="text-gray-600 hover:text-primary transition-colors">
                  Features
                </Link>
                
                <Link href="#how-it-works" className="text-gray-600 hover:text-primary transition-colors">
                  How It Works
                </Link>
                
                <Link href="#about" className="text-gray-600 hover:text-primary transition-colors">
                  About
                </Link>
                
                <Link href="#faq" className="text-gray-600 hover:text-primary transition-colors">
                  FAQ
                </Link>
              </nav>
            </div>
            
            {/* <div className="hidden md:flex items-center ml-4 relative">
              <form onSubmit={handleSearchSubmit} className="relative">
                <div className={`flex items-center bg-white/80 backdrop-blur-sm rounded-full transition-all duration-300 border ${isSearchFocused ? 'border-primary shadow-sm pr-12' : 'border-muted pr-2'}`}>
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setIsSearchFocused(true)}
                    onBlur={() => setIsSearchFocused(false)}
                    className="py-2 pl-4 pr-2 w-48 focus:w-64 transition-all duration-300 bg-transparent outline-none text-sm text-foreground placeholder:text-gray-400"
                  />
                  <button
                    type="submit"
                    className={`${isSearchFocused ? 'absolute right-2' : ''} p-2 text-gray-500 hover:text-primary transition-colors`}
                    aria-label="Search"
                  >
                    <Search className="h-4 w-4" />
                  </button>
                </div>
              </form>
            </div> */}
            
            {/* Right section (40%) - Join Waitlist and Language */}
            <div className="w-[40%] flex items-center justify-end space-x-6">
              {/* Join Waitlist Button */}
              <Link href="#waitlist">
                <Button variant="default" size="sm" className="bg-primary hover:bg-primary/90 text-white">
                  Join Waitlist
                </Button>
              </Link>
              
              {/* Language Selector Dropdown */}
              <div className="relative group">
                <Button variant="ghost" className="flex items-center space-x-1 px-2 py-1 rounded-full border border-gray-200 hover:bg-gray-50">
                  <Globe className="h-4 w-4 text-gray-600" />
                  <span className="text-sm text-gray-600">{selectedLanguage.code.toUpperCase()}</span>
                  <ChevronDown className="h-4 w-4 text-gray-600" />
                </Button>
                
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="py-1">
                    {languages.map((language) => (
                      <button
                        key={language.code}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => changeLanguage(language.code)}
                      >
                        {language.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-white border-t"
        >
          {/* <div className="pt-2 pb-4">
            <form onSubmit={handleSearchSubmit} className="relative px-4">
              <div className="flex items-center bg-white/90 rounded-full border border-muted">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="py-2 pl-4 pr-2 w-full bg-transparent outline-none text-sm text-foreground placeholder:text-gray-400"
                />
                
                <button
                  type="submit"
                  className="p-2 text-gray-500 hover:text-primary transition-colors"
                  aria-label="Search"
                >
                  <Search className="h-4 w-4" />
                </button>
              </div>
            </form>
          </div> */}
          <div className="container mx-auto px-4 py-4 space-y-4">
            <Link href="#features" className="block text-gray-600 hover:text-primary py-2">
              Features
            </Link>
            
            <Link href="#how-it-works" className="block text-gray-600 hover:text-primary py-2">
              How It Works
            </Link>
            
            <Link href="#about" className="block text-gray-600 hover:text-primary py-2">
              About
            </Link>
            
            <Link href="#faq" className="block text-gray-600 hover:text-primary py-2">
              FAQ
            </Link>
            
            <div className="pt-4 border-t border-gray-100">
              <Link href="#waitlist" className="block w-full">
                <Button variant="default" className="w-full bg-primary hover:bg-primary/90 text-white">
                  Join Waitlist
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </header>
  );
}
