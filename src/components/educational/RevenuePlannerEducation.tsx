import React from 'react';
import { DollarSign, BarChart3, Globe2, Layers, ShieldCheck, Zap } from 'lucide-react';

export const RevenuePlannerEducation: React.FC = () => {
  return (
    <article
      aria-label="Comprehensive Educational Guide: Google AdSense Revenue Mechanics, Page RPM vs eCPM, and Active View Refresh"
      className="my-10 p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-8 text-slate-700 leading-relaxed"
    >
      {/* Title Header */}
      <div className="border-b border-slate-100 pb-5 space-y-2">
        <div className="flex items-center gap-2 text-emerald-700 text-xs font-bold uppercase tracking-wider">
          <DollarSign className="w-4 h-4 text-emerald-600" />
          <span>Financial Architecture • Google AdSense Revenue Mechanics</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-['Google_Sans',sans-serif] tracking-tight">
          Understanding AdSense Unit Economics: Page RPM vs. eCPM, Geographic Multipliers & Active View Physics
        </h2>
        <p className="text-sm text-slate-500 max-w-3xl">
          A definitive mathematical derivation explaining how Google AdSense monetizes publisher traffic, why single-purpose interactive tools command 4x higher yields, and how to avoid ad density penalties.
        </p>
      </div>

      {/* Chapter 1: The Core Formula: eCPM vs. Page RPM */}
      <section className="space-y-4">
        <h3 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-[#1a73e8]" />
          <span>1. The Mathematical Derivation: eCPM vs. Page RPM</span>
        </h3>
        <p className="text-sm">
          Many digital publishers conflate <strong>eCPM (effective Cost Per Mille)</strong> with <strong>Page RPM (Revenue Per Mille)</strong>, leading to distorted financial projections. Understanding the difference is crucial for sustainable webmaster unit economics:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Formula: Effective Cost Per Mille (eCPM)
            </h4>
            <div className="p-3 bg-white rounded-xl border border-slate-200 font-mono text-xs text-blue-700">
              eCPM = (Total Ad Unit Earnings &divide; Total Ad Impressions) &times; 1,000
            </div>
            <p className="text-xs text-slate-600">
              Measures the earnings performance of an individual ad container slot. If a single desktop leaderboard generates $4.50 across 1,000 impressions, its eCPM is $4.50.
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Formula: Page Revenue Per Mille (Page RPM)
            </h4>
            <div className="p-3 bg-white rounded-xl border border-slate-200 font-mono text-xs text-emerald-700">
              Page RPM = (Total Cumulative Earnings &divide; Total Pageviews) &times; 1,000
            </div>
            <p className="text-xs text-slate-600">
              Measures the total value of the entire webpage experience across all ad slots. If a page displays 3 ad units and generates $24.00 for every 1,000 visitors, the Page RPM is $24.00.
            </p>
          </div>
        </div>
      </section>

      {/* Chapter 2: Active View Refresh Physics (>70%) */}
      <section className="space-y-4 border-t border-slate-100 pt-6">
        <h3 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
          <Zap className="w-5 h-5 text-amber-500" />
          <span>2. The Impact of Active View Viewability & Algorithmic Ad Refresh (&gt;70%)</span>
        </h3>
        <p className="text-sm">
          Under the <strong>Media Rating Council (MRC)</strong> and Google AdSense standard, an ad impression is officially recorded as &quot;Viewable&quot; when at least <strong>50% of the banner&apos;s pixels remain continuously visible in the active viewport for at least 1 uninterrupted second</strong>.
        </p>
        <p className="text-sm">
          When a web app achieves an <strong>Active View Viewability rating above 70%</strong>, two transformative revenue events happen:
        </p>
        <ul className="list-disc list-inside space-y-2 text-sm text-slate-700 pl-2">
          <li>
            <strong>Premium Real-Time Bidding (RTB):</strong> Programmatic brand advertisers in Google Display Network bid up to 300% higher CPMs on placements with proven &gt;70% viewability histories.
          </li>
          <li>
            <strong>Compliant Time-Based Ad Refresh:</strong> Web applications with long dwell times (e.g., users calculating HVAC CFM or mixing epoxy resin for 2–4 minutes) can safely trigger subsequent ad impressions every 30–45 seconds, multiplying revenue per visitor without increasing pageview friction.
          </li>
        </ul>
      </section>

      {/* Chapter 3: Geographic Multipliers (Tier 1 vs. Tier 3) */}
      <section className="space-y-4 border-t border-slate-100 pt-6">
        <h3 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
          <Globe2 className="w-5 h-5 text-indigo-600" />
          <span>3. Geographic Valuation Multipliers: Tier 1 vs. Tier 3 Traffic Economics</span>
        </h3>
        <p className="text-sm">
          A single visitor from a Tier-1 country is commercially worth between <strong>5x to 20x</strong> more than a visitor from a Tier-3 economy due to advertiser purchasing power and local e-commerce spending:
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border border-slate-200 rounded-xl overflow-hidden">
            <thead className="bg-slate-100 font-bold text-slate-800">
              <tr>
                <th className="p-3">Traffic Tier</th>
                <th className="p-3">Primary Geographic Markets (ISO 3166)</th>
                <th className="p-3">Average Page RPM Range</th>
                <th className="p-3">Pageviews Needed for $1,000/Mo</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              <tr className="bg-white">
                <td className="p-3 font-semibold text-emerald-700">Tier 1 (Premium)</td>
                <td className="p-3">United States (US), United Kingdom (GB), Canada (CA), Australia (AU)</td>
                <td className="p-3 font-mono font-bold">$18.00 – $65.00</td>
                <td className="p-3 font-mono">15,000 – 55,000</td>
              </tr>
              <tr className="bg-slate-50/50">
                <td className="p-3 font-semibold text-blue-700">Tier 2 (Moderate)</td>
                <td className="p-3">Germany (DE), France (FR), Spain (ES), Japan (JP), Brazil (BR)</td>
                <td className="p-3 font-mono font-bold">$6.00 – $16.00</td>
                <td className="p-3 font-mono">62,000 – 165,000</td>
              </tr>
              <tr className="bg-white">
                <td className="p-3 font-semibold text-slate-600">Tier 3 (Emerging)</td>
                <td className="p-3">India (IN), Philippines (PH), Nigeria (NG), Pakistan (PK)</td>
                <td className="p-3 font-mono font-bold">$1.20 – $4.50</td>
                <td className="p-3 font-mono">220,000 – 830,000</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Chapter 4: Ad Density Guidelines */}
      <section className="space-y-4 border-t border-slate-100 pt-6">
        <h3 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
          <Layers className="w-5 h-5 text-rose-600" />
          <span>4. Better Ads Standards: The Strict 30% Mobile Screen Density Rule</span>
        </h3>
        <p className="text-sm">
          Under the <strong>Coalition for Better Ads (enforced natively by Google Chrome)</strong>, advertisements must never occupy more than <strong>30% of the vertical screen height</strong> on mobile devices. Violating this threshold by stacking ads above the fold triggers Google automated ad filtering, permanently suppressing monetization until corrected.
        </p>
        <p className="text-sm">
          <strong>Recommended Layout:</strong> 1 top responsive header unit, 1 in-content banner below calculation results, and 1 non-intrusive mobile bottom anchor with an explicit user dismiss button.
        </p>
      </section>
    </article>
  );
};
