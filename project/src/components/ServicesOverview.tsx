import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight,  } from 'lucide-react';

// Mock services data similar to your structure
import digital from '../public/digital.jpg';
import IIOT from '../public/IIoT.jpg';
import Indus from '../public/Indus.jpg';
import cyber from '../public/Cyber_image.jpg';
import Automation from '../public/Automation_image.jpeg';

const services = [
  {
    id:1,
    hero_image: digital,
    title: 'Digitization',
    short_description: 'Transform your operations with smart digital systems that eliminate paperwork and bring real-time visibility.',
    features: [
      'Online Production Systems',
      'E-Logbooks & Digital Records',
      'Reports & Analysis',
      'Maintenance Management',
      'ERP Integration'
    ],
    color: 'from-blue-500 to-blue-600',
    slug: 'digitization'
  },
  {
    hero_image: IIOT,
    title: 'Industrial Internet of Things (IIoT)',
    short_description: 'Leverage IoT-powered intelligence for smarter factories, seamless connectivity, and real-time decision-making.',
    features: [
      'IoT Cloud Solutions',
      'Mobility Solutions',
      'Real-time Information',
      'Visualization & Dashboards'
    ],
    color: 'from-purple-500 to-purple-600',
    slug: 'iiot'
  },
  {
    hero_image: Indus,
    title: 'Industrial Communication Solutions',
    short_description: 'Robust, secure, and scalable connectivity solutions for modern industrial environments.',
    features: [
      'Industrial Gateways & Protocol Conversions',
      'Wireless Connectivity (2.4GHz / 5GHz)',
      'Satellite Communication Systems',
      'VSAT Technologies & Services'
    ],
    color: 'from-cyan-500 to-cyan-600',
    slug: 'industrial-communication'
  },
  {
    hero_image: cyber,
    title: 'Cybersecurity',
    short_description: 'End-to-end cybersecurity solutions to safeguard your industrial operations against evolving threats.',
    features: [
      'DLP, HIPS & Whitelisting',
      'Endpoint Protection & Anti-malware',
      'SIEM (Security Information & Event Management)',
      'Network Monitoring & Segmentation',
      'Multi-factor Authentication',
      'Secure Remote Access & Disaster Recovery'
    ],
    color: 'from-green-500 to-green-600',
    slug: 'cybersecurity'
  },
  {
    hero_image: Automation,
    title: 'Automation Services',
    short_description: 'Cutting-edge automation systems that improve efficiency, reduce downtime, and deliver smarter operations.',
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
    slug: 'automation-services'
  },
  {
    hero_image: 'https://via.placeholder.com/110?text=Analytics',
    title: 'Analytics & Monitoring',
    short_description: 'Turn your industrial data into actionable insights with advanced analytics and dashboards.',
    features: [
      'Real-time Dashboards',
      'Performance Metrics',
      'Alerts & Notifications',
      'Comprehensive Reporting'
    ],
    color: 'from-red-500 to-red-600',
    slug: 'analytics-monitoring'
  }
];

const ServicesOverview: React.FC = () => {
  const [inView, setInView] = React.useState(false);
  const [showScrollIndicator, setShowScrollIndicator] = React.useState(false);
  const [scrollPosition, setScrollPosition] = React.useState(0);
  const [isMobile, setIsMobile] = React.useState(false);
  const [isTablet, setIsTablet] = React.useState(false);
  const carouselRef = React.useRef<HTMLDivElement>(null);
  const animationRef = React.useRef<number | null>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById('services');
    if (section) {
      observer.observe(section);
    }

    return () => observer.disconnect();
  }, []);

  // Device detection
  React.useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);
    
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  // Check if scrollable content exists and add scroll listener
  React.useEffect(() => {
    const checkScrollable = () => {
      if (carouselRef.current) {
        const { scrollWidth, clientWidth } = carouselRef.current;
        setShowScrollIndicator(scrollWidth > clientWidth);
      }
    };

    const handleScroll = () => {
      if (carouselRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
        const maxScroll = scrollWidth - clientWidth;
        const position = maxScroll > 0 ? scrollLeft / maxScroll : 0;
        setScrollPosition(position);
      }
    };

    checkScrollable();
    
    const carousel = carouselRef.current;
    if (carousel) {
      carousel.addEventListener('scroll', handleScroll);
      handleScroll(); // Initial call
    }

    window.addEventListener('resize', checkScrollable);
    
    return () => {
      window.removeEventListener('resize', checkScrollable);
      if (carousel) {
        carousel.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  // Enhanced cursor-based scrolling with increased speed (disabled on mobile)
  const handleMouseMove = React.useCallback((e: React.MouseEvent) => {
    if (!carouselRef.current || isMobile) return;

    const carousel = carouselRef.current;
    const rect = carousel.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const carouselWidth = rect.width;
    
    // Define edge zones (20% from each side)
    const edgeZone = carouselWidth * 0.2;
    let scrollSpeed = 0;

    if (mouseX < edgeZone) {
      // Left edge - scroll left
      const intensity = (edgeZone - mouseX) / edgeZone;
      scrollSpeed = -intensity * (isTablet ? 4 : 8);
    } else if (mouseX > carouselWidth - edgeZone) {
      // Right edge - scroll right
      const intensity = (mouseX - (carouselWidth - edgeZone)) / edgeZone;
      scrollSpeed = intensity * (isTablet ? 4 : 8);
    }

    // Cancel previous animation
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }

    // Start smooth scrolling
    const smoothScroll = () => {
      if (carousel && scrollSpeed !== 0) {
        carousel.scrollLeft += scrollSpeed;
        animationRef.current = requestAnimationFrame(smoothScroll);
      }
    };

    if (scrollSpeed !== 0) {
      smoothScroll();
    }
  }, [isMobile, isTablet]);

  const handleMouseLeave = React.useCallback(() => {
    // Stop scrolling when mouse leaves carousel
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
  }, []);

  // Manual scroll to position based on scrollbar click
  const handleScrollbarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!carouselRef.current) return;

    const scrollbarElement = e.currentTarget;
    const rect = scrollbarElement.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const scrollbarWidth = rect.width;
    
    // Calculate the percentage position of the click
    const clickPercentage = clickX / scrollbarWidth;
    
    // Calculate the target scroll position
    const { scrollWidth, clientWidth } = carouselRef.current;
    const maxScroll = scrollWidth - clientWidth;
    const targetScroll = clickPercentage * maxScroll;
    
    // Scroll to the target position
    carouselRef.current.scrollTo({
      left: targetScroll,
      behavior: 'smooth'
    });
  };

  return (
    <section id="services" className="py-12 md:py-16 lg:py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 md:mb-12 lg:mb-16"
        >
          {/* Container for background text and main heading */}
          <div className="relative flex items-center justify-center">
            {/* Large background text - responsive sizing */}
            <div className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-bold uppercase tracking-wider text-gray-200 mb-4">
              SERVICES
            </div>
            
            {/* Main heading - responsive sizing */}
            <h2 className="absolute text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-bold text-[#203f78] font-poppins text-center px-4">
              Our Services
            </h2>
          </div>
        </motion.div>

        {/* Carousel Frame */}
        <div 
          className="w-full mb-6 md:mb-8 pb-12 md:pb-16 lg:pb-24 relative overflow-hidden"
          onMouseMove={!isMobile ? handleMouseMove : undefined}
          onMouseLeave={!isMobile ? handleMouseLeave : undefined}
        >
          <div 
            ref={carouselRef}
            className={`flex ${
              isMobile ? 'space-x-4' : isTablet ? 'space-x-5' : 'space-x-6'
            } overflow-x-auto scrollbar-hide pb-4 scroll-smooth`}
            style={{
              scrollSnapType: isMobile ? 'x mandatory' : 'none'
            }}
          >
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, x: 30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`flex-none cursor-pointer whitespace-normal ${
                  !isMobile && index % 2 === 1 ? (isTablet ? 'mt-8' : 'mt-16') : ''
                }`}
                style={{
                  scrollSnapAlign: isMobile ? 'start' : 'none'
                }}
              >
                {/* Service Card */}
                <div className={isMobile ? 'relative mx-2' : isTablet ? 'relative mx-4' : 'relative mx-6'}>
                  {/* Service Image and Title */}
                  <div className={`flex ${isMobile ? 'flex-col' : 'items-center'}`}>
                    {/* Image Container - responsive sizing */}
                    <div className={`
                      ${isMobile 
                        ? 'w-full h-[140px] mb-3' 
                        : isTablet 
                          ? 'min-w-[140px] w-[140px] h-[90px] mr-3' 
                          : 'min-w-[180px] w-[180px] h-[110px] mr-4'
                      } 
                      rounded-lg overflow-hidden
                    `}>
                      <img
                        src={service.hero_image}
                        alt={service.title}
                        className="w-full h-full object-cover rounded-lg"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    
                    {/* Title Container - responsive sizing */}
                    <div className={`
                      ${isMobile 
                        ? 'w-full mb-3' 
                        : isTablet 
                          ? 'w-[140px]' 
                          : 'w-[180px]'
                      }
                    `}>
                      <h4 className={`
                        ${isMobile 
                          ? 'text-lg text-center' 
                          : isTablet 
                            ? 'text-lg' 
                            : 'text-xl'
                        } 
                        font-bold text-[#203f78] leading-tight overflow-hidden mb-0 line-clamp-2
                      `}>
                        <a 
                          href={`/services/${service.slug}`} 
                          className=" transition-colors"
                        >
                          {service.title}
                        </a>
                      </h4>
                    </div>
                  </div>

                  {/* Service Content Info - responsive sizing */}
                  <div className={`
                    relative p-4 md:p-5 
                    ${isMobile 
                      ? 'mt-0 ml-0 max-w-full' 
                      : isTablet 
                        ? '-mt-4 ml-4 max-w-[280px]' 
                        : '-mt-5 ml-5 max-w-[350px]'
                    } 
                    bg-white border border-gray-200 rounded-lg shadow-[0px_4px_15px_0px_rgba(0,0,0,0.15)]
                  `}>
                    <p className={`
                      text-gray-700 mb-4 leading-relaxed
                      ${isMobile ? 'text-sm' : isTablet ? 'text-sm' : 'text-base'}
                    `}>
                      {service.short_description}
                    </p>
                    <a
                      href={`/services/${service.slug}`}
                      className="inline-flex items-center font-medium text-[#203f78] hover:text-[#ddaf26] transition-colors group"
                    >
                      <span className={isMobile ? 'text-sm' : 'text-base'}>Know More</span>
                      <ArrowUpRight className={`
                        ${isMobile ? 'w-3 h-3' : 'w-4 h-4'} 
                        ml-1 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform
                      `} />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Custom Scrollbar - Only show if content is scrollable and not on mobile */}
        {showScrollIndicator && !isMobile && (
          <div className="flex justify-center mb-6 md:mb-8">
            <div 
              className={`
                relative h-1 bg-gray-200 rounded-full overflow-hidden cursor-pointer hover:bg-gray-300 transition-colors duration-200
                ${isTablet ? 'w-60' : 'w-80'}
              `}
              onClick={handleScrollbarClick}
              title="Click to scroll to position"
            >
              <div 
                className="absolute top-0 left-0 h-full bg-[#203f78] rounded-full transition-all duration-300 ease-out pointer-events-none"
                style={{
                  width: `${(carouselRef.current?.clientWidth || 0) / (carouselRef.current?.scrollWidth || 1) * 100}%`,
                  transform: `translateX(${scrollPosition * ((isTablet ? 240 : 320) - ((carouselRef.current?.clientWidth || 0) / (carouselRef.current?.scrollWidth || 1) * (isTablet ? 240 : 320)))}px)`
                }}
              />
            </div>
          </div>
        )}

        {/* Mobile scroll indicator dots */}
        {isMobile && showScrollIndicator && (
          <div className="flex justify-center mb-6 space-x-2">
            {services.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                  Math.floor(scrollPosition * (services.length - 1)) === index
                    ? 'bg-[#203f78]'
                    : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-8 md:mt-12"
        >
          <a
            href="/services"
            className={`
              bg-[#203f78] text-white rounded-lg font-semibold hover:bg-[#ddaf26] transition-all duration-200 hover:-translate-y-0.5 inline-block
              ${isMobile 
                ? 'px-6 py-2 text-sm' 
                : isTablet 
                  ? 'px-7 py-2.5 text-base' 
                  : 'px-8 py-3 text-base'
              }
            `}
          >
            View All Services
          </a>
        </motion.div>
      </div>

      <style>{`
        .container {
          --gutter-x: 1.5rem;
          --gutter-y: 0;
          width: 100%;
          padding-right: calc(var(--gutter-x) * 0.5);
          padding-left: calc(var(--gutter-x) * 0.5);
          margin-right: auto;
          margin-left: auto;
        }
        
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        
        .scroll-smooth {
          scroll-behavior: smooth;
        }
        
        /* Enhanced visual indicators for scroll zones - only on desktop */
        @media (min-width: 1024px) {
          .w-full.mb-6.pb-12.relative.overflow-hidden::before,
          .w-full.mb-8.pb-16.relative.overflow-hidden::before,
          .w-full.mb-6.pb-12.relative.overflow-hidden::after,
          .w-full.mb-8.pb-16.relative.overflow-hidden::after {
            content: '';
            position: absolute;
            top: 0;
            bottom: 0;
            width: 20%;
            z-index: 10;
            pointer-events: none;
            transition: opacity 0.3s ease;
            opacity: 0;
          }
          
          .w-full.mb-6.pb-12.relative.overflow-hidden:hover::before,
          .w-full.mb-8.pb-16.relative.overflow-hidden:hover::before,
          .w-full.mb-6.pb-12.relative.overflow-hidden:hover::after,
          .w-full.mb-8.pb-16.relative.overflow-hidden:hover::after {
            opacity: 0.8;
          }
        }
        
        /* Mobile-specific improvements */
        @media (max-width: 767px) {
          .flex-none {
            min-width: 280px;
            max-width: 280px;
          }
          
          /* Ensure proper touch scrolling on mobile */
          .overflow-x-auto {
            -webkit-overflow-scrolling: touch;
            scroll-padding-left: 1rem;
          }
        }
        
        /* Tablet-specific improvements */
        @media (min-width: 768px) and (max-width: 1023px) {
          .flex-none {
            min-width: 320px;
            max-width: 320px;
          }
        }
        
        /* Desktop improvements */
        @media (min-width: 1024px) {
          .flex-none {
            min-width: 380px;
            max-width: 380px;
          }
        }
        
        /* Focus improvements for accessibility */
        .cursor-pointer:focus-within {
          outline: 2px solid #203f78;
          outline-offset: 2px;
        }
        
        /* Smooth hover transitions */
        .cursor-pointer:hover .shadow-\[0px_4px_15px_0px_rgba\(0\,0\,0\,0\.15\)\] {
          box-shadow: 0px 6px 20px 0px rgba(0,0,0,0.2);
          transform: translateY(-2px);
        }
        
        .cursor-pointer {
          transition: transform 0.2s ease;
        }
      `}</style>
    </section>
  );
};

export default ServicesOverview;