import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

export type AppRoute =
  | 'home'
  | 'site-doctor'
  | 'adsense-rpm-calculator'
  | 'kgr-keyword-lab'
  | 'ads-txt-generator'
  | 'robots-txt'
  | 'privacy-policy-generator'
  | 'crawler-firewall'
  | 'faq'
  | 'guides'
  | 'guide-detail'
  | 'privacy-policy'
  | 'terms'
  | 'about'
  | 'contact'
  | 'editorial-policy';

export interface RouteState {
  route: AppRoute;
  pathname: string;
  search: string;
  params: Record<string, string>;
  guideSlug?: string;
  techTool?: 'ads-txt' | 'robots-txt' | 'privacy-policy';
}

interface RouterContextType {
  state: RouteState;
  navigate: (to: string, options?: { replace?: boolean }) => void;
}

const RouterContext = createContext<RouterContextType | undefined>(undefined);

export function parseLocation(): RouteState {
  if (typeof window === 'undefined') {
    return {
      route: 'home',
      pathname: '/',
      search: '',
      params: {},
    };
  }

  // Check if there is an old hash fragment to migrate
  const hash = window.location.hash.replace(/^#/, '');
  let pathname = window.location.pathname;
  const search = window.location.search;

  // Seamless hash migration for legacy and shared URLs
  if (hash) {
    if (hash === 'site-doctor') pathname = '/tools/site-doctor/';
    else if (hash === 'crawler-firewall' || hash === 'firewall' || hash === '403-forbidden') pathname = '/tools/crawler-firewall/';
    else if (hash === 'quality-matrix' || hash === 'quality-rater') pathname = '/tools/quality-rater-matrix/';
    else if (hash === 'ad-simulator' || hash === 'ad-placement' || hash === 'ad-layout') pathname = '/tools/ad-placement-simulator/';
    else if (hash === 'ymyl' || hash === 'ymyl-analyzer') pathname = '/tools/ymyl-difficulty-analyzer/';
    else if (hash === 'niche-lab' || hash === 'kgr' || hash === 'niches') pathname = '/tools/kgr-keyword-lab/';
    else if (hash === 'revenue-planner' || hash === 'calculator' || hash === 'budget') pathname = '/tools/adsense-rpm-calculator/';
    else if (hash === 'ads-txt-validator' || hash === 'ads-txt' || hash === 'ads.txt') pathname = '/tools/ads-txt-validator/';
    else if (hash === 'robots-txt' || hash === 'robots.txt') pathname = '/tools/robots-txt/';
    else if (hash === 'privacy-policy-generator' || hash === 'privacy-generator') pathname = '/tools/privacy-policy-generator/';
    else if (hash === 'policy-toolkit' || hash === 'audit' || hash === 'single-click') pathname = '/tools/ads-txt-generator/';
    else if (hash === 'spa-adsense' || hash === 'spa-approval' || hash === 'single-page-application-adsense-approval-requirements' || hash === 'blog-single-page-application-adsense-approval-requirements') pathname = '/guides/single-page-application-adsense-approval-requirements/';
    else if (hash === 'evaluation-standards' || hash === 'google-quality' || hash === 'adsense-compliance' || hash === 'google-search-quality-adsense-compliance-evaluation-standards') pathname = '/guides/google-search-quality-adsense-compliance-evaluation-standards/';
    else if (hash === 'faq' || hash === 'faqs' || hash === 'paa' || hash === 'people-also-ask' || hash === 'questions') pathname = '/faq/';
    else if (hash.startsWith('blog-')) pathname = `/guides/${hash.replace(/^blog-/, '')}/`;
    else if (hash === 'blog' || hash === 'guides') pathname = '/guides/';
    else if (hash === 'privacy-policy') pathname = '/privacy-policy/';
    else if (hash === 'terms-of-service' || hash === 'terms') pathname = '/terms/';
    else if (hash === 'about-us' || hash === 'about') pathname = '/about/';
    else if (hash === 'contact') pathname = '/contact/';
    else if (hash === 'editorial-policy') pathname = '/editorial-policy/';

    // Update browser URL without reload to clean hash
    window.history.replaceState(null, '', `${pathname}${search}`);
  }

  // Parse search params
  const urlParams = new URLSearchParams(search);
  const params: Record<string, string> = {};
  urlParams.forEach((val, key) => {
    params[key] = val;
  });

  // Normalize pathname: ensure leading slash, remove duplicate slashes
  const cleanPath = pathname.replace(/\/+/g, '/');

  // Match routes
  if (cleanPath === '/' || cleanPath === '') {
    return { route: 'home', pathname: '/', search, params };
  }

  // Technical Webmaster & Crawl Diagnostics Routes
  if (cleanPath.startsWith('/tools/crawler-firewall') || cleanPath.startsWith('/tools/site-doctor/crawler-firewall')) {
    return { route: 'crawler-firewall', pathname: '/tools/crawler-firewall/', search, params };
  }

  if (cleanPath.startsWith('/tools/quality-rater-matrix')) {
    return { route: 'site-doctor', pathname: '/tools/quality-rater-matrix/', search, params: { ...params, mode: 'quality-matrix' } };
  }

  if (cleanPath.startsWith('/tools/ad-placement-simulator') || cleanPath.startsWith('/tools/ad-layout-simulator')) {
    return { route: 'ads-txt-generator', pathname: '/tools/ad-placement-simulator/', search, params: { ...params, subTab: 'ad-simulator' } };
  }

  if (cleanPath.startsWith('/tools/ymyl-analyzer') || cleanPath.startsWith('/tools/ymyl-difficulty-analyzer')) {
    return { route: 'kgr-keyword-lab', pathname: '/tools/ymyl-difficulty-analyzer/', search, params: { ...params, subTab: 'ymyl-analyzer' } };
  }

  if (cleanPath.startsWith('/tools/ads-txt-validator') || cleanPath === '/tools/ads-txt' || cleanPath === '/tools/ads-txt/') {
    return { route: 'ads-txt-generator', pathname: '/tools/ads-txt-validator/', search, params, techTool: 'ads-txt' };
  }

  if (cleanPath.startsWith('/tools/robots-txt')) {
    return { route: 'robots-txt', pathname: '/tools/robots-txt/', search, params, techTool: 'robots-txt' };
  }

  if (cleanPath.startsWith('/tools/privacy-policy-generator')) {
    return { route: 'privacy-policy-generator', pathname: '/tools/privacy-policy-generator/', search, params, techTool: 'privacy-policy' };
  }

  if (cleanPath.startsWith('/tools/site-doctor')) {
    return { route: 'site-doctor', pathname: '/tools/site-doctor/', search, params };
  }

  if (cleanPath.startsWith('/tools/adsense-rpm-calculator')) {
    return { route: 'adsense-rpm-calculator', pathname: '/tools/adsense-rpm-calculator/', search, params };
  }

  if (cleanPath.startsWith('/tools/kgr-keyword-lab')) {
    return { route: 'kgr-keyword-lab', pathname: '/tools/kgr-keyword-lab/', search, params };
  }

  if (cleanPath.startsWith('/tools/ads-txt-generator')) {
    return { route: 'ads-txt-generator', pathname: '/tools/ads-txt-generator/', search, params, techTool: 'ads-txt' };
  }

  if (cleanPath === '/guides' || cleanPath === '/guides/') {
    return { route: 'guides', pathname: '/guides/', search, params };
  }

  if (cleanPath.startsWith('/faq') || cleanPath.startsWith('/paa') || cleanPath.startsWith('/questions')) {
    return { route: 'faq', pathname: '/faq/', search, params };
  }

  if (cleanPath.startsWith('/guides/')) {
    const slug = cleanPath.replace(/^\/guides\//, '').replace(/\/$/, '');
    if (slug) {
      return { route: 'guide-detail', pathname: cleanPath, search, params, guideSlug: slug };
    }
    return { route: 'guides', pathname: '/guides/', search, params };
  }

  if (cleanPath.startsWith('/privacy-policy')) {
    return { route: 'privacy-policy', pathname: '/privacy-policy/', search, params };
  }

  if (cleanPath.startsWith('/terms')) {
    return { route: 'terms', pathname: '/terms/', search, params };
  }

  if (cleanPath.startsWith('/about')) {
    return { route: 'about', pathname: '/about/', search, params };
  }

  if (cleanPath.startsWith('/contact')) {
    return { route: 'contact', pathname: '/contact/', search, params };
  }

  if (cleanPath.startsWith('/editorial-policy')) {
    return { route: 'editorial-policy', pathname: '/editorial-policy/', search, params };
  }

  // Default fallback to home
  return { route: 'home', pathname: cleanPath, search, params };
}

export const RouterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<RouteState>(() => parseLocation());

  useEffect(() => {
    const handlePopState = () => {
      setState(parseLocation());
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = useCallback((to: string, options?: { replace?: boolean }) => {
    if (typeof window === 'undefined') return;

    if (options?.replace) {
      window.history.replaceState(null, '', to);
    } else {
      window.history.pushState(null, '', to);
    }

    setState(parseLocation());
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <RouterContext.Provider value={{ state, navigate }}>
      {children}
    </RouterContext.Provider>
  );
};

export function useAppRouter() {
  const ctx = useContext(RouterContext);
  if (!ctx) {
    throw new Error('useAppRouter must be used within a RouterProvider');
  }
  return ctx;
}
