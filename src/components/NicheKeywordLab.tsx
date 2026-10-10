import React, { useState } from 'react';
import { Niche } from '../types';
import { NICHES_DATA } from '../data/nichesData';
import { NicheExplorer } from './NicheExplorer';
import { AiNicheEvaluator } from './AiNicheEvaluator';
import { KgrCalculator } from './KgrCalculator';
import { Top50NichesTable } from './Top50NichesTable';
import { EducationRpmBenchmarks } from './EducationRpmBenchmarks';
import { Sparkles, Compass, Search, Table, GraduationCap } from 'lucide-react';

interface NicheKeywordLabProps {
  initialSubTab?: 'ai-evaluator' | 'matrix' | 'kgr' | 'top-50-cpc' | 'education-rpm';
  onSelectNiche: (niche: Niche) => void;
  onSimulateInCalculator: (rpm: number) => void;
}

export const NicheKeywordLab: React.FC<NicheKeywordLabProps> = ({
  initialSubTab = 'top-50-cpc',
  onSelectNiche,
  onSimulateInCalculator,
}) => {
  const [subTab, setSubTab] = useState<'ai-evaluator' | 'matrix' | 'kgr' | 'top-50-cpc' | 'education-rpm'>(initialSubTab);

  return (
    <div className="space-y-6">
      {/* Top Unified Suite Navigation Bar */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-2 sm:p-2.5 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs">
        <div className="flex items-center gap-2 pl-2">
          <div className="w-8 h-8 rounded-xl bg-[#f3e8ff] text-[#9d62ec] flex items-center justify-center font-bold">
            <Sparkles className="w-4 h-4 text-[#9d62ec]" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-900 leading-tight">
              High-RPM Niche &amp; Keyword Discovery Lab
            </h2>
            <p className="text-[11px] text-slate-500">
              Top 50 high-paying CPC niches, verified education RPM benchmarks (gladsenseedu.app), 30+ pre-vetted blueprints, and KGR formulas.
            </p>
          </div>
        </div>

        {/* 5 Unified Sub-Tabs */}
        <div className="flex items-center bg-white p-1 rounded-xl border border-slate-200/80 shadow-xs w-full sm:w-auto justify-center flex-wrap gap-1">
          <button
            onClick={() => setSubTab('top-50-cpc')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
              subTab === 'top-50-cpc'
                ? 'bg-[#1a73e8] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Table className="w-3.5 h-3.5" />
            <span>Top 50 CPC Table (2026)</span>
          </button>

          <button
            onClick={() => setSubTab('education-rpm')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
              subTab === 'education-rpm'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Education RPM Benchmarks</span>
          </button>

          <button
            onClick={() => setSubTab('matrix')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
              subTab === 'matrix'
                ? 'bg-[#9d62ec] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>30+ Curated Niches</span>
          </button>

          <button
            onClick={() => setSubTab('ai-evaluator')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
              subTab === 'ai-evaluator'
                ? 'bg-[#9d62ec] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Evaluator</span>
          </button>

          <button
            onClick={() => setSubTab('kgr')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
              subTab === 'kgr'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Search className="w-3.5 h-3.5" />
            <span>KGR Keyword Finder</span>
          </button>
        </div>
      </div>

      {/* Sub-Tool 1: Top 50 Highest Paying AdSense Niches: 2026 CPC & Profitability Table (KD: 21) */}
      {subTab === 'top-50-cpc' && <Top50NichesTable />}

      {/* Sub-Tool 2: Education Niche AdSense RPM Benchmarks: CPC, Page RPM & Earning Potential (KD: 7) */}
      {subTab === 'education-rpm' && <EducationRpmBenchmarks />}

      {/* Sub-Tool 3: Curated Niche Explorer & Matrix */}
      {subTab === 'matrix' && (
        <NicheExplorer
          niches={NICHES_DATA}
          onSelectNiche={onSelectNiche}
          onSimulateInCalculator={onSimulateInCalculator}
          onOpenAiIdea={() => setSubTab('ai-evaluator')}
        />
      )}

      {/* Sub-Tool 4: AI Idea Feasibility Evaluator */}
      {subTab === 'ai-evaluator' && (
        <AiNicheEvaluator onSimulateRpm={onSimulateInCalculator} />
      )}

      {/* Sub-Tool 5: Keyword Golden Ratio (KGR) Search */}
      {subTab === 'kgr' && <KgrCalculator />}
    </div>
  );
};
