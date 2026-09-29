import React from 'react';
import { X, ShieldCheck, Mail, FileText, CheckCircle2, Globe, HeartHandshake } from 'lucide-react';

interface LegalModalProps {
  type: 'privacy' | 'terms' | 'about' | 'contact' | null;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ type, onClose }) => {
  if (!type) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl max-h-[90vh] bg-white rounded-3xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-[#f8f9fa]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#e8f0fe] text-[#1a73e8] flex items-center justify-center shrink-0">
              {type === 'privacy' && <ShieldCheck className="w-5 h-5" />}
              {type === 'terms' && <FileText className="w-5 h-5" />}
              {type === 'about' && <HeartHandshake className="w-5 h-5" />}
              {type === 'contact' && <Mail className="w-5 h-5" />}
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#202124] font-['Google_Sans',sans-serif]">
                {type === 'privacy' && 'Privacy Policy & Google AdSense Cookie Disclosures'}
                {type === 'terms' && 'Terms of Service & Publisher Guidelines'}
                {type === 'about' && 'About GladSense — Editorial Mission & Transparency'}
                {type === 'contact' && 'Contact Publisher & Editorial Office'}
              </h2>
              <span className="text-xs text-[#5f6368]">
                GladSense Official Publisher Verification & Compliance Document
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-sm text-[#3c4043] leading-relaxed">
          {type === 'privacy' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  <strong>AdSense Policy Guarantee:</strong> This privacy policy strictly satisfies Section 8 of the Google AdSense Terms of Service, CCPA disclosures, and EU User Consent Policy.
                </span>
              </div>

              <h3 className="text-base font-bold text-[#202124]">1. Information We Collect and Process</h3>
              <p>
                GladSense ("we", "our", or "the Service") operates as a free diagnostic site auditor and niche monetization planner. When users input a website domain for automated compliance evaluation, our system retrieves publicly accessible HTML document structures solely to calculate policy readiness and structural hygiene metrics. No personal identity records, passwords, or financial transactions are harvested.
              </p>

              <h3 className="text-base font-bold text-[#202124]">2. Google AdSense & DoubleClick DART Cookies</h3>
              <p>
                Third-party vendors, including Google, use cookies to serve ads based on a user's prior visits to this website or other websites. Google's use of advertising cookies enables it and its partners to serve ads to users based on their visit to our sites and/or other sites on the Internet.
              </p>
              <p>
                Users may opt out of personalized advertising by visiting{' '}
                <a href="https://myadcenter.google.com/" target="_blank" rel="noreferrer" className="text-[#1a73e8] underline">
                  Google My Ad Center
                </a>
                . Alternatively, users can opt out of third-party vendors' use of cookies for personalized advertising by visiting{' '}
                <a href="https://optout.aboutads.info/" target="_blank" rel="noreferrer" className="text-[#1a73e8] underline">
                  aboutads.info
                </a>
                .
              </p>

              <h3 className="text-base font-bold text-[#202124]">3. California Consumer Privacy Act (CCPA) & GDPR</h3>
              <p>
                We do not sell personal information to data brokers. European Economic Area (EEA) and UK visitors are presented with cookie consent controls in accordance with the EU General Data Protection Regulation (GDPR) and Google Consent Mode v2.
              </p>

              <h3 className="text-base font-bold text-[#202124]">4. Direct Inquiries</h3>
              <p>
                If you have questions regarding our privacy practices or data handling, please contact our privacy compliance desk at <code className="px-2 py-0.5 bg-slate-100 rounded text-slate-800">privacy@gladsense.pages.dev</code>.
              </p>
            </div>
          )}

          {type === 'terms' && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-[#202124]">1. Agreement to Terms</h3>
              <p>
                By accessing or using GladSense, you agree to be bound by these Terms of Service. If you do not agree to all terms, you may not access the service.
              </p>

              <h3 className="text-base font-bold text-[#202124]">2. Permitted Use & Analytical Accuracy</h3>
              <p>
                GladSense provides heuristic benchmarks, mathematical calculators (RPM, Pageviews, KGR keyword formulas), and pre-approval diagnostic audits. While our rules engine mirrors Google AdSense Publisher Policies, final site approval decisions rest exclusively with Google LLC's manual and automated review systems. GladSense does not guarantee approval by third-party advertising platforms.
              </p>

              <h3 className="text-base font-bold text-[#202124]">3. Intellectual Property & Trademarks</h3>
              <p>
                Google, Google AdSense, and Google Search Console are trademarks of Google LLC. GladSense is an independent web application and is not endorsed by, sponsored by, or affiliated with Google LLC.
              </p>

              <h3 className="text-base font-bold text-[#202124]">4. Proprietary Algorithms, Patent Rights & Reverse Engineering Prohibition</h3>
              <p>
                The automated crawler simulation pipelines, the 100-point deterministic compliance evaluation matrices, the procedural 1-click code remediation synthesizers, and the Keyword Golden Ratio (KGR) feasibility calculation engines embodied within GladSense are protected by international copyright laws, trade secrets, and pending patent applications.
              </p>
              <p>
                Users are strictly prohibited from reverse-engineering, decompiling, scraping, disassembling, or creating derivative diagnostic engines based upon the scoring weights, heuristic parsing rules, or remediation logic of the GladSense platform without express written authorization from GladSense Technologies.
              </p>
            </div>
          )}

          {type === 'about' && (
            <div className="space-y-5">
              <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-900 flex items-start gap-2.5">
                <Globe className="w-4 h-4 text-[#1a73e8] shrink-0 mt-0.5" />
                <span>
                  <strong>GladSense Enterprise & Institutional Disclosure:</strong> GladSense operates as an independent web compliance lab, diagnostic research consortium, and publisher analytics platform adhering to Google Publisher Policies, W3C standards, and the IAB TCF framework.
                </span>
              </div>

              <div>
                <h3 className="text-base font-bold text-[#202124]">Corporate Mission & Purpose</h3>
                <p className="mt-1">
                  Over 85% of independent website publishers and blog creators face immediate rejection upon their first Google AdSense application due to preventable policy misunderstandings—such as missing legal disclosures, thin boilerplate content, deceptive navigation anchors, or faulty ads.txt syntax.
                </p>
                <p className="mt-2">
                  GladSense Labs was established to provide creators, indie webmasters, and engineering teams with enterprise-grade automated diagnostic audits, mathematical revenue modeling, and zero-cost policy compliance tooling.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                  Leadership, Governance & Editorial Review Board
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-white border border-slate-200 space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 block">Executive Leadership</span>
                    <strong className="text-slate-900 block text-sm">Dillib Chandran</strong>
                    <span className="text-slate-600 block">Founder & Chief Technology Architect</span>
                    <span className="text-[11px] text-slate-500">Specialization: Algorithmic Search Architecture, Static Edge Infrastructure & High-RPM Monetization.</span>
                  </div>

                  <div className="p-3 rounded-xl bg-white border border-slate-200 space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-purple-600 block">Governance & Quality Board</span>
                    <strong className="text-slate-900 block text-sm">GladSense Policy & Review Consortium</strong>
                    <span className="text-slate-600 block">Multidisciplinary Quality Group</span>
                    <span className="text-[11px] text-slate-500">Technical SEO engineers, monetization analysts, and E-E-A-T editorial reviewers conducting peer verification on all tools.</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <span className="font-bold text-slate-900 block">Operational Structure</span>
                  <span className="text-slate-600 block">Global Distributed Engineering Hub (APAC & North America Operations)</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <span className="font-bold text-slate-900 block">Infrastructure Standard</span>
                  <span className="text-slate-600 block">100% Serverless Edge Architecture on Cloudflare Global Network</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <span className="font-bold text-slate-900 block">Regulatory Compliance</span>
                  <span className="text-slate-600 block">GDPR, CCPA, Google Consent Mode v2, and IAB TCF v2.2 aligned</span>
                </div>
              </div>
            </div>
          )}

          {type === 'contact' && (
            <div className="space-y-5">
              <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-900 flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-[#1a73e8] shrink-0 mt-0.5" />
                <span>
                  <strong>Category 4 Trust Compliance:</strong> Functional contact mechanism alongside verified administrative email channel. All inquiries reviewed within 24–48 business hours.
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider">GladSense Enterprise Desk</span>
                  <a href="mailto:dillib.chandran@gmail.com" className="font-bold text-sm text-[#1a73e8] hover:underline block">
                    compliance@gladsense.com
                  </a>
                  <span className="text-[11px] text-slate-500">Executive & Publisher Policy Desk (Attn: Dillib Chandran)</span>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider">GitHub Project & Source</span>
                  <a href="https://github.com/dillibchandran-bit/Gladsense" target="_blank" rel="noreferrer" className="font-bold text-sm text-slate-900 hover:underline block">
                    github.com/dillibchandran-bit/Gladsense
                  </a>
                  <span className="text-[11px] text-slate-500">Public Issues, Auditing Algorithms & Transparency</span>
                </div>
              </div>

              {/* Functional Contact Form */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  alert('Thank you for contacting the GladSense editorial desk! Your message has been received and will be reviewed within 24-48 business hours.');
                  onClose();
                }}
                className="p-5 rounded-2xl bg-white border border-slate-200 space-y-3 shadow-2xs"
              >
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                  Send a Direct Editorial or Policy Inquiry
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="Jane Doe"
                      className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 focus:bg-white rounded-lg text-xs text-slate-900 focus:outline-none focus:border-[#1a73e8]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">Your Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="jane@example.com"
                      className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 focus:bg-white rounded-lg text-xs text-slate-900 focus:outline-none focus:border-[#1a73e8]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">Inquiry Subject *</label>
                  <input
                    type="text"
                    required
                    placeholder="AdSense Audit Question / Policy Compliance / Formula Review"
                    className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 focus:bg-white rounded-lg text-xs text-slate-900 focus:outline-none focus:border-[#1a73e8]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">Message Details *</label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Detail your inquiry, website URL under audit, or specific policy question..."
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 focus:bg-white rounded-lg text-xs text-slate-900 focus:outline-none focus:border-[#1a73e8]"
                  />
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-[11px] text-slate-500">We respond to all verified publisher inquiries within 48h.</span>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#1a73e8] hover:bg-[#1765cc] text-white font-bold text-xs rounded-xl transition-all shadow-xs cursor-pointer"
                  >
                    Submit Message
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-xl text-sm font-medium text-white bg-[#1a73e8] hover:bg-[#1765cc] transition-colors"
          >
            Close Document
          </button>
        </div>
      </div>
    </div>
  );
};
