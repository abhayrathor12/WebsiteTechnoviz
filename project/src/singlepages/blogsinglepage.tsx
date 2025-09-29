import { Calendar, User, Tag, ArrowLeft, Share2, BookOpen, Phone, Mail, ExternalLink } from 'lucide-react';
import { services } from '../data/mockData';
// You'll need to import your blog data
import { blogPosts } from '../data/singlepageblogdata';
import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom";
// Helper function to parse markdown-style content
// Enhanced parseContent function to handle tables and better formatting
const parseContent = (content: string) => {
  const lines = content.split('\n');
  const result = [];
  let currentTable = [];
  let inTable = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Check if this line looks like a table row (has a colon separator)
    const tableMatch = line.match(/^(.+?):\s*(.+)$/);
    
    if (tableMatch && !line.startsWith('#')) {
      // This is a table row
      if (!inTable) {
        inTable = true;
        currentTable = [];
      }
      currentTable.push({
        key: tableMatch[1].trim(),
        value: tableMatch[2].trim()
      });
      continue;
    } else if (inTable && currentTable.length > 0) {
      // End of table, render it
      result.push(
        <div key={`table-${i}`} className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 mb-8 border border-blue-100">
          <div className="grid gap-4">
            {currentTable.map((row, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 py-3 border-b border-blue-200 last:border-b-0">
                <div className="md:col-span-1">
                  <span className="font-semibold text-[#203f78] text-lg leading-relaxed">
                    {row.key}
                  </span>
                </div>
                <div className="md:col-span-2">
                  <span className="text-gray-700 leading-relaxed">
                    {row.value}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
      inTable = false;
      currentTable = [];
    }

    // Handle headers
    if (line.startsWith('## ')) {
      result.push(
        <h2 key={i} className="text-3xl font-bold text-[#203f78] mt-10 mb-6 leading-tight">
          {line.replace('## ', '')}
        </h2>
      );
    } else if (line.startsWith('### ')) {
      result.push(
        <h3 key={i} className="text-2xl font-semibold text-[#203f78] mt-8 mb-4 leading-tight">
          {line.replace('### ', '')}
        </h3>
      );
    }
    // Handle bold list items
    else if (line.startsWith('- **') && line.includes('**')) {
      const boldText = line.match(/\*\*(.*?)\*\*/);
      const restText = line.replace(/- \*\*(.*?)\*\*/, '').replace(':', '');
      result.push(
        <li key={i} className="mb-3 flex items-start">
          <span className="font-semibold text-[#203f78] mr-2 text-lg">
            {boldText ? boldText[1] : ''}:
          </span>
          <span className="text-gray-700 leading-relaxed">{restText}</span>
        </li>
      );
    }
    // Handle regular list items
    else if (line.startsWith('- ')) {
      result.push(
        <li key={i} className="mb-3 text-gray-700 leading-relaxed">
          {line.replace('- ', '')}
        </li>
      );
    }
    // Handle regular paragraphs
    else if (line.trim() && !line.startsWith('#')) {
      // Process inline bold text
      const processedLine = line.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-[#203f78]">$1</strong>');
      result.push(
        <p 
          key={i} 
          className="text-gray-700 leading-relaxed mb-6 text-lg"
          dangerouslySetInnerHTML={{ __html: processedLine }}
        />
      );
    }
  }

  // Handle any remaining table at the end
  if (inTable && currentTable.length > 0) {
    result.push(
      <div key={`table-end`} className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 mb-8 border border-blue-100">
        <div className="grid gap-4">
          {currentTable.map((row, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 py-3 border-b border-blue-200 last:border-b-0">
              <div className="md:col-span-1">
                <span className="font-semibold text-[#203f78] text-lg leading-relaxed">
                  {row.key}
                </span>
              </div>
              <div className="md:col-span-2">
                <span className="text-gray-700 leading-relaxed">
                  {row.value}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return result.filter(Boolean);
};

const SingleBlogPage = () => {
  const { slug } = useParams<{ slug: string }>(); // Get slug from URL
  const blogPost = blogPosts.find(post => post.slug === slug);

  if (!blogPost) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-[#203f78] mb-4">Blog Post Not Found</h1>
          <p className="text-gray-600 text-lg">The requested blog post could not be found.</p>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string | number | Date) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const estimateReadTime = (content: string) => {
    const wordsPerMinute = 200;
    const wordCount = content.split(' ').length;
    const readTime = Math.ceil(wordCount / wordsPerMinute);
    return `${readTime} min read`;
  };

//   const services = [
//     { name: 'Industrial Automation', icon: Wrench, href: '/services/automation' },
//     { name: 'Process Optimization', icon: Cog, href: '/services/optimization' },
//     { name: 'Control Systems', icon: Zap, href: '/services/control-systems' },
//     { name: 'Safety Solutions', icon: Shield, href: '/services/safety' }
//   ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <button className="flex items-center text-[#203f78] hover:text-[#ddaf26] transition-colors font-medium">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Blog
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Blog Content - Left Side */}
          <div className="lg:col-span-2">
            {/* Hero Section */}
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-4">
              {/* Meta Information */}
              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 mb-8">
                <div className="flex items-center bg-gray-50 px-3 py-2 rounded-lg">
                  <Calendar className="w-4 h-4 mr-2 text-[#203f78]" />
                  {formatDate(blogPost.publish_date)}
                </div>
                <div className="flex items-center bg-gray-50 px-3 py-2 rounded-lg">
                  <User className="w-4 h-4 mr-2 text-[#203f78]" />
                  {blogPost.author}
                </div>
                <div className="flex items-center bg-gray-50 px-3 py-2 rounded-lg">
                  <BookOpen className="w-4 h-4 mr-2 text-[#203f78]" />
                  {estimateReadTime(blogPost.body)}
                </div>
              </div>

              {/* Title */}
              <h1 className="text-4xl md:text-3xl font-bold text-[#203f78] leading-tight mb-4">
                {blogPost.title}
              </h1>

              {/* Excerpt */}
              <p className="text-l text-gray-600 leading-relaxed mb-4 font-light">
                {blogPost.excerpt}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-3 mb-8">
                {blogPost.tags.map((tag, index) => (
                  <span 
                    key={index}
                    className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-[#203f78] to-[#2c5096] text-white text-sm font-medium rounded-full shadow-sm hover:shadow-md transition-shadow"
                  >
                    <Tag className="w-3 h-3 mr-2" />
                    {tag}
                  </span>
                ))}
              </div>

              {/* Share Button */}
              <button className="flex items-center px-6 py-3 bg-[#203f78]  text-white rounded-xl hover:bg-[#ddaf26] transition-all font-semibold">
                <Share2 className="w-4 h-4 mr-2" />
                Share Article
              </button>
            </div>

            {/* Featured Image */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-10">
              <img 
                src={blogPost.featured_image}
                alt={blogPost.title}
                className="w-full h-72 md:h-96 object-cover"
              />
            </div>

            {/* Content */}
            <div className="bg-white rounded-2xl shadow-lg p-10">
              <article className="prose prose-xl max-w-none">
                <div className="space-y-6">
                  {parseContent(blogPost.body)}
                </div>
              </article>
            </div>
          </div>

          {/* Sidebar - Right Side */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-8">
              {/* Quick Links Section */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h3 className="text-2xl font-bold text-[#203f78] mb-6">Quick Links</h3>
                <nav className="space-y-3">
                  <a href="/company" className="flex items-center text-gray-700 hover:text-[#203f78] transition-colors py-3 px-4 rounded-lg hover:bg-gray-50 group">
                    <ExternalLink className="w-4 h-4 mr-3 group-hover:text-[#ddaf26]" />
                    <span className="font-medium">About Us</span>
                  </a>
                  <a href="/blogs" className="flex items-center text-gray-700 hover:text-[#203f78] transition-colors py-3 px-4 rounded-lg hover:bg-gray-50 group">
                    <ExternalLink className="w-4 h-4 mr-3 group-hover:text-[#ddaf26]" />
                    <span className="font-medium">All Blog Posts</span>
                  </a>
                  <a href="/case-studies" className="flex items-center text-gray-700 hover:text-[#203f78] transition-colors py-3 px-4 rounded-lg hover:bg-gray-50 group">
                    <ExternalLink className="w-4 h-4 mr-3 group-hover:text-[#ddaf26]" />
                    <span className="font-medium">Case Studies</span>
                  </a>
                  <a href="/contact" className="flex items-center text-gray-700 hover:text-[#203f78] transition-colors py-3 px-4 rounded-lg hover:bg-gray-50 group">
                    <ExternalLink className="w-4 h-4 mr-3 group-hover:text-[#ddaf26]" />
                    <span className="font-medium">Contact Us</span>
                  </a>
                </nav>
              </div>

              {/* Services Section */}
                <div className="bg-white rounded-2xl shadow-lg p-8">
                <h3 className="text-2xl font-bold text-[#203f78] mb-6">Our Services</h3>
                <div className="space-y-4">
                    {services.map((service, index) => {
                    const IconComponent = service.icon;
                    return (
                        <Link
                        key={index}
                        to={`/services/${service.slug}`} // Use "to" instead of href
                        className="flex items-center p-4 rounded-xl border-2 border-gray-100 hover:border-[#ddaf26] hover:bg-gradient-to-r hover:from-[#203f78]/5 hover:to-[#ddaf26]/5 transition-all group"
                        >
                        <IconComponent className="w-6 h-6 text-[#203f78] mr-4 group-hover:text-[#ddaf26]" />
                        <span className="text-gray-700 group-hover:text-[#203f78] font-semibold flex-1">
                            {service.title}
                        </span>
                        <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-[#ddaf26]" />
                        </Link>
                    );
                    })}
                </div>
                </div>
              {/* Need Help Section */}
              <div className="bg-gradient-to-br from-[#203f78] to-[#2c5096] rounded-2xl shadow-lg p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">Need Any Help?</h3>
                <p className="text-blue-100 mb-8 text-lg leading-relaxed">
                  Get in touch with our experts for personalized automation solutions.
                </p>
                
                <div className="space-y-5">
                  <a 
                    href="tel:+1234567890" 
                    className="flex items-center p-4 bg-white bg-opacity-10 rounded-xl hover:bg-opacity-20 transition-all backdrop-blur-sm"
                  >
                    <Phone className="w-6 h-6 mr-4 text-[#ddaf26]" />
                    <div>
                      <p className="text-sm text-blue-100 font-medium">Call Us</p>
                      <p className="font-bold text-lg">+91-9999765380</p>
                    </div>
                  </a>
                  
                  <a 
                    href="mailto:info@technovizautomation.com" 
                    className="flex items-center p-4 bg-white bg-opacity-10 rounded-xl hover:bg-opacity-20 transition-all backdrop-blur-sm"
                  >
                    <Mail className="w-6 h-6 mr-4 text-[#ddaf26]" />
                    <div>
                      <p className="text-sm text-blue-100 font-medium">Email Us</p>
                      <p className="font-bold text-lg break-all">info@technovizautomation.com</p>
                    </div>
                  </a>
                </div>

                <Link
  to="/contact"
  className="block w-full mt-8 bg-gradient-to-r from-[#ddaf26] to-[#e6bc3a] text-[#203f78] font-bold py-4 px-6 rounded-xl hover:shadow-xl transition-all text-center"
>
  Request Consultation
</Link>

              </div>

              
              {/* Related Articles */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h3 className="text-2xl font-bold text-[#203f78] mb-6">Related Articles</h3>
                <div className="space-y-6">
                  {blogPosts
                    .filter((post) => post.slug !== blogPost.slug) // exclude current post
                    .slice(0, 2) // show only 2
                    .map((post, index) => (
                      <Link
                        key={index}
                        to={`/blogs/${post.slug}`}
                        className="block group p-4 rounded-xl hover:bg-gray-50 transition-all"
                      >
                        <h4 className="font-bold text-[#203f78] group-hover:text-[#ddaf26] transition-colors mb-2 text-lg">
                          {post.title}
                        </h4>
                        <p className="text-gray-600 leading-relaxed">{post.excerpt}</p>
                      </Link>
                    ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-[#203f78] to-[#2c5096] mt-20">
        <div className="max-w-4xl mx-auto px-4 py-20 text-center">
          <h2 className="text-4xl font-bold text-white mb-6 leading-tight">
            Ready to Transform Your Operations?
          </h2>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto leading-relaxed">
            Contact Technoviz Automation today to learn how we can help optimize your industrial processes.
          </p>
         <Link
  to="/contact" className="bg-gradient-to-r from-[#ddaf26] to-[#e6bc3a] text-[#203f78] px-10 py-4 rounded-xl font-bold text-lg hover:shadow-xl transition-all">
            Get in Touch
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SingleBlogPage;