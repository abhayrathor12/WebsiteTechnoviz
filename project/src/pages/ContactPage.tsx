import SEO from "../components/SEO";
import { PAGE_SEO } from "../seo/pages.js";
import { API_BASE_URL } from "../api";
import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, Building2, Globe, Loader2, X } from 'lucide-react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    interestedIn: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successName, setSuccessName] = useState<string | null>(null); // set -> thank-you popup is open
  const [errorMessage, setErrorMessage] = useState('');
  const submittingRef = useRef(false); // blocks a second request even on a fast double click

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submittingRef.current) return;
    submittingRef.current = true;
    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const response = await fetch(`${API_BASE_URL}/con/create/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccessName(formData.name.trim());
        setFormData({
          name: "",
          email: "",
          company: "",
          phone: "",
          interestedIn: "",
          message: "",
        });
      } else {
        setErrorMessage("We couldn't send your message. Please check the details and try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("Network error. Please check your connection and try again.");
    } finally {
      submittingRef.current = false;
      setIsSubmitting(false);
    }
  };

  // Close the thank-you popup with Esc
  useEffect(() => {
    if (successName === null) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setSuccessName(null);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [successName]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

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
      <SEO {...PAGE_SEO["/contact"]} path="/contact" />
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-[#203f78] to-[#2c5aa0] text-white overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Let's Connect & Build
                <span className="block text-yellow-400">Amazing Solutions</span>
              </h1>
              <p className="text-xl text-gray-200 leading-relaxed">
                Ready to transform your business with cutting-edge automation and technology? 
                Our experts are here to help you achieve your goals.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <div className="flex items-center gap-2 bg

-white bg-opacity-10 px-4 py-2 rounded-full">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">24h Response</span>
                </div>
                <div className="flex items-center gap-2 bg-white bg-opacity-10 px-4 py-2 rounded-full">
                  <Globe className="w-4 h-4" />
                  <span className="text-sm">Global Reach</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative h-96 hidden lg:block"
            >
              <motion.div
                variants={rotatingVariants}
                animate="animate"
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 border-2 border-yellow-400 border-opacity-30 rounded-full"
              />
              
              <motion.div
                variants={floatingVariants}
                animate="animate"
                className="absolute top-8 right-8 bg-white bg-opacity-10 backdrop-blur-sm p-4 rounded-xl border border-white border-opacity-20"
              >
                <Phone className="w-6 h-6 text-yellow-400 mb-2" />
                <p className="text-sm text-gray-200">Quick Call</p>
              </motion.div>

              <motion.div
                variants={floatingVariants}
                animate="animate"
                style={{ animationDelay: '0.5s' }}
                className="absolute bottom-8 left-8 bg-white bg-opacity-10 backdrop-blur-sm p-4 rounded-xl border border-white border-opacity-20"
              >
                <Mail className="w-6 h-6 text-yellow-400 mb-2" />
                <p className="text-sm text-gray-200">Email Us</p>
              </motion.div>

              <motion.div
                variants={floatingVariants}
                animate="animate"
                style={{ animationDelay: '1s' }}
                className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white bg-opacity-10 backdrop-blur-sm p-4 rounded-xl border border-white border-opacity-20"
              >
                <MapPin className="w-6 h-6 text-yellow-400 mb-2" />
                <p className="text-sm text-gray-200">Visit Us</p>
              </motion.div>

              <motion.div
                variants={floatingVariants}
                animate="animate"
                style={{ animationDelay: '1.5s' }}
                className="absolute bottom-1/4 right-1/3 bg-white bg-opacity-10 backdrop-blur-sm p-3 rounded-lg border border-white border-opacity-20"
              >
                <Building2 className="w-5 h-5 text-yellow-400" />
              </motion.div>

              <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
              <div className="absolute bottom-1/3 left-1/2 w-3 h-3 bg-blue-300 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
              <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-green-300 rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
                Tell Us About Your Project
              </h2>
              <p className="text-gray-600 text-lg">
                Fill out the form below and we'll get back to you within 24 hours
              </p>
            </motion.div>

            <motion.form
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              onSubmit={handleSubmit}
              className="bg-gray-50 rounded-2xl p-8 md:p-12 shadow-xl"
            >
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-transparent transition-colors"
                      placeholder="Your full name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-transparent transition-colors"
                      placeholder="your.email@company.com"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Company
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-transparent transition-colors"
                      placeholder="Your company name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-transparent transition-colors"
                      placeholder="+91-9999765380"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Interested In
                  </label>
                  <select
                    name="interestedIn"
                    value={formData.interestedIn}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-transparent transition-colors"
                  >
                    <option value="">Select an option</option>
                    <optgroup label="Services">
                      <option value="Digitization">Digitization</option>
                      <option value="Industrial IoT">Industrial IoT</option>
                      <option value="Industrial Communication">Industrial Communication</option>
                      <option value="Industrial Cybersecurity">Industrial Cybersecurity</option>
                      <option value="Automation Services">Automation Services</option>
                      <option value="AI in Manufacturing">AI in Manufacturing</option>
                      <option value="Other (Services)">Other</option>
                    </optgroup>
                    <optgroup label="Solutions">
                      <option value="Immersix (AR/VR Training)">Immersix (AR/VR Training)</option>
                      <option value="Utility360">Utility360</option>
                      <option value="Digital Checksheet">Digital Checksheet</option>
                      <option value="SmartEMS">SmartEMS</option>
                      <option value="OEE Dashboard">OEE Dashboard</option>
                      <option value="VisionAI">VisionAI</option>
                      <option value="Other (Solutions)">Other</option>
                    </optgroup>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Project Details *
                  </label>
                  <textarea
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-transparent transition-colors resize-none"
                    placeholder="Tell us about your project, goals, specific requirements, and any technical details..."
                  />
                </div>

                {errorMessage && (
                  <p role="alert" className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
                    {errorMessage}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  aria-busy={isSubmitting}
                  className="w-full bg-[#203f78] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#ddaf26] transition-all duration-200 hover:-translate-y-0.5 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:bg-[#203f78] disabled:hover:translate-y-0"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </button>
              </div>
            </motion.form>
          </div>
        </div>
      </section>

      {/* Thank-you popup after the form is sent */}
      <AnimatePresence>
        {successName !== null && (
          <motion.div
            key="contact-success"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-4"
            onClick={() => setSuccessName(null)}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="contact-success-title"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-2xl"
            >
              <button
                type="button"
                onClick={() => setSuccessName(null)}
                aria-label="Close"
                className="absolute right-4 top-4 rounded-full p-1.5 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                <CheckCircle className="h-9 w-9 text-green-600" />
              </div>
              <h3 id="contact-success-title" className="text-2xl font-bold text-[#203f78]">
                Thank you{successName ? `, ${successName}` : ''}!
              </h3>
              <p className="mt-3 text-gray-600">
                Your message has been sent successfully. Our team will get back to you within 24 hours.
              </p>
              <p className="mt-2 text-sm text-gray-500">A confirmation email is on its way to your inbox.</p>
              <button
                type="button"
                autoFocus
                onClick={() => setSuccessName(null)}
                className="mt-6 w-full rounded-lg bg-[#203f78] px-6 py-3 font-semibold text-white transition hover:bg-[#ddaf26]"
              >
                OK
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Contact Information Section - Redesigned */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
              Get in Touch
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              We'd love to hear about your automation and technology needs. Reach out through any of these channels.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {/* Phone */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mb-6 mx-auto">
                <Phone className="w-8 h-8 text-blue-900" />
              </div>
              <h3 className="text-xl font-bold text-blue-900 mb-4 text-center">Call Us</h3>
              <div className="space-y-2 text-center">
                <p className="text-gray-700 font-medium">+91-9999765380</p>
                <p className="text-gray-700 font-medium">0124-4424695</p>
              </div>
            </motion.div>

            {/* Email */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mb-6 mx-auto">
                <Mail className="w-8 h-8 text-blue-900" />
              </div>
              <h3 className="text-xl font-bold text-blue-900 mb-4 text-center">Email Us</h3>
              <p className="text-gray-700 font-medium text-center break-words">
                support@technovizautomation.com
              </p>
            </motion.div>

            {/* Business Hours */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mb-6 mx-auto">
                <Clock className="w-8 h-8 text-blue-900" />
              </div>
              <h3 className="text-xl font-bold text-blue-900 mb-4 text-center">Business Hours</h3>
              <div className="space-y-2 text-center">
                <p className="text-gray-700 font-medium">Mon - Fri</p>
                <p className="text-gray-600">9:00 AM - 6:00 PM IST</p>
                <p className="text-gray-600 text-sm">Weekend: By appointment</p>
              </div>
            </motion.div>

            {/* Response Time */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow text-white"
            >
              <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mb-6 mx-auto">
                <CheckCircle className="w-8 h-8 text-blue-900" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-center text-blue-900">Quick Response</h3>
              <p className="text-center text-gray-700">
                We guarantee a response within 24 hours for all inquiries
              </p>
            </motion.div>
          </div>

          {/* Office Locations */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* India Office */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="bg-white rounded-2xl p-8 shadow-lg"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-14 h-14 bg-blue-100圓-xl flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-7 h-7 text-blue-900" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-blue-900 mb-2">India Office</h3>
                  <p className="text-gray-600 font-medium">Gurgaon, Haryana</p>
                </div>
              </div>
              <div className="pl-18">
                <p className="text-gray-700 leading-relaxed">
                  311, Paras Trade Center<br />
                  Sector-2, Gurgaon - 122011<br />
                  Haryana, India
                </p>
              </div>
            </motion.div>

            {/* UAE Office */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="bg-white rounded-2xl p-8 shadow-lg"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Building2 className="w-7 h-7 text-blue-900" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-blue-900 mb-2">UAE Office</h3>
                  <p className="text-gray-600 font-medium">Dubai</p>
                </div>
              </div>
              <div className="pl-18">
                <p className="text-gray-700 leading-relaxed">
                  Easy Access Business Center<br />
                  AI Abbas Building-2, Al Mankhool<br />
                  Dubai, UAE
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Google Maps Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
              Find Us on the Map
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Visit our offices in Gurgaon, India or Dubai, UAE for a face-to-face discussion about your automation projects.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* India Office Map */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white rounded-2xl shadow-xl overflow-hidden"
            >
              <div className="p-6 bg-[#203f78] text-white">
                <h3 className="text-xl font-bold mb-2">India Office - Gurgaon</h3>
                <p className="text-gray-100 text-sm">311, Paras Trade Center, Sector-2, Gurgaon - 122011</p>
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
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="bg-white rounded-2xl shadow-xl overflow-hidden"
            >
              <div className="p-6 bg-[#203f78]">
                <h3 className="text-xl text-gray-100 font-bold mb-2">UAE Office - Dubai</h3>
                <p className="text-gray-100 text-sm">AI Abbas Building-2, Al Mankhool, Dubai</p>
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