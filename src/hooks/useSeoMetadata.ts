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
    canonicalPath: '/#site-doctor',
  },
  'niche-lab': {
    title: 'Top 50 Highest Paying AdSense Niches: 2026 CPC & Profitability Table — GladSense',
    description: 'Top 50 highest paying AdSense niches (2026 CPC & profitability table) and Education Niche AdSense RPM Benchmarks (CPC, Page RPM & Earning Potential for gladsenseedu.app).',
    canonicalPath: '/#niche-lab',
  },
  'revenue-planner': {
    title: 'Google AdSense Revenue Calculator by Niche (2026 Traffic & RPM Estimator) — GladSense',
    description: 'Google AdSense Revenue Calculator by Niche (2026 Traffic & RPM Estimator). Calculate how much AdSense pays for 1,000 visitors in education and use our RPM vs CPM vs CPC calculator.',
    canonicalPath: '/#revenue-planner',
  },
  'policy-toolkit': {
    title: 'The 5 Mandatory Trust Pages Required for AdSense Approval (Free Templates) — GladSense',
    description: 'Generate the 5 mandatory trust pages required for Google AdSense approval: Privacy Policy with DoubleClick DART cookies, Terms, About Us, Contact, and Editorial Standards.',
    canonicalPath: '/#policy-toolkit',
  },
  'blog': {
    title: 'Step-by-Step Guide: Passing Google AdSense Review on Your First Attempt & Knowledge Hub',
    description: 'Passing Google AdSense review on your first attempt, resolving low value content in 2026, fixing valuable inventory under construction, and E-E-A-T guides.',
    canonicalPath: '/#blog',
  },
};

export function useSeoMetadata(activeTab: NavTabType): void {
  useEffect(() => {
    const meta = TAB_METADATA[activeTab] || TAB_METADATA['site-doctor'];
    syncDocumentMetadata({
      title: meta.title,
      description: meta.description,
      canonicalPath: meta.canonicalPath,
      tabId: activeTab,
      ogType: 'website',
      noindex: false,
    });
  }, [activeTab]);
}
