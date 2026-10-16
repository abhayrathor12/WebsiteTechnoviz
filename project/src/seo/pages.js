// Page titles and descriptions for search engines and link previews.
// Used by the React pages (src/components/SEO.tsx) and by the server-side
// renderer (api/render.js), so the same text is in the HTML Google first sees.
// Edit the text here, not in the page files.

export const SITE_URL = "https://www.technovizautomation.com";
export const SITE_NAME = "Technoviz Automation";
export const DEFAULT_IMAGE = `${SITE_URL}/og-image.jpg`;
// The server-side renderer can be pointed at a local backend with the BLOG_API_URL variable
export const BLOG_API_URL =
  (typeof process !== "undefined" && process.env.BLOG_API_URL) ||
  "https://websitebackend.pythonanywhere.com/api/blogs";

const BRAND = " | Technoviz Automation";

/** Adds the brand name to a title when it still fits in Google's ~60 character limit. */
export const withBrand = (title) =>
  title.length + BRAND.length <= 60 ? title + BRAND : title;

/** Joins sentences into a description, stopping before Google's ~160 character cut-off. */
export const fitDescription = (...parts) =>
  parts.filter(Boolean).reduce((acc, part) => {
    if (!acc) return part;
    const joined = `${acc} ${part}`;
    return joined.length <= 160 ? joined : acc;
  }, "");

/** Fixed pages, keyed by their canonical path */
export const PAGE_SEO = {
  "/": {
    "title": "Technoviz Automation | Industry 4.0 & IIoT Solutions India",
    "description": "Technoviz Automation helps manufacturers go digital with Industry 4.0, IIoT, OEE dashboards, energy management, Vision AI and industrial automation."
  },
  "/services": {
    "title": "Industrial Automation & Industry 4.0 Services | Technoviz",
    "description": "Digitization, IIoT, industrial communication, cybersecurity, automation and AI in manufacturing services that help factories cut downtime and boost efficiency."
  },
  "/products": {
    "title": "Industry 4.0 Products: OEE, EMS & Vision AI | Technoviz",
    "description": "Explore Technoviz products: OEE Dashboard, SmartEMS energy management, Utility360, Digital Checksheet, VisionAI inspection and Immersix AR/VR training."
  },
  "/blogs": {
    "title": "Industry 4.0 & Smart Manufacturing Blog | Technoviz",
    "description": "Practical articles on Industry 4.0, IIoT, OEE, real-time monitoring, energy management and smart manufacturing from the Technoviz Automation team."
  },
  "/case-studies": {
    "title": "Industry 4.0 Case Studies | Technoviz Automation",
    "description": "See how Technoviz Automation delivered ERP transformation, ammonia refrigeration automation, OPC UA integration and wireless optimization for industry."
  },
  "/company": {
    "title": "About Us | Technoviz Automation",
    "description": "Learn about Technoviz Automation, a Gurgaon-based Industry 4.0 company delivering IIoT, automation, cybersecurity and cloud solutions for manufacturers."
  },
  "/contact": {
    "title": "Contact Us | Technoviz Automation",
    "description": "Talk to Technoviz Automation about your Industry 4.0, IIoT or automation project. Call +91-9999765380 or send us a message from our Gurgaon office."
  },
  "/book": {
    "title": "Technology Integration: Industry 4.0 & IIoT Book | Technoviz",
    "description": "Technology Integration helps you navigate the digital revolution and master Industry 4.0 and Industrial IoT with expert insights and practical strategies."
  },
  "/coe": {
    "title": "Centre of Excellence in Industry 4.0 | Technoviz Automation",
    "description": "The Technoviz Centre of Excellence advances industrial automation through Industry 4.0, IoT and digital transformation learning and innovation."
  },
  "/learning": {
    "title": "Industry 4.0 Learning Resources | Technoviz Automation",
    "description": "Learning resources and expert insights on Python, React, Azure, networking, MySQL, Android and other technologies that power Industry 4.0."
  },
  "/python": {
    "title": "Python: Features, Uses & Learning Guide | Technoviz",
    "description": "Discover the power of Python: its features, real-world uses in automation, data and AI, and how to start learning it. A Technoviz learning resource."
  },
  "/react": {
    "title": "React: Features, Tools & Learning Guide | Technoviz",
    "description": "React is a JavaScript library for building fast, interactive and scalable user interfaces. Learn its features, ecosystem tools and real-world uses."
  },
  "/azure": {
    "title": "Microsoft Azure: Services & Use Cases | Technoviz",
    "description": "Discover the power of Microsoft Azure: cloud services for every business need, why organizations choose Azure and how it powers industries."
  },
  "/network": {
    "title": "Industrial Networking: TCP/IP, OPC UA & CCNA | Technoviz",
    "description": "Networking is the backbone of modern communication. Learn how TCP/IP, OPC UA and CCNA skills enable secure, seamless industrial data transfer."
  },
  "/mysql": {
    "title": "MySQL: Features, Uses & Learning Guide | Technoviz",
    "description": "Discover the power of MySQL, the popular open-source database: its features, real-world uses and how it supports data-driven applications."
  },
  "/android": {
    "title": "Android Development: Features & Learning Guide | Technoviz",
    "description": "Discover the power of Android development: tools, languages, app types and how to build modern mobile apps. A Technoviz learning resource."
  },
  "/Webinar-Registration": {
    "title": "Smart Manufacturing Webinar: IIoT & Industry 4.0 | Technoviz",
    "description": "Register for our Smart Manufacturing webinar: real-world IIoT and Industry 4.0 use cases, OEE monitoring and machine vision for automated inspection."
  },
  "/Ideathon": {
    "title": "Ideathon 2026: Smart Manufacturing & AI | Technoviz",
    "description": "Have an innovative idea for smart manufacturing, IIoT or AI? Register for Ideathon 2026 by Technoviz Automation and Aurex Ventures and pitch it."
  },
  "/Aurex-Webinar-Registration": {
    "title": "Deal Smart Webinar Registration | Technoviz Automation",
    "description": "Register for the Deal Smart webinar. Secure your seat with quick online registration and payment."
  },
  "/Smart-Manufacturing-AI-Masterclass": {
    "title": "Smart Manufacturing & AI Masterclass 2026 | Technoviz",
    "description": "Join the live Smart Manufacturing & AI Masterclass 2026 by Technoviz Automation. Learn practical Industry 4.0 and AI use cases for the shop floor."
  },
  "/Live-Production": {
    "title": "Live Production Dashboard | Technoviz Automation",
    "description": "Live production monitoring dashboard.",
    "noindex": true
  }
};

/** /services/:slug */
export const SERVICE_SEO = {
  "digitization": {
    "title": "Digitization Solutions | Technoviz Automation",
    "description": "Revolutionising industries with digitization solutions that replace paperwork, streamline workflows, and enhance efficiency."
  },
  "iiot": {
    "title": "Industrial IoT Services | Technoviz Automation",
    "description": "Unite industrial processes with cutting-edge connectivity, data analytics, and automation."
  },
  "industrial-communication": {
    "title": "Industrial Communication Solutions | Technoviz Automation",
    "description": "Reliable and secure communication networks tailored for industrial environments. Secure and scalable industrial communication services for modern factories."
  },
  "cybersecurity": {
    "title": "Industrial Cybersecurity | Technoviz Automation",
    "description": "Safeguard your IIoT and automation systems from evolving cyber threats. Comprehensive cybersecurity services for protecting industrial operations."
  },
  "automation-services": {
    "title": "Industrial Automation Services | Technoviz Automation",
    "description": "Streamline the future with advanced automation systems. Next-gen automation services for industrial plants and enterprises."
  },
  "ai-manufacturing": {
    "title": "AI in Manufacturing Solutions | Technoviz Automation",
    "description": "Leverage AI to optimize operations, predict failures, and enhance productivity."
  },
  "smart-industry-readiness-index": {
    "title": "Smart Industry Readiness Index (SIRI) | Technoviz Automation",
    "description": "Assess, benchmark, and accelerate your Industry 4.0 transformation journey."
  }
};

/** /products/:slug */
export const PRODUCT_SEO = {
  "immersix": {
    "title": "Immersix - AR/VR Training Solutions | Technoviz Automation",
    "description": "Transform workforce training with immersive AR/VR-powered modules that boost engagement, skills, and knowledge retention effectively."
  },
  "utility360": {
    "title": "Utility360 - Smart Utility Monitoring | Technoviz Automation",
    "description": "Comprehensive utility monitoring platform delivering predictive insights, smart tracking, remote access, and energy optimization daily."
  },
  "digital-checksheet": {
    "title": "Digital Checksheet - Quality Inspection System",
    "description": "Streamline inspections with AI-powered, paperless quality checksheets enabling automation, compliance reporting, and real-time monitoring."
  },
  "smart-ems": {
    "title": "SmartEMS - Energy Management System | Technoviz Automation",
    "description": "AI-driven energy management solution for real-time monitoring, sustainability reporting, optimization, and smarter carbon footprint tracking."
  },
  "oee-dashboard": {
    "title": "OEE Dashboard - Production Efficiency | Technoviz Automation",
    "description": "Boost productivity with real-time OEE dashboards offering live insights, downtime analysis, and customizable manufacturing metrics."
  },
  "vision-ai": {
    "title": "VisionAI - AI Visual Inspection | Technoviz Automation",
    "description": "AI-powered vision system enabling automated defect detection, object recognition, and scalable high-speed industrial quality inspection."
  }
};

/** Older blog posts kept in the frontend code (src/data/singlepageblogdata.ts) */
export const LOCAL_BLOG_SEO = {
  "industrial-communication-skills": {
    "title": "Industrial Communication Skills",
    "seoTitle": "Industrial Communication Skills | Technoviz Automation",
    "description": "Discover how communication drives efficiency and success in industrial operations.",
    "date": "2024-07-04"
  },
  "industrial-iot-business-models": {
    "title": "Industrial IoT Business Models: A Journey into Innovation",
    "seoTitle": "Industrial IoT Business Models: A Journey into Innovation",
    "description": "Explore innovative business models emerging with the rise of Industrial IoT.",
    "date": "2024-05-08"
  },
  "boost-productivity-with-oeedashboard": {
    "title": "Boost Productivity with Overall Equipment Efficiency Dashboard",
    "seoTitle": "Boost Productivity with OEE Dashboard | Technoviz Automation",
    "description": "Learn how OEE dashboards help industries optimise productivity and efficiency.",
    "date": "2023-08-11"
  },
  "smart-alarm-management-scada": {
    "title": "Enhance Operational Efficiency and Safety with Smart Alarm Management in SCADA Systems",
    "seoTitle": "Smart Alarm Management in SCADA Systems",
    "description": "Discover how smart alarm management improves safety and efficiency in SCADA systems.",
    "date": "2023-08-08"
  },
  "iiot-amplified-lighting-control": {
    "title": "How Using IIoT Has Amplified the Lighting Control",
    "seoTitle": "How IIoT Amplifies Lighting Control | Technoviz Automation",
    "description": "Explore how IIoT is revolutionising industrial lightning control for safety and efficiency.",
    "date": "2023-08-04"
  },
  "energy-management-system-efficiency": {
    "title": "How Does Energy Management System Help in Efficiency in Organisations",
    "seoTitle": "Energy Management Systems for Efficiency",
    "description": "Learn how energy management systems help organisations become more efficient.",
    "date": "2024-02-20"
  },
  "challenges-in-industry-4-0": {
    "title": "Challenges in Implementing Industry 4.0",
    "seoTitle": "Challenges in Implementing Industry 4.0",
    "description": "Understand the key challenges of implementing Industry 4.0 in India.",
    "date": "2024-02-25"
  },
  "transformation-industry-3-to-4": {
    "title": "Transformation Industry 3.0 to Industry 4.0",
    "seoTitle": "Transformation from Industry 3.0 to 4.0",
    "description": "Explore the transition from Industry 3.0 to Industry 4.0 and its implications.",
    "date": "2024-03-01"
  },
  "industry-4-0": {
    "title": "Industry 4.0",
    "seoTitle": "Industry 4.0 Overview | Technoviz Automation",
    "description": "Learn how Industry 4.0 integrates technologies like IoT, AI, and robotics.",
    "date": "2024-03-05"
  },
  "future-of-iiot-in-india": {
    "title": "Future of IIoT in India",
    "seoTitle": "Future of IIoT in India | Technoviz Automation",
    "description": "Discover how Industrial IoT is shaping the future of industries in India.",
    "date": "2024-03-10"
  }
};
