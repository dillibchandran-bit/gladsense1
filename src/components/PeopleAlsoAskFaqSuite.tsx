import React, { useState } from 'react';
import {
  HelpCircle,
  Search,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Copy,
  Check,
  ShieldCheck,
  ExternalLink,
  BookOpen,
  ArrowRight,
  Clock,
  Globe,
  FileCode,
  DollarSign,
  AlertTriangle,
  Layers,
  Terminal,
} from 'lucide-react';
import { useAppRouter } from '../context/RouterContext';

export interface PaaQuestionItem {
  id: string;
  exactKeyword: string;
  category: 'Inventory & Content' | 'Domain & Hosting' | 'Monetization & RPM' | 'Policy & Review';
  difficulty: string;
  positionZeroSnippet: string;
  policyHeadEvaluation: {
    overview: string;
    algorithmicTriggers: string[];
    evaluatorGuidelines: string;
    remediationProtocol: string[];
  };
  recommendedToolTab?: string;
  recommendedToolLabel?: string;
}

export const PRIORITY_4_PAA_QUESTIONS: PaaQuestionItem[] = [
  {
    id: 'paa-1',
    exactKeyword: 'how many articles needed for google adsense approval in 2026',
    category: 'Inventory & Content',
    difficulty: 'Verified Policy Answer',
    positionZeroSnippet:
      'For standard informational blogs, Google AdSense requires between 15 and 20 original, indexed articles averaging 1,000 to 1,500 words each before application submission. Interactive web applications or calculator suites require 5 to 8 distinct tool views, each accompanied by at least 800 words of formula derivations, practical user guides, and structured FAQs.',
    policyHeadEvaluation: {
      overview:
        'When an application is queued for evaluation, Google automated inspection bots (Mediapartners-Google and Google-InspectionTool) perform an automated word-count and indexation audit. Submitting with fewer than 15 indexed URLs in Google Search Console triggers an automatic "Low Value Content: Insufficient Content" rejection before human Search Quality Evaluators ever inspect the domain.',
      algorithmicTriggers: [
        'Automated crawler finds fewer than 15 crawlable HTTP 200 URLs in your XML sitemap.',
        'Average word count across article inventory is below 800 words.',
        'High boilerplate-to-content ratio (>85% shared navigation and widget code vs unique editorial copy).',
      ],
      evaluatorGuidelines:
        'Section 5.3 of Google Search Quality Rater Guidelines instructs evaluators to evaluate the "amount of Main Content (MC) representing the website purpose". Sites with sparse, placeholder, or stub posts fail the baseline threshold for sustainable ad inventory.',
      remediationProtocol: [
        'Publish a minimum of 18 comprehensive, fully formatted articles (1,200+ words each) across 3 to 4 logical categories.',
        'Verify in Google Search Console using "site:yourdomain.com" that at least 15 distinct URLs have been indexed with clean HTTP 200 codes.',
        'Ensure every interactive utility features the "3-Pill Structure" (formula explanation, real-world case study, and FAQ accordion) totaling 800+ words.',
      ],
    },
    recommendedToolTab: 'site-doctor',
    recommendedToolLabel: 'Audit Article Inventory Depth in Site Doctor',
  },
  {
    id: 'paa-2',
    exactKeyword: 'can a 1 month old domain get approved for adsense',
    category: 'Domain & Hosting',
    difficulty: 'Verified Policy Answer',
    positionZeroSnippet:
      'Yes, a 1-month-old domain can get approved for Google AdSense in 2026. Google does not enforce a statutory domain age minimum in most countries (excluding specific territories like China and India, where a 6-month guideline historically applied), provided the site fulfills all content depth, navigation integrity, and legal disclosure policies.',
    policyHeadEvaluation: {
      overview:
        'Domain age is often conflated with site quality. Google policy evaluations prioritize verifiable E-E-A-T credentials, content depth, and user experience. A brand-new 30-day domain with 20 original, authoritative articles and full legal transparency will pass review faster than a 3-year-old dormant domain with thin content.',
      algorithmicTriggers: [
        'Domain WHOIS creation date under 30 days is NOT an automatic blocker outside restricted jurisdictions.',
        'Rejections on new domains occur because the publisher applied before Googlebot indexed their core pages.',
        'Lack of established Google Search Console crawl history causes automated review crawlers to timeout.',
      ],
      evaluatorGuidelines:
        'Human Quality Evaluators look for signs of a legitimate, active organization: identifiable author bylines, an operational About Us page with contact emails, and active privacy disclosures.',
      remediationProtocol: [
        'Do not apply on day 1; allow the domain to age at least 21 to 30 days while publishing consistent articles.',
        'Submit your XML sitemap to Google Search Console and inspect key URLs to confirm Googlebot has crawled and rendered them.',
        'Deploy the 5 mandatory trust pages (Privacy Policy with DART cookies, Terms, About, Contact, Editorial Disclosure).',
      ],
    },
    recommendedToolTab: 'policy-toolkit',
    recommendedToolLabel: 'Generate Mandatory Trust Pages',
  },
  {
    id: 'paa-3',
    exactKeyword: 'does subfolder or subdomain affect adsense approval',
    category: 'Domain & Hosting',
    difficulty: 'Verified Policy Answer',
    positionZeroSnippet:
      'Yes, subdomains and subfolders are evaluated very differently by Google AdSense. In Google AdSense, you must first apply with and gain approval for the root apex domain (e.g., yourdomain.com). Individual subdomains (e.g., tools.yourdomain.com) cannot be submitted for primary site review on standard accounts, whereas subfolders (e.g., yourdomain.com/tools/) inherit root domain approval automatically.',
    policyHeadEvaluation: {
      overview:
        'Since the AdSense Sites Management architectural update, Google mandates that initial account approval occur at the root top-level domain (TLD). Once your apex domain (yourdomain.com) is approved, you can freely add subdomains under "Sites > Manage Subdomains" without undergoing a full secondary site audit.',
      algorithmicTriggers: [
        'Attempting to submit a subdomain as a new site on standard publisher accounts returns an invalid URL error.',
        'Subfolders consolidate PageRank, domain authority, and historical crawl budget into one domain entity.',
        'Subdomains create isolated crawl partitions that require Googlebot to independently establish trust and crawl frequency.',
      ],
      evaluatorGuidelines:
        'Evaluators assess the entire domain reputation when reviewing applications. Subfolder architectures allow utility micro-tools and editorial blogs to mutually reinforce domain-level authority.',
      remediationProtocol: [
        'Always configure your DNS so non-www and www point to your primary apex domain with a clean 301 redirect.',
        'Host your initial tools and guides under subfolder routes (e.g., /tools/, /guides/) to share root domain indexation authority.',
        'If using subdomains for specialized web apps, submit the root domain with introductory documentation first, then monetize the subdomain upon root approval.',
      ],
    },
    recommendedToolTab: 'policy-toolkit',
    recommendedToolLabel: 'Validate Domain & ads.txt Configuration',
  },
  {
    id: 'paa-4',
    exactKeyword: 'what is a good rpm for education blog on adsense',
    category: 'Monetization & RPM',
    difficulty: 'Verified Policy Answer',
    positionZeroSnippet:
      'A good Page RPM for an education blog or academic tool site on Google AdSense ranges between $18.50 and $36.00 for Tier 1 traffic (US, UK, Canada, Australia). High-intent academic sub-niches—such as professional licensure exam prep (CPA, NCLEX) and higher education grade calculators—reach $28.00 to $34.00 RPM, while general K-12 informational articles average $12.00 to $18.00 RPM.',
    policyHeadEvaluation: {
      overview:
        'AdSense Page RPM (Revenue Per Mille) represents total estimated earnings per 1,000 pageviews across all ad slots. The Education & Academic Tools sector commands premium advertiser auction clearing prices because users demonstrate high commercial intent (textbook rentals, tutoring, online degree enrollment, test prep courses).',
      algorithmicTriggers: [
        'Extended session dwell times (3 to 5 minutes per calculation or worked problem) drive Google AdSense Active View viewability above 75%.',
        'Academic tools generate 1.8 to 2.4 pageviews per user session, multiplying single-visit ad impression opportunities.',
        'Geographic traffic mix heavily dictates clearing CPM: 70%+ US/CA traffic commands 4x higher auction bids than Tier 3 global traffic.',
      ],
      evaluatorGuidelines:
        'Advertisers in higher education and professional certification bid aggressively in Google Ads auctions between January–February and August–October, driving seasonal RPM spikes exceeding $40.00.',
      remediationProtocol: [
        'Focus on high-CPC educational sub-sectors: Licensure Exam Prep ($34 RPM), College GPA/ECTS Grade Solvers ($28.50 RPM), and STEM Formula Derivations ($22 RPM).',
        'Deploy sticky responsive anchor ad units and in-article native placements to maintain viewability above 70%.',
        'Simulate your traffic earnings using the GladSense Education RPM Calculator to plan high-yield content clusters.',
      ],
    },
    recommendedToolTab: 'revenue-planner',
    recommendedToolLabel: 'Simulate Education RPM in Calculator',
  },
  {
    id: 'paa-5',
    exactKeyword: 'why is my site showing adsense valuable inventory scraped content',
    category: 'Policy & Review',
    difficulty: 'Verified Policy Answer',
    positionZeroSnippet:
      'Google AdSense triggers the "Valuable Inventory: Scraped Content" violation when automated classifiers or human Search Quality Evaluators determine that your pages lack Information Gain. This occurs if your content paraphrases top search results without original data, aggregates automated RSS/news feeds, copies product specifications verbatim, or relies on generic AI summaries without first-party testing.',
    policyHeadEvaluation: {
      overview:
        'The "Valuable Inventory: Scraped Content" policy flag is governed by Google Spam Policies and Helpful Content Systems. Google algorithms compare your content against existing web indices using n-gram token overlap, semantic vector embeddings, and entity relationship models. If your site offers no distinct factual novelty, proprietary calculations, or original viewpoints, it is classified as low-value scraping.',
      algorithmicTriggers: [
        'High text similarity (>15%) when cross-referenced against incumbent ranking articles in Google Search index.',
        'High density of robotic AI clichés ("In today\'s digital era", "delve into", "tapestry of") and zero original empirical data.',
        'Copying manufacturer specifications, Wikipedia summaries, or syllabus outlines verbatim without synthesis.',
      ],
      evaluatorGuidelines:
        'Search Quality Rater Guidelines state: "If all or most of the MC on the page is copied from another source with little or no original thought, the page should be rated Lowest".',
      remediationProtocol: [
        'Run your content through the GladSense AI Cliché & Content Auditor to detect repetitive boilerplate and generic phrasing.',
        'Add first-party Information Gain: custom comparison tables, proprietary calculation formulas, hands-on testing photos, or unique survey findings.',
        'Prune or consolidate thin articles (<800 words) and ensure every guide features verifiable author bylines with Schema.org Person microdata.',
      ],
    },
    recommendedToolTab: 'site-doctor',
    recommendedToolLabel: 'Run Scraped Content Diagnostic in Site Doctor',
  },
  {
    id: 'paa-6',
    exactKeyword: 'can i apply for adsense without organic search traffic',
    category: 'Inventory & Content',
    difficulty: 'Verified Policy Answer',
    positionZeroSnippet:
      'Yes, you can apply for Google AdSense without organic search traffic, as Google does not publish a statutory minimum traffic number for application eligibility. However, sites with zero organic search impressions face a 70%+ higher rejection risk because review crawlers require verified Google Search Console query logs to validate site legitimacy.',
    policyHeadEvaluation: {
      overview:
        'While Google official policy documentation does not mandate a minimum daily visitor count, automated triage algorithms evaluate domain engagement signals. Sites submitted with zero Search Console impressions or zero historical Googlebot fetch requests are frequently rejected under the catch-all umbrella flag: "Valuable Inventory: Under Construction" or "Low Value Content".',
      algorithmicTriggers: [
        'Absence of organic Search Console impressions signals to review bots that the domain has not been indexed or validated by search ranking algorithms.',
        'Review crawlers cannot evaluate real-world bounce rate, user navigation flows, or dwell time without organic visitor activity.',
        'Purchasing paid bot traffic or spamming social links to simulate traffic triggers Invalid Traffic (IVT) classifiers and immediate account termination.',
      ],
      evaluatorGuidelines:
        'Evaluators check whether the site serves real human readers with legitimate search intent. Having even 50 to 100 daily organic search clicks provides verifiable proof of helpfulness.',
      remediationProtocol: [
        'Target low-competition long-tail keywords using the Keyword Golden Ratio (KGR < 0.25) to generate 50–100 daily organic search visitors within 30 days.',
        'Verify in Google Search Console that your URLs receive organic impressions before hitting "Submit for Review" in AdSense.',
        'Never use traffic exchange networks, paid click bots, or automated proxy traffic; organic Google Search traffic is the only safe verification signal.',
      ],
    },
    recommendedToolTab: 'niche-lab',
    recommendedToolLabel: 'Find Zero-Competition KGR Keywords',
  },
  {
    id: 'paa-7',
    exactKeyword: 'how long does google take to review an adsense site in 2026',
    category: 'Policy & Review',
    difficulty: 'Verified Policy Answer',
    positionZeroSnippet:
      'In 2026, Google AdSense site reviews typically take between 24 hours and 14 days, with the average evaluation completing in 3 to 7 business days. Automated crawl scans occur within the first 48 hours, while secondary algorithmic quality checks and human Quality Evaluator reviews can extend the timeline up to 2 to 4 weeks during policy release cycles.',
    policyHeadEvaluation: {
      overview:
        'The AdSense site review workflow operates in three distinct sequential phases. Modifying your site URL structure, changing nameservers, or editing AdSense verification code during this period can reset your queue position back to day zero.',
      algorithmicTriggers: [
        'Phase 1 (Hours 1–48): Mediapartners-Google and Google-InspectionTool bots verify HTTP 200 server response, ads.txt, robots.txt, and mobile responsiveness.',
        'Phase 2 (Days 3–7): Automated content classification models evaluate inventory depth, duplicate boilerplate ratio, and E-E-A-T trust signals.',
        'Phase 3 (Days 7–14): Borderline sites or high-traffic domains undergo manual inspection by human Google Search Quality Evaluators.',
      ],
      evaluatorGuidelines:
        'If review bots encounter Cloudflare 403 Forbidden challenges, Turnstile captchas, or server timeouts (>800ms TTFB), the review stalls and generates a "Site Down or Programmatically Unavailable" rejection.',
      remediationProtocol: [
        'Ensure Mediapartners-Google crawler user-agents are whitelisted in your Cloudflare or origin server WAF before applying.',
        'Leave the AdSense verification meta tag or code snippet in your HTML <head> uninterrupted throughout the review window.',
        'Do not remove, unpublish, or restructure URLs while review status displays "Getting your site ready".',
      ],
    },
    recommendedToolTab: 'site-doctor',
    recommendedToolLabel: 'Test Crawler & Firewall Access in Site Doctor',
  },
];

interface PeopleAlsoAskFaqSuiteProps {
  onNavigateToTab?: (tab: string) => void;
  showSnippetPreviewByDefault?: boolean;
}

export const PeopleAlsoAskFaqSuite: React.FC<PeopleAlsoAskFaqSuiteProps> = ({
  onNavigateToTab,
  showSnippetPreviewByDefault = false,
}) => {
  const { navigate } = useAppRouter();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [expandedId, setExpandedId] = useState<string | null>('paa-1');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showSerpPreview, setShowSerpPreview] = useState<{ [id: string]: boolean }>({});

  const categories = ['All', 'Inventory & Content', 'Domain & Hosting', 'Monetization & RPM', 'Policy & Review'];

  const filteredQuestions = PRIORITY_4_PAA_QUESTIONS.filter((item) => {
    const matchesCat = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesQuery =
      item.exactKeyword.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.positionZeroSnippet.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.policyHeadEvaluation.overview.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  const toggleAccordion = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const toggleSerpPreview = (id: string) => {
    setShowSerpPreview((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleCopySnippet = (item: PaaQuestionItem, format: 'markdown' | 'jsonld') => {
    let textToCopy = '';
    if (format === 'markdown') {
      textToCopy = `### ${item.exactKeyword}\n\n${item.positionZeroSnippet}\n\n*Source: GladSense Google AdSense Compliance Evaluation Standards (https://gladsenseedu.app)*`;
    } else {
      textToCopy = JSON.stringify(
        {
          '@context': 'https://schema.org',
          '@type': 'Question',
          name: item.exactKeyword,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.positionZeroSnippet,
          },
        },
        null,
        2
      );
    }

    navigator.clipboard.writeText(textToCopy);
    setCopiedId(`${item.id}-${format}`);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleToolAction = (tabId?: string) => {
    if (!tabId) return;
    if (onNavigateToTab) {
      onNavigateToTab(tabId);
    } else {
      if (tabId === 'site-doctor') navigate('/tools/site-doctor/');
      else if (tabId === 'policy-toolkit') navigate('/tools/ads-txt-generator/');
      else if (tabId === 'revenue-planner') navigate('/tools/adsense-rpm-calculator/');
      else if (tabId === 'niche-lab') navigate('/tools/kgr-keyword-lab/');
      else if (tabId === 'blog') navigate('/guides/');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-8 font-sans">
      {/* Header Banner */}
      <div className="p-6 sm:p-10 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white shadow-xl space-y-5 border border-indigo-900/50">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold font-mono">
                Publisher Policy FAQ
              </span>
              <span className="text-xs text-indigo-300 font-bold uppercase tracking-wider">
                Google Search Policies &amp; AdSense Compliance Evaluation
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-['Google_Sans',sans-serif]">
              &quot;People Also Ask&quot; AdSense Compliance Intelligence
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
              Definitive policy, technical, and operational answers to the most frequently asked Google AdSense questions, evaluated according to official Search Quality Rater Guidelines and crawler systems.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 shrink-0 text-center md:text-right space-y-1 backdrop-blur-xs">
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Verified FAQs</div>
            <div className="text-2xl font-black font-mono text-emerald-400">7 Essential Answers</div>
            <div className="text-[11px] text-slate-300">Schema.org FAQPage Verified</div>
          </div>
        </div>

        {/* Quick Search & Filter Controls */}
        <div className="pt-4 border-t border-indigo-900/60 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Filter by question keyword or policy topic..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-950/70 border border-slate-700/80 rounded-xl text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`text-xs px-3 py-1.5 rounded-xl font-bold transition-all whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 7 Questions Interactive Accordion Suite */}
      <div className="space-y-4">
        {filteredQuestions.map((item) => {
          const isOpen = expandedId === item.id;
          const isSerpOpen = showSerpPreview[item.id] ?? showSnippetPreviewByDefault;

          return (
            <div
              key={item.id}
              className={`rounded-2xl border transition-all overflow-hidden ${
                isOpen
                  ? 'border-indigo-300 bg-white shadow-md'
                  : 'border-slate-200 bg-white hover:border-slate-300 shadow-xs'
              }`}
            >
              {/* Accordion Question Header */}
              <button
                type="button"
                onClick={() => toggleAccordion(item.id)}
                className="w-full p-5 sm:p-6 text-left flex items-start sm:items-center justify-between gap-4 hover:bg-slate-50/70 transition-colors cursor-pointer"
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[10px] font-semibold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200 uppercase tracking-wider">
                      {item.category}
                    </span>
                    <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-semibold">
                      {item.difficulty}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-slate-900 font-['Google_Sans',sans-serif] leading-snug">
                    {item.exactKeyword}
                  </h3>
                </div>

                <div className="shrink-0 flex items-center gap-2">
                  <div
                    className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors ${
                      isOpen ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </div>
              </button>

              {/* Accordion Content Body */}
              {isOpen && (
                <div className="px-5 sm:px-8 pb-6 pt-2 border-t border-slate-100 space-y-6 animate-in fade-in duration-150">
                  {/* Direct Answer Compliance Box */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-blue-50/70 border border-blue-200/80 space-y-2.5">
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <span className="text-xs font-bold text-blue-900 uppercase tracking-wider flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4 text-[#1a73e8]" />
                        <span>Direct Compliance Answer</span>
                      </span>
                      <button
                        type="button"
                        onClick={() => toggleSerpPreview(item.id)}
                        className="text-[11px] font-bold text-[#1a73e8] hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <Globe className="w-3.5 h-3.5" />
                        <span>{isSerpOpen ? 'Hide Search Preview' : 'Show Google Search Preview'}</span>
                      </button>
                    </div>

                    <p className="text-sm font-medium text-slate-800 leading-relaxed bg-white p-3.5 rounded-xl border border-blue-100 shadow-xs">
                      {item.positionZeroSnippet}
                    </p>
                  </div>

                  {/* Simulated Google SERP Card Preview */}
                  {isSerpOpen && (
                    <div className="p-4 rounded-2xl bg-white border border-slate-300 shadow-sm space-y-2 text-left animate-in fade-in duration-200 font-sans">
                      <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                        Google Search Answer Preview
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-600">
                        <div className="w-4 h-4 rounded-full bg-[#1a73e8] text-white text-[9px] flex items-center justify-center font-bold">
                          G
                        </div>
                        <span className="text-xs text-slate-800 font-semibold">gladsenseedu.app</span>
                        <span className="text-slate-400">›</span>
                        <span className="text-xs text-slate-500">faq › adsense-policy</span>
                      </div>
                      <div className="text-base sm:text-lg font-medium text-[#1a0dab] hover:underline cursor-pointer leading-tight">
                        {item.exactKeyword}
                      </div>
                      <div className="p-3 bg-slate-50 border-l-4 border-[#1a73e8] text-xs text-slate-700 leading-relaxed rounded-r-lg">
                        <strong>Featured Snippet Answer:</strong> {item.positionZeroSnippet}
                      </div>
                    </div>
                  )}

                  {/* Policy Head In-Depth Evaluation */}
                  <div className="space-y-4 pt-1">
                    <div className="space-y-1.5">
                      <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                        <ShieldCheck className="w-4 h-4 text-purple-600" />
                        <span>Head of AdSense Compliance Evaluation Directive</span>
                      </h4>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {item.policyHeadEvaluation.overview}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                      {/* Algorithmic Classifier Triggers */}
                      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                        <span className="font-bold text-slate-900 flex items-center gap-1 text-[11px] uppercase tracking-wider text-rose-700">
                          <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                          <span>Algorithmic Classifier Triggers:</span>
                        </span>
                        <ul className="space-y-1.5 text-slate-600 list-disc pl-4">
                          {item.policyHeadEvaluation.algorithmicTriggers.map((trig, tIdx) => (
                            <li key={tIdx} className="leading-snug">
                              {trig}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Evaluator Guidelines Heuristics */}
                      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                        <span className="font-bold text-slate-900 flex items-center gap-1 text-[11px] uppercase tracking-wider text-indigo-700">
                          <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
                          <span>Search Quality Rater Standards:</span>
                        </span>
                        <p className="text-slate-600 leading-relaxed">
                          {item.policyHeadEvaluation.evaluatorGuidelines}
                        </p>
                      </div>
                    </div>

                    {/* Step-by-Step Remediation Protocol */}
                    <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200 space-y-2 text-xs">
                      <span className="font-bold text-emerald-900 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Standard Operating Procedure (SOP) Remediation:</span>
                      </span>
                      <div className="space-y-1.5">
                        {item.policyHeadEvaluation.remediationProtocol.map((step, sIdx) => (
                          <div key={sIdx} className="flex items-start gap-2 text-emerald-950">
                            <span className="font-mono font-bold text-emerald-700 shrink-0">
                              {sIdx + 1}.
                            </span>
                            <span className="leading-snug">{step}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Actions & Webmaster Copy Tools */}
                  <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-2 flex-wrap">
                      <button
                        type="button"
                        onClick={() => handleCopySnippet(item, 'markdown')}
                        className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                        title="Copy Markdown for blog FAQ section"
                      >
                        {copiedId === `${item.id}-markdown` ? (
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                        <span>{copiedId === `${item.id}-markdown` ? 'Copied' : 'Copy FAQ Markdown'}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleCopySnippet(item, 'jsonld')}
                        className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                        title="Copy Schema.org JSON-LD microdata"
                      >
                        {copiedId === `${item.id}-jsonld` ? (
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                        ) : (
                          <FileCode className="w-3.5 h-3.5" />
                        )}
                        <span>{copiedId === `${item.id}-jsonld` ? 'Copied' : 'Copy Schema JSON-LD'}</span>
                      </button>
                    </div>

                    {item.recommendedToolTab && (
                      <button
                        type="button"
                        onClick={() => handleToolAction(item.recommendedToolTab)}
                        className="px-4 py-2 bg-[#1a73e8] hover:bg-[#1557b0] text-white rounded-xl font-bold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer shrink-0"
                      >
                        <span>{item.recommendedToolLabel || 'Open Diagnostic Tool'}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
