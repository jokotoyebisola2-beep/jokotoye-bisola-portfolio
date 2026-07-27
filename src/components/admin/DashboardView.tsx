import React from 'react';
import {
  FolderKanban,
  Wrench,
  MessageSquareQuote,
  Activity,
  Calendar,
  ExternalLink,
  ShieldCheck,
  Sparkles
} from 'lucide-react';

export const DashboardView: React.FC = () => {
  // Format Today's Date dynamically
  const todayDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="space-y-8 font-sans antialiased">
      
      {/* Welcome Banner */}
      <div className="relative overflow-hidden p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-slate-800 shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/80 border border-blue-800/80 text-blue-400 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5 text-[#2563EB]" />
              <span>Phase 1 • Administration Active</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
              <span>Welcome back, Bisola</span>
              <span className="text-2xl sm:text-3xl">👋</span>
            </h1>

            <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
              <Calendar className="w-4 h-4 text-[#2563EB]" />
              <span>{todayDate}</span>
            </div>
          </div>

          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#2563EB] hover:bg-blue-600 text-white text-xs font-bold transition-all shadow-lg shadow-blue-900/30 shrink-0"
          >
            <span>View Public Portfolio</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Stat Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Card 1: Projects */}
        <div className="bg-slate-950/80 border border-slate-800/80 rounded-2xl p-6 shadow-lg hover:border-blue-500/40 transition-all group">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Projects
            </span>
            <div className="p-2.5 rounded-xl bg-blue-950/80 border border-blue-900/50 text-[#60A5FA] group-hover:scale-105 transition-transform">
              <FolderKanban className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-white tracking-tight">0</div>
          <p className="text-[11px] font-medium text-slate-500 mt-1.5">
            Phase 1 Initialized
          </p>
        </div>

        {/* Card 2: Services */}
        <div className="bg-slate-950/80 border border-slate-800/80 rounded-2xl p-6 shadow-lg hover:border-blue-500/40 transition-all group">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Services
            </span>
            <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 group-hover:scale-105 transition-transform">
              <Wrench className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-white tracking-tight">0</div>
          <p className="text-[11px] font-medium text-slate-500 mt-1.5">
            Phase 1 Initialized
          </p>
        </div>

        {/* Card 3: Testimonials */}
        <div className="bg-slate-950/80 border border-slate-800/80 rounded-2xl p-6 shadow-lg hover:border-blue-500/40 transition-all group">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Testimonials
            </span>
            <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 group-hover:scale-105 transition-transform">
              <MessageSquareQuote className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-white tracking-tight">0</div>
          <p className="text-[11px] font-medium text-slate-500 mt-1.5">
            Phase 1 Initialized
          </p>
        </div>

        {/* Card 4: Portfolio Status */}
        <div className="bg-slate-950/80 border border-slate-800/80 rounded-2xl p-6 shadow-lg hover:border-blue-500/40 transition-all group">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Portfolio Status
            </span>
            <div className="p-2.5 rounded-xl bg-emerald-950/80 border border-emerald-900/50 text-emerald-400 group-hover:scale-105 transition-transform">
              <Activity className="w-5 h-5" />
            </div>
          </div>
          <div className="text-lg font-bold text-emerald-400 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Active & Live</span>
          </div>
          <p className="text-[11px] font-medium text-slate-500 mt-1.5">
            Public Website Operational
          </p>
        </div>

      </div>

      {/* Overview Information Box */}
      <div className="bg-slate-950/60 border border-slate-800/80 rounded-2xl p-6 sm:p-8">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-xl bg-blue-950 border border-blue-900 text-[#60A5FA] shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-white">
              Phase 1 CMS Architecture Operational
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed max-w-2xl">
              You are currently authenticated as the sole administrator. Phase 1 provides secure authentication and the dashboard shell without performing unnecessary Firestore background reads or writes.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};
