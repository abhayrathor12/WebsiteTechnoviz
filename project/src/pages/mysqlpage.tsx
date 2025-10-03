import React, { useState, useEffect } from 'react';
import { Database, Shield, Zap, Server, TrendingUp, Code, Lock, Globe, BarChart3, CheckCircle } from 'lucide-react';
import { Link } from "react-router-dom";
export default function MySQLPage() {
  const [scrollY, setScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    { icon: <Database className="w-6 h-6" />, title: "Data Management", desc: "Handle large volumes of structured data with high efficiency" },
    { icon: <TrendingUp className="w-6 h-6" />, title: "Scalability", desc: "Support applications from small startups to enterprise systems" },
    { icon: <Zap className="w-6 h-6" />, title: "Performance Optimization", desc: "Deliver fast query processing for real-time applications" },
    { icon: <Shield className="w-6 h-6" />, title: "Security", desc: "Protect sensitive business data with advanced authentication" },
    { icon: <Code className="w-6 h-6" />, title: "Integration", desc: "Work seamlessly with Python, PHP, Java, and modern frameworks" },
    { icon: <Server className="w-6 h-6" />, title: "High Availability", desc: "Ensure minimal downtime with replication and clustering" }
  ];

  const benefits = [
    "Open Source & Cost-Effective",
    "Scalable Performance",
    "Cross-Platform Compatibility",
    "Built-in Security & Encryption",
    "Integration-Friendly",
    "High Availability & Reliability",
    "Community & Enterprise Support"
  ];

  const useCases = [
    { icon: <Globe className="w-5 h-5" />, title: "Web Applications", desc: "Powering CMS platforms like WordPress, Joomla, and Drupal" },
    { icon: <BarChart3 className="w-5 h-5" />, title: "E-commerce", desc: "Managing product catalogs, transactions, and user accounts" },
    { icon: <Lock className="w-5 h-5" />, title: "Finance & Banking", desc: "Ensuring secure storage of sensitive data" },
    { icon: <Database className="w-5 h-5" />, title: "Data Warehousing", desc: "Supporting reporting and business intelligence tools" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#203f78] via-[#2a5294] to-[#1a2f5a]">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-cyan-300 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{animationDelay: '1s'}} />
        </div>

        <div className="container mx-auto px-6 py-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-white space-y-6">
              <div className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium border border-white/20">
                World's Most Popular Open-Source RDBMS
              </div>
              <h1 className="text-5xl lg:text-5xl font-bold leading-tight">
                Discover the Power of
                <span className="block bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent mt-2">
                  MySQL
                </span>
              </h1>
              <p className="text-xl text-blue-100 leading-relaxed">
                Trusted by businesses of all sizes, MySQL provides scalability, reliability, and performance for managing structured data. From small applications to enterprise-grade platforms.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <Link
              to="/contact" className="px-8 py-4 bg-white text-[#203f78] rounded-lg font-semibold hover:bg-blue-50 transition-all transform hover:scale-105 shadow-xl">
                  Get Started
                </Link>
               
              </div>
              
            </div>

            {/* Right Animation */}
            <div className="relative h-[500px] hidden lg:block">
              <div className="absolute inset-0 flex items-center justify-center">
                {/* Rotating Database Icon */}
                <div className="absolute w-64 h-64 border-4 border-white/20 rounded-full animate-spin" style={{animationDuration: '20s'}} />
                <div className="absolute w-48 h-48 border-4 border-cyan-300/30 rounded-full animate-spin" style={{animationDuration: '15s', animationDirection: 'reverse'}} />
                <div className="absolute w-32 h-32 border-4 border-blue-300/40 rounded-full animate-spin" style={{animationDuration: '10s'}} />
                
                {/* Center Database Icon */}
                <div className="absolute bg-white/10 backdrop-blur-lg p-8 rounded-2xl border border-white/20 shadow-2xl">
                  <Database className="w-20 h-20 text-white animate-pulse" />
                </div>

                {/* Floating Elements */}
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="absolute w-12 h-12 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center border border-white/30 shadow-lg"
                    style={{
                      animation: `float 3s ease-in-out infinite`,
                      animationDelay: `${i * 0.5}s`,
                      transform: `rotate(${i * 60}deg) translateX(120px) rotate(-${i * 60}deg)`
                    }}
                  >
                    {[<Shield />, <Zap />, <Server />, <Lock />, <Code />, <Globe />][i]}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <style jsx>{`
          @keyframes float {
            0%, 100% { transform: rotate(var(--rotate)) translateX(120px) rotate(calc(-1 * var(--rotate))) translateY(0px); }
            50% { transform: rotate(var(--rotate)) translateX(120px) rotate(calc(-1 * var(--rotate))) translateY(-20px); }
          }
        `}</style>
      </section>

      {/* Challenges Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-[#203f78] mb-4">
              How Can MySQL Address Your Challenges?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              MySQL enables organizations to manage, store, and access data with speed, accuracy, and consistency
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="group p-8 bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl hover:shadow-2xl transition-all duration-300 border border-slate-200 hover:border-[#203f78]/30 hover:-translate-y-2"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-[#203f78] to-[#2a5294] rounded-xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-[#203f78] mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Purpose & Benefits Section */}
      <section className="py-20 bg-gradient-to-br from-[#203f78] to-[#2a5294] text-white">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">What is the Purpose of MySQL?</h2>
              <p className="text-lg text-blue-100 leading-relaxed mb-8">
                The purpose of MySQL is to store, organize, and retrieve structured data efficiently. Its relational model ensures consistency and reliability, making it an ideal choice for web applications, business systems, and data-driven platforms.
              </p>
              <h3 className="text-2xl font-bold mb-4">Why Choose MySQL?</h3>
              <p className="text-blue-100 leading-relaxed">
                Opting for MySQL means choosing a proven, high-performance database solution that supports growth, reliability, and security. Whether you are managing e-commerce platforms, financial applications, or data analytics systems, MySQL provides the flexibility and efficiency to meet your business needs.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold mb-6">Key Benefits</h3>
              <div className="space-y-4">
                {benefits.map((benefit, idx) => (
                  <div key={idx} className="flex items-start gap-3 group">
                    <CheckCircle className="w-6 h-6 text-cyan-300 flex-shrink-0 mt-1 group-hover:scale-110 transition-transform" />
                    <span className="text-lg">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-[#203f78] mb-4">
              Where is MySQL Used?
            </h2>
            <p className="text-xl text-gray-600">
              Powering millions of applications across industries
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {useCases.map((useCase, idx) => (
              <div
                key={idx}
                className="p-6 bg-gradient-to-br from-[#203f78] to-[#2a5294] text-white rounded-xl hover:shadow-2xl transition-all hover:-translate-y-1"
              >
                <div className="mb-4">{useCase.icon}</div>
                <h3 className="text-lg font-bold mb-2">{useCase.title}</h3>
                <p className="text-sm text-blue-100">{useCase.desc}</p>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-2xl p-12 border border-slate-200">
            <h3 className="text-3xl font-bold text-[#203f78] mb-8 text-center">Real-Life Applications</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {["Online Stores: Handle orders & inventory", "Social Media: Manage user interactions", "Enterprise Systems: Maintain secure operations", "IoT Platforms: Store device data", "Healthcare: Manage patient records", "Education: Student management systems"].map((app, idx) => (
                <div key={idx} className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm">
                  <div className="w-2 h-2 bg-[#203f78] rounded-full" />
                  <span className="text-gray-700">{app}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* MySQL vs MongoDB Section */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-[#203f78] mb-12">
            MySQL vs MongoDB: Which is Better?
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-[#203f78]">
              <div className="w-16 h-16 bg-[#203f78] rounded-xl flex items-center justify-center text-white mb-6">
                <Database className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-[#203f78] mb-4">MySQL (Relational)</h3>
              <p className="text-gray-600 mb-6">
                Best for structured data, complex queries, and applications requiring ACID compliance
              </p>
              <div className="space-y-2">
                <div className="text-sm font-semibold text-[#203f78]">Perfect for:</div>
                <ul className="space-y-2 text-gray-600">
                  <li>• Financial systems</li>
                  <li>• ERP applications</li>
                  <li>• E-commerce platforms</li>
                  <li>• Transactional systems</li>
                </ul>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-green-600">
              <div className="w-16 h-16 bg-green-600 rounded-xl flex items-center justify-center text-white mb-6">
                <Server className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-green-600 mb-4">MongoDB (NoSQL)</h3>
              <p className="text-gray-600 mb-6">
                Ideal for unstructured data, offering flexibility and scalability for real-time applications
              </p>
              <div className="space-y-2">
                <div className="text-sm font-semibold text-green-600">Perfect for:</div>
                <ul className="space-y-2 text-gray-600">
                  <li>• IoT applications</li>
                  <li>• Real-time analytics</li>
                  <li>• Content management</li>
                  <li>• Flexible schemas</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Future Section */}
      <section className="py-20 bg-gradient-to-br from-[#203f78] to-[#1a2f5a] text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">Is MySQL the Future?</h2>
          <p className="text-2xl text-blue-100 mb-8 max-w-4xl mx-auto leading-relaxed">
            Yes. Despite the rise of NoSQL databases, MySQL remains a cornerstone of enterprise and web applications. Its continuous development, cloud integration, and wide adoption ensure that MySQL will remain a reliable and future-ready choice for years to come.
          </p>
          <Link
              to="/contact" className="px-10 py-5 bg-white text-[#203f78] rounded-xl font-bold text-lg hover:bg-blue-50 transition-all transform hover:scale-105 shadow-2xl">
            Start Your MySQL Journey
          </Link>
        </div>
      </section>

      {/* Footer */}
     
    </div>
  );
}