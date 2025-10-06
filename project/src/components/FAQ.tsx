import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

type FAQItemType = {
  id: string;
  question: string;
  answer: string;
};

type FAQItemProps = {
  item: FAQItemType;
  openItem: string | null;
  toggleItem: (itemId: string) => void;
};

const FAQItem: React.FC<FAQItemProps> = ({ item, openItem, toggleItem }) => {
  const isOpen = openItem === item.id;
  const questionNumber = item.id.toUpperCase();

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100">
      <button
        onClick={() => toggleItem(item.id)}
        className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
      >
        <div className="flex items-center space-x-4">
          <span
            className={`${
              isOpen ? "bg-[#203f78] text-white" : "bg-gray-200 text-gray-700"
            } text-sm font-medium px-3 py-1 rounded-full min-w-[40px] text-center`}
          >
            {questionNumber}
          </span>
          <span className="text-gray-800 font-medium text-sm leading-relaxed pr-4">
            {item.question}
          </span>
        </div>
        <div className="flex-shrink-0 ml-4">
          {isOpen ? (
            <ChevronUp className="w-5 h-5 text-gray-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-400" />
          )}
        </div>
      </button>

      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-6 pb-6">
          <div className="pl-14">
            <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">
              {item.answer}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const FAQ: React.FC = () => {
  const [openItem, setOpenItem] = useState<string | null>("q1");

  const toggleItem = (itemId: string) => {
    setOpenItem((prev) => (prev === itemId ? null : itemId));
  };

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const faqData: FAQItemType[] = [
    {
      id: "q1",
      question: "What solutions does Technoviz Automation Solutions provide?",
      answer: `Technoviz Automation Solutions is your one-stop-shop for technology optimization, offering services in:
• Digitalization – Production system online, electronic records, ERP integration, reporting, and review.
• Industrial Internet of Things (IIoT) – IoT cloud and mobile solutions, real-time information, visualization, and protocol conversion.
• Network Security – DLP, SIEM, endpoint protection, MFA, backup and disaster recovery.
• Automated Services – SCADA, HMI, energy management, process control systems, RFID/barcode, and IoT controllers.`,
    },
    {
      id: "q2",
      question: "How can I contact Technoviz Automation Solutions for inquiries or support?",
      answer: `India Office:
311, Paras Trade Center, Sector-2, Gurgaon - 122011, Haryana, India
Phone: +91-9999765380 | Alternate: 0124-4424695

Dubai Office:
Easy Access Business Center, Al Abbas Building-2, Al Mankhool, Dubai, UAE

Website: https://technovizautomation.com/`,
    },
    {
      id: "q3",
      question: "Which industries does Technoviz Automation Solutions operate in?",
      answer: `Technoviz serves multiple sectors including:
• Manufacturing
• Energy & Utilities
• Food & Beverage
• Pharmaceuticals
• Oil and Gas
Our focus is on compliance, automation, and digital transformation tailored to each industry's needs.`,
    },
    {
      id: "q4",
      question: "Does Technoviz Automation Solutions provide consultancy services?",
      answer: `Yes. We offer consulting in:
• Strategic and execution planning
• Implementation support
• Training and certification
We help improve efficiency, cost control, and quality across operations.`,
    },
    {
      id: "q5",
      question: "What is the Center of Excellence (CoE) at Technoviz Automation Solutions?",
      answer: `Our CoE fosters innovation in digital technologies, automation, and cybersecurity. It collaborates with academia and industry to bridge skill gaps, offering hands-on training and research opportunities in industrial automation and digital transformation.`,
    },
    {
      id: "q6",
      question: "How does Technoviz Automation Solutions protect data security in its solutions?",
      answer: `We implement a complete cybersecurity framework including:
• DLP and HIPS
• Endpoint protection and anti-malware
• SIEM and network monitoring
• Multi-factor authentication
• Network segmentation
• Secure remote access and disaster recovery.`,
    },
    {
      id: "q7",
      question: "Can Technoviz Automation Solutions assist with legacy system integration?",
      answer: `Yes. We specialize in integrating legacy systems with modern technologies for better communication, efficiency, and cost savings across business functions like CRM, HR, and finance.`,
    },
    {
      id: "q8",
      question: "Does Technoviz provide automation solution training services?",
      answer: `Yes. Through our Center of Excellence (CoE), we offer hands-on training in automation and cybersecurity, encouraging collaboration between academia and industry to build future-ready professionals.`,
    },
    {
      id: "q9",
      question: "What is the process of launching a project with Technoviz Automation Solutions?",
      answer: `1. Get in touch:
India: +91-9999765380 | 0124-4424695
Dubai: Al Abbas Building-2, Al Mankhool, Dubai, UAE
2. Schedule consultation.
3. Receive a detailed proposal.
4. Finalize agreement and project kick-off.
More info: https://technovizautomation.com/`,
    },
    {
      id: "q10",
      question: "Where can I find more information about Technoviz Automation Solutions’ projects and case studies?",
      answer: `Visit:
• Our Projects page – for detailed insights
• Our Experience page – for industry expertise and capabilities
Website: https://technovizautomation.com/`,
    },
    {
      id: "q11",
      question: "What is the Digital Revolution?",
      answer: `The Digital Revolution, or Industry 4.0, is a transformation integrating digital, physical, and biological systems to improve efficiency and productivity. It emphasizes IoT, big data analytics, and AI-driven innovation for industrial growth.`,
    },
    {
      id: "q12",
      question: "Who is Kapil Khurana?",
      answer: `Kapil Khurana is the Founder and CEO of Technoviz Automation Solutions and author of “The Digital Revolution.” He advocates for intelligent operations through IoT and cloud technologies, guiding industries in adopting innovation for sustainable growth.`,
    },
  ];

  // Split evenly into 2 columns
  const mid = Math.ceil(faqData.length / 2);
  const leftCol = faqData.slice(0, mid);
  const rightCol = faqData.slice(mid);

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="relative flex items-center justify-center mb-6">
            <div className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold uppercase tracking-wider text-gray-200 mb-4">
              We're here to Help
            </div>
            <h2 className="absolute text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#203f78] font-poppins text-center">
              Frequently Asked Questions
            </h2>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <div className="space-y-6">
            {leftCol.map((item) => (
              <FAQItem
                key={item.id}
                item={item}
                openItem={openItem}
                toggleItem={toggleItem}
              />
            ))}
          </div>
          <div className="space-y-6">
            {rightCol.map((item) => (
              <FAQItem
                key={item.id}
                item={item}
                openItem={openItem}
                toggleItem={toggleItem}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
