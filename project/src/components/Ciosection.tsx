
import { Award, User } from 'lucide-react';
import { motion } from 'framer-motion';
import Kapil from "../public/Kapil-Khurana.gif";
import Cio_image from "../public/CIO.jpg";

const DirectorCertificateSection = () => {
  return (
    <section className="py-16 px-4 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          {/* Container for background text and main heading */}
          <div className="relative flex items-center justify-center">
            {/* Large background text */}
            <div className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold uppercase tracking-wider text-gray-200 mb-4">
              CIO INSIDER
            </div>

            {/* Main heading */}
            <h2 className="absolute text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#203f78] font-poppins text-center">
              Recognised for Industry 4.0 Excellence
            </h2>
          </div>

        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Director Section */}
          <div className="relative group">
            <div className="bg-white rounded-2xl shadow-xl p-8 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
              <div className="absolute -top-4 -left-4 w-8 h-8 bg-blue-600 rounded-full opacity-20"></div>
              <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-indigo-600 rounded-full opacity-10"></div>
              
              {/* Director Image Container */}
              <div className="relative mb-6">
                <div className="w-32 h-32 mx-auto rounded-full overflow-hidden ring-4 ring-blue-100 shadow-lg">
                  <img 
                    src={Kapil}
                    alt="Company Director"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                  <div className="bg-[#203f78] p-2 rounded-full shadow-lg">
                    <User className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>

              {/* Director Info */}
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Mr. Kapil Khurana
                </h3>
                <p className="text-[#203f78] font-semibold mb-4">
                  Chief Executive Officer
                </p>
                <p className="text-gray-600 leading-relaxed">
                  With over 15 years of industry experience, Kapil leads our company with vision, 
                  innovation, and an unwavering commitment to excellence. His strategic leadership 
                  has driven our growth and success in the competitive market.
                </p>
                <a
                    href="https://www.cioinsiderindia.com/vendor/technoviz-automation-redefining-manufacturing-with-smart-technologies-cid-1301.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-6 py-3 bg-[#203f78] text-white font-semibold rounded-full shadow-md 
                              hover:bg-[#ddaf26] hover:shadow-lg transition-all duration-300 mt-2"
                  >
                    Read Full Article
                  </a>
              </div>
            </div>
          </div>

          {/* Certificate Section */}
          <div className="relative group">
            <div className="bg-white rounded-2xl shadow-xl p-8 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-amber-500 rounded-full opacity-20"></div>
              <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-yellow-500 rounded-full opacity-10"></div>
              
              {/* Certificate Header */}
              <div className="flex items-center justify-center mb-6">
                <div className="bg-[#ddaf26] p-3 rounded-full shadow-lg mr-4">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">
                  CIO Certificate
                </h3>
              </div>

              {/* Certificate Image Container */}
              <div className="relative mb-6">
                <a
                  href="https://www.cioinsiderindia.com/vendor/technoviz-automation-redefining-manufacturing-with-smart-technologies-cid-1301.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-xl p-4 shadow-inner transition-transform duration-300 hover:scale-105">
                    <img 
                      src={Cio_image}
                      alt="Company Certificate"
                      className="w-full h-64 object-cover rounded-lg shadow-md"
                    />
                  </div>
                </a>

                <div className="absolute -top-2 -right-2">
                  <div className="bg-[#ddaf26] text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
                    CERTIFIED
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default DirectorCertificateSection;
