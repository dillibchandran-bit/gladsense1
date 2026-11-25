import React, { useState } from 'react';
import { BLOG_POSTS } from '../data/blogPostsData';
import { useAppRouter } from '../context/RouterContext';
import {
  ArrowLeft,
  Clock,
  User,
  Share2,
  Copy,
  Check,
  ChevronRight,
  BookOpen,
  ShieldCheck,
  AlertTriangle,
  Lightbulb,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Wrench,
} from 'lucide-react';
import { TrademarkDisclaimer } from '../components/TrademarkDisclaimer';
import { AdSlotPlaceholder } from '../components/monetization/AdPlaceholders';
import { SocialShareBar } from '../components/SocialShareBar';
import { useSocialShare } from '../context/SocialShareContext';
import { createGuideSharePayload } from '../utils/socialShare';

export const GuideDetailPage: React.FC = () => {
  const { state, navigate } = useAppRouter();
  const { openShare } = useSocialShare();
  const [copiedLink, setCopiedLink] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const slug = state.guideSlug || '';
  const post = BLOG_POSTS.find(
    (p) => p.slug === slug || p.slug.includes(slug) || slug.includes(p.slug)
  );

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <h1 className="text-2xl font-bold text-slate-800">Guide Not Found</h1>
        <p className="text-sm text-slate-500">
          The requested tutorial could not be found. It may have been moved or updated.
        </p>
        <button
          onClick={() => navigate('/guides/')}
          className="px-4 py-2 bg-[#1a73e8] text-white text-xs font-bold rounded-xl"
        >
          View All Guides
        </button>
      </div>
    );
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`https://gladsenseedu.app/guides/${post.slug}/`);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const currentIndex = BLOG_POSTS.findIndex((p) => p.id === post.id);
  const prevPost = currentIndex > 0 ? BLOG_POSTS[currentIndex - 1] : null;
  const nextPost = currentIndex < BLOG_POSTS.length - 1 ? BLOG_POSTS[currentIndex + 1] : null;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 font-sans">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-500 flex-wrap">
        <button
          onClick={() => navigate('/')}
          className="hover:text-slate-900 transition-colors cursor-pointer"
        >
          Home
        </button>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <button
          onClick={() => navigate('/guides/')}
          className="hover:text-slate-900 transition-colors cursor-pointer"
        >
          Guides
        </button>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-slate-800 font-medium truncate max-w-xs sm:max-w-md">
          {post.title}
        </span>
      </nav>

      {/* Article Header */}
      <header className="space-y-4 border-b border-slate-200 pb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#1a73e8] text-xs font-bold">
          <span>{post.category}</span>
          <span>•</span>
          <span>{post.readTime}</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-['Google_Sans',sans-serif] leading-tight">
          {post.title}
        </h1>

        <p className="text-base text-slate-600 leading-relaxed font-normal">
          {post.subtitle}
        </p>

        {/* Author Card & Actions */}
        <div className="pt-2 flex flex-wrap items-center justify-between gap-4 border-t border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#1a73e8] text-white flex items-center justify-center font-bold text-sm shadow-xs">
              {post.author.name.charAt(0)}
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900">{post.author.name}</div>
              <div className="text-[11px] text-slate-500">
                {post.author.role} • {post.publishDate}
              </div>
            </div>
          </div>

          <SocialShareBar
            payload={createGuideSharePayload(post)}
            onOpenFullModal={openShare}
          />
        </div>
      </header>

      {/* Direct Answer Summary Box (Princeton GEO Format) */}
      {post.directAnswerSummary && (
        <section
          aria-label="Direct Answer Summary"
          className="p-5 rounded-2xl bg-gradient-to-br from-indigo-50/70 via-blue-50/50 to-white border border-indigo-200/80 shadow-2xs space-y-2"
        >
          <div className="flex items-center gap-2 text-indigo-900 font-bold text-xs uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-indigo-600" />
            <span>Direct Answer Summary (Google Search Central &amp; GEO Standard)</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
            {post.directAnswerSummary}
          </p>
        </section>
      )}

      {/* Automatic Table of Contents for Deep 360° Guides */}
      {post.sections.length >= 8 && (
        <nav
          aria-label="Table of Contents"
          className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3"
        >
          <div className="text-xs font-extrabold uppercase tracking-wider text-slate-700 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-[#1a73e8]" />
            <span>Complete 360° Field Manual Contents ({post.sections.length} Sections)</span>
          </div>
          <ol className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-1.5 text-xs text-slate-700">
            {post.sections.map((sec, idx) => (
              <li key={idx} className="leading-snug">
                <a
                  href={`#guide-section-${idx}`}
                  className="hover:text-[#1a73e8] hover:underline transition-colors flex items-start gap-2"
                >
                  <span className="font-mono font-bold text-slate-400 shrink-0">
                    {String(idx + 1).padStart(2, '0')}.
                  </span>
                  <span>{sec.heading}</span>
                </a>
              </li>
            ))}
          </ol>
        </nav>
      )}

      {/* Main Content Sections */}
      <main className="space-y-8 text-sm text-slate-700 leading-relaxed">
        {post.sections.map((section, idx) => (
          <section key={idx} id={`guide-section-${idx}`} className="space-y-4 scroll-mt-24">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-['Google_Sans',sans-serif] tracking-tight">
              {section.heading}
            </h2>

            <p className="text-slate-700 leading-relaxed text-sm">
              {section.content}
            </p>

            {/* Editorial Visual / Diagram */}
            {section.image && (
              <figure className="my-5 rounded-2xl overflow-hidden border border-slate-200 bg-slate-50 shadow-xs">
                <img
                  src={section.image.src}
                  alt={section.image.alt}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="w-full h-auto object-cover block"
                />
                {section.image.caption && (
                  <figcaption className="px-4 py-2.5 text-xs text-slate-600 bg-slate-50 border-t border-slate-200/80 leading-relaxed">
                    {section.image.caption}
                  </figcaption>
                )}
              </figure>
            )}

            {/* Callout Box */}
            {section.callout && (
              <div
                className={`p-4 rounded-xl border text-xs leading-relaxed flex items-start gap-2.5 ${
                  section.callout.type === 'warning'
                    ? 'bg-amber-50 border-amber-200 text-amber-900'
                    : section.callout.type === 'tip'
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                    : 'bg-blue-50 border-blue-200 text-blue-900'
                }`}
              >
                {section.callout.type === 'warning' ? (
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                ) : section.callout.type === 'tip' ? (
                  <Lightbulb className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                ) : (
                  <CheckCircle2 className="w-4 h-4 text-[#1a73e8] shrink-0 mt-0.5" />
                )}
                <div>{section.callout.text}</div>
              </div>
            )}

            {/* Code Snippet */}
            {section.codeSnippet && (
              <div className="p-4 rounded-2xl bg-slate-950 text-slate-100 font-mono text-xs overflow-x-auto border border-slate-800 my-4">
                <pre>
                  <code>{section.codeSnippet}</code>
                </pre>
              </div>
            )}

            {/* Table Data */}
            {section.tableData && (
              <div className="overflow-x-auto my-4">
                <table className="w-full text-left text-xs border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
                  <thead className="bg-slate-100 font-bold text-slate-800">
                    <tr>
                      {section.tableData.headers.map((h, hIdx) => (
                        <th key={hIdx} className="p-3">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {section.tableData.rows.map((row, rIdx) => (
                      <tr key={rIdx} className={rIdx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}>
                        {row.map((cell, cIdx) => (
                          <td key={cIdx} className="p-3">
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Subheadings */}
            {section.subheadings && (
              <div className="space-y-4 pt-2">
                {section.subheadings.map((sub, sIdx) => (
                  <div key={sIdx} className="space-y-1.5 pl-3 border-l-2 border-[#1a73e8]">
                    <h3 className="text-base font-bold text-slate-900">{sub.title}</h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {sub.content}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </section>
        ))}

        {/* Structured Technical Glossary */}
        {post.glossaryTerms && post.glossaryTerms.length > 0 && (
          <section aria-label="Technical Glossary" className="space-y-4 border-t border-slate-200 pt-6">
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <h2 className="text-xl font-bold text-slate-900 font-['Google_Sans',sans-serif]">
                Nano-Level Technical Glossary
              </h2>
              <span className="text-[11px] font-mono text-slate-500">
                {post.glossaryTerms.length} Verified Entities
              </span>
            </div>
            <dl className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {post.glossaryTerms.map((item, gIdx) => (
                <div
                  key={gIdx}
                  className="p-4 rounded-xl bg-slate-50 border border-slate-200/90 space-y-1"
                >
                  <dt className="text-xs font-extrabold text-slate-900 font-mono">
                    {item.term}
                  </dt>
                  <dd className="text-xs text-slate-600 leading-relaxed">
                    {item.definition}
                  </dd>
                </div>
              ))}
            </dl>
          </section>
        )}

        {/* Official Primary Sources & References */}
        {post.references && post.references.length > 0 && (
          <section aria-label="Primary Sources and Official Documentation" className="space-y-3 border-t border-slate-200 pt-6">
            <h2 className="text-lg font-bold text-slate-900 font-['Google_Sans',sans-serif]">
              Official Primary Sources &amp; Policy Documentation
            </h2>
            <ul className="space-y-2">
              {post.references.map((ref, rIdx) => (
                <li key={rIdx} className="text-xs">
                  <a
                    href={ref.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[#1a73e8] hover:underline font-medium"
                  >
                    <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                    <span>{ref.title}</span>
                    <span className="text-slate-400 font-normal">({ref.publisher})</span>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Ad Placement Below Content */}
        <AdSlotPlaceholder format="in-content-728" />

        {/* Related Diagnostic Tools (Internal Linking Equity) */}
        {post.relatedToolLinks && post.relatedToolLinks.length > 0 && (
          <section aria-label="Recommended Diagnostic Tools" className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="flex items-center gap-2">
              <Wrench className="w-4 h-4 text-[#1a73e8]" />
              <h2 className="text-sm font-bold text-slate-900">
                Recommended GladSense Diagnostic Tools
              </h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {post.relatedToolLinks.map((tool, tIdx) => {
                const toolRouteMap: Record<string, string> = {
                  'site-doctor': '/tools/site-doctor/',
                  'crawler-firewall-lab': '/tools/crawler-firewall/',
                  'policy-toolkit': '/tools/ads-txt-generator/',
                  'ad-placement': '/tools/ad-placement-simulator/',
                  'revenue-planner': '/tools/adsense-rpm-calculator/',
                  'niche-lab': '/tools/kgr-keyword-lab/',
                  'ads-txt-validator': '/tools/ads-txt-validator/',
                };
                const targetPath = toolRouteMap[tool.tabId] || '/tools/site-doctor/';
                return (
                  <button
                    key={tIdx}
                    type="button"
                    onClick={() => navigate(targetPath)}
                    className="px-3.5 py-2 rounded-xl bg-white hover:bg-blue-50 border border-slate-200 hover:border-blue-300 text-xs font-bold text-slate-800 hover:text-[#1a73e8] transition-colors cursor-pointer inline-flex items-center gap-1.5"
                  >
                    <span>{tool.label}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                );
              })}
            </div>
          </section>
        )}

        {/* FAQs */}
        {post.faqs && post.faqs.length > 0 && (
          <section className="space-y-4 border-t border-slate-200 pt-6">
            <h2 className="text-xl font-bold text-slate-900 font-['Google_Sans',sans-serif]">
              Frequently Asked Questions (FAQ)
            </h2>
            <div className="space-y-2">
              {post.faqs.map((faq, fIdx) => (
                <div
                  key={fIdx}
                  className="rounded-xl border border-slate-200 bg-white overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => setExpandedFaq(expandedFaq === fIdx ? null : fIdx)}
                    className="w-full p-4 text-left flex items-center justify-between text-xs font-bold text-slate-900 hover:bg-slate-50 cursor-pointer"
                  >
                    <span>{faq.question}</span>
                    {expandedFaq === fIdx ? (
                      <ChevronUp className="w-4 h-4 text-slate-500" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-500" />
                    )}
                  </button>
                  {expandedFaq === fIdx && (
                    <div className="p-4 pt-0 text-xs text-slate-600 leading-relaxed border-t border-slate-100">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        <TrademarkDisclaimer />

        {/* Prev / Next Article Navigation */}
        <nav aria-label="Next and previous articles" className="pt-6 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {prevPost ? (
            <button
              onClick={() => navigate(`/guides/${prevPost.slug}/`)}
              className="p-4 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-left transition-colors cursor-pointer space-y-1"
            >
              <span className="text-[10px] font-bold text-slate-400 uppercase">Previous Guide</span>
              <div className="text-xs font-bold text-slate-900 line-clamp-1">{prevPost.title}</div>
            </button>
          ) : <div />}

          {nextPost && (
            <button
              onClick={() => navigate(`/guides/${nextPost.slug}/`)}
              className="p-4 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-right transition-colors cursor-pointer space-y-1"
            >
              <span className="text-[10px] font-bold text-[#1a73e8] uppercase">Next Guide</span>
              <div className="text-xs font-bold text-slate-900 line-clamp-1">{nextPost.title}</div>
            </button>
          )}
        </nav>
      </main>
    </div>
  );
};
