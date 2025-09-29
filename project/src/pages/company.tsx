import React, { useState, useEffect, useRef } from 'react';
import { Download, ArrowRight, Factory, Shield, Cpu, Cloud, Eye, X, ChevronLeft, ChevronRight, FileText, Package, Settings, Network, Zap, Server } from 'lucide-react';
import { Link } from "react-router-dom";
import vid2 from "../public/vid3.mp4"
import whatwedo from "../public/image122.png"
import about from "../public/about.png"
import our from "../public/our.png"
import tech from "../pdfs/Technoviz Automation.pdf"
import quality from "../pdfs/Technoviz Quality Inspection brochure.pdf"
import utility from "../pdfs/Technibiz Utility360 Brochure.pdf"
import ems from "../pdfs/Technobiz SmartEMS brochure.pdf"
import arvr from "../pdfs/Technoviz ARVR Application Brochure.pdf"
import oee from "../pdfs/Technoviz OEE Dashboard brochure.pdf"
import image from "../pdfs/Image Processing System - Technoviz Automation.pdf"
import g1 from "../public/g1.webp"
import g2 from "../public/g2.webp"
import g3 from "../public/g3.webp"
import g4 from "../public/g4.webp"
import g5 from "../public/g5.webp"
import g6 from "../public/g6.webp"
const Company = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  // Enhanced Company-Related Animation for Hero Section
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let time = 0;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.015;

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      // Company building/structure outline
      ctx.strokeStyle = 'rgba(32, 63, 120, 0.6)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      
      // Main building structure
      const buildingWidth = 120;
      const buildingHeight = 80;
      const buildingX = centerX - buildingWidth / 2;
      const buildingY = centerY - buildingHeight / 2;
      
      ctx.rect(buildingX, buildingY, buildingWidth, buildingHeight);
      ctx.stroke();

      // Windows with animated lights
      for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 4; col++) {
          const windowX = buildingX + 15 + col * 22;
          const windowY = buildingY + 15 + row * 20;
          const intensity = Math.sin(time * 2 + row * 0.5 + col * 0.3) * 0.5 + 0.5;
          
          ctx.fillStyle = `rgba(32, 63, 120, ${0.3 + intensity * 0.4})`;
          ctx.fillRect(windowX, windowY, 12, 8);
        }
      }

      // Data flow lines representing Industry 4.0 connectivity
      const nodes = [
        { x: centerX - 150, y: centerY - 100 },
        { x: centerX + 150, y: centerY - 100 },
        { x: centerX - 150, y: centerY + 100 },
        { x: centerX + 150, y: centerY + 100 },
      ];

      // Animate data packets
      ctx.strokeStyle = 'rgba(32, 63, 120, 0.4)';
      ctx.lineWidth = 1;
      
      nodes.forEach((node, index) => {
        // Connection lines to center
        ctx.beginPath();
        ctx.moveTo(node.x, node.y);
        ctx.lineTo(centerX, centerY);
        ctx.stroke();

        // Animated data packets
        const progress = (time * 0.5 + index * 0.25) % 1;
        const packetX = node.x + (centerX - node.x) * progress;
        const packetY = node.y + (centerY - node.y) * progress;
        
        ctx.fillStyle = 'rgba(32, 63, 120, 0.8)';
        ctx.beginPath();
        ctx.arc(packetX, packetY, 3, 0, Math.PI * 2);
        ctx.fill();

        // Node points
        ctx.fillStyle = 'rgba(32, 63, 120, 0.9)';
        ctx.beginPath();
        ctx.arc(node.x, node.y, 6, 0, Math.PI * 2);
        ctx.fill();
      });

      // Rotating tech icons around the building
      const techRadius = 100;
      const techIcons = ['IoT', 'AI', 'Cloud', 'Security'];
      
      techIcons.forEach((icon, index) => {
        const angle = time * 0.5 + (index * Math.PI * 2) / techIcons.length;
        const iconX = centerX + Math.cos(angle) * techRadius;
        const iconY = centerY + Math.sin(angle) * techRadius;
        
        // Icon background
        ctx.fillStyle = 'rgba(32, 63, 120, 0.2)';
        ctx.beginPath();
        ctx.arc(iconX, iconY, 20, 0, Math.PI * 2);
        ctx.fill();
        
        // Icon text
        ctx.fillStyle = 'rgba(32, 63, 120, 0.9)';
        ctx.font = '10px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(icon, iconX, iconY);
      });

      // Title text
      ctx.fillStyle = 'rgba(32, 63, 120, 0.6)';
      ctx.font = 'bold 16px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('TECHNOVIZ', centerX, centerY - 150);
      ctx.font = '12px Arial';
      ctx.fillText('Smart Industry Solutions', centerX, centerY - 130);

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  // Sample gallery images
  const galleryImages = [
    {
      id: 1,
      url: g1,
      title: "Industrial Automation System",
      category: "Automation"
    },
    {
      id: 2,
      url: g2,
      title: "IoT Manufacturing Dashboard",
      category: "IoT Solutions"
    },
    {
      id: 3,
      url: g3,
      title: "Smart Factory Operations",
      category: "Industry 4.0"
    },
    {
      id: 4,
      url: g4,
      title: "Cyber Security Implementation",
      category: "Cyber Security"
    },
    {
      id: 5,
      url: g5,
      title: "Cloud Infrastructure",
      category: "Cloud Services"
    },
    {
      id: 6,
      url: g6,
      title: "SCADA Control Systems",
      category: "Control Systems"
    }
  ];

  // Updated products array with 6 products
  const products = [
    {
      id: 1,
      title: "Immersix (AR/VR Training)",
      description: "Comprehensive PLC controllers, SCADA systems, and HMI solutions for complete industrial automation.",
      features: ["Advanced PLC Controllers", "Remote SCADA Access", "Real-time Monitoring", "Diagnostic Tools"],
      icon: <Settings className="w-5 h-5 text-white" />,
      color: '#203f78',
      pd:arvr,
    },
    {
      id: 2,
      title: "Utility360",
      description: "Smart IoT solutions enabling seamless device connectivity, data analytics, and intelligent decision-making.",
      features: ["Edge Computing", "Cloud Integration", "Data Analytics", "Device Management"],
      icon: <Network className="w-5 h-5 text-white" />,
      color: "from-green-500 to-green-600",
      pd:utility,
    },
    {
      id: 3,
      title: "Digital Checksheet",
      description: "End-to-end cybersecurity solutions protecting industrial networks and critical infrastructure.",
      features: ["Threat Detection", "Network Security", "Incident Response", "Compliance Management"],
      icon: <Shield className="w-5 h-5 text-white" />,
      color: "from-red-500 to-red-600",
      pd:quality,
    },
    {
      id: 4,
      title: "SmartEMS",
      description: "Scalable cloud solutions for data storage, processing, and remote access capabilities.",
      features: ["Data Storage", "Remote Access", "Scalable Processing", "Backup Solutions"],
      icon: <Cloud className="w-5 h-5 text-white" />,
      color: "from-purple-500 to-purple-600",
      pd:ems,
    },
    {
      id: 5,
      title: "OEE Dashboard",
      description: "AI-powered manufacturing optimization tools for predictive maintenance and efficiency.",
      features: ["Predictive Maintenance", "Performance Analytics", "Quality Control", "Process Optimization"],
      icon: <Zap className="w-5 h-5 text-white" />,
      color: "from-yellow-500 to-orange-500",
      pd:oee,
    },
    {
      id: 6,
      title: "VisionAI",
      description: "Comprehensive data management and analytics platform for industrial enterprises.",
      features: ["Data Integration", "Real-time Analytics", "Report Generation", "Dashboard Tools"],
      icon: <Server className="w-5 h-5 text-white" />,
      color: "from-indigo-500 to-indigo-600",
      pd:image,
    }
  ];

  const openLightbox = (image, index) => {
    setSelectedImage(image);
    setCurrentImageIndex(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const navigateImage = (direction) => {
    const newIndex = direction === 'next' 
      ? (currentImageIndex + 1) % galleryImages.length
      : (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
    setCurrentImageIndex(newIndex);
    setSelectedImage(galleryImages[newIndex]);
  };

  const services = [
    {
      icon: <Factory className="w-8 h-8" />,
      title: "Industrial Automation",
      description: "Comprehensive automation solutions with PLCs, Controllers, and Remote SCADA systems."
    },
    {
      icon: <Cpu className="w-8 h-8" />,
      title: "IoT Solutions",
      description: "Smart connectivity solutions leveraging Internet of Things for intelligent operations."
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Cyber Security",
      description: "End-to-end security products, consulting, implementation, and training services."
    },
    {
      icon: <Cloud className="w-8 h-8" />,
      title: "Cloud Services",
      description: "Internet of Services (Cloud) solutions for scalable and efficient operations."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-lg sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-[#203f78] to-[#1a3566] rounded-lg flex items-center justify-center">
                <Factory className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Technoviz</h1>
                <p className="text-sm text-gray-600">Automation Solutions</p>
              </div>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#about" className="text-gray-700 hover:text-[#203f78] transition-colors">About</a>
              <a href="#company-brochure" className="text-gray-700 hover:text-[#203f78] transition-colors">Company</a>
              <a href="#products" className="text-gray-700 hover:text-[#203f78] transition-colors">Products</a>
              <a href="#gallery" className="text-gray-700 hover:text-[#203f78] transition-colors">Gallery</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section - Updated for Mobile Responsiveness */}
      <section className="relative py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-[#203f78] to-[#1a3566]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            {/* Left side - Text content */}
            <div className="text-center lg:text-left order-2 lg:order-1">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
                Smart Solutions for
                <span className="block bg-gradient-to-r from-blue-300 to-cyan-300 bg-clip-text text-transparent">
                  Industry 4.0
                </span>
              </h2>
              <p className="text-base sm:text-lg lg:text-xl text-blue-100 mb-6 sm:mb-8 max-w-lg mx-auto lg:mx-0">
                Leveraging Big Data, IoT, Cloud Services, and Cyber Security to create intelligent manufacturing solutions that drive sustainable and efficient operations.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
                <Link
                  to="/services"
                  className="px-6 sm:px-8 py-3 sm:py-4 bg-white text-[#203f78] font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 w-full sm:w-auto text-center"
                >
                  Explore Solutions
                </Link>
                <Link
                  to="/contact"
                  className="px-6 sm:px-8 py-3 sm:py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-[#203f78] transition-all duration-300 w-full sm:w-auto text-center"
                >
                  Contact Us
                </Link>
              </div>
            </div>

            {/* Right side - Video instead of Animation */}
            <div className="relative order-1 lg:order-2">
              <video
                className="w-full h-64 sm:h-80 lg:h-96 rounded-2xl object-cover shadow-lg"
                autoPlay
                muted
                loop
                playsInline
              >
                <source src={vid2} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <div className="absolute inset-0 rounded-2xl border border-white/20"></div>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-4xl font-bold text-[#203f78] mb-4">About Technoviz</h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              Gurgaon-based technology firm providing smart solutions for digitization and industrial automation
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center mb-12 sm:mb-16">
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold text-[#203f78] mb-4 sm:mb-6">Who We Are</h3>
              <p className="text-gray-600 mb-4 sm:mb-6 leading-relaxed">
                Technoviz Automation Solutions Private Limited is a technology firm based in Gurgaon, providing smart solutions for digitization. We intensely focus on leveraging technologies like Big Data, the Internet of Things (IoT) and the Internet of Services (Cloud).
              </p>
              <p className="text-gray-600 mb-4 sm:mb-6 leading-relaxed">
                We are also providing advanced Cyber Security Solutions and offering end-to-end security products, consulting, implementation, and training services through a best-practices approach to cyber security risk management.
              </p>
              <Link
                to="/services"
                className="flex items-center text-[#203f78] font-semibold"
              >
                <span>Learn more about our expertise</span>
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-r from-blue-100 to-indigo-100 rounded-2xl p-4 sm:p-8">
                <img 
                  src={about} 
                  alt="Industrial Automation" 
                  className="w-full h-48 sm:h-64 object-cover rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="bg-white rounded-2xl p-4 sm:p-8 rounded-2xl p-8">
                <div 
                  className="bg-center bg-contain bg-no-repeat h-48 sm:h-64 lg:h-80 w-full"
                  style={{ backgroundImage: `url(${whatwedo})` }}
                ></div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <h3 className="text-2xl sm:text-3xl font-bold text-[#203f78] mb-4 sm:mb-6">What We Do</h3>
              <p className="text-gray-600 mb-4 sm:mb-6 leading-relaxed">
                We specialize in Industrial Automation and digitalization. Technoviz strongly believes in Industry 4.0 and has invested in building expertise and capability to help clients achieve their goals promptly and cost-effectively.
              </p>
              <p className="text-gray-600 mb-4 sm:mb-6 leading-relaxed">
                Smart manufacturing solutions should be a carefully integrated package of technologies like Connectivity, Mobility, Cloud services, HMI Software, Analysis (AI & ML), and Cyber Security. Our intelligent manufacturing solutions provide sustainable and efficient operations.
              </p>
              <div className="bg-[#203f78]/10 p-4 rounded-lg border-l-4 border-[#203f78]">
                <p className="text-[#203f78] font-semibold">Industry 4.0 would not exist without IIoT</p>
              </div>
            </div>
          </div>

          {/* Services Grid */}
          <div className="mt-12 sm:mt-20">
            <h3 className="text-2xl sm:text-3xl font-bold text-[#203f78] text-center mb-8 sm:mb-12">Our Core Services</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {services.map((service, index) => (
                <div key={index} className="bg-white p-4 sm:p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-[#203f78]/20">
                  <div className="text-[#ddaf26] mb-3 sm:mb-4">
                    {service.icon}
                  </div>
                  <h4 className="text-lg sm:text-xl font-semibold text-[#203f78] mb-2 sm:mb-3">{service.title}</h4>
                  <p className="text-gray-600 text-sm sm:text-base">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Company Brochure Section */}
      <section id="company-brochure" className="py-12 sm:py-16 lg:py-20 bg-gradient-to-r from-[#203f78]/5 to-[#203f78]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-4xl font-bold text-[#203f78] mb-4">Company Brochure</h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
              Discover our comprehensive company profile and capabilities
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            <div className="relative">
              <div className="bg-gradient-to-r from-[#203f78]/10 to-[#203f78]/20 rounded-2xl p-4 sm:p-8">
                <img 
                  src={our} 
                  alt="Company Brochure" 
                  className="w-full h-48 sm:h-64 object-cover rounded-lg shadow-lg"
                />
              </div>
            </div>
            <div>
              <div className="flex items-center mb-4 sm:mb-6">
                <div className="w-10 sm:w-12 h-10 sm:h-12 bg-gradient-to-r from-[#203f78] to-[#1a3566] rounded-full flex items-center justify-center mr-3 sm:mr-4">
                  <FileText className="w-5 sm:w-6 h-5 sm:h-6 text-white" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">Complete Company Overview</h3>
              </div>
              <p className="text-gray-600 mb-4 sm:mb-6 leading-relaxed">
                Get detailed insights into Technoviz Automation Solutions, our vision, mission, and comprehensive service offerings. Learn about our expertise in Industry 4.0 technologies and successful project implementations.
              </p>
              <div className="space-y-3 mb-6 sm:mb-8">
                <div className="flex items-center text-gray-600">
                  <div className="w-2 h-2 bg-[#203f78] rounded-full mr-3"></div>
                  <span>Company Overview & Vision</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <div className="w-2 h-2 bg-[#203f78] rounded-full mr-3"></div>
                  <span>Industry 4.0 Solutions</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <div className="w-2 h-2 bg-[#203f78] rounded-full mr-3"></div>
                  <span>Case Studies & Success Stories</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <div className="w-2 h-2 bg-[#203f78] rounded-full mr-3"></div>
                  <span>Team & Expertise</span>
                </div>
              </div>
              <button 
                onClick={() => window.open(tech, '_blank')}
                className="bg-[#203f78] text-white py-3 sm:py-4 px-6 sm:px-8 rounded-lg font-semibold hover:bg-[#ddaf26] shadow-lg transition-all duration-300 flex items-center"
              >
                <Download className="w-4 sm:w-5 h-4 sm:h-5 mr-2" />
                Download Company Brochure
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section - Updated with 6 compact cards */}
      <section id="products" className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-4xl font-bold text-[#203f78] mb-4">Product Brochures</h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
              Explore our comprehensive product catalog and technical specifications
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div key={product.id} className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden group">
                {/* Header with Icon */}
                <div className={`bg-[#203f78] p-4`}>
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                      {product.icon}
                    </div>
                    <Package className="w-5 h-5 text-white/70" />
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-4 sm:p-5">
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2 group-hover:text-[#203f78] transition-colors">
                    {product.title}
                  </h3>
                  <p className="text-gray-600 mb-3 sm:mb-4 text-sm leading-relaxed">
                    {product.description}
                  </p>
                  
                  {/* Features */}
                  <div className="space-y-2 mb-4 sm:mb-5">
                    {product.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center text-gray-600 text-xs">
                        <div className="w-1.5 h-1.5 bg-[#203f78] rounded-full mr-2 flex-shrink-0"></div>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  {/* Download Button */}
                  <button 
                    onClick={() => window.open(product.pd, '_blank')}
                    className="w-full bg-[#203f78] hover:bg-[#ddaf26] text-white hover:text-white py-2 px-4 sm:py-2.5 sm:px-4 rounded-lg font-medium transition-all duration-300 flex items-center justify-center text-sm group"
                  >
                    <Download className="w-3 sm:w-4 h-3 sm:h-4 mr-2" />
                    <span>Download Brochure</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section - Updated Hover Effects */}
      <section id="gallery" className="py-12 sm:py-16 lg:py-20 bg-gradient-to-r from-[#203f78]/5 to-[#203f78]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-4xl font-bold text-[#203f78] mb-4">Project Gallery</h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
              Explore our portfolio of successful implementations across various industries
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryImages.map((image, index) => (
              <div 
                key={image.id}
                className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer"
                onClick={() => openLightbox(image, index)}
              >
                <img 
                  src={image.url} 
                  alt={image.title}
                  className="w-full h-48 sm:h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Eye className="w-6 h-6 text-white drop-shadow-lg" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full">
            <button 
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
            >
              <X className="w-8 h-8" />
            </button>
            <button 
              onClick={() => navigateImage('prev')}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 z-10"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>
            <button 
              onClick={() => navigateImage('next')}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 z-10"
            >
              <ChevronRight className="w-8 h-8" />
            </button>
            <div className="text-center">
              <img 
                src={selectedImage.url} 
                alt={selectedImage.title}
                className="max-w-full max-h-[80vh] object-contain mx-auto rounded-lg"
              />
              <div className="mt-4 text-white">
                <span className="inline-block px-3 py-1 bg-[#203f78] rounded-full text-sm mb-2">
                  {selectedImage.category}
                </span>
                <h3 className="text-xl font-semibold">{selectedImage.title}</h3>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Company;