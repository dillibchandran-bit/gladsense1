import React, { useState } from 'react';
import {
  FileText,
  Search,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  Bot,
  Users,
  ShieldCheck,
  Cpu,
  Layers,
  Link2,
  Image as ImageIcon,
  Flame,
  ArrowRight,
  TrendingUp,
  HelpCircle,
  RotateCcw,
  Check,
  Copy,
} from 'lucide-react';

interface PrePublishItem {
  id: string;
  step: 1 | 2 | 3;
  stepName: string;
  title: string;
  description: string;
  standard: string;
  isChecked: boolean;
}

export const ContentDevelopmentSop: React.FC = () => {
  // Pre-Publishing Checklist State
  const [checklist, setChecklist] = useState<PrePublishItem[]>([
    // Step 1: Research & Search Intent
    {
      id: 'define-intent',
      step: 1,
      stepName: 'Step 1: Research & Search Intent',
      title: 'Define Intent',
      description: 'Content directly addresses the specific user intent (Informational, Transactional, Navigational).',
      standard: 'Every heading and section maps to the intent archetype without padding.',
      isChecked: false,
    },
    {
      id: 'target-keywords',
      step: 1,
      stepName: 'Step 1: Research & Search Intent',
      title: 'Target Keywords',
      description: 'Primary focus is on specific, lower-competition long-tail keywords (KGR <= 0.25).',
      standard: 'Zero reliance on ultra-competitive short-tail terms dominated by DA90 domains.',
      isChecked: false,
    },
    {
      id: 'topical-clusters',
      step: 1,
      stepName: 'Step 1: Research & Search Intent',
      title: 'Topical Clusters',
      description: 'Page links to and from a defined core topic hub on our website.',
      standard: 'Establishes site-wide topical authority with reciprocal pillar page linking.',
      isChecked: false,
    },

    // Step 2: Content Writing & Formatting
    {
      id: 'heading-hierarchy',
      step: 2,
      stepName: 'Step 2: Content Writing & Formatting',
      title: 'Heading Hierarchy',
      description: 'Includes exactly one <h1> and logically organized <h2> / <h3> tags.',
      standard: 'No skipped heading levels (e.g. h1 directly to h3) and zero duplicate H1 tags.',
      isChecked: false,
    },
    {
      id: 'featured-snippet',
      step: 2,
      stepName: 'Step 2: Content Writing & Formatting',
      title: 'Featured Snippet Block',
      description: 'Includes a 40–60 word direct summary immediately following key subheadings.',
      standard: 'Formatted as direct answer, numbered list, or definition block for Google Position 0.',
      isChecked: false,
    },
    {
      id: 'scannability',
      step: 2,
      stepName: 'Step 2: Content Writing & Formatting',
      title: 'Scannability & Layout',
      description: 'Uses short paragraphs (2–4 sentences), bullet lists, comparison tables, and bold highlights.',
      standard: 'No walls of text. Dwell time is enhanced through visual breaks and clear typography.',
      isChecked: false,
    },

    // Step 3: On-Page SEO & Metadata
    {
      id: 'title-description',
      step: 3,
      stepName: 'Step 3: On-Page SEO & Metadata',
      title: 'Title & Meta Description',
      description: 'Title tag < 60 characters; Meta description < 155 characters containing primary keyword.',
      standard: 'Avoids truncation in SERP snippets while preserving high click-through intent.',
      isChecked: false,
    },
    {
      id: 'internal-links',
      step: 3,
      stepName: 'Step 3: On-Page SEO & Metadata',
      title: 'Internal Links',
      description: 'Minimum 3–5 contextual links to existing articles or utility tools on the domain.',
      standard: 'Descriptive, keyword-rich anchor text (no "click here" or generic phrases).',
      isChecked: false,
    },
    {
      id: 'media-optimization',
      step: 3,
      stepName: 'Step 3: On-Page SEO & Metadata',
      title: 'Media Optimization',
      description: 'All images have descriptive file names (e.g. epoxy-pour-calculator.webp) and descriptive alt text.',
      standard: 'Next-gen image formats (WebP/AVIF) with width/height attributes for zero CLS.',
      isChecked: false,
    },
  ]);

  // Interactive Live Content Tester Helpers
  const [testTitle, setTestTitle] = useState('');
  const [testMetaDesc, setTestMetaDesc] = useState('');
  const [testSnippet, setTestSnippet] = useState('');
  const [copiedSnippet, setCopiedSnippet] = useState(false);

  const toggleChecklist = (id: string) => {
    setChecklist((prev) =>
      prev.map((item) => (item.id === id ? { ...item, isChecked: !item.isChecked } : item))
    );
  };

  const completedCount = checklist.filter((i) => i.isChecked).length;
  const progressPercent = Math.round((completedCount / checklist.length) * 100);

  const resetChecklist = () => {
    setChecklist((prev) => prev.map((item) => ({ ...item, isChecked: false })));
  };

  // Word counter for snippet block
  const snippetWordCount = testSnippet.trim() ? testSnippet.trim().split(/\s+/).length : 0;
  const isSnippetOptimal = snippetWordCount >= 40 && snippetWordCount <= 60;

  return (
    <div className="space-y-8">
      {/* SOP Header */}
      <div className="p-6 rounded-2xl bg-white border border-[#dadce0] shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-[#e8f0fe] text-[#1a73e8]">
                Content Development SOP v2.0
              </span>
              <span className="text-xs text-[#5f6368]">• Google Ranking & SEO Quality Standard</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-[#202124] tracking-tight font-['Google_Sans',sans-serif]">
              Content Quality & Search Intent Operating Standard
            </h1>
            <p className="text-xs sm:text-sm text-[#5f6368] mt-1 max-w-3xl leading-relaxed">
              Standard operating procedures for writers, editors, and engineers to build content and web app pages that achieve top-tier Google search visibility.
            </p>
          </div>

          <div className="bg-[#f8f9fa] border border-[#dadce0] rounded-xl p-3 flex items-center gap-3 shrink-0">
            <div className="text-right">
              <div className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold">Pre-Publishing Pass</div>
              <div className="text-lg font-bold font-mono text-[#1a73e8]">{progressPercent}% Ready</div>
            </div>
            <div className="w-12 h-12 rounded-full border-4 border-slate-200 border-t-[#1a73e8] flex items-center justify-center font-bold text-xs">
              {completedCount}/{checklist.length}
            </div>
          </div>
        </div>
      </div>

      {/* 1. Context: How Google Ranks Content */}
      <div className="p-6 rounded-2xl bg-white border border-[#dadce0] shadow-xs space-y-5">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h2 className="text-base font-bold text-[#202124] flex items-center gap-2 font-['Google_Sans',sans-serif]">
              <Cpu className="w-4 h-4 text-[#1a73e8]" />
              <span>1. Context: How Google Ranks Content</span>
            </h2>
            <p className="text-xs text-[#5f6368] mt-0.5">
              Four interacting systems that determine search visibility and indexation.
            </p>
          </div>
          <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
            Dual Bot + Human Pipeline
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl border border-blue-200 bg-blue-50/40 space-y-2">
            <div className="flex items-center gap-2 text-[#1a73e8] font-bold text-xs uppercase tracking-wider">
              <Bot className="w-4 h-4 shrink-0" />
              <span>Automated Crawlers</span>
            </div>
            <h3 className="font-semibold text-sm text-slate-900">Googlebot</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Scans, renders, and stores website DOM structures. Pages must be technically clean, lightweight, and semantically accessible.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-purple-200 bg-purple-50/40 space-y-2">
            <div className="flex items-center gap-2 text-purple-700 font-bold text-xs uppercase tracking-wider">
              <Layers className="w-4 h-4 shrink-0" />
              <span>Core Algorithms</span>
            </div>
            <h3 className="font-semibold text-sm text-slate-900">RankBrain & Helpful Content</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Evaluates hundreds of real-time signals: dwell time, search query fulfillment, spam detection (SpamBrain), and original value-add.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/40 space-y-2">
            <div className="flex items-center gap-2 text-amber-800 font-bold text-xs uppercase tracking-wider">
              <Users className="w-4 h-4 shrink-0" />
              <span>Human Evaluators</span>
            </div>
            <h3 className="font-semibold text-sm text-slate-900">Quality Raters (10,000+)</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Sample live search results and score pages against the official Quality Rater Guidelines to measure real human helpfulness and E-E-A-T.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/40 space-y-2">
            <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs uppercase tracking-wider">
              <TrendingUp className="w-4 h-4 shrink-0" />
              <span>Search Engineers</span>
            </div>
            <h3 className="font-semibold text-sm text-slate-900">Algorithm Updates</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Developers continuously refine core ranking algorithms based on quality rater data to reward comprehensive, authoritative pages.
            </p>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 flex items-center gap-2 font-medium">
          <span className="w-2 h-2 rounded-full bg-[#1a73e8] shrink-0" />
          <span>
            <strong>Core Takeaway:</strong> We do not optimize to trick a single algorithm or human reviewer; we build content to satisfy automated ranking criteria while adhering to high quality standards.
          </span>
        </div>
      </div>

      {/* 2. Core Execution Principles: E-E-A-T */}
      <div className="p-6 rounded-2xl bg-white border border-[#dadce0] shadow-xs space-y-5">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h2 className="text-base font-bold text-[#202124] flex items-center gap-2 font-['Google_Sans',sans-serif]">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>2. Core Execution Principles: E-E-A-T</span>
            </h2>
            <p className="text-xs text-[#5f6368] mt-0.5">
              Google Search Quality Evaluator Guidelines compliance standards.
            </p>
          </div>
          <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md">
            Mandatory Standards
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/80 text-slate-700">
                <th className="py-2.5 px-3.5 font-bold uppercase tracking-wider w-36">Dimension</th>
                <th className="py-2.5 px-3.5 font-bold uppercase tracking-wider w-48">Core Meaning</th>
                <th className="py-2.5 px-3.5 font-bold uppercase tracking-wider">Operational Requirement</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-800">
              <tr className="hover:bg-slate-50/60">
                <td className="py-3 px-3.5 font-bold text-[#1a73e8]">Experience</td>
                <td className="py-3 px-3.5 font-medium text-slate-600">First-hand knowledge</td>
                <td className="py-3 px-3.5">
                  Include original photos, hands-on tests, custom data, or case studies. Avoid rehashing top search results.
                </td>
              </tr>
              <tr className="hover:bg-slate-50/60">
                <td className="py-3 px-3.5 font-bold text-purple-700">Expertise</td>
                <td className="py-3 px-3.5 font-medium text-slate-600">Domain depth & skill</td>
                <td className="py-3 px-3.5">
                  Ensure topics are written or reviewed by qualified specialists. Use accurate industry terminology and validated formulas.
                </td>
              </tr>
              <tr className="hover:bg-slate-50/60">
                <td className="py-3 px-3.5 font-bold text-amber-700">Authoritativeness</td>
                <td className="py-3 px-3.5 font-medium text-slate-600">Recognized credibility</td>
                <td className="py-3 px-3.5">
                  Cite reputable primary sources (research papers, official documents, engineering standards) and attach clear author bios.
                </td>
              </tr>
              <tr className="hover:bg-slate-50/60">
                <td className="py-3 px-3.5 font-bold text-emerald-700">Trustworthiness</td>
                <td className="py-3 px-3.5 font-medium text-slate-600">Accuracy & safety</td>
                <td className="py-3 px-3.5">
                  Ensure high factual accuracy, transparent publisher information, and accurate site policies (Privacy, Terms, Contact).
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 3. Interactive Pre-Publishing Checklist */}
      <div className="p-6 rounded-2xl bg-white border border-[#dadce0] shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-base font-bold text-[#202124] flex items-center gap-2 font-['Google_Sans',sans-serif]">
              <CheckCircle2 className="w-4 h-4 text-[#1a73e8]" />
              <span>3. Interactive Pre-Publishing Checklist</span>
            </h2>
            <p className="text-xs text-[#5f6368] mt-0.5">
              Verify every page meets all editorial, structural, and SEO criteria prior to publication.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              onClick={resetChecklist}
              className="text-xs text-slate-600 hover:text-slate-900 px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* Live Dynamic Progress Bar */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs font-semibold">
            <span className="text-slate-700">SOP Readiness Completion</span>
            <span className={progressPercent === 100 ? 'text-emerald-600' : 'text-[#1a73e8]'}>
              {progressPercent}% ({completedCount} of {checklist.length} Verified)
            </span>
          </div>
          <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
            <div
              className={`h-full transition-all duration-300 rounded-full ${
                progressPercent === 100 ? 'bg-emerald-500' : 'bg-[#1a73e8]'
              }`}
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* 3 Steps Groups */}
        {[1, 2, 3].map((stepNumber) => {
          const stepItems = checklist.filter((i) => i.step === stepNumber);
          const stepName = stepItems[0]?.stepName;
          const stepPassed = stepItems.every((i) => i.isChecked);

          return (
            <div key={stepNumber} className="space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 pb-1.5">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2">
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                    stepPassed ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-[#1a73e8]'
                  }`}>
                    {stepNumber}
                  </span>
                  <span>{stepName}</span>
                </h3>
                {stepPassed && (
                  <span className="text-[11px] font-bold text-emerald-600 flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> Step Passed
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {stepItems.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => toggleChecklist(item.id)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between select-none ${
                      item.isChecked
                        ? 'bg-emerald-50/50 border-emerald-300 shadow-2xs'
                        : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/50'
                    }`}
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <span className="text-xs font-bold text-slate-900">{item.title}</span>
                        <input
                          type="checkbox"
                          checked={item.isChecked}
                          onChange={() => {}}
                          className="w-4 h-4 rounded text-[#1a73e8] focus:ring-0 mt-0.5 cursor-pointer shrink-0"
                        />
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed mb-3">
                        {item.description}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-500 font-medium">
                      <span className="text-slate-700 font-bold">Standard: </span>
                      {item.standard}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Helper: Featured Snippet & Meta Tag Simulator */}
      <div className="p-6 rounded-2xl bg-white border border-[#dadce0] shadow-xs space-y-5">
        <div className="border-b border-slate-100 pb-3">
          <h2 className="text-base font-bold text-[#202124] flex items-center gap-2 font-['Google_Sans',sans-serif]">
            <Sparkles className="w-4 h-4 text-purple-600" />
            <span>Interactive On-Page Quality Tools</span>
          </h2>
          <p className="text-xs text-[#5f6368] mt-0.5">
            Test your Title length, Meta Description, and 40–60 word Featured Snippet block in real time.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Featured Snippet Block Validator */}
          <div className="p-4 rounded-xl bg-purple-50/40 border border-purple-200 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-purple-900">
                Featured Snippet Block (40–60 words)
              </label>
              <span
                className={`text-[11px] font-bold px-2 py-0.5 rounded-md ${
                  isSnippetOptimal
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-purple-100 text-purple-800'
                }`}
              >
                {snippetWordCount} words {isSnippetOptimal ? '✓ Optimal' : '(Aim for 40-60)'}
              </span>
            </div>
            <textarea
              rows={3}
              value={testSnippet}
              onChange={(e) => setTestSnippet(e.target.value)}
              placeholder="Paste your direct definition or answer block immediately below your primary H2 tag..."
              className="w-full p-3 rounded-lg border border-purple-200 bg-white text-xs text-slate-900 focus:outline-none focus:border-purple-500"
            />
            <p className="text-[11px] text-purple-800 leading-normal">
              <strong>SOP Requirement:</strong> Place a 40–60 word direct summary immediately following key subheadings to maximize Google Position 0 snippet captures.
            </p>
          </div>

          {/* SERP Title & Description Length Checker */}
          <div className="p-4 rounded-xl bg-blue-50/40 border border-blue-200 space-y-3">
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <label className="font-bold text-blue-950">Title Tag (&lt; 60 chars)</label>
                <span className={testTitle.length > 60 ? 'text-rose-600 font-bold' : 'text-slate-500'}>
                  {testTitle.length} / 60
                </span>
              </div>
              <input
                type="text"
                value={testTitle}
                onChange={(e) => setTestTitle(e.target.value)}
                placeholder="e.g. Epoxy Resin Volume Calculator | Free Mixing Ratio Estimator"
                className="w-full px-3 py-1.5 rounded-lg border border-blue-200 bg-white text-xs text-slate-900 focus:outline-none focus:border-[#1a73e8]"
              />
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <label className="font-bold text-blue-950">Meta Description (&lt; 155 chars)</label>
                <span className={testMetaDesc.length > 155 ? 'text-rose-600 font-bold' : 'text-slate-500'}>
                  {testMetaDesc.length} / 155
                </span>
              </div>
              <input
                type="text"
                value={testMetaDesc}
                onChange={(e) => setTestMetaDesc(e.target.value)}
                placeholder="e.g. Calculate exact epoxy resin volume, weight, and mixing ratios for river tables..."
                className="w-full px-3 py-1.5 rounded-lg border border-blue-200 bg-white text-xs text-slate-900 focus:outline-none focus:border-[#1a73e8]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 4. Strictly Prohibited Practices (Penalty Risks) */}
      <div className="p-6 rounded-2xl bg-white border border-rose-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-rose-100 pb-3">
          <div>
            <h2 className="text-base font-bold text-rose-900 flex items-center gap-2 font-['Google_Sans',sans-serif]">
              <AlertTriangle className="w-4 h-4 text-rose-600" />
              <span>4. Strictly Prohibited Practices (Penalty Risks)</span>
            </h2>
            <p className="text-xs text-rose-700 mt-0.5">
              The following tactics trigger algorithmic penalties or manual actions. They are strictly prohibited across all publication channels:
            </p>
          </div>
          <span className="text-[11px] font-bold text-rose-700 bg-rose-50 border border-rose-200 px-2.5 py-0.5 rounded-md">
            Zero-Tolerance
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl border border-rose-200 bg-rose-50/50 space-y-1.5">
            <div className="font-bold text-xs text-rose-900 uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-rose-500" />
              <span>Unedited AI Content</span>
            </div>
            <p className="text-xs text-rose-800">
              Low-value, unedited, or raw AI outputs designed purely to pad word counts without original insights, testing, or human editorial review.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-rose-200 bg-rose-50/50 space-y-1.5">
            <div className="font-bold text-xs text-rose-900 uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-rose-500" />
              <span>Keyword Stuffing</span>
            </div>
            <p className="text-xs text-rose-800">
              Unnatural, repetitive query insertion that harms readability or mimics robotic spamming patterns.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-rose-200 bg-rose-50/50 space-y-1.5">
            <div className="font-bold text-xs text-rose-900 uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-rose-500" />
              <span>Clickbait Headlines</span>
            </div>
            <p className="text-xs text-rose-800">
              Titles that exaggerate or misrepresent content to trick users, triggering high bounce rates and Helpful Content demotions.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-rose-200 bg-rose-50/50 space-y-1.5">
            <div className="font-bold text-xs text-rose-900 uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-rose-500" />
              <span>Scraped Summaries</span>
            </div>
            <p className="text-xs text-rose-800">
              Aggregating or spinning information from competitor search results without original mathematical models, expert tests, or primary visuals.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
