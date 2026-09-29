import React, { useState } from 'react';
import { BLOG_POSTS } from '../data/blogPostsData';
import { BlogPost, BlogCategory } from '../types';
import {
  BookOpen,
  Search,
  Clock,
  User,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  FileText,
  Share2,
  Copy,
  Check,
  Sparkles,
  ExternalLink,
  Code2,
  AlertTriangle,
  Lightbulb,
} from 'lucide-react';
import { NavTabType } from './Navbar';

interface BlogHubProps {
  onNavigateToTab?: (tab: NavTabType) => void;
}

export const BlogHub: React.FC<BlogHubProps> = ({ onNavigateToTab }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeArticle, setActiveArticle] = useState<BlogPost | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);
  const [expandedFaqIndex, setExpandedFaqIndex] = useState<number | null>(null);

  const categories: Array<'All' | BlogCategory> = [
    'All',
    'AdSense Approval & Rejection Doctor',
    'E-E-A-T & Google Search Quality',
    'High-RPM Niches & KGR Keyword Research',
    'Legal Compliance & Privacy Disclosures',
    'Technical SEO & $0 Static Architecture',
  ];

  // Filter articles
  const filteredPosts = BLOG_POSTS.filter((post) => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.primaryKeyword.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.directAnswerSummary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleCopySlug = (slug: string) => {
    navigator.clipboard.writeText(`${window.location.origin}/#blog-${slug}`);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleOpenArticle = (post: BlogPost) => {
    setActiveArticle(post);
    setExpandedFaqIndex(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-8">
      {/* Editorial Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 text-white shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-3 py-0.5 text-xs font-bold rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/40">
                Official Knowledge Base
              </span>
              <span className="text-xs text-slate-400">• Google's 100% Quality Standard</span>
              <span className="text-xs text-emerald-400 font-mono font-bold">• 27 Complete Guides</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-['Google_Sans',sans-serif]">
              Google AdSense Compliance & Search Monetization Guides
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
              Every guide below is engineered according to Google's 6 evaluation layers: automated crawlers, Core Ranking Algorithms, Search Quality Raters, search engineers, AdSense bots, and policy inspectors.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 shrink-0 text-right space-y-1">
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Published Library</div>
            <div className="text-2xl font-black font-mono text-emerald-400">27 / 27</div>
            <div className="text-[11px] text-slate-400">Zero Fluff • 100% Information Gain</div>
          </div>
        </div>
      </div>

      {/* If an article is active, show the Full Article Reader View */}
      {activeArticle ? (
        <article className="bg-white rounded-3xl border border-slate-200 shadow-md overflow-hidden animate-in fade-in duration-200">
          {/* Reader Top Bar */}
          <div className="p-4 sm:p-6 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
            <button
              onClick={() => setActiveArticle(null)}
              className="text-xs font-bold text-[#1a73e8] hover:text-[#1557b0] flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>← Back to All 27 Guides</span>
            </button>

            <div className="flex items-center gap-3">
              <button
                onClick={() => handleCopySlug(activeArticle.slug)}
                className="text-xs text-slate-600 hover:text-slate-900 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedLink ? 'Link Copied!' : 'Share Guide'}</span>
              </button>
            </div>
          </div>

          {/* Reader Header */}
          <div className="p-6 sm:p-10 max-w-4xl mx-auto space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#e8f0fe] text-[#1a73e8]">
                {activeArticle.category}
              </span>
              <span className="text-xs text-slate-500 font-mono">• {activeArticle.readTime}</span>
              <span className="text-xs text-slate-500 font-mono">• Published {activeArticle.publishDate}</span>
              <span className="text-xs bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium">
                Intent: {activeArticle.intent}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-['Google_Sans',sans-serif] leading-tight">
              {activeArticle.title}
            </h1>

            <p className="text-base text-slate-600 leading-relaxed">
              {activeArticle.subtitle}
            </p>

            {/* Author Attribution Card (E-E-A-T Standard) */}
            <div className="flex items-center justify-between gap-3 py-3 border-y border-slate-100 flex-wrap">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#1a73e8] text-white flex items-center justify-center font-bold text-sm shrink-0">
                  {activeArticle.author.name.charAt(0)}
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">{activeArticle.author.name}</div>
                  <div className="text-[11px] text-slate-500">{activeArticle.author.role}</div>
                </div>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] text-slate-600 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Peer-Reviewed by GladSense Policy & Monetization Board</span>
              </div>
            </div>

            {/* Layer 2 Direct Answer Summary Box (First 200 Words Rule) */}
            <div className="p-5 rounded-2xl bg-blue-50/70 border border-blue-200 text-xs sm:text-sm text-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-[#1a73e8] font-bold text-xs uppercase tracking-wider">
                <Sparkles className="w-4 h-4" />
                <span>Executive Answer (Query Resolution in First 200 Words)</span>
              </div>
              <p className="leading-relaxed font-medium">
                {activeArticle.directAnswerSummary}
              </p>
            </div>

            {/* Main Article Sections */}
            <div className="space-y-8 pt-6">
              {activeArticle.sections.map((section, idx) => (
                <section key={idx} className="space-y-4">
                  <h2 className="text-xl font-bold text-slate-900 font-['Google_Sans',sans-serif] border-b border-slate-100 pb-2">
                    {section.heading}
                  </h2>

                  <p className="text-sm text-slate-700 leading-relaxed">
                    {section.content}
                  </p>

                  {/* Subheadings if present */}
                  {section.subheadings && (
                    <div className="grid grid-cols-1 gap-3 pt-2">
                      {section.subheadings.map((sub, subIdx) => (
                        <div key={subIdx} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                          <h3 className="text-sm font-bold text-slate-900">{sub.title}</h3>
                          <p className="text-xs text-slate-600 leading-relaxed">{sub.content}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Callout box if present */}
                  {section.callout && (
                    <div className={`p-4 rounded-xl text-xs space-y-1 ${
                      section.callout.type === 'warning'
                        ? 'bg-rose-50 border border-rose-200 text-rose-900'
                        : section.callout.type === 'data'
                        ? 'bg-blue-50 border border-blue-200 text-blue-950 font-mono'
                        : section.callout.type === 'checklist'
                        ? 'bg-emerald-50 border border-emerald-200 text-emerald-950'
                        : 'bg-purple-50 border border-purple-200 text-purple-900'
                    }`}>
                      <div className="font-bold flex items-center gap-1.5 uppercase text-[10px] tracking-wider">
                        {section.callout.type === 'warning' && <AlertTriangle className="w-3.5 h-3.5" />}
                        {section.callout.type === 'checklist' && <CheckCircle2 className="w-3.5 h-3.5" />}
                        {section.callout.type === 'data' && <FileText className="w-3.5 h-3.5" />}
                        <span>Key Editorial Takeaway</span>
                      </div>
                      <p className="leading-relaxed whitespace-pre-line">{section.callout.text}</p>
                    </div>
                  )}

                  {/* Code snippet if present */}
                  {section.codeSnippet && (
                    <div className="rounded-xl overflow-hidden border border-slate-800 bg-slate-900 text-slate-200 text-xs font-mono">
                      <div className="px-4 py-2 bg-slate-950 border-b border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
                        <span>Code Implementation</span>
                        <Code2 className="w-3.5 h-3.5" />
                      </div>
                      <pre className="p-4 overflow-x-auto whitespace-pre leading-relaxed">
                        <code>{section.codeSnippet}</code>
                      </pre>
                    </div>
                  )}

                  {/* Table data if present */}
                  {section.tableData && (
                    <div className="overflow-x-auto border border-slate-200 rounded-xl">
                      <table className="w-full text-left text-xs border-collapse">
                        <thead>
                          <tr className="bg-slate-50 border-b border-slate-200 text-slate-700">
                            {section.tableData.headers.map((h, hIdx) => (
                              <th key={hIdx} className="py-2.5 px-3.5 font-bold uppercase tracking-wider">{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-slate-800">
                          {section.tableData.rows.map((row, rIdx) => (
                            <tr key={rIdx} className="hover:bg-slate-50/60">
                              {row.map((cell, cIdx) => (
                                <td key={cIdx} className={`py-3 px-3.5 ${cIdx === 0 ? 'font-bold text-slate-900' : ''}`}>
                                  {cell}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </section>
              ))}
            </div>

            {/* FAQ Accordion Section */}
            {activeArticle.faqs.length > 0 && (
              <div className="pt-8 border-t border-slate-200 space-y-4">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold text-slate-900 font-['Google_Sans',sans-serif]">
                    Frequently Asked Questions
                  </h3>
                  <span className="text-xs text-slate-500 font-mono">• Schema.org FAQPage</span>
                </div>

                <div className="space-y-2">
                  {activeArticle.faqs.map((faq, fIdx) => {
                    const isExpanded = expandedFaqIndex === fIdx;
                    return (
                      <div
                        key={fIdx}
                        className="rounded-xl border border-slate-200 bg-white overflow-hidden transition-colors"
                      >
                        <button
                          onClick={() => setExpandedFaqIndex(isExpanded ? null : fIdx)}
                          className="w-full p-4 text-left font-bold text-xs text-slate-900 flex items-center justify-between gap-3 hover:bg-slate-50 cursor-pointer"
                        >
                          <span>{faq.question}</span>
                          {isExpanded ? <ChevronUp className="w-4 h-4 shrink-0 text-slate-500" /> : <ChevronDown className="w-4 h-4 shrink-0 text-slate-500" />}
                        </button>
                        {isExpanded && (
                          <div className="p-4 pt-0 text-xs text-slate-600 border-t border-slate-100 bg-slate-50/50 leading-relaxed">
                            {faq.answer}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Related Tools Callout */}
            {activeArticle.relatedToolLinks.length > 0 && onNavigateToTab && (
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-8">
                <div>
                  <div className="text-xs font-bold text-slate-900">Recommended GladSense Diagnostic Action:</div>
                  <div className="text-xs text-slate-600">Test your website with our automated auditing suites.</div>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  {activeArticle.relatedToolLinks.map((link, lIdx) => (
                    <button
                      key={lIdx}
                      onClick={() => onNavigateToTab(link.tabId as any)}
                      className="px-4 py-2 bg-[#1a73e8] hover:bg-[#1557b0] text-white font-bold text-xs rounded-xl transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>{link.label}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </article>
      ) : (
        /* Blog Directory List View */
        <div className="space-y-6">
          {/* Controls: Search and Category Pills */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search across all 27 compliance guides and SOPs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-xs text-slate-900 focus:outline-none focus:border-[#1a73e8]"
              />
            </div>

            <span className="text-xs text-slate-500 font-medium">
              Showing {filteredPosts.length} of {BLOG_POSTS.length} articles
            </span>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`text-xs px-3.5 py-1.5 rounded-xl font-medium transition-all whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-slate-900 text-white font-bold shadow-xs'
                    : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* 27 Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredPosts.map((post) => (
              <div
                key={post.id}
                onClick={() => handleOpenArticle(post)}
                className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs hover:shadow-md hover:border-slate-300 transition-all cursor-pointer flex flex-col justify-between group"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] font-bold text-[#1a73e8] bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-100 line-clamp-1">
                      {post.category}
                    </span>
                    <span className="text-[11px] text-slate-500 font-mono shrink-0">
                      {post.readTime}
                    </span>
                  </div>

                  <h3 className="font-bold text-sm sm:text-base text-slate-900 group-hover:text-[#1a73e8] transition-colors line-clamp-2 leading-snug">
                    {post.title}
                  </h3>

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {post.subtitle}
                  </p>

                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 text-[11px] text-slate-700 line-clamp-2 leading-relaxed">
                    <strong className="text-slate-900">Direct Answer:</strong> {post.directAnswerSummary}
                  </div>
                </div>

                <div className="pt-3 mt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-medium">By {post.author.name}</span>
                  <span className="font-bold text-[#1a73e8] flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                    <span>Read Guide</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
