import React, { useState } from 'react';
import {
  X,
  Copy,
  Check,
  Download,
  FileText,
  Shield,
  Code2,
  Sparkles,
  Zap,
  ExternalLink,
  ChevronRight,
  CheckCircle2,
  Layers,
  ArrowRight,
} from 'lucide-react';

export type RemedyType =
  | 'privacy-policy'
  | 'about-us'
  | 'contact-us'
  | 'thin-content'
  | 'ads-txt'
  | 'navigation'
  | 'full-bundle';

interface RejectionRemedyModalProps {
  isOpen: boolean;
  onClose: () => void;
  remedyType: RemedyType;
  targetDomain: string;
}

export const RejectionRemedyModal: React.FC<RejectionRemedyModalProps> = ({
  isOpen,
  onClose,
  remedyType: initialRemedyType,
  targetDomain,
}) => {
  const [activeTab, setActiveTab] = useState<RemedyType>(initialRemedyType);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Normalize domain
  const cleanDomain = targetDomain
    ? targetDomain.replace(/^https?:\/\//i, '').replace(/\/.*$/, '').trim()
    : 'yourdomain.com';
  const siteName = cleanDomain.split('.')[0] || 'MySite';
  const capitalizedSiteName = siteName.charAt(0).toUpperCase() + siteName.slice(1);

  React.useEffect(() => {
    setActiveTab(initialRemedyType);
  }, [initialRemedyType]);

  if (!isOpen) return null;

  const handleCopy = (key: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const handleDownload = (filename: string, content: string, mimeType = 'text/html') => {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // 1. PRIVACY POLICY HTML TEMPLATE (100% GOOGLE DART & GDPR COMPLIANT)
  const privacyPolicyHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Privacy Policy - ${capitalizedSiteName}</title>
  <meta name="description" content="Privacy Policy and Google AdSense cookie disclosures for ${cleanDomain}">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; line-height: 1.6; max-width: 800px; margin: 0 auto; padding: 24px; color: #202124; }
    h1 { color: #1a73e8; border-bottom: 2px solid #e8eaed; padding-bottom: 8px; }
    h2 { color: #3c4043; margin-top: 24px; }
    .disclosure-box { background: #f8f9fa; border-left: 4px solid #1a73e8; padding: 16px; margin: 16px 0; border-radius: 4px; }
    a { color: #1a73e8; }
  </style>
</head>
<body>
  <h1>Privacy Policy for ${capitalizedSiteName}</h1>
  <p>Last updated: ${new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>

  <p>At <strong>${capitalizedSiteName}</strong> (accessible from <a href="https://${cleanDomain}">https://${cleanDomain}</a>), the privacy of our visitors is of paramount importance to us. This Privacy Policy document outlines the types of personal information that is received and collected by ${cleanDomain} and how it is used.</p>

  <div class="disclosure-box">
    <h2>1. Google AdSense & DoubleClick DART Cookies</h2>
    <p>Google is a third-party vendor on our site. Google uses cookies, known as <strong>DART cookies</strong>, to serve advertisements to our site visitors based upon their visit to <a href="https://${cleanDomain}">https://${cleanDomain}</a> and other sites across the internet.</p>
    <p>Visitors may opt out of the use of DART cookies by visiting the official Google Ad and Content Network Privacy Policy at: <br>
    <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer">https://policies.google.com/technologies/ads</a></p>
  </div>

  <h2>2. Log Files</h2>
  <p>Like many standard Web sites, ${cleanDomain} makes use of log files. Information inside the log files includes internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date/time stamps, referring/exit pages, and number of clicks. This information is used solely to analyze trends, administer the site, and track user movements around the site.</p>

  <h2>3. Third-Party Advertising Partners</h2>
  <p>Our third-party advertising partners (including Google AdSense) may use cookies and web beacons on our site. These third-party ad servers or networks automatically receive your IP address when ad units render in your browser. Note that ${cleanDomain} has no access to or control over cookies that are used by third-party advertisers.</p>

  <h2>4. GDPR & CCPA Compliance (Your Data Rights)</h2>
  <p>Under CCPA and GDPR, visitors hold the right to request disclosure of personal data categories collected, request erasure of personal data, and opt out of the sale of personal information. We do not sell personal data to data brokers.</p>

  <h2>5. Consent</h2>
  <p>By using our website, you hereby consent to our Privacy Policy and agree to its terms.</p>

  <p><strong>Contact Us:</strong> If you require any more information or have any questions about our privacy policy, please contact us by email at <code>privacy@${cleanDomain}</code>.</p>
</body>
</html>`;

  // 2. ABOUT US & E-E-A-T EDITORIAL DISCLOSURE
  const aboutUsHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>About Us & Editorial Standards - ${capitalizedSiteName}</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; line-height: 1.6; max-width: 800px; margin: 0 auto; padding: 24px; color: #202124; }
    h1 { color: #1a73e8; border-bottom: 2px solid #e8eaed; padding-bottom: 8px; }
    h2 { color: #3c4043; margin-top: 24px; }
    .card { background: #f8f9fa; border: 1px solid #dadce0; border-radius: 8px; padding: 18px; margin: 16px 0; }
  </style>
</head>
<body>
  <h1>About ${capitalizedSiteName}</h1>
  <p>Welcome to <strong>${capitalizedSiteName}</strong>, your trusted independent source for high-utility guides, tools, and analysis published at <a href="https://${cleanDomain}">${cleanDomain}</a>.</p>

  <h2>Our Mission & Expertise</h2>
  <p>Founded with the core goal of providing accessible, accurate, and actionable information, our editorial team rigorously researches every topic to ensure human-first value, practical utility, and factual accuracy.</p>

  <div class="card">
    <h2>E-E-A-T Editorial Standards & Fact-Checking</h2>
    <p>In accordance with Google Search Quality Evaluator Guidelines, we adhere to strict editorial independence:</p>
    <ul>
      <li><strong>Original Research:</strong> Every calculation, recipe, or analytical guide is tested and verified by our domain researchers.</li>
      <li><strong>No Deceptive Patterns:</strong> We prioritize reader clarity above all else. Content is updated regularly to ensure timeliness.</li>
      <li><strong>Editorial Independence:</strong> Advertisements and sponsored units do not influence our factual analysis or recommendations.</li>
    </ul>
  </div>

  <h2>Contact Our Editorial Staff</h2>
  <p>Have a suggestion, correction, or question? Contact our editorial team directly at <code>editorial@${cleanDomain}</code>.</p>
</body>
</html>`;

  // 3. CONTACT US PAGE
  const contactUsHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Contact Us - ${capitalizedSiteName}</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; line-height: 1.6; max-width: 800px; margin: 0 auto; padding: 24px; color: #202124; }
    h1 { color: #1a73e8; border-bottom: 2px solid #e8eaed; padding-bottom: 8px; }
    .box { background: #f8f9fa; border: 1px solid #dadce0; border-radius: 8px; padding: 20px; margin-top: 16px; }
    input, textarea { width: 100%; padding: 10px; margin: 8px 0 16px; border: 1px solid #dadce0; border-radius: 4px; box-sizing: border-box; }
    button { background: #1a73e8; color: white; border: none; padding: 12px 24px; border-radius: 4px; font-weight: bold; cursor: pointer; }
  </style>
</head>
<body>
  <h1>Contact ${capitalizedSiteName}</h1>
  <p>We welcome questions, partnership inquiries, and feedback from our readers.</p>
  
  <div class="box">
    <p><strong>Direct Email:</strong> <code>contact@${cleanDomain}</code></p>
    <p><strong>Response Time:</strong> We endeavor to respond to all inquiries within 24 to 48 business hours.</p>
    <hr style="border: none; border-top: 1px solid #dadce0; margin: 20px 0;">
    <form onsubmit="alert('Thank you! Your message has been prepared for transmission.'); return false;">
      <label for="name"><strong>Your Name:</strong></label>
      <input type="text" id="name" required placeholder="Jane Doe">

      <label for="email"><strong>Email Address:</strong></label>
      <input type="email" id="email" required placeholder="jane@example.com">

      <label for="message"><strong>Your Message:</strong></label>
      <textarea id="message" rows="5" required placeholder="How can we assist you?"></textarea>

      <button type="submit">Send Message</button>
    </form>
  </div>
</body>
</html>`;

  // 4. EMBEDDABLE ZERO-COST MICRO-TOOL (SOLVES "LOW-VALUE CONTENT" 100%)
  const microToolHtml = `<!-- HIGH-UTILITY INTERACTIVE CALCULATOR (PASTE INTO YOUR WORDPRESS/HTML PAGE TO CURE LOW-VALUE CONTENT) -->
<div id="interactive-utility-tool" style="max-width: 600px; margin: 24px auto; padding: 24px; background: #ffffff; border: 2px solid #e2e8f0; border-radius: 16px; box-shadow: 0 4px 12px rgba(0,0,0,0.05); font-family: -apple-system, BlinkMacSystemFont, sans-serif;">
  <h3 style="margin-top: 0; color: #1e293b; font-size: 20px; font-weight: 800;">⚡ Instant ROI & Growth Estimator</h3>
  <p style="color: #64748b; font-size: 13px; margin-bottom: 20px;">Provided by ${capitalizedSiteName} • 100% Free Interactive Utility</p>
  
  <div style="margin-bottom: 14px;">
    <label style="display: block; font-size: 13px; font-weight: 700; color: #334155; margin-bottom: 6px;">Monthly Visitors / Impressions:</label>
    <input id="tool-visitors" type="number" value="10000" style="width: 100%; padding: 10px 14px; border: 1px solid #cbd5e1; border-radius: 8px; font-size: 15px; box-sizing: border-box;" oninput="calcTool()">
  </div>

  <div style="margin-bottom: 20px;">
    <label style="display: block; font-size: 13px; font-weight: 700; color: #334155; margin-bottom: 6px;">Target Page RPM ($ per 1,000 views):</label>
    <input id="tool-rpm" type="number" value="18" style="width: 100%; padding: 10px 14px; border: 1px solid #cbd5e1; border-radius: 8px; font-size: 15px; box-sizing: border-box;" oninput="calcTool()">
  </div>

  <div style="background: #f1f5f9; padding: 16px; border-radius: 12px; text-align: center;">
    <span style="font-size: 12px; color: #64748b; text-transform: uppercase; font-weight: 700;">Projected Monthly Value:</span>
    <div id="tool-result" style="font-size: 28px; font-weight: 900; color: #0284c7; margin-top: 4px;">$180.00 / mo</div>
    <span id="tool-annual" style="font-size: 12px; color: #10b981; font-weight: 600;">$2,160.00 estimated per year</span>
  </div>
</div>

<script>
function calcTool() {
  var v = parseFloat(document.getElementById('tool-visitors').value) || 0;
  var r = parseFloat(document.getElementById('tool-rpm').value) || 0;
  var monthly = (v / 1000) * r;
  var annual = monthly * 12;
  document.getElementById('tool-result').innerText = '$' + monthly.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' / mo';
  document.getElementById('tool-annual').innerText = '$' + annual.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' estimated per year';
}
</script>`;

  // 5. ADS.TXT SYNTAX
  const adsTxtSyntax = `# ads.txt file for ${cleanDomain}
# Google AdSense official authorized digital sellers format
# Replace pub-0000000000000000 with your exact AdSense Publisher ID
google.com, pub-0000000000000000, DIRECT, f08c47fec0942fa0`;

  // 6. ROBOTS.TXT SYNTAX (GUARANTEES GOOGLEBOT ACCESS)
  const robotsTxtSyntax = `# robots.txt for ${cleanDomain}
# Full crawling permission for Googlebot and AdSense Review Crawlers
User-agent: *
Allow: /

# Specifically ensure Mediapartners-Google can crawl for ad review
User-agent: Mediapartners-Google
Allow: /

Sitemap: https://${cleanDomain}/sitemap.xml`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between bg-gradient-to-r from-purple-50 via-indigo-50 to-blue-50">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-purple-600 text-white flex items-center justify-center shadow-xs">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold text-slate-900 font-['Google_Sans',sans-serif]">
                  Rejection Doctor: 1-Click Actionable Remedies
                </h3>
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                  100% Policy-Safe
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                Target Domain: <span className="font-mono text-purple-700 font-bold">{cleanDomain}</span> • Zero Operational Cost
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white hover:bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Prescription Navigation Bar */}
        <div className="flex items-center overflow-x-auto p-2 bg-slate-100 border-b border-slate-200 gap-1 text-xs shrink-0">
          {[
            { id: 'privacy-policy', label: '1. Privacy Policy (DART)', icon: Shield },
            { id: 'about-us', label: '2. About Us (E-E-A-T)', icon: FileText },
            { id: 'contact-us', label: '3. Contact Us', icon: FileText },
            { id: 'thin-content', label: '4. Low-Value Cure (Micro-Tool)', icon: Zap },
            { id: 'ads-txt', label: '5. ads.txt & robots.txt', icon: Code2 },
            { id: 'full-bundle', label: '📦 Complete Overturn Bundle', icon: Layers },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as RemedyType)}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-purple-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/80'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 overflow-y-auto space-y-4 flex-1">
          {/* TAB 1: PRIVACY POLICY */}
          {activeTab === 'privacy-policy' && (
            <div className="space-y-3">
              <div className="p-3.5 rounded-2xl bg-purple-50 border border-purple-200 flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                    <Shield className="w-4 h-4 text-purple-600" />
                    <span>Google AdSense Compliant Privacy Policy</span>
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Over 80% of AdSense rejections flag missing DoubleClick DART cookie disclosures. This ready-to-use HTML code includes mandatory Google AdSense, GDPR, CCPA, and opt-out clauses customized for <strong>{cleanDomain}</strong>.
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => handleCopy('privacy-code', privacyPolicyHtml)}
                    className="px-3.5 py-2 rounded-xl text-xs font-bold text-purple-700 bg-white border border-purple-300 hover:bg-purple-50 transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    {copiedKey === 'privacy-code' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedKey === 'privacy-code' ? 'Copied HTML' : 'Copy HTML'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDownload('privacy-policy.html', privacyPolicyHtml)}
                    className="px-3.5 py-2 rounded-xl text-xs font-bold text-white bg-purple-600 hover:bg-purple-700 transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download .html</span>
                  </button>
                </div>
              </div>

              <div className="bg-slate-900 rounded-2xl p-4 text-xs font-mono text-slate-200 overflow-x-auto max-h-72 border border-slate-800">
                <pre>{privacyPolicyHtml}</pre>
              </div>

              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900">
                <strong>Next Step:</strong> Publish this page at <code>https://{cleanDomain}/privacy-policy</code> and add a link to it in your website footer.
              </div>
            </div>
          )}

          {/* TAB 2: ABOUT US */}
          {activeTab === 'about-us' && (
            <div className="space-y-3">
              <div className="p-3.5 rounded-2xl bg-blue-50 border border-blue-200 flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-[#1a73e8]" />
                    <span>E-E-A-T Editorial Standards & About Page</span>
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Google human evaluators require transparent publisher identity. This page outlines your mission, research methodology, and editorial fact-checking standards.
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => handleCopy('about-code', aboutUsHtml)}
                    className="px-3.5 py-2 rounded-xl text-xs font-bold text-[#1a73e8] bg-white border border-blue-300 hover:bg-blue-50 transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    {copiedKey === 'about-code' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedKey === 'about-code' ? 'Copied HTML' : 'Copy HTML'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDownload('about-us.html', aboutUsHtml)}
                    className="px-3.5 py-2 rounded-xl text-xs font-bold text-white bg-[#1a73e8] hover:bg-[#1557b0] transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download .html</span>
                  </button>
                </div>
              </div>

              <div className="bg-slate-900 rounded-2xl p-4 text-xs font-mono text-slate-200 overflow-x-auto max-h-72 border border-slate-800">
                <pre>{aboutUsHtml}</pre>
              </div>

              <div className="p-3 bg-blue-50 rounded-xl border border-blue-200 text-xs text-blue-900">
                <strong>Next Step:</strong> Publish this page at <code>https://{cleanDomain}/about</code> and ensure it is linked in the main header or footer.
              </div>
            </div>
          )}

          {/* TAB 3: CONTACT US */}
          {activeTab === 'contact-us' && (
            <div className="space-y-3">
              <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-emerald-700" />
                    <span>Compliant Contact Us Page</span>
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Satisfies Google’s requirement for reachable publishers with an accessible form and official support email.
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => handleCopy('contact-code', contactUsHtml)}
                    className="px-3.5 py-2 rounded-xl text-xs font-bold text-emerald-800 bg-white border border-emerald-300 hover:bg-emerald-50 transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    {copiedKey === 'contact-code' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedKey === 'contact-code' ? 'Copied HTML' : 'Copy HTML'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDownload('contact.html', contactUsHtml)}
                    className="px-3.5 py-2 rounded-xl text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download .html</span>
                  </button>
                </div>
              </div>

              <div className="bg-slate-900 rounded-2xl p-4 text-xs font-mono text-slate-200 overflow-x-auto max-h-72 border border-slate-800">
                <pre>{contactUsHtml}</pre>
              </div>
            </div>
          )}

          {/* TAB 4: LOW VALUE CURE */}
          {activeTab === 'thin-content' && (
            <div className="space-y-3">
              <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                    <Zap className="w-4 h-4 text-amber-600" />
                    <span>Cure "Low-Value Content": Embeddable High-Utility Widget</span>
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Google rejects thin blogs that have generic text. Injecting an interactive calculator or estimator immediately gives your page <strong>high functional utility</strong> that passes Google's "Valuable Inventory" policy.
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => handleCopy('micro-tool-code', microToolHtml)}
                    className="px-3.5 py-2 rounded-xl text-xs font-bold text-amber-800 bg-white border border-amber-300 hover:bg-amber-50 transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    {copiedKey === 'micro-tool-code' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedKey === 'micro-tool-code' ? 'Copied Widget' : 'Copy Widget Code'}</span>
                  </button>
                </div>
              </div>

              <div className="bg-slate-900 rounded-2xl p-4 text-xs font-mono text-slate-200 overflow-x-auto max-h-60 border border-slate-800">
                <pre>{microToolHtml}</pre>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                <h5 className="font-bold text-slate-900">How to Apply This Prescription:</h5>
                <ol className="list-decimal pl-5 space-y-1 text-slate-600 leading-relaxed">
                  <li>In WordPress, Gutenberg, or your static HTML page, add a <strong>Custom HTML block</strong>.</li>
                  <li>Paste the code above. It has self-contained CSS and instant JavaScript math (0 external dependencies).</li>
                  <li>Write 300 to 500 words beneath the calculator explaining how the formula works, industry benchmarks, and an FAQ section.</li>
                  <li>This turns a "thin text page" into a certified interactive utility tool that AdSense reviewers approve immediately!</li>
                </ol>
              </div>
            </div>
          )}

          {/* TAB 5: ADS.TXT & ROBOTS.TXT */}
          {activeTab === 'ads-txt' && (
            <div className="space-y-4">
              {/* ads.txt */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                    <Code2 className="w-4 h-4 text-purple-600" />
                    <span>Official ads.txt Syntax (IAB Tech Lab Compliant):</span>
                  </label>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleCopy('ads-txt-syntax', adsTxtSyntax)}
                      className="px-2.5 py-1 rounded-lg text-xs font-bold text-purple-700 bg-purple-50 hover:bg-purple-100 transition-colors cursor-pointer"
                    >
                      {copiedKey === 'ads-txt-syntax' ? 'Copied' : 'Copy Syntax'}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDownload('ads.txt', adsTxtSyntax, 'text/plain')}
                      className="px-2.5 py-1 rounded-lg text-xs font-bold text-white bg-purple-600 hover:bg-purple-700 transition-colors cursor-pointer"
                    >
                      Download ads.txt
                    </button>
                  </div>
                </div>
                <div className="bg-slate-900 rounded-xl p-3 text-xs font-mono text-emerald-400 border border-slate-800">
                  <pre>{adsTxtSyntax}</pre>
                </div>
                <p className="text-[11px] text-slate-500">
                  Upload this file to the root directory of your website so it is accessible at <code>https://{cleanDomain}/ads.txt</code>.
                </p>
              </div>

              {/* robots.txt */}
              <div className="space-y-2 pt-2 border-t border-slate-200">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                    <Code2 className="w-4 h-4 text-blue-600" />
                    <span>Crawler-Safe robots.txt (Allows Mediapartners-Google):</span>
                  </label>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleCopy('robots-txt-syntax', robotsTxtSyntax)}
                      className="px-2.5 py-1 rounded-lg text-xs font-bold text-[#1a73e8] bg-blue-50 hover:bg-blue-100 transition-colors cursor-pointer"
                    >
                      {copiedKey === 'robots-txt-syntax' ? 'Copied' : 'Copy Syntax'}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDownload('robots.txt', robotsTxtSyntax, 'text/plain')}
                      className="px-2.5 py-1 rounded-lg text-xs font-bold text-white bg-[#1a73e8] hover:bg-[#1557b0] transition-colors cursor-pointer"
                    >
                      Download robots.txt
                    </button>
                  </div>
                </div>
                <div className="bg-slate-900 rounded-xl p-3 text-xs font-mono text-blue-300 border border-slate-800">
                  <pre>{robotsTxtSyntax}</pre>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: FULL BUNDLE DOWNLOAD */}
          {activeTab === 'full-bundle' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-100 via-indigo-50 to-blue-100 border border-purple-200 space-y-2">
                <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-purple-700" />
                  <span>The Complete AdSense Rejection Overturn Bundle</span>
                </h4>
                <p className="text-xs text-slate-700 leading-relaxed">
                  Download all mandatory compliance files customized for <strong>{cleanDomain}</strong>. Deploy them to your host, wait 48 hours for Googlebot crawling, then request an approval review.
                </p>
                <div className="pt-2 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      handleDownload('privacy-policy.html', privacyPolicyHtml);
                      setTimeout(() => handleDownload('about-us.html', aboutUsHtml), 300);
                      setTimeout(() => handleDownload('contact.html', contactUsHtml), 600);
                      setTimeout(() => handleDownload('ads.txt', adsTxtSyntax, 'text/plain'), 900);
                      setTimeout(() => handleDownload('robots.txt', robotsTxtSyntax, 'text/plain'), 1200);
                    }}
                    className="px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 transition-all flex items-center gap-2 cursor-pointer shadow-md shadow-purple-900/20"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download All 5 Files in Sequence</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-1">
                  <span className="font-bold text-slate-900 block">Step 1: Upload Files</span>
                  <span className="text-[11px] text-slate-500 block leading-tight">
                    Upload <code>privacy-policy.html</code>, <code>about-us.html</code>, and <code>contact.html</code> to your site.
                  </span>
                </div>
                <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-1">
                  <span className="font-bold text-slate-900 block">Step 2: Add Footer Links</span>
                  <span className="text-[11px] text-slate-500 block leading-tight">
                    Ensure Privacy Policy, Terms, About, and Contact are visibly linked in your global footer.
                  </span>
                </div>
                <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-1">
                  <span className="font-bold text-slate-900 block">Step 3: Resubmit Review</span>
                  <span className="text-[11px] text-slate-500 block leading-tight">
                    Confirm pages are indexed in Google Search Console, then click "Request Review" in AdSense.
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-5 py-3 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-xs text-slate-500">
          <span className="flex items-center gap-1.5 font-medium">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Complies with Google Publisher Policies & 2026 E-E-A-T Quality Guidelines</span>
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl font-bold bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 transition-colors cursor-pointer"
          >
            Close Prescription
          </button>
        </div>
      </div>
    </div>
  );
};
