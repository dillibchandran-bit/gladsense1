import React from 'react';
import { ShieldAlert } from 'lucide-react';

interface TrademarkDisclaimerProps {
  compact?: boolean;
  className?: string;
}

export const TrademarkDisclaimer: React.FC<TrademarkDisclaimerProps> = ({
  compact = false,
  className = '',
}) => {
  if (compact) {
    return (
      <div
        className={`p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-500 leading-relaxed flex items-start gap-2 ${className}`}
      >
        <ShieldAlert className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
        <p>
          <strong className="text-slate-700 font-semibold">Trademark Sentinel:</strong> GladSense is an independent educational diagnostic tool and is not affiliated, associated, authorized, endorsed by, or in any way officially connected with Google LLC, Alphabet Inc., or Google AdSense. &quot;Google&quot; and &quot;Google AdSense&quot; are registered trademarks of Google LLC.
        </p>
      </div>
    );
  }

  return (
    <aside
      aria-label="Google Trademark Notice and Educational Disclosure"
      className={`my-4 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600 leading-relaxed shadow-2xs ${className}`}
    >
      <div className="flex items-start gap-2.5">
        <div className="w-7 h-7 rounded-lg bg-slate-200/80 text-slate-600 flex items-center justify-center shrink-0">
          <ShieldAlert className="w-4 h-4 text-slate-500" />
        </div>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-800 uppercase tracking-wider text-[10px] bg-slate-200 px-2 py-0.5 rounded">
              Legal Disclosure & Trademark Notice
            </span>
            <span className="text-slate-400 text-[11px]">• Strict Compliance Standard</span>
          </div>
          <p className="text-slate-600">
            GladSense is an independent educational diagnostic tool and is not affiliated, associated, authorized, endorsed by, or in any way officially connected with Google LLC, Alphabet Inc., or Google AdSense. &quot;Google&quot; and &quot;Google AdSense&quot; are registered trademarks of Google LLC. All audits, scorecards, and revenue modeling projections are generated for webmaster educational and pre-submission compliance optimization only.
          </p>
        </div>
      </div>
    </aside>
  );
};
