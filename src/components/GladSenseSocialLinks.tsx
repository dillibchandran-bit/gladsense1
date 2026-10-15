import React from 'react';

export interface SocialIconProps {
  className?: string;
}

/**
 * Pixel-perfect official SVG Icon for LinkedIn (authentic glyph, optically balanced)
 */
export const LinkedInIcon: React.FC<SocialIconProps> = ({ className = 'w-4 h-4' }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <circle cx="4.98" cy="4" r="2.2" />
    <rect width="4.4" height="12" x="2.78" y="8.5" rx="0.75" />
    <path d="M16 8.5a5.5 5.5 0 0 1 5.5 5.5V20.5h-4.4V14a1.8 1.8 0 0 0-3.6 0v6.5H9.1V8.5h4.4v1.8c.8-1.2 2-1.8 3.5-1.8z" />
  </svg>
);

/**
 * Pixel-perfect official SVG Icon for X (formerly Twitter)
 */
export const XIcon: React.FC<SocialIconProps> = ({ className = 'w-4 h-4' }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

/**
 * Pixel-perfect official SVG Icon for YouTube
 */
export const YouTubeIcon: React.FC<SocialIconProps> = ({ className = 'w-4 h-4' }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M21.582 6.186A2.806 2.806 0 0 0 19.61 4.2C17.87 3.75 12 3.75 12 3.75s-5.87 0-7.61.45A2.806 2.806 0 0 0 2.418 6.186C2 7.93 2 12 2 12s0 4.07.418 5.814a2.806 2.806 0 0 0 1.972 1.986C6.13 20.25 12 20.25 12 20.25s5.87 0 7.61-.45a2.806 2.806 0 0 0 1.972-1.986C22 16.07 22 12 22 12s0-4.07-.418-5.814zM10 15.5V8.5l6 3.5-6 3.5z"
    />
  </svg>
);

export interface GladSenseSocialLinksProps {
  variant?: 'pill' | 'minimal' | 'cards' | 'badge';
  size?: 'sm' | 'md' | 'lg';
  showLabels?: boolean;
  className?: string;
}

export const GLADSENSE_OFFICIAL_SOCIALS = [
  {
    id: 'linkedin',
    name: 'LinkedIn',
    handle: 'gladsense-edu',
    label: 'Connect on LinkedIn',
    url: 'https://www.linkedin.com/company/gladsense-edu',
    color: '#0a66c2',
    hoverBg: 'hover:bg-[#0a66c2]',
    hoverBorder: 'hover:border-[#0a66c2]',
    textHover: 'hover:text-[#0a66c2]',
    icon: LinkedInIcon,
    subtext: 'Policy Updates & B2B Research',
  },
  {
    id: 'x',
    name: 'X (Twitter)',
    handle: '@GladSenseEdu',
    label: 'Follow on X',
    url: 'https://x.com/GladSenseEdu',
    color: '#000000',
    hoverBg: 'hover:bg-black',
    hoverBorder: 'hover:border-black',
    textHover: 'hover:text-black',
    icon: XIcon,
    subtext: 'Daily Search & Policy Updates',
  },
  {
    id: 'youtube',
    name: 'YouTube',
    handle: '@GladSenseEducation',
    label: 'Watch on YouTube',
    url: 'https://www.youtube.com/@GladSenseEducation',
    color: '#ff0000',
    hoverBg: 'hover:bg-[#ff0000]',
    hoverBorder: 'hover:border-[#ff0000]',
    textHover: 'hover:text-[#ff0000]',
    icon: YouTubeIcon,
    subtext: 'Video Walkthroughs & Website Fixes',
  },
];

/**
 * Multi-layout component providing interactive official social channels for GladSense
 */
export const GladSenseSocialLinks: React.FC<GladSenseSocialLinksProps> = ({
  variant = 'pill',
  size = 'md',
  showLabels = true,
  className = '',
}) => {
  const iconSizeClasses =
    size === 'sm' ? 'w-3.5 h-3.5' : size === 'lg' ? 'w-5 h-5' : 'w-4 h-4';

  const containerPaddingClasses =
    size === 'sm' ? 'py-1.5 px-2.5' : size === 'lg' ? 'py-2.5 px-3.5' : 'py-2 px-3';

  // Cards layout: Perfectly proportional and matched with modal channel grids
  if (variant === 'cards') {
    return (
      <div className={`grid grid-cols-1 sm:grid-cols-3 gap-2.5 ${className}`}>
        {GLADSENSE_OFFICIAL_SOCIALS.map((soc) => {
          const Icon = soc.icon;
          return (
            <a
              key={soc.id}
              href={soc.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-2xl border border-slate-200 bg-white hover:border-slate-300 hover:shadow-xs transition-all group flex items-center gap-2.5 h-full cursor-pointer"
            >
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-white shadow-2xs group-hover:scale-105 transition-transform"
                style={{ backgroundColor: soc.color }}
              >
                <Icon className={iconSizeClasses} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5 justify-between">
                  <span className="text-xs font-bold text-slate-800 group-hover:text-blue-600 transition-colors truncate">
                    {soc.name}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono shrink-0">
                    {soc.handle}
                  </span>
                </div>
                <p className="text-[10px] text-slate-500 leading-tight truncate mt-0.5">
                  {soc.subtext}
                </p>
              </div>
            </a>
          );
        })}
      </div>
    );
  }

  // Minimal layout: Clean header icons with balanced hitboxes and brand hover
  if (variant === 'minimal') {
    return (
      <div className={`flex items-center gap-1 ${className}`}>
        {GLADSENSE_OFFICIAL_SOCIALS.map((soc) => {
          const Icon = soc.icon;
          return (
            <a
              key={soc.id}
              href={soc.url}
              target="_blank"
              rel="noopener noreferrer"
              title={soc.label}
              aria-label={soc.label}
              className={`text-slate-500 ${soc.textHover} transition-colors p-1.5 rounded-lg hover:bg-slate-100 cursor-pointer flex items-center justify-center`}
            >
              <Icon className={iconSizeClasses} />
            </a>
          );
        })}
      </div>
    );
  }

  // Default 'pill' variant: Interactive pill buttons with branded hover & flexible alignment
  return (
    <div className={`flex items-center gap-2 flex-wrap ${className}`}>
      {GLADSENSE_OFFICIAL_SOCIALS.map((soc) => {
        const Icon = soc.icon;
        return (
          <a
            key={soc.id}
            href={soc.url}
            target="_blank"
            rel="noopener noreferrer"
            title={soc.label}
            className={`inline-flex items-center gap-1.5 ${containerPaddingClasses} rounded-xl border border-slate-200 bg-white text-slate-700 hover:text-white ${soc.hoverBg} ${soc.hoverBorder} transition-all shadow-2xs hover:shadow-xs group cursor-pointer text-xs font-semibold`}
          >
            <Icon className={`${iconSizeClasses} transition-transform group-hover:scale-110`} />
            {showLabels && <span className="leading-none">{soc.name}</span>}
          </a>
        );
      })}
    </div>
  );
};
