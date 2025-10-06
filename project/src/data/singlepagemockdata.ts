import { Service , Product } from '../types';

import {
  FileText,
  Network,
  Radio,
  Shield,
  Settings,
  Box,
  Cpu,
  ClipboardCheck,
  Battery,
  Gauge,
  Check,
  Cloud,
  Zap,
  Server,
  
  
  
} from "lucide-react";


import quality from "../pdfs/Technoviz Quality Inspection brochure.pdf"
import utility from "../pdfs/Technibiz Utility360 Brochure.pdf"
import ems from "../pdfs/Technobiz SmartEMS brochure.pdf"
import arvr from "../pdfs/Technoviz ARVR Application Brochure.pdf"
import oee from "../pdfs/Technoviz OEE Dashboard brochure.pdf"
import image from "../pdfs/Image Processing System - Technoviz Automation.pdf"


import digital_image from '../public/digital.jpg';
import digital_image2 from '../public/digital2.png';
import digital_image3 from '../public/digital3.png';
import digital_image4 from '../public/digital4.png';
import IIOT from '../public/IIoT.jpg';
import Indus from '../public/Indus.jpg';
import cyber from '../public/Cyber_image.jpg';
import Automation from '../public/Automation_image.jpeg';
import Aihero from '../public/aihero.png';

import Oeeimage1 from '../public/Oeeimage.jpg';
import Oeeimage2 from '../public/oee2.png';
import Oeeimage3 from '../public/oee3.png';
import Oeeimage4 from '../public/oee4.png';
import emsimage1 from '../public/emsimage.jpg';
import emsimage2 from '../public/ems2.png';
import emsimage3 from '../public/ems3.png';
import emsimage4 from '../public/ems4.png';

import immerimage1 from '../public/immersizimage.jpg';
import immerimage2 from '../public/immersi2.png';
import immerimage3 from '../public/immersi3.png';
import immerimage4 from '../public/immersi4.png';
import utilityimage1 from '../public/utilityimage.jpg';
import utilityimage2 from '../public/utility2.jpg';
import utilityimage3 from '../public/utility3.jpg';
import utilityimage4 from '../public/utility4.jpg';
import visionimage1 from '../public/visionimage.jpg';



export const services: Service[] = [
  {
    id: '1',
    hero_image: digital_image,
    title: 'Digitization',
    short_description: 'Revolutionising industries with digitization solutions that replace paperwork, streamline workflows, and enhance efficiency.',
    long_description: `
      Embracing digitization solutions in software can revolutionise operations, improve efficiency, and drive business growth. 
      Digitization is not just about implementing the latest technology; it’s about transforming how you do business.

      From automating routine tasks to implementing workflow management systems, Technoviz Automation Solution enhances operational efficiency, 
      enabling you to focus on high-value activities. With our digitization services, you can streamline processes, enhance collaboration, 
      leverage data-driven insights, and deliver exceptional customer experiences.
    `,
    category: 'Digital Transformation',
    slug: 'digitization',
    icon: FileText,
    related_products: [
      'Smart Forms Platform',
      'ERP Integration Tools',
      'Cloud Document Management',
    ],
    features: [
      'Online Production Systems',
      'E-logbooks',
      'Reports & Analysis',
      'Maintenance Management',
      'ERP Integration',
    ],
    detailed_features: [
      {
        title: 'Online Production Systems',
        description: 'Streamline production processes and optimise efficiency with real-time tracking, inventory management, and error reduction.',
      },
      {
        title: 'E-logbooks',
        description: 'Capture and store critical data digitally, ensuring compliance, transparency, and historical accessibility.',
      },
      {
        title: 'Reports & Analysis',
        description: 'Generate customizable reports, visualize trends, and gain insights for continuous process improvement.',
      },
      {
        title: 'Maintenance Management',
        description: 'Preventive scheduling, real-time monitoring, and streamlined work orders to maximise asset life.',
      },
      {
        title: 'ERP Integration',
        description: 'Seamlessly synchronise digitized systems with ERP platforms for a unified business process view.',
      },
    ],
    cta_text: 'Transform Now',
    seo_meta_title: 'Digitization Solutions',
    seo_description: 'Smart digitization solutions to eliminate paperwork and enhance industrial efficiency.',
  },
  {
    id: '2',
    hero_image: IIOT,
    title: 'Industrial IoT (IIoT)',
    short_description: 'Unite industrial processes with cutting-edge connectivity, data analytics, and automation.',
    long_description: `
      The Industrial Internet of Things (IIoT) connects machines, sensors, and systems, enabling real-time data exchange, 
      advanced analytics, and smarter decision-making. It bridges the gap between traditional OT (Operational Technology) 
      and IT (Information Technology).

      With IIoT, businesses can implement predictive maintenance, remote monitoring, and intelligent automation that 
      increases productivity while reducing downtime and costs.
    `,
    category: 'IoT',
    slug: 'iiot',
    icon: Network,
    related_products: [
      'IoT Gateways',
      'Cloud Platforms',
      'Mobile Apps',
    ],
    features: [
      'IIoT Cloud Solutions',
      'Mobility Solutions',
      'Real-time Information',
      'Visualisation Dashboards',
    ],
    detailed_features: [
      {
        title: 'IIoT Cloud Solutions',
        description: 'Secure and scalable infrastructure for real-time monitoring, predictive maintenance, and integration with industrial systems.',
      },
      {
        title: 'Mobility Solutions',
        description: 'Mobile access to live data, alerts, and workflows from anywhere for rapid decision-making.',
      },
      {
        title: 'Real-time Information',
        description: 'Data acquisition, historical analysis, and machine-to-machine communication to optimize processes.',
      },
      {
        title: 'Visualization',
        description: 'Interactive dashboards and reports that turn raw industrial data into actionable insights.',
      },
    ],
    cta_text: 'Connect Devices',
    seo_meta_title: 'Industrial IoT Services',
    seo_description: 'Seamless IoT integration for factories, machines, and industrial systems.',
  },
  {
    id: '3',
    hero_image: Indus,
    title: 'Industrial Communication',
    short_description: 'Reliable and secure communication networks tailored for industrial environments.',
    long_description: `
      Industrial Communication Solutions provide seamless data exchange, control, and monitoring across 
      manufacturing, energy, and transportation industries. From gateways and protocol conversions to 
      wireless and VSAT connectivity, we ensure your operations stay connected even in remote or 
      harsh conditions.
    `,
    category: 'Connectivity',
    slug: 'industrial-communication',
    icon: Radio,
    related_products: [
      'Protocol Converters',
      'Wireless Devices',
      'VSAT Solutions',
    ],
    features: [
      'Protocol Conversions',
      'Wireless Communication',
      'VSAT Communication',
    ],
    detailed_features: [
      {
        title: 'Protocol Conversions',
        description: 'Enable seamless communication across Modbus, Profibus, Ethernet/IP, and more.',
      },
      {
        title: 'Wireless Communication',
        description: 'Robust Wi-Fi, Bluetooth, and cellular-based industrial connectivity with enterprise-grade security.',
      },
      {
        title: 'VSAT Communication',
        description: 'Satellite-powered global coverage for remote plants, offshore facilities, and critical operations.',
      },
    ],
    cta_text: 'Explore Solutions',
    seo_meta_title: 'Industrial Communication Solutions',
    seo_description: 'Secure and scalable industrial communication services for modern factories.',
  },
  {
    id: '4',
    hero_image: cyber,
    title: 'Industrial Cybersecurity',
    short_description: 'Safeguard your IIoT and automation systems from evolving cyber threats.',
    long_description: `
      With IIoT and automation increasing connectivity, industrial systems are exposed to more 
      vulnerabilities than ever before. Technoviz provides multi-layered cybersecurity services, 
      including endpoint protection, SIEM, secure remote access, and network segmentation.
    `,
    category: 'Security',
    slug: 'cybersecurity',
    icon: Shield,
    related_products: [
      'SIEM Tools',
      'Firewalls',
      'Endpoint Protection',
    ],
    features: [
      'DLP, HIPS & Whitelisting',
      'SIEM',
      'Network Monitoring',
      'Multi-factor Authentication',
      'Backup & Disaster Recovery',
    ],
    detailed_features: [
      {
        title: 'Data Loss Prevention & Whitelisting',
        description: 'Prevent breaches by restricting processes to approved apps and monitoring sensitive data.',
      },
      {
        title: 'SIEM',
        description: 'Centralized event log collection, correlation, and threat detection for faster response.',
      },
      {
        title: 'Network Monitoring & Segmentation',
        description: 'Real-time monitoring, segmentation, and isolation of critical assets.',
      },
      {
        title: 'Secure Remote Access',
        description: 'Encrypted connectivity and MFA for authorized personnel accessing systems remotely.',
      },
      {
        title: 'Backup & Disaster Recovery',
        description: 'Protect operations from outages and ensure business continuity with reliable recovery.',
      },
    ],
    cta_text: 'Secure Now',
    seo_meta_title: 'Industrial Cybersecurity',
    seo_description: 'Comprehensive cybersecurity services for protecting industrial operations.',
  },
  {
    id: '5',
    hero_image: Automation,
    title: 'Automation Services',
    short_description: 'Streamline the future with advanced automation systems.',
    long_description: `
      Our industrial automation services cover PLCs, SCADA, electrical controls, 
      IoT controllers, and energy management systems. We integrate diverse systems 
      into seamless operations that increase efficiency, reduce downtime, and 
      improve sustainability.
    `,
    category: 'Automation',
    slug: 'automation-services',
    icon: Settings,
    related_products: [
      'PLC Systems',
      'IoT Controllers',
      'Energy Platforms',
    ],
    features: [
      'PLC/PLS Configuration',
      'SCADA Design',
      'Electrical Control Systems',
      'IIoT Controllers',
      'RFID & Barcode',
      'Energy Management Systems',
    ],
    detailed_features: [
      {
        title: 'PLC/PLS Systems',
        description: 'Custom-configured systems to automate, control, and secure processes.',
      },
      {
        title: 'SCADA Design',
        description: 'End-to-end SCADA architecture with predictive maintenance capabilities.',
      },
      {
        title: 'Electrical Control Systems',
        description: 'Reliable and safe control systems for motors, power distribution, and processes.',
      },
      {
        title: 'Energy Management Systems',
        description: 'Track and optimise energy consumption, reduce costs, and improve sustainability.',
      },
      {
        title: 'RFID & Barcode',
        description: 'Accurate inventory management and supply chain visibility with smart tracking solutions.',
      },
    ],
    cta_text: 'Automate Now',
    seo_meta_title: 'Industrial Automation Services',
    seo_description: 'Next-gen automation services for industrial plants and enterprises.',
  },
  {
    id: '6',
    hero_image: Aihero, // add your image import
    title: 'AI in Manufacturing',
    short_description: 'Leverage AI to optimize operations, predict failures, and enhance productivity.',
    long_description: `
      Our AI-powered solutions help industries optimize operations, predict equipment failures, 
      and unlock valuable insights from production data. From predictive maintenance to computer 
      vision-based quality inspection, we enable smarter and more resilient manufacturing processes.
    `,
    category: 'AI',
    slug: 'ai-manufacturing',
    icon: Cpu, // or Brain icon if available
    related_products: [
      'Predictive Maintenance Tools',
      'AI Vision Systems',
      'Digital Twin Platforms',
    ],
    features: [
      'Real-time Dashboards',
      'Performance Metrics',
      'Predictive Maintenance',
      'Computer Vision for Quality',
      'Comprehensive Reporting',
    ],
    detailed_features: [
      {
        title: 'Real-time Dashboards',
        description: 'Monitor production lines and machine health with intuitive AI-driven dashboards.',
      },
      {
        title: 'Predictive Maintenance',
        description: 'Anticipate equipment failures before they occur, reducing downtime and maintenance costs.',
      },
      {
        title: 'Computer Vision for Quality',
        description: 'Automated defect detection and quality inspection using advanced vision AI.',
      },
      {
        title: 'Performance Metrics',
        description: 'Track efficiency, cycle times, and productivity KPIs with AI-driven insights.',
      },
      {
        title: 'Comprehensive Reporting',
        description: 'AI-powered analytics for actionable insights, trend forecasting, and decision support.',
      },
    ],
    cta_text: 'Explore AI Solutions',
    seo_meta_title: 'AI in Manufacturing Solutions',
    seo_description: 'Harness the power of AI in manufacturing to boost efficiency, reduce downtime, and drive innovation.',
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
    hero_image: immerimage1,
    all_images:[immerimage1,immerimage2,immerimage3,immerimage4],
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

    long_description: `Immersix redefines workforce learning by merging immersive AR and VR technologies with industrial training practices. Instead of passive, classroom-based instruction, employees are placed in interactive, risk-free 3D environments that replicate real-world challenges and machinery. Trainees can perform virtual hands-on tasks, practice complex procedures, and learn from instant visual feedback — all without operational downtime or safety risks.

The platform supports customizable modules across industries, enabling organizations to train operators, technicians, and engineers efficiently. It integrates performance analytics to track learning progress and measure skill proficiency, helping identify strengths and areas for improvement. Immersix also allows for remote access, enabling global teams to participate in the same training modules simultaneously. This combination of realism, accessibility, and analytics makes Immersix a powerful tool for enhancing workforce competency, safety awareness, and operational excellence.`,
    key_features: [
      'AR/VR immersive training modules',
      'Skill-based learning simulations',
      'Customizable industry-specific content',
      'Performance tracking and analytics',
      'Remote learning accessibility',
    ],
    benefits: [
      'Boosts workforce engagement and knowledge retention',
      'Provides safe, risk-free training environments',
      'Reduces training costs and downtime',
      'Improves worker productivity and skill readiness',
      'Scales easily across multiple teams and locations',
    ],
    applications: [
      'Manufacturing training simulations',
      'Healthcare skill development',
      'Oil & Gas safety training',
      'Construction workforce upskilling',
      'Corporate learning & onboarding',
    ],
  },
  {
    id: 'utility360',
    icon: Cpu,
    name: 'Utility360',
    slug: 'utility360',
    tagline:
      'Comprehensive utility monitoring platform delivering predictive insights, smart tracking, remote access, and energy optimization daily.',
    hero_image: utilityimage1,
    all_images:[utilityimage1,utilityimage2,utilityimage3,utilityimage4],
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

    long_description: `Utility360 is an intelligent IIoT-enabled platform that provides comprehensive visibility into an organization’s energy and utility consumption. It continuously collects data from devices such as pumps, compressors, chillers, and HVAC systems, translating it into actionable insights through AI-powered analytics and predictive modeling.

By integrating with existing PLCs and SCADA systems, Utility360 eliminates data silos, providing a unified dashboard for monitoring utility performance across facilities. Its predictive maintenance algorithms detect anomalies before failures occur, reducing costly downtime. The platform also enables remote monitoring and control, empowering facility managers to optimize performance from anywhere.

Designed for scalability, Utility360 adapts to industrial plants, commercial complexes, and municipal infrastructures, ensuring efficient resource utilization, sustainability compliance, and improved ROI. With its smart automation and energy optimization capabilities, Utility360 transforms everyday operations into data-driven, sustainable ecosystems.`,

    key_features: [
      'Real-time monitoring of utility systems',
      'Remote device control and automation',
      'Customizable dashboards with analytics',
      'Predictive maintenance insights',
      'Instant alerts for anomalies',
      'Seamless integration with existing infrastructure',
    ],
    benefits: [
      'Reduce downtime with predictive alerts',
      'Optimize energy and resource consumption',
      'Enhance operational oversight with remote monitoring',
      'Preventive maintenance reduces repair costs',
      'Improve overall facility efficiency',
    ],
    applications: [
      'Industrial facilities & production plants',
      'Commercial buildings & offices',
      'Municipal infrastructure management',
      'Water treatment & wastewater plants',
      'HVAC and environmental control systems',
    ],
  },
  {
    id: 'digital-checksheet',
    icon: ClipboardCheck,
    name: 'Digital Checksheet',
    slug: 'digital-checksheet',
    tagline:
      'Streamline inspections with AI-powered, paperless quality checksheets enabling automation, compliance reporting, and real-time monitoring.',
    hero_image: digital_image,
    all_images:[digital_image,digital_image2,digital_image3,digital_image4],
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

    long_description: `Digital Checksheet brings digital transformation to quality control and inspection processes by replacing traditional paper-based workflows with smart, connected systems. The platform empowers inspectors to perform checks using mobile or tablet-based forms, ensuring real-time data capture, validation, and traceability across all quality operations.

Its IIoT integration enables seamless data flow from machines and sensors, allowing automated validation of key parameters during inspections. The system’s built-in analytics dashboard provides immediate visibility into non-conformities, trends, and compliance metrics. It supports automated report generation for audits and certifications, significantly reducing administrative workloads.

With customizable templates and automated notifications, Digital Checksheet ensures consistent quality standards across locations. It also enables cross-department collaboration, driving faster root-cause analysis and corrective actions. Ideal for manufacturing, pharma, and process industries, it not only boosts accuracy and efficiency but also builds a culture of accountability and continuous improvement.`,

    key_features: [
      'Mobile & tablet-friendly inspection forms',
      'IoT-enabled real-time data capture',
      'Automated compliance & audit reporting',
      'Centralized dashboards for analysis',
      'Built-in root cause analysis tools',
    ],
    benefits: [
      'Reduce paperwork and manual errors',
      'Increase speed and accuracy of inspections',
      'Ensure compliance with regulatory standards',
      'Improve product quality and consistency',
      'Enable real-time insights and corrective actions',
    ],
    applications: [
      'Manufacturing plants',
      'Process industries',
      'Automotive quality inspections',
      'Pharmaceutical compliance reporting',
      'Construction site quality assurance',
    ],
  },
  {
    id: 'smart-ems',
    icon: Battery,
    name: 'SmartEMS',
    slug: 'smart-ems',
    tagline:
      'AI-driven energy management solution for real-time monitoring, sustainability reporting, optimization, and smarter carbon footprint tracking.',
    hero_image: emsimage1,
    all_images:[emsimage1,emsimage2,emsimage3,emsimage4],
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

    long_description: `SmartEMS is a cutting-edge Energy Management System that leverages IIoT and AI analytics to help industries monitor, optimize, and reduce energy consumption in real time. It connects directly to energy meters, PLCs, and equipment to collect granular data on electricity, water, gas, and compressed air usage, converting it into intuitive dashboards and actionable insights.

With advanced algorithms for load forecasting and anomaly detection, SmartEMS predicts peak demands and automatically adjusts loads to minimize wastage. It offers sustainability tracking features to measure carbon footprint, generate compliance reports, and align with ESG goals. The system’s AI-driven recommendations empower managers to make data-backed decisions, leading to reduced operational costs and improved equipment life.

Scalable and cloud-compatible, SmartEMS can manage multi-site operations while ensuring centralized monitoring and benchmarking. By promoting responsible energy practices, it helps organizations achieve operational excellence, sustainability, and long-term competitiveness.`,

    key_features: [
      'Real-time monitoring of energy usage',
      'AI-powered analytics for optimization',
      'Load management and balancing',
      'Instant alerts for inefficiencies',
      'Compliance and sustainability reporting',
    ],
    benefits: [
      'Lower operational costs with optimized energy usage',
      'Automate control and prevent energy waste',
      'Gain preventive insights with predictive analytics',
      'Ensure compliance with environmental standards',
      'Support carbon footprint reduction initiatives',
    ],
    applications: [
      'Industrial facilities and factories',
      'Commercial & office buildings',
      'Municipal infrastructure',
      'Water treatment and wastewater plants',
      'HVAC & environmental management systems',
    ],
  },
  {
    id: 'oee-dashboard',
    icon: Gauge,
    name: 'OEE Dashboard',
    slug: 'oee-dashboard',
    tagline:
      'Boost productivity with real-time OEE dashboards offering live insights, downtime analysis, and customizable manufacturing metrics.',
    hero_image: Oeeimage1,
    all_images:[Oeeimage1,Oeeimage2,Oeeimage3,Oeeimage4],
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

    long_description: `The OEE Dashboard is a real-time industrial analytics platform designed to give manufacturers complete control and visibility over their production efficiency. Using IIoT and cloud-based technology, it captures data directly from machines, PLCs, and sensors to calculate OEE (Availability, Performance, and Quality) in real-time.

Plant managers can visualize bottlenecks, analyze downtime causes, and monitor shift-level performance through customizable dashboards. Its intuitive interface provides both macro and micro-level insights — from plant-wide efficiency to individual machine utilization — enabling rapid decision-making and process optimization. 

The platform also includes automated data collection, event logging, and report generation, eliminating manual data entry errors. Its integration capabilities with ERP and MES systems ensure a seamless flow of production intelligence across departments. Whether it’s for daily performance reviews or strategic planning, the OEE Dashboard empowers manufacturing teams to operate at peak productivity, ensuring continuous improvement and lean manufacturing excellence.`,

    key_features: [
      'Real-time performance and availability monitoring',
      'Integration with PLCs and machine control systems',
      'Automated data capture for production metrics',
      'Downtime and efficiency tracking',
      'Cloud-enabled visualization dashboards',
      'Detailed event history with customizable reports',
    ],
    benefits: [
      'Reduce production delays via proactive alerts',
      'Enable continuous visibility into shop floor operations',
      'Track workforce and equipment productivity',
      'Strengthen compliance and quality control',
      'Save time with auto-generated analytics',
    ],
    applications: [
      'Manufacturing plants & factories',
      'Infrastructure and construction industries',
      'Petrochemical and refinery operations',
      'Power generation & distribution plants',
      'Warehousing and logistics centers',
      'Smart industrial campuses',
    ],
  },
  {
    id: 'vision-ai',
    icon: Check,
    name: 'VisionAI',
    slug: 'vision-ai',
    tagline:
      'AI-powered vision system enabling automated defect detection, object recognition, and scalable high-speed industrial quality inspection.',
    hero_image: visionimage1,
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

    long_description: `VisionAI harnesses the power of artificial intelligence and computer vision to bring automation and precision to industrial inspection and safety monitoring. Designed for high-speed environments, it integrates with existing camera systems to analyze visual data in real-time, identifying product defects, object classifications, and safety compliance issues instantly.

The platform’s deep learning models continuously evolve, improving detection accuracy across diverse materials and lighting conditions. It supports applications like defect detection, component verification, PPE compliance checks, and process monitoring — all without human intervention. VisionAI’s intuitive web dashboard provides centralized monitoring, configurable alerts, and performance analytics to ensure transparency and traceability.

From production lines to warehouse safety zones, VisionAI reduces human error, speeds up quality control, and increases operational efficiency. Its scalability and API-friendly architecture make it ideal for deployment across multiple facilities, enabling industries to maintain consistent quality, safety, and productivity at scale.`,

    key_features: [
      'AI-powered defect and anomaly detection',
      'Real-time object and part recognition',
      'PPE detection for safety compliance',
      'Web-based dashboard for centralized control',
      'High-speed AI analysis at scale',
    ],
    benefits: [
      'Prevent quality issues before they reach customers',
      'Ensure safety compliance via automated PPE checks',
      'Reduce dependency on manual inspections',
      'Improve operational visibility and accuracy',
      'Enable scalability across industries',
    ],
    applications: [
      'Industrial manufacturing plants',
      'Construction and infrastructure sites',
      'Oil & Gas and power plants',
      'Warehousing and logistics hubs',
      'Smart campuses and security facilities',
    ],
  },
];



export const productbroucher = [
  {
    id: 1,
    title: "Immersix (AR/VR Training)",
    description: "Immersive AR/VR-based industrial training modules designed to enhance workforce skills, safety, and engagement.",
    features: [
      "Interactive 3D simulations",
      "Real-world industrial scenarios",
      "Faster knowledge retention",
      "Customizable learning modules",
    ],
    icon: Settings,
    color: "from-blue-600 to-indigo-700",
    pd: arvr,
  },
  {
    id: 2,
    title: "Utility360",
    description: "IIoT-enabled utility monitoring platform offering predictive maintenance, analytics, and remote access.",
    features: [
      "Real-time data insights",
      "Predictive maintenance alerts",
      "Remote device control",
      "Customizable dashboards",
    ],
    icon: Network,
    color: "from-green-500 to-emerald-600",
    pd: utility,
  },
  {
    id: 3,
    title: "Digital Checksheet",
    description: "Smart digital inspection system replacing manual checks with automated, connected, and paperless workflows.",
    features: [
      "IoT-enabled data capture",
      "Compliance automation",
      "Real-time analytics",
      "Mobile & tablet support",
    ],
    icon: ClipboardCheck,
    color: "from-rose-500 to-red-600",
    pd: quality,
  },
  {
    id: 4,
    title: "SmartEMS",
    description: "AI-powered Energy Management System enabling real-time monitoring, optimization, and sustainability tracking.",
    features: [
      "Live energy usage tracking",
      "AI-driven optimization",
      "Sustainability analytics",
      "Carbon footprint reporting",
    ],
    icon: Battery,
    color: "from-yellow-500 to-orange-500",
    pd: ems,
  },
  {
    id: 5,
    title: "OEE Dashboard",
    description: "Real-time production monitoring tool providing actionable insights into efficiency, downtime, and performance.",
    features: [
      "Downtime tracking",
      "Custom KPI dashboards",
      "Automated data collection",
      "Performance analysis",
    ],
    icon: Gauge,
    color: "from-indigo-500 to-blue-600",
    pd: oee,
  },
  {
    id: 6,
    title: "VisionAI",
    description: "AI-based visual inspection platform for defect detection, object recognition, and industrial safety monitoring.",
    features: [
      "AI defect detection",
      "Object & PPE recognition",
      "Real-time video analytics",
      "Centralized control dashboard",
    ],
    icon: Check,
    color: "from-purple-500 to-violet-600",
    pd: image,
  },
];