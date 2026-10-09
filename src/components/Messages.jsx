import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Send, MessageSquare, User, Clock, CheckCheck, Sparkles, ArrowLeft } from 'lucide-react';

export default function Messages() {
  const { 
    conversations, 
    activeConversationId, 
    setActiveConversationId, 
    sendMessage, 
    userRole, 
    customerUser, 
    workerUser, 
    navigateTo 
  } = useApp();

  const [inputMessage, setInputMessage] = useState('');

  const activeConv = conversations.find(c => c.id === activeConversationId) || conversations[0];
  const currentUser = userRole === 'customer' ? customerUser : workerUser;

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputMessage.trim() || !activeConv) return;
    sendMessage(activeConv.id, inputMessage.trim());
    setInputMessage('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      <div className="flex items-center justify-between pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Direct Collaboration Messages</h1>
          <p className="text-xs text-slate-500">Real-time messaging between clients and verified freelancers</p>
        </div>

        <button
          onClick={() => navigateTo(userRole === 'customer' ? 'customer-dashboard' : 'worker-dashboard')}
          className="text-xs text-slate-500 hover:text-slate-800 font-semibold flex items-center gap-1"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Dashboard</span>
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden h-[650px] grid grid-cols-1 md:grid-cols-3">
        
        {/* Left Col: Conversations List */}
        <div className="border-r border-slate-200 flex flex-col h-full bg-slate-50/50">
          <div className="p-4 border-b border-slate-200 bg-white">
            <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider">Conversations ({conversations.length})</h3>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
            {conversations.map(conv => {
              const isSelected = conv.id === activeConv?.id;
              const otherName = userRole === 'customer' ? conv.workerName : conv.clientName;
              const otherAvatar = userRole === 'customer' ? conv.workerAvatar : conv.clientAvatar;

              return (
                <div
                  key={conv.id}
                  onClick={() => setActiveConversationId(conv.id)}
                  className={`p-4 cursor-pointer transition flex items-start gap-3 ${
                    isSelected ? 'bg-white border-l-4 border-brand-600 shadow-xs' : 'hover:bg-slate-100/60'
                  }`}
                >
                  <div className="relative">
                    <img src={otherAvatar} alt={otherName} className="w-10 h-10 rounded-xl object-cover" />
                    {conv.isOnline && (
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white absolute -top-0.5 -right-0.5" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5">
                      <h4 className="font-bold text-xs text-slate-900 truncate">{otherName}</h4>
                      <span className="text-[10px] text-slate-400">{conv.lastMessageTime}</span>
                    </div>
                    <p className="text-[11px] text-slate-500 truncate">{conv.lastMessage}</p>
                    <span className="text-[9px] text-brand-700 bg-brand-50 px-1.5 py-0.5 rounded font-medium mt-1 inline-block">
                      {conv.projectTitle}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right 2 Cols: Chat Window */}
        <div className="md:col-span-2 flex flex-col h-full bg-white">
          
          {activeConv ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-white">
                <div className="flex items-center gap-3">
                  <img 
                    src={userRole === 'customer' ? activeConv.workerAvatar : activeConv.clientAvatar} 
                    alt="Recipient" 
                    className="w-10 h-10 rounded-xl object-cover"
                  />
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">
                      {userRole === 'customer' ? activeConv.workerName : activeConv.clientName}
                    </h3>
                    <p className="text-[11px] text-slate-400">
                      Project: <span className="text-brand-600 font-semibold">{activeConv.projectTitle}</span>
                    </p>
                  </div>
                </div>

                <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Active Thread
                </span>
              </div>

              {/* Messages Body */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50/30">
                {(activeConv.messages || []).map((msg) => {
                  const isMe = msg.senderId === currentUser.id;

                  return (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                    >
                      <div className="text-[10px] text-slate-400 mb-1 px-1">
                        {msg.senderName} • {msg.timestamp}
                      </div>
                      <div className={`max-w-[75%] p-3.5 rounded-2xl text-xs leading-relaxed ${
                        isMe 
                          ? 'bg-brand-600 text-white rounded-br-none shadow-xs' 
                          : 'bg-white border border-slate-200 text-slate-800 rounded-bl-none shadow-xs'
                      }`}>
                        {msg.text}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Chat Input Bar */}
              <form onSubmit={handleSend} className="p-3 border-t border-slate-200 bg-white flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Type your message, milestone update, or question..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  className="flex-1 text-xs sm:text-sm px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:outline-none"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-semibold shadow-xs transition flex items-center gap-1.5"
                >
                  <Send className="w-4 h-4" />
                  <span className="hidden sm:inline">Send</span>
                </button>
              </form>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-slate-400 text-xs">
              Select a conversation to start chatting
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
