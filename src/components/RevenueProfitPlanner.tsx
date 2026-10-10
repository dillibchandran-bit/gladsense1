import React, { useState } from 'react';
import { RevenueCalculator } from './RevenueCalculator';
import { BudgetBlueprint } from './BudgetBlueprint';
import { RpmCpmCalculator } from './RpmCpmCalculator';
import { DollarSign, PieChart, TrendingUp, Server, ShieldCheck, Calculator } from 'lucide-react';

interface RevenueProfitPlannerProps {
  initialRpm?: number;
  initialSubTab?: 'revenue-sim' | 'visitors-1000' | 'rpm-cpm-calc' | 'zero-cost-pnl';
}

export const RevenueProfitPlanner: React.FC<RevenueProfitPlannerProps> = ({
  initialRpm = 20,
  initialSubTab = 'revenue-sim',
}) => {
  const [subTab, setSubTab] = useState<'revenue-sim' | 'visitors-1000' | 'rpm-cpm-calc' | 'zero-cost-pnl'>(initialSubTab);

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
              Google AdSense Revenue &amp; Profit Planner
            </h2>
            <p className="text-[11px] text-slate-500">
              Calculate revenue by niche (2026 Estimator), payout per 1,000 visitors, RPM vs CPM vs CPC formulas, and zero-cost hosting P&amp;L.
            </p>
          </div>
        </div>

        {/* 4 Unified Sub-Tabs */}
        <div className="flex items-center bg-white p-1 rounded-xl border border-slate-200/80 shadow-xs w-full sm:w-auto justify-center flex-wrap gap-1">
          <button
            onClick={() => setSubTab('revenue-sim')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
              subTab === 'revenue-sim'
                ? 'bg-[#1a73e8] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Revenue by Niche</span>
          </button>

          <button
            onClick={() => setSubTab('visitors-1000')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
              subTab === 'visitors-1000'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <DollarSign className="w-3.5 h-3.5" />
            <span>Pay for 1,000 Visitors</span>
          </button>

          <button
            onClick={() => setSubTab('rpm-cpm-calc')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
              subTab === 'rpm-cpm-calc'
                ? 'bg-[#9d62ec] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Calculator className="w-3.5 h-3.5" />
            <span>RPM vs CPM vs CPC Calculator</span>
          </button>

          <button
            onClick={() => setSubTab('zero-cost-pnl')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
              subTab === 'zero-cost-pnl'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Server className="w-3.5 h-3.5" />
            <span>$10/yr Zero-Cost P&amp;L Stack</span>
          </button>
        </div>
      </div>

      {/* Sub-Tool 1: Traffic & RPM Earnings Simulator (KD: 18) */}
      {subTab === 'revenue-sim' && <RevenueCalculator initialRpm={initialRpm} />}

      {/* Sub-Tool 2: Pay for 1,000 Visitors (KD: 10) */}
      {subTab === 'visitors-1000' && <RevenueCalculator initialRpm={initialRpm} focusVisitorCalculator={true} />}

      {/* Sub-Tool 3: RPM vs CPM vs CPC Formula Calculator (KD: 6) */}
      {subTab === 'rpm-cpm-calc' && <RpmCpmCalculator />}

      {/* Sub-Tool 4: $10/yr Edge Stack vs WordPress Budget P&L */}
      {subTab === 'zero-cost-pnl' && <BudgetBlueprint />}
    </div>
  );
};
