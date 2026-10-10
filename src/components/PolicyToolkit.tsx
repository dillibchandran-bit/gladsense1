import React, { useState } from 'react';
import { AuditItem } from '../types';
import { AdSenseComplianceAuditFramework } from './AdSenseComplianceAuditFramework';
import { ContentDevelopmentSop } from './ContentDevelopmentSop';
import { SingleClickSolutions } from './SingleClickSolutions';
import { ShieldCheck, Zap, FileCheck, BookOpen, Layers } from 'lucide-react';

interface PolicyToolkitProps {
  checklist?: AuditItem[];
  onToggleItem?: (id: string) => void;
  initialSubTab?: 'audit-sop' | 'content-sop' | 'generators';
}

export const PolicyToolkit: React.FC<PolicyToolkitProps> = ({
  initialSubTab = 'audit-sop',
}) => {
  const [subTab, setSubTab] = useState<'audit-sop' | 'content-sop' | 'generators'>(initialSubTab);

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
              AdSense Compliance &amp; Editorial SOP Suite
            </h2>
            <p className="text-[11px] text-slate-500">
              Audit domains against the 100-Point AdSense Pre-Submission SOP, verify E-E-A-T standards, and generate the 5 mandatory trust pages with free legal templates.
            </p>
          </div>
        </div>

        {/* 3 Unified Operational Sub-Tabs */}
        <div className="flex items-center bg-white p-1 rounded-xl border border-slate-200/80 shadow-xs w-full sm:w-auto justify-center flex-wrap gap-1">
          <button
            onClick={() => setSubTab('audit-sop')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
              subTab === 'audit-sop'
                ? 'bg-[#1a73e8] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <FileCheck className="w-3.5 h-3.5" />
            <span>AdSense Pre-Submission Audit (100-Pt SOP)</span>
          </button>

          <button
            onClick={() => setSubTab('content-sop')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
              subTab === 'content-sop'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Content Development SOP (E-E-A-T)</span>
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
            <span>5 Mandatory Trust Pages (Free Templates)</span>
          </button>
        </div>
      </div>

      {/* Sub-Tool 1: Google AdSense Compliance & Pre-Submission Audit Framework (100-Pt SOP) */}
      {subTab === 'audit-sop' && <AdSenseComplianceAuditFramework />}

      {/* Sub-Tool 2: Content Development SOP & Interactive Pre-Publishing Checklist (SOP v2.0) */}
      {subTab === 'content-sop' && <ContentDevelopmentSop />}

      {/* Sub-Tool 3: 1-Click Code Solutions & Legal Suite */}
      {subTab === 'generators' && <SingleClickSolutions />}
    </div>
  );
};
