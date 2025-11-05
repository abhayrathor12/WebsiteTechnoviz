import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, ArrowRight, BookOpen, UserCheck, Lightbulb, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../public/Techlogo.png";
import { services, products } from "../data/mockData";
import { SiPython, SiReact, SiMysql, SiAndroid } from "react-icons/si";
import AZuree from "../public/az.png";

const megaMenuContent = {
  services: {
    title: "Our Services",
    exploreAllLink: "/services",
    exploreAllText: "Explore All Services",
    sections: services.map((s) => ({
      icon: s.icon ? <s.icon className="w-6 h-6" /> : "✨",
      title: s.title,
      description: s.medium_description,
      link: `/services/${s.slug}`,
    })),
  },
  solutions: {
    title: "Our Solutions",
    exploreAllLink: "/products",
    exploreAllText: "Explore All Products",
    sections: products.map((p) => ({
      icon: p.icon ? <p.icon className="w-6 h-6" /> : "✨",
      title: p.name,
      description: p.tagline,
      link: `/products/${p.slug}`,
    })),
  },
  learning: {
    title: "Learning Center",
    exploreAllLink: "/Learning",
    sections: [
      {
        icon: <BookOpen className="w-6 h-6" />,
        title: "Book",
        description: "Comprehensive guides, industry reports, and technical documentation to enhance your knowledge and skills.",
        link: "/book",
      },
      {
        icon: <UserCheck className="w-6 h-6" />,
        title: "In Person Training",
        description: "Center of Excellence insights, frameworks, and strategies to drive innovation, standardization, and organizational excellence.",
        link: "/coe",
      },
      {
        icon: <Lightbulb className="w-6 h-6" />,
        title: "Online Training Module",
        description: "Streamlined Lifecycle Management methodologies and best practices for optimal project delivery and resource optimization.",
        link: "/Learning",
      },
    ],
    technologies: [
      {
        icon: <SiPython className="w-6 h-6 text-[#3776AB]" />,
        title: "Python",
        description: "Utilize Python for versatile and powerful solutions, from web development to data analysis. Our Python expertise ensures efficient and effective project outcomes.",
        link: "/python",
      },
      {
        icon: <SiReact className="w-6 h-6 text-[#61DAFB]" />,
        title: "React",
        description: "Develop engaging and interactive user interfaces with React. Our React services focus on building fast, scalable, and maintainable applications.",
        link: "/react",
      },
      {
        icon: <img src={AZuree} alt="Azure" className="w-6 h-6" />,
        title: "Azure",
        description: "Leverage Microsoft Azure to build, deploy, and manage applications through a global network of data centers. Our Azure solutions ensure scalable, secure, and reliable cloud infrastructure.",
        link: "/azure",
      },
      {
        icon: <span className="w-6 h-6 text-blue-600">🌐</span>,
        title: "Networking",
        description: "Enhance connectivity and security with our networking expertise. We design and manage robust network infrastructures to support seamless business operations.",
        link: "/network",
      },
      {
        icon: <SiMysql className="w-6 h-6 text-orange-600" />,
        title: "MySQL",
        description: "Harness the power of MySQL for efficient database management. Our MySQL solutions ensure reliable, scalable, and optimized data storage and retrieval.",
        link: "/mysql",
      },
      {
        icon: <SiAndroid className="w-6 h-6 text-green-600" />,
        title: "Android",
        description: "Build powerful and user-friendly mobile applications with Android. Our Android solutions deliver seamless performance and engaging experiences across devices.",
        link: "/android",
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

  const phoneNumber = "+91 9999765380"; // Change this to your actual phone number

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setActiveDropdown(null);
    setIsMenuOpen(false);
  }, [location.pathname]);

  const navItems = [
    { name: "Home", path: "/", hasDropdown: false },
    { name: "Services", path: "/services", hasDropdown: true },
    { name: "Solutions", path: "/products", hasDropdown: true },
    { name: "Insights", path: "/case-studies", hasDropdown: false },
    { name: "Company", path: "/company", hasDropdown: false },
    { name: "Learning", path: "/learning", hasDropdown: true },
    { name: "Contact", path: "/contact", hasDropdown: false },
  ];

  const handleHomeClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (location.pathname === "/") {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    }
  };

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
      className="absolute top-full left-0 right-0 bg-white shadow-2xl border-t-4 border-[#ddaf26] z-50 max-h-[80vh] overflow-y-auto"
      onMouseEnter={handleDropdownMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold text-[#0B2B5A] mb-2">{content.title}</h3>
            <div className="w-20 h-1 bg-[#ddaf26]"></div>
          </div>
          {content.exploreAllText && (
            <Link
              to={content.exploreAllLink}
              onClick={() => setActiveDropdown(null)}
              className="group flex items-center space-x-2 text-[#203f78] hover:text-[#ddaf26] font-semibold transition-all duration-300"
            >
              <span>{content.exploreAllText}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          )}
        </div>

        {content.sections && content.sections.length > 0 && (
          <div className={content.technologies && content.technologies.length > 0 ? "mb-8" : ""}>
            {content.technologies && content.technologies.length > 0 && (
              <h4 className="text-lg font-semibold text-[#0B2B5A] mb-4 flex items-center">
                <span className="mr-2">Services</span>
                <div className="flex-1 h-px bg-gray-200"></div>
              </h4>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {content.sections.map((section: any, index: number) => (
                <Link
                  key={index}
                  to={section.link}
                  onClick={() => setActiveDropdown(null)}
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
                      <p className="text-sm text-gray-600 leading-relaxed">{section.description}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {content.technologies && content.technologies.length > 0 && (
          <div>
            <h4 className="text-lg font-semibold text-[#0B2B5A] mb-4 flex items-center">
              <span className="mr-2">Technologies</span>
              <div className="flex-1 h-px bg-gray-200"></div>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {content.technologies.map((tech: any, index: number) => (
                <Link
                  key={`tech-${index}`}
                  to={tech.link}
                  onClick={() => setActiveDropdown(null)}
                  className="group p-6 rounded-lg hover:border-[#ddaf26] hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-transparent"
                >
                  <div className="flex items-start space-x-4">
                    <div className="text-3xl mb-4 transition-transform duration-300 text-[#203f78] group-hover:text-[#ddaf26]">
                      {tech.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-[#0B2B5A] mb-2 group-hover:text-[#ddaf26] transition-colors duration-300">
                        {tech.title}
                      </h4>
                      <p className="text-sm text-gray-600 leading-relaxed">{tech.description}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
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
          <Link to="/" className="flex items-center space-x-2 text-[#0B2B5A] font-bold text-xl">
            <img src={logo} alt="TechnoViz Automation" className="h-10 w-auto" />
          </Link>

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
                  onClick={item.name === "Home" ? handleHomeClick : undefined}
                  className={`flex items-center space-x-1 text-sm font-medium transition-colors duration-200 hover:text-[#ddaf26] ${
                    location.pathname === item.path ? "text-[#ddaf26]" : "text-gray-700"
                  }`}
                >
                  <span>{item.name}</span>
                </Link>
              </div>
            ))}
          </nav>

          <div className="hidden lg:flex items-center space-x-4">
            <a
              href={`tel:${phoneNumber.replace(/\s/g, '')}`}
              className="flex items-center space-x-2 text-[#0B2B5A] hover:text-[#ddaf26] transition-colors duration-200 group"
            >
              <Phone className="w-4 h-4 flex-shrink-0" />
              <div className="flex flex-col">
                <span className="text-sm font-medium">{phoneNumber}</span>
           
              </div>
            </a>
            <Link
              to="/contact"
              className="bg-[#ddaf26] text-white px-6 py-2.5 rounded-lg font-medium hover:bg-[#c49a1f] transition-all duration-200 hover:-translate-y-0.5"
            >
              Talk to Us
            </Link>
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-gray-700"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {activeDropdown && megaMenuContent[activeDropdown as keyof typeof megaMenuContent] && (
          <MegaMenu
            content={megaMenuContent[activeDropdown as keyof typeof megaMenuContent]}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-gray-200 max-h-[calc(100vh-4rem)] overflow-y-auto"
          >
            <div className="container mx-auto px-4 py-4">
              <nav className="flex flex-col space-y-2">
                {navItems.map((item) => (
                  <div key={item.name}>
                    {item.hasDropdown ? (
                      <>
                        <div className="flex items-center justify-between">
                          <Link
                            to={item.path}
                            onClick={() => setIsMenuOpen(false)}
                            className={`flex-1 text-sm font-medium transition-colors duration-200 hover:text-[#ddaf26] py-2 ${
                              location.pathname === item.path ? "text-[#ddaf26]" : "text-gray-700"
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
                                mobileDropdowns[item.name.toLowerCase()] ? "rotate-180" : ""
                              }`}
                            />
                          </button>
                        </div>
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
                                {(
                                  megaMenuContent[item.name.toLowerCase() as keyof typeof megaMenuContent]
                                    .sections || []
                                ).map((section: any, index: number) => (
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
                                ))}
                                {(
                                  megaMenuContent[item.name.toLowerCase() as keyof typeof megaMenuContent]
                                    .technologies || []
                                ).map((tech: any, index: number) => (
                                  <Link
                                    key={`tech-mobile-${index}`}
                                    to={tech.link}
                                    onClick={() => setIsMenuOpen(false)}
                                    className="block group"
                                  >
                                    <div className="flex items-start space-x-3 py-2">
                                      <div className="text-[#203f78] group-hover:text-[#ddaf26] transition-colors duration-200">
                                        {tech.icon}
                                      </div>
                                      <div className="flex-1">
                                        <h5 className="text-sm font-medium text-[#0B2B5A] group-hover:text-[#ddaf26] transition-colors duration-200">
                                          {tech.title}
                                        </h5>
                                        <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                                          {tech.description}
                                        </p>
                                      </div>
                                    </div>
                                  </Link>
                                ))}
                                {megaMenuContent[item.name.toLowerCase() as keyof typeof megaMenuContent]
                                  .exploreAllText && (
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
                      <Link
                        to={item.path}
                        onClick={(e) => {
                          if (item.name === "Home" && location.pathname === "/") {
                            e.preventDefault();
                            window.scrollTo({ top: 0, behavior: "smooth" });
                          }
                          setIsMenuOpen(false);
                        }}
                        className={`block text-sm font-medium transition-colors duration-200 hover:text-[#ddaf26] py-2 ${
                          location.pathname === item.path ? "text-[#ddaf26]" : "text-gray-700"
                        }`}
                      >
                        {item.name}
                      </Link>
                    )}
                  </div>
                ))}

                <a
                  href={`tel:${phoneNumber.replace(/\s/g, '')}`}
                  className="flex items-center justify-center space-x-2 text-[#0B2B5A] hover:text-[#ddaf26] transition-colors duration-200 py-3 border border-[#0B2B5A] rounded-lg mt-2 group"
                >
                  <Phone className="w-4 h-4 flex-shrink-0" />
                  <div className="flex flex-col items-start">
                    <span className="text-sm font-medium">{phoneNumber}</span>
                    <span className="text-xs text-gray-600 group-hover:text-[#ddaf26] transition-colors duration-200">Mr. Kapil Khurana</span>
                  </div>
                </a>

                <Link
                  to="/contact"
                  onClick={() => setIsMenuOpen(false)}
                  className="bg-[#ddaf26] text-white px-6 py-2.5 rounded-lg font-medium hover:bg-[#c49a1f] transition-colors duration-200 text-center"
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