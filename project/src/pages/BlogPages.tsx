import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { Search, Calendar, User, ArrowRight, BookOpen, Filter, X, ChevronDown, Edit, FileText, PenTool } from 'lucide-react';

// Mock data
import { blogPosts as mockBlogPosts } from '../data/mockData';

// API fetch
import { fetchBlogs, BlogPost } from "../data/blogAPI";

import { Link } from 'react-router-dom';

const POSTS_PER_LOAD = 3;
const INITIAL_POSTS = 4; // 1 featured + 3 regular

// Blog Animation Component (unchanged)
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

const BlogsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [displayedCount, setDisplayedCount] = useState(INITIAL_POSTS);
  const [isLoading, setIsLoading] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Combined posts: mock + API
  const [allBlogPosts, setAllBlogPosts] = useState<BlogPost[]>(mockBlogPosts);
  const [loadingApi, setLoadingApi] = useState(true);

  // Fetch API blogs on mount
  useEffect(() => {
    const loadApiBlogs = async () => {
      try {
        const apiPosts = await fetchBlogs();
        setAllBlogPosts([...mockBlogPosts, ...apiPosts]);
      } catch (err) {
        console.error("Failed to load API blogs:", err);
        // Fall back to just mock data
        setAllBlogPosts(mockBlogPosts);
      } finally {
        setLoadingApi(false);
      }
    };
    loadApiBlogs();
  }, []);

  // Get all unique tags from combined posts
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    allBlogPosts.forEach(post => {
      (post.tags || []).forEach(tag => tags.add(tag));
    });
    return Array.from(tags);
  }, [allBlogPosts]);

  // Filter posts
  const filteredPosts = useMemo(() => {
    return allBlogPosts.filter(post => {
      const matchesSearch =
        post.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.author?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesTag = !selectedTag || (post.tags || []).includes(selectedTag);
      return matchesSearch && matchesTag;
    });
  }, [allBlogPosts, searchTerm, selectedTag]);

  // Reset displayed count when filters change
  useEffect(() => {
    setDisplayedCount(INITIAL_POSTS);
  }, [searchTerm, selectedTag]);

  const displayedPosts = filteredPosts.slice(0, displayedCount);
  const hasMore = displayedCount < filteredPosts.length;

  const formatDate = (dateString: any) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    } catch {
      return 'Unknown date';
    }
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedTag('');
    setDisplayedCount(INITIAL_POSTS);
  };

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
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 1000
      ) {
        loadMore();
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loadMore]);

  // Show loading spinner while fetching API
  if (loadingApi) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#203f78] border-t-transparent mx-auto mb-4"></div>
          <p className="text-xl text-[#203f78]">Loading articles...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-[#203f78] via-[#203f78]/90 to-[#203f78]/80 overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute inset-0 bg-[url(&quot;data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E&quot;)]"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-left">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white mb-6">
                <BookOpen className="h-4 w-4 mr-2" />
                <span className="text-sm font-medium">Latest Insights</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6">
                Our <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Blog</span>
              </h1>
              <p className="text-lg md:text-xl text-blue-100 leading-relaxed mb-8">
                Discover cutting-edge insights, tutorials, and industry perspectives from our team of experts.
              </p>
              <button className="px-8 py-4 bg-white text-[#203f78] rounded-2xl hover:bg-gray-100 transition-colors font-semibold shadow-lg hover:shadow-xl">
                Explore Articles
              </button>
            </div>
            <div className="hidden lg:block">
              <BlogAnimation />
            </div>
          </div>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-lg border-b border-gray-200/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
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
                  <div className="absolute top-full right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-gray-100 p-6 z-50">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
                        <select
                          value={selectedTag}
                          onChange={(e) => setSelectedTag(e.target.value)}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 bg-white"
                        >
                          <option value="">All Categories</option>
                          {allTags.map(tag => (
                            <option key={tag} value={tag}>{tag}</option>
                          ))}
                        </select>
                      </div>
                      <button onClick={clearFilters} className="w-full px-4 py-3 text-blue-600 hover:bg-blue-50 rounded-xl font-medium">
                        Clear All Filters
                      </button>
                    </div>
                  </div>
                )}
              </div>
              {(searchTerm || selectedTag) && (
                <button onClick={clearFilters} className="flex items-center gap-2 px-4 py-4 bg-red-50 text-red-600 rounded-2xl hover:bg-red-100">
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
                  <button onClick={() => setSearchTerm('')} className="hover:bg-blue-200 rounded-full p-0.5"><X className="h-3 w-3" /></button>
                </span>
              )}
              {selectedTag && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                  Category: {selectedTag}
                  <button onClick={() => setSelectedTag('')} className="hover:bg-purple-200 rounded-full p-0.5"><X className="h-3 w-3" /></button>
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {filteredPosts.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
              <Search className="h-10 w-10 text-blue-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">No articles found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search terms</p>
            <button onClick={clearFilters} className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-semibold">
              Show All Articles
            </button>
          </div>
        ) : (
          <>
            <div className="mb-8">
              <p className="text-gray-600">
                Showing <span className="font-semibold text-gray-900">{displayedPosts.length}</span> of{' '}
                <span className="font-semibold text-gray-900">{filteredPosts.length}</span> articles
              </p>
            </div>

            {/* Featured Post */}
            {displayedPosts.length > 0 && (
              <div className="mb-12">
                <div className="relative group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100">
                  <div className="lg:flex">
                    <div className="lg:w-1/2 relative">
                      <img
                        src={displayedPosts[0].featured_image || 'https://via.placeholder.com/800x600'}
                        alt={displayedPosts[0].title}
                        className="w-full h-64 lg:h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-[#ddaf26] text-white rounded-full text-sm font-semibold">Featured</span>
                      </div>
                    </div>
                    <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
                      <div className="flex flex-wrap gap-2 mb-4">
                        {(displayedPosts[0].tags || []).map(tag => (
                          <span key={tag} onClick={() => setSelectedTag(tag)} className="px-3 py-1 text-sm font-medium bg-blue-50 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <h2 className="text-3xl font-bold text-[#203f78] mb-4">{displayedPosts[0].title}</h2>
                      <p className="text-gray-600 mb-6 text-lg leading-relaxed">{displayedPosts[0].excerpt}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
                        <div className="flex items-center gap-2"><User className="h-4 w-4" /><span>{displayedPosts[0].author}</span></div>
                        <div className="flex items-center gap-2"><Calendar className="h-4 w-4" /><span>{formatDate(displayedPosts[0].publish_date)}</span></div>
                      </div>
                      <Link
                        to={`/blogs/${displayedPosts[0].slug}`}
                        className="flex items-center gap-3 px-8 py-4 bg-[#203f78] text-white rounded-2xl hover:bg-[#ddaf26] transition-all font-semibold text-lg"
                      >
                        Read Full Article <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Regular Posts Grid */}
            {displayedPosts.length > 1 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {displayedPosts.slice(1).map((post) => (
                  <article key={post.id || post.slug} className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-blue-200">
                    <div className="relative overflow-hidden h-56">
                      <img
                        src={post.featured_image || 'https://via.placeholder.com/600x400'}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex flex-wrap gap-2 mb-3">
                        {(post.tags || []).slice(0, 2).map(tag => (
                          <span key={tag} onClick={() => setSelectedTag(tag)} className="px-3 py-1 text-xs font-medium bg-blue-50 text-blue-600 rounded-full hover:bg-blue-100 cursor-pointer">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <h2 className="text-xl font-bold text-[#203f78] line-clamp-2 mb-3">{post.title}</h2>
                      <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">{post.excerpt}</p>
                      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                        <div className="flex items-center gap-1"><Calendar className="h-4 w-4" /><span>{formatDate(post.publish_date)}</span></div>
                      </div>
                      <Link
                        to={`/blogs/${post.slug}`}
                        className="flex items-center gap-3 px-8 py-4 bg-[#203f78] text-white rounded-2xl hover:bg-[#ddaf26] transition-all font-semibold text-lg"
                      >
                        Read Article <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            )}

            {/* Load More / Loading */}
            {isLoading && (
              <div className="flex justify-center py-12">
                <div className="flex items-center gap-3 px-6 py-4 bg-white rounded-2xl shadow-lg">
                  <div className="animate-spin rounded-full h-6 w-6 border-2 border-blue-500 border-t-transparent"></div>
                  <span className="text-gray-600 font-medium">Loading more articles...</span>
                </div>
              </div>
            )}

            {hasMore && !isLoading && (
              <div className="text-center py-8">
                <button onClick={loadMore} className="px-8 py-4 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 font-semibold shadow-lg">
                  Load More Articles
                </button>
              </div>
            )}

            {!hasMore && displayedPosts.length > INITIAL_POSTS && (
              <div className="text-center py-12">
                <div className="inline-flex items-center px-6 py-3 bg-gray-100 rounded-full">
                  <span className="text-gray-600 font-medium">You've reached the end</span>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Newsletter */}
      <div className="relative bg-gradient-to-r from-[#203f78] via-[#203f78]/90 to-[#203f78]/80 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url(&quot;data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E&quot;)]"></div>
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Never Miss an <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Update</span>
          </h2>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
            Get the latest insights delivered straight to your inbox
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <input type="email" placeholder="Enter your email address" className="flex-1 px-6 py-4 rounded-2xl text-gray-900 bg-white placeholder-gray-500" />
            <button className="px-8 py-4 bg-white text-[#203f78] rounded-2xl hover:bg-gray-100 font-semibold">
              Subscribe Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogsPage;