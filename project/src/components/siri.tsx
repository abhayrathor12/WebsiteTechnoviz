import React from 'react';
import kapilsir from "../public/k3.webp";
import siri from "../public/siri.jpg";
import { Award, CheckCircle, Target, BarChart3 } from 'lucide-react';

export default function SIRIComponent() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 relative">
          <div className="relative flex items-center justify-center mb-4 sm:mb-6">
            {/* Large background text - responsive sizing */}
            <div className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-6xl xl:text-8xl 2xl:text-8xl font-bold uppercase tracking-wider text-gray-200 mb-2 sm:mb-4 leading-none">
              SIRI
            </div>
            {/* Main heading - responsive sizing */}
            <h2 className="absolute text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-4xl font-bold text-[#203f78] font-poppins text-center leading-none">
              INDUSTRIAL TRANSFORMATION
            </h2>
          </div>
        </div>
        {/* Single Combined Section */}
        <div className="bg-white rounded-2xl  overflow-hidden">
          {/* SIRI Information - Top Half */}
          <div className="grid md:grid-cols-2 gap-8 p-8 border-b-2 border-gray-100">
            {/* Left - SIRI Image */}
            <div className="flex items-center justify-center">
              <div className="relative w-full max-w-md">
               
                 
                 
                      <img src={siri} alt="" className=" rounded-xl overflow-hidden shadow-lg"/>
                 
                 
                
                <div className="absolute -bottom-4 -right-4 bg-[#ddaf26] text-white px-6 py-3 rounded-full font-bold shadow-lg">
                  Certified
                </div>
              </div>
            </div>
            {/* Right - SIRI Information */}
            <div className="flex flex-col justify-center">
              <h2 className="text-3xl font-bold mb-6" style={{ color: '#203f78' }}>
                About SIRI
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                The Smart Industry Readiness Index (SIRI) is a comprehensive framework developed to help organizations assess their Industry 4.0 readiness. It provides a structured approach to evaluate and improve manufacturing capabilities in the digital age.
              </p>
             
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 flex-shrink-0 mt-1" style={{ color: '#203f78' }} />
                  <div>
                    <h3 className="font-semibold text-[#203f78] mb-1">Assessment Framework</h3>
                    <p className="text-gray-600 text-sm">Systematic evaluation of digital transformation readiness across multiple dimensions</p>
                  </div>
                </div>
               
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 flex-shrink-0 mt-1" style={{ color: '#203f78' }} />
                  <div>
                    <h3 className="font-semibold text-[#203f78] mb-1">Global Standard</h3>
                    <p className="text-gray-600 text-sm">Internationally recognized benchmark for Industry 4.0 adoption</p>
                  </div>
                </div>
               
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 flex-shrink-0 mt-1" style={{ color: '#203f78' }} />
                  <div>
                    <h3 className="font-semibold text-[#203f78] mb-1">Continuous Improvement</h3>
                    <p className="text-gray-600 text-sm">Roadmap for progressive enhancement of smart manufacturing capabilities</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Director Section - Bottom Half */}
          <div className="grid md:grid-cols-2 gap-8 p-8">
            {/* Left - Director Information */}
            <div className="flex flex-col justify-center">
              <div className="mb-6">
                <h2 className="text-3xl font-bold mb-2" style={{ color: '#203f78' }}>
                  Kapil Khurana
                </h2>
                <p className="text-xl text-gray-600">Company Director</p>
              </div>
             
              <div className="bg-yellow-50 border-l-4 border-[#ddaf26] p-4 mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <Award className="w-5 h-5 text-[#ddaf26]" />
                  <span className="font-semibold text-green-900">SIRI Certified Professional</span>
                </div>
                <p className="text-green-800 text-sm">
                  Certified in Smart Industry Readiness Index Assessment and Implementation
                </p>
              </div>
              <p className="text-gray-700 mb-4 leading-relaxed">
                As a SIRI certified professional, Kapil Khurana brings extensive expertise in Industry 4.0 transformation and smart manufacturing implementations. His certification demonstrates a deep understanding of digital readiness assessment frameworks and strategic implementation methodologies.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Target className="w-5 h-5" style={{ color: '#203f78' }} />
                  <span className="text-gray-700">Leading digital transformation initiatives</span>
                </div>
                <div className="flex items-center gap-3">
                  <Target className="w-5 h-5" style={{ color: '#203f78' }} />
                  <span className="text-gray-700">Driving Industry 4.0 adoption strategies</span>
                </div>
                <div className="flex items-center gap-3">
                  <Target className="w-5 h-5" style={{ color: '#203f78' }} />
                  <span className="text-gray-700">Expertise in smart manufacturing excellence</span>
                </div>
              </div>
            </div>
            {/* Right - Director Image */}
            <div className="flex items-center justify-center">
              <div className="relative w-full max-w-md">
                <div >
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                     
                      <img src={kapilsir} alt="" className="h-[25rem] w-auto mx-auto rounded-xl overflow-hidden shadow-lg bg-gradient-to-br from-gray-100 to-gray-200"/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}