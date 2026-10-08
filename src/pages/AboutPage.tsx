import React from 'react';
import { Award, ShieldCheck, UserCheck, Code2, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { useAppRouter } from '../context/RouterContext';
import { TrademarkDisclaimer } from '../components/TrademarkDisclaimer';
import { GLADSENSE_AUTHORS } from '../data/authorsData';

export const AboutPage: React.FC = () => {
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
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 border border-purple-200 text-purple-800 text-xs font-bold">
          <Award className="w-3.5 h-3.5 text-purple-600" />
          <span>E-E-A-T Architecture & Editorial Authority</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-['Google_Sans',sans-serif]">
          About GladSense Compliance &amp; Monetization Labs
        </h1>
        <p className="text-sm text-slate-500">
          Engineering rigorous, zero-cost compliance architectures for independent webmasters and digital publishers.
        </p>
      </header>

      <TrademarkDisclaimer />

      <main className="space-y-8 text-sm text-slate-700 leading-relaxed">
        {/* Core Mission */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900">Our Technical Mission</h2>
          <p>
            GladSense was founded to solve a pervasive problem across the digital publishing ecosystem: over <strong>85% of independent web applications and content creators face immediate rejection upon their first Google AdSense application</strong> due to preventable, opaque policy misunderstandings.
          </p>
          <p>
            While incumbent SEO agencies charge thousands of dollars for opaque audits, GladSense provides an enterprise-grade, 100% free, client-side diagnostic suite that replicates the exact evaluation pipelines of Google&apos;s automated review crawlers and human search quality inspectors.
          </p>
        </section>

        {/* Leadership Profile: Dillib Chandran */}
        <section className="p-6 rounded-2xl bg-gradient-to-br from-slate-50 to-blue-50/40 border border-slate-200 space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-[#1a73e8] text-white flex items-center justify-center font-bold text-2xl shadow-sm shrink-0">
              DC
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-slate-900">Dillib Chandran</h3>
                <span className="text-[11px] font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded-full">
                  Chief Technology Architect
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Founding Architect • GladSense Compliance &amp; Monetization Labs
              </p>
            </div>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Dillib Chandran is a senior web systems architect and monetization engineer specializing in high-throughput edge web applications, sub-100ms Core Web Vitals optimization, and Google Publisher Policy governance. Over the past decade, Dillib has architected programmatic content architectures, client-side diagnostic tooling, and zero-cost cloud hosting stacks (Cloudflare Pages, Vercel, and LiteSpeed Edge) that enable indie webmasters to scale to millions of monthly pageviews under strict $0 server budgets.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-1">
            <div className="p-2.5 rounded-xl bg-white border border-slate-200">
              <span className="font-bold text-slate-900 block">Core Specialization</span>
              <span className="text-slate-600 text-[11px]">Core Web Vitals &amp; Edge Compute</span>
            </div>
            <div className="p-2.5 rounded-xl bg-white border border-slate-200">
              <span className="font-bold text-slate-900 block">Policy Expertise</span>
              <span className="text-slate-600 text-[11px]">Google Publisher Standards 2026</span>
            </div>
            <div className="p-2.5 rounded-xl bg-white border border-slate-200">
              <span className="font-bold text-slate-900 block">Editorial SLA</span>
              <span className="text-slate-600 text-[11px]">100% Peer-Reviewed Verification</span>
            </div>
          </div>
        </section>

        {/* The 5 Pillars of Our 100-Point Audit Rubric */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900">Our 100-Point Audit Rubric</h2>
          <p>
            Our governance matrix evaluates domains across 5 critical operational pillars, enforcing a strict passing threshold of 85/100 points with an uncompromising Zero-Tolerance Gate on Google Publisher Policy compliance:
          </p>
          <div className="space-y-3">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <div className="flex items-center justify-between font-bold text-xs text-slate-900">
                <span>Domain I: Content Depth &amp; Original Information Gain</span>
                <span className="text-[#1a73e8]">35 Points Max</span>
              </div>
              <p className="text-xs text-slate-600 mt-1">
                Originality verification (&lt;15% duplicate), minimum inventory (15–20 published indexable articles or &gt;300 words per tool view), and demonstrable E-E-A-T credentials.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <div className="flex items-center justify-between font-bold text-xs text-slate-900">
                <span>Domain II: Google Publisher Policy Compliance (Zero-Tolerance Gate)</span>
                <span className="text-purple-700">25 Points Max (Mandatory)</span>
              </div>
              <p className="text-xs text-slate-600 mt-1">
                Zero tolerance for prohibited categories (adult, gambling, violence, dangerous advice), copyright integrity, and elimination of deceptive UI misclick anchors.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <div className="flex items-center justify-between font-bold text-xs text-slate-900">
                <span>Domain III: User Experience, Navigation &amp; Mobile Touch Targets</span>
                <span className="text-emerald-700">15 Points Max</span>
              </div>
              <p className="text-xs text-slate-600 mt-1">
                Fully functional menus with zero 404 routes, no dummy anchor tags (href=&quot;#&quot;), mobile viewport touch targets (&ge;48x48px), and CLS under 0.10.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <div className="flex items-center justify-between font-bold text-xs text-slate-900">
                <span>Domain IV: Essential Legal Pages &amp; Trust Architecture</span>
                <span className="text-amber-700">15 Points Max</span>
              </div>
              <p className="text-xs text-slate-600 mt-1">
                Mandatory Privacy Policy disclosing DoubleClick DART cookies, transparent About Us page with verifiable leadership, and functioning Contact Us channel.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <div className="flex items-center justify-between font-bold text-xs text-slate-900">
                <span>Domain V: Technical Infrastructure, Core Web Vitals &amp; ads.txt</span>
                <span className="text-slate-700">10 Points Max</span>
              </div>
              <p className="text-xs text-slate-600 mt-1">
                Valid SSL/TLS HTTPS encryption, verified XML sitemap, clean robots.txt, valid ads.txt syntax, and sub-2.5s Largest Contentful Paint (LCP).
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};
