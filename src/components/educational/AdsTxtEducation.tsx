import React from 'react';
import { Terminal, ShieldCheck, FileCode, CheckCircle2, AlertTriangle, ExternalLink } from 'lucide-react';

export const AdsTxtEducation: React.FC = () => {
  return (
    <article
      aria-label="Comprehensive Educational Guide: IAB Tech Lab ads.txt Specification, Syntax Validation, and Server Deployment"
      className="my-10 p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-8 text-slate-700 leading-relaxed"
    >
      {/* Title Header */}
      <div className="border-b border-slate-100 pb-5 space-y-2">
        <div className="flex items-center gap-2 text-indigo-700 text-xs font-bold uppercase tracking-wider">
          <FileCode className="w-4 h-4 text-indigo-600" />
          <span>IAB Tech Lab Standards • ads.txt v1.1 Specification Manual</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-['Google_Sans',sans-serif] tracking-tight">
          Mastering ads.txt & Publisher Declarations: Eliminating &quot;Earnings at Risk&quot; Errors
        </h2>
        <p className="text-sm text-slate-500 max-w-3xl">
          An engineering breakdown of Authorized Digital Sellers (ads.txt), DIRECT vs. RESELLER relationships, certificate authority IDs, and terminal-level curl header verification.
        </p>
      </div>

      {/* Chapter 1: What is ads.txt and Why Google Demands It */}
      <section className="space-y-4">
        <h3 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-[#1a73e8]" />
          <span>1. The IAB Tech Lab ads.txt Specification & Domain Spoofing Prevention</span>
        </h3>
        <p className="text-sm">
          <strong>Authorized Digital Sellers (ads.txt)</strong> is an initiative by the <strong>IAB Technology Laboratory</strong> designed to eliminate programmatic domain spoofing and counterfeit ad inventory. In an automated real-time bidding auction, fraudulent actors could previously claim their ad inventory originated from premium domains like <em>nytimes.com</em> or <em>forbes.com</em>.
        </p>
        <p className="text-sm">
          With ads.txt, media buyers verify that the advertising exchange selling your impressions is explicitly authorized by you. If Google crawls your domain and cannot find a valid record, or if your publisher ID is misspelled, AdSense immediately displays the red alert: <strong>&quot;Earnings at risk: One or more of your sites does not have an ads.txt file.&quot;</strong> Google will drop advertiser bid prices by up to 90% or suspend ad rendering completely until verified.
        </p>
      </section>

      {/* Chapter 2: Syntax Breakdown: Direct vs. Reseller */}
      <section className="space-y-4 border-t border-slate-100 pt-6">
        <h3 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
          <FileCode className="w-5 h-5 text-purple-600" />
          <span>2. Syntax Anatomy: Dissecting the 4 Fields of an ads.txt Record</span>
        </h3>
        <p className="text-sm">
          Every valid line in an ads.txt file consists of four comma-delimited fields:
        </p>
        <div className="p-4 rounded-2xl bg-slate-900 text-slate-100 font-mono text-xs space-y-2 overflow-x-auto shadow-md">
          <div className="text-emerald-400"># Standard Google AdSense Authorized Seller Record</div>
          <div>google.com, pub-0000000000000000, DIRECT, f08c47fec0942fa0</div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs pt-1">
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="font-bold text-slate-900 block">Field 1: Domain</span>
            <span className="font-mono text-indigo-700">google.com</span>
            <p className="text-slate-600">The canonical domain name of the advertising system exchange.</p>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="font-bold text-slate-900 block">Field 2: Publisher ID</span>
            <span className="font-mono text-blue-700">pub-XXXXXXXXXXXXXXXX</span>
            <p className="text-slate-600">Your unique 16-digit Google AdSense publisher account identifier.</p>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="font-bold text-slate-900 block">Field 3: Relationship</span>
            <span className="font-mono text-emerald-700">DIRECT</span>
            <p className="text-slate-600">DIRECT indicates you directly control the account. RESELLER is used for third-party ad networks.</p>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="font-bold text-slate-900 block">Field 4: Certificate Authority</span>
            <span className="font-mono text-purple-700">f08c47fec0942fa0</span>
            <p className="text-slate-600">The IAB TAG certification ID for Google LLC (always f08c47fec0942fa0).</p>
          </div>
        </div>
      </section>

      {/* Chapter 3: How to Verify Delivery via Curl */}
      <section className="space-y-4 border-t border-slate-100 pt-6">
        <h3 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
          <Terminal className="w-5 h-5 text-emerald-600" />
          <span>3. Terminal Verification: Validating HTTP Headers via curl</span>
        </h3>
        <p className="text-sm">
          Googlebot’s crawler requires your ads.txt file to satisfy strict technical criteria:
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm text-slate-700 pl-2">
          <li><strong>Must return HTTP Status 200 OK</strong> (no 301/302 redirects to subdomains or login gates).</li>
          <li><strong>Must return Content-Type: text/plain</strong> (HTML wrapped pages trigger crawler parse failures).</li>
          <li><strong>Must be served at root</strong>: <code>https://yourdomain.com/ads.txt</code> (never in subfolders).</li>
        </ul>
        <div className="p-4 rounded-2xl bg-slate-900 text-slate-100 font-mono text-xs space-y-2 overflow-x-auto shadow-md">
          <div className="text-slate-400"># Run this command in your terminal to inspect server response headers:</div>
          <div className="text-indigo-400">curl -I https://yourdomain.com/ads.txt</div>
          <div className="text-emerald-400 pt-1">
            HTTP/2 200<br />
            content-type: text/plain; charset=utf-8<br />
            cache-control: public, max-age=86400
          </div>
        </div>
      </section>
    </article>
  );
};
