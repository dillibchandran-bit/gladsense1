import { AiEvaluationResult } from '../types';
import { generateContextualKgrKeywords } from './keywordEngine';

export function evaluateNicheClientSide(nicheName: string, targetAudience?: string, description?: string): AiEvaluationResult {
  const combined = `${nicheName} ${targetAudience || ''} ${description || ''}`.trim();
  const lower = combined.toLowerCase();
  const cleanName = nicheName.trim();

  const isYmyl = /health|medical|finance|loan|crypto|cure|diet|doctor|invest/i.test(combined);
  const isSaasOrApp = /saas|web\s*app|software|dashboard|invoic|tracker|manager|portal|planner|builder|pomodoro|resume|schedule|crm/i.test(lower);
  const isGameOrQuiz = /game|trivia|quiz|puzzle|wordle|crossword|typing/i.test(lower);
  const isDirectory = /directory|job\s*board|curat|database|wiki|cheat\s*sheet|archive|repository|listings?/i.test(lower);
  const isCalculator = /calculator|ratio|formula|volume|density|mixing|sqft|epoxy|resins?|concrete|amp hour|offset smoker|estimator|dimension|cfm|btu/i.test(lower);
  const isAdSenseOrPublishing = /adsense|ad\s*network|monetiz|traffic|blogging|seo|approval/i.test(lower);
  const isCraftOrDiy = /epoxy|resin|woodwork|solar|battery|hvac|duct|rv|off[- ]?grid/i.test(lower);

  // Generate 100% semantically relevant KGR keywords using the dedicated contextual keyword engine
  const kgrKeywords = generateContextualKgrKeywords(cleanName, targetAudience, description);

  let recommendedModel: string;
  let dwellTimeAdvantage: string;
  let topAdPlacements: string[];

  if (isSaasOrApp) {
    recommendedModel = 'Client-first single page web app (SPA) with free zero-friction utility tier, paired with educational workflow guides and export templates.';
    dwellTimeAdvantage = 'Users actively work inside the web application for extended workflows (drafting, editing, tracking), driving sustained session duration (>3m 15s) and outstanding AdSense active view rates.';
    topAdPlacements = ['Sidebar sticky desktop banner (unobtrusive to app canvas)', 'Below active project export/download action', 'Inside pre-built template directory'];
  } else if (isGameOrQuiz) {
    recommendedModel = 'Fast canvas/DOM-based browser web game with instant zero-login replayability, paired with high-score tracking and daily challenge mechanics.';
    dwellTimeAdvantage = 'Gamified interaction and multi-round replay cycles yield high session repeat rates and long continuous page engagement (>4m 00s).';
    topAdPlacements = ['Between game rounds / level transition screens', 'Below browser play canvas', 'Beside daily leaderboard rankings'];
  } else if (isDirectory) {
    recommendedModel = 'Searchable, filterable programmatic directory with detailed resource profile pages, comparison tables, and user submission guidelines.';
    dwellTimeAdvantage = 'Visitors browse multiple entries, compare listings, and review detailed profiles, generating high pageviews per session (3.4+ pages).';
    topAdPlacements = ['Above search and filter controls', 'In-feed between directory result cards', 'Inside individual resource review pages'];
  } else if (isAdSenseOrPublishing) {
    recommendedModel = 'Step-by-step publisher readiness checklist, live policy compliance testing tools, and real-time site diagnostic audits.';
    dwellTimeAdvantage = 'Publishers and site owners thoroughly review requirements and follow multi-step checklists, ensuring high ad viewability (>2m 30s).';
    topAdPlacements = ['Above audit results card', 'In-feed between diagnostic steps', 'Directly below policy checklist'];
  } else if (isCalculator || isCraftOrDiy) {
    recommendedModel = 'Client-side interactive calculator / conversion micro-tool paired with structured FAQ, diagrams, and step-by-step formula explanations.';
    dwellTimeAdvantage = 'Interactive calculation and problem-solving keep session duration high (>2m 00s), maximizing AdSense Active View percentage.';
    topAdPlacements = ['Above interactive calculator container', 'Directly below calculation results card', 'Mid-content methodology breakdown'];
  } else {
    recommendedModel = 'Modern web application platform combining interactive utility features with structured documentation, guides, and comparison tools.';
    dwellTimeAdvantage = 'Visitors actively interact with the web app features and explore documentation, driving steady engagement and high ad viewability.';
    topAdPlacements = ['Above primary web app workspace', 'Between key feature cards', 'Inside documentation & tutorial section'];
  }

  return {
    nicheName: cleanName,
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
      ? 'Caution: Google AdSense evaluates financial and health advice under strict YMYL policies. Focus strictly on objective mathematical calculations rather than personal advice.'
      : 'Excellent approval outlook. Provided each page includes 800+ words of explanatory educational copy, the risk of Thin Content rejection is minimal.',
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
