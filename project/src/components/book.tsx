import { BookOpen, Star, Users, Award, CheckCircle ,ShoppingCart} from 'lucide-react';

import bookimg from "../public/bookC.webp"

const BookSection = () => {
  return (
    <section className="relative py-20 bg-white overflow-hidden">
      {/* 3D Background Animation */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Books Animation */}
        <div className="absolute inset-0">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-float"
              style={{
                left: `${20 + (i * 15)}%`,
                top: `${10 + (i * 12)}%`,
                animationDelay: `${i * 2}s`,
                animationDuration: `${8 + i}s`,
              }}
            >
              <div className="relative">
                <div 
                  className="w-8 h-12 bg-gradient-to-br from-[#203f78] to-[#2d4f88] rounded-sm shadow-lg transform rotate-12 opacity-20"
                  style={{
                    transform: `rotateX(${15 + i * 5}deg) rotateY(${20 + i * 10}deg) rotateZ(${10 + i * 8}deg)`,
                  }}
                />
                <div 
                  className="absolute top-0 left-0 w-8 h-12 bg-gradient-to-br from-[#ddaf26] to-[#c49922] rounded-sm shadow-lg opacity-10"
                  style={{
                    transform: `translateZ(4px) rotateX(${15 + i * 5}deg) rotateY(${20 + i * 10}deg)`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Geometric Background Pattern */}
        <div className="absolute inset-0">
          <svg className="w-full h-full opacity-5" viewBox="0 0 100 100">
            <defs>
              <pattern id="books" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <rect x="2" y="2" width="4" height="6" fill="#203f78" opacity="0.3"/>
                <rect x="7" y="3" width="4" height="6" fill="#ddaf26" opacity="0.2"/>
                <rect x="12" y="1" width="4" height="6" fill="#203f78" opacity="0.3"/>
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#books)"/>
          </svg>
        </div>

        {/* Floating Particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`,
              }}
            >
              <div 
                className="w-1 h-1 bg-[#ddaf26] rounded-full opacity-60"
                style={{
                  boxShadow: '0 0 6px #ddaf26',
                }}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Column - Book Cover & Stats */}
          <div className="flex flex-col items-center lg:items-start space-y-8">
            <div className="relative group">
              {/* Book Cover Container */}
              <div className="relative w-80 h-96 mx-auto transform group-hover:scale-105 transition-transform duration-500">
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#203f78] to-[#ddaf26] rounded-lg blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
                
                {/* Book Cover */}
                <div className="relative w-full h-full bg-gradient-to-br from-[#203f78] to-[#2d4f88] rounded-lg shadow-2xl overflow-hidden border border-[#ddaf26]/30 p-2">
                  <div className="w-full h-full bg-gradient-to-br from-[#203f78] to-[#2d4f88] rounded flex items-center justify-center">
                    <div className="text-center space-y-4 p-8">
                      <img
                  src={bookimg}
                  
                  
                 
                />
                      
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Book Stats */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-6 text-center">
              <div className="flex items-center space-x-2 bg-[#203f78]/10 backdrop-blur-sm rounded-lg px-4 py-2 border border-[#ddaf26]/20">
                <Star className="w-5 h-5 text-[#ddaf26]" />
                <span className="text-[#203f78] font-semibold">4.8/5</span>
              </div>
              <div className="flex items-center space-x-2 bg-[#203f78]/10 backdrop-blur-sm rounded-lg px-4 py-2 border border-[#ddaf26]/20">
                <Users className="w-5 h-5 text-[#203f78]" />
                <span className="text-[#203f78] font-semibold">10K+ Readers</span>
              </div>
              <div className="flex items-center space-x-2 bg-[#203f78]/10 backdrop-blur-sm rounded-lg px-4 py-2 border border-[#ddaf26]/20">
                <Award className="w-5 h-5 text-[#ddaf26]" />
                <span className="text-[#203f78] font-semibold">Bestseller</span>
              </div>
            </div>
          </div>
          
          {/* Right Column - Content */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-[#203f78] text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
              <BookOpen className="w-4 h-4" />
              <span>Read Book</span>
            </div>
            
            {/* Title & Author */}
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold text-[#203f78] mb-4 leading-tight">
                <span className="bg-[#203f78] bg-clip-text text-transparent">
                  Digital Revolution
                </span>
              </h2>
              <p className="text-xl text-[#203f78]/70 mb-2">Guide to Succeed with Technology Integration</p>
              <p className="text-lg text-gray-600">
                by <span className="text-[#ddaf26] font-semibold">Kapil Khurana</span>
              </p>
              <p className="text-sm text-gray-500 mt-1">TechnoViz Automation</p>
            </div>
            
            {/* Description */}
            <div className="space-y-4">
              <p className="text-gray-700 text-lg leading-relaxed">
                This is transforming every part of our lives from how we do our jobs to how we connect 
                with each other. While it creates opportunities for innovation and economic growth, it also 
                brings challenges like jobs being replaced and needing new skills.
              </p>
              
              <div className="bg-[#203f78]/5 backdrop-blur-sm rounded-lg p-6 border border-[#ddaf26]/20 shadow-lg">
                <h3 className="text-[#203f78] font-semibold mb-4 flex items-center">
                  <CheckCircle className="w-5 h-5 text-[#ddaf26] mr-2" />
                  What You'll Learn:
                </h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    'Digital Transformation',
                    'Cyber Security',
                    'Industrial Automation',
                    'Industry Evolution'
                  ].map((topic, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-[#203f78] rounded-full"></div>
                      <span className="text-gray-600">{topic}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
  <a
    href="https://www.amazon.in/Digital-Revolution-Technology-Integration-Industrial/dp/B0D6YGJ1RR"
    target="_blank"
    rel="noopener noreferrer"
    className="group relative bg-[#203f78] text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:bg-[#ddaf26] hover:scale-105"
  >
    <span className="flex items-center justify-center space-x-2">
      <ShoppingCart className="w-5 h-5 group-hover:animate-bounce" />
      <span>Get Your Copy</span>
    </span>
  </a>
</div>
          </div>
        </div>
        
        {/* Bottom Quote Section */}
        <div className="mt-16 text-center">
          <div className="max-w-4xl mx-auto">
            <blockquote className="text-xl lg:text-1xl text-gray-600 italic font-light leading-relaxed">
              "In the age of digital transformation, embracing innovation isn't just an option—it's a necessity. 
              Digital Revolution: Industry 4.0 empowers readers to navigate this landscape with confidence, 
              offering insights that transcend boundaries and inspire action."
            </blockquote>
            <div className="mt-6 flex justify-center">
              <div className="w-16 h-1 bg-[#203f78] rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotateX(0deg) rotateY(0deg);
          }
          50% {
            transform: translateY(-20px) rotateX(15deg) rotateY(10deg);
          }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default BookSection;