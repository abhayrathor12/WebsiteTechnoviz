import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowUp } from 'lucide-react';
import { caseStudies } from '../data/mockData';

const CaseStudiesSection: React.FC = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <section ref={ref} className="py-20 bg-gray-50 overflow-x-hidden">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Column - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="lg:pr-4 w-full"
          >
            {/* Section Header */}
            <div className="relative mb-12">
              {/* Background Text */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8 }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-7.5xl font-extrabold uppercase tracking-widest text-gray-200 absolute -top-6 left-0  select-none pointer-events-none"
              >
                GOOD READS
              </motion.div>

              {/* Foreground Heading */}
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative -mt-4 text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold text-[#203f78] font-poppins "
              >
                Case Studies
              </motion.h2>

              {/* Subtext */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-gray-600 text-lg mt-4 text-center"
              >
                Explore how our innovative solutions drive real-world business success
                through detailed case studies.
              </motion.p>
            </div>

            {/* Case Text Description */}
            <div className="space-y-4 mb-8">
              <p className="text-gray-600 leading-relaxed">
                Our innovative solutions have transformed businesses across various industries.
                Our case studies showcase real-world applications of our expertise, delivering
                measurable results and driving success. Learn from our detailed analyses,
                highlighting the challenges faced and the strategies implemented.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Explore the evidence of our commitment to excellence and client satisfaction.
              </p>
            </div>

            {/* View All Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Link
                to="/case-studies"
                className="inline-flex items-center text-[#203f78] font-medium hover:text-[#ddaf26] transition-colors group text-lg"
              >
                <span>View All Case Studies</span>
                <ArrowUp className="w-5 h-5 ml-2 rotate-45 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Column - Case Studies Grid */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            {caseStudies.slice(0, 1).map((study, index) => (
              <motion.div
                key={study.id}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                {/* Case Study Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={study.images[0]}
                    alt={study.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>

                {/* Case Study Content */}
                <div className="p-6">
                  {/* Date */}
                  <div className="text-sm text-gray-500 mb-2">
                    {new Date(study.id).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>

                  {/* Title */}
                  <h4 className="text-xl font-bold text-[#0B2B5A] mb-3 font-poppins">
                    {study.title}
                  </h4>

                  {/* Excerpt */}
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {study.challenge.length > 120
                      ? `${study.challenge.substring(0, 120)}...`
                      : study.challenge}
                  </p>

                  {/* Read More Button */}
                  <Link
                    to={`/case-studies`}
                    className="inline-flex items-center bg-[#203f78] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-[#ddaf26] transition-colors"
                  >
                    Read more
                  </Link>
                </div>
              </motion.div>
            ))}

            {/* Load More Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="text-center pt-4"
            >
              
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CaseStudiesSection;
