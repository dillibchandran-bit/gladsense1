import React, { useState } from 'react';
import {
  ShieldCheck,
  FileText,
  Copy,
  Check,
  Download,
  Sparkles,
  Scale,
  CheckCircle2,
  AlertTriangle,
  Code2,
} from 'lucide-react';
import { OfficialEvaluationDisclaimer } from '../OfficialEvaluationDisclaimer';

export const AdSensePrivacyPolicyGenerator: React.FC = () => {
  const [siteName, setSiteName] = useState<string>('NicheCalc Tools');
  const [siteUrl, setSiteUrl] = useState<string>('https://nichecalc.com');
  const [contactEmail, setContactEmail] = useState<string>('contact@nichecalc.com');
  const [ownerName, setOwnerName] = useState<string>('NicheCalc Editorial Desk');
  const [includeAdSense, setIncludeAdSense] = useState<boolean>(true);
  const [includeAnalytics, setIncludeAnalytics] = useState<boolean>(true);
  const [includeGdpr, setIncludeGdpr] = useState<boolean>(true);
  const [includeCcpa, setIncludeCcpa] = useState<boolean>(true);
  const [includeAiDisclosure, setIncludeAiDisclosure] = useState<boolean>(true);
  const [format, setFormat] = useState<'html' | 'markdown'>('html');
  const [copied, setCopied] = useState<boolean>(false);

  const cleanSiteUrl = siteUrl.trim().replace(/\/$/, '');
  const updatedDate = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const generateHtmlPolicy = (): string => {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Privacy Policy - ${siteName}</title>
  <meta name="description" content="Privacy Policy, Google AdSense DART Cookie Disclosure, and Data Protection Standards for ${siteName}.">
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #202124; max-width: 800px; margin: 40px auto; padding: 0 20px;">
  <h1>Privacy Policy for ${siteName}</h1>
  <p><strong>Last Updated:</strong> ${updatedDate}</p>

  <h2>1. General Overview & Scope</h2>
  <p>At <strong>${siteName}</strong> ("we," "our," or "us"), accessible from <a href="${cleanSiteUrl}">${cleanSiteUrl}</a>, operated by <strong>${ownerName}</strong>, the privacy of our visitors is of paramount importance. This Privacy Policy document outlines the types of personal information collected, recorded, and utilized by our web application.</p>

  ${
    includeAdSense
      ? `<h2>2. Google AdSense & DoubleClick DART Cookies (Mandatory Disclosure)</h2>
  <p>Google is a third-party vendor on our site. It uses cookies, specifically known as <strong>DART cookies</strong>, to serve personalized advertisements to our site visitors based upon their visit to <a href="${cleanSiteUrl}">${cleanSiteUrl}</a> and other sites across the internet.</p>
  <ul>
    <li>Third-party vendors, including Google, use cookies to serve ads based on a user's prior visits to your website or other websites.</li>
    <li>Google's use of advertising cookies enables it and its partners to serve ads to our users based on their visit to our sites and/or other sites on the Internet.</li>
    <li>Users may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">Google Ads Settings</a>.</li>
    <li>Alternatively, visitors can opt out of a third-party vendor's use of cookies for personalized advertising by visiting <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer">www.aboutads.info/choices</a> or <a href="https://youradchoices.com/" target="_blank" rel="noopener noreferrer">YourAdChoices</a>.</li>
  </ul>
  <p>For detailed information on how Google processes data when you use partner sites or apps, please review Google's official documentation at: <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer">How Google uses information from sites or apps that use our services</a>.</p>`
      : ''
  }

  ${
    includeAnalytics
      ? `<h2>3. Web Analytics & Server Log Files</h2>
  <p>${siteName} follows standard procedures for utilizing log files and privacy-focused web analytics (such as Google Analytics 4). These files log visitors when they access our web utility tools. The information collected by log files includes internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date/time stamps, referring/exit pages, and number of interactions. These data points are not linked to any information that is personally identifiable and are used solely for analyzing trends, administering the site, and improving page performance.</p>`
      : ''
  }

  ${
    includeGdpr
      ? `<h2>4. General Data Protection Regulation (GDPR) Compliance (EEA & UK Users)</h2>
  <p>If you reside within the European Economic Area (EEA) or the United Kingdom, you possess specific data protection rights under the GDPR. We are committed to facilitating your exercise of these rights:</p>
  <ul>
    <li><strong>The right to access:</strong> You have the right to request copies of your personal data held by us.</li>
    <li><strong>The right to rectification:</strong> You have the right to request correction of inaccurate or incomplete information.</li>
    <li><strong>The right to erasure:</strong> You have the right to request deletion of your personal data under certain conditions.</li>
    <li><strong>The right to restrict processing:</strong> You have the right to request that we restrict processing of your personal data.</li>
    <li><strong>Google Consent Mode v2:</strong> Where required by law, we implement compliant Consent Management Platforms (CMP) adhering to the IAB Europe Transparency and Consent Framework (TCF v2.2).</li>
  </ul>`
      : ''
  }

  ${
    includeCcpa
      ? `<h2>5. California Consumer Privacy Act (CCPA / CPRA) Rights</h2>
  <p>Under the California Consumer Privacy Act (CCPA) and California Privacy Rights Act (CPRA), California consumers possess the right to:</p>
  <ul>
    <li>Request disclosure of categories and specific pieces of personal data collected about them.</li>
    <li>Request deletion of any personal data collected about them.</li>
    <li>Request that a business that sells or shares personal data not sell or share the consumer's personal data ("Do Not Sell My Personal Info").</li>
  </ul>
  <p>We do not sell personal information as traditionally defined under California statutory definitions.</p>`
      : ''
  }

  ${
    includeAiDisclosure
      ? `<h2>6. Editorial Integrity, AI-Assisted Research & Transparency Policy</h2>
  <p>In accordance with responsible publishing standards and Google Search Quality Evaluator Guidelines (E-E-A-T):</p>
  <ul>
    <li><strong>Human Oversight:</strong> While automated computational tools and natural language algorithms may be utilized for initial research outlines and formula structuring, all content, formulas, and guidance published on ${siteName} undergo direct human fact-checking, editorial review, and quality validation by ${ownerName}.</li>
    <li><strong>Information Gain:</strong> We strictly avoid mass unattended AI publishing. Every tool and guide provides original derivations, interactive widgets, or empirical benchmark datasets.</li>
  </ul>`
      : ''
  }

  <h2>7. Contact Information</h2>
  <p>If you have any questions, compliance inquiries, or requests regarding this Privacy Policy, please contact our data privacy officer at:</p>
  <p><strong>Email:</strong> <a href="mailto:${contactEmail}">${contactEmail}</a><br>
  <strong>Website:</strong> <a href="${cleanSiteUrl}">${cleanSiteUrl}</a><br>
  <strong>Publisher Entity:</strong> ${ownerName}</p>
</body>
</html>`;
  };

  const generateMarkdownPolicy = (): string => {
    return `# Privacy Policy for ${siteName}
**Last Updated:** ${updatedDate}

## 1. General Overview & Scope
At **${siteName}** ("we," "our," or "us"), accessible from [${cleanSiteUrl}](${cleanSiteUrl}), operated by **${ownerName}**, visitor privacy is of paramount importance. This document outlines the types of personal information collected, recorded, and utilized.

${
  includeAdSense
    ? `## 2. Google AdSense & DoubleClick DART Cookies (Mandatory Disclosure)
Google is a third-party vendor on our site. It uses cookies, specifically known as **DART cookies**, to serve personalized advertisements based upon visits to our website and other sites across the internet.

- Third-party vendors, including Google, use cookies to serve ads based on a user's prior visits to your website or other websites.
- Google's use of advertising cookies enables it and its partners to serve ads based on visits to this site and/or other sites on the Internet.
- Users may opt out of personalized advertising by visiting [Google Ads Settings](https://www.google.com/settings/ads).
- Visitors can also opt out of third-party advertising cookies via [www.aboutads.info/choices](https://www.aboutads.info/choices) or [YourAdChoices](https://youradchoices.com/).
- Learn more at [How Google uses information from sites or apps that use our services](https://policies.google.com/technologies/partner-sites).`
    : ''
}

${
  includeAnalytics
    ? `## 3. Web Analytics & Server Log Files
${siteName} follows standard procedures for utilizing log files and web analytics (such as Google Analytics 4). These files log visitors when they access our web utility tools, capturing IP addresses, browser types, timestamps, and referring pages for aggregate operational analysis.`
    : ''
}

${
  includeGdpr
    ? `## 4. GDPR Data Protection Rights (EEA & UK Users)
EEA and UK residents maintain legal rights under the General Data Protection Regulation (GDPR), including access, rectification, erasure, and processing restrictions. Where applicable, our platform integrates Google Consent Mode v2.`
    : ''
}

${
  includeCcpa
    ? `## 5. California Privacy Rights (CCPA / CPRA)
California residents retain the right to request disclosure, deletion, and opt-out of the sale or sharing of their personal information.`
    : ''
}

${
  includeAiDisclosure
    ? `## 6. Editorial Standards & AI Transparency
All tools, formulas, and publications undergo human review, validation, and empirical cross-examination by ${ownerName}. We adhere strictly to Google's Search Quality Evaluator Guidelines (E-E-A-T).`
    : ''
}

## 7. Contact Information
For data privacy inquiries:
- **Email:** ${contactEmail}
- **Website:** ${cleanSiteUrl}
- **Entity:** ${ownerName}
`;
  };

  const currentContent = format === 'html' ? generateHtmlPolicy() : generateMarkdownPolicy();

  const handleCopy = () => {
    navigator.clipboard.writeText(currentContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const filename = format === 'html' ? 'privacy-policy.html' : 'privacy-policy.md';
    const mime = format === 'html' ? 'text/html;charset=utf-8' : 'text/markdown;charset=utf-8';
    const blob = new Blob([currentContent], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Header Bar */}
      <div className="p-6 sm:p-8 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold font-mono">
                Google AdSense Terms of Service (Section 7) Compliant
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-['Google_Sans',sans-serif]">
              Google AdSense Compliant Privacy Policy &amp; Cookie Disclosure Template
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1.5 max-w-2xl leading-relaxed">
              Generate an audit-proof, legally robust Privacy Policy customized for Google AdSense compliance. Includes mandatory DoubleClick DART cookie clauses, Consent Mode v2, GDPR/CCPA disclosures, and AI editorial transparency.
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied' : 'Copy Policy'}</span>
            </button>
            <button
              onClick={handleDownload}
              className="px-4 py-2 bg-[#1a73e8] hover:bg-[#1557b0] text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Download File</span>
            </button>
          </div>
        </div>
      </div>

      <div className="p-6 sm:p-8 space-y-6">
        {/* Customization Input Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 bg-slate-50 p-5 rounded-2xl border border-slate-200">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Website / Brand Name:
            </label>
            <input
              type="text"
              value={siteName}
              onChange={(e) => setSiteName(e.target.value)}
              className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Website URL:
            </label>
            <input
              type="text"
              value={siteUrl}
              onChange={(e) => setSiteUrl(e.target.value)}
              className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-xs font-mono text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Contact Email:
            </label>
            <input
              type="email"
              value={contactEmail}
              onChange={(e) => setContactEmail(e.target.value)}
              className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-xs font-mono text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Entity / Publisher Name:
            </label>
            <input
              type="text"
              value={ownerName}
              onChange={(e) => setOwnerName(e.target.value)}
              className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Mandatory Policy Clauses Toggle Switches */}
        <div>
          <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
            AdSense Compliance Modules Included:
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            <label className="p-3 rounded-xl border border-blue-200 bg-blue-50/50 flex items-center gap-2 cursor-pointer text-xs font-bold text-blue-900">
              <input
                type="checkbox"
                checked={includeAdSense}
                onChange={(e) => setIncludeAdSense(e.target.checked)}
                className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 cursor-pointer"
              />
              <span>Google DART Cookies</span>
            </label>

            <label className="p-3 rounded-xl border border-slate-200 bg-slate-50 flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-800">
              <input
                type="checkbox"
                checked={includeAnalytics}
                onChange={(e) => setIncludeAnalytics(e.target.checked)}
                className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 cursor-pointer"
              />
              <span>GA4 Analytics Logs</span>
            </label>

            <label className="p-3 rounded-xl border border-slate-200 bg-slate-50 flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-800">
              <input
                type="checkbox"
                checked={includeGdpr}
                onChange={(e) => setIncludeGdpr(e.target.checked)}
                className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 cursor-pointer"
              />
              <span>GDPR (EEA/UK)</span>
            </label>

            <label className="p-3 rounded-xl border border-slate-200 bg-slate-50 flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-800">
              <input
                type="checkbox"
                checked={includeCcpa}
                onChange={(e) => setIncludeCcpa(e.target.checked)}
                className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 cursor-pointer"
              />
              <span>CCPA / CPRA</span>
            </label>

            <label className="p-3 rounded-xl border border-slate-200 bg-slate-50 flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-800">
              <input
                type="checkbox"
                checked={includeAiDisclosure}
                onChange={(e) => setIncludeAiDisclosure(e.target.checked)}
                className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 cursor-pointer"
              />
              <span>AI Transparency</span>
            </label>
          </div>
        </div>

        {/* Live Output Format Toggle & Code Box */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Generated Privacy Policy Document:
            </span>
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg text-xs">
              <button
                type="button"
                onClick={() => setFormat('html')}
                className={`px-3 py-1 rounded-md font-semibold transition-all cursor-pointer ${
                  format === 'html' ? 'bg-white text-blue-700 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                HTML Page (.html)
              </button>
              <button
                type="button"
                onClick={() => setFormat('markdown')}
                className={`px-3 py-1 rounded-md font-semibold transition-all cursor-pointer ${
                  format === 'markdown' ? 'bg-white text-blue-700 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Markdown (.md)
              </button>
            </div>
          </div>

          <textarea
            value={currentContent}
            readOnly
            rows={14}
            className="w-full p-4 rounded-2xl bg-slate-900 text-slate-100 font-mono text-xs focus:outline-none shadow-inner"
          />
        </div>

        {/* Google AdSense Contractual Note */}
        <div className="p-5 rounded-2xl bg-blue-50 border border-blue-200 text-xs text-slate-700 space-y-1.5">
          <div className="flex items-center gap-2 text-blue-900 font-bold">
            <Scale className="w-4 h-4 text-blue-700" />
            <span>Google AdSense Contractual Requirement (Section 7):</span>
          </div>
          <p className="leading-relaxed">
            Google AdSense Terms of Service state: <em>&quot;You must ensure that in the course of using the Service, a Privacy Policy is clearly displayed and adhered to... It must disclose that third parties may be placing and reading cookies on your users&apos; browsers, or using web beacons to collect information.&quot;</em> Websites missing an explicit DART cookie disclosure are rejected automatically during human evaluation.
          </p>
        </div>

        {/* Official AdSense Probability & Policy Notice */}
        <OfficialEvaluationDisclaimer compact sourceLabel="AdSense Legal Policy & Privacy Policy Template Generator" />
      </div>
    </div>
  );
};
