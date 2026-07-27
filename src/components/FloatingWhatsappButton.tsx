import React from 'react';
import { motion } from 'motion/react';
import { MessageSquare } from 'lucide-react';
import { WHATSAPP_LINK } from '../data/portfolioData';

export const FloatingWhatsappButton: React.FC = () => {
  return (
    <motion.a
      href={WHATSAPP_LINK}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: 'spring', stiffness: 260, damping: 20 }}
      className="fixed bottom-6 right-6 z-40 inline-flex items-center gap-2.5 px-4 py-3 sm:px-5 sm:py-3.5 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-sm shadow-xl shadow-[#25D366]/30 hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-200 group cursor-pointer"
      aria-label="Chat on WhatsApp"
    >
      <div className="relative">
        <MessageSquare className="w-5 h-5 fill-white" />
        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-300 animate-ping"></span>
      </div>
      <span className="hidden sm:inline-block font-extrabold tracking-tight">
        💬 Chat on WhatsApp
      </span>
    </motion.a>
  );
};
