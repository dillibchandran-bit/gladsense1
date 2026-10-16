import React from 'react';
import { Scale } from 'lucide-react';

export interface OfficialEvaluationDisclaimerProps {
  compact?: boolean;
  dark?: boolean;
  className?: string;
  sourceLabel?: string;
}

export const OfficialEvaluationDisclaimer: React.FC<OfficialEvaluationDisclaimerProps> = ({
  compact = false,
  dark = false,
  className = '',
  sourceLabel,
}) => {
  if (compact) {
    return (
      <aside
        aria-label="Official Evaluation Notice and AdSense Policy Disclaimer"
        className={`p-3 rounded-xl text-[11px] leading-relaxed flex items-start gap-2.5 transition-all ${
          dark
            ? 'bg-slate-900/95 border border-slate-700/80 text-slate-300'
            : 'bg-amber-50/70 border border-amber-200/80 text-slate-700'
        } ${className}`}
      >
        <Scale
          className={`w-4 h-4 shrink-0 mt-0.5 ${dark ? 'text-blue-400' : 'text-amber-600'}`}
        />
        <div className="space-y-0.5 min-w-0 flex-1">
          <p>
            <strong className={dark ? 'text-slate-100 font-semibold' : 'text-amber-950 font-bold'}>
              AdSense Probability Notice:
            </strong>{' '}
            We are sharing statistical probability benchmarks and algorithmic readiness estimates for educational guidance only. All final approval, monetization, and compliance decisions are thoroughly and solely determined by Google AdSense and its official policies.
          </p>
          {sourceLabel && (
            <span className={`block font-mono text-[10px] ${dark ? 'text-slate-400' : 'text-slate-500'}`}>
              • Scope: {sourceLabel}
            </span>
          )}
        </div>
      </aside>
    );
  }

  return (
    <aside
      aria-label="Official Evaluation Notice and AdSense Policy Disclaimer"
      className={`p-4 sm:p-5 rounded-2xl text-xs leading-relaxed shadow-xs border ${
        dark
          ? 'bg-slate-950/90 border-slate-800 text-slate-300'
          : 'bg-gradient-to-br from-amber-50/40 via-white to-blue-50/30 border-amber-200/70 text-slate-700'
      } ${className}`}
    >
      <div className="flex items-start gap-3">
        <div
          className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
            dark ? 'bg-slate-800 text-blue-400 border border-slate-700' : 'bg-amber-100/80 text-amber-800 border border-amber-200'
          }`}
        >
          <Scale className="w-4 h-4" />
        </div>
        <div className="space-y-1.5 min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className={`font-bold uppercase tracking-wider text-[10px] px-2.5 py-0.5 rounded-full ${
                dark ? 'bg-slate-800 text-amber-300 border border-amber-500/30' : 'bg-amber-100 text-amber-900 border border-amber-300/80'
              }`}
            >
              Official Policy &amp; Probability Notice
            </span>
            <span className={`text-[11px] font-medium ${dark ? 'text-slate-400' : 'text-slate-500'}`}>
              • Google Search Quality &amp; AdSense Compliance Evaluation
            </span>
          </div>
          <p className={dark ? 'text-slate-300 text-xs leading-relaxed' : 'text-slate-700 text-xs leading-relaxed font-normal'}>
            <strong>Important Notice:</strong> We are sharing statistical probability benchmarks and readiness estimates for educational guidance only. All final site review, approval, account status, and monetizability decisions are thoroughly and solely determined by Google AdSense and its official program policies.
          </p>
          {sourceLabel && (
            <p className={`text-[10px] font-mono pt-0.5 flex items-center gap-1 ${dark ? 'text-slate-400' : 'text-slate-500'}`}>
              <span className="font-semibold text-slate-400">Target Evaluated:</span> {sourceLabel}
            </p>
          )}
        </div>
      </div>
    </aside>
  );
};
