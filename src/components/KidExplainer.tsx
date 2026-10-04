import React, { useState } from 'react';
import { Target, Zap, Trophy, ShieldCheck, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';

export interface KidExplainerProps {
  what: string;
  why?: string;
  how: string;
  result: string;
  toolNumber?: number | string;
  title?: string;
  badge?: string;
  className?: string;
}

/**
 * Unified Princeton Generative Engine Optimization (GEO) 3-Pill Guide
 * Standardizes all educational quick guides into a single, cohesive, non-duplicative format:
 * 1. 🎯 WHAT IT IS
 * 2. ⚡ HOW TO USE IT
 * 3. 🏆 WHAT YOU GET
 */
export const KidExplainer: React.FC<KidExplainerProps> = ({
  what,
  why,
  how,
  result,
  toolNumber,
  title,
  badge = 'GEO QUICK GUIDE',
  className = '',
}) => {
  const [collapsed, setCollapsed] = useState<boolean>(false);

  return (
    <section
      aria-label={title ? `${title} Quick Guide` : 'Tool Quick Guide'}
      className={`rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 via-white to-blue-50/30 p-4 sm:p-5 shadow-xs text-xs text-slate-800 transition-all ${className}`}
    >
      {/* Header Attribution Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-3 border-b border-slate-200/80">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold tracking-wide uppercase bg-blue-100 text-blue-800 border border-blue-200">
            <Sparkles className="w-3 h-3 text-[#1a73e8]" />
            {badge}
          </span>
          {title && (
            <h3 className="font-['Google_Sans',sans-serif] font-bold text-slate-900 text-sm sm:text-base tracking-normal">
              {toolNumber ? `${toolNumber}. ` : ''}{title}
            </h3>
          )}
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden sm:inline-flex items-center gap-1 text-[11px] text-slate-500 font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Google Policy & E-E-A-T Verified</span>
          </div>
          <button
            type="button"
            onClick={() => setCollapsed(!collapsed)}
            className="text-[11px] text-slate-500 hover:text-slate-800 flex items-center gap-1 font-medium bg-white px-2 py-0.5 rounded-md border border-slate-200 cursor-pointer transition-colors"
          >
            <span>{collapsed ? 'Expand Guide' : 'Collapse'}</span>
            {collapsed ? <ChevronDown className="w-3 h-3" /> : <ChevronUp className="w-3 h-3" />}
          </button>
        </div>
      </div>

      {!collapsed && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 pt-1 animate-in fade-in duration-200">
          {/* Pill 1: WHAT IT IS */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-2 flex flex-col justify-between">
            <div className="space-y-1.5">
              <div className="flex items-center gap-1.5 text-blue-700 font-bold text-xs uppercase tracking-wide">
                <Target className="w-4 h-4 text-[#1a73e8] shrink-0" />
                <span>1. 🎯 What It Is</span>
              </div>
              <p className="text-slate-700 text-xs leading-relaxed">
                {what}
              </p>
              {why && (
                <p className="text-slate-500 text-[11px] leading-relaxed pt-1 border-t border-slate-100">
                  <strong className="text-slate-700 font-semibold">Why it matters:</strong> {why}
                </p>
              )}
            </div>
            <div className="pt-2 text-[10px] text-blue-700 font-bold uppercase tracking-wider flex items-center gap-1 border-t border-slate-100">
              <span>Factual Definition</span>
            </div>
          </div>

          {/* Pill 2: HOW TO USE IT */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-2 flex flex-col justify-between">
            <div className="space-y-1.5">
              <div className="flex items-center gap-1.5 text-amber-700 font-bold text-xs uppercase tracking-wide">
                <Zap className="w-4 h-4 text-amber-600 shrink-0" />
                <span>2. ⚡ How To Use It</span>
              </div>
              <p className="text-slate-700 text-xs leading-relaxed">
                {how}
              </p>
            </div>
            <div className="pt-2 text-[10px] text-amber-700 font-bold uppercase tracking-wider flex items-center gap-1 border-t border-slate-100">
              <span>Immediate Action Path</span>
            </div>
          </div>

          {/* Pill 3: WHAT YOU GET */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-2 flex flex-col justify-between">
            <div className="space-y-1.5">
              <div className="flex items-center gap-1.5 text-emerald-800 font-bold text-xs uppercase tracking-wide">
                <Trophy className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>3. 🏆 What You Get</span>
              </div>
              <p className="text-slate-700 text-xs leading-relaxed">
                {result}
              </p>
            </div>
            <div className="pt-2 text-[10px] text-emerald-800 font-bold uppercase tracking-wider flex items-center gap-1 border-t border-slate-100">
              <span>Measurable Outcome</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
