import React from 'react';
import { motion } from 'motion/react';
import { BISOLA_INFO } from '../data/portfolioData';

export const TrustMetrics: React.FC = () => {
  return (
    <section id="trust-metrics" className="bg-slate-50 border-t border-b border-slate-200 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 divide-y lg:divide-y-0 lg:divide-x divide-slate-200">
          {BISOLA_INFO.stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`flex flex-col items-center lg:items-start text-center lg:text-left ${
                index > 0 ? 'pt-6 lg:pt-0 lg:pl-8' : ''
              }`}
            >
              <span className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight font-mono">
                {stat.value}
              </span>
              <span className="text-sm font-medium text-slate-600 mt-1.5">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
