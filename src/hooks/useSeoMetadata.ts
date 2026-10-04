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
    title: 'GladSense — Pre-Approval Site Auditor & Rejection Doctor',
    description: 'Diagnose Google AdSense rejection flags, audit 100 E-E-A-T policy items, detect AI clichés, and generate 1-click compliant overturn bundles.',
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
    title: '1-Click AdSense Policy & ads.txt Generator — Compliance SOP 2.0',
    description: 'Generate certified IAB Tech Lab ads.txt files, GDPR Consent Mode v2 policies, and DoubleClick DART legal disclosures in 1 click.',
    canonicalPath: '/#policy-toolkit',
  },
  'blog': {
    title: 'Knowledge Base: 27 Guides to AdSense Approval & GEO — GladSense',
    description: 'Comprehensive technical tutorials covering crawler directives, thin content remedies, E-E-A-T author schema, and Core Web Vitals.',
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
