import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Globe, Cloud, Wifi, ShieldCheck, Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const services = [
  {
    icon: Globe,
    title: 'Digitization',
    subtitle: 'Transform Operations',
    description: 'Transform your operations with smart digital systems that eliminate paperwork and bring real-time visibility.',
    features: [
      'Online Production Systems',
      'E-Logbooks & Digital Records',
      'Reports & Analysis',
      'Maintenance Management',
      'ERP Integration'
    ],
    color: 'from-blue-500 to-blue-600',
    cta: 'Explore Digitization',
    link: '/services/digitization'
  },
  {
    icon: Cloud,
    title: 'Industrial Internet of Things',
    subtitle: 'Smart Factory Solutions',
    description: 'Leverage IoT-powered intelligence for smarter factories, seamless connectivity, and real-time decision-making.',
    features: [
      'IoT Cloud Solutions',
      'Mobility Solutions',
      'Real-time Information',
      'Visualization & Dashboards'
    ],
    color: 'from-purple-500 to-purple-600',
    cta: 'Discover IIoT',
    link: '/services/iiot'
  },
  {
    icon: Wifi,
    title: 'Industrial Communication Solutions',
    subtitle: 'Robust Connectivity',
    description: 'Robust, secure, and scalable connectivity solutions for modern industrial environments.',
    features: [
      'Industrial Gateways & Protocol Conversions',
      'Wireless Connectivity (2.4GHz / 5GHz)',
      'Satellite Communication Systems',
      'VSAT Technologies & Services'
    ],
    color: 'from-cyan-500 to-cyan-600',
    cta: 'Learn More',
    link: '/services/communication'
  },
  {
    icon: ShieldCheck,
    title: 'Cybersecurity',
    subtitle: 'Industrial Protection',
    description: 'End-to-end cybersecurity solutions to safeguard your industrial operations against evolving threats.',
    features: [
      'DLP, HIPS & Whitelisting',
      'Endpoint Protection & Anti-malware',
      'SIEM (Security Information & Event Management)',
      'Network Monitoring & Segmentation',
      'Multi-factor Authentication',
      'Secure Remote Access & Disaster Recovery'
    ],
    color: 'from-green-500 to-green-600',
    cta: 'Secure Your Business',
    link: '/services/cybersecurity'
  },
  {
    icon: Settings,
    title: 'Automation Services',
    subtitle: 'Smart Operations',
    description: 'Cutting-edge automation systems that improve efficiency, reduce downtime, and deliver smarter operations.',
    features: [
      'SCADA, HMI & Historians',
      'Electrical Control Systems',
      'IoT Controllers',
      'RFID & Barcode Solutions',
      'Energy Management Systems',
      'Process Control Systems',
      'Custom Device Driver Development'
    ],
    color: 'from-orange-500 to-orange-600',
    cta: 'Automate Now',
    link: '/services/automation'
  }
];

// Particle Background Component
type Particle = {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  color: string;
};

const ParticlesBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const particles: Particle[] = [];
    const numParticles = 80;

    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 2,
        speedY: (Math.random() - 0.5) * 2,
        opacity: Math.random() * 0.8 + 0.2,
        color: Math.random() > 0.5 ? '#0FA3A3' : '#60A5FA',
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((particle, index) => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `${particle.color}${Math.floor(particle.opacity * 255).toString(16).padStart(2, '0')}`;
        ctx.fill();

        particles.slice(index + 1).forEach((other) => {
          const dx = particle.x - other.x;
          const dy = particle.y - other.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 120) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = `rgba(15, 163, 163, ${0.3 * (1 - distance / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });
      requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ zIndex: 1 }}
    />
  );
};

const Hero: React.FC = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % services.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const handleSlideChange = (index: number) => {
    setActiveSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const currentService = services[activeSlide];
 

  return (
    <section className="hero-section relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#0B1426] via-[#0B2B5A] to-[#1a1a2e]">
      {/* Particle Background */}
      <ParticlesBackground />
      {/* Gradient Overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-[#0B1426]/80 via-transparent to-[#0B2B5A]/60"
        style={{ zIndex: 2 }}
      ></div>
      {/* Animated Background Shapes */}
      <div className="absolute inset-0 overflow-hidden" style={{ zIndex: 3 }}>
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            rotate: [0, 180, 360]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="absolute top-1/4 left-1/4 w-32 h-32 bg-white/5 rounded-full blur-xl"
        />
        <motion.div
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
            rotate: [360, 180, 0]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-[#0FA3A3]/10 rounded-full blur-2xl"
        />
      </div>
      {/* Main Carousel Content */}
      <div className="carousel-content relative z-10 flex-1 flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSlide}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.6 }}
                className="hero-content"
              >
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="mb-6"
                >
                  {/* Uncomment if you want the icon back */}
                  {/* <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r ${currentService.color} mb-4`}>
                    <IconComponent className="w-10 h-10 text-white" />
                  </div> */}
                </motion.div>
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 font-poppins leading-tight"
                >
                  <span className="block text-[#ddaf26] text-2xl md:text-3xl font-medium mb-2">
                    {currentService.subtitle}
                  </span>
                  {currentService.title}
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="text-xl text-gray-200 mb-8 leading-relaxed max-w-3xl mx-auto"
                >
                  {currentService.description}
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="scdcall"
                >
                  <a
                    href={currentService.link}
                    className="inline-flex items-center bg-[#ddaf26] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#ddaf26] transition-all duration-300 hover:-translate-y-1 shadow-lg group"
                  >
                    {currentService.cta}
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </a>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Mobile Navigation - Show only on mobile */}
      <div className="block md:hidden absolute bottom-8 left-0 right-0 z-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center space-y-4">
            {/* Current Service Info */}
            <motion.div
              key={activeSlide}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/20 backdrop-blur-sm border border-[#ddaf26] rounded-xl p-4 max-w-sm w-full text-center"
            >
              <p className="text-white text-sm font-medium mb-2">
                {currentService.title}
              </p>
              <a
                href={currentService.link}
                className="inline-flex items-center text-[#ddaf26] text-sm font-semibold hover:text-white transition-colors"
              >
                Know More
                <ArrowRight className="w-4 h-4 ml-1" />
              </a>
            </motion.div>

            {/* Slide Dots */}
            <div className="flex space-x-2">
              {services.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleSlideChange(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    activeSlide === index
                      ? 'bg-[#ddaf26] w-6'
                      : 'bg-white/40'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Navigation - Hide on mobile */}
      <div className="hidden md:block carousel-indicators absolute bottom-8 left-0 right-0 z-20">
        <div className="container mx-auto px-4">
          <div className="flex justify-center">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 max-w-6xl">
              {services.map((service, index) => {
                
                return (
                  <motion.button
                    key={index}
                    onClick={() => handleSlideChange(index)}
                    className={`btncol group relative p-4 rounded-xl transition-all duration-300 ${
                      activeSlide === index
                        ? 'bg-white/20 backdrop-blur-sm border-2 border-[#ddaf26] shadow-lg'
                        : 'bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/15'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="indicator-info text-center">
                      <p className="text-white text-sm font-medium leading-tight">
                        {service.title.split(' ').slice(0, 2).join(' ')}
                        <br />
                        <strong className="text-[#ddaf26]">
                          {service.title.split(' ').slice(2).join(' ') || service.subtitle.split(' ')[0]}
                        </strong>
                      </p>
                    </div>
                    {/* Active indicator */}
                    {activeSlide === index && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="absolute inset-0 rounded-xl border-2 border-[#ddaf26] bg-[#0FA3A3]/10"
                        transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </motion.button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 z-20">
        <motion.div
          className="h-full bg-gradient-to-r from-[#0FA3A3] to-[#0D6EFD]"
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: 5, ease: 'linear', repeat: Infinity }}
          key={activeSlide}
        />
      </div>
    </section>
  );
};

export default Hero;