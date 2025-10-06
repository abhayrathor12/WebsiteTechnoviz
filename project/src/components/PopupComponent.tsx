import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const PopupComponent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show popup after 5 seconds
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="relative bg-white rounded-lg shadow-2xl max-w-md w-full animate-fade-in">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close popup"
        >
          <X size={24} />
        </button>

        {/* Popup Content */}
        <div className="p-8">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="inline-block bg-blue-100 text-blue-600 px-4 py-1 rounded-full text-sm font-semibold mb-4">
              NEW UPDATE
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              🎉 Exciting News!
            </h2>
            <p className="text-gray-600">
              Check out our latest features and offerings
            </p>
          </div>

          {/* Content */}
          <div className="space-y-4 mb-6">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-2">
                🚀 New Services Available
              </h3>
              <p className="text-sm text-gray-600">
                Explore our expanded range of technology solutions tailored for your business needs.
              </p>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-teal-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-2">
                💡 Limited Time Offer
              </h3>
              <p className="text-sm text-gray-600">
                Get 20% off on all consulting services. Valid until the end of the month!
              </p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex gap-3">
            <button
              onClick={handleClose}
              className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
            >
              Maybe Later
            </button>
            <button
              onClick={() => {
                // Navigate to services or contact page
                window.location.href = '/services';
              }}
              className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Learn More
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default PopupComponent;