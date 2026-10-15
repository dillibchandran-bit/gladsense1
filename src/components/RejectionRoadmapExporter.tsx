import React, { useState } from 'react';
import {
  FileText,
  Printer,
  Copy,
  Check,
  CheckCircle2,
  AlertTriangle,
  Clock,
  ShieldCheck,
  ArrowRight,
  ExternalLink,
  Zap,
} from 'lucide-react';
import { RejectionCategory } from '../types';

interface RoadmapTicket {
  id: string;
  phase: string;
  days: string;
  priority: 'P0 - Blocker' | 'P1 - High' | 'P2 - Polish';
  title: string;
  description: string;
  verificationStep: string;
  snippet?: string;
}

interface RejectionRoadmapExporterProps {
  rejectionReason: RejectionCategory;
  domainUrl?: string;
  onSelectRemedy?: (remedyType: string) => void;
}

export const RejectionRoadmapExporter: React.FC<RejectionRoadmapExporterProps> = ({
  rejectionReason,
  domainUrl = 'yourdomain.com',
  onSelectRemedy,
}) => {
  const [completedTickets, setCompletedTickets] = useState<{ [id: string]: boolean }>({});
  const [copiedMarkdown, setCopiedMarkdown] = useState<boolean>(false);

  const getTicketsForReason = (reason: RejectionCategory): RoadmapTicket[] => {
    switch (reason) {
      case 'valuable-inventory-under-construction':
        return [
          {
            id: 't-1',
            phase: 'Phase 1: Zero-Dead-End Navigation Audit',
            days: 'Days 1–3',
            priority: 'P0 - Blocker',
            title: 'Purge all dummy href="#" anchor tags from menus & footers',
            description: 'Google reviewers click every menu item. If a category page is empty or displays "Coming Soon", delete the navigation link completely until content is live.',
            verificationStep: 'Run link checker to verify 0 dead ends or empty archive pages.',
          },
          {
            id: 't-2',
            phase: 'Phase 2: Minimum Content Volume Threshold',
            days: 'Days 4–7',
            priority: 'P0 - Blocker',
            title: 'Ensure at least 30 published, indexed articles with 800+ words each',
            description: 'Sites with fewer than 25–30 articles are automatically classified as "Under Construction" by Google automated pre-screening scripts.',
            verificationStep: 'Query "site:yourdomain.com" in Google to ensure >= 25 indexed URLs.',
          },
          {
            id: 't-3',
            phase: 'Phase 3: Essential Functional Pages',
            days: 'Days 8–10',
            priority: 'P1 - High',
            title: 'Verify full functionality of Contact, About, and Privacy pages',
            description: 'Contact page must feature a working HTML form or direct mailto: link. About page must articulate site mission and real team members.',
            verificationStep: 'Test form submission and verify no 404 or incomplete sections.',
          },
          {
            id: 't-4',
            phase: 'Phase 4: Final Pre-Submission Polish',
            days: 'Days 11–14',
            priority: 'P2 - Polish',
            title: 'Remove all placeholder lorem ipsum, default WordPress widgets & sample posts',
            description: 'Delete "Hello World!" sample posts, default "Uncategorized" archives, and stock sample comments.',
            verificationStep: 'Inspect sitemap.xml for clean, 100% genuine URL slugs.',
          },
        ];
      case 'site-down-or-unavailable':
        return [
          {
            id: 't-1',
            phase: 'Phase 1: Cloudflare & Firewall Unblocking',
            days: 'Days 1–2',
            priority: 'P0 - Blocker',
            title: 'Bypass Cloudflare Turnstile / Bot Fight Mode for Mediapartners-Google',
            description: 'Google AdSense uses the "Mediapartners-Google" and "AdsBot-Google" user-agents. If Cloudflare serves a Javascript challenge or 403 Forbidden, review fails instantly.',
            verificationStep: 'Create Cloudflare WAF Skip Rule for User-Agent containing "Mediapartners-Google".',
            snippet: '(http.user_agent contains "Mediapartners-Google") or (http.user_agent contains "AdsBot-Google") -> Action: Skip All WAF',
          },
          {
            id: 't-2',
            phase: 'Phase 2: Robots.txt & DNS Accessibility',
            days: 'Days 3–5',
            priority: 'P0 - Blocker',
            title: 'Verify robots.txt allows universal Mediapartners crawler access',
            description: 'Ensure no Disallow: / directives block AdSense crawlers from indexing CSS, JavaScript, or dynamic templates.',
            verificationStep: 'Check robots.txt in Google Search Central robots testing tool.',
            snippet: 'User-agent: Mediapartners-Google\nDisallow:\n\nUser-agent: AdsBot-Google\nDisallow:',
          },
          {
            id: 't-3',
            phase: 'Phase 3: SSL Certificate & Server Uptime',
            days: 'Days 6–9',
            priority: 'P1 - High',
            title: 'Ensure valid SSL certificate & < 500ms TTFB across global nodes',
            description: 'Reviewers from Google Mountain View, Dublin, or Singapore will test your domain. Ensure global CDN latency is below 1 second with 0 SSL handshake errors.',
            verificationStep: 'Test domain via synthetic global monitoring (Pingdom / GTmetrix).',
          },
          {
            id: 't-4',
            phase: 'Phase 4: Pre-Submission Verification',
            days: 'Days 10–14',
            priority: 'P2 - Polish',
            title: 'Verify URL Inspection in Google Search Console shows 200 OK',
            description: 'Perform a live URL test in Search Console to verify Googlebot fetches HTML and renders screenshot without timeouts.',
            verificationStep: 'URL Inspection tool shows "URL is available to Google".',
          },
        ];
      case 'scraped-unoriginal':
      case 'low-value-content':
      default:
        return [
          {
            id: 't-1',
            phase: 'Phase 1: AI Cliché & Content Pruning',
            days: 'Days 1–3',
            priority: 'P0 - Blocker',
            title: 'Purge formulaic AI transitions and rewrite generic introductory fluff',
            description: 'Eliminate robotic filler ("In today’s fast-paced digital world", "delve into", "it is important to remember"). Add direct answers in the first 100 words of every article.',
            verificationStep: 'Scan articles using the Quality Rater Diagnostic Matrix; keep Cliché Score < 15%.',
          },
          {
            id: 't-2',
            phase: 'Phase 2: Firsthand Evidence & Information Gain Moat',
            days: 'Days 4–8',
            priority: 'P0 - Blocker',
            title: 'Embed original test findings, proprietary calculation tables, or custom photos',
            description: 'Every post must contain value not found in the existing Google top 10 search results. Replace stock photos with annotated screenshots or workshop benches.',
            verificationStep: 'Each core article features at least 1 unique comparison table or custom graphic.',
          },
          {
            id: 't-3',
            phase: 'Phase 3: Radical Author & Entity Attribution',
            days: 'Days 9–11',
            priority: 'P1 - High',
            title: 'Implement accredited author bio boxes and Schema.org TechArticle JSON-LD',
            description: 'Showcase real author credentials, social LinkedIn/scholar profiles, and link to transparent editorial policies.',
            verificationStep: 'Rich Results Test validates valid Person and Article schema without errors.',
          },
          {
            id: 't-4',
            phase: 'Phase 4: Cohesive Site Navigation & Taxonomy',
            days: 'Days 12–14',
            priority: 'P2 - Polish',
            title: 'Establish 3–5 focused topic clusters with bidirectional internal linking',
            description: 'Do not publish disparate random topics. Build comprehensive hub-and-spoke topic clusters to establish domain topical authority.',
            verificationStep: 'Every article has at least 3 relevant internal links to related topic guides.',
          },
        ];
    }
  };

  const tickets = getTicketsForReason(rejectionReason);

  const toggleTicket = (id: string) => {
    setCompletedTickets((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const completedCount = tickets.filter((t) => completedTickets[t.id]).length;
  const progressPercent = Math.round((completedCount / tickets.length) * 100);

  const generateMarkdownRoadmap = () => {
    return `# Google AdSense 14-Day Remediation Roadmap
**Domain:** ${domainUrl}
**Diagnosed Rejection:** ${rejectionReason.replace(/-/g, ' ').toUpperCase()}
**Remediation Progress:** ${completedCount}/${tickets.length} Tasks Completed (${progressPercent}%)

---

${tickets
  .map(
    (t, i) => `### ${i + 1}. [${t.priority}] ${t.title}
* **Phase:** ${t.phase} (${t.days})
* **Status:** ${completedTickets[t.id] ? '[x] COMPLETED' : '[ ] PENDING'}
* **Action:** ${t.description}
* **Verification Test:** ${t.verificationStep}
${t.snippet ? `\`\`\`\n${t.snippet}\n\`\`\`` : ''}
`
  )
  .join('\n')}

---
*Generated by GladSense Executive AdSense Remediation Engine*
`;
  };

  const handleCopyMarkdown = () => {
    navigator.clipboard.writeText(generateMarkdownRoadmap());
    setCopiedMarkdown(true);
    setTimeout(() => setCopiedMarkdown(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-white rounded-3xl border border-purple-200 shadow-xl overflow-hidden p-6 sm:p-8 space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-purple-100 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-100 text-purple-700 uppercase tracking-wider">
              14-Day Remediation Roadmap
            </span>
            <span className="text-xs text-slate-400 font-mono">
              Target: {domainUrl}
            </span>
          </div>
          <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">
            Prioritized Resolution Ticket Backlog
          </h3>
          <p className="text-xs text-slate-500">
            Systematic action items required by Google Quality Evaluators before re-submitting your site.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={handleCopyMarkdown}
            className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
          >
            {copiedMarkdown ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700">Copied Markdown</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-600" />
                <span>Export Markdown</span>
              </>
            )}
          </button>
          <button
            type="button"
            onClick={handlePrint}
            className="px-3.5 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Roadmap</span>
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="p-4 rounded-2xl bg-purple-50/70 border border-purple-200/80 space-y-2">
        <div className="flex items-center justify-between text-xs font-bold">
          <span className="text-purple-950">
            Roadmap Execution Progress: {completedCount} of {tickets.length} Fixed
          </span>
          <span className="text-purple-700 font-mono">{progressPercent}%</span>
        </div>
        <div className="w-full h-2.5 bg-purple-200/80 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-purple-600 to-indigo-600 transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Tickets List */}
      <div className="space-y-4">
        {tickets.map((ticket, idx) => {
          const isDone = !!completedTickets[ticket.id];
          return (
            <div
              key={ticket.id}
              className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                isDone
                  ? 'bg-slate-50/70 border-slate-200 opacity-75'
                  : 'bg-white border-slate-200 hover:border-purple-300 shadow-xs'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    checked={isDone}
                    onChange={() => toggleTicket(ticket.id)}
                    className="mt-1 w-4 h-4 text-purple-600 rounded cursor-pointer accent-purple-600"
                  />
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[10px] font-mono font-bold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                        Ticket #{idx + 1}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          ticket.priority.includes('P0')
                            ? 'bg-rose-100 text-rose-800 border border-rose-200'
                            : ticket.priority.includes('P1')
                            ? 'bg-amber-100 text-amber-800 border border-amber-200'
                            : 'bg-blue-100 text-blue-800 border border-blue-200'
                        }`}
                      >
                        {ticket.priority}
                      </span>
                      <span className="text-[11px] text-slate-400 font-medium">
                        {ticket.phase} ({ticket.days})
                      </span>
                    </div>

                    <h4 className={`text-sm font-bold ${isDone ? 'line-through text-slate-500' : 'text-slate-900'}`}>
                      {ticket.title}
                    </h4>

                    <p className="text-xs text-slate-600 leading-relaxed pt-1">
                      {ticket.description}
                    </p>

                    <div className="pt-2 flex items-center gap-1.5 text-[11px] text-emerald-800 bg-emerald-50/80 px-2.5 py-1.5 rounded-lg border border-emerald-200/60 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span><strong>Verification Gate:</strong> {ticket.verificationStep}</span>
                    </div>

                    {ticket.snippet && (
                      <div className="pt-2">
                        <pre className="p-2.5 bg-slate-900 text-slate-100 rounded-xl text-[10px] font-mono overflow-x-auto">
                          {ticket.snippet}
                        </pre>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
