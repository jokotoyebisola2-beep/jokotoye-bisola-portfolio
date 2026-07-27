import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bot, X, Send, Sparkles, MessageSquare, User, ArrowRight } from 'lucide-react';
import { BISOLA_INFO } from '../data/portfolioData';

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
}

export const AiAssistantWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'ai',
      text: `Hello! I'm Bisola's AI Product Advisor. Ask me anything about Jokotoye Bisola's AI engineering services, project timelines, case studies, or typical ROI outcomes!`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const quickPrompts = [
    'How does Bisola integrate AI into existing web apps?',
    'What is her typical project timeline & process?',
    'Tell me about the AI Finance Case Study.',
    'How do I book a Discovery Call?',
  ];

  const handleSend = async (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim() || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsLoading(true);

    try {
      // Call backend AI proxy route
      const response = await fetch('/api/ai-advisor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: query }),
      });

      if (!response.ok) {
        throw new Error('Server error');
      }

      const data = await response.json();

      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: data.reply || "Jokotoye Bisola specializes in engineering high-conversion digital products, custom LLM agents, and full-stack web applications. You can book a direct 20-minute discovery call using the button above!",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      // Fallback intelligent responses if server endpoint is offline
      let replyText = "Jokotoye Bisola is an AI Product Engineer & Full Stack Engineer who builds custom AI web apps, high-conversion flagships, and automated platforms. She works closely with founders and executive teams to scale revenue and automate operational workflows.";
      
      const lower = query.toLowerCase();
      if (lower.includes('timeline') || lower.includes('process') || lower.includes('how long')) {
        replyText = "Bisola's standard project timeline ranges from 2 to 6 weeks. High-conversion landing pages take 2-3 weeks, while full-stack AI web apps and SaaS MVPs typically take 4-6 weeks with 30-day post-launch support.";
      } else if (lower.includes('fintech') || lower.includes('case study') || lower.includes('finance')) {
        replyText = "In her Aura AI Finance case study, Bisola engineered an automated financial dashboard with natural language querying and predictive cashflow graphs, resulting in +340% user growth and saving finance managers 14 hours per week.";
      } else if (lower.includes('book') || lower.includes('call') || lower.includes('contact')) {
        replyText = "You can click any 'Book Discovery Call' button on this website to select a 20-minute consultation directly on Jokotoye Bisola's calendar!";
      }

      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, aiMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Toggle Trigger Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="group relative flex items-center gap-2.5 px-4 py-3 rounded-full bg-[#0F172A] hover:bg-[#2563EB] text-white font-semibold text-xs sm:text-sm shadow-2xl border border-slate-800 transition-all duration-300 hover:scale-105 cursor-pointer"
        >
          <div className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-pulse"></div>
          <Sparkles className="w-4 h-4 text-blue-400 group-hover:text-white transition-colors" />
          <span>Ask Bisola AI</span>
        </button>
      </div>

      {/* Floating Chat Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            className="fixed bottom-22 right-6 z-50 w-[92vw] sm:w-[400px] h-[520px] bg-white border border-slate-200 rounded-3xl shadow-2xl flex flex-col overflow-hidden text-[#111827]"
          >
            {/* Header */}
            <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-200 text-[#2563EB] flex items-center justify-center">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#0F172A]">Bisola AI Product Advisor</h4>
                  <p className="text-[10px] text-[#10B981] font-semibold">Powered by Gemini AI • Online</p>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full hover:bg-slate-200 text-slate-500 hover:text-slate-900 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages Body */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3.5 text-xs">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-2.5 ${
                    msg.sender === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {msg.sender === 'ai' && (
                    <div className="w-6 h-6 rounded-lg bg-blue-50 text-[#2563EB] flex items-center justify-center shrink-0 mt-0.5 border border-blue-100">
                      <Bot className="w-3.5 h-3.5" />
                    </div>
                  )}

                  <div
                    className={`max-w-[80%] rounded-2xl p-3.5 leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-[#2563EB] text-white rounded-br-xs shadow-sm'
                        : 'bg-slate-100 border border-slate-200 text-slate-800 rounded-bl-xs'
                    }`}
                  >
                    <p>{msg.text}</p>
                    <span className={`text-[9px] block mt-1 text-right ${msg.sender === 'user' ? 'text-blue-100' : 'text-slate-400'}`}>
                      {msg.timestamp}
                    </span>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex gap-2 items-center text-slate-500 text-xs">
                  <Bot className="w-4 h-4 text-[#2563EB] animate-spin" />
                  <span>Bisola AI is analyzing query...</span>
                </div>
              )}

              <div ref={chatEndRef} />
            </div>

            {/* Quick Prompts */}
            {messages.length < 3 && (
              <div className="px-3 py-2 bg-slate-50 border-t border-slate-200 flex flex-wrap gap-1.5">
                {quickPrompts.map((p, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(p)}
                    className="text-[10px] bg-white hover:bg-[#2563EB] text-slate-700 hover:text-white px-2.5 py-1 rounded-lg border border-slate-200 transition-colors text-left shadow-2xs"
                  >
                    {p}
                  </button>
                ))}
              </div>
            )}

            {/* Input Bar */}
            <div className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
              <input
                type="text"
                placeholder="Ask about Jokotoye Bisola's services..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#2563EB]"
              />
              <button
                onClick={() => handleSend()}
                disabled={isLoading || !input.trim()}
                className="w-9 h-9 rounded-xl bg-[#2563EB] hover:bg-blue-700 text-white flex items-center justify-center transition-colors disabled:opacity-40 cursor-pointer shadow-sm"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
