import React, { useState } from 'react';
import { SocialSharePayload } from '../types';
import {
  SHARE_CHANNELS,
  buildShareUrl,
  canNativeShare,
  triggerNativeShare,
  copyToClipboard,
} from '../utils/socialShare';
import { SocialBrandIcon } from './SocialShareModal';
import { Share2, Copy, Check, Smartphone, QrCode } from 'lucide-react';

interface SocialShareBarProps {
  payload: SocialSharePayload;
  onOpenFullModal?: (payload: SocialSharePayload) => void;
  size?: 'sm' | 'md';
  showLabel?: boolean;
}

export const SocialShareBar: React.FC<SocialShareBarProps> = ({
  payload,
  onOpenFullModal,
  size = 'md',
  showLabel = true,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const canonicalUrl = buildShareUrl(payload.url);
    const success = await copyToClipboard(canonicalUrl);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleNative = async () => {
    await triggerNativeShare(payload);
  };

  // 4 primary channels for the compact bar: X, LinkedIn, Reddit, WhatsApp
  const primaryChannels = SHARE_CHANNELS.filter((ch) =>
    ['twitter', 'linkedin', 'reddit', 'whatsapp'].includes(ch.id)
  );

  return (
    <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
      {showLabel && (
        <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1 mr-1">
          <Share2 className="w-3.5 h-3.5 text-slate-400" />
          <span>Share:</span>
        </span>
      )}

      {/* Primary Social Buttons */}
      {primaryChannels.map((ch) => {
        const shareUrl = ch.getUrl(payload);
        return (
          <a
            key={ch.id}
            href={shareUrl}
            target="_blank"
            rel="noopener noreferrer"
            title={`Share on ${ch.name}`}
            className={`p-2 rounded-xl transition-all cursor-pointer flex items-center justify-center border border-slate-200/80 hover:shadow-xs hover:scale-105 ${
              size === 'sm' ? 'w-8 h-8' : 'w-9 h-9'
            }`}
            style={{
              backgroundColor: '#ffffff',
              color: ch.color === '#000000' ? '#111827' : ch.color,
            }}
          >
            <SocialBrandIcon type={ch.icon} />
          </a>
        );
      })}

      {/* Copy Link Button */}
      <button
        onClick={handleCopy}
        title="Copy Shareable Link"
        className={`p-2 rounded-xl transition-all cursor-pointer flex items-center justify-center border border-slate-200/80 bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 hover:shadow-xs ${
          size === 'sm' ? 'w-8 h-8' : 'w-9 h-9'
        }`}
      >
        {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
      </button>

      {/* Native Mobile Share (if available) */}
      {canNativeShare() && (
        <button
          onClick={handleNative}
          title="Share via System Sheet"
          className={`p-2 rounded-xl transition-all cursor-pointer flex items-center justify-center border border-blue-200 bg-blue-50 hover:bg-blue-100 text-blue-700 hover:shadow-xs ${
            size === 'sm' ? 'w-8 h-8' : 'w-9 h-9'
          }`}
        >
          <Smartphone className="w-4 h-4" />
        </button>
      )}

      {/* More / QR Code Trigger Modal */}
      {onOpenFullModal && (
        <button
          onClick={() => onOpenFullModal(payload)}
          className="px-2.5 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold hover:text-[#1a73e8] transition-all flex items-center gap-1 cursor-pointer shadow-2xs"
        >
          <QrCode className="w-3.5 h-3.5" />
          <span>More &amp; QR</span>
        </button>
      )}
    </div>
  );
};
