import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowRight, CheckCircle, Star, Users, Clock, Shield, Zap, Cpu, Network, Waves, ChevronRight } from 'lucide-react';
import { services } from '../data/mockData';
import ceo from '../public/COE.jpeg';

const ServicesPage: React.FC = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [activeService, setActiveService] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveService((prev) => (prev + 1) % 4);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const heroServices = [
    { icon: Cpu, title: "AI Automation", desc: "Intelligent systems that learn and adapt" },
    { icon: Network, title: "IoT Solutions", desc: "Connected devices for smart operations" },
    { icon: Zap, title: "Cloud Integration", desc: "Seamless digital transformation" },
    { icon: Shield, title: "Security First", desc: "Enterprise-grade protection" }
  ];

  return (
    <div className="pt-6">
      {/* Revolutionary Hero Section */}
      <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#203f78] via-[#1a335a] to-[#203f78]">
        {/* Animated Background */}
        <div className="absolute inset-0">
          {/* Circuit board pattern */}
          <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="circuit" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                <circle cx="20" cy="20" r="2" fill="#4c80b8" />
                <circle cx="80" cy="80" r="2" fill="#4c80b8" />
                <path d="M20 20 L80 20 L80 80" stroke="#4c80b8" strokeWidth="0.5" fill="none" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#circuit)" />
          </svg>

          {/* Floating particles */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-[#4c80b8] rounded-full"
              animate={{
                y: [0, -100, 0],
                x: [0, Math.random() * 50 - 25, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 3,
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}

          {/* Gradient orbs */}
          <motion.div
            className="absolute top-20 left-10 w-96 h-96 bg-[#4c80b8]/20 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-20 right-10 w-96 h-96 bg-[#2a4d8a]/20 rounded-full blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.5, 0.3, 0.5],
            }}
            transition={{ duration: 8, repeat: Infinity }}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10 min-h-screen flex items-center">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 w-full items-center py-20">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="inline-block mb-4"
                >
                  <span className="px-4 py-2 bg-[#4c80b8]/20 backdrop-blur-sm border border-[#4c80b8]/30 rounded-full text-white text-sm font-semibold">
                    ⚡ Powered by Innovation
                  </span>
                </motion.div>

                <h1 className="text-5xl md:text-6xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                  <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="block"
                  >
                    Transform
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="block text-transparent bg-clip-text bg-gradient-to-r from-[#4c80b8] to-[#5e99d0]"
                  >
                    Your Business
                  </motion.span>
                </h1>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="text-xl text-gray-300 leading-relaxed max-w-xl"
                >
                  Cutting-edge automation solutions that revolutionize industrial operations with AI-powered intelligence and seamless integration.
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex flex-wrap gap-4"
              >
                <Link to="/contact">
                  <button className="group relative px-8 py-4 bg-white text-[#203f78] rounded-xl font-bold text-lg overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300">
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-[#4c80b8] to-[#5e99d0]"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                    <span className="relative z-10 flex items-center group- transition-colors">
                      Get Started
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" />
                    </span>
                  </button>
                </Link>
               
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="grid grid-cols-3 gap-6 pt-8"
              >
                {[
                  { value: "500+", label: "Projects" },
                  { value: "98%", label: "Success Rate" },
                  { value: "24/7", label: "Support" }
                ].map((stat, i) => (
                  <div key={i} className="text-center">
                    <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                    <div className="text-sm text-gray-400">{stat.label}</div>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right - Interactive Service Display */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative"
            >
              <div className="relative w-full max-w-lg mx-auto">
                {/* Central Hub */}
                <div className="relative w-64 h-64 lg:w-80 lg:h-80 mx-auto">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 border-2 border-[#4c80b8]/30 rounded-full"
                  />
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-8 border border-[#5e99d0]/20 rounded-full"
                  />

                  {/* Center Icon */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-20 h-20 bg-gradient-to-br from-[#4c80b8] to-[#5e99d0] rounded-2xl flex items-center justify-center shadow-2xl"
                    >
                      <Zap className="w-10 h-10 text-white" />
                    </motion.div>
                  </div>

                  {/* Orbiting Services */}
                  {heroServices.map((service, index) => {
                    const angle = (index * 360) / heroServices.length;
                    const isActive = activeService === index;
                    
                    return (
                      <motion.div
                        key={index}
                        className="absolute"
                        animate={{
                          x: Math.cos((angle * Math.PI) / 180) * 140,
                          y: Math.sin((angle * Math.PI) / 180) * 140,
                        }}
                        transition={{
                          duration: 2,
                          ease: "easeInOut"
                        }}
                        style={{
                          left: '50%',
                          top: '50%',
                          transformOrigin: 'center'
                        }}
                      >
                        <motion.div
                          animate={{
                            scale: isActive ? 1.2 : 1,
                            rotate: isActive ? 360 : 0
                          }}
                          transition={{ duration: 0.5 }}
                          className={`w-16 h-16 bg-gradient-to-br ${
                            isActive 
                              ? 'from-white to-gray-100 shadow-2xl' 
                              : 'from-[#203f78] to-[#2a4d8a] shadow-lg'
                          } rounded-xl flex items-center justify-center cursor-pointer backdrop-blur-sm border ${
                            isActive ? 'border-white' : 'border-[#4c80b8]/30'
                          }`}
                          onClick={() => setActiveService(index)}
                        >
                          <service.icon className={`w-8 h-8 ${isActive ? 'text-[#203f78]' : 'text-white'}`} />
                        </motion.div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Active Service Info */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeService}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="mt-12 text-center"
                  >
                    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-xl">
                      <h3 className="text-2xl font-bold text-white mb-2">
                        {heroServices[activeService].title}
                      </h3>
                      <p className="text-gray-300">
                        {heroServices[activeService].desc}
                      </p>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1.5 h-1.5 bg-white rounded-full"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Services Grid Section */}
          {/* Services Grid Section */}
     {/* Services Grid Section */}
      <section ref={ref} className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6 }}
              className="inline-block mb-4"
            >
              <span className="px-4 py-2 bg-[#203f78]/10 rounded-full text-[#203f78] text-sm font-semibold">
                Our Solutions
              </span>
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-bold text-[#203f78] mb-6">
              Comprehensive Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              End-to-end automation solutions designed to elevate your business to new heights
            </p>
          </motion.div>

          <div className="space-y-20">
            {services.map((service, index) => {
              const descriptionSplit = service.long_description.split('. ');
              const firstHalf = descriptionSplit.slice(0, Math.ceil(descriptionSplit.length / 2)).join('. ') + (descriptionSplit.length > 1 ? '.' : '');
              const secondHalf = descriptionSplit.slice(Math.ceil(descriptionSplit.length / 2)).join('. ');

              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="relative"
                >
                  <div className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 items-start`}>
                    {/* Compact Image Section */}
                    <motion.div
                      className="w-full lg:w-80 flex-shrink-0"
                      whileHover={{ scale: 1.03 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="relative group">
                        <div className="absolute -inset-2 bg-gradient-to-r from-[#203f78]/20 to-[#4c80b8]/20 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-300" />
                        <div className="relative overflow-hidden rounded-xl shadow-xl">
                          <img
                            src={service.hero_image}
                            alt={service.title}
                            className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#203f78]/70 via-transparent to-transparent" />
                          
                          {/* Floating Category Badge */}
                          <div className="absolute top-4 left-4">
                            <span className="px-3 py-1.5 bg-white/95 backdrop-blur-sm text-[#203f78] rounded-full text-xs font-bold shadow-lg">
                              {service.category}
                            </span>
                          </div>

                          {/* Icon Badge */}
                          <div className="absolute bottom-4 right-4">
                            <div className="w-12 h-12 bg-white/95 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg">
                              <service.icon className="w-6 h-6 text-[#203f78]" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>

                    {/* Content Section */}
                    <div className="flex-1 space-y-5">
                      {/* Title & First Description */}
                      <div>
                        <motion.div
                          initial={{ width: 0 }}
                          animate={inView ? { width: '60px' } : {}}
                          transition={{ duration: 0.8, delay: 0.2 + index * 0.1 }}
                          className="h-1 bg-gradient-to-r from-[#203f78] to-[#4c80b8] rounded-full mb-3"
                        />
                        <h3 className="text-3xl lg:text-4xl font-bold text-[#203f78] mb-3">
                          {service.title}
                        </h3>
                        <p className="text-base text-gray-700 leading-relaxed">
                          {firstHalf}
                        </p>
                      </div>

                      {/* Features - Inline Pills */}
                      <div className="flex flex-wrap gap-2">
                        {service.features.map((feature, fIndex) => (
                          <motion.div
                            key={fIndex}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={inView ? { opacity: 1, scale: 1 } : {}}
                            transition={{ duration: 0.3, delay: 0.3 + fIndex * 0.05 }}
                            className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#203f78]/5 hover:bg-[#203f78]/10 border border-[#203f78]/20 rounded-full transition-all duration-300"
                          >
                            <CheckCircle className="w-3.5 h-3.5 text-[#203f78]" />
                            <span className="text-gray-700 text-sm font-medium">{feature}</span>
                          </motion.div>
                        ))}
                      </div>

                      {/* Second Half Description */}
                      {secondHalf && (
                        <p className="text-base text-gray-600 leading-relaxed">
                          {secondHalf}
                        </p>
                      )}

                      {/* CTA Button */}
                      <div className="pt-2">
                        <Link
                          to={`/services/${service.slug}`}
                          className="inline-flex items-center gap-2 px-6 py-3 bg-[#203f78] text-white rounded-xl font-semibold hover:bg-[#2a4d8a] transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 group"
                        >
                          Learn More
                          <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* Decorative Line Between Services */}
                  {index < services.length - 1 && (
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={inView ? { scaleX: 1 } : {}}
                      transition={{ duration: 0.8, delay: 0.5 + index * 0.1 }}
                      className="mt-20 h-px bg-gradient-to-r from-transparent via-[#203f78]/20 to-transparent"
                    />
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Center of Excellence */}
      <section className="py-20 bg-gradient-to-br from-[#203f78] to-[#2a4d8a] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <Waves className="absolute top-10 left-10 w-64 h-64" />
          <Waves className="absolute bottom-10 right-10 w-64 h-64" />
        </div>

        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-semibold mb-4">
              🎯 Innovation Hub
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Center of Excellence
            </h2>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              Driving innovation through cutting-edge technology and creative solutions
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="relative group"
            >
              <div className="absolute -inset-4 bg-white/20 rounded-3xl blur-xl" />
              <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                <img
                  src={ceo}
                  alt="Center of Excellence"
                  className="w-full h-96 object-cover"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-8"
            >
              <div className="grid grid-cols-3 gap-6">
                {[
                  { value: "100+", label: "Projects", icon: Star },
                  { value: "50+", label: "Partners", icon: Users },
                  { value: "24/7", label: "Support", icon: Clock }
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                    className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20"
                  >
                    <stat.icon className="w-8 h-8 text-white mx-auto mb-3" />
                    <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                    <div className="text-sm text-gray-300">{stat.label}</div>
                  </motion.div>
                ))}
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <h4 className="text-2xl font-bold text-white mb-4">Why Choose Us?</h4>
                <ul className="space-y-3">
                  {[
                    "Industry-leading expertise",
                    "Cutting-edge technology",
                    "Proven track record",
                    "24/7 dedicated support"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-gray-200">
                      <CheckCircle className="w-5 h-5 text-white flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative bg-gradient-to-r from-[#203f78] to-[#2a4d8a] rounded-3xl p-12 md:p-16 text-center overflow-hidden shadow-2xl"
          >
            <div className="absolute inset-0 opacity-10">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
                className="absolute top-0 left-0 w-64 h-64 border-2 border-white rounded-full"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                className="absolute bottom-0 right-0 w-96 h-96 border-2 border-white rounded-full"
              />
            </div>

            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Ready to Transform Your Business?
              </h2>
              <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
                Let's create a tailored automation solution that drives your success
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link to="/contact">
                  <button className="px-8 py-4 bg-white text-[#203f78] rounded-xl font-bold text-lg hover:bg-gray-100 transition-all duration-300 shadow-xl">
                    Get Started Now
                  </button>
                </Link>
                
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;