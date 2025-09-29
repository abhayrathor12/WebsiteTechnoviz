import { Calendar, Quote, TrendingUp, Award, ArrowRight, Star, Users, Target, Lightbulb } from 'lucide-react';
import { caseStudies } from '../data/mockData';
import { Link } from "react-router-dom";
import { Key, useEffect, useState } from 'react';
import { CaseStudy } from '../types';

const formatDate = (dateString: string | number | Date) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

// 3D Animation Component - Fixed for mobile centering
const ThreeDAnimation = () => {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(prev => (prev + 1) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      {/* Floating Documents - Adjusted for mobile */}
      <div className="absolute inset-0 flex items-center justify-center">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-2 md:p-4 shadow-xl"
            style={{
              width: window.innerWidth < 768 ? '80px' : '120px',
              height: window.innerWidth < 768 ? '100px' : '160px',
              transform: `
                rotateY(${rotation + i * 60}deg) 
                translateZ(${window.innerWidth < 768 ? '80px' : '120px'}px)
                translateY(${Math.sin(rotation * 0.01 + i * 2) * (window.innerWidth < 768 ? 15 : 30)}px)
              `,
              transformStyle: 'preserve-3d',
              left: `${50 + Math.cos(i * Math.PI / 3) * (window.innerWidth < 768 ? 20 : 30)}%`,
              top: `${50 + Math.sin(i * Math.PI / 3) * (window.innerWidth < 768 ? 20 : 30)}%`,
              animation: `float ${3 + i * 0.5}s ease-in-out infinite`,
              animationDelay: `${i * 0.2}s`
            }}
          >
            <div className="h-full flex flex-col justify-between">
              <div className="space-y-1 md:space-y-2">
                <div className="h-1 md:h-2 bg-gradient-to-r from-blue-300 to-indigo-300 rounded"></div>
                <div className="h-0.5 md:h-1 bg-white/40 rounded w-3/4"></div>
                <div className="h-0.5 md:h-1 bg-white/40 rounded w-1/2"></div>
              </div>
              <div className="space-y-0.5 md:space-y-1">
                <div className="flex justify-between items-center">
                  <Star className="w-2 h-2 md:w-3 md:h-3 text-yellow-300" />
                  <TrendingUp className="w-2 h-2 md:w-3 md:h-3 text-green-300" />
                </div>
                <div className="h-0.5 md:h-1 bg-gradient-to-r from-green-300 to-blue-300 rounded"></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Central Success Icon - Responsive sizing */}
      <div 
        className="relative z-10 w-16 h-16 md:w-24 md:h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-2xl"
        style={{
          transform: `rotateY(${rotation * 2}deg) rotateX(${Math.sin(rotation * 0.02) * 10}deg)`,
          animation: 'pulse 2s ease-in-out infinite'
        }}
      >
        <Award className="w-8 h-8 md:w-12 md:h-12 text-white" />
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotateY(0deg); }
          50% { transform: translateY(-20px) rotateY(180deg); }
        }
      `}</style>
    </div>
  );
};

const CaseStudiesComponent = () => {
  const [selectedCase, setSelectedCase] = useState<CaseStudy | null>(null);
  const [filter, setFilter] = useState<string>('all');
  const [hoveredCard, setHoveredCard] = useState<string | number | null>(null);

  const getIndustryFromTitle = (title: string) => {
    if (title.toLowerCase().includes('erp') || title.toLowerCase().includes('scada')) return 'automation';
    if (title.toLowerCase().includes('dairy') || title.toLowerCase().includes('refrigeration')) return 'food';
    if (title.toLowerCase().includes('wireless') || title.toLowerCase().includes('industry 4.0')) return 'industry4';
    return 'technology';
  };

  const filteredCases = filter === 'all' 
    ? caseStudies 
    : caseStudies.filter(cs => getIndustryFromTitle(cs.title) === filter);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #203f78 0%, #1a2b5c 50%, #0f1937 100%)' }}>
        <div className="absolute inset-0 bg-black/10"></div>
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white/5"
              style={{
                width: Math.random() * 100 + 50 + 'px',
                height: Math.random() * 100 + 50 + 'px',
                left: Math.random() * 100 + '%',
                top: Math.random() * 100 + '%',
                animation: `float ${Math.random() * 6 + 4}s ease-in-out infinite`,
                animationDelay: Math.random() * 2 + 's'
              }}
            />
          ))}
        </div>

        <div className="relative max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Left Side - Content */}
            <div className="space-y-6 md:space-y-8 text-center lg:text-left">
              <div className="space-y-4 md:space-y-6">
                <div className="flex items-center justify-center lg:justify-start space-x-3">
                  <div className="w-8 md:w-12 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"></div>
                  <span className="text-blue-200 font-medium tracking-wide uppercase text-xs md:text-sm">
                    Success Stories
                  </span>
                </div>
                
                <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight">
                  Transforming
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
                    Businesses
                  </span>
                  Through Innovation
                </h1>
                
                <p className="text-lg md:text-xl text-blue-100 leading-relaxed max-w-lg mx-auto lg:mx-0">
                  Discover how we've delivered exceptional results for our clients through cutting-edge automation solutions and digital transformation strategies.
                </p>
              </div>

              <Link
                to="/products" 
                className="bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 font-bold py-3 md:py-4 px-6 md:px-8 rounded-xl hover:from-yellow-300 hover:to-orange-400 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl inline-flex items-center group text-sm md:text-base"
              >
                Explore Our Work
                <ArrowRight className="ml-2 w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>

            {/* Right Side - 3D Animation - Fixed centering */}
            <div className="relative h-64 md:h-80 lg:h-96 xl:h-[500px] flex items-center justify-center" style={{ perspective: '1000px' }}>
              <ThreeDAnimation />
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
      </div>

      {/* Filter Section */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-16">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Featured Case Studies</h2>
          <p className="text-gray-600 max-w-2xl mx-auto px-4">
            Real projects, real results. See how we've helped businesses across various industries achieve their goals.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 md:gap-4 justify-center mb-12 md:mb-16 px-4">
          {['all', 'automation', 'food', 'industry4', 'technology'].map((filterOption) => (
            <button
              key={filterOption}
              onClick={() => setFilter(filterOption)}
              className={`px-3 md:px-6 py-2 md:py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 text-sm md:text-base ${
                filter === filterOption
                  ? 'text-white shadow-lg shadow-blue-500/25'
                  : 'bg-white/80 text-gray-700 hover:bg-white shadow-md hover:shadow-lg border border-gray-200'
              }`}
              style={{
                background: filter === filterOption ? 'linear-gradient(135deg, #203f78 0%, #1a2b5c 100%)' : undefined
              }}
            >
              {filterOption === 'all' ? 'All Projects' : 
               filterOption === 'automation' ? 'Automation' :
               filterOption === 'food' ? 'Food Industry' :
               filterOption === 'industry4' ? 'Industry 4.0' : 'Technology'}
            </button>
          ))}
        </div>

        {/* Case Studies Grid - Fixed text overflow */}
        <div className="space-y-12">
          {filteredCases.map((caseStudy, index) => (
            <div
              key={caseStudy.id}
              className={`group relative ${index % 2 === 0 ? '' : 'lg:flex-row-reverse'}`}
              onMouseEnter={() => setHoveredCard(caseStudy.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 items-center">
                {/* Content Side */}
                <div className={`lg:col-span-7 space-y-4 md:space-y-6 px-4 ${index % 2 === 0 ? 'lg:pr-8' : 'lg:pl-8 lg:order-2'}`}>
                  <div className="space-y-3 md:space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-2 sm:space-y-0">
                      <div 
                        className="px-3 md:px-4 py-1.5 md:py-2 rounded-full text-white text-xs md:text-sm font-medium inline-block w-fit"
                        style={{ background: 'linear-gradient(135deg, #203f78 0%, #1a2b5c 100%)' }}
                      >
                        Case Study {index + 1}
                      </div>
                      <div className="flex items-center text-gray-500 text-xs md:text-sm">
                        <Calendar className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
                        {formatDate(caseStudy.publish_date)}
                      </div>
                    </div>

                    <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#203f78] group-hover:text-blue-600 transition-colors duration-300 leading-tight">
                      {caseStudy.title}
                    </h3>

                    <div className="flex items-center text-base md:text-lg font-semibold" style={{ color: '#203f78' }}>
                      <Users className="w-4 h-4 md:w-5 md:h-5 mr-2 flex-shrink-0" />
                      <span className="truncate">{caseStudy.client_name}</span>
                    </div>
                  </div>

                  <div className="space-y-4 md:space-y-6">
                    <div>
                      <div className="flex items-center mb-2 md:mb-3">
                        <Target className="w-4 h-4 md:w-5 md:h-5 text-red-500 mr-2 flex-shrink-0" />
                        <h4 className="text-base md:text-lg font-semibold text-gray-800">Challenge</h4>
                      </div>
                      <p className="text-sm md:text-base text-gray-600 leading-relaxed pl-6 md:pl-7">
                        {caseStudy.challenge}
                      </p>
                    </div>

                    <div>
                      <div className="flex items-center mb-2 md:mb-3">
                        <Lightbulb className="w-4 h-4 md:w-5 md:h-5 text-yellow-500 mr-2 flex-shrink-0" />
                        <h4 className="text-base md:text-lg font-semibold text-gray-800">Solution</h4>
                      </div>
                      <p className="text-sm md:text-base text-gray-600 leading-relaxed pl-6 md:pl-7">
                        {caseStudy.solution}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Results Side - Fixed text overflow */}
                <div className={`lg:col-span-5 px-4 ${index % 2 === 0 ? '' : 'lg:order-1'}`}>
                  <div 
                    className={`bg-white/70 backdrop-blur-sm rounded-2xl p-4 md:p-6 lg:p-8 shadow-lg border transition-all duration-500 ${
                      hoveredCard === caseStudy.id ? 'shadow-2xl border-blue-200 transform -translate-y-2' : 'border-white/50'
                    }`}
                  >
                    <div className="flex items-center mb-4 md:mb-6">
                      <TrendingUp className="w-5 h-5 md:w-6 md:h-6 text-green-600 mr-2 md:mr-3 flex-shrink-0" />
                      <h4 className="text-lg md:text-xl font-bold text-gray-800">Key Results</h4>
                    </div>

                    {/* Fixed grid layout for mobile */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 mb-6 md:mb-8">
                      {caseStudy.results.map((result, idx) => (
                        <div 
                          key={idx} 
                          className="text-center p-3 md:p-4 rounded-xl border transition-all duration-300 hover:shadow-md min-h-[80px] flex flex-col justify-center"
                          style={{ 
                            background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
                            borderColor: '#203f78'
                          }}
                        >
                          <div className="text-lg md:text-xl lg:text-2xl font-bold mb-1 break-words" style={{ color: '#203f78' }}>
                            {result.value}
                          </div>
                          <div className="text-xs md:text-sm text-gray-600 font-medium leading-tight break-words">
                            {result.metric}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Testimonial */}
                    <div 
                      className="rounded-xl p-4 md:p-6 relative"
                      style={{ background: 'linear-gradient(135deg, #203f78 0%, #1a2b5c 100%)' }}
                    >
                      <Quote className="w-5 h-5 md:w-6 md:h-6 text-yellow-400 mb-2 md:mb-3 flex-shrink-0" />
                      <blockquote className="text-white italic mb-3 md:mb-4 text-sm md:text-base leading-relaxed">
                        "{caseStudy.testimonial.quote}"
                      </blockquote>
                      <div className="flex items-center">
                        <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold mr-2 md:mr-3 flex-shrink-0 text-sm md:text-base">
                          {caseStudy.testimonial.author.charAt(0)}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="font-semibold text-white text-sm md:text-base truncate">
                            {caseStudy.testimonial.author}
                          </div>
                          <div className="text-xs md:text-sm text-blue-200 truncate">
                            {caseStudy.testimonial.position}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section - Fixed button sizing */}
        <div 
          className="text-center rounded-2xl md:rounded-3xl p-6 md:p-8 lg:p-12 relative overflow-hidden mt-16 md:mt-20 mx-4"
          style={{ background: 'linear-gradient(135deg, #203f78 0%, #1a2b5c 50%, #0f1937 100%)' }}
        >
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative">
            <Award className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-yellow-400 mx-auto mb-4 md:mb-6" />
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-3 md:mb-4 px-4">
              Ready to Write Your Success Story?
            </h2>
            <p className="text-blue-100 text-sm md:text-base lg:text-lg mb-6 md:mb-8 max-w-2xl mx-auto px-4 leading-relaxed">
              Join our growing list of satisfied clients. Let's discuss how we can help you achieve transformational results for your business.
            </p>
            <Link
              to="/contact" 
              className="bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 font-bold py-3 md:py-4 px-6 md:px-8 rounded-xl hover:from-yellow-300 hover:to-orange-400 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl inline-block text-sm md:text-base"
            >
              Start Your Transformation Today
            </Link>
          </div>
        </div>
      </div>

      {/* Modal for detailed view - Mobile responsive */}
      {selectedCase && (
  <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
    <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
      <div className="p-4 md:p-6 lg:p-8">
        <div className="flex justify-between items-start mb-4 md:mb-6">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 pr-4 leading-tight">{selectedCase.title}</h2>
          <button
            onClick={() => setSelectedCase(null)}
            className="text-gray-400 hover:text-gray-600 text-2xl font-bold flex-shrink-0 w-8 h-8 flex items-center justify-center"
          >
            ×
          </button>
        </div>
        <div className="prose prose-sm md:prose-lg max-w-none">
          <p><strong>Client:</strong> {selectedCase.client_name}</p>
          <p><strong>Published:</strong> {formatDate(selectedCase.publish_date)}</p>
          <h3>Challenge</h3>
          <p>{selectedCase.challenge}</p>
          <h3>Solution</h3>
          <p>{selectedCase.solution}</p>
          <h3>Results</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 not-prose">
            {selectedCase.results.map((result: { value: string; metric: string }, idx: Key) => (
              <div key={idx} className="p-3 md:p-4 rounded-lg" style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)' }}>
                <div className="text-lg md:text-xl lg:text-2xl font-bold break-words" style={{ color: '#203f78' }}>{result.value}</div>
                <div className="text-gray-700 text-sm md:text-base break-words">{result.metric}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
)}
    </div>
  );
};

export default CaseStudiesComponent;