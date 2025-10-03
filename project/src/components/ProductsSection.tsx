
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowRight } from 'lucide-react';
import Oeeimage from '../public/Oeeimage.jpg';
import emsimage from '../public/emsimage.jpg';
import digitalimage from '../public/Digitalimage.jpg';
import immerimage from '../public/immersizimage.jpg';
import utilityimage from '../public/utilityimage.jpg';
import visionimage from '../public/visionimage.jpg';

const products = [
  {
    id: 'immersix',
    name: 'Immersix (AR/VR Training)',
    tagline: 'AR/VR-powered training for faster learning and smarter operations.',
    category: 'AR/VR',
    hero_image: immerimage,
    features: ['Immersive AR/VR training', 'Hands-on skill development', 'Realistic simulations'],
    cta_text: 'Learn More',
    slug: 'immersix',
  },
  {
    id: 'utility360',
    name: 'Utility360',
    tagline: 'Smart utility monitoring & management at your fingertips.',
    category: 'Utility',
    hero_image: utilityimage,
    features: ['Real-time utility tracking', 'Predictive maintenance', 'Remote control'],
    cta_text: 'Learn More',
    slug: 'utility360',
  },
  {
    id: 'digital-checksheet',
    name: 'Digital Checksheet',
    tagline: 'Paperless, intelligent quality inspection system.',
    category: 'Quality',
    hero_image: digitalimage,
    features: ['Mobile inspection forms', 'IoT validation', 'Automated reporting'],
    cta_text: 'Learn More',
    slug: 'digital-checksheet',
  },
  {
    id: 'smart-ems',
    name: 'SmartEMS',
    tagline: 'AI-powered energy monitoring and optimization system.',
    category: 'Energy',
    hero_image: emsimage,
    features: ['Real-time monitoring', 'AI analysis', 'Carbon tracking'],
    cta_text: 'Learn More',
    slug: 'smart-ems',
  },
  {
    id: 'oee-dashboard',
    name: 'OEE Dashboard',
    tagline: 'Optimize production efficiency with live OEE tracking.',
    category: 'Dashboard',
    hero_image: Oeeimage,
    features: ['Real-time monitoring', 'Downtime analysis', 'Custom dashboards'],
    cta_text: 'Learn More',
    slug: 'oee-dashboard',
  },
  {
    id: 'vision-ai',
    name: 'VisionAI',
    tagline: 'AI-powered visual inspection & automation.',
    category: 'Vision',
    hero_image: visionimage,
    features: ['Defect detection', 'Object recognition', 'High-speed analysis'],
    cta_text: 'Learn More',
    slug: 'vision-ai',
  },
];

const ProductsSection: React.FC = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section ref={ref} className="py-20 text-white">
      <div className="container mx-auto px-4">
        <motion.div
  initial={{ opacity: 0, y: 30 }}
  animate={inView ? { opacity: 1, y: 0 } : {}}
  transition={{ duration: 0.6 }}
  className="text-center mb-16"
>
  {/* Container for background text and main heading */}
  <div className="relative flex items-center justify-center mb-6">
    {/* Large background text */}
    <div className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold uppercase tracking-wider text-gray-200 mb-4">
      SOLUTIONS
    </div>
    
    {/* Main heading - absolutely positioned to center over background */}
    <h2 className="absolute text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#203f78] font-poppins text-center">
      Our Solutions
    </h2>
  </div>
  
  {/* Tagline */}
  <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
    Innovative software products designed to solve real-world business challenges
  </p>
</motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="aspect-video overflow-hidden">
                <img
                  src={product.hero_image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-2 font-poppins">{product.name}</h3>
                <p className="text-gray-600 mb-4">{product.tagline}</p>
                <Link
                  to={`/products/${product.slug}`}
                  className="inline-flex items-center text-[#203f78] font-medium hover:text-[#ddaf26] transition-colors"
                >
                  {product.cta_text}
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-12"
        >
          <Link
            to="/products"
            className="bg-[#203f78] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#ddaf26] transition-all duration-200 inline-block"
          >
            View All Solutions
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductsSection;