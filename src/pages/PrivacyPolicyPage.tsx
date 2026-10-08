import React from 'react';
import { ShieldCheck, Lock, Cookie, Eye, ExternalLink, ArrowLeft } from 'lucide-react';
import { useAppRouter } from '../context/RouterContext';
import { TrademarkDisclaimer } from '../components/TrademarkDisclaimer';

export const PrivacyPolicyPage: React.FC = () => {
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
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-bold">
          <ShieldCheck className="w-3.5 h-3.5 text-[#1a73e8]" />
          <span>Mandatory Google AdSense & Regulatory Compliance Disclosure</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-['Google_Sans',sans-serif]">
          Privacy Policy & Cookie Disclosures
        </h1>
        <p className="text-sm text-slate-500">
          Last Updated: October 2026 • Effective Date: January 1, 2026 • Canonical URL: https://gladsenseedu.com/privacy-policy/
        </p>
      </header>

      <TrademarkDisclaimer />

      <main className="space-y-6 text-sm text-slate-700 leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900">1. Overview & Commitment to Transparency</h2>
          <p>
            GladSense Compliance & Monetization Labs (&quot;GladSense&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) provides independent website diagnostic audits, keyword calculators, and educational compliance blueprints for digital publishers. We respect user privacy and enforce strict compliance with global privacy regulations, including the European Union General Data Protection Regulation (GDPR), the California Consumer Privacy Act (CCPA), the UK Data Protection Act, and Google Publisher Policies.
          </p>
        </section>

        <section className="space-y-3 p-5 rounded-2xl bg-slate-50 border border-slate-200">
          <div className="flex items-center gap-2 text-indigo-700 font-bold text-sm">
            <Cookie className="w-4 h-4 text-indigo-600" />
            <h3>2. Google AdSense & DoubleClick DART Cookie Disclosures</h3>
          </div>
          <p>
            Google, as a third-party vendor, uses cookies to serve advertisements on websites monetized via Google AdSense. In compliance with Google Publisher Policies, we specifically disclose the following:
          </p>
          <ul className="list-disc list-inside space-y-1.5 text-xs text-slate-600 pl-2">
            <li>
              <strong>DoubleClick DART Cookies:</strong> Google&apos;s use of the DART cookie enables it to serve targeted ads to our users based on their visit to GladSense and other websites across the Internet.
            </li>
            <li>
              <strong>Opt-Out Mechanism:</strong> Users may opt out of personalized advertising by visiting Google Ad Settings at <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="text-[#1a73e8] underline">https://adssettings.google.com</a> or the Network Advertising Initiative opt-out page at <a href="https://optout.networkadvertising.org" target="_blank" rel="noopener noreferrer" className="text-[#1a73e8] underline">https://optout.networkadvertising.org</a>.
            </li>
            <li>
              <strong>Google Consent Mode v2:</strong> We implement IAB Europe Transparency and Consent Framework (TCF v2.2) and Google Consent Mode v2 signals (<code>ad_storage</code>, <code>analytics_storage</code>, <code>ad_user_data</code>, <code>ad_personalization</code>) to ensure no non-essential advertising cookies are dropped without prior user consent.
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900">3. Diagnostic Scrapes & URL Processing</h2>
          <p>
            When you enter a website URL into the GladSense Site Doctor or Rejection Auditor, our servers analyze publicly available HTML elements (DOM meta tags, HTTP response headers, robots.txt, and ads.txt files). We do NOT scrape, collect, or store private personal data, login credentials, or non-public administrative dashboards. Diagnostic scan reports are stored in local browser memory (<code>localStorage</code>) and are never sold to data brokers.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900">4. Third-Party Analytics & Cookies</h2>
          <p>
            We use privacy-preserving analytics to track aggregate webmaster usage metrics (pageviews, session durations, and tool calculation frequency). IP addresses are anonymized before processing. You can manage or disable cookies at any time via your browser settings or our persistent Cookie Preferences banner.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900">5. GDPR & CCPA Rights</h2>
          <p>
            Under GDPR and CCPA, users possess the right to access, rectify, or request deletion of any diagnostic session records associated with their IP address, and the right to opt out of the sale or sharing of personal information. Because GladSense does not require user accounts or store personal dossiers, no personally identifiable data is retained.
          </p>
        </section>

        <section className="space-y-3 border-t border-slate-200 pt-4">
          <h2 className="text-lg font-bold text-slate-900">6. Compliance Contact & Data Protection Officer</h2>
          <p>
            For privacy inquiries, GDPR rights execution, or policy clarifications, please contact our administrative desk:
          </p>
          <div className="p-4 rounded-xl bg-slate-100 text-xs font-mono space-y-1">
            <div>GladSense Compliance &amp; Monetization Labs</div>
            <div>Attn: Data Protection Desk</div>
            <div>Email: <a href="mailto:compliance@gladsenseedu.com" className="text-[#1a73e8] underline">compliance@gladsenseedu.com</a></div>
            <div>Response SLA: 24–48 Business Hours</div>
          </div>
        </section>
      </main>
    </div>
  );
};
