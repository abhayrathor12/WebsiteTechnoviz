import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { 
  ArrowLeft, 
  Star, 
  CheckCircle, 
  Users, 
  TrendingUp,
  Mail,
  ExternalLink,
  Lightbulb,
  Award,
  Zap,
  ChevronLeft,
  ChevronRight,
  ArrowRight
} from 'lucide-react';
import { products } from "../data/singlepagemockdata"
import { useNavigate, useParams } from 'react-router-dom';
// Mock product data

const SingleProductPage = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  // Find product by slug
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        <p>Product not found.</p>
      </div>
    );
  }

  // Get 3 related products (excluding current product)
  const relatedProducts = products
    .filter(p => p.slug !== slug)
    .slice(0, 3);

  // Mock multiple images for slider (you can replace these with actual product images)
  const sliderImages = product.all_images && product.all_images.length > 0
  ? product.all_images
  : [product.hero_image];

  // Auto-slide effect
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === sliderImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(slideInterval);
  }, [sliderImages.length]);

  const TabButton = ({ id, label, isActive, onClick }) => (
    <button
      onClick={() => onClick(id)}
      className={`px-6 py-3 font-medium text-sm transition-all duration-200 border-b-2 ${
        isActive 
          ? 'text-blue-600 border-blue-600 bg-blue-50' 
          : 'text-gray-600 border-transparent hover:text-blue-500 hover:border-blue-300'
      }`}
    >
      {label}
    </button>
  );

  const FeatureCard = ({ icon: Icon, title, description }) => (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start space-x-4">
        <div className="bg-blue-100 p-3 rounded-lg">
          <Icon className="w-6 h-6 text-blue-600" />
        </div>
        <div>
          <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
          <p className="text-gray-600 text-sm">{description}</p>
        </div>
      </div>
    </div>
  );

  const ListItem = ({ children, icon: Icon = CheckCircle }) => (
    <li className="flex items-start space-x-3">
      <Icon className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
      <span className="text-gray-700">{children}</span>
    </li>
  );

  const ProductCard = ({ product }) => (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="p-6">
        <img
          src={product.hero_image}
          alt={product.name}
          className="w-full h-48 object-contain rounded-lg mb-4"
        />
        <div className="flex items-center space-x-2 mb-3">
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
            {product.category}
          </span>
          <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3 h-3 fill-current text-yellow-400" />
            ))}
          </div>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.tagline}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {product.features?.slice(0, 2).map((feature, index) => (
            <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
              {feature}
            </span>
          ))}
          {product.features?.length > 2 && (
            <span className="text-gray-500 text-xs">+{product.features.length - 2} more</span>
          )}
        </div>
        <button
          onClick={() => navigate(`/products/${product.slug}`)}
          className="w-full bg-[#203f78] text-white py-3 px-4 rounded-lg font-medium hover:bg-[#ddaf26] transition-colors flex items-center justify-center space-x-2"
        >
          <span>Learn More</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );

  const nextSlide = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === sliderImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? sliderImages.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index) => {
    setCurrentImageIndex(index);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-4">
            <button 
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
              onClick={() => navigate('/')}
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Products</span>
            </button>
          </div>
        </div>
      </div>

      {/* Hero Section with Custom Color */}
      <div style={{ backgroundColor: '#203f78' }} className="text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-medium">
                  {product.category}
                </span>
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current text-yellow-400" />
                  ))}
                </div>
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                {product.name}
              </h1>
              <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                {product.tagline}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                
<Link
  to="/contact"
                  className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors flex items-center justify-center space-x-2"
                  style={{ color: '#203f78' }}
                >
                  <Mail className="w-5 h-5" />
                  <span>Get Started</span>
                </Link>
                <button 
                  className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white transition-colors flex items-center justify-center space-x-2"
                  style={{ '--tw-border-opacity': '1' }}
                  onMouseEnter={(e) => e.target.style.color = '#203f78'}
                  onMouseLeave={(e) => e.target.style.color = 'white'}
                >
                  <ExternalLink className="w-5 h-5" />
                  <span>View Demo</span>
                </button>
              </div>
            </div>
            
            {/* Image Slider */}
            <div className="relative">
              <div className="bg-white/10 rounded-2xl p-8 backdrop-blur-sm">
                <div className="relative overflow-hidden rounded-lg shadow-2xl">
                  {/* Images Container */}
                  <div 
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
                  >
                    {sliderImages.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`${product.name} - Image ${index + 1}`}
                        className="w-full h-64 object-contain flex-shrink-0"
                      />
                    ))}
                  </div>
                  
                  {/* Navigation Arrows */}
                  <button
                    onClick={prevSlide}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextSlide}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-colors"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                  
                  {/* Dots Indicator */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {sliderImages.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`w-3 h-3 rounded-full transition-colors ${
                          index === currentImageIndex 
                            ? 'bg-white' 
                            : 'bg-white/50 hover:bg-white/75'
                        }`}
                      />
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
          {product.features?.map((feature, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-lg">
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

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Tab Navigation */}
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
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Product Overview</h2>
                <div className="prose prose-lg text-gray-700 leading-relaxed">
                  <p>{product.long_description}</p>
                </div>
              </div>
              <div className="space-y-6">
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <h3 className="font-bold text-gray-900 mb-4 flex items-center space-x-2">
                    <TrendingUp className="w-5 h-5 text-blue-600" />
                    <span>Quick Stats</span>
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Category</span>
                      <span className="font-semibold text-gray-900">{product.category}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Features</span>
                      <span className="font-semibold text-gray-900">{product.key_features?.length || 0}+</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Applications</span>
                      <span className="font-semibold text-gray-900">{product.applications?.length || 0}+</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'features' && (
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Key Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {product.key_features?.map((feature, index) => (
                  <FeatureCard
                    key={index}
                    icon={Lightbulb}
                    title={feature}
                    description="Advanced functionality designed to enhance your workflow and productivity."
                  />
                ))}
              </div>
            </div>
          )}

          {activeTab === 'benefits' && (
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Benefits</h2>
              <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
                <ul className="space-y-4">
                  {product.benefits?.map((benefit, index) => (
                    <ListItem key={index} icon={Award}>
                      {benefit}
                    </ListItem>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'applications' && (
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Applications</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {product.applications?.map((application, index) => (
                  <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
                    <div className="flex items-start space-x-4">
                      <div className="bg-green-100 p-3 rounded-lg">
                        <Users className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">{application}</h3>
                        <p className="text-gray-600 text-sm">Optimized for industry-specific requirements and workflows.</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div className="mt-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Explore More Products</h2>
              <p className="text-gray-600 text-lg">Discover other solutions that can complement your workflow</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {relatedProducts.map((relatedProduct, index) => (
                <ProductCard key={index} product={relatedProduct} />
              ))}
            </div>
            
            <div className="text-center">
              <button
                onClick={() => navigate('/products')}
                className="bg-[#203f78] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#ddaf26] transition-colors inline-flex items-center space-x-2"
              >
                <span>Explore All Products</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* CTA Section with Custom Color */}
        <div 
          className="mt-16 rounded-2xl p-8 text-white text-center"
          style={{ backgroundColor: '#203f78' }}
        >
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