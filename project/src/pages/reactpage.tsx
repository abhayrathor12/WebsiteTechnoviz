import React, { useState, useEffect } from 'react';
import { Code, Zap, Box, Layers, RefreshCw, GitBranch, Cpu, Rocket } from 'lucide-react';
import { Link } from "react-router-dom";
const ReactPage = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [isVisible, setIsVisible] = useState({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible((prev) => ({
            ...prev,
            [entry.target.id]: entry.isIntersecting,
          }));
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('[data-animate]').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

   const FloatingReactLogo = () => {
    const [rotation, setRotation] = useState(0);

    useEffect(() => {
      const interval = setInterval(() => {
        setRotation((prev) => (prev + 1) % 360);
      }, 50);
      return () => clearInterval(interval);
    }, []);

    return (
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Outer orbiting ellipses representing React's architecture */}
        <div 
          className="absolute w-64 h-64 border-2 border-cyan-400 rounded-full opacity-30"
          style={{ 
            transform: `rotate(${rotation}deg)`,
            borderStyle: 'dashed'
          }}
        />
        <div 
          className="absolute w-64 h-64 border-2 border-cyan-400 rounded-full opacity-30"
          style={{ 
            transform: `rotate(${-rotation + 60}deg)`,
            borderStyle: 'dashed'
          }}
        />
        <div 
          className="absolute w-64 h-64 border-2 border-cyan-400 rounded-full opacity-30"
          style={{ 
            transform: `rotate(${rotation + 120}deg)`,
            borderStyle: 'dashed'
          }}
        />

        {/* Orbiting component nodes */}
        {[0, 60, 120, 180, 240, 300].map((angle, idx) => {
          const orbitAngle = (rotation + angle) * (Math.PI / 180);
          const x = Math.cos(orbitAngle) * 120;
          const y = Math.sin(orbitAngle) * 120;
          
          return (
            <div
              key={idx}
              className="absolute w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg shadow-lg"
              style={{
                transform: `translate(${x}px, ${y}px) rotate(${-rotation}deg)`,
                opacity: 0.8
              }}
            >
              <div className="w-full h-full flex items-center justify-center text-white text-xs font-bold">
                &lt;/&gt;
              </div>
            </div>
          );
        })}

        {/* Central React atom/core */}
        <div className="relative">
          <div className="w-20 h-20 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full shadow-2xl flex items-center justify-center animate-pulse">
            <div className="text-white font-bold text-2xl">⚛</div>
          </div>
          {/* Glow effect */}
          <div className="absolute inset-0 w-20 h-20 bg-cyan-400 rounded-full blur-xl opacity-50 animate-pulse"></div>
        </div>

        {/* Particle effects */}
        {[...Array(12)].map((_, idx) => {
          const particleAngle = (rotation * 2 + idx * 30) * (Math.PI / 180);
          const radius = 140 + Math.sin(rotation * 0.1 + idx) * 20;
          const px = Math.cos(particleAngle) * radius;
          const py = Math.sin(particleAngle) * radius;
          
          return (
            <div
              key={`particle-${idx}`}
              className="absolute w-2 h-2 bg-cyan-400 rounded-full"
              style={{
                transform: `translate(${px}px, ${py}px)`,
                opacity: 0.4 + Math.sin(rotation * 0.05 + idx) * 0.3
              }}
            />
          );
        })}
      </div>
    );
  };

  const CodeAnimation = () => {
    const [lines, setLines] = useState(0);
    useEffect(() => {
      const interval = setInterval(() => {
        setLines((prev) => (prev + 1) % 6);
      }, 800);
      return () => clearInterval(interval);
    }, []);

    return (
      <div className="bg-gray-900 rounded-lg p-6 font-mono text-sm">
        <div className="text-green-400">import React from 'react';</div>
        {lines > 0 && <div className="text-purple-400 mt-2">const App = () =&gt; {'{'}</div>}
        {lines > 1 && <div className="text-blue-400 ml-4 mt-1">return (</div>}
        {lines > 2 && <div className="text-yellow-400 ml-8">&lt;div&gt;</div>}
        {lines > 3 && <div className="text-cyan-400 ml-12">Hello React!</div>}
        {lines > 4 && <div className="text-yellow-400 ml-8">&lt;/div&gt;</div>}
        {lines > 5 && <div className="text-blue-400 ml-4">);</div>}
        {lines > 5 && <div className="text-purple-400">{'}'}</div>}
      </div>
    );
  };

  const features = [
    { icon: Zap, title: "Virtual DOM", desc: "Optimizes updates by only re-rendering changed components" },
    { icon: Code, title: "JSX Syntax", desc: "Write HTML-like code within JavaScript for better readability" },
    { icon: GitBranch, title: "One-Way Data Binding", desc: "Simplifies state management and enhances predictability" },
  ];

  const benefits = [
    { icon: Rocket, title: "Exceptional Performance", desc: "Virtual DOM ensures fast rendering and improved performance" },
    { icon: Box, title: "Reusable Components", desc: "Modular architecture speeds up development and enhances maintainability" },
    { icon: Layers, title: "Strong Community", desc: "Vast ecosystem of libraries, tools, and resources" },
    { icon: RefreshCw, title: "Flexibility", desc: "Seamless integration with various backend technologies" },
    { icon: Cpu, title: "Rapid Development", desc: "Pre-built patterns facilitate quick application launches" },
  ];

  const advancedFeatures = [
    { title: "React Hooks", desc: "useState and useEffect simplify state management in functional components" },
    { title: "Context API", desc: "Effective state management without prop drilling" },
    { title: "Error Boundaries", desc: "Catch and handle JavaScript errors for enhanced stability" },
    { title: "Suspense & Lazy Loading", desc: "Code splitting and lazy loading optimize performance" },
  ];

  const ecosystem = [
    { name: "React Router", desc: "Navigation and routing for SPAs" },
    { name: "Redux", desc: "Complex state management solution" },
    { name: "Next.js", desc: "Server-side rendering framework" },
    { name: "Gatsby", desc: "Static site generation" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #203f78 0%, #1a3360 100%)' }}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-cyan-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-400 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-6 py-24 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-white space-y-6">
              <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                Build Amazing UIs with <span className="text-cyan-400">React</span>
              </h1>
              <p className="text-xl text-gray-200">
                A JavaScript library for building fast, interactive, and scalable user interfaces with component-based architecture
              </p>
              <div className="flex gap-4">
                <Link
                  to="/contact" className="bg-cyan-400 text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-cyan-300 transition">
                  Get Started
                </Link>
                
              </div>
            </div>
            
            <div className="h-96">
              <FloatingReactLogo />
            </div>
          </div>
        </div>
      </div>

      {/* What is React Section */}
      <div className="container mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div data-animate id="what-is-react" className={`space-y-6 transition-all duration-1000 ${isVisible['what-is-react'] ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <h2 className="text-4xl font-bold" style={{ color: '#203f78' }}>What is React?</h2>
            <p className="text-gray-700 text-lg">
              React is a powerful JavaScript library that revolutionizes how we build user interfaces. It introduces innovative concepts that make development faster, more efficient, and more maintainable.
            </p>
            
            <div className="space-y-4">
              {features.map((feature, idx) => (
                <div key={idx} className="flex gap-4 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#203f78' }}>
                    <feature.icon className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg" style={{ color: '#203f78' }}>{feature.title}</h3>
                    <p className="text-gray-600">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className={`transition-all duration-1000 delay-300 ${isVisible['what-is-react'] ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <CodeAnimation />
          </div>
        </div>
      </div>

      {/* Why Choose React Section */}
      <div className="py-20" style={{ backgroundColor: '#f8fafc' }}>
        <div className="container mx-auto px-6">
          <div data-animate id="why-choose" className={`text-center mb-16 transition-all duration-1000 ${isVisible['why-choose'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-4xl font-bold mb-4" style={{ color: '#203f78' }}>Why Choose React for Your Business?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              React offers exceptional advantages that make it the preferred choice for modern web development
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, idx) => (
              <div
                key={idx}
                data-animate
                id={`benefit-${idx}`}
                className={`bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-500 ${
                  isVisible[`benefit-${idx}`] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                <div className="w-16 h-16 rounded-lg flex items-center justify-center mb-4" style={{ backgroundColor: '#203f78' }}>
                  <benefit.icon className="text-white" size={32} />
                </div>
                <h3 className="text-xl font-bold mb-3" style={{ color: '#203f78' }}>{benefit.title}</h3>
                <p className="text-gray-600">{benefit.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h3 className="text-2xl font-bold mb-4" style={{ color: '#203f78' }}>Enhanced User Experience</h3>
              <p className="text-gray-600 mb-4">
                React's declarative UI approach enables the creation of highly interactive and responsive interfaces. Breaking down UIs into manageable components ensures a smooth and intuitive user experience.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h3 className="text-2xl font-bold mb-4" style={{ color: '#203f78' }}>Scalability & Future-Proof</h3>
              <p className="text-gray-600 mb-4">
                React's scalability ensures applications can grow with changing business needs. The React team continuously researches new approaches, ensuring seamless transitions and future-proof development.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Advanced Features */}
      <div className="container mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold text-center mb-16" style={{ color: '#203f78' }}>Advanced Features of React</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          {advancedFeatures.map((feature, idx) => (
            <div
              key={idx}
              data-animate
              id={`advanced-${idx}`}
              className={`bg-gradient-to-br from-white to-gray-50 p-6 rounded-lg border-l-4 hover:shadow-lg transition-all duration-500 ${
                isVisible[`advanced-${idx}`] ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
              }`}
              style={{ borderColor: '#203f78', transitionDelay: `${idx * 100}ms` }}
            >
              <h3 className="text-xl font-bold mb-2" style={{ color: '#203f78' }}>{feature.title}</h3>
              <p className="text-gray-600">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* React Ecosystem */}
      <div className="py-20" style={{ background: 'linear-gradient(135deg, #203f78 0%, #1a3360 100%)' }}>
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-4 text-white">React Ecosystem</h2>
          <p className="text-center text-gray-200 mb-12 text-lg">Powerful tools and frameworks that extend React's capabilities</p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {ecosystem.map((tool, idx) => (
              <div
                key={idx}
                className="bg-white bg-opacity-10 backdrop-blur-lg p-6 rounded-lg border border-white border-opacity-20 hover:bg-opacity-20 transition"
              >
                <h3 className="text-xl font-bold mb-2 text-cyan-400">{tool.name}</h3>
                <p className="text-gray-200">{tool.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Development Tools */}
      <div className="container mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold text-center mb-12" style={{ color: '#203f78' }}>Development Tools & Best Practices</h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center p-6">
            <div className="w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: '#203f78' }}>
              <Code className="text-white" size={36} />
            </div>
            <h3 className="text-xl font-bold mb-2" style={{ color: '#203f78' }}>React DevTools</h3>
            <p className="text-gray-600">Debug and inspect component hierarchies with ease</p>
          </div>
          
          <div className="text-center p-6">
            <div className="w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: '#203f78' }}>
              <Box className="text-white" size={36} />
            </div>
            <h3 className="text-xl font-bold mb-2" style={{ color: '#203f78' }}>Storybook</h3>
            <p className="text-gray-600">Develop and test UI components in isolation</p>
          </div>
          
          <div className="text-center p-6">
            <div className="w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: '#203f78' }}>
              <Cpu className="text-white" size={36} />
            </div>
            <h3 className="text-xl font-bold mb-2" style={{ color: '#203f78' }}>TypeScript Integration</h3>
            <p className="text-gray-600">Static type checking for enhanced code quality</p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20" style={{ background: 'linear-gradient(135deg, #203f78 0%, #1a3360 100%)' }}>
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Why Choose Technoviz Automation?</h2>
          <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto">
            We leverage React to create high-performance, scalable, and visually striking web applications tailored to your business needs
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
            <div className="bg-white bg-opacity-10 backdrop-blur-lg p-6 rounded-lg">
              <h3 className="text-lg font-bold text-cyan-400 mb-2">Component Optimization</h3>
              <p className="text-gray-200 text-sm">Using memoization to prevent unnecessary re-renders</p>
            </div>
            <div className="bg-white bg-opacity-10 backdrop-blur-lg p-6 rounded-lg">
              <h3 className="text-lg font-bold text-cyan-400 mb-2">State Management</h3>
              <p className="text-gray-200 text-sm">Implementing Redux or Context API solutions</p>
            </div>
            <div className="bg-white bg-opacity-10 backdrop-blur-lg p-6 rounded-lg">
              <h3 className="text-lg font-bold text-cyan-400 mb-2">Testing & Debugging</h3>
              <p className="text-gray-200 text-sm">Using Jest and React Testing Library</p>
            </div>
          </div>
          
           <Link
              to="/contact" className="bg-cyan-400 text-gray-900 px-12 py-4 rounded-lg font-bold text-lg hover:bg-cyan-300 transition">
            Start Your React Project Today
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ReactPage;