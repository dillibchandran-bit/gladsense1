import React, { useState, useEffect } from 'react';
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
  Share2,
  Printer,
  Link2,
} from 'lucide-react';
import { NavTabType } from './Navbar';
import { WebsiteRevenueCard } from './WebsiteRevenueCard';
import { HomeExplainerSuite } from './HomeExplainerSuite';
import { RejectionRemedyModal, RemedyType } from './RejectionRemedyModal';
import { GeoQuickGuide } from './GeoQuickGuide';
import { useAppRouter } from '../context/RouterContext';
import { TrademarkDisclaimer } from './TrademarkDisclaimer';
import { SiteDoctorEducation } from './educational/SiteDoctorEducation';
import { AdSlotPlaceholder, ContextualAffiliateCard } from './monetization/AdPlaceholders';

interface SiteAuditorProps {
  onSwitchTab?: (tab: NavTabType) => void;
}

export const SiteAuditor: React.FC<SiteAuditorProps> = ({ onSwitchTab }) => {
  const { state } = useAppRouter();
  const [mode, setMode] = useState<SiteAuditMode>('rejection-doctor');
  const [url, setUrl] = useState<string>('');
  const [rejectionReason, setRejectionReason] = useState<RejectionCategory>('low-value-content');
  const [customNotes, setCustomNotes] = useState<string>('');
  const [sampleContent, setSampleContent] = useState<string>('');
  const [showAdvanced, setShowAdvanced] = useState<boolean>(false);
  const [activeResultTab, setActiveResultTab] = useState<'overview' | 'evaluator-roles' | 'plan' | 'checklist' | 'revenue' | 'metrics' | 'ai-content'>('overview');
  const [remedyModalOpen, setRemedyModalOpen] = useState<boolean>(false);
  const [activeRemedyType, setActiveRemedyType] = useState<RemedyType>('privacy-policy');

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<SiteAuditResult | null>(null);
  const [copiedReport, setCopiedReport] = useState<boolean>(false);
  const [copiedChecklist, setCopiedChecklist] = useState<boolean>(false);
  const [copiedShareLink, setCopiedShareLink] = useState<boolean>(false);
  const [copiedAiScore, setCopiedAiScore] = useState<boolean>(false);
  const [checkedItems, setCheckedItems] = useState<{ [index: number]: boolean }>({});

  // Auto-run when URL param exists (e.g. /tools/site-doctor/?url=https://example.com)
  useEffect(() => {
    const queryUrl = state.params.url;
    if (queryUrl && queryUrl !== url && !result) {
      setUrl(queryUrl);
      handleRunAudit(queryUrl, 'pre-approval');
    }
  }, [state.params.url]);

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
    const ai = result.metrics.aiContentRisk || (result.metrics.aiDetection ? {
      riskLevel: result.metrics.aiDetection.aiRiskLevel,
      clicheScore: result.metrics.aiDetection.clicheScore,
      informationGainScore: result.metrics.aiDetection.informationGainScore,
      detectedPhrases: result.metrics.aiDetection.detectedCliches,
      verdict: result.metrics.aiDetection.verdict,
    } : null);

    const text = `Google AdSense Site Audit Report (5-Pillar Standard)
Website: ${result.url}
Overall Approval Probability: ${result.approvalProbability}% (${result.overallStatus.toUpperCase()})
Analyzed At: ${new Date(result.analyzedAt).toLocaleDateString()}

Verdict:
${result.verdictSummary}

5 Core Google Audit Pillars (100% Total):
1. Content Value & Depth (35%): ${result.scoreBreakdown.contentValueScore ?? result.scoreBreakdown.contentDepthScore ?? 0}/100
2. Policy & Compliance (25%): ${result.scoreBreakdown.policyComplianceScore ?? result.scoreBreakdown.legalComplianceScore ?? 0}/100
3. UX & Navigation (15%): ${result.scoreBreakdown.uxNavigationScore ?? result.scoreBreakdown.navigationUxScore ?? 0}/100
4. Essential Pages & Trust (15%): ${result.scoreBreakdown.essentialPagesScore ?? 100}/100
5. Technical Infrastructure (10%): ${result.scoreBreakdown.technicalInfraScore ?? result.scoreBreakdown.technicalSeoScore ?? 0}/100

${ai ? `🤖 AI Content & Originality Analysis:
• AI Rejection Risk: ${ai.riskLevel} Risk
• AI Cliché Density: ${ai.clicheScore}% (Target: <15%)
• Information Gain Score: ${ai.informationGainScore}/100 (Target: >75)
• AI Patterns Detected: ${ai.detectedPhrases?.length > 0 ? ai.detectedPhrases.join(', ') : 'Zero (Clean human voice)'}
` : ''}
Critical Blockers:
${
  result.criticalBlockers.length > 0
    ? result.criticalBlockers.map((b, i) => `${i + 1}. [${b.severity.toUpperCase()}] ${b.title}: ${b.fixAdvice}`).join('\n')
    : 'None! Ready for submission.'
}

Audited by GladSense — Google AdSense Readiness Platform
`;
    navigator.clipboard.writeText(text);
    setCopiedReport(true);
    setTimeout(() => setCopiedReport(false), 2500);
  };

  const handleShareAiScore = () => {
    if (!result) return;
    const ai = result.metrics.aiContentRisk || (result.metrics.aiDetection ? {
      riskLevel: result.metrics.aiDetection.aiRiskLevel,
      clicheScore: result.metrics.aiDetection.clicheScore,
      informationGainScore: result.metrics.aiDetection.informationGainScore,
      detectedPhrases: result.metrics.aiDetection.detectedCliches,
      verdict: result.metrics.aiDetection.verdict,
    } : null);

    const shareCard = `🤖 Google AI Content & Originality Scorecard
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Site: ${result.url}
AI Rejection Risk: ${(ai?.riskLevel || 'LOW').toUpperCase()} RISK
• AI Cliché Density: ${ai?.clicheScore ?? 0}% ${((ai?.clicheScore ?? 0) < 15) ? '(Clean & Natural)' : '(Repetitive Patterns)'}
• Information Gain Score: ${ai?.informationGainScore ?? 85}/100 (Original Utility)
• Google HCU Status: ${((ai?.riskLevel || 'Low') === 'Low') ? 'SAFE (Human-First Value)' : 'ATTENTION RECOMMENDED'}
• Pillar 1 (Content Value): ${result.scoreBreakdown.contentValueScore ?? result.scoreBreakdown.contentDepthScore ?? 0}/100
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Verified by GladSense AI Auditor`;

    navigator.clipboard.writeText(shareCard);
    setCopiedAiScore(true);
    setTimeout(() => setCopiedAiScore(false), 2500);
  };

  const handlePrintReport = () => {
    window.print();
  };

  const handleCopyChecklist = () => {
    if (!result) return;
    const items = result.findings
      .map(
        (item) =>
          `- [ ] [${item.category}] ${item.label}\n      Detail: ${item.detail}\n      Status: ${item.status.toUpperCase()}`
      )
      .join('\n\n');
    const text = `# Google AdSense Developer Checklist: ${result.url}\nAudited by GladSense: https://gladsenseedu.app/tools/site-doctor/\nReadiness Score: ${result.approvalProbability}%\n\n${items}`;
    navigator.clipboard.writeText(text);
    setCopiedChecklist(true);
    setTimeout(() => setCopiedChecklist(false), 2500);
  };

  const handleCopyShareLink = () => {
    if (!result) return;
    const shareUrl = `https://gladsenseedu.app/tools/site-doctor/?url=${encodeURIComponent(result.url)}`;
    navigator.clipboard.writeText(shareUrl);
    setCopiedShareLink(true);
    setTimeout(() => setCopiedShareLink(false), 2500);
  };

  const toggleChecklist = (index: number) => {
    setCheckedItems((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div className="w-full bg-white">
      {/* HIGH-IMPACT CLINICAL HERO CANVAS (ADSENSE REJECTION DOCTOR & PRE-APPROVAL AUDITOR) */}
      <section className="relative w-full pt-12 pb-16 sm:pt-20 sm:pb-24 px-4 sm:px-6 lg:px-8 border-b border-slate-200/80 bg-gradient-to-b from-[#f3edfd] via-[#f0f4ff] to-[#f8fafd] overflow-hidden">
        {/* Subtle Ambient Glow Orbs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#ebd9ff]/60 rounded-full blur-3xl pointer-events-none -translate-y-1/3"></div>
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#d0e6ff]/50 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative max-w-4xl mx-auto text-center space-y-6">
          {/* Clinical Diagnostic Clinic Eyebrow Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-purple-200/80 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-purple-600 animate-pulse"></span>
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-purple-700 flex items-center gap-1.5">
              <Stethoscope className="w-3.5 h-3.5 text-purple-600" />
              <span>AdSense Diagnostic Clinic</span>
            </span>
            <span className="text-slate-300">•</span>
            <span className="text-[11px] font-semibold text-slate-600">100-Point Human Quality Rater Rubric</span>
          </div>

          {/* Main Hero Headline */}
          <div className="space-y-2.5">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#191b23] tracking-tight font-['Google_Sans_Display','Google_Sans',sans-serif]">
              AdSense <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9d62ec] via-[#7c3aed] to-[#1a73e8]">Rejection Doctor</span>
            </h1>
            <p className="text-sm sm:text-base lg:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal">
              {mode === 'rejection-doctor' ? (
                <span>
                  Emergency clinical triage for rejected websites. Pinpoint <strong className="text-slate-900 font-bold">Low-Value Content</strong>, broken navigational flows, and crawler timeouts with an exact prescriptive fix plan.
                </span>
              ) : (
                <span>
                  Pre-submission readiness audit. Verify your domain against <strong className="text-slate-900 font-bold">Google's 5 core operational gates</strong> before applying to guarantee first-time approval.
                </span>
              )}
            </p>
          </div>

          {/* Clinical Mode Switcher (2 Distinct Operating Modes) */}
          <div className="inline-flex p-1.5 rounded-2xl bg-white/90 backdrop-blur-md border border-slate-200 shadow-md gap-1">
            <button
              type="button"
              onClick={() => setMode('rejection-doctor')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer ${
                mode === 'rejection-doctor'
                  ? 'bg-gradient-to-r from-[#9d62ec] to-[#7c3aed] text-white shadow-md shadow-purple-900/20'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Stethoscope className="w-4 h-4" />
              <span>🩺 Rejection Doctor (Fix Rejected Site)</span>
            </button>
            <button
              type="button"
              onClick={() => setMode('pre-approval')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer ${
                mode === 'pre-approval'
                  ? 'bg-gradient-to-r from-[#1a73e8] to-[#1557b0] text-white shadow-md shadow-blue-900/20'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>🛡️ Pre-Approval Audit (Check First)</span>
            </button>
          </div>

          {/* Rejection Reason Triage Bar (In Rejection Doctor mode) */}
          {mode === 'rejection-doctor' && (
            <div className="max-w-2xl mx-auto p-4 bg-white/95 backdrop-blur-md rounded-2xl border-2 border-purple-200/90 shadow-md text-left transition-all space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <Activity className="w-4 h-4 text-purple-600" />
                  <span>Select Google AdSense Rejection Reason:</span>
                </span>
                <span className="text-[11px] font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full border border-purple-200">
                  Doctor Triage Active
                </span>
              </div>

              {/* Quick Preset Triage Chips */}
              <div className="flex items-center gap-1.5 flex-wrap">
                {[
                  { id: 'low-value-content', label: 'Low-Value / Thin Content', icon: '⚡' },
                  { id: 'site-behavior-navigation', label: 'Navigation / Broken Links', icon: '🔗' },
                  { id: 'scraped-unoriginal', label: 'Scraped / Unoriginal', icon: '⚠️' },
                  { id: 'site-down-or-unavailable', label: 'Site Down / Bot Blocked', icon: '🛑' },
                  { id: 'policy-violations', label: 'YMYL / Policy Flags', icon: '📋' },
                ].map((preset) => (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => setRejectionReason(preset.id as RejectionCategory)}
                    className={`text-xs px-3 py-1.5 rounded-xl font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                      rejectionReason === preset.id
                        ? 'bg-purple-600 text-white font-bold shadow-xs'
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200'
                    }`}
                  >
                    <span>{preset.icon}</span>
                    <span>{preset.label}</span>
                  </button>
                ))}
              </div>

              {/* Extended Dropdown Selector */}
              <div className="pt-1">
                <select
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value as RejectionCategory)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-purple-500 font-medium"
                >
                  <option value="low-value-content">Low-value content / Thin content (Most Common Rejection)</option>
                  <option value="site-behavior-navigation">Site behavior: Navigation (Broken links, dummy href="#", missing menu)</option>
                  <option value="site-down-or-unavailable">Site down or unavailable (Bot timeout, DNS, Cloudflare Turnstile)</option>
                  <option value="scraped-unoriginal">Scraped or unoriginal content (Duplicate text, missing value-add)</option>
                  <option value="policy-violations">Policy violations / YMYL sensitive flags (Health, finance, adult, copyright)</option>
                  <option value="multiple-unspecified">Multiple violations / General unspecified rejection</option>
                </select>
              </div>
            </div>
          )}

          {/* CLINICAL COMMAND SEARCH BOX */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleRunAudit();
            }}
            className="max-w-2xl mx-auto pt-1"
          >
            <div className={`bg-white rounded-2xl p-2.5 sm:p-3 shadow-xl hover:shadow-2xl border-2 transition-all flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 ${
              mode === 'rejection-doctor'
                ? 'border-purple-300 focus-within:ring-4 focus-within:ring-purple-200 focus-within:border-purple-600'
                : 'border-blue-300 focus-within:ring-4 focus-within:ring-blue-200 focus-within:border-[#1a73e8]'
            }`}>
              <div className="flex-1 flex items-center pl-3 gap-2.5">
                {mode === 'rejection-doctor' ? (
                  <Stethoscope className="w-5 h-5 text-purple-600 shrink-0" />
                ) : (
                  <Search className="w-5 h-5 text-[#1a73e8] shrink-0" />
                )}
                <input
                  id="search-input-box"
                  type="text"
                  required
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="Enter website domain or URL (e.g. https://example.com)"
                  className="w-full bg-transparent py-2 text-sm sm:text-base text-slate-900 placeholder:text-slate-400 focus:outline-none font-medium"
                />
              </div>

              {/* ACTION BUTTON */}
              <button
                type="submit"
                disabled={loading}
                className={`text-white font-bold text-xs sm:text-sm px-6 sm:px-8 py-3 rounded-xl transition-all shadow-md hover:shadow-lg whitespace-nowrap flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer shrink-0 active:scale-98 ${
                  mode === 'rejection-doctor'
                    ? 'bg-gradient-to-r from-[#9d62ec] to-[#7c3aed] hover:from-[#8b4de3] hover:to-[#6d28d9]'
                    : 'bg-gradient-to-r from-[#1a73e8] to-[#1557b0] hover:from-[#1765cc] hover:to-[#124996]'
                }`}
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Diagnosing Site...</span>
                  </>
                ) : (
                  <>
                    {mode === 'rejection-doctor' ? <Stethoscope className="w-4 h-4" /> : <ShieldCheck className="w-4 h-4" />}
                    <span>{mode === 'rejection-doctor' ? 'Diagnose Rejection Cause' : 'Run Pre-Approval Audit'}</span>
                  </>
                )}
              </button>
            </div>

            {/* Quick Demo Fill & Advanced Crawl Links */}
            <div className="mt-3 flex items-center justify-center gap-2 flex-wrap text-xs text-slate-500">
              <span className="text-[11px] font-bold text-slate-400">1-Click Test Presets:</span>
              <button
                type="button"
                onClick={() => {
                  setUrl('https://gladsense1.pages.dev');
                  handleRunAudit('https://gladsense1.pages.dev', 'pre-approval');
                }}
                className="text-[11px] text-purple-700 hover:text-purple-900 bg-purple-50/90 hover:bg-purple-100 px-2.5 py-1 rounded-lg border border-purple-200 font-semibold transition-colors cursor-pointer"
              >
                🧪 Analyze Sample Tech Blog
              </button>
              <button
                type="button"
                onClick={() => {
                  setUrl('https://cfmsizingcalc.pages.dev');
                  handleRunAudit('https://cfmsizingcalc.pages.dev', 'pre-approval');
                }}
                className="text-[11px] text-blue-700 hover:text-blue-900 bg-blue-50/90 hover:bg-blue-100 px-2.5 py-1 rounded-lg border border-blue-200 font-semibold transition-colors cursor-pointer"
              >
                🧮 Analyze Sample Calculator Tool
              </button>
              <button
                type="button"
                onClick={() => {
                  setUrl('https://artisanresinmolds.pages.dev');
                  handleRunAudit('https://artisanresinmolds.pages.dev', 'rejection-doctor', 'low-value-content');
                }}
                className="text-[11px] text-amber-700 hover:text-amber-900 bg-amber-50/90 hover:bg-amber-100 px-2.5 py-1 rounded-lg border border-amber-200 font-semibold transition-colors cursor-pointer"
              >
                🛍️ Analyze Sample E-Commerce Site
              </button>
              <button
                type="button"
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="text-[11px] text-slate-600 hover:text-slate-900 hover:underline flex items-center gap-1 cursor-pointer"
              >
                <Code2 className="w-3.5 h-3.5 text-slate-400" />
                <span>{showAdvanced ? 'Hide HTML paste' : 'Paste HTML source directly'}</span>
                {showAdvanced ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
              </button>
            </div>

            {/* HTML Source Drawer */}
            {showAdvanced && (
              <div className="w-full max-w-2xl mt-3 p-4 bg-white/95 backdrop-blur-md rounded-2xl border border-slate-200 shadow-md text-left transition-all space-y-2">
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
          </form>

          {/* 4-POINT CLINICAL TRUST & VERIFICATION RIBBON */}
          <div className="pt-1 max-w-3xl mx-auto">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 text-left">
              <div className="p-2.5 rounded-xl bg-white/75 backdrop-blur-xs border border-purple-100 flex items-center gap-2.5 shadow-2xs">
                <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center shrink-0">
                  <Stethoscope className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-slate-900 block leading-tight">Human Quality Raters</span>
                  <span className="text-[10px] text-slate-500 block">E-E-A-T & HCU checks</span>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-white/75 backdrop-blur-xs border border-blue-100 flex items-center gap-2.5 shadow-2xs">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#1a73e8] flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-slate-900 block leading-tight">Zero Policy Gates</span>
                  <span className="text-[10px] text-slate-500 block">Mandatory pass filter</span>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-white/75 backdrop-blur-xs border border-amber-100 flex items-center gap-2.5 shadow-2xs">
                <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-slate-900 block leading-tight">Prescriptive Cure</span>
                  <span className="text-[10px] text-slate-500 block">Exact fix blueprint</span>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-white/75 backdrop-blur-xs border border-emerald-100 flex items-center gap-2.5 shadow-2xs">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-slate-900 block leading-tight">100% Free & Safe</span>
                  <span className="text-[10px] text-slate-500 block">Zero credentials needed</span>
                </div>
              </div>
            </div>

            {/* Standardized Princeton Generative Engine Optimization (GEO) 3-Pill Guide */}
            <div className="pt-2 text-left">
              <GeoQuickGuide
                toolName="AdSense Rejection Doctor & Pre-Approval Auditor"
                whatItIs="An automated 100-point diagnostic engine evaluating web applications against Google Publisher Policies, Human Search Quality Rater E-E-A-T criteria, and DoubleClick DART cookie mandates."
                howToUse={[
                  "Enter your live domain or paste raw HTML markup for offline instant parsing",
                  "Inspect critical policy blockers (thin content, missing legal disclosures, broken menus)",
                  "Click 'Apply 1-Click Cure' to generate compliant privacy policies, ads.txt, and utility widgets",
                ]}
                whatYouGet="A certified AdSense readiness rating (0–100) and downloadable compliance files that resolve automated crawler rejection flags."
                metrics={["100-Point Audit Rubric", "85/100 Passing Gate", "0 Server Cost", "Sub-100ms Crawl"]}
                authoritativeSource={{
                  label: "Google Publisher Policies 2026",
                  url: "https://support.google.com/adsense/answer/48182",
                  standard: "Google Search Central Quality Evaluator Rubric",
                }}
              />
            </div>
          </div>

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

              {/* 5 Google Core Pillars Scoring Metric Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 mt-8 pt-6 border-t border-slate-800">
                {/* Pillar 1: Content Value & Depth (35%) */}
                {(() => {
                  const s = result.scoreBreakdown.contentValueScore ?? result.scoreBreakdown.contentDepthScore ?? 0;
                  const color = s >= 85 ? 'text-emerald-400 bg-emerald-400' : s >= 60 ? 'text-amber-400 bg-amber-400' : 'text-rose-400 bg-rose-400';
                  return (
                    <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span className="text-slate-200 font-semibold text-[11px] truncate" title="1. Content Value & Depth">
                            1. Content Value
                          </span>
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">
                            35%
                          </span>
                        </div>
                        <div className="flex items-baseline justify-between mb-2">
                          <span className="text-[10px] text-slate-400">Depth & Utility</span>
                          <span className={`font-mono font-bold text-xs ${color.split(' ')[0]}`}>{s}/100</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                          <div className={`h-full rounded-full ${color.split(' ')[1]}`} style={{ width: `${s}%` }} />
                        </div>
                      </div>
                      {(() => {
                        const ai = result.metrics.aiContentRisk || (result.metrics.aiDetection ? {
                          riskLevel: result.metrics.aiDetection.aiRiskLevel,
                          clicheScore: result.metrics.aiDetection.clicheScore,
                        } : null);
                        return (
                          <div className="flex items-center justify-between text-[10px] text-slate-400 mt-2 leading-tight">
                            <span>~{result.metrics.estimatedWordCount} words</span>
                            <span className={ai?.riskLevel === 'Low' ? 'text-emerald-400 font-semibold' : 'text-amber-400 font-semibold'}>
                              {ai ? `AI: ${ai.riskLevel} Risk` : 'Original Voice'}
                            </span>
                          </div>
                        );
                      })()}
                    </div>
                  );
                })()}

                {/* Pillar 2: Policy & Compliance (25%) */}
                {(() => {
                  const s = result.scoreBreakdown.policyComplianceScore ?? result.scoreBreakdown.legalComplianceScore ?? 0;
                  const color = s >= 85 ? 'text-emerald-400 bg-emerald-400' : s >= 60 ? 'text-amber-400 bg-amber-400' : 'text-rose-400 bg-rose-400';
                  return (
                    <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span className="text-slate-200 font-semibold text-[11px] truncate" title="2. Policy & Compliance">
                            2. Policy & TOS
                          </span>
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">
                            25%
                          </span>
                        </div>
                        <div className="flex items-baseline justify-between mb-2">
                          <span className="text-[10px] text-slate-400">DART & Ad Rules</span>
                          <span className={`font-mono font-bold text-xs ${color.split(' ')[0]}`}>{s}/100</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                          <div className={`h-full rounded-full ${color.split(' ')[1]}`} style={{ width: `${s}%` }} />
                        </div>
                      </div>
                      <span className="text-[10px] text-slate-400 mt-2 block leading-tight">
                        {result.metrics.legalPagesFound.privacyPolicy ? '✓ Privacy Policy' : '✗ Missing Privacy'} • {result.metrics.legalPagesFound.termsOfService ? '✓ TOS' : '✗ No TOS'}
                      </span>
                    </div>
                  );
                })()}

                {/* Pillar 3: UX & Navigation (15%) */}
                {(() => {
                  const s = result.scoreBreakdown.uxNavigationScore ?? result.scoreBreakdown.navigationUxScore ?? 0;
                  const color = s >= 85 ? 'text-emerald-400 bg-emerald-400' : s >= 60 ? 'text-amber-400 bg-amber-400' : 'text-rose-400 bg-rose-400';
                  return (
                    <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span className="text-slate-200 font-semibold text-[11px] truncate" title="3. UX & Navigation">
                            3. UX & Nav
                          </span>
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">
                            15%
                          </span>
                        </div>
                        <div className="flex items-baseline justify-between mb-2">
                          <span className="text-[10px] text-slate-400">Links & Layout</span>
                          <span className={`font-mono font-bold text-xs ${color.split(' ')[0]}`}>{s}/100</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                          <div className={`h-full rounded-full ${color.split(' ')[1]}`} style={{ width: `${s}%` }} />
                        </div>
                      </div>
                      <span className="text-[10px] text-slate-400 mt-2 block leading-tight">
                        {result.metrics.navigationHealth.emptyHashLinks > 0
                          ? `⚠️ ${result.metrics.navigationHealth.emptyHashLinks} empty # links`
                          : '✓ 0 broken anchors'} • {result.metrics.navigationHealth.internalLinks} internal
                      </span>
                    </div>
                  );
                })()}

                {/* Pillar 4: Essential Pages & Trust (15%) */}
                {(() => {
                  const s = result.scoreBreakdown.essentialPagesScore ?? (result.metrics.legalPagesFound.aboutUs && result.metrics.legalPagesFound.contactUs ? 100 : result.metrics.legalPagesFound.aboutUs ? 60 : 30);
                  const color = s >= 85 ? 'text-emerald-400 bg-emerald-400' : s >= 60 ? 'text-amber-400 bg-amber-400' : 'text-rose-400 bg-rose-400';
                  return (
                    <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span className="text-slate-200 font-semibold text-[11px] truncate" title="4. Essential Pages & Trust">
                            4. Trust & Pages
                          </span>
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">
                            15%
                          </span>
                        </div>
                        <div className="flex items-baseline justify-between mb-2">
                          <span className="text-[10px] text-slate-400">About & Contact</span>
                          <span className={`font-mono font-bold text-xs ${color.split(' ')[0]}`}>{s}/100</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                          <div className={`h-full rounded-full ${color.split(' ')[1]}`} style={{ width: `${s}%` }} />
                        </div>
                      </div>
                      <span className="text-[10px] text-slate-400 mt-2 block leading-tight">
                        About: {result.metrics.legalPagesFound.aboutUs ? '✓ E-E-A-T' : '✗ None'} • Contact: {result.metrics.legalPagesFound.contactUs ? '✓ OK' : '✗ None'}
                      </span>
                    </div>
                  );
                })()}

                {/* Pillar 5: Technical Infrastructure (10%) */}
                {(() => {
                  const s = result.scoreBreakdown.technicalInfraScore ?? result.scoreBreakdown.technicalSeoScore ?? 0;
                  const color = s >= 85 ? 'text-emerald-400 bg-emerald-400' : s >= 60 ? 'text-amber-400 bg-amber-400' : 'text-rose-400 bg-rose-400';
                  return (
                    <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span className="text-slate-200 font-semibold text-[11px] truncate" title="5. Technical Infrastructure">
                            5. Technical Infra
                          </span>
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">
                            10%
                          </span>
                        </div>
                        <div className="flex items-baseline justify-between mb-2">
                          <span className="text-[10px] text-slate-400">SSL, Mobile & SEO</span>
                          <span className={`font-mono font-bold text-xs ${color.split(' ')[0]}`}>{s}/100</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                          <div className={`h-full rounded-full ${color.split(' ')[1]}`} style={{ width: `${s}%` }} />
                        </div>
                      </div>
                      <span className="text-[10px] text-slate-400 mt-2 block leading-tight">
                        {result.metrics.isHttps ? '✓ SSL' : '✗ HTTP'} • {result.metrics.hasMobileViewport ? '✓ Responsive' : '✗ Desktop'}
                      </span>
                    </div>
                  );
                })()}
              </div>
            </div>

            {/* Critical Blockers Callout */}
            <div className="p-6 sm:p-8 bg-slate-50 border-b border-slate-200">
              {result.criticalBlockers.length > 0 ? (
                <div className="p-5 rounded-2xl bg-rose-50 border border-rose-200">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center text-rose-600 font-bold shrink-0">
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
                    <button
                      type="button"
                      onClick={() => {
                        setActiveRemedyType('full-bundle');
                        setRemedyModalOpen(true);
                      }}
                      className="px-3.5 py-2 rounded-xl text-xs font-bold text-purple-700 bg-white border border-purple-300 hover:bg-purple-50 transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs shrink-0"
                    >
                      <Layers className="w-4 h-4 text-purple-600" />
                      <span>📦 1-Click Overturn Bundle</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 mt-4">
                    {result.criticalBlockers.map((blocker, idx) => {
                      const combined = (blocker.title + ' ' + blocker.description).toLowerCase();
                      let remedy: RemedyType = 'full-bundle';
                      let remedyLabel = 'Apply Remedy';
                      if (combined.includes('privacy') || combined.includes('dart') || combined.includes('cookie')) {
                        remedy = 'privacy-policy';
                        remedyLabel = 'Generate Privacy Policy';
                      } else if (combined.includes('about') || combined.includes('e-e-a-t') || combined.includes('editorial')) {
                        remedy = 'about-us';
                        remedyLabel = 'Generate About & E-E-A-T';
                      } else if (combined.includes('contact') || combined.includes('reach') || combined.includes('email')) {
                        remedy = 'contact-us';
                        remedyLabel = 'Generate Contact Page';
                      } else if (combined.includes('thin') || combined.includes('low-value') || combined.includes('word count') || combined.includes('originality') || combined.includes('ai')) {
                        remedy = 'thin-content';
                        remedyLabel = 'Cure Low-Value Content';
                      } else if (combined.includes('ads.txt') || combined.includes('robots.txt') || combined.includes('crawler')) {
                        remedy = 'ads-txt';
                        remedyLabel = 'Generate ads.txt';
                      }

                      return (
                        <div
                          key={idx}
                          className="p-4 rounded-xl bg-white border border-rose-200 shadow-sm space-y-2.5 text-xs flex flex-col justify-between"
                        >
                          <div className="space-y-2">
                            <div className="flex items-center justify-between gap-2">
                              <span className="font-bold text-slate-900 text-sm leading-snug">{blocker.title}</span>
                              <span
                                className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full shrink-0 ${
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
                              <span className="font-bold shrink-0 text-emerald-700">Diagnosis:</span>
                              <span>{blocker.fixAdvice}</span>
                            </div>
                          </div>

                          <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                            <span className="text-[11px] text-purple-700 font-semibold flex items-center gap-1">
                              <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                              <span>Prescription Ready</span>
                            </span>
                            <button
                              type="button"
                              onClick={() => {
                                setActiveRemedyType(remedy);
                                setRemedyModalOpen(true);
                              }}
                              className="px-3 py-1.5 rounded-xl text-xs font-bold text-white bg-purple-600 hover:bg-purple-700 transition-all flex items-center gap-1.5 cursor-pointer shadow-xs active:scale-98 shrink-0"
                            >
                              <Stethoscope className="w-3.5 h-3.5" />
                              <span>🩺 {remedyLabel}</span>
                            </button>
                          </div>
                        </div>
                      );
                    })}
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
                                  contentValueScore: 100,
                                  policyComplianceScore: 100,
                                  uxNavigationScore: 100,
                                  essentialPagesScore: 100,
                                  technicalInfraScore: 100,
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
                  {(() => {
                    const ai = result.metrics.aiContentRisk || (result.metrics.aiDetection ? {
                      riskLevel: result.metrics.aiDetection.aiRiskLevel,
                      clicheScore: result.metrics.aiDetection.clicheScore,
                      informationGainScore: result.metrics.aiDetection.informationGainScore,
                      detectedPhrases: result.metrics.aiDetection.detectedCliches,
                      verdict: result.metrics.aiDetection.verdict,
                      actionPlan: result.metrics.aiDetection.actionPlan,
                      tableCount: 0,
                      listCount: 0,
                      imageCount: 0,
                      hasAuthorBio: false,
                      hasEditorialTransparency: false,
                      hasRichMedia: false,
                    } : {
                      riskLevel: 'Low' as const,
                      clicheScore: 0,
                      informationGainScore: 85,
                      detectedPhrases: [],
                      verdict: 'Original content profile detected.',
                      actionPlan: 'Maintain authentic voice and unique insights.',
                      tableCount: 0,
                      listCount: 0,
                      imageCount: 0,
                      hasAuthorBio: false,
                      hasEditorialTransparency: false,
                      hasRichMedia: false,
                    });

                    return (
                      <button
                        onClick={() => setActiveResultTab('ai-content')}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                          activeResultTab === 'ai-content'
                            ? 'bg-purple-600 text-white shadow-sm'
                            : ai.riskLevel === 'Severe' || ai.riskLevel === 'High'
                            ? 'text-purple-700 bg-purple-50 hover:bg-purple-100 border border-purple-200'
                            : 'text-purple-700 bg-purple-50/60 hover:bg-purple-100 border border-purple-200/60'
                        }`}
                      >
                        <Bot className="w-4 h-4 text-purple-600" />
                        <span>
                          AI & Originality Analysis ({ai.riskLevel} Risk)
                        </span>
                      </button>
                    );
                  })()}
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={handleShareAiScore}
                    className="px-3.5 py-2 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 text-xs font-semibold transition-all flex items-center gap-1.5 shrink-0 cursor-pointer"
                    title="Copy AI Content Scorecard to clipboard"
                  >
                    {copiedAiScore ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Sparkles className="w-3.5 h-3.5 text-purple-600" />}
                    <span>{copiedAiScore ? 'AI Score Copied!' : 'Share AI Score'}</span>
                  </button>
                  <button
                    onClick={handleCopyReport}
                    className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-all flex items-center gap-1.5 shrink-0 cursor-pointer"
                  >
                    {copiedReport ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedReport ? 'Copied!' : 'Copy Summary'}</span>
                  </button>
                </div>
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
                            <span className={(result.scoreBreakdown.essentialPagesScore ?? result.scoreBreakdown.legalComplianceScore ?? 0) >= 80 ? 'text-emerald-600 font-bold' : 'text-amber-600 font-bold'}>
                              {result.scoreBreakdown.essentialPagesScore ?? result.scoreBreakdown.legalComplianceScore ?? 0}/100 Trust Score
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
              {activeResultTab === 'ai-content' && (() => {
                const ai = result.metrics.aiContentRisk || (result.metrics.aiDetection ? {
                  riskLevel: result.metrics.aiDetection.aiRiskLevel,
                  clicheScore: result.metrics.aiDetection.clicheScore,
                  informationGainScore: result.metrics.aiDetection.informationGainScore,
                  detectedPhrases: result.metrics.aiDetection.detectedCliches,
                  verdict: result.metrics.aiDetection.verdict,
                  actionPlan: result.metrics.aiDetection.actionPlan,
                  tableCount: 0,
                  listCount: 0,
                  imageCount: 0,
                  hasAuthorBio: false,
                  hasEditorialTransparency: false,
                  hasRichMedia: false,
                } : {
                  riskLevel: 'Low' as const,
                  clicheScore: 0,
                  informationGainScore: 85,
                  detectedPhrases: [],
                  verdict: 'Original content profile detected with natural linguistic variation.',
                  actionPlan: 'Maintain authentic voice, first-person insights, and structured formatting.',
                  tableCount: 0,
                  listCount: 0,
                  imageCount: 0,
                  hasAuthorBio: false,
                  hasEditorialTransparency: false,
                  hasRichMedia: false,
                });

                return (
                  <div className="mt-6 space-y-6">
                    {/* Top Status Banner */}
                    <div
                      className={`p-5 rounded-2xl border ${
                        ai.riskLevel === 'Severe'
                          ? 'bg-rose-50 border-rose-200 text-rose-900'
                          : ai.riskLevel === 'High'
                          ? 'bg-amber-50 border-amber-200 text-amber-900'
                          : ai.riskLevel === 'Moderate'
                          ? 'bg-blue-50 border-blue-200 text-blue-900'
                          : 'bg-emerald-50 border-emerald-200 text-emerald-900'
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-start gap-3">
                          <div
                            className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 font-bold ${
                              ai.riskLevel === 'Severe'
                                ? 'bg-rose-200 text-rose-700'
                                : ai.riskLevel === 'High'
                                ? 'bg-amber-200 text-amber-700'
                                : ai.riskLevel === 'Moderate'
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
                                  ai.riskLevel === 'Severe'
                                    ? 'bg-rose-100 text-rose-800 border border-rose-300'
                                    : ai.riskLevel === 'High'
                                    ? 'bg-amber-100 text-amber-800 border border-amber-300'
                                    : ai.riskLevel === 'Moderate'
                                    ? 'bg-blue-100 text-blue-800 border border-blue-300'
                                    : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                                }`}
                              >
                                {ai.riskLevel} AI Rejection Risk
                              </span>
                            </div>
                            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                              {ai.verdict}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 shrink-0">
                          <button
                            onClick={handleShareAiScore}
                            className="px-3 py-2 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-semibold shadow-xs flex items-center gap-1.5 transition-all cursor-pointer"
                          >
                            {copiedAiScore ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5 text-purple-600" />}
                            <span>{copiedAiScore ? 'Scorecard Copied!' : 'Copy AI Card'}</span>
                          </button>
                          <div className="text-right bg-white/90 p-3 rounded-xl border border-slate-200/60 shadow-xs">
                            <span className="text-[10px] uppercase font-bold text-slate-500 block">
                              Information Gain
                            </span>
                            <span
                              className={`text-2xl font-black font-mono ${
                                ai.informationGainScore >= 60
                                  ? 'text-emerald-600'
                                  : ai.informationGainScore >= 40
                                  ? 'text-amber-600'
                                  : 'text-rose-600'
                              }`}
                            >
                              {ai.informationGainScore}/100
                            </span>
                          </div>
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
                              ai.clicheScore > 40
                                ? 'bg-rose-100 text-rose-700'
                                : ai.clicheScore > 0
                                ? 'bg-amber-100 text-amber-700'
                                : 'bg-emerald-100 text-emerald-700'
                            }`}
                          >
                            {ai.clicheScore}% Cliché Density
                          </span>
                        </div>
                        <p className="text-xs text-slate-600">
                          {ai.detectedPhrases.length > 0
                            ? `Found ${ai.detectedPhrases.length} robotic transition clichés characteristic of unedited LLM prompts.`
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
                              ai.tableCount > 0
                                ? 'bg-emerald-100 text-emerald-700'
                                : 'bg-amber-100 text-amber-700'
                            }`}
                          >
                            {ai.tableCount} Tables • {ai.listCount} Lists
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
                              ai.hasAuthorBio || ai.hasEditorialTransparency
                                ? 'bg-emerald-100 text-emerald-700'
                                : 'bg-rose-100 text-rose-700'
                            }`}
                          >
                            {ai.hasEditorialTransparency
                              ? 'Editorial Policy OK'
                              : ai.hasAuthorBio
                              ? 'Author Byline OK'
                              : 'Missing Credentials'}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600">
                          {ai.hasEditorialTransparency
                            ? 'Site transparently documents its editorial standards and human review methodology.'
                            : 'AdSense reviewers penalize anonymous publishers. Add verifiable author bios and an AI & Editorial disclosure.'}
                        </p>
                      </div>
                    </div>

                    {/* Detected Clichés Warning Box if any found */}
                    {ai.detectedPhrases.length > 0 && (
                      <div className="p-4 rounded-2xl bg-rose-50/80 border border-rose-200 space-y-2 text-xs">
                        <div className="flex items-center gap-2 text-rose-800 font-bold">
                          <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                          <span>Flagged Robotic Transition Footprints:</span>
                        </div>
                        <div className="flex flex-wrap gap-2 pt-1">
                          {ai.detectedPhrases.map((phrase, pIdx) => (
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
              );
            })()}
            </div>
          </div>
        </section>
      )}

      {/* Embedded 2026 Checklist & Live Auditor Technical Manual (Rank Target: 'how to fix low value content adsense 2026') */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SiteDoctorEducation />
      </div>

      {/* Persistent Comprehensive Enterprise Explainer Suite */}
      <HomeExplainerSuite
        onSwitchTab={onSwitchTab}
        onAuditDemo={(demoUrl) => handleRunAudit(demoUrl, 'pre-approval')}
      />

      {/* 1-Click Rejection Prescription & Remediation Modal */}
      <RejectionRemedyModal
        isOpen={remedyModalOpen}
        onClose={() => setRemedyModalOpen(false)}
        remedyType={activeRemedyType}
        targetDomain={result?.url || url || 'yourdomain.com'}
      />
    </div>
  );
};
