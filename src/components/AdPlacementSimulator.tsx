import React, { useState } from 'react';
import {
  Smartphone,
  Monitor,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Copy,
  Check,
  Zap,
  Sliders,
  Info,
  Layers,
  ArrowRight,
  Maximize2,
  RefreshCw,
} from 'lucide-react';

interface AdUnitState {
  headerLeaderboard: boolean;
  topRectangle: boolean;
  inContentAd1: boolean;
  inContentAd2: boolean;
  sidebarSkyscraper: boolean;
  stickyBottomAnchor: boolean;
  proximityToNav: 'safe' | 'dangerous';
  reservedDivHeights: boolean;
}

export const AdPlacementSimulator: React.FC = () => {
  const [viewport, setViewport] = useState<'mobile' | 'desktop'>('mobile');
  const [adUnits, setAdUnits] = useState<AdUnitState>({
    headerLeaderboard: true,
    topRectangle: true,
    inContentAd1: true,
    inContentAd2: false,
    sidebarSkyscraper: true,
    stickyBottomAnchor: true,
    proximityToNav: 'safe',
    reservedDivHeights: true,
  });

  const [copiedCode, setCopiedCode] = useState<boolean>(false);

  // Compute live compliance analytics
  const activeAdCount =
    (adUnits.headerLeaderboard ? 1 : 0) +
    (adUnits.topRectangle ? 1 : 0) +
    (adUnits.inContentAd1 ? 1 : 0) +
    (adUnits.inContentAd2 ? 1 : 0) +
    (viewport === 'desktop' && adUnits.sidebarSkyscraper ? 1 : 0) +
    (adUnits.stickyBottomAnchor ? 1 : 0);

  // Calculate viewport ad density percentage above fold
  const aboveFoldAdHeight =
    (adUnits.headerLeaderboard ? (viewport === 'mobile' ? 50 : 90) : 0) +
    (adUnits.topRectangle ? 250 : 0);

  const foldHeight = viewport === 'mobile' ? 667 : 800;
  const aboveFoldAdRatio = Math.round((aboveFoldAdHeight / foldHeight) * 100);

  // Compliance triggers according to Google Valuable Inventory & Better Ads Standards
  const isAboveFoldTooDense = viewport === 'mobile' ? aboveFoldAdRatio > 35 : aboveFoldAdRatio > 45;
  const isPushingContentBelowFold = adUnits.headerLeaderboard && adUnits.topRectangle && viewport === 'mobile';
  const hasAccidentalClickRisk = adUnits.proximityToNav === 'dangerous';
  const hasClsRisk = !adUnits.reservedDivHeights;

  const totalViolations =
    (isAboveFoldTooDense ? 1 : 0) +
    (isPushingContentBelowFold ? 1 : 0) +
    (hasAccidentalClickRisk ? 1 : 0) +
    (hasClsRisk ? 1 : 0);

  const isSafe = totalViolations === 0;

  const handleApplyOptimalSafePreset = () => {
    setAdUnits({
      headerLeaderboard: true,
      topRectangle: false, // Turn off top 300x250 on mobile to avoid pushing content below fold!
      inContentAd1: true,
      inContentAd2: true,
      sidebarSkyscraper: true,
      stickyBottomAnchor: true,
      proximityToNav: 'safe',
      reservedDivHeights: true,
    });
  };

  const handleApplyViolatingPreset = () => {
    setAdUnits({
      headerLeaderboard: true,
      topRectangle: true,
      inContentAd1: true,
      inContentAd2: true,
      sidebarSkyscraper: true,
      stickyBottomAnchor: true,
      proximityToNav: 'dangerous',
      reservedDivHeights: false,
    });
  };

  const sampleZeroClsCss = `/* Zero-CLS Responsive Ad Container Pattern */
.ad-slot-header {
  min-height: 90px;
  background-color: #f8fafc;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 16px 0;
}

@media (max-width: 768px) {
  .ad-slot-header {
    min-height: 50px;
  }
}

/* In-Content Safe Spacing (Google Accidental Click Protection) */
.ad-slot-incontent {
  min-height: 250px;
  margin: 24px 0;
  clear: both;
}

/* Mobile Sticky Anchor with Safe Bottom Margin to Avoid Nav Overlap */
.ad-slot-sticky-anchor {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 50px;
  z-index: 40;
  background: white;
  box-shadow: 0 -2px 10px rgba(0,0,0,0.08);
}`;

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-slate-800">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-purple-500/30 text-purple-300 border border-purple-400/30 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
                Google AdSense Valuable Inventory &amp; Layout Policy Simulator
              </span>
              <span className="text-xs text-slate-400 hidden sm:inline">• Coalition for Better Ads 2026</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Real-Time Ad Placement &amp; Density Safety Simulator
            </h1>
            <p className="text-sm text-slate-300 leading-relaxed">
              Test your ad layout against Google&apos;s &quot;Valuable Inventory: No Content&quot;, accidental click, and ad density policies. Prevent publisher account bans before making a single ad request.
            </p>
          </div>

          {/* Quick Compliance Status Card */}
          <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/15 flex flex-col items-center justify-center min-w-[220px] text-center">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-300">
              Placement Safety Verdict
            </span>
            <div className={`text-2xl font-black my-1.5 flex items-center gap-2 ${isSafe ? 'text-emerald-400' : 'text-rose-400'}`}>
              {isSafe ? <CheckCircle2 className="w-6 h-6" /> : <AlertTriangle className="w-6 h-6" />}
              <span>{isSafe ? '100% SAFE' : `${totalViolations} VIOLATION${totalViolations > 1 ? 'S' : ''}`}</span>
            </div>
            <span className="text-[11px] text-slate-300">
              Above-Fold Ad Ratio: <strong className={isAboveFoldTooDense ? 'text-rose-400' : 'text-emerald-300'}>{aboveFoldAdRatio}%</strong> (Max 30%)
            </span>
          </div>
        </div>

        {/* Viewport & Preset Toggles */}
        <div className="mt-6 pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 bg-slate-800 p-1 rounded-xl border border-slate-700">
            <button
              type="button"
              onClick={() => setViewport('mobile')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                viewport === 'mobile' ? 'bg-[#1a73e8] text-white shadow-xs' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Mobile Viewport (375px)</span>
            </button>
            <button
              type="button"
              onClick={() => setViewport('desktop')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                viewport === 'desktop' ? 'bg-[#1a73e8] text-white shadow-xs' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
              <span>Desktop Viewport (1200px)</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleApplyOptimalSafePreset}
              className="px-3 py-1.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
            >
              <Zap className="w-3.5 h-3.5 text-amber-300" />
              <span>Apply Google-Approved Preset</span>
            </button>
            <button
              type="button"
              onClick={handleApplyViolatingPreset}
              className="px-3 py-1.5 rounded-xl text-xs font-bold bg-rose-900/60 hover:bg-rose-900 text-rose-200 border border-rose-700/60 transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Simulate Common Violations</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Interactive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column (5 cols): Placement Toggles & Policy Warnings */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Sliders className="w-4 h-4 text-purple-600" />
                <span>Ad Unit Configuration</span>
              </h3>
              <span className="text-xs font-semibold text-slate-500">
                {activeAdCount} Active Units
              </span>
            </div>

            {/* Toggle 1: Header Leaderboard */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200/80">
              <div>
                <span className="text-xs font-bold text-slate-900 block">Header Leaderboard</span>
                <span className="text-[11px] text-slate-500">
                  {viewport === 'mobile' ? '320x50 Mobile Banner' : '728x90 Leaderboard'}
                </span>
              </div>
              <input
                type="checkbox"
                checked={adUnits.headerLeaderboard}
                onChange={(e) => setAdUnits({ ...adUnits, headerLeaderboard: e.target.checked })}
                className="w-4 h-4 text-[#1a73e8] rounded cursor-pointer"
              />
            </div>

            {/* Toggle 2: Top Above-Fold Rectangle */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200/80">
              <div>
                <span className="text-xs font-bold text-slate-900 block">Above-The-Fold Rectangle</span>
                <span className="text-[11px] text-slate-500">300x250 Medium Rectangle (High Viewability)</span>
              </div>
              <input
                type="checkbox"
                checked={adUnits.topRectangle}
                onChange={(e) => setAdUnits({ ...adUnits, topRectangle: e.target.checked })}
                className="w-4 h-4 text-[#1a73e8] rounded cursor-pointer"
              />
            </div>

            {/* Toggle 3: In-Content Native Ad 1 */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200/80">
              <div>
                <span className="text-xs font-bold text-slate-900 block">In-Content Native Ad #1</span>
                <span className="text-[11px] text-slate-500">Placed after paragraph 2</span>
              </div>
              <input
                type="checkbox"
                checked={adUnits.inContentAd1}
                onChange={(e) => setAdUnits({ ...adUnits, inContentAd1: e.target.checked })}
                className="w-4 h-4 text-[#1a73e8] rounded cursor-pointer"
              />
            </div>

            {/* Toggle 4: In-Content Native Ad 2 */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200/80">
              <div>
                <span className="text-xs font-bold text-slate-900 block">In-Content Native Ad #2</span>
                <span className="text-[11px] text-slate-500">Placed after paragraph 5</span>
              </div>
              <input
                type="checkbox"
                checked={adUnits.inContentAd2}
                onChange={(e) => setAdUnits({ ...adUnits, inContentAd2: e.target.checked })}
                className="w-4 h-4 text-[#1a73e8] rounded cursor-pointer"
              />
            </div>

            {/* Toggle 5: Sidebar Skyscraper (Desktop Only) */}
            {viewport === 'desktop' && (
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                <div>
                  <span className="text-xs font-bold text-slate-900 block">Sidebar Skyscraper</span>
                  <span className="text-[11px] text-slate-500">300x600 Half-Page Unit</span>
                </div>
                <input
                  type="checkbox"
                  checked={adUnits.sidebarSkyscraper}
                  onChange={(e) => setAdUnits({ ...adUnits, sidebarSkyscraper: e.target.checked })}
                  className="w-4 h-4 text-[#1a73e8] rounded cursor-pointer"
                />
              </div>
            )}

            {/* Toggle 6: Sticky Bottom Anchor */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200/80">
              <div>
                <span className="text-xs font-bold text-slate-900 block">Sticky Bottom Anchor</span>
                <span className="text-[11px] text-slate-500">Fixed viewport dock (320x50 / 728x90)</span>
              </div>
              <input
                type="checkbox"
                checked={adUnits.stickyBottomAnchor}
                onChange={(e) => setAdUnits({ ...adUnits, stickyBottomAnchor: e.target.checked })}
                className="w-4 h-4 text-[#1a73e8] rounded cursor-pointer"
              />
            </div>

            {/* Risk Control: Accidental Click Proximity */}
            <div className="pt-2 border-t border-slate-100">
              <label className="text-xs font-bold text-slate-900 block mb-1">
                Distance to Navigation / Download Buttons:
              </label>
              <select
                value={adUnits.proximityToNav}
                onChange={(e) => setAdUnits({ ...adUnits, proximityToNav: e.target.value as 'safe' | 'dangerous' })}
                className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-800"
              >
                <option value="safe">Safe Margin (&gt; 25px clear whitespace buffer)</option>
                <option value="dangerous">Hazardous (&lt; 10px proximity to nav or click elements)</option>
              </select>
            </div>

            {/* Risk Control: CLS Div Reservation */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200/80">
              <div>
                <span className="text-xs font-bold text-slate-900 block">Min-Height Div Reservation</span>
                <span className="text-[11px] text-slate-500">Prevents Cumulative Layout Shift (CLS)</span>
              </div>
              <input
                type="checkbox"
                checked={adUnits.reservedDivHeights}
                onChange={(e) => setAdUnits({ ...adUnits, reservedDivHeights: e.target.checked })}
                className="w-4 h-4 text-[#1a73e8] rounded cursor-pointer"
              />
            </div>
          </div>

          {/* Active Policy Violation Diagnostic Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-3">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#1a73e8]" />
              <span>Policy Evaluation Checklist</span>
            </h3>

            <div className="space-y-2 text-xs">
              {/* Check 1 */}
              <div className={`p-3 rounded-xl border flex items-start gap-2.5 ${isPushingContentBelowFold ? 'bg-rose-50 border-rose-200 text-rose-900' : 'bg-emerald-50 border-emerald-200 text-emerald-900'}`}>
                {isPushingContentBelowFold ? <XCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" /> : <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />}
                <div>
                  <div className="font-bold">Valuable Inventory: Content Above Fold</div>
                  <div className="text-[11px] opacity-90">
                    {isPushingContentBelowFold
                      ? 'Violation: Both Header Banner and 300x250 rectangle are active on mobile, pushing article text below 600px fold. Users only see ads.'
                      : 'Passed: Article title and first 150 words are immediately visible on initial viewport load.'}
                  </div>
                </div>
              </div>

              {/* Check 2 */}
              <div className={`p-3 rounded-xl border flex items-start gap-2.5 ${hasAccidentalClickRisk ? 'bg-rose-50 border-rose-200 text-rose-900' : 'bg-emerald-50 border-emerald-200 text-emerald-900'}`}>
                {hasAccidentalClickRisk ? <XCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" /> : <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />}
                <div>
                  <div className="font-bold">Accidental Click Protection</div>
                  <div className="text-[11px] opacity-90">
                    {hasAccidentalClickRisk
                      ? 'Violation: Ad container touches menu or clickable elements. Triggers automated two-click penalty (Confirmed Click).'
                      : 'Passed: Adequate margin between ad units and interactive links.'}
                  </div>
                </div>
              </div>

              {/* Check 3 */}
              <div className={`p-3 rounded-xl border flex items-start gap-2.5 ${hasClsRisk ? 'bg-amber-50 border-amber-200 text-amber-900' : 'bg-emerald-50 border-emerald-200 text-emerald-900'}`}>
                {hasClsRisk ? <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" /> : <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />}
                <div>
                  <div className="font-bold">Cumulative Layout Shift (CLS)</div>
                  <div className="text-[11px] opacity-90">
                    {hasClsRisk
                      ? 'Warning: Unreserved div height causes layout jumping when ads load asynchronously. Hurts Core Web Vitals.'
                      : 'Passed: CSS min-height placeholders reserve slot geometry before script execution.'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (7 cols): Live Viewport Simulation Canvas */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-slate-900 rounded-3xl p-4 sm:p-6 shadow-xl border border-slate-800 text-center flex flex-col items-center">
            <div className="w-full flex items-center justify-between text-xs text-slate-400 mb-3 px-2">
              <span className="font-mono">
                {viewport === 'mobile' ? 'Mobile Simulated Device (375 × 667)' : 'Desktop Browser Window (1200 × 800)'}
              </span>
              <span className={`font-bold px-2 py-0.5 rounded text-[10px] ${isSafe ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'}`}>
                {isSafe ? 'Compliant Viewport' : 'Policy Risk Detected'}
              </span>
            </div>

            {/* Wireframe Canvas Device Container */}
            <div
              className={`bg-white rounded-2xl shadow-2xl overflow-hidden border-4 border-slate-700 transition-all text-left relative flex flex-col ${
                viewport === 'mobile' ? 'w-[360px] min-h-[580px] max-h-[640px]' : 'w-full min-h-[520px]'
              }`}
            >
              {/* Simulated Browser Bar */}
              <div className="bg-slate-100 border-b border-slate-200 px-3 py-2 flex items-center gap-2 text-[10px] text-slate-500">
                <div className="flex gap-1">
                  <div className="w-2 h-2 rounded-full bg-rose-400" />
                  <div className="w-2 h-2 rounded-full bg-amber-400" />
                  <div className="w-2 h-2 rounded-full bg-emerald-400" />
                </div>
                <div className="flex-1 bg-white rounded px-2 py-0.5 text-center truncate font-mono text-[9px] text-slate-600">
                  https://example-publisher.com/article
                </div>
              </div>

              {/* Simulated Navigation Menu */}
              <div className="bg-slate-900 text-white px-4 py-2 flex items-center justify-between text-xs">
                <span className="font-bold tracking-tight">TechGear Insights</span>
                <span className="text-[10px] text-slate-300">Menu ☰</span>
              </div>

              {/* Scrollable Viewport Body */}
              <div className="p-4 space-y-3 overflow-y-auto flex-1 text-slate-800 text-xs">
                {/* Header Leaderboard Unit */}
                {adUnits.headerLeaderboard && (
                  <div className={`p-2.5 rounded-lg border-2 border-dashed text-center font-mono text-[10px] ${
                    isPushingContentBelowFold && adUnits.topRectangle && viewport === 'mobile'
                      ? 'bg-rose-50 border-rose-400 text-rose-800'
                      : 'bg-blue-50 border-blue-300 text-blue-800'
                  }`}>
                    <div className="font-bold">
                      {viewport === 'mobile' ? 'Ad Unit: 320x50 Mobile Leaderboard' : 'Ad Unit: 728x90 Desktop Leaderboard'}
                    </div>
                    <span className="text-[9px] opacity-75">Google AdSense Display Tag</span>
                  </div>
                )}

                {/* Article Headline */}
                <h2 className="text-base font-extrabold text-slate-900 leading-snug">
                  Hands-On Benchmark: High-Power Soldering Stations in 2026
                </h2>
                <div className="flex items-center gap-2 text-[10px] text-slate-400 pb-1 border-b border-slate-100">
                  <span>By Alex Mercer, Electrical Engineer</span>
                  <span>•</span>
                  <span>Updated Today</span>
                </div>

                {/* Above-Fold Rectangle */}
                {adUnits.topRectangle && (
                  <div className={`p-4 rounded-lg border-2 border-dashed text-center font-mono text-[10px] ${
                    viewport === 'mobile' && adUnits.headerLeaderboard
                      ? 'bg-rose-100 border-rose-500 text-rose-900'
                      : 'bg-purple-50 border-purple-300 text-purple-800'
                  }`}>
                    <div className="font-bold">Ad Unit: 300x250 Medium Rectangle</div>
                    <span className="text-[9px] block opacity-80">
                      {viewport === 'mobile' && adUnits.headerLeaderboard
                        ? '⚠️ Pushes main content below mobile fold! High rejection risk.'
                        : 'Safe placement if header ad is disabled on mobile.'}
                    </span>
                  </div>
                )}

                {/* Genuine Content Paragraph 1 */}
                <p className="text-slate-600 leading-relaxed text-[11px]">
                  When assembling double-sided multilayer PCBs with heavy thermal ground planes, standard 60-watt heating cartridges fail to maintain tip temperature. Our lab tested 4 inductive cartridge stations under continuous copper sink heat draw.
                </p>

                {/* In-Content Ad #1 */}
                {adUnits.inContentAd1 && (
                  <div className="p-3 bg-emerald-50 border-2 border-dashed border-emerald-300 text-emerald-800 rounded-lg text-center font-mono text-[10px]">
                    <div className="font-bold">Ad Unit: In-Content Responsive Native</div>
                    <span className="text-[9px] opacity-80">Compliant with natural reading flow</span>
                  </div>
                )}

                {/* Genuine Content Paragraph 2 */}
                <p className="text-slate-600 leading-relaxed text-[11px]">
                  Using an external thermocouple calibrated to ±0.5°C, the JBC C245 tip recovered to 350°C in just 2.1 seconds after soldering to a 4-ounce copper pour. By comparison, clone T12 cartridges required 6.4 seconds, risking cold joint crystallization.
                </p>

                {/* In-Content Ad #2 */}
                {adUnits.inContentAd2 && (
                  <div className="p-3 bg-emerald-50 border-2 border-dashed border-emerald-300 text-emerald-800 rounded-lg text-center font-mono text-[10px]">
                    <div className="font-bold">Ad Unit: In-Content Slot #2</div>
                    <span className="text-[9px] opacity-80">Placed after 500+ words of unique text</span>
                  </div>
                )}

                <p className="text-slate-600 leading-relaxed text-[11px]">
                  Below is our comprehensive measurement table comparing idle power draw, sleep sensor timeout reliability, and ESD impedance safety.
                </p>
              </div>

              {/* Sticky Bottom Anchor Ad */}
              {adUnits.stickyBottomAnchor && (
                <div className="bg-slate-900 text-white p-2 text-center font-mono text-[10px] border-t-2 border-blue-400 shrink-0">
                  <div className="font-bold text-blue-300">
                    {viewport === 'mobile' ? '320x50 Sticky Anchor Ad (Docked to Viewport)' : '728x90 Sticky Footer Banner'}
                  </div>
                  <span className="text-[8px] text-slate-400">Fixed overlay • Auto-collapsible with close button</span>
                </div>
              )}
            </div>
          </div>

          {/* Zero-CLS Container Boilerplate Generator */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-slate-900 flex items-center gap-2">
                <Copy className="w-4 h-4 text-[#1a73e8]" />
                <span>Zero-CLS Layout CSS Template (Copy &amp; Paste)</span>
              </h4>
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText(sampleZeroClsCss);
                  setCopiedCode(true);
                  setTimeout(() => setCopiedCode(false), 2000);
                }}
                className="text-[11px] font-bold text-[#1a73e8] hover:text-blue-700 flex items-center gap-1 cursor-pointer"
              >
                {copiedCode ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-600">Copied CSS</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy CSS</span>
                  </>
                )}
              </button>
            </div>
            <pre className="p-3 bg-slate-900 text-slate-100 rounded-xl text-[10px] font-mono overflow-x-auto max-h-36">
              {sampleZeroClsCss}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};
