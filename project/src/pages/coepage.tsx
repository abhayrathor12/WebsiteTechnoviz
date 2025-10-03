import  { useRef, useEffect } from 'react';
import { Award, Users, BookOpen, TrendingUp, Building, Target, Lightbulb, Globe, Briefcase, GraduationCap } from 'lucide-react';
import * as THREE from 'three';
import coe1 from "../public/coe1.webp"
import coe2 from "../public/coe2.webp"
import { Link } from "react-router-dom";

const CoePage = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Three.js 3D Animation Setup - Industrial Automation Theme
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(400, 400);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    // Create industrial automation elements
    const elements: { mesh: any; rotationSpeed: { x: number; y: number; z: number; } | { x: number; y: number; z: number; } | { x: number; y: number; z: number; }; orbitRadius?: number; orbitSpeed?: number; orbitOffset?: number; }[] = [];

    // Central hub - representing the CoE
    const hubGeometry = new THREE.SphereGeometry(0.8, 16, 12);
    const hubMaterial = new THREE.MeshBasicMaterial({ 
      color: 0x203f78, 
      wireframe: false,
      transparent: true,
      opacity: 0.9
    });
    const hub = new THREE.Mesh(hubGeometry, hubMaterial);
    scene.add(hub);
    elements.push({ mesh: hub, rotationSpeed: { x: 0.005, y: 0.01, z: 0 } });

    // Orbital rings representing different technology domains
    const createOrbitRing = (radius: number, color: number, _thickness = 0.05) => {
      const curve = new THREE.EllipseCurve(0, 0, radius, radius, 0, 2 * Math.PI, false, 0);
      const points = curve.getPoints(64);
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const material = new THREE.LineBasicMaterial({ 
        color: color, 
        transparent: true, 
        opacity: 0.6 
      });
      return new THREE.Line(geometry, material);
    };

    // Create multiple orbital rings
    const ring1 = createOrbitRing(1.5, 0xddaf26);
    const ring2 = createOrbitRing(2.0, 0x4a90e2);
    const ring3 = createOrbitRing(2.5, 0x203f78);
    
    ring1.rotation.x = Math.PI / 2;
    ring2.rotation.x = Math.PI / 3;
    ring2.rotation.z = Math.PI / 4;
    ring3.rotation.x = Math.PI / 4;
    ring3.rotation.y = Math.PI / 6;

    scene.add(ring1, ring2, ring3);
    elements.push(
      { mesh: ring1, rotationSpeed: { x: 0, y: 0.008, z: 0 } },
      { mesh: ring2, rotationSpeed: { x: 0.006, y: 0, z: 0.004 } },
      { mesh: ring3, rotationSpeed: { x: 0.004, y: 0.006, z: 0 } }
    );

    // Floating tech nodes - representing different technologies
    const createTechNode = (position: { x: any; y: any; z: any; }, color: number, shape = 'cube') => {
      let geometry;
      switch (shape) {
        case 'cube':
          geometry = new THREE.BoxGeometry(0.3, 0.3, 0.3);
          break;
        case 'pyramid':
          geometry = new THREE.TetrahedronGeometry(0.25);
          break;
        case 'octahedron':
          geometry = new THREE.OctahedronGeometry(0.2);
          break;
        default:
          geometry = new THREE.BoxGeometry(0.3, 0.3, 0.3);
      }
      
      const material = new THREE.MeshBasicMaterial({ 
        color: color,
        transparent: true,
        opacity: 0.8,
        wireframe: true
      });
      
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(position.x, position.y, position.z);
      return mesh;
    };

    // Create tech nodes representing different aspects of automation
    const techNodes = [
      { pos: { x: 2.2, y: 0.5, z: 0 }, color: 0xddaf26, shape: 'cube' },     // IoT
      { pos: { x: -2.0, y: 0.8, z: 0.5 }, color: 0x4a90e2, shape: 'pyramid' }, // AI
      { pos: { x: 0.5, y: -2.1, z: 0.3 }, color: 0x203f78, shape: 'octahedron' }, // Robotics
      { pos: { x: -0.8, y: 2.3, z: -0.4 }, color: 0xddaf26, shape: 'cube' },  // Industry 4.0
      { pos: { x: 1.8, y: -1.5, z: -0.6 }, color: 0x4a90e2, shape: 'pyramid' }, // Cybersecurity
      { pos: { x: -2.5, y: -0.3, z: 0.8 }, color: 0x203f78, shape: 'octahedron' } // Automation
    ];

    techNodes.forEach((node, index) => {
      const techNode = createTechNode(node.pos, node.color, node.shape);
      scene.add(techNode);
      elements.push({ 
        mesh: techNode, 
        rotationSpeed: { 
          x: 0.01 + (index * 0.002), 
          y: 0.008 + (index * 0.001), 
          z: 0.006 + (index * 0.0015) 
        },
        orbitRadius: Math.sqrt(node.pos.x * node.pos.x + node.pos.y * node.pos.y),
        orbitSpeed: 0.003 + (index * 0.0005),
        orbitOffset: index * Math.PI / 3
      });
    });

    // Connecting lines between nodes (representing data flow)
    const createConnectionLine = (start: { x: any; y: any; z: any; }, end: { x: any; y: any; z: any; }, color: number) => {
      const geometry = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(start.x, start.y, start.z),
        new THREE.Vector3(end.x, end.y, end.z)
      ]);
      const material = new THREE.LineBasicMaterial({ 
        color: color, 
        transparent: true, 
        opacity: 0.3 
      });
      return new THREE.Line(geometry, material);
    };

    // Add some connection lines
    const connections = [
      createConnectionLine({ x: 0, y: 0, z: 0 }, techNodes[0].pos, 0xddaf26),
      createConnectionLine({ x: 0, y: 0, z: 0 }, techNodes[1].pos, 0x4a90e2),
      createConnectionLine({ x: 0, y: 0, z: 0 }, techNodes[2].pos, 0x203f78),
      createConnectionLine(techNodes[0].pos, techNodes[4].pos, 0xddaf26),
      createConnectionLine(techNodes[1].pos, techNodes[5].pos, 0x4a90e2)
    ];

    connections.forEach(line => scene.add(line));

    // Particle system for dynamic effect
    const particleGeometry = new THREE.BufferGeometry();
    const particleCount = 50;
    const positions = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 8;     // x
      positions[i + 1] = (Math.random() - 0.5) * 8; // y  
      positions[i + 2] = (Math.random() - 0.5) * 8; // z
    }
    
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMaterial = new THREE.PointsMaterial({ 
      color: 0xddaf26, 
      size: 0.05,
      transparent: true,
      opacity: 0.6
    });
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    camera.position.z = 5;
    camera.position.y = 1;

    let time = 0;

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      time += 0.01;
      
      // Animate all elements
      elements.forEach((element, index) => {
        const { mesh, rotationSpeed, orbitRadius, orbitSpeed, orbitOffset } = element;
        
        // Rotate the mesh
        mesh.rotation.x += rotationSpeed.x;
        mesh.rotation.y += rotationSpeed.y;
        mesh.rotation.z += rotationSpeed.z;
        
        // Orbital motion for tech nodes
        if (orbitRadius && orbitSpeed && orbitOffset !== undefined) {
          const angle = time * orbitSpeed + orbitOffset;
          const originalPos = techNodes[index - 3]; // Adjust index for tech nodes
          if (originalPos) {
            mesh.position.x = originalPos.pos.x + Math.cos(angle) * 0.3;
            mesh.position.z = originalPos.pos.z + Math.sin(angle) * 0.3;
            mesh.position.y = originalPos.pos.y + Math.sin(time * 2 + orbitOffset) * 0.1;
          }
        }
      });
      
      // Animate particles
      const positions = particles.geometry.attributes.position.array;
      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 1] += Math.sin(time + i) * 0.001; // Gentle floating motion
      }
      particles.geometry.attributes.position.needsUpdate = true;
      particles.rotation.y += 0.002;
      
      // Gentle camera movement
      camera.position.x = Math.sin(time * 0.2) * 0.5;
      camera.position.y = 1 + Math.cos(time * 0.15) * 0.3;
      camera.lookAt(0, 0, 0);
      
      renderer.render(scene, camera);
    };
    
    animate();

    // Cleanup
    return () => {
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  const benefits = [
    {
      icon: <BookOpen className="w-8 h-8 text-[#203f78]" />,
      title: "Hands-On Experience",
      description: "Practical training and hands-on experience in digital technologies and cybersecurity, enhancing their employability and readiness for the industry."
    },
    {
      icon: <Users className="w-8 h-8 text-[#ddaf26]" />,
      title: "Collaboration Opportunities",
      description: "Between academia and industry through research projects, internships, and industry partnerships, the CoE will offer students unparalleled networking opportunities."
    },
    {
      icon: <GraduationCap className="w-8 h-8 text-[#203f78]" />,
      title: "Industry-Relevant Curriculum",
      description: "Integration of cutting-edge modules into the existing academic curriculum, ensuring that students are equipped with skills demanded by the rapidly evolving digital landscape."
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-[#ddaf26]" />,
      title: "Enhanced Employability",
      description: "Students become highly sought after by employers due to their in-demand skills and practical experience, enhancing their career prospects and job readiness."
    },
    {
      icon: <Globe className="w-8 h-8 text-[#203f78]" />,
      title: "Economic Growth",
      description: "Producing a skilled workforce capable of driving digital transformation will contribute to economic growth and competitiveness, both locally and globally."
    },
    {
      icon: <Briefcase className="w-8 h-8 text-[#ddaf26]" />,
      title: "Professional Growth",
      description: "Through workshops, seminars, training sessions, and internships, students will have opportunities for personal and professional development in the digital economy."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-[#203f78] via-[#2a4a88] to-[#203f78] text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-[#ddaf26] rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
          <div className="absolute top-40 right-10 w-96 h-96 bg-[#203f78] rounded-full mix-blend-multiply filter blur-xl opacity-15 animate-pulse animation-delay-2000"></div>
          <div className="absolute bottom-20 left-1/2 w-80 h-80 bg-[#ddaf26] rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse animation-delay-4000"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Text */}
            <div>
              <div className="flex items-center mb-6">
                <div className="p-3 bg-[#ddaf26] bg-opacity-20 rounded-full backdrop-blur-sm">
                  <Award className="w-12 h-12 text-[#ddaf26]" />
                </div>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Center of
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#ddaf26] to-yellow-200">
                  Excellence
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed">
                Advancing industrial automation through cutting-edge technologies and innovative processes
              </p>
              <div className="mt-8">
                <Link
                  to="/contact" className="bg-[#ddaf26] text-[#203f78] px-8 py-4 rounded-full font-semibold text-lg hover:bg-yellow-400 transform hover:scale-105 transition-all duration-300 shadow-2xl">
                  Connect To Explore
                </Link>
              </div>
            </div>
            
            {/* Right side - 3D Animation */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                <div ref={mountRef} className="w-96 h-96"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#ddaf26] to-transparent opacity-20 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="flex items-center mb-6">
              <Target className="w-8 h-8 text-[#203f78] mr-3" />
              <h2 className="text-4xl font-bold text-[#203f78]">About Our Center of Excellence</h2>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              At Technoviz Automation, we are committed to advancing the field of industrial automation through our dedicated Center of Excellence (CoE). This specialized unit is designed to harness cutting-edge technologies and innovative processes that drive efficiency, enhance productivity, and streamline operations across all industry sectors.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Our CoE serves as a hub for innovation, where expertise meets creativity to solve tomorrow's challenges today.
            </p>
            <div className="mt-8 flex items-center space-x-4">
              <div className="flex items-center">
                <Lightbulb className="w-6 h-6 text-[#ddaf26] mr-2" />
                <span className="text-gray-700 font-medium">Innovation Hub</span>
              </div>
              <div className="flex items-center">
                <Building className="w-6 h-6 text-[#203f78] mr-2" />
                <span className="text-gray-700 font-medium">Industry Focus</span>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="bg-[#203f78] rounded-2xl p-2 transform rotate-2 shadow-2xl">
              <div className="bg-white rounded-xl overflow-hidden">
                <img 
                  src={coe1}
                  alt="Center of Excellence Facilities" 
                  className="w-full h-96 object-cover transform -rotate-2 hover:rotate-0 transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#203f78] mb-4">Why Choose Our Center of Excellence?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our comprehensive approach ensures students and industry partners benefit from cutting-edge education and practical experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div 
                key={index}
                className="group bg-gray-50 rounded-2xl p-8 hover:bg-white hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 hover:border-[#ddaf26]"
              >
                <div className="flex items-center justify-center w-16 h-16 bg-white rounded-xl shadow-lg group-hover:shadow-xl transition-shadow duration-300 mb-6">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{benefit.title}</h3>
                <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Partnership Section */}
      <div className="bg-gradient-to-r from-[#203f78] to-[#2a4a88] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left side - Image */}
            <div className="relative">
              <div className="bg-[#ddaf26] rounded-2xl p-4 transform -rotate-2 shadow-2xl">
                <img 
                  src={coe2} 
                  alt="Partnership and Collaboration" 
                  className="w-full h-80 object-cover rounded-xl transform rotate-2 hover:rotate-0 transition-transform duration-500"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-xl shadow-xl">
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#203f78]">100%</div>
                  <div className="text-sm text-gray-600">Partnership Success</div>
                </div>
              </div>
            </div>
            
            {/* Right side - Content */}
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-8">
                Establishment of a Centre of Excellence
              </h2>
              <p className="text-xl text-gray-200 leading-relaxed mb-6">
                At University/College represents a unique opportunity to bridge the gap between academia and industry, 
                empower students with practical skills and knowledge, and drive innovation and economic growth.
              </p>
              <p className="text-lg text-gray-300 mb-8">
                We look forward to partnering with University/college on this transformative initiative and making 
                a lasting impact on the future of digital education and technology-driven innovation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/contact" className="bg-[#ddaf26] hover:bg-yellow-400 text-[#203f78] px-8 py-4 rounded-full font-semibold text-lg transition-colors duration-300 shadow-lg">
                  Partner With Us
                </Link>
                <Link
                  to="/company"  className="border-2 border-[#ddaf26] text-[#ddaf26] hover:bg-[#ddaf26] hover:text-[#203f78] px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300">
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Video Section */}
      <div className="bg-gray-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#203f78] mb-4">Experience Our Center of Excellence</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Take a virtual tour of our state-of-the-art facilities and see how we're shaping the future of industrial automation education
            </p>
          </div>
          
          <div className="relative max-w-4xl mx-auto">
            <div className="bg-[#203f78] p-2 rounded-2xl shadow-2xl">
            <div className="bg-black rounded-xl overflow-hidden relative">
                <iframe
                className="w-full h-96 rounded-xl"
                src="https://www.youtube.com/embed/XUH_k3acpgA"
                title="Center of Excellence Tour"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                ></iframe>
            </div>
            </div>
            
          </div>
        </div>
      </div>
      
      {/* Related Solutions Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#203f78] mb-4">Explore More</h2>
            <p className="text-xl text-gray-600">Discover our complementary offerings for holistic learning and development</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* SLM Card */}
            <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="space-y-6">
                <div>
                  <div className="inline-block bg-[#203f78] text-white px-4 py-1 rounded-full text-sm font-medium mb-4">
                    SLM
                  </div>
                  <h3 className="text-2xl font-bold text-[#203f78] mb-3">
                    Smart Learning Module (SLM)
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Empowering learners with interactive, AI-driven, and self-paced digital learning solutions.
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-[#203f78] rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <p className="font-semibold text-gray-900">AI-Powered Personalization</p>
                      <p className="text-sm text-gray-600">Adaptive learning paths tailored to individual needs</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-[#203f78] rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <p className="font-semibold text-gray-900">Gamified Learning</p>
                      <p className="text-sm text-gray-600">Interactive modules and challenges for engagement</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-[#203f78] rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <p className="font-semibold text-gray-900">Practical Simulations</p>
                      <p className="text-sm text-gray-600">Real-world scenarios and virtual labs</p>
                    </div>
                  </div>
                </div>

                <Link
                  to="/slm"
                  className="block w-full bg-[#203f78] hover:bg-[#ddaf26] text-white text-center px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Explore More
                </Link>
              </div>
            </div>

            {/* Book Card */}
            <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="space-y-6">
                <div>
                  <div className="inline-block bg-[#203f78] text-white px-4 py-1 rounded-full text-sm font-medium mb-4">
                    📚 Publication
                  </div>
                  <h3 className="text-2xl font-bold text-[#203f78] mb-3">
                    Digital Revolution Guide
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Navigate the Digital Revolution and master Industry 4.0 & Industrial IoT with expert insights.
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-[#ddaf26] rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <p className="font-semibold text-gray-900">Comprehensive Coverage</p>
                      <p className="text-sm text-gray-600">Industry 4.0, IoT, and digital transformation strategies</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-[#ddaf26] rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <p className="font-semibold text-gray-900">Practical Insights</p>
                      <p className="text-sm text-gray-600">Real-world implementation strategies and best practices</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-[#ddaf26] rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <p className="font-semibold text-gray-900">Expert Guidance</p>
                      <p className="text-sm text-gray-600">Written by industry expert Kapil Khurana</p>
                    </div>
                  </div>
                </div>

                <Link
                  to="/book"
                  className="block w-full bg-[#203f78] hover:bg-[#ddaf26] text-white text-center px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Explore More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <div className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="bg-[#203f78]  p-12 text-white">
                <h3 className="text-3xl font-bold mb-6">Ready to Transform Education?</h3>
                <p className="text-blue-100 text-lg mb-8">
                  Join us in creating the next generation of skilled professionals ready for the digital economy.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-[#ddaf26] rounded-full mr-4"></div>
                    <span>Industry-leading curriculum</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-[#ddaf26] rounded-full mr-4"></div>
                    <span>Expert faculty and mentors</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-[#ddaf26] rounded-full mr-4"></div>
                    <span>State-of-the-art facilities</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-[#ddaf26] rounded-full mr-4"></div>
                    <span>Strong industry partnerships</span>
                  </div>
                </div>
              </div>
              
              <div className="p-12">
                <h4 className="text-2xl font-bold text-[#203f78] mb-6">Get Started Today</h4>
                <p className="text-gray-600 mb-8">
                  Contact us to learn more about our Center of Excellence and how we can partner with your institution.
                </p>
                <Link
  to="/contact" className="w-full bg-[#203f78] hover:bg-[#2a4a88] text-white py-4 px-8 rounded-xl font-semibold text-lg transition-colors duration-300">
                  Contact Our Team
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoePage;