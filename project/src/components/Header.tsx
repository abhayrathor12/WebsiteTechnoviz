import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, ArrowRight, BookOpen, UserCheck, Lightbulb } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../public/Techlogo.png";
import { services, products } from "../data/mockData"; // ✅ adjust path if needed

// 🔹 Build mega menu dynamically from mockdata
const megaMenuContent = {
  services: {
    title: "Our Services",
    exploreAllLink: "/services",
    exploreAllText: "Explore All Services",
    sections: services.map((s) => ({
      icon: s.icon ? <s.icon className="w-6 h-6" /> : "✨",
      title: s.title,
      description: s.long_description,
      link: `/services/${s.slug}`,
    })),
  },
  products: {
    title: "Our Products",
    exploreAllLink: "/products",
    exploreAllText: "Explore All Products",
    sections: products.map((p) => ({
      icon: p.icon ? <p.icon className="w-6 h-6" /> : "✨",
      title: p.name,
      description: p.tagline,
      link: `/products/${p.slug}`,
    })),
  },
  knowledge: {
    title: "Knowledge Center",
    exploreAllLink: "/knowledge",
    sections: [
      {
        icon: <Lightbulb className="w-6 h-6" />,
        title: "SLM",
        description:
          "Streamlined Lifecycle Management methodologies and best practices for optimal project delivery and resource optimization.",
        link: "/knowledge/slm",
      },
      {
        icon: <UserCheck className="w-6 h-6" />,
        title: "CoE",
        description:
          "Center of Excellence insights, frameworks, and strategies to drive innovation, standardization, and organizational excellence.",
        link: "coe",
      },
      {
        icon: <BookOpen className="w-6 h-6" />,
        title: "Book",
        description:
          "Comprehensive guides, industry reports, and technical documentation to enhance your knowledge and skills.",
        link: "/book",
      },
    ],
  },
};

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null);
  const [mobileDropdowns, setMobileDropdowns] = useState<{ [key: string]: boolean }>({});
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ✅ Auto-close dropdown when route changes
  useEffect(() => {
    setActiveDropdown(null);
    setIsMenuOpen(false);
  }, [location.pathname]);

  const navItems = [
    { name: "Services", path: "/services", hasDropdown: true },
    { name: "Products", path: "/products", hasDropdown: true },
    { name: "Case Studies", path: "/case-studies", hasDropdown: false },
    { name: "Blogs", path: "/blogs", hasDropdown: false },
    { name: "Company", path: "/company", hasDropdown: false },
    { name: "Knowledge", path: "/knowledge", hasDropdown: true },
    { name: "Contact", path: "/contact", hasDropdown: false },
  ];

  const handleMouseEnter = (itemName: string) => {
    if (hoverTimeout) clearTimeout(hoverTimeout);
    const key = itemName.toLowerCase();
    if (megaMenuContent[key as keyof typeof megaMenuContent]) {
      setActiveDropdown(key);
    }
  };

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => setActiveDropdown(null), 150);
    setHoverTimeout(timeout);
  };

  const handleDropdownMouseEnter = () => {
    if (hoverTimeout) clearTimeout(hoverTimeout);
  };

  const toggleMobileDropdown = (itemName: string) => {
    const key = itemName.toLowerCase();
    setMobileDropdowns((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const MegaMenu = ({ content }: { content: any }) => (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className="absolute top-full left-0 right-0 bg-white shadow-2xl border-t-4 border-[#ddaf26] z-50"
      onMouseEnter={handleDropdownMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold text-[#0B2B5A] mb-2">
              {content.title}
            </h3>
            <div className="w-20 h-1 bg-[#ddaf26]"></div>
          </div>

          {/* ✅ Only show if exploreAllText exists */}
          {content.exploreAllText && (
            <Link
              to={content.exploreAllLink}
              onClick={() => setActiveDropdown(null)} // ✅ close on click
              className="group flex items-center space-x-2 text-[#203f78] hover:text-[#ddaf26] font-semibold transition-all duration-300"
            >
              <span>{content.exploreAllText}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {content.sections.map((section: any, index: number) => (
            <Link
              key={index}
              to={section.link}
              onClick={() => setActiveDropdown(null)} // ✅ close on click
              className="group p-6 rounded-lg hover:border-[#ddaf26] hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-transparent"
            >
              <div className="flex items-start space-x-4">
                <div className="text-3xl mb-4 transition-transform duration-300 text-[#203f78] group-hover:text-[#ddaf26]">
                  {section.icon}
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-[#0B2B5A] mb-2 group-hover:text-[#ddaf26] transition-colors duration-300">
                    {section.title}
                  </h4>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {section.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </motion.div>
  );

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-lg" : "bg-white/95 backdrop-blur-sm"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center space-x-2 text-[#0B2B5A] font-bold text-xl"
          >
            <img src={logo} alt="TechnoViz Automation" className="h-10 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => handleMouseEnter(item.name)}
                onMouseLeave={handleMouseLeave}
              >
                <Link
                  to={item.path}
                  className={`flex items-center space-x-1 text-sm font-medium transition-colors duration-200 hover:text-[#ddaf26] ${
                    location.pathname === item.path
                      ? "text-[#ddaf26]"
                      : "text-gray-700"
                  }`}
                >
                  <span>{item.name}</span>
                  {item.hasDropdown && (
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        activeDropdown === item.name.toLowerCase()
                          ? "rotate-180"
                          : ""
                      }`}
                    />
                  )}
                </Link>
              </div>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden lg:block">
            <Link
              to="/contact"
              className="bg-[#ddaf26] text-white px-6 py-2.5 rounded-lg font-medium hover:bg-[#c49a1f] transition-all duration-200 hover:-translate-y-0.5"
            >
              Talk to Us
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-gray-700"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mega Menu */}
      <AnimatePresence>
        {activeDropdown &&
          megaMenuContent[activeDropdown as keyof typeof megaMenuContent] && (
            <MegaMenu
              content={
                megaMenuContent[activeDropdown as keyof typeof megaMenuContent]
              }
            />
          )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-gray-200"
          >
            <div className="container mx-auto px-4 py-4">
              <nav className="flex flex-col space-y-2">
                {navItems.map((item) => (
                  <div key={item.name}>
                    {item.hasDropdown ? (
                      <>
                        {/* Main menu item with dropdown toggle */}
                        <div className="flex items-center justify-between">
                          <Link
                            to={item.path}
                            onClick={() => setIsMenuOpen(false)}
                            className={`flex-1 text-sm font-medium transition-colors duration-200 hover:text-[#ddaf26] py-2 ${
                              location.pathname === item.path
                                ? "text-[#ddaf26]"
                                : "text-gray-700"
                            }`}
                          >
                            {item.name}
                          </Link>
                          <button
                            onClick={() => toggleMobileDropdown(item.name)}
                            className="p-2 text-gray-500 hover:text-[#ddaf26]"
                          >
                            <ChevronDown
                              className={`w-4 h-4 transition-transform duration-200 ${
                                mobileDropdowns[item.name.toLowerCase()]
                                  ? "rotate-180"
                                  : ""
                              }`}
                            />
                          </button>
                        </div>

                        {/* Mobile dropdown content */}
                        <AnimatePresence>
                          {mobileDropdowns[item.name.toLowerCase()] &&
                            megaMenuContent[item.name.toLowerCase() as keyof typeof megaMenuContent] && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.2 }}
                                className="ml-4 mt-2 space-y-3 border-l-2 border-[#ddaf26] pl-4"
                              >
                                {megaMenuContent[item.name.toLowerCase() as keyof typeof megaMenuContent].sections.map(
                                  (section: any, index: number) => (
                                    <Link
                                      key={index}
                                      to={section.link}
                                      onClick={() => setIsMenuOpen(false)}
                                      className="block group"
                                    >
                                      <div className="flex items-start space-x-3 py-2">
                                        <div className="text-[#203f78] group-hover:text-[#ddaf26] transition-colors duration-200">
                                          {section.icon}
                                        </div>
                                        <div className="flex-1">
                                          <h5 className="text-sm font-medium text-[#0B2B5A] group-hover:text-[#ddaf26] transition-colors duration-200">
                                            {section.title}
                                          </h5>
                                          <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                                            {section.description}
                                          </p>
                                        </div>
                                      </div>
                                    </Link>
                                  )
                                )}

                                {/* Show explore all link if available */}
                                {megaMenuContent[item.name.toLowerCase() as keyof typeof megaMenuContent].exploreAllText && (
                                  <Link
                                    to={
                                      megaMenuContent[item.name.toLowerCase() as keyof typeof megaMenuContent]
                                        .exploreAllLink
                                    }
                                    onClick={() => setIsMenuOpen(false)}
                                    className="flex items-center space-x-2 text-[#203f78] hover:text-[#ddaf26] font-medium text-sm py-2 group"
                                  >
                                    <span>
                                      {
                                        megaMenuContent[item.name.toLowerCase() as keyof typeof megaMenuContent]
                                          .exploreAllText
                                      }
                                    </span>
                                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-300" />
                                  </Link>
                                )}
                              </motion.div>
                            )}
                        </AnimatePresence>
                      </>
                    ) : (
                      /* Regular menu item without dropdown */
                      <Link
                        to={item.path}
                        onClick={() => setIsMenuOpen(false)}
                        className={`block text-sm font-medium transition-colors duration-200 hover:text-[#ddaf26] py-2 ${
                          location.pathname === item.path
                            ? "text-[#ddaf26]"
                            : "text-gray-700"
                        }`}
                      >
                        {item.name}
                      </Link>
                    )}
                  </div>
                ))}

                {/* Mobile CTA Button */}
                <Link
                  to="/contact"
                  onClick={() => setIsMenuOpen(false)}
                  className="bg-[#0B2B5A] text-white px-6 py-2.5 rounded-lg font-medium hover:bg-[#ddaf26] transition-colors duration-200 text-center mt-4"
                >
                  Talk to Us
                </Link>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
