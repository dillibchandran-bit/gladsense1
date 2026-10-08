import React from 'react';
import { BookCheck, ShieldCheck, FileCheck2, ArrowLeft, ExternalLink, CheckCircle2 } from 'lucide-react';
import { useAppRouter } from '../context/RouterContext';
import { TrademarkDisclaimer } from '../components/TrademarkDisclaimer';

export const EditorialPolicyPage: React.FC = () => {
  const { navigate } = useAppRouter();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 font-sans">
      <button
        onClick={() => navigate('/')}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Diagnostic Hub</span>
      </button>

      <header className="border-b border-slate-200 pb-6 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-800 text-xs font-bold">
          <BookCheck className="w-3.5 h-3.5 text-indigo-600" />
          <span>Peer-Reviewed Publishing &amp; Verification Standard</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-['Google_Sans',sans-serif]">
          Editorial Policy &amp; Verification Standards
        </h1>
        <p className="text-sm text-slate-500">
          Last Updated: October 2026 • Canonical URL: https://gladsenseedu.com/editorial-policy/
        </p>
      </header>

      <TrademarkDisclaimer />

      <main className="space-y-6 text-sm text-slate-700 leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900">1. Grounding in Official Google Documentation</h2>
          <p>
            GladSense maintains an uncompromising commitment to factual accuracy. Every diagnostic test, compliance score, and remediation guide published across our platform is directly grounded in official documentation:
          </p>
          <ul className="list-disc list-inside space-y-1.5 text-xs text-slate-600 pl-2">
            <li><strong>Google Publisher Policies &amp; Restrictions:</strong> Including adult content restrictions, dangerous advice, copyrighted material, and deceptive button layout rules.</li>
            <li><strong>Google Search Quality Evaluator Guidelines (QRG):</strong> Sections 2.0 through 4.0 defining Experience, Expertise, Authoritativeness, and Trustworthiness (E-E-A-T).</li>
            <li><strong>Google Search Central Core Web Vitals Documentation:</strong> Real-world CrUX metrics for LCP, INP, and CLS.</li>
            <li><strong>IAB Tech Lab Specifications:</strong> RFC-compliant ads.txt v1.1 standards and OpenRTB protocol guidelines.</li>
          </ul>
        </section>

        <section className="space-y-3 p-5 rounded-2xl bg-slate-50 border border-slate-200">
          <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
            <FileCheck2 className="w-4 h-4 text-[#1a73e8]" />
            <span>2. Strict Anti-AI Slop &amp; Information Gain Mandate</span>
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            We reject generic keyword filler and unedited LLM summaries. Under Section 3.2 of the Google Search Quality Rater Guidelines, content must provide verifiable <em>Information Gain</em>. Every editorial guide and interactive tool on GladSense includes:
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700 pt-2">
            <li className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Mathematical derivations &amp; explicit formulas</span>
            </li>
            <li className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Real-world case studies with numerical inputs</span>
            </li>
            <li className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Reproducible terminal curl validation commands</span>
            </li>
            <li className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Named author bylines with verifiable engineering roles</span>
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900">3. Independent Verification &amp; Peer Review</h2>
          <p>
            All tutorial blueprints and code snippets are tested against live Cloudflare Pages and Vercel edge deployments prior to publication. If an updated Google algorithmic release renders any recommendation obsolete, our engineering team updates the article within 72 hours.
          </p>
        </section>

        <section className="space-y-3 border-t border-slate-200 pt-4">
          <h2 className="text-lg font-bold text-slate-900">4. Editorial Corrections &amp; Feedback</h2>
          <p>
            If you identify a technical discrepancy or an outdated policy link, submit a correction to our editorial board at <a href="mailto:compliance@gladsenseedu.com" className="text-[#1a73e8] underline">compliance@gladsenseedu.com</a>.
          </p>
        </section>
      </main>
    </div>
  );
};
