import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

export type AppRoute =
  | 'home'
  | 'site-doctor'
  | 'adsense-rpm-calculator'
  | 'kgr-keyword-lab'
  | 'ads-txt-generator'
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

  // Seamless hash migration
  if (hash) {
    if (hash === 'site-doctor') pathname = '/tools/site-doctor/';
    else if (hash === 'niche-lab' || hash === 'kgr' || hash === 'niches') pathname = '/tools/kgr-keyword-lab/';
    else if (hash === 'revenue-planner' || hash === 'calculator' || hash === 'budget') pathname = '/tools/adsense-rpm-calculator/';
    else if (hash === 'policy-toolkit' || hash === 'audit' || hash === 'single-click') pathname = '/tools/ads-txt-generator/';
    else if (hash === 'blog') pathname = '/guides/';
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
    return { route: 'ads-txt-generator', pathname: '/tools/ads-txt-generator/', search, params };
  }

  if (cleanPath === '/guides' || cleanPath === '/guides/') {
    return { route: 'guides', pathname: '/guides/', search, params };
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
