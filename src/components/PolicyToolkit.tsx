import React, { useState } from 'react';
import { AuditItem } from '../types';
import { AdSenseAudit } from './AdSenseAudit';
import { SingleClickSolutions } from './SingleClickSolutions';
import { ShieldCheck, Zap, FileCheck, CheckCircle2 } from 'lucide-react';

interface PolicyToolkitProps {
  checklist: AuditItem[];
  onToggleItem: (id: string) => void;
  initialSubTab?: 'checklist' | 'generators';
}

export const PolicyToolkit: React.FC<PolicyToolkitProps> = ({
  checklist,
  onToggleItem,
  initialSubTab = 'checklist',
}) => {
  const [subTab, setSubTab] = useState<'checklist' | 'generators'>(initialSubTab);

  const passedCount = checklist.filter((item) => item.isPassed).length;
  const scorePercent = Math.round((passedCount / checklist.length) * 100);

  return (
    <div className="space-y-6">
      {/* Top Unified Suite Navigation Bar */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-2 sm:p-2.5 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs">
        <div className="flex items-center gap-2 pl-2">
          <div className="w-8 h-8 rounded-xl bg-purple-50 text-[#9d62ec] flex items-center justify-center font-bold border border-purple-200">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-900 leading-tight">
              Policy & 1-Click Toolkit
            </h2>
            <p className="text-[11px] text-slate-500">
              Audit your domain against Google Publisher Policies and deploy instant 1-click code fixes.
            </p>
          </div>
        </div>

        {/* 2 Unified Sub-Tabs */}
        <div className="flex items-center bg-white p-1 rounded-xl border border-slate-200/80 shadow-xs w-full sm:w-auto justify-center">
          <button
            onClick={() => setSubTab('checklist')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
              subTab === 'checklist'
                ? 'bg-[#1a73e8] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <FileCheck className="w-3.5 h-3.5" />
            <span>20-Point Checklist ({scorePercent}%)</span>
          </button>

          <button
            onClick={() => setSubTab('generators')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
              subTab === 'generators'
                ? 'bg-[#9d62ec] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Zap className="w-3.5 h-3.5 text-amber-300" />
            <span>1-Click Code & Legal Generators</span>
          </button>
        </div>
      </div>

      {/* Sub-Tool 1: 20-Point Compliance Audit Checklist */}
      {subTab === 'checklist' && (
        <AdSenseAudit
          checklist={checklist}
          onToggleItem={onToggleItem}
        />
      )}

      {/* Sub-Tool 2: 1-Click Code Solutions & Generators */}
      {subTab === 'generators' && <SingleClickSolutions />}
    </div>
  );
};
