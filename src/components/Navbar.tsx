import React from 'react';
import { GoogleAdSenseLogo } from './GoogleAdSenseLogo';

export type NavTabType =
  | 'site-doctor'
  | 'niche-lab'
  | 'revenue-planner'
  | 'policy-toolkit'
  | 'blog'
  | 'single-click'
  | 'budget'
  | 'niches'
  | 'calculator'
  | 'kgr'
  | 'audit'
  | 'ai-evaluator';

interface NavbarProps {
  activeTab: NavTabType;
  setActiveTab: (tab: NavTabType) => void;
  auditPassedCount: number;
  totalAuditCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  auditPassedCount,
  totalAuditCount,
}) => {
  const readinessPercent = Math.round((auditPassedCount / totalAuditCount) * 100);

  const navItems: { id: NavTabType; label: string; badge?: string }[] = [
    { id: 'site-doctor', label: 'Home' },
    { id: 'niche-lab', label: 'Niche & Keyword Lab' },
    { id: 'revenue-planner', label: 'Revenue & Profit Planner' },
    { id: 'policy-toolkit', label: 'Compliance & SOP Suite', badge: 'SOP 2.0' },
    { id: 'blog', label: 'Knowledge Base (27)', badge: '100% Quality' },
  ];

  const isTabActive = (itemId: NavTabType) => {
    if (activeTab === itemId) return true;
    if (itemId === 'niche-lab' && (activeTab === 'niches' || activeTab === 'ai-evaluator' || activeTab === 'kgr')) return true;
    if (itemId === 'revenue-planner' && (activeTab === 'calculator' || activeTab === 'budget')) return true;
    if (itemId === 'policy-toolkit' && (activeTab === 'audit' || activeTab === 'single-click')) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#e5e7eb] text-[#1f2937]">
      <div className="max-w-[1440px] mx-auto px-3 sm:px-6">
        <div className="flex items-center justify-between h-14 gap-2 lg:gap-4">
          {/* Left: Corporate Brand Logo */}
          <div
            className="cursor-pointer shrink-0 flex items-center pr-1 sm:pr-3"
            onClick={() => setActiveTab('site-doctor')}
          >
            <GoogleAdSenseLogo />
          </div>

          {/* Center: Clean Corporate 4-Pillar Single-Line Navigation */}
          <nav className="flex items-center space-x-1 sm:space-x-2 overflow-x-auto scrollbar-none h-14 py-0 flex-1 justify-center max-w-3xl">
            {navItems.map((item) => {
              const isActive = isTabActive(item.id);
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`relative h-14 px-3 lg:px-4 text-[13px] font-medium transition-all whitespace-nowrap flex items-center gap-1.5 shrink-0 cursor-pointer ${
                    isActive
                      ? 'text-[#1a73e8] font-semibold'
                      : 'text-[#4b5563] hover:text-[#111827] hover:bg-slate-50'
                  }`}
                >
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="text-[9px] font-bold px-1.5 py-0.2 rounded-full bg-blue-50 text-[#1a73e8] border border-blue-100">
                      {item.badge}
                    </span>
                  )}
                  {/* Underline Tab Indicator */}
                  {isActive && (
                    <span className="absolute bottom-0 left-2 right-2 h-[2.5px] bg-[#1a73e8] rounded-t-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Suite: Corporate Buttons */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setActiveTab('policy-toolkit')}
              className="hidden lg:inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-emerald-700 bg-emerald-50 rounded-lg border border-emerald-200 transition-colors cursor-pointer"
            >
              <span>Score: {readinessPercent}%</span>
            </button>

            {/* Corporate Outline Sign In */}
            <button
              onClick={() => setActiveTab('site-doctor')}
              className="px-3.5 py-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg border border-slate-300 transition-colors cursor-pointer whitespace-nowrap"
            >
              Sign in
            </button>

            {/* Corporate Solid Brand Button */}
            <button
              onClick={() => {
                setActiveTab('policy-toolkit');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-3.5 py-1.5 text-xs font-semibold text-white bg-[#1a73e8] hover:bg-[#1557b0] rounded-lg transition-all shadow-xs cursor-pointer whitespace-nowrap"
            >
              Sign up
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
