import React from 'react';
import { NavTabType } from './Navbar';
import { ShieldCheck, Layers, DollarSign, Scale, BookOpen, Sparkles } from 'lucide-react';

interface MobileDiscoveryBarProps {
  activeTab: NavTabType;
  setActiveTab: (tab: NavTabType) => void;
}

export const MobileDiscoveryBar: React.FC<MobileDiscoveryBarProps> = ({
  activeTab,
  setActiveTab,
}) => {
  const items: {
    id: NavTabType;
    label: string;
    icon: React.ElementType;
    badge: string;
    color: string;
  }[] = [
    {
      id: 'site-doctor',
      label: 'Doctor',
      icon: ShieldCheck,
      badge: '100-Pt',
      color: 'text-purple-600',
    },
    {
      id: 'niche-lab',
      label: 'KGR Lab',
      icon: Layers,
      badge: '<0.25',
      color: 'text-blue-600',
    },
    {
      id: 'revenue-planner',
      label: 'RPM Yield',
      icon: DollarSign,
      badge: '$18-$65',
      color: 'text-emerald-600',
    },
    {
      id: 'policy-toolkit',
      label: '1-Click SOP',
      icon: Scale,
      badge: 'v2.0',
      color: 'text-indigo-600',
    },
    {
      id: 'blog',
      label: 'Guides',
      icon: BookOpen,
      badge: '27 Posts',
      color: 'text-amber-600',
    },
  ];

  const isTabActive = (itemId: NavTabType) => {
    if (activeTab === itemId) return true;
    if (itemId === 'niche-lab' && (activeTab === 'niches' || activeTab === 'ai-evaluator' || activeTab === 'kgr')) return true;
    if (itemId === 'revenue-planner' && (activeTab === 'calculator' || activeTab === 'budget')) return true;
    if (itemId === 'policy-toolkit' && (activeTab === 'audit' || activeTab === 'single-click')) return true;
    return false;
  };

  return (
    <nav
      aria-label="Mobile Quick Discovery"
      className="lg:hidden sticky top-14 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 px-3 py-2 overflow-x-auto no-scrollbar shadow-2xs"
    >
      <div className="flex items-center gap-2 min-w-max">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = isTabActive(item.id);
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                setActiveTab(item.id);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap border shrink-0 ${
                isActive
                  ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : item.color}`} />
              <span>{item.label}</span>
              <span
                className={`text-[9px] font-extrabold px-1.5 py-0.2 rounded-full ${
                  isActive
                    ? 'bg-white/20 text-white'
                    : 'bg-slate-200 text-slate-800'
                }`}
              >
                {item.badge}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
