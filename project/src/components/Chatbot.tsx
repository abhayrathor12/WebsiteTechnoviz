import React, { useState, useRef, useEffect } from "react";
import { AiOutlineClose, AiOutlineSend, AiOutlineRobot } from "react-icons/ai";

interface Message {
  sender: "bot" | "user";
  text: string;
}

// ------------------ Knowledge Base ------------------
const knowledgeBase = {
  greetings: ["hi", "hello", "hey", "good morning", "good afternoon"],
  about: "TechnoViz is a leading industrial automation and IIoT solutions provider delivering digitization, smart manufacturing, and AI-driven insights.",
  contact: "📞 Contact us: +91-9999765380 / 0124-4424695 | ✉ support@technovizautomation.com",
  services: {
    list: "✅ Our services: Digitization, Industrial IoT, Communication, Cybersecurity, Automation, Analytics.",
    details: {
      digitization: "📌 Digitization: Streamline records → digital, transparent, automated.",
      iiot: "📌 Industrial IoT: Connect assets, analyze performance, real-time decisions.",
      communication: "📌 Communication: Scalable, secure, real-time industrial connectivity.",
      cybersecurity: "📌 Cybersecurity: Protect with monitoring, prevention & secure access.",
      automation: "📌 Automation: Custom automation boosting efficiency & reducing downtime.",
      analytics: "📌 Analytics: Track performance, predict failures, gain insights."
    }
  },
  products: {
    list: "📦 Our products: Immersix, Utility360, Digital Checksheet, SmartEMS, OEE Dashboard, VisionAI.",
    details: {
      immersix: "🎮 Immersix: AR/VR-powered training boosting workforce engagement.",
      utility360: "⚡ Utility360: Predictive utility monitoring & energy optimization.",
      checksheet: "📑 Digital Checksheet: AI-powered, paperless inspections & compliance.",
      smartems: "🌱 SmartEMS: AI-driven energy monitoring & sustainability reporting.",
      oee: "📊 OEE Dashboard: Real-time insights, downtime analysis & productivity metrics.",
      visionai: "👁 VisionAI: AI defect detection & industrial quality inspection."
    }
  },
  coe: "🏢 Our CoE (Center of Excellence) drives innovation in industrial automation with cutting-edge technology.",
  faqs: [
    { q: ["who is technoviz", "about technoviz", "tell me about technoviz"], a: "TechnoViz is a top industrial automation solutions company providing IIoT, analytics, and AI solutions." },
    { q: ["what services does it provide", "services", "offerings", "service list"], a: "We provide Digitization, IIoT, Communication, Cybersecurity, Automation, and Analytics services." },
    { q: ["products", "product list", "your products"], a: "Our products include Immersix, Utility360, Digital Checksheet, SmartEMS, OEE Dashboard, and VisionAI." },
    { q: ["coe", "center of excellence"], a: "Our CoE (Center of Excellence) drives innovation in industrial automation with cutting-edge technology." },
    { q: ["contact", "contact info", "phone", "email"], a: "📞 Contact us: +91-9999765380 / 0124-4424695 | ✉ support@technovizautomation.com" }
  ]
};

// ------------------ Menu Buttons Component ------------------
const MenuButtons: React.FC<{ onSelect: (choice: string) => void }> = ({ onSelect }) => {
  const options = ["Services", "Products", "CoE", "Contact", "About"];
  return (
    <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-2">
      {options.map((opt) => (
        <button
          key={opt}
          onClick={() => onSelect(opt.toLowerCase())}
          className="px-2 py-1.5 sm:px-3 sm:py-2 text-xs sm:text-sm bg-[#203f78] text-white rounded-lg hover:bg-[#2a5294] transition"
        >
          {opt}
        </button>
      ))}
    </div>
  );
};

// ------------------ Main Chatbot ------------------
const Chatbot: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { sender: "bot", text: "Hello 👋 I'm TechnoViz Assistant. Choose an option below:" },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // ------------------ Bot Response Logic ------------------
  const handleBotResponse = (userMessage: string) => {
    setIsTyping(true);

    setTimeout(() => {
      const msg = userMessage.toLowerCase();
      let response = "Sorry 🤔 I didn't understand that. Try selecting an option below.";

      // Greetings
      if (knowledgeBase.greetings.some((g) => msg.includes(g))) {
        response = "Hi 👋 I'm TechnoViz Assistant. Choose an option below:";
      }

      // Check FAQs
      for (let faq of knowledgeBase.faqs) {
        if (faq.q.some((question) => msg.includes(question))) {
          response = faq.a;
          break;
        }
      }

      // Check services
      if (msg.includes("service")) response = knowledgeBase.services.list;
      const serviceKey = Object.keys(knowledgeBase.services.details).find((key) => msg.includes(key));
      if (serviceKey) response = knowledgeBase.services.details[serviceKey as keyof typeof knowledgeBase.services.details];

      // Check products
      if (msg.includes("product")) response = knowledgeBase.products.list;
      const productKey = Object.keys(knowledgeBase.products.details).find((key) => msg.includes(key));
      if (productKey) response = knowledgeBase.products.details[productKey as keyof typeof knowledgeBase.products.details];

      // CoE
      if (msg.includes("coe")) response = knowledgeBase.coe;

      // Contact
      if (msg.includes("contact")) response = knowledgeBase.contact;

      // About
      if (msg.includes("about")) response = knowledgeBase.about;

      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: response },
        { sender: "bot", text: "👉 Choose another option below:" },
      ]);
      setIsTyping(false);
    }, 800);
  };

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages((prev) => [...prev, { sender: "user", text: input }]);
    handleBotResponse(input);
    setInput("");
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSend();
  };

  // ------------------ Render ------------------
  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="relative bg-gradient-to-br from-[#ddaf26] to-[#ddaf26] text-[#203f78] p-4 sm:p-5 rounded-full shadow-2xl hover:scale-110 transition-transform duration-300 group"
          style={{ boxShadow: "0 8px 32px rgba(32, 63, 120, 0.4)" }}
        >
          <AiOutlineRobot size={24} className="sm:w-7 sm:h-7 animate-pulse" />
        </button>
      )}

      {open && (
        <div
          className="w-[calc(100vw-2rem)] sm:w-96 h-[calc(100vh-2rem)] sm:h-[32rem] max-h-[600px] sm:max-h-[32rem] bg-white shadow-2xl rounded-2xl flex flex-col overflow-hidden"
          style={{
            boxShadow: "0 20px 60px rgba(32, 63, 120, 0.3)",
            border: "1px solid rgba(221, 175, 38, 0.2)",
          }}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-[#203f78] to-[#2a5294] text-white p-3 sm:p-4 flex justify-between items-center">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#ddaf26] rounded-full flex items-center justify-center">
                <AiOutlineRobot size={18} className="sm:w-[22px] sm:h-[22px] text-[#203f78]" />
              </div>
              <div>
                <span className="font-semibold text-base sm:text-lg">TechnoViz Assistant</span>
                <div className="flex items-center gap-1 text-xs text-[#ddaf26]">
                  <span className="w-2 h-2 bg-[#ddaf26] rounded-full animate-pulse"></span>
                  Online
                </div>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="hover:bg-white/10 p-2 rounded-lg transition-colors"
            >
              <AiOutlineClose size={20} className="sm:w-[22px] sm:h-[22px]" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-3 sm:p-4 overflow-y-auto flex flex-col gap-2 sm:gap-3 bg-gradient-to-b from-gray-50 to-white">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.sender === "bot" ? "justify-start" : "justify-end"}`}>
                <div
                  className={`px-3 py-2 sm:px-4 sm:py-3 rounded-2xl max-w-[85%] sm:max-w-[80%] shadow-md ${
                    msg.sender === "bot"
                      ? "bg-white text-gray-800 border border-gray-200 rounded-tl-sm"
                      : "bg-gradient-to-r from-[#203f78] to-[#2a5294] text-white rounded-tr-sm"
                  }`}
                >
                  <p className="text-xs sm:text-sm leading-relaxed break-words">{msg.text}</p>
                  {msg.sender === "bot" && msg.text.includes("Choose") && (
                    <MenuButtons onSelect={(choice) => handleBotResponse(choice)} />
                  )}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white px-3 py-2 sm:px-4 sm:py-3 rounded-2xl border border-gray-200 shadow-md">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-[#ddaf26] rounded-full animate-bounce"></span>
                    <span className="w-2 h-2 bg-[#ddaf26] rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></span>
                    <span className="w-2 h-2 bg-[#ddaf26] rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 sm:p-4 border-t border-gray-200 bg-white">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Type your message..."
                className="flex-1 border-2 border-gray-200 rounded-xl px-3 py-2 sm:px-4 sm:py-3 outline-none focus:border-[#ddaf26] transition-colors text-xs sm:text-sm"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
              />
              <button
                onClick={handleSend}
                disabled={!input.trim()}
                className="bg-gradient-to-r from-[#203f78] to-[#2a5294] p-2.5 sm:p-3 rounded-xl text-[#ddaf26] hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg"
              >
                <AiOutlineSend size={20} className="sm:w-[22px] sm:h-[22px]" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;