import React, { useState, useEffect } from 'react';
import { BookOpen, Lightbulb, GraduationCap, Brain, Zap, Users, Award, TrendingUp, CheckCircle, ArrowRight } from 'lucide-react';
import { Link } from "react-router-dom";
import book122 from "../public/book122.jpg";

const knowledgeData = [
  {
    id: "book",
    title: "Guide to Succeed with Technology Integration",
    subtitle: "Navigate the Digital Revolution and master Industry 4.0 & Industrial IoT with expert insights and practical strategies.",
    author: "Kapil Khurana",
    type: "Book",
    about: "Discover the transformative power of technology integration in today's rapidly evolving digital landscape. This comprehensive guide provides practical insights into Industry 4.0, Industrial IoT, and the strategies needed to thrive in the digital revolution.",
    learnings: [
      "Digital transformation strategies",
      "Industry 4.0 implementation",
      "Industrial IoT solutions",
      "Technology integration best practices",
    ],
    details: {
      pages: 320,
      format: "Hardcover, eBook",
      language: "English",
      publisher: "Tech Publications",
    },
  },
  {
    id: "coe",
    title: "Center of Excellence (CoE)",
    subtitle: "Advancing industrial automation through cutting-edge technologies and innovative processes.",
    type: "CoE",
    about: "At Technoviz Automation, our Center of Excellence (CoE) drives innovation in industrial automation. It serves as a hub where technology, creativity, and expertise converge to create solutions that enhance efficiency, productivity, and industry readiness.",
    benefits: [
      { name: "Hands-On Experience", desc: "Practical training and hands-on exposure in digital technologies and cybersecurity to boost employability." },
      { name: "Collaboration Opportunities", desc: "Partnerships between academia and industry through research projects, internships, and real-world projects." },
      { name: "Industry-Relevant Curriculum", desc: "Modern modules integrated into academics, ensuring students gain in-demand skills for the digital era." },
      { name: "Enhanced Employability", desc: "Graduates become highly sought after by employers due to their advanced skills and practical expertise." },
      { name: "Economic Growth", desc: "Developing a skilled workforce that accelerates digital transformation and boosts global competitiveness." },
      { name: "Professional Growth", desc: "Workshops, seminars, and training sessions for holistic personal and career development." },
    ],
  },
  {
    id: "slm",
    title: "Smart Learning Module (SLM)",
    subtitle: "Empowering learners with interactive, AI-driven, and self-paced digital learning solutions.",
    type: "SLM",
    about: "The Smart Learning Module (SLM) is an innovative e-learning ecosystem designed to bridge the gap between theory and practical knowledge. With AI-driven personalization, gamified experiences, and hands-on simulations, learners gain both competence and confidence to succeed in Industry 4.0 environments.",
    features: [
      { name: "AI-Powered Personalization", desc: "Adaptive learning paths tailored to individual student strengths and areas of improvement." },
      { name: "Gamified Learning", desc: "Interactive modules, quizzes, and challenges that keep students engaged and motivated." },
      { name: "Practical Simulations", desc: "Real-world scenarios and virtual labs to build problem-solving and technical expertise." },
      { name: "Anytime, Anywhere Learning", desc: "Self-paced access through web and mobile platforms for flexibility and convenience." },
      { name: "Analytics Dashboard", desc: "Progress tracking and performance insights for both learners and educators." },
    ],
  },
];

const FloatingIcon = ({ Icon, delay, x, y }) => {
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const animate = () => {
      const time = Date.now() / 1000 + delay;
      setOffset({
        x: Math.sin(time * 0.5) * 20,
        y: Math.cos(time * 0.7) * 20
      });
    };
    const interval = setInterval(animate, 50);
    return () => clearInterval(interval);
  }, [delay]);

  return (
    <div
      className="absolute opacity-20 transition-all duration-300 hidden md:block"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        transform: `translate(${offset.x}px, ${offset.y}px)`
      }}
    >
      <Icon size={32} className="text-white" />
    </div>
  );
};

const KnowledgePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden" style={{ backgroundColor: '#203f78' }}>
        <div className="absolute inset-0 overflow-hidden">
          <FloatingIcon Icon={BookOpen} delay={0} x={10} y={20} />
          <FloatingIcon Icon={Brain} delay={1} x={85} y={15} />
          <FloatingIcon Icon={Lightbulb} delay={2} x={15} y={70} />
          <FloatingIcon Icon={GraduationCap} delay={3} x={80} y={65} />
          <FloatingIcon Icon={Zap} delay={1.5} x={50} y={40} />
        </div>

        <div className="container mx-auto px-4 sm:px-6 pt-20 sm:pt-24 lg:pt-28 pb-12 sm:pb-16 lg:pb-20 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left Content */}
            <div className="text-white space-y-4 sm:space-y-6">
              <div className="inline-block px-3 py-1 sm:px-4 sm:py-2 bg-white/10 backdrop-blur-sm rounded-full text-xs sm:text-sm font-medium mb-2 sm:mb-4">
                Knowledge Hub
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
                Empowering Your <span className="text-blue-300">Digital Journey</span>
              </h1>
              <p className="text-base sm:text-lg lg:text-xl text-blue-100 leading-relaxed">
                Unlock the future of technology with comprehensive resources, expert insights, and cutting-edge learning solutions designed for Industry 4.0 and beyond.
              </p>
              <div className="flex flex-wrap gap-3 sm:gap-4 pt-3 sm:pt-4">
                <Link
                  to="/contact"
                  className="px-6 sm:px-8 py-3 sm:py-4 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-all text-sm sm:text-base"
                >
                  Contact Us
                </Link>
              </div>
            </div>

            {/* Right Animation */}
            <div className="relative h-64 sm:h-80 lg:h-[400px] flex justify-center">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-64 sm:w-72 lg:w-80 h-64 sm:h-72 lg:h-80">
                  {/* Central Book */}
                  <div className="absolute inset-0 flex items-center justify-center animate-pulse">
                    <div className="bg-white/20 backdrop-blur-md p-6 sm:p-8 rounded-2xl shadow-2xl">
                      <BookOpen size={64} className="text-white sm:w-20 sm:h-20 lg:w-24 lg:h-24" />
                    </div>
                  </div>
                  
                  {/* Orbiting Icons */}
                  {[Brain, Lightbulb, GraduationCap, Zap].map((Icon, i) => (
                    <div
                      key={i}
                      className="absolute w-12 sm:w-14 lg:w-16 h-12 sm:h-14 lg:h-16 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center shadow-xl"
                      style={{
                        animation: `orbit ${8 + i}s linear infinite`,
                        animationDelay: `${i * 2}s`,
                        top: '50%',
                        left: '50%',
                        transformOrigin: '0 0'
                      }}
                    >
                      <Icon size={24} className="text-white sm:w-8 sm:h-8 lg:w-10 lg:h-10" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <style>{`
          @keyframes orbit {
            from {
              transform: translate(-50%, -50%) rotate(0deg) translateX(120px) rotate(0deg);
            }
            to {
              transform: translate(-50%, -50%) rotate(360deg) translateX(120px) rotate(-360deg);
            }
          }
          @media (max-width: 640px) {
            @keyframes orbit {
              from {
                transform: translate(-50%, -50%) rotate(0deg) translateX(100px) rotate(0deg);
              }
              to {
                transform: translate(-50%, -50%) rotate(360deg) translateX(100px) rotate(-360deg);
              }
            }
          }
        `}</style>
      </section>

      {/* Book Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Book Image */}
            <div className="relative">
              <div className="bg-gradient-to-br from-[#203f78] to-blue-900 rounded-2xl p-2 shadow-2xl transform hover:scale-105 transition-all duration-500">
                <div className="rounded-lg shadow-xl">
                  <img className="rounded-2xl w-full h-auto object-cover" src={book122} alt="Book cover" />
                </div>
              </div>
              <div className="absolute -bottom-2 -right-2 sm:-bottom-4 sm:-right-4 bg-[#ddaf26] rounded-full p-4 sm:p-6 shadow-xl">
                <Award size={32} className="text-white sm:w-12 sm:h-12" />
              </div>
            </div>

            {/* Book Content */}
            <div className="space-y-4 sm:space-y-6">
              <div className="inline-block px-3 py-1 sm:px-4 sm:py-2 bg-[#203f78]/10 text-[#203f78] rounded-full text-xs sm:text-sm font-semibold">
                Featured Book
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#203f78]">{knowledgeData[0].title}</h2>
              <p className="text-base sm:text-lg lg:text-xl text-gray-600">{knowledgeData[0].subtitle}</p>
              <p className="text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed">{knowledgeData[0].about}</p>

              <div className="bg-gray-50 rounded-xl p-4 sm:p-6 space-y-3">
                <h3 className="font-bold text-base sm:text-lg text-gray-900">What You'll Learn:</h3>
                {knowledgeData[0].learnings.map((learning, idx) => (
                  <div key={idx} className="flex items-center space-x-3">
                    <CheckCircle size={16} className="text-[#203f78] flex-shrink-0 sm:w-5 sm:h-5" />
                    <span className="text-gray-700 text-sm sm:text-base">{learning}</span>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-3 sm:gap-4 pt-3 sm:pt-4">
                <div className="bg-white rounded-lg p-3 sm:p-4 shadow-md border border-gray-200">
                  <div className="text-[#203f78] font-bold text-lg sm:text-2xl">{knowledgeData[0].details.pages}</div>
                  <div className="text-gray-600 text-xs sm:text-sm">Pages</div>
                </div>
                <div className="bg-white rounded-lg p-3 sm:p-4 shadow-md border border-gray-200">
                  <div className="text-[#203f78] font-bold text-base sm:text-lg">{knowledgeData[0].details.format}</div>
                  <div className="text-gray-600 text-xs sm:text-sm">Format</div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 sm:gap-4 mt-4 sm:mt-6">
                <button className="px-6 sm:px-8 py-3 sm:py-4 bg-[#203f78] text-white font-semibold rounded-lg hover:bg-[#1a3560] transition-all shadow-lg flex items-center space-x-2 text-sm sm:text-base">
                  <a href="https://www.amazon.in/Digital-Revolution-Technology-Integration-Industrial/dp/B0D6YGJ1RR">
                    <span>Get the Book</span>
                  </a>
                  <ArrowRight size={16} className="sm:w-5 sm:h-5" />
                </button>
                <Link
                  to="/book"
                  className="px-6 sm:px-8 py-3 sm:py-4 bg-white text-[#203f78] font-semibold rounded-lg hover:bg-gray-50 transition-all shadow-lg border-2 border-[#203f78] flex items-center space-x-2 text-sm sm:text-base"
                >
                  <span>Explore Digital Revolution</span>
                  <ArrowRight size={16} className="sm:w-5 sm:h-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CoE Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <div className="inline-block px-3 py-1 sm:px-4 sm:py-2 bg-[#203f78]/10 text-[#203f78] rounded-full text-xs sm:text-sm font-semibold mb-2 sm:mb-4">
              Center of Excellence
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#203f78] mb-2 sm:mb-4">{knowledgeData[1].title}</h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto">{knowledgeData[1].subtitle}</p>
          </div>

          {/* CoE Visual */}
          <div className="mb-8 sm:mb-12 lg:mb-16 relative">
            <div className="bg-gradient-to-r from-[#203f78] to-blue-900 rounded-2xl p-8 sm:p-10 lg:p-12 text-center shadow-2xl">
              <div className="flex flex-wrap justify-center gap-4 sm:gap-6 lg:gap-8 mb-6 sm:mb-8">
                <div className="bg-white/20 backdrop-blur-md p-4 sm:p-6 rounded-xl transform hover:scale-110 transition-all">
                  <Users size={40} className="text-white mx-auto sm:w-12 sm:h-12 lg:w-16 lg:h-16" />
                </div>
                <div className="bg-white/20 backdrop-blur-md p-4 sm:p-6 rounded-xl transform hover:scale-110 transition-all">
                  <Lightbulb size={40} className="text-white mx-auto sm:w-12 sm:h-12 lg:w-16 lg:h-16" />
                </div>
                <div className="bg-white/20 backdrop-blur-md p-4 sm:p-6 rounded-xl transform hover:scale-110 transition-all">
                  <TrendingUp size={40} className="text-white mx-auto sm:w-12 sm:h-12 lg:w-16 lg:h-16" />
                </div>
              </div>
              <p className="text-white text-sm sm:text-base lg:text-lg max-w-3xl mx-auto leading-relaxed">{knowledgeData[1].about}</p>
            </div>
          </div>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
            {knowledgeData[1].benefits.map((benefit, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl p-4 sm:p-6 shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 border border-gray-100"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#203f78] rounded-lg flex items-center justify-center mb-3 sm:mb-4">
                  <CheckCircle size={20} className="text-white sm:w-6 sm:h-6" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">{benefit.name}</h3>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">{benefit.desc}</p>
              </div>
            ))}
          </div>

          {/* Explore CoE Button */}
          <div className="text-center">
            <Link
              to="/coe"
              className="px-6 sm:px-8 py-3 sm:py-4 bg-[#203f78] text-white font-semibold rounded-lg hover:bg-[#1a3560] transition-all shadow-lg inline-flex items-center space-x-2 text-sm sm:text-base"
            >
              <span>Explore CoE</span>
              <ArrowRight size={16} className="sm:w-5 sm:h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* SLM Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-8 sm:mb-12 lg:mb-16">
            {/* SLM Content */}
            <div className="space-y-4 sm:space-y-6">
              <div className="inline-block px-3 py-1 sm:px-4 sm:py-2 bg-[#203f78]/10 text-[#203f78] rounded-full text-xs sm:text-sm font-semibold">
                Smart Learning
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#203f78]">{knowledgeData[2].title}</h2>
              <p className="text-base sm:text-lg lg:text-xl text-gray-600">{knowledgeData[2].subtitle}</p>
              <p className="text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed">{knowledgeData[2].about}</p>
              <button className="px-6 sm:px-8 py-3 sm:py-4 bg-[#203f78] text-white font-semibold rounded-lg hover:bg-[#1a3560] transition-all shadow-lg flex items-center space-x-2 text-sm sm:text-base">
                <span>Explore Learning</span>
                <ArrowRight size={16} className="sm:w-5 sm:h-5" />
              </button>
            </div>

            {/* SLM Visual */}
            <div className="relative">
              <div className="bg-gradient-to-br from-[#203f78] to-blue-900 rounded-2xl p-8 sm:p-10 lg:p-12 shadow-2xl">
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  <div className="bg-white/20 backdrop-blur-md rounded-lg p-4 sm:p-6 text-center transform hover:scale-105 transition-all">
                    <Brain size={32} className="text-white mx-auto mb-1 sm:mb-2 sm:w-12 sm:h-12" />
                    <div className="text-white font-semibold text-sm sm:text-base">AI-Powered</div>
                  </div>
                  <div className="bg-white/20 backdrop-blur-md rounded-lg p-4 sm:p-6 text-center transform hover:scale-105 transition-all">
                    <Zap size={32} className="text-white mx-auto mb-1 sm:mb-2 sm:w-12 sm:h-12" />
                    <div className="text-white font-semibold text-sm sm:text-base">Interactive</div>
                  </div>
                  <div className="bg-white/20 backdrop-blur-md rounded-lg p-4 sm:p-6 text-center transform hover:scale-105 transition-all">
                    <GraduationCap size={32} className="text-white mx-auto mb-1 sm:mb-2 sm:w-12 sm:h-12" />
                    <div className="text-white font-semibold text-sm sm:text-base">Certified</div>
                  </div>
                  <div className="bg-white/20 backdrop-blur-md rounded-lg p-4 sm:p-6 text-center transform hover:scale-105 transition-all">
                    <TrendingUp size={32} className="text-white mx-auto mb-1 sm:mb-2 sm:w-12 sm:h-12" />
                    <div className="text-white font-semibold text-sm sm:text-base">Analytics</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {knowledgeData[2].features.map((feature, idx) => (
              <div
                key={idx}
                className="bg-gradient-to-br from-white to-blue-50 rounded-xl p-4 sm:p-6 shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 border-2 border-gray-100 hover:border-[#203f78]"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#203f78] to-blue-600 rounded-lg flex items-center justify-center mb-3 sm:mb-4">
                  <Zap size={20} className="text-white sm:w-6 sm:h-6" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">{feature.name}</h3>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 lg:py-20" style={{ backgroundColor: '#203f78' }}>
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 sm:mb-6">Ready to Transform Your Learning Journey?</h2>
          <p className="text-base sm:text-lg lg:text-xl text-blue-100 mb-6 sm:mb-8 max-w-2xl mx-auto">
            Join thousands of professionals and students already advancing their careers with our knowledge resources.
          </p>
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
            <Link
              to="/contact"
              className="px-6 sm:px-8 py-3 sm:py-4 bg-white text-[#203f78] font-semibold rounded-lg hover:bg-blue-50 transition-all shadow-lg text-sm sm:text-base"
            >
              Get Started Today
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default KnowledgePage;