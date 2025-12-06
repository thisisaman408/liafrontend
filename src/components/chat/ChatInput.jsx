import { Send } from 'lucide-react';
import React, { useState } from 'react';

const ChatInput = ({ onSend, loading }) => {
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    onSend(input);
    setInput('');
  };

  return (
    <div className="p-6 bg-white/50 backdrop-blur-md border-t border-gray-100">
      <div className="relative flex items-center shadow-lg rounded-2xl bg-white">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Type your message..."
          className="w-full bg-transparent py-4 pl-6 pr-14 text-gray-800 placeholder-gray-400 focus:outline-none rounded-2xl font-medium"
        />
        <button 
          onClick={handleSend}
          disabled={loading || !input.trim()}
          className="absolute right-2 p-2.5 bg-gray-900 hover:bg-gray-800 text-white rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95"
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
};

export default ChatInput;
