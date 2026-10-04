import React from 'react';
import { NavTabType } from './Navbar';
import { ShieldCheck, Layers, DollarSign, Scale, BookOpen } from 'lucide-react';

interface MobileBottomNavProps {
  activeTab: NavTabType;
  setActiveTab: (tab: NavTabType) => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  activeTab,
  setActiveTab,
}) => {
  const navTabs: {
    id: NavTabType;
    label: string;
    icon: React.ElementType;
  }[] = [
    { id: 'site-doctor', label: 'Doctor', icon: ShieldCheck },
    { id: 'niche-lab', label: 'KGR Lab', icon: Layers },
    { id: 'revenue-planner', label: 'Planner', icon: DollarSign },
    { id: 'policy-toolkit', label: 'SOP Suite', icon: Scale },
    { id: 'blog', label: 'Guides', icon: BookOpen },
  ];

  const isTabActive = (itemId: NavTabType) => {
    if (activeTab === itemId) return true;
    if (itemId === 'niche-lab' && (activeTab === 'niches' || activeTab === 'ai-evaluator' || activeTab === 'kgr')) return true;
    if (itemId === 'revenue-planner' && (activeTab === 'calculator' || activeTab === 'budget')) return true;
    if (itemId === 'policy-toolkit' && (activeTab === 'audit' || activeTab === 'single-click')) return true;
    return false;
  };

  return (
    <div
      role="navigation"
      aria-label="Mobile Bottom Navigation"
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-2xl px-2 py-1 flex items-center justify-around"
      style={{ paddingBottom: 'max(0.25rem, env(safe-area-inset-bottom))' }}
    >
      {navTabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = isTabActive(tab.id);

        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => {
              setActiveTab(tab.id);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`flex flex-col items-center justify-center min-w-[56px] min-h-[48px] py-1 px-1 rounded-xl transition-all cursor-pointer ${
              isActive
                ? 'text-[#1a73e8]'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <div
              className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all ${
                isActive
                  ? 'bg-blue-50 text-[#1a73e8]'
                  : 'bg-transparent text-slate-500'
              }`}
            >
              <Icon className="w-4 h-4" />
            </div>
            <span
              className={`text-[10px] mt-0.5 font-medium leading-none ${
                isActive ? 'font-bold text-[#1a73e8]' : 'text-slate-600'
              }`}
            >
              {tab.label}
            </span>
          </button>
        );
      })}
    </div>
  );
};
