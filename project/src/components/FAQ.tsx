import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

// 🔹 Types
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

// 🔹 FAQ Item Component
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
            <p className="text-gray-600 text-sm leading-relaxed">
              {item.answer}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// 🔹 Main FAQ Component
const FAQ: React.FC = () => {
  const [openItem, setOpenItem] = useState<string | null>("q1"); // Q1 open by default

  const toggleItem = (itemId: string) => {
    setOpenItem((prev) => (prev === itemId ? null : itemId));
  };

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const faqData: FAQItemType[][] = [
    // Left column
    [
      {
        id: "q1",
        question:
          "How to choose the right partner for digital transformation services in the UK and India?",
        answer:
          "When selecting a partner for digital transformation services in the UK and India, consider Technoviz Automation. Assess our expertise, past projects, industry experience, and cultural fit. We align with your goals, have a proven track record in digital transformation, and possess a strong understanding of both the UK and Indian markets.",
      },
      {
        id: "q2",
        question: "What factors affect the pricing of software development services?",
        answer:
          "At Technoviz Automation, pricing for software development services is influenced by various factors such as project complexity, scope, technology stack, required features, development hours, and the level of customization. Each project is unique, impacting the overall cost.",
      },
      {
        id: "q3",
        question:
          "Steps to initiate a digital transformation strategy with a technology company?",
        answer:
          "Initiating a digital transformation strategy with Technoviz Automation involves outlining your goals and challenges. Engage in comprehensive discussions with us to align visions and objectives. We create a strategic roadmap emphasizing iterative development and continuous improvement.",
      },
      {
        id: "q4",
        question: "How to hire software developers for a project with a technology firm?",
        answer:
          "Choose Technoviz Automation for your software development needs. We provide access to a pool of skilled developers. Assess their expertise, communication skills, and experience in similar projects. Collaborate closely with us for a seamless onboarding process.",
      },
      {
        id: "q5",
        question: "What are the estimated costs for software development services?",
        answer:
          "For estimated costs of software development services, provide project specifics to Technoviz Automation. Transparently outline your requirements to receive accurate cost estimates tailored to your needs and budget.",
      },
      {
        id: "q6",
        question: "How much does customized software development cost with a tech company?",
        answer:
          "Customized software development costs with Technoviz Automation depend on project complexity, features, technology used, and development time. Contact us to discuss your project requirements for a tailored estimate.",
      },
      {
        id: "q7",
        question: "Do tech firms offer ongoing support for completed software projects?",
        answer:
          "At Technoviz Automation, we offer comprehensive post-development support and maintenance services. We ensure your software operates optimally, providing updates, bug fixes, and technical assistance as needed.",
      },
      {
        id: "q8",
        question: "Will a tech company help in deploying and integrating software solutions?",
        answer:
          "Technoviz Automation specializes in seamless deployment and integration of software solutions. We ensure they integrate smoothly with your existing systems and workflows.",
      },
      {
        id: "q9",
        question: "Where to find skilled software developers with a technology company?",
        answer:
          "Explore Technoviz Automation for a pool of skilled developers. Review our portfolios and engage in discussions to understand our talent pool and expertise.",
      },
      {
        id: "q10",
        question: "What's the standard timeline for software projects with a tech firm?",
        answer:
          "Project timelines with Technoviz Automation vary based on complexity and scope. We provide a project plan outlining milestones, development phases, and estimated delivery timelines after understanding your project requirements thoroughly.",
      },
    ],
    // Right column
    [
      {
        id: "q11",
        question: "How does Technoviz Automation handle client communication during a project?",
        answer:
          "At Technoviz Automation, we prioritize clear and consistent communication with our clients. We use various communication channels, including regular meetings, email updates, and project management tools, to ensure you are always informed about the project's progress and any important developments.",
      },
      {
        id: "q12",
        question: "Can Technoviz Automation assist with legacy system modernization?",
        answer:
          "Yes, Technoviz Automation specializes in modernizing legacy systems. We assess your current systems, identify areas for improvement, and implement modern technologies to enhance performance, security, and scalability.",
      },
      {
        id: "q13",
        question: "What industries does Technoviz Automation serve?",
        answer:
          "Technoviz Automation has experience across various industries, including finance, healthcare, retail, manufacturing, and more. Our diverse expertise allows us to tailor solutions to meet the specific needs of each industry.",
      },
      {
        id: "q14",
        question: "How does Technoviz Automation approach project management?",
        answer:
          "We follow agile project management methodologies to ensure flexibility and transparency. Our approach includes regular updates, collaborative planning, and iterative development to keep you informed and involved throughout the project.",
      },
      {
        id: "q15",
        question: "What technologies does Technoviz Automation specialize in?",
        answer:
          "Technoviz Automation specializes in a wide range of technologies, including AI/ML, cloud computing, IoT, blockchain, mobile app development, and web development. Our team stays updated with the latest technological advancements to deliver cutting-edge solutions.",
      },
      {
        id: "q16",
        question: "Can Technoviz Automation develop mobile applications?",
        answer:
          "Yes, we have extensive experience in developing mobile applications for both iOS and Android platforms. Our team creates user-friendly, high-performance apps tailored to your business needs.",
      },
      {
        id: "q17",
        question: "How does Technoviz Automation ensure project delivery within budget?",
        answer:
          "We provide transparent cost estimates and detailed project plans to ensure budget adherence. Regular monitoring and reporting help us manage resources efficiently and avoid unforeseen expenses.",
      },
      {
        id: "q18",
        question:
          "What is the role of AI and ML in software development at Technoviz Automation?",
        answer:
          "We leverage AI and ML to enhance software capabilities, automate processes, and provide predictive insights. Our AI/ML solutions help businesses achieve greater efficiency and innovation.",
      },
      {
        id: "q19",
        question: "How can Technoviz Automation help with cloud migration?",
        answer:
          "Technoviz Automation offers comprehensive cloud migration services, including assessment, planning, and execution. We ensure a seamless transition to the cloud, optimizing your infrastructure for performance and cost-efficiency.",
      },
      {
        id: "q20",
        question: "Does Technoviz Automation provide post-launch support?",
        answer:
          "Yes, Technoviz Automation provides ongoing post-launch support, ensuring your software runs smoothly with regular updates, bug fixes, and technical assistance.",
      },
    ],
  ];

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

        {/* FAQ Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <div className="space-y-6">
            {faqData[0].map((item) => (
              <FAQItem
                key={item.id}
                item={item}
                openItem={openItem}
                toggleItem={toggleItem}
              />
            ))}
          </div>
          <div className="space-y-6">
            {faqData[1].map((item) => (
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
