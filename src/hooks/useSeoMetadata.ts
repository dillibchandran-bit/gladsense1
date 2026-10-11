import { useEffect } from 'react';
import { NavTabType } from '../components/Navbar';
import { syncDocumentMetadata } from '../utils/schemaGuard';

interface TabMetadataMap {
  [key: string]: {
    title: string;
    description: string;
    canonicalPath: string;
  };
}

const TAB_METADATA: TabMetadataMap = {
  'site-doctor': {
    title: 'Free Google AdSense Eligibility & Policy Readiness Checker Tool — GladSense',
    description: 'Free online Google AdSense eligibility and policy readiness checker tool. Fix Low Value Content in 2026, resolve Valuable Inventory: Under Construction flags, and verify first-attempt approval.',
    canonicalPath: '/tools/site-doctor/',
  },
  'crawler-firewall': {
    title: 'How to Fix AdSense Crawler Errors: Cloudflare, Firewalls & 403 Forbidden — GladSense',
    description: 'Resolve the #1 technical rejection cause: automated bot security barriers that prevent Mediapartners-Google from loading your pages. Generate Cloudflare WAF bypass rules and Nginx/Apache origin allowlists.',
    canonicalPath: '/tools/crawler-firewall/',
  },
  'niche-lab': {
    title: 'Top 50 Highest Paying AdSense Niches: 2026 CPC & Profitability Table — GladSense',
    description: 'Top 50 highest paying AdSense niches (2026 CPC & profitability table) and Education Niche AdSense RPM Benchmarks (CPC, Page RPM & Earning Potential for gladsenseedu.app).',
    canonicalPath: '/tools/kgr-keyword-lab/',
  },
  'revenue-planner': {
    title: 'Google AdSense Revenue Calculator by Niche (2026 Traffic & RPM Estimator) — GladSense',
    description: 'Google AdSense Revenue Calculator by Niche (2026 Traffic & RPM Estimator). Calculate how much AdSense pays for 1,000 visitors in education and use our RPM vs CPM vs CPC calculator.',
    canonicalPath: '/tools/adsense-rpm-calculator/',
  },
  'policy-toolkit': {
    title: 'The 5 Mandatory Trust Pages Required for AdSense Approval (Free Templates) — GladSense',
    description: 'Generate the 5 mandatory trust pages required for Google AdSense approval: Privacy Policy with DoubleClick DART cookies, Terms, About Us, Contact, and Editorial Standards.',
    canonicalPath: '/tools/ads-txt-generator/',
  },
  'ads-txt-generator': {
    title: 'Free Online ads.txt Validator & Syntax Checker for Publishers — GladSense',
    description: 'Verify your Authorized Digital Sellers (ads.txt) syntax line-by-line according to IAB Tech Lab v1.1 standards. Prevent domain spoofing and eliminate "Earnings at risk" AdSense alerts.',
    canonicalPath: '/tools/ads-txt-validator/',
  },
  'robots-txt': {
    title: 'The Ideal robots.txt for Google AdSense & Googlebot-Image Approval — GladSense',
    description: 'The ideal robots.txt for Google AdSense and Googlebot-Image approval. Allow Mediapartners-Google, prevent 403 Forbidden crawler blocks, and test robots.txt path allowances online.',
    canonicalPath: '/tools/robots-txt/',
  },
  'privacy-policy-generator': {
    title: 'Google AdSense Compliant Privacy Policy & Cookie Disclosure Template — GladSense',
    description: 'Generate an audit-proof, legally robust Privacy Policy customized for Google AdSense compliance including mandatory DoubleClick DART cookies, Consent Mode v2, and GDPR/CCPA disclosures.',
    canonicalPath: '/tools/privacy-policy-generator/',
  },
  'faq': {
    title: 'Google AdSense FAQs & PAA Featured Snippet Answers (2026 Policy Standards) — GladSense',
    description: 'Direct institutional answers to Google\'s most frequent People Also Ask search queries: required article count, 1-month domain approvals, subfolder vs subdomain authority, and education RPMs.',
    canonicalPath: '/faq/',
  },
  'blog': {
    title: 'Google AdSense Compliance & Search Monetization Knowledge Hub — GladSense',
    description: 'Peer-reviewed guides by institutional Search Quality Evaluators. Learn how to fix Low Value Content in 2026, overturn Valuable Inventory flags, and implement E-E-A-T.',
    canonicalPath: '/guides/',
  },
  'single-page-application-adsense-approval-requirements': {
    title: 'How to Get Google AdSense Approved on React / Next.js / Vite SPA Apps — GladSense',
    description: 'The 5 engineering mandates, client-side route listeners, and prerender architectures required to pass Google AdSense review on modern single page applications.',
    canonicalPath: '/guides/single-page-application-adsense-approval-requirements/',
  },
  'privacy-policy': {
    title: 'Privacy Policy & DoubleClick Cookie Disclosures — GladSense Labs',
    description: 'Official privacy policy, cookie disclosures, Google Consent Mode v2 standards, and data protection disclosures for GladSense Labs.',
    canonicalPath: '/privacy-policy/',
  },
  'terms': {
    title: 'Terms of Service & Publisher Usage Agreement — GladSense Labs',
    description: 'Terms of service, acceptable use policies, calculation disclaimers, and intellectual property terms for GladSense Labs.',
    canonicalPath: '/terms/',
  },
  'about': {
    title: 'About GladSense Labs — Institutional E-E-A-T & Research Team',
    description: 'Learn about the GladSense Research Team, our 7 editorial divisions, institutional Search Quality Evaluator standards, and publisher missions.',
    canonicalPath: '/about/',
  },
  'contact': {
    title: 'Contact GladSense Labs — Executive Compliance & Publisher Support',
    description: 'Contact GladSense compliance officers, submit website audit triage inquiries, or reach our technical webmaster engineering desk.',
    canonicalPath: '/contact/',
  },
  'editorial-policy': {
    title: 'Editorial Standards & AI Transparency Policy — GladSense Labs',
    description: 'Our rigorous institutional publishing guidelines, peer-review procedures, and AI transparency framework for publisher education.',
    canonicalPath: '/editorial-policy/',
  },
};

export function useSeoMetadata(activeKey: string, customSlug?: string): void {
  useEffect(() => {
    const lookupKey = customSlug || activeKey;
    const meta = TAB_METADATA[lookupKey] || TAB_METADATA[activeKey] || TAB_METADATA['site-doctor'];

    syncDocumentMetadata({
      title: meta.title,
      description: meta.description,
      canonicalPath: meta.canonicalPath,
      tabId: lookupKey,
      ogType: lookupKey.includes('single-page') ? 'article' : 'website',
      noindex: false,
    });
  }, [activeKey, customSlug]);
}
