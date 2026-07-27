import React from 'react';
import { motion } from 'motion/react';
import { Target, Smile, Zap, LifeBuoy, MessageSquare } from 'lucide-react';
import { WHATSAPP_LINK } from '../data/portfolioData';

export const WhyWorkWithMe: React.FC = () => {
  const reasons = [
    {
      icon: <Target className="w-6 h-6 text-[#2563EB]" />,
      title: 'Business Focused',
      description: 'I build products that solve real business problems.',
    },
    {
      icon: <Smile className="w-6 h-6 text-[#2563EB]" />,
      title: 'Easy To Use',
      description: 'Simple designs your customers will enjoy.',
    },
    {
      icon: <Zap className="w-6 h-6 text-[#2563EB]" />,
      title: 'Fast Performance',
      description: 'Fast websites that keep visitors engaged.',
    },
    {
      icon: <LifeBuoy className="w-6 h-6 text-[#2563EB]" />,
      title: 'Long-Term Support',
      description: 'Support before, during, and after launch.',
    },
  ];

  return (
    <section id="why-me" className="py-20 bg-white text-[#111827] relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-[#2563EB] bg-blue-50 border border-blue-200 px-3.5 py-1.5 rounded-full inline-block mb-3">
            Why Choose Me
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight mb-3">
            Why Businesses Choose Me
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-normal">
            Reliable, human-centered development focused on growth and quality.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {reasons.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="bg-slate-50/80 rounded-2xl p-7 border border-slate-200 hover:border-blue-300 hover:bg-white hover:shadow-sm transition-all"
            >
              <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center mb-5 shadow-2xs">
                {item.icon}
              </div>
              <h3 className="text-lg font-bold text-[#0F172A] mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-sm transition-all shadow-md hover:shadow-lg"
          >
            <MessageSquare className="w-4 h-4 fill-white shrink-0" />
            <span>💬 Chat on WhatsApp</span>
          </a>
        </div>

      </div>
    </section>
  );
};
