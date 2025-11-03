import React from 'react';
import kapilsir from "../public/k3n.jpg";
import siri from "../public/siri.jpg";
import siripdf from "../public/SIRI.pdf";
import { Award, CheckCircle, Target, Download } from 'lucide-react';

export default function SIRIComponent() {
  const handleDownloadBrochure = () => {
    const link = document.createElement("a");
    link.href = siripdf;
    link.download = "SIRI_Brochure.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 relative">
          <div className="relative flex items-center justify-center mb-4 sm:mb-6">
            {/* Large background text */}
            <div className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-6xl xl:text-8xl 2xl:text-8xl font-bold uppercase tracking-wider text-gray-200 mb-2 sm:mb-4 leading-none">
              SIRI
            </div>
            {/* Main heading */}
            <h2 className="absolute text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-4xl font-bold text-[#203f78] font-poppins text-center leading-none">
              INDUSTRIAL TRANSFORMATION
            </h2>
          </div>
        </div>

        {/* Single Combined Section */}
        <div className="bg-white rounded-2xl overflow-hidden shadow-xl">
          {/* SIRI Information - Top Half */}
          <div className="grid md:grid-cols-2 gap-8 p-6 sm:p-8 border-b-2 border-gray-100">
            {/* Left - SIRI Image */}
            <div className="flex items-center justify-center">
              <div className="relative w-full max-w-[280px] sm:max-w-xs md:max-w-md aspect-square">
                <img
                  src={siri}
                  alt="SIRI Logo"
                  className="w-full h-full rounded-xl object-cover shadow-lg"
                />
                <div className="absolute -bottom-4 -right-4 bg-[#ddaf26] text-white px-4 py-2 sm:px-6 sm:py-3 rounded-full font-bold shadow-lg text-sm sm:text-base">
                  Certified
                </div>
              </div>
            </div>

            {/* Right - SIRI Information */}
            <div className="flex flex-col justify-center">
              <h2 className="text-2xl sm:text-3xl font-bold mb-6" style={{ color: '#203f78' }}>
                About SIRI
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed text-sm sm:text-base">
                The Smart Industry Readiness Index (SIRI) is a comprehensive framework developed to help organizations assess their Industry 4.0 readiness. It provides a structured approach to evaluate and improve manufacturing capabilities in the digital age.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 mt-1" style={{ color: '#203f78' }} />
                  <div>
                    <h3 className="font-semibold text-[#203f78] mb-1 text-sm sm:text-base">Assessment Framework</h3>
                    <p className="text-gray-600 text-xs sm:text-sm">Systematic evaluation of digital transformation readiness across multiple dimensions</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 mt-1" style={{ color: '#203f78' }} />
                  <div>
                    <h3 className="font-semibold text-[#203f78] mb-1 text-sm sm:text-base">Global Standard</h3>
                    <p className="text-gray-600 text-xs sm:text-sm">Internationally recognized benchmark for Industry 4.0 adoption</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 mt-1" style={{ color: '#203f78' }} />
                  <div>
                    <h3 className="font-semibold text-[#203f78] mb-1 text-sm sm:text-base">Continuous Improvement</h3>
                    <p className="text-gray-600 text-xs sm:text-sm">Roadmap for progressive enhancement of smart manufacturing capabilities</p>
                  </div>
                </div>
              </div>

              {/* Download Brochure Button */}
              <button
                onClick={handleDownloadBrochure}
                className="flex items-center justify-center gap-2 bg-[#203f78] hover:bg-[#ddaf26] text-white font-medium py-2 px-4 rounded-full shadow-md transition-all duration-300 w-fit mx-auto text-sm sm:text-base"
              >
                <Download className="w-4 h-4 sm:w-5 sm:h-5" />
                Download SIRI Brochure
              </button>
            </div>
          </div>

          {/* Director Section - Bottom Half */}
          <div className="grid md:grid-cols-2 gap-8 p-6 sm:p-8">
            {/* Left - Director Information */}
            <div className="flex flex-col justify-center order-2 md:order-1">
              <div className="mb-6">
                <h2 className="text-2xl sm:text-3xl font-bold mb-2" style={{ color: '#203f78' }}>
                  Kapil Khurana
                </h2>
                <p className="text-lg sm:text-xl text-gray-600">Company Director</p>
              </div>

              <div className="bg-yellow-50 border-l-4 border-[#ddaf26] p-4 mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <Award className="w-5 h-5 text-[#ddaf26]" />
                  <span className="font-semibold text-green-900 text-sm sm:text-base">SIRI Certified Professional</span>
                </div>
                <p className="text-green-800 text-xs sm:text-sm">
                  Certified in Smart Industry Readiness Index Assessment and Implementation
                </p>
              </div>

              <p className="text-gray-700 mb-4 leading-relaxed text-sm sm:text-base">
                As a SIRI certified professional, Kapil Khurana brings extensive expertise in Industry 4.0 transformation and smart manufacturing implementations. His certification demonstrates a deep understanding of digital readiness assessment frameworks and strategic implementation methodologies.
              </p>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Target className="w-5 h-5" style={{ color: '#203f78' }} />
                  <span className="text-gray-700 text-sm sm:text-base">Leading digital transformation initiatives</span>
                </div>
                <div className="flex items-center gap-3">
                  <Target className="w-5 h-5" style={{ color: '#203f78' }} />
                  <span className="text-gray-700 text-sm sm:text-base">Driving Industry 4.0 adoption strategies</span>
                </div>
                <div className="flex items-center gap-3">
                  <Target className="w-5 h-5" style={{ color: '#203f78' }} />
                  <span className="text-gray-700 text-sm sm:text-base">Expertise in smart manufacturing excellence</span>
                </div>
              </div>
            </div>

            {/* Right - Director Image */}
            <div className="flex items-center justify-center order-1 md:order-2">
              <div className="relative w-full max-w-[280px] sm:max-w-xs md:max-w-md aspect-square">
                <img
                  src={kapilsir}
                  alt="Kapil Khurana - Company Director"
                  className="w-full h-full rounded-xl object-cover shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}