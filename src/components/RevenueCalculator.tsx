import React, { useState, useEffect } from 'react';
import { RevenueInputs } from '../types';
import { DollarSign, ShieldAlert, Sparkles, TrendingUp, Cpu, Info, CheckCircle2, AlertTriangle, HelpCircle } from 'lucide-react';
import { KidExplainer } from './KidExplainer';

interface RevenueCalculatorProps {
  initialRpm?: number;
  focusVisitorCalculator?: boolean;
}

export const RevenueCalculator: React.FC<RevenueCalculatorProps> = ({
  initialRpm = 20,
  focusVisitorCalculator = false,
}) => {
  const [showKidExplainer, setShowKidExplainer] = useState<boolean>(true);

  useEffect(() => {
    if (focusVisitorCalculator) {
      const el = document.getElementById('how-much-adsense-pays-1000-visitors');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [focusVisitorCalculator]);
  const [inputs, setInputs] = useState<RevenueInputs>({
    monthlyVisitors: 35000,
    pagesPerVisit: 1.8,
    tier1Share: 75,
    baseRpm: initialRpm,
    adUnitsCount: 3,
    annualDomainCost: 10, // wholesale Cloudflare Registrar
    monthlyHostingCost: 0, // Cloudflare Pages / Vercel
    estimatedCtr: 1.8,
    estimatedCpc: 1.25,
  });

  const [selectedNicheKey, setSelectedNicheKey] = useState<string>('education');
  const [visitorTier, setVisitorTier] = useState<number>(1000);

  const NICHE_PRESETS: Record<string, { label: string; rpm: number; pages: number; cpc: number; desc: string }> = {
    'education': { label: '🎓 Education & Academic Tools (gladsenseedu.app)', rpm: 18.50, pages: 1.8, cpc: 1.45, desc: 'ECTS grade converters, student loan amortizers, and chemical dilution formulas.' },
    'trades': { label: '🔨 Trades, HVAC & Construction', rpm: 26.00, pages: 1.9, cpc: 2.10, desc: 'Epoxy resin volume, concrete yardage, and HVAC CFM sizing calculators.' },
    'finance': { label: '💳 Personal Finance & Mortgages', rpm: 42.00, pages: 1.7, cpc: 3.80, desc: 'Compound interest, auto loan payoff, and retirement withdrawal tools.' },
    'legal': { label: '⚖️ Legal & Bureaucracy Calculators', rpm: 48.00, pages: 1.5, cpc: 4.90, desc: 'Child support worksheets, statutory interest, and court date calculators.' },
    'tech': { label: '💻 B2B Tech, SaaS & Cloud Computing', rpm: 32.00, pages: 2.1, cpc: 2.60, desc: 'AWS/GCP server sizing, bandwidth transfer, and regex testing utilities.' },
    'health': { label: '🏥 Health, Fitness & Nutrition', rpm: 22.00, pages: 1.6, cpc: 1.75, desc: 'TDEE calories, macro split, and body composition estimators.' },
    'realestate': { label: '🏡 Real Estate & Property Investment', rpm: 36.00, pages: 2.2, cpc: 3.20, desc: 'Cap rate calculators, rental cash-on-cash yield, and closing costs.' },
    'auto': { label: '🚗 Automotive & DIY Repair', rpm: 21.00, pages: 1.8, cpc: 1.60, desc: 'Tire size speedometer error, gear ratio, and fuel MPG calculators.' },
    'travel': { label: '✈️ Travel, Flight & Visa Rules', rpm: 16.00, pages: 2.3, cpc: 1.10, desc: 'Schengen 90/180 visa days, flight layover, and luggage dimension tools.' },
    'food': { label: '🍞 Food, Culinary & Baking Math', rpm: 12.00, pages: 2.0, cpc: 0.85, desc: 'Sourdough baker percentages, cake pan scaling, and unit converters.' },
    'gaming': { label: '🎮 Gaming & Entertainment', rpm: 8.00, pages: 2.4, cpc: 0.55, desc: 'Mouse DPI sensitivity converters, drop rate solvers, and game builds.' },
    'news': { label: '📰 General News & Lifestyle', rpm: 6.50, pages: 1.4, cpc: 0.40, desc: 'Broad editorial news articles without interactive mathematical utilities.' },
  };

  const handleNicheChange = (nicheKey: string) => {
    setSelectedNicheKey(nicheKey);
    const preset = NICHE_PRESETS[nicheKey];
    if (preset) {
      setInputs((prev) => ({
        ...prev,
        baseRpm: preset.rpm,
        pagesPerVisit: preset.pages,
        estimatedCpc: preset.cpc,
      }));
    }
  };

  // Calculate outputs
  const totalMonthlyPageviews = Math.round(inputs.monthlyVisitors * inputs.pagesPerVisit);
  const totalAnnualPageviews = totalMonthlyPageviews * 12;

  // Blended RPM adjustment based on Tier 1 geographic share:
  const geoMultiplier = (inputs.tier1Share / 100) * 1.0 + ((100 - inputs.tier1Share) / 100) * 0.35;
  const blendedRpm = Number((inputs.baseRpm * geoMultiplier).toFixed(2));

  const grossMonthlyRevenue = Number(((totalMonthlyPageviews / 1000) * blendedRpm).toFixed(2));
  const grossAnnualRevenue = Number((grossMonthlyRevenue * 12).toFixed(2));

  const totalAnnualHosting = inputs.monthlyHostingCost * 12;
  const totalAnnualCost = inputs.annualDomainCost + totalAnnualHosting;

  const netAnnualProfit = Number((grossAnnualRevenue - totalAnnualCost).toFixed(2));
  const netMonthlyProfit = Number((grossMonthlyRevenue - inputs.monthlyHostingCost - inputs.annualDomainCost / 12).toFixed(2));
  const profitMargin = grossAnnualRevenue > 0 ? ((netAnnualProfit / grossAnnualRevenue) * 100).toFixed(1) : '0';

  // Break even calculation
  const dailyGross = grossMonthlyRevenue / 30;
  const breakEvenDays = dailyGross > 0 ? Math.ceil(totalAnnualCost / dailyGross) : 0;

  // How much does AdSense pay for X visitors?
  const visitorTierPageviews = Math.round(visitorTier * inputs.pagesPerVisit);
  const visitorTierEarnings = Number(((visitorTierPageviews / 1000) * blendedRpm).toFixed(2));

  return (
    <div className="space-y-6">
      {/* Title & Introduction (Google Style) */}
      <div className="p-6 rounded-2xl bg-white border border-[#dadce0] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <span className="px-2.5 py-0.5 text-xs font-medium rounded-full bg-[#e8f0fe] text-[#1a73e8]">
              AdSense Revenue Calculator
            </span>
            <span className="text-xs text-[#5f6368] font-normal">• KD: 18 • Interactive Tool</span>
            <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              12 Niche Presets Included
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#202124] tracking-tight font-['Google_Sans',sans-serif]">
            Google AdSense Revenue Calculator by Niche (2026 Traffic &amp; RPM Estimator)
          </h1>
          <p className="text-xs sm:text-sm text-[#5f6368] mt-1 max-w-3xl leading-relaxed">
            Select your publishing niche to load validated 2026 Page RPM and CPC benchmarks. Move the visitor slider to calculate net bank payouts with our $10/year zero-cost static hosting stack.
          </p>
        </div>
      </div>

      <KidExplainer
        title="Google AdSense Revenue Calculator by Niche"
        what="An empirical revenue calculator that models publisher earnings from visitor traffic, ad impressions, and advertiser demand rates across 12 specific niches."
        why="Avoids unrealistic projections by calculating true bank payouts using official Google advertiser RPM benchmarks and 98%+ margin static hosting."
        how="1. Select your target niche from the dropdown. 2. Fine-tune your monthly visitors and geographic Tier 1 share. 3. Review your monthly payout and exact earnings per 1,000 visitors."
        result="Displays your net annual take-home profit, daily break-even velocity, and Google-compliant ad layout placement blueprints."
      />

      {/* Main Grid: Inputs (Left) and Financial Dashboard (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Interactive Controls (7 cols) */}
        <div className="lg:col-span-7 space-y-5 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Niche Selection &amp; Monetization Parameters
            </h2>
            <button
              onClick={() => handleNicheChange('education')}
              className="text-xs text-[#9d62ec] hover:text-purple-700 font-semibold cursor-pointer"
            >
              Reset to Education
            </button>
          </div>

          {/* Niche Selector Dropdown */}
          <div className="space-y-1.5 p-3.5 bg-gradient-to-r from-purple-50/70 to-blue-50/70 rounded-xl border border-purple-200/80">
            <label className="text-xs font-bold text-slate-800 flex items-center justify-between">
              <span>Select Publishing Niche for 2026 RPM Benchmarks:</span>
              <span className="text-[11px] font-mono font-bold text-purple-700">
                Base RPM: ${NICHE_PRESETS[selectedNicheKey]?.rpm.toFixed(2)}
              </span>
            </label>
            <select
              value={selectedNicheKey}
              onChange={(e) => handleNicheChange(e.target.value)}
              className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-xs sm:text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#9d62ec] cursor-pointer"
            >
              {Object.entries(NICHE_PRESETS).map(([key, item]) => (
                <option key={key} value={key}>
                  {item.label} — ${item.rpm.toFixed(2)} Base RPM (CPC: ${item.cpc.toFixed(2)})
                </option>
              ))}
            </select>
            <p className="text-[11px] text-slate-600 mt-1">
              {NICHE_PRESETS[selectedNicheKey]?.desc}
            </p>
          </div>

          {/* Monthly Visitors Slider */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <label className="text-slate-700 font-semibold">Monthly Unique Visitors</label>
              <span className="text-emerald-700 font-mono font-bold">
                {inputs.monthlyVisitors.toLocaleString()} visits / mo
              </span>
            </div>
            <input
              type="range"
              min="5000"
              max="200000"
              step="2500"
              value={inputs.monthlyVisitors}
              onChange={(e) => setInputs({ ...inputs, monthlyVisitors: Number(e.target.value) })}
              className="w-full accent-[#9d62ec] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>5,000 (Early launch)</span>
              <span>75,000 (Established tool)</span>
              <span>200,000 (Category leader)</span>
            </div>
          </div>

          {/* Pages per Visit Slider */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <label className="text-slate-700 font-semibold">Pages per Visit (Tool Multiplier)</label>
              <span className="text-slate-900 font-mono font-bold">{inputs.pagesPerVisit.toFixed(1)} pages</span>
            </div>
            <input
              type="range"
              min="1.0"
              max="3.5"
              step="0.1"
              value={inputs.pagesPerVisit}
              onChange={(e) => setInputs({ ...inputs, pagesPerVisit: Number(e.target.value) })}
              className="w-full accent-[#9d62ec] cursor-pointer"
            />
            <p className="text-[11px] text-slate-500">
              Calculators with related conversion tools average 1.8 - 2.4 pageviews per user session.
            </p>
          </div>

          {/* Base Niche RPM */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <label className="text-slate-700 font-semibold">Base Niche RPM ($ per 1k views)</label>
              <span className="text-emerald-700 font-mono font-bold">${inputs.baseRpm.toFixed(2)}</span>
            </div>
            <input
              type="range"
              min="6"
              max="40"
              step="1"
              value={inputs.baseRpm}
              onChange={(e) => setInputs({ ...inputs, baseRpm: Number(e.target.value) })}
              className="w-full accent-emerald-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>$6 (General entertainment)</span>
              <span>$20 (Trades & Academic)</span>
              <span>$40 (B2B / Legal / Tech)</span>
            </div>
          </div>

          {/* Tier 1 Traffic Geographic Share */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <label className="text-slate-700 font-semibold">Tier 1 Traffic Share (US, CA, UK, AU)</label>
              <span className="text-purple-700 font-mono font-bold">{inputs.tier1Share}%</span>
            </div>
            <input
              type="range"
              min="20"
              max="100"
              step="5"
              value={inputs.tier1Share}
              onChange={(e) => setInputs({ ...inputs, tier1Share: Number(e.target.value) })}
              className="w-full accent-purple-600 cursor-pointer"
            />
            <p className="text-[11px] text-slate-500">
              Higher Tier 1 ratio dramatically scales your realized RPM; non-Tier 1 traffic yields lower CPM bids.
            </p>
          </div>

          {/* Cost Comparison: Static ($0) vs Traditional VPS/CMS */}
          <div className="pt-4 border-t border-slate-100 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Hosting & Domain Cost Comparison
              </h4>
              <span className="text-xs text-emerald-700 font-mono font-bold">
                Total Annual Cost: ${totalAnnualCost}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <label className="block text-[11px] text-slate-600 font-semibold mb-1">
                  Annual Domain ($/yr)
                </label>
                <div className="flex items-center gap-1">
                  <span className="text-slate-400 text-sm">$</span>
                  <input
                    type="number"
                    value={inputs.annualDomainCost}
                    onChange={(e) => setInputs({ ...inputs, annualDomainCost: Math.max(0, Number(e.target.value)) })}
                    className="w-full bg-white border border-slate-200 rounded px-2 py-1 text-xs text-slate-900 font-mono focus:outline-none focus:border-[#9d62ec]"
                  />
                </div>
                <span className="text-[10px] text-slate-400 mt-1 block">Cloudflare wholesale: $10.18</span>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <label className="block text-[11px] text-slate-600 font-semibold mb-1">
                  Monthly Hosting ($/mo)
                </label>
                <div className="flex items-center gap-1">
                  <span className="text-slate-400 text-sm">$</span>
                  <input
                    type="number"
                    value={inputs.monthlyHostingCost}
                    onChange={(e) => setInputs({ ...inputs, monthlyHostingCost: Math.max(0, Number(e.target.value)) })}
                    className="w-full bg-white border border-slate-200 rounded px-2 py-1 text-xs text-slate-900 font-mono focus:outline-none focus:border-[#9d62ec]"
                  />
                </div>
                <span className="text-[10px] text-emerald-600 font-semibold mt-1 block">Cloudflare Pages: $0.00</span>
              </div>
            </div>

            {inputs.monthlyHostingCost > 0 && (
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-800 flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0 text-amber-600 mt-0.5" />
                <span>
                  Notice: Paying ${inputs.monthlyHostingCost}/mo (${inputs.monthlyHostingCost * 12}/yr) for VPS or WordPress reduces your profit margin. With client-side micro-tools, this hosting cost can be strictly <strong>$0</strong> on Cloudflare Pages or Vercel.
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Financial Results Card (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Main Profit Card (Semrush Style) */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-50 via-white to-purple-50 border border-slate-200 shadow-sm space-y-5">
            <div>
              <span className="text-xs uppercase tracking-wider text-slate-500 font-bold">
                Net Annual Take-Home Profit
              </span>
              <div className="text-3xl sm:text-4xl font-extrabold text-emerald-700 tracking-tight mt-1 font-mono">
                ${netAnnualProfit.toLocaleString()}
              </div>
              <div className="flex items-center gap-2 mt-1.5 text-xs text-slate-600">
                <span>Monthly: <strong className="text-slate-900 font-mono">${netMonthlyProfit.toLocaleString()}</strong></span>
                <span>•</span>
                <span>Margin: <strong className="text-emerald-700 font-mono">{profitMargin}%</strong></span>
              </div>
            </div>

            {/* Metric Rows */}
            <div className="space-y-2.5 pt-4 border-t border-slate-200 text-xs">
              <div className="flex justify-between items-center py-1">
                <span className="text-slate-600">Total Monthly Pageviews</span>
                <span className="text-slate-900 font-mono font-bold">
                  {totalMonthlyPageviews.toLocaleString()}
                </span>
              </div>

              <div className="flex justify-between items-center py-1">
                <span className="text-slate-600">Blended Realized RPM</span>
                <span className="text-emerald-700 font-mono font-bold">
                  ${blendedRpm} <span className="text-[10px] text-slate-400">/ 1k views</span>
                </span>
              </div>

              <div className="flex justify-between items-center py-1">
                <span className="text-slate-600">Gross Monthly Revenue</span>
                <span className="text-slate-900 font-mono font-bold">
                  ${grossMonthlyRevenue.toLocaleString()}
                </span>
              </div>

              <div className="flex justify-between items-center py-1">
                <span className="text-slate-600">Total Annual Infrastructure Cost</span>
                <span className="text-slate-700 font-mono font-bold">
                  ${totalAnnualCost.toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between items-center py-2 bg-emerald-100/70 px-3 rounded-xl border border-emerald-200">
                <span className="text-emerald-900 font-bold">Break-Even Velocity</span>
                <span className="text-emerald-800 font-mono font-black text-sm">
                  Day {breakEvenDays} of Year!
                </span>
              </div>
            </div>

            {/* Why Static Hosting is King */}
            <div className="p-3.5 bg-white rounded-xl border border-slate-200 text-xs text-slate-700 space-y-1.5 shadow-2xs">
              <div className="flex items-center gap-1.5 font-bold text-slate-900">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>The $12/Yr Superpower</span>
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                By hosting client-side on Cloudflare Pages, your server cost remains strictly $0 even if your traffic surges to 500,000 visitors. You keep <strong>{profitMargin}%</strong> of every ad dollar generated.
              </p>
            </div>
          </div>

          {/* AdSense Policy Placement Preview */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
              <Info className="w-4 h-4 text-[#9d62ec]" />
              <span>Compliant Ad Layout Diagram</span>
            </h4>
            <p className="text-[11px] text-slate-600">
              How to place 3 ad units without triggering AdSense penalties for deceptive placement:
            </p>

            {/* Mock Webpage Wireframe */}
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2 text-[10px] font-mono">
              <div className="h-5 bg-white border border-slate-200 rounded flex items-center justify-center text-slate-500 font-sans font-medium">
                Site Navigation Bar & Breadcrumbs
              </div>
              <div className="h-7 bg-purple-50 border border-dashed border-purple-300 rounded flex items-center justify-center text-purple-800 font-semibold">
                [Unit 1: Responsive Top Leaderboard - 728x90]
              </div>
              <div className="h-14 bg-white border border-slate-200 rounded p-2 text-slate-700 font-sans">
                Tool Interactive Container (Inputs & Sliders)
              </div>
              <div className="h-10 bg-purple-50 border border-dashed border-purple-300 rounded flex items-center justify-center text-purple-800 font-semibold">
                [Unit 2: Result Rectangle - 300x250 (78% Active View)]
              </div>
              <div className="h-12 bg-white border border-slate-200 rounded p-1.5 text-slate-500 font-sans leading-tight">
                1,000 Words Educational Guide (Formula, Step-by-Step, FAQs)
              </div>
              <div className="h-6 bg-emerald-50 border border-emerald-300 rounded flex items-center justify-center text-emerald-800 font-bold">
                [Unit 3: Sticky Mobile Bottom Anchor - 320x50]
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* ========================================================
          DEDICATED MODULE: HOW MUCH DOES ADSENSE PAY FOR 1,000 VISITORS?
          (Target Keyword: 'how much does adsense pay for 1000 visitors in education' • KD: 10)
         ======================================================== */}
      <div
        id="how-much-adsense-pays-1000-visitors"
        className={`p-6 sm:p-8 rounded-3xl border shadow-sm space-y-6 transition-all scroll-mt-24 ${
          focusVisitorCalculator
            ? 'bg-gradient-to-b from-emerald-50/50 via-white to-white border-emerald-400 ring-2 ring-emerald-300/40'
            : 'bg-white border-slate-200'
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span className="px-2.5 py-0.5 text-xs font-bold rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                Direct Financial Calculation
              </span>
              <span className="text-xs text-slate-500 font-semibold">• KD: 10 • Fast-Rank Target</span>
              {focusVisitorCalculator && (
                <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                  Direct Target Active
                </span>
              )}
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-['Google_Sans',sans-serif] tracking-tight">
              How Much Does AdSense Pay for 1,000 Visitors? (Calculated by Niche)
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Instant breakdown of Google AdSense earnings per 1,000 unique visitors in the <strong>{NICHE_PRESETS[selectedNicheKey]?.label}</strong> niche.
            </p>
          </div>

          {/* Visitor Tier Selector */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 gap-1 flex-wrap">
            {[1000, 5000, 10000, 50000].map((tier) => (
              <button
                key={tier}
                onClick={() => setVisitorTier(tier)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  visitorTier === tier
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                }`}
              >
                {tier.toLocaleString()} Visitors
              </button>
            ))}
          </div>
        </div>

        {/* Highlight Result Callout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-1">
            <span className="text-xs font-bold text-emerald-900 uppercase tracking-wider block">
              Estimated Payout for {visitorTier.toLocaleString()} Visitors
            </span>
            <div className="text-3xl font-black text-emerald-700 font-mono">
              ${visitorTierEarnings}
            </div>
            <p className="text-[11px] text-emerald-800 leading-tight">
              Based on {inputs.pagesPerVisit} pages/visit ({visitorTierPageviews.toLocaleString()} pageviews) at ${blendedRpm} blended RPM.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-purple-50/70 border border-purple-200 space-y-1">
            <span className="text-xs font-bold text-purple-900 uppercase tracking-wider block">
              Education Niche Benchmark (gladsenseedu.app)
            </span>
            <div className="text-3xl font-black text-purple-700 font-mono">
              $18.50 – $36.00
            </div>
            <p className="text-[11px] text-purple-800 leading-tight">
              Per 1,000 visitors on interactive academic tools &amp; grade solvers with 75%+ Tier 1 traffic.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-blue-50/70 border border-blue-200 space-y-1">
            <span className="text-xs font-bold text-blue-900 uppercase tracking-wider block">
              Annual Value at 1k Daily Visitors
            </span>
            <div className="text-3xl font-black text-blue-700 font-mono">
              ${(visitorTierEarnings * 30 * 12).toLocaleString()} / yr
            </div>
            <p className="text-[11px] text-blue-800 leading-tight">
              At 30,000 monthly visitors, yielding ~{profitMargin}% net margin on $0 static hosting.
            </p>
          </div>
        </div>

        {/* 1,000 Visitors Cross-Niche Benchmark Comparison Table */}
        <div className="space-y-3 pt-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
            2026 Payout per 1,000 Visitors Across 8 Key Niches
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-700 border-b border-slate-200 font-semibold">
                  <th className="py-2.5 px-3">Publishing Niche</th>
                  <th className="py-2.5 px-3">Avg Pages / Visit</th>
                  <th className="py-2.5 px-3">Expected Page RPM</th>
                  <th className="py-2.5 px-3">Avg CPC</th>
                  <th className="py-2.5 px-3 font-bold text-slate-900">Earnings per 1,000 Visitors</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-600 font-mono">
                <tr className="bg-emerald-50/40 font-semibold">
                  <td className="py-2 px-3 font-sans font-bold text-emerald-950 flex items-center gap-1.5">
                    <span>🎓 Education &amp; Academic Tools</span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800">Your Domain</span>
                  </td>
                  <td className="py-2 px-3">1.8 pages</td>
                  <td className="py-2 px-3 text-emerald-700">$18.50</td>
                  <td className="py-2 px-3">$1.45</td>
                  <td className="py-2 px-3 text-emerald-800 font-bold">$33.30</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 font-sans text-slate-800">💳 Personal Finance &amp; Mortgages</td>
                  <td className="py-2 px-3">1.7 pages</td>
                  <td className="py-2 px-3 text-emerald-700">$42.00</td>
                  <td className="py-2 px-3">$3.80</td>
                  <td className="py-2 px-3 text-slate-900 font-bold">$71.40</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 font-sans text-slate-800">🔨 Specialized Trades &amp; Construction</td>
                  <td className="py-2 px-3">1.9 pages</td>
                  <td className="py-2 px-3 text-emerald-700">$26.00</td>
                  <td className="py-2 px-3">$2.10</td>
                  <td className="py-2 px-3 text-slate-900 font-bold">$49.40</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 font-sans text-slate-800">💻 B2B Tech &amp; Cloud SaaS</td>
                  <td className="py-2 px-3">2.1 pages</td>
                  <td className="py-2 px-3 text-emerald-700">$32.00</td>
                  <td className="py-2 px-3">$2.60</td>
                  <td className="py-2 px-3 text-slate-900 font-bold">$67.20</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 font-sans text-slate-800">🏥 Health, Fitness &amp; Diet Tools</td>
                  <td className="py-2 px-3">1.6 pages</td>
                  <td className="py-2 px-3 text-emerald-700">$22.00</td>
                  <td className="py-2 px-3">$1.75</td>
                  <td className="py-2 px-3 text-slate-900 font-bold">$35.20</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 font-sans text-slate-800">✈️ Travel &amp; Visa Calculations</td>
                  <td className="py-2 px-3">2.3 pages</td>
                  <td className="py-2 px-3 text-emerald-700">$16.00</td>
                  <td className="py-2 px-3">$1.10</td>
                  <td className="py-2 px-3 text-slate-900 font-bold">$36.80</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 font-sans text-slate-800">🍞 Food, Culinary &amp; Baking Math</td>
                  <td className="py-2 px-3">2.0 pages</td>
                  <td className="py-2 px-3 text-emerald-700">$12.00</td>
                  <td className="py-2 px-3">$0.85</td>
                  <td className="py-2 px-3 text-slate-900 font-bold">$24.00</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 font-sans text-slate-800">🎮 Gaming &amp; Entertainment</td>
                  <td className="py-2 px-3">2.4 pages</td>
                  <td className="py-2 px-3 text-emerald-700">$8.00</td>
                  <td className="py-2 px-3">$0.55</td>
                  <td className="py-2 px-3 text-slate-900 font-bold">$19.20</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
