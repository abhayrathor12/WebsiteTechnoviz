import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { Calendar, TrendingUp, Award, ArrowRight, Star, Users, Target, Lightbulb, Search, BookOpen, Filter, X, ChevronDown, Edit, FileText, PenTool, User } from 'lucide-react';
import { caseStudies, blogPosts } from '../data/mockData';
import { Link } from 'react-router-dom';
import { CaseStudy } from '../types';

const POSTS_PER_LOAD = 3;
const INITIAL_POSTS = 4;

const formatDate = (dateString: string | number | Date) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

// 3D Animation for Case Studies
const CaseStudyAnimation = () => {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(prev => (prev + 1) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-2 md:p-4 shadow-xl"
            style={{
              width: window.innerWidth < 768 ? '80px' : '120px',
              height: window.innerWidth < 768 ? '100px' : '160px',
              transform: `
                rotateY(${rotation + i * 60}deg) 
                translateZ(${window.innerWidth < 768 ? '80px' : '120px'}px)
                translateY(${Math.sin(rotation * 0.01 + i * 2) * (window.innerWidth < 768 ? 15 : 30)}px)
              `,
              transformStyle: 'preserve-3d',
              left: `${50 + Math.cos(i * Math.PI / 3) * (window.innerWidth < 768 ? 20 : 30)}%`,
              top: `${50 + Math.sin(i * Math.PI / 3) * (window.innerWidth < 768 ? 20 : 30)}%`,
              animation: `float ${3 + i * 0.5}s ease-in-out infinite`,
              animationDelay: `${i * 0.2}s`
            }}
          >
            <div className="h-full flex flex-col justify-between">
              <div className="space-y-1 md:space-y-2">
                <div className="h-1 md:h-2 bg-gradient-to-r from-blue-300 to-indigo-300 rounded"></div>
                <div className="h-0.5 md:h-1 bg-white/40 rounded w-3/4"></div>
                <div className="h-0.5 md:h-1 bg-white/40 rounded w-1/2"></div>
              </div>
              <div className="space-y-0.5 md:space-y-1">
                <div className="flex justify-between items-center">
                  <Star className="w-2 h-2 md:w-3 md:h-3 text-yellow-300" />
                  <TrendingUp className="w-2 h-2 md:w-3 md:h-3 text-green-300" />
                </div>
                <div className="h-0.5 md:h-1 bg-gradient-to-r from-green-300 to-blue-300 rounded"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div 
        className="relative z-10 w-16 h-16 md:w-24 md:h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-2xl"
        style={{
          transform: `rotateY(${rotation * 2}deg) rotateX(${Math.sin(rotation * 0.02) * 10}deg)`,
          animation: 'pulse 2s ease-in-out infinite'
        }}
      >
        <Award className="w-8 h-8 md:w-12 md:h-12 text-white" />
      </div>
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotateY(0deg); }
          50% { transform: translateY(-20px) rotateY(180deg); }
        }
      `}</style>
    </div>
  );
};

// Blog Animation
const BlogAnimation = () => {
  const [currentIcon, setCurrentIcon] = useState(0);
  const icons = [BookOpen, Edit, FileText, PenTool];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIcon((prev) => (prev + 1) % icons.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-96 flex items-center justify-center">
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-32 h-20 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 p-3 animate-pulse">
          <div className="w-full h-2 bg-white/30 rounded mb-2"></div>
          <div className="w-3/4 h-2 bg-white/20 rounded mb-1"></div>
          <div className="w-1/2 h-2 bg-white/20 rounded"></div>
        </div>
        <div className="absolute top-32 right-8 w-36 h-24 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 p-3 animate-bounce delay-100">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-4 h-4 bg-white/40 rounded-full"></div>
            <div className="w-16 h-2 bg-white/30 rounded"></div>
          </div>
          <div className="w-full h-2 bg-white/20 rounded mb-1"></div>
          <div className="w-2/3 h-2 bg-white/20 rounded"></div>
        </div>
        <div className="absolute bottom-20 left-1/4 w-28 h-18 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 p-3 animate-pulse delay-200">
          <div className="w-full h-2 bg-white/30 rounded mb-2"></div>
          <div className="w-4/5 h-2 bg-white/20 rounded"></div>
        </div>
        <div className="absolute bottom-8 right-1/4 w-40 h-26 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 p-3 animate-bounce delay-300">
          <div className="w-full h-2 bg-white/30 rounded mb-2"></div>
          <div className="w-3/4 h-2 bg-white/20 rounded mb-1"></div>
          <div className="w-1/2 h-2 bg-white/20 rounded"></div>
        </div>
      </div>
      <div className="relative z-10 w-32 h-32 bg-white/20 backdrop-blur-sm rounded-full border-2 border-white/30 flex items-center justify-center">
        {icons.map((Icon, index) => (
          <Icon
            key={index}
            className={`absolute h-16 w-16 text-white transition-all duration-500 ${
              index === currentIcon 
                ? 'opacity-100 scale-100 rotate-0' 
                : 'opacity-0 scale-75 rotate-45'
            }`}
          />
        ))}
      </div>
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/40 rounded-full animate-ping"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>
    </div>
  );
};

const CaseStudiesAndBlogsPage: React.FC = () => {
  // Case Study States
  const [selectedCase, setSelectedCase] = useState<CaseStudy | null>(null);
  const [caseFilter, setCaseFilter] = useState<string>('all');
  const [hoveredCard, setHoveredCard] = useState<string | number | null>(null);

  // Blog States
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [displayedCount, setDisplayedCount] = useState(INITIAL_POSTS);
  const [isLoading, setIsLoading] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const getIndustryFromTitle = (title: string) => {
    if (title.toLowerCase().includes('erp') || title.toLowerCase().includes('scada')) return 'automation';
    if (title.toLowerCase().includes('dairy') || title.toLowerCase().includes('refrigeration')) return 'food';
    if (title.toLowerCase().includes('wireless') || title.toLowerCase().includes('industry 4.0')) return 'industry4';
    return 'technology';
  };

  const filteredCases = caseFilter === 'all' 
    ? caseStudies 
    : caseStudies.filter(cs => getIndustryFromTitle(cs.title) === caseFilter);

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    blogPosts.forEach(post => {
      post.tags.forEach(tag => tags.add(tag));
    });
    return Array.from(tags);
  }, []);

  const filteredPosts = useMemo(() => {
    let filtered = blogPosts.filter(post => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.author.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesTag = !selectedTag || post.tags.includes(selectedTag);
      return matchesSearch && matchesTag;
    });
    return filtered;
  }, [searchTerm, selectedTag]);

  useEffect(() => {
    setDisplayedCount(INITIAL_POSTS);
  }, [searchTerm, selectedTag]);

  const displayedPosts = filteredPosts.slice(0, displayedCount);
  const hasMore = displayedCount < filteredPosts.length;

  const loadMore = useCallback(() => {
    if (isLoading || !hasMore) return;
    setIsLoading(true);
    setTimeout(() => {
      setDisplayedCount(prev => prev + POSTS_PER_LOAD);
      setIsLoading(false);
    }, 500);
  }, [isLoading, hasMore]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop
        >= document.documentElement.offsetHeight - 1000
      ) {
        loadMore();
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loadMore]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedTag('');
    setDisplayedCount(INITIAL_POSTS);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #203f78 0%, #1a2b5c 50%, #0f1937 100%)' }}>
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute inset-0 bg-[url(&quot;data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E&quot;)]"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white mb-6">
                <Award className="h-4 w-4 mr-2" />
                <span className="text-sm font-medium">Success & Insights</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6">
                Our <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">Stories</span> & <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Insights</span>
              </h1>
              <p className="text-lg md:text-xl text-blue-100 leading-relaxed mb-8">
                Explore our transformative case studies and dive into expert insights on technology, automation, and industry trends.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link to="#case-studies" className="px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 rounded-2xl hover:from-yellow-300 hover:to-orange-400 transition-all font-semibold shadow-lg hover:shadow-xl">
                  View Case Studies
                </Link>
                <Link to="#blogs" className="px-8 py-4 bg-white text-[#203f78] rounded-2xl hover:bg-gray-100 transition-all font-semibold shadow-lg hover:shadow-xl">
                  Explore Blogs
                </Link>
              </div>
            </div>
            <div className="hidden lg:block relative h-96" style={{ perspective: '1000px' }}>
              <CaseStudyAnimation />
            </div>
          </div>
        </div>
      </div>

      {/* Case Studies Section */}
      <div id="case-studies" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#203f78] mb-4">Featured Case Studies</h2>
          <p className="text-gray-600 max-w-2xl mx-auto px-4">
            Real projects, real results. See how we've helped businesses across various industries achieve their goals.
          </p>
        </div>
        <div className="flex flex-wrap gap-4 justify-center mb-16 px-4">
          {['all', 'automation', 'food', 'industry4', 'technology'].map((filterOption) => (
            <button
              key={filterOption}
              onClick={() => setCaseFilter(filterOption)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 text-base ${
                caseFilter === filterOption
                  ? 'text-white shadow-lg shadow-blue-500/25'
                  : 'bg-white/80 text-gray-700 hover:bg-white shadow-md hover:shadow-lg border border-gray-200'
              }`}
              style={{
                background: caseFilter === filterOption ? 'linear-gradient(135deg, #203f78 0%, #1a2b5c 100%)' : undefined
              }}
            >
              {filterOption === 'all' ? 'All Projects' : 
               filterOption === 'automation' ? 'Automation' :
               filterOption === 'food' ? 'Food Industry' :
               filterOption === 'industry4' ? 'Industry 4.0' : 'Technology'}
            </button>
          ))}
        </div>
        <div className="space-y-12">
          {filteredCases.map((caseStudy, index) => (
            <div
              key={caseStudy.id}
              className="group relative"
              onMouseEnter={() => setHoveredCard(caseStudy.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-center ${index % 2 === 0 ? '' : 'lg:flex-row-reverse'}`}>
                <div className={`lg:col-span-5 px-4 ${index % 2 === 0 ? '' : 'lg:order-2'}`}>
                  <div className="relative overflow-hidden rounded-2xl shadow-lg group">
                    <img 
                      src={caseStudy.images[0] || '/api/placeholder/600/400'} 
                      alt={caseStudy.title}
                      className="w-full h-64 lg:h-96 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </div>
                <div className={`lg:col-span-7 space-y-6 px-4 ${index % 2 === 0 ? 'lg:pr-8' : 'lg:pl-8 lg:order-1'}`}>
                  <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-2 sm:space-y-0">
                      <div 
                        className="px-4 py-2 rounded-full text-white text-sm font-medium inline-block w-fit"
                        style={{ background: 'linear-gradient(135deg, #203f78 0%, #1a2b5c 100%)' }}
                      >
                        Case Study {index + 1}
                      </div>
                      <div className="flex items-center text-gray-500 text-sm">
                        <Calendar className="w-4 h-4 mr-2" />
                        {formatDate(caseStudy.publish_date)}
                      </div>
                    </div>
                    <h3 className="text-2xl lg:text-3xl font-bold text-[#203f78] leading-tight">
                      {caseStudy.title}
                    </h3>
                    <div className="flex items-center text-lg font-semibold" style={{ color: '#203f78' }}>
                      <Users className="w-5 h-5 mr-2 flex-shrink-0" />
                      <span className="truncate">{caseStudy.client_name}</span>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div>
                      <div className="flex items-center mb-3">
                        <Target className="w-5 h-5 text-red-500 mr-2 flex-shrink-0" />
                        <h4 className="text-lg font-semibold text-gray-800">Challenge</h4>
                      </div>
                      <p className="text-base text-gray-600 leading-relaxed pl-7">
                        {caseStudy.challenge}
                      </p>
                    </div>
                    <div>
                      <div className="flex items-center mb-3">
                        <Lightbulb className="w-5 h-5 text-yellow-500 mr-2 flex-shrink-0" />
                        <h4 className="text-lg font-semibold text-gray-800">Solution</h4>
                      </div>
                      <p className="text-base text-gray-600 leading-relaxed pl-7">
                        {caseStudy.solution}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="px-4 mt-8">
                <div 
                  className={`bg-white/70 backdrop-blur-sm rounded-2xl p-6 lg:p-4 shadow-lg border transition-all duration-500 ${
                    hoveredCard === caseStudy.id ? 'shadow-2xl border-blue-200 transform -translate-y-2' : 'border-white/50'
                  }`}
                >
                  <div className="flex items-center mb-3">
                    <TrendingUp className="w-6 h-6 text-green-600 mr-3 flex-shrink-0" />
                    <h4 className="text-xl font-bold text-gray-800">Key Results</h4>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    {caseStudy.results.map((result, idx) => (
                      <div 
                        key={idx} 
                        className="text-center p-4 rounded-xl border transition-all duration-300 hover:shadow-md min-h-[80px] flex flex-col justify-center"
                        style={{ 
                          background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
                          borderColor: '#203f78'
                        }}
                      >
                        <div className="text-xl font-bold mb-1 break-words" style={{ color: '#203f78' }}>
                          {result.value}
                        </div>
                        <div className="text-sm text-gray-600 font-medium leading-tight break-words">
                          {result.metric}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Blog Section */}
      <div id="blogs" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#203f78] mb-4">Latest Insights</h2>
          <p className="text-gray-600 max-w-2xl mx-auto px-4">
            Discover cutting-edge insights, tutorials, and industry perspectives from our team of experts.
          </p>
        </div>

        {/* Blog Filters */}
        <div className="top-0 z-50  backdrop-blur-lg border-b border-gray-200/50 shadow-sm py-4 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-2xl w-full">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search for articles, authors, or topics..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border-2 border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-gray-900 placeholder-gray-500 bg-white shadow-sm"
              />
            </div>
            <div className="flex items-center gap-3 w-full lg:w-auto">
              <div className="relative">
                <button
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className="flex items-center gap-2 px-6 py-4 bg-white border-2 border-gray-100 rounded-2xl hover:border-blue-200 transition-all font-medium text-gray-700 shadow-sm"
                >
                  <Filter className="h-5 w-5" />
                  <span>Filters</span>
                  <ChevronDown className={`h-4 w-4 transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} />
                </button>
                {isFilterOpen && (
  <div className="absolute bottom-full right-0 mb-2 w-80 bg-white rounded-2xl shadow-xl border border-gray-100 p-6 z-50 transform -translate-x-1/4 lg:translate-x-0">
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
        <select
          value={selectedTag}
          onChange={(e) => setSelectedTag(e.target.value)}
          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
        >
          <option value="">All Categories</option>
          {allTags.map(tag => (
            <option key={tag} value={tag}>{tag}</option>
          ))}
        </select>
      </div>
      <button
        onClick={clearFilters}
        className="w-full px-4 py-3 text-blue-600 hover:bg-blue-50 rounded-xl transition-colors font-medium"
      >
        Clear All Filters
      </button>
    </div>
  </div>
)}
              </div>
              {(searchTerm || selectedTag) && (
                <button
                  onClick={clearFilters}
                  className="flex items-center gap-2 px-4 py-4 bg-red-50 text-red-600 rounded-2xl hover:bg-red-100 transition-colors"
                >
                  <X className="h-4 w-4" />
                  <span className="text-sm font-medium">Clear</span>
                </button>
              )}
            </div>
          </div>
          {(searchTerm || selectedTag) && (
            <div className="flex flex-wrap gap-2 mt-4">
              {searchTerm && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                  Search: "{searchTerm}"
                  <button onClick={() => setSearchTerm('')} className="hover:bg-blue-200 rounded-full p-0.5">
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}
              {selectedTag && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                  Category: {selectedTag}
                  <button onClick={() => setSelectedTag('')} className="hover:bg-purple-200 rounded-full p-0.5">
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}
            </div>
          )}
        </div>

        {/* Blog Posts */}
        {filteredPosts.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
              <Search className="h-10 w-10 text-blue-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">No articles found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search terms or browse all categories</p>
            <button
              onClick={clearFilters}
              className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-semibold"
            >
              Show All Articles
            </button>
          </div>
        ) : (
          <>
            <div className="mb-8">
              <p className="text-gray-600">
                Showing <span className="font-semibold text-gray-900">{displayedPosts.length}</span> of{' '}
                <span className="font-semibold text-gray-900">{filteredPosts.length}</span>
                {filteredPosts.length === 1 ? ' article' : ' articles'}
                {(searchTerm || selectedTag) && ' matching your criteria'}
              </p>
            </div>
            {displayedPosts.length > 0 && (
              <div className="mb-12">
                <div className="relative group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100">
                  <div className="lg:flex">
                    <div className="lg:w-1/2 relative">
                      <img
                        src={displayedPosts[0].featured_image}
                        alt={displayedPosts[0].title}
                        className="w-full h-64 lg:h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-[#ddaf26] text-white rounded-full text-sm font-semibold">
                          Featured
                        </span>
                      </div>
                    </div>
                    <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
                      <div className="flex flex-wrap gap-2 mb-4">
                        {displayedPosts[0].tags.map(tag => (
                          <span
                            key={tag}
                            className="px-3 py-1 text-sm font-medium bg-blue-50 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 transition-colors"
                            onClick={() => setSelectedTag(tag)}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <h2 className="text-3xl font-bold text-[#203f78] mb-4">
                        {displayedPosts[0].title}
                      </h2>
                      <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                        {displayedPosts[0].excerpt}
                      </p>
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4" />
                            <span>{displayedPosts[0].author}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            <span>{formatDate(displayedPosts[0].publish_date)}</span>
                          </div>
                        </div>
                      </div>
                      <Link 
                        to={`/blogs/${blogPosts[0].slug}`}
                        className="flex items-center gap-3 px-8 py-4 bg-[#203f78] text-white rounded-2xl hover:bg-[#ddaf26] transition-all duration-200 group-hover:shadow-lg font-semibold text-lg"
                      >
                        Read Full Article
                        <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {displayedPosts.length > 1 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {displayedPosts.slice(1).map((post) => (
                  <article
                    key={post.id}
                    className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-blue-200 hover:-translate-y-1"
                  >
                    <div className="relative overflow-hidden h-56">
                      <img
                        src={post.featured_image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <div className="p-6">
                      <div className="flex flex-wrap gap-2 mb-3">
                        {post.tags.slice(0, 2).map(tag => (
                          <span
                            key={tag}
                            className="px-3 py-1 text-xs font-medium bg-blue-50 text-blue-600 rounded-full hover:bg-blue-100 transition-colors cursor-pointer"
                            onClick={() => setSelectedTag(tag)}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <h2 className="text-xl font-bold text-[#203f78] line-clamp-2 leading-tight mb-3">
                        {post.title}
                      </h2>
                      <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">{post.excerpt}</p>
                      <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1">
                            <User className="h-4 w-4" />
                            <span>{post.author}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>{formatDate(post.publish_date)}</span>
                        </div>
                      </div>
                      <Link 
                        to={`/blogs/${post.slug}`}
                        className="flex items-center gap-3 px-8 py-4 bg-[#203f78] text-white rounded-2xl hover:bg-[#ddaf26] transition-all duration-200 group-hover:shadow-lg font-semibold text-lg"
                      >
                        Read Article
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            )}
            {isLoading && (
              <div className="flex justify-center items-center py-12">
                <div className="flex items-center gap-3 px-6 py-4 bg-white rounded-2xl shadow-lg border border-gray-200">
                  <div className="animate-spin rounded-full h-6 w-6 border-2 border-blue-500 border-t-transparent"></div>
                  <span className="text-gray-600 font-medium">Loading more articles...</span>
                </div>
              </div>
            )}
            {hasMore && !isLoading && (
              <div className="text-center py-8">
                <button
                  onClick={loadMore}
                  className="px-8 py-4 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl"
                >
                  Load More Articles
                </button>
              </div>
            )}
            {!hasMore && displayedPosts.length > INITIAL_POSTS && (
              <div className="text-center py-12">
                <div className="inline-flex items-center px-6 py-3 bg-gray-100 rounded-full">
                  <span className="text-gray-600 font-medium">You've reached the end of the articles</span>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* CTA Section */}
      <div className="relative bg-gradient-to-r from-[#203f78] via-[#203f78]/90 to-[#203f78]/80 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url(&quot;data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E&quot;)]"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Award className="w-10 h-10 text-yellow-400 mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Transform Your Business?
          </h2>
          <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto leading-relaxed">
            Join our growing list of satisfied clients and stay updated with the latest industry insights.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <Link
              to="/contact"
              className="px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 rounded-2xl hover:from-yellow-300 hover:to-orange-400 transition-all font-semibold shadow-lg hover:shadow-xl"
            >
              Start Your Transformation
            </Link>
            <input
              type="email"
              placeholder="Enter your email for updates"
              className="flex-1 px-6 py-4 rounded-2xl text-gray-900 focus:ring-2 focus:ring-white focus:outline-none bg-white shadow-lg placeholder-gray-500"
            />
            <button className="px-8 py-4 bg-white text-[#203f78] rounded-2xl hover:bg-gray-100 transition-colors font-semibold shadow-lg hover:shadow-xl">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Case Study Modal */}
      {selectedCase && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="p-6 lg:p-8">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 pr-4 leading-tight">{selectedCase.title}</h2>
                <button
                  onClick={() => setSelectedCase(null)}
                  className="text-gray-400 hover:text-gray-600 text-2xl font-bold flex-shrink-0 w-8 h-8 flex items-center justify-center"
                >
                  ×
                </button>
              </div>
              <div className="prose prose-sm md:prose-lg max-w-none">
                <p><strong>Client:</strong> {selectedCase.client_name}</p>
                <p><strong>Published:</strong> {formatDate(selectedCase.publish_date)}</p>
                <h3>Challenge</h3>
                <p>{selectedCase.challenge}</p>
                <h3>Solution</h3>
                <p>{selectedCase.solution}</p>
                <h3>Results</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 not-prose">
                  {selectedCase.results.map((result: { value: string; metric: string }, idx: React.Key) => (
                    <div key={idx} className="p-4 rounded-lg" style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)' }}>
                      <div className="text-xl font-bold break-words" style={{ color: '#203f78' }}>{result.value}</div>
                      <div className="text-gray-700 text-base break-words">{result.metric}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CaseStudiesAndBlogsPage;