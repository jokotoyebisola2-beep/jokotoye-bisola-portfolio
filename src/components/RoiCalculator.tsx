import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Brain, Layout, Layers, Zap, Clock, TrendingUp, CheckCircle2, ArrowRight, Sliders } from 'lucide-react';
import { SCOPE_OPTIONS } from '../data/portfolioData';

interface RoiCalculatorProps {
  onPreFillContact: (scopeLabel: string, estimatedWeeks: number) => void;
}

export const RoiCalculator: React.FC<RoiCalculatorProps> = ({ onPreFillContact }) => {
  const [selectedOptionId, setSelectedOptionId] = useState<string>('ai-app');
  const [teamSize, setTeamSize] = useState<string>('1-10');
  const [urgency, setUrgency] = useState<string>('Standard (4-6 weeks)');

  const selectedOption = SCOPE_OPTIONS.find((opt) => opt.id === selectedOptionId) || SCOPE_OPTIONS[0];

  const getOptionIcon = (iconName: string) => {
    switch (iconName) {
      case 'Brain':
        return <Brain className="w-6 h-6 text-blue-600" />;
      case 'Layout':
        return <Layout className="w-6 h-6 text-indigo-600" />;
      case 'Layers':
        return <Layers className="w-6 h-6 text-blue-600" />;
      case 'Zap':
        return <Zap className="w-6 h-6 text-indigo-600" />;
      default:
        return <Brain className="w-6 h-6 text-blue-600" />;
    }
  };

  return (
    <section id="roi-estimator" className="py-24 bg-slate-50/80 text-[#111827] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[#2563EB] bg-blue-50 border border-blue-200 px-3.5 py-1.5 rounded-full inline-block mb-4">
            Project Estimator
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F172A] tracking-tight leading-tight mb-5">
            Estimate timeline and business impact.
          </h2>
          <p className="text-lg text-slate-600 font-normal leading-relaxed">
            Select your project type to see estimated timelines and expected outcomes.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Scope Selection */}
          <div className="lg:col-span-7 space-y-6">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-3">
              Step 1: Choose Your Project Type
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {SCOPE_OPTIONS.map((option) => (
                <button
                  key={option.id}
                  onClick={() => setSelectedOptionId(option.id)}
                  className={`p-5 rounded-2xl text-left border-2 transition-all duration-200 cursor-pointer ${
                    selectedOptionId === option.id
                      ? 'bg-blue-50/80 border-[#2563EB] shadow-md'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center mb-3 shadow-sm">
                    {getOptionIcon(option.icon)}
                  </div>
                  <h3 className="text-base font-bold text-[#0F172A] mb-1">
                    {option.label}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {option.description}
                  </p>
                </button>
              ))}
            </div>

            {/* Additional Parameters */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/90 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">
                    Company / Team Size:
                  </label>
                  <select
                    value={teamSize}
                    onChange={(e) => setTeamSize(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                  >
                    <option value="Solo Founder / Startup">Solo Founder / Startup</option>
                    <option value="1-10 Employees">1 - 10 Employees</option>
                    <option value="11-50 Employees">11 - 50 Employees</option>
                    <option value="50+ Enterprise">50+ Enterprise</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">
                    Target Launch Urgency:
                  </label>
                  <select
                    value={urgency}
                    onChange={(e) => setUrgency(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                  >
                    <option value="Urgent Fast-Track (< 3 weeks)">Urgent Fast-Track (&lt; 3 weeks)</option>
                    <option value="Standard (4-6 weeks)">Standard (4-6 weeks)</option>
                    <option value="Flexible Q3/Q4 Roadmap">Flexible Q3/Q4 Roadmap</option>
                  </select>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Calculated Estimate Card */}
          <div className="lg:col-span-5 bg-[#0F172A] text-white rounded-3xl p-8 border border-slate-800 shadow-xl relative">
            <div className="flex items-center justify-between pb-6 border-b border-slate-800 mb-6">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-400">
                Scope Summary & Projected Output
              </span>
              <span className="text-xs font-mono text-[#10B981] font-bold bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/30">
                High Confidence
              </span>
            </div>

            <div className="space-y-6 mb-8">
              <div>
                <span className="text-xs text-slate-400 uppercase font-semibold block mb-1">
                  Selected Product Focus:
                </span>
                <h4 className="text-2xl font-bold text-white">
                  {selectedOption.label}
                </h4>
              </div>

              {/* Duration Metric */}
              <div className="flex items-center gap-4 bg-slate-900 p-4 rounded-2xl border border-slate-800">
                <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-medium">Estimated Engineering Duration</div>
                  <div className="text-lg font-bold text-white">
                    ~{selectedOption.estimatedWeeks} Weeks to Production Handoff
                  </div>
                </div>
              </div>

              {/* Expected ROI Metric */}
              <div className="flex items-center gap-4 bg-emerald-500/10 p-4 rounded-2xl border border-emerald-500/30">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-[#10B981] flex items-center justify-center shrink-0">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-[#10B981] font-bold uppercase">Expected Business Impact</div>
                  <div className="text-sm font-semibold text-white mt-0.5">
                    {selectedOption.typicalOutcome}
                  </div>
                </div>
              </div>

              <div>
                <span className="text-xs text-slate-400 uppercase font-semibold block mb-2.5">
                  Standard Scope Includes:
                </span>
                <ul className="space-y-2 text-xs text-slate-300 font-medium">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                    <span>Product Architecture & Conversion Strategy</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                    <span>Responsive React / TypeScript Frontend</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                    <span>Secure API Routes & AI Integrations</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                    <span>30-Day Post-Launch Technical Guarantee</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* CTA Button to transfer options to Contact section */}
            <button
              onClick={() => {
                onPreFillContact(selectedOption.label, selectedOption.estimatedWeeks);
                const contactEl = document.getElementById('contact');
                if (contactEl) contactEl.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-[#2563EB] hover:bg-blue-500 text-white font-semibold text-sm transition-all shadow-lg cursor-pointer"
            >
              <span>Pre-fill Project Scope Inquiry</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
