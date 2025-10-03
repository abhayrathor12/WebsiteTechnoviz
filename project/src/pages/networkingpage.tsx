import React, { useState, useEffect } from 'react';
import { Wifi, Shield, Zap, Globe, Network, Server, Activity, Lock, TrendingUp, Cloud } from 'lucide-react';

import { Link } from "react-router-dom";
export default function NetworkingPage() {
  const [activeNode, setActiveNode] = useState(0);
  const [connections, setConnections] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveNode(prev => (prev + 1) % 6);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const connectInterval = setInterval(() => {
      const newConnection = {
        id: Date.now(),
        from: Math.floor(Math.random() * 6),
        to: Math.floor(Math.random() * 6)
      };
      setConnections(prev => [...prev.slice(-5), newConnection]);
    }, 1500);
    return () => clearInterval(connectInterval);
  }, []);

  const challenges = [
    {
      icon: <Network className="w-6 h-6" />,
      title: "Industrial Communication (OPC UA)",
      description: "Enable standardized and secure communication in automation environments, ensuring interoperability across devices and platforms."
    },
    {
      icon: <Activity className="w-6 h-6" />,
      title: "Reliable Data Transfer (TCP/IP)",
      description: "Build stable and high-performance networks using TCP/IP protocols, ensuring accuracy and speed in data exchange."
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Professional Skills (CCNA)",
      description: "Equip teams with Cisco-certified expertise to design, manage, and troubleshoot complex networks effectively."
    },
    {
      icon: <Lock className="w-6 h-6" />,
      title: "Secure Connectivity",
      description: "Protect business operations with encryption, firewalls, and secure protocols to mitigate cybersecurity risks."
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Scalability",
      description: "Easily expand your network infrastructure as your organization grows, ensuring adaptability to future needs."
    }
  ];

  const benefits = [
    { icon: <Network />, title: "Interoperability", text: "OPC UA ensures seamless integration of machines and systems in industrial automation." },
    { icon: <Zap />, title: "Performance", text: "TCP/IP provides reliable, packet-based data communication across local and global networks." },
    { icon: <Shield />, title: "Skill Development", text: "CCNA certification validates skills in routing, switching, and network security." },
    { icon: <Lock />, title: "Security", text: "Advanced protocols and monitoring ensure safe data transmission." },
    { icon: <Cloud />, title: "Flexibility", text: "Networking adapts to cloud, IoT, and hybrid environments." },
    { icon: <Activity />, title: "Business Continuity", text: "Reliable networks minimize downtime and ensure smooth operations." }
  ];

  const applications = [
    { title: "Industrial Automation", desc: "Connecting PLCs, HMIs, and SCADA systems via OPC UA." },
    { title: "Enterprise IT", desc: "Managing LAN/WAN networks, cloud platforms, and remote access." },
    { title: "Telecommunication", desc: "Powering global internet and VoIP systems using TCP/IP." },
    { title: "Education & Certification", desc: "Building expertise with CCNA for networking professionals." },
    { title: "IoT and Smart Devices", desc: "Ensuring secure communication among connected devices." }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#203f78] to-[#2d5aa3] text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 1px, transparent 1px),
                             radial-gradient(circle at 80% 80%, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>
        
        <div className="container mx-auto px-6 py-20 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 pt-20">
              {/* <div className="inline-block px-4 py-2 bg-white/10 rounded-full backdrop-blur-sm border border-white/20">
                <span className="text-sm font-semibold">Technoviz Automation</span>
              </div> */}
              <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                Discover the Power of <span className="text-blue-200">Networking</span>
              </h1>
              <p className="text-xl text-blue-100 leading-relaxed">
                Networking forms the backbone of modern communication and digital infrastructure. Enable seamless data transfer, secure connectivity, and efficient collaboration across devices, applications, and industries.
              </p>
              <div className="flex gap-4 pt-4">
                <Link
              to="/contact" className="px-8 py-3 bg-white text-[#203f78] rounded-lg font-semibold hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                  Get Started
                </Link>
               
              </div>
            </div>

            {/* Network Animation */}
            <div className="relative h-96 flex items-center justify-center">
              <div className="relative w-full h-full">
                {[0, 1, 2, 3, 4, 5].map((node, idx) => {
                  const angle = (idx * 60 * Math.PI) / 180;
                  const radius = 140;
                  const x = radius * Math.cos(angle);
                  const y = radius * Math.sin(angle);
                  
                  return (
                    <div
                      key={idx}
                      className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ${
                        activeNode === idx ? 'scale-125' : 'scale-100'
                      }`}
                      style={{
                        transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`
                      }}
                    >
                      <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-500 ${
                        activeNode === idx 
                          ? 'bg-white text-[#203f78] shadow-2xl shadow-white/50' 
                          : 'bg-white/20 text-white backdrop-blur-sm border border-white/30'
                      }`}>
                        {idx === 0 && <Server className="w-8 h-8" />}
                        {idx === 1 && <Globe className="w-8 h-8" />}
                        {idx === 2 && <Shield className="w-8 h-8" />}
                        {idx === 3 && <Network className="w-8 h-8" />}
                        {idx === 4 && <Cloud className="w-8 h-8" />}
                        {idx === 5 && <Wifi className="w-8 h-8" />}
                      </div>
                    </div>
                  );
                })}
                
                {/* Center Hub */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-white to-blue-100 flex items-center justify-center shadow-2xl">
                    <Activity className="w-12 h-12 text-[#203f78] animate-pulse" />
                  </div>
                </div>

                {/* Connection Lines */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                  {connections.map((conn, idx) => {
                    const fromAngle = (conn.from * 60 * Math.PI) / 180;
                    const toAngle = (conn.to * 60 * Math.PI) / 180;
                    const radius = 140;
                    const centerX = 192;
                    const centerY = 192;
                    
                    return (
                      <line
                        key={conn.id}
                        x1={centerX + radius * Math.cos(fromAngle)}
                        y1={centerY + radius * Math.sin(fromAngle)}
                        x2={centerX + radius * Math.cos(toAngle)}
                        y2={centerY + radius * Math.sin(toAngle)}
                        stroke="rgba(255,255,255,0.3)"
                        strokeWidth="2"
                        className="animate-pulse"
                      />
                    );
                  })}
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Challenges Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#203f78] mb-4">
              How Can Networking Address Your Challenges?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Networking is crucial for overcoming communication barriers, ensuring system interoperability, and securing data transmission.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {challenges.map((challenge, idx) => (
              <div
                key={idx}
                className="group p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-[#203f78] to-[#2d5aa3] rounded-xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300">
                  {challenge.icon}
                </div>
                <h3 className="text-xl font-bold text-[#203f78] mb-4">
                  {challenge.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {challenge.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Purpose Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-[#203f78] to-[#2d5aa3] text-white">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">What is the Purpose of Networking?</h2>
            <p className="text-xl leading-relaxed text-blue-100">
              Networking ensures that systems, applications, and people remain connected. Its purpose is to enable efficient communication, data sharing, and system integration while maintaining speed, security, and reliability.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-[#203f78] text-center mb-16">
            Benefits of Networking
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, idx) => (
              <div
                key={idx}
                className="p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border-l-4 border-[#203f78]"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center text-[#203f78] flex-shrink-0">
                    {benefit.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#203f78] mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {benefit.text}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-blue-50 to-slate-50">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-[#203f78] mb-6">
                Why Should You Choose Networking Solutions?
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Choosing robust networking solutions means ensuring efficiency, reliability, and scalability across all business operations. Whether you're building industrial communication systems, IT infrastructure, or cloud-based platforms, networking lays the foundation for innovation and growth.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                At <span className="font-semibold text-[#203f78]">Technoviz Automation</span>, we design and implement networking solutions tailored to your needs—industrial protocols, enterprise IT, or skill development through CCNA-certified expertise.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-xl">
              <div className="space-y-6">
                {['Efficiency', 'Reliability', 'Scalability', 'Innovation'].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#203f78] to-[#2d5aa3] rounded-full flex items-center justify-center text-white font-bold">
                      {idx + 1}
                    </div>
                    <div className="flex-1">
                      <div className="h-3 bg-gradient-to-r from-[#203f78] to-blue-300 rounded-full" style={{width: `${85 + idx * 5}%`}}></div>
                    </div>
                    <span className="font-semibold text-[#203f78]">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Applications Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-[#203f78] text-center mb-4">
            Where is Networking Used?
          </h2>
          <p className="text-center text-gray-600 mb-16 max-w-2xl mx-auto">
            From industrial plants to smart homes, networking powers the modern world
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {applications.map((app, idx) => (
              <div
                key={idx}
                className="p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-[#203f78] to-[#2d5aa3] rounded-lg flex items-center justify-center text-white font-bold flex-shrink-0">
                    {idx + 1}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#203f78] mb-2">
                      {app.title}
                    </h3>
                    <p className="text-gray-600 text-sm">{app.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Future Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-[#203f78] to-[#2d5aa3] text-white">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">Is Networking the Future?</h2>
            <p className="text-xl leading-relaxed text-blue-100 mb-8">
              Absolutely. With the rise of IoT, Industry 4.0, cloud computing, and edge devices, networking continues to evolve as a critical enabler of digital transformation. Protocols like OPC UA are driving smart factories, while TCP/IP ensures global internet connectivity, and professional certifications like CCNA future-proof IT teams.
            </p>
           <Link
              to="/contact" className="px-10 py-4 bg-white text-[#203f78] rounded-lg font-semibold text-lg hover:bg-blue-50 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105">
              Start Your Journey
            </Link>
          </div>
        </div>
      </section>

      {/* Real Life Usage */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-[#203f78] text-center mb-16">
            How is Networking Useful in Real Life?
          </h2>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="p-8 bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-lg">
              <Globe className="w-12 h-12 text-[#203f78] mb-4" />
              <h3 className="text-xl font-bold text-[#203f78] mb-3">Industrial Plants</h3>
              <p className="text-gray-700">OPC UA ensures smooth machine-to-machine communication.</p>
            </div>
            <div className="p-8 bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-lg">
              <Network className="w-12 h-12 text-[#203f78] mb-4" />
              <h3 className="text-xl font-bold text-[#203f78] mb-3">Businesses</h3>
              <p className="text-gray-700">TCP/IP enables global collaboration and data sharing.</p>
            </div>
            <div className="p-8 bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-lg">
              <Shield className="w-12 h-12 text-[#203f78] mb-4" />
              <h3 className="text-xl font-bold text-[#203f78] mb-3">IT Teams</h3>
              <p className="text-gray-700">CCNA-certified skills empower professionals to manage complex networks.</p>
            </div>
            <div className="p-8 bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-lg">
              <Wifi className="w-12 h-12 text-[#203f78] mb-4" />
              <h3 className="text-xl font-bold text-[#203f78] mb-3">Daily Life</h3>
              <p className="text-gray-700">From browsing the internet to connecting smart home devices, networking is everywhere.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}