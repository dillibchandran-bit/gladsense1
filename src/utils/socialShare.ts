import { SocialSharePayload } from '../types';

export const BASE_CANONICAL_URL = 'https://gladsenseedu.app';

export interface ShareChannel {
  id: string;
  name: string;
  color: string;
  hoverColor: string;
  textColor: string;
  icon: string;
  getUrl: (payload: SocialSharePayload) => string;
}

/**
 * Appends standard, clean UTM tracking parameters for social sharing attribution.
 */
export function buildShareUrl(rawUrl?: string, channel?: string): string {
  const origin = typeof window !== 'undefined' ? window.location.origin : BASE_CANONICAL_URL;
  let target = rawUrl || (typeof window !== 'undefined' ? window.location.href : BASE_CANONICAL_URL);
  
  if (target.startsWith('/')) {
    target = `${origin}${target}`;
  }

  try {
    const urlObj = new URL(target);
    if (channel) {
      urlObj.searchParams.set('utm_source', channel);
      urlObj.searchParams.set('utm_medium', 'social');
      urlObj.searchParams.set('utm_campaign', 'gladsense_share');
    }
    return urlObj.toString();
  } catch {
    return target;
  }
}

/**
 * Checks if the browser natively supports the Web Share API.
 */
export function canNativeShare(): boolean {
  return typeof navigator !== 'undefined' && typeof navigator.share === 'function';
}

/**
 * Invokes native mobile share sheet (iOS Safari, Android Chrome, etc.).
 */
export async function triggerNativeShare(payload: SocialSharePayload): Promise<boolean> {
  if (!canNativeShare()) return false;
  
  try {
    const shareUrl = buildShareUrl(payload.url, 'native_share');
    await navigator.share({
      title: payload.title,
      text: payload.text || payload.summary || payload.title,
      url: shareUrl,
    });
    return true;
  } catch (err: any) {
    // User cancelled or aborted
    if (err?.name !== 'AbortError') {
      console.warn('Native share failed:', err);
    }
    return false;
  }
}

/**
 * Safe clipboard copy with fallback.
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  if (typeof navigator !== 'undefined' && navigator.clipboard && navigator.clipboard.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // Fallback below
    }
  }

  try {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    const successful = document.execCommand('copy');
    document.body.removeChild(textArea);
    return successful;
  } catch {
    return false;
  }
}

export const SHARE_CHANNELS: ShareChannel[] = [
  {
    id: 'twitter',
    name: 'X (Twitter)',
    color: '#000000',
    hoverColor: '#1a1a1a',
    textColor: '#ffffff',
    icon: 'x',
    getUrl: (p) => {
      const url = buildShareUrl(p.url, 'twitter');
      const text = p.text || `${p.title} — Google AdSense Compliance & Monetization Suite:`;
      const hashtags = (p.hashtags || ['AdSense', 'GoogleSearch', 'Blogging', 'SEO']).join(',');
      return `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}&hashtags=${encodeURIComponent(hashtags)}`;
    },
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    color: '#0a66c2',
    hoverColor: '#084e96',
    textColor: '#ffffff',
    icon: 'linkedin',
    getUrl: (p) => {
      const url = buildShareUrl(p.url, 'linkedin');
      return `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
    },
  },
  {
    id: 'reddit',
    name: 'Reddit',
    color: '#ff4500',
    hoverColor: '#d63a00',
    textColor: '#ffffff',
    icon: 'reddit',
    getUrl: (p) => {
      const url = buildShareUrl(p.url, 'reddit');
      const title = p.title || 'GladSense — Google AdSense Pre-Approval Site Auditor & Monetization Suite';
      return `https://reddit.com/submit?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`;
    },
  },
  {
    id: 'whatsapp',
    name: 'WhatsApp',
    color: '#25d366',
    hoverColor: '#1ea952',
    textColor: '#ffffff',
    icon: 'whatsapp',
    getUrl: (p) => {
      const url = buildShareUrl(p.url, 'whatsapp');
      const message = `${p.title}\n\n${p.text || p.summary || ''}\n${url}`.trim();
      return `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
    },
  },
  {
    id: 'telegram',
    name: 'Telegram',
    color: '#229ed9',
    hoverColor: '#1d85b8',
    textColor: '#ffffff',
    icon: 'telegram',
    getUrl: (p) => {
      const url = buildShareUrl(p.url, 'telegram');
      const text = p.text || p.title;
      return `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
    },
  },
  {
    id: 'facebook',
    name: 'Facebook',
    color: '#1877f2',
    hoverColor: '#0d65d9',
    textColor: '#ffffff',
    icon: 'facebook',
    getUrl: (p) => {
      const url = buildShareUrl(p.url, 'facebook');
      return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    },
  },
];

/**
 * Pre-configured payload builders for major applet workflows
 */
export function createAuditSharePayload(data: {
  url: string;
  score: number;
  status: string;
  blockersCount?: number;
}): SocialSharePayload {
  const statusLabel =
    data.score >= 85 ? 'AdSense Ready (Pass)' : data.score >= 60 ? 'Remediation Required' : 'Critical Policy Blockers';

  return {
    title: `AdSense Readiness Audit: ${data.url} (${data.score}/100)`,
    url: `${BASE_CANONICAL_URL}/#site-doctor`,
    text: `I just audited ${data.url} for Google AdSense readiness on GladSense. Score: ${data.score}/100 (${statusLabel}). Check your domain pre-approval status:`,
    summary: `Live 100-point diagnostic audit evaluating Low Value Content risk, navigation anchors, DART cookies, and E-E-A-T depth.`,
    hashtags: ['GoogleAdSense', 'SiteAudit', 'Blogging', 'AdSenseApproval'],
    category: 'Site Doctor Diagnostic',
    score: data.score,
    domain: data.url,
    badgeLabel: `${data.score}% Readiness`,
  };
}

export function createRevenueSharePayload(data: {
  nicheLabel: string;
  rpm: number;
  monthlyRevenue: number;
  monthlyVisitors: number;
}): SocialSharePayload {
  return {
    title: `Google AdSense Revenue Projection: ${data.nicheLabel} ($${data.rpm.toFixed(2)} RPM)`,
    url: `${BASE_CANONICAL_URL}/#revenue-planner`,
    text: `Calculated AdSense earnings for ${data.nicheLabel} on GladSense: ~$${data.monthlyRevenue.toLocaleString()}/mo with ${data.monthlyVisitors.toLocaleString()} visitors at $${data.rpm.toFixed(2)} Page RPM (98%+ net margin on $0 static hosting):`,
    summary: `Model traffic yields, geo-tier RPM benchmarks, and zero-cost Cloudflare Pages hosting economics.`,
    hashtags: ['AdSenseRevenue', 'Monetization', 'PublisherPnl', 'PassiveIncome'],
    category: 'Revenue Profit Planner',
    badgeLabel: `$${data.rpm.toFixed(2)} RPM`,
  };
}

export function createGuideSharePayload(post: {
  title: string;
  slug: string;
  category: string;
  subtitle: string;
}): SocialSharePayload {
  return {
    title: post.title,
    url: `${BASE_CANONICAL_URL}/guides/${post.slug}/`,
    text: `${post.title} — Official Google AdSense & Search Policy Compliance Guide on GladSense:`,
    summary: post.subtitle,
    hashtags: ['AdSenseGuide', 'GooglePolicy', 'SearchQuality', 'BloggingTips'],
    category: post.category,
    badgeLabel: 'Compliance SOP',
  };
}

export function createGeneralSharePayload(tabName?: string): SocialSharePayload {
  return {
    title: 'GladSense — Pre-Approval Site Auditor & Policy Doctor for Google AdSense',
    url: BASE_CANONICAL_URL,
    text: 'Check out GladSense: Free Google AdSense eligibility checker, 100-point compliance SOP, KGR keyword lab, and revenue profit planner:',
    summary: 'Diagnose Low Value Content, resolve Valuable Inventory flags, and achieve first-attempt AdSense approval.',
    hashtags: ['GoogleAdSense', 'AdSenseApproval', 'Blogging', 'Webmaster'],
    category: tabName || 'GladSense Labs',
    badgeLabel: '100% Free Tool',
  };
}
