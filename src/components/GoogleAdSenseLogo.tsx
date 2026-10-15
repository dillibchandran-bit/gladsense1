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
      {/* Google Product-Caliber Geometric Vector Emblem in Royal Amethyst & Electric Violet with Black Center Focal Dot */}
      <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-white shadow-xs border border-purple-100/90 shrink-0 p-1 hover:scale-105 transition-transform">
        <svg
          viewBox="0 0 48 48"
          className="w-full h-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Quadrant 1: Crossbar (Electric Violet Gradient) */}
            <linearGradient id="gs-logo-crossbar" x1="24" y1="20" x2="44.5" y2="28" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#8B5CF6" />
              <stop offset="100%" stopColor="#6D28D9" />
            </linearGradient>

            {/* Quadrant 2: Bottom Arc (Deep Imperial Violet Gradient) */}
            <linearGradient id="gs-logo-bottom" x1="4" y1="24" x2="38" y2="44.5" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#7C3AED" />
              <stop offset="100%" stopColor="#4C1D95" />
            </linearGradient>

            {/* Quadrant 3: Left Arc (Vivid Magenta-Amethyst Gradient) */}
            <linearGradient id="gs-logo-left" x1="2" y1="12" x2="14" y2="34" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#A855F7" />
              <stop offset="100%" stopColor="#7C3AED" />
            </linearGradient>

            {/* Quadrant 4: Top Arc (Luminous Orchid Gradient) */}
            <linearGradient id="gs-logo-top" x1="4" y1="4" x2="38" y2="20" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#C084FC" />
              <stop offset="100%" stopColor="#9333EA" />
            </linearGradient>
          </defs>

          {/* Right Horizontal Inward Crossbar */}
          <path
            d="M 44.5 24 C 44.5 22.65 44.38 21.35 44.15 20.1 L 24 20.1 L 24 28.3 L 35.5 28.3 C 35 31 33.4 33.25 31.15 34.75 L 38.8 40.7 C 43.3 36.55 44.5 30.5 44.5 24 Z"
            fill="url(#gs-logo-crossbar)"
          />

          {/* Bottom Arc Ribbon */}
          <path
            d="M 24 44.5 C 29.55 44.5 34.2 42.65 37.6 39.55 L 30 33.65 C 28.35 34.75 26.35 35.4 24 35.4 C 18.65 35.4 14.1 31.8 12.5 26.9 L 4.6 33 C 8.5 40.7 15.65 44.5 24 44.5 Z"
            fill="url(#gs-logo-bottom)"
          />

          {/* Left Arc Ribbon */}
          <path
            d="M 12.5 26.9 C 12.1 25.65 11.9 24.35 11.9 23 C 11.9 21.65 12.1 20.35 12.5 19.1 L 4.6 13 C 2.95 16.25 2 19.5 2 23 C 2 26.5 2.95 29.75 4.6 33 L 12.5 26.9 Z"
            fill="url(#gs-logo-left)"
          />

          {/* Top Arc Ribbon */}
          <path
            d="M 24 10.6 C 27.05 10.6 29.75 11.65 31.9 13.7 L 38 7.6 C 34.2 4.05 29.5 2 24 2 C 15.65 2 8.5 5.8 4.6 13.5 L 12.5 19.6 C 14.1 14.7 18.65 10.6 24 10.6 Z"
            fill="url(#gs-logo-top)"
          />

          {/* Center Precision Focal Dot (Obsidian Black) */}
          <circle
            cx="24"
            cy="24"
            r="3.5"
            fill="#000000"
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
