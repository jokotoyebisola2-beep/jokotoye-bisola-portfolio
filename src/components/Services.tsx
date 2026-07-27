import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Globe, Cpu, LayoutGrid, Palette, Rocket, Workflow, MessageSquare, Wrench } from 'lucide-react';
import { WHATSAPP_LINK } from '../data/portfolioData';
import { cmsService } from '../lib/cmsService';
import { Service } from '../types';

export const Services: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;
    const unsub = cmsService.subscribeServices(
      (data) => {
        if (!isMounted) return;
        // Filter published/active services
        const active = data.filter((s) => s.status === 'active' || (s as any).status === 'published');
        setServices(active);
        setLoading(false);
      },
      (err) => {
        console.error('Error fetching services from Firestore:', err);
        if (isMounted) setLoading(false);
      }
    );

    return () => {
      isMounted = false;
      unsub();
    };
  }, []);

  const getIcon = (iconName?: string) => {
    switch (iconName) {
      case 'Cpu':
        return <Cpu className="w-6 h-6 text-[#2563EB]" />;
      case 'Layers':
      case 'LayoutGrid':
        return <LayoutGrid className="w-6 h-6 text-[#2563EB]" />;
      case 'Rocket':
        return <Rocket className="w-6 h-6 text-[#2563EB]" />;
      case 'Workflow':
        return <Workflow className="w-6 h-6 text-[#2563EB]" />;
      case 'Layout':
      case 'Palette':
        return <Palette className="w-6 h-6 text-[#2563EB]" />;
      default:
        return <Globe className="w-6 h-6 text-[#2563EB]" />;
    }
  };

  return (
    <section id="services" className="py-20 bg-slate-50/80 text-[#111827] relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-[#2563EB] bg-blue-50 border border-blue-200 px-3.5 py-1.5 rounded-full inline-block mb-3">
            Services
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight mb-3">
            How I Can Help Your Business
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-normal">
            Simple, high-quality digital solutions designed to grow your business.
          </p>
        </div>

        {/* Loading State: Skeleton Loaders */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-7 border border-slate-200 shadow-2xs animate-pulse space-y-4"
              >
                <div className="w-12 h-12 rounded-xl bg-slate-200"></div>
                <div className="h-5 bg-slate-200 rounded-md w-3/4"></div>
                <div className="h-4 bg-slate-200 rounded-md w-full"></div>
                <div className="h-4 bg-slate-200 rounded-md w-2/3"></div>
                <div className="h-9 bg-slate-200 rounded-xl w-full pt-2"></div>
              </div>
            ))}
          </div>
        ) : services.length === 0 ? (
          /* Empty State Placeholder */
          <div className="bg-white border border-slate-200 rounded-2xl p-10 text-center max-w-lg mx-auto shadow-xs">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 text-[#2563EB] flex items-center justify-center mx-auto mb-4">
              <Wrench className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#0F172A] mb-1">
              Services Updating
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mb-6">
              Services are currently being updated in the CMS. Chat directly on WhatsApp for custom development packages!
            </p>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold transition-all shadow-xs"
            >
              <MessageSquare className="w-4 h-4 fill-white" />
              <span>Inquire via WhatsApp</span>
            </a>
          </div>
        ) : (
          /* Dynamic Services Cards Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-7 border border-slate-200 shadow-2xs hover:shadow-md hover:border-blue-200 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                    {getIcon(service.iconName)}
                  </div>
                  <h3 className="text-lg font-bold text-[#0F172A] mb-2 group-hover:text-[#2563EB] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-6">
                    {service.description}
                  </p>
                </div>

                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-[#25D366] text-slate-700 hover:text-white font-bold text-xs transition-all duration-200 cursor-pointer"
                >
                  <MessageSquare className="w-3.5 h-3.5 fill-current" />
                  <span>💬 Chat on WhatsApp</span>
                </a>
              </motion.div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
