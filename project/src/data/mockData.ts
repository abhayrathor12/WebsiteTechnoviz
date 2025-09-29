import { Service, Product, CaseStudy, BlogPost, Job } from '../types';
import Case1 from '../public/Case-1.jpg';
import {
  FileText,
  Network,
  Radio,
  Shield,
  Settings,
  BarChart,
  Box,
  Cpu,
  ClipboardCheck,
  Battery,
  Gauge,
  Check,
} from "lucide-react";
import Oeeimage from '../public/Oeeimage.jpg';
import emsimage from '../public/emsimage.jpg';

import immerimage from '../public/immersizimage.jpg';
import utilityimage from '../public/utilityimage.jpg';
import visionimage from '../public/visionimage.jpg';
import digital_image from '../public/digital.jpg';
import IIOT from '../public/IIoT.jpg';
import Indus from '../public/Indus.jpg';
import cyber from '../public/Cyber_image.jpg';
import Automation from '../public/Automation_image.jpeg';
import Blog1 from '../public/blog1.jpg';
import Blog2 from '../public/blog2.webp';
import Blog3 from '../public/blog3.webp';
import Blog4 from '../public/blog4.webp';
import Blog5 from '../public/blog5.webp';
import Blog6 from '../public/blog6.webp';
import Blog7 from '../public/blog7.jpg';
import Blog8 from '../public/blog8.jpg';
import Blog9 from '../public/blog9.jpg';
import Blog10 from '../public/blog10.jpg';

// 🔹 Updated Services
export const services: Service[] = [
  {
    id: '1',
    hero_image: digital_image,
    title: 'Digitization',
    short_description:
      'Replace paperwork with smart digital systems for real-time visibility and smarter decision-making.',
    long_description:
      'Our digitization services streamline industrial operations by converting manual records into intelligent digital systems. Get transparency, automation, and actionable insights at every step.',
    category: 'Digital Transformation',
    slug: 'digitization',
    icon: FileText,
    related_products: [],
    features: [
      'Online Production Systems',
      'E-Logbooks & Digital Records',
      'Reports & Analysis',
      'Maintenance Management',
      
    ],
    cta_text: 'Transform Now',
    seo_meta_title: 'Digitization Solutions',
    seo_description:
      'Smart digitization solutions to eliminate paperwork and enhance industrial efficiency.',
  },
  {
    id: '2',
    hero_image: IIOT,
    title: 'Industrial IoT (IIoT)',
    short_description:
      'IoT-powered connectivity for smarter factories and real-time operations monitoring.',
    long_description:
      'We help industries harness the power of IoT to connect assets, analyze performance, and enable real-time decision-making across the plant floor.',
    category: 'IoT',
   
    slug: 'iiot',
    icon: Network,
    related_products: [],
    features: [
      'IoT Cloud Solutions',
      'Mobility Solutions',
      'Real-time Information',
      'Visualization & Dashboards'
    ],
    cta_text: 'Connect Devices',
    seo_meta_title: 'Industrial IoT Services',
    seo_description:
      'Seamless IoT integration for factories, machines, and industrial systems.',
  },
  {
    id: '3',
    hero_image: Indus,
    title: 'Industrial Communication',
    short_description:
      'Reliable and secure communication networks for industrial operations.',
    long_description:
      'We provide scalable and secure communication infrastructure for industries, ensuring real-time connectivity across plants and remote sites.',
    category: 'Connectivity',
  
    slug: 'industrial-communication',
    icon: Radio,
    related_products: [],
    features: [
      'Industrial Gateways & Protocol Conversions',
      'Wireless Connectivity (2.4GHz / 5GHz)',
      'Satellite Communication Systems',
      'VSAT Technologies & Services'
    ],
    cta_text: 'Explore Solutions',
    seo_meta_title: 'Industrial Communication Solutions',
    seo_description:
      'Secure and scalable industrial communication services for modern factories.',
  },
  {
    id: '4',
    hero_image: cyber,
    title: 'Industrial Cybersecurity',
    short_description:
      'Safeguard operations from cyber threats with end-to-end protection.',
    long_description:
      'Our cybersecurity services protect industrial systems with cutting-edge tools for monitoring, threat prevention, and secure remote access.',
    category: 'Security',

    slug: 'cybersecurity',
    icon: Shield,
    related_products: [],
    features: [
      'DLP, HIPS & Whitelisting',
      'Endpoint Protection & Anti-malware',
      'SIEM (Security Information & Event Management)',
      'Network Monitoring & Segmentation',

    ],
    cta_text: 'Secure Now',
    seo_meta_title: 'Industrial Cybersecurity',
    seo_description:
      'Comprehensive cybersecurity services for protecting industrial operations.',
  },
  {
    id: '5',
    hero_image: Automation,
    title: 'Automation Services',
    short_description:
      'Boost productivity with advanced automation and control solutions.',
    long_description:
      'We design and deploy custom automation systems that integrate seamlessly with existing workflows to improve efficiency and reduce downtime.',
    category: 'Automation',
    
    slug: 'automation-services',
    icon: Settings,
    related_products: [],
    features: [
      'SCADA, HMI & Historians',
 
      'IoT Controllers',
      'RFID & Barcode Solutions',
      'Energy Management Systems',
    ],
    cta_text: 'Automate Now',
    seo_meta_title: 'Industrial Automation Services',
    seo_description:
      'Next-gen automation services for industrial plants and enterprises.',
  },
  {
    id: '6',
    hero_image: '/images/services/analytics.jpg',
    title: 'Analytics & Monitoring',
    short_description:
      'Turn real-time data into actionable insights for smarter decisions.',
    long_description:
      'Our analytics solutions help industries track performance, predict failures, and gain deeper insights into production data.',
    category: 'Analytics',
    
    slug: 'analytics-monitoring',
    icon: BarChart,
    related_products: [],
    features: [
      'Real-time Dashboards',
      'Performance Metrics',
      'Alerts & Notifications',
      'Comprehensive Reporting'
    ],
    cta_text: 'View Insights',
    seo_meta_title: 'Industrial Analytics & Monitoring',
    seo_description:
      'Advanced industrial analytics and monitoring systems for data-driven growth.',
  },
];
export const products: Product[] = [
  {
    id: 'immersix',
    icon: Box,
    name: 'Immersix (AR/VR Training)',
    slug: 'immersix',
    tagline:
      'Transform workforce training with immersive AR/VR-powered modules that boost engagement, skills, and knowledge retention effectively.',
    hero_image: immerimage,
    screenshots: [],
    features: [
      'Immersive VR learning modules',
      'Skill-based simulations',
      'Faster knowledge retention',
    ],
    pricing_link: '/contact',
    cta_text: 'Learn More',
    category: 'AR/VR',
    seo_meta_title: 'Immersix - AR/VR Training Solutions',
    seo_description:
      'Revolutionize workforce training with immersive AR/VR learning experiences.',
  },
  {
    id: 'utility360',
    icon: Cpu,
    name: 'Utility360',
    slug: 'utility360',
    tagline:
      'Comprehensive utility monitoring platform delivering predictive insights, smart tracking, remote access, and energy optimization daily.',
    hero_image: utilityimage,
    screenshots: [],
    features: [
      'Smart utility tracking',
      'Predictive maintenance',
      'Remote access & control',
    ],
    pricing_link: '/contact',
    cta_text: 'Learn More',
    category: 'Utility',
    seo_meta_title: 'Utility360 - Smart Utility Monitoring',
    seo_description:
      'Manage and monitor utilities with AI-powered insights and remote control.',
  },
  {
    id: 'digital-checksheet',
    icon: ClipboardCheck,
    name: 'Digital Checksheet',
    slug: 'digital-checksheet',
    tagline:
      'Streamline inspections with AI-powered, paperless quality checksheets enabling automation, compliance reporting, and real-time monitoring.',
    hero_image: digital_image,
    screenshots: [],
    features: [
      'Mobile-friendly inspection forms',
      'IoT-enabled validation',
      'Automated compliance reports',
    ],
    pricing_link: '/contact',
    cta_text: 'Learn More',
    category: 'Quality',
    seo_meta_title: 'Digital Checksheet - Quality Inspection System',
    seo_description:
      'Modernize quality inspection with a smart digital checksheet system.',
  },
  {
    id: 'smart-ems',
    icon: Battery,
    name: 'SmartEMS',
    slug: 'smart-ems',
    tagline:
      'AI-driven energy management solution for real-time monitoring, sustainability reporting, optimization, and smarter carbon footprint tracking.',
    hero_image: emsimage,
    screenshots: [],
    features: [
      'Real-time energy monitoring',
      'AI-based optimization',
      'Sustainability & carbon tracking',
    ],
    pricing_link: '/contact',
    cta_text: 'Learn More',
    category: 'Energy',
    seo_meta_title: 'SmartEMS - Energy Management System',
    seo_description:
      'Energy management system for cost savings, efficiency, and sustainability.',
  },
  {
    id: 'oee-dashboard',
    icon: Gauge,
    name: 'OEE Dashboard',
    slug: 'oee-dashboard',
    tagline:
      'Boost productivity with real-time OEE dashboards offering live insights, downtime analysis, and customizable manufacturing metrics.',
    hero_image: Oeeimage,
    screenshots: [],
    features: [
      'Downtime analysis',
      'Customizable dashboards',
      'Real-time production metrics',
    ],
    pricing_link: '/contact',
    cta_text: 'Learn More',
    category: 'Manufacturing',
    seo_meta_title: 'OEE Dashboard - Production Efficiency',
    seo_description:
      'Maximize production efficiency with live OEE monitoring dashboards.',
  },
  {
    id: 'vision-ai',
    name: 'VisionAI',
    icon: Check,
    slug: 'vision-ai',
    tagline:
      'AI-powered vision system enabling automated defect detection, object recognition, and scalable high-speed industrial quality inspection.',
    hero_image: visionimage,
    screenshots: [],
    features: [
      'Automated defect detection',
      'Object recognition',
      'High-speed AI analysis',
    ],
    pricing_link: '/contact',
    cta_text: 'Learn More',
    category: 'AI/ML',
    seo_meta_title: 'VisionAI - AI Visual Inspection',
    seo_description:
      'VisionAI enables automated defect detection and visual inspection at scale.',
  },
];


// ✅ Keeping your caseStudies, blogPosts, jobs as they were
export const caseStudies: CaseStudy[] = [
  {
    id: '1',
    title: 'Remote Scada and Mobility Solutions',
    client_name: 'TechCorp Industries',
    challenge: 'Different units/sub-units/departments which were operating within the premises having a distance of approx. 3 K.M… Lots of energy & manpower are engaged in monitoring & fetching the data related to production & energy consumption. The company was looking for a solution in which all the information can be monitored from a centralized Control Room and can be utilized the manpower in a more effective way and also improve the quality of raw data.',
    solution: 'We have proposed the solution to integrate all controllers, local SCADAs & PLCs and installed one server-based Remote SCADA System in the centralized control room. For that, we have created one server room and the complete plant-related information with customized dashboards has been provided in a centralized location. Information related to production persons, maintenance persons, and quality engineers & for Top Management is available 24X7 in a relevant customized format.',
    results: [
      { metric: 'Efficiency Increase', value: '45%' },
      { metric: 'Cost Reduction', value: '30%' },
      { metric: 'Processing Speed', value: '3x faster' },
    ],
    images: [Case1],
    testimonial: {
      quote: 'The transformation exceeded our expectations in every way.',
      author: 'Sarah Johnson',
      position: 'CTO, TechCorp Industries',
    },
    publish_date: '2024-01-15',
    slug: 'enterprise-erp-transformation',
    seo_meta_title: 'ERP Transformation Case Study',
    seo_description:
      'How we transformed a legacy ERP system for TechCorp Industries',
  },
  {
    id: '2',
    title: 'Ammonia-based Refrigeration Automation System for Milk Dairy Plant',
    client_name: 'Confidential Dairy Client',
    challenge:
      'Temperature and other critical parameters need to be managed as per the desired range as it will impact the working of all inventory products. It would be a huge loss for the company if the temperature is out of the range even for a few minutes.',
    solution:
      'Implemented redundant PLC System along with the mobility solution for the fast response time. Maintenance & production related critical parameters like outlet temp, Inlet temp, pressure, uptime, preventive maintenance schedule, and Overall Equipment Efficiency (OEE) are available with a single click and all critical alarms have been automatically sent through the mail & through messages on mobile phones. This solution helps customers to make uptime high.',
    results: [
      { metric: 'Uptime', value: 'High uptime achieved' },
      { metric: 'Response Time', value: 'Improved significantly' },
      { metric: 'Maintenance', value: 'Automated preventive scheduling' },
    ],
    images: [],
    testimonial: {
      quote: 'This solution has greatly improved our operational reliability.',
      author: 'Plant Manager',
      position: 'Milk Dairy Plant',
    },
    publish_date: '2024-02-20',
    slug: 'ammonia-refrigeration-automation',
    seo_meta_title: 'Refrigeration Automation Case Study',
    seo_description:
      'How we automated refrigeration systems in a milk dairy plant using redundant PLCs and mobility solutions.',
  },
  {
    id: '3',
    title: 'Multi-Protocol Integration for Centralized SCADA Using OPC UA',
    client_name: 'Confidential Client',
    challenge:
      'Technoviz Automation Solutions Private Limited has a proven track record of providing high-quality, custom software and automation projects. Our client list includes Fortune 500 Corporations, Government agencies, and small businesses. Our experience is broad and spans the Complete project development cycle',
    solution:
      'With the help of different gateways and communication protocol conversions on different network media we have successfully integrated Siemens S71500, ABB PM573 & Rockwell Compact Logix on a single platform i.e. OPC UA server while maintaining the quality of the flow of data by prioritizing it.',
    results: [
      { metric: 'Integration', value: 'Multi-vendor PLCs unified' },
      { metric: 'Reliability', value: 'High-quality data maintained' },
      { metric: 'Scalability', value: 'Future-proof integration' },
    ],
    images: [],
    testimonial: {
      quote: 'The centralized SCADA system exceeded expectations.',
      author: 'Automation Head',
      position: 'Client Organization',
    },
    publish_date: '2024-03-10',
    slug: 'multi-protocol-integration-opcua',
    seo_meta_title: 'Multi-Protocol SCADA Integration Case Study',
    seo_description:
      'How we unified Siemens, ABB, and Rockwell PLCs into a centralized OPC UA-based SCADA system.',
  },
  {
    id: '4',
    title: 'Wireless System Optimization for Industry 4.0 Data Integration',
    client_name: 'Industrial Client',
    challenge:
      'To integrate different controllers and field equipment with centralize data hub to achieve Industry 4.0 norms.',
    solution:
      'Being as domain experts we visited and reconfirm the Wireless system designed and check the data rate flow and replace the passive elements and used Multi Input Multi Output antennas by making these design level changes system is working perfectly and the customer-provided an appreciation letter for the same.',
    results: [
      { metric: 'Stability', value: 'Wireless system stabilized' },
      { metric: 'Performance', value: 'Optimized for Industry 4.0' },
      { metric: 'Customer Feedback', value: 'Received appreciation letter' },
    ],
    images: [],
    testimonial: {
      quote: 'Your wireless optimization was a game changer for our operations.',
      author: 'Operations Director',
      position: 'Industrial Client',
    },
    publish_date: '2024-04-05',
    slug: 'wireless-system-optimization-industry4',
    seo_meta_title: 'Wireless System Optimization Case Study',
    seo_description:
      'How we optimized wireless systems for Industry 4.0 data integration with MIMO antennas and design improvements.',
  },
];



export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Industrial Communication Skills',
    slug: 'industrial-communication-skills',
    author: 'Technoviz Automation',
    excerpt: 'In the world of industrial operations, communication is the cornerstone of efficiency and success.',
    body: 'Full blog content here...',
    tags: ['Industrial', 'Communication', 'Skills'],
    featured_image: Blog1,
    publish_date: '2024-02-01',
    seo_meta_title: 'Industrial Communication Skills',
    seo_description: 'Discover how communication drives efficiency and success in industrial operations.'
  },
  {
    id: '2',
    title: 'Industrial IoT Business Models: A Journey into Innovation',
    slug: 'industrial-iot-business-models',
    author: 'Technoviz Automation',
    excerpt: 'Today, we undertake an exciting journey into Industrial Internet of Things and its business models.',
    body: 'Full blog content here...',
    tags: ['IIoT', 'Business', 'Innovation'],
    featured_image: Blog2,
    publish_date: '2024-02-05',
    seo_meta_title: 'Industrial IoT Business Models: A Journey into Innovation',
    seo_description: 'Explore innovative business models emerging with the rise of Industrial IoT.'
  },
  {
    id: '3',
    title: 'Boost Productivity with Overall Equipment Efficiency Dashboard',
    slug: 'boost-productivity-with-oeedashboard',
    author: 'Technoviz Automation',
    excerpt: 'In today’s competitive industrial landscape, optimising operational efficiency is essential.',
    body: 'Full blog content here...',
    tags: ['Productivity', 'OEE', 'Dashboard'],
    featured_image: Blog3,
    publish_date: '2024-02-10',
    seo_meta_title: 'Boost Productivity with OEE Dashboard',
    seo_description: 'Learn how OEE dashboards help industries optimise productivity and efficiency.'
  },
  {
    id: '4',
    title: 'Enhance Operational Efficiency and Safety with Smart Alarm Management in SCADA Systems',
    slug: 'smart-alarm-management-scada',
    author: 'Technoviz Automation',
    excerpt: 'In industrial automation, SCADA alarm management enhances both safety and efficiency.',
    body: 'Full blog content here...',
    tags: ['SCADA', 'Safety', 'Efficiency'],
    featured_image: Blog4,
    publish_date: '2024-02-15',
    seo_meta_title: 'Smart Alarm Management in SCADA Systems',
    seo_description: 'Discover how smart alarm management improves safety and efficiency in SCADA systems.'
  },
  {
    id: '5',
    title: 'How Using IIoT Has Amplified the Lighting Control',
    slug: 'iiot-amplified-lighting-control',
    author: 'Technoviz Automation',
    excerpt: 'Industries continually seek innovative solutions to enhance control and efficiency using IIoT.',
    body: 'Full blog content here...',
    tags: ['IIoT', 'Lighting Control', 'Automation'],
    featured_image: Blog5,
    publish_date: '2024-02-18',
    seo_meta_title: 'How IIoT Amplifies Lighting Control',
    seo_description: 'Explore how IIoT is revolutionising lighting control in industrial environments.'
  },
  {
    id: '6',
    title: 'How Does Energy Management System Help in Efficiency in Organisations',
    slug: 'energy-management-system-efficiency',
    author: 'Technoviz Automation',
    excerpt: 'In an era where sustainable energy practices are gaining importance, EMS plays a crucial role.',
    body: 'Full blog content here...',
    tags: ['Energy', 'Efficiency', 'Sustainability'],
    featured_image: Blog6,
    publish_date: '2024-02-20',
    seo_meta_title: 'Energy Management Systems for Efficiency',
    seo_description: 'Learn how energy management systems help organisations become more efficient.'
  },
  {
    id: '7',
    title: 'Challenges in Implementing Industry 4.0',
    slug: 'challenges-in-industry-4-0',
    author: 'Technoviz Automation',
    excerpt: 'Implementing Industry 4.0 in India poses several challenges that must be addressed.',
    body: 'Full blog content here...',
    tags: ['Industry 4.0', 'Challenges', 'Automation'],
    featured_image: Blog7,
    publish_date: '2024-02-25',
    seo_meta_title: 'Challenges in Implementing Industry 4.0',
    seo_description: 'Understand the key challenges of implementing Industry 4.0 in India.'
  },
  {
    id: '8',
    title: 'Transformation Industry 3.0 to Industry 4.0',
    slug: 'transformation-industry-3-to-4',
    author: 'Technoviz Automation',
    excerpt: 'Industry 3.0 was characterised by automation, while Industry 4.0 integrates advanced technologies.',
    body: 'Full blog content here...',
    tags: ['Industry 3.0', 'Industry 4.0', 'Transformation'],
    featured_image: Blog8,
    publish_date: '2024-03-01',
    seo_meta_title: 'Transformation from Industry 3.0 to 4.0',
    seo_description: 'Explore the transition from Industry 3.0 to Industry 4.0 and its implications.'
  },
  {
    id: '9',
    title: 'Industry 4.0',
    slug: 'industry-4-0',
    author: 'Technoviz Automation',
    excerpt: 'Industry 4.0 refers to the fourth industrial revolution integrating advanced technologies.',
    body: 'Full blog content here...',
    tags: ['Industry 4.0', 'Automation', 'Technology'],
    featured_image: Blog9,
    publish_date: '2024-03-05',
    seo_meta_title: 'Industry 4.0 Overview',
    seo_description: 'Learn how Industry 4.0 integrates technologies like IoT, AI, and robotics.'
  },
  {
    id: '10',
    title: 'Future of IIoT in India',
    slug: 'future-of-iiot-in-india',
    author: 'Technoviz Automation',
    excerpt: 'The Industrial Internet of Things (IIoT) is a rapidly growing technology in India.',
    body: 'Full blog content here...',
    tags: ['IIoT', 'Future', 'India'],
    featured_image: Blog10,
    publish_date: '2024-03-10',
    seo_meta_title: 'Future of IIoT in India',
    seo_description: 'Discover how Industrial IoT is shaping the future of industries in India.'
  }
];


export const jobs: Job[] = [
  {
    id: '1',
    title: 'Senior Full Stack Developer',
    location: 'Remote / New York',
    description: 'Join our team to build cutting-edge software solutions',
    responsibilities: ['Develop scalable applications', 'Collaborate with cross-functional teams', 'Mentor junior developers'],
    skills: ['React', 'Node.js', 'TypeScript', 'AWS'],
    apply_link: '/contact'
  },
  {
    id: '2',
    title: 'DevOps Engineer',
    location: 'San Francisco / Remote',
    description: 'Help us scale our infrastructure and improve deployment processes',
    responsibilities: ['Manage CI/CD pipelines', 'Monitor system performance', 'Implement security best practices'],
    skills: ['Docker', 'Kubernetes', 'AWS', 'Terraform'],
    apply_link: '/contact'
  }
];