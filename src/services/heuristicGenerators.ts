/**
 * Zero-Cost Domain-Aware Heuristic Engines
 * Provides instant, high-quality SEO & AdSense projections at $0 operational cost
 * (zero API calls, zero latency, runs identically on Node backend, Cloudflare Edge, and Browser).
 */

import { generateContextualKgrKeywords } from './keywordEngine';

export interface HeuristicKeyword {
  kw: string;
  vol: number;
  ait: number;
  kgr: number;
  category: string;
  intent: string;
}

export function generateHeuristicKgrKeywords(query: string): HeuristicKeyword[] {
  const q = query.trim();
  const contextual = generateContextualKgrKeywords(q);

  return contextual.map((item, idx) => {
    // KGR score = allintitle / search volume
    // calculate simulated allintitle from the KGR score and volume
    const ait = Math.max(1, Math.round(item.estimatedVolume * item.kgrScore));
    return {
      kw: item.keyword,
      vol: item.estimatedVolume,
      ait,
      kgr: item.kgrScore,
      category: idx === 0 ? 'Target Query' : 'Long-Tail Variation',
      intent: item.intent,
    };
  });
}

export function generateHeuristicEvaluation(name: string, audience?: string, desc?: string) {
  const combined = (name + ' ' + (audience || '') + ' ' + (desc || '')).trim();
  const lower = combined.toLowerCase();
  const cleanName = name.trim();

  const isYmyl = /health|medical|finance|loan|crypto|cure|diet|doctor|invest/i.test(combined);
  const isCalculator = /calculator|ratio|formula|volume|density|mixing|sqft|epoxy|resins?|concrete|amp hour|offset smoker|estimator|dimension|cfm|btu/i.test(lower);
  const isAdSenseOrPublishing = /adsense|ad\s*network|monetiz|traffic|blogging|seo|approval/i.test(lower);
  const isCraftOrDiy = /epoxy|resin|woodwork|solar|battery|hvac|duct|rv|off[- ]?grid/i.test(lower);

  // Generate 100% relevant, grammatically sound KGR keywords
  const kgrKeywords = generateContextualKgrKeywords(cleanName, audience, desc);

  let recommendedModel: string;
  let dwellTimeAdvantage: string;
  let topAdPlacements: string[];

  if (isAdSenseOrPublishing) {
    recommendedModel = 'Step-by-step publisher readiness checklist, live policy compliance testing tools, and real-time site diagnostic audits.';
    dwellTimeAdvantage = 'Publishers and site owners thoroughly review requirements and follow multi-step checklists, ensuring high ad viewability (>2m 30s).';
    topAdPlacements = ['Above audit results card', 'In-feed between diagnostic steps', 'Directly below policy checklist'];
  } else if (isCalculator || isCraftOrDiy) {
    recommendedModel = 'Client-side interactive calculator / conversion micro-tool paired with structured FAQ, diagrams, and step-by-step formula explanations.';
    dwellTimeAdvantage = 'Interactive calculation and problem-solving keep session duration high (>2m 00s), maximizing AdSense Active View percentage.';
    topAdPlacements = ['Above interactive calculator container', 'Directly below calculation results card', 'Mid-content methodology breakdown'];
  } else {
    recommendedModel = 'Curated informational directory with interactive comparison tools, paired with comprehensive practical guides.';
    dwellTimeAdvantage = 'Visitors actively explore options and read detailed breakdowns, driving steady ad engagement.';
    topAdPlacements = ['Above directory filters', 'Between key recommendation cards', 'Inside comprehensive guide section'];
  }

  return {
    nicheName: name,
    competitionScore: isYmyl ? 'High' : 'Low',
    competitionSummary: isYmyl
      ? 'Heavy competition from established high-authority domains subject to strict YMYL algorithmic filters.'
      : 'Favorable long-tail search landscape with mostly legacy forums or unformatted blog posts.',
    estimatedRPM: {
      min: isYmyl ? 18 : 12,
      max: isYmyl ? 45 : 28,
      average: isYmyl ? 25 : 18,
    },
    policyApprovalRisk: isYmyl ? 'High' : 'Low',
    policyRiskExplanation: isYmyl
      ? 'Caution: Google AdSense evaluates financial and health advice under strict YMYL (Your Money Your Life) policies. Focus strictly on objective mathematical calculations rather than personal advice.'
      : "Excellent approval outlook. Provided each page includes 800+ words of explanatory educational copy, the risk of 'Thin Content' rejection is minimal.",
    approvalProbability: isYmyl ? 58 : 95,
    approvalFactors: {
      policyCompliance: isYmyl ? 68 : 98,
      thinContentSafety: 94,
      ymylSafety: isYmyl ? 42 : 98,
      commercialDemand: isYmyl ? 95 : 92,
    },
    hostingCostFeasibility: '100% compatible with $0 static hosting (Cloudflare Pages or Vercel). Logic can be executed entirely client-side.',
    recommendedModel,
    trafficPotentialMonthly: '20,000 - 65,000 pageviews within 6 months via long-tail KGR search queries.',
    kgrKeywords,
    monetizationBlueprint: {
      recommendedAdDensity: '3 standard responsive units + 1 mobile sticky anchor',
      dwellTimeAdvantage,
      topAdPlacements,
    },
    verdictScore: isYmyl ? 62 : 89,
    verdictReasoning: isYmyl
      ? 'Requires careful editorial framing to avoid YMYL scrutiny. Best pivoted towards tool-based objective math.'
      : 'Outstanding candidate for ultra-low-budget high-margin AdSense monetization. Low competition with strong buyer/maker intent.',
  };
}
