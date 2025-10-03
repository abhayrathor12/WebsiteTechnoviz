// src/pages/ProductsPage.tsx

import React, { useState, useEffect } from "react";
import { products } from "../data/mockData";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const ProductsPage: React.FC = () => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  
  const heroCards = [
    { title: "SaaS Solutions", desc: "Cloud-based products", color: "from-[#203f78] to-[#2a4d8a]", delay: 0, icon: "☁️" },
    { title: "Mobile Apps", desc: "iOS & Android", color: "from-[#1a335a] to-[#203f78]", delay: 0.1, icon: "📱" },
    { title: "Web Platforms", desc: "Responsive designs", color: "from-[#2a4d8a] to-[#1a335a]", delay: 0.2, icon: "💻" },
    { title: "AI Integration", desc: "Smart features", color: "from-[#ddaf26] to-[#203f78]", delay: 0.3, icon: "🤖" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCardIndex((prevIndex) => (prevIndex + 1) % heroCards.length);
    }, 3000); // Change card every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-[#203f78] to-[#1a335a]">
      {/* Product Hero Section - Changed from h-screen to min-h-screen */}
      <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-gray-900 via-[#203f78] to-[#1a335a] flex flex-col">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#203f78]/60 via-gray-900/70 to-[#1a335a]/80"></div>
          {/* Animated Color Blobs */}
          <motion.div
            className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-[#203f78]/40 to-[#2a4d8a]/40 rounded-full blur-3xl"
            animate={{
              x: [0, 100, 0],
              y: [0, 50, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-[#1a335a]/35 to-[#203f78]/35 rounded-full blur-3xl"
            animate={{
              x: [0, -80, 0],
              y: [0, -60, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          />
          <motion.div
            className="absolute top-1/2 left-1/3 w-64 h-64 bg-gradient-to-r from-[#2a4d8a]/30 to-[#203f78]/30 rounded-full blur-3xl"
            animate={{
              rotate: [0, 180, 360],
              scale: [0.8, 1.3, 0.8],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          {/* Updated Background Pattern */}
          <div className="absolute inset-0 opacity-15">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="productGrid" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
                  <g className="animate-pulse">
                    {/* Main grid lines */}
                    <path d="M0,60 L120,60 M60,0 L60,120" stroke="currentColor" strokeWidth="0.5" fill="none" className="text-[#203f78]/60"/>
                    
                    {/* Hexagonal pattern */}
                    <g transform="translate(30,30)">
                      <polygon points="30,10 50,20 50,40 30,50 10,40 10,20" 
                               fill="none" 
                               stroke="currentColor" 
                               strokeWidth="0.8" 
                               className="text-[#2a4d8a]/70"/>
                      <circle cx="30" cy="30" r="3" fill="currentColor" className="text-[#ddaf26]/60"/>
                    </g>
                    
                    {/* Secondary hexagonal pattern */}
                    <g transform="translate(90,90)">
                      <polygon points="15,5 25,10 25,20 15,25 5,20 5,10" 
                               fill="none" 
                               stroke="currentColor" 
                               strokeWidth="0.6" 
                               className="text-[#1a335a]/50"/>
                      <circle cx="15" cy="15" r="2" fill="currentColor" className="text-[#203f78]/50"/>
                    </g>
                    
                    {/* Connecting dots */}
                    <circle cx="15" cy="15" r="1" fill="currentColor" className="text-[#2a4d8a]/40"/>
                    <circle cx="105" cy="15" r="1" fill="currentColor" className="text-[#203f78]/40"/>
                    <circle cx="15" cy="105" r="1" fill="currentColor" className="text-[#1a335a]/40"/>
                    <circle cx="105" cy="105" r="1" fill="currentColor" className="text-[#ddaf26]/40"/>
                  </g>
                </pattern>
                
                {/* Gradient overlay for depth */}
                <radialGradient id="depthGradient">
                  <stop offset="0%" stopColor="rgba(32,63,120,0.1)"/>
                  <stop offset="70%" stopColor="rgba(42,77,138,0.05)"/>
                  <stop offset="100%" stopColor="rgba(26,51,90,0.02)"/>
                </radialGradient>
              </defs>
              <rect width="100%" height="100%" fill="url(#productGrid)"/>
              <rect width="100%" height="100%" fill="url(#depthGradient)"/>
            </svg>
          </div>
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute w-1 h-1 rounded-full ${
                i % 3 === 0 ? 'bg-[#203f78]' : i % 3 === 1 ? 'bg-[#2a4d8a]' : 'bg-[#ddaf26]'
              }`}
              animate={{
                x: [0, Math.random() * 150 - 75],
                y: [0, Math.random() * 150 - 75],
                opacity: [0, 1, 0],
                scale: [0.5, 1.5, 0.5],
              }}
              transition={{
                duration: Math.random() * 4 + 3,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>
        {/* Container with better spacing and padding */}
        <div className="container mx-auto px-4 relative z-10 flex-1 flex flex-col pt-20 pb-8">
          <div className="flex-1 flex items-center min-h-0">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 w-full items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="space-y-4 lg:space-y-6"
              >
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  <h2 className="text-2xl md:text-3xl lg:text-5xl font-bold text-white mb-4 lg:mb-6 font-poppins leading-tight">
                    <span className="relative block">
                      Premium
                      <motion.div
                        animate={{ scaleX: [0, 1, 0] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                        className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-[#203f78] to-[#ddaf26]"
                      ></motion.div>
                    </span>
                    <span className="text-transparent bg-clip-text bg-[#ddaf26] block">
                      Digital Services
                    </span>
                  </h2>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.8 }}
                    className="text-base lg:text-xl text-gray-300 leading-relaxed mb-4 max-w-lg"
                  >
                    Transform your business with our cutting-edge digital solutions. 
                    Built for performance, designed for scale, crafted for success.
                  </motion.p>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 1.2 }}
                  >
                    <div className="relative inline-block">
                      <Link
                        to="/contact" 
                        className="group relative inline-flex items-center bg-gradient-to-r from-[#203f78] via-[#2a4d8a] to-[#1a335a] text-white px-4 lg:px-6 py-2 lg:py-3 rounded-xl font-bold text-base lg:text-lg overflow-hidden transition-all duration-500 hover:shadow-2xl hover:scale-105 shadow-lg shadow-[#203f78]/30"
                      >
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12"
                          animate={{ x: ['-200%', '200%'] }}
                          transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                        ></motion.div>
                        <span className="relative z-10 flex items-center">
                          Explore Solutions
                          <motion.div
                            animate={{ x: [0, 10, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          >
                            <svg className="w-4 h-4 lg:w-5 lg:h-5 ml-2 lg:ml-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                          </motion.div>
                        </span>
                      </Link>
                      <motion.div
                        className="absolute inset-0 border-2 border-[#203f78]/50 rounded-xl"
                        animate={{ scale: [1, 1.1, 1], opacity: [1, 0, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      ></motion.div>
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.6 }}
                className="flex justify-center lg:justify-end"
              >
                <div className="relative inline-block perspective-1000">
                  <motion.div
                    animate={{ rotateY: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="relative w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80"
                  >
                    <div className="absolute inset-0 border-2 border-[#203f78]/50 rounded-full">
                      <div className="absolute inset-4 border border-[#2a4d8a]/40 rounded-full">
                        <div className="absolute inset-4 border border-[#1a335a]/30 rounded-full flex items-center justify-center">
                          <motion.div
                            animate={{ rotate: -360 }}
                            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                            className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 bg-gradient-to-r from-[#203f78] via-[#2a4d8a] to-[#1a335a] rounded-full flex items-center justify-center shadow-2xl shadow-[#203f78]/50"
                          >
                            <svg className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                            </svg>
                          </motion.div>
                        </div>
                      </div>
                    </div>
                    {[
                      { icon: '📱', angle: 0, color: 'from-[#203f78] to-[#2a4d8a]', label: 'Mobile Apps' },
                      { icon: '💻', angle: 90, color: 'from-[#1a335a] to-[#203f78]', label: 'Web Solutions' },
                      { icon: '☁️', angle: 180, color: 'from-[#2a4d8a] to-[#1a335a]', label: 'Cloud Services' },
                      { icon: '🤖', angle: 270, color: 'from-[#ddaf26] to-[#203f78]', label: 'AI Solutions' }
                    ].map((product, index) => (
                      <motion.div
                        key={index}
                        className="absolute w-8 h-8 md:w-12 md:h-12 lg:w-16 lg:h-16"
                        animate={{
                          rotate: 360,
                          x: Math.cos((product.angle * Math.PI) / 180) * (window.innerWidth < 768 ? 70 : window.innerWidth < 1024 ? 90 : 110),
                          y: Math.sin((product.angle * Math.PI) / 180) * (window.innerWidth < 768 ? 70 : window.innerWidth < 1024 ? 90 : 110)
                        }}
                        transition={{
                          rotate: { duration: 10, repeat: Infinity, ease: "linear" },
                          x: { duration: 8, repeat: Infinity, ease: "easeInOut" },
                          y: { duration: 8, repeat: Infinity, ease: "easeInOut" }
                        }}
                        style={{
                          left: '50%',
                          top: '50%',
                          transformOrigin: 'center'
                        }}
                      >
                        <motion.div
                          whileHover={{ scale: 1.2 }}
                          className={`w-full h-full bg-gradient-to-r ${product.color} rounded-xl flex items-center justify-center shadow-xl border border-white/20 backdrop-blur-sm cursor-pointer group relative`}
                        >
                          <span className="text-sm md:text-2xl lg:text-3xl">{product.icon}</span>
                          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-sm text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap text-gray-800">
                            {product.label}
                          </div>
                        </motion.div>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
          {/* Hero Cards Section - Better spacing and mobile optimization */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="mt-8 lg:mt-12"
          >
            {/* Desktop view - shows all 4 cards */}
            <div className="hidden lg:grid grid-cols-4 gap-6">
              {heroCards.map((card, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, rotateX: 90 }}
                  animate={{ opacity: 1, rotateX: 0 }}
                  transition={{ duration: 0.8, delay: 1.2 + card.delay }}
                  whileHover={{ 
                    scale: 1.05, 
                    rotateY: 5,
                    transition: { duration: 0.3 }
                  }}
                  className="group relative bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6 cursor-pointer shadow-sm"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <div className={`absolute inset-0 bg-gradient-to-r ${card.color} opacity-0 group-hover:opacity-20 rounded-xl transition-opacity duration-300`}></div>
                  <div className="relative z-10">
                    <div className="text-2xl mb-2">{card.icon}</div>
                    <h3 className="text-lg font-bold text-white mb-2">{card.title}</h3>
                    <p className="text-gray-300 text-sm">{card.desc}</p>
                  </div>
                  <motion.div
                    className="absolute top-2 right-2 w-2 h-2 bg-[#203f78] rounded-full"
                    animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                  ></motion.div>
                </motion.div>
              ))}
            </div>

            {/* Mobile view - shows only one card at a time with better spacing */}
            <div className="lg:hidden">
              <div className="relative flex justify-center px-4">
                <motion.div
                  key={currentCardIndex}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5 }}
                  className="group relative bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-4 cursor-pointer shadow-sm max-w-xs w-full"
                >
                  <div className={`absolute inset-0 bg-gradient-to-r ${heroCards[currentCardIndex].color} opacity-0 group-hover:opacity-20 rounded-xl transition-opacity duration-300`}></div>
                  <div className="relative z-10 text-center">
                    <div className="text-2xl mb-2">{heroCards[currentCardIndex].icon}</div>
                    <h3 className="text-base font-bold text-white mb-2">{heroCards[currentCardIndex].title}</h3>
                    <p className="text-gray-300 text-sm">{heroCards[currentCardIndex].desc}</p>
                  </div>
                  <motion.div
                    className="absolute top-2 right-2 w-2 h-2 bg-[#203f78] rounded-full"
                    animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  ></motion.div>
                </motion.div>
              </div>

              {/* Progress indicators for mobile */}
              <div className="flex justify-center mt-4 space-x-2 pb-4">
                {heroCards.map((_, index) => (
                  <motion.div
                    key={index}
                    className={`w-2 h-2 rounded-full cursor-pointer transition-all duration-300 ${
                      index === currentCardIndex ? 'bg-[#ddaf26] w-6' : 'bg-white/30'
                    }`}
                    onClick={() => setCurrentCardIndex(index)}
                    whileHover={{ scale: 1.2 }}
                  ></motion.div>
                ))}
              </div>
            </div>
          </motion.div>
          <div className="absolute left-0 top-1/2 w-full h-px overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-transparent via-[#203f78] to-transparent"
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            ></motion.div>
          </div>
        </div>
      </section>

      {/* Products Grid Section */}
      <div className="py-20 px-6 lg:px-20 bg-gradient-to-br from-slate-50 via-gray-50 to-blue-50">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `
                radial-gradient(circle at 25% 25%, #3B82F6 2px, transparent 2px),
                radial-gradient(circle at 75% 75%, #8B5CF6 2px, transparent 2px)
              `,
              backgroundSize: '60px 60px',
              backgroundPosition: '0 0, 30px 30px'
            }}
          />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 max-w-7xl mx-auto relative z-10">
          {products.map((product, index) => {
            const Icon = product.icon;

            return (
              <motion.div
                key={product.id}
                className="group relative"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  delay: index * 0.1, 
                  duration: 0.6,
                  ease: "easeOut"
                }}
                whileHover={{ y: -8 }}
              >
                {/* Subtle shadow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-200/30 to-purple-200/30 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100"></div>
                
                <div className="relative bg-white/90 backdrop-blur-sm border border-white/50 rounded-2xl p-8 h-full flex flex-col transition-all duration-500 group-hover:border-[#203f78]/30 group-hover:shadow-xl group-hover:shadow-[#203f78]/10">
                  {/* Product Image */}
                  <div className="relative mb-6 overflow-hidden rounded-xl">
                    <img
                      src={product.hero_image}
                      alt={product.name}
                      className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>

                  {/* Product Header */}
                  <div className="flex items-start gap-4 mb-4">
                    {Icon && (
                      <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-[#203f78] to-[#2a4d8a] rounded-lg flex items-center justify-center">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                    )}
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-[#203f78] mb-2  transition-colors">
                        {product.name}
                      </h2>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {product.tagline}
                      </p>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="flex-1 mb-8">
                    <div className="space-y-3">
                      {product.features.map((feature, i) => (
                        <motion.div
                          key={i}
                          className="flex items-center gap-3 text-gray-700"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: (index * 0.1) + (i * 0.05) }}
                        >
                          <div className="flex-shrink-0 w-5 h-5 bg-emerald-100 rounded-full flex items-center justify-center">
                            <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                          </div>
                          <span className="text-sm font-medium">{feature}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* CTA Button */}
                  <Link
                    to={`/products/${product.slug}`}
                    className="relative overflow-hidden group/btn bg-[#203f78]  text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 hover:bg-[#ddaf26]  text-center"
                  >
                    <div className="absolute inset-0 bg-[#ddaf26] opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                    <span className="relative flex items-center justify-center gap-2">
                      {product.cta_text}
                      <motion.div
                        className="w-4 h-4"
                        whileHover={{ x: 4 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </motion.div>
                    </span>
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA Section */}
        <motion.div
          className="text-center mt-20 relative z-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <div className="bg-white/80 backdrop-blur-sm border border-white/50 rounded-2xl p-8 max-w-2xl mx-auto shadow-lg shadow-[#203f78]/10">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Need a Custom Solution?
            </h3>
            <p className="text-gray-600 mb-6">
              Let's discuss how we can tailor our products to meet your specific requirements
            </p>
            <Link
              to="/contact" className="bg-gradient-to-r from-[#203f78] via-[#2a4d8a] to-[#1a335a] text-white font-semibold py-3 px-8 rounded-xl hover:shadow-lg hover:shadow-[#203f78]/30 transition-all duration-300">
                                Contact Our Team
                              </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProductsPage;