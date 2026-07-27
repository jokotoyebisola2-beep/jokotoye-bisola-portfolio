import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Mail, MessageSquare, Send, CheckCircle2, Copy, Check } from 'lucide-react';
import { cmsService } from '../lib/cmsService';
import { WebsiteSettings } from '../types';

interface ContactSectionProps {
  preFilledProjectType?: string;
  onOpenBooking?: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = () => {
  const [settings, setSettings] = useState<Partial<WebsiteSettings>>({});
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    project: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  useEffect(() => {
    cmsService.getSettings().then(setSettings);
    const unsub = cmsService.subscribeSettings(setSettings);
    return unsub;
  }, []);

  const whatsappNumber = settings.whatsappNumber || '2349033467029';
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=Hi%20Bisola!%20I'm%20reaching%20out%20from%20your%20portfolio%20contact%20section.`;
  const contactEmail = settings.email || 'jokotoyebisola2@gmail.com';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await cmsService.sendMessage({
        name: formData.name,
        email: formData.email,
        message: formData.project,
      });
      setSubmitted(true);
    } catch (err) {
      console.error('Error sending message:', err);
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(contactEmail);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <section id="contact" className="py-24 bg-slate-50 text-[#111827] relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[#2563EB] bg-blue-50 border border-blue-200 px-3.5 py-1.5 rounded-full inline-block mb-4">
            Get In Touch
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F172A] tracking-tight leading-tight mb-4">
            Let's Build Something Great Together.
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
            Have an idea? Need a website? Want an AI solution? Let's talk.
          </p>
        </div>

        {/* 3 Contact Options Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          
          {/* Left Side: Option 1 (WhatsApp) & Option 2 (Email) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* OPTION 1: WhatsApp (Primary) */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm relative overflow-hidden">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-[#25D366]/10 text-[#25D366] flex items-center justify-center shrink-0">
                  <MessageSquare className="w-5 h-5 fill-[#25D366]" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Fastest Response</span>
                  <h3 className="text-lg font-bold text-[#0F172A]">Direct WhatsApp Chat</h3>
                </div>
              </div>

              <p className="text-sm text-slate-600 mb-6 leading-relaxed">
                Connect with me instantly on WhatsApp to chat about your timeline, ideas, or questions.
              </p>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-base transition-all duration-200 shadow-lg shadow-[#25D366]/20 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer text-center"
              >
                <MessageSquare className="w-5 h-5 fill-white" />
                <span>💬 Chat on WhatsApp</span>
              </a>
            </div>

            {/* OPTION 2: Email */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#2563EB] flex items-center justify-center shrink-0 border border-blue-100">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Email Me</span>
                  <h3 className="text-lg font-bold text-[#0F172A]">Send an Email</h3>
                </div>
              </div>

              <p className="text-sm text-slate-600 mb-4 leading-relaxed">
                Prefer email? Reach out directly and I'll get back to you within 24 hours.
              </p>

              <div className="flex items-center gap-2">
                <a
                  href={`mailto:${contactEmail}`}
                  className="flex-1 px-4 py-3 bg-slate-50 hover:bg-blue-50/50 border border-slate-200 hover:border-blue-200 rounded-xl text-slate-900 font-semibold text-sm transition-colors flex items-center justify-between group truncate"
                >
                  <span className="truncate">{contactEmail}</span>
                  <Mail className="w-4 h-4 text-slate-400 group-hover:text-[#2563EB] shrink-0 ml-2" />
                </a>

                <button
                  onClick={handleCopyEmail}
                  title="Copy Email"
                  className="p-3 bg-slate-100 hover:bg-slate-200 rounded-xl text-slate-700 transition-colors shrink-0 cursor-pointer"
                >
                  {copiedEmail ? <Check className="w-4 h-4 text-[#10B981]" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

          </div>

          {/* Right Side: OPTION 3 (Short Contact Form) */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm">
            <div className="mb-6">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Quick Form</span>
              <h3 className="text-xl font-bold text-[#0F172A]">Send a Message</h3>
            </div>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8 px-4 space-y-4"
              >
                <div className="w-14 h-14 rounded-full bg-emerald-50 text-[#10B981] border border-emerald-200 flex items-center justify-center mx-auto shadow-2xs">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-bold text-[#0F172A]">Message Sent!</h4>
                <p className="text-sm text-slate-600 max-w-md mx-auto">
                  Thank you, <span className="font-semibold text-slate-900">{formData.name}</span>. I have received your message in JB Studio CMS and will reply shortly.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', email: '', project: '' });
                  }}
                  className="text-xs font-bold text-[#2563EB] hover:underline pt-2 inline-block cursor-pointer"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                    Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#2563EB] transition-all"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#2563EB] transition-all"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                    Tell me about your project
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="What are you looking to build or achieve?"
                    value={formData.project}
                    onChange={(e) => setFormData({ ...formData, project: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#2563EB] transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#0F172A] hover:bg-[#2563EB] text-white font-bold text-sm transition-all duration-200 shadow-md cursor-pointer disabled:opacity-50"
                >
                  <Send className="w-4 h-4 text-blue-400" />
                  <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Closing Simple Message */}
        <div className="text-center pt-8 border-t border-slate-200">
          <p className="text-lg sm:text-xl font-bold text-[#0F172A] tracking-tight">
            "Let's build something that helps your business grow."
          </p>
        </div>

      </div>
    </section>
  );
};
