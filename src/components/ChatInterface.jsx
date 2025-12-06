import React from 'react';
import { useChat } from '../hooks/useChat';
import ChatInput from './chat/ChatInput';
import MessageList from './chat/MessageList';
import Sidebar from './chat/Sidebar';

const ChatInterface = () => {
  const { 
    messages, 
    conversationId, 
    analysis, 
    loading, 
    historyList, 
    initialLoad, 
    sendMessage, 
    loadConversation, 
    sendFeedback, 
    resetChat 
  } = useChat();

  return (
    <div className="flex h-screen w-full max-w-7xl mx-auto p-4 md:p-6 gap-6 font-['Inter']">
      
      {/* Sidebar Component */}
      <Sidebar 
        historyList={historyList}
        conversationId={conversationId}
        analysis={analysis}
        onLoadConversation={loadConversation}
        onNewChat={resetChat}
      />

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-white/80 backdrop-blur-2xl border border-white/50 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden relative">
        <div className="p-4 border-b border-gray-100 flex md:hidden items-center justify-between">
           <span className="font-bold text-gray-800">LIA Chat</span>
        </div>

        {/* Message List Component */}
        <MessageList 
          messages={messages}
          loading={loading}
          initialLoad={initialLoad}
          onFeedback={sendFeedback}
        />

        {/* Input Component */}
        <ChatInput 
          onSend={sendMessage}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default ChatInterface;
