import { useState } from 'react';
import { MessageCircle, X, Phone } from 'lucide-react';

const WhatsAppWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  // Replace with your actual WhatsApp number (including country code, without + or spaces)
  const phoneNumber = "1234567890"; 
  const defaultMessage = "Hello! I'm interested in your services.";
  
  const handleWhatsAppClick = () => {
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(defaultMessage)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <>
      {/* Backdrop overlay when chat is open */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
      
      {/* Chat popup */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 bg-white rounded-lg shadow-2xl z-50 overflow-hidden animate-in slide-in-from-bottom-2 duration-300">
          {/* Header */}
          <div className="bg-green-600 text-white p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold">Customer Support</h3>
                <p className="text-sm text-green-100">Typically replies instantly</p>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-green-700 rounded-full p-1 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          {/* Chat content */}
          <div className="p-4 bg-gray-50">
            <div className="bg-white rounded-lg p-3 mb-3 shadow-sm">
              <p className="text-sm text-gray-700 mb-2">
                👋 Hi there! Welcome to our website.
              </p>
              <p className="text-sm text-gray-700">
                How can we help you today? Just send us a message on WhatsApp and we'll respond as soon as possible.
              </p>
            </div>
            
            {/* WhatsApp button */}
            <button
              onClick={handleWhatsAppClick}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-4 rounded-lg flex items-center justify-center space-x-2 transition-colors shadow-sm"
            >
              <Phone className="w-5 h-5" />
              <span>Start Chat on WhatsApp</span>
            </button>
            
            <p className="text-xs text-gray-500 text-center mt-2">
              We'll respond within a few minutes
            </p>
          </div>
        </div>
      )}
      
      {/* Floating button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg transition-all duration-300 transform hover:scale-110 group"
        >
          <div className="relative">
            <MessageCircle className="w-6 h-6" />
            {/* Notification dot */}
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
          </div>
        </button>
        
        {/* Floating message */}
        {!isOpen && (
          <div className="absolute bottom-16 right-0 bg-white text-gray-800 px-4 py-2 rounded-lg shadow-lg whitespace-nowrap animate-bounce">
            <div className="text-sm font-medium">Need help? 💬</div>
            <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-white"></div>
          </div>
        )}
      </div>
    </>
  );
};

export default WhatsAppWidget;