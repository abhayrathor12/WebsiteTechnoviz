import React, { useState, useEffect } from 'react';
import { Cloud, Server, Database, Lock, Zap, Globe, BarChart3, Code, Cpu, Shield, GitBranch, Boxes } from 'lucide-react';
import { Link } from "react-router-dom";
const AzurePage = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [floatingElements, setFloatingElements] = useState([]);

  useEffect(() => {
    const elements = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 15 + Math.random() * 10
    }));
    setFloatingElements(elements);
  }, []);

  const services = [
    { icon: <Server className="w-6 h-6" />, title: "Compute", desc: "VMs, AKS, App Service, Functions" },
    { icon: <Database className="w-6 h-6" />, title: "Storage", desc: "Blob, Files, Data Lake Storage" },
    { icon: <Boxes className="w-6 h-6" />, title: "Databases", desc: "SQL, Cosmos DB, PostgreSQL" },
    { icon: <Globe className="w-6 h-6" />, title: "Networking", desc: "VNet, Front Door, Load Balancer" },
    { icon: <Cpu className="w-6 h-6" />, title: "AI & ML", desc: "Cognitive Services, ML Studio" },
    { icon: <BarChart3 className="w-6 h-6" />, title: "Analytics", desc: "Synapse, Databricks, Power BI" },
    { icon: <Shield className="w-6 h-6" />, title: "Security", desc: "Azure AD, Sentinel, Key Vault" },
    { icon: <GitBranch className="w-6 h-6" />, title: "DevOps", desc: "Pipelines, GitHub Actions" }
  ];

  const benefits = [
    { title: "Global Scale & Reliability", desc: "Worldwide data centers for low-latency, high-availability deployments" },
    { title: "Extensive Service Catalog", desc: "Comprehensive IaaS, PaaS, and SaaS offerings in one platform" },
    { title: "Integrated Security", desc: "Enterprise-grade security with Azure AD and compliance tooling" },
    { title: "Hybrid Flexibility", desc: "Seamless management across cloud and on-premises with Azure Arc" },
    { title: "Cost Optimization", desc: "Pay-as-you-go pricing with built-in cost management tools" },
    { title: "Developer Productivity", desc: "Rich integrations with Visual Studio, GitHub, and SDKs" }
  ];

  const useCases = [
    { icon: <Server />, title: "Enterprise Applications", desc: "Migrate ERP systems to cloud infrastructure" },
    { icon: <BarChart3 />, title: "Data Platforms", desc: "Centralize data lakes and run BI workloads" },
    { icon: <Cpu />, title: "AI & Vision", desc: "Build customer support bots and vision-based solutions" },
    { icon: <Zap />, title: "IoT & Edge", desc: "Manage devices and process real-time telemetry" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#203f78] to-[#1a3260] text-white">
        <div className="absolute inset-0 overflow-hidden">
          {floatingElements.map(el => (
            <div
              key={el.id}
              className="absolute w-2 h-2 bg-blue-300 rounded-full opacity-20"
              style={{
                left: `${el.x}%`,
                top: `${el.y}%`,
                animation: `float ${el.duration}s ease-in-out infinite`,
                animationDelay: `${el.delay}s`
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-6 py-24 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block px-4 py-2 bg-blue-400/20 rounded-full text-sm font-semibold mb-6 backdrop-blur-sm">
                Microsoft Azure Cloud Platform
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                Discover the Power of{' '}
                <span className="text-blue-300">Microsoft Azure</span>
              </h1>
              <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                Build, deploy, and manage applications across a global network of data centers. Transform ideas into production-ready solutions with enterprise-grade cloud services.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/contact" className="px-8 py-4 bg-white text-[#203f78] rounded-lg font-semibold hover:bg-blue-50 transition-all transform hover:scale-105 shadow-lg">
                  Get Started
                </Link>
               
              </div>
            </div>

            <div className="relative hidden md:block">
              <div className="relative w-full h-96">
                {/* Animated Cloud Network */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-64 h-64">
                    <Cloud className="w-64 h-64 text-blue-300 opacity-20 absolute animate-pulse" />
                    <div className="absolute inset-0 animate-spin" style={{ animationDuration: '20s' }}>
                      {[0, 1, 2, 3, 4, 5].map((i) => (
                        <div
                          key={i}
                          className="absolute w-12 h-12 bg-blue-400 rounded-lg shadow-lg flex items-center justify-center"
                          style={{
                            top: '50%',
                            left: '50%',
                            transform: `rotate(${i * 60}deg) translateY(-120px)`,
                          }}
                        >
                          {[<Server />, <Database />, <Lock />, <Zap />, <Code />, <Globe />][i]}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <style jsx>{`
          @keyframes float {
            0%, 100% { transform: translateY(0) translateX(0); }
            25% { transform: translateY(-20px) translateX(10px); }
            50% { transform: translateY(-10px) translateX(-10px); }
            75% { transform: translateY(-30px) translateX(5px); }
          }
        `}</style>
      </section>

      {/* Purpose Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-[#203f78] mb-6">What Is Azure's Purpose?</h2>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Azure simplifies how organizations consume compute, storage, and platform capabilities so they can focus on building business value rather than managing infrastructure.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                It provides a unified cloud environment to develop, deploy, and manage applications securely and reliably — supporting startups to Fortune 500 enterprises with the same foundational services.
              </p>
              <div className="mt-8 p-6 bg-blue-50 rounded-xl border-l-4 border-[#203f78]">
                <p className="text-gray-800 font-semibold">
                  Accelerate innovation with managed services, built-in security, and global reach to deliver resilient, scalable, and compliant solutions faster.
                </p>
              </div>
            </div>
            <div className="relative h-96 bg-gradient-to-br from-blue-100 to-blue-50 rounded-2xl p-8 flex items-center justify-center">
              <div className="grid grid-cols-2 gap-4">
                {[Cloud, Lock, Globe, Zap].map((Icon, i) => (
                  <div
                    key={i}
                    className="w-24 h-24 bg-white rounded-xl shadow-lg flex items-center justify-center transform hover:scale-110 transition-all"
                    style={{ animationDelay: `${i * 0.2}s` }}
                  >
                    <Icon className="w-12 h-12 text-[#203f78]" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Services */}
      <section className="py-20 px-6 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#203f78] mb-4">Key Azure Services</h2>
            <p className="text-xl text-gray-600">Comprehensive cloud solutions for every business need</p>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {services.map((service, i) => (
              <div
                key={i}
                className="p-6 bg-gradient-to-br from-blue-50 to-white rounded-xl border border-blue-100 hover:shadow-xl transition-all transform hover:-translate-y-2 cursor-pointer"
              >
                <div className="w-12 h-12 bg-[#203f78] rounded-lg flex items-center justify-center text-white mb-4">
                  {service.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">{service.title}</h3>
                <p className="text-sm text-gray-600">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 px-6 bg-gradient-to-br from-[#203f78] to-[#1a3260] text-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Benefits of Azure</h2>
            <p className="text-xl text-blue-100">Why organizations choose Azure for their cloud journey</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, i) => (
              <div
                key={i}
                className="p-8 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/15 transition-all"
              >
                <div className="w-12 h-12 bg-blue-400 rounded-lg flex items-center justify-center mb-4">
                  <div className="w-6 h-6 bg-white rounded"></div>
                </div>
                <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                <p className="text-blue-100">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#203f78] mb-4">Real-World Applications</h2>
            <p className="text-xl text-gray-600">How Azure powers businesses across industries</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {useCases.map((useCase, i) => (
              <div
                key={i}
                className="flex gap-6 p-8 bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-2xl transition-all"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-[#203f78] to-blue-600 rounded-xl flex items-center justify-center text-white flex-shrink-0">
                  {useCase.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{useCase.title}</h3>
                  <p className="text-gray-600">{useCase.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-[#203f78] text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Business?</h2>
          <p className="text-xl text-blue-100 mb-8">
            At Technoviz Automation, we leverage Azure's managed services to build scalable, secure, and cost-efficient cloud solutions that align with your business goals.
          </p>
          <Link
              to="/contact" className="px-10 py-4 bg-white text-[#203f78] rounded-lg font-bold text-lg hover:bg-blue-50 transition-all transform hover:scale-105 shadow-xl">
            Start Your Azure Journey
          </Link>
        </div>
      </section>

      {/* Footer Info */}
      {/* <section className="py-12 px-6 bg-gray-900 text-gray-300">
        <div className="container mx-auto max-w-6xl text-center">
          <p className="text-sm">
            Azure continues to lead cloud innovation with investments in hybrid cloud, AI, developer productivity, and security — positioning it strongly for the future of digital transformation.
          </p>
        </div>
      </section> */}
    </div>
  );
};

export default AzurePage;