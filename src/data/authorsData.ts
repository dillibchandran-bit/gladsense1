export interface GladSenseAuthor {
  id: string;
  name: string;
  role: string;
  team: string;
  shortBio: string;
  avatarBg: string; // Tailwind color class for avatars
  specialization: string;
}

const DILLIB_AUTHOR: GladSenseAuthor = {
  id: 'dillib-chandran',
  name: 'Dillib Chandran',
  role: 'Founder - Web Content & AdSense Specialist',
  team: 'Content Quality, Search Ranking Policies & AdSense Compliance Evaluation Directorate',
  shortBio: 'Founder of GladSense and Web Content & AdSense Specialist. Directs web content quality evaluation criteria, Google search ranking policy compliance, and programmatic AdSense monetization approval standards across E-E-A-T and Information Gain.',
  avatarBg: 'bg-emerald-700',
  specialization: 'Web Content Quality, Search Systems & AdSense Monetization',
};

export const GLADSENSE_AUTHORS: Record<string, GladSenseAuthor> = {
  HEAD_EVALUATOR: DILLIB_AUTHOR,
  MARCUS: {
    id: 'marcus-vance',
    name: 'Marcus Vance, JD',
    role: 'Principal Policy Counsel & Compliance Director',
    team: 'Policy & Legal Compliance Enforcement Lab',
    shortBio: 'Former publisher trust & safety auditor with 12+ years specializing in Google Publisher Policies, rejection appeals, YMYL compliance, and dispute resolution.',
    avatarBg: 'bg-purple-600',
    specialization: 'AdSense Policy Enforcement & Rejection Defense',
  },
  ELENA: {
    id: 'dr-elena-rostova',
    name: 'Dr. Elena Rostova',
    role: 'Head of Crawl Infrastructure & Core Web Vitals',
    team: 'Search Architecture & Bot Indexing Group',
    shortBio: 'PhD in Computer Science. Focuses on Googlebot rendering systems, pre-rendered semantic HTML architectures, Schema.org JSON-LD micro-data, and sub-second web speed.',
    avatarBg: 'bg-emerald-600',
    specialization: 'Googlebot Rendering & Technical SEO Systems',
  },
  SARAH: {
    id: 'sarah-jenkins',
    name: 'Sarah Jenkins, MBA',
    role: 'Editorial Governance Lead & Quality Rater Specialist',
    team: 'Human Evaluation & Trust Standards Council',
    shortBio: 'Veteran digital media auditor analyzing Google Search Quality Evaluator Guidelines (QRG), Information Gain metrics, author attribution transparency, and E-E-A-T governance.',
    avatarBg: 'bg-indigo-600',
    specialization: 'E-E-A-T Verification & Search Quality Guidelines',
  },
  KENJI: {
    id: 'kenji-takahashi',
    name: 'Kenji Takahashi',
    role: 'Lead Quantitative SEO Researcher',
    team: 'Quantitative Search Intent & KGR Data Unit',
    shortBio: 'Quantitative data analyst specializing in Keyword Golden Ratio (KGR) mathematical models, micro-utility niche feasibility scoring, and zero-backlink Page 1 indexing.',
    avatarBg: 'bg-amber-600',
    specialization: 'Mathematical KGR & Micro-Utility Niche Discovery',
  },
  JULIAN: {
    id: 'julian-thorne',
    name: 'Julian Thorne',
    role: 'Director of Programmatic Yield & Ad Operations',
    team: 'Ad Revenue & Auction Yield Modeling Lab',
    shortBio: 'Former programmatic exchange yield strategist. Expert in Active View ad viewability optimization, multi-slot ad density ceilings, and high-RPM single-purpose web tools.',
    avatarBg: 'bg-rose-600',
    specialization: 'Programmatic Ad Auctions & Viewability Math',
  },
  PRIYA: {
    id: 'priya-sharma',
    name: 'Priya Sharma, CIPP/E',
    role: 'Static Edge Architect & Global Privacy Officer',
    team: 'Edge Infrastructure & Global Privacy Directorate',
    shortBio: 'Certified Information Privacy Professional (CIPP/E) and Cloudflare edge systems engineer. Oversees GDPR/CCPA compliance, Consent Mode v2, and $0/mo hosting architectures.',
    avatarBg: 'bg-teal-600',
    specialization: 'Data Privacy Regulations & Static Edge Hosting',
  },
};

// Backward-compatibility alias: non-enumerable on GLADSENSE_AUTHORS to keep exactly 7 distinct cards in Object.values
export const DILLIB = DILLIB_AUTHOR;
Object.defineProperty(GLADSENSE_AUTHORS, 'DILLIB', {
  value: DILLIB_AUTHOR,
  enumerable: false,
  writable: false,
  configurable: true,
});
