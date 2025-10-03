
import { Code, Database, Brain, Zap, Globe, BarChart3, ChevronRight, Check } from 'lucide-react';
import pyt from "../public/python.webp"
import jav from "../public/java.png"
import { Link } from "react-router-dom";
const PythonPage = () => {
  const features = [
    { icon: Globe, title: "Web Development", desc: "Build robust applications with Django and Flask" },
    { icon: BarChart3, title: "Data Science", desc: "Analyze complex data with Pandas and NumPy" },
    { icon: Brain, title: "AI & Machine Learning", desc: "Create intelligent systems with TensorFlow" },
    { icon: Zap, title: "Automation", desc: "Streamline workflows and boost productivity" },
    { icon: Code, title: "Software Development", desc: "Versatile applications from desktop to mobile" },
    { icon: Database, title: "Database Integration", desc: "Seamless MySQL and MongoDB integration" }
  ];

  const benefits = [
    { title: "Ease of Use", desc: "Straightforward syntax accessible for all developers" },
    { title: "Versatility", desc: "Supports multiple programming paradigms" },
    { title: "Rich Ecosystem", desc: "Comprehensive libraries and frameworks" },
    { title: "Community Support", desc: "Extensive documentation and tools" },
    { title: "Cross-Platform", desc: "Seamless operation across all major OS" },
    { title: "Database Integration", desc: "Efficient MySQL and MongoDB management" }
  ];

  const useCases = [
    "Web Development",
    "Data Science & Analytics",
    "Machine Learning & AI",
    "Automation",
    "Software Development",
    "Database Management"
  ];

  return (
    <div className="bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-[#203f78] via-[#2a5294] to-[#1a3361]">
        {/* Animated Background Grid */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
            animation: 'gridMove 20s linear infinite'
          }} />
        </div>

        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-white space-y-8 pt-20">
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-5xl font-bold leading-tight animate-fadeInUp">
                  Discover the Power of
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-500 animate-pulse">
                    Python
                  </span>
                </h1>
                <p className="text-xl lg:text-2xl text-blue-100 leading-relaxed animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
                  Leverage Python's versatility to deliver innovative and efficient solutions tailored to your business needs.
                </p>
              </div>
              
              <p className="text-lg text-blue-200 animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
                Whether you're building cutting-edge web applications, harnessing data analytics, or creating intelligent systems, Python has the tools to bring your vision to life.
              </p>

              <div className="flex flex-wrap gap-4 animate-fadeInUp" style={{ animationDelay: '0.6s' }}>
                <Link
                  to="/contact" className="px-8 py-4 bg-yellow-400 text-[#203f78] font-bold rounded-lg hover:bg-yellow-300 transition-all transform hover:scale-105 shadow-xl hover:shadow-2xl">
                  Get Started
                  <ChevronRight className="inline ml-2" size={20} />
                </Link>
                
              </div>
            </div>

            {/* Right Animation - 3D Rotating Python Code */}
            <div className="relative h-96 lg:h-[600px] flex items-center justify-center">
              {/* Floating Code Blocks */}
              <div className="relative w-full h-full flex items-center justify-center">
                {/* Center Python Logo */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg
                    viewBox="0 0 200 200"
                    className="w-48 h-48 lg:w-72 lg:h-72 animate-float"
                  >
                    <defs>
                      <linearGradient id="blueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style={{ stopColor: '#3776ab', stopOpacity: 1 }} />
                        <stop offset="100%" style={{ stopColor: '#5a9fd4', stopOpacity: 1 }} />
                      </linearGradient>
                      <linearGradient id="yellowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style={{ stopColor: '#ffd43b', stopOpacity: 1 }} />
                        <stop offset="100%" style={{ stopColor: '#ffe873', stopOpacity: 1 }} />
                      </linearGradient>
                    </defs>
                    
                    <path
                      d="M 99.5 20 C 70 20 50 35 50 60 L 50 85 L 100 85 L 100 90 L 50 90 C 30 90 20 100 20 120 L 20 140 C 20 160 30 170 50 170 L 70 170 L 70 145 C 70 125 80 115 100 115 L 150 115 C 165 115 175 105 175 90 L 175 60 C 175 40 160 20 140 20 L 99.5 20 Z"
                      fill="url(#blueGrad)"
                      className="animate-pulse"
                      style={{ animationDuration: '3s' }}
                    />
                    
                    <path
                      d="M 100.5 180 C 130 180 150 165 150 140 L 150 115 L 100 115 L 100 110 L 150 110 C 170 110 180 100 180 80 L 180 60 C 180 40 170 30 150 30 L 130 30 L 130 55 C 130 75 120 85 100 85 L 50 85 C 35 85 25 95 25 110 L 25 140 C 25 160 40 180 60 180 L 100.5 180 Z"
                      fill="url(#yellowGrad)"
                      className="animate-pulse"
                      style={{ animationDuration: '3s', animationDelay: '1.5s' }}
                    />
                    
                    <circle cx="70" cy="50" r="6" fill="white" className="animate-ping" style={{ animationDuration: '2s' }} />
                    <circle cx="130" cy="150" r="6" fill="#3776ab" className="animate-ping" style={{ animationDuration: '2s', animationDelay: '1s' }} />
                  </svg>
                </div>

                {/* Orbiting Code Snippets */}
                {[
                  { code: 'import pandas', angle: 0, delay: 0 },
                  { code: 'def main():', angle: 60, delay: 0.5 },
                  { code: 'class Model:', angle: 120, delay: 1 },
                  { code: 'async def run', angle: 180, delay: 1.5 },
                  { code: 'from flask', angle: 240, delay: 2 },
                  { code: 'if __name__', angle: 300, delay: 2.5 }
                ].map((item, i) => (
                  <div
                    key={i}
                    className="absolute px-4 py-2 bg-white/95 backdrop-blur-sm rounded-lg shadow-xl font-mono text-sm text-[#203f78] font-bold animate-orbit"
                    style={{
                      animationDelay: `${item.delay}s`,
                      top: '50%',
                      left: '50%',
                      transform: `rotate(${item.angle}deg) translateX(180px) rotate(-${item.angle}deg)`
                    }}
                  >
                    {item.code}
                  </div>
                ))}

                {/* Floating Particles */}
                {[...Array(12)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-2 h-2 bg-yellow-400 rounded-full animate-float"
                    style={{
                      top: `${Math.random() * 100}%`,
                      left: `${Math.random() * 100}%`,
                      animationDelay: `${Math.random() * 3}s`,
                      animationDuration: `${3 + Math.random() * 2}s`
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <style>{`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(5deg); }
          }
          @keyframes orbit {
            from { transform: rotate(0deg) translateX(180px) rotate(0deg); }
            to { transform: rotate(360deg) translateX(180px) rotate(-360deg); }
          }
          @keyframes gridMove {
            0% { transform: translate(0, 0); }
            100% { transform: translate(50px, 50px); }
          }
          .animate-fadeInUp {
            animation: fadeInUp 0.8s ease-out forwards;
            opacity: 0;
          }
          .animate-float {
            animation: float 4s ease-in-out infinite;
          }
          .animate-orbit {
            animation: orbit 15s linear infinite;
          }
        `}</style>
      </div>

      {/* Features Section */}
      <div className="py-20 px-6 lg:px-12 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-[#203f78] mb-6">
              How Can Python Address Your Challenges?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Python is a dynamic, high-level programming language renowned for its readability and efficiency, excelling across various domains.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="group p-8 bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-blue-100"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-[#203f78] to-[#2a5294] rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                  <feature.icon className="text-white" size={32} />
                </div>
                <h3 className="text-2xl font-bold text-[#203f78] mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Purpose Section */}
      <div className="py-20 px-6 lg:px-12 bg-gradient-to-br from-[#203f78] to-[#1a3361] text-white overflow-hidden">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                What is Python's Purpose?
              </h2>
              <div className="space-y-4 text-lg text-blue-100">
                <p>
                  Python is designed with a focus on code readability and simplicity. Its purpose is to provide developers with a language that is easy to learn and use, promoting rapid development and effective problem-solving.
                </p>
                <p>
                  Python's intuitive syntax allows for clear, logical coding, which accelerates project timelines and reduces maintenance costs. Its broad range of libraries and frameworks extends its capabilities, making it an invaluable tool for diverse programming needs.
                </p>
              </div>
            </div>
            <div className="relative h-96 flex items-center justify-center">
              <div className="grid grid-cols-2 gap-4">
                {['Django', 'Flask', 'Pandas', 'NumPy', 'TensorFlow', 'scikit-learn'].map((lib, idx) => (
                  <div
                    key={idx}
                    className="px-6 py-4 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 hover:bg-white/20 hover:scale-105 transition-all duration-300 cursor-pointer"
                    style={{
                      animation: `fadeInScale 0.6s ease-out ${idx * 0.15}s both`
                    }}
                  >
                    <p className="font-bold text-yellow-300 text-center">{lib}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <style>{`
          @keyframes fadeInScale {
            from {
              opacity: 0;
              transform: scale(0.8);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
          }
        `}</style>
      </div>

      {/* Benefits Section */}
      <div className="py-20 px-6 lg:px-12 bg-white">
        <div className="container mx-auto">
          <h2 className="text-4xl lg:text-5xl font-bold text-[#203f78] text-center mb-16">
            What are the Benefits of Python?
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, idx) => (
              <div
                key={idx}
                className="p-6 bg-gradient-to-br from-blue-50 to-slate-50 rounded-xl border-l-4 border-[#203f78] hover:shadow-lg hover:scale-105 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-[#203f78] rounded-full flex items-center justify-center flex-shrink-0 mt-1 animate-bounce" style={{ animationDuration: '2s', animationDelay: `${idx * 0.1}s` }}>
                    <Check className="text-white" size={18} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#203f78] mb-2">{benefit.title}</h3>
                    <p className="text-gray-600">{benefit.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Why Choose Python */}
      <div className="py-20 px-6 lg:px-12 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-[#203f78] mb-8">
            Why Should You Choose Python?
          </h2>
          <p className="text-xl text-gray-700 leading-relaxed mb-8">
            Opting for Python means selecting a language that blends simplicity with powerful functionality. Its ease of use and extensive features make it ideal for a wide range of applications, from quick prototypes to sophisticated, production-ready systems.
          </p>
          <p className="text-lg text-gray-600 leading-relaxed">
            Python's adaptability ensures it can meet diverse project needs, whether you're developing a web application, analyzing data, or creating intelligent algorithms. At Dreams Technologies, we utilize Python's strengths to deliver solutions that drive innovation and efficiency.
          </p>
        </div>
      </div>

      {/* Future & Usage Section */}
      <div className="py-20 px-6 lg:px-12 bg-white">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Is Python the Future */}
            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-[#203f78]">Is Python the Future?</h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                Certainly. Python's influence in modern technology continues to grow, particularly in areas like artificial intelligence, machine learning, and data science. Its increasing popularity and ongoing development solidify Python's role as a crucial tool in the tech industry.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                As businesses increasingly rely on data-driven insights and intelligent systems, Python's versatility and efficiency position it as a key player in shaping the future of technology.
              </p>
            </div>

            {/* Where is Python Used */}
            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-[#203f78]">Where is Python Used?</h2>
              <div className="space-y-3">
                {useCases.map((useCase, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 p-4 bg-gradient-to-r from-[#203f78]/5 to-transparent rounded-lg hover:from-[#203f78]/10 hover:translate-x-2 transition-all duration-300"
                  >
                    <ChevronRight className="text-[#203f78] animate-pulse" size={24} style={{ animationDuration: '2s', animationDelay: `${idx * 0.2}s` }} />
                    <span className="text-lg font-semibold text-gray-700">{useCase}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Real Life Applications */}
      <div className="py-20 px-6 lg:px-12 bg-gradient-to-br from-[#203f78] to-[#1a3361] text-white">
        <div className="container mx-auto">
          <h2 className="text-4xl lg:text-5xl font-bold text-center mb-16">
            How is Python Useful in Real Life?
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Data Analysis", desc: "Process data, generate reports, and make strategic decisions" },
              { title: "Automation", desc: "Automate routine tasks, boosting efficiency and saving time" },
              { title: "Web Services", desc: "Powers popular websites with reliable and scalable solutions" },
              { title: "AI and ML", desc: "Drives technological advancements with intelligent systems" },
              { title: "Database Solutions", desc: "Effective data management with MySQL and MongoDB integration" }
            ].map((app, idx) => (
              <div
                key={idx}
                className="p-8 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 hover:bg-white/20 hover:scale-105 transition-all duration-300"
              >
                <h3 className="text-2xl font-bold text-yellow-300 mb-4">{app.title}</h3>
                <p className="text-blue-100">{app.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Python vs Java */}
      <div className="py-20 px-6 lg:px-12 bg-white">
  <div className="container mx-auto max-w-5xl">
    <h2 className="text-4xl lg:text-5xl font-bold text-[#203f78] text-center mb-16">
      Python vs. Java: Which is Better?
    </h2>

    <div className="grid md:grid-cols-2 gap-8">
      {/* Java Card */}
      <div className="p-8 bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl border-2 border-orange-200 hover:shadow-2xl hover:scale-105 transition-all duration-300">
        <img src={jav} alt="Java Logo" className="w-50 h-16 mb-4" />
        <h3 className="text-3xl font-bold text-orange-700 mb-6">Java</h3>
        <p className="text-lg text-gray-700 leading-relaxed">
          Known for its performance and scalability, Java is often preferred for
          large-scale enterprise applications due to its statically typed nature,
          which provides enhanced performance and type safety.
        </p>
      </div>

      {/* Python Card */}
      <div className="p-8 bg-gradient-to-br from-blue-50 to-[#203f78]/10 rounded-2xl border-2 border-[#203f78] hover:shadow-2xl hover:scale-105 transition-all duration-300">
        <img src={pyt} alt="Python Logo" className="w-50 h-16 mb-4" />
        <h3 className="text-3xl font-bold text-[#203f78] mb-6">Python</h3>
        <p className="text-lg text-gray-700 leading-relaxed">
          Celebrated for its ease of use and rapid development capabilities,
          Python excels in scenarios where speed and flexibility are crucial. It
          is especially well-suited for startups and projects requiring swift
          iteration.
        </p>
      </div>
    </div>
  </div>
</div>

      {/* CTA Section */}
      <div className="py-20 px-6 lg:px-12 bg-gradient-to-br from-[#203f78] via-[#2a5294] to-[#1a3361] relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-10">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute bg-white rounded-full"
              style={{
                width: '200px',
                height: '200px',
                left: `${i * 20}%`,
                top: `${(i % 2) * 50}%`,
                animation: `float ${5 + i}s ease-in-out infinite`,
                animationDelay: `${i * 0.5}s`
              }}
            />
          ))}
        </div>

        <div className="container mx-auto text-center relative z-10">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to Transform Your Business with Python?
          </h2>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
            Let Dreams Technologies help you leverage Python's power to drive innovation and efficiency.
          </p>
            <Link
              to="/contact" className="px-12 py-5 bg-yellow-400 text-[#203f78] font-bold text-lg rounded-lg hover:bg-yellow-300 transition-all transform hover:scale-110 shadow-2xl animate-pulse">
            Start Your Project Today
            <ChevronRight className="inline ml-2" size={24} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PythonPage;