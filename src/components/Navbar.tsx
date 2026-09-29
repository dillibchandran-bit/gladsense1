import React, { useState } from 'react';
import { GoogleAdSenseLogo } from './GoogleAdSenseLogo';
import {
  Menu,
  X,
  ShieldCheck,
  Layers,
  DollarSign,
  Scale,
  BookOpen,
  ChevronRight,
  Sparkles,
} from 'lucide-react';

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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const readinessPercent = Math.round((auditPassedCount / totalAuditCount) * 100);

  const navItems: { id: NavTabType; label: string; icon: React.ElementType; badge?: string }[] = [
    { id: 'site-doctor', label: 'Site Auditor & Doctor', icon: ShieldCheck },
    { id: 'niche-lab', label: 'Niche & Keyword Lab', icon: Layers },
    { id: 'revenue-planner', label: 'Revenue & Profit Planner', icon: DollarSign },
    { id: 'policy-toolkit', label: 'Compliance & SOP Suite', icon: Scale, badge: 'SOP 2.0' },
    { id: 'blog', label: 'Knowledge Base (27)', icon: BookOpen, badge: '100% Quality' },
  ];

  const isTabActive = (itemId: NavTabType) => {
    if (activeTab === itemId) return true;
    if (itemId === 'niche-lab' && (activeTab === 'niches' || activeTab === 'ai-evaluator' || activeTab === 'kgr')) return true;
    if (itemId === 'revenue-planner' && (activeTab === 'calculator' || activeTab === 'budget')) return true;
    if (itemId === 'policy-toolkit' && (activeTab === 'audit' || activeTab === 'single-click')) return true;
    return false;
  };

  const handleNavClick = (tabId: NavTabType) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-[#e5e7eb] text-[#1f2937]">
      <div className="max-w-[1440px] mx-auto px-3 sm:px-6">
        <div className="flex items-center justify-between h-14 gap-2 lg:gap-4">
          {/* Left: Corporate Brand Logo */}
          <div
            className="cursor-pointer shrink-0 flex items-center pr-1 sm:pr-3"
            onClick={() => handleNavClick('site-doctor')}
          >
            <GoogleAdSenseLogo />
          </div>

          {/* Center: Desktop Navigation Tabs (Visible on lg+ screens) */}
          <nav className="hidden lg:flex items-center space-x-1 sm:space-x-2 h-14 py-0 flex-1 justify-center max-w-3xl">
            {navItems.map((item) => {
              const isActive = isTabActive(item.id);
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative h-14 px-3 xl:px-4 text-[13px] font-medium transition-all whitespace-nowrap flex items-center gap-1.5 shrink-0 cursor-pointer ${
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

          {/* Right Action Suite: Corporate Buttons & Mobile Toggle */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <button
              onClick={() => handleNavClick('policy-toolkit')}
              className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-emerald-700 bg-emerald-50 rounded-lg border border-emerald-200 transition-colors cursor-pointer"
            >
              <span>Score: {readinessPercent}%</span>
            </button>

            {/* Corporate Outline Sign In */}
            <button
              onClick={() => handleNavClick('site-doctor')}
              className="px-2.5 sm:px-3.5 py-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg border border-slate-300 transition-colors cursor-pointer whitespace-nowrap"
            >
              Sign in
            </button>

            {/* Corporate Solid Brand Button */}
            <button
              onClick={() => handleNavClick('policy-toolkit')}
              className="px-2.5 sm:px-3.5 py-1.5 text-xs font-semibold text-white bg-[#1a73e8] hover:bg-[#1557b0] rounded-lg transition-all shadow-xs cursor-pointer whitespace-nowrap"
            >
              Sign up
            </button>

            {/* Mobile Hamburger Menu Toggle Button (Visible on screens < lg) */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 sm:p-2 rounded-xl text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer flex items-center justify-center border border-slate-200 ml-1"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 text-slate-900 stroke-[2.2]" />
              ) : (
                <Menu className="w-5 h-5 text-slate-900 stroke-[2.2]" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Slide-Down Navigation Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white/98 backdrop-blur-xl px-4 py-4 space-y-3 shadow-xl animate-in slide-in-from-top-2 duration-200">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Navigation Menu
            </span>
            <div className="inline-flex items-center gap-1 px-2.5 py-0.5 text-[11px] font-bold text-emerald-700 bg-emerald-50 rounded-full border border-emerald-200">
              <Sparkles className="w-3 h-3 text-emerald-600" />
              <span>Readiness: {readinessPercent}%</span>
            </div>
          </div>

          <div className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = isTabActive(item.id);
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full p-3 rounded-xl text-xs font-medium transition-all flex items-center justify-between cursor-pointer ${
                    isActive
                      ? 'bg-blue-50 text-[#1a73e8] font-bold border border-blue-200'
                      : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        isActive
                          ? 'bg-[#1a73e8] text-white'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="text-left">
                      <div className="font-semibold text-[13px]">{item.label}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {item.badge && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100/70 text-[#1a73e8]">
                        {item.badge}
                      </span>
                    )}
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </div>
                </button>
              );
            })}
          </div>

          <div className="pt-2 border-t border-slate-100 grid grid-cols-2 gap-2">
            <button
              onClick={() => handleNavClick('site-doctor')}
              className="w-full py-2.5 text-xs font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-200 text-center cursor-pointer"
            >
              Sign in
            </button>
            <button
              onClick={() => handleNavClick('policy-toolkit')}
              className="w-full py-2.5 text-xs font-semibold text-white bg-[#1a73e8] hover:bg-[#1557b0] rounded-xl shadow-xs text-center cursor-pointer"
            >
              Sign up Free
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
