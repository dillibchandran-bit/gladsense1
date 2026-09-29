import React, { useState } from 'react';
import { RevenueCalculator } from './RevenueCalculator';
import { BudgetBlueprint } from './BudgetBlueprint';
import { DollarSign, PieChart, TrendingUp, Server, ShieldCheck } from 'lucide-react';

interface RevenueProfitPlannerProps {
  initialRpm?: number;
  initialSubTab?: 'revenue-sim' | 'zero-cost-pnl';
}

export const RevenueProfitPlanner: React.FC<RevenueProfitPlannerProps> = ({
  initialRpm = 20,
  initialSubTab = 'revenue-sim',
}) => {
  const [subTab, setSubTab] = useState<'revenue-sim' | 'zero-cost-pnl'>(initialSubTab);

  return (
    <div className="space-y-6">
      {/* Top Unified Suite Navigation Bar */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-2 sm:p-2.5 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs">
        <div className="flex items-center gap-2 pl-2">
          <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold border border-emerald-200">
            <DollarSign className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-900 leading-tight">
              Revenue & Profit Planner
            </h2>
            <p className="text-[11px] text-slate-500">
              Model traffic earnings and preserve 98%+ net margins with our $10/year zero-server stack.
            </p>
          </div>
        </div>

        {/* 2 Unified Sub-Tabs */}
        <div className="flex items-center bg-white p-1 rounded-xl border border-slate-200/80 shadow-xs w-full sm:w-auto justify-center">
          <button
            onClick={() => setSubTab('revenue-sim')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
              subTab === 'revenue-sim'
                ? 'bg-[#1a73e8] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Traffic & RPM Simulator</span>
          </button>

          <button
            onClick={() => setSubTab('zero-cost-pnl')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
              subTab === 'zero-cost-pnl'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Server className="w-3.5 h-3.5" />
            <span>$10/yr Zero-Cost P&L Stack</span>
          </button>
        </div>
      </div>

      {/* Sub-Tool 1: Traffic & RPM Earnings Simulator */}
      {subTab === 'revenue-sim' && <RevenueCalculator initialRpm={initialRpm} />}

      {/* Sub-Tool 2: $10/yr Edge Stack vs WordPress Budget P&L */}
      {subTab === 'zero-cost-pnl' && <BudgetBlueprint />}
    </div>
  );
};
