import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { MessageSquare, ArrowRight, CheckCircle2, Sparkles, TrendingUp, ShieldCheck } from 'lucide-react';
import { BISOLA_INFO, WHATSAPP_LINK } from '../data/portfolioData';
import { cmsService } from '../lib/cmsService';
import { WebsiteSettings } from '../types';

interface HeroProps {
  onOpenBooking?: () => void;
}

export const Hero: React.FC<HeroProps> = () => {
  const [settings, setSettings] = useState<Partial<WebsiteSettings>>({});

  useEffect(() => {
    cmsService.getSettings().then(setSettings);
    const unsub = cmsService.subscribeSettings(setSettings);
    return unsub;
  }, []);

  const whatsappNumber = settings.whatsappNumber || '2349033467029';
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=Hi%20Bisola!%20I%20saw%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20project.`;

  return (
    <section
      id="hero-section"
      className="relative bg-white text-[#111827] pt-28 sm:pt-36 pb-20 sm:pb-28 overflow-hidden"
    >
      {/* Background Subtle Gradient Spheres */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-blue-50/60 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-slate-100/80 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Hero Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 flex flex-col items-start"
          >
            {/* Small Intro, Title, Brand Statement */}
            <div className="flex flex-col items-start gap-1.5 mb-6">
              <span className="text-sm font-semibold text-slate-700 bg-slate-100 border border-slate-200 px-3.5 py-1.5 rounded-full inline-block shadow-2xs">
                👋 Hi, I'm Jokotoye Bisola.
              </span>
              <h2 className="text-base sm:text-lg font-bold text-[#2563EB] tracking-tight mt-2">
                {settings.professionalTitle || 'AI Product Engineer & UI/UX Designer'}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 font-medium">
                {settings.brandStatement || 'Helping businesses grow through smart design, AI, and modern web experiences.'}
              </p>
            </div>

            {/* Main Headline */}
            <h1
              id="hero-title"
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#0F172A] leading-[1.12] mb-5"
            >
              {settings.heroHeadline || 'I build websites and AI tools that help businesses grow.'}
            </h1>

            {/* Subheadline */}
            <p
              id="hero-subtitle"
              className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed mb-8 max-w-2xl"
            >
              {settings.heroSubheadline || 'I create websites, web apps, and AI solutions that bring in more customers, save time, and help businesses grow.'}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mb-10">
              <a
                id="hero-primary-cta"
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-base transition-all duration-200 shadow-lg shadow-[#25D366]/25 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer text-center"
              >
                <MessageSquare className="w-5 h-5 fill-white shrink-0" />
                <span>💬 Chat on WhatsApp</span>
              </a>

              <a
                id="hero-secondary-cta"
                href="#work"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 font-semibold text-base transition-all duration-200"
              >
                <span>View My Work</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            {/* Trust Indicators */}
            <div className="pt-6 border-t border-slate-200 w-full">
              <div className="flex flex-wrap gap-x-6 gap-y-2.5">
                <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-700 font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0" />
                  <span>Fast Response</span>
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-700 font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0" />
                  <span>Business-Focused Solutions</span>
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-700 font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0" />
                  <span>Websites • Web Apps • AI Tools</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Portrait & Credibility Frame */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-5 relative flex justify-center"
          >
            <div className="relative w-full max-w-md lg:max-w-none">
              
              {/* Image Frame Container */}
              <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-xl bg-slate-100">
                <img
                  src={settings.profilePhotoUrl || BISOLA_INFO.portraitUrl}
                  alt="Jokotoye Bisola - AI Product Engineer"
                  referrerPolicy="no-referrer"
                  className="w-full h-[460px] sm:h-[520px] object-cover object-top filter contrast-[1.02]"
                />
                
                {/* Soft Gradient Overlay at Bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/90 via-[#0F172A]/20 to-transparent pointer-events-none" />

                {/* Overlaid Title Tag */}
                <div className="absolute bottom-5 left-5 right-5 p-4 rounded-xl bg-white/95 backdrop-blur-md border border-slate-200 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-[#0F172A] font-extrabold text-base">Jokotoye Bisola</h3>
                      <p className="text-xs text-[#2563EB] font-bold">
                        {settings.professionalTitle || 'AI Product Engineer & UI/UX Designer'}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 bg-emerald-50 border border-emerald-200 text-[#10B981] px-2.5 py-1 rounded-full text-xs font-bold">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Verified</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Stat Card (Top Right) */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="absolute -top-4 -right-4 sm:-top-6 sm:-right-6 bg-white border border-slate-200 p-4 rounded-2xl shadow-xl hidden sm:flex items-center gap-3.5 max-w-[210px]"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#2563EB] flex items-center justify-center shrink-0">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xl font-extrabold text-[#0F172A] leading-none">$4.2M+</div>
                  <div className="text-[11px] text-slate-500 font-medium mt-1">Client Revenue Growth</div>
                </div>
              </motion.div>

              {/* Floating Stat Card (Bottom Left) */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="absolute -bottom-5 -left-4 sm:-left-6 bg-white border border-slate-200 p-4 rounded-2xl shadow-xl hidden sm:flex items-center gap-3.5 max-w-[220px]"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#10B981] flex items-center justify-center shrink-0">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xl font-extrabold text-[#0F172A] leading-none">18,500+</div>
                  <div className="text-[11px] text-slate-500 font-medium mt-1">Hours Saved via AI</div>
                </div>
              </motion.div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
