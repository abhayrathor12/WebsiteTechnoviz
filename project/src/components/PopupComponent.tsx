import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, MapPin, Clock, X, ArrowRight } from "lucide-react";

const PromoPopup: React.FC = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setOpen(true), 800);
    return () => clearTimeout(t);
  }, []);

  const handleClose = () => setOpen(false);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center px-4 sm:px-6 py-8 bg-black/50 backdrop-blur-sm"
        >
          {/* Popup Container */}
          <motion.div
            initial={{ y: 30, opacity: 0, scale: 0.97 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 20, opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative w-full max-w-2xl bg-gradient-to-br from-white to-indigo-50 rounded-3xl shadow-2xl overflow-hidden border border-indigo-100"
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-2 right-1 p-2 rounded-full bg-white/60 hover:bg-white transition"
              aria-label="Close promotional popup"
            >
              <X className="w-5 h-5 text-gray-700" />
            </button>

            {/* Hero Section */}
            <div className="bg-[#203f78] text-white px-8 py-6 sm:py-8 flex flex-col sm:flex-row items-center sm:items-start gap-5">
              <div className="flex-1 text-center sm:text-left">
                <h2 className="text-2xl sm:text-3xl font-bold leading-tight drop-shadow-md">
                  Future of Smart Manufacturing
                </h2>
                <p className="mt-2 text-sm sm:text-base text-indigo-100">
                  Industry 4.0 & IIoT in Industrial Automation Workshop
                </p>
              </div>
              <motion.div
                initial={{ rotate: -5, scale: 0.95 }}
                animate={{ rotate: 0, scale: 1 }}
                className="bg-white/20 backdrop-blur-lg p-3 rounded-2xl border border-white/30"
              >
                <svg width="56" height="56" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="3" y="3" width="7" height="7" rx="1" stroke="white" strokeWidth="1.5" />
                  <rect x="14" y="3" width="7" height="7" rx="1" stroke="white" strokeWidth="1.5" />
                  <rect x="3" y="14" width="7" height="7" rx="1" stroke="white" strokeWidth="1.5" />
                  <rect x="14" y="14" width="7" height="7" rx="1" stroke="white" strokeWidth="1.5" />
                </svg>
              </motion.div>
            </div>

            {/* Details Section */}
            <div className="p-6 sm:p-8">
              <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                In collaboration with the <strong>Electronics Sector Skills Council of India (ESSCI)</strong>, Technoviz Automation invites you to explore the transformation journey of modern industries through Industry 4.0 and IIoT technologies.
              </p>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 text-gray-700 text-sm">
                <div className="flex items-center gap-2"><Calendar className="w-4 h-4 text-[#203f78]" /> <span>21st Nov 2025</span></div>
                <div className="flex items-center gap-2"><Clock className="w-4 h-4 text-[#203f78]" /> <span>9:00 AM onwards</span></div>
                <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-[#203f78]" /> <span>ESSCI, Bhiwadi, Rajasthan</span></div>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
                <a
                  href="https://forms.gle/gicQUBfr9pY8SuEr8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 bg-[#203f78] text-white text-sm font-medium shadow-md transition"
                >
                  Register Now <ArrowRight className="w-4 h-4" />
                </a>

                <button
                  onClick={() => window.open("mailto:support@technovizautomation.com?subject=Workshop%20Enquiry", "_blank")}
                  className="text-sm underline text-[#203f78] hover:text-[#ddaf26]"
                >
                  support@technovizautomation.com
                </button>
              </div>

              <div className="mt-6 text-xs text-gray-500 border-t border-gray-200 pt-4">
                <p>📞 +91-9999765380 | Team Technoviz Automation</p>
                <p>💡 Free of cost • Practical demos • Certificates provided</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PromoPopup;
