import { BookOpen, Star, Users, Award, CheckCircle, ShoppingCart, Sparkles, TrendingUp, Lock, Cog } from 'lucide-react';
import { useState, useEffect } from 'react';
import bookimg from "../public/bookC.webp";

const BookSection = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    setIsVisible(true);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const stats = [
    { icon: Star, value: "4.8/5", label: "Rating", color: "text-[#ddaf26]" },
    { icon: Users, value: "10K+", label: "Readers", color: "text-[#203f78]" },
    { icon: Award, value: "Bestseller", label: "Status", color: "text-[#ddaf26]" },
  ];

  const topics = [
    { icon: Sparkles, title: 'Digital Transformation', desc: 'Navigate the digital age' },
    { icon: Lock, title: 'Cyber Security', desc: 'Protect your digital assets' },
    { icon: Cog, title: 'Industrial Automation', desc: 'Future of manufacturing' },
    { icon: TrendingUp, title: 'Industry Evolution', desc: 'Stay ahead of trends' },
  ];

  return (
    <section className="relative min-h-screen py-24 bg-gradient-to-b from-white via-gray-50 to-white overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient Orbs */}
        <div 
          className="absolute w-96 h-96 bg-[#203f78] rounded-full blur-3xl opacity-10 -top-48 -left-48"
          style={{ transform: `translate(${scrollY * 0.1}px, ${scrollY * 0.15}px)` }}
        />
        <div 
          className="absolute w-96 h-96 bg-[#ddaf26] rounded-full blur-3xl opacity-10 -bottom-48 -right-48"
          style={{ transform: `translate(${-scrollY * 0.1}px, ${-scrollY * 0.15}px)` }}
        />

        {/* Animated Grid */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(#203f78 1px, transparent 1px), linear-gradient(90deg, #203f78 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
            transform: `perspective(500px) rotateX(60deg) translateY(-50%)`,
          }} />
        </div>

        {/* Floating Elements */}
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${8 + Math.random() * 4}s`,
            }}
          >
            <div 
              className="w-2 h-2 rounded-full"
              style={{
                background: i % 2 === 0 ? '#203f78' : '#ddaf26',
                opacity: 0.3,
                boxShadow: `0 0 20px ${i % 2 === 0 ? '#203f78' : '#ddaf26'}`,
              }}
            />
          </div>
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header Badge */}
        <div className={`flex justify-center mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
          {/* <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-[#203f78] to-[#2d4f88] text-white px-6 py-3 rounded-full shadow-2xl border border-[#ddaf26]/30">
            <BookOpen className="w-5 h-5 animate-pulse" />
            <span className="font-bold text-sm tracking-wider">FEATURED PUBLICATION</span>
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div> */}
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          
          {/* Left - Book Showcase */}
          <div className={`flex flex-col items-center space-y-8 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'}`}>
            <div className="relative group">
              {/* Animated Ring */}
              <div className="absolute inset-0 animate-spin-slow">
                <div className="w-full h-full rounded-full border-4 border-transparent border-t-[#203f78] border-r-[#ddaf26]" style={{ animationDuration: '10s' }} />
              </div>

              {/* Book Container */}
              <div className="relative w-80 h-[480px] mx-auto transform group-hover:scale-105 group-hover:rotate-2 transition-all duration-700">
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#203f78] via-[#ddaf26] to-[#203f78] rounded-2xl blur-2xl opacity-40 group-hover:opacity-60 transition-opacity duration-700 animate-pulse" />
                
                {/* Book Cover */}
                <div className="relative w-full h-full bg-gradient-to-br from-[#203f78] via-[#2d4f88] to-[#203f78] rounded-2xl shadow-2xl overflow-hidden border-2 border-[#ddaf26]/40 transform-gpu">
                  {/* Shimmer Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
                  
                  <div className="w-full h-full p-4 flex items-center justify-center">
                    <div className="relative w-full h-full bg-gradient-to-br from-[#1a3461] to-[#203f78] rounded-xl overflow-hidden group-hover:shadow-inner transition-shadow duration-500">
                      {/* Content would go here - using placeholder for image */}
                      <img src={bookimg} alt="" />
                    </div>
                  </div>

                  {/* Corner Accent */}
                  <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-[#ddaf26] rounded-tr-xl" />
                  <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-[#ddaf26] rounded-bl-xl" />
                </div>

                {/* Floating Badge */}
                <div className="absolute -top-4 -right-4 bg-[#ddaf26] text-white px-4 py-2 rounded-full shadow-xl transform rotate-12 group-hover:rotate-0 transition-transform duration-500">
                  <span className="font-bold text-sm">NEW</span>
                </div>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="flex flex-wrap justify-center gap-4 w-full">
              {stats.map((stat, i) => (
                <div
                  key={i}
                  className="group flex-1 min-w-[140px] bg-white/80 backdrop-blur-xl rounded-2xl p-4 border border-[#203f78]/10 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 cursor-pointer"
                  style={{ animationDelay: `${i * 0.2}s` }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <stat.icon className={`w-6 h-6 ${stat.color} group-hover:scale-125 transition-transform duration-300`} />
                    <div className="w-2 h-2 rounded-full bg-[#ddaf26] animate-pulse" />
                  </div>
                  <div className="text-2xl font-bold text-[#203f78] mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Content */}
          <div className={`space-y-8 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'}`}>
            
            {/* Title Section */}
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-4xl font-black text-[#203f78] leading-tight">
  <span className="bg-gradient-to-r from-[#203f78] to-[#2d4f88] bg-clip-text text-transparent ">
    Book “Digital Revolution”
  </span>
</h1>

              <div className="flex items-center space-x-3">
                <div className="h-1 w-20 bg-gradient-to-r from-[#ddaf26] to-transparent rounded-full" />
                <p className="text-xl font-semibold text-gray-700">Industry 4.0</p>
              </div>
              <p className="text-lg text-gray-600 leading-relaxed">
                by <span className="text-[#ddaf26] font-bold">Kapil Khurana</span>
                <span className="text-gray-400 mx-2">•</span>
                <span className="text-gray-500">TechnoViz Automation</span>
              </p>
            </div>

            {/* Description */}
            <p className="text-lg text-gray-700 leading-relaxed">
              Navigate the digital transformation reshaping our world. From workplace evolution to 
              global connectivity, discover strategies to harness innovation while addressing the 
              challenges of technological disruption.
            </p>

            {/* Topics Grid */}
            <div className="grid sm:grid-cols-2 gap-4">
              {topics.map((topic, i) => (
                <div
                  key={i}
                  className="group relative bg-gradient-to-br from-white to-gray-50 rounded-xl p-5 border border-[#203f78]/10 hover:border-[#ddaf26]/50 shadow-md hover:shadow-xl transition-all duration-500 cursor-pointer overflow-hidden"
                >
                  {/* Hover Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#203f78]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative flex items-start space-x-3">
                    <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-[#203f78] to-[#2d4f88] rounded-lg flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                      <topic.icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-[#203f78] mb-1 group-hover:text-[#ddaf26] transition-colors duration-300">
                        {topic.title}
                      </h4>
                      <p className="text-sm text-gray-600">{topic.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="pt-4">
              <a
                href="https://www.amazon.in/Digital-Revolution-Technology-Integration-Industrial/dp/B0D6YGJ1RR"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center space-x-3 bg-gradient-to-r from-[#203f78] to-[#2d4f88] text-white px-8 py-5 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-[#203f78]/50 transition-all duration-500 hover:scale-105 overflow-hidden"
              >
                {/* Animated Background */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#ddaf26] to-[#c49922] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
                
                <ShoppingCart className="w-6 h-6 relative z-10 group-hover:animate-bounce" />
                <span className="relative z-10">Get Your Copy Now</span>
                <div className="relative z-10 w-2 h-2 rounded-full bg-white animate-pulse" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Quote */}
        <div className={`max-w-5xl mx-auto transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="relative bg-gradient-to-br from-[#203f78]/5 to-transparent rounded-3xl p-12 border border-[#ddaf26]/20 shadow-xl overflow-hidden">
            {/* Quote Mark */}
            <div className="absolute top-8 left-8 text-8xl text-[#ddaf26]/20 font-serif">"</div>
            
            <blockquote className="relative text-xl lg:text-2xl text-gray-700 italic font-light leading-relaxed text-center">
              In the age of digital transformation, embracing innovation isn't just an option—it's a necessity. 
              Digital Revolution: Industry 4.0 empowers readers to navigate this landscape with confidence.
            </blockquote>
            
            <div className="mt-8 flex justify-center items-center space-x-3">
              <div className="h-1 w-12 bg-gradient-to-r from-transparent via-[#203f78] to-transparent rounded-full" />
              <Sparkles className="w-5 h-5 text-[#ddaf26]" />
              <div className="h-1 w-12 bg-gradient-to-r from-transparent via-[#203f78] to-transparent rounded-full" />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-shimmer {
          animation: shimmer 3s ease-in-out infinite;
        }
        
        .animate-spin-slow {
          animation: spin-slow 10s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default BookSection;