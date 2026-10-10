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
    title: 'KGR Keyword & High-RPM Niche Discovery Lab — GladSense',
    description: 'Discover low-competition utility niches with Keyword Golden Ratio (KGR < 0.25) formulas and 30+ validated high-yield publisher blueprints.',
    canonicalPath: '/#niche-lab',
  },
  'revenue-planner': {
    title: 'AdSense RPM & Profit Planner — Edge P&L Yield Modeling',
    description: 'Calculate traffic yields, geo-tier RPM benchmarks ($18–$65), and $10/year zero-cost server hosting unit economics.',
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
