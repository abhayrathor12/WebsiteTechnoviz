import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Home, Briefcase, Package, BookOpen, FileText, Building2, Calendar, Target, Code, Cpu, Database, Network, Smartphone, GraduationCap } from 'lucide-react';

const QuickLink = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const quickLinks = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Services', path: '/services', icon: Briefcase },
    { name: 'Products', path: '/products', icon: Package },
    { name: 'Blogs', path: '/blogs', icon: BookOpen },
    { name: 'Case Studies', path: '/case-studies', icon: FileText },
    { name: 'Company', path: '/company', icon: Building2 },
    { name: 'Book', path: '/book', icon: Calendar },
    { name: 'COE', path: '/coe', icon: Target },
    { name: 'Python', path: '/python', icon: Code },
    { name: 'React', path: '/react', icon: Code },
    { name: 'Azure', path: '/azure', icon: Cpu },
    { name: 'Networking', path: '/network', icon: Network },
    { name: 'MySQL', path: '/mysql', icon: Database },
    { name: 'Android', path: '/android', icon: Smartphone },
    { name: 'Knowledge', path: '/knowledge', icon: GraduationCap },
    { name: 'Contact', path: '/contact', icon: Building2 },
  ];

  return (
    <>
      {/* Toggle Button */}
      <div className="fixed right-0 top-1/2 transform -translate-y-1/2 z-40 h-20">
        <button
          onClick={toggleMenu}
          className="bg-[#ddaf26] text-white pt-8 pb-8 rounded-l-lg shadow-lg hover:bg-[#203f78] transition-all duration-300 flex items-center gap-2"
          aria-label="Toggle Quick Links"
        >
          {isOpen ? (
            <>
              <ChevronRight size={20} />
            </>
          ) : (
            <>
              {/* <span className="text-sm font-semibold writing-mode-vertical">Quick Links</span> */}
              <ChevronLeft size={20} />
            </>
          )}
        </button>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleMenu}
        />
      )}

      {/* Sidebar Panel */}
      <div
        className={`fixed right-0 top-0 h-full w-80 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="bg-[#203f78] text-white p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Quick Links</h2>
              <button
                onClick={toggleMenu}
                className="hover:bg-white hover:bg-opacity-20 p-2 rounded-full transition-colors"
                aria-label="Close menu"
              >
                <ChevronRight size={24} />
              </button>
            </div>
            <p className="text-blue-100 text-sm mt-2">Navigate to any page quickly</p>
          </div>

          {/* Links Container */}
          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-2">
              {quickLinks.map((link, index) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={index}
                    to={link.path}
                    onClick={toggleMenu}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 transition-colors group"
                  >
                    <div className="bg-blue-100 p-2 rounded-lg group-hover:bg-blue-600 transition-colors">
                      <Icon size={20} className="text-blue-600 group-hover:text-white" />
                    </div>
                    <span className="font-medium text-gray-700 group-hover:text-blue-600 transition-colors">
                      {link.name}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-gray-200 p-4 bg-gray-50">
            <p className="text-xs text-gray-500 text-center">
              © 2024 All Rights Reserved
            </p>
          </div>
        </div>
      </div>

      <style>{`
        .writing-mode-vertical {
          writing-mode: vertical-rl;
          text-orientation: mixed;
        }
      `}</style>
    </>
  );
};

export default QuickLink;