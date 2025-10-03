import React, { useState, useEffect } from 'react';
import { BookOpen, Lightbulb, GraduationCap, Brain, Zap, Users, Award, TrendingUp, CheckCircle, ArrowRight } from 'lucide-react';
import { Link } from "react-router-dom";
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
      className="absolute opacity-20 transition-all duration-300"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        transform: `translate(${offset.x}px, ${offset.y}px)`
      }}
    >
      <Icon size={48} className="text-white" />
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

        <div className="container mx-auto px-6 py-20 lg:py-30 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-white space-y-6">
              <div className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium mb-4">
                Knowledge Hub
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                Empowering Your <span className="text-blue-300">Digital Journey</span>
              </h1>
              <p className="text-xl text-blue-100 leading-relaxed">
                Unlock the future of technology with comprehensive resources, expert insights, and cutting-edge learning solutions designed for Industry 4.0 and beyond.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                
                <Link
                  to="/contact" className="px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-all">
                  Contact Us
                </Link>
              </div>
            </div>

            {/* Right Animation */}
            <div className="relative h-96 lg:h-[500px]">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-80 h-80">
                  {/* Central Book */}
                  <div className="absolute inset-0 flex items-center justify-center animate-pulse">
                    <div className="bg-white/20 backdrop-blur-md p-8 rounded-2xl shadow-2xl">
                      <BookOpen size={100} className="text-white" />
                    </div>
                  </div>
                  
                  {/* Orbiting Icons */}
                  {[Brain, Lightbulb, GraduationCap, Zap].map((Icon, i) => (
                    <div
                      key={i}
                      className="absolute w-16 h-16 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center shadow-xl"
                      style={{
                        animation: `orbit ${8 + i}s linear infinite`,
                        animationDelay: `${i * 2}s`,
                        top: '50%',
                        left: '50%',
                        transformOrigin: '0 0'
                      }}
                    >
                      <Icon size={32} className="text-white" />
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
              transform: translate(-50%, -50%) rotate(0deg) translateX(150px) rotate(0deg);
            }
            to {
              transform: translate(-50%, -50%) rotate(360deg) translateX(150px) rotate(-360deg);
            }
          }
        `}</style>
      </section>

      {/* Book Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Book Image */}
            <div className="relative">
              <div className="bg-gradient-to-br from-[#203f78] to-blue-900 rounded-2xl p-12 shadow-2xl transform hover:scale-105 transition-all duration-500">
                <div className="bg-white rounded-lg p-8 shadow-xl">
                  <BookOpen size={200} className="text-[#203f78] mx-auto" />
                  <div className="mt-6 text-center">
                    <div className="text-2xl font-bold text-[#203f78]">Industry 4.0</div>
                    <div className="text-gray-600 mt-2">Digital Transformation Guide</div>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 bg-yellow-400 rounded-full p-6 shadow-xl">
                <Award size={48} className="text-white" />
              </div>
            </div>

            {/* Book Content */}
            <div className="space-y-6">
              <div className="inline-block px-4 py-2 bg-[#203f78]/10 text-[#203f78] rounded-full text-sm font-semibold">
                Featured Book
              </div>
              <h2 className="text-4xl font-bold text-[#203f78]">{knowledgeData[0].title}</h2>
              <p className="text-xl text-gray-600">{knowledgeData[0].subtitle}</p>
              <p className="text-lg text-gray-700 leading-relaxed">{knowledgeData[0].about}</p>

              <div className="bg-gray-50 rounded-xl p-6 space-y-3">
                <h3 className="font-bold text-lg text-gray-900">What You'll Learn:</h3>
                {knowledgeData[0].learnings.map((learning, idx) => (
                  <div key={idx} className="flex items-center space-x-3">
                    <CheckCircle size={20} className="text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{learning}</span>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="bg-white rounded-lg p-4 shadow-md border border-gray-200">
                  <div className="text-[#203f78] font-bold text-2xl">{knowledgeData[0].details.pages}</div>
                  <div className="text-gray-600 text-sm">Pages</div>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-md border border-gray-200">
                  <div className="text-[#203f78] font-bold text-lg">{knowledgeData[0].details.format}</div>
                  <div className="text-gray-600 text-sm">Format</div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 mt-6">
                <button className="px-8 py-4 bg-[#203f78] text-white font-semibold rounded-lg hover:bg-[#1a3560] transition-all shadow-lg flex items-center space-x-2">
                  <a href="https://www.amazon.in/Digital-Revolution-Technology-Integration-Industrial/dp/B0D6YGJ1RR">
                 <span>Get the Book</span> </a>
                  <ArrowRight size={20} />
                </button>
                <Link
                  to="/book" className="px-8 py-4 bg-white text-[#203f78] font-semibold rounded-lg hover:bg-gray-50 transition-all shadow-lg border-2 border-[#203f78] flex items-center space-x-2">
                  <span>Explore Digital Revolution</span>
                  <ArrowRight size={20} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CoE Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-[#203f78]/10 text-[#203f78] rounded-full text-sm font-semibold mb-4">
              Center of Excellence
            </div>
            <h2 className="text-4xl font-bold text-[#203f78] mb-4">{knowledgeData[1].title}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">{knowledgeData[1].subtitle}</p>
          </div>

          {/* CoE Visual */}
          <div className="mb-16 relative">
            <div className="bg-gradient-to-r from-[#203f78] to-blue-900 rounded-2xl p-12 text-center shadow-2xl">
              <div className="flex justify-center space-x-8 mb-8">
                <div className="bg-white/20 backdrop-blur-md p-6 rounded-xl transform hover:scale-110 transition-all">
                  <Users size={64} className="text-white mx-auto" />
                </div>
                <div className="bg-white/20 backdrop-blur-md p-6 rounded-xl transform hover:scale-110 transition-all">
                  <Lightbulb size={64} className="text-white mx-auto" />
                </div>
                <div className="bg-white/20 backdrop-blur-md p-6 rounded-xl transform hover:scale-110 transition-all">
                  <TrendingUp size={64} className="text-white mx-auto" />
                </div>
              </div>
              <p className="text-white text-lg max-w-3xl mx-auto leading-relaxed">{knowledgeData[1].about}</p>
            </div>
          </div>

          {/* Benefits Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {knowledgeData[1].benefits.map((benefit, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 border border-gray-100"
              >
                <div className="w-12 h-12 bg-[#203f78] rounded-lg flex items-center justify-center mb-4">
                  <CheckCircle size={24} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{benefit.name}</h3>
                <p className="text-gray-600 leading-relaxed">{benefit.desc}</p>
              </div>
            ))}
          </div>

          {/* Explore CoE Button */}
          <div className="text-center">
            <Link
  to="/coe" className="px-8 py-4 bg-[#203f78] text-white font-semibold rounded-lg hover:bg-[#1a3560] transition-all shadow-lg inline-flex items-center space-x-2">
              <span>Explore CoE</span>
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* SLM Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            {/* SLM Content */}
            <div className="space-y-6">
              <div className="inline-block px-4 py-2 bg-[#203f78]/10 text-[#203f78] rounded-full text-sm font-semibold">
                Smart Learning
              </div>
              <h2 className="text-4xl font-bold text-[#203f78]">{knowledgeData[2].title}</h2>
              <p className="text-xl text-gray-600">{knowledgeData[2].subtitle}</p>
              <p className="text-lg text-gray-700 leading-relaxed">{knowledgeData[2].about}</p>
              <button className="px-8 py-4 bg-[#203f78] text-white font-semibold rounded-lg hover:bg-[#1a3560] transition-all shadow-lg flex items-center space-x-2">
                <span>Start Learning</span>
                <ArrowRight size={20} />
              </button>
            </div>

            {/* SLM Visual */}
            <div className="relative">
              <div className="bg-gradient-to-br from-[#203f78] to-blue-900 rounded-2xl p-12 shadow-2xl">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/20 backdrop-blur-md rounded-lg p-6 text-center transform hover:scale-105 transition-all">
                    <Brain size={48} className="text-white mx-auto mb-2" />
                    <div className="text-white font-semibold">AI-Powered</div>
                  </div>
                  <div className="bg-white/20 backdrop-blur-md rounded-lg p-6 text-center transform hover:scale-105 transition-all">
                    <Zap size={48} className="text-white mx-auto mb-2" />
                    <div className="text-white font-semibold">Interactive</div>
                  </div>
                  <div className="bg-white/20 backdrop-blur-md rounded-lg p-6 text-center transform hover:scale-105 transition-all">
                    <GraduationCap size={48} className="text-white mx-auto mb-2" />
                    <div className="text-white font-semibold">Certified</div>
                  </div>
                  <div className="bg-white/20 backdrop-blur-md rounded-lg p-6 text-center transform hover:scale-105 transition-all">
                    <TrendingUp size={48} className="text-white mx-auto mb-2" />
                    <div className="text-white font-semibold">Analytics</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {knowledgeData[2].features.map((feature, idx) => (
              <div
                key={idx}
                className="bg-gradient-to-br from-white to-blue-50 rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 border-2 border-gray-100 hover:border-[#203f78]"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-[#203f78] to-blue-600 rounded-lg flex items-center justify-center mb-4">
                  <Zap size={24} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.name}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20" style={{ backgroundColor: '#203f78' }}>
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Transform Your Learning Journey?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of professionals and students already advancing their careers with our knowledge resources.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
                  to="/contact" className="px-8 py-4 bg-white text-[#203f78] font-semibold rounded-lg hover:bg-blue-50 transition-all shadow-lg">
              Get Started Today
            </Link>
           
          </div>
        </div>
      </section>
    </div>
  );
};

export default KnowledgePage;