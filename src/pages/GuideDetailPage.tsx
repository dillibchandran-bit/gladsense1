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
} from 'lucide-react';
import { TrademarkDisclaimer } from '../components/TrademarkDisclaimer';
import { AdSlotPlaceholder } from '../components/monetization/AdPlaceholders';

export const GuideDetailPage: React.FC = () => {
  const { state, navigate } = useAppRouter();
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
          View All 27 Guides
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

          <button
            onClick={handleCopyLink}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-medium text-slate-700 shadow-2xs cursor-pointer transition-all"
          >
            {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedLink ? 'Canonical Link Copied!' : 'Share Guide'}</span>
          </button>
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

      {/* Main Content Sections */}
      <main className="space-y-8 text-sm text-slate-700 leading-relaxed">
        {post.sections.map((section, idx) => (
          <section key={idx} className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-['Google_Sans',sans-serif] tracking-tight">
              {section.heading}
            </h2>

            <p className="text-slate-700 leading-relaxed text-sm">
              {section.content}
            </p>

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

        {/* Ad Placement Below Content */}
        <AdSlotPlaceholder format="in-content-728" />

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
