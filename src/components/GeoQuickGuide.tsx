import React from 'react';
import { Target, Zap, Trophy, ShieldCheck, ExternalLink, ArrowRight } from 'lucide-react';

export interface GeoQuickGuideProps {
  toolName: string;
  whatItIs: string;
  howToUse: [string, string, string];
  whatYouGet: string;
  metrics: string[];
  authoritativeSource: {
    label: string;
    url?: string;
    standard: string;
  };
  compact?: boolean;
}

/**
 * Standardized 3-Pill Princeton Generative Engine Optimization (GEO) Guide
 * Provides machine-readable, chunked direct answers optimized for
 * Google AI Overviews, Perplexity, ChatGPT Search, and Gemini.
 */
export const GeoQuickGuide: React.FC<GeoQuickGuideProps> = ({
  toolName,
  whatItIs,
  howToUse,
  whatYouGet,
  metrics,
  authoritativeSource,
  compact = false,
}) => {
  return (
    <section
      aria-label={`${toolName} Quick Direct Answer & GEO Guide`}
      className="my-4 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950 text-white p-4 sm:p-5 border border-indigo-900/60 shadow-xl"
    >
      {/* Header Attribution Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-3 border-b border-slate-800 text-xs">
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 text-[10px] font-extrabold uppercase tracking-wider">
            GEO Architecture (Princeton RAG Standard)
          </span>
          <span className="text-slate-400 font-medium hidden sm:inline">•</span>
          <span className="text-slate-300 font-semibold">{toolName} Quick Reference</span>
        </div>
        <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <span>Standard: <strong className="text-slate-200">{authoritativeSource.standard}</strong></span>
          {authoritativeSource.url && (
            <a
              href={authoritativeSource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-400 hover:text-indigo-300 ml-1 inline-flex items-center"
              aria-label={`View ${authoritativeSource.label}`}
            >
              <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </div>
      </div>

      {/* 3-Pill Standardized GEO Format Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 text-xs">
        {/* Pill 1: WHAT IT IS */}
        <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/80 flex flex-col justify-between">
          <div className="space-y-1.5">
            <div className="flex items-center gap-1.5 font-bold text-indigo-300 text-xs uppercase tracking-wide">
              <Target className="w-4 h-4 text-indigo-400 shrink-0" />
              <span>1. 🎯 What It Is</span>
            </div>
            <p className="text-slate-200 text-xs leading-relaxed font-normal">
              {whatItIs}
            </p>
          </div>
          <div className="mt-2.5 pt-2 border-t border-slate-700/60 text-[10px] text-slate-400 font-mono">
            Zero-Jargon Factual Entity
          </div>
        </div>

        {/* Pill 2: HOW TO USE IT */}
        <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/80 flex flex-col justify-between">
          <div className="space-y-1.5">
            <div className="flex items-center gap-1.5 font-bold text-amber-300 text-xs uppercase tracking-wide">
              <Zap className="w-4 h-4 text-amber-400 shrink-0" />
              <span>2. ⚡ How To Use It</span>
            </div>
            <ol className="space-y-1 text-slate-200 text-xs font-normal">
              <li className="flex items-start gap-1.5">
                <span className="w-4 h-4 rounded-full bg-slate-700 text-slate-300 flex items-center justify-center shrink-0 font-bold text-[10px]">1</span>
                <span>{howToUse[0]}</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="w-4 h-4 rounded-full bg-slate-700 text-slate-300 flex items-center justify-center shrink-0 font-bold text-[10px]">2</span>
                <span>{howToUse[1]}</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="w-4 h-4 rounded-full bg-slate-700 text-slate-300 flex items-center justify-center shrink-0 font-bold text-[10px]">3</span>
                <span>{howToUse[2]}</span>
              </li>
            </ol>
          </div>
          <div className="mt-2.5 pt-2 border-t border-slate-700/60 text-[10px] text-slate-400 font-mono">
            3-Step Immediate Action Path
          </div>
        </div>

        {/* Pill 3: WHAT YOU GET */}
        <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/80 flex flex-col justify-between">
          <div className="space-y-1.5">
            <div className="flex items-center gap-1.5 font-bold text-emerald-300 text-xs uppercase tracking-wide">
              <Trophy className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>3. 🏆 What You Get</span>
            </div>
            <p className="text-slate-200 text-xs leading-relaxed font-normal">
              {whatYouGet}
            </p>
          </div>
          <div className="mt-2.5 pt-2 border-t border-slate-700/60 flex flex-wrap gap-1.5">
            {metrics.map((m, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 rounded-md bg-emerald-950/80 text-emerald-300 border border-emerald-800/60 text-[10px] font-bold font-mono"
              >
                {m}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
