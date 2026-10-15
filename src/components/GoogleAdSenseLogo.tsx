import React from 'react';

interface LogoProps {
  className?: string;
  showSubtitle?: boolean;
}

export const GoogleAdSenseLogo: React.FC<LogoProps> = ({
  className = '',
  showSubtitle = false,
}) => {
  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Google Product-Caliber Geometric Vector Emblem in Royal Amethyst & Electric Violet */}
      <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-white shadow-xs border border-purple-100/80 shrink-0 p-1 hover:scale-105 transition-transform">
        <svg
          viewBox="0 0 48 48"
          className="w-full h-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="logo-amethyst-1" x1="8" y1="8" x2="38" y2="40" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#9D62EC" />
              <stop offset="100%" stopColor="#6E2BE2" />
            </linearGradient>
            <linearGradient id="logo-amethyst-2" x1="16" y1="4" x2="44" y2="32" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#C084FC" />
              <stop offset="100%" stopColor="#8B5CF6" />
            </linearGradient>
            <linearGradient id="logo-amethyst-3" x1="6" y1="20" x2="30" y2="44" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#7C3AED" />
              <stop offset="100%" stopColor="#4C1D95" />
            </linearGradient>
          </defs>

          {/* Precision Outer Arc Ribbon (Continuous Folded Geometry) */}
          <path
            d="M 24 6 C 33.94 6 42 14.06 42 24 C 42 25.4 41.84 26.77 41.53 28.08 L 33.2 28.08 C 33.6 26.8 33.8 25.43 33.8 24 C 33.8 18.59 29.41 14.2 24 14.2 C 18.59 14.2 14.2 18.59 14.2 24 C 14.2 29.41 18.59 33.8 24 33.8 C 27.2 33.8 30.03 32.27 31.81 29.9 L 37.8 35.89 C 34.4 39.7 29.5 42 24 42 C 14.06 42 6 33.94 6 24 C 6 14.06 14.06 6 24 6 Z"
            fill="url(#logo-amethyst-1)"
          />

          {/* Lower Arc Counter-Balance */}
          <path
            d="M 6 24 C 6 33.94 14.06 42 24 42 C 29.5 42 34.4 39.7 37.8 35.89 L 31.81 29.9 C 30.03 32.27 27.2 33.8 24 33.8 C 18.59 33.8 14.2 29.41 14.2 24 L 6 24 Z"
            fill="url(#logo-amethyst-3)"
          />

          {/* Horizontal Growth Vector */}
          <rect
            x="22"
            y="20.5"
            width="20"
            height="7.5"
            rx="3.75"
            fill="url(#logo-amethyst-2)"
          />

          {/* Center Precision Dot */}
          <circle
            cx="24"
            cy="24.25"
            r="3"
            fill="#FFFFFF"
          />
        </svg>
      </div>

      {/* Brand Typography: GladSense with Electric Amethyst Accent */}
      <div className="flex flex-col leading-tight">
        <div className="flex items-center gap-1.5">
          <span className="font-['Google_Sans_Display','Google_Sans',sans-serif] text-[21px] font-bold text-[#1f2937] tracking-tight">
            Glad<span className="text-[#7c3aed]">Sense</span>
          </span>
          <span className="text-[10px] font-mono font-medium tracking-tight px-1.5 py-0.5 rounded-md bg-purple-50 text-purple-700 border border-purple-200/80 hidden sm:inline-block">
            gladsenseedu.app
          </span>
        </div>
        {showSubtitle && (
          <span className="text-[10px] text-slate-500 font-medium tracking-normal -mt-0.5">
            AdSense Compliance &amp; Quality Evaluation Standard
          </span>
        )}
      </div>
    </div>
  );
};
