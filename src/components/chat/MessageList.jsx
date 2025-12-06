import { AnimatePresence, motion } from 'framer-motion';
import { Bot, MessageSquare, User, Zap } from 'lucide-react';
import React, { useEffect, useRef } from 'react';

const MessageList = ({ messages, loading, initialLoad, onFeedback }) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = (behavior = "smooth") => {
    messagesEndRef.current?.scrollIntoView({ behavior });
  };

  useEffect(() => {
    if (loading) return;
    scrollToBottom(initialLoad ? "auto" : "smooth");
  }, [messages, loading, initialLoad]);

  const getSentimentColor = (label) => {
    if (label === 'Positive') return 'bg-emerald-100 text-emerald-700 border-emerald-200 cursor-pointer hover:bg-emerald-200';
    if (label === 'Negative') return 'bg-rose-100 text-rose-700 border-rose-200 cursor-pointer hover:bg-rose-200';
    return 'bg-blue-50 text-blue-600 border-blue-200 cursor-pointer hover:bg-blue-100';
  };

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-8">
      <AnimatePresence>
        {messages.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }}
            className="h-full flex flex-col items-center justify-center text-gray-400 gap-6"
          >
            <div className="p-8 rounded-full bg-gray-50 border border-gray-100">
                <MessageSquare size={48} className="text-gray-300" />
            </div>
            <p className="font-medium">Start a conversation to analyze sentiment...</p>
          </motion.div>
        )}
        
        {messages.map((msg, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex w-full ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex max-w-[85%] md:max-w-[75%] gap-4 ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 mt-1 shadow-md ${msg.sender === 'user' ? 'bg-gray-900' : 'bg-white border border-gray-100'}`}>
                {msg.sender === 'user' ? <User size={16} className="text-white" /> : <Bot size={18} className="text-indigo-600" />}
              </div>

              <div className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                <div className={`px-6 py-4 rounded-3xl shadow-sm text-[15px] leading-relaxed ${
                  msg.sender === 'user' 
                    ? 'bg-gray-900 text-white rounded-tr-md' 
                    : 'bg-white border border-gray-100 text-gray-800 rounded-tl-md'
                }`}>
                  {msg.text}
                </div>

                <div className="flex items-center gap-3 mt-2 px-1">
                  <span className="text-[11px] font-medium text-gray-400">{new Date(msg.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                  {msg.sender === 'user' && msg.sentiment_label && (
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => onFeedback(msg, msg.sentiment_label)}
                      className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${getSentimentColor(msg.sentiment_label)} uppercase tracking-wide flex items-center gap-1`}
                      title="Click to correct sentiment (Reinforcement Learning)"
                    >
                       {msg.corrected_label ? (
                           <>
                            <Zap size={8} className="fill-current" />
                            {msg.corrected_label} (Corrected)
                           </>
                       ) : (
                           <>
                            {msg.sentiment_label} {msg.sentiment_score !== undefined && msg.sentiment_score !== null && `${(msg.sentiment_score * 100).toFixed(0)}%`}
                           </>
                       )}
                    </motion.button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}

        {loading && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-start w-full"
          >
             <div className="flex gap-4 max-w-[70%]">
                <div className="w-10 h-10 rounded-full bg-white border border-gray-100 flex items-center justify-center flex-shrink-0 mt-1">
                  <Bot size={18} className="text-indigo-600" />
                </div>
                <div className="bg-white border border-gray-100 rounded-3xl rounded-tl-md p-5 flex gap-1.5 items-center shadow-sm">
                  <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"></span>
                  <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></span>
                  <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></span>
                </div>
             </div>
          </motion.div>
        )}
      </AnimatePresence>
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;
