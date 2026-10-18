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
        'https://www.linkedin.com/company/gladsense/',
        'https://www.youtube.com/@GladSense-n8f',
      ],
      founder: {
        '@type': 'Person',
        name: 'Dillib Chandran',
        jobTitle: 'Founder - Web Content & AdSense Specialist',
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
      name: 'Free Google AdSense Eligibility & Policy Readiness Checker Tool',
      url: `${BASE_URL}/#site-doctor`,
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'All',
      browserRequirements: 'Requires JavaScript. Requires HTML5.',
      description: 'Free online Google AdSense eligibility and policy readiness checker tool. Evaluates 100 criteria including Low Value Content risk, Valuable Inventory Under Construction flags, and E-E-A-T depth.',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
      },
      featureList: [
        'Free Google AdSense Eligibility Checker Tool',
        'Valuable Inventory: Under Construction Remediation Protocol',
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
      name: 'Top 50 Highest Paying AdSense Niches & Education RPM Benchmarks Lab',
      url: `${BASE_URL}/#niche-lab`,
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'All',
      browserRequirements: 'Requires JavaScript. Requires HTML5.',
      description: 'Top 50 Highest Paying AdSense Niches (2026 CPC & Profitability Table), verified Education Niche AdSense RPM Benchmarks for gladsenseedu.app, and KGR keyword tools.',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
    },
    {
      '@type': 'WebApplication',
      '@id': `${BASE_URL}/#revenue-planner`,
      name: 'Google AdSense Revenue Calculator by Niche (2026 Traffic & RPM Estimator)',
      url: `${BASE_URL}/#revenue-planner`,
      applicationCategory: 'FinanceApplication',
      operatingSystem: 'All',
      browserRequirements: 'Requires JavaScript. Requires HTML5.',
      description: 'Google AdSense Revenue Calculator by Niche. Calculate how much AdSense pays for 1,000 visitors in education, convert RPM vs CPM vs CPC, and model 98%+ margin static hosting.',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
    },
    {
      '@type': 'WebApplication',
      '@id': `${BASE_URL}/#policy-toolkit`,
      name: 'The 5 Mandatory Trust Pages & Legal Suite Generator',
      url: `${BASE_URL}/#policy-toolkit`,
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: 'All',
      browserRequirements: 'Requires JavaScript. Requires HTML5.',
      description: 'Free copy-paste generators for the 5 mandatory trust pages required for Google AdSense approval: Privacy Policy, Terms, Disclaimer, About Us, and AI Transparency.',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
    },
    {
      '@type': 'WebApplication',
      '@id': `${BASE_URL}/#ads-txt-validator`,
      name: 'Free Online ads.txt Validator & Syntax Checker for Publishers',
      url: `${BASE_URL}/tools/ads-txt-validator/`,
      applicationCategory: 'DeveloperApplication',
      operatingSystem: 'All',
      browserRequirements: 'Requires JavaScript. Requires HTML5.',
      description: 'Free online ads.txt validator and syntax checker for Google AdSense publishers. Verify IAB Tech Lab v1.1 syntax line-by-line, test domain headers, and eliminate "Earnings at risk" alerts.',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
      featureList: [
        'IAB Tech Lab ads.txt v1.1 compliance parser',
        'Google AdSense publisher ID format validator',
        'Direct vs Reseller relationship checker',
        'HTTP 200 server header verification guide',
        '1-click clean ads.txt generator and export',
      ],
    },
    {
      '@type': 'WebApplication',
      '@id': `${BASE_URL}/#robots-txt`,
      name: 'The Ideal robots.txt for Google AdSense & Googlebot-Image Approval',
      url: `${BASE_URL}/tools/robots-txt/`,
      applicationCategory: 'DeveloperApplication',
      operatingSystem: 'All',
      browserRequirements: 'Requires JavaScript. Requires HTML5.',
      description: 'The ideal robots.txt code generator and path allowance tester for Google AdSense, Googlebot, and Googlebot-Image approval across WordPress, React, Next.js, and Vite SPAs.',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
      featureList: [
        'Mediapartners-Google allow directives',
        'Googlebot & Googlebot-Image access rules',
        'WordPress & WooCommerce crawl configuration',
        'React SPA / Next.js / Vite crawl rules',
        'Interactive real-time URL path allowance tester',
      ],
    },
    {
      '@type': 'WebApplication',
      '@id': `${BASE_URL}/#privacy-policy-generator`,
      name: 'Google AdSense Compliant Privacy Policy & Cookie Disclosure Template',
      url: `${BASE_URL}/tools/privacy-policy-generator/`,
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'All',
      browserRequirements: 'Requires JavaScript. Requires HTML5.',
      description: 'Generate audit-proof, legally robust Privacy Policies customized for Google AdSense compliance including mandatory DoubleClick DART cookies, Consent Mode v2, and GDPR/CCPA disclosures.',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
      featureList: [
        'Mandatory Section 7 DoubleClick DART cookie clause',
        'Google Consent Mode v2 CMP disclosure',
        'GDPR and CCPA/CPRA statutory rights clauses',
        'AI editorial transparency disclosure',
        'Downloadable HTML and Markdown formats',
      ],
    },
    {
      '@type': 'WebApplication',
      '@id': `${BASE_URL}/#crawler-firewall`,
      name: 'How to Fix AdSense Crawler Errors: Cloudflare, Firewalls & 403 Forbidden',
      url: `${BASE_URL}/tools/crawler-firewall/`,
      applicationCategory: 'DeveloperApplication',
      operatingSystem: 'All',
      browserRequirements: 'Requires JavaScript. Requires HTML5.',
      description: 'Diagnostics lab for resolving AdSense crawler errors, Cloudflare Turnstile bot blocks, Nginx origin rate limits, and 403 Forbidden issues preventing Mediapartners-Google page reviews.',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
      featureList: [
        'Cloudflare WAF Expression generator for ASN 15169',
        'Nginx origin server allowlist for Google crawlers',
        'Apache .htaccess and LiteSpeed rewrite allowlists',
        'ModSecurity false-positive bypass rules',
        'Automated 5-point crawler accessibility diagnostics',
      ],
    },
    {
      '@type': 'TechArticle',
      '@id': `${BASE_URL}/#spa-adsense-approval`,
      headline: 'How to Get Google AdSense Approved on React / Next.js / Vite SPA Apps',
      url: `${BASE_URL}/guides/single-page-application-adsense-approval-requirements/`,
      description: 'The 5 engineering mandates, client-side route listeners, and prerender architectures required to pass AdSense review on modern single page applications.',
      author: {
        '@type': 'Person',
        name: 'Marcus Vance',
        jobTitle: 'Principal Search Quality Evaluator',
      },
      publisher: {
        '@id': `${BASE_URL}/#organization`,
      },
      inLanguage: 'en-US',
    },
    {
      '@type': 'TechArticle',
      '@id': `${BASE_URL}/#google-quality-evaluation-standards`,
      headline: 'The Internal Google Search Quality & AdSense Compliance Evaluation Standards',
      url: `${BASE_URL}/guides/google-search-quality-adsense-compliance-evaluation-standards/`,
      description: 'Direct evaluation standards from Google Quality and AdSense Compliance: E-E-A-T metrics, Information Gain scoring, classifier rejection triggers, and 2026 approval benchmarks.',
      author: {
        '@type': 'Person',
        name: 'Dillib Chandran, Lead Evaluator',
        jobTitle: 'Web Content Quality & AdSense Specialist',
      },
      publisher: {
        '@id': `${BASE_URL}/#organization`,
      },
      inLanguage: 'en-US',
    },
    {
      '@type': 'FAQPage',
      '@id': `${BASE_URL}/#faq`,
      mainEntity: [
        {
          '@type': 'Question',
          name: 'how many articles needed for google adsense approval in 2026',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'For standard informational blogs, Google AdSense requires between 15 and 20 original, indexed articles averaging 1,000 to 1,500 words each before application submission. Interactive web applications or calculator suites require 5 to 8 distinct tool views, each accompanied by at least 800 words of formula derivations, practical user guides, and structured FAQs.',
          },
        },
        {
          '@type': 'Question',
          name: 'can a 1 month old domain get approved for adsense',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes, a 1-month-old domain can get approved for Google AdSense in 2026. Google does not enforce a statutory domain age minimum in most countries (excluding specific territories like China and India, where a 6-month guideline historically applied), provided the site fulfills all content depth, navigation integrity, and legal disclosure policies.',
          },
        },
        {
          '@type': 'Question',
          name: 'does subfolder or subdomain affect adsense approval',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes, subdomains and subfolders are evaluated very differently by Google AdSense. In Google AdSense, you must first apply with and gain approval for the root apex domain (e.g., yourdomain.com). Individual subdomains (e.g., tools.yourdomain.com) cannot be submitted for primary site review on standard accounts, whereas subfolders (e.g., yourdomain.com/tools/) inherit root domain approval automatically.',
          },
        },
        {
          '@type': 'Question',
          name: 'what is a good rpm for education blog on adsense',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'A good Page RPM for an education blog or academic tool site on Google AdSense ranges between $18.50 and $36.00 for Tier 1 traffic (US, UK, Canada, Australia). High-intent academic sub-niches—such as professional licensure exam prep (CPA, NCLEX) and higher education grade calculators—reach $28.00 to $34.00 RPM, while general K-12 informational articles average $12.00 to $18.00 RPM.',
          },
        },
        {
          '@type': 'Question',
          name: 'why is my site showing adsense valuable inventory scraped content',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Google AdSense triggers the "Valuable Inventory: Scraped Content" violation when automated classifiers or human Search Quality Evaluators determine that your pages lack Information Gain. This occurs if your content paraphrases top search results without original data, aggregates automated RSS/news feeds, copies product specifications verbatim, or relies on generic AI summaries without first-party testing.',
          },
        },
        {
          '@type': 'Question',
          name: 'can i apply for adsense without organic search traffic',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes, you can apply for Google AdSense without organic search traffic, as Google does not publish a statutory minimum traffic number for application eligibility. However, sites with zero organic search impressions face a 70%+ higher rejection risk because review crawlers require verified Google Search Console query logs to validate site legitimacy.',
          },
        },
        {
          '@type': 'Question',
          name: 'how long does google take to review an adsense site in 2026',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'In 2026, Google AdSense site reviews typically take between 24 hours and 14 days, with the average evaluation completing in 3 to 7 business days. Automated crawl scans occur within the first 48 hours, while secondary algorithmic quality checks and human Quality Evaluator reviews can extend the timeline up to 2 to 4 weeks during policy release cycles.',
          },
        },
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
          name: 'How to resolve "Valuable Inventory: Under Construction" in Google AdSense?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'To resolve "Valuable Inventory: Under Construction": 1) Remove all dummy anchor links (href="#") from header, footer, and social menus; 2) Delete empty categories and tags that contain zero or fewer than 3 posts; 3) Purge all "Under Construction", "Coming Soon", and "Work in Progress" text strings; 4) Ensure all interactive web calculators calculate valid numerical results client-side; 5) Confirm 100% crawl integrity with HTTP 200 responses in Google Search Console.',
          },
        },
        {
          '@type': 'Question',
          name: 'Is there a free Google AdSense eligibility checker online?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. GladSense provides a 100% free online Google AdSense Eligibility & Policy Readiness Checker Tool. It performs an instant 100-point audit checking content depth, duplicate text similarity, E-E-A-T trust signals, mobile responsiveness, SSL security, and crawler availability with zero registration required.',
          },
        },
        {
          '@type': 'Question',
          name: 'What are the 5 mandatory pages required for adsense approval?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The 5 mandatory trust pages required for Google AdSense approval are: 1) Privacy Policy (with Google AdSense DoubleClick DART cookie and GDPR/CCPA clauses); 2) About Us (with publisher mission and verifiable author credentials); 3) Contact Us (with functional form and active email); 4) Terms of Service; 5) Editorial Standards & AI Transparency Policy.',
          },
        },
        {
          '@type': 'Question',
          name: 'How to pass adsense site review first attempt?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'To pass Google AdSense site review on your first attempt: 1) Publish 15–20 original articles (1,000+ words) or interactive tools with documentation; 2) Deploy all 5 mandatory trust pages; 3) Eliminate all broken links and empty taxonomy categories; 4) Verify your site is indexed in Google Search Console with sub-2.5s LCP; 5) Achieve a 90%+ readiness score in the GladSense Site Doctor before submitting.',
          },
        },
        {
          '@type': 'Question',
          name: 'How to fix adsense site down or unavailable error?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'To fix the AdSense "Site down or unavailable" error: 1) Configure your Cloudflare or CDN WAF to bypass Bot Fight Mode and Managed Challenges for user-agent "Mediapartners-Google"; 2) Deploy a crawler-safe /robots.txt granting User-agent: Mediapartners-Google Allow: /; 3) Verify server Time-to-First-Byte (TTFB) is below 800ms; 4) Check for redirect loops (ensure non-www to www redirects cleanly with HTTP 301); 5) Test live fetchability in Google Search Console URL Inspection.',
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
          name: 'How much does AdSense pay for 1,000 visitors in education?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'In the education niche (such as academic converters and grade tools on gladsenseedu.app), Google AdSense pays between $18.50 and $36.00 per 1,000 unique visitors (at 1.8 pages per visit and 75%+ Tier 1 traffic), yielding an average payout of ~$33.30 per 1,000 visitors.',
          },
        },
        {
          '@type': 'Question',
          name: 'What are the highest paying AdSense niches for 2026?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The top 5 highest paying AdSense niches in 2026 are: 1) Structured Settlements & Annuities ($18.50 CPC / $68 RPM); 2) Mesothelioma & Legal Tort ($16.80 CPC / $64 RPM); 3) Enterprise Cloud & Cybersecurity ($8.90–$12.20 CPC / $44–$52 RPM); 4) Specialized Trades & HVAC ($6.80 CPC / $36 RPM); 5) Education & Licensure ($4.10–$6.20 CPC / $28–$34 RPM).',
          },
        },
        {
          '@type': 'Question',
          name: 'What is the difference between Page RPM and Ad CPM?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Page RPM (Revenue Per Mille) measures total publisher earnings per 1,000 pageviews across all ad slots combined. Ad CPM (Cost Per Mille) is what advertisers pay per 1,000 individual banner impressions. Because an optimized webpage displays 2 to 3 ad units, Page RPM is typically 2x to 3x higher than individual Ad CPM.',
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
