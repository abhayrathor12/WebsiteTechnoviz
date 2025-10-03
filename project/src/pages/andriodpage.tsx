import React, { useState, useEffect } from 'react';
import { Smartphone, Cpu, Code, Zap, Globe, Shield, Layers, TrendingUp } from 'lucide-react';
import { Link } from "react-router-dom";

export default function AndroidPage() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#203f78] to-[#2d5aa8]">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-64 h-64 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-300 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="container mx-auto px-6 py-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-white space-y-6">
              
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                Discover the Power of{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-300">
                  Android Development
                </span>
              </h1>
              <p className="text-xl text-blue-100 leading-relaxed">
                Android powers the majority of mobile devices worldwide, making it the most widely adopted mobile operating system. With its open-source flexibility, rich ecosystem, and advanced tools, Android enables developers to build everything from lightweight apps to enterprise-grade solutions.
              </p>
              <div className="flex gap-4 pt-4">
                <Link
              to="/contact" className="px-8 py-4 bg-white text-[#203f78] rounded-lg font-semibold hover:bg-blue-50 transition-all transform hover:scale-105 shadow-xl">
                  Get Started
                </Link>
                
              </div>
            </div>

            {/* Right Animation */}
            <div className="relative h-96 lg:h-[500px]">
              <AndroidAnimation scrollY={scrollY} />
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-3 bg-white rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-xl text-gray-700 leading-relaxed">
              At <span className="font-bold text-[#203f78]">Technoviz Automation</span>, we harness the full potential of Android development frameworks and tools to deliver scalable, secure, and high-performance applications that drive business growth.
            </p>
          </div>
        </div>
      </section>

      {/* Android SDK Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#203f78]/10 rounded-full text-[#203f78] font-semibold">
                <Code size={20} />
                Android SDK
              </div>
              <h2 className="text-4xl font-bold text-[#203f78]">
                The Core of Android App Development
              </h2>
              <p className="text-lg text-gray-700">
                The Android Software Development Kit (SDK) provides the foundation for building versatile Android applications. It equips developers with robust APIs, tools, and libraries for seamless mobile development.
              </p>
              
              <div className="space-y-4 pt-4">
                <FeatureItem 
                  icon={<Layers size={20} />}
                  title="Advanced API Integration"
                  description="Access GPS, sensors, camera, Bluetooth, and other device features for native experiences."
                />
                <FeatureItem 
                  icon={<Cpu size={20} />}
                  title="Gradle Build System"
                  description="Manage dependencies and streamline CI/CD pipelines."
                />
                <FeatureItem 

                  icon={<Zap size={20} />}
                  title="Jetpack Libraries"
                  description="Simplify development with Room (database), WorkManager (background tasks), and Navigation (UI flow)."
                />
                <FeatureItem 
                  icon={<Smartphone size={20} />}
                  title="Material Design"
                  description="Ensure modern, consistent, and user-friendly interfaces."
                />
              </div>
            </div>

            <div className="relative h-96">
              <FloatingIcons />
            </div>
          </div>
        </div>
      </section>

      {/* Android NDK Section */}
      <section className="py-20 bg-[#203f78] text-white">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-80 order-2 lg:order-1">
              <PerformanceAnimation />
            </div>

            <div className="space-y-6 order-1 lg:order-2">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full font-semibold">
                <Cpu size={20} />
                Android NDK
              </div>
              <h2 className="text-4xl font-bold">
                High-Performance Native Development
              </h2>
              <p className="text-lg text-blue-100">
                The Android Native Development Kit (NDK) allows developers to write parts of an app in C/C++ for performance-critical tasks.
              </p>
              
              <div className="space-y-3 pt-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
                  <p className="text-blue-100">Game development and graphics-heavy apps</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
                  <p className="text-blue-100">Real-time audio/video processing</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
                  <p className="text-blue-100">Applications requiring maximum hardware-level optimization</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* React Native Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#203f78]/10 rounded-full text-[#203f78] font-semibold mb-6">
              <Globe size={20} />
              React Native
            </div>
            <h2 className="text-4xl font-bold text-[#203f78]">
              Delivering Cross-Platform Efficiency with JavaScript
            </h2>
            <p className="text-lg text-gray-700">
              React Native, developed by Facebook, enables faster cross-platform development by allowing developers to write once and run on both Android and iOS.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AdvantageCard 
              icon={<Zap className="text-[#203f78]" size={32} />}
              title="Near-Native Performance"
              description="Native components ensure smooth user experience"
            />
            <AdvantageCard 
              icon={<Layers className="text-[#203f78]" size={32} />}
              title="Component-Based Architecture"
              description="Build modular, reusable UIs"
            />
            <AdvantageCard 
              icon={<TrendingUp className="text-[#203f78]" size={32} />}
              title="Hot Reloading"
              description="Accelerate development with instant feedback"
            />
            <AdvantageCard 
              icon={<Globe className="text-[#203f78]" size={32} />}
              title="Rich Ecosystem"
              description="Access libraries and community-driven tools"
            />
            <AdvantageCard 
              icon={<Code className="text-[#203f78]" size={32} />}
              title="Native Modules"
              description="Extend apps with platform-specific features"
            />
            <AdvantageCard 
              icon={<Smartphone className="text-[#203f78]" size={32} />}
              title="Cross-Platform"
              description="Single codebase for iOS and Android"
            />
          </div>
        </div>
      </section>

      {/* Why Choose Android */}
      <section className="py-20 bg-gradient-to-br from-[#203f78] to-[#2d5aa8] text-white">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Why Choose Android for Your Business?
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <BenefitCard 
              icon={<Globe size={32} />}
              title="Widest Reach"
              description="Android dominates the global smartphone market"
            />
            <BenefitCard 
              icon={<Layers size={32} />}
              title="Flexibility"
              description="Supports smartphones, tablets, TVs, and wearables"
            />
            <BenefitCard 
              icon={<Code size={32} />}
              title="Open-Source"
              description="Lower development costs and more customization freedom"
            />
            <BenefitCard 
              icon={<Shield size={32} />}
              title="Security"
              description="Regular updates and enterprise-grade security features"
            />
            <BenefitCard 
              icon={<TrendingUp size={32} />}
              title="Scalability"
              description="Apps can grow with your business needs"
            />
            <BenefitCard 
              icon={<Cpu size={32} />}
              title="Integration-Friendly"
              description="Seamless connection with IoT, AI, and cloud services"
            />
          </div>
        </div>
      </section>

      {/* Future of Android */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold text-[#203f78] mb-4">
              Future of Android Development
            </h2>
            <p className="text-lg text-gray-700">
              Android continues to evolve with cutting-edge innovations
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
            <FutureCard title="Jetpack Compose" description="Modern declarative UI toolkit" />
            <FutureCard title="5G Optimization" description="High-speed app experiences" />
            <FutureCard title="AI & ML Integration" description="On-device intelligence with TensorFlow Lite" />
            <FutureCard title="IoT & Wearables" description="Expanding beyond smartphones" />
            <FutureCard title="Cross-Platform" description="Flutter and React Native" />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#203f78] to-[#2d5aa8]">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Build Your Next Android App?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Let's transform your ideas into powerful Android applications that drive results
          </p>
          <Link
              to="/contact" className="px-10 py-4 bg-white text-[#203f78] rounded-lg font-bold text-lg hover:bg-blue-50 transition-all transform hover:scale-105 shadow-2xl">
            Start Your Project
          </Link>
        </div>
      </section>
    </div>
  );
}

function AndroidAnimation({ scrollY }) {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Orbiting Icons */}
        <div className="absolute w-80 h-80 animate-spin" style={{ animationDuration: '20s' }}>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
            <Code className="text-white" size={24} />
          </div>
        </div>
        <div className="absolute w-64 h-64 animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }}>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
            <Smartphone className="text-white" size={24} />
          </div>
        </div>
        <div className="absolute w-96 h-96 animate-spin" style={{ animationDuration: '25s' }}>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
            <Cpu className="text-white" size={24} />
          </div>
        </div>
        
        {/* Center Phone */}
        <div className="relative z-10">
          <div className="w-48 h-96 bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl shadow-2xl p-2 transform hover:scale-105 transition-transform">
            <div className="w-full h-full bg-gradient-to-br from-blue-400 to-green-400 rounded-2xl flex items-center justify-center overflow-hidden">
              <div className="text-white text-6xl font-bold animate-pulse">
                <Smartphone size={80} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FloatingIcons() {
  return (
    <div className="relative w-full h-full">
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="absolute w-16 h-16 bg-[#203f78]/10 rounded-xl flex items-center justify-center animate-pulse"
          style={{
            top: `${Math.random() * 80}%`,
            left: `${Math.random() * 80}%`,
            animationDelay: `${i * 0.5}s`,
            animationDuration: `${2 + i * 0.3}s`,
          }}
        >
          {i % 3 === 0 && <Code className="text-[#203f78]" size={24} />}
          {i % 3 === 1 && <Layers className="text-[#203f78]" size={24} />}
          {i % 3 === 2 && <Zap className="text-[#203f78]" size={24} />}
        </div>
      ))}
    </div>
  );
}

function PerformanceAnimation() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="space-y-3 w-full">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="text-xs text-blue-300 w-8">C++</div>
            <div className="flex-1 h-8 bg-white/10 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-green-400 to-blue-400 rounded-full animate-pulse"
                style={{ 
                  width: `${60 + i * 8}%`,
                  animationDelay: `${i * 0.2}s`
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function FeatureItem({ icon, title, description }) {
  return (
    <div className="flex gap-4">
      <div className="flex-shrink-0 w-12 h-12 bg-[#203f78]/10 rounded-lg flex items-center justify-center text-[#203f78]">
        {icon}
      </div>
      <div>
        <h4 className="font-semibold text-[#203f78]">{title}</h4>
        <p className="text-gray-600 text-sm">{description}</p>
      </div>
    </div>
  );
}

function AdvantageCard({ icon, title, description }) {
  return (
    <div className="p-6 bg-gradient-to-br from-slate-50 to-blue-50 rounded-xl hover:shadow-xl transition-all transform hover:-translate-y-1">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

function BenefitCard({ icon, title, description }) {
  return (
    <div className="p-6 bg-white/10 backdrop-blur-sm rounded-xl hover:bg-white/20 transition-all border border-white/20">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-blue-100">{description}</p>
    </div>
  );
}

function FutureCard({ title, description }) {
  return (
    <div className="p-6 bg-gradient-to-br from-[#203f78]/5 to-blue-100/50 rounded-xl hover:shadow-lg transition-all transform hover:-translate-y-1 border border-[#203f78]/10">
      <h3 className="text-lg font-bold text-[#203f78]">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
}