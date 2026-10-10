/**
 * Schema Guard & Dynamic Metadata Synchronizer
 * Generates an interconnected Schema.org @graph (JSON-LD) with strict ISO standards
 * and enforces a singleton script tag to maintain 0 issues on Google Rich Results Test.
 */

export interface SeoMetadataOptions {
  title: string;
  description: string;
  canonicalPath: string;
  tabId: string;
  ogType?: string;
  noindex?: boolean;
}

const BASE_URL = 'https://gladsenseedu.app';

export const MASTER_SCHEMA_GRAPH = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${BASE_URL}/#website`,
      url: `${BASE_URL}/`,
      name: 'GladSense Compliance & Monetization Labs',
      description: 'Pre-approval site auditor, 100-point AdSense compliance SOP, KGR keyword research lab, and revenue modeling for Google publishers.',
      inLanguage: 'en-US',
      potentialAction: {
        '@type': 'SearchAction',
        target: `${BASE_URL}/?q={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
    },
    {
      '@type': 'Organization',
      '@id': `${BASE_URL}/#organization`,
      name: 'GladSense Compliance & Monetization Labs',
      url: `${BASE_URL}/`,
      logo: `${BASE_URL}/favicon.ico`,
      sameAs: [
        'https://twitter.com/GladSenseLabs',
        'https://github.com/gladsense',
        'https://linkedin.com/company/gladsense',
      ],
      founder: {
        '@type': 'Person',
        name: 'Dillib Chandran',
        jobTitle: 'Chief Technology Architect',
        worksFor: {
          '@id': `${BASE_URL}/#organization`,
        },
      },
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'Customer Support & Policy Compliance',
        email: 'contact@gladsenseedu.app',
        areaServed: 'US',
        availableLanguage: ['en'],
      },
    },
    {
      '@type': 'WebApplication',
      '@id': `${BASE_URL}/#site-doctor`,
      name: 'GladSense Site Auditor & Policy Doctor',
      url: `${BASE_URL}/#site-doctor`,
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'All',
      browserRequirements: 'Requires JavaScript. Requires HTML5.',
      description: 'Automated 100-point diagnostic scanner evaluating web applications against Google Publisher Policies and Human Search Quality Rater E-E-A-T guidelines.',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
      },
      featureList: [
        '100-Point AdSense Readiness Checklist',
        'Rejection Doctor Diagnostic Scan',
        'AI Footprint & Cliché Density Analysis',
        'DoubleClick DART Cookie Verification',
        '1-Click Policy Safe Remedy Overturn Bundle',
      ],
    },
    {
      '@type': 'WebApplication',
      '@id': `${BASE_URL}/#niche-lab`,
      name: 'GladSense KGR Keyword & Niche Lab',
      url: `${BASE_URL}/#niche-lab`,
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'All',
      browserRequirements: 'Requires JavaScript. Requires HTML5.',
      description: 'Mathematical Keyword Golden Ratio (KGR) calculation suite and low-competition high-RPM niche blueprints for independent digital publishers.',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
    },
    {
      '@type': 'WebApplication',
      '@id': `${BASE_URL}/#revenue-planner`,
      name: 'GladSense AdSense RPM & Profit Planner',
      url: `${BASE_URL}/#revenue-planner`,
      applicationCategory: 'FinanceApplication',
      operatingSystem: 'All',
      browserRequirements: 'Requires JavaScript. Requires HTML5.',
      description: 'Zero-cost edge P&L modeling calculating traffic yield, geo-tier RPM benchmarks, and server hosting unit economics.',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
    },
    {
      '@type': 'WebApplication',
      '@id': `${BASE_URL}/#policy-toolkit`,
      name: 'GladSense 1-Click Policy & ads.txt Generator',
      url: `${BASE_URL}/#policy-toolkit`,
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: 'All',
      browserRequirements: 'Requires JavaScript. Requires HTML5.',
      description: 'Zero-cost client-side generators for IAB Tech Lab ads.txt, GDPR Consent Mode v2, and DoubleClick DART Privacy Policies.',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
    },
    {
      '@type': 'FAQPage',
      '@id': `${BASE_URL}/#faq`,
      mainEntity: [
        {
          '@type': 'Question',
          name: 'How to fix low value content adsense 2026?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'To fix low value content in Google AdSense for 2026: 1) Expand page inventory to at least 15–20 distinct indexed articles or tools with 800+ words of explanatory documentation; 2) Eliminate duplicate boilerplate so text similarity across the domain is under 15%; 3) Add first-party Information Gain (original datasets, comparison tables, or first-hand testing); 4) Run our live Site Doctor auditor to identify thin pages and robotic AI cliché patterns; 5) Add verifiable author credentials with Schema.org Person microdata.',
          },
        },
        {
          '@type': 'Question',
          name: 'How many published pages are needed before applying for Google AdSense?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Informational content blogs require 15 to 20 comprehensive, indexable articles averaging 1,000+ words. Interactive utility web apps require at least 5 to 8 distinct tool views supported by 800+ words of scientific documentation and worked case studies.',
          },
        },
        {
          '@type': 'Question',
          name: 'What causes the "Low Value Content" AdSense rejection in 2026?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Low Value Content flags occur when pages have low Information Gain (fewer than 400 words, generic AI phrasing, or zero unique data tables/calculators). Incorporating interactive micro-tools or verified empirical case studies cures this rejection mode.',
          },
        },
        {
          '@type': 'Question',
          name: 'How do I resolve the "Earnings at risk: ads.txt missing" error?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Deploy an ads.txt file at your domain root (https://yourdomain.com/ads.txt) containing the line: google.com, pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0. Ensure HTTP 200 without redirects and allow 48 hours for Googlebot crawler validation.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is Generative Engine Optimization (GEO)?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'GEO is the process of structuring website data and text using the Princeton 3-Pill framework (What It Is, How To Use It, What You Get) so that modern AI search engines (Google AI Overviews, Perplexity, ChatGPT Search) select and cite the site as their primary verified source.',
          },
        },
      ],
    },
    {
      '@type': 'HowTo',
      '@id': `${BASE_URL}/#howto-audit`,
      name: 'How to Audit and Overturn a Google AdSense Rejection',
      description: 'A 5-step operational protocol to diagnose policy blockers, generate legal compliance pages, and pass Google AdSense inspection.',
      totalTime: 'PT30M',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Run Rejection Doctor Audit',
          text: 'Enter your domain in the GladSense Rejection Doctor scanner to evaluate your site against 100 policy and E-E-A-T criteria.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Identify Critical Blockers',
          text: 'Inspect identified flags such as missing DoubleClick DART cookies, thin word count (<500 words), or broken navigation anchors.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Apply 1-Click Code Remedies',
          text: 'Generate custom privacy-policy.html, about-us.html, ads.txt, and embeddable utility calculators customized for your domain.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Verify Indexation in Google Search Console',
          text: 'Submit updated URLs in Google Search Console and allow 48 to 72 hours for Googlebot to re-index all legal disclosures.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Request AdSense Re-Review',
          text: 'Submit your site for review inside the Google AdSense dashboard with full compliance verified.',
        },
      ],
    },
  ],
};

/**
 * Singleton Schema Guard:
 * Injects or updates the single <script id="gladsense-schema-graph"> in <head>
 * without ever creating duplicate tags during client-side tab navigation.
 */
export function syncSchemaGraphSingleton(): void {
  if (typeof document === 'undefined') return;

  const SCRIPT_ID = 'gladsense-schema-graph';
  let scriptEl = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;

  const jsonContent = JSON.stringify(MASTER_SCHEMA_GRAPH);

  if (!scriptEl) {
    scriptEl = document.createElement('script');
    scriptEl.id = SCRIPT_ID;
    scriptEl.type = 'application/ld+json';
    scriptEl.text = jsonContent;
    document.head.appendChild(scriptEl);
  } else {
    // Already exists - update in place if necessary
    if (scriptEl.text !== jsonContent) {
      scriptEl.text = jsonContent;
    }
  }
}

/**
 * Synchronizes HTML Document Head metadata for SEO, OpenGraph, and Crawler Indexing
 */
export function syncDocumentMetadata(opts: SeoMetadataOptions): void {
  if (typeof document === 'undefined') return;

  // Title
  document.title = opts.title;

  // Meta Description
  let descMeta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
  if (!descMeta) {
    descMeta = document.createElement('meta');
    descMeta.name = 'description';
    document.head.appendChild(descMeta);
  }
  descMeta.content = opts.description;

  // Canonical Link
  const fullCanonical = `${BASE_URL}${opts.canonicalPath}`;
  let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!canonicalLink) {
    canonicalLink = document.createElement('link');
    canonicalLink.rel = 'canonical';
    document.head.appendChild(canonicalLink);
  }
  canonicalLink.href = fullCanonical;

  // Robots Index Directive
  let robotsMeta = document.querySelector('meta[name="robots"]') as HTMLMetaElement | null;
  if (!robotsMeta) {
    robotsMeta = document.createElement('meta');
    robotsMeta.name = 'robots';
    document.head.appendChild(robotsMeta);
  }
  robotsMeta.content = opts.noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large, max-snippet:-1';

  // OpenGraph Tags
  setMetaProperty('og:title', opts.title);
  setMetaProperty('og:description', opts.description);
  setMetaProperty('og:url', fullCanonical);
  setMetaProperty('og:type', opts.ogType || 'website');

  // Twitter Tags
  setMetaName('twitter:title', opts.title);
  setMetaName('twitter:description', opts.description);

  // Sync schema singleton
  syncSchemaGraphSingleton();
}

function setMetaProperty(property: string, content: string): void {
  let el = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute('property', property);
    document.head.appendChild(el);
  }
  el.content = content;
}

function setMetaName(name: string, content: string): void {
  let el = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute('name', name);
    document.head.appendChild(el);
  }
  el.content = content;
}
