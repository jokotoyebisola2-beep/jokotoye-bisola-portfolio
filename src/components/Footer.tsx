import React, { useState, useEffect } from 'react';
import { Linkedin, Github, Twitter, Mail, ArrowUp, MessageSquare } from 'lucide-react';
import { BISOLA_INFO, WHATSAPP_LINK } from '../data/portfolioData';
import { Logo } from './Logo';
import { cmsService } from '../lib/cmsService';
import { WebsiteSettings } from '../types';

export const Footer: React.FC = () => {
  const [settings, setSettings] = useState<Partial<WebsiteSettings>>({});

  useEffect(() => {
    cmsService.getSettings().then(setSettings);
    const unsub = cmsService.subscribeSettings(setSettings);
    return unsub;
  }, []);

  const whatsappNumber = settings.whatsappNumber || '2349033467029';
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=Hi%20Bisola!%20I'm%20reaching%20out%20from%20your%20portfolio%20footer.`;
  const contactEmail = settings.email || 'jokotoyebisola2@gmail.com';
  const githubUrl = settings.socialLinks?.github || BISOLA_INFO.github;
  const linkedinUrl = settings.socialLinks?.linkedin || BISOLA_INFO.linkedin;
  const twitterUrl = settings.socialLinks?.twitter || BISOLA_INFO.twitter;
  const footerText = settings.footerText || `© ${new Date().getFullYear()} Jokotoye Bisola. All rights reserved.`;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="main-footer" className="bg-[#0F172A] text-white border-t border-slate-800 pt-14 pb-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-slate-800/80 items-start">
          
          {/* Brand & Small closing line */}
          <div className="md:col-span-5 space-y-3">
            <a href="#" className="inline-block py-1">
              <Logo variant="compact" theme="dark" />
            </a>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm pt-1">
              {settings.brandStatement || 'Helping businesses grow with great design and smart technology.'}
            </p>
          </div>

          {/* Minimal Navigation */}
          <div className="md:col-span-3 space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Navigation
            </h4>
            <ul className="space-y-1.5 text-xs sm:text-sm text-slate-300">
              <li><a href="#" className="hover:text-blue-400 transition-colors">Home</a></li>
              <li><a href="#services" className="hover:text-blue-400 transition-colors">Services</a></li>
              <li><a href="#work" className="hover:text-blue-400 transition-colors">Work</a></li>
              <li><a href="#reviews" className="hover:text-blue-400 transition-colors">Reviews</a></li>
              <li><a href="#contact" className="hover:text-blue-400 transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Connect & Direct WhatsApp */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Direct Contact
            </h4>

            <div className="flex flex-col gap-2.5">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs transition-all w-fit"
              >
                <MessageSquare className="w-3.5 h-3.5 fill-white" />
                <span>💬 Chat on WhatsApp</span>
              </a>

              <a
                href={`mailto:${contactEmail}`}
                className="text-xs text-slate-300 hover:text-blue-400 transition-colors flex items-center gap-2"
              >
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                <span>{contactEmail}</span>
              </a>
            </div>

            <div className="flex items-center gap-2.5 pt-2">
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 hover:border-[#2563EB] hover:bg-[#2563EB] text-slate-400 hover:text-white flex items-center justify-center transition-all"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-500 hover:bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center transition-all"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={twitterUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 hover:border-[#2563EB] hover:bg-[#2563EB] text-slate-400 hover:text-white flex items-center justify-center transition-all"
                aria-label="X / Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            {footerText}
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};
