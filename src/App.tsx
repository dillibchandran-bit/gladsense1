/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Niche, AuditItem } from './types';
import { ADSENSE_READINESS_CHECKLIST } from './data/nichesData';
import { Navbar, NavTabType } from './components/Navbar';
import { SiteAuditor } from './components/SiteAuditor';
import { CookieConsent } from './components/CookieConsent';
import { MobileDiscoveryBar } from './components/MobileDiscoveryBar';
import { MobileBottomNav } from './components/MobileBottomNav';
import { GladSenseSocialLinks } from './components/GladSenseSocialLinks';
import { useSeoMetadata } from './hooks/useSeoMetadata';
import { useAppRouter } from './context/RouterContext';
import { GuideDetailPage } from './pages/GuideDetailPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsPage } from './pages/TermsPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { EditorialPolicyPage } from './pages/EditorialPolicyPage';

// Code-split and lazy-load secondary calculation engines, generator suites, and legal modals
const NicheKeywordLab = React.lazy(() =>
  import('./components/NicheKeywordLab').then((m) => ({ default: m.NicheKeywordLab }))
);
const RevenueProfitPlanner = React.lazy(() =>
  import('./components/RevenueProfitPlanner').then((m) => ({ default: m.RevenueProfitPlanner }))
);
const PolicyToolkit = React.lazy(() =>
  import('./components/PolicyToolkit').then((m) => ({ default: m.PolicyToolkit }))
);
const BlogHub = React.lazy(() =>
  import('./components/BlogHub').then((m) => ({ default: m.BlogHub }))
);
const NicheDetailModal = React.lazy(() =>
  import('./components/NicheDetailModal').then((m) => ({ default: m.NicheDetailModal }))
);
const LegalModal = React.lazy(() =>
  import('./components/LegalModal').then((m) => ({ default: m.LegalModal }))
);
const PeopleAlsoAskFaqSuite = React.lazy(() =>
  import('./components/PeopleAlsoAskFaqSuite').then((m) => ({ default: m.PeopleAlsoAskFaqSuite }))
);

const SuiteSuspenseFallback: React.FC = () => (
  <div className="max-w-7xl mx-auto px-4 py-24 flex flex-col items-center justify-center text-center space-y-4">
    <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200/60 flex items-center justify-center text-[#1a73e8] shadow-xs">
      <div className="w-6 h-6 border-2 border-[#1a73e8] border-t-transparent rounded-full animate-spin" />
    </div>
    <div className="space-y-1">
      <h3 className="text-sm font-bold text-slate-800 font-['Google_Sans',sans-serif]">Loading Isolated Suite...</h3>
      <p className="text-xs text-slate-500">Fetching protected analytical assets and algorithms</p>
    </div>
  </div>
);

export default function App() {
  const { state, navigate } = useAppRouter();
  const [activeTab, setActiveTab] = useState<NavTabType>('site-doctor');
  const [legalModalType, setLegalModalType] = useState<'privacy' | 'terms' | 'about' | 'contact' | null>(null);
  const [showCookiePreferences, setShowCookiePreferences] = useState<boolean>(false);

  const [selectedNiche, setSelectedNiche] = useState<Niche | null>(null);
  const [calculatorRpm, setCalculatorRpm] = useState<number>(22);

  // Sync activeTab whenever router state changes
  useEffect(() => {
    if (state.route === 'site-doctor' || state.route === 'crawler-firewall' || state.route === 'home') {
      setActiveTab('site-doctor');
    } else if (state.route === 'kgr-keyword-lab') {
      setActiveTab('niche-lab');
    } else if (state.route === 'adsense-rpm-calculator') {
      setActiveTab('revenue-planner');
    } else if (
      state.route === 'ads-txt-generator' ||
      state.route === 'robots-txt' ||
      state.route === 'privacy-policy-generator'
    ) {
      setActiveTab('policy-toolkit');
    } else if (state.route === 'guides') {
      setActiveTab('blog');
    }
  }, [state.route]);

  // Persistent Audit Checklist
  const [checklist, setChecklist] = useState<AuditItem[]>(() => {
    const saved = localStorage.getItem('adsense_audit_checklist');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved checklist', e);
      }
    }
    return ADSENSE_READINESS_CHECKLIST;
  });

  useEffect(() => {
    localStorage.setItem('adsense_audit_checklist', JSON.stringify(checklist));
  }, [checklist]);

  const handleToggleAuditItem = (id: string) => {
    setChecklist((prev) =>
      prev.map((item) => (item.id === id ? { ...item, isPassed: !item.isPassed } : item))
    );
  };

  const handleSimulateInCalculator = (rpm: number) => {
    setCalculatorRpm(rpm);
    setActiveTab('revenue-planner');
    navigate('/tools/adsense-rpm-calculator/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTabChange = (tab: NavTabType) => {
    setActiveTab(tab);
    if (tab === 'site-doctor') navigate('/tools/site-doctor/');
    else if (tab === 'niche-lab') navigate('/tools/kgr-keyword-lab/');
    else if (tab === 'revenue-planner') navigate('/tools/adsense-rpm-calculator/');
    else if (tab === 'policy-toolkit') navigate('/tools/ads-txt-generator/');
    else if (tab === 'blog') navigate('/guides/');
  };

  const auditPassedCount = checklist.filter((item) => item.isPassed).length;

  // Instant Technical SEO & Schema Guard Synchronization with Priority 3 routes support
  useSeoMetadata(state.route, state.guideSlug);

  return (
    <div className="min-h-screen flex flex-col font-sans bg-white text-[#202124] selection:bg-[#d2e3fc] selection:text-[#174ea6]">
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={handleTabChange}
        auditPassedCount={auditPassedCount}
        totalAuditCount={checklist.length}
      />

      {/* Mobile-First Always-Visible Quick Discovery Strip (lg:hidden) */}
      <MobileDiscoveryBar
        activeTab={activeTab}
        setActiveTab={handleTabChange}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full bg-white pb-20 lg:pb-0">
        {/* Dedicated Route Views */}
        {state.route === 'guide-detail' && <GuideDetailPage />}
        {state.route === 'privacy-policy' && <PrivacyPolicyPage />}
        {state.route === 'terms' && <TermsPage />}
        {state.route === 'about' && <AboutPage />}
        {state.route === 'contact' && <ContactPage />}
        {state.route === 'editorial-policy' && <EditorialPolicyPage />}
        {state.route === 'faq' && (
          <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
            <React.Suspense fallback={<SuiteSuspenseFallback />}>
              <PeopleAlsoAskFaqSuite
                showSnippetPreviewByDefault={true}
                onNavigateToTab={(tab) => handleTabChange(tab as NavTabType)}
              />
            </React.Suspense>
          </div>
        )}

        {/* Pillar 1: Flagship Site Doctor & Crawler Firewall Diagnostics Lab */}
        {(state.route === 'home' || state.route === 'site-doctor' || state.route === 'crawler-firewall') && (
          <SiteAuditor
            onSwitchTab={handleTabChange}
            initialMode={state.route === 'crawler-firewall' ? 'crawler-firewall' : undefined}
          />
        )}

        {/* Pillar 2: Niche & Keyword Lab */}
        {(state.route === 'kgr-keyword-lab' ||
          (state.route === 'home' && false) ||
          activeTab === 'niche-lab' ||
          activeTab === 'niches' ||
          activeTab === 'ai-evaluator' ||
          activeTab === 'kgr') &&
          !['guide-detail', 'privacy-policy', 'terms', 'about', 'contact', 'editorial-policy', 'site-doctor', 'crawler-firewall', 'adsense-rpm-calculator', 'policy-toolkit', 'ads-txt-generator', 'robots-txt', 'privacy-policy-generator', 'faq', 'guides'].includes(state.route) && (
            <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
              <React.Suspense fallback={<SuiteSuspenseFallback />}>
                <NicheKeywordLab
                  initialSubTab={activeTab === 'niches' ? 'matrix' : activeTab === 'kgr' ? 'kgr' : 'ai-evaluator'}
                  onSelectNiche={(niche) => setSelectedNiche(niche)}
                  onSimulateInCalculator={handleSimulateInCalculator}
                />
              </React.Suspense>
            </div>
          )}

        {/* Pillar 3: Revenue & Profit Planner */}
        {(state.route === 'adsense-rpm-calculator' ||
          (!['guide-detail', 'privacy-policy', 'terms', 'about', 'contact', 'editorial-policy', 'site-doctor', 'crawler-firewall', 'ads-txt-generator', 'robots-txt', 'privacy-policy-generator', 'faq', 'guides'].includes(state.route) &&
            (activeTab === 'revenue-planner' || activeTab === 'calculator' || activeTab === 'budget'))) && (
          <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
            <React.Suspense fallback={<SuiteSuspenseFallback />}>
              <RevenueProfitPlanner
                initialRpm={calculatorRpm}
                initialSubTab={activeTab === 'budget' ? 'zero-cost-pnl' : 'revenue-sim'}
              />
            </React.Suspense>
          </div>
        )}

        {/* Pillar 4: Compliance, Policy Toolkit & Priority 3 Technical Webmaster Tools */}
        {(state.route === 'ads-txt-generator' ||
          state.route === 'robots-txt' ||
          state.route === 'privacy-policy-generator' ||
          (!['guide-detail', 'privacy-policy', 'terms', 'about', 'contact', 'editorial-policy', 'site-doctor', 'crawler-firewall', 'adsense-rpm-calculator', 'faq', 'guides'].includes(state.route) &&
            (activeTab === 'policy-toolkit' || activeTab === 'audit' || activeTab === 'single-click'))) && (
          <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
            <React.Suspense fallback={<SuiteSuspenseFallback />}>
              <PolicyToolkit
                checklist={checklist}
                onToggleItem={handleToggleAuditItem}
                initialSubTab={
                  state.route === 'ads-txt-generator' || state.route === 'robots-txt' || state.route === 'privacy-policy-generator'
                    ? 'technical-webmaster'
                    : activeTab === 'single-click'
                    ? 'generators'
                    : 'audit-sop'
                }
                initialTechTool={
                  state.route === 'robots-txt'
                    ? 'robots-txt'
                    : state.route === 'privacy-policy-generator'
                    ? 'privacy-policy'
                    : 'ads-txt'
                }
              />
            </React.Suspense>
          </div>
        )}

        {/* Pillar 5: Knowledge Base & Compliance Guides */}
        {(state.route === 'guides' ||
          (!['guide-detail', 'privacy-policy', 'terms', 'about', 'contact', 'editorial-policy', 'site-doctor', 'crawler-firewall', 'adsense-rpm-calculator', 'ads-txt-generator', 'robots-txt', 'privacy-policy-generator', 'faq'].includes(state.route) &&
            activeTab === 'blog')) && (
          <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
            <React.Suspense fallback={<SuiteSuspenseFallback />}>
              <BlogHub
                onNavigateToTab={(tab) => {
                  handleTabChange(tab);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            </React.Suspense>
          </div>
        )}
      </main>

      {/* Blueprint Detail Modal */}
      {selectedNiche && (
        <React.Suspense fallback={null}>
          <NicheDetailModal
            niche={selectedNiche}
            onClose={() => setSelectedNiche(null)}
            onSimulateInCalculator={handleSimulateInCalculator}
          />
        </React.Suspense>
      )}

      {/* Interactive Compliance Documents Modal */}
      {legalModalType && (
        <React.Suspense fallback={null}>
          <LegalModal
            type={legalModalType}
            onClose={() => setLegalModalType(null)}
          />
        </React.Suspense>
      )}

      {/* GladSense Official Footer with Statutory Trademark Disclaimer & Verified Policy Links */}
      <footer className="mt-auto pt-8 pb-24 lg:pb-8 text-xs border-t border-[#dadce0] bg-[#f8f9fa] text-[#5f6368]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div className="flex items-center gap-3">
              <span className="font-['Google_Sans_Display','Google_Sans',sans-serif] font-bold text-sm text-[#202124]">
                Glad<span className="text-[#1a73e8]">Sense</span> <span className="text-slate-400 font-mono text-xs font-normal">gladsenseedu.app</span>
              </span>
              <span className="text-[#dadce0]">|</span>
              <span className="text-[#5f6368] text-xs">Pre-Approval Site Auditor & Policy Doctor for Google AdSense</span>
            </div>
            <div className="flex flex-wrap items-center justify-center sm:justify-end gap-5 text-[12px] text-[#5f6368]">
              <a
                href="/guides/"
                onClick={(e) => {
                  e.preventDefault();
                  handleTabChange('blog');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="hover:text-[#1a73e8] transition-colors cursor-pointer font-bold text-[#1a73e8]"
              >
                Knowledge Base (30 Guides)
              </a>
              <a
                href="/faq/"
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/faq/');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="hover:text-[#1a73e8] transition-colors cursor-pointer font-medium"
              >
                PAA FAQ Intelligence (7)
              </a>
              <a
                href="/privacy-policy/"
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/privacy-policy/');
                }}
                className="hover:text-[#1a73e8] transition-colors cursor-pointer font-medium"
              >
                Privacy Policy
              </a>
              <button
                type="button"
                onClick={() => setShowCookiePreferences(true)}
                className="hover:text-[#1a73e8] transition-colors cursor-pointer font-medium text-inherit"
              >
                Cookie Preferences
              </button>
              <a
                href="/terms/"
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/terms/');
                }}
                className="hover:text-[#1a73e8] transition-colors cursor-pointer font-medium"
              >
                Terms of Service
              </a>
              <a
                href="/about/"
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/about/');
                }}
                className="hover:text-[#1a73e8] transition-colors cursor-pointer font-medium"
              >
                About Us (E-E-A-T)
              </a>
              <a
                href="/contact/"
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/contact/');
                }}
                className="hover:text-[#1a73e8] transition-colors cursor-pointer font-medium"
              >
                Contact Us
              </a>
              <a
                href="mailto:contact@gladsenseedu.app"
                className="hover:text-[#1a73e8] transition-colors font-medium text-slate-700"
              >
                contact@gladsenseedu.app
              </a>
              <span className="text-slate-300">|</span>
              <a href="https://support.google.com/adsense/answer/48182" target="_blank" rel="noreferrer" className="hover:text-[#1a73e8] transition-colors">
                Google Policies
              </a>
              <a href="https://support.google.com/adsense/answer/7532444" target="_blank" rel="noreferrer" className="hover:text-[#1a73e8] transition-colors">
                ads.txt Guide
              </a>
            </div>
          </div>

          {/* Official GladSense Community Channels */}
          <div className="pt-3 pb-2 border-t border-[#f1f3f4] flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-800">
                Official GladSense Communities:
              </span>
              <span className="text-[11px] text-slate-500 hidden md:inline">
                Follow policy research, live algorithm audits, and video SOP tutorials.
              </span>
            </div>
            <GladSenseSocialLinks variant="pill" size="sm" showLabels={true} className="justify-center sm:justify-end" />
          </div>

          <div className="pt-3 border-t border-[#f1f3f4] text-[11px] text-[#80868b] text-center sm:text-left space-y-1">
            <p className="text-[11px] text-[#5f6368] italic border-b border-[#f1f3f4] pb-2">
              <strong>Editorial Disclosure:</strong> We utilize automated research and linguistic tools to assist our editorial workflow. Every piece of content is fact-checked, structured, and reviewed by human domain specialists prior to publication.
            </p>
            <p>
              © 2026 GladSense. All rights reserved.
            </p>
            <p>
              Disclaimer: GladSense is an independent analytical tool and web application. GladSense is not affiliated with, endorsed by, sponsored by, or associated with Google LLC. Google and Google AdSense are registered trademarks of Google LLC.
            </p>
          </div>
        </div>
      </footer>

      {/* GDPR, CCPA & Google Consent Mode v2 Cookie Banner */}
      <CookieConsent
        onOpenPrivacyPolicy={() => navigate('/privacy-policy/')}
        forceOpen={showCookiePreferences}
        onCloseForce={() => setShowCookiePreferences(false)}
      />

      {/* 100% Mobile-First Fixed Bottom Navigation Bar (lg:hidden) */}
      <MobileBottomNav
        activeTab={activeTab}
        setActiveTab={handleTabChange}
      />
    </div>
  );
}
