import React, { useState } from 'react';
import { X, ExternalLink, Zap, Server, ShieldCheck, DollarSign } from 'lucide-react';

interface AdBannerProps {
  format: 'in-content-728' | 'skyscraper-300' | 'mobile-anchor-320';
  className?: string;
}

export const AdSlotPlaceholder: React.FC<AdBannerProps> = ({ format, className = '' }) => {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  if (format === 'mobile-anchor-320') {
    return (
      <aside
        aria-label="Mobile Advertisement Banner"
        className="lg:hidden fixed bottom-14 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-xl px-2 py-1 flex items-center justify-between"
      >
        <div className="flex-1 flex items-center justify-center gap-2">
          <span className="text-[9px] font-bold uppercase text-slate-400 border border-slate-200 px-1 rounded">
            Ad
          </span>
          <div className="w-[320px] h-[50px] bg-slate-50 border border-dashed border-slate-300 rounded flex items-center justify-center text-center px-2">
            <span className="text-[11px] font-medium text-slate-500">
              Responsive Webmaster Sponsor • High-RPM Ad Slot (320x50)
            </span>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setDismissed(true)}
          className="p-1 text-slate-400 hover:text-slate-600 rounded-md"
          aria-label="Close advertisement"
        >
          <X className="w-4 h-4" />
        </button>
      </aside>
    );
  }

  if (format === 'skyscraper-300') {
    return (
      <aside
        aria-label="Desktop Skyscraper Advertisement"
        className={`hidden xl:flex flex-col items-center justify-start w-[300px] shrink-0 ${className}`}
      >
        <div className="sticky top-20 w-[300px] min-h-[600px] rounded-2xl bg-gradient-to-b from-slate-50 to-white border border-slate-200 p-4 shadow-sm flex flex-col justify-between text-center">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Advertisement
              </span>
              <span className="text-[10px] text-emerald-600 font-semibold bg-emerald-50 px-1.5 py-0.5 rounded">
                Active View &gt;70%
              </span>
            </div>

            <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-100 text-left space-y-2">
              <div className="flex items-center gap-1.5 text-blue-700 font-bold text-xs">
                <Server className="w-4 h-4 text-[#1a73e8]" />
                <span>Hosting Recommendation</span>
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Host your high-RPM utility calculators on NVMe Cloud Hosting (Hostinger / Cloudways) with sub-100ms TTFB for guaranteed Core Web Vitals.
              </p>
              <a
                href="https://www.hostinger.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#1a73e8] hover:underline pt-1"
              >
                <span>Deploy on Cloud ($2.99/mo)</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <div className="p-4 rounded-xl bg-purple-50/60 border border-purple-100 text-left space-y-2">
              <div className="flex items-center gap-1.5 text-purple-700 font-bold text-xs">
                <DollarSign className="w-4 h-4 text-purple-600" />
                <span>Interim Monetization</span>
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Need monetization while optimizing for AdSense approval? Compare instant approval networks on Ezoic or Monetag.
              </p>
              <a
                href="https://www.ezoic.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[11px] font-semibold text-purple-700 hover:underline pt-1"
              >
                <span>Explore Ad Network Alternatives</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-3 text-[10px] text-slate-400">
            AdSense Skyscraper Slot (300x600) • Verified Non-Intrusive Layout
          </div>
        </div>
      </aside>
    );
  }

  // in-content-728 format
  return (
    <aside
      aria-label="In-Content Advertisement"
      className={`my-6 w-full rounded-2xl bg-slate-50 border border-slate-200 p-4 text-center shadow-2xs ${className}`}
    >
      <div className="flex items-center justify-between border-b border-slate-200/80 pb-2 mb-3">
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
          Sponsored Webmaster Resources
        </span>
        <span className="text-[10px] text-slate-400">IAB Standard (728x90 Banner Slot)</span>
      </div>
      <div className="min-h-[90px] rounded-xl bg-white border border-dashed border-slate-300 flex flex-col sm:flex-row items-center justify-between p-4 gap-3 text-left">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-800">
              ⚡ Accelerated NVMe Web Hosting & Zero-Cost Cloud Edge
            </span>
            <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              Core Web Vitals Optimized
            </span>
          </div>
          <p className="text-xs text-slate-600 max-w-2xl leading-relaxed">
            Eliminate TTFB bottlenecks, prevent crawl timeouts, and keep Largest Contentful Paint under 1.8 seconds with LiteSpeed and Cloudflare Enterprise Edge.
          </p>
        </div>
        <a
          href="https://www.hostinger.com"
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 px-4 py-2 rounded-xl bg-[#1a73e8] hover:bg-[#1557b0] text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-xs"
        >
          <span>Explore LiteSpeed Hosting</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </aside>
  );
};

export const ContextualAffiliateCard: React.FC<{
  type: 'hosting' | 'monetization';
  className?: string;
}> = ({ type, className = '' }) => {
  if (type === 'hosting') {
    return (
      <div
        className={`p-4 rounded-2xl bg-amber-50/80 border border-amber-200/90 text-xs text-amber-900 shadow-2xs space-y-2 ${className}`}
      >
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-amber-600 shrink-0" />
          <h4 className="font-bold text-amber-950 text-xs uppercase tracking-wide">
            Server Bottleneck Detected (TTFB &gt; 800ms)
          </h4>
        </div>
        <p className="text-amber-800 leading-relaxed">
          Googlebot and AdSense media crawlers flag slow servers. Consider migrating your application to LiteSpeed / NVMe Cloud Hosting (Hostinger / Cloudways) to cut TTFB below 200ms and pass Core Web Vitals thresholds.
        </p>
        <a
          href="https://www.hostinger.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 font-bold text-amber-900 hover:text-amber-700 underline"
        >
          <span>Inspect LiteSpeed NVMe Hosting Plans</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    );
  }

  return (
    <div
      className={`p-4 rounded-2xl bg-blue-50/80 border border-blue-200/90 text-xs text-blue-900 shadow-2xs space-y-2 ${className}`}
    >
      <div className="flex items-center gap-2">
        <DollarSign className="w-4 h-4 text-blue-600 shrink-0" />
        <h4 className="font-bold text-blue-950 text-xs uppercase tracking-wide">
          Interim Monetization While Resolving AdSense Review
        </h4>
      </div>
      <p className="text-blue-800 leading-relaxed">
        If your domain is under 60 days old or pending content inventory remediation, deploy interim publisher monetization with instant-approval partners such as Ezoic or Monetag to start monetizing traffic immediately.
      </p>
      <a
        href="https://www.ezoic.com"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 font-bold text-blue-900 hover:text-blue-700 underline"
      >
        <span>Compare Publisher Approval Guidelines</span>
        <ExternalLink className="w-3 h-3" />
      </a>
    </div>
  );
};
