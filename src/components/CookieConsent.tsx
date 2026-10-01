import React, { useState, useEffect } from 'react';
import { ShieldCheck, Cookie, Check, X, ChevronDown, ChevronUp, Lock, Sliders, ExternalLink } from 'lucide-react';

export interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  advertising: boolean;
  decidedAt: string;
}

interface CookieConsentProps {
  onOpenPrivacyPolicy?: () => void;
  forceOpen?: boolean;
  onCloseForce?: () => void;
}

const STORAGE_KEY = 'gladsense_cookie_consent_v2';

export const CookieConsent: React.FC<CookieConsentProps> = ({
  onOpenPrivacyPolicy,
  forceOpen = false,
  onCloseForce,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [analyticsConsent, setAnalyticsConsent] = useState(true);
  const [advertisingConsent, setAdvertisingConsent] = useState(true);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed: CookiePreferences = JSON.parse(stored);
        setAnalyticsConsent(parsed.analytics);
        setAdvertisingConsent(parsed.advertising);
        if (forceOpen) {
          setIsVisible(true);
          setShowPreferences(true);
        }
      } else {
        // First-time visitor: reveal banner with a slight delay for smooth entry
        const timer = setTimeout(() => setIsVisible(true), 600);
        return () => clearTimeout(timer);
      }
    } catch (e) {
      setIsVisible(true);
    }
  }, [forceOpen]);

  const applyConsentSignals = (prefs: CookiePreferences) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));

      // Google Consent Mode v2 standard event dispatch
      if (typeof window !== 'undefined') {
        const consentData = {
          analytics_storage: prefs.analytics ? 'granted' : 'denied',
          ad_storage: prefs.advertising ? 'granted' : 'denied',
          ad_user_data: prefs.advertising ? 'granted' : 'denied',
          ad_personalization: prefs.advertising ? 'granted' : 'denied',
        };

        if ((window as any).gtag) {
          (window as any).gtag('consent', 'update', consentData);
        }

        // Custom window event for reactive listeners
        window.dispatchEvent(
          new CustomEvent('gladsense-consent-updated', { detail: consentData })
        );
      }
    } catch (e) {
      console.warn('Could not save cookie consent:', e);
    }
  };

  const handleAcceptAll = () => {
    const prefs: CookiePreferences = {
      necessary: true,
      analytics: true,
      advertising: true,
      decidedAt: new Date().toISOString(),
    };
    applyConsentSignals(prefs);
    setIsVisible(false);
    onCloseForce && onCloseForce();
  };

  const handleEssentialOnly = () => {
    const prefs: CookiePreferences = {
      necessary: true,
      analytics: false,
      advertising: false,
      decidedAt: new Date().toISOString(),
    };
    applyConsentSignals(prefs);
    setAnalyticsConsent(false);
    setAdvertisingConsent(false);
    setIsVisible(false);
    onCloseForce && onCloseForce();
  };

  const handleSavePreferences = () => {
    const prefs: CookiePreferences = {
      necessary: true,
      analytics: analyticsConsent,
      advertising: advertisingConsent,
      decidedAt: new Date().toISOString(),
    };
    applyConsentSignals(prefs);
    setIsVisible(false);
    onCloseForce && onCloseForce();
  };

  if (!isVisible && !forceOpen) {
    return null;
  }

  return (
    <aside
      aria-label="Cookie and Privacy Consent"
      className="fixed bottom-3 sm:bottom-5 left-3 sm:left-6 right-3 sm:right-6 z-50 max-w-4xl mx-auto"
    >
      <div className="bg-white/98 backdrop-blur-md rounded-2xl border-2 border-slate-200/90 shadow-2xl p-4 sm:p-5 text-slate-800 transition-all animate-in fade-in slide-in-from-bottom-4 duration-300">
        {/* Header Bar */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
              <Cookie className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-bold text-slate-900 font-['Google_Sans',sans-serif]">
                  Privacy & Cookie Consent
                </h4>
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Consent Mode v2
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium">
                GDPR, CCPA & Google AdSense Publisher Compliance
              </p>
            </div>
          </div>

          {forceOpen && onCloseForce && (
            <button
              onClick={() => {
                setIsVisible(false);
                onCloseForce();
              }}
              className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100 cursor-pointer"
              aria-label="Close cookie banner"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Informational Body */}
        <p className="text-xs text-slate-600 mt-2.5 leading-relaxed">
          GladSense uses essential cookies to ensure application stability and security. With your consent, we and our partners (including Google) also use analytical and DoubleClick advertising cookies to measure usage and comply with{' '}
          <strong className="text-slate-800 font-semibold">Google’s EU User Consent Policy</strong>. You can customize your preferences or withdraw consent at any time.
        </p>

        {/* Detailed Preferences Drawer (Collapsible) */}
        {showPreferences && (
          <div className="mt-4 pt-3.5 border-t border-slate-200/80 space-y-3 text-xs bg-slate-50/80 -mx-4 -mb-2 sm:-mx-5 p-4 rounded-b-xl border-b">
            {/* 1. Necessary */}
            <div className="flex items-start justify-between gap-3 p-2.5 rounded-xl bg-white border border-slate-200">
              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5 font-bold text-slate-900">
                  <Lock className="w-3.5 h-3.5 text-slate-500" />
                  <span>Strictly Necessary & Security Cookies</span>
                </div>
                <p className="text-[11px] text-slate-500 leading-normal">
                  Required for core navigation, CSRF protection, and persistent audit checklist state. These cannot be disabled.
                </p>
              </div>
              <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded-md shrink-0">
                Always Active
              </span>
            </div>

            {/* 2. Analytics */}
            <div className="flex items-start justify-between gap-3 p-2.5 rounded-xl bg-white border border-slate-200">
              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5 font-bold text-slate-900">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#1a73e8]" />
                  <span>Analytics & Performance Measurement</span>
                </div>
                <p className="text-[11px] text-slate-500 leading-normal">
                  Aggregated telemetry to track diagnostic crawl response times and improve tool accuracy. No individual profiling.
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-1">
                <input
                  type="checkbox"
                  checked={analyticsConsent}
                  onChange={(e) => setAnalyticsConsent(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#1a73e8]"></div>
              </label>
            </div>

            {/* 3. Advertising & AdSense */}
            <div className="flex items-start justify-between gap-3 p-2.5 rounded-xl bg-white border border-slate-200">
              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5 font-bold text-slate-900">
                  <Cookie className="w-3.5 h-3.5 text-purple-600" />
                  <span>Google AdSense & DoubleClick DART Cookies</span>
                </div>
                <p className="text-[11px] text-slate-500 leading-normal">
                  Allows Google to serve contextually relevant publisher advertisements and verify invalid traffic signals in accordance with IAB TCF v2.2.
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-1">
                <input
                  type="checkbox"
                  checked={advertisingConsent}
                  onChange={(e) => setAdvertisingConsent(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-purple-600]"></div>
              </label>
            </div>
          </div>
        )}

        {/* Action Button Row */}
        <div className="mt-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
          <div className="flex items-center gap-3 text-xs">
            <button
              type="button"
              onClick={() => setShowPreferences(!showPreferences)}
              className="text-[#1a73e8] hover:underline font-semibold flex items-center gap-1 cursor-pointer"
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>{showPreferences ? 'Hide Preferences' : 'Customize Preferences'}</span>
              {showPreferences ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
            <span className="text-slate-300">•</span>
            {onOpenPrivacyPolicy && (
              <button
                type="button"
                onClick={onOpenPrivacyPolicy}
                className="text-slate-500 hover:text-slate-800 hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>Read Policy & DART Terms</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 justify-end">
            <button
              type="button"
              onClick={handleEssentialOnly}
              className="flex-1 sm:flex-initial px-4 py-2 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
            >
              Essential Only
            </button>
            {showPreferences ? (
              <button
                type="button"
                onClick={handleSavePreferences}
                className="flex-1 sm:flex-initial px-5 py-2 rounded-xl text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 transition-colors cursor-pointer shadow-xs"
              >
                Save My Choices
              </button>
            ) : (
              <button
                type="button"
                onClick={handleAcceptAll}
                className="flex-1 sm:flex-initial px-5 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#1a73e8] to-[#1557b0] hover:from-[#1765cc] hover:to-[#124996] transition-all cursor-pointer shadow-md shadow-blue-900/20"
              >
                Accept All
              </button>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
};
