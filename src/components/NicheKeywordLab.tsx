import React, { useState } from 'react';
import { Niche } from '../types';
import { NICHES_DATA } from '../data/nichesData';
import { NicheExplorer } from './NicheExplorer';
import { AiNicheEvaluator } from './AiNicheEvaluator';
import { KgrCalculator } from './KgrCalculator';
import { Sparkles, Compass, Search, Lightbulb } from 'lucide-react';

interface NicheKeywordLabProps {
  initialSubTab?: 'ai-evaluator' | 'matrix' | 'kgr';
  onSelectNiche: (niche: Niche) => void;
  onSimulateInCalculator: (rpm: number) => void;
}

export const NicheKeywordLab: React.FC<NicheKeywordLabProps> = ({
  initialSubTab = 'ai-evaluator',
  onSelectNiche,
  onSimulateInCalculator,
}) => {
  const [subTab, setSubTab] = useState<'ai-evaluator' | 'matrix' | 'kgr'>(initialSubTab);

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
              Niche & Keyword Lab
            </h2>
            <p className="text-[11px] text-slate-500">
              Evaluate custom niches with AI, explore 30+ pre-vetted blueprints, and uncover low-competition KGR keywords.
            </p>
          </div>
        </div>

        {/* 3 Unified Sub-Tabs (Idea Evaluator is 1st) */}
        <div className="flex items-center bg-white p-1 rounded-xl border border-slate-200/80 shadow-xs w-full sm:w-auto justify-center">
          <button
            onClick={() => setSubTab('ai-evaluator')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
              subTab === 'ai-evaluator'
                ? 'bg-[#9d62ec] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Niche Evaluator</span>
          </button>

          <button
            onClick={() => setSubTab('matrix')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
              subTab === 'matrix'
                ? 'bg-[#1a73e8] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>30+ Curated Niches</span>
          </button>

          <button
            onClick={() => setSubTab('kgr')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
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

      {/* Sub-Tool 1: AI Idea Feasibility Evaluator (1st Tool) */}
      {subTab === 'ai-evaluator' && (
        <AiNicheEvaluator onSimulateRpm={onSimulateInCalculator} />
      )}

      {/* Sub-Tool 2: Curated Niche Explorer & Matrix */}
      {subTab === 'matrix' && (
        <NicheExplorer
          niches={NICHES_DATA}
          onSelectNiche={onSelectNiche}
          onSimulateInCalculator={onSimulateInCalculator}
          onOpenAiIdea={() => setSubTab('ai-evaluator')}
        />
      )}

      {/* Sub-Tool 3: Keyword Golden Ratio (KGR) Search */}
      {subTab === 'kgr' && <KgrCalculator />}
    </div>
  );
};
