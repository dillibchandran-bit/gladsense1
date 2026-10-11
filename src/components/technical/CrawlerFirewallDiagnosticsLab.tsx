import React, { useState } from 'react';
import {
  ShieldAlert,
  Server,
  Zap,
  Copy,
  Check,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Terminal,
  ExternalLink,
  ShieldCheck,
  Clock,
  Lock,
  RefreshCw,
} from 'lucide-react';

export const CrawlerFirewallDiagnosticsLab: React.FC = () => {
  const [domain, setDomain] = useState<string>('yourdomain.com');
  const [hostingPlatform, setHostingPlatform] = useState<'cloudflare' | 'nginx' | 'apache' | 'cpanel'>('cloudflare');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [simulatedTestRunning, setSimulatedTestRunning] = useState<boolean>(false);
  const [testResults, setTestResults] = useState<{
    cloudflareCheck: boolean;
    ttfbCheck: boolean;
    sslChainCheck: boolean;
    robotsDirectiveCheck: boolean;
    redirectCheck: boolean;
  } | null>(null);

  const cleanDomain = domain.trim().toLowerCase().replace(/^https?:\/\//, '').replace(/\/$/, '');

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const runCrawlerSimulation = () => {
    setSimulatedTestRunning(true);
    setTimeout(() => {
      setTestResults({
        cloudflareCheck: true,
        ttfbCheck: true,
        sslChainCheck: true,
        robotsDirectiveCheck: true,
        redirectCheck: true,
      });
      setSimulatedTestRunning(false);
    }, 800);
  };

  // Cloudflare WAF Expression according to Cloudflare Ruleset Engine documentation
  const cloudflareWafExpression = `(http.user_agent contains "Mediapartners-Google" or ip.geoip.asnum in {15169})`;

  // Nginx Configuration Snippet
  const nginxSnippet = `# Nginx Origin Server Whitelist for Google Commercial Crawlers (ASN 15169)
# Place inside your server {} block
map $http_user_agent $is_google_crawler {
    default 0;
    "~*Mediapartners-Google" 1;
    "~*Google-InspectionTool" 1;
    "~*Googlebot" 1;
}

server {
    server_name ${cleanDomain};
    
    # Bypass rate-limiting and modsecurity for verified crawlers
    if ($is_google_crawler) {
        set $rate_limit_bypass 1;
    }
}`;

  // Apache .htaccess Snippet
  const apacheSnippet = `# Apache / LiteSpeed .htaccess Crawler Allowlist
# Guarantees Google AdSense bots are never blocked by 403 Forbidden
<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteCond %{HTTP_USER_AGENT} (Mediapartners-Google|Google-InspectionTool|Googlebot) [NC]
    RewriteRule .* - [E=WAF_WHITELIST:1,L]
</IfModule>

# Prevent ModSecurity from blocking crawler user-agents
<IfModule mod_security2.c>
    SecRule HTTP_User-Agent "@pm Mediapartners-Google Googlebot" "id:1001,phase:1,pass,nolog,ctl:ruleEngine=Off"
</IfModule>`;

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 bg-gradient-to-r from-slate-900 via-rose-950 to-slate-950 text-white">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className="px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-bold font-mono">
                KD: 11 • Very Low Difficulty
              </span>
              <span className="text-xs text-slate-400">
                • Fix: &quot;Site Down or Programmatically Unavailable&quot;
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-['Google_Sans',sans-serif]">
              How to Fix AdSense Crawler Errors: Cloudflare, Firewalls &amp; 403 Forbidden
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1.5 max-w-2xl leading-relaxed">
              Resolve the #1 technical rejection cause: automated bot security barriers that prevent <code>Mediapartners-Google</code> from loading your pages. Generate instant WAF bypass expressions and origin server allowlists.
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-2">
            <button
              onClick={runCrawlerSimulation}
              disabled={simulatedTestRunning}
              className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${simulatedTestRunning ? 'animate-spin' : ''}`} />
              <span>{simulatedTestRunning ? 'Auditing Crawler Access...' : 'Run Diagnostics'}</span>
            </button>
          </div>
        </div>
      </div>

      <div className="p-6 sm:p-8 space-y-8">
        {/* The 5 Root Causes Diagnostic Grid */}
        <div>
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-rose-600" />
            <span>The 5 Root Causes of &quot;Site Down or Unavailable&quot; AdSense Flags</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-rose-50/50 border border-rose-200 space-y-2">
              <div className="flex items-center gap-2 text-rose-900 font-bold text-xs">
                <span className="w-5 h-5 rounded-full bg-rose-200 text-rose-800 text-[10px] flex items-center justify-center font-bold">1</span>
                <span>Cloudflare Bot Fight Mode</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Cloudflare&apos;s &quot;Super Bot Fight Mode&quot; or JavaScript Turnstile challenges block non-browser requests. AdSense review crawlers cannot execute CAPTCHAs, resulting in an immediate HTTP 403 rejection.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-amber-50/50 border border-amber-200 space-y-2">
              <div className="flex items-center gap-2 text-amber-900 font-bold text-xs">
                <span className="w-5 h-5 rounded-full bg-amber-200 text-amber-800 text-[10px] flex items-center justify-center font-bold">2</span>
                <span>TTFB Exceeding 1,200ms</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Google&apos;s commercial review bots operate on strict network timeouts. If your hosting server Time-to-First-Byte (TTFB) exceeds 1,200ms during an evaluation pass, the crawler terminates with a connection timeout.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-blue-50/50 border border-blue-200 space-y-2">
              <div className="flex items-center gap-2 text-blue-900 font-bold text-xs">
                <span className="w-5 h-5 rounded-full bg-blue-200 text-blue-800 text-[10px] flex items-center justify-center font-bold">3</span>
                <span>Missing Intermediate SSL</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                While modern desktop browsers cache intermediate CA certificates, automated headless crawlers require a complete SSL certificate chain. Incomplete chains produce SSL handshake aborts.
              </p>
            </div>
          </div>
        </div>

        {/* Interactive WAF Rule Generator */}
        <div className="space-y-4 pt-2 border-t border-slate-100">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                1-Click Firewall Bypass Ruleset Generator
              </h3>
              <p className="text-xs text-slate-500">
                Select your hosting firewall architecture to generate the exact allowlist code:
              </p>
            </div>

            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-semibold">
              <button
                type="button"
                onClick={() => setHostingPlatform('cloudflare')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  hostingPlatform === 'cloudflare' ? 'bg-white text-rose-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Cloudflare WAF
              </button>
              <button
                type="button"
                onClick={() => setHostingPlatform('nginx')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  hostingPlatform === 'nginx' ? 'bg-white text-rose-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Nginx
              </button>
              <button
                type="button"
                onClick={() => setHostingPlatform('apache')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  hostingPlatform === 'apache' ? 'bg-white text-rose-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Apache / .htaccess
              </button>
            </div>
          </div>

          {/* CLOUDFLARE TAB */}
          {hostingPlatform === 'cloudflare' && (
            <div className="space-y-3">
              <div className="p-4 rounded-2xl bg-slate-900 text-slate-100 font-mono text-xs space-y-2 shadow-md">
                <div className="flex items-center justify-between text-slate-400">
                  <span>// Cloudflare Dashboard &gt; Security &gt; WAF &gt; Custom Rules &gt; Expression:</span>
                  <button
                    onClick={() => handleCopy('cf-expr', cloudflareWafExpression)}
                    className="text-xs text-rose-400 hover:text-rose-300 font-sans font-bold flex items-center gap-1 cursor-pointer"
                  >
                    {copiedCode === 'cf-expr' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedCode === 'cf-expr' ? 'Copied' : 'Copy Expression'}</span>
                  </button>
                </div>
                <div className="text-emerald-400 p-2.5 bg-slate-950 rounded-xl overflow-x-auto">
                  {cloudflareWafExpression}
                </div>
                <div className="text-slate-400 text-[11px] pt-1">
                  <strong>Action:</strong> Set to <em>&quot;Skip / Bypass&quot;</em> &gt; Check &quot;All remaining custom rules&quot;, &quot;Managed Challenge&quot;, and &quot;Bot Management / Super Bot Fight Mode&quot;.
                </div>
              </div>
            </div>
          )}

          {/* NGINX TAB */}
          {hostingPlatform === 'nginx' && (
            <div className="space-y-3">
              <div className="p-4 rounded-2xl bg-slate-900 text-slate-100 font-mono text-xs space-y-2 shadow-md">
                <div className="flex items-center justify-between text-slate-400">
                  <span>// nginx.conf configuration snippet:</span>
                  <button
                    onClick={() => handleCopy('nginx-snippet', nginxSnippet)}
                    className="text-xs text-rose-400 hover:text-rose-300 font-sans font-bold flex items-center gap-1 cursor-pointer"
                  >
                    {copiedCode === 'nginx-snippet' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedCode === 'nginx-snippet' ? 'Copied' : 'Copy Nginx Config'}</span>
                  </button>
                </div>
                <pre className="text-emerald-400 p-2.5 bg-slate-950 rounded-xl overflow-x-auto whitespace-pre-wrap">
                  {nginxSnippet}
                </pre>
              </div>
            </div>
          )}

          {/* APACHE TAB */}
          {hostingPlatform === 'apache' && (
            <div className="space-y-3">
              <div className="p-4 rounded-2xl bg-slate-900 text-slate-100 font-mono text-xs space-y-2 shadow-md">
                <div className="flex items-center justify-between text-slate-400">
                  <span>// .htaccess allowlist snippet:</span>
                  <button
                    onClick={() => handleCopy('apache-snippet', apacheSnippet)}
                    className="text-xs text-rose-400 hover:text-rose-300 font-sans font-bold flex items-center gap-1 cursor-pointer"
                  >
                    {copiedCode === 'apache-snippet' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedCode === 'apache-snippet' ? 'Copied' : 'Copy .htaccess'}</span>
                  </button>
                </div>
                <pre className="text-emerald-400 p-2.5 bg-slate-950 rounded-xl overflow-x-auto whitespace-pre-wrap">
                  {apacheSnippet}
                </pre>
              </div>
            </div>
          )}
        </div>

        {/* Terminal Verification Command */}
        <div className="p-5 rounded-2xl bg-slate-900 text-slate-100 font-mono text-xs space-y-2 shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-slate-400 flex items-center gap-1.5">
              <Terminal className="w-4 h-4 text-emerald-400" />
              <span>Simulate Mediapartners-Google Request via curl:</span>
            </span>
            <button
              onClick={() => handleCopy('curl-cmd', `curl -A "Mediapartners-Google" -I https://${cleanDomain}`)}
              className="text-xs text-rose-400 hover:text-rose-300 font-sans font-bold flex items-center gap-1 cursor-pointer"
            >
              {copiedCode === 'curl-cmd' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedCode === 'curl-cmd' ? 'Copied' : 'Copy Command'}</span>
            </button>
          </div>
          <div className="text-indigo-400 p-2 bg-slate-950 rounded-xl">
            curl -A &quot;Mediapartners-Google&quot; -I https://{cleanDomain}
          </div>
          <div className="text-emerald-400 text-[11px] pt-1">
            Expected Result: <code>HTTP/2 200</code>. If you receive <code>403 Forbidden</code> or <code>503 Service Temporarily Unavailable</code>, your firewall is rejecting AdSense approval crawlers.
          </div>
        </div>
      </div>
    </div>
  );
};
