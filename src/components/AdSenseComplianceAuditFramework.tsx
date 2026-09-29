import React, { useState } from 'react';
import {
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  FileCheck,
  RotateCcw,
  Sparkles,
  Bot,
  Users,
  ExternalLink,
  ChevronRight,
  Layers,
  FileText,
  Zap,
  Info,
  Check,
  Clock,
  ArrowRight,
} from 'lucide-react';

interface AuditItem {
  id: string;
  category: 'content' | 'policy' | 'ux' | 'trust' | 'technical';
  categoryTitle: string;
  itemCode: string;
  name: string;
  maxPoints: number;
  assignedPoints: number;
  inspectorRole: 'Bot + Human' | 'Automated Classifier' | 'Human Inspector' | 'Automated Crawler';
  criteria: string;
  isPassed: boolean;
  isCriticalFailureGate?: boolean; // For Category 2 policy violations
}

export const AdSenseComplianceAuditFramework: React.FC = () => {
  // State for all items across the 5 categories
  const [auditItems, setAuditItems] = useState<AuditItem[]>([
    // Category 1: Content Value & Utility (35 Points Max)
    {
      id: 'c1-originality',
      category: 'content',
      categoryTitle: '1. Content Value & Depth (35 Pts)',
      itemCode: '1.1',
      name: 'Originality & Plagiarism Check',
      maxPoints: 10,
      assignedPoints: 10,
      inspectorRole: 'Bot + Human',
      criteria: 'Duplicate or heavily scraped text across the site must be under 15%. Raw, unedited LLM/AI text is prohibited; all AI content must be human-edited.',
      isPassed: true,
    },
    {
      id: 'c1-volume',
      category: 'content',
      categoryTitle: '1. Content Value & Depth (35 Pts)',
      itemCode: '1.2',
      name: 'Content Volume & Depth',
      maxPoints: 10,
      assignedPoints: 10,
      inspectorRole: 'Bot + Human',
      criteria: 'Blogs require 15–20 published articles (1,000+ words). Web apps/SPAs must include contextual documentation, guides, and FAQs (>300 words/view).',
      isPassed: true,
    },
    {
      id: 'c1-eeat',
      category: 'content',
      categoryTitle: '1. Content Value & Depth (35 Pts)',
      itemCode: '1.3',
      name: 'E-E-A-T & Value Add',
      maxPoints: 10,
      assignedPoints: 10,
      inspectorRole: 'Bot + Human',
      criteria: 'Display explicit author bios, credential attributions, primary references/sources, and custom images or original data visuals.',
      isPassed: true,
    },
    {
      id: 'c1-utility',
      category: 'content',
      categoryTitle: '1. Content Value & Depth (35 Pts)',
      itemCode: '1.4',
      name: 'Web App Utility',
      maxPoints: 5,
      assignedPoints: 5,
      inspectorRole: 'Bot + Human',
      criteria: 'Tool/app features must be fully functional (dynamic calculators, SaaS platforms, portals) and deliver genuine user utility.',
      isPassed: true,
    },

    // Category 2: Google Publisher Policy Compliance (25 Points Max — Zero-Tolerance Gate)
    {
      id: 'c2-prohibited',
      category: 'policy',
      categoryTitle: '2. Google Publisher Policy Compliance (25 Pts - Zero Tolerance)',
      itemCode: '2.1',
      name: 'Prohibited Content Check',
      maxPoints: 10,
      assignedPoints: 10,
      inspectorRole: 'Automated Classifier',
      criteria: 'Zero tolerance for adult material, illegal substances, hate speech, gambling, violence, or dangerous downloads/malware.',
      isPassed: true,
      isCriticalFailureGate: true,
    },
    {
      id: 'c2-copyright',
      category: 'policy',
      categoryTitle: '2. Google Publisher Policy Compliance (25 Pts - Zero Tolerance)',
      itemCode: '2.2',
      name: 'Copyright & IP Integrity',
      maxPoints: 10,
      assignedPoints: 10,
      inspectorRole: 'Automated Classifier',
      criteria: 'No unlicensed images, embedded pirated media, or direct links to copyrighted software downloads. Use custom assets or verified licenses.',
      isPassed: true,
      isCriticalFailureGate: true,
    },
    {
      id: 'c2-deceptive-ui',
      category: 'policy',
      categoryTitle: '2. Google Publisher Policy Compliance (25 Pts - Zero Tolerance)',
      itemCode: '2.3',
      name: 'Misleading & Deceptive UI',
      maxPoints: 5,
      assignedPoints: 5,
      inspectorRole: 'Automated Classifier',
      criteria: 'No fake download buttons, ad placements mirroring site navigation, forced click-redirects, or disruptive popups.',
      isPassed: true,
      isCriticalFailureGate: true,
    },

    // Category 3: User Experience & Navigation (15 Points Max)
    {
      id: 'c3-nav-clarity',
      category: 'ux',
      categoryTitle: '3. User Experience & Navigation (15 Pts)',
      itemCode: '3.1',
      name: 'Navigation Clarity',
      maxPoints: 5,
      assignedPoints: 5,
      inspectorRole: 'Human Inspector',
      criteria: 'Active header and footer menus. Zero broken links, generic placeholder labels (e.g. "Category 1"), or empty categories.',
      isPassed: true,
    },
    {
      id: 'c3-mobile',
      category: 'ux',
      categoryTitle: '3. User Experience & Navigation (15 Pts)',
      itemCode: '3.2',
      name: 'Mobile Optimization',
      maxPoints: 5,
      assignedPoints: 5,
      inspectorRole: 'Human Inspector',
      criteria: 'Verified via Googlebot-Mobile settings. Responsive viewports, readable typography, and touch target padding >= 48x48px.',
      isPassed: true,
    },
    {
      id: 'c3-layout',
      category: 'ux',
      categoryTitle: '3. User Experience & Navigation (15 Pts)',
      itemCode: '3.3',
      name: 'Layout Stability & Visual Quality',
      maxPoints: 5,
      assignedPoints: 5,
      inspectorRole: 'Human Inspector',
      criteria: 'Clean UI free of intrusive overlays, full-screen popups on initial landing, or severe Cumulative Layout Shifts (CLS).',
      isPassed: true,
    },

    // Category 4: Essential Pages & Trust Signals (15 Points Max)
    {
      id: 'c4-privacy',
      category: 'trust',
      categoryTitle: '4. Essential Pages & Trust Signals (15 Pts)',
      itemCode: '4.1',
      name: 'Privacy Policy Page',
      maxPoints: 5,
      assignedPoints: 5,
      inspectorRole: 'Bot + Human',
      criteria: 'Explicit AdSense/cookie usage disclosures, third-party vendor tracking clauses, and GDPR/CCPA compliance notices.',
      isPassed: true,
    },
    {
      id: 'c4-about',
      category: 'trust',
      categoryTitle: '4. Essential Pages & Trust Signals (15 Pts)',
      itemCode: '4.2',
      name: 'About Us Page',
      maxPoints: 5,
      assignedPoints: 5,
      inspectorRole: 'Bot + Human',
      criteria: 'Genuine organizational background, company mission statement, real physical location (if applicable), and team bios.',
      isPassed: true,
    },
    {
      id: 'c4-contact',
      category: 'trust',
      categoryTitle: '4. Essential Pages & Trust Signals (15 Pts)',
      itemCode: '4.3',
      name: 'Contact Us Page & Form',
      maxPoints: 5,
      assignedPoints: 5,
      inspectorRole: 'Bot + Human',
      criteria: 'Functional contact form alongside an active admin/business email address (e.g. contact@yourdomain.com).',
      isPassed: true,
    },

    // Category 5: Technical Infrastructure & Indexing (10 Points Max)
    {
      id: 'c5-https',
      category: 'technical',
      categoryTitle: '5. Technical Infrastructure & Indexing (10 Pts)',
      itemCode: '5.1',
      name: 'HTTPS Security',
      maxPoints: 3,
      assignedPoints: 3,
      inspectorRole: 'Automated Crawler',
      criteria: 'Valid SSL/TLS certificate installed across all routes with zero mixed-content HTTP assets.',
      isPassed: true,
    },
    {
      id: 'c5-indexing',
      category: 'technical',
      categoryTitle: '5. Technical Infrastructure & Indexing (10 Pts)',
      itemCode: '5.2',
      name: 'Indexability & Sitemap',
      maxPoints: 3,
      assignedPoints: 3,
      inspectorRole: 'Automated Crawler',
      criteria: 'Active XML sitemap, verified Google Search Console property, and a robots.txt file allowing Googlebot crawling.',
      isPassed: true,
    },
    {
      id: 'c5-speed',
      category: 'technical',
      categoryTitle: '5. Technical Infrastructure & Indexing (10 Pts)',
      itemCode: '5.3',
      name: 'Site Speed & Core Web Vitals',
      maxPoints: 2,
      assignedPoints: 2,
      inspectorRole: 'Automated Crawler',
      criteria: 'Core Web Vitals assessment with Largest Contentful Paint (LCP) under 2.5 seconds.',
      isPassed: true,
    },
    {
      id: 'c5-links',
      category: 'technical',
      categoryTitle: '5. Technical Infrastructure & Indexing (10 Pts)',
      itemCode: '5.4',
      name: 'Link Integrity (0 404s)',
      maxPoints: 2,
      assignedPoints: 2,
      inspectorRole: 'Automated Crawler',
      criteria: '0% broken internal or dynamic routes—no 404 errors during recursive automated crawling.',
      isPassed: true,
    },
  ]);

  // Tab for Workflow & Remediation
  const [activeSubTab, setActiveSubTab] = useState<'matrix' | 'workflow' | 'remediation'>('matrix');
  const [activeRemediation, setActiveRemediation] = useState<'A' | 'B' | 'C'>('A');
  const [selectedRole, setSelectedRole] = useState<'All' | 'Bot + Human' | 'Automated Classifier' | 'Human Inspector' | 'Automated Crawler'>('All');

  // Interactive toggle
  const toggleItem = (id: string) => {
    setAuditItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, isPassed: !item.isPassed } : item))
    );
  };

  // Zero-Tolerance Gate calculation:
  // If any item in Category 2 fails, Category 2 score becomes 0/25 and triggers automatic REJECTION!
  const policyItems = auditItems.filter((i) => i.category === 'policy');
  const hasPolicyFailure = policyItems.some((i) => !i.isPassed);

  // Category point tallies
  const calculateCategoryScore = (cat: 'content' | 'policy' | 'ux' | 'trust' | 'technical') => {
    if (cat === 'policy' && hasPolicyFailure) return 0; // ZERO-TOLERANCE GATE
    const items = auditItems.filter((i) => i.category === cat);
    return items.reduce((acc, curr) => (curr.isPassed ? acc + curr.maxPoints : acc), 0);
  };

  const contentScore = calculateCategoryScore('content'); // Max 35
  const policyScore = calculateCategoryScore('policy');   // Max 25
  const uxScore = calculateCategoryScore('ux');           // Max 15
  const trustScore = calculateCategoryScore('trust');     // Max 15
  const technicalScore = calculateCategoryScore('technical'); // Max 10

  const totalScore = contentScore + policyScore + uxScore + trustScore + technicalScore;
  const isPassing = totalScore >= 85 && policyScore === 25 && !hasPolicyFailure;

  const resetAll = () => {
    setAuditItems((prev) => prev.map((item) => ({ ...item, isPassed: true })));
  };

  return (
    <div className="space-y-8">
      {/* SOP Header */}
      <div className="p-6 rounded-2xl bg-white border border-[#dadce0] shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                Official Compliance SOP
              </span>
              <span className="text-xs text-[#5f6368]">• Google AdSense Pre-Submission Audit Framework</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-[#202124] tracking-tight font-['Google_Sans',sans-serif]">
              Google AdSense Pre-Submission Audit & Governance Matrix
            </h1>
            <p className="text-xs sm:text-sm text-[#5f6368] mt-1 max-w-3xl leading-relaxed">
              Standardize the pre-submission audit process to guarantee a minimum score of <strong>85/100</strong> with zero critical policy violations before applying to Google AdSense.
            </p>
          </div>

          {/* Real-time Passing Status Card */}
          <div className={`p-4 rounded-xl border flex items-center gap-4 shrink-0 shadow-xs ${
            hasPolicyFailure
              ? 'bg-rose-50 border-rose-300 text-rose-950'
              : isPassing
              ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
              : 'bg-amber-50 border-amber-300 text-amber-950'
          }`}>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                Audit Status
              </div>
              <div className="text-2xl font-black font-mono">
                {totalScore} <span className="text-sm font-normal text-slate-500">/ 100 Pts</span>
              </div>
              <div className="text-[11px] font-bold mt-0.5 flex items-center gap-1">
                {hasPolicyFailure ? (
                  <span className="text-rose-700 flex items-center gap-1">
                    <XCircle className="w-3.5 h-3.5 shrink-0" /> MANDATORY REJECTION (Policy Breach)
                  </span>
                ) : isPassing ? (
                  <span className="text-emerald-700 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0" /> READY FOR SUBMISSION (≥85 Pts)
                  </span>
                ) : (
                  <span className="text-amber-800 flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5 shrink-0" /> DEFICIT (&lt;85 Pts Threshold)
                  </span>
                )}
              </div>
            </div>

            <div className="pl-3 border-l border-slate-200">
              <span className={`text-xs px-2.5 py-1 rounded-md font-bold uppercase tracking-wider ${
                hasPolicyFailure
                  ? 'bg-rose-600 text-white'
                  : isPassing
                  ? 'bg-emerald-600 text-white'
                  : 'bg-amber-600 text-white'
              }`}>
                {hasPolicyFailure ? 'REJECTED' : isPassing ? 'APPROVED' : 'DEFICIT'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Mandatory Zero-Tolerance Gate Warning Banner (If policy item failed) */}
      {hasPolicyFailure && (
        <div className="p-4 rounded-xl bg-rose-50 border-2 border-rose-300 text-rose-900 flex items-start gap-3 shadow-xs">
          <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
          <div className="space-y-1 text-xs">
            <h3 className="font-bold text-sm text-rose-950">
              Mandatory Failure Gate Triggered: Immediate Rejection
            </h3>
            <p>
              According to Section 1 of the AdSense Compliance SOP: <em>"Any critical policy flag results in an immediate 0/25 in Policy Compliance and an automatic REJECTION, regardless of total score."</em>
            </p>
            <p className="font-medium text-rose-950">
              Resolve prohibited content, copyright integrity, or deceptive UI issues before submitting your application.
            </p>
          </div>
        </div>
      )}

      {/* SOP Section Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveSubTab('matrix')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
            activeSubTab === 'matrix'
              ? 'bg-[#1a73e8] text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <FileCheck className="w-4 h-4" />
          <span>1. Governance & 100-Point Scoring Matrix</span>
        </button>

        <button
          onClick={() => setActiveSubTab('workflow')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
            activeSubTab === 'workflow'
              ? 'bg-[#1a73e8] text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>2. Pre-Submission 5-Step Workflow</span>
        </button>

        <button
          onClick={() => setActiveSubTab('remediation')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
            activeSubTab === 'remediation'
              ? 'bg-[#1a73e8] text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Zap className="w-4 h-4 text-amber-300" />
          <span>3. Remediation Standards (Rejection Scenarios)</span>
        </button>
      </div>

      {/* ======================================================== */}
      {/* SUB-TAB 1: 100-POINT GOVERNANCE & SCORING MATRIX */}
      {/* ======================================================== */}
      {activeSubTab === 'matrix' && (
        <div className="space-y-6">
          {/* Summary Breakdown Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            <div className="p-3.5 rounded-xl border border-slate-200 bg-white space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">1. Content Value</span>
              <div className="text-lg font-black text-slate-900 font-mono">{contentScore} / 35</div>
              <div className="text-[10px] text-slate-500">Bot + Human</div>
            </div>

            <div className={`p-3.5 rounded-xl border space-y-1 ${
              hasPolicyFailure ? 'bg-rose-50 border-rose-200' : 'bg-white border-slate-200'
            }`}>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">2. Policy Gate</span>
              <div className={`text-lg font-black font-mono ${hasPolicyFailure ? 'text-rose-600' : 'text-slate-900'}`}>
                {policyScore} / 25
              </div>
              <div className="text-[10px] text-slate-500">Zero-Tolerance</div>
            </div>

            <div className="p-3.5 rounded-xl border border-slate-200 bg-white space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">3. UX & Nav</span>
              <div className="text-lg font-black text-slate-900 font-mono">{uxScore} / 15</div>
              <div className="text-[10px] text-slate-500">Human Inspector</div>
            </div>

            <div className="p-3.5 rounded-xl border border-slate-200 bg-white space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">4. Trust Pages</span>
              <div className="text-lg font-black text-slate-900 font-mono">{trustScore} / 15</div>
              <div className="text-[10px] text-slate-500">Bot + Human</div>
            </div>

            <div className="p-3.5 rounded-xl border border-slate-200 bg-white space-y-1 col-span-2 sm:col-span-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">5. Tech & Speed</span>
              <div className="text-lg font-black text-slate-900 font-mono">{technicalScore} / 10</div>
              <div className="text-[10px] text-slate-500">Automated Crawler</div>
            </div>
          </div>

          {/* Interactive Checkable Audit Table */}
          <div className="p-6 rounded-2xl bg-white border border-[#dadce0] shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h2 className="text-base font-bold text-[#202124] font-['Google_Sans',sans-serif]">
                  Full 100-Point Audit Inspection Breakdown
                </h2>
                <p className="text-xs text-[#5f6368]">
                  Click any criteria item to verify or flag. The scoring engine recalculates passing readiness dynamically.
                </p>
              </div>

              <button
                onClick={resetAll}
                className="text-xs text-slate-600 hover:text-slate-900 px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset All to Passed</span>
              </button>
            </div>

            {/* Filter by Inspector Role */}
            <div className="flex items-center gap-1.5 flex-wrap pt-1 text-xs">
              <span className="text-slate-500 font-semibold text-[11px]">Filter by Inspector Role:</span>
              {[
                { id: 'All', label: 'All Reviewers (100 Pts)' },
                { id: 'Bot + Human', label: '👥 Bot + Human Dual Review (50 Pts)' },
                { id: 'Automated Classifier', label: '🛡️ Automated Policy Bot (25 Pts)' },
                { id: 'Human Inspector', label: '👤 Human Quality Rater (15 Pts)' },
                { id: 'Automated Crawler', label: '🤖 Googlebot Crawler (10 Pts)' },
              ].map((role) => (
                <button
                  key={role.id}
                  onClick={() => setSelectedRole(role.id as any)}
                  className={`text-[11px] px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${
                    selectedRole === role.id
                      ? 'bg-slate-900 text-white border-slate-900 font-bold'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border-slate-200'
                  }`}
                >
                  {role.label}
                </button>
              ))}
            </div>

            <div className="space-y-6">
              {[
                { key: 'content', title: 'Category 1: Content Value & Utility (35 Points Max)', max: 35, score: contentScore },
                { key: 'policy', title: 'Category 2: Google Publisher Policy Compliance (25 Points Max — Zero-Tolerance Gate)', max: 25, score: policyScore },
                { key: 'ux', title: 'Category 3: User Experience & Navigation (15 Points Max)', max: 15, score: uxScore },
                { key: 'trust', title: 'Category 4: Essential Pages & Trust Signals (15 Points Max)', max: 15, score: trustScore },
                { key: 'technical', title: 'Category 5: Technical Infrastructure & Indexing (10 Points Max)', max: 10, score: technicalScore },
              ].map((categoryGroup) => {
                const groupItems = auditItems.filter(
                  (i) => i.category === categoryGroup.key && (selectedRole === 'All' || i.inspectorRole === selectedRole)
                );

                if (groupItems.length === 0) return null;

                return (
                  <div key={categoryGroup.key} className="space-y-2">
                    <div className="flex items-center justify-between bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                      <span className="text-xs font-bold text-slate-800">
                        {categoryGroup.title}
                      </span>
                      <span className="text-xs font-mono font-bold text-slate-700 bg-white px-2 py-0.5 rounded border border-slate-200">
                        {categoryGroup.score} / {categoryGroup.max} Pts
                      </span>
                    </div>

                    <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden">
                      {groupItems.map((item) => (
                        <div
                          key={item.id}
                          onClick={() => toggleItem(item.id)}
                          className={`p-3.5 text-xs transition-colors cursor-pointer flex items-start gap-3 select-none ${
                            item.isPassed ? 'hover:bg-slate-50 bg-white' : 'bg-rose-50/40 hover:bg-rose-50'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={item.isPassed}
                            onChange={() => {}}
                            className="w-4 h-4 rounded text-[#1a73e8] focus:ring-0 mt-0.5 cursor-pointer shrink-0"
                          />

                          <div className="flex-1 space-y-1">
                            <div className="flex flex-wrap items-center justify-between gap-2">
                              <div className="flex items-center gap-2">
                                <span className="font-mono text-[11px] font-bold text-slate-500">
                                  {item.itemCode}
                                </span>
                                <span className="font-bold text-slate-900">{item.name}</span>
                                {item.isCriticalFailureGate && (
                                  <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-rose-100 text-rose-800 border border-rose-200">
                                    Zero-Tolerance Gate
                                  </span>
                                )}
                              </div>

                              <div className="flex items-center gap-2 text-[11px]">
                                <span className="text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                                  {item.inspectorRole}
                                </span>
                                <span className="font-mono font-bold text-slate-700">
                                  {item.isPassed ? item.maxPoints : 0} / {item.maxPoints} pts
                                </span>
                              </div>
                            </div>

                            <p className="text-slate-600 leading-relaxed">
                              {item.criteria}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* SUB-TAB 2: PRE-SUBMISSION VERIFICATION 5-STEP WORKFLOW */}
      {/* ======================================================== */}
      {activeSubTab === 'workflow' && (
        <div className="p-6 rounded-2xl bg-white border border-[#dadce0] shadow-xs space-y-6">
          <div className="border-b border-slate-100 pb-3">
            <h2 className="text-base font-bold text-[#202124] font-['Google_Sans',sans-serif]">
              3. Pre-Submission Verification Workflow
            </h2>
            <p className="text-xs text-[#5f6368]">
              Standardized sequential execution order to be conducted before submitting any URL to Google AdSense.
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                step: 1,
                title: 'Step 1: Automated Technical Scan',
                sub: 'Technical Infrastructure & Crawl Readiness',
                desc: 'Verify valid SSL/HTTPS across all domain routes, assess Core Web Vitals (<2.5s LCP on mobile), generate and ping XML Sitemap & robots.txt, and sweep recursive links to ensure 0% broken 404 routes.',
                action: 'Run automated crawler check on site root.',
              },
              {
                step: 2,
                title: 'Step 2: Content Audit & Plagiarism Check',
                sub: 'Content Value & Depth Guarantee',
                desc: 'Confirm 15–20 published, indexable articles averaging 1,000+ words OR web app documentation (>300 words/view). Execute plagiarism pass ensuring <15% duplicate text and verify all AI-assisted content has been human-edited.',
                action: 'Audit article word counts and originality ratios.',
              },
              {
                step: 3,
                title: 'Step 3: Legal & Trust Page Check',
                sub: 'Mandatory Google Compliance Disclosures',
                desc: 'Verify presence and persistent header/footer links for 3 essential pages: Privacy Policy (including Google AdSense, DoubleClick DART, CCPA, and GDPR cookie clauses), About Us (mission & team bios), and Contact Us (working form & email).',
                action: 'Inspect footer navigation and cookie disclosure clauses.',
              },
              {
                step: 4,
                title: 'Step 4: UI & Policy Sweep',
                sub: 'Zero-Tolerance Policy Gate',
                desc: 'Confirm zero prohibited content (adult, weapons, gambling, illegal), zero unlicensed or pirated media, and eliminate all deceptive UI elements (fake download buttons, ad placements mirroring nav).',
                action: 'Human inspection pass across interactive layout viewports.',
              },
              {
                step: 5,
                title: 'Step 5: Final Scoring & Submission Gate',
                sub: 'AdSense Console Submission Approval',
                desc: 'Calculate total score across all 5 categories. If Total Score >= 85/100 and Policy Score == 25/25 with zero failure flags, proceed with AdSense Console submission. If <85, trigger remediation standards.',
                action: 'Verify total score >= 85 before submitting.',
              },
            ].map((s) => (
              <div key={s.step} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 flex items-start gap-3.5">
                <div className="w-7 h-7 rounded-full bg-[#1a73e8] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  {s.step}
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-sm text-slate-900">{s.title}</h3>
                    <span className="text-[11px] text-slate-500 font-medium">• {s.sub}</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {s.desc}
                  </p>
                  <div className="pt-1 text-[11px] text-[#1a73e8] font-semibold flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> {s.action}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* SUB-TAB 3: REMEDIATION STANDARDS (REJECTION SCENARIOS) */}
      {/* ======================================================== */}
      {activeSubTab === 'remediation' && (
        <div className="p-6 rounded-2xl bg-white border border-[#dadce0] shadow-xs space-y-6">
          <div className="border-b border-slate-100 pb-3">
            <h2 className="text-base font-bold text-[#202124] font-['Google_Sans',sans-serif]">
              4. Remediation Standards (Rejection Scenarios)
            </h2>
            <p className="text-xs text-[#5f6368]">
              Standard Operating Procedures for diagnosing and remediating common Google AdSense rejection notices.
            </p>
          </div>

          {/* Scenario Selector Pills */}
          <div className="flex items-center gap-2">
            {[
              { id: 'A', label: 'Scenario A: "Low Value Content"' },
              { id: 'B', label: 'Scenario B: "Site Navigation / Under Construction"' },
              { id: 'C', label: 'Scenario C: "Policy Violation / Copyrighted Material"' },
            ].map((sc) => (
              <button
                key={sc.id}
                onClick={() => setActiveRemediation(sc.id as any)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeRemediation === sc.id
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {sc.label}
              </button>
            ))}
          </div>

          {/* Scenario Content */}
          {activeRemediation === 'A' && (
            <div className="p-5 rounded-2xl border border-amber-200 bg-amber-50/40 space-y-4 text-xs">
              <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
                <AlertTriangle className="w-4 h-4 text-amber-700" />
                <span>Remediation Protocol: "Low Value Content" Rejection</span>
              </div>
              <p className="text-slate-700 leading-relaxed">
                Google AdSense rejects sites for "Low Value Content" when pages lack depth, appear thin to automated classifiers, or lack original human editorial value.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
                <div className="p-3.5 rounded-xl bg-white border border-amber-200 space-y-1">
                  <h4 className="font-bold text-slate-900">1. Audit Page Depth</h4>
                  <p className="text-slate-600">
                    Count total indexable pages. If under 15, publish original, long-form content to reach the required inventory threshold.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-white border border-amber-200 space-y-1">
                  <h4 className="font-bold text-slate-900">2. Expand Web Apps</h4>
                  <p className="text-slate-600">
                    Add detailed user manuals, step-by-step formula derivations, usage guides, and contextual FAQ accordions below the interactive tool (&gt;300 words/view).
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-white border border-amber-200 space-y-1">
                  <h4 className="font-bold text-slate-900">3. Refine AI Content</h4>
                  <p className="text-slate-600">
                    Execute an editorial pass on all AI-assisted articles to include original commentary, unique examples, hands-on tests, or expert quotes.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeRemediation === 'B' && (
            <div className="p-5 rounded-2xl border border-blue-200 bg-blue-50/40 space-y-4 text-xs">
              <div className="flex items-center gap-2 text-blue-950 font-bold text-sm">
                <AlertTriangle className="w-4 h-4 text-blue-700" />
                <span>Remediation Protocol: "Site Navigation / Under Construction" Rejection</span>
              </div>
              <p className="text-slate-700 leading-relaxed">
                Triggered when human reviewers encounter broken routes, placeholder copy, or confusing layout structures that hinder user navigation.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
                <div className="p-3.5 rounded-xl bg-white border border-blue-200 space-y-1">
                  <h4 className="font-bold text-slate-900">1. Remove Placeholders</h4>
                  <p className="text-slate-600">
                    Eliminate all "Lorem Ipsum" text, draft posts, incomplete pages, or empty test routes from the live production build.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-white border border-blue-200 space-y-1">
                  <h4 className="font-bold text-slate-900">2. Fix Broken Links</h4>
                  <p className="text-slate-600">
                    Repair or remove any header/footer link returning a 404 error or pointing to dummy "#" anchor links.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-white border border-blue-200 space-y-1">
                  <h4 className="font-bold text-slate-900">3. Clean Empty Categories</h4>
                  <p className="text-slate-600">
                    Delete unused category tags or archive pages that contain fewer than 2 published articles.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeRemediation === 'C' && (
            <div className="p-5 rounded-2xl border border-rose-200 bg-rose-50/40 space-y-4 text-xs">
              <div className="flex items-center gap-2 text-rose-950 font-bold text-sm">
                <AlertTriangle className="w-4 h-4 text-rose-700" />
                <span>Remediation Protocol: "Policy Violation / Copyrighted Material" Rejection</span>
              </div>
              <p className="text-slate-700 leading-relaxed">
                Triggered by automated policy classifiers detecting uncredited media, copyrighted file sharing, or text duplicated beyond safe thresholds.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
                <div className="p-3.5 rounded-xl bg-white border border-rose-200 space-y-1">
                  <h4 className="font-bold text-slate-900">1. Media Asset Audit</h4>
                  <p className="text-slate-600">
                    Replace all unattributed or unverified images with original screenshots, custom graphics, or royalty-free media with documented commercial licenses.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-white border border-rose-200 space-y-1">
                  <h4 className="font-bold text-slate-900">2. Duplicate Text Sweep</h4>
                  <p className="text-slate-600">
                    Rewrite any flagged paragraphs exceeding the 15% duplicate text threshold across all indexed pages.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-white border border-rose-200 space-y-1">
                  <h4 className="font-bold text-slate-900">3. Safety Handbook Pass</h4>
                  <p className="text-slate-600">
                    Re-check site content against the Google Publisher Policy handbook to confirm no restricted topics or deceptive UI elements are present.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
