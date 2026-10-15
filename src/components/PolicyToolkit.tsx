import React, { useState, useEffect } from 'react';
import { AuditItem } from '../types';
import { AdSenseComplianceAuditFramework } from './AdSenseComplianceAuditFramework';
import { ContentDevelopmentSop } from './ContentDevelopmentSop';
import { SingleClickSolutions } from './SingleClickSolutions';
import { AdsTxtValidatorTool } from './technical/AdsTxtValidatorTool';
import { RobotsTxtGeneratorTool } from './technical/RobotsTxtGeneratorTool';
import { AdSensePrivacyPolicyGenerator } from './technical/AdSensePrivacyPolicyGenerator';
import { AdPlacementSimulator } from './AdPlacementSimulator';
import {
  ShieldCheck,
  Zap,
  FileCheck,
  BookOpen,
  Terminal,
  FileCode,
  FileText,
  Lock,
  ExternalLink,
  Server,
  Code2,
  Copy,
  Check,
  Share2,
  Sliders,
} from 'lucide-react';
import { useAppRouter } from '../context/RouterContext';

interface PolicyToolkitProps {
  checklist?: AuditItem[];
  onToggleItem?: (id: string) => void;
  initialSubTab?: 'audit-sop' | 'content-sop' | 'technical-webmaster' | 'generators' | 'ad-simulator';
  initialTechTool?: 'ads-txt' | 'robots-txt' | 'privacy-policy';
}

export const PolicyToolkit: React.FC<PolicyToolkitProps> = ({
  initialSubTab = 'audit-sop',
  initialTechTool = 'ads-txt',
}) => {
  const { navigate } = useAppRouter();
  const [subTab, setSubTab] = useState<'audit-sop' | 'content-sop' | 'technical-webmaster' | 'generators' | 'ad-simulator'>(initialSubTab);
  const [techTool, setTechTool] = useState<'ads-txt' | 'robots-txt' | 'privacy-policy'>(initialTechTool);
  const [copiedSnippet, setCopiedSnippet] = useState<string | null>(null);

  useEffect(() => {
    if (initialSubTab) {
      setSubTab(initialSubTab);
    }
  }, [initialSubTab]);

  useEffect(() => {
    if (initialTechTool) {
      setTechTool(initialTechTool);
    }
  }, [initialTechTool]);

  const copyBacklinkSnippet = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSnippet(id);
    setTimeout(() => setCopiedSnippet(null), 2000);
  };

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
              AdSense Compliance, Webmaster &amp; Policy Suite
            </h2>
            <p className="text-[11px] text-slate-500">
              Audit domains against the 100-Point AdSense Compliance Checklist, validate ads.txt &amp; robots.txt crawl access, and generate compliant legal disclosures.
            </p>
          </div>
        </div>

        {/* 4 Unified Operational Sub-Tabs */}
        <div className="flex items-center bg-white p-1 rounded-xl border border-slate-200/80 shadow-xs w-full sm:w-auto justify-center flex-wrap gap-1">
          <button
            onClick={() => setSubTab('audit-sop')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
              subTab === 'audit-sop'
                ? 'bg-[#1a73e8] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <FileCheck className="w-3.5 h-3.5" />
            <span>100-Point Checklist</span>
          </button>

          <button
            onClick={() => setSubTab('content-sop')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
              subTab === 'content-sop'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Content Quality Standards</span>
          </button>

          <button
            onClick={() => setSubTab('technical-webmaster')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
              subTab === 'technical-webmaster'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Technical Webmaster</span>
          </button>

          <button
            onClick={() => setSubTab('ad-simulator')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
              subTab === 'ad-simulator'
                ? 'bg-rose-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Ad Layout Simulator</span>
          </button>

          <button
            onClick={() => setSubTab('generators')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
              subTab === 'generators'
                ? 'bg-[#9d62ec] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Zap className="w-3.5 h-3.5 text-amber-300" />
            <span>Legal Pages &amp; Code</span>
          </button>
        </div>
      </div>

      {/* Sub-Tool 1: Google AdSense Compliance & Pre-Submission Audit Framework (100-Pt SOP) */}
      {subTab === 'audit-sop' && <AdSenseComplianceAuditFramework />}

      {/* Sub-Tool 2: Content Development SOP & Interactive Pre-Publishing Checklist (SOP v2.0) */}
      {subTab === 'content-sop' && <ContentDevelopmentSop />}

      {/* Sub-Tool 3: Technical Webmaster & Crawl Diagnostics Suite */}
      {subTab === 'technical-webmaster' && (
        <div className="space-y-6">
          {/* Technical Navigation Matrix */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white shadow-md border border-indigo-900/50 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-indigo-800/40 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-300">
                  Technical Webmaster &amp; Crawl Diagnostics Suite
                </span>
              </div>
              <span className="text-[11px] text-slate-300">
                Official Google Search &amp; AdSense Compliance Standards
              </span>
            </div>

            {/* Technical Target Tools Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2 pt-1">
              {/* Tool 1 */}
              <button
                type="button"
                onClick={() => {
                  setTechTool('ads-txt');
                  navigate('/tools/ads-txt-validator/');
                }}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  techTool === 'ads-txt'
                    ? 'bg-indigo-600 text-white border-indigo-400 shadow-md ring-2 ring-indigo-400/50'
                    : 'bg-white/5 hover:bg-white/10 text-slate-200 border-white/10'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <FileCode className="w-4 h-4 text-indigo-300" />
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      IAB v1.1
                    </span>
                  </div>
                  <div className="font-bold text-xs leading-snug">
                    ads.txt Validator
                  </div>
                </div>
                <div className="text-[10px] text-slate-300 mt-2 line-clamp-1">
                  Online Syntax Checker
                </div>
              </button>

              {/* Tool 2 */}
              <button
                type="button"
                onClick={() => {
                  setTechTool('robots-txt');
                  navigate('/tools/robots-txt/');
                }}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  techTool === 'robots-txt'
                    ? 'bg-emerald-600 text-white border-emerald-400 shadow-md ring-2 ring-emerald-400/50'
                    : 'bg-white/5 hover:bg-white/10 text-slate-200 border-white/10'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <FileText className="w-4 h-4 text-emerald-300" />
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      Googlebot
                    </span>
                  </div>
                  <div className="font-bold text-xs leading-snug">
                    robots.txt Generator
                  </div>
                </div>
                <div className="text-[10px] text-slate-300 mt-2 line-clamp-1">
                  Mediapartners Directives
                </div>
              </button>

              {/* Tool 3 */}
              <button
                type="button"
                onClick={() => {
                  setTechTool('privacy-policy');
                  navigate('/tools/privacy-policy-generator/');
                }}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  techTool === 'privacy-policy'
                    ? 'bg-blue-600 text-white border-blue-400 shadow-md ring-2 ring-blue-400/50'
                    : 'bg-white/5 hover:bg-white/10 text-slate-200 border-white/10'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <Lock className="w-4 h-4 text-blue-300" />
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      DART &amp; GDPR
                    </span>
                  </div>
                  <div className="font-bold text-xs leading-snug">
                    Privacy Policy
                  </div>
                </div>
                <div className="text-[10px] text-slate-300 mt-2 line-clamp-1">
                  Cookie Disclosure Template
                </div>
              </button>

              {/* Tool 4 (Links to Blog Hub / Technical Docs) */}
              <button
                type="button"
                onClick={() => navigate('/guides/single-page-application-adsense-approval-requirements/')}
                className="p-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-slate-200 text-left transition-all cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <Code2 className="w-4 h-4 text-amber-300" />
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      SPA Guide
                    </span>
                  </div>
                  <div className="font-bold text-xs leading-snug flex items-center justify-between">
                    <span>SPA Approval Guide</span>
                    <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-amber-300" />
                  </div>
                </div>
                <div className="text-[10px] text-slate-300 mt-2 line-clamp-1">
                  React / Next.js / Vite Rules
                </div>
              </button>

              {/* Tool 5 (Links to Site Doctor / Firewall Lab) */}
              <button
                type="button"
                onClick={() => navigate('/tools/crawler-firewall/')}
                className="p-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-slate-200 text-left transition-all cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <Server className="w-4 h-4 text-rose-300" />
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">
                      WAF Bypass
                    </span>
                  </div>
                  <div className="font-bold text-xs leading-snug flex items-center justify-between">
                    <span>Crawler Firewall Lab</span>
                    <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-rose-300" />
                  </div>
                </div>
                <div className="text-[10px] text-slate-300 mt-2 line-clamp-1">
                  Cloudflare &amp; 403 Diagnostics
                </div>
              </button>
            </div>
          </div>

          {/* Active Utility Tool Rendering */}
          {techTool === 'ads-txt' && <AdsTxtValidatorTool />}
          {techTool === 'robots-txt' && <RobotsTxtGeneratorTool />}
          {techTool === 'privacy-policy' && <AdSensePrivacyPolicyGenerator />}

          {/* Publisher & Developer Natural Backlink Resource Center */}
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Share2 className="w-4 h-4 text-[#1a73e8]" />
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Developer &amp; Webmaster Backlink Kit (Copy for Docs &amp; Repositories)
                </h3>
              </div>
              <span className="text-[11px] text-slate-500">
                Natural high-authority citation badges for client deliverables &amp; open-source projects
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-800">1. Markdown Backlink Snippet:</span>
                  <button
                    type="button"
                    onClick={() =>
                      copyBacklinkSnippet(
                        'md',
                        `[Free Online ads.txt Validator & Syntax Checker](https://gladsenseedu.app/tools/ads-txt-validator/)\n[The Ideal robots.txt for Google AdSense](https://gladsenseedu.app/tools/robots-txt/)\n[Google AdSense Compliant Privacy Policy Template](https://gladsenseedu.app/tools/privacy-policy-generator/)`
                      )
                    }
                    className="text-[11px] font-bold text-[#1a73e8] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    {copiedSnippet === 'md' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedSnippet === 'md' ? 'Copied' : 'Copy Markdown'}</span>
                  </button>
                </div>
                <pre className="p-2 bg-slate-900 text-slate-100 rounded-lg text-[11px] font-mono overflow-x-auto">
{`[Free Online ads.txt Validator](https://gladsenseedu.app/tools/ads-txt-validator/)
[The Ideal robots.txt for AdSense](https://gladsenseedu.app/tools/robots-txt/)
[Compliant Privacy Policy Generator](https://gladsenseedu.app/tools/privacy-policy-generator/)`}
                </pre>
              </div>

              <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-800">2. HTML Anchor Citation Badge:</span>
                  <button
                    type="button"
                    onClick={() =>
                      copyBacklinkSnippet(
                        'html',
                        `<a href="https://gladsenseedu.app/tools/ads-txt-validator/" target="_blank" rel="noopener noreferrer">Free Online ads.txt Validator & Syntax Checker</a>`
                      )
                    }
                    className="text-[11px] font-bold text-[#1a73e8] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    {copiedSnippet === 'html' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedSnippet === 'html' ? 'Copied' : 'Copy HTML'}</span>
                  </button>
                </div>
                <pre className="p-2 bg-slate-900 text-slate-100 rounded-lg text-[11px] font-mono overflow-x-auto">
{`<a href="https://gladsenseedu.app/tools/ads-txt-validator/" target="_blank" rel="noopener noreferrer">
  Free Online ads.txt Validator & Syntax Checker for Publishers
</a>`}
                </pre>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sub-Tool 4: 1-Click Code Solutions & Legal Suite */}
      {subTab === 'generators' && <SingleClickSolutions />}

      {/* Sub-Tool 5: Google AdSense Real-Time Ad Placement & Density Safety Simulator */}
      {subTab === 'ad-simulator' && <AdPlacementSimulator />}
    </div>
  );
};
