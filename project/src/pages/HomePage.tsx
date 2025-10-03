import React, { Suspense, lazy } from "react";
import { useInView } from "react-intersection-observer";
import Hero from "../components/Hero";

// Lazy load sections
const CapabilitiesStrip = lazy(() => import("../components/CapabilitiesStrip"));
const ServicesOverview = lazy(() => import("../components/ServicesOverview"));
const ProductsSection = lazy(() => import("../components/ProductsSection"));
const CaseStudiesSection = lazy(() => import("../components/CaseStudiesSection"));
const BlogsSection = lazy(() => import("../components/BlogsSection"));
const ContactSection = lazy(() => import("../components/ContactSection"));
const ClientSection = lazy(() => import("../components/ClientSection"));
const FAQ = lazy(() => import("../components/FAQ"));
const CIO = lazy(() => import("../components/Ciosection"));
const Book = lazy(() => import("../components/book.tsx"));

const SectionLoader: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Suspense fallback={<div className="text-center py-10">Loading...</div>}>
    {children}
  </Suspense>
);

const HomePage: React.FC = () => {
  // 👇 setup intersection observers for heavy sections
  const { ref: productsRef, inView: productsInView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { ref: servicesRef, inView: servicesInView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { ref: casesRef, inView: casesInView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { ref: blogsRef, inView: blogsInView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { ref: bookRef, inView: bookInView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { ref: contactRef, inView: contactInView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <div>
      {/* Hero loads instantly */}
      <Hero />

      {/* Products Section */}
      <div ref={productsRef}>
        {productsInView && (
          <SectionLoader>
            <ProductsSection />
          </SectionLoader>
        )}
      </div>

      {/* Services Overview */}
      <div ref={servicesRef}>
        {servicesInView && (
          <SectionLoader>
            <ServicesOverview />
            <CapabilitiesStrip />
            <ClientSection />
            <FAQ />
            <CIO />
          </SectionLoader>
        )}
      </div>

      {/* Case Studies */}
      <div ref={casesRef}>
        {casesInView && (
          <SectionLoader>
            <CaseStudiesSection />
          </SectionLoader>
        )}
      </div>

      {/* Blogs */}
      <div ref={blogsRef}>
        {blogsInView && (
          <SectionLoader>
            <BlogsSection />
          </SectionLoader>
        )}
      </div>
      <div ref={bookRef}>
        {bookInView && (
          <SectionLoader>
            <Book />
          </SectionLoader>
        )}
      </div>

      {/* Contact */}
      {/* <div ref={contactRef}>
        {contactInView && (
          <SectionLoader>
            <ContactSection />
          </SectionLoader>
        )}
      </div> */}
    </div>
  );
};

export default HomePage;
