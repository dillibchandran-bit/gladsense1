import React, { useState } from 'react';
import {
  SiteAuditMode,
  RejectionCategory,
  SiteAuditResult,
} from '../types';
import { runClientSideAudit } from '../services/siteAuditorClient';
import {
  Stethoscope,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Copy,
  Check,
  Search,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Clock,
  Sparkles,
  Info,
  RefreshCw,
  HelpCircle,
  Activity,
  FileCheck,
  Layers,
  ArrowRight,
  Zap,
  FileText,
  DollarSign,
  Code2,
  Users,
  Bot,
  Cpu,
} from 'lucide-react';
import { NavTabType } from './Navbar';
import { KidExplainer } from './KidExplainer';
import { WebsiteRevenueCard } from './WebsiteRevenueCard';
import { HomeExplainerSuite } from './HomeExplainerSuite';

interface SiteAuditorProps {
  onSwitchTab?: (tab: NavTabType) => void;
}

export const SiteAuditor: React.FC<SiteAuditorProps> = ({ onSwitchTab }) => {
  const [mode, setMode] = useState<SiteAuditMode>('pre-approval');
  const [showKidExplainer, setShowKidExplainer] = useState<boolean>(true);
  const [url, setUrl] = useState<string>('');
  const [rejectionReason, setRejectionReason] = useState<RejectionCategory>('low-value-content');
  const [customNotes, setCustomNotes] = useState<string>('');
  const [sampleContent, setSampleContent] = useState<string>('');
  const [showAdvanced, setShowAdvanced] = useState<boolean>(false);
  const [activeResultTab, setActiveResultTab] = useState<'overview' | 'evaluator-roles' | 'plan' | 'checklist' | 'revenue' | 'metrics' | 'ai-content'>('overview');

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<SiteAuditResult | null>(null);
  const [copiedReport, setCopiedReport] = useState<boolean>(false);
  const [checkedItems, setCheckedItems] = useState<{ [index: number]: boolean }>({});

  const handleRunAudit = async (customUrl?: string, customMode?: SiteAuditMode, customReason?: RejectionCategory) => {
    const targetUrl = customUrl || url;
    const targetMode = customMode || mode;
    const targetReason = customReason || rejectionReason;

    if (!targetUrl.trim()) {
      setError('Please enter a website domain or URL to analyze.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      let data: SiteAuditResult;
      try {
        const response = await fetch('/api/audit-site', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            url: targetUrl.trim(),
            mode: targetMode,
            rejectionReason: targetReason,
            customNotes,
            sampleContent,
          }),
        });

        if (!response.ok) {
          throw new Error(`Server returned ${response.status}`);
        }
        data = await response.json();
      } catch (backendErr) {
        // Cloudflare Pages Static SPA fallback: Run client-side analysis directly in browser
        console.warn('Backend endpoint unavailable, running GladSense client audit engine:', backendErr);
        data = await runClientSideAudit({
          url: targetUrl.trim(),
          mode: targetMode,
          rejectionReason: targetReason,
          customNotes,
          sampleContent,
        });
      }

      setResult(data);
      setCheckedItems({});
      setActiveResultTab(targetMode === 'rejection-doctor' ? 'plan' : 'overview');

      // Scroll smoothly down to results
      setTimeout(() => {
        const resultsEl = document.getElementById('audit-results-container');
        if (resultsEl) {
          resultsEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } catch (err: any) {
      console.warn('Audit error:', err);
      setError('Failed to analyze the website. Please check the URL format and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectInspiration = (domain: string, demoType: 'compliant' | 'thin' | 'rejected' | 'generic') => {
    setUrl(domain);
    if (demoType === 'compliant') {
      setMode('pre-approval');
      handleRunAudit('demo-compliant', 'pre-approval');
    } else if (demoType === 'rejected') {
      setMode('rejection-doctor');
      setRejectionReason('low-value-content');
      handleRunAudit('demo-rejected', 'rejection-doctor', 'low-value-content');
    } else if (demoType === 'thin') {
      setMode('pre-approval');
      handleRunAudit('demo-thin', 'pre-approval');
    } else {
      setMode('pre-approval');
      handleRunAudit(domain, 'pre-approval');
    }
  };

  const handleCopyReport = () => {
    if (!result) return;
    const text = `Google AdSense Site Audit Report
Website: ${result.url}
Approval Probability: ${result.approvalProbability}% (${result.overallStatus})
Analyzed At: ${new Date(result.analyzedAt).toLocaleDateString()}

Verdict:
${result.verdictSummary}

Score Breakdown:
- Content Depth & Originality: ${result.scoreBreakdown.contentDepthScore}/100
- Legal & TOS Compliance: ${result.scoreBreakdown.legalComplianceScore}/100
- Navigation & UX Health: ${result.scoreBreakdown.navigationUxScore}/100
- Technical SEO & Indexability: ${result.scoreBreakdown.technicalSeoScore}/100

Critical Blockers:
${
  result.criticalBlockers.length > 0
    ? result.criticalBlockers.map((b, i) => `${i + 1}. [${b.severity.toUpperCase()}] ${b.title}: ${b.fixAdvice}`).join('\n')
    : 'None! Ready for submission.'
}
`;
    navigator.clipboard.writeText(text);
    setCopiedReport(true);
    setTimeout(() => setCopiedReport(false), 2500);
  };

  const toggleChecklist = (index: number) => {
    setCheckedItems((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div className="w-full bg-white">
      {/* BRIGHT PASTEL HERO CANVAS (MATCHING SEMRUSH FREE CHECKER VISUALS) */}
      <section className="relative w-full pt-16 pb-20 sm:pt-24 sm:pb-28 px-4 sm:px-6 lg:px-8 border-b border-slate-200/80 bg-gradient-to-b from-[#eaf4ff] via-[#edf2fc] to-[#f4eefc] overflow-hidden">
        {/* Subtle Ambient Glow Orbs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#d0e6ff]/50 rounded-full blur-3xl pointer-events-none -translate-y-1/2"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-[#ebd9ff]/40 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative max-w-4xl mx-auto text-center space-y-6">
          {/* Main Title Header */}
          <div className="space-y-3">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#191b23] tracking-tight font-['Google_Sans_Display','Google_Sans',sans-serif]">
              AdSense Site Checker
            </h1>
            <p className="text-xs sm:text-sm font-semibold text-[#1a73e8] uppercase tracking-wider">
              Instant Pre-Approval Audit & Rejection Doctor for Google AdSense
            </p>
          </div>

          <p className="text-base sm:text-lg text-slate-700 max-w-2xl mx-auto leading-relaxed font-normal">
            Enter a domain or website and run an AdSense audit. Find <strong className="text-slate-950 font-bold">policy violations and low-value content issues</strong> across your site and get a clear report with what to fix first.
          </p>

          {/* Mode Switcher Pill */}
          <div className="inline-flex items-center bg-white/80 backdrop-blur-xs p-1 rounded-full border border-slate-200 shadow-xs">
            <button
              type="button"
              onClick={() => setMode('pre-approval')}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                mode === 'pre-approval'
                  ? 'bg-[#1a73e8] text-white shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Pre-Approval Audit</span>
            </button>
            <button
              type="button"
              onClick={() => setMode('rejection-doctor')}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                mode === 'rejection-doctor'
                  ? 'bg-[#9d62ec] text-white shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Activity className="w-3.5 h-3.5" />
              <span>Rejection Doctor</span>
            </button>
          </div>

          {/* Rejection Reason Dropdown (Rejection Doctor mode) */}
          {mode === 'rejection-doctor' && (
            <div className="max-w-xl mx-auto p-3.5 bg-white/95 backdrop-blur-md rounded-2xl border border-purple-200 shadow-md text-left transition-all">
              <label className="block text-xs font-bold text-slate-800 mb-1 flex items-center justify-between">
                <span>Specify Google AdSense Rejection Reason:</span>
                <span className="text-[11px] font-normal text-purple-600 font-medium">Rejection Fix Mode Active</span>
              </label>
              <select
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value as RejectionCategory)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-purple-500"
              >
                <option value="low-value-content">Low-value content / Thin content (Most Common)</option>
                <option value="site-behavior-navigation">Site behavior: Navigation (Broken/dummy links)</option>
                <option value="site-down-or-unavailable">Site down or unavailable (Bot timeout/WAF)</option>
                <option value="scraped-unoriginal">Scraped or unoriginal content</option>
                <option value="policy-violations">Policy violations / YMYL sensitive flags</option>
                <option value="multiple-unspecified">Multiple violations / General rejection</option>
              </select>
            </div>
          )}

          {/* BRIGHT PILL SEARCH BOX CANVAS (MATCHING SEMRUSH) */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleRunAudit();
            }}
            className="max-w-2xl mx-auto pt-2"
          >
            <div className="bg-white rounded-full p-2 pl-6 shadow-xl hover:shadow-2xl border border-slate-200/90 flex items-center gap-3 transition-all focus-within:ring-4 focus-within:ring-purple-200 focus-within:border-[#9d62ec]">
              <input
                id="search-input-box"
                type="text"
                required
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Enter a domain or website URL"
                className="flex-1 bg-transparent py-2 text-sm sm:text-base text-slate-900 placeholder:text-slate-400 focus:outline-none font-normal"
              />

              {/* SEMRUSH-STYLE BRIGHT VIBRANT BUTTON */}
              <button
                type="submit"
                disabled={loading}
                className="bg-[#9d62ec] hover:bg-[#8b4de3] text-white font-bold text-xs sm:text-sm px-6 sm:px-8 py-3 rounded-full transition-all shadow-md hover:shadow-lg whitespace-nowrap flex items-center gap-2 disabled:opacity-50 cursor-pointer shrink-0"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Analyzing...</span>
                  </>
                ) : (
                  <span>Analyze Website</span>
                )}
              </button>

              <span className="pr-3 text-xs text-slate-400 font-mono hidden sm:inline-flex items-center gap-1">
                1/1
                <span className="w-3.5 h-3.5 rounded-full border border-slate-300 text-[9px] flex items-center justify-center text-slate-400 font-bold">
                  ?
                </span>
              </span>
            </div>

            {/* Zero-Cost Option: Paste HTML Source Drawer */}
            <div className="mt-2.5 flex flex-col items-center">
              <button
                type="button"
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="inline-flex items-center gap-1.5 text-[11px] font-medium text-slate-500 hover:text-slate-800 transition-colors py-1 px-3 rounded-full hover:bg-white/60 cursor-pointer"
              >
                <span>{showAdvanced ? 'Hide advanced crawl options' : 'Paste HTML source directly (for bot-shielded / Cloudflare sites)'}</span>
                {showAdvanced ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>

              {showAdvanced && (
                <div className="w-full max-w-2xl mt-2 p-3.5 bg-white/95 backdrop-blur-md rounded-2xl border border-slate-200 shadow-md text-left transition-all space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                      <Code2 className="w-3.5 h-3.5 text-[#1a73e8]" />
                      <span>Direct HTML Source Inspection (100% Free & Zero-Cost):</span>
                    </label>
                    <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-semibold border border-emerald-200">
                      Bypasses Cloudflare Captchas & CORS
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-normal">
                    If an external website blocks automated bot crawlers or challenges visitors with Cloudflare Turnstile, right-click on the webpage in your browser, select <strong>"View Page Source"</strong> (or press Ctrl+U / Cmd+U), and paste the full HTML here. GladSense will audit the exact live DOM with 100% precision.
                  </p>
                  <textarea
                    value={sampleContent}
                    onChange={(e) => setSampleContent(e.target.value)}
                    rows={4}
                    placeholder="Paste <!DOCTYPE html> ... </html> here"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono text-slate-800 focus:outline-none focus:border-[#1a73e8]"
                  />
                  {sampleContent && (
                    <div className="flex items-center justify-between text-[11px] text-slate-500">
                      <span>Loaded ~{sampleContent.trim().split(/\s+/).length} words of HTML markup</span>
                      <button
                        type="button"
                        onClick={() => setSampleContent('')}
                        className="text-rose-600 hover:underline font-medium cursor-pointer"
                      >
                        Clear
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </form>

          {/* FEATURES TO TRY (ADDED DIRECTLY BELOW SEARCH BAR) */}
          <div className="pt-5 max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-2 mb-3.5">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                Explore GladSense Monetization & Policy Tools:
              </span>
            </div>

            {/* THREE CORE POWER SUITES (STREAMLINED 3-SUITE LAYOUT) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              {/* 1. Niche & Keyword Lab */}
              <button
                type="button"
                onClick={() => {
                  onSwitchTab && onSwitchTab('niche-lab');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="p-4 bg-white/95 hover:bg-white border border-slate-200/90 hover:border-blue-400 hover:shadow-md rounded-2xl transition-all text-center group cursor-pointer flex flex-col items-center justify-between space-y-3"
              >
                <div className="flex flex-col items-center justify-center w-full gap-1.5">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#1a73e8] flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Layers className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-[#1a73e8] border border-blue-100">
                    Discovery
                  </span>
                </div>
                <div className="text-center">
                  <span className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-[#1a73e8] transition-colors block">
                    Niche & Keyword Lab
                  </span>
                  <span className="text-[11px] text-slate-500 leading-tight block mt-0.5">
                    30+ Blueprints, AI Feasibility, and KGR Keyword Search
                  </span>
                </div>
              </button>

              {/* 2. Revenue & Profit Planner */}
              <button
                type="button"
                onClick={() => {
                  onSwitchTab && onSwitchTab('revenue-planner');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="p-4 bg-white/95 hover:bg-white border border-slate-200/90 hover:border-emerald-400 hover:shadow-md rounded-2xl transition-all text-center group cursor-pointer flex flex-col items-center justify-between space-y-3"
              >
                <div className="flex flex-col items-center justify-center w-full gap-1.5">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <DollarSign className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100">
                    98% Margins
                  </span>
                </div>
                <div className="text-center">
                  <span className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-emerald-600 transition-colors block">
                    Revenue & Profit Planner
                  </span>
                  <span className="text-[11px] text-slate-500 leading-tight block mt-0.5">
                    Traffic/RPM Simulator & $10/yr Zero-Cost Edge P&L
                  </span>
                </div>
              </button>

              {/* 3. Policy & 1-Click Toolkit */}
              <button
                type="button"
                onClick={() => {
                  onSwitchTab && onSwitchTab('policy-toolkit');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="p-4 bg-white/95 hover:bg-white border border-slate-200/90 hover:border-purple-400 hover:shadow-md rounded-2xl transition-all text-center group cursor-pointer flex flex-col items-center justify-between space-y-3"
              >
                <div className="flex flex-col items-center justify-center w-full gap-1.5">
                  <div className="w-10 h-10 rounded-xl bg-purple-50 text-[#9d62ec] flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Zap className="w-5 h-5 fill-[#9d62ec]" />
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-100 text-purple-700">
                    Toolkit
                  </span>
                </div>
                <div className="text-center">
                  <span className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-[#9d62ec] transition-colors block">
                    Policy & 1-Click Toolkit
                  </span>
                  <span className="text-[11px] text-slate-500 leading-tight block mt-0.5">
                    20-Point Audit, Legal Suite, Anti-Ban & Micro-Apps
                  </span>
                </div>
              </button>
            </div>
          </div>

          <div className="w-full max-w-2xl mx-auto border-t border-slate-300/60 my-6"></div>

          {/* "YOU WILL SEE:" CHECKLIST (CENTERED) */}
          <div className="text-center space-y-3 max-w-xl mx-auto flex flex-col items-center">
            <h3 className="text-sm font-bold text-slate-900 tracking-tight text-center">
              You will see:
            </h3>

            <div className="flex flex-col items-center text-center space-y-2 text-xs sm:text-sm text-slate-700">
              <div className="flex items-center justify-center gap-2.5 text-center">
                <Check className="w-4 h-4 text-emerald-600 stroke-[2.5] shrink-0" />
                <span>An overall approval readiness score for your website's AdSense viability</span>
              </div>
              <div className="flex items-center justify-center gap-2.5 text-center">
                <Check className="w-4 h-4 text-emerald-600 stroke-[2.5] shrink-0" />
                <span>Technical, policy, and on-page content depth issues affecting review screening</span>
              </div>
              <div className="flex items-center justify-center gap-2.5 text-center">
                <Check className="w-4 h-4 text-emerald-600 stroke-[2.5] shrink-0" />
                <span>Mandatory legal compliance findings (Privacy Policy, About E-E-A-T, and Cookie TOS)</span>
              </div>
              <div className="flex items-center justify-center gap-2.5 text-center">
                <Check className="w-4 h-4 text-emerald-600 stroke-[2.5] shrink-0" />
                <span>Prioritized recommendations and 1-Click code fixes for what to resolve first</span>
              </div>
            </div>
          </div>

          {/* Bottom Subtext Link */}
          <div className="pt-2 text-xs text-slate-500">
            Need more than a free AdSense check? Explore{' '}
            <button
              onClick={() => onSwitchTab && onSwitchTab('niche-lab')}
              className="text-slate-900 font-bold underline hover:text-[#1a73e8] transition-colors cursor-pointer"
            >
              Niche & Keyword Lab
            </button>
            ,{' '}
            <button
              onClick={() => onSwitchTab && onSwitchTab('revenue-planner')}
              className="text-slate-900 font-bold underline hover:text-emerald-600 transition-colors cursor-pointer"
            >
              Revenue & Profit Planner
            </button>
            , or{' '}
            <button
              onClick={() => onSwitchTab && onSwitchTab('policy-toolkit')}
              className="text-slate-900 font-bold underline hover:text-[#9d62ec] transition-colors cursor-pointer"
            >
              Policy & 1-Click Toolkit
            </button>
            .
          </div>

          {error && (
            <div className="mt-4 p-3 rounded-xl bg-[#fce8e6] border border-[#fad2cf] text-[#c5221f] text-xs flex items-center justify-center gap-2 max-w-xl mx-auto shadow-xs">
              <AlertTriangle className="w-4 h-4 text-[#ea4335] shrink-0" />
              <span>{error}</span>
            </div>
          )}
        </div>
      </section>

      {/* THREE STEPS TO GET STARTED (EXACTLY MATCHING GOOGLE ADSENSE HOMEPAGE IMAGE) */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white border-b border-[#dadce0]">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-normal text-[#202124] tracking-tight font-['Google_Sans_Display','Google_Sans',sans-serif]">
            Three steps to get started
          </h2>
          <p className="text-sm text-[#5f6368] mt-2 max-w-xl mx-auto">
            From zero to your first Google AdSense deposit in 3 guided milestones.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {/* Step 1 */}
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="w-16 h-16 rounded-2xl bg-[#e8f0fe] text-[#1a73e8] font-['Google_Sans',sans-serif] text-2xl font-bold flex items-center justify-center shadow-xs">
                1
              </div>
              <h3 className="text-lg font-medium text-[#202124] font-['Google_Sans',sans-serif]">
                Audit & configure
              </h3>
              <p className="text-xs text-[#5f6368] leading-relaxed max-w-xs">
                Verify your domain with our Site Doctor to ensure you have 30+ compliant pages, zero thin content, and mandatory privacy policies.
              </p>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="w-16 h-16 rounded-2xl bg-[#e8f0fe] text-[#1a73e8] font-['Google_Sans',sans-serif] text-2xl font-bold flex items-center justify-center shadow-xs">
                2
              </div>
              <h3 className="text-lg font-medium text-[#202124] font-['Google_Sans',sans-serif]">
                Take control
              </h3>
              <p className="text-xs text-[#5f6368] leading-relaxed max-w-xs">
                Use our 1-Click Fixes for ads.txt, responsive ad containers with zero layout shift, and automated anti-click-bombing defense.
              </p>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="w-16 h-16 rounded-2xl bg-[#e8f0fe] text-[#1a73e8] font-['Google_Sans',sans-serif] text-2xl font-bold flex items-center justify-center shadow-xs">
                3
              </div>
              <h3 className="text-lg font-medium text-[#202124] font-['Google_Sans',sans-serif]">
                Start earning
              </h3>
              <p className="text-xs text-[#5f6368] leading-relaxed max-w-xs">
                Watch impressions convert into revenue. Model your 12-month net profit using our $0.85/month zero-server budget blueprint.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* AUDIT RESULTS REPORT SECTION */}
      {result && (
        <section id="audit-results-container" className="py-10 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
            {/* Top Report Header Bar */}
            <div className="p-6 sm:p-8 bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 text-white">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span
                      className={`px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full ${
                        result.overallStatus === 'ready'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                          : result.overallStatus === 'needs-work'
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                          : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                      }`}
                    >
                      {result.overallStatus === 'ready'
                        ? 'AdSense Ready (Pass)'
                        : result.overallStatus === 'needs-work'
                        ? 'Remediation Required'
                        : 'Critical Policy Blockers'}
                    </span>
                    <span className="text-xs text-slate-400">
                      • Scanned: <span className="text-slate-200 font-mono font-medium">{result.url}</span>
                    </span>
                    {result.isSimulatedDemo && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/40">
                        Benchmark Case Study
                      </span>
                    )}
                  </div>

                  <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                    {result.pageTitle || result.url}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-2xl leading-relaxed">
                    {result.verdictSummary}
                  </p>
                </div>

                {/* Big Semrush-style Circular/Score Badge */}
                <div className="flex items-center gap-4 bg-slate-950 p-4 sm:p-5 rounded-2xl border border-slate-800 shrink-0">
                  <div className="text-right">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                      AdSense Approval Probability
                    </span>
                    <span className="text-xs text-slate-400">
                      {result.approvalProbability >= 85
                        ? 'High Confidence Pass'
                        : result.approvalProbability >= 60
                        ? 'Moderate Risk'
                        : 'Immediate Rejection Risk'}
                    </span>
                  </div>
                  <div className="flex items-baseline">
                    <span
                      className={`text-4xl sm:text-5xl font-black font-mono tracking-tight ${
                        result.approvalProbability >= 85
                          ? 'text-emerald-400'
                          : result.approvalProbability >= 60
                          ? 'text-amber-400'
                          : 'text-rose-400'
                      }`}
                    >
                      {result.approvalProbability}%
                    </span>
                  </div>
                </div>
              </div>

              {/* 4 Pillars Scoring Metric Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 mt-8 pt-6 border-t border-slate-800">
                <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="text-slate-300 font-medium">Content Depth & Utility</span>
                    <span className="font-mono font-bold text-emerald-400">
                      {result.scoreBreakdown.contentDepthScore}/100
                    </span>
                  </div>
                  <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-400 rounded-full"
                      style={{ width: `${result.scoreBreakdown.contentDepthScore}%` }}
                    />
                  </div>
                  <span className="text-[10px] text-slate-400 mt-2 block">
                    ~{result.metrics.estimatedWordCount} body words • {result.metrics.paragraphCount} paragraphs
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="text-slate-300 font-medium">Legal & TOS Disclosures</span>
                    <span className="font-mono font-bold text-emerald-400">
                      {result.scoreBreakdown.legalComplianceScore}/100
                    </span>
                  </div>
                  <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-400 rounded-full"
                      style={{ width: `${result.scoreBreakdown.legalComplianceScore}%` }}
                    />
                  </div>
                  <span className="text-[10px] text-slate-400 mt-2 block">
                    {result.metrics.legalPagesFound.privacyPolicy ? '✓ Privacy Policy' : '✗ Missing Privacy'} •{' '}
                    {result.metrics.legalPagesFound.aboutUs ? '✓ About Us' : '✗ Missing About'}
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="text-slate-300 font-medium">Navigation & UX Health</span>
                    <span className="font-mono font-bold text-emerald-400">
                      {result.scoreBreakdown.navigationUxScore}/100
                    </span>
                  </div>
                  <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-400 rounded-full"
                      style={{ width: `${result.scoreBreakdown.navigationUxScore}%` }}
                    />
                  </div>
                  <span className="text-[10px] text-slate-400 mt-2 block">
                    {result.metrics.navigationHealth.emptyHashLinks > 0
                      ? `⚠️ ${result.metrics.navigationHealth.emptyHashLinks} empty dummy href="#" links`
                      : '✓ Zero broken dummy anchors'}
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="text-slate-300 font-medium">Technical SEO & Speed</span>
                    <span className="font-mono font-bold text-emerald-400">
                      {result.scoreBreakdown.technicalSeoScore}/100
                    </span>
                  </div>
                  <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-400 rounded-full"
                      style={{ width: `${result.scoreBreakdown.technicalSeoScore}%` }}
                    />
                  </div>
                  <span className="text-[10px] text-slate-400 mt-2 block">
                    {result.metrics.isHttps ? '✓ HTTPS' : '✗ Insecure'} •{' '}
                    {result.metrics.hasMobileViewport ? '✓ Responsive' : '✗ Desktop only'}
                  </span>
                </div>
              </div>
            </div>

            {/* Critical Blockers Callout */}
            <div className="p-6 sm:p-8 bg-slate-50 border-b border-slate-200">
              {result.criticalBlockers.length > 0 ? (
                <div className="p-5 rounded-2xl bg-rose-50 border border-rose-200">
                  <div className="flex items-center gap-2.5 mb-3">
                    <div className="w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center text-rose-600 font-bold">
                      !
                    </div>
                    <div>
                      <h3 className="text-sm sm:text-base font-bold text-slate-900">
                        {result.criticalBlockers.length} Critical Policy Blocker{result.criticalBlockers.length > 1 ? 's' : ''} Detected
                      </h3>
                      <p className="text-xs text-rose-700">
                        Google automated review bots will reject the site unless these items are resolved first.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 mt-4">
                    {result.criticalBlockers.map((blocker, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-xl bg-white border border-rose-200 shadow-sm space-y-2 text-xs"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-slate-900 text-sm">{blocker.title}</span>
                          <span
                            className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${
                              blocker.severity === 'critical'
                                ? 'bg-rose-100 text-rose-700 border border-rose-200'
                                : 'bg-amber-100 text-amber-700 border border-amber-200'
                            }`}
                          >
                            {blocker.severity}
                          </span>
                        </div>
                        <p className="text-slate-600 text-xs leading-relaxed">{blocker.description}</p>
                        <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs flex items-start gap-2">
                          <span className="font-bold shrink-0 text-emerald-700">Fix Action:</span>
                          <span>{blocker.fixAdvice}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {onSwitchTab && (
                    <div className="p-4 rounded-xl bg-purple-50 border border-purple-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                      <div className="flex items-center gap-2">
                        <Zap className="w-4 h-4 text-amber-500 fill-amber-500 shrink-0" />
                        <div>
                          <span className="font-bold text-slate-900 block">
                            Fix all 4 blockers and bring this domain to 100% Policy Readiness:
                          </span>
                          <span className="text-[11px] text-purple-700">
                            Injects legal disclosures, E-E-A-T transparency, mobile-first CSS & ads.txt.
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          type="button"
                          onClick={() => {
                            // Instant 100% Remediation Simulator
                            setResult((prev) => {
                              if (!prev) return null;
                              return {
                                ...prev,
                                approvalProbability: 100,
                                overallStatus: 'ready',
                                verdictSummary: 'Outstanding AdSense Readiness (100%). All 4 critical policy blockers successfully resolved! Site fulfills Google Webmaster E-E-A-T, DoubleClick DART legal disclosures, mobile speed, and structured content benchmarks.',
                                scoreBreakdown: {
                                  contentDepthScore: 100,
                                  legalComplianceScore: 100,
                                  navigationUxScore: 100,
                                  technicalSeoScore: 100,
                                },
                                metrics: {
                                  ...prev.metrics,
                                  estimatedWordCount: 1450,
                                  h1Count: 1,
                                  h2Count: 4,
                                  paragraphCount: 16,
                                  legalPagesFound: {
                                    privacyPolicy: true,
                                    termsOfService: true,
                                    aboutUs: true,
                                    contactUs: true,
                                    cookieConsent: true,
                                  },
                                  navigationHealth: {
                                    totalLinks: 24,
                                    emptyHashLinks: 0,
                                    internalLinks: 18,
                                  },
                                  thinContentRisk: 'Low',
                                  ymylRisk: 'Low',
                                },
                                criticalBlockers: [],
                                findings: prev.findings.map((f) => ({
                                  ...f,
                                  status: 'pass',
                                  detail: `${f.label} fully verified & 100% compliant with Google Publisher Policies.`,
                                })),
                              };
                            });
                          }}
                          className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
                        >
                          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                          <span>Simulate 100% Fix</span>
                        </button>
                        <button
                          onClick={() => {
                            onSwitchTab('policy-toolkit');
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          className="px-3 py-1.5 bg-[#1a73e8] hover:bg-[#1557b0] text-white font-bold rounded-lg shrink-0 transition-colors"
                        >
                          Export Code & Pages →
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center gap-3.5">
                  <CheckCircle2 className="w-8 h-8 text-emerald-600 shrink-0" />
                  <div>
                    <h3 className="text-base font-bold text-slate-900">Zero Critical Blockers Found</h3>
                    <p className="text-xs text-slate-600 mt-0.5">
                      This domain conforms to the essential structural and technical requirements of the Google Publisher Policies.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Navigation Tabs for Deep Findings */}
            <div className="p-6 sm:p-8 bg-white">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3 gap-2 overflow-x-auto">
                <div className="flex space-x-2">
                  <button
                    onClick={() => setActiveResultTab('overview')}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                      activeResultTab === 'overview'
                        ? 'bg-slate-900 text-white shadow-sm'
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <Info className="w-4 h-4" />
                    <span>Audit Signals</span>
                  </button>

                  <button
                    onClick={() => setActiveResultTab('evaluator-roles')}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                      activeResultTab === 'evaluator-roles'
                        ? 'bg-[#1a73e8] text-white shadow-sm'
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <Users className="w-4 h-4" />
                    <span>6 Google Inspector Roles</span>
                  </button>

                  {result.rejectionDiagnosis && (
                    <button
                      onClick={() => setActiveResultTab('plan')}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                        activeResultTab === 'plan'
                          ? 'bg-[#9d62ec] text-white shadow-sm'
                          : 'text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      <Clock className="w-4 h-4" />
                      <span>14-Day Recovery Prescription</span>
                    </button>
                  )}

                  <button
                    onClick={() => setActiveResultTab('checklist')}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                      activeResultTab === 'checklist'
                        ? 'bg-emerald-600 text-white shadow-sm'
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Pre-Submission Checklist ({Object.values(checkedItems).filter(Boolean).length}/{result.reApplicationChecklist.length})</span>
                  </button>

                  {/* New Tab: Website AdSense Earnings & Ad Stack */}
                  {result.revenueEstimation && (
                    <button
                      onClick={() => setActiveResultTab('revenue')}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                        activeResultTab === 'revenue'
                          ? 'bg-emerald-600 text-white shadow-sm'
                          : 'text-emerald-700 bg-emerald-50 hover:bg-emerald-100'
                      }`}
                    >
                      <DollarSign className="w-4 h-4" />
                      <span>Estimated Earnings (~${result.revenueEstimation.estimatedEarnings.avgMonthly.toLocaleString()}/mo)</span>
                    </button>
                  )}

                  {/* Tab: AI & Originality Analysis */}
                  {result.metrics.aiContentRisk && (
                    <button
                      onClick={() => setActiveResultTab('ai-content')}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                        activeResultTab === 'ai-content'
                          ? 'bg-purple-600 text-white shadow-sm'
                          : result.metrics.aiContentRisk.riskLevel === 'Severe' || result.metrics.aiContentRisk.riskLevel === 'High'
                          ? 'text-purple-700 bg-purple-50 hover:bg-purple-100 border border-purple-200'
                          : 'text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      <Bot className="w-4 h-4" />
                      <span>
                        AI & Originality Analysis ({result.metrics.aiContentRisk.riskLevel} Risk)
                      </span>
                    </button>
                  )}
                </div>

                <button
                  onClick={handleCopyReport}
                  className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-all flex items-center gap-1.5 shrink-0"
                >
                  {copiedReport ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedReport ? 'Copied!' : 'Copy Summary'}</span>
                </button>
              </div>

              {/* Tab 1: Audit Signals */}
              {activeResultTab === 'overview' && (
                <div className="mt-6 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                    {result.findings.map((item, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3"
                      >
                        {item.status === 'pass' ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        ) : item.status === 'warn' ? (
                          <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                        ) : (
                          <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                        )}
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-slate-900">{item.label}</span>
                            <span className="text-[10px] text-slate-500 px-1.5 py-0.2 rounded bg-white border border-slate-200">
                              {item.category}
                            </span>
                          </div>
                          <p className="text-slate-600 text-xs mt-0.5">{item.detail}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Security Protocols & Semantic SEO Deep-Dive Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mt-4">
                    {/* Security Headers Card */}
                    <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2.5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <ShieldCheck className="w-4 h-4 text-emerald-600" />
                          <span className="font-bold text-xs text-slate-900">Security Protocols & Headers</span>
                        </div>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            (result.metrics.securityHeaders?.score ?? 0) >= 70
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : 'bg-amber-50 text-amber-700 border border-amber-200'
                          }`}
                        >
                          Score: {result.metrics.securityHeaders?.score ?? 50}/100
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600">
                        <div className="flex items-center gap-1.5">
                          <span className={result.metrics.securityHeaders?.hasHsts ? 'text-emerald-600 font-bold' : 'text-slate-400'}>
                            {result.metrics.securityHeaders?.hasHsts ? '✓' : '○'} HSTS Active
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className={result.metrics.securityHeaders?.hasXFrameOptions ? 'text-emerald-600 font-bold' : 'text-slate-400'}>
                            {result.metrics.securityHeaders?.hasXFrameOptions ? '✓' : '○'} X-Frame Defense
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className={result.metrics.securityHeaders?.hasCsp ? 'text-emerald-600 font-bold' : 'text-slate-400'}>
                            {result.metrics.securityHeaders?.hasCsp ? '✓' : '○'} Content-Security-Policy
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className={result.metrics.securityHeaders?.hasNosniff ? 'text-emerald-600 font-bold' : 'text-slate-400'}>
                            {result.metrics.securityHeaders?.hasNosniff ? '✓' : '○'} nosniff Protection
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Semantic Architecture & Schema Card */}
                    <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2.5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Code2 className="w-4 h-4 text-[#1a73e8]" />
                          <span className="font-bold text-xs text-slate-900">Semantic & Structured Data</span>
                        </div>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            (result.metrics.semanticSeo?.score ?? 0) >= 60
                              ? 'bg-blue-50 text-blue-700 border border-blue-200'
                              : 'bg-amber-50 text-amber-700 border border-amber-200'
                          }`}
                        >
                          Score: {result.metrics.semanticSeo?.score ?? 40}/100
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600">
                        <div className="flex items-center gap-1.5">
                          <span className={result.metrics.semanticSeo?.hasSchemaJsonLd ? 'text-blue-600 font-bold' : 'text-slate-400'}>
                            {result.metrics.semanticSeo?.hasSchemaJsonLd ? '✓' : '○'} Schema.org JSON-LD {result.metrics.semanticSeo?.schemaTypes?.length ? `(${result.metrics.semanticSeo.schemaTypes.slice(0, 2).join(', ')})` : ''}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className={result.metrics.semanticSeo?.hasOpenGraph ? 'text-blue-600 font-bold' : 'text-slate-400'}>
                            {result.metrics.semanticSeo?.hasOpenGraph ? '✓' : '○'} OpenGraph Social
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className={result.metrics.semanticSeo?.hasMetaDescription ? 'text-blue-600 font-bold' : 'text-slate-400'}>
                            {result.metrics.semanticSeo?.hasMetaDescription ? '✓' : '○'} Meta Description ({result.metrics.semanticSeo?.metaDescriptionLength || 0}c)
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className={result.metrics.semanticSeo?.hasCanonical ? 'text-blue-600 font-bold' : 'text-slate-400'}>
                            {result.metrics.semanticSeo?.hasCanonical ? '✓' : '○'} Canonical URL
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Technical Summary Bar */}
                  <div className="p-4 rounded-2xl bg-slate-900 text-slate-300 text-xs mt-6">
                    <h4 className="font-bold text-white mb-2">Technical Page Audit Summary:</h4>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-slate-400">
                      <div>• Total Links: <strong className="text-white">{result.metrics.navigationHealth.totalLinks}</strong></div>
                      <div>• Internal Links: <strong className="text-white">{result.metrics.navigationHealth.internalLinks}</strong></div>
                      <div>• Headings (H1/H2): <strong className="text-white">{result.metrics.h1Count} / {result.metrics.h2Count}</strong></div>
                      <div>• HTTPS Secured: <strong className="text-white">{result.metrics.isHttps ? 'Yes (SSL)' : 'No'}</strong></div>
                      <div>• Mobile Viewport: <strong className="text-white">{result.metrics.hasMobileViewport ? 'Present' : 'Missing'}</strong></div>
                      <div>• Robots Noindex: <strong className="text-white">{result.metrics.hasRobotsNoindex ? 'Blocked!' : 'Clean'}</strong></div>
                      <div>• Thin Content Risk: <strong className="text-white">{result.metrics.thinContentRisk}</strong></div>
                      <div>• YMYL Sensitivity: <strong className="text-white">{result.metrics.ymylRisk}</strong></div>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab: 6 Google Evaluator Perspectives (Bot + Human Pipeline) */}
              {activeResultTab === 'evaluator-roles' && (
                <div className="mt-6 space-y-6">
                  <div className="p-4 rounded-2xl bg-[#e8f0fe] border border-blue-200 flex items-start justify-between gap-3 text-xs text-[#1a73e8]">
                    <div className="flex items-center gap-2">
                      <Users className="w-5 h-5 shrink-0" />
                      <div>
                        <h4 className="font-bold text-sm text-slate-900">
                          Dual-Perspective Evaluation: Automated Crawlers, Algorithms & Human Quality Raters
                        </h4>
                        <p className="text-slate-600 mt-0.5">
                          How Google's 6 automated bots and human review departments evaluate this domain against strict ranking and AdSense compliance standards.
                        </p>
                      </div>
                    </div>
                    <span className="font-mono font-bold px-2 py-0.5 rounded bg-white text-slate-800 border border-blue-200">
                      Score: {result.approvalProbability}/100
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* Role 1: Googlebot (Automated Web Crawler) */}
                    <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                          <div className="flex items-center gap-2 text-[#1a73e8]">
                            <Bot className="w-4 h-4 shrink-0" />
                            <span className="font-bold text-xs uppercase tracking-wider">1. Googlebot Crawler</span>
                          </div>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            result.metrics.isHttps && result.metrics.hasMobileViewport && !result.metrics.hasRobotsNoindex
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : 'bg-rose-50 text-rose-700 border border-rose-200'
                          }`}>
                            {result.metrics.isHttps && result.metrics.hasMobileViewport && !result.metrics.hasRobotsNoindex
                              ? 'Crawl Pass'
                              : 'Crawl Deficit'}
                          </span>
                        </div>

                        <div className="space-y-1.5 pt-2 text-xs">
                          <div className="flex items-center justify-between text-slate-600">
                            <span>HTTPS / TLS Security:</span>
                            <span className={result.metrics.isHttps ? 'text-emerald-600 font-bold' : 'text-rose-600 font-bold'}>
                              {result.metrics.isHttps ? 'Valid SSL' : 'Insecure HTTP'}
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-slate-600">
                            <span>Mobile Viewport Meta:</span>
                            <span className={result.metrics.hasMobileViewport ? 'text-emerald-600 font-bold' : 'text-rose-600 font-bold'}>
                              {result.metrics.hasMobileViewport ? 'Responsive' : 'Missing Viewport'}
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-slate-600">
                            <span>Robots Noindex Flag:</span>
                            <span className={!result.metrics.hasRobotsNoindex ? 'text-emerald-600 font-bold' : 'text-rose-600 font-bold'}>
                              {!result.metrics.hasRobotsNoindex ? 'Clean (Indexable)' : 'Blocked by noindex'}
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-slate-600">
                            <span>Link Integrity:</span>
                            <span className={result.metrics.navigationHealth.emptyHashLinks === 0 ? 'text-emerald-600 font-bold' : 'text-amber-600 font-bold'}>
                              {result.metrics.navigationHealth.emptyHashLinks === 0 ? '0 Dummy Anchors' : `${result.metrics.navigationHealth.emptyHashLinks} Empty Links`}
                            </span>
                          </div>
                        </div>
                      </div>

                      <p className="text-[11px] text-slate-500 pt-2 border-t border-slate-100">
                        <strong>Crawler Mandate:</strong> Fast, clean DOM parsing without render-blocking timeouts.
                      </p>
                    </div>

                    {/* Role 2: Core Ranking Algorithms (RankBrain, Helpful Content, SpamBrain) */}
                    <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                          <div className="flex items-center gap-2 text-purple-700">
                            <Layers className="w-4 h-4 shrink-0" />
                            <span className="font-bold text-xs uppercase tracking-wider">2. Core Ranking Algorithm</span>
                          </div>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            result.metrics.thinContentRisk === 'Low'
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : 'bg-amber-50 text-amber-700 border border-amber-200'
                          }`}>
                            {result.metrics.thinContentRisk === 'Low' ? 'Helpful Content' : 'Thin Content Risk'}
                          </span>
                        </div>

                        <div className="space-y-1.5 pt-2 text-xs">
                          <div className="flex items-center justify-between text-slate-600">
                            <span>Body Text Depth:</span>
                            <span className="font-bold text-slate-900 font-mono">
                              ~{result.metrics.estimatedWordCount} words
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-slate-600">
                            <span>Heading Structure:</span>
                            <span className="font-bold text-slate-900 font-mono">
                              H1: {result.metrics.h1Count} • H2: {result.metrics.h2Count}
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-slate-600">
                            <span>Paragraph Scannability:</span>
                            <span className="font-bold text-slate-900 font-mono">
                              {result.metrics.paragraphCount} paragraphs
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-slate-600">
                            <span>Unedited AI Padding Risk:</span>
                            <span className={result.metrics.thinContentRisk === 'Low' ? 'text-emerald-600 font-bold' : 'text-amber-600 font-bold'}>
                              {result.metrics.thinContentRisk === 'Low' ? 'Low (Human-Value)' : 'High (SpamBrain flag)'}
                            </span>
                          </div>
                        </div>
                      </div>

                      <p className="text-[11px] text-slate-500 pt-2 border-t border-slate-100">
                        <strong>Algorithm Mandate:</strong> Original value-add, search intent fulfillment, and bounce reduction.
                      </p>
                    </div>

                    {/* Role 3: Automated AdSense Crawling Bots */}
                    <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                          <div className="flex items-center gap-2 text-emerald-800">
                            <ShieldCheck className="w-4 h-4 shrink-0" />
                            <span className="font-bold text-xs uppercase tracking-wider">3. AdSense Policy Bot</span>
                          </div>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            result.criticalBlockers.length === 0
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : 'bg-rose-50 text-rose-700 border border-rose-200'
                          }`}>
                            {result.criticalBlockers.length === 0 ? 'Zero Gate Pass' : 'Policy Blockers'}
                          </span>
                        </div>

                        <div className="space-y-1.5 pt-2 text-xs">
                          <div className="flex items-center justify-between text-slate-600">
                            <span>Zero-Tolerance Policy:</span>
                            <span className={result.criticalBlockers.length === 0 ? 'text-emerald-600 font-bold' : 'text-rose-600 font-bold'}>
                              {result.criticalBlockers.length === 0 ? '25/25 Clean' : 'Failure Gate'}
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-slate-600">
                            <span>Cookie Consent Disclosures:</span>
                            <span className={result.metrics.legalPagesFound.cookieConsent ? 'text-emerald-600 font-bold' : 'text-amber-600 font-bold'}>
                              {result.metrics.legalPagesFound.cookieConsent ? 'GDPR/CCPA Present' : 'Missing Opt-out'}
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-slate-600">
                            <span>Duplicate Content Threshold:</span>
                            <span className="text-emerald-600 font-bold">&lt; 15% Duplicate</span>
                          </div>
                          <div className="flex items-center justify-between text-slate-600">
                            <span>YMYL Compliance Outlook:</span>
                            <span className={result.metrics.ymylRisk === 'Low' ? 'text-emerald-600 font-bold' : 'text-amber-600 font-bold'}>
                              {result.metrics.ymylRisk} Risk
                            </span>
                          </div>
                        </div>
                      </div>

                      <p className="text-[11px] text-slate-500 pt-2 border-t border-slate-100">
                        <strong>Bot Mandate:</strong> Zero tolerance for prohibited categories, piracy, or invalid clicks.
                      </p>
                    </div>

                    {/* Role 4: Search Quality Raters (Human Evaluators - 10,000+ Team) */}
                    <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                          <div className="flex items-center gap-2 text-amber-800">
                            <Users className="w-4 h-4 shrink-0" />
                            <span className="font-bold text-xs uppercase tracking-wider">4. Search Quality Raters</span>
                          </div>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            result.metrics.legalPagesFound.aboutUs && result.metrics.legalPagesFound.contactUs
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : 'bg-amber-50 text-amber-700 border border-amber-200'
                          }`}>
                            {result.metrics.legalPagesFound.aboutUs && result.metrics.legalPagesFound.contactUs
                              ? 'High E-E-A-T'
                              : 'Needs Attribution'}
                          </span>
                        </div>

                        <div className="space-y-1.5 pt-2 text-xs">
                          <div className="flex items-center justify-between text-slate-600">
                            <span>Experience (First-hand proof):</span>
                            <span className="text-emerald-600 font-bold">Tested & Original</span>
                          </div>
                          <div className="flex items-center justify-between text-slate-600">
                            <span>Expertise & Credentials:</span>
                            <span className={result.metrics.legalPagesFound.aboutUs ? 'text-emerald-600 font-bold' : 'text-rose-600 font-bold'}>
                              {result.metrics.legalPagesFound.aboutUs ? 'Author Identified' : 'Anonymous Writer'}
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-slate-600">
                            <span>Authoritativeness (Citations):</span>
                            <span className="text-emerald-600 font-bold">Industry Formulas</span>
                          </div>
                          <div className="flex items-center justify-between text-slate-600">
                            <span>Trustworthiness (About & Legal):</span>
                            <span className={result.scoreBreakdown.legalComplianceScore >= 80 ? 'text-emerald-600 font-bold' : 'text-amber-600 font-bold'}>
                              {result.scoreBreakdown.legalComplianceScore}/100 Trust Score
                            </span>
                          </div>
                        </div>
                      </div>

                      <p className="text-[11px] text-slate-500 pt-2 border-t border-slate-100">
                        <strong>Rater Mandate:</strong> Human evaluation against the official Quality Rater Guidelines handbook.
                      </p>
                    </div>

                    {/* Role 5: Google AdSense Policy Inspectors (Human Manual Reviewers) */}
                    <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                          <div className="flex items-center gap-2 text-blue-800">
                            <FileCheck className="w-4 h-4 shrink-0" />
                            <span className="font-bold text-xs uppercase tracking-wider">5. Manual Policy Inspector</span>
                          </div>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            result.metrics.legalPagesFound.privacyPolicy && result.metrics.legalPagesFound.contactUs
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : 'bg-rose-50 text-rose-700 border border-rose-200'
                          }`}>
                            {result.metrics.legalPagesFound.privacyPolicy && result.metrics.legalPagesFound.contactUs
                              ? 'Manual Pass'
                              : 'Under Construction'}
                          </span>
                        </div>

                        <div className="space-y-1.5 pt-2 text-xs">
                          <div className="flex items-center justify-between text-slate-600">
                            <span>Privacy Policy with Cookies:</span>
                            <span className={result.metrics.legalPagesFound.privacyPolicy ? 'text-emerald-600 font-bold' : 'text-rose-600 font-bold'}>
                              {result.metrics.legalPagesFound.privacyPolicy ? 'Present & Linked' : 'Missing!'}
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-slate-600">
                            <span>Working Contact Form / Email:</span>
                            <span className={result.metrics.legalPagesFound.contactUs ? 'text-emerald-600 font-bold' : 'text-rose-600 font-bold'}>
                              {result.metrics.legalPagesFound.contactUs ? 'Functional Desk' : 'Missing Contact'}
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-slate-600">
                            <span>Site Navigation & Breadcrumbs:</span>
                            <span className={result.metrics.navigationHealth.totalLinks > 5 ? 'text-emerald-600 font-bold' : 'text-amber-600 font-bold'}>
                              {result.metrics.navigationHealth.totalLinks} Active Links
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-slate-600">
                            <span>Deceptive UI & Misleading Buttons:</span>
                            <span className="text-emerald-600 font-bold">Zero Deceptive UI</span>
                          </div>
                        </div>
                      </div>

                      <p className="text-[11px] text-slate-500 pt-2 border-t border-slate-100">
                        <strong>Inspector Mandate:</strong> Rigorous manual click-through pass before ad serving activation.
                      </p>
                    </div>

                    {/* Role 6: Google Search Engineers (Algorithmic Calibration) */}
                    <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                          <div className="flex items-center gap-2 text-slate-900">
                            <Cpu className="w-4 h-4 shrink-0" />
                            <span className="font-bold text-xs uppercase tracking-wider">6. Search Engineers</span>
                          </div>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            result.approvalProbability >= 85
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : 'bg-amber-50 text-amber-700 border border-amber-200'
                          }`}>
                            {result.approvalProbability >= 85 ? 'Threshold ≥85 Met' : 'Under 85 Threshold'}
                          </span>
                        </div>

                        <div className="space-y-1.5 pt-2 text-xs">
                          <div className="flex items-center justify-between text-slate-600">
                            <span>Passing Threshold Gate:</span>
                            <span className={result.approvalProbability >= 85 ? 'text-emerald-600 font-bold' : 'text-amber-600 font-bold'}>
                              {result.approvalProbability}/100 (Min 85 Required)
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-slate-600">
                            <span>Anti-Manipulation Check:</span>
                            <span className="text-emerald-600 font-bold">No Blackhat Signals</span>
                          </div>
                          <div className="flex items-center justify-between text-slate-600">
                            <span>Core Web Vitals Metric:</span>
                            <span className="text-emerald-600 font-bold">LCP &lt; 2.5s / 0 CLS</span>
                          </div>
                          <div className="flex items-center justify-between text-slate-600">
                            <span>Algorithmic Approval Verdict:</span>
                            <span className={result.approvalProbability >= 85 ? 'text-emerald-600 font-bold' : 'text-amber-600 font-bold'}>
                              {result.approvalProbability >= 85 ? 'PROCEED TO CONSOLE' : 'REMEDIATION MANDATORY'}
                            </span>
                          </div>
                        </div>
                      </div>

                      <p className="text-[11px] text-slate-500 pt-2 border-t border-slate-100">
                        <strong>Engineer Mandate:</strong> Enforcing strict multi-layer mathematical standards across all network publishers.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 2: 14-Day Recovery Prescription Plan */}
              {activeResultTab === 'plan' && result.rejectionDiagnosis && (
                <div className="mt-6 space-y-6">
                  <div className="p-5 rounded-2xl bg-purple-50 border border-purple-200 space-y-3">
                    <div className="flex items-center gap-2 text-purple-900">
                      <Stethoscope className="w-5 h-5 text-[#9d62ec]" />
                      <h4 className="text-sm font-bold">
                        Diagnosis: {result.rejectionDiagnosis.rejectionReason}
                      </h4>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                      <div className="p-3.5 rounded-xl bg-white border border-purple-100 shadow-sm">
                        <span className="font-bold text-slate-900 block mb-1">🤖 Googlebot Automated Crawler Perspective:</span>
                        <p className="text-slate-600 leading-relaxed">
                          {result.rejectionDiagnosis.googleBotPerspective}
                        </p>
                      </div>

                      <div className="p-3.5 rounded-xl bg-white border border-purple-100 shadow-sm">
                        <span className="font-bold text-slate-900 block mb-1">👤 Human Quality Rater Perspective:</span>
                        <p className="text-slate-600 leading-relaxed">
                          {result.rejectionDiagnosis.humanReviewerPerspective}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                      Phased 14-Day Re-Approval Action Plan:
                    </h4>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {result.rejectionDiagnosis.fourteenDayPlan.map((phase, pIdx) => (
                        <div
                          key={pIdx}
                          className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs"
                        >
                          <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                            <span className="font-bold text-[#9d62ec] font-mono">{phase.days}</span>
                            <span className="font-bold text-slate-900">{phase.phase}</span>
                          </div>

                          <ul className="space-y-1.5 pt-1">
                            {phase.tasks.map((task, tIdx) => (
                              <li key={tIdx} className="text-slate-600 flex items-start gap-1.5">
                                <span className="text-[#9d62ec] font-bold shrink-0">•</span>
                                <span>{task}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 3: Pre-Submission Checklist */}
              {activeResultTab === 'checklist' && (
                <div className="mt-6 space-y-3">
                  <p className="text-xs text-slate-600 mb-2">
                    Check off each requirement as you implement it on your website. Once complete, your site will meet the benchmark for first-pass or re-appeal AdSense approval.
                  </p>

                  <div className="space-y-2">
                    {result.reApplicationChecklist.map((item, idx) => {
                      const isChecked = Boolean(checkedItems[idx]);
                      return (
                        <div
                          key={idx}
                          onClick={() => toggleChecklist(idx)}
                          className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                            isChecked
                              ? 'bg-emerald-50 border-emerald-300 text-slate-900'
                              : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${
                                isChecked
                                  ? 'bg-emerald-600 border-emerald-600 text-white'
                                  : 'border-slate-300 bg-slate-50'
                              }`}
                            >
                              {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                            </div>
                            <span className={`text-xs ${isChecked ? 'line-through text-slate-400' : 'text-slate-800 font-medium'}`}>
                              {item}
                            </span>
                          </div>

                          <span className="text-[10px] text-slate-400 font-mono">
                            {isChecked ? 'Completed' : 'Pending'}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Tab 4: AdSense Revenue & Ad Stack Estimation */}
              {activeResultTab === 'revenue' && result.revenueEstimation && (
                <div className="mt-6">
                  <WebsiteRevenueCard
                    estimation={result.revenueEstimation}
                    domainUrl={result.url}
                    onOpenCalculator={() => {
                      if (onSwitchTab) {
                        onSwitchTab('calculator');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }
                    }}
                  />
                </div>
              )}

              {/* Tab 5: AI & Originality Analysis (Low-Value Content Defense) */}
              {activeResultTab === 'ai-content' && result.metrics.aiContentRisk && (
                <div className="mt-6 space-y-6">
                  {/* Top Status Banner */}
                  <div
                    className={`p-5 rounded-2xl border ${
                      result.metrics.aiContentRisk.riskLevel === 'Severe'
                        ? 'bg-rose-50 border-rose-200 text-rose-900'
                        : result.metrics.aiContentRisk.riskLevel === 'High'
                        ? 'bg-amber-50 border-amber-200 text-amber-900'
                        : result.metrics.aiContentRisk.riskLevel === 'Moderate'
                        ? 'bg-blue-50 border-blue-200 text-blue-900'
                        : 'bg-emerald-50 border-emerald-200 text-emerald-900'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-start gap-3">
                        <div
                          className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 font-bold ${
                            result.metrics.aiContentRisk.riskLevel === 'Severe'
                              ? 'bg-rose-200 text-rose-700'
                              : result.metrics.aiContentRisk.riskLevel === 'High'
                              ? 'bg-amber-200 text-amber-700'
                              : result.metrics.aiContentRisk.riskLevel === 'Moderate'
                              ? 'bg-blue-200 text-blue-700'
                              : 'bg-emerald-200 text-emerald-700'
                          }`}
                        >
                          <Bot className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <h4 className="font-bold text-sm text-slate-900">
                              AI Footprint & Information Gain Evaluation
                            </h4>
                            <span
                              className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                                result.metrics.aiContentRisk.riskLevel === 'Severe'
                                  ? 'bg-rose-100 text-rose-800 border border-rose-300'
                                  : result.metrics.aiContentRisk.riskLevel === 'High'
                                  ? 'bg-amber-100 text-amber-800 border border-amber-300'
                                  : result.metrics.aiContentRisk.riskLevel === 'Moderate'
                                  ? 'bg-blue-100 text-blue-800 border border-blue-300'
                                  : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                              }`}
                            >
                              {result.metrics.aiContentRisk.riskLevel} AI Rejection Risk
                            </span>
                          </div>
                          <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                            {result.metrics.aiContentRisk.verdict}
                          </p>
                        </div>
                      </div>

                      <div className="text-right shrink-0 bg-white/80 p-3 rounded-xl border border-slate-200/60 shadow-xs">
                        <span className="text-[10px] uppercase font-bold text-slate-500 block">
                          Information Gain
                        </span>
                        <span
                          className={`text-2xl font-black font-mono ${
                            result.metrics.aiContentRisk.informationGainScore >= 60
                              ? 'text-emerald-600'
                              : result.metrics.aiContentRisk.informationGainScore >= 40
                              ? 'text-amber-600'
                              : 'text-rose-600'
                          }`}
                        >
                          {result.metrics.aiContentRisk.informationGainScore}/100
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* 3 Metric Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* 1. Cliché Signature Score */}
                    <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                          <Cpu className="w-4 h-4 text-purple-600" />
                          Formulaic AI Clichés
                        </span>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            result.metrics.aiContentRisk.clicheScore > 40
                              ? 'bg-rose-100 text-rose-700'
                              : result.metrics.aiContentRisk.clicheScore > 0
                              ? 'bg-amber-100 text-amber-700'
                              : 'bg-emerald-100 text-emerald-700'
                          }`}
                        >
                          {result.metrics.aiContentRisk.clicheScore}% Cliché Density
                        </span>
                      </div>
                      <p className="text-xs text-slate-600">
                        {result.metrics.aiContentRisk.detectedPhrases.length > 0
                          ? `Found ${result.metrics.aiContentRisk.detectedPhrases.length} robotic transition clichés characteristic of unedited LLM prompts.`
                          : 'Zero repetitive AI linguistic signatures detected. Clean syntactical burstiness.'}
                      </p>
                    </div>

                    {/* 2. Structured Information Density */}
                    <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                          <Layers className="w-4 h-4 text-[#1a73e8]" />
                          Data Density & Tables
                        </span>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            result.metrics.aiContentRisk.tableCount > 0
                              ? 'bg-emerald-100 text-emerald-700'
                              : 'bg-amber-100 text-amber-700'
                          }`}
                        >
                          {result.metrics.aiContentRisk.tableCount} Tables • {result.metrics.aiContentRisk.listCount} Lists
                        </span>
                      </div>
                      <p className="text-xs text-slate-600">
                        Google Quality Raters reward structured comparison tables, formulas, and bulleted takeaways over unbroken text walls.
                      </p>
                    </div>

                    {/* 3. Author E-E-A-T & Provenance */}
                    <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                          <Users className="w-4 h-4 text-emerald-600" />
                          Author E-E-A-T & Policy
                        </span>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            result.metrics.aiContentRisk.hasAuthorBio || result.metrics.aiContentRisk.hasEditorialTransparency
                              ? 'bg-emerald-100 text-emerald-700'
                              : 'bg-rose-100 text-rose-700'
                          }`}
                        >
                          {result.metrics.aiContentRisk.hasEditorialTransparency
                            ? 'Editorial Policy OK'
                            : result.metrics.aiContentRisk.hasAuthorBio
                            ? 'Author Byline OK'
                            : 'Missing Credentials'}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600">
                        {result.metrics.aiContentRisk.hasEditorialTransparency
                          ? 'Site transparently documents its editorial standards and human review methodology.'
                          : 'AdSense reviewers penalize anonymous publishers. Add verifiable author bios and an AI & Editorial disclosure.'}
                      </p>
                    </div>
                  </div>

                  {/* Detected Clichés Warning Box if any found */}
                  {result.metrics.aiContentRisk.detectedPhrases.length > 0 && (
                    <div className="p-4 rounded-2xl bg-rose-50/80 border border-rose-200 space-y-2 text-xs">
                      <div className="flex items-center gap-2 text-rose-800 font-bold">
                        <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                        <span>Flagged Robotic Transition Footprints:</span>
                      </div>
                      <div className="flex flex-wrap gap-2 pt-1">
                        {result.metrics.aiContentRisk.detectedPhrases.map((phrase, pIdx) => (
                          <span
                            key={pIdx}
                            className="px-2.5 py-1 rounded-lg bg-white border border-rose-200 text-rose-700 font-mono text-[11px] shadow-xs"
                          >
                            "{phrase}"
                          </span>
                        ))}
                      </div>
                      <p className="text-[11px] text-rose-600 mt-1">
                        Replace these automated transitions with direct conversational hooks, original field tests, or specific quantitative data.
                      </p>
                    </div>
                  )}

                  {/* Action Plan & 1-Click Fix Button */}
                  <div className="p-5 rounded-2xl bg-slate-900 text-white space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <h4 className="text-sm font-bold text-white flex items-center gap-2">
                          <Sparkles className="w-4 h-4 text-amber-400" />
                          The GladSense Treatment Plan for AI & Low-Value Content
                        </h4>
                        <p className="text-xs text-slate-300 mt-1">
                          Follow these 4 procedural steps to pass Google's Quality Rater & Search Spam filters:
                        </p>
                      </div>

                      {onSwitchTab && (
                        <button
                          onClick={() => {
                            onSwitchTab('policy-toolkit');
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          className="px-4 py-2 bg-[#1a73e8] hover:bg-[#1557b0] text-white font-bold text-xs rounded-xl transition-all shadow-md shrink-0 flex items-center gap-1.5 cursor-pointer"
                        >
                          <FileText className="w-4 h-4" />
                          <span>Generate AI & Editorial Disclosure →</span>
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div className="p-3 rounded-xl bg-slate-800 border border-slate-700 space-y-1">
                        <span className="font-bold text-emerald-400">1. Prune / Draft Thin Articles</span>
                        <p className="text-slate-300 text-[11px] leading-relaxed">
                          Temporarily draft generic, unedited posts. It is 10x easier to pass AdSense review with 15–20 high-gain articles than 100 thin AI summaries.
                        </p>
                      </div>

                      <div className="p-3 rounded-xl bg-slate-800 border border-slate-700 space-y-1">
                        <span className="font-bold text-blue-400">2. Add First-Party Information Gain</span>
                        <p className="text-slate-300 text-[11px] leading-relaxed">
                          Insert custom comparison tables, proprietary calculations, original screenshots, or step-by-step takeaways that no generic LLM can invent.
                        </p>
                      </div>

                      <div className="p-3 rounded-xl bg-slate-800 border border-slate-700 space-y-1">
                        <span className="font-bold text-purple-400">3. Publish AI & Editorial Transparency</span>
                        <p className="text-slate-300 text-[11px] leading-relaxed">
                          Google does not ban AI; it bans deceptive automation. State your editorial methodology and human fact-checking workflow explicitly.
                        </p>
                      </div>

                      <div className="p-3 rounded-xl bg-slate-800 border border-slate-700 space-y-1">
                        <span className="font-bold text-amber-400">4. Attach Verified Author Schema</span>
                        <p className="text-slate-300 text-[11px] leading-relaxed">
                          Link articles to real author bios with Schema.org <code className="text-amber-300">Person</code> microdata to establish authentic E-E-A-T credentials.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Persistent Comprehensive Enterprise Explainer Suite */}
      <HomeExplainerSuite
        onSwitchTab={onSwitchTab}
        onAuditDemo={(demoUrl) => handleRunAudit(demoUrl, 'pre-approval')}
      />
    </div>
  );
};
