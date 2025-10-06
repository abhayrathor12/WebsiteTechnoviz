
import { Calendar, User, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from "react-router-dom";
import { useInView } from 'react-intersection-observer';
import { blogPosts } from '../data/mockData'; 
const BlogLayout = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
 

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Header */}
       <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        {/* Container for background text and main heading */}
        <div className="relative flex items-center justify-center mb-6">
          {/* Large background text */}
          <div className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-7xl font-bold uppercase tracking-wider text-gray-200 mb-4">
            INSIGHTS AND UPDATES
          </div>

          {/* Main heading */}
          <h2 className="absolute text-1.5xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-[#0B2B5A] font-poppins text-center">
            Blogs
          </h2>
        </div>

        {/* Optional tagline like in production.tsx */}
        <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
          Latest insights and updates from our team
        </p>
      </motion.div>

      {/* Blog Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Main Featured Post */}
        {/* Left Column - Main Featured Post */}
<div>
  <div className="bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300 h-full flex flex-col">
    <div className="relative flex-1">
      <img
        src={blogPosts[0].featured_image}
        alt={blogPosts[0].title}
        className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
      />
      <div className="absolute top-4 left-4">
        <span className="bg-[#203f78] text-white px-3 py-1 rounded-full text-sm font-medium">
          {blogPosts[0].tags[0]}
        </span>
      </div>
    </div>

    <div className="p-6 flex-1 flex flex-col">
      {/* ✅ Title now clickable instead of button */}
      <Link to={`/blogs/${blogPosts[0].slug}`} className="hover:text-[#203f78] transition-colors">
        <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-[#203f78] transition-colors flex-grow">
          {blogPosts[0].title}
        </h3>
      </Link>

      <p className="text-gray-600 text-base leading-relaxed mb-6">
        {blogPosts[0].excerpt}
      </p>

      <div className="flex items-center justify-between mt-auto">
        <div className="flex items-center space-x-4 text-sm text-gray-500">
          <div className="flex items-center space-x-1">
            <User className="w-4 h-4" />
            <span>{blogPosts[0].author}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Calendar className="w-4 h-4" />
            <span>
              {new Date(blogPosts[0].publish_date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>


        {/* Right Column - Blog List with Images */}
        <div className="space-y-4">
          {blogPosts.slice(1,4).map((post, index) => (
            <div key={post.id} className="group cursor-pointer">
              <div className="flex gap-4 items-start">
                {/* Blog Image */}
                <div className="w-32 h-24 flex-shrink-0 relative overflow-hidden rounded-lg">
                  <img
                    src={post.featured_image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 left-2">
                    <span className="bg-[#203f78] text-white px-2 py-1 rounded text-xs font-medium">
                      {post.tags[0]}
                    </span>
                  </div>
                </div>

                {/* Blog Content */}
                <div className="flex-1 min-w-0">
                  {/* Post Title */}
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-[#203f78] transition-colors leading-tight line-clamp-2">
  <Link to={`/blogs/${post.slug}`} className="hover:text-[#203f78] transition-colors">
    {post.title}
  </Link>
</h3>
                  {/* Post Meta */}
                  <div className="flex items-center space-x-3 text-xs text-gray-500 mb-2">
                    <div className="flex items-cen203f78ter space-x-1">
                      <User className="w-3 h-3" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-3 h-3" />
                      <span>
                        {new Date(post.publish_date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </span>
                    </div>
                  </div>

                  {/* Excerpt */}
                  <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              {/* Divider (except for last item) */}
              {index < blogPosts.slice(1).length - 1 && (
                <div className="border-b border-gray-200 mt-4"></div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* View All Blogs Button */}
      <div className="text-center mt-12">
        <Link
          to="/blogs"
          className="bg-[#203f78] text-white px-8 py-3 rounded-full hover:bg-[#ddaf26] transition-colors font-semibold inline-flex items-center space-x-2 mx-auto"
        >
          <span>View All Blogs</span>
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </div>
  );
};

export default BlogLayout;