
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Maruti from '../public/Maruti.png';
import Honda from '../public/Honda.png';
import MultiTech from '../public/multi.png';
import Jubilant from '../public/jubilent.png';
import WowMomo from '../public/WowMomo.jpeg';
import CDAC from '../public/cdac.png';
import Fabcon from '../public/Fabcon.jpeg';
import Nalco from '../public/nalco-1.png';
import APL from '../public/Apl.png';

const Clients = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const clientLogos = [
    {
      src: Maruti,
      alt: "Maruti"
    },
    {
      src: Honda,
      alt: "Honda"
    },
    {
      src: MultiTech,
      alt: "MultiTech"
    },
    {
      src: Jubilant,
      alt: "Jubilant FoodWorks"
    },
    {
      src: WowMomo,
      alt: "WowMomo"
    },
    {
      src: CDAC,
      alt: "CDAC"
    },
    {
      src: Fabcon,
      alt: "Fabcon"
    },
    {
      src: Nalco,
      alt: "Nalco"
    },
    {
      src: APL,
      alt: "APL"
    },
    {
      src: "https://dreamstechnologies.com/wp-content/themes/zakhealth-child/img/clients/mayagreens.png",
      alt: "Maya Greens"
    },
    {
      src: "https://dreamstechnologies.com/wp-content/themes/zakhealth-child/img/clients/wholesale.png",
      alt: "UK Wholesale"
    },
    {
      src: "https://dreamstechnologies.com/wp-content/themes/zakhealth-child/img/clients/IIT ISM.png",
      alt: "IIT ISM"
    },
    {
      src: "https://dreamstechnologies.com/wp-content/uploads/2025/05/turningwell-logo.svg",
      alt: "Turning Well"
    },
    {
      src: "https://dreamstechnologies.com/wp-content/uploads/2025/05/ec-logo.png",
      alt: "Enhanced Communications"
    },
    {
      src: "https://dreamstechnologies.com/wp-content/uploads/2025/05/probitycare-logo-1.png",
      alt: "Probity Care"
    }
  ];

  return (
    <div className="w-full py-8 sm:py-12 lg:py-16 bg-gray-50 relative">
      {/* Animated Header */}
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="text-center mb-8 sm:mb-12 lg:mb-16 relative px-4"
      >
        <div className="relative flex items-center justify-center mb-4 sm:mb-6">
          {/* Large background text - responsive sizing */}
          <div className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold uppercase tracking-wider text-gray-200 mb-2 sm:mb-4 leading-none">
            CLIENTS WE CHERISH
          </div>
          {/* Main heading - responsive sizing */}
          <h2 className="absolute text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-[#203f78] font-poppins text-center leading-none">
            Our Clients
          </h2>
        </div>
      </motion.div>

      {/* Clients Grid */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-6 lg:gap-8 items-center justify-items-center">
          {clientLogos.map((client, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="client-logo group cursor-pointer transform transition-all duration-300 hover:scale-105 w-full max-w-[160px]"
            >
              <div className="bg-white rounded-lg p-3 sm:p-4 lg:p-6 shadow-sm border border-gray-100 
                              h-20 sm:h-24 md:h-28 lg:h-32 w-full
                              flex items-center justify-center 
                              transition-all duration-300 group-hover:shadow-md group-hover:shadow-blue-100">
                <img
                  src={client.src}
                  alt={client.alt}
                  className="h-8 sm:h-10 md:h-12 lg:h-16 w-auto max-w-full object-contain"
                  loading="lazy"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Clients;