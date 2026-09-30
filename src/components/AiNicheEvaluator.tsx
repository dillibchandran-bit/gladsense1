import React, { useState } from 'react';
import { AiEvaluationResult } from '../types';
import { evaluateNicheClientSide } from '../services/aiEvaluatorClient';
import {
  Sparkles,
  Loader2,
  CheckCircle2,
  AlertTriangle,
  ShieldCheck,
  DollarSign,
  Cpu,
  TrendingUp,
  Copy,
  Check,
  ExternalLink,
  Receipt,
  Wallet,
  HelpCircle,
  Search,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { KidExplainer } from './KidExplainer';

interface AiNicheEvaluatorProps {
  onSimulateRpm: (rpm: number) => void;
}

export const AiNicheEvaluator: React.FC<AiNicheEvaluatorProps> = ({ onSimulateRpm }) => {
  const [nicheName, setNicheName] = useState<string>('');
  const [targetAudience, setTargetAudience] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<AiEvaluationResult | null>(null);
  const [isAiGenerated, setIsAiGenerated] = useState<boolean>(true);
  const [warningMsg, setWarningMsg] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copiedKeyword, setCopiedKeyword] = useState<string | null>(null);

  const handleEvaluate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nicheName.trim()) return;

    setLoading(true);
    setError(null);
    setWarningMsg(null);

    try {
      let evaluationData: AiEvaluationResult;
      let generatedByAi = true;

      try {
        const res = await fetch('/api/evaluate-niche', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ nicheName, targetAudience, description }),
        });

        if (!res.ok) {
          throw new Error(`Failed to evaluate niche: ${res.statusText}`);
        }

        const data = await res.json();
        evaluationData = data.evaluation;
        generatedByAi = Boolean(data.isAiGenerated);
        if (data.warning) {
          setWarningMsg(data.warning);
        }
      } catch (backendErr) {
        // Fallback to client-side engine for Cloudflare Pages static hosting
        console.warn('Backend unavailable, running GladSense client evaluator engine:', backendErr);
        evaluationData = evaluateNicheClientSide(nicheName, targetAudience, description);
        generatedByAi = false;
      }

      setResult(evaluationData);
      setIsAiGenerated(generatedByAi);
    } catch (err: any) {
      console.error(err);
      setError('Evaluation service was temporarily unable to respond. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (kw: string) => {
    navigator.clipboard.writeText(kw);
    setCopiedKeyword(kw);
    setTimeout(() => setCopiedKeyword(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header (Google Style) */}
      <div className="p-6 rounded-2xl bg-white border border-[#dadce0] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 text-xs font-medium rounded-full bg-[#f3e8ff] text-[#9d62ec] flex items-center gap-1 font-bold">
              <Sparkles className="w-3.5 h-3.5 text-[#9d62ec]" />
              AI Web App Feasibility Evaluator
            </span>
            <span className="text-xs text-[#5f6368] font-normal">• Gemini & Algorithmic Policy Analysis</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-normal text-[#202124] tracking-tight font-['Google_Sans',sans-serif]">
            Web App Idea & AdSense Viability Assessment
          </h2>
          <p className="text-xs sm:text-sm text-[#5f6368] mt-1 max-w-3xl leading-relaxed">
            Test any web application concept, SaaS idea, content platform, or interactive utility against Google AdSense Publisher Policies, estimated Page RPM, low-competition KGR keywords, and $0 hosting feasibility.
          </p>
        </div>
      </div>

      {/* Prominent High-Visibility Search & Evaluation Box (2nd Block - Color #B4E1EB) */}
      <form
        onSubmit={handleEvaluate}
        style={{ backgroundColor: '#B4E1EB' }}
        className="p-6 rounded-2xl border-2 border-[#82cee0] shadow-md shadow-sky-900/5 space-y-4 transition-all"
      >
        {/* Main Search Bar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
              <Search className="w-4 h-4 text-[#0369a1]" />
              <span>Web App Idea, Niche, or Concept *</span>
            </label>
            <span className="text-[11px] text-[#0369a1] font-semibold hidden sm:inline bg-white/80 px-2.5 py-0.5 rounded-md border border-[#82cee0]">
              Instant AdSense policy & RPM feasibility check
            </span>
          </div>

          <div className="relative">
            <input
              type="text"
              required
              value={nicheName}
              onChange={(e) => setNicheName(e.target.value)}
              placeholder="e.g. SaaS invoice generator, developer cheatsheet wiki, remote job board, fitness macro tracker, audio chord library..."
              className="w-full pl-11 pr-4 py-3.5 bg-white border-2 border-[#82cee0]/80 focus:bg-white focus:border-[#0284c7] focus:ring-4 focus:ring-sky-200/50 rounded-xl text-sm sm:text-base text-slate-900 font-medium placeholder-slate-500 transition-all outline-none shadow-xs"
            />
            <Search className="w-5 h-5 text-[#0369a1] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Secondary Inputs: Audience & Content Structure */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-900 flex items-center justify-between">
              <span>Target Audience & User Base</span>
              <span className="text-[10px] font-normal text-slate-700">(Who will use this web app?)</span>
            </label>
            <input
              type="text"
              value={targetAudience}
              onChange={(e) => setTargetAudience(e.target.value)}
              placeholder="e.g. Remote freelancers, college students, software engineers, fitness enthusiasts, small business owners..."
              className="w-full px-3.5 py-2.5 bg-white border border-[#82cee0]/80 focus:bg-white rounded-xl text-xs sm:text-sm text-slate-900 placeholder-slate-500 focus:outline-none focus:border-[#0284c7] focus:ring-2 focus:ring-sky-200/50 transition-colors shadow-2xs"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-900 flex items-center justify-between">
              <span>Core Features & Content Structure</span>
              <span className="text-[10px] font-normal text-slate-700">(Key features, pages, or functionality)</span>
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe key web app features, interactive tools, user dashboards, or educational guides your platform will offer..."
              className="w-full px-3.5 py-2 bg-white border border-[#82cee0]/80 focus:bg-white rounded-xl text-xs sm:text-sm text-slate-900 placeholder-slate-500 focus:outline-none focus:border-[#0284c7] focus:ring-2 focus:ring-sky-200/50 transition-colors shadow-2xs"
            />
          </div>
        </div>

        {/* Action Row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-2 border-t border-[#82cee0]/60">
          <div className="text-xs text-slate-800 font-medium flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#0369a1] shrink-0" />
            <span>Audited against Google AdSense Thin Content, YMYL, Copyright & Value-Add policies.</span>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full sm:w-auto px-7 py-3 bg-[#9d62ec] hover:bg-[#8b4de3] disabled:opacity-50 text-white font-bold text-sm rounded-xl transition-all shadow-md shadow-purple-900/20 hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer active:scale-98"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Auditing Web App Feasibility...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Evaluate Web App Feasibility</span>
              </>
            )}
          </button>
        </div>
      </form>

      {/* 4-Card How-To Guide (3rd Block) */}
      <KidExplainer
        title="Web App Idea Feasibility & Policy Check"
        what="An automated feasibility engine that audits any web app idea, SaaS concept, interactive utility, or content platform against Google AdSense publisher policies, advertiser demand, and organic search competition."
        why="Building and launching a web app requires major engineering and design effort. Testing your concept beforehand ensures you avoid high-risk YMYL policies, low advertiser bidding, and Google's Thin Content rejections."
        how="Enter your web app idea in the search box above, describe the user base and core functionality, then click 'Evaluate Feasibility'."
        result="Receive a policy approval score (0–100), estimated Page RPM, page-1 KGR keywords, and a tailored monetization and technical hosting blueprint."
      />

      {error && (
        <div className="p-4 bg-rose-50 border border-rose-200 text-rose-800 rounded-2xl text-xs flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Evaluation Results Display */}
      {result && (
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-6">
          {/* Header & Overall Score */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold uppercase tracking-wider text-[#9d62ec]">
                  AdSense Feasibility Report
                </span>
                <span className="text-xs text-slate-400">• {result.nicheName}</span>
                {isAiGenerated ? (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 font-bold border border-purple-200">
                    Live Gemini Evaluation
                  </span>
                ) : (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-bold border border-slate-200">
                    Algorithmic AdSense Auditor
                  </span>
                )}
              </div>
              <h3 className="text-lg font-extrabold text-slate-900">
                Overall Feasibility Score: <span className="text-emerald-700 font-mono">{result.verdictScore}/100</span>
              </h3>
              <p className="text-xs text-slate-600 mt-1 max-w-2xl leading-relaxed">
                {result.verdictReasoning}
              </p>
              {warningMsg && (
                <p className="text-[11px] text-amber-800 mt-1.5 flex items-center gap-1.5 bg-amber-50 px-3 py-1 rounded-xl border border-amber-200 max-w-2xl font-medium">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0"></span>
                  <span>{warningMsg}</span>
                </p>
              )}
            </div>

            <button
              onClick={() => onSimulateRpm(result.estimatedRPM.average)}
              className="px-4 py-2 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-all flex items-center gap-1.5 shrink-0 shadow-xs cursor-pointer"
            >
              <DollarSign className="w-4 h-4" />
              <span>Simulate ${result.estimatedRPM.average} RPM in Calculator</span>
            </button>
          </div>

          {/* AdSense Approval Probability Card */}
          {(() => {
            const approvalRate =
              result.approvalProbability ??
              (result.policyApprovalRisk === 'High' ? 58 : result.policyApprovalRisk === 'Medium' ? 78 : 94);
            const factors = result.approvalFactors ?? {
              policyCompliance: result.policyApprovalRisk === 'High' ? 68 : 96,
              thinContentSafety: 94,
              ymylSafety: result.policyApprovalRisk === 'High' ? 45 : 97,
              commercialDemand: 91,
            };
            const isHigh = approvalRate >= 90;
            const isMed = approvalRate >= 75 && approvalRate < 90;

            return (
              <div
                className={`p-5 rounded-2xl border ${
                  isHigh
                    ? 'bg-emerald-50/40 border-emerald-200'
                    : isMed
                    ? 'bg-purple-50/40 border-purple-200'
                    : 'bg-amber-50/40 border-amber-200'
                } space-y-3 shadow-2xs`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200/80">
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2.5 rounded-xl ${
                        isHigh
                          ? 'bg-emerald-100 text-emerald-700'
                          : isMed
                          ? 'bg-purple-100 text-purple-700'
                          : 'bg-amber-100 text-amber-700'
                      }`}
                    >
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                          AdSense Approval Probability
                        </span>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            isHigh
                              ? 'bg-emerald-100 text-emerald-800'
                              : isMed
                              ? 'bg-purple-100 text-purple-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {isHigh ? 'High Approval Outlook' : isMed ? 'Moderate Approval Outlook' : 'Elevated Policy Risk'}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                        {isHigh
                          ? 'Safe from "Thin Content" and YMYL algorithmic filters when structured with 15+ tool pages and 800+ words of explanatory theory.'
                          : isMed
                          ? 'Moderate approval rate. Ensure every calculator is accompanied by detailed formula derivations and worked examples.'
                          : 'Sensitive niche category. High likelihood of automated bot rejection under YMYL or personal advice filters; pivot towards pure mathematical tools.'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-baseline gap-1.5 shrink-0 px-4 py-2 rounded-xl bg-white border border-slate-200 shadow-2xs">
                    <span
                      className={`text-2xl font-black font-mono ${
                        isHigh ? 'text-emerald-700' : isMed ? 'text-purple-700' : 'text-amber-700'
                      }`}
                    >
                      {approvalRate}%
                    </span>
                    <span className="text-xs text-slate-500 font-medium">Likelihood</span>
                  </div>
                </div>

                {/* 4 Factor Bars */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
                  <div className="p-3 rounded-xl bg-white border border-slate-200">
                    <div className="flex justify-between text-slate-600 text-[11px] font-semibold mb-1">
                      <span>Policy Compliance</span>
                      <span className="font-mono text-emerald-700 font-bold">{factors.policyCompliance}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${factors.policyCompliance}%` }} />
                    </div>
                    <span className="text-[9px] text-slate-400 mt-1 block">TOS & Cookie/GDPR</span>
                  </div>

                  <div className="p-3 rounded-xl bg-white border border-slate-200">
                    <div className="flex justify-between text-slate-600 text-[11px] font-semibold mb-1">
                      <span>Thin Content Shield</span>
                      <span className="font-mono text-emerald-700 font-bold">{factors.thinContentSafety}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${factors.thinContentSafety}%` }} />
                    </div>
                    <span className="text-[9px] text-slate-400 mt-1 block">Tool + guide depth</span>
                  </div>

                  <div className="p-3 rounded-xl bg-white border border-slate-200">
                    <div className="flex justify-between text-slate-600 text-[11px] font-semibold mb-1">
                      <span>YMYL Safety</span>
                      <span className="font-mono text-purple-700 font-bold">{factors.ymylSafety}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-purple-500 rounded-full" style={{ width: `${factors.ymylSafety}%` }} />
                    </div>
                    <span className="text-[9px] text-slate-400 mt-1 block">Non-financial/medical</span>
                  </div>

                  <div className="p-3 rounded-xl bg-white border border-slate-200">
                    <div className="flex justify-between text-slate-600 text-[11px] font-semibold mb-1">
                      <span>Advertiser Demand</span>
                      <span className="font-mono text-emerald-700 font-bold">{factors.commercialDemand}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${factors.commercialDemand}%` }} />
                    </div>
                    <span className="text-[9px] text-slate-400 mt-1 block">Active auction demand</span>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* Metrics Matrix */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <div className="flex items-center gap-1.5 text-slate-500 text-xs mb-1 font-semibold">
                <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
                <span>Estimated RPM</span>
              </div>
              <p className="text-lg font-black text-emerald-700">
                ${result.estimatedRPM.min} - ${result.estimatedRPM.max}
              </p>
              <p className="text-[10px] text-slate-400">Avg: ${result.estimatedRPM.average} / 1k views</p>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <div className="flex items-center gap-1.5 text-slate-500 text-xs mb-1 font-semibold">
                <ShieldCheck className="w-3.5 h-3.5 text-purple-600" />
                <span>Competition Level</span>
              </div>
              <p className="text-lg font-black text-slate-900">{result.competitionScore}</p>
              <p className="text-[10px] text-slate-400">Market saturation rate</p>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <div className="flex items-center gap-1.5 text-slate-500 text-xs mb-1 font-semibold">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
                <span>Policy Rejection Risk</span>
              </div>
              <p className="text-lg font-black text-slate-900">{result.policyApprovalRisk}</p>
              <p className="text-[10px] text-slate-400">Thin content & YMYL factor</p>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <div className="flex items-center gap-1.5 text-slate-500 text-xs mb-1 font-semibold">
                <Cpu className="w-3.5 h-3.5 text-emerald-600" />
                <span>Hosting Feasibility</span>
              </div>
              <p className="text-lg font-black text-emerald-700">$0 Static Ready</p>
              <p className="text-[10px] text-slate-400">Cloudflare Pages compatible</p>
            </div>
          </div>

          {/* Details Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
                AdSense Policy Outlook & Risk Guardrails
              </h4>
              <p className="text-slate-600 leading-relaxed">
                {result.policyRiskExplanation}
              </p>
              <p className="text-slate-500 text-[11px] pt-1">
                <strong>Recommended Architecture:</strong> {result.recommendedModel}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
                Search Competition & Dwell Time Strategy
              </h4>
              <p className="text-slate-600 leading-relaxed">
                {result.competitionSummary}
              </p>
              <p className="text-slate-500 text-[11px] pt-1">
                <strong>Session Duration Advantage:</strong> {result.monetizationBlueprint.dwellTimeAdvantage}
              </p>
            </div>
          </div>

          {/* Monthly Budget, Expenses vs Income & Net Profit */}
          {(() => {
            const nums = result.trafficPotentialMonthly?.replace(/,/g, '').match(/\d+/g) || [];
            const estimatedMonthlyViews = nums.length >= 2 ? Math.round((Number(nums[0]) + Number(nums[1])) / 2) : 45000;
            const grossIncome = (estimatedMonthlyViews / 1000) * result.estimatedRPM.average;
            const monthlyExpenses = 0.85; // $10.18/yr domain amortized
            const netProfit = Math.max(0, grossIncome - monthlyExpenses);
            const annualNetProfit = netProfit * 12;
            const netMargin = grossIncome > 0 ? ((netProfit / grossIncome) * 100).toFixed(1) : '0';

            return (
              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
                  <div>
                    <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
                      <Receipt className="w-4 h-4 text-emerald-600" />
                      <span>Estimated Monthly Budget & Net Profitability (Expenses vs. Income)</span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Estimated based on ~{estimatedMonthlyViews.toLocaleString()} monthly visits @ ${result.estimatedRPM.average} benchmark RPM.
                    </p>
                  </div>
                  <span className="px-2.5 py-0.5 text-[10px] font-bold rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                    {netMargin}% Net Margin
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-3.5 rounded-xl bg-emerald-50/50 border border-emerald-200">
                    <span className="text-[11px] text-emerald-800 font-semibold block">Gross Monthly Income</span>
                    <p className="text-xl font-black text-emerald-700 font-mono mt-0.5">
                      +${grossIncome.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </p>
                    <p className="text-[10px] text-slate-500 mt-1">AdSense RPM: ${result.estimatedRPM.average} / 1k</p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-[11px] text-slate-700 font-semibold block">Operating Expenses (Budget)</span>
                    <p className="text-xl font-black text-slate-800 font-mono mt-0.5">
                      -${monthlyExpenses.toFixed(2)}/mo
                    </p>
                    <p className="text-[10px] text-slate-500 mt-1">$10.18/yr domain • $0 hosting</p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-purple-50/60 border border-purple-200">
                    <span className="text-[11px] text-purple-800 font-semibold block">Estimated Net Profit</span>
                    <p className="text-xl font-black text-[#7939d2] font-mono mt-0.5">
                      +${netProfit.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}/mo
                    </p>
                    <p className="text-[10px] text-emerald-700 font-bold mt-1">
                      +${annualNetProfit.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}/yr take-home
                    </p>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* Generated KGR Keywords */}
          {result.kgrKeywords && result.kgrKeywords.length > 0 && (
            <div className="space-y-2.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                Suggested Low-Competition KGR Keywords to Target First
              </h4>

              <div className="overflow-x-auto border border-slate-200 rounded-xl">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-slate-50 text-slate-600 uppercase text-[10px] font-bold">
                    <tr>
                      <th className="p-3 border-b border-slate-200 font-sans">Target Query</th>
                      <th className="p-3 text-center border-b border-slate-200">Search Vol</th>
                      <th className="p-3 text-center border-b border-slate-200">KGR Score</th>
                      <th className="p-3 text-right font-sans border-b border-slate-200">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white">
                    {result.kgrKeywords.map((k, idx) => (
                      <tr key={idx} className="hover:bg-slate-50">
                        <td className="p-3 text-slate-800 font-sans font-medium">{k.keyword}</td>
                        <td className="p-3 text-center text-slate-600">{k.estimatedVolume}</td>
                        <td className="p-3 text-center text-emerald-700 font-bold">
                          {k.kgrScore.toFixed(2)}
                        </td>
                        <td className="p-3 text-right font-sans">
                          <div className="flex items-center justify-end gap-1.5">
                            <a
                              href={`https://www.google.com/search?q=allintitle:%22${encodeURIComponent(k.keyword)}%22`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-2.5 py-1 bg-slate-100 hover:bg-purple-50 hover:text-[#9d62ec] hover:border-purple-200 border border-slate-200 text-slate-700 rounded-full text-[11px] inline-flex items-center gap-1 font-semibold transition-colors shadow-2xs"
                              title="Verify AllInTitle Live on Google"
                            >
                              <ExternalLink className="w-3 h-3 text-purple-600" />
                              <span className="hidden sm:inline">Google Live</span>
                            </a>
                            <button
                              onClick={() => handleCopy(k.keyword)}
                              className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full text-[11px] inline-flex items-center gap-1 font-semibold transition-colors shadow-2xs cursor-pointer"
                            >
                              {copiedKeyword === k.keyword ? (
                                <>
                                  <Check className="w-3 h-3 text-emerald-600" />
                                  <span className="text-emerald-700">Copied</span>
                                </>
                              ) : (
                                <>
                                  <Copy className="w-3 h-3 text-slate-400" />
                                  <span>Copy</span>
                                </>
                              )}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
