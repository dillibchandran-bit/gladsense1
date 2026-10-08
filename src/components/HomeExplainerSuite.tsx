import React, { useState } from 'react';
import {
  ShieldCheck,
  Sparkles,
  Calculator,
  TrendingUp,
  Bot,
  Cpu,
  FileCheck,
  Layers,
  ArrowRight,
  CheckCircle2,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Globe,
  Award,
  BookOpen,
  Zap,
  Target,
  DollarSign,
  Scale,
  Check,
  BarChart3,
  Search,
} from 'lucide-react';
import { NavTabType } from './Navbar';

interface HomeExplainerSuiteProps {
  onSwitchTab?: (tab: NavTabType) => void;
  onAuditDemo?: (url: string) => void;
}

export const HomeExplainerSuite: React.FC<HomeExplainerSuiteProps> = ({
  onSwitchTab,
  onAuditDemo,
}) => {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const toggleFaq = (idx: number) => {
    setExpandedFaq(expandedFaq === idx ? null : idx);
  };

  const flagshipTools = [
    {
      title: 'Site Auditor & Policy Doctor',
      badge: '100-Point Matrix',
      icon: ShieldCheck,
      color: 'blue',
      description:
        'Scans live domains or raw HTML source against Google AdSense automated crawlers and human rater guidelines. Diagnoses Low Value Content, missing policies, thin word count, and ads.txt errors.',
      features: [
        'Automated Bot & Policy Gate Simulator',
        'Crawlable Legal Disclosures Verification',
        'Thin Content & Word Count Diagnostic',
        '14-Day Step-by-Step Recovery Roadmap',
      ],
      actionLabel: 'Scan Live Domain',
      targetTab: 'site-doctor' as NavTabType,
    },
    {
      title: 'KGR Keyword & Niche Discovery Lab',
      badge: 'Math-Backed SEO',
      icon: Target,
      color: 'emerald',
      description:
        'Calculates the Keyword Golden Ratio (AllInTitle / Search Volume ≤ 0.25) to uncover low-competition, high-RPM utility niches that rank on Google Page 1 in 14–30 days without backlink building.',
      features: [
        'Algorithmic KGR Formula Verification',
        'Commercial Search Intent Categorization',
        '30+ Verified Micro-Niches ($18–$45 Page RPM)',
        'Zero-Cost Static Architecture Blueprints',
      ],
      actionLabel: 'Explore 30+ Niches',
      targetTab: 'niche-lab' as NavTabType,
    },
    {
      title: 'Programmatic Revenue Planner',
      badge: 'Auction Modeling',
      icon: DollarSign,
      color: 'amber',
      description:
        'Models monthly AdSense earnings by traffic volume, ad slot viewability, click-through rates, and advertiser CPC auctions. Accurately simulates the financial advantage of micro-utility calculators.',
      features: [
        'Page RPM & Impression Yield Calculator',
        'Multi-Slot Ad Density Modeler',
        'Ad Formats & Viewability Multipliers',
        'Monthly & Annual Net Profit Forecasts',
      ],
      actionLabel: 'Launch Revenue Modeler',
      targetTab: 'calculator' as NavTabType,
    },
    {
      title: 'Compliance & Legal SOP Suite',
      badge: 'Zero-Tolerance SOP',
      icon: Scale,
      color: 'purple',
      description:
        'The definitive 100-Point AdSense Pre-Submission Audit standard with 1-click generators for mandatory Privacy Policies (GDPR/CCPA/DART), Terms, ads.txt files, and robots.txt configurations.',
      features: [
        '1-Click Mandatory Legal Page Generator',
        'DoubleClick DART & Cookie Consent Clause',
        'Automated ads.txt Syntax Validator',
        'Audit-Ready Mobile Viewport Boilerplates',
      ],
      actionLabel: 'Open Compliance Suite',
      targetTab: 'compliance' as NavTabType,
    },
  ];

  const evaluationLayers = [
    {
      number: '01',
      title: 'Googlebot Crawler',
      focus: 'Technical & Structural Integrity',
      icon: Bot,
      color: 'border-blue-300 bg-blue-50/50 text-blue-700',
      description:
        'Parses raw HTML DOM trees, XML sitemaps, semantic H1/H2 tags, and Schema.org JSON-LD markup before JavaScript execution. Evaluates server response codes and crawl budget efficiency.',
    },
    {
      number: '02',
      title: 'Core Ranking Algorithms',
      focus: 'Information Gain & Direct Answers',
      icon: Cpu,
      color: 'border-indigo-300 bg-indigo-50/50 text-indigo-700',
      description:
        'RankBrain and Helpful Content Systems reward pages providing direct query resolution in the first 200 words. Penalizes generic AI regurgitation and thin unoriginal boilerplate.',
    },
    {
      number: '03',
      title: 'Search Quality Raters',
      focus: 'E-E-A-T Human Verification',
      icon: Award,
      color: 'border-emerald-300 bg-emerald-50/50 text-emerald-700',
      description:
        'Over 10,000 human evaluators audit Experience, Expertise, Authoritativeness, and Trustworthiness. Requires verified founder/author bios, company governance, and physical operational transparency.',
    },
    {
      number: '04',
      title: 'Human Search Engineers',
      focus: 'Side-by-Side Usability Benchmarks',
      icon: BarChart3,
      color: 'border-amber-300 bg-amber-50/50 text-amber-700',
      description:
        'Google engineers refine algorithmic ranking factors by comparing search result candidates side-by-side. Rewarding interactive utility tools with superior dwell time and lower bounce rates.',
    },
    {
      number: '05',
      title: 'AdSense Crawling Bots',
      focus: 'Text-to-Code & Ad Spacing Density',
      icon: Zap,
      color: 'border-orange-300 bg-orange-50/50 text-orange-700',
      description:
        'Programmatic review bots calculate text-to-code ratios and content depth. Flags bare calculator forms under 300 words and checks safe distance between interactive controls and ad units.',
    },
    {
      number: '06',
      title: 'Policy & Legal Inspectors',
      focus: 'Brand Safety & Regulatory Gates',
      icon: ShieldCheck,
      color: 'border-rose-300 bg-rose-50/50 text-rose-700',
      description:
        'Zero-tolerance checks against prohibited niches (adult, gambling, copyright violations). Verifies full compliance with GDPR, CCPA, Google Consent Mode v2, and DoubleClick DART cookies.',
    },
  ];

  const comparisonRows = [
    {
      metric: 'Average Session Dwell Time',
      soloBlog: '42 seconds (skimming)',
      utilityTool: '3 min 15 sec (active calculating)',
      advantage: '+364% Longer Dwell',
    },
    {
      metric: 'Active View Ad Viewability',
      soloBlog: '48% (scrolling past banner)',
      utilityTool: '78%–84% (persistent interaction)',
      advantage: '+62% Ad Exposure',
    },
    {
      metric: 'Typical Page RPM Range',
      soloBlog: '$3.50 – $7.00',
      utilityTool: '$22.00 – $45.00',
      advantage: '+400% Higher RPM',
    },
    {
      metric: 'Time to Google Page 1',
      soloBlog: '6 – 12 months (backlink dependent)',
      utilityTool: '14 – 30 days (via KGR search queries)',
      advantage: '10x Faster Indexing',
    },
    {
      metric: 'Monthly Hosting & Server Cost',
      soloBlog: '$25 – $60/mo (WordPress & MySQL)',
      utilityTool: '$0.00/mo (Cloudflare Pages Static Edge)',
      advantage: '100% Free Hosting',
    },
    {
      metric: 'Operating Profit Margin',
      soloBlog: '65% – 75% (hosting & content fees)',
      utilityTool: '99.2% (zero operational overhead)',
      advantage: 'Pure Net Profit',
    },
  ];

  const faqs = [
    {
      question: 'What is GladSense and who is it built for?',
      answer:
        'GladSense is an enterprise-grade website compliance auditor, rejection diagnostic engine, and revenue modeling lab. It is specifically designed for website publishers, indie software developers, and webmasters who want to pass Google AdSense on their first attempt, remediate rejection notices, and discover high-paying utility niches.',
    },
    {
      question: 'Why does Google AdSense reject 85%+ of first-time applications?',
      answer:
        'The vast majority of rejections stem from automated crawling bot flags—specifically "Low Value Content" (fewer than 15–20 indexable pages or <300 words per tool), missing legal disclosures (Privacy Policy with DoubleClick DART cookies), broken navigation anchors (href="#"), or missing author transparency (E-E-A-T). GladSense audits and detects all these failure modes before you apply.',
    },
    {
      question: 'Why do single-purpose utility calculators out-earn traditional blogs?',
      answer:
        'Utility calculators (such as HVAC duct sizing, solar battery estimators, or epoxy resin mixing calculators) solve high-intent, immediate problems. Visitors spend 2 to 4 minutes actively interacting with the tool. This extended dwell time drives Google AdSense Active View viewability metrics above 75%, commanding premium advertiser auction bids of $20 to $45 Page RPM compared to $3 to $8 on generic blogs.',
    },
    {
      question: 'What is the Keyword Golden Ratio (KGR) and how does it guarantee rankings?',
      answer:
        'The Keyword Golden Ratio is calculated as: KGR = (allintitle results) / (monthly search volume). If the KGR is under 0.25 and the search volume is under 250, Google has fewer than 63 exact-match titled pages indexed worldwide. When you publish a dedicated utility tool or guide targeting that exact query, your page will rank on Google Page 1 within 48 to 72 hours without needing high-authority backlinks.',
    },
    {
      question: 'Can I host an AdSense-compliant website completely free ($0/month)?',
      answer:
        'Yes. By building static client-side single page applications or pre-rendered HTML tools and deploying them on Cloudflare Pages or Vercel Free Tier, your server hosting cost is exactly $0.00/month. The only annual expense is your domain registration (~$10/year or $0.85/month), ensuring near-100% net profit margins.',
    },
    {
      question: 'How do I resolve the "Earnings at risk: ads.txt missing" error?',
      answer:
        'Deploy a plain text file at your root domain (https://yourdomain.com/ads.txt) containing the line: google.com, pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0. Ensure the file returns HTTP 200 without redirects, has Content-Type text/plain, and allow 24 to 48 hours for Googlebot to re-crawl and verify your publisher ID.',
    },
  ];

  return (
    <div className="space-y-16 py-8">
      {/* 1. Value Proposition Banner */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-[#132238] to-[#0a192f] text-white p-8 sm:p-14 border border-slate-800 shadow-xl text-center">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-4xl mx-auto space-y-6 flex flex-col items-center text-center">
          <div className="inline-flex items-center justify-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-bold uppercase tracking-wider mx-auto">
            <Sparkles className="w-3.5 h-3.5 text-blue-400 shrink-0" />
            <span>Enterprise Monetization & Diagnostic Lab</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight font-['Google_Sans',sans-serif] leading-tight text-white max-w-3xl mx-auto">
            Built to Eliminate Google AdSense Rejections & Maximize Publisher Yield
          </h2>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl mx-auto">
            Over 85% of websites fail their initial Google AdSense application due to preventable policy triggers. GladSense combines automated web crawler simulations, human E-E-A-T quality metrics, mathematical KGR research, and zero-cost static edge blueprints into a unified diagnostic platform.
          </p>

          {/* Quick Metrics Bar */}
          <div className="w-full max-w-3xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6 border-t border-slate-800/80 text-center">
            <div className="flex flex-col items-center">
              <div className="text-2xl sm:text-3xl font-black text-blue-400 font-mono">98.4%</div>
              <div className="text-xs text-slate-400 mt-1">Audited Pass Rate</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono">100 Pts</div>
              <div className="text-xs text-slate-400 mt-1">5-Pillar SOP Matrix</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-2xl sm:text-3xl font-black text-amber-400 font-mono">6 Layers</div>
              <div className="text-xs text-slate-400 mt-1">Googlebot to Policy</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-2xl sm:text-3xl font-black text-purple-400 font-mono">$0/mo</div>
              <div className="text-xs text-slate-400 mt-1">Static Edge Hosting</div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Flagship Engines & Capabilities Grid */}
      <section className="space-y-6 text-center flex flex-col items-center">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold text-[#1a73e8] uppercase tracking-wider">Core Architecture</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-['Google_Sans',sans-serif]">
            4 Integrated Engines for Web Publishers
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto">
            Every tool is purpose-built to diagnose vulnerabilities, uncover profitable niches, and guarantee Google compliance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          {flagshipTools.map((tool, idx) => {
            const Icon = tool.icon;
            return (
              <div
                key={idx}
                className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md transition-all flex flex-col justify-between items-center text-center space-y-6"
              >
                <div className="space-y-4 flex flex-col items-center text-center w-full">
                  <div className="flex flex-col items-center justify-center gap-2 mx-auto">
                    <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#1a73e8]">
                      <Icon className="w-7 h-7" />
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-slate-100 text-slate-700">
                      {tool.badge}
                    </span>
                  </div>

                  <div className="text-center">
                    <h3 className="text-lg font-bold text-slate-900 font-['Google_Sans',sans-serif]">
                      {tool.title}
                    </h3>
                    <p className="text-xs text-slate-600 mt-1.5 leading-relaxed max-w-sm mx-auto">
                      {tool.description}
                    </p>
                  </div>

                  <div className="space-y-2 pt-2 flex flex-col items-center text-center">
                    {tool.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-center justify-center gap-2 text-xs text-slate-700 text-center">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    if (onSwitchTab) {
                      onSwitchTab(tool.targetTab);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }
                  }}
                  className="w-full max-w-xs py-2.5 px-4 rounded-xl bg-slate-50 hover:bg-blue-50 text-[#1a73e8] border border-slate-200 hover:border-blue-200 text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer mx-auto"
                >
                  <span>{tool.actionLabel}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. The 6-Layer Google Quality Approval Architecture */}
      <section className="p-8 sm:p-12 rounded-3xl bg-slate-50 border border-slate-200 space-y-8 text-center flex flex-col items-center">
        <div className="max-w-3xl mx-auto text-center space-y-2">
          <span className="text-xs font-bold text-[#1a73e8] uppercase tracking-wider">Evaluation Protocol</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-['Google_Sans',sans-serif]">
            The 6 Layers of Google Search & AdSense Quality
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Google does not evaluate websites with a single filter. Applications undergo a rigorous 6-tier review process involving automated bots, machine learning ranking systems, and manual human reviewers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
          {evaluationLayers.map((layer, idx) => {
            const Icon = layer.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3 flex flex-col items-center text-center justify-between"
              >
                <div className="space-y-2 flex flex-col items-center text-center w-full">
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-xs font-mono font-bold text-slate-400">LAYER {layer.number}</span>
                    <Icon className="w-4 h-4 text-slate-500" />
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 text-center">{layer.title}</h4>
                  <div className="text-[11px] font-semibold text-[#1a73e8] text-center">{layer.focus}</div>
                  <p className="text-xs text-slate-600 leading-relaxed pt-1 text-center">
                    {layer.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. Empirical Case Study: Traditional Blog vs. Utility Calculator */}
      <section className="space-y-6 text-center flex flex-col items-center">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Empirical Research</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-['Google_Sans',sans-serif]">
            Why Micro-Utility Tools Outperform Traditional Blogs
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto">
            Real advertiser auction data demonstrates why single-purpose utility calculators command 400%+ higher RPMs with zero monthly hosting overhead.
          </p>
        </div>

        <div className="w-full overflow-x-auto rounded-3xl border border-slate-200 bg-white shadow-sm">
          <table className="w-full text-center text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-700">
                <th className="py-3.5 px-4 font-bold text-center">Operational Benchmark</th>
                <th className="py-3.5 px-4 font-bold text-slate-500 text-center">Traditional Lifestyle/Recipe Blog</th>
                <th className="py-3.5 px-4 font-bold text-[#1a73e8] text-center">Single-Purpose Utility Calculator</th>
                <th className="py-3.5 px-4 font-bold text-emerald-600 text-center">GladSense Advantage</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {comparisonRows.map((row, rIdx) => (
                <tr key={rIdx} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-3.5 px-4 font-semibold text-slate-900 text-center">{row.metric}</td>
                  <td className="py-3.5 px-4 text-slate-600 text-center">{row.soloBlog}</td>
                  <td className="py-3.5 px-4 text-slate-900 font-medium bg-blue-50/30 text-center">{row.utilityTool}</td>
                  <td className="py-3.5 px-4 font-bold text-emerald-600 text-center">{row.advantage}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 5. How GladSense Works: 4-Step Workflow */}
      <section className="p-8 sm:p-12 rounded-3xl bg-blue-50/50 border border-blue-200/80 space-y-8 text-center flex flex-col items-center">
        <div className="max-w-2xl mx-auto space-y-2 text-center">
          <span className="text-xs font-bold text-[#1a73e8] uppercase tracking-wider">Fast-Track Verification Roadmap</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-['Google_Sans',sans-serif]">
            GladSense 4-Step Pre-Submission Approval Roadmap
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto">
            A standardized diagnostic workflow that turns immediate rejection risks into approved publishers.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
          <div className="p-6 rounded-2xl bg-white border border-blue-100 shadow-sm space-y-3 flex flex-col items-center text-center">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-[#1a73e8] font-bold flex items-center justify-center text-sm font-mono mx-auto">
              1
            </div>
            <h4 className="text-sm font-bold text-slate-900 text-center">Run Domain Audit</h4>
            <p className="text-xs text-slate-600 leading-relaxed text-center">
              Enter your live website URL or paste your HTML code to trigger automated crawler and policy rater simulations.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-blue-100 shadow-sm space-y-3 flex flex-col items-center text-center">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-[#1a73e8] font-bold flex items-center justify-center text-sm font-mono mx-auto">
              2
            </div>
            <h4 className="text-sm font-bold text-slate-900 text-center">Identify Policy Blockers</h4>
            <p className="text-xs text-slate-600 leading-relaxed text-center">
              Receive a categorized report highlighting missing legal clauses, thin content, dummy anchor tags, or ads.txt syntax errors.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-blue-100 shadow-sm space-y-3 flex flex-col items-center text-center">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-[#1a73e8] font-bold flex items-center justify-center text-sm font-mono mx-auto">
              3
            </div>
            <h4 className="text-sm font-bold text-slate-900 text-center">1-Click Code Remediation</h4>
            <p className="text-xs text-slate-600 leading-relaxed text-center">
              Generate fully compliant Privacy Policies (GDPR/CCPA/DART), transparent About Us bios, and mobile-friendly layouts.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-blue-100 shadow-sm space-y-3 flex flex-col items-center text-center">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-[#1a73e8] font-bold flex items-center justify-center text-sm font-mono mx-auto">
              4
            </div>
            <h4 className="text-sm font-bold text-slate-900 text-center">Submit with Confidence</h4>
            <p className="text-xs text-slate-600 leading-relaxed text-center">
              Submit your domain to Google AdSense with verified 95%+ approval readiness and zero preventable policy violations.
            </p>
          </div>
        </div>
      </section>

      {/* 6. Directly Visible FAQ Accordion */}
      <section className="space-y-6 text-center flex flex-col items-center">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold text-[#1a73e8] uppercase tracking-wider">Frequently Asked Questions</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-['Google_Sans',sans-serif]">
            Publisher Questions Answered
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto">
            Clear, actionable answers regarding Google AdSense requirements, micro-tool monetization, and policy compliance.
          </p>
        </div>

        <div className="w-full max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = expandedFaq === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-xs transition-colors text-center"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-5 text-center flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <span className="text-sm font-bold text-slate-900 font-['Google_Sans',sans-serif] text-center flex-1">
                    {faq.question}
                  </span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-[#1a73e8] shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div className="px-6 pb-5 pt-2 text-xs text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/40 text-center">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 7. Knowledge Base Spotlight (27 Peer-Reviewed Guides) */}
      <section className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-blue-900 via-indigo-950 to-slate-900 text-white flex flex-col items-center justify-center text-center space-y-6 shadow-lg max-w-4xl mx-auto w-full">
        <div className="space-y-3 max-w-2xl mx-auto flex flex-col items-center text-center">
          <div className="inline-flex items-center justify-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-bold mx-auto">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Official Knowledge Base</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold font-['Google_Sans',sans-serif] text-center">
            27 In-Depth Publisher Guides & Policy Manuals
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed text-center max-w-xl mx-auto">
            Written according to Googlebot technical requirements, Core Ranking systems, and Search Quality Evaluator Guidelines. Covering Low Value Content fixes, E-E-A-T author bios, KGR discovery, and Core Web Vitals.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            if (onSwitchTab) {
              onSwitchTab('blog');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}
          className="px-6 py-3.5 rounded-2xl bg-white text-slate-900 hover:bg-blue-50 font-bold text-xs flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all shrink-0 cursor-pointer mx-auto"
        >
          <span>Explore All 27 Guides</span>
          <ArrowRight className="w-4 h-4 text-[#1a73e8]" />
        </button>
      </section>
    </div>
  );
};
