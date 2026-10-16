import React, { useState } from 'react';
import {
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  HelpCircle,
  TrendingUp,
  Search,
  Scale,
  Zap,
  ArrowRight,
  BookOpen,
  Award,
  Clock,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import { OfficialEvaluationDisclaimer } from './OfficialEvaluationDisclaimer';

interface NicheYmylProfile {
  name: string;
  category: string;
  riskLevel: 'Extreme' | 'High' | 'Moderate' | 'Zero';
  ymylScore: number; // 0 (safest) - 100 (highest risk)
  credentialRequirement: string;
  manualReviewChance: number; // percentage
  coreUpdateVolatility: 'Severe' | 'High' | 'Low' | 'Negligible';
  timeToApprovalDays: string;
  avgRpm: string;
  whyGoogleScrutinizes: string;
  recommendedPivot: {
    title: string;
    description: string;
    riskReduction: string;
    newRpm: string;
  };
}

const PRESET_YMYL_NICHES: NicheYmylProfile[] = [
  {
    name: 'Personal Loans & Bad Credit Consolidation',
    category: 'Finance & Lending (YMYL Money)',
    riskLevel: 'Extreme',
    ymylScore: 96,
    credentialRequirement: 'Certified Financial Planner (CFP) or FINRA Registered Advisor',
    manualReviewChance: 98,
    coreUpdateVolatility: 'Severe',
    timeToApprovalDays: '180–360+ Days (High Reject Rate)',
    avgRpm: '$45–$75',
    whyGoogleScrutinizes:
      'Directly affects users’ financial security and debt liabilities. Google algorithms heavily penalize affiliate loan lead-generation sites lacking formal banking licenses.',
    recommendedPivot: {
      title: 'Open-Source Zero-Cost Budgeting Spreadsheets & Debt Snowball Tooling',
      description: 'Pivot from selling loan products to providing mathematical debt payoff calculators and privacy-focused spreadsheet formulas.',
      riskReduction: 'Drops YMYL liability by 85%',
      newRpm: '$28–$42',
    },
  },
  {
    name: 'Weight Loss Supplements & Medical Diet Plans',
    category: 'Health & Nutrition (YMYL Health)',
    riskLevel: 'Extreme',
    ymylScore: 94,
    credentialRequirement: 'Licensed Medical Doctor (MD) or Registered Dietitian (RD)',
    manualReviewChance: 95,
    coreUpdateVolatility: 'Severe',
    timeToApprovalDays: '150–300+ Days',
    avgRpm: '$35–$60',
    whyGoogleScrutinizes:
      'Direct impact on human physical health and metabolic safety. Google Search Quality Evaluator Guidelines Section 2.3 mandates consensus medical evidence.',
    recommendedPivot: {
      title: 'Sugar-Free Fermentation & Sourdough Hydration Science',
      description: 'Focus on kitchen culinary mechanics, sourdough baker percentages, and fermentation temperature monitoring tools.',
      riskReduction: 'Drops YMYL liability by 90%',
      newRpm: '$22–$35',
    },
  },
  {
    name: 'Woodworking Joinery & Antique Hand Tool Restoration',
    category: 'Trades & Craft (Non-YMYL)',
    riskLevel: 'Zero',
    ymylScore: 8,
    credentialRequirement: 'Hands-On Enthusiast or Master Craftsman (Photo proof of workbench)',
    manualReviewChance: 8,
    coreUpdateVolatility: 'Negligible',
    timeToApprovalDays: '7–14 Days (Fast Track)',
    avgRpm: '$24–$38',
    whyGoogleScrutinizes:
      'Non-hazardous craft hobby with immense information gain potential. Highly resilient to algorithm shifts because genuine workshop photos cannot be replicated by AI scrapers.',
    recommendedPivot: {
      title: 'Current Niche Is Already Optimal',
      description: 'Publish original dimensional cut lists, timber moisture content charts, and step-by-step restoration galleries.',
      riskReduction: 'Zero policy risk',
      newRpm: '$24–$38',
    },
  },
  {
    name: 'Ham Radio Antennas & RF Signal Calibration',
    category: 'Engineering & Technical (Non-YMYL)',
    riskLevel: 'Zero',
    ymylScore: 12,
    credentialRequirement: 'FCC Amateur Radio Licensee or Technical Hobbyist',
    manualReviewChance: 5,
    coreUpdateVolatility: 'Negligible',
    timeToApprovalDays: '10–18 Days',
    avgRpm: '$32–$50',
    whyGoogleScrutinizes:
      'High technical information gain, zero health or monetary harm. Commercial advertisers (transceiver manufacturers, coaxial cable brands) pay high CPCs for qualified audience.',
    recommendedPivot: {
      title: 'Current Niche Is Already Optimal',
      description: 'Build interactive antenna wire dipole length calculators and SWR measurement charts.',
      riskReduction: 'Zero policy risk',
      newRpm: '$32–$50',
    },
  },
  {
    name: 'Cryptocurrency Trading & Staking Yields',
    category: 'High-Risk Speculative Finance',
    riskLevel: 'Extreme',
    ymylScore: 98,
    credentialRequirement: 'Chartered Financial Analyst (CFA) or Regulated Broker',
    manualReviewChance: 99,
    coreUpdateVolatility: 'Severe',
    timeToApprovalDays: '200+ Days / Almost Immediate Reject',
    avgRpm: '$40–$70',
    whyGoogleScrutinizes:
      'High fraud vectors and speculative risk. Google prohibits unverified financial schemes and requires strict institutional backing.',
    recommendedPivot: {
      title: 'Self-Hosted Blockchain Node Hardware & Energy Efficiency Benchmarks',
      description: 'Benchmark Raspberry Pi / mini PC electricity draw, thermal dissipation, and SSD TBW endurance for validation nodes.',
      riskReduction: 'Transitions into pure hardware benchmarking (Non-YMYL)',
      newRpm: '$30–$48',
    },
  },
];

export const YmylDifficultyAnalyzer: React.FC = () => {
  const [selectedIdx, setSelectedIdx] = useState<number>(0);
  const [customTopic, setCustomTopic] = useState<string>('');

  const activeProfile = PRESET_YMYL_NICHES[selectedIdx];

  const getRiskBadge = (risk: NicheYmylProfile['riskLevel']) => {
    switch (risk) {
      case 'Extreme':
        return 'bg-rose-500/15 text-rose-700 border-rose-300';
      case 'High':
        return 'bg-orange-500/15 text-orange-700 border-orange-300';
      case 'Moderate':
        return 'bg-amber-500/15 text-amber-700 border-amber-300';
      case 'Zero':
        return 'bg-emerald-500/15 text-emerald-700 border-emerald-300';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-slate-800">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/30 text-amber-300 border border-amber-400/30 flex items-center gap-1.5">
                <Scale className="w-3.5 h-3.5 text-amber-400" />
                Google Quality Evaluator Standard Section 2.3
              </span>
              <span className="text-xs text-slate-400 hidden sm:inline">• YMYL Algorithmic Filter</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              YMYL &amp; E-E-A-T Barrier-to-Entry Difficulty Analyzer
            </h1>
            <p className="text-sm text-slate-300 leading-relaxed">
              Don&apos;t waste months creating content in dangerous &quot;Your Money Your Life&quot; (YMYL) traps where Google requires formal medical degrees or financial regulatory licenses. Evaluate your niche risk and discover high-RPM algorithmic pivots.
            </p>
          </div>

          {/* Quick Risk Meter */}
          <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/15 flex flex-col items-center justify-center min-w-[210px] text-center">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-300">
              YMYL Scrutiny Score
            </span>
            <div className="text-4xl sm:text-5xl font-black text-white my-1 font-mono">
              {activeProfile.ymylScore}<span className="text-xl text-amber-300 font-normal">/100</span>
            </div>
            <span className={`text-[11px] font-bold px-3 py-1 rounded-full border mt-1 ${getRiskBadge(activeProfile.riskLevel)}`}>
              {activeProfile.riskLevel} Risk
            </span>
          </div>
        </div>

        {/* Niche Selector Presets */}
        <div className="mt-6 pt-6 border-t border-slate-800/80">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
            Compare Common Publisher Niches Across Google Risk Tiers:
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
            {PRESET_YMYL_NICHES.map((profile, i) => (
              <button
                key={profile.name}
                type="button"
                onClick={() => setSelectedIdx(i)}
                className={`p-3 rounded-xl text-left transition-all border text-xs cursor-pointer ${
                  selectedIdx === i
                    ? 'bg-blue-600/30 border-blue-400 text-white shadow-md ring-2 ring-blue-500/40'
                    : 'bg-slate-800/60 hover:bg-slate-800 border-slate-700/80 text-slate-300'
                }`}
              >
                <div className="font-bold truncate mb-1">{profile.name}</div>
                <div className="flex items-center justify-between text-[10px]">
                  <span className="text-slate-400 truncate pr-1">{profile.category.split(' ')[0]}</span>
                  <span className={`px-1.5 py-0.2 rounded font-bold uppercase ${getRiskBadge(profile.riskLevel)}`}>
                    {profile.riskLevel}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Analysis Display */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column (7 cols): Deep Algorithmic Exposure Metrics */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Target Niche Audit
                </span>
                <h3 className="text-lg font-bold text-slate-900">{activeProfile.name}</h3>
              </div>
              <span className="text-xs font-mono font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-lg">
                Estimated RPM: {activeProfile.avgRpm}
              </span>
            </div>

            {/* Why Google Scrutinizes */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5">
              <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4 text-[#1a73e8]" />
                <span>Google Search Quality Evaluator Rationale:</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                {activeProfile.whyGoogleScrutinizes}
              </p>
            </div>

            {/* 4 Critical Risk Dimensions Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {/* Metric 1 */}
              <div className="p-3.5 rounded-xl border border-slate-200 bg-white shadow-2xs space-y-1">
                <div className="flex items-center justify-between text-[11px] text-slate-500">
                  <span className="font-semibold">Credential Requirement</span>
                  <Award className="w-4 h-4 text-purple-600" />
                </div>
                <div className="text-xs font-bold text-slate-900">
                  {activeProfile.credentialRequirement}
                </div>
              </div>

              {/* Metric 2 */}
              <div className="p-3.5 rounded-xl border border-slate-200 bg-white shadow-2xs space-y-1">
                <div className="flex items-center justify-between text-[11px] text-slate-500">
                  <span className="font-semibold">Human Review Probability</span>
                  <Search className="w-4 h-4 text-blue-600" />
                </div>
                <div className="text-xs font-bold text-slate-900">
                  {activeProfile.manualReviewChance}% (Quality Rater Audit)
                </div>
              </div>

              {/* Metric 3 */}
              <div className="p-3.5 rounded-xl border border-slate-200 bg-white shadow-2xs space-y-1">
                <div className="flex items-center justify-between text-[11px] text-slate-500">
                  <span className="font-semibold">Core Update Volatility</span>
                  <TrendingUp className="w-4 h-4 text-amber-600" />
                </div>
                <div className="text-xs font-bold text-slate-900">
                  {activeProfile.coreUpdateVolatility} Fluctuation
                </div>
              </div>

              {/* Metric 4 */}
              <div className="p-3.5 rounded-xl border border-slate-200 bg-white shadow-2xs space-y-1">
                <div className="flex items-center justify-between text-[11px] text-slate-500">
                  <span className="font-semibold">Time to AdSense Monetization</span>
                  <Clock className="w-4 h-4 text-emerald-600" />
                </div>
                <div className="text-xs font-bold text-slate-900">
                  {activeProfile.timeToApprovalDays}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (5 cols): Safe Strategic Pivot Engine */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-2xl border-2 border-emerald-300 p-6 shadow-md space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                <Zap className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">
                  Algorithmic Safe Harbor
                </span>
                <h4 className="text-sm font-bold text-slate-900">
                  Recommended Strategic Pivot
                </h4>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200 space-y-2">
              <div className="text-xs font-bold text-emerald-950">
                {activeProfile.recommendedPivot.title}
              </div>
              <p className="text-xs text-emerald-900/90 leading-relaxed">
                {activeProfile.recommendedPivot.description}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs pt-1">
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-center">
                <span className="text-[10px] text-slate-500 block">Risk Reduction</span>
                <strong className="text-emerald-700 text-xs">{activeProfile.recommendedPivot.riskReduction}</strong>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-center">
                <span className="text-[10px] text-slate-500 block">Preserved RPM</span>
                <strong className="text-blue-700 text-xs">{activeProfile.recommendedPivot.newRpm}</strong>
              </div>
            </div>

            <div className="text-[11px] text-slate-500 pt-2 border-t border-slate-100 leading-snug">
              💡 <strong>Chief Directive Insight:</strong> Shift from offering high-liability advisory claims to building objective calculation tools, measurement tables, and physical workshop guides. You bypass the YMYL algorithmic gate entirely while securing premium ad rates.
            </div>
          </div>
        </div>
      </div>

      {/* Official Evaluation Notice & AdSense Probability Disclaimer */}
      <OfficialEvaluationDisclaimer sourceLabel={`YMYL & E-E-A-T Safety Analysis: ${activeProfile.name}`} />
    </div>
  );
};
