import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowRight, CheckCircle, Star, Users, Clock, Shield } from 'lucide-react';
import { services } from '../data/mockData';
import ceo from '../public/COE.jpeg'

const ServicesPage: React.FC = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  // Auto-scrolling cards state
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  
  const cards = [
    { title: "AI Automation", desc: "Smart systems", color: "from-blue-500 to-cyan-400" },
    { title: "IoT Solutions", desc: "Connected devices", color: "from-green-500 to-emerald-400" },
    { title: "Cloud Integration", desc: "Seamless connectivity", color: "from-purple-500 to-pink-400" },
    { title: "24/7 Support", desc: "Always available", color: "from-orange-500 to-yellow-400" }
  ];

  // Auto-scroll effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCardIndex((prevIndex) => (prevIndex + 1) % cards.length);
    }, 3000); // Change every 3 seconds

    return () => clearInterval(interval);
  }, [cards.length]);

  return (
    <div className="pt-6">
      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden bg-black flex flex-col">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#203F78]/90 via-black to-[#203F78]/60"></div>
          <div className="absolute inset-0 opacity-20">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="circuit" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                  <g className="animate-pulse">
                    <path d="M10,10 L90,10 M50,10 L50,90 M10,90 L90,90" stroke="currentColor" strokeWidth="1" fill="none" className="text-[#203F78]"/>
                    <circle cx="10" cy="10" r="2" fill="currentColor" className="text-[#ddaf26]"/>
                    <circle cx="90" cy="90" r="2" fill="currentColor" className="text-[#ddaf26]"/>
                  </g>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#circuit)"/>
            </svg>
          </div>
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-[#203F78] rounded-full"
              animate={{
                x: [0, Math.random() * 200 - 100],
                y: [0, Math.random() * 200 - 100],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
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
        
        <div className="container mx-auto px-4 relative z-10 h-full flex flex-col">
          <div className="flex-1 flex items-center">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 w-full items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="space-y-6"
              >
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  <h2 className="text-2xl md:text-3xl lg:text-5xl font-bold text-white mb-6 font-poppins leading-tight">
                    <span className="relative block">
                      Next-Gen
                      <motion.div
                        animate={{ scaleX: [0, 1, 0] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                        className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-[#203F78] to-[#ddaf26]"
                      ></motion.div>
                    </span>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#203F78] via-[#ddaf26] to-[#203F78] block">
                      Automation
                    </span>
                  </h2>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.8 }}
                    className="text-lg lg:text-xl text-gray-300 leading-relaxed mb-4 max-w-lg"
                  >
                    Experience the future of industrial automation with our revolutionary 
                    AI-powered solutions that transform the way businesses operate.
                  </motion.p>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 1.2 }}
                  >
                    <div className="relative inline-block">
                      <Link to="/contact">
                        <button className="group relative inline-flex items-center bg-gradient-to-r from-[#203F78] to-[#ddaf26] text-white px-6 py-3 rounded-xl font-bold text-lg overflow-hidden transition-all duration-500 hover:shadow-2xl hover:scale-105">
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12"
                            animate={{ x: ["-200%", "200%"] }}
                            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                          ></motion.div>
                          <span className="relative z-10 flex items-center">
                            Initialize Connection
                            <motion.div
                              animate={{ x: [0, 10, 0] }}
                              transition={{ duration: 1.5, repeat: Infinity }}
                            >
                              <ArrowRight className="w-5 h-5 ml-3" />
                            </motion.div>
                          </span>
                        </button>
                      </Link>
                      <motion.div
                        className="absolute inset-0 border-2 border-[#203F78]/50 rounded-xl"
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
                    className="relative w-64 h-64 lg:w-80 lg:h-80"
                  >
                    <div className="absolute inset-0 border-2 border-[#203F78]/50 rounded-full">
                      <div className="absolute inset-4 border border-[#ddaf26]/30 rounded-full">
                        <div className="absolute inset-4 border border-white/20 rounded-full flex items-center justify-center">
                          <motion.div
                            animate={{ rotate: -360 }}
                            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                            className="w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-r from-[#203F78] to-[#ddaf26] rounded-full flex items-center justify-center shadow-2xl"
                          >
                            <Star className="w-8 h-8 lg:w-10 lg:h-10 text-white" />
                          </motion.div>
                        </div>
                      </div>
                    </div>
                    {[
                      { icon: Users, angle: 0, color: 'from-blue-500 to-cyan-400' },
                      { icon: Shield, angle: 90, color: 'from-green-500 to-emerald-400' },
                      { icon: Clock, angle: 180, color: 'from-purple-500 to-pink-400' },
                      { icon: CheckCircle, angle: 270, color: 'from-orange-500 to-yellow-400' }
                    ].map((service, index) => (
                      <motion.div
                        key={index}
                        className="absolute w-12 h-12 lg:w-16 lg:h-16"
                        animate={{
                          rotate: 360,
                          x: Math.cos((service.angle * Math.PI) / 180) * 110,
                          y: Math.sin((service.angle * Math.PI) / 180) * 110
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
                          className={`w-full h-full bg-gradient-to-r ${service.color} rounded-xl flex items-center justify-center shadow-xl border border-white/20 backdrop-blur-sm cursor-pointer`}
                        >
                          <service.icon className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
                        </motion.div>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
          
          {/* Mobile: Single Auto-Scrolling Card */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="pb-8"
          >
            {/* Mobile View - Single Card */}
            <div className="block md:hidden">
              <div className="relative overflow-hidden">
                <motion.div
                  key={currentCardIndex}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5 }}
                  className="w-full"
                >
                  <div className="group relative bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6 cursor-pointer mx-4">
                    <div className={`absolute inset-0 bg-gradient-to-r ${cards[currentCardIndex].color} opacity-20 rounded-xl`}></div>
                    <div className="relative z-10">
                      <h3 className="text-xl font-bold text-white mb-2">{cards[currentCardIndex].title}</h3>
                      <p className="text-gray-400 text-sm">{cards[currentCardIndex].desc}</p>
                    </div>
                    <motion.div
                      className="absolute top-4 right-4 w-3 h-3 bg-[#203F78] rounded-full"
                      animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    ></motion.div>
                  </div>
                </motion.div>
                
                {/* Dots Indicator */}
                <div className="flex justify-center mt-4 space-x-2">
                  {cards.map((_, index) => (
                    <button
                      key={index}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === currentCardIndex ? 'bg-[#203F78] w-6' : 'bg-white/30'
                      }`}
                      onClick={() => setCurrentCardIndex(index)}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Desktop View - All Cards */}
            <div className="hidden md:block">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                {cards.map((card, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, rotateX: 90 }}
                    animate={{ opacity: 1, rotateX: 0 }}
                    transition={{ duration: 0.8, delay: 1.2 + index * 0.1 }}
                    whileHover={{ 
                      scale: 1.05, 
                      rotateY: 5,
                      transition: { duration: 0.3 }
                    }}
                    className="group relative bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-4 lg:p-6 cursor-pointer"
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-r ${card.color} opacity-0 group-hover:opacity-20 rounded-xl transition-opacity duration-300`}></div>
                    <div className="relative z-10">
                      <h3 className="text-sm lg:text-lg font-bold text-white mb-1 lg:mb-2">{card.title}</h3>
                      <p className="text-gray-400 text-xs lg:text-sm">{card.desc}</p>
                    </div>
                    <motion.div
                      className="absolute top-2 right-2 w-2 h-2 bg-[#203F78] rounded-full"
                      animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                    ></motion.div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
          
          <div className="absolute left-0 top-1/2 w-full h-px overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-transparent via-[#203F78] to-transparent"
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            ></motion.div>
          </div>
        </div>
      </section>

      {/* Services Alternating Layout */}
      <section ref={ref} className="py-20">
        <div className="container mx-auto px-4">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 60 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="mb-32 last:mb-0"
            >
              <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center ${
                index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
              }`}>
                {/* Image Section */}
                <div className={`${index % 2 === 1 ? 'lg:col-start-2' : ''} relative group`}>
                  <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                    <div className="aspect-[3/2] overflow-hidden">
                      <img
                        src={service.hero_image}
                        alt={service.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700"
                      />
                    </div>
                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#203F78]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    {/* Floating badge */}
                    <div className="absolute top-6 left-6">
                      <span className="bg-white/95 backdrop-blur-sm text-[#203F78] px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                        {service.category}
                      </span>
                    </div>
                  </div>
                  
                  {/* Decorative elements */}
                  <div className={`absolute -z-10 top-8 ${index % 2 === 0 ? '-right-8' : '-left-8'} w-full h-full bg-gradient-to-br from-[#203F78]/20 to-[#203F78]/10 rounded-3xl`}></div>
                </div>

                {/* Content Section */}
                <div className={`${index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''} space-y-8`}>
                  <div>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={inView ? { width: '80px' } : {}}
                      transition={{ duration: 0.8, delay: 0.5 + index * 0.2 }}
                      className="h-1 bg-gradient-to-r from-[#ddaf26] to-[#ddaf26] mb-6"
                    ></motion.div>
                    
                    <h2 className="text-4xl md:text-3xl font-bold text-[#203f78] mb-6 font-poppins leading-tight">
                      {service.title}
                    </h2>
                    
                    <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-8">
                      {service.long_description}
                    </p>
                  </div>

                  {/* Features Grid from mockData */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                    {service.features.map((feature, featureIndex) => (
                      <motion.div
                        key={featureIndex}
                        initial={{ opacity: 0, x: -20 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.8 + featureIndex * 0.1 }}
                        className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-white hover:shadow-md transition-all duration-300"
                      >
                        <div className="flex-shrink-0 w-10 h-10 bg-[#203f78] rounded-lg flex items-center justify-center">
                          <CheckCircle className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-gray-800 font-medium">{feature}</span>
                      </motion.div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link
                      to={`/services/${service.slug}`}
                      className="group relative overflow-hidden bg-[#203f78] text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:-translate-y-1"
                    >
                      <span className="relative z-10 flex items-center justify-center">
                        Know more
                        <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                      </span>
                      <div className="absolute inset-0 bg-[#ddaf26] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Center of Excellence Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#203F78]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#203F78]/5 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="inline-block mb-4">
              <span className="bg-[#ddaf26] text-white px-6 py-2 rounded-full text-sm font-semibold">
                🎯 Innovation Hub
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-[#203f78] mb-6 font-poppins">
              Center of Excellence
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              At Technoviz Automation, we drive innovation through our dedicated Center of Excellence—a specialized 
              hub where cutting-edge technologies meet creative solutions to solve tomorrow's challenges today.
            </p>
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
            {/* Left: Image/Visual */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative group"
            >
              <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                <div className="aspect-[4/3] bg-gradient-to-br from-[#203F78] to-[#203F78] p-0 flex items-center justify-center overflow-hidden">
                    <img
                      src={ceo}
                      alt="Center of Excellence"
                      className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700"
                    />
                  </div>

                {/* Decorative overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent to-white/10 group-hover:from-white/5 transition-all duration-500"></div>
              </div>
              {/* Background decoration */}
              <div className="absolute -z-10 top-8 -right-8 w-full h-full bg-gradient-to-br from-[#ddaf26]/20 to-[#203F78]/10 rounded-3xl"></div>
            </motion.div>

            {/* Right: Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-8"
            >
              <div>
                <motion.div
                  initial={{ width: 0 }}
                  animate={inView ? { width: '80px' } : {}}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="h-1 bg-gradient-to-r from-[#ddaf26] to-[#ddaf26] mb-6"
                ></motion.div>
                
                <h3 className="text-3xl font-bold text-[#203f78] mb-6 font-poppins">
                  Advancing Industrial Automation
                </h3>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Our Center of Excellence harnesses cutting-edge technologies and innovative processes 
                  that drive efficiency, enhance productivity, and streamline operations across all industry sectors.
                </p>
              </div>

              {/* Key Stats */}
              <div className="grid grid-cols-3 gap-6">
                <div className="text-center p-4 bg-white rounded-xl shadow-sm">
                  <div className="text-2xl font-bold text-[#203f78] mb-1">100+</div>
                  <div className="text-sm text-gray-600">Projects</div>
                </div>
                <div className="text-center p-4 bg-white rounded-xl shadow-sm">
                  <div className="text-2xl font-bold text-[203f78] mb-1">50+</div>
                  <div className="text-sm text-gray-600">Partners</div>
                </div>
                <div className="text-center p-4 bg-white rounded-xl shadow-sm">
                  <div className="text-2xl font-bold text-[#203f78] mb-1">24/7</div>
                  <div className="text-sm text-gray-600">Support</div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Services Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {/* Hands-On Experience */}
            <div className="group p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
              <div className="w-16 h-16 bg-[#203f78] rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-xl font-bold text-[#203f78] mb-4">Hands-On Experience</h4>
              <p className="text-gray-600 leading-relaxed">
                Practical training and hands-on experience in digital technologies and cybersecurity, 
                enhancing employability and industry readiness.
              </p>
            </div>

            {/* Collaboration Opportunities */}
            <div className="group p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
              <div className="w-16 h-16 bg-[#203f78] rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-xl font-bold text-[#203f78] mb-4">Collaboration Opportunities</h4>
              <p className="text-gray-600 leading-relaxed">
                Bridge academia and industry through research projects, internships, and strategic 
                partnerships for comprehensive learning experiences.
              </p>
            </div>

            {/* Industry-Relevant Curriculum */}
            <div className="group p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
              <div className="w-16 h-16 bg-[#203f78] rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-xl font-bold text-[#203f78] mb-4">Industry-Relevant Curriculum</h4>
              <p className="text-gray-600 leading-relaxed">
                Integrated modules ensuring students are equipped with skills and knowledge 
                demanded by the rapidly evolving digital landscape.
              </p>
            </div>

            {/* Enhanced Employability */}
            <div className="group p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
              <div className="w-16 h-16 bg-[#203f78] rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-xl font-bold text-[#203f78] mb-4">Enhanced Employability</h4>
              <p className="text-gray-600 leading-relaxed">
                Graduates become highly sought after by employers due to their in-demand skills 
                and practical experience, enhancing career prospects.
              </p>
            </div>

            {/* Economic Growth */}
            <div className="group p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
              <div className="w-16 h-16 bg-[#203f78] rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <ArrowRight className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-xl font-bold text-[#203f78] mb-4">Economic Growth</h4>
              <p className="text-gray-600 leading-relaxed">
                Producing skilled workforce capable of driving digital transformation, 
                contributing to economic growth and competitiveness globally.
              </p>
            </div>

            {/* Professional Growth */}
            <div className="group p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
              <div className="w-16 h-16 bg-[#203f78] rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-xl font-bold text-[#203f78] mb-4">Professional Growth</h4>
              <p className="text-gray-600 leading-relaxed">
                Through workshops, seminars, training sessions, and internships, providing 
                opportunities for personal and professional development.
              </p>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-center mt-16"
          >
            <Link
              to="/contact"
              className="group inline-flex items-center bg-[#203f78] text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-[#ddaf26] transition-all duration-300 hover:-translate-y-1"
            >
              Join Our Center of Excellence
              <ArrowRight className="w-6 h-6 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <div className="py-5 px-6 lg:px-20 bg-gradient-to-br from-slate-50 via-gray-50 to-blue-50">
        <motion.div
          className="text-center mt-5 relative z-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <div className="bg-white/80 backdrop-blur-sm border border-white/50 rounded-2xl p-8 max-w-2xl mx-auto shadow-lg shadow-[#203f78]/10">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Need a Custom Solution?
            </h3>
            <p className="text-gray-600 mb-6">
              Let's discuss how we can tailor our services to meet your specific requirements
            </p>
            <Link
              to="/contact" 
              className="bg-gradient-to-r from-[#203f78] via-[#2a4d8a] to-[#1a335a] text-white font-semibold py-3 px-8 rounded-xl hover:shadow-lg hover:shadow-[#203f78]/30 transition-all duration-300"
            >
              Contact Our Team
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ServicesPage;