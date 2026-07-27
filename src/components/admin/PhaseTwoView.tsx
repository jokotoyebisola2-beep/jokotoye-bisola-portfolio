import React from 'react';
import { Clock, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface PhaseTwoViewProps {
  title: string;
}

export const PhaseTwoView: React.FC<PhaseTwoViewProps> = ({ title }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center p-6 bg-slate-950/60 border border-slate-800/80 rounded-2xl">
      <div className="p-4 rounded-2xl bg-blue-950/80 border border-blue-800/80 text-[#60A5FA] mb-4 shadow-xl">
        <Clock className="w-8 h-8" />
      </div>
      
      <h2 className="text-xl font-extrabold text-white tracking-tight mb-2">
        {title} — Coming in Phase 2
      </h2>
      
      <p className="text-xs text-slate-400 max-w-md leading-relaxed mb-6">
        This section is reserved for Phase 2. Currently, Phase 1 focuses exclusively on Authentication and the Core Dashboard Shell.
      </p>

      <button
        onClick={() => navigate('/admin/dashboard')}
        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-all border border-slate-700 cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Dashboard</span>
      </button>
    </div>
  );
};
