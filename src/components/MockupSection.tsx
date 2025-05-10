"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft, ShoppingBag, Package, DollarSign, TrendingUp, Star, Heart, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

const mockups = [
  {
    id: 1,
    title: "Seller Dashboard",
    description: "Manage your products, orders, and analytics in one place",
    component: <SellerDashboardMockup />,
  },
  {
    id: 2,
    title: "Marketplace",
    description: "Discover unique products from verified sellers",
    component: <MarketplaceMockup />,
  },
  {
    id: 3,
    title: "Product Detail",
    description: "View detailed product information and reviews",
    component: <ProductDetailMockup />,
  },
  {
    id: 4,
    title: "Checkout Process",
    description: "Seamless and secure checkout experience",
    component: <CheckoutMockup />,
  },
  {
    id: 5,
    title: "User Profile",
    description: "Manage your personal information and preferences",
    component: <UserProfileMockup />,
  },
];

export default function MockupSection() {
  const [current, setCurrent] = useState(0);
  
  const next = () => {
    setCurrent((prev) => (prev === mockups.length - 1 ? 0 : prev + 1));
  };
  
  const prev = () => {
    setCurrent((prev) => (prev === 0 ? mockups.length - 1 : prev - 1));
  };

  // Auto-rotate mockups every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      next();
    }, 10000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <section id="mockups" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-4">
            Experience Kiva in Action
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Take a sneak peek at our intuitive interface and powerful features designed to connect sellers and buyers seamlessly.
          </p>
        </div>
        
        <div className="relative max-w-5xl mx-auto">
          {/* Mac-style frame */}
          <div className="relative">
            {/* Mac top bar */}
            <div className="bg-gray-800 rounded-t-lg h-6 flex items-center px-3">
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
            </div>
            
            {/* Screen content */}
            <div className="bg-gray-100 p-1 rounded-b-lg">
              <div className="relative bg-white rounded overflow-hidden aspect-[16/9]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={current}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="relative w-full h-full"
                  >
                    {mockups[current].component}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
            
            {/* Mac stand */}
            <div className="mx-auto w-32 h-4 bg-gray-300 rounded-b-lg"></div>
            <div className="mx-auto w-64 h-1 bg-gray-200 rounded-b-lg"></div>
          </div>
          
          {/* Navigation controls */}
          <div className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-12">
            <button
              onClick={prev}
              className="p-2 rounded-full bg-white shadow-md hover:bg-gray-50"
              aria-label="Previous mockup"
            >
              <ChevronLeft className="h-6 w-6 text-gray-600" />
            </button>
          </div>
          
          <div className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-12">
            <button
              onClick={next}
              className="p-2 rounded-full bg-white shadow-md hover:bg-gray-50"
              aria-label="Next mockup"
            >
              <ChevronRight className="h-6 w-6 text-gray-600" />
            </button>
          </div>
        </div>
        
        {/* Mockup info */}
        <div className="mt-12 text-center">
          <h3 className="text-2xl font-heading font-semibold text-primary mb-2">
            {mockups[current].title}
          </h3>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {mockups[current].description}
          </p>
          
          {/* Indicator dots */}
          <div className="flex justify-center space-x-2 mt-6">
            {mockups.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === current ? "bg-primary" : "bg-gray-300"
                }`}
                aria-label={`View ${mockups[index].title}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Seller Dashboard Mockup Component
function SellerDashboardMockup() {
  // Define products array
  const products = [
    {
      id: 1,
      name: "Handcrafted Ceramic Mug",
      category: "Home Decor",
      price: "₹450",
      rating: 4.8,
      views: 142,
      image: "/images/mockup-product-1.png"
    },
    {
      id: 2,
      name: "Woven Wallet",
      category: "Home Storage",
      price: "₹450",
      rating: 4.6,
      views: 98,
      image: "/images/mockup-product-2.png"
    },
    {
      id: 3,
      name: "Wooden Jewelry Stand",
      category: "Home Decor",
      price: "₹450",
      rating: 4.9,
      views: 215,
      image: "/images/mockup-product-3.png"
    }
  ];

  return (
    <div className="h-full overflow-auto p-4 text-left">
      <h1 className="text-xl font-heading text-primary mb-4">Seller Dashboard</h1>
      
      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
        <div className="bg-white rounded-lg shadow-sm p-3">
          <div className="flex items-center">
            <div className="p-2 bg-primary/10 rounded-full">
              <Package className="h-4 w-4 text-primary" />
            </div>
            <div className="ml-2">
              <p className="text-xs text-gray-500">Total Products</p>
              <h3 className="text-sm font-semibold">24</h3>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-3">
          <div className="flex items-center">
            <div className="p-2 bg-accent/30 rounded-full">
              <ShoppingBag className="h-4 w-4 text-primary" />
            </div>
            <div className="ml-2">
              <p className="text-xs text-gray-500">Total Orders</p>
              <h3 className="text-sm font-semibold">18</h3>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-3">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-full">
              <DollarSign className="h-4 w-4 text-green-600" />
            </div>
            <div className="ml-2">
              <p className="text-xs text-gray-500">Revenue</p>
              <h3 className="text-sm font-semibold">₹12,450</h3>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-3">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-full">
              <TrendingUp className="h-4 w-4 text-blue-600" />
            </div>
            <div className="ml-2">
              <p className="text-xs text-gray-500">Conversion</p>
              <h3 className="text-sm font-semibold">24%</h3>
            </div>
          </div>
        </div>
      </div>
      
      {/* Profile Overview */}
      <div className="bg-white rounded-lg shadow-sm p-3 mb-4">
        <div className="flex items-start">
          <div className="relative h-12 w-12 rounded-full overflow-hidden border-2 border-white shadow-sm">
            <Image
              src="/images/logo.png"
              alt="Seller"
              fill
              className="object-cover"
              sizes="48px"
            />
          </div>
          
          <div className="ml-3 flex-1">
            <h2 className="text-sm font-heading text-gray-800">
              Artisan Crafts Co.
            </h2>
            <p className="text-xs text-gray-600 mb-1">
              Handmade Crafts
            </p>
            <div className="flex flex-wrap gap-1">
              <span className="px-2 py-0.5 bg-accent/30 text-primary text-[10px] rounded-full">
                Handicrafts
              </span>
              <span className="px-2 py-0.5 bg-accent/30 text-primary text-[10px] rounded-full">
                Home Decor
              </span>
            </div>
          </div>
          
          <Button size="sm" className="bg-primary text-white text-xs py-1 px-2 h-auto">
            Edit Profile
          </Button>
        </div>
      </div>
      
      {/* Top Products */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-4">
        <div className="px-3 py-2 border-b border-gray-100 flex justify-between items-center">
          <h3 className="font-heading text-sm">Top Products</h3>
          <span className="text-xs text-primary">View All</span>
        </div>
        
        <div className="divide-y divide-gray-100">
          {products.map((product) => (
            <div key={product.id} className="p-2 hover:bg-gray-50 transition-colors">
              <div className="flex items-center">
                <div className="relative h-10 w-10 rounded-md overflow-hidden bg-gray-100">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="40px"
                  />
                </div>
                
                <div className="ml-2 flex-1">
                  <h4 className="text-xs font-medium text-gray-900">{product.name}</h4>
                  <p className="text-[10px] text-gray-500">
                    {product.category} • {product.price}
                  </p>
                </div>
                
                <div className="text-right">
                  <div className="flex items-center justify-end">
                    <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                    <span className="text-[10px] font-medium ml-0.5">{product.rating}</span>
                  </div>
                  <p className="text-[10px] text-gray-500">
                    {product.views} views
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Store Status */}
      <div className="bg-white rounded-lg shadow-sm p-3">
        <h3 className="font-heading text-sm mb-2">Store Status</h3>
        
        <div className="bg-green-50 border border-green-100 rounded-lg p-2">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg className="h-4 w-4 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-2">
              <h3 className="text-xs font-medium text-green-800">Your store is active</h3>
              <div className="mt-1 text-[10px] text-green-700">
                <p>Your store is verified and visible to customers.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


// Marketplace Mockup Component
function MarketplaceMockup() {
  return (
    <div className="h-full overflow-auto p-4 text-left">
      <h1 className="text-xl font-heading text-primary mb-4">Explore Shops</h1>
      <p className="text-xs text-gray-600 mb-4">
        Discover unique local businesses and artisans
      </p>
      
      <div className="flex flex-col md:flex-row gap-4">
        {/* Filters sidebar */}
        <div className="w-full md:w-1/4">
          <div className="bg-white rounded-lg shadow-sm p-3">
            <h3 className="font-medium text-sm mb-2">Filters</h3>
            
            <div className="mb-3">
              <h4 className="text-xs font-medium mb-1">Categories</h4>
              <div className="space-y-1">
                {['Handicrafts', 'Clothing', 'Jewelry', 'Home Decor', 'Food'].map((cat) => (
                  <div key={cat} className="flex items-center">
                                        <input type="checkbox" id={cat} className="mr-2 h-3 w-3" />
                    <label htmlFor={cat} className="text-xs">{cat}</label>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="text-xs font-medium mb-1">Minimum Rating</h4>
              <div className="flex items-center space-x-1">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <button key={rating} className="flex items-center justify-center w-6 h-6 rounded-full hover:bg-gray-100">
                    <Star className={`h-4 w-4 ${rating <= 4 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                  </button>
                ))}
                <span className="text-xs text-gray-600 ml-1">& Up</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Main content */}
        <div className="w-full md:w-3/4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((shop) => (
              <div key={shop} className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="relative h-32 w-full">
                  <Image
                    src={`/images/mockup-shop-${shop % 2 + 1}.png`}
                    alt="Shop"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-3">
                    <h3 className="text-white font-medium text-sm">Artisan Crafts Co.</h3>
                    <div className="flex items-center">
                      <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                      <span className="text-white text-xs ml-1">4.8 (42 reviews)</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-3">
                  <div className="flex flex-wrap gap-1 mb-2">
                    <span className="px-2 py-0.5 bg-accent/30 text-primary text-[10px] rounded-full">
                      Handicrafts
                    </span>
                    <span className="px-2 py-0.5 bg-accent/30 text-primary text-[10px] rounded-full">
                      Home Decor
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 mb-2">
                    Handcrafted items made with love and attention to detail.
                  </p>
                  <Button size="sm" className="w-full bg-primary text-white text-xs py-1 h-auto">
                    Visit Shop
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Product Detail Mockup Component
function ProductDetailMockup() {
  const [currentImage, setCurrentImage] = useState(0);
  const images = ['/images/detail-product-1.png', '/images/detail-product-2.png', '/images/detail-product-3.png'];
  
  // Single product with consistent details
  const product = {
    name: "Sapphire Blue Crystal Earrings",
    category: "Jewelry",
    seller: "Elegant Accessories",
    price: "₹850",
    originalPrice: "₹1,200",
    discount: "30% OFF",
    stock: "Only 5 left",
    description: "Handcrafted sapphire blue crystal earrings with sterling silver hooks. These elegant pieces catch the light beautifully and add a touch of sophistication to any outfit. Perfect for special occasions or everyday elegance. The hypoallergenic materials ensure comfortable wear for sensitive ears."
  };
  
  return (
    <div className="h-full overflow-auto p-4 text-left">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Product Images */}
        <div>
          <div className="relative aspect-square w-full rounded-lg overflow-hidden mb-2">
            <Image
              src={images[currentImage]}
              alt="Product"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          
          <div className="flex space-x-2">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentImage(idx)}
                className={`relative h-12 w-12 rounded-md overflow-hidden ${currentImage === idx ? 'ring-2 ring-primary' : 'opacity-70'}`}
              >
                <Image
                  src={img}
                  alt={`Thumbnail ${idx + 1}`}
                  fill
                  className="object-cover"
                  sizes="48px"
                />
              </button>
            ))}
          </div>
        </div>
        
        {/* Product Details */}
        <div className="space-y-3">
          {/* Category */}
          <div>
            <span className="text-xs text-primary">{product.category}</span>
          </div>
          
          {/* Product Name */}
          <h1 className="text-lg font-heading text-gray-900">{product.name}</h1>
          
          {/* Seller */}
          <div>
            <p className="text-xs text-gray-500">
              Sold by <span className="text-primary">{product.seller}</span>
            </p>
          </div>
          
          {/* Price */}
          <div className="flex items-center space-x-2">
            <span className="text-base font-bold text-gray-900">{product.price}</span>
            <span className="text-xs text-gray-500 line-through">{product.originalPrice}</span>
            <span className="px-2 py-0.5 bg-green-100 text-green-800 text-[10px] rounded-full">
              {product.discount}
            </span>
          </div>
          
          {/* Stock Status */}
          <div>
            <p className="text-xs text-gray-700">
              In Stock
              <span className="ml-1 text-orange-600">
                ({product.stock})
              </span>
            </p>
          </div>
          
          {/* Actions */}
          <div className="flex space-x-2 pt-2">
            <Button size="sm" className="bg-primary text-white text-xs py-1 h-auto">
              Add to Cart
            </Button>
            <Button size="sm" variant="outline" className="text-xs py-1 h-auto">
              <Heart className="h-3 w-3 mr-1" />
              Wishlist
            </Button>
          </div>
          
          {/* Description */}
          <div className="pt-3 border-t border-gray-200">
            <h2 className="text-sm font-medium text-gray-900 mb-1">Description</h2>
            <p className="text-xs text-gray-700">
              {product.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}


// Checkout Mockup Component
function CheckoutMockup() {
  const products = [
    {
      name: "Handcrafted Ceramic Mug",
      category: "Home Decor",
      seller: "Artisan Crafts Co.",
      price: "₹450",
      originalPrice: "₹600",
      discount: "25% OFF",
      stock: "Only 3 left",
      description: "Handcrafted ceramic mug made with love. Each piece is unique with slight variations in color and texture. Perfect for your morning coffee or evening tea."
    },
    {
      name: "Handwoven Wallet",
      category: "Home Storage",
      seller: "EcoFriendly Crafts",
      price: "₹450",
      originalPrice: "₹600",
      discount: "20% OFF",
      stock: "In Stock",
      description: "Beautifully woven wallet, perfect for storage or as a decorative piece. Sustainable and eco-friendly."
    },
    {
      name: "Wooden Jewelry Stand",
      category: "Home Decor",
      seller: "Creative Canvas",
      price: "₹450",
      originalPrice: "₹500",
      discount: "20% OFF",
      stock: "Limited Edition",
      description: "Original wooden jewelry stand. Vibrant colors and unique design to add character to any room."
    }
  ];
  return (
    <div className="h-full overflow-auto p-4 text-left">
      <h1 className="text-xl font-heading text-primary mb-4">Checkout</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Left column - Cart items */}
        <div className="md:col-span-2">
          <div className="bg-white rounded-lg shadow-sm p-3 mb-4">
            <h2 className="text-sm font-medium mb-3">Your Cart (3 items)</h2>

            
            
            <div className="space-y-3">
  {[1, 2, 3].map((item) => {
    // Use modulo to cycle through the products array
    const product = products[(item - 1) % products.length];
    
    return (
      <div key={item} className="flex border-b border-gray-100 pb-3">
        <div className="relative h-16 w-16 rounded-md overflow-hidden bg-gray-100">
          <Image
            src={`/images/mockup-product-${item}.png`}
            alt="Product"
            fill
            className="object-cover"
            sizes="64px"
          />
        </div>
        
        <div className="ml-3 flex-1">
          <h3 className="text-xs font-medium">{product.name}</h3>
          <p className="text-[10px] text-gray-500">{product.seller}</p>
          <div className="flex justify-between mt-1">
            <div className="flex items-center border rounded-md">
              <button className="px-2 py-0.5 text-xs">-</button>
              <span className="px-2 text-xs">1</span>
              <button className="px-2 py-0.5 text-xs">+</button>
            </div>
            <p className="text-xs font-medium">{product.price}</p>
          </div>
        </div>
      </div>
    );
  })}
</div>

          </div>
          
          {/* Shipping Address */}
          <div className="bg-white rounded-lg shadow-sm p-3">
            <h2 className="text-sm font-medium mb-3">Shipping Address</h2>
            
            <div className="space-y-3">
              <div className="flex items-start p-2 border border-primary rounded-md bg-primary/5">
                <input type="radio" checked className="mt-1" readOnly />
                <div className="ml-2">
                  <p className="text-xs font-medium">Home</p>
                  <p className="text-[10px] text-gray-600">14 Short Road,</p>
                  <p className="text-[10px] text-gray-600">Durgapur, 713204</p>
                  <p className="text-[10px] text-gray-600">+91 XXXXX XXXXX</p>
                </div>
              </div>
              
              <Button size="sm" variant="outline" className="text-xs py-1 h-auto w-full">
                + Add New Address
              </Button>
            </div>
          </div>
        </div>
        
        {/* Right column - Order summary */}
        <div>
          <div className="bg-white rounded-lg shadow-sm p-3">
            <h2 className="text-sm font-medium mb-3">Order Summary</h2>
            
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span>₹1,350</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span>₹50</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Tax</span>
                <span>₹135</span>
              </div>
              
              <div className="flex justify-between border-t border-gray-100 pt-2 font-medium">
                <span>Total</span>
                <span>₹1,535</span>
              </div>
            </div>
            
            <div className="mt-4">
              <input 
                type="text" 
                placeholder="Enter coupon code" 
                className="w-full text-xs p-2 border rounded-md mb-3"
              />
              
              <Button size="sm" className="w-full bg-primary text-white text-xs py-2 h-auto">
                Proceed to Payment
              </Button>
            </div>
            
            <div className="mt-3 text-[10px] text-gray-500 text-center">
              <p>Secure payment powered by Razorpay</p>
              <div className="flex justify-center space-x-2 mt-2">
                <span>Visa</span>
                <span>Mastercard</span>
                <span>UPI</span>
                <span>PayTM</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// User Profile Mockup Component
function UserProfileMockup() {
  const [activeTab, setActiveTab] = useState("overview");
  
  return (
    <div className="h-full overflow-auto p-4 text-left">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-medium text-xs">
            N
          </div>
          <span className="text-sm font-medium ml-2">Nandini</span>
        </div>
        
        <div className="flex items-center space-x-2">
          <button className="p-1 text-gray-600 hover:text-primary transition-colors relative">
            <Bell className="h-4 w-4" />
            <span className="absolute -top-1 -right-1 bg-primary text-white text-[8px] rounded-full h-3 w-3 flex items-center justify-center">
              3
            </span>
          </button>
        </div>
      </div>
      
      <div className="flex space-x-2 mb-4 overflow-x-auto pb-1">
        <button
          onClick={() => setActiveTab("overview")}
          className={`px-3 py-1 text-xs rounded-full whitespace-nowrap ${
            activeTab === "overview"
              ? "bg-primary text-white"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          Overview
        </button>
        <button
          onClick={() => setActiveTab("orders")}
          className={`px-3 py-1 text-xs rounded-full whitespace-nowrap ${
            activeTab === "orders"
              ? "bg-primary text-white"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          Orders
        </button>
        <button
          onClick={() => setActiveTab("wishlist")}
          className={`px-3 py-1 text-xs rounded-full whitespace-nowrap ${
            activeTab === "wishlist"
              ? "bg-primary text-white"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          Wishlist
        </button>
        <button
          onClick={() => setActiveTab("history")}
          className={`px-3 py-1 text-xs rounded-full whitespace-nowrap ${
            activeTab === "history"
              ? "bg-primary text-white"
              : "bg-gray-100 text-gray-700"
                        }`}
        >
          History
        </button>
        <button
          onClick={() => setActiveTab("settings")}
          className={`px-3 py-1 text-xs rounded-full whitespace-nowrap ${
            activeTab === "settings"
              ? "bg-primary text-white"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          Settings
        </button>
      </div>
      
      {activeTab === "overview" && (
        <div className="space-y-4">
          {/* Recent Orders */}
          <div className="bg-white rounded-lg shadow-sm p-3">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-sm font-medium">Recent Orders</h2>
              <button className="text-[10px] text-primary">View All</button>
            </div>
            
            <div className="space-y-2">
              {[1, 2].map((order) => (
                <div key={order} className="flex items-center border-b border-gray-100 pb-2">
                  <div className="relative h-10 w-10 rounded-md overflow-hidden bg-gray-100">
                    <Image
                      src={`/images/mockup-product-${order}.png`}
                      alt="Product"
                      fill
                      className="object-cover"
                      sizes="40px"
                    />
                  </div>
                  
                  <div className="ml-2 flex-1">
                    <p className="text-xs font-medium">Order #KV00{order}</p>
                    <p className="text-[10px] text-gray-500">2 items • ₹950</p>
                  </div>
                  
                  <div className="text-right">
                    <span className="text-[10px] px-2 py-0.5 bg-green-100 text-green-800 rounded-full">
                      Delivered
                    </span>
                    <p className="text-[10px] text-gray-500 mt-1">May 03, 2025</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Saved Addresses */}
          <div className="bg-white rounded-lg shadow-sm p-3">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-sm font-medium">Saved Addresses</h2>
              <button className="text-[10px] text-primary">+ Add New</button>
            </div>
            
            <div className="space-y-2">
              <div className="p-2 border border-primary rounded-md bg-primary/5">
                <div className="flex justify-between">
                  <p className="text-xs font-medium">Home</p>
                  <span className="text-[10px] px-2 py-0.5 bg-primary/10 text-primary rounded-full">
                    Default
                  </span>
                </div>
                <p className="text-[10px] text-gray-600">14 Short Road,</p>
                <p className="text-[10px] text-gray-600">Durgapur, 713204</p>
              </div>
              
              <div className="p-2 border border-gray-200 rounded-md">
                <p className="text-xs font-medium">Office</p>
                <p className="text-[10px] text-gray-600">74 IdeaPod HO</p>
                <p className="text-[10px] text-gray-600">Kolkata, 700001</p>
              </div>
            </div>
          </div>
          
          {/* Recently Viewed */}
          <div className="bg-white rounded-lg shadow-sm p-3">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-sm font-medium">Recently Viewed</h2>
              <button className="text-[10px] text-primary">View All</button>
            </div>
            
            <div className="grid grid-cols-3 gap-2">
              {[1, 2, 3].map((item) => (
                <div key={item} className="relative h-16 rounded-md overflow-hidden">
                  <Image
                    src={`/images/mockup-product-${item}.png`}
                    alt="Product"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 33vw, 20vw"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      
      {activeTab === "orders" && (
        <div className="bg-white rounded-lg shadow-sm p-3">
          <h2 className="text-sm font-medium mb-3">Your Orders</h2>
          
          <div className="space-y-3">
            {[1, 2, 3].map((order) => (
              <div key={order} className="border border-gray-200 rounded-md p-2">
                <div className="flex justify-between items-center mb-2">
                  <p className="text-xs font-medium">Order #KV00{order}</p>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                    order === 1 
                      ? "bg-green-100 text-green-800" 
                      : order === 2 
                        ? "bg-blue-100 text-blue-800"
                        : "bg-yellow-100 text-yellow-800"
                  }`}>
                    {order === 1 ? "Delivered" : order === 2 ? "Shipped" : "Processing"}
                  </span>
                </div>
                
                <div className="flex items-center">
                  <div className="relative h-10 w-10 rounded-md overflow-hidden bg-gray-100">
                    <Image
                      src={`/images/mockup-product-${order}.png`}
                      alt="Product"
                      fill
                      className="object-cover"
                      sizes="40px"
                    />
                  </div>
                  
                  <div className="ml-2 flex-1">
                    <p className="text-[10px] text-gray-500">
                      {order === 1 ? "2 items" : order === 2 ? "1 item" : "3 items"}
                    </p>
                    <p className="text-[10px] text-gray-500">
                      Ordered on {order === 1 ? "May 07" : order === 2 ? "May 10" : "May 04"}, 2025
                    </p>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-xs font-medium">₹{order === 1 ? "950" : order === 2 ? "450" : "1,350"}</p>
                  </div>
                </div>
                
                <div className="mt-2 pt-2 border-t border-gray-100 flex justify-between">
                  <button className="text-[10px] text-primary">View Details</button>
                  {order === 1 && (
                    <button className="text-[10px] text-primary">Buy Again</button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}


