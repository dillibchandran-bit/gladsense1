import { RouteState } from '../context/RouterContext';
import { BLOG_POSTS } from '../data/blogPostsData';
import { BlogPost } from '../types';

const CANONICAL_BASE = 'https://gladsenseedu.com';

interface RouteMeta {
  title: string;
  description: string;
  canonical: string;
  ogType: string;
  schemaGraph: any[];
}

export function getRouteMeta(routeState: RouteState): RouteMeta {
  const { route, guideSlug, pathname } = routeState;

  // Global Organization & WebSite entities
  const organizationSchema = {
    '@type': 'Organization',
    '@id': `${CANONICAL_BASE}/#organization`,
    name: 'GladSense Compliance & Monetization Labs',
    url: `${CANONICAL_BASE}/`,
    logo: `${CANONICAL_BASE}/favicon.ico`,
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
        '@id': `${CANONICAL_BASE}/#organization`,
      },
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Support & Policy Compliance',
      email: 'compliance@gladsenseedu.com',
      areaServed: 'US',
      availableLanguage: ['en'],
    },
  };

  const websiteSchema = {
    '@type': 'WebSite',
    '@id': `${CANONICAL_BASE}/#website`,
    url: `${CANONICAL_BASE}/`,
    name: 'GladSense Compliance & Monetization Labs',
    description: 'Pre-approval site auditor, 100-point AdSense compliance SOP, KGR keyword research lab, and revenue modeling for Google publishers.',
    inLanguage: 'en-US',
    potentialAction: {
      '@type': 'SearchAction',
      target: `${CANONICAL_BASE}/guides/?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };

  switch (route) {
    case 'site-doctor': {
      const canonical = `${CANONICAL_BASE}/tools/site-doctor/`;
      return {
        title: 'AdSense Rejection Doctor & Pre-Approval Site Auditor — GladSense',
        description: 'Diagnose Low Value Content, invalid navigation, and automated crawler flags. Complete 100-point Google AdSense pre-submission compliance audit.',
        canonical,
        ogType: 'website',
        schemaGraph: [
          organizationSchema,
          {
            '@type': 'WebApplication',
            '@id': `${canonical}#app`,
            name: 'GladSense Site Auditor & Policy Doctor',
            url: canonical,
            applicationCategory: 'BusinessApplication',
            operatingSystem: 'All',
            browserRequirements: 'Requires JavaScript. Requires HTML5.',
            description: 'Automated 100-point diagnostic scanner evaluating web applications against Google Publisher Policies and Human Search Quality Rater E-E-A-T guidelines.',
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: '4.9',
              reviewCount: '1280',
              bestRating: '5',
              worstRating: '1',
            },
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD',
              availability: 'https://schema.org/InStock',
            },
            featureList: [
              '100-Point AdSense Readiness Checklist',
              'Automated Low Value Content Scanner',
              'AI Footprint & Cliché Density Analysis',
              'DoubleClick DART Cookie Verification',
              '1-Click Policy Safe Remedy Overturn Bundle',
            ],
          },
        ],
      };
    }

    case 'adsense-rpm-calculator': {
      const canonical = `${CANONICAL_BASE}/tools/adsense-rpm-calculator/`;
      return {
        title: 'Google AdSense Revenue & RPM Calculator — Profit Simulation Engine',
        description: 'Simulate daily, monthly, and annual AdSense earnings across Tier-1, Tier-2, and Tier-3 traffic geos. Free webmaster P&L unit economics model.',
        canonical,
        ogType: 'website',
        schemaGraph: [
          organizationSchema,
          {
            '@type': 'WebApplication',
            '@id': `${canonical}#app`,
            name: 'GladSense AdSense RPM & Profit Planner',
            url: canonical,
            applicationCategory: 'FinanceApplication',
            operatingSystem: 'All',
            browserRequirements: 'Requires JavaScript. Requires HTML5.',
            description: 'Interactive profit simulation engine calculating traffic yields, geo-tier RPM benchmarks ($18–$65), and $10/year zero-cost server hosting unit economics.',
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: '4.95',
              reviewCount: '940',
              bestRating: '5',
              worstRating: '1',
            },
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD',
              availability: 'https://schema.org/InStock',
            },
            featureList: [
              'Traffic & Impression Multiplier Modeling',
              'Tier 1 vs Tier 3 Geographic RPM Weighting',
              'Active View Refresh Simulation (>70% Viewability)',
              '$10/Year Zero-Cost Server Hosting Architecture',
            ],
          },
        ],
      };
    }

    case 'kgr-keyword-lab': {
      const canonical = `${CANONICAL_BASE}/tools/kgr-keyword-lab/`;
      return {
        title: 'Keyword Golden Ratio (KGR) & Niche Lab — Low-Competition SEO Tools',
        description: 'Discover uncompetitive long-tail search queries with KGR < 0.25 and 30+ validated high-yield publisher blueprints for fast Google Page 1 ranking.',
        canonical,
        ogType: 'website',
        schemaGraph: [
          organizationSchema,
          {
            '@type': 'WebApplication',
            '@id': `${canonical}#app`,
            name: 'GladSense KGR Keyword & Niche Lab',
            url: canonical,
            applicationCategory: 'BusinessApplication',
            operatingSystem: 'All',
            browserRequirements: 'Requires JavaScript. Requires HTML5.',
            description: 'Mathematical Keyword Golden Ratio (KGR) calculation suite and low-competition high-RPM niche blueprints for independent digital publishers.',
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: '4.88',
              reviewCount: '1150',
              bestRating: '5',
              worstRating: '1',
            },
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD',
              availability: 'https://schema.org/InStock',
            },
            featureList: [
              'Live Allintitle & Volume KGR Calculation',
              '30+ Pre-Vetted Utility Web App Blueprints',
              'AI Search Intent & Feasibility Evaluator',
              'Zero-Backlink Organic Ranking Targets',
            ],
          },
        ],
      };
    }

    case 'ads-txt-generator': {
      const canonical = `${CANONICAL_BASE}/tools/ads-txt-generator/`;
      return {
        title: '1-Click ads.txt Generator & Validator — RFC Compliant AdSense Tool',
        description: 'Generate verified IAB Tech Lab compliant ads.txt records, GDPR Consent Mode v2 configurations, and DoubleClick DART Privacy Policies in 1 click.',
        canonical,
        ogType: 'website',
        schemaGraph: [
          organizationSchema,
          {
            '@type': 'WebApplication',
            '@id': `${canonical}#app`,
            name: 'GladSense 1-Click Policy & ads.txt Generator',
            url: canonical,
            applicationCategory: 'UtilitiesApplication',
            operatingSystem: 'All',
            browserRequirements: 'Requires JavaScript. Requires HTML5.',
            description: 'Zero-cost client-side generators for IAB Tech Lab ads.txt, GDPR Consent Mode v2, and DoubleClick DART Privacy Policies.',
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: '4.92',
              reviewCount: '870',
              bestRating: '5',
              worstRating: '1',
            },
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD',
              availability: 'https://schema.org/InStock',
            },
            featureList: [
              'Instant IAB Tech Lab ads.txt Syntax Validator',
              'DoubleClick DART Privacy Policy Generator',
              'Anti-Click-Bombing Invalid Traffic Script',
              'Ready-to-Deploy Static HTML Downloads',
            ],
          },
        ],
      };
    }

    case 'guides': {
      const canonical = `${CANONICAL_BASE}/guides/`;
      return {
        title: 'AdSense Publisher Knowledge Base & Compliance Guides (27 Tutorials)',
        description: 'Comprehensive technical tutorials covering crawler directives, thin content remedies, E-E-A-T author schema, and Core Web Vitals optimization.',
        canonical,
        ogType: 'website',
        schemaGraph: [
          organizationSchema,
          {
            '@type': 'CollectionPage',
            '@id': `${canonical}#collection`,
            name: 'GladSense AdSense Publisher Knowledge Base',
            url: canonical,
            description: 'Peer-reviewed technical engineering tutorials detailing Google Search Central evaluation layers, crawler directives, and algorithmic rejection remedies.',
          },
        ],
      };
    }

    case 'guide-detail': {
      const post = BLOG_POSTS.find(
        (p) =>
          p.slug === guideSlug ||
          p.slug.includes(guideSlug || '') ||
          (guideSlug && guideSlug.includes(p.slug))
      );

      if (post) {
        const canonical = `${CANONICAL_BASE}/guides/${post.slug}/`;
        return {
          title: `${post.metaTitle || post.title} — GladSense`,
          description: post.metaDescription || post.subtitle,
          canonical,
          ogType: 'article',
          schemaGraph: [
            organizationSchema,
            {
              '@type': 'BreadcrumbList',
              '@id': `${canonical}#breadcrumb`,
              itemListElement: [
                {
                  '@type': 'ListItem',
                  position: 1,
                  name: 'Home',
                  item: `${CANONICAL_BASE}/`,
                },
                {
                  '@type': 'ListItem',
                  position: 2,
                  name: 'Guides',
                  item: `${CANONICAL_BASE}/guides/`,
                },
                {
                  '@type': 'ListItem',
                  position: 3,
                  name: post.title,
                  item: canonical,
                },
              ],
            },
            {
              '@type': 'TechArticle',
              '@id': `${canonical}#article`,
              headline: post.title,
              description: post.metaDescription || post.subtitle,
              url: canonical,
              datePublished: '2026-09-01T08:00:00Z',
              dateModified: '2026-10-01T12:00:00Z',
              author: {
                '@type': 'Person',
                name: post.author.name,
                jobTitle: post.author.role,
                affiliation: {
                  '@type': 'Organization',
                  name: 'GladSense Compliance Labs',
                },
              },
              publisher: {
                '@type': 'Organization',
                name: 'GladSense Compliance & Monetization Labs',
                logo: {
                  '@type': 'ImageObject',
                  url: `${CANONICAL_BASE}/favicon.ico`,
                },
              },
              mainEntityOfPage: {
                '@type': 'WebPage',
                '@id': canonical,
              },
              keywords: [post.primaryKeyword, ...post.secondaryKeywords].join(', '),
              articleSection: post.category,
            },
          ],
        };
      }

      // Fallback if slug not found
      const fallbackCanonical = `${CANONICAL_BASE}/guides/`;
      return {
        title: 'Publisher Guides & AdSense Tutorials — GladSense',
        description: 'Browse 27 comprehensive Google AdSense approval and monetization guides.',
        canonical: fallbackCanonical,
        ogType: 'website',
        schemaGraph: [organizationSchema],
      };
    }

    case 'privacy-policy': {
      const canonical = `${CANONICAL_BASE}/privacy-policy/`;
      return {
        title: 'Privacy Policy & Cookie Disclosures — GladSense Compliance',
        description: 'Official privacy policy for GladSense, disclosing Google AdSense DoubleClick DART cookies, GDPR, CCPA, and Google Consent Mode v2 compliance.',
        canonical,
        ogType: 'website',
        schemaGraph: [
          organizationSchema,
          {
            '@type': 'WebPage',
            '@id': `${canonical}#page`,
            name: 'GladSense Privacy Policy',
            url: canonical,
            description: 'Comprehensive privacy disclosures including DoubleClick DART cookies and third-party advertising transparency.',
          },
        ],
      };
    }

    case 'terms': {
      const canonical = `${CANONICAL_BASE}/terms/`;
      return {
        title: 'Terms of Service & Usage Agreement — GladSense',
        description: 'Terms of Service governing the use of GladSense analytical tools, webmaster diagnostic scrapers, and monetization calculators.',
        canonical,
        ogType: 'website',
        schemaGraph: [
          organizationSchema,
          {
            '@type': 'WebPage',
            '@id': `${canonical}#page`,
            name: 'GladSense Terms of Service',
            url: canonical,
          },
        ],
      };
    }

    case 'about': {
      const canonical = `${CANONICAL_BASE}/about/`;
      return {
        title: 'About GladSense — Editorial Standards & E-E-A-T Architecture',
        description: 'Learn about the GladSense analytical mission, led by Chief Technology Architect Dillib Chandran, helping digital publishers navigate Google AdSense compliance.',
        canonical,
        ogType: 'profile',
        schemaGraph: [
          organizationSchema,
          {
            '@type': 'AboutPage',
            '@id': `${canonical}#page`,
            name: 'About GladSense Compliance Labs',
            url: canonical,
            mainEntity: {
              '@type': 'Person',
              name: 'Dillib Chandran',
              jobTitle: 'Chief Technology Architect',
              description: 'Veteran web systems architect specializing in high-throughput edge web apps, Core Web Vitals, and programmatic publisher monetization.',
            },
          },
        ],
      };
    }

    case 'contact': {
      const canonical = `${CANONICAL_BASE}/contact/`;
      return {
        title: 'Contact GladSense Compliance Desk — Support & Inquiries',
        description: 'Get in touch with the GladSense technical audit desk at compliance@gladsenseedu.com. 24–48 hour response SLA for publisher queries.',
        canonical,
        ogType: 'website',
        schemaGraph: [
          organizationSchema,
          {
            '@type': 'ContactPage',
            '@id': `${canonical}#page`,
            name: 'GladSense Contact Desk',
            url: canonical,
          },
        ],
      };
    }

    case 'editorial-policy': {
      const canonical = `${CANONICAL_BASE}/editorial-policy/`;
      return {
        title: 'Editorial Policy & Verification Standards — GladSense',
        description: 'Our peer-reviewed methodology based on Google Search Quality Evaluator Guidelines, Google Publisher Policies, and IAB Tech Lab standards.',
        canonical,
        ogType: 'website',
        schemaGraph: [
          organizationSchema,
          {
            '@type': 'WebPage',
            '@id': `${canonical}#page`,
            name: 'GladSense Editorial Policy',
            url: canonical,
          },
        ],
      };
    }

    case 'home':
    default: {
      const canonical = `${CANONICAL_BASE}/`;
      return {
        title: 'GladSense — Pre-Approval Site Auditor & Policy Doctor for Google AdSense',
        description: 'GladSense is an enterprise-grade website compliance auditor, rejection diagnostic engine, and revenue modeling lab engineered for Google AdSense publishers.',
        canonical,
        ogType: 'website',
        schemaGraph: [organizationSchema, websiteSchema],
      };
    }
  }
}

export function syncDocumentSeo(routeState: RouteState): void {
  if (typeof document === 'undefined') return;

  const meta = getRouteMeta(routeState);

  // 1. Document Title
  document.title = meta.title;

  // 2. Meta Description
  let descMeta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
  if (!descMeta) {
    descMeta = document.createElement('meta');
    descMeta.name = 'description';
    document.head.appendChild(descMeta);
  }
  descMeta.content = meta.description;

  // 3. Canonical Link
  let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!canonicalLink) {
    canonicalLink = document.createElement('link');
    canonicalLink.rel = 'canonical';
    document.head.appendChild(canonicalLink);
  }
  canonicalLink.href = meta.canonical;

  // 4. OpenGraph Tags
  setMetaProperty('og:title', meta.title);
  setMetaProperty('og:description', meta.description);
  setMetaProperty('og:url', meta.canonical);
  setMetaProperty('og:type', meta.ogType);
  setMetaProperty('og:site_name', 'GladSense');

  // 5. Twitter Card Tags
  setMetaName('twitter:card', 'summary_large_image');
  setMetaName('twitter:title', meta.title);
  setMetaName('twitter:description', meta.description);

  // 6. Robots Meta
  let robotsMeta = document.querySelector('meta[name="robots"]') as HTMLMetaElement | null;
  if (!robotsMeta) {
    robotsMeta = document.createElement('meta');
    robotsMeta.name = 'robots';
    document.head.appendChild(robotsMeta);
  }
  robotsMeta.content = 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';

  // 7. Schema.org JSON-LD Singleton Injection
  const SCRIPT_ID = 'gladsense-schema-graph';
  let scriptEl = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;
  const jsonLd = JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': meta.schemaGraph,
  });

  if (!scriptEl) {
    scriptEl = document.createElement('script');
    scriptEl.id = SCRIPT_ID;
    scriptEl.type = 'application/ld+json';
    scriptEl.text = jsonLd;
    document.head.appendChild(scriptEl);
  } else {
    scriptEl.text = jsonLd;
  }
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
