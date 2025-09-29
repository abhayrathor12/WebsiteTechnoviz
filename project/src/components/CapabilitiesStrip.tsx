import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const awards = [
  {
    id: 1,
    name: 'G-Cloud Partner',
    image: 'https://dreamstechnologies.com/wp-content/themes/zakhealth-child/img/awards/g-cloud-partner.png',
    alt: 'HM Government G-Cloud Supplier'
  },
  {
    id: 2,
    name: 'AWS Partner',
    image: 'https://dreamstechnologies.com/wp-content/themes/zakhealth-child/img/awards/aws-partner.png',
    alt: 'AWS Partner Services'
  },
  {
    id: 3,
    name: 'Microsoft Azure Partner',
    image: 'https://dreamstechnologies.com/wp-content/themes/zakhealth-child/img/awards/microsoft-azure-partner.png',
    alt: 'Microsoft Azure Certified Partner'
  },
  {
    id: 4,
    name: 'Clutch Top SaaS Products',
    image: 'https://dreamstechnologies.com/wp-content/uploads/2025/04/clutch-top-saas-products.jpg',
    alt: 'Clutch Top SaaS Products Award'
  },
  {
    id: 5,
    name: 'Clutch Top Web App Company',
    image: 'https://dreamstechnologies.com/wp-content/uploads/2025/04/clutch-top-webapp-company.jpg',
    alt: 'Clutch Top Web App Company Award'
  },
  {
    id: 6,
    name: 'Top Web Development Company 2025',
    image: 'https://dreamstechnologies.com/wp-content/uploads/2025/05/top-web-development-company-2025.jpg',
    alt: 'Top Web Development Company 2025 Award'
  }
];

const CertificateAwards: React.FC = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <section className="py-8 sm:py-12 lg:py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="section-header-info text-center mb-8 sm:mb-10 lg:mb-12">
          <div className="relative flex items-center justify-center mb-4 sm:mb-6">
            {/* Background text - responsive sizing */}
            <div className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-bold uppercase tracking-wider text-gray-200 mb-2 sm:mb-4 leading-none">
              AWARDS
            </div>
            
            {/* Main heading - responsive sizing */}
            <h2 className="absolute text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-[#203f78] font-poppins text-center leading-tight px-2">
              Certification and Awards
            </h2>
          </div>
        </div>

        {/* Awards Grid */}
        <div className="flex justify-center">
          <div className="w-full max-w-7xl">
            <div 
              ref={ref} 
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 md:gap-6 lg:gap-8 items-center justify-items-center"
            >
              {awards.map((award, index) => (
                <motion.div
                  key={award.id}
                  initial={{ opacity: 0, rotateY: -180 }}
                  animate={inView ? { opacity: 1, rotateY: 0 } : {}}
                  transition={{ 
                    duration: 0.8, 
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 100
                  }}
                  className="client-logo award-logo group cursor-pointer w-full max-w-[160px]"
                >
                  <div className="bg-white rounded-lg p-2 sm:p-3 md:p-4 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 w-full h-full">
                    <div className="flex items-center justify-center h-16 sm:h-18 md:h-20 lg:h-24">
                      <img 
                        src={award.image}
                        alt={award.alt}
                        className="w-full h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300 max-h-full max-w-full"
                        loading="lazy"
                      />
                    </div>
                  </div>
                  
                  {/* Optional: Award name tooltip on hover for mobile */}
                  <div className="mt-2 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 sm:hidden">
                    <span className="text-xs text-gray-600 font-medium">{award.name}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CertificateAwards;