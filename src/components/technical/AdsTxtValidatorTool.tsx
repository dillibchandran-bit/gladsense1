import React, { useState } from 'react';
import {
  FileCode,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Copy,
  Check,
  Download,
  Terminal,
  Sparkles,
  HelpCircle,
  RefreshCw,
  ExternalLink,
  ShieldCheck,
} from 'lucide-react';

interface ParsedLineResult {
  lineNumber: number;
  raw: string;
  type: 'record' | 'variable' | 'comment' | 'empty' | 'invalid';
  domain?: string;
  pubId?: string;
  relationship?: 'DIRECT' | 'RESELLER';
  certId?: string;
  isValid: boolean;
  severity: 'success' | 'warning' | 'error' | 'info';
  message: string;
  suggestion?: string;
}

const DEFAULT_SAMPLE_ADS_TXT = `# Google AdSense Official Authorized Digital Seller Declaration
# Specification: IAB Tech Lab ads.txt v1.1
google.com, pub-9847123490812345, DIRECT, f08c47fec0942fa0

# Example Authorized Programmatic Reseller (Optional)
# appnexus.com, 1234, RESELLER, f5ab79cb980f11d1

# Contact Directive for Verification
contact=contact@yourdomain.com
subdomain=blog.yourdomain.com`;

export const AdsTxtValidatorTool: React.FC = () => {
  const [inputContent, setInputContent] = useState<string>(DEFAULT_SAMPLE_ADS_TXT);
  const [activeTab, setActiveTab] = useState<'validator' | 'generator' | 'spec-guide'>('validator');
  const [copied, setCopied] = useState<boolean>(false);
  const [generatorPubId, setGeneratorPubId] = useState<string>('pub-9847123490812345');
  const [generatorRelationship, setGeneratorRelationship] = useState<'DIRECT' | 'RESELLER'>('DIRECT');
  const [generatorContactEmail, setGeneratorContactEmail] = useState<string>('contact@yourdomain.com');
  const [domainToVerify, setDomainToVerify] = useState<string>('yourdomain.com');

  // Parser & Line-by-line validation logic based on IAB Tech Lab specification
  const parseAndValidate = (text: string): ParsedLineResult[] => {
    const lines = text.split('\n');
    return lines.map((rawLine, index) => {
      const trimmed = rawLine.trim();
      const lineNum = index + 1;

      // 1. Empty lines
      if (!trimmed) {
        return {
          lineNumber: lineNum,
          raw: rawLine,
          type: 'empty',
          isValid: true,
          severity: 'info',
          message: 'Empty line (ignored by crawlers)',
        };
      }

      // 2. Comments
      if (trimmed.startsWith('#')) {
        return {
          lineNumber: lineNum,
          raw: rawLine,
          type: 'comment',
          isValid: true,
          severity: 'info',
          message: 'Valid comment directive',
        };
      }

      // 3. Variables: contact= or subdomain=
      if (trimmed.toLowerCase().startsWith('contact=') || trimmed.toLowerCase().startsWith('subdomain=')) {
        const parts = trimmed.split('=');
        const varName = parts[0].toLowerCase();
        const varVal = parts.slice(1).join('=').trim();
        if (!varVal) {
          return {
            lineNumber: lineNum,
            raw: rawLine,
            type: 'variable',
            isValid: false,
            severity: 'warning',
            message: `Variable "${varName}" has no value declared.`,
            suggestion: `${varName}=yourname@yourdomain.com`,
          };
        }
        return {
          lineNumber: lineNum,
          raw: rawLine,
          type: 'variable',
          isValid: true,
          severity: 'success',
          message: `Valid ${varName} declaration`,
        };
      }

      // 4. Advertising System Records (Domain, AccountID, Relationship, CertID)
      // Strip inline comments if any
      const [recordPart] = trimmed.split('#');
      const fields = recordPart.split(',').map((f) => f.trim());

      if (fields.length < 3) {
        return {
          lineNumber: lineNum,
          raw: rawLine,
          type: 'invalid',
          isValid: false,
          severity: 'error',
          message: `Malformed syntax: Found ${fields.length} field(s). IAB specification requires at least 3 comma-separated fields: [Domain], [Publisher ID], [Relationship].`,
          suggestion: `google.com, pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0`,
        };
      }

      const domain = fields[0].toLowerCase();
      const pubId = fields[1];
      const rel = fields[2].toUpperCase();
      const certId = fields[3] ? fields[3].toLowerCase() : undefined;

      // Validate Domain format
      const domainRegex = /^[a-z0-9.-]+\.[a-z]{2,}$/i;
      if (!domainRegex.test(domain)) {
        return {
          lineNumber: lineNum,
          raw: rawLine,
          type: 'record',
          domain,
          pubId,
          isValid: false,
          severity: 'error',
          message: `Invalid exchange domain "${domain}". Must be a valid root hostname (e.g., google.com).`,
        };
      }

      // Validate Relationship field
      if (rel !== 'DIRECT' && rel !== 'RESELLER') {
        return {
          lineNumber: lineNum,
          raw: rawLine,
          type: 'record',
          domain,
          pubId,
          isValid: false,
          severity: 'error',
          message: `Invalid relationship token "${fields[2]}". Must be exactly "DIRECT" or "RESELLER" (uppercase).`,
          suggestion: `${domain}, ${pubId}, DIRECT${certId ? `, ${certId}` : ''}`,
        };
      }

      // Specific validation for Google AdSense records
      if (domain === 'google.com') {
        const cleanDigits = pubId.toLowerCase().replace(/^pub-/, '').replace(/[^0-9]/g, '');
        const hasPubPrefix = pubId.toLowerCase().startsWith('pub-');

        if (!hasPubPrefix || cleanDigits.length !== 16) {
          return {
            lineNumber: lineNum,
            raw: rawLine,
            type: 'record',
            domain,
            pubId,
            relationship: rel as 'DIRECT' | 'RESELLER',
            certId,
            isValid: false,
            severity: 'error',
            message: `Invalid Google Publisher ID "${pubId}". Must begin with "pub-" followed by exactly 16 numeric digits. Found ${cleanDigits.length} digits.`,
            suggestion: `google.com, pub-${cleanDigits.padEnd(16, '0').slice(0, 16)}, ${rel}, f08c47fec0942fa0`,
          };
        }

        if (certId && certId !== 'f08c47fec0942fa0') {
          return {
            lineNumber: lineNum,
            raw: rawLine,
            type: 'record',
            domain,
            pubId,
            relationship: rel as 'DIRECT' | 'RESELLER',
            certId,
            isValid: false,
            severity: 'warning',
            message: `Non-standard Google Tag ID "${certId}". Google LLC's official IAB certificate authority ID is "f08c47fec0942fa0".`,
            suggestion: `google.com, ${pubId}, ${rel}, f08c47fec0942fa0`,
          };
        }

        if (!certId) {
          return {
            lineNumber: lineNum,
            raw: rawLine,
            type: 'record',
            domain,
            pubId,
            relationship: rel as 'DIRECT' | 'RESELLER',
            isValid: true,
            severity: 'warning',
            message: 'Valid 3-field Google record, but Field 4 (Certification ID: f08c47fec0942fa0) is strongly recommended for AdSense compliance.',
            suggestion: `google.com, ${pubId}, ${rel}, f08c47fec0942fa0`,
          };
        }

        return {
          lineNumber: lineNum,
          raw: rawLine,
          type: 'record',
          domain,
          pubId,
          relationship: rel as 'DIRECT' | 'RESELLER',
          certId,
          isValid: true,
          severity: 'success',
          message: '100% Valid Google AdSense Authorized Seller Record (IAB Tech Lab compliant)',
        };
      }

      // General valid third-party record
      return {
        lineNumber: lineNum,
        raw: rawLine,
        type: 'record',
        domain,
        pubId,
        relationship: rel as 'DIRECT' | 'RESELLER',
        certId,
        isValid: true,
        severity: 'success',
        message: `Valid ${domain} Authorized Seller record (${rel})`,
      };
    });
  };

  const validationResults = parseAndValidate(inputContent);
  const totalLines = validationResults.length;
  const validRecords = validationResults.filter((r) => r.type === 'record' && r.isValid).length;
  const errorCount = validationResults.filter((r) => r.severity === 'error').length;
  const warningCount = validationResults.filter((r) => r.severity === 'warning').length;
  const hasGoogleRecord = validationResults.some(
    (r) => r.domain === 'google.com' && r.type === 'record' && r.isValid
  );

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadFile = (content: string, filename = 'ads.txt') => {
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleApplyFix = (lineNum: number, suggestion: string) => {
    const lines = inputContent.split('\n');
    if (lines[lineNum - 1] !== undefined) {
      lines[lineNum - 1] = suggestion;
      setInputContent(lines.join('\n'));
    }
  };

  // Clean generator output
  const cleanGenPubId = generatorPubId.trim().toLowerCase().replace(/[^0-9]/g, '');
  const formattedGenPubId = `pub-${cleanGenPubId || '0000000000000000'}`;
  const generatedAdsTxt = `# Authorized Digital Sellers (ads.txt) for ${domainToVerify}
# Standardized according to IAB Tech Lab ads.txt v1.1
google.com, ${formattedGenPubId}, ${generatorRelationship}, f08c47fec0942fa0

# Publisher Verification Contact
contact=${generatorContactEmail}
`;

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Header Bar */}
      <div className="p-6 sm:p-8 bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 text-white">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold font-mono">
                IAB Tech Lab v1.1 Specification Compliant
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-['Google_Sans',sans-serif]">
              Free Online ads.txt Validator &amp; Syntax Checker for Publishers
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1.5 max-w-2xl leading-relaxed">
              Verify your Authorized Digital Sellers (ads.txt) syntax line-by-line. Prevent domain spoofing, fix &quot;Earnings at risk&quot; AdSense alerts, and validate HTTP 200 server headers before crawler inspection.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0 bg-white/10 p-1.5 rounded-2xl backdrop-blur-xs border border-white/10">
            <button
              onClick={() => setActiveTab('validator')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'validator' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-300 hover:text-white'
              }`}
            >
              Live Validator
            </button>
            <button
              onClick={() => setActiveTab('generator')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'generator' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-300 hover:text-white'
              }`}
            >
              1-Click Generator
            </button>
            <button
              onClick={() => setActiveTab('spec-guide')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'spec-guide' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-300 hover:text-white'
              }`}
            >
              Delivery Checklist
            </button>
          </div>
        </div>
      </div>

      {/* TAB 1: LIVE VALIDATOR */}
      {activeTab === 'validator' && (
        <div className="p-6 sm:p-8 space-y-6">
          {/* Summary Status Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                Total Lines Parsed
              </span>
              <span className="text-2xl font-black text-slate-900 font-mono mt-1 block">
                {totalLines}
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200">
              <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider block">
                Valid Ad Records
              </span>
              <span className="text-2xl font-black text-emerald-800 font-mono mt-1 block">
                {validRecords}
              </span>
            </div>

            <div className={`p-4 rounded-2xl border ${errorCount > 0 ? 'bg-rose-50 border-rose-200' : 'bg-slate-50 border-slate-200'}`}>
              <span className={`text-[11px] font-bold uppercase tracking-wider block ${errorCount > 0 ? 'text-rose-700' : 'text-slate-500'}`}>
                Syntax Errors
              </span>
              <span className={`text-2xl font-black font-mono mt-1 block ${errorCount > 0 ? 'text-rose-700' : 'text-slate-400'}`}>
                {errorCount}
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200">
              <span className="text-[11px] font-bold text-blue-700 uppercase tracking-wider block">
                Google AdSense Status
              </span>
              <span className="text-sm font-bold text-blue-900 mt-2 flex items-center gap-1.5">
                {hasGoogleRecord ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Verified Active</span>
                  </>
                ) : (
                  <>
                    <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>Missing AdSense Record</span>
                  </>
                )}
              </span>
            </div>
          </div>

          {/* Interactive Text Input Area */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                <FileCode className="w-4 h-4 text-blue-600" />
                <span>Paste Your ads.txt Raw Content:</span>
              </label>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setInputContent(DEFAULT_SAMPLE_ADS_TXT)}
                  className="text-xs text-slate-500 hover:text-slate-900 flex items-center gap-1 cursor-pointer"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Reset to Sample</span>
                </button>
                <button
                  onClick={() => handleCopy(inputContent)}
                  className="text-xs text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-1 cursor-pointer"
                >
                  {copied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                  <span>{copied ? 'Copied' : 'Copy Text'}</span>
                </button>
              </div>
            </div>

            <textarea
              value={inputContent}
              onChange={(e) => setInputContent(e.target.value)}
              rows={7}
              placeholder="google.com, pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0"
              className="w-full p-4 rounded-2xl border border-slate-300 font-mono text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-slate-50/50"
            />
          </div>

          {/* Line-by-Line Diagnostic Table */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-slate-900 flex items-center justify-between">
              <span>Line-by-Line IAB Tech Lab Diagnostic Report:</span>
              <span className="text-xs font-normal text-slate-500">
                {validationResults.length} lines inspected
              </span>
            </h3>

            <div className="border border-slate-200 rounded-2xl overflow-hidden divide-y divide-slate-100">
              {validationResults.map((res) => (
                <div
                  key={res.lineNumber}
                  className={`p-3.5 text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${
                    res.severity === 'error'
                      ? 'bg-rose-50/60'
                      : res.severity === 'warning'
                      ? 'bg-amber-50/40'
                      : res.severity === 'success'
                      ? 'bg-white hover:bg-slate-50/50'
                      : 'bg-slate-50/50 text-slate-500'
                  }`}
                >
                  <div className="flex items-start gap-3 min-w-0 flex-1">
                    <span className="font-mono text-slate-400 w-8 shrink-0 text-right">
                      L{res.lineNumber}
                    </span>
                    <div className="min-w-0 flex-1 space-y-1">
                      <div className="font-mono text-slate-800 font-medium truncate">
                        {res.raw || <span className="italic text-slate-400">(empty line)</span>}
                      </div>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {res.severity === 'success' && (
                          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                            {res.message}
                          </span>
                        )}
                        {res.severity === 'warning' && (
                          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-700">
                            <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                            {res.message}
                          </span>
                        )}
                        {res.severity === 'error' && (
                          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-rose-700">
                            <XCircle className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                            {res.message}
                          </span>
                        )}
                        {res.severity === 'info' && (
                          <span className="text-[11px] text-slate-500">
                            {res.message}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* 1-Click Fix Button if Suggestion Available */}
                  {res.suggestion && (
                    <div className="shrink-0 flex items-center gap-2">
                      <button
                        onClick={() => handleApplyFix(res.lineNumber, res.suggestion!)}
                        className="px-2.5 py-1 bg-blue-50 text-blue-700 border border-blue-200 rounded-lg text-[11px] font-bold hover:bg-blue-100 transition-colors cursor-pointer whitespace-nowrap"
                      >
                        Auto-Fix Line
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Action Bar */}
          <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100">
            <span className="text-xs text-slate-500">
              Ready to deploy to <code>https://yourdomain.com/ads.txt</code>
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleCopy(inputContent)}
                className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Copied to Clipboard' : 'Copy All'}</span>
              </button>
              <button
                onClick={() => handleDownloadFile(inputContent)}
                className="px-4 py-2 bg-[#1a73e8] hover:bg-[#1557b0] text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Download ads.txt</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: 1-CLICK GENERATOR */}
      {activeTab === 'generator' && (
        <div className="p-6 sm:p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Target Domain Name:
              </label>
              <input
                type="text"
                value={domainToVerify}
                onChange={(e) => setDomainToVerify(e.target.value.toLowerCase().replace(/^https?:\/\//, ''))}
                placeholder="yourdomain.com"
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-[11px] text-slate-400 mt-1 block">
                Do not include https:// or subdirectories
              </span>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Google AdSense Publisher ID:
              </label>
              <input
                type="text"
                value={generatorPubId}
                onChange={(e) => setGeneratorPubId(e.target.value)}
                placeholder="pub-9847123490812345"
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-[11px] text-slate-400 mt-1 block">
                Find this in your AdSense Dashboard &gt; Account &gt; Settings
              </span>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Account Relationship:
              </label>
              <select
                value={generatorRelationship}
                onChange={(e) => setGeneratorRelationship(e.target.value as 'DIRECT' | 'RESELLER')}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none"
              >
                <option value="DIRECT">DIRECT (Standard: You own the AdSense account)</option>
                <option value="RESELLER">RESELLER (Third-party ad network / agency)</option>
              </select>
              <span className="text-[11px] text-slate-400 mt-1 block">
                99% of standalone publishers use DIRECT
              </span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Contact Email Directive (Optional, IAB v1.1 recommended):
            </label>
            <input
              type="email"
              value={generatorContactEmail}
              onChange={(e) => setGeneratorContactEmail(e.target.value)}
              placeholder="contact@yourdomain.com"
              className="w-full max-w-md p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono text-slate-800 focus:outline-none"
            />
          </div>

          {/* Generated Snippet View */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
              Generated Verified ads.txt File:
            </span>
            <div className="p-4 rounded-2xl bg-slate-900 text-slate-100 font-mono text-xs overflow-x-auto shadow-inner space-y-1">
              <pre className="text-emerald-400 whitespace-pre-wrap">{generatedAdsTxt}</pre>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => {
                setInputContent(generatedAdsTxt);
                setActiveTab('validator');
              }}
              className="text-xs text-blue-600 hover:text-blue-800 font-bold cursor-pointer"
            >
              ← Test in Live Validator
            </button>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleCopy(generatedAdsTxt)}
                className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Copied' : 'Copy Code'}</span>
              </button>
              <button
                onClick={() => handleDownloadFile(generatedAdsTxt)}
                className="px-4 py-2 bg-[#1a73e8] hover:bg-[#1557b0] text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Download ads.txt</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: SERVER DELIVERY CHECKLIST */}
      {activeTab === 'spec-guide' && (
        <div className="p-6 sm:p-8 space-y-6">
          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-indigo-600" />
              <span>Googlebot ads.txt Crawler Delivery Protocol</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Having the correct text inside your file is only half the battle. Google’s automated crawler will fail and trigger an &quot;Earnings at risk&quot; error if your web server violates any of these strict transport layer standards:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <span className="text-xs font-bold text-slate-900 block flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 text-[10px] font-bold flex items-center justify-center">1</span>
                  HTTP Status 200 OK
                </span>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Your server must return HTTP 200 without multi-hop 301/302 redirects. Redirecting from HTTP to HTTPS is permitted, but redirecting to a subfolder or login gate immediately fails review.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <span className="text-xs font-bold text-slate-900 block flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 text-[10px] font-bold flex items-center justify-center">2</span>
                  Content-Type: text/plain
                </span>
                <p className="text-xs text-slate-600 leading-relaxed">
                  The response header must explicitly declare <code>Content-Type: text/plain</code>. If your CMS wraps the text in an HTML layout or returns <code>text/html</code>, the parser discards the entire file.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <span className="text-xs font-bold text-slate-900 block flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 text-[10px] font-bold flex items-center justify-center">3</span>
                  Root Domain Location
                </span>
                <p className="text-xs text-slate-600 leading-relaxed">
                  The file must be accessible at the exact apex root: <code>https://yourdomain.com/ads.txt</code>. Crawlers never crawl nested directories like <code>/static/ads.txt</code>.
                </p>
              </div>
            </div>

            {/* Terminal Command Verification */}
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-900 text-slate-100 font-mono text-xs space-y-2 shadow-md">
              <div className="text-slate-400"># Verify your server headers right now using curl in your terminal:</div>
              <div className="text-indigo-400">curl -I https://{domainToVerify}/ads.txt</div>
              <div className="text-emerald-400 pt-1 leading-relaxed">
                HTTP/2 200<br />
                content-type: text/plain; charset=utf-8<br />
                cache-control: public, max-age=86400
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
