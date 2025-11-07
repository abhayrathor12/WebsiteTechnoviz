import React, { useEffect, useState } from "react";

const PromoPopup = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setOpen(true), 800);
    return () => clearTimeout(t);
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
      <div
        className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
        onClick={handleClose}
      />

      <div className="relative z-10 max-w-3xl w-full animate-in zoom-in-95 slide-in-from-bottom-4 duration-500">
        <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Decorative gradient */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-100 to-transparent rounded-full blur-3xl opacity-40 -z-0" />

          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-3 right-3 z-20 p-1.5 rounded-full bg-white/90 hover:bg-white shadow hover:shadow-md transition-all group"
            aria-label="Close"
          >
            <svg width="16" height="16" viewBox="0 0 20 20" fill="none" className="text-slate-500 group-hover:text-slate-700">
              <path d="M5 5L15 15M15 5L5 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>

          <div className="relative flex flex-col md:flex-row">
            {/* Left content */}
            <div className="flex-1 p-6 md:p-7">
              {/* Badge */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-[#203f78] to-[#2d5a9f] text-white text-xs font-semibold shadow mb-4">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor" />
                </svg>
                Free Workshop
              </div>

              {/* Title */}
              <h2 className="text-xl md:text-2xl font-bold text-slate-900 leading-tight mb-2">
                Future of Smart Manufacturing
              </h2>
              
              <p className="text-sm font-semibold mb-3" style={{ color: '#203f78' }}>
                Industry 4.0 & IIoT Workshop
              </p>

              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                In collaboration with <strong>ESSCI</strong>, Technoviz Automation invites you to explore the Future of Smart Manufacturing!
              </p>

              {/* Info cards - compact */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-5">
                <div className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                  <div className="flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-sm" style={{ background: '#203f78', color: 'white' }}>
                    📅
                  </div>
                  <div>
                    <div className="text-xs text-slate-500">Date</div>
                    <div className="text-xs font-semibold text-slate-900">21 Nov 2025</div>
                  </div>
                </div>

                <div className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                  <div className="flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-sm" style={{ background: '#2d5a9f', color: 'white' }}>
                    🕘
                  </div>
                  <div>
                    <div className="text-xs text-slate-500">Time</div>
                    <div className="text-xs font-semibold text-slate-900">9:00 AM</div>
                  </div>
                </div>

                <div className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-50 border border-slate-100 sm:col-span-3">
                  <div className="flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-sm" style={{ background: '#3a6bb3', color: 'white' }}>
                    📍
                  </div>
                  <div>
                    <div className="text-xs text-slate-500">Venue</div>
                    <div className="text-xs font-semibold text-slate-900">ESSCI, Bhiwadi, Rajasthan</div>
                  </div>
                </div>
              </div>

              {/* CTA buttons - compact */}
              <div className="flex flex-col sm:flex-row gap-2 mb-4">
                <a
                  href="https://forms.gle/gicQUBfr9pY8SuEr8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-white text-sm font-semibold shadow hover:shadow-md transition-all group"
                  style={{ background: 'linear-gradient(135deg, #203f78 0%, #2d5a9f 100%)' }}
                >
                  Register Now — Free
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="group-hover:translate-x-1 transition-transform">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>

                <button
                  onClick={() => {
                    window.open("mailto:support@technovizautomation.com?subject=Workshop%20Enquiry", "_blank");
                  }}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-white border border-slate-200 hover:border-slate-300 text-slate-700 text-sm font-medium transition-all"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path d="M3 8L10.89 13.26C11.24 13.47 11.66 13.58 12.1 13.58C12.54 13.58 12.96 13.47 13.31 13.26L21 8M5 19H19C20.1 19 21 18.1 21 17V7C21 5.9 20.1 5 19 5H5C3.9 5 3 5.9 3 7V17C3 18.1 3.9 19 5 19Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                  Contact
                </button>
              </div>

              {/* Footer - compact */}
              <div className="flex items-start gap-2 p-3 rounded-lg bg-slate-50 border border-slate-100">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="flex-shrink-0 mt-0.5">
                  <circle cx="12" cy="12" r="10" stroke="#64748b" strokeWidth="2" />
                  <path d="M12 8V12L15 15" stroke="#64748b" strokeWidth="2" strokeLinecap="round" />
                </svg>
                <div className="text-xs text-slate-600 leading-snug">
                  <strong className="text-slate-900">Team Technoviz Automation</strong><br />
                  📞 +91-9999765380 | ✉️ support@technovizautomation.com
                </div>
              </div>
            </div>

            {/* Right visual - compact */}
            <div className="md:w-52 p-6 flex flex-col items-center justify-center text-center relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #203f78 0%, #2d5a9f 100%)' }}>
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
              
              <div className="relative z-10">
                <div className="inline-flex p-4 rounded-xl bg-white/10 backdrop-blur-sm shadow-lg mb-4">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                    <rect x="3" y="3" width="7" height="7" rx="1.5" fill="white" opacity="0.9" />
                    <rect x="14" y="3" width="7" height="7" rx="1.5" fill="white" opacity="0.7" />
                    <rect x="3" y="14" width="7" height="7" rx="1.5" fill="white" opacity="0.7" />
                    <rect x="14" y="14" width="7" height="7" rx="1.5" fill="white" opacity="0.9" />
                  </svg>
                </div>

                <h3 className="text-lg font-bold text-white mb-3">
                  Industry 4.0
                </h3>
                
                <div className="space-y-1.5 text-blue-100">
                  <div className="flex items-center justify-center gap-1.5 text-xs">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                    </svg>
                    Practical Demos
                  </div>
                  <div className="flex items-center justify-center gap-1.5 text-xs">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                    </svg>
                    Expert Sessions
                  </div>
                  <div className="flex items-center justify-center gap-1.5 text-xs">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                    </svg>
                    Certificates
                  </div>
                </div>

                <div className="mt-4 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white font-bold text-sm">
                  100% Free
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromoPopup;
