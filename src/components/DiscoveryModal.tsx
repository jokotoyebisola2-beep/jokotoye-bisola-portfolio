import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, Clock, CheckCircle2, User, Mail, Building, Sparkles } from 'lucide-react';
import { BISOLA_INFO } from '../data/portfolioData';

interface DiscoveryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DiscoveryModal: React.FC<DiscoveryModalProps> = ({ isOpen, onClose }) => {
  const [selectedDate, setSelectedDate] = useState<string>('Tomorrow, July 24');
  const [selectedTime, setSelectedTime] = useState<string>('2:00 PM EST');
  const [topic, setTopic] = useState<string>('AI Product Engineering & Strategy');
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [isBooked, setIsBooked] = useState<boolean>(false);

  if (!isOpen) return null;

  const dateOptions = [
    'Tomorrow, July 24',
    'Friday, July 25',
    'Monday, July 28',
    'Tuesday, July 29',
  ];

  const timeSlots = [
    '10:00 AM EST',
    '11:30 AM EST',
    '2:00 PM EST',
    '4:30 PM EST',
  ];

  const handleBook = (e: React.FormEvent) => {
    e.preventDefault();
    setIsBooked(true);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-950/80 backdrop-blur-md">
        
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0"
        />

        {/* Modal Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative bg-white border border-slate-200 rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl text-[#111827] z-10 overflow-hidden"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center border border-slate-200 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {isBooked ? (
            <div className="text-center py-8 space-y-6">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-[#10B981] flex items-center justify-center mx-auto border border-emerald-300 shadow-sm">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <h3 className="text-2xl font-bold text-[#0F172A] mb-2">
                  Discovery Call Confirmed!
                </h3>
                <p className="text-sm text-slate-600">
                  Calendar invitation sent to <span className="text-[#0F172A] font-bold">{email || 'your email'}</span>.
                </p>
              </div>

              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 text-left space-y-2 text-xs">
                <div className="flex justify-between text-slate-500">
                  <span>Host:</span>
                  <span className="text-[#0F172A] font-bold">{BISOLA_INFO.name}</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Date & Time:</span>
                  <span className="text-[#2563EB] font-bold">{selectedDate} @ {selectedTime}</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Focus Area:</span>
                  <span className="text-slate-800 font-medium">{topic}</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Location:</span>
                  <span className="text-[#10B981] font-medium">Google Meet (Link in Invite)</span>
                </div>
              </div>

              <button
                onClick={onClose}
                className="w-full py-3 px-6 rounded-xl bg-[#0F172A] hover:bg-[#2563EB] text-white font-bold text-sm transition-all shadow-md cursor-pointer"
              >
                Done & Return to Portfolio
              </button>
            </div>
          ) : (
            <form onSubmit={handleBook} className="space-y-6">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#2563EB] text-xs font-semibold mb-3">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>20-Min Strategic Consultation</span>
                </div>
                <h3 className="text-2xl font-extrabold text-[#0F172A]">
                  Schedule Discovery Call
                </h3>
                <p className="text-xs text-slate-600 mt-1">
                  Select your preferred time slot with Jokotoye Bisola.
                </p>
              </div>

              {/* Date Selector */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">
                  1. Select Date:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {dateOptions.map((d) => (
                    <button
                      type="button"
                      key={d}
                      onClick={() => setSelectedDate(d)}
                      className={`p-2.5 rounded-xl text-xs font-semibold border text-center transition-all cursor-pointer ${
                        selectedDate === d
                          ? 'bg-[#2563EB] text-white border-[#2563EB] shadow-sm'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              {/* Time Slot Selector */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">
                  2. Select Time Slot:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {timeSlots.map((t) => (
                    <button
                      type="button"
                      key={t}
                      onClick={() => setSelectedTime(t)}
                      className={`p-2.5 rounded-xl text-xs font-semibold border text-center transition-all cursor-pointer ${
                        selectedTime === t
                          ? 'bg-[#10B981] text-white border-[#10B981] shadow-sm'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* User Inputs */}
              <div className="space-y-3">
                <input
                  type="text"
                  required
                  placeholder="Your Full Name *"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                />
                <input
                  type="email"
                  required
                  placeholder="Your Work Email *"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-xl bg-[#0F172A] hover:bg-[#2563EB] text-white font-bold text-sm transition-all shadow-md cursor-pointer"
              >
                Confirm Call Reservation
              </button>
            </form>
          )}

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
