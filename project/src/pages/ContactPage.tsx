import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, Building2, Globe } from 'lucide-react';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    timeline: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    const response = await fetch("http://192.168.1.3:8000/api/con/create/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      setIsSubmitted(true);
      setFormData({
        name: "",
        email: "",
        company: "",
        phone: "",
        timeline: "",
        message: "",
      });
      setTimeout(() => setIsSubmitted(false), 3000);
    } else {
      console.error("Failed to submit form");
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Animation variants for the floating contact elements
  const floatingVariants = {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const rotatingVariants = {
    animate: {
      rotate: 360,
      transition: {
        duration: 20,
        repeat: Infinity,
        ease: "linear"
      }
    }
  };

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-[#203f78] to-[#2c5aa0] text-white overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-6 font-poppins">
                Let's Connect & Build
                <span className="block text-yellow-400">Amazing Solutions</span>
              </h1>
              <p className="text-xl text-gray-200 leading-relaxed">
                Ready to transform your business with cutting-edge automation and technology? 
                Our experts are here to help you achieve your goals.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">24h Response</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
                  <Globe className="w-4 h-4" />
                  <span className="text-sm">Global Reach</span>
                </div>
              </div>
            </motion.div>

            {/* Right side - Animated Contact Elements */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative h-96 hidden lg:block"
            >
              {/* Central rotating circle */}
              <motion.div
                variants={rotatingVariants}
                animate="animate"
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 border-2 border-yellow-400/30 rounded-full"
              />
              
              {/* Floating contact cards */}
              <motion.div
                variants={floatingVariants}
                animate="animate"
                className="absolute top-8 right-8 bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/20"
              >
                <Phone className="w-6 h-6 text-yellow-400 mb-2" />
                <p className="text-sm text-gray-200">Quick Call</p>
              </motion.div>

              <motion.div
                variants={floatingVariants}
                animate="animate"
                style={{ animationDelay: '0.5s' }}
                className="absolute bottom-8 left-8 bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/20"
              >
                <Mail className="w-6 h-6 text-yellow-400 mb-2" />
                <p className="text-sm text-gray-200">Email Us</p>
              </motion.div>

              <motion.div
                variants={floatingVariants}
                animate="animate"
                style={{ animationDelay: '1s' }}
                className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/20"
              >
                <MapPin className="w-6 h-6 text-yellow-400 mb-2" />
                <p className="text-sm text-gray-200">Visit Us</p>
              </motion.div>

              <motion.div
                variants={floatingVariants}
                animate="animate"
                style={{ animationDelay: '1.5s' }}
                className="absolute bottom-1/4 right-1/3 bg-white/10 backdrop-blur-sm p-3 rounded-lg border border-white/20"
              >
                <Building2 className="w-5 h-5 text-yellow-400" />
              </motion.div>

              {/* Decorative elements */}
              <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
              <div className="absolute bottom-1/3 left-1/2 w-3 h-3 bg-blue-300 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
              <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-green-300 rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
            </motion.div>
          </div>
        </div>
      </section>

        <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-bold text-[#203f78] mb-8 font-poppins">
                Tell Us About Your Project
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#203f78] focus:border-transparent transition-colors"
                      placeholder="Your full name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#203f78] focus:border-transparent transition-colors"
                      placeholder="your.email@company.com"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Company
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#203f78] focus:border-transparent transition-colors"
                      placeholder="Your company name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#203f78] focus:border-transparent transition-colors"
                      placeholder="+91-9999765380"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Project Timeline
                  </label>
                  <select
                    name="timeline"
                    value={formData.timeline}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#203f78] focus:border-transparent transition-colors"
                  >
                    <option value="">Select timeline</option>
                    <option value="asap">ASAP</option>
                    <option value="1-3months">1-3 months</option>
                    <option value="3-6months">3-6 months</option>
                    <option value="6months+">6+ months</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Project Details *
                  </label>
                  <textarea
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#203f78] focus:border-transparent transition-colors resize-none"
                    placeholder="Tell us about your project, goals, specific requirements, and any technical details..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitted}
                  className="w-full bg-[#203f78] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#2c5aa0] transition-all duration-200 hover:-translate-y-0.5 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSubmitted ? (
                    <>
                      <CheckCircle className="w-5 h-5" />
                      Message Sent Successfully!
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-2xl font-bold text-[#203f78] mb-6 font-poppins">
                  Get in Touch
                </h3>
                <p className="text-gray-600 mb-8">
                  We'd love to hear about your automation and technology needs. Send us a message and we'll respond within 24 hours.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#203f78]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-[#203f78]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">India Office</h4>
                    <p className="text-gray-600">311, Paras Trade Center<br />Sector-2, Gurgaon - 122011<br />Haryana, India</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#203f78]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Building2 className="w-6 h-6 text-[#203f78]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">UAE Office</h4>
                    <p className="text-gray-600">Easy Access Business Center<br />AI Abbas Building-2, Al Mankhool<br />Dubai, UAE</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#203f78]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-[#203f78]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">Phone Numbers</h4>
                    <p className="text-gray-600">+91-9999765380<br />0124-4424695</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#203f78]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-[#203f78]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">Email Address</h4>
                    <p className="text-gray-600">support@technovizautomation.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#203f78]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-[#203f78]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">Business Hours</h4>
                    <p className="text-gray-600">Monday - Friday: 9:00 AM - 6:00 PM IST<br />Weekend: By appointment</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-[#203f78] to-[#2c5aa0] rounded-2xl p-6 text-white">
                <h4 className="font-bold text-lg mb-2">Quick Response Guarantee</h4>
                <p className="text-gray-200 text-sm">
                  We understand that timing is crucial for your automation needs. That's why we guarantee a response within 24 hours for all project inquiries.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Google Maps Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-[#203f78] mb-4 font-poppins">
              Find Us Here
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Visit our offices in Gurgaon, India or Dubai, UAE. We're always ready to welcome you for a face-to-face discussion about your automation projects.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* India Office Map */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden"
            >
              <div className="p-6 border-b">
                <h3 className="text-xl font-bold text-[#203f78] mb-2">India Office - Gurgaon</h3>
                <p className="text-gray-600 text-sm">311, Paras Trade Center, Sector-2, Gurgaon - 122011</p>
              </div>
              <div className="h-80">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3508.419547890604!2d77.13254877421431!3d28.436766592945972!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d1f2707809f2d%3A0xddc66a38276e7301!2sTechnoviz%20Automation%20Solutions!5e0!3m2!1sen!2sin!4v1758719709109!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </motion.div>

            {/* UAE Office Map */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden"
            >
              <div className="p-6 border-b">
                <h3 className="text-xl font-bold text-[#203f78] mb-2">UAE Office - Dubai</h3>
                <p className="text-gray-600 text-sm">AI Abbas Building-2, Al Mankhool, Dubai</p>
              </div>
              <div className="h-80">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d115509.33154040827!2d55.13993913623719!3d25.214463223301987!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f439aabd305cb%3A0xbde07ee43d51eaf!2sAl%20abbas%20building%202!5e0!3m2!1sen!2sin!4v1758719927686!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;