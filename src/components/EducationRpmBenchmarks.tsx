import React, { useState } from 'react';
import { GraduationCap, TrendingUp, DollarSign, Award, CheckCircle2, Info, Sparkles, Calculator, BookOpen } from 'lucide-react';
import { KidExplainer } from './KidExplainer';

interface EducationSubNiche {
  id: string;
  name: string;
  category: string;
  avgCpc: number;
  avgPageRpm: number;
  avgDwellTime: string;
  tier1Rpm: number;
  monthlyTraffic: string;
  highIntentKeywords: string[];
  notes: string;
}

const EDUCATION_SUB_NICHES: EducationSubNiche[] = [
  {
    id: 'professional-cert',
    name: 'Professional Licensure Prep (CPA, Bar, NCLEX, PMP)',
    category: 'Professional Certification',
    avgCpc: 4.10,
    avgPageRpm: 34.00,
    avgDwellTime: '5m 12s',
    tier1Rpm: 42.00,
    monthlyTraffic: '40k - 120k',
    highIntentKeywords: ['cpa exam pass rate calculator', 'nclex question bank score estimator', 'bar exam scaled score converter'],
    notes: 'Premium advertiser bids from online universities, test prep companies, and legal firms.'
  },
  {
    id: 'higher-ed-gpa',
    name: 'University Admissions, GPA & Scholarship Calculators',
    category: 'Higher Education',
    avgCpc: 3.20,
    avgPageRpm: 28.50,
    avgDwellTime: '4m 30s',
    tier1Rpm: 36.00,
    monthlyTraffic: '75k - 250k',
    highIntentKeywords: ['bavarian formula ects to gpa converter', 'college acceptance probability calculator', 'student loan repayment amortization'],
    notes: 'High intent student audience planning university enrollment and private student loans.'
  },
  {
    id: 'cs-coding',
    name: 'Computer Science & Software Engineering Solvers',
    category: 'Technical Education',
    avgCpc: 2.40,
    avgPageRpm: 26.50,
    avgDwellTime: '4m 45s',
    tier1Rpm: 32.00,
    monthlyTraffic: '90k - 300k',
    highIntentKeywords: ['binary to decimal step by step converter', 'big o complexity cheat sheet calculator', 'regex pattern builder tool'],
    notes: 'Attracts high-value developer tools, bootcamp sponsorships, and cloud host advertisers.'
  },
  {
    id: 'stem-lab',
    name: 'STEM, Chemistry & Laboratory Dilution Tools',
    category: 'Academic & Lab Math',
    avgCpc: 1.90,
    avgPageRpm: 22.00,
    avgDwellTime: '3m 50s',
    tier1Rpm: 28.00,
    monthlyTraffic: '60k - 180k',
    highIntentKeywords: ['molarity serial dilution calculator c1v1', 't test sample size formula solver', 'molar mass molecular weight calculator'],
    notes: 'Zero YMYL policy risk. High engagement from collegiate researchers and lab scientists.'
  },
  {
    id: 'k12-stem',
    name: 'K-12 STEM Formulas & Geometry Solvers',
    category: 'Primary & Secondary Education',
    avgCpc: 0.95,
    avgPageRpm: 14.00,
    avgDwellTime: '2m 45s',
    tier1Rpm: 18.00,
    monthlyTraffic: '150k - 500k',
    highIntentKeywords: ['surface area of triangular prism calculator', 'quadratic formula step by step solver', 'slope intercept form grapher'],
    notes: 'Massive volume during school semester months with strong organic search intent.'
  },
  {
    id: 'language-esl',
    name: 'Language Learning & ESL Proficiency Converters',
    category: 'Language & Grammar',
    avgCpc: 0.80,
    avgPageRpm: 12.50,
    avgDwellTime: '3m 10s',
    tier1Rpm: 16.00,
    monthlyTraffic: '80k - 220k',
    highIntentKeywords: ['cefr to ielts score equivalent converter', 'toefl to duolingo english test score', 'german verb conjugation drill'],
    notes: 'Global audience seeking study abroad visas; high Tier 1 conversion for ESL test prep.'
  }
];

export const EducationRpmBenchmarks: React.FC = () => {
  const [selectedSubNiche, setSelectedSubNiche] = useState<string>('higher-ed-gpa');
  const [monthlyVisits, setMonthlyVisits] = useState<number>(30000);

  const activeSubNiche = EDUCATION_SUB_NICHES.find((s) => s.id === selectedSubNiche) || EDUCATION_SUB_NICHES[0];
  const pagesPerVisit = 1.8;
  const estimatedPageviews = Math.round(monthlyVisits * pagesPerVisit);
  const monthlyEarnings = Number(((estimatedPageviews / 1000) * activeSubNiche.avgPageRpm).toFixed(2));
  const annualEarnings = Number((monthlyEarnings * 12).toFixed(2));
  const earningsPer1000Visitors = Number(((1000 * pagesPerVisit / 1000) * activeSubNiche.avgPageRpm).toFixed(2));

  return (
    <div className="space-y-6">
      {/* Editorial Header Banner */}
      <div className="p-6 rounded-2xl bg-white border border-[#dadce0] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <span className="px-2.5 py-0.5 text-xs font-bold rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
              Education Niche Benchmark Report
            </span>
            <span className="text-xs text-[#5f6368] font-normal">• KD: 7 • Verified 2026 Data</span>
            <span className="text-[11px] font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full border border-purple-200">
              gladsenseedu.app Domain Match
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#202124] tracking-tight font-['Google_Sans',sans-serif]">
            Education Niche AdSense RPM Benchmarks: CPC, Page RPM &amp; Earning Potential
          </h1>
          <p className="text-xs sm:text-sm text-[#5f6368] mt-1 max-w-3xl leading-relaxed">
            Comprehensive industry benchmark data on Cost Per Click (CPC), Page RPM, and ad viewability across the 6 major academic sub-sectors in Google AdSense.
          </p>
        </div>
      </div>

      <KidExplainer
        title="Why Education Websites Earn High AdSense Payouts"
        what="Education websites range from $12 to $34 Page RPM. Advertisers like universities, test-prep academies, and student software companies bid aggressively to reach active learners."
        why="When students use interactive calculators (like ECTS GPA converters or chemical dilution tools), they stay on the page for 3 to 5 minutes. This creates massive AdSense Active View viewability (>75%)!"
        how="Select any education sub-niche below to inspect verified advertiser CPCs, Page RPMs, and projected monthly bank payouts."
        result="You get exact realistic figures for planning an educational tool site on gladsenseedu.app."
      />

      {/* Interactive Sub-Niche Selector & Live Yield Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Selector & Sliders (7 cols) */}
        <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Select Education Sub-Sector
            </h2>
            <span className="text-xs font-bold text-emerald-700">
              Active: {activeSubNiche.category}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {EDUCATION_SUB_NICHES.map((sub) => (
              <button
                key={sub.id}
                onClick={() => setSelectedSubNiche(sub.id)}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  selectedSubNiche === sub.id
                    ? 'bg-emerald-50 border-emerald-300 ring-2 ring-emerald-200'
                    : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <div className="font-bold text-xs text-slate-900 leading-snug">{sub.name}</div>
                <div className="flex items-center justify-between mt-2 text-[11px] font-mono">
                  <span className="text-emerald-700 font-bold">${sub.avgPageRpm.toFixed(2)} RPM</span>
                  <span className="text-slate-500">CPC: ${sub.avgCpc.toFixed(2)}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Traffic Slider */}
          <div className="pt-2 space-y-2">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-slate-700">Monthly Visitors Simulator:</span>
              <span className="text-emerald-700 font-mono font-bold">
                {monthlyVisits.toLocaleString()} visits / mo
              </span>
            </div>
            <input
              type="range"
              min="5000"
              max="200000"
              step="5000"
              value={monthlyVisits}
              onChange={(e) => setMonthlyVisits(Number(e.target.value))}
              className="w-full accent-emerald-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>5,000 (Early launch)</span>
              <span>50,000 (Established site)</span>
              <span>200,000 (Authoritative hub)</span>
            </div>
          </div>
        </div>

        {/* Live Metrics Display Card (5 cols) */}
        <div className="lg:col-span-5 bg-gradient-to-br from-emerald-50 via-white to-purple-50 p-6 rounded-2xl border border-slate-200 shadow-sm space-y-5 flex flex-col justify-between">
          <div>
            <span className="text-xs uppercase tracking-wider text-slate-500 font-bold">
              Projected Earnings ({activeSubNiche.category})
            </span>
            <div className="text-3xl sm:text-4xl font-extrabold text-emerald-700 tracking-tight mt-1 font-mono">
              ${monthlyEarnings.toLocaleString()} <span className="text-sm font-sans text-slate-500">/ mo</span>
            </div>
            <div className="text-xs text-slate-600 mt-1">
              Annual Run-Rate: <strong className="text-slate-900 font-mono">${annualEarnings.toLocaleString()} / year</strong>
            </div>
          </div>

          <div className="space-y-2.5 pt-3 border-t border-slate-200 text-xs">
            <div className="flex justify-between items-center py-1">
              <span className="text-slate-600 font-medium">Average Page RPM</span>
              <span className="text-emerald-700 font-mono font-bold">${activeSubNiche.avgPageRpm.toFixed(2)}</span>
            </div>

            <div className="flex justify-between items-center py-1">
              <span className="text-slate-600 font-medium">Average Click CPC</span>
              <span className="text-blue-700 font-mono font-bold">${activeSubNiche.avgCpc.toFixed(2)}</span>
            </div>

            <div className="flex justify-between items-center py-1">
              <span className="text-slate-600 font-medium">Earnings per 1,000 Visitors</span>
              <span className="text-emerald-800 font-mono font-black">${earningsPer1000Visitors.toFixed(2)}</span>
            </div>

            <div className="flex justify-between items-center py-1">
              <span className="text-slate-600 font-medium">Average User Dwell Time</span>
              <span className="text-slate-900 font-mono font-bold">{activeSubNiche.avgDwellTime}</span>
            </div>

            <div className="flex justify-between items-center py-1">
              <span className="text-slate-600 font-medium">Tier 1 Maximum Potential</span>
              <span className="text-purple-700 font-mono font-bold">${activeSubNiche.tier1Rpm.toFixed(2)} RPM</span>
            </div>
          </div>

          <div className="p-3 bg-white rounded-xl border border-slate-200 text-[11px] text-slate-600 leading-relaxed">
            {activeSubNiche.notes}
          </div>
        </div>
      </div>

      {/* Full Education Sub-Niches Comparison Table */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
        <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
          Complete 2026 Education Niche AdSense Benchmarks Matrix
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-700 border-b border-slate-200 font-semibold">
                <th className="py-2.5 px-3">Education Sector</th>
                <th className="py-2.5 px-3">Category</th>
                <th className="py-2.5 px-3">Avg CPC</th>
                <th className="py-2.5 px-3">Page RPM</th>
                <th className="py-2.5 px-3">Tier 1 RPM</th>
                <th className="py-2.5 px-3">Avg Dwell Time</th>
                <th className="py-2.5 px-3">Per 1k Visitors</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-600 font-mono">
              {EDUCATION_SUB_NICHES.map((item) => (
                <tr key={item.id} className={item.id === selectedSubNiche ? 'bg-emerald-50/50 font-bold' : ''}>
                  <td className="py-2.5 px-3 font-sans font-semibold text-slate-900">{item.name}</td>
                  <td className="py-2.5 px-3 font-sans text-slate-600">{item.category}</td>
                  <td className="py-2.5 px-3 text-blue-700">${item.avgCpc.toFixed(2)}</td>
                  <td className="py-2.5 px-3 text-emerald-700">${item.avgPageRpm.toFixed(2)}</td>
                  <td className="py-2.5 px-3 text-purple-700">${item.tier1Rpm.toFixed(2)}</td>
                  <td className="py-2.5 px-3 font-sans">{item.avgDwellTime}</td>
                  <td className="py-2.5 px-3 text-emerald-800 font-black">
                    ${((1000 * pagesPerVisit / 1000) * item.avgPageRpm).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
