import React, { useState } from 'react';
import { SocialSharePayload } from '../types';
import {
  SHARE_CHANNELS,
  buildShareUrl,
  canNativeShare,
  triggerNativeShare,
  copyToClipboard,
} from '../utils/socialShare';
import { generateQrSvgUri } from '../utils/qrGenerator';
import {
  X,
  Copy,
  Check,
  Share2,
  Smartphone,
  QrCode,
  Code,
  ShieldCheck,
  ExternalLink,
  Sparkles,
  Layers,
  Award,
} from 'lucide-react';
import { GladSenseSocialLinks } from './GladSenseSocialLinks';

interface SocialShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  payload: SocialSharePayload;
}

export const SocialShareModal: React.FC<SocialShareModalProps> = ({
  isOpen,
  onClose,
  payload,
}) => {
  const [activeView, setActiveView] = useState<'social' | 'qr' | 'embed'>('social');
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedEmbed, setCopiedEmbed] = useState(false);
  const [copiedText, setCopiedText] = useState(false);

  if (!isOpen) return null;

  const canonicalUrl = buildShareUrl(payload.url);
  const qrSvgUri = generateQrSvgUri(canonicalUrl, 220);

  const handleCopyLink = async () => {
    const success = await copyToClipboard(canonicalUrl);
    if (success) {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2200);
    }
  };

  const handleCopyFullText = async () => {
    const fullText = `${payload.title}\n\n${payload.text || payload.summary || ''}\n\n${canonicalUrl}`;
    const success = await copyToClipboard(fullText);
    if (success) {
      setCopiedText(true);
      setTimeout(() => setCopiedText(false), 2200);
    }
  };

  const embedMarkdown = `[![GladSense AdSense Audit](https://gladsenseedu.app/badge.svg)](${canonicalUrl})`;
  const embedHtml = `<a href="${canonicalUrl}" target="_blank" rel="noopener noreferrer"><img src="https://gladsenseedu.app/badge.svg" alt="GladSense AdSense Audit Score" /></a>`;

  const handleCopyEmbed = async (snippet: string) => {
    const success = await copyToClipboard(snippet);
    if (success) {
      setCopiedEmbed(true);
      setTimeout(() => setCopiedEmbed(false), 2200);
    }
  };

  const handleNativeShare = async () => {
    await triggerNativeShare(payload);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Gradient Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white flex items-center justify-between border-b border-slate-700/60">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold">
                <Share2 className="w-4 h-4" />
              </div>
              <h3 className="text-base font-bold text-white tracking-tight font-['Google_Sans',sans-serif]">
                Share with Publishers &amp; Teams
              </h3>
            </div>
            <div className="flex items-center gap-2 text-[11px] text-slate-300">
              <span className="flex items-center gap-1 text-emerald-400 font-medium">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Zero Tracking Cookies</span>
              </span>
              <span>•</span>
              <span className="text-slate-400">Google Policy Compliant</span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Sub-Tabs: Social Channels | Mobile QR | Embed Badge */}
        <div className="flex border-b border-slate-100 bg-slate-50/80 px-4 pt-2 gap-2 text-xs font-semibold">
          <button
            onClick={() => setActiveView('social')}
            className={`pb-2.5 px-3 border-b-2 transition-all flex items-center gap-1.5 cursor-pointer ${
              activeView === 'social'
                ? 'border-[#1a73e8] text-[#1a73e8]'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Social Networks</span>
          </button>

          <button
            onClick={() => setActiveView('qr')}
            className={`pb-2.5 px-3 border-b-2 transition-all flex items-center gap-1.5 cursor-pointer ${
              activeView === 'qr'
                ? 'border-[#1a73e8] text-[#1a73e8]'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <QrCode className="w-3.5 h-3.5" />
            <span>Mobile QR Code</span>
          </button>

          <button
            onClick={() => setActiveView('embed')}
            className={`pb-2.5 px-3 border-b-2 transition-all flex items-center gap-1.5 cursor-pointer ${
              activeView === 'embed'
                ? 'border-[#1a73e8] text-[#1a73e8]'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Code className="w-3.5 h-3.5" />
            <span>Embed Badge</span>
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-6 space-y-5 overflow-y-auto">
          {/* VIEW 1: SOCIAL NETWORKS */}
          {activeView === 'social' && (
            <div className="space-y-4">
              {/* Live OpenGraph Social Card Preview */}
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/90 shadow-2xs space-y-2">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                    <span>Social Card Preview</span>
                  </span>
                  <span className="text-slate-400 font-mono">gladsenseedu.app</span>
                </div>

                <div className="p-3 bg-white rounded-xl border border-slate-200 flex items-start gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 text-white flex items-center justify-center shrink-0 font-black text-lg shadow-xs">
                    {payload.score ? `${payload.score}%` : 'GS'}
                  </div>
                  <div className="space-y-1 min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[10px] font-bold px-2 py-0.2 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                        {payload.category || 'Google AdSense Evaluation'}
                      </span>
                      {payload.badgeLabel && (
                        <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-emerald-50 text-emerald-800 font-mono border border-emerald-200">
                          {payload.badgeLabel}
                        </span>
                      )}
                    </div>
                    <h4 className="text-xs font-bold text-slate-900 truncate leading-snug">
                      {payload.title}
                    </h4>
                    <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                      {payload.summary || payload.text}
                    </p>
                  </div>
                </div>
              </div>

              {/* Native Mobile Web Share Trigger (if supported) */}
              {canNativeShare() && (
                <button
                  onClick={handleNativeShare}
                  className="w-full py-2.5 px-4 rounded-xl bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-700 font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-2xs"
                >
                  <Smartphone className="w-4 h-4" />
                  <span>Open System Share Sheet (iOS / Android)</span>
                </button>
              )}

              {/* Grid of Verified Social Platforms */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-700 block uppercase tracking-wider">
                  Select Channel to Broadcast:
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {SHARE_CHANNELS.map((ch) => {
                    const shareUrl = ch.getUrl(payload);
                    return (
                      <a
                        key={ch.id}
                        href={shareUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 rounded-2xl border border-slate-200 hover:border-slate-300 hover:shadow-sm transition-all flex items-center gap-2.5 group cursor-pointer bg-white"
                        style={{ textDecoration: 'none' }}
                      >
                        <div
                          className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 shadow-2xs transition-transform group-hover:scale-105"
                          style={{ backgroundColor: ch.color, color: ch.textColor }}
                        >
                          <SocialBrandIcon type={ch.icon} />
                        </div>
                        <div className="min-w-0">
                          <span className="text-xs font-bold text-slate-800 block truncate group-hover:text-blue-600 transition-colors">
                            {ch.name}
                          </span>
                          <span className="text-[10px] text-slate-400 block truncate">
                            Share Post
                          </span>
                        </div>
                      </a>
                    );
                  })}
                </div>
              </div>

              {/* Official GladSense Channels: LinkedIn, X, YouTube */}
              <div className="pt-3 border-t border-slate-200 space-y-2">
                <span className="text-xs font-bold text-slate-700 block uppercase tracking-wider">
                  Follow Official GladSense Channels:
                </span>
                <GladSenseSocialLinks variant="cards" size="md" />
              </div>
            </div>
          )}

          {/* VIEW 2: MOBILE QR CODE */}
          {activeView === 'qr' && (
            <div className="flex flex-col items-center text-center space-y-4 py-2">
              <div className="p-4 bg-white rounded-3xl border-2 border-slate-200 shadow-md">
                <img
                  src={qrSvgUri}
                  alt="QR Code for Mobile Testing and Sharing"
                  className="w-48 h-48 sm:w-56 sm:h-56 rounded-xl"
                />
              </div>

              <div className="space-y-1 max-w-sm">
                <h4 className="text-sm font-bold text-slate-900">
                  Scan to Open on Smartphone
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Point your phone's camera at the QR code to instantly test mobile viewport responsiveness, Core Web Vitals, or share in person.
                </p>
              </div>

              <span className="text-[11px] font-mono text-slate-400 bg-slate-100 px-3 py-1 rounded-full">
                {canonicalUrl}
              </span>
            </div>
          )}

          {/* VIEW 3: EMBED BADGE / MARKDOWN */}
          {activeView === 'embed' && (
            <div className="space-y-4">
              <div className="p-3.5 bg-blue-50/60 border border-blue-200 rounded-2xl text-xs text-blue-900 space-y-1">
                <span className="font-bold block">Developer &amp; Webmaster Badges:</span>
                <p className="text-[11px] text-blue-800 leading-relaxed">
                  Showcase that your website has been audited and prepared for Google AdSense compliance. Ideal for GitHub READMEs, client reports, or footer verification links.
                </p>
              </div>

              {/* Markdown Snippet */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-xs">
                  <label className="font-bold text-slate-700">Markdown Badge (GitHub &amp; Docs)</label>
                  <button
                    onClick={() => handleCopyEmbed(embedMarkdown)}
                    className="text-xs text-blue-600 hover:underline font-semibold cursor-pointer"
                  >
                    {copiedEmbed ? 'Copied!' : 'Copy Markdown'}
                  </button>
                </div>
                <div className="p-2.5 bg-slate-900 text-slate-200 rounded-xl text-xs font-mono break-all border border-slate-800">
                  {embedMarkdown}
                </div>
              </div>

              {/* HTML Snippet */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-xs">
                  <label className="font-bold text-slate-700">HTML Snippet</label>
                  <button
                    onClick={() => handleCopyEmbed(embedHtml)}
                    className="text-xs text-blue-600 hover:underline font-semibold cursor-pointer"
                  >
                    Copy HTML
                  </button>
                </div>
                <div className="p-2.5 bg-slate-900 text-slate-200 rounded-xl text-xs font-mono break-all border border-slate-800">
                  {embedHtml}
                </div>
              </div>
            </div>
          )}

          {/* Canonical 1-Click Copy URL Bar */}
          <div className="pt-2 border-t border-slate-100 space-y-2">
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
              Direct Shareable Link:
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={canonicalUrl}
                className="flex-1 p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono text-slate-800 focus:outline-none"
              />
              <button
                onClick={handleCopyLink}
                className="px-4 py-2.5 bg-[#1a73e8] hover:bg-[#1557b0] text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 shrink-0 cursor-pointer"
              >
                {copiedLink ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
                <span>{copiedLink ? 'Copied!' : 'Copy Link'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer info note */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500">
          <span>GladSense Official Compliance Toolkit</span>
          <button
            onClick={handleCopyFullText}
            className="text-slate-700 hover:text-blue-600 font-semibold cursor-pointer"
          >
            {copiedText ? 'Full Text Copied!' : 'Copy Summary Text'}
          </button>
        </div>
      </div>
    </div>
  );
};

/**
 * Pixel-perfect SVG brand icons for social sharing
 */
export const SocialBrandIcon: React.FC<{ type: string }> = ({ type }) => {
  switch (type) {
    case 'x':
      return (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      );
    case 'linkedin':
      return (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <circle cx="4.98" cy="4" r="2.2" />
          <rect width="4.4" height="12" x="2.78" y="8.5" rx="0.75" />
          <path d="M16 8.5a5.5 5.5 0 0 1 5.5 5.5V20.5h-4.4V14a1.8 1.8 0 0 0-3.6 0v6.5H9.1V8.5h4.4v1.8c.8-1.2 2-1.8 3.5-1.8z" />
        </svg>
      );
    case 'reddit':
      return (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M12 2A10 10 0 0 0 2 12a10 10 0 0 0 10 10 10 10 0 0 0 10-10A10 10 0 0 0 12 2zm5.01 4.75c.67 0 1.22.55 1.22 1.22 0 .54-.36.99-.86 1.15.02.13.03.26.03.39 0 2-2.47 3.63-5.5 3.63s-5.5-1.63-5.5-3.63c0-.13.01-.26.03-.39a1.22 1.22 0 1 1 1.58-1.15c.67 0 1.22.55 1.22 1.22 0 .17-.04.33-.1.48 1 .6 2.33.98 3.79 1.02l.65-3.05a.25.25 0 0 1 .3-.19l2.06.44a1.217 1.217 0 0 1 1.08-.94zm-8.23 6.64a1.1 1.1 0 1 0 0-2.2 1.1 1.1 0 0 0 0 2.2zm6.44 0a1.1 1.1 0 1 0 0-2.2 1.1 1.1 0 0 0 0 2.2zm-4.72 2.11c.71.71 2.3.71 3 0 .1-.1.26-.1.35 0 .1.1.1.26 0 .35-.9.9-2.9 1-3.7 0-.1-.1-.1-.26 0-.35.1-.1.25-.1.35 0z" />
        </svg>
      );
    case 'whatsapp':
      return (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.196 8.196 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.02-1.25-.75-.67-1.26-1.5-1.41-1.75-.15-.25-.02-.39.11-.51.11-.11.25-.29.38-.44.13-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.78 2.72 4.31 3.81.6.26 1.07.42 1.44.54.61.19 1.16.17 1.6.1.49-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.11-.22-.17-.47-.29z" />
        </svg>
      );
    case 'telegram':
      return (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 0 0-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
        </svg>
      );
    case 'facebook':
      return (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95C18.05 21.45 22 17.19 22 12z" />
        </svg>
      );
    case 'youtube':
      return (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M21.582 6.186A2.806 2.806 0 0 0 19.61 4.2C17.87 3.75 12 3.75 12 3.75s-5.87 0-7.61.45A2.806 2.806 0 0 0 2.418 6.186C2 7.93 2 12 2 12s0 4.07.418 5.814a2.806 2.806 0 0 0 1.972 1.986C6.13 20.25 12 20.25 12 20.25s5.87 0 7.61-.45a2.806 2.806 0 0 0 1.972-1.986C22 16.07 22 12 22 12s0-4.07-.418-5.814zM10 15.5V8.5l6 3.5-6 3.5z"
          />
        </svg>
      );
    default:
      return <ExternalLink className="w-4 h-4" />;
  }
};
