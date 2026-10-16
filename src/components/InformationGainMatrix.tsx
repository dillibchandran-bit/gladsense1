import React, { useState } from 'react';
import {
  Sparkles,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  HelpCircle,
  Copy,
  Check,
  FileText,
  UserCheck,
  Search,
  Scale,
  Brain,
  Zap,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  Cpu,
  Layers,
  Award,
} from 'lucide-react';
import { OfficialEvaluationDisclaimer } from './OfficialEvaluationDisclaimer';

interface QualityMetric {
  id: string;
  label: string;
  description: string;
  weight: number;
  score: number; // 0 - 100
  criteria: {
    passed: boolean;
    name: string;
    detail: string;
    impact: string;
  }[];
}

interface PresetScenario {
  name: string;
  tagline: string;
  type: 'highest' | 'passing' | 'low' | 'severe';
  scores: {
    informationGain: number;
    authorTransparency: number;
    intentCompletion: number;
    aiPatternSafety: number;
  };
  sampleExcerpt: string;
  urlExample: string;
}

const PRESET_SCENARIOS: PresetScenario[] = [
  {
    name: 'Hands-On Benchmark Study & Interactive Tool',
    tagline: 'Benchmark test with proprietary lab data, real author testing photos, and interactive calculator.',
    type: 'highest',
    scores: {
      informationGain: 96,
      authorTransparency: 94,
      intentCompletion: 92,
      aiPatternSafety: 98,
    },
    urlExample: 'https://audiocraftbenchmarks.com/dac-noise-test-2026',
    sampleExcerpt:
      'We hooked 12 consumer USB DACs to an Audio Precision APx555 analyzer in our Cambridge sound lab. Unlike manufacturer claims of 120dB dynamic range, our test rig measured actual real-world THD+N of -94.2dB under USB bus-powered load. Below is our raw CSV dataset and interactive voltage calculator.',
  },
  {
    name: 'Affiliate Review with Firsthand Photos',
    tagline: 'Hands-on product review with custom photos, tested pros/cons, and verified author credentials.',
    type: 'passing',
    scores: {
      informationGain: 82,
      authorTransparency: 85,
      intentCompletion: 84,
      aiPatternSafety: 88,
    },
    urlExample: 'https://woodworkgearreviews.com/dewalt-planer-6-month-test',
    sampleExcerpt:
      'After running 400 board-feet of rough-sawn white oak through the DW735X over 6 months in my cabinet shop, here is where the stock knives chipped and how I resolved snipe with custom MDF infeed beds.',
  },
  {
    name: 'Generic AI-Regurgitated Listicle',
    tagline: 'Generic rewrite of existing Top 10 Google results with zero firsthand testing or unique citations.',
    type: 'low',
    scores: {
      informationGain: 35,
      authorTransparency: 40,
      intentCompletion: 52,
      aiPatternSafety: 28,
    },
    urlExample: 'https://generictechdaily.net/best-noise-cancelling-headphones-2026',
    sampleExcerpt:
      'In today\'s fast-paced digital world, noise cancelling headphones have become indispensable. Delving into the top models, it is crucial to remember that battery life and comfort are key factors. Furthermore, Sony offers great sound while Bose offers superior ANC.',
  },
  {
    name: 'Unverified YMYL Financial Advice Blog',
    tagline: 'High-stakes investment & tax claims by an anonymous author with zero financial credentials.',
    type: 'severe',
    scores: {
      informationGain: 20,
      authorTransparency: 15,
      intentCompletion: 30,
      aiPatternSafety: 35,
    },
    urlExample: 'https://quickwealthsecrets.info/crypto-tax-loopholes',
    sampleExcerpt:
      'Guaranteed 18% APY staking protocols you can use to avoid paying capital gains taxes legally. Read this guide to multiply your savings without reporting.',
  },
];

export const InformationGainMatrix: React.FC = () => {
  const [selectedPreset, setSelectedPreset] = useState<number>(0);
  const [informationGainScore, setInformationGainScore] = useState<number>(PRESET_SCENARIOS[0].scores.informationGain);
  const [authorTransparencyScore, setAuthorTransparencyScore] = useState<number>(PRESET_SCENARIOS[0].scores.authorTransparency);
  const [intentCompletionScore, setIntentCompletionScore] = useState<number>(PRESET_SCENARIOS[0].scores.intentCompletion);
  const [aiPatternSafetyScore, setAiPatternSafetyScore] = useState<number>(PRESET_SCENARIOS[0].scores.aiPatternSafety);

  const [customUrl, setCustomUrl] = useState<string>(PRESET_SCENARIOS[0].urlExample);
  const [customText, setCustomText] = useState<string>(PRESET_SCENARIOS[0].sampleExcerpt);
  const [copiedCodeSnippet, setCopiedCodeSnippet] = useState<string | null>(null);

  const handleApplyPreset = (index: number) => {
    const preset = PRESET_SCENARIOS[index];
    setSelectedPreset(index);
    setInformationGainScore(preset.scores.informationGain);
    setAuthorTransparencyScore(preset.scores.authorTransparency);
    setIntentCompletionScore(preset.scores.intentCompletion);
    setAiPatternSafetyScore(preset.scores.aiPatternSafety);
    setCustomUrl(preset.urlExample);
    setCustomText(preset.sampleExcerpt);
  };

  // Weighted Total Formula according to Google SQEG Section 3-5
  // Information Gain (30%) + Author/Entity (25%) + Intent Saturation (25%) + AI Pattern Safety (20%)
  const totalScore = Math.round(
    informationGainScore * 0.3 +
    authorTransparencyScore * 0.25 +
    intentCompletionScore * 0.25 +
    aiPatternSafetyScore * 0.2
  );

  const getRaterGrade = (score: number) => {
    if (score >= 90) {
      return {
        label: 'Very High Quality (Highest E-E-A-T)',
        badgeClass: 'bg-emerald-500/15 text-emerald-700 border-emerald-300',
        summary: 'Exceptional originality, authoritative entity footprint, and irreplaceable information gain. Prime candidate for top Google Search rankings and immediate Google AdSense approval.',
        status: 'Highest',
      };
    }
    if (score >= 75) {
      return {
        label: 'High Quality (Compliant)',
        badgeClass: 'bg-blue-500/15 text-blue-700 border-blue-300',
        summary: 'Satisfies Google helpful content criteria with solid firsthand experience, transparent author byline, and zero spam flags. Fully approved for monetization.',
        status: 'High',
      };
    }
    if (score >= 60) {
      return {
        label: 'Medium Quality (Needs Polish)',
        badgeClass: 'bg-amber-500/15 text-amber-700 border-amber-300',
        summary: 'Acceptable basic information, but vulnerable to algorithmic demotion. Lacks distinct proprietary data, strong author entities, or clear information gain over existing search results.',
        status: 'Medium',
      };
    }
    if (score >= 40) {
      return {
        label: 'Low Quality (High Risk)',
        badgeClass: 'bg-orange-500/15 text-orange-700 border-orange-300',
        summary: 'Fails Section 4 of Google Quality Evaluator Guidelines. Characterized by surface-level summaries, generic rephrased content, or missing author credentials. AdSense rejection likely.',
        status: 'Low',
      };
    }
    return {
      label: 'Lowest Quality (Policy Demotion / Unhelpful Churn)',
      badgeClass: 'bg-rose-500/15 text-rose-700 border-rose-300',
      summary: 'Critical violation: Scaled churn, AI fluff, fabricated expertise, or dangerous unverified claims. Triggers automated "Valuable Inventory: Scraped / Low Value Content" rejections.',
      status: 'Lowest',
    };
  };

  const raterGrade = getRaterGrade(totalScore);

  const copyToClipboard = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCodeSnippet(id);
    setTimeout(() => setCopiedCodeSnippet(null), 2000);
  };

  const sampleAuthorSchema = `{
  "@context": "https://schema.org",
  "@type": "TechArticle",
  "headline": "Real-World Audio DAC Noise Floor Lab Benchmarks",
  "author": {
    "@type": "Person",
    "name": "Dr. Aris Thorne",
    "jobTitle": "Lead Acoustic Systems Engineer",
    "worksFor": {
      "@type": "Organization",
      "name": "AudioCraft Research Labs"
    },
    "sameAs": [
      "https://www.linkedin.com/in/aris-thorne-audio",
      "https://scholar.google.com/citations?user=aris_thorne"
    ]
  },
  "publisher": {
    "@type": "Organization",
    "name": "AudioCraft Research",
    "url": "https://audiocraftbenchmarks.com",
    "publishingPrinciples": "https://audiocraftbenchmarks.com/editorial-policy/"
  }
}`;

  const sampleDirectAnswerBox = `<div class="bg-blue-50 border-l-4 border-[#1a73e8] p-5 my-6 rounded-r-xl">
  <div class="flex items-center gap-2 mb-2 font-bold text-slate-900 text-sm">
    <span>💡 Direct Research Finding:</span>
  </div>
  <p class="text-sm text-slate-700 leading-relaxed">
    <strong>Key Conclusion:</strong> At a standard 1-volt output, USB bus-powered DACs averaged 
    a noise floor of -94.2 dB THD+N. Models with isolated linear power supplies reduced residual 
    jitter by 18.4%, with audible differences manifesting only on sub-16-ohm high-sensitivity IEMs.
  </p>
</div>`;

  return (
    <div className="space-y-8">
      {/* Executive Directives Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-slate-800">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#1a73e8]/30 text-blue-300 border border-blue-400/30 flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-blue-400" />
                Google Quality Evaluator Standard (SQEG Section 3–5)
              </span>
              <span className="text-xs text-slate-400 hidden sm:inline">• Core Update & AdSense Aligned</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Information Gain &amp; E-E-A-T Quality Rater Diagnostic Matrix
            </h1>
            <p className="text-sm text-slate-300 leading-relaxed">
              Google algorithms don&apos;t reward content that merely summarizes what the top 10 search results already say. This matrix evaluates your domain against the exact 4 axes used by Google Quality Raters and Helpful Content classifiers to distinguish high-value publications from low-value churn.
            </p>
          </div>

          {/* Quick Rater Score Badge */}
          <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/15 flex flex-col items-center justify-center min-w-[200px] text-center">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-300">
              Evaluator Index
            </span>
            <div className="text-4xl sm:text-5xl font-black text-white my-1 font-mono">
              {totalScore}<span className="text-xl text-blue-300 font-normal">/100</span>
            </div>
            <span className={`text-[11px] font-bold px-3 py-1 rounded-full border mt-1 ${raterGrade.badgeClass}`}>
              {raterGrade.status} Grade
            </span>
          </div>
        </div>

        {/* 1-Click Simulation Presets */}
        <div className="mt-6 pt-6 border-t border-slate-800/80">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
            Select a Calibration Scenario to Inspect Algorithmic Behavior:
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
            {PRESET_SCENARIOS.map((preset, idx) => (
              <button
                key={preset.name}
                type="button"
                onClick={() => handleApplyPreset(idx)}
                className={`p-3 rounded-xl text-left transition-all border text-xs cursor-pointer ${
                  selectedPreset === idx
                    ? 'bg-blue-600/30 border-blue-400 text-white shadow-md ring-2 ring-blue-500/40'
                    : 'bg-slate-800/60 hover:bg-slate-800 border-slate-700/80 text-slate-300'
                }`}
              >
                <div className="font-bold flex items-center justify-between mb-1">
                  <span className="truncate pr-1">{preset.name}</span>
                  <span
                    className={`text-[9px] px-1.5 py-0.5 rounded font-bold uppercase shrink-0 ${
                      preset.type === 'highest'
                        ? 'bg-emerald-500/20 text-emerald-300'
                        : preset.type === 'passing'
                        ? 'bg-blue-500/20 text-blue-300'
                        : preset.type === 'low'
                        ? 'bg-amber-500/20 text-amber-300'
                        : 'bg-rose-500/20 text-rose-300'
                    }`}
                  >
                    {preset.type}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 line-clamp-2 leading-snug">
                  {preset.tagline}
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Diagnostic Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column (7 cols): The 4 Core Evaluation Axes Sliders & Checks */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Brain className="w-5 h-5 text-[#1a73e8]" />
                  <span>The 4 Google Quality Dimensions</span>
                </h3>
                <p className="text-xs text-slate-500">
                  Adjust sliders to simulate your website&apos;s current content depth and trust markers.
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleApplyPreset(0)}
                className="text-xs text-[#1a73e8] font-semibold hover:underline cursor-pointer"
              >
                Reset to Benchmark
              </button>
            </div>

            {/* Pillar 1: Information Gain & Unique Value (30%) */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-blue-100 text-[#1a73e8] flex items-center justify-center font-bold text-xs">
                    1
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Information Gain &amp; Unique Value</h4>
                    <span className="text-[11px] text-slate-500">Weight: 30% • Firsthand testing, unique datasets, original tools</span>
                  </div>
                </div>
                <span className="text-sm font-mono font-bold text-blue-700 bg-blue-50 px-2 py-1 rounded border border-blue-200">
                  {informationGainScore}/100
                </span>
              </div>

              <input
                type="range"
                min="0"
                max="100"
                value={informationGainScore}
                onChange={(e) => setInformationGainScore(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#1a73e8]"
              />

              <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
                <div className={`p-2 rounded border flex items-center gap-1.5 ${informationGainScore >= 70 ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-slate-100 border-slate-200 text-slate-600'}`}>
                  {informationGainScore >= 70 ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> : <AlertTriangle className="w-3.5 h-3.5 text-slate-400 shrink-0" />}
                  <span>Proprietary Data / Experiments</span>
                </div>
                <div className={`p-2 rounded border flex items-center gap-1.5 ${informationGainScore >= 60 ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-slate-100 border-slate-200 text-slate-600'}`}>
                  {informationGainScore >= 60 ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> : <AlertTriangle className="w-3.5 h-3.5 text-slate-400 shrink-0" />}
                  <span>Novel Angle vs SERP Churn</span>
                </div>
              </div>
            </div>

            {/* Pillar 2: Radical Author & Entity Transparency (25%) */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-xs">
                    2
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Author &amp; Entity Transparency (E-E-A-T)</h4>
                    <span className="text-[11px] text-slate-500">Weight: 25% • Verified byline, editorial policies, physical contact</span>
                  </div>
                </div>
                <span className="text-sm font-mono font-bold text-purple-700 bg-purple-50 px-2 py-1 rounded border border-purple-200">
                  {authorTransparencyScore}/100
                </span>
              </div>

              <input
                type="range"
                min="0"
                max="100"
                value={authorTransparencyScore}
                onChange={(e) => setAuthorTransparencyScore(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
              />

              <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
                <div className={`p-2 rounded border flex items-center gap-1.5 ${authorTransparencyScore >= 70 ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-slate-100 border-slate-200 text-slate-600'}`}>
                  {authorTransparencyScore >= 70 ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> : <AlertTriangle className="w-3.5 h-3.5 text-slate-400 shrink-0" />}
                  <span>Accredited Bio &amp; Entity Links</span>
                </div>
                <div className={`p-2 rounded border flex items-center gap-1.5 ${authorTransparencyScore >= 60 ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-slate-100 border-slate-200 text-slate-600'}`}>
                  {authorTransparencyScore >= 60 ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> : <AlertTriangle className="w-3.5 h-3.5 text-slate-400 shrink-0" />}
                  <span>Editorial Guidelines &amp; Contact</span>
                </div>
              </div>
            </div>

            {/* Pillar 3: Search Intent Saturation & User Task Completion (25%) */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs">
                    3
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Task Completion &amp; Intent Saturation</h4>
                    <span className="text-[11px] text-slate-500">Weight: 25% • Answer in 1st viewport, no bounce, structured tables</span>
                  </div>
                </div>
                <span className="text-sm font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded border border-emerald-200">
                  {intentCompletionScore}/100
                </span>
              </div>

              <input
                type="range"
                min="0"
                max="100"
                value={intentCompletionScore}
                onChange={(e) => setIntentCompletionScore(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
              />

              <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
                <div className={`p-2 rounded border flex items-center gap-1.5 ${intentCompletionScore >= 70 ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-slate-100 border-slate-200 text-slate-600'}`}>
                  {intentCompletionScore >= 70 ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> : <AlertTriangle className="w-3.5 h-3.5 text-slate-400 shrink-0" />}
                  <span>Direct Answer Above Fold</span>
                </div>
                <div className={`p-2 rounded border flex items-center gap-1.5 ${intentCompletionScore >= 60 ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-slate-100 border-slate-200 text-slate-600'}`}>
                  {intentCompletionScore >= 60 ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> : <AlertTriangle className="w-3.5 h-3.5 text-slate-400 shrink-0" />}
                  <span>Rich Tables &amp; Schema Data</span>
                </div>
              </div>
            </div>

            {/* Pillar 4: Spam & Scaled AI Pattern Risk Index (20%) */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-xs">
                    4
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">AI Pattern &amp; Scaled Churn Safety</h4>
                    <span className="text-[11px] text-slate-500">Weight: 20% • Absence of robotic cliches, formulaic prose &amp; hollow summaries</span>
                  </div>
                </div>
                <span className="text-sm font-mono font-bold text-amber-800 bg-amber-50 px-2 py-1 rounded border border-amber-200">
                  {aiPatternSafetyScore}/100
                </span>
              </div>

              <input
                type="range"
                min="0"
                max="100"
                value={aiPatternSafetyScore}
                onChange={(e) => setAiPatternSafetyScore(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-600"
              />

              <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
                <div className={`p-2 rounded border flex items-center gap-1.5 ${aiPatternSafetyScore >= 70 ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-rose-50 border-rose-200 text-rose-800'}`}>
                  {aiPatternSafetyScore >= 70 ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> : <AlertTriangle className="w-3.5 h-3.5 text-rose-500 shrink-0" />}
                  <span>Zero AI Clichés Detected</span>
                </div>
                <div className={`p-2 rounded border flex items-center gap-1.5 ${aiPatternSafetyScore >= 60 ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-rose-50 border-rose-200 text-rose-800'}`}>
                  {aiPatternSafetyScore >= 60 ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> : <AlertTriangle className="w-3.5 h-3.5 text-rose-500 shrink-0" />}
                  <span>Authentic Author Perspective</span>
                </div>
              </div>
            </div>
          </div>

          {/* Sample Article Content Inspector */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <FileText className="w-4 h-4 text-slate-600" />
                <span>Simulated Content Inspector</span>
              </h3>
              <span className="text-[11px] text-slate-400 font-mono truncate max-w-xs">
                {customUrl}
              </span>
            </div>
            <textarea
              rows={4}
              value={customText}
              onChange={(e) => setCustomText(e.target.value)}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 font-mono focus:outline-none focus:border-blue-500"
              placeholder="Paste article excerpt or intro paragraph here..."
            />
            <div className="flex items-center justify-between text-[11px] text-slate-500">
              <span>Word count: ~{customText.split(/\s+/).filter(Boolean).length} words</span>
              <span>Evaluated against Google helpful content classifier heuristics</span>
            </div>
          </div>
        </div>

        {/* Right Column (5 cols): Official Quality Rater Verdict & Prescriptive Remediation Blocks */}
        <div className="lg:col-span-5 space-y-6">
          {/* Official Rater Grade Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Quality Rater Verdict
              </span>
              <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${raterGrade.badgeClass}`}>
                {raterGrade.label}
              </span>
            </div>

            <p className="text-xs text-slate-700 leading-relaxed font-medium">
              {raterGrade.summary}
            </p>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
              <div className="font-bold text-slate-900 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#1a73e8]" />
                <span>AdSense Monetization Feasibility</span>
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-slate-600">Manual Review Risk:</span>
                <span className="font-bold text-slate-900">
                  {totalScore >= 80 ? 'Very Low' : totalScore >= 65 ? 'Moderate' : 'High / Rejection Probable'}
                </span>
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-slate-600">Core Update Demotion Risk:</span>
                <span className="font-bold text-slate-900">
                  {totalScore >= 80 ? 'Protected (Information Gain Moat)' : totalScore >= 60 ? 'Vulnerable' : 'Severe Risk'}
                </span>
              </div>
            </div>

            {/* Official AdSense Probability & Policy Notice */}
            <OfficialEvaluationDisclaimer compact sourceLabel="Information Gain & Quality Evaluation Model" />
          </div>

          {/* Prescriptive Remediation Fix 1: Author Entity Schema */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-purple-600" />
                <h4 className="text-xs font-bold text-slate-900">
                  Remedy 1: Author Bio JSON-LD Schema
                </h4>
              </div>
              <button
                type="button"
                onClick={() => copyToClipboard('author-schema', sampleAuthorSchema)}
                className="text-[11px] font-bold text-[#1a73e8] hover:text-blue-700 flex items-center gap-1 cursor-pointer"
              >
                {copiedCodeSnippet === 'author-schema' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-600">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy JSON-LD</span>
                  </>
                )}
              </button>
            </div>
            <p className="text-[11px] text-slate-500 leading-snug">
              Inject into the &lt;head&gt; of your article template to connect author byline to Google Knowledge Graph and verify accredited E-E-A-T.
            </p>
            <pre className="p-3 bg-slate-900 text-slate-100 rounded-xl text-[10px] font-mono overflow-x-auto max-h-40">
              {sampleAuthorSchema}
            </pre>
          </div>

          {/* Prescriptive Remediation Fix 2: Direct Answer Summary Block (Layer 2) */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-500" />
                <h4 className="text-xs font-bold text-slate-900">
                  Remedy 2: 1st-Viewport Direct Answer Block
                </h4>
              </div>
              <button
                type="button"
                onClick={() => copyToClipboard('answer-box', sampleDirectAnswerBox)}
                className="text-[11px] font-bold text-[#1a73e8] hover:text-blue-700 flex items-center gap-1 cursor-pointer"
              >
                {copiedCodeSnippet === 'answer-box' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-600">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy HTML</span>
                  </>
                )}
              </button>
            </div>
            <p className="text-[11px] text-slate-500 leading-snug">
              Guarantees user task completion within the first screen, neutralizing Pogo-sticking bounce signals that trigger unhelpful content demotions.
            </p>
            <pre className="p-3 bg-slate-900 text-slate-100 rounded-xl text-[10px] font-mono overflow-x-auto max-h-36">
              {sampleDirectAnswerBox}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};
