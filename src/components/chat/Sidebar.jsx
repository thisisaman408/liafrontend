import { motion } from 'framer-motion';
import { History, MessageSquare, Sparkles, Zap } from 'lucide-react';
import React from 'react';
import SentimentDashboard from '../SentimentDashboard';

const Sidebar = ({ historyList, conversationId, analysis, onLoadConversation, onNewChat }) => {
  return (
    <motion.div 
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="w-80 hidden md:flex flex-col gap-4 h-full"
    >
      <div className="bg-white/70 backdrop-blur-xl border border-white/40 rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col h-full overflow-hidden">
        <div className="flex items-center gap-3 mb-6 flex-shrink-0">
          <div className="p-3 bg-gradient-to-tr from-violet-600 to-indigo-600 rounded-2xl shadow-lg shadow-indigo-500/20">
            <Sparkles className="text-white" size={24} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900 tracking-tight">LIA Plus</h1>
            <p className="text-xs font-medium text-gray-500">RL-Enhanced Engine</p>
          </div>
        </div>
        
        <SentimentDashboard analysis={analysis} />

        <div className="mt-6 flex-1 overflow-y-auto">
           <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
              <History size={12} />
              <span>Recent Chats</span>
           </div>
           <div className="space-y-2">
              {historyList.map(chat => (
                  <button 
                      key={chat.id} 
                      onClick={() => onLoadConversation(chat.id)}
                      className={`w-full text-left p-3 rounded-xl text-sm font-medium transition-all truncate border ${
                          conversationId === chat.id 
                          ? 'bg-indigo-50 text-indigo-700 border-indigo-100 shadow-sm' 
                          : 'bg-transparent text-gray-600 border-transparent hover:bg-white/50'
                      }`}
                  >
                      {chat.title || "Untitled Conversation"}
                  </button>
              ))}
           </div>
        </div>

        <button 
          onClick={onNewChat}
          className="w-full mt-4 py-3 px-4 bg-white border border-gray-200 hover:border-indigo-300 hover:text-indigo-600 text-gray-600 font-medium rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 group flex-shrink-0"
        >
          <MessageSquare size={18} className="group-hover:scale-110 transition-transform" />
          <span>New Chat</span>
        </button>
      </div>

      <div className="flex-1 bg-white/60 backdrop-blur-md border border-white/40 rounded-3xl p-6 flex flex-col justify-end shadow-sm">
        <div className="flex flex-col gap-3">
          {/* GitHub Links */}
          <div className="flex gap-2">
             <a href="https://github.com/thisisaman408/Liabackend" target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 p-2 bg-gray-900 text-white rounded-xl text-xs font-medium hover:bg-gray-800 transition-colors">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                Backend
             </a>
             <a href="https://github.com/thisisaman408/liafrontend" target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 p-2 bg-indigo-600 text-white rounded-xl text-xs font-medium hover:bg-indigo-700 transition-colors">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                Frontend
             </a>
          </div>

          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <Zap size={14} />
            <span className="font-medium">System Status</span>
          </div>
          <div className="flex items-center gap-2.5 bg-green-50 p-3 rounded-xl border border-green-100">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
            </span>
            <span className="text-green-700 font-semibold text-sm">Engine Active</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Sidebar;
