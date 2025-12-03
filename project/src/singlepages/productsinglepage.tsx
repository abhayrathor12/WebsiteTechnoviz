import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft, Star, CheckCircle, Mail, ExternalLink, Lightbulb, Award, Zap,
  ChevronLeft, ChevronRight, ArrowRight, Package, FileText, Download
} from 'lucide-react';
import { products, productbroucher } from "../data/singlepagemockdata";

const SingleProductPage = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const product = products.find((p) => p.slug === slug);
  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        <p>Product not found.</p>
      </div>
    );
  }

  const brochure = productbroucher.find((b) => b.title === product.name);
  const sliderImages = product.all_images && product.all_images.length > 0
    ? product.all_images
    : [product.hero_image];

  // Hero Image Auto-slider (kept, as it's nice)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(prev => prev === sliderImages.length - 1 ? 0 : prev + 1);
    }, 4000);
    return () => clearInterval(interval);
  }, [sliderImages.length]);

  // Manual scroll functions
  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -420, behavior: 'smooth' });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 420, behavior: 'smooth' });
  };

  const nextSlide = () => setCurrentImageIndex(prev => prev === sliderImages.length - 1 ? 0 : prev + 1);
  const prevSlide = () => setCurrentImageIndex(prev => prev === 0 ? sliderImages.length - 1 : prev - 1);
  const goToSlide = (i: number) => setCurrentImageIndex(i);

  // Reusable Components
  const TabButton = ({ id, label, isActive, onClick }: any) => (
    <button
      onClick={() => onClick(id)}
      className={`px-6 py-3 font-medium text-sm transition-all border-b-2 ${
        isActive ? 'text-blue-600 border-blue-600 bg-blue-50' : 'text-gray-600 border-transparent hover:text-blue-500 hover:border-blue-300'
      }`}
    >
      {label}
    </button>
  );

  const FeatureCard = ({ icon: Icon, title, description }: any) => (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex items-start space-x-4">
        <div className="bg-blue-100 p-3 rounded-lg"><Icon className="w-6 h-6 text-blue-600" /></div>
        <div>
          <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
          <p className="text-gray-600 text-sm">{description}</p>
        </div>
      </div>
    </div>
  );

  const ListItem = ({ children, icon: Icon = CheckCircle }: any) => (
    <li className="flex items-start space-x-3">
      <Icon className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
      <span className="text-gray-700">{children}</span>
    </li>
  );

  const ProductCard = ({ product }: { product: any }) => (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 cursor-pointer">
      <div className="p-6">
        <img src={product.hero_image} alt={product.name} className="w-full h-48 object-contain rounded-lg mb-4" />
        <div className="flex items-center space-x-2 mb-3">
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">{product.category}</span>
          <div className="flex">{[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />)}</div>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.tagline}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {product.features?.slice(0, 2).map((f: string, i: number) => (
            <span key={i} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">{f}</span>
          ))}
          {product.features?.length > 2 && <span className="text-gray-500 text-xs">+{product.features.length - 2} more</span>}
        </div>
        <button
          onClick={() => navigate(`/products/${product.slug}`)}
          className="w-full bg-[#203f78] text-white py-3 rounded-lg font-medium hover:bg-[#ddaf26] transition-colors flex items-center justify-center space-x-2"
        >
          <span>Learn More</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Navigation */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button onClick={() => navigate(-1)} className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
            <ArrowLeft className="w-5 h-5" /><span>Back to Products</span>
          </button>
        </div>
      </div>

      {/* Hero */}
      <div style={{ backgroundColor: '#203f78' }} className="text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm">{product.category}</span>
                <div className="flex">{[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-yellow-400" />)}</div>
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold mb-6">{product.name}</h1>
              <p className="text-xl text-blue-100 mb-8">{product.tagline}</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/contact" className="bg-white text-[#203f78] px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 flex items-center justify-center space-x-2">
                  <Mail className="w-5 h-5" /><span>Get Started</span>
                </Link>
                <button className="border-2 border-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-[#203f78] transition-all flex items-center justify-center space-x-2">
                  <ExternalLink className="w-5 h-5" /><span>View Demo</span>
                </button>
              </div>
            </div>

            {/* Hero Image Slider */}
            <div className="relative">
              <div className="bg-white/10 rounded-2xl p-8 backdrop-blur-sm">
                <div className="relative overflow-hidden rounded-lg shadow-2xl">
                  <div className="flex transition-transform duration-500" style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}>
                    {sliderImages.map((img, i) => (
                      <img key={i} src={img} alt={`${product.name} ${i + 1}`} className="w-full h-64 object-contain flex-shrink-0" />
                    ))}
                  </div>
                  <button onClick={prevSlide} className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full"><ChevronLeft className="w-5 h-5" /></button>
                  <button onClick={nextSlide} className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full"><ChevronRight className="w-5 h-5" /></button>
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                    {sliderImages.map((_, i) => (
                      <button key={i} onClick={() => goToSlide(i)} className={`w-3 h-3 rounded-full ${i === currentImageIndex ? 'bg-white' : 'bg-white/50'}`} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* Quick Features */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {product.features?.map((feature: string, i: number) => (
            <div key={i} className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-center space-x-3">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <Zap className="w-5 h-5 text-blue-600" />
                </div>
                <span className="font-semibold text-gray-900">{feature}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content with Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="border-b border-gray-200 mb-8">
          <nav className="flex space-x-8 overflow-x-auto">
            <TabButton id="overview" label="Overview" isActive={activeTab === 'overview'} onClick={setActiveTab} />
            <TabButton id="features" label="Key Features" isActive={activeTab === 'features'} onClick={setActiveTab} />
            <TabButton id="benefits" label="Benefits" isActive={activeTab === 'benefits'} onClick={setActiveTab} />
            <TabButton id="applications" label="Applications" isActive={activeTab === 'applications'} onClick={setActiveTab} />
          </nav>
        </div>

        {/* Tab Content */}
        <div className="min-h-96">
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <h2 className="text-3xl font-bold text-[#203f78] mb-6">Product Overview</h2>
                <div className="prose prose-lg text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: product.long_description }} />
              </div>
              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden">
                  <div className="bg-[#203f78] p-6">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                        <Package className="w-6 h-6 text-white" />
                      </div>
                      <FileText className="w-6 h-6 text-white/70" />
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-[#203f78] mb-3">{brochure?.title || product.name + " Brochure"}</h3>
                    <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                      {brochure?.description || `Download comprehensive details about ${product.name}.`}
                    </p>
                    <div className="space-y-2 mb-6">
                      {(brochure?.features || ["Technical Specs", "Use Cases", "Implementation Guide", "Pricing Info"]).map((f, i) => (
                        <div key={i} className="flex items-center text-gray-600 text-sm">
                          <div className="w-2 h-2 bg-[#203f78] rounded-full mr-3"></div>
                          <span>{f}</span>
                        </div>
                      ))}
                    </div>
                    <a
                      href={brochure?.pd}
                      download
                      className="w-full bg-[#203f78] hover:bg-[#ddaf26] text-white py-3 px-4 rounded-lg font-semibold transition-all flex items-center justify-center"
                    >
                      <Download className="w-5 h-5 mr-2" />
                      <span>Download Brochure</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'features' && (
            <div>
              <h2 className="text-3xl font-bold text-[#203f78] mb-8">Key Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {product.key_features?.map((feature: string, i: number) => (
                  <FeatureCard key={i} icon={Star} title={feature} description="Advanced functionality to boost efficiency and performance." />
                ))}
              </div>
            </div>
          )}

          {activeTab === 'benefits' && (
            <div>
              <h2 className="text-3xl font-bold text-[#203f78] mb-8">Benefits</h2>
              <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
                <ul className="space-y-4">
                  {product.benefits?.map((benefit: string, i: number) => (
                    <ListItem key={i} icon={Award}>{benefit}</ListItem>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'applications' && (
            <div>
              <h2 className="text-3xl font-bold text-[#203f78] mb-8">Applications</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {product.applications?.map((app: string, i: number) => (
                  <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                    <div className="flex items-start space-x-4">
                      <div className="bg-blue-100 p-3 rounded-lg">
                        <Lightbulb className="w-6 h-6 text-[#203f78]" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">{app}</h3>
                        <p className="text-gray-600 text-sm">Tailored for industry-specific needs.</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Video Section */}
        <div className="mt-16 mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-[#203f78] mb-4">See {product.name} in Action</h2>
            <p className="text-gray-600 text-lg">Watch how our solution transforms your workflow</p>
          </div>
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 max-w-4xl mx-auto">
            <div className="relative" style={{ paddingBottom: '42.5%' }}>
              {product.vid_url ? (
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src={product.vid_url.includes("youtube.com") ? product.vid_url : `https://www.youtube.com/embed/${product.vid_url.split("/").pop()?.split("?")[0]}`}
                  title="Product Demo"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              ) : (
                <p className="text-center text-gray-500 py-8">Video not available</p>
              )}
            </div>
          </div>
        </div>

        {/* Related Products - Horizontal Scroll with Working Arrows & Auto-scroll */}
        <div className="mt-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#203f78] mb-4">Explore More Products</h2>
          <p className="text-gray-600 text-lg">Discover other powerful solutions for your industry</p>
        </div>

        <div className="relative group">
          <div
            ref={scrollRef}
            className="overflow-x-auto scrollbar-hide snap-x snap-mandatory scroll-smooth px-4"
          >
            <div className="flex gap-8 pb-6 min-w-max">
              {products
                .filter(p => p.slug !== slug)
                .map(p => (
                  <div key={p.id} className="snap-center flex-shrink-0 w-80 md:w-96 transition-transform duration-300 hover:scale-105">
                    <ProductCard product={p} />
                  </div>
                ))}
            </div>
          </div>

          {/* Left Arrow */}
          <button
            onClick={scrollLeft}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur shadow-xl rounded-full p-3 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:scale-110 z-10"
          >
            <ChevronLeft className="w-7 h-7 text-[#203f78]" />
          </button>

          {/* Right Arrow */}
          <button
            onClick={scrollRight}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur shadow-xl rounded-full p-3 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:scale-110 z-10"
          >
            <ChevronRight className="w-7 h-7 text-[#203f78]" />
          </button>
        </div>

        <div className="text-center mt-12">
          <button
            onClick={() => navigate('/products')}
            className="bg-[#203f78] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#ddaf26] transition-colors inline-flex items-center space-x-2"
          >
            <span>View All Products</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>

        {/* Final CTA */}
        <div className="mt-16 rounded-2xl p-12 text-white text-center" style={{ backgroundColor: '#203f78' }}>
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-blue-100 mb-8 text-lg">
            Transform your operations with {product.name}. Contact our team for a personalized demo.
          </p>
          <Link
            to="/contact"
            className="bg-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors inline-flex items-center space-x-2"
            style={{ color: '#203f78' }}
          >
            <Mail className="w-5 h-5" />
            <span>Contact Sales</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SingleProductPage;