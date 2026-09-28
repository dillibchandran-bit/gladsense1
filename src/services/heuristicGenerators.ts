/**
 * Zero-Cost Domain-Aware Heuristic Engines
 * Provides instant, high-quality SEO & AdSense projections at $0 operational cost
 * (zero API calls, zero latency, runs identically on Node backend, Cloudflare Edge, and Browser).
 */

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
  const lower = q.toLowerCase();

  // 1. Detect Domain & Category
  const isJobQuery = /jobs?|hiring|walk[- ]?in|career|openings?|fresher|salary|internship|recruitment|engineer|developer|analyst|manager|vacancy|vacancies/i.test(lower);
  const isRealEstate = /apartment|flat|rent|plot|villa|sq ?ft|property|housing|real estate|pg /i.test(lower);
  const isEducation = /college|school|university|admission|exam|syllabus|cutoff|degree|course|gpa|scholarship|fees/i.test(lower);
  const isCivic = /visa|passport|license|title|permit|certificate|apostille|dmv|court|legal|tax|form/i.test(lower);
  const isFoodOrBaking = /recipe|bread|cake|dough|hydration|baking|flour|sourdough|cooking/i.test(lower);
  const isCalculatorOrFormula = /calculator|ratio|formula|volume|density|mixing|sqft|epoxy|resins?|concrete|amp hour|offset smoker/i.test(lower);

  let category = 'General';
  let templates: Array<{ suffix: string; vol: number; ait: number; intent: string }>;

  if (isJobQuery) {
    category = 'Careers & Jobs';
    templates = [
      { suffix: '', vol: 210, ait: 9, intent: 'Exact Target Query' },
      { suffix: 'for freshers', vol: 190, ait: 8, intent: 'Entry level applicants' },
      { suffix: 'walk in interview dates', vol: 150, ait: 5, intent: 'Direct hiring events' },
      { suffix: 'salary package details', vol: 230, ait: 12, intent: 'Compensation benchmark' },
      { suffix: 'with immediate joining', vol: 120, ait: 4, intent: 'Urgent recruitment' },
      { suffix: 'weekend interview drive', vol: 110, ait: 3, intent: 'Working professional drive' },
      { suffix: 'without experience vacancies', vol: 140, ait: 6, intent: 'Trainee roles' },
    ];
  } else if (isRealEstate) {
    category = 'Real Estate';
    templates = [
      { suffix: '', vol: 220, ait: 11, intent: 'Exact Target Query' },
      { suffix: 'price per square foot current rate', vol: 180, ait: 7, intent: 'Pricing lookup' },
      { suffix: 'for rent without brokerage direct owner', vol: 240, ait: 14, intent: 'Zero broker search' },
      { suffix: 'verified owner contact details', vol: 160, ait: 6, intent: 'Direct seller connection' },
      { suffix: 'resale price list and amenities', vol: 130, ait: 4, intent: 'Buyer evaluation' },
      { suffix: 'rera approved project review', vol: 110, ait: 3, intent: 'Legal verification' },
    ];
  } else if (isEducation) {
    category = 'Education & Exams';
    templates = [
      { suffix: '', vol: 240, ait: 12, intent: 'Exact Target Query' },
      { suffix: 'eligibility criteria and cutoff marks', vol: 190, ait: 8, intent: 'Admission requirements' },
      { suffix: 'fee structure and scholarship details', vol: 210, ait: 9, intent: 'Tuition planning' },
      { suffix: 'syllabus and preparation guide pdf', vol: 170, ait: 6, intent: 'Study resource' },
      { suffix: 'previous year solved question papers', vol: 160, ait: 7, intent: 'Exam preparation' },
      { suffix: 'online counseling and seat matrix', vol: 130, ait: 4, intent: 'Counseling steps' },
    ];
  } else if (isCivic) {
    category = 'Civic & Legal';
    templates = [
      { suffix: '', vol: 210, ait: 10, intent: 'Exact Target Query' },
      { suffix: 'required documents checklist step by step', vol: 180, ait: 7, intent: 'Document verification' },
      { suffix: 'online application processing time and fees', vol: 220, ait: 9, intent: 'Fee and timeline' },
      { suffix: 'official portal application status check', vol: 170, ait: 6, intent: 'Status tracking' },
      { suffix: 'common mistakes to avoid during application', vol: 130, ait: 4, intent: 'Mistake prevention' },
      { suffix: 'appointment booking procedure', vol: 150, ait: 5, intent: 'Appointment guide' },
    ];
  } else if (isFoodOrBaking) {
    category = 'Food Science';
    templates = [
      { suffix: '', vol: 230, ait: 11, intent: 'Exact Target Query' },
      { suffix: 'baker percentage formula step by step', vol: 180, ait: 7, intent: 'Recipe consistency' },
      { suffix: 'hydration ratio and temperature guide', vol: 160, ait: 6, intent: 'Fermentation control' },
      { suffix: 'grams to ounces conversion table', vol: 210, ait: 9, intent: 'Measurement conversion' },
      { suffix: 'troubleshooting gummy crumb texture', vol: 140, ait: 5, intent: 'Baking troubleshooting' },
    ];
  } else if (isCalculatorOrFormula) {
    category = 'Tools & Calculation';
    templates = [
      { suffix: '', vol: 220, ait: 10, intent: 'Exact Target Query' },
      { suffix: 'step by step calculation formula', vol: 190, ait: 8, intent: 'Formula explanation' },
      { suffix: 'online free accurate estimator', vol: 240, ait: 13, intent: 'Interactive tool query' },
      { suffix: 'ratio mixing chart and safety margin', vol: 170, ait: 7, intent: 'Safety ratio guide' },
      { suffix: 'cost per unit estimator chart', vol: 210, ait: 9, intent: 'Cost estimation' },
    ];
  } else {
    const words = q.split(/\s+/).filter(Boolean);
    category = 'General Knowledge';
    if (words.length >= 4) {
      templates = [
        { suffix: '', vol: 190, ait: 8, intent: 'Exact Target Query' },
        { suffix: 'for beginners step by step', vol: 150, ait: 6, intent: 'Beginner tutorial' },
        { suffix: 'complete checklist and requirements', vol: 140, ait: 5, intent: 'Preparation list' },
        { suffix: 'verified reviews and recommendations', vol: 170, ait: 7, intent: 'User feedback' },
        { suffix: 'common problems and solutions', vol: 120, ait: 4, intent: 'Troubleshooting' },
        { suffix: 'latest updates and schedule', vol: 160, ait: 6, intent: 'Current timeline' },
      ];
    } else {
      templates = [
        { suffix: '', vol: 240, ait: 12, intent: 'Exact Target Query' },
        { suffix: 'step by step complete guide', vol: 200, ait: 9, intent: 'How-to guide' },
        { suffix: 'requirements and eligibility list', vol: 170, ait: 7, intent: 'Prerequisites' },
        { suffix: 'tips and best practices for beginners', vol: 160, ait: 6, intent: 'Best practices' },
        { suffix: 'free online tool and templates', vol: 190, ait: 8, intent: 'Resource finder' },
      ];
    }
  }

  return templates.map((t, idx) => {
    const kw = t.suffix ? `${q} ${t.suffix}` : q;
    const kgr = Number((t.ait / t.vol).toFixed(3));
    return {
      kw,
      vol: t.vol,
      ait: t.ait,
      kgr,
      category: idx === 0 ? `${category} (Exact)` : category,
      intent: t.intent,
    };
  });
}

export function generateHeuristicEvaluation(name: string, audience?: string, desc?: string) {
  const combined = (name + ' ' + (audience || '') + ' ' + (desc || '')).trim();
  const lower = combined.toLowerCase();
  const cleanName = name.trim();

  const isYmyl = /health|medical|finance|loan|crypto|cure|diet|doctor|invest/i.test(combined);
  const isJob = /jobs?|career|hiring|fresher|graduate|recruitment|employment|internship|vacancy|vacancies|walk[- ]?in|developer|engineer/i.test(lower);
  const isRealEstate = /apartment|flat|rent|plot|villa|sq ?ft|property|housing|real estate|pg /i.test(lower);
  const isEducation = /college|school|university|admission|exam|syllabus|cutoff|degree|course|gpa|scholarship|fees/i.test(lower);
  const isCivic = /visa|passport|license|title|permit|certificate|apostille|dmv|court|legal|tax|form/i.test(lower);
  const isFood = /recipe|bread|cake|dough|hydration|baking|flour|sourdough|cooking/i.test(lower);
  const isCalculator = /calculator|ratio|formula|volume|density|mixing|sqft|epoxy|resins?|concrete|amp hour|offset smoker/i.test(lower);

  let kgrKeywords: Array<{ keyword: string; estimatedVolume: number; kgrScore: number; intent: string }>;
  let recommendedModel: string;
  let dwellTimeAdvantage: string;
  let topAdPlacements: string[];

  if (isJob) {
    kgrKeywords = [
      { keyword: `${cleanName} for freshers`, estimatedVolume: 210, kgrScore: 0.08, intent: 'Entry level vacancies' },
      { keyword: `${cleanName} without experience`, estimatedVolume: 180, kgrScore: 0.11, intent: 'Direct openings for beginners' },
      { keyword: `${cleanName} walk in interview dates`, estimatedVolume: 150, kgrScore: 0.06, intent: 'Hiring drives' },
      { keyword: `${cleanName} resume checklist and templates`, estimatedVolume: 190, kgrScore: 0.09, intent: 'Application preparation' },
    ];
    recommendedModel = 'Curated job board directory and filter micro-tool paired with entry-level resume templates, salary benchmarks, and interview preparation guides.';
    dwellTimeAdvantage = 'Job seekers actively filter vacancies and read interview preparation guides, keeping session duration high (>2m 15s).';
    topAdPlacements = ['Above job search filters (responsive)', 'In-feed between job listing cards', 'Inside career guide and interview articles'];
  } else if (isRealEstate) {
    kgrKeywords = [
      { keyword: `${cleanName} price per square foot current rate`, estimatedVolume: 220, kgrScore: 0.12, intent: 'Pricing rate lookup' },
      { keyword: `${cleanName} for rent direct owner no broker`, estimatedVolume: 240, kgrScore: 0.14, intent: 'Zero broker search' },
      { keyword: `${cleanName} verified listings checklist`, estimatedVolume: 160, kgrScore: 0.07, intent: 'Property evaluation' },
    ];
    recommendedModel = 'Local real estate price-per-square-foot calculator and neighborhood comparison directory paired with buyer verification checklists.';
    dwellTimeAdvantage = 'Property seekers spend considerable time comparing rates and neighborhood data, ensuring high ad viewability.';
    topAdPlacements = ['Above property comparison table', 'Directly below rate estimation cards', 'Mid-article neighborhood breakdown'];
  } else if (isEducation) {
    kgrKeywords = [
      { keyword: `${cleanName} eligibility criteria and cutoff`, estimatedVolume: 230, kgrScore: 0.11, intent: 'Admission requirements' },
      { keyword: `${cleanName} fee structure and scholarship`, estimatedVolume: 190, kgrScore: 0.08, intent: 'Tuition planning' },
      { keyword: `${cleanName} syllabus and study material pdf`, estimatedVolume: 170, kgrScore: 0.09, intent: 'Study material' },
    ];
    recommendedModel = 'Course and college cutoff searcher tool paired with detailed syllabus breakdowns and admission eligibility calculators.';
    dwellTimeAdvantage = 'Students and parents thoroughly research cutoffs and fees, resulting in long dwell times and repeated visits.';
    topAdPlacements = ['Above cutoff search tool', 'Directly below eligibility results', 'Mid-syllabus educational guide'];
  } else if (isCivic) {
    kgrKeywords = [
      { keyword: `${cleanName} required documents checklist`, estimatedVolume: 220, kgrScore: 0.10, intent: 'Document preparation' },
      { keyword: `${cleanName} online application processing time and fees`, estimatedVolume: 180, kgrScore: 0.08, intent: 'Application timeline' },
      { keyword: `${cleanName} application status tracking guide`, estimatedVolume: 160, kgrScore: 0.07, intent: 'Status tracking' },
    ];
    recommendedModel = 'Interactive document readiness checker and fee estimator paired with step-by-step bureaucratic walkthroughs.';
    dwellTimeAdvantage = 'High user intent to avoid paperwork rejection keeps users following step-by-step checklists carefully.';
    topAdPlacements = ['Above checklist generator', 'Below required documents summary', 'In-content application guide'];
  } else if (isFood) {
    kgrKeywords = [
      { keyword: `${cleanName} hydration ratio and recipe chart`, estimatedVolume: 240, kgrScore: 0.11, intent: 'Recipe consistency' },
      { keyword: `${cleanName} grams to ounces conversion table`, estimatedVolume: 190, kgrScore: 0.08, intent: 'Measurement conversion' },
      { keyword: `${cleanName} troubleshooting tips for beginners`, estimatedVolume: 160, kgrScore: 0.06, intent: 'Baking troubleshooting' },
    ];
    recommendedModel = 'Interactive ingredient scaling calculator and hydration ratio estimator paired with illustrated troubleshooting guides.';
    dwellTimeAdvantage = 'Bakers and home chefs keep the calculator open while prepping in the kitchen, driving exceptional session length.';
    topAdPlacements = ['Above recipe calculator', 'Below scaled ingredient list', 'Mid-recipe method guide'];
  } else if (isCalculator) {
    kgrKeywords = [
      { keyword: `${cleanName} calculation formula step by step`, estimatedVolume: 220, kgrScore: 0.12, intent: 'Formula explanation' },
      { keyword: `free online ${cleanName} estimator`, estimatedVolume: 240, kgrScore: 0.14, intent: 'Interactive tool query' },
      { keyword: `${cleanName} ratio chart and safety factor`, estimatedVolume: 180, kgrScore: 0.09, intent: 'Safety ratio guide' },
    ];
    recommendedModel = 'Client-side interactive calculator / conversion micro-tool paired with structured FAQ and step-by-step formula explanations.';
    dwellTimeAdvantage = 'Interactive problem-solving keeps session duration high (>1m 45s), maximizing AdSense Active View percentage.';
    topAdPlacements = ['Above calculator container', 'Directly below calculation results card', 'Mid-content methodology breakdown'];
  } else {
    const words = cleanName.split(/\s+/).filter(Boolean);
    if (words.length >= 3) {
      kgrKeywords = [
        { keyword: `${cleanName} for beginners`, estimatedVolume: 190, kgrScore: 0.08, intent: 'Beginner starter guide' },
        { keyword: `${cleanName} step by step guide`, estimatedVolume: 210, kgrScore: 0.11, intent: 'Practical walkthrough' },
        { keyword: `${cleanName} complete checklist and requirements`, estimatedVolume: 160, kgrScore: 0.07, intent: 'Requirements list' },
        { keyword: `${cleanName} verified reviews and comparison`, estimatedVolume: 140, kgrScore: 0.06, intent: 'Comparison lookup' },
      ];
    } else {
      kgrKeywords = [
        { keyword: `${cleanName} step by step guide for beginners`, estimatedVolume: 240, kgrScore: 0.12, intent: 'Beginner tutorial' },
        { keyword: `${cleanName} requirements checklist`, estimatedVolume: 190, kgrScore: 0.09, intent: 'Requirements guide' },
        { keyword: `${cleanName} tips and best practices`, estimatedVolume: 170, kgrScore: 0.07, intent: 'Best practices' },
      ];
    }
    recommendedModel = 'Curated informational directory with interactive comparison tools, paired with comprehensive guides.';
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
