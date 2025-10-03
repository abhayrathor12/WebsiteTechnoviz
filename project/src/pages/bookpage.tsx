
import {  ArrowRight, Star } from 'lucide-react';
import book12 from "../public/book12.jpg";
import book122 from "../public/book122.jpg";
import { Link } from "react-router-dom";

const BookPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-6">
        <div className="max-w-7xl mx-auto pt-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                  📚 New Release
                </div>
                <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Guide to <span className="text-[#203f78]">Succeed</span> with
                  <br />
                  <span className="bg-gradient-to-r from-[#203f78] to-blue-600 bg-clip-text text-transparent">
                    Technology Integration
                  </span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Navigate the Digital Revolution and master Industry 4.0 & Industrial IoT 
                  with expert insights and practical strategies.
                </p>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="text-sm text-gray-500">By</div>
                <div className="font-semibold text-[#203f78] text-lg">KAPIL KHURANA</div>
              </div>

              <div className="flex flex-wrap gap-4">
                <a href="https://www.amazon.in/Digital-Revolution-Technology-Integration-Industrial/dp/B0D6YGJ1RR" className="bg-[#203f78] hover:bg-[#ddaf26] text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                  Get Your Copy
                </a>
                <button className="border-2 border-[#203f78] text-[#203f78] hover:bg-[#203f78] hover:text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300">
                  Preview Inside
                </button>
              </div>

              <div className="flex items-center space-x-6 pt-4">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                  <span className="text-gray-600 ml-2">4.9 (127 reviews)</span>
                </div>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative flex justify-center items-center">
              <div className="relative">
                {/* Floating Elements */}
                <div className="absolute -top-10 -left-10 w-20 h-20 bg-[#203f78] opacity-10 rounded-full animate-pulse"></div>
                <div className="absolute -bottom-10 -right-10 w-16 h-16 bg-blue-400 opacity-20 rounded-full animate-bounce delay-300"></div>
                <div className="absolute top-1/2 -right-20 w-12 h-12 bg-[#203f78] opacity-15 rounded-full animate-ping delay-500"></div>

                {/* Book Image Instead of Div */}
                <img 
                  src={book12} 
                  alt="Digital Revolution Book" 
                  className="relative rounded-lg shadow-2xl w-80 h-96 object-cover transform -rotate-2 hover:rotate-0 transition-transform duration-500"
                />

                {/* Floating Tech Icons */}
                <div className="absolute -top-5 left-5 bg-white p-3 rounded-full shadow-lg animate-bounce">
                  <div className="w-6 h-6 bg-[#203f78] rounded"></div>
                </div>
                <div className="absolute bottom-5 -right-5 bg-white p-3 rounded-full shadow-lg animate-bounce delay-700">
                  <div className="w-6 h-6 bg-gradient-to-r from-[#203f78] to-blue-500 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Book Details Section */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Book Image */}
            <div className="flex justify-center">
                <div className="relative group">
                  
                    
                    
                    <div className="relative bg-white rounded-lg shadow-xl">
                    <img 
                        src={book122} 
                        alt="Book Cover" 
                        className="w-[400px] h-[220px] rounded-md object-cover"
                    />
                    </div>
                </div>
                </div>


            {/* Book Info */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-[#203f78] mb-4">About This Book</h2>
                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                  Discover the transformative power of technology integration in today's rapidly evolving digital landscape. 
                  This comprehensive guide provides practical insights into Industry 4.0, Industrial IoT, and the strategies 
                  needed to thrive in the digital revolution.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-semibold text-[#203f78] text-lg">What You'll Learn</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start space-x-2">
                      <ArrowRight className="w-4 h-4 text-[#203f78] mt-1 flex-shrink-0" />
                      <span>Digital transformation strategies</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <ArrowRight className="w-4 h-4 text-[#203f78] mt-1 flex-shrink-0" />
                      <span>Industry 4.0 implementation</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <ArrowRight className="w-4 h-4 text-[#203f78] mt-1 flex-shrink-0" />
                      <span>Industrial IoT solutions</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <ArrowRight className="w-4 h-4 text-[#203f78] mt-1 flex-shrink-0" />
                      <span>Technology integration best practices</span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-[#203f78] text-lg">Book Details</h3>
                  <div className="space-y-3 text-gray-600">
                    <div className="flex justify-between">
                      <span>Pages:</span>
                      <span className="font-medium">320</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Format:</span>
                      <span className="font-medium">Hardcover, eBook</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Language:</span>
                      <span className="font-medium">English</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Publisher:</span>
                      <span className="font-medium">Tech Publications</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-16 px-6 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#203f78] mb-4">Explore More</h2>
            <p className="text-xl text-gray-600">Discover our specialized programs and centers of excellence</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* SLM Card */}
            <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="space-y-6">
              <div className="w-16 h-16 bg-gradient-to-br from-[#203f78] to-blue-600 rounded-xl flex items-center justify-center">
                <span className="text-2xl font-bold text-white">SLM</span>
              </div>
              <h3 className="text-2xl font-bold text-[#203f78]">Self Learning Module</h3>
              <p className="text-gray-600 leading-relaxed">
                Empower learners with interactive, flexible, and engaging modules that promote self-paced learning and skill mastery.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start space-x-2">
                  <ArrowRight className="w-4 h-4 text-[#203f78] mt-1 flex-shrink-0" />
                  <span>Interactive Digital Lessons</span>
                </li>
                <li className="flex items-start space-x-2">
                  <ArrowRight className="w-4 h-4 text-[#203f78] mt-1 flex-shrink-0" />
                  <span>Self-Paced Learning Activities</span>
                </li>
                <li className="flex items-start space-x-2">
                  <ArrowRight className="w-4 h-4 text-[#203f78] mt-1 flex-shrink-0" />
                  <span>Progress Tracking & Assessments</span>
                </li>
              </ul>
              <Link
                to="/slm"
                className="inline-block bg-[#203f78] hover:bg-[#ddaf26] text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105"
              >
                Explore SLM
              </Link>
            </div>
          </div>

            {/* COE Card */}
            <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="space-y-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-[#203f78] rounded-xl flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">COE</span>
                </div>
                <h3 className="text-2xl font-bold text-[#203f78]">Center of Excellence</h3>
                <p className="text-gray-600 leading-relaxed">
                  Join our innovation hub dedicated to advancing industry best practices and fostering technological excellence.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start space-x-2">
                    <ArrowRight className="w-4 h-4 text-[#203f78] mt-1 flex-shrink-0" />
                    <span>Research & Innovation</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <ArrowRight className="w-4 h-4 text-[#203f78] mt-1 flex-shrink-0" />
                    <span>Best Practice Development</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <ArrowRight className="w-4 h-4 text-[#203f78] mt-1 flex-shrink-0" />
                    <span>Technology Integration</span>
                  </li>
                </ul>
                <Link
                  to="/coe"
                  className="inline-block bg-[#203f78] hover:bg-[#ddaf26] text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105"
                >
                  Explore COE
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-[#203f78] to-blue-800 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl font-bold">Need an Experienced Business Consultant?</h2>
              <p className="text-xl text-blue-100 leading-relaxed">
                Get expert guidance on technology integration and digital transformation 
                for your business. Let's discuss how to implement these strategies effectively.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
  to="/contact" className="bg-white text-[#203f78] px-8 py-4 rounded-full font-semibold text-lg hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 shadow-lg">
                Schedule Consultation
              </Link>
              <button className="border-2 border-white text-white hover:bg-white hover:text-[#203f78] px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300">
                Download Free Chapter
              </button>
            </div>

            
          </div>
        </div>
      </section>

      {/* Footer */}
      
    </div>
  );
};

export default BookPage;
