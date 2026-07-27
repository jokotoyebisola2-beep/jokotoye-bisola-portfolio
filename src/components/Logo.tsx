import React from 'react';

interface LogoProps {
  variant?: 'compact' | 'full' | 'icon';
  theme?: 'light' | 'dark';
  className?: string;
  showSubtitle?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  variant = 'compact',
  theme = 'light',
  className = '',
  showSubtitle = true,
}) => {
  const isDark = theme === 'dark';

  // SVG Emblem component reproducing the geometric "D" ribbon icon
  const Emblem = ({ size = 36 }: { size?: number }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0 transition-transform duration-200"
    >
      <defs>
        {/* Blue Ribbon Gradients */}
        <linearGradient id="blueRibbon" x1="20" y1="20" x2="65" y2="65" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#2563EB" />
          <stop offset="100%" stopColor="#1D4ED8" />
        </linearGradient>
        <linearGradient id="blueRibbonDark" x1="30" y1="40" x2="60" y2="70" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#1E40AF" />
          <stop offset="100%" stopColor="#1E3A8A" />
        </linearGradient>

        {/* Silver Ribbon Gradients */}
        <linearGradient id="silverRibbon" x1="20" y1="10" x2="90" y2="80" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#F1F5F9" />
          <stop offset="50%" stopColor="#CBD5E1" />
          <stop offset="100%" stopColor="#94A3B8" />
        </linearGradient>
      </defs>

      {/* Outer Silver Ribbon Loop (forming the outer D curve) */}
      <path
        d="M40 16 H62 C78 16 90 28 90 48 C90 68 78 80 62 80 H42 L55 68 H62 C71 68 77 60 77 48 C77 36 71 28 62 28 H40 V16 Z"
        fill="url(#silverRibbon)"
      />

      {/* Inner Blue Geometric Arrow / Ribbon (forming the left spine & fold) */}
      <path
        d="M20 28 H48 L72 52 L58 66 L34 42 V80 H20 V28 Z"
        fill="url(#blueRibbon)"
      />

      {/* Subtle Shadow / Fold Overlay on Blue Fold */}
      <path
        d="M20 28 L34 42 V80 L20 80 V28 Z"
        fill="url(#blueRibbonDark)"
        opacity="0.25"
      />
    </svg>
  );

  if (variant === 'icon') {
    return <Emblem size={40} />;
  }

  if (variant === 'full') {
    return (
      <div className={`flex flex-col items-center text-center ${className}`}>
        <Emblem size={56} />
        <div className="mt-2.5">
          <span
            className={`text-xl sm:text-2xl font-black tracking-[0.2em] uppercase block font-sans ${
              isDark ? 'text-white' : 'text-[#0F172A]'
            }`}
          >
            Jokotoye
          </span>
          <div className="flex items-center justify-center gap-2 my-0.5">
            <span className={`h-[1.5px] w-5 ${isDark ? 'bg-blue-400/60' : 'bg-[#2563EB]/60'}`}></span>
            <span className="text-xs sm:text-sm font-extrabold tracking-[0.3em] uppercase text-[#2563EB]">
              Bisola
            </span>
            <span className={`h-[1.5px] w-5 ${isDark ? 'bg-blue-400/60' : 'bg-[#2563EB]/60'}`}></span>
          </div>
          {showSubtitle && (
            <span
              className={`text-[9px] sm:text-[10px] font-bold tracking-[0.15em] uppercase block mt-1 ${
                isDark ? 'text-slate-400' : 'text-slate-500'
              }`}
            >
              AI Product Engineer & UI/UX Designer
            </span>
          )}
        </div>
      </div>
    );
  }

  // Compact Horizontal Variant (Ideal for Navbar)
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <Emblem size={36} />
      <div className="flex flex-col justify-center">
        <div className="flex items-center gap-1.5 leading-none">
          <span
            className={`text-sm sm:text-base font-black tracking-[0.15em] uppercase ${
              isDark ? 'text-white' : 'text-[#0F172A]'
            }`}
          >
            Jokotoye
          </span>
          <span className="text-xs font-extrabold tracking-[0.2em] uppercase text-[#2563EB]">
            Bisola
          </span>
        </div>
        {showSubtitle && (
          <span
            className={`text-[9px] sm:text-[10px] font-bold tracking-[0.08em] uppercase mt-1 ${
              isDark ? 'text-slate-400' : 'text-slate-500'
            }`}
          >
            AI Product Engineer & UI/UX Designer
          </span>
        )}
      </div>
    </div>
  );
};
