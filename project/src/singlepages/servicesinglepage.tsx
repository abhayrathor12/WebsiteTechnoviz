import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  ArrowRight, 
  CheckCircle, 
  Star, 
  Zap, 
  Shield, 
  Clock,
  Mail,
  Award,
  Lightbulb,
  Target,
  Cog,
  TrendingUp,
  ExternalLink
} from 'lucide-react';
import { services } from '../data/singlepagemockdata';
import { useParams, Link } from 'react-router-dom';

const SingleServicePage: React.FC = () => {
const { slug } = useParams<{ slug: string }>();
  const service = services.find((s) => s.slug === slug);

  if (!service) {
    return <div className="text-center py-20">Service not found.</div>;
  }

  // Get other services for the "Explore More Services" section
  const otherServices = services.filter((s) => s.slug !== slug);

  const { ref: heroRef, inView: heroInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const { ref: contentRef, inView: contentInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const { ref: featuresRef, inView: featuresInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const { ref: exploreRef, inView: exploreInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const benefitIcons = [
    { icon: TrendingUp, text: "Increased Efficiency", color: "bg-green-500" },
    { icon: Shield, text: "Enhanced Security", color: "bg-blue-500" },
    { icon: Clock, text: "Time Savings", color: "bg-purple-500" },
    { icon: Award, text: "Quality Assurance", color: "bg-yellow-500" }
  ];

  const featureIcons = {
    'Online Production Systems': Cog,
    'E-logbooks': CheckCircle,
    'Reports & Analysis': TrendingUp,
    'Maintenance Management': Shield,
    'ERP Integration': Lightbulb
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Enhanced Hero Section with #203f78 theme */}
      <section ref={heroRef} className="relative bg-gradient-to-br from-[#203f78] via-[#2d4a8a] to-[#1a3564] py-20 overflow-hidden">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25px 25px, white 2%, transparent 0%), 
                             radial-gradient(circle at 75px 75px, white 1%, transparent 0%)`,
            backgroundSize: '100px 100px'
          }}></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center p-2">
            {/* Hero Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={heroInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <div className="inline-flex items-center bg-white/95 backdrop-blur-sm text-[#203f78] px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                <Star className="w-4 h-4 mr-2 text-[#ddaf26]" />
                {service.category}
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 font-poppins leading-tight">
                {service.title}
              </h1>
              
              <p className="text-xl text-gray-200 leading-relaxed">
                {service.short_description}
              </p>

              {/* Quick Benefits */}
              <div className="grid grid-cols-2 gap-4 mt-8">
                {benefitIcons.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={heroInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                    className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-lg p-3"
                  >
                    <div className={`${benefit.color} p-2 rounded-lg`}>
                      <benefit.icon className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-white font-medium">{benefit.text}</span>
                  </motion.div>
                ))}
              </div>

              <Link
  to="/contact"
                  className="group inline-flex items-center bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-white transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
                  style={{ color: '#203f78' }}
                >
                  <Mail className="w-5 h-5" />
                  <span>Get Started</span>
                </Link>
            </motion.div>

            {/* Hero Image */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={heroInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative"
            >
              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-r from-[#ddaf26] to-[#203f78] rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity"></div>
                <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                  <img
                    src={service.hero_image}
                    alt={service.title}
                    className="w-full h-[400px] object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#203f78]/30 to-transparent"></div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section ref={contentRef} className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={contentInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center mb-16"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-[#203f78] rounded-full mb-6">
              <Lightbulb className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-4xl font-bold text-[#203f78] mb-6 font-poppins">
              About {service.title}
            </h2>
            <div className="w-24 h-1 bg-[#ddaf26] mx-auto mb-8"></div>
            <p className="text-lg text-gray-700 leading-relaxed whitespace-pre-line">
              {service.long_description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          {/* Key Features */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={featuresInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-[#203f78] font-poppins mb-4">Key Features</h3>
              <p className="text-lg text-gray-600">Powerful capabilities designed for your success</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {service.features.map((feature, index) => {
                const IconComponent = featureIcons[feature] || Target;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={featuresInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="group p-6 bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-[#203f78] rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-[#203f78] mb-2">{feature}</h4>
                        <div className="w-8 h-1 bg-[#ddaf26] group-hover:w-full transition-all duration-300"></div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Detailed Features */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={featuresInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-[#203f78] font-poppins mb-4">Detailed Features</h3>
              <p className="text-lg text-gray-600">In-depth look at what makes our solution unique</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {service.detailed_features.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  animate={featuresInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.4 + idx * 0.1 }}
                  className="group p-8 bg-white rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-300"
                >
                  <div className="flex items-start space-x-4 mb-4">
                    <div className="flex-shrink-0 w-14 h-14 bg-[#203f78] rounded-2xl flex items-center justify-center">
                      <Zap className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-[#203f78] mb-2">{item.title}</h4>
                      <div className="w-12 h-1 bg-[#ddaf26] group-hover:w-full transition-all duration-500"></div>
                    </div>
                  </div>
                  <p className="text-gray-600 leading-relaxed pl-18">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Explore More Services Section */}
      <section ref={exploreRef} className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={exploreInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h3 className="text-3xl font-bold text-[#203f78] font-poppins mb-4">Explore More Services</h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover our comprehensive range of solutions designed to transform your business operations
            </p>
            <div className="w-24 h-1 bg-[#ddaf26] mx-auto mt-4"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {otherServices.slice(0, 3).map((otherService, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={exploreInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
              >
                {/* Service Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={otherService.hero_image}
                    alt={otherService.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#203f78]/60 to-transparent"></div>
                  <div className="absolute top-4 left-4">
                    <span className="bg-[#ddaf26] text-[#203f78] px-3 py-1 rounded-full text-sm font-semibold">
                      {otherService.category}
                    </span>
                  </div>
                </div>

                {/* Service Content */}
                <div className="p-6">
                  <h4 className="text-xl font-bold text-[#203f78] mb-3 group-hover:text-[#ddaf26] transition-colors">
                    {otherService.title}
                  </h4>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {otherService.short_description}
                  </p>

                  {/* Features Preview */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {otherService.features.slice(0, 3).map((feature, idx) => (
                      <span
                        key={idx}
                        className="bg-[#203f78]/10 text-[#203f78] px-2 py-1 rounded-md text-xs font-medium"
                      >
                        {feature}
                      </span>
                    ))}
                    {otherService.features.length > 3 && (
                      <span className="bg-gray-100 text-gray-500 px-2 py-1 rounded-md text-xs font-medium">
                        +{otherService.features.length - 3} more
                      </span>
                    )}
                  </div>

                  {/* Learn More Link */}
                  <Link
                    to={`/services/${otherService.slug}`}
                    className="group/link inline-flex items-center text-[#203f78] font-semibold hover:text-[#ddaf26] transition-colors"
                  >
                    Learn More
                    <ExternalLink className="w-4 h-4 ml-2 group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
                  </Link>
                </div>

                {/* Hover Effect Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#203f78]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </motion.div>
            ))}
          </div>

          {/* View All Services Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={exploreInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-center mt-12"
          >
            <Link
              to="/services"
              className="group inline-flex items-center bg-[#203f78] text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-[#ddaf26] hover:text-[#203f78] transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              View All Services
              <ArrowRight className="w-6 h-6 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Enhanced CTA Section with #203f78 theme */}
      <section className="py-20 bg-gradient-to-r from-[#203f78] to-[#2d4a8a] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-y-12"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={featuresInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h3 className="text-4xl font-bold text-white mb-6 font-poppins">
              Ready to Transform Your Business?
            </h3>
            <p className="text-xl text-gray-200 mb-8">
              Join thousands of companies that have already revolutionized their operations with our {service.title} solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              
              <Link
  to="/contact" className="group inline-flex items-center bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-[#203f78] transition-all duration-300">
                Schedule a Demo
                <Lightbulb className="w-6 h-6 ml-2 group-hover:rotate-12 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default SingleServicePage;