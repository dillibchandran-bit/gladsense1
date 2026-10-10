import React, { useState } from 'react';
import { Calculator, ArrowRight, Info, CheckCircle2, TrendingUp, DollarSign, HelpCircle, Sparkles } from 'lucide-react';
import { KidExplainer } from './KidExplainer';

export const RpmCpmCalculator: React.FC = () => {
  // Mode 1: Derive Metrics from Traffic & Revenue
  // Mode 2: Project Revenue from RPM or CPM
  const [calculationMode, setCalculationMode] = useState<'derive' | 'project'>('derive');

  // Derive mode inputs
  const [pageviews, setPageviews] = useState<number>(50000);
  const [adImpressions, setAdImpressions] = useState<number>(125000);
  const [adClicks, setAdClicks] = useState<number>(1850);
  const [totalEarnings, setTotalEarnings] = useState<number>(925);

  // Project mode inputs
  const [projectTraffic, setProjectTraffic] = useState<number>(25000);
  const [projectRpm, setProjectRpm] = useState<number>(18.5);
  const [projectAdsPerPage, setProjectAdsPerPage] = useState<number>(2.5);

  // Derive mode formulas
  const pageRpm = pageviews > 0 ? (totalEarnings / pageviews) * 1000 : 0;
  const adCpm = adImpressions > 0 ? (totalEarnings / adImpressions) * 1000 : 0;
  const cpc = adClicks > 0 ? totalEarnings / adClicks : 0;
  const ctr = adImpressions > 0 ? (adClicks / adImpressions) * 100 : 0;
  const adsPerPage = pageviews > 0 ? adImpressions / pageviews : 0;

  // Project mode formulas
  const projectedPageviews = projectTraffic;
  const projectedEarnings = (projectedPageviews / 1000) * projectRpm;
  const projectedAnnualEarnings = projectedEarnings * 12;
  const projectedTotalImpressions = projectedPageviews * projectAdsPerPage;
  const projectedEffectiveCpm = projectedTotalImpressions > 0 ? (projectedEarnings / projectedTotalImpressions) * 1000 : 0;

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-white border border-[#dadce0] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 text-xs font-medium rounded-full bg-[#e8f0fe] text-[#1a73e8]">
              AdSense Formula Utility
            </span>
            <span className="text-xs text-[#5f6368] font-normal">• KD: 6 • Formula Tool</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#202124] tracking-tight font-['Google_Sans',sans-serif]">
            RPM vs CPM vs CPC Calculator: How to Calculate Publisher Ad Earnings
          </h1>
          <p className="text-xs sm:text-sm text-[#5f6368] mt-1 max-w-3xl leading-relaxed">
            Instantly convert between Page RPM, Ad CPM, CPC, and CTR. Understand the exact mathematical formulas Google AdSense uses to calculate publisher payouts.
          </p>
        </div>

        {/* Mode Toggle Button */}
        <div className="inline-flex p-1 bg-slate-100 rounded-xl border border-slate-200 shrink-0 self-start md:self-auto">
          <button
            onClick={() => setCalculationMode('derive')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              calculationMode === 'derive'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Calculate RPM &amp; CPM
          </button>
          <button
            onClick={() => setCalculationMode('project')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              calculationMode === 'project'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Project Earnings from RPM
          </button>
        </div>
      </div>

      <KidExplainer
        title="RPM vs CPM vs CPC: The 3 Numbers That Determine Your Paycheck"
        what="Page RPM is what YOU earn per 1,000 visitors. Ad CPM is what ADVERTISERS pay per 1,000 banners shown. CPC is what advertisers pay every time a user taps an ad."
        why="Most beginners confuse RPM and CPM. Because one page can show 2 or 3 ads, your Page RPM is usually 2x to 3x higher than your individual Ad CPM!"
        how="Input your site's traffic and earnings below. The calculator computes your Page RPM, Ad CPM, Cost-Per-Click (CPC), and Click-Through-Rate (CTR) in real time."
        result="Displays your true monetization efficiency and shows how to maximize earnings without crowding your layout with spammy ads."
      />

      {/* Main Interactive Grid */}
      {calculationMode === 'derive' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Inputs (7 cols) */}
          <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                Input Your Traffic &amp; AdSense Payout
              </h2>
              <button
                onClick={() => {
                  setPageviews(50000);
                  setAdImpressions(125000);
                  setAdClicks(1850);
                  setTotalEarnings(925);
                }}
                className="text-xs text-[#1a73e8] hover:underline font-semibold cursor-pointer"
              >
                Reset to Sample
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 block">
                  Total Pageviews
                </label>
                <input
                  type="number"
                  min="100"
                  step="1000"
                  value={pageviews}
                  onChange={(e) => setPageviews(Math.max(1, Number(e.target.value)))}
                  className="w-full p-2.5 text-xs sm:text-sm font-mono border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1a73e8]"
                />
                <span className="text-[10px] text-slate-500">Total individual page visits</span>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 block">
                  Total Ad Impressions
                </label>
                <input
                  type="number"
                  min="100"
                  step="1000"
                  value={adImpressions}
                  onChange={(e) => setAdImpressions(Math.max(1, Number(e.target.value)))}
                  className="w-full p-2.5 text-xs sm:text-sm font-mono border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1a73e8]"
                />
                <span className="text-[10px] text-slate-500">Total ad units served across all views</span>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 block">
                  Total Ad Clicks
                </label>
                <input
                  type="number"
                  min="0"
                  step="50"
                  value={adClicks}
                  onChange={(e) => setAdClicks(Math.max(0, Number(e.target.value)))}
                  className="w-full p-2.5 text-xs sm:text-sm font-mono border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1a73e8]"
                />
                <span className="text-[10px] text-slate-500">Recorded user clicks on ad slots</span>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 block">
                  Total AdSense Earnings ($)
                </label>
                <input
                  type="number"
                  min="1"
                  step="10"
                  value={totalEarnings}
                  onChange={(e) => setTotalEarnings(Math.max(0, Number(e.target.value)))}
                  className="w-full p-2.5 text-xs sm:text-sm font-mono border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1a73e8]"
                />
                <span className="text-[10px] text-slate-500">Gross revenue credited in dashboard</span>
              </div>
            </div>

            {/* Live Formula Walkthrough */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2 text-xs">
              <span className="font-bold text-slate-800 uppercase tracking-wider text-[10px] block">
                Direct Mathematical Proof:
              </span>
              <div className="font-mono text-[11px] text-slate-700 space-y-1">
                <div>Page RPM = (${totalEarnings.toFixed(2)} / {pageviews.toLocaleString()} views) &times; 1,000 = <strong className="text-emerald-700">${pageRpm.toFixed(2)}</strong></div>
                <div>Ad CPM = (${totalEarnings.toFixed(2)} / {adImpressions.toLocaleString()} imp) &times; 1,000 = <strong className="text-blue-700">${adCpm.toFixed(2)}</strong></div>
                <div>Avg CPC = ${totalEarnings.toFixed(2)} / {adClicks.toLocaleString()} clicks = <strong className="text-purple-700">${cpc.toFixed(2)}</strong></div>
              </div>
            </div>
          </div>

          {/* Right Column: Calculated Results (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-50 via-white to-blue-50 border border-slate-200 shadow-sm space-y-5">
              <div>
                <span className="text-xs uppercase tracking-wider text-slate-500 font-bold">
                  Effective Page RPM (Publisher Net)
                </span>
                <div className="text-3xl sm:text-4xl font-extrabold text-emerald-700 tracking-tight mt-1 font-mono">
                  ${pageRpm.toFixed(2)}
                </div>
                <p className="text-xs text-slate-600 mt-1">
                  You earn <strong>${pageRpm.toFixed(2)}</strong> for every 1,000 pageviews generated.
                </p>
              </div>

              <div className="space-y-3 pt-3 border-t border-slate-200 text-xs">
                <div className="flex justify-between items-center py-1">
                  <span className="text-slate-600">Ad Impression CPM</span>
                  <span className="text-blue-700 font-mono font-bold">${adCpm.toFixed(2)}</span>
                </div>

                <div className="flex justify-between items-center py-1">
                  <span className="text-slate-600">Average Cost Per Click (CPC)</span>
                  <span className="text-purple-700 font-mono font-bold">${cpc.toFixed(2)}</span>
                </div>

                <div className="flex justify-between items-center py-1">
                  <span className="text-slate-600">Click-Through Rate (CTR)</span>
                  <span className="text-slate-900 font-mono font-bold">{ctr.toFixed(2)}%</span>
                </div>

                <div className="flex justify-between items-center py-1">
                  <span className="text-slate-600">Ad Density Ratio</span>
                  <span className="text-slate-900 font-mono font-bold">{adsPerPage.toFixed(2)} ads / page</span>
                </div>
              </div>
            </div>

            {/* Educational Insight Card */}
            <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm text-xs text-slate-700 space-y-1.5">
              <span className="font-bold text-slate-900 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-500" />
                Why RPM is Greater Than CPM
              </span>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Notice that your Page RPM (${pageRpm.toFixed(2)}) is higher than your Ad CPM (${adCpm.toFixed(2)}). This is because each pageview serves <strong>{adsPerPage.toFixed(1)} ad units</strong>. Multiple ad impressions per session multiply your publisher RPM without requiring higher traffic.
              </p>
            </div>
          </div>
        </div>
      ) : (
        /* Project Mode: Project Earnings from Target RPM */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-5">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 pb-3 border-b border-slate-100">
              Project AdSense Payout from Expected RPM
            </h2>

            <div className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <div className="flex justify-between font-semibold">
                  <span className="text-slate-700">Monthly Pageviews</span>
                  <span className="text-emerald-700 font-mono font-bold">{projectTraffic.toLocaleString()} views</span>
                </div>
                <input
                  type="range"
                  min="1000"
                  max="200000"
                  step="1000"
                  value={projectTraffic}
                  onChange={(e) => setProjectTraffic(Number(e.target.value))}
                  className="w-full accent-emerald-600 cursor-pointer"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between font-semibold">
                  <span className="text-slate-700">Target Page RPM ($)</span>
                  <span className="text-emerald-700 font-mono font-bold">${projectRpm.toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min="4"
                  max="60"
                  step="0.5"
                  value={projectRpm}
                  onChange={(e) => setProjectRpm(Number(e.target.value))}
                  className="w-full accent-emerald-600 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>$4 (General Blog)</span>
                  <span>$18 (Education / Tools)</span>
                  <span>$45+ (Finance / Legal)</span>
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between font-semibold">
                  <span className="text-slate-700">Ad Slots per Page</span>
                  <span className="text-slate-900 font-mono font-bold">{projectAdsPerPage} ad units</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="5"
                  step="0.5"
                  value={projectAdsPerPage}
                  onChange={(e) => setProjectAdsPerPage(Number(e.target.value))}
                  className="w-full accent-[#1a73e8] cursor-pointer"
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 bg-gradient-to-br from-emerald-50 via-white to-purple-50 p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div>
              <span className="text-xs uppercase tracking-wider text-slate-500 font-bold">
                Projected Monthly Payout
              </span>
              <div className="text-3xl sm:text-4xl font-extrabold text-emerald-700 tracking-tight mt-1 font-mono">
                ${projectedEarnings.toFixed(2)}
              </div>
              <span className="text-xs text-slate-600">
                Annual Run-Rate: <strong className="text-slate-900 font-mono">${projectedAnnualEarnings.toFixed(2)}</strong>
              </span>
            </div>

            <div className="space-y-2.5 pt-3 border-t border-slate-200 text-xs">
              <div className="flex justify-between items-center py-1">
                <span className="text-slate-600">Total Monthly Ad Impressions</span>
                <span className="text-slate-900 font-mono font-bold">{projectedTotalImpressions.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-slate-600">Derived Ad Impression CPM</span>
                <span className="text-blue-700 font-mono font-bold">${projectedEffectiveCpm.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Comparison Reference Matrix: RPM vs CPM vs CPC */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
          AdSense Metric Reference Matrix: Definitions &amp; Formulas
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-700 border-b border-slate-200 font-semibold">
                <th className="py-2.5 px-3">Metric</th>
                <th className="py-2.5 px-3">Full Term</th>
                <th className="py-2.5 px-3">Official Formula</th>
                <th className="py-2.5 px-3">Who Uses It?</th>
                <th className="py-2.5 px-3">Healthy 2026 Benchmark</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-600">
              <tr>
                <td className="py-2.5 px-3 font-bold text-emerald-800">Page RPM</td>
                <td className="py-2.5 px-3 font-medium">Revenue Per Mille (Pageviews)</td>
                <td className="py-2.5 px-3 font-mono text-[11px]">(Earnings / Pageviews) &times; 1,000</td>
                <td className="py-2.5 px-3 font-semibold text-slate-800">Publishers (True Net Yield)</td>
                <td className="py-2.5 px-3 font-mono font-bold text-emerald-700">$14.00 – $38.00</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-bold text-blue-800">Ad CPM</td>
                <td className="py-2.5 px-3 font-medium">Cost Per Mille (Impressions)</td>
                <td className="py-2.5 px-3 font-mono text-[11px]">(Earnings / Impressions) &times; 1,000</td>
                <td className="py-2.5 px-3 font-semibold text-slate-800">Advertisers (Ad Auction Bid)</td>
                <td className="py-2.5 px-3 font-mono font-bold text-blue-700">$4.50 – $16.00</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-bold text-purple-800">CPC</td>
                <td className="py-2.5 px-3 font-medium">Cost Per Click</td>
                <td className="py-2.5 px-3 font-mono text-[11px]">Total Earnings / Ad Clicks</td>
                <td className="py-2.5 px-3 font-semibold text-slate-800">Advertisers &amp; Google Ads</td>
                <td className="py-2.5 px-3 font-mono font-bold text-purple-700">$0.45 – $4.20</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-bold text-slate-800">CTR</td>
                <td className="py-2.5 px-3 font-medium">Click-Through Rate</td>
                <td className="py-2.5 px-3 font-mono text-[11px]">(Clicks / Impressions) &times; 100</td>
                <td className="py-2.5 px-3 font-semibold text-slate-800">Ad Quality Classifier</td>
                <td className="py-2.5 px-3 font-mono font-bold text-slate-700">1.2% – 2.8%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
