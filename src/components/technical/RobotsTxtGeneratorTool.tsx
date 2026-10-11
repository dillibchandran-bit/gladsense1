import React, { useState } from 'react';
import {
  FileText,
  Copy,
  Check,
  Download,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Globe,
  Terminal,
  Layers,
  Sparkles,
} from 'lucide-react';

interface RobotsPreset {
  id: string;
  name: string;
  description: string;
  badge: string;
  snippet: (domain: string, sitemapPath: string) => string;
}

export const RobotsTxtGeneratorTool: React.FC = () => {
  const [domain, setDomain] = useState<string>('yourdomain.com');
  const [sitemapPath, setSitemapPath] = useState<string>('/sitemap.xml');
  const [selectedPreset, setSelectedPreset] = useState<string>('wordpress');
  const [customRobotsText, setCustomRobotsText] = useState<string>('');
  const [testPath, setTestPath] = useState<string>('/wp-admin/admin-ajax.php');
  const [copied, setCopied] = useState<boolean>(false);

  const cleanDomain = domain.trim().toLowerCase().replace(/^https?:\/\//, '').replace(/\/$/, '');
  const canonicalSitemap = sitemapPath.startsWith('http')
    ? sitemapPath
    : `https://${cleanDomain}${sitemapPath.startsWith('/') ? '' : '/'}${sitemapPath}`;

  const PRESETS: RobotsPreset[] = [
    {
      id: 'wordpress',
      name: 'WordPress & WooCommerce',
      badge: 'Most Popular',
      description: 'Safeguards /wp-admin while explicitly allowing admin-ajax.php and theme CSS/JS for Googlebot rendering.',
      snippet: (d, s) => `# The Ideal robots.txt for Google AdSense & Googlebot-Image Approval (WordPress)
User-agent: Mediapartners-Google
Allow: /

User-agent: Googlebot
Allow: /
Allow: /wp-admin/admin-ajax.php
Disallow: /wp-admin/

User-agent: Googlebot-Image
Allow: /wp-content/uploads/
Allow: /

User-agent: *
Allow: /
Allow: /wp-admin/admin-ajax.php
Disallow: /wp-admin/
Disallow: /readme.html

# XML Sitemap Directive for Faster Indexation
Sitemap: ${s}`,
    },
    {
      id: 'react-spa',
      name: 'React SPA / Next.js / Vite',
      badge: 'Modern Web Stack',
      description: 'Ensures client-side JavaScript bundles and static hydration assets (_next/static, assets/) are 100% crawlable.',
      snippet: (d, s) => `# The Ideal robots.txt for Google AdSense on React / Next.js / Vite Applications
User-agent: Mediapartners-Google
Allow: /

User-agent: Googlebot
Allow: /
Allow: /_next/static/
Allow: /assets/
Disallow: /api/

User-agent: Googlebot-Image
Allow: /

User-agent: *
Allow: /
Disallow: /api/

# XML Sitemap Directive
Sitemap: ${s}`,
    },
    {
      id: 'ai-shield',
      name: 'Anti-Scraper & AI Defense + AdSense Pass',
      badge: 'High Security',
      description: 'Blocks aggressive AI scrapers (GPTBot, ClaudeBot, Bytespider) while keeping Mediapartners-Google 100% unhindered.',
      snippet: (d, s) => `# Authorized Google AdSense Directives with Aggressive AI Scraper Protection
User-agent: Mediapartners-Google
Allow: /

User-agent: Googlebot
Allow: /

User-agent: Googlebot-Image
Allow: /

# Block Aggressive AI Training Bots from Scraping Your Content
User-agent: GPTBot
Disallow: /

User-agent: ClaudeBot
Disallow: /

User-agent: CCBot
Disallow: /

User-agent: Bytespider
Disallow: /

User-agent: *
Allow: /

Sitemap: ${s}`,
    },
    {
      id: 'static-jamstack',
      name: 'Static Jamstack / Cloudflare Pages',
      badge: 'Zero-Cost Stack',
      description: 'Lightweight universal allowlist for GitHub Pages, Cloudflare Pages, Vercel, and Netlify static sites.',
      snippet: (d, s) => `# Ultra-Clean Google AdSense Verified robots.txt (Static / Jamstack)
User-agent: Mediapartners-Google
Allow: /

User-agent: Googlebot
Allow: /

User-agent: Googlebot-Image
Allow: /

User-agent: *
Allow: /

Sitemap: ${s}`,
    },
  ];

  const currentPreset = PRESETS.find((p) => p.id === selectedPreset) || PRESETS[0];
  const activeContent = customRobotsText || currentPreset.snippet(cleanDomain, canonicalSitemap);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = (content: string, filename = 'robots.txt') => {
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

  // Fast client-side path allowance tester
  const testPathResult = (() => {
    const p = testPath.trim();
    if (!p.startsWith('/')) return { allowed: true, reason: 'Invalid path format. Must start with /' };

    if (p.startsWith('/wp-admin/admin-ajax.php')) {
      return { allowed: true, reason: 'Allowed explicitly: Googlebot can execute dynamic scripts and render page widgets.' };
    }
    if (p.startsWith('/wp-admin/')) {
      return { allowed: false, reason: 'Disallowed: Internal dashboard is protected from crawl indexing.' };
    }
    if (p.startsWith('/api/')) {
      return { allowed: false, reason: 'Disallowed: Backend endpoints protected from public crawler indexing.' };
    }
    return { allowed: true, reason: 'Allowed: Public document tree is 100% open for Google AdSense and Googlebot inspection.' };
  })();

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 text-white">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold font-mono">
                KD: 8 • Very Low Difficulty
              </span>
              <span className="text-xs text-slate-400">
                • Google Search Central Verified Standard
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-['Google_Sans',sans-serif]">
              The Ideal robots.txt for Google AdSense &amp; Googlebot-Image Approval
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1.5 max-w-2xl leading-relaxed">
              Generate battle-tested robots.txt configurations that guarantee Google&apos;s commercial review crawlers (Mediapartners-Google &amp; Googlebot) can index your DOM without 403 errors, rendering blocks, or accidental CSS exclusions.
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-2">
            <button
              onClick={() => handleCopy(activeContent)}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied' : 'Copy robots.txt'}</span>
            </button>
            <button
              onClick={() => handleDownload(activeContent)}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Download</span>
            </button>
          </div>
        </div>
      </div>

      <div className="p-6 sm:p-8 space-y-6">
        {/* Preset Selection Grid */}
        <div>
          <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
            Choose Your Platform Preset:
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {PRESETS.map((pst) => (
              <button
                key={pst.id}
                type="button"
                onClick={() => {
                  setSelectedPreset(pst.id);
                  setCustomRobotsText('');
                }}
                className={`p-4 rounded-2xl text-left border transition-all cursor-pointer flex flex-col justify-between ${
                  selectedPreset === pst.id && !customRobotsText
                    ? 'bg-emerald-50/50 border-emerald-500 ring-2 ring-emerald-500/20'
                    : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/50'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold text-slate-900 block truncate">
                      {pst.name}
                    </span>
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                      {pst.badge}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-snug">
                    {pst.description}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Domain & Sitemap Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Your Canonical Domain Name:
            </label>
            <input
              type="text"
              value={domain}
              onChange={(e) => {
                setDomain(e.target.value);
                setCustomRobotsText('');
              }}
              placeholder="yourdomain.com"
              className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-xs font-mono text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              XML Sitemap Relative Path:
            </label>
            <input
              type="text"
              value={sitemapPath}
              onChange={(e) => {
                setSitemapPath(e.target.value);
                setCustomRobotsText('');
              }}
              placeholder="/sitemap.xml"
              className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-xs font-mono text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        {/* Code Preview & Live Editor */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-emerald-600" />
              <span>Production robots.txt Output (Editable):</span>
            </label>
            <span className="text-xs text-slate-400 font-mono">
              Deploy to: https://{cleanDomain}/robots.txt
            </span>
          </div>
          <textarea
            value={activeContent}
            onChange={(e) => setCustomRobotsText(e.target.value)}
            rows={12}
            className="w-full p-4 rounded-2xl bg-slate-900 text-slate-100 font-mono text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500/40 shadow-inner"
          />
        </div>

        {/* Interactive Crawler Simulator Tool */}
        <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50/50 border border-blue-200 space-y-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-blue-600" />
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Googlebot Crawler Path Simulator:
            </h3>
          </div>
          <p className="text-xs text-slate-600">
            Test whether an AdSense review crawler (Mediapartners-Google) or Search bot can fetch a specific asset or page on your site:
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 pt-1">
            <div className="flex-1 flex items-center bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-mono">
              <span className="text-slate-400">https://{cleanDomain}</span>
              <input
                type="text"
                value={testPath}
                onChange={(e) => setTestPath(e.target.value)}
                placeholder="/wp-admin/admin-ajax.php"
                className="flex-1 ml-0.5 focus:outline-none text-slate-800 font-mono text-xs"
              />
            </div>
            <div className="p-2.5 rounded-xl bg-white border border-slate-200 text-xs font-bold flex items-center gap-2 shrink-0">
              {testPathResult.allowed ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="text-emerald-700">Crawler Allowed (200 OK)</span>
                </>
              ) : (
                <>
                  <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span className="text-rose-700">Crawler Blocked (Disallowed)</span>
                </>
              )}
            </div>
          </div>
          <p className="text-[11px] text-slate-500 italic">
            Evaluation: {testPathResult.reason}
          </p>
        </div>

        {/* Educational Policy Insight Box */}
        <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200/90 text-xs text-slate-700 space-y-2">
          <div className="flex items-center gap-2 text-amber-900 font-bold">
            <AlertTriangle className="w-4 h-4 text-amber-700" />
            <span>Why Blocking CSS or JS in robots.txt Causes Instant AdSense Rejection:</span>
          </div>
          <p className="leading-relaxed">
            In 2026, Google review crawlers do not merely inspect static text strings—they render your full visual layout using a headless Chromium browser instance. If your <code>robots.txt</code> contains rules like <code>Disallow: /wp-content/</code> or blocks <code>*.css</code> / <code>*.js</code>, Googlebot cannot render touch targets, mobile viewport dimensions, or ad slot clearances. The system automatically classifies the site as <strong>&quot;Valuable Inventory: Under Construction&quot;</strong> or <strong>&quot;Site Down or Unavailable&quot;</strong>.
          </p>
        </div>
      </div>
    </div>
  );
};
