import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import SustainabilityChatbot from './SustainabilityChatbot';

const FloatingChatBubble = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen ? (
        <div className="w-96 shadow-2xl rounded-xl">
          <div 
            className="bg-green-600 text-white p-3 flex justify-between items-center rounded-t-xl cursor-pointer"
            onClick={toggleChat}
          >
            <span>Sustainability Chat</span>
            <X className="w-5 h-5" />
          </div>
          <SustainabilityChatbot />
        </div>
      ) : (
        <div 
          className="bg-green-600 text-white w-16 h-16 rounded-full flex items-center justify-center shadow-2xl cursor-pointer hover:bg-green-700 transition-all"
          onClick={toggleChat}
        >
          <MessageCircle className="w-8 h-8" />
        </div>
      )}
    </div>
  );
};

export default FloatingChatBubble;