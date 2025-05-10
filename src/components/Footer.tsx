import Link from "next/link";
import Image from "next/image";
import { Facebook, Twitter, Instagram, Linkedin, Youtube } from "lucide-react";

const footerLinks = [
  {
    title: "Explore",
    links: [
      { name: "Features", href: "#features" },
      { name: "Mockups", href: "#mockups" },
      { name: "Testimonials", href: "#testimonials" },
      { name: "Waitlist", href: "#waitlist" },
      { name: "FAQ", href: "/faq" },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "About", href: "/about" },
      { name: "Contact", href: "mailto:contact@kivamarketplace.com" },
    ],
  },
  {
    title: "Legal",
    links: [
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
      { name: "Cookie Policy", href: "/cookies" },
    ],
  },
];

const socialLinks = [
  { name: "Facebook", icon: <Facebook className="h-5 w-5" />, href: "https://facebook.com" },
  { name: "Twitter", icon: <Twitter className="h-5 w-5" />, href: "https://twitter.com" },
  { name: "Instagram", icon: <Instagram className="h-5 w-5" />, href: "https://instagram.com" },
  { name: "LinkedIn", icon: <Linkedin className="h-5 w-5" />, href: "https://linkedin.com" },
  { name: "YouTube", icon: <Youtube className="h-5 w-5" />, href: "https://youtube.com" },
];

export default function Footer() {
  return (
    <footer className="bg-[#F3EFFA] border-t border-[#E6E6FA]">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Logo and description */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center mb-4">
              <div className="relative h-10 w-10 mr-2 overflow-hidden border border-[#E6E6FA]">
                <Image
                  src="/images/logob.png"
                  alt="Kiva Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-xl font-heading font-bold text-primary">Kiva</span>
            </Link>
            <p className="text-gray-600 mb-6 max-w-md">
              A community-powered marketplace connecting artisans, sellers, and buyers in a unified ecosystem.
            </p>
            
            {/* Social Media Links */}
            <div className="flex flex-wrap gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-sm hover:shadow-md text-gray-400 hover:text-primary transition-all duration-300 hover:-translate-y-1"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
          
          {/* Links */}
          {footerLinks.map((column) => (
            <div key={column.title}>
              <h3 className="font-heading font-semibold text-gray-900 mb-4">
                {column.title}
              </h3>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-gray-600 hover:text-primary transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        {/* Newsletter Signup */}
        {/* <div className="mt-12 pt-8 border-t border-[#E6E6FA]">
          <div className="max-w-md mx-auto lg:mx-0">
            <h3 className="font-heading font-semibold text-gray-900 mb-3">
              Stay Updated
            </h3>
            <p className="text-gray-600 mb-4">
              Subscribe to our newsletter for updates and announcements.
            </p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-4 py-2 rounded-md border border-[#E6E6FA] focus:outline-none focus:ring-2 focus:ring-primary/30"
                required
              />
              <button
                type="submit"
                className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div> */}
        
        <div className="border-t border-[#E6E6FA] mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Kiva Marketplace. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-6">
            <Link href="/privacy" className="text-gray-500 hover:text-primary text-sm">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-gray-500 hover:text-primary text-sm">
              Terms of Service
            </Link>
            <Link href="/cookies" className="text-gray-500 hover:text-primary text-sm">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
