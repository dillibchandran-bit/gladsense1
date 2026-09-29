import React, { useState } from 'react';
import { BLOG_POSTS } from '../data/blogPostsData';
import { GLADSENSE_AUTHORS, GladSenseAuthor } from '../data/authorsData';
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
  Building2,
  Award,
  Users,
  Briefcase,
} from 'lucide-react';
import { NavTabType } from './Navbar';

interface BlogHubProps {
  onNavigateToTab?: (tab: NavTabType) => void;
}

export const BlogHub: React.FC<BlogHubProps> = ({ onNavigateToTab }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedTeam, setSelectedTeam] = useState<string>('All');
  const [showTeamsOverview, setShowTeamsOverview] = useState(false);
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

  const authorList = Object.values(GLADSENSE_AUTHORS);
  const teamsList = ['All', ...Array.from(new Set(authorList.map((a) => a.team)))];

  // Filter articles
  const filteredPosts = BLOG_POSTS.filter((post) => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesTeam = selectedTeam === 'All' || post.author.team === selectedTeam;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.primaryKeyword.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.directAnswerSummary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.author.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.author.team.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesTeam && matchesSearch;
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

  // Find matching author details from registry
  const getAuthorDetails = (authorName: string): GladSenseAuthor | undefined => {
    return authorList.find((a) => a.name.toLowerCase() === authorName.toLowerCase());
  };

  return (
    <div className="space-y-8">
      {/* Editorial Header Banner */}
      <div className="p-6 sm:p-10 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 text-white shadow-xl space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-3 py-0.5 text-xs font-bold rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/40">
                Official Knowledge Base
              </span>
              <span className="text-xs text-slate-400">• Institutional E-E-A-T Standard</span>
              <span className="text-xs text-emerald-400 font-mono font-bold">• 7 Research Divisions</span>
              <span className="text-xs text-purple-300 font-mono font-bold">• 27 Peer-Reviewed Manuals</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-['Google_Sans',sans-serif]">
              Google AdSense Compliance & Search Monetization Institute
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
              Every manual is authored by specialized GladSense departmental research units—combining former publisher policy directors, quantitative SEO data scientists, static edge infrastructure engineers, and programmatic ad yield strategists.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 shrink-0 text-center md:text-right space-y-1">
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Institutional Corpus</div>
            <div className="text-2xl font-black font-mono text-emerald-400">27 / 27</div>
            <div className="text-[11px] text-slate-400">100% Peer-Reviewed • Zero Fluff</div>
          </div>
        </div>

        {/* Toggleable Organizational Research Divisions Drawer */}
        <div className="pt-2 border-t border-slate-800/80">
          <button
            type="button"
            onClick={() => setShowTeamsOverview(!showTeamsOverview)}
            className="inline-flex items-center gap-2 text-xs font-bold text-blue-400 hover:text-blue-300 transition-colors cursor-pointer"
          >
            <Building2 className="w-4 h-4 text-blue-400" />
            <span>
              {showTeamsOverview
                ? 'Hide GladSense Research Divisions & Editorial Leadership'
                : 'Meet the 7 GladSense Research Divisions & Editorial Leadership'}
            </span>
            {showTeamsOverview ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {showTeamsOverview && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-4 animate-in fade-in duration-200">
              {authorList.map((author) => (
                <div
                  key={author.id}
                  className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800/90 space-y-2 text-left"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-9 h-9 rounded-xl ${author.avatarBg} text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-xs`}
                    >
                      {author.name.charAt(0)}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">{author.name}</div>
                      <div className="text-[10px] text-blue-400 font-semibold">{author.team}</div>
                    </div>
                  </div>
                  <div className="text-[11px] text-slate-300 font-medium">{author.role}</div>
                  <p className="text-[11px] text-slate-400 leading-relaxed pt-1 border-t border-slate-900">
                    {author.shortBio}
                  </p>
                </div>
              ))}
            </div>
          )}
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
          <div className="p-6 sm:p-10 max-w-4xl mx-auto space-y-5">
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

            {/* Author & Department Attribution Card (Institutional E-E-A-T Standard) */}
            {(() => {
              const authorData = getAuthorDetails(activeArticle.author.name);
              const avatarClass = authorData ? authorData.avatarBg : 'bg-blue-600';
              return (
                <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-12 h-12 rounded-2xl ${avatarClass} text-white flex items-center justify-center font-bold text-base shrink-0 shadow-xs`}
                      >
                        {activeArticle.author.name.charAt(0)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-sm font-extrabold text-slate-900 font-['Google_Sans',sans-serif]">
                            {activeArticle.author.name}
                          </span>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-[#1a73e8] border border-blue-200">
                            {activeArticle.author.team}
                          </span>
                        </div>
                        <div className="text-xs text-slate-600 font-medium">
                          {activeArticle.author.role}
                        </div>
                      </div>
                    </div>

                    <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200 shrink-0">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      <span>Peer-Reviewed by GladSense Executive Research Council</span>
                    </div>
                  </div>

                  {authorData && (
                    <p className="text-xs text-slate-500 leading-relaxed pt-2 border-t border-slate-200/60">
                      <strong>Author Profile:</strong> {authorData.shortBio}
                    </p>
                  )}
                </div>
              );
            })()}

            {/* Layer 2 Direct Answer Summary Box (First 200 Words Rule) */}
            <div className="p-5 rounded-2xl bg-blue-50/70 border border-blue-200 text-xs sm:text-sm text-slate-800 space-y-2">
              <div className="font-bold text-[#1a73e8] flex items-center gap-1.5 uppercase tracking-wide text-xs">
                <Sparkles className="w-4 h-4" />
                <span>Executive Answer & Immediate Takeaway:</span>
              </div>
              <p className="leading-relaxed">{activeArticle.directAnswerSummary}</p>
            </div>

            {/* Article Content Sections */}
            <div className="pt-4 space-y-10 text-slate-800 text-sm sm:text-base leading-relaxed">
              {activeArticle.sections.map((section, sIdx) => (
                <section key={sIdx} className="space-y-4">
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-['Google_Sans',sans-serif] tracking-tight">
                    {section.heading}
                  </h2>

                  <p className="leading-relaxed text-slate-700">{section.content}</p>

                  {/* Subheadings */}
                  {section.subheadings && (
                    <div className="space-y-4 pt-2">
                      {section.subheadings.map((sub, subIdx) => (
                        <div key={subIdx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                          <h3 className="font-bold text-slate-900 text-sm sm:text-base font-['Google_Sans',sans-serif]">
                            {sub.title}
                          </h3>
                          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{sub.content}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Callout Box */}
                  {section.callout && (
                    <div
                      className={`p-4 rounded-xl border flex items-start gap-3 text-xs sm:text-sm leading-relaxed ${
                        section.callout.type === 'warning'
                          ? 'bg-rose-50 border-rose-200 text-rose-900'
                          : section.callout.type === 'tip'
                          ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                          : section.callout.type === 'checklist'
                          ? 'bg-purple-50 border-purple-200 text-purple-900'
                          : 'bg-amber-50 border-amber-200 text-amber-900'
                      }`}
                    >
                      <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                      <span>{section.callout.text}</span>
                    </div>
                  )}

                  {/* Code Snippet */}
                  {section.codeSnippet && (
                    <div className="p-4 rounded-2xl bg-slate-950 text-slate-100 font-mono text-xs overflow-x-auto border border-slate-800">
                      <pre>
                        <code>{section.codeSnippet}</code>
                      </pre>
                    </div>
                  )}

                  {/* Data Table */}
                  {section.tableData && (
                    <div className="overflow-x-auto rounded-2xl border border-slate-200 my-4 shadow-xs">
                      <table className="w-full text-xs text-left border-collapse">
                        <thead className="bg-slate-100 border-b border-slate-200">
                          <tr>
                            {section.tableData.headers.map((h, hIdx) => (
                              <th key={hIdx} className="p-3 font-bold text-slate-900">
                                {h}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 bg-white">
                          {section.tableData.rows.map((r, rIdx) => (
                            <tr key={rIdx} className="hover:bg-slate-50 transition-colors">
                              {r.map((cell, cIdx) => (
                                <td key={cIdx} className="p-3 text-slate-700">
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
          {/* Controls: Search and Department Filters */}
          <div className="space-y-3">
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search by topic, keyword, author, or research division..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-xs text-slate-900 focus:outline-none focus:border-[#1a73e8]"
                />
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs text-slate-500 font-medium">
                  Showing {filteredPosts.length} of {BLOG_POSTS.length} articles
                </span>
                {(selectedCategory !== 'All' || selectedTeam !== 'All' || searchQuery) && (
                  <button
                    onClick={() => {
                      setSelectedCategory('All');
                      setSelectedTeam('All');
                      setSearchQuery('');
                    }}
                    className="text-xs font-bold text-[#1a73e8] hover:underline cursor-pointer"
                  >
                    Reset Filters
                  </button>
                )}
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="space-y-2">
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider shrink-0 mr-1">
                  Category:
                </span>
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

              {/* Research Division Filter Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider shrink-0 mr-1">
                  Division:
                </span>
                {teamsList.map((team) => (
                  <button
                    key={team}
                    onClick={() => setSelectedTeam(team)}
                    className={`text-[11px] px-3 py-1 rounded-xl font-medium transition-all whitespace-nowrap cursor-pointer ${
                      selectedTeam === team
                        ? 'bg-blue-600 text-white font-bold shadow-xs'
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200'
                    }`}
                  >
                    {team}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 27 Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredPosts.map((post) => {
              const authorData = getAuthorDetails(post.author.name);
              const avatarBg = authorData ? authorData.avatarBg : 'bg-blue-600';

              return (
                <div
                  key={post.id}
                  onClick={() => handleOpenArticle(post)}
                  className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs hover:shadow-md hover:border-slate-300 transition-all cursor-pointer flex flex-col justify-between group"
                >
                  <div className="space-y-3">
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

                  <div className="pt-3.5 mt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                    {/* Author & Organization Attribution */}
                    <div className="flex items-center gap-2 overflow-hidden pr-2">
                      <div
                        className={`w-6 h-6 rounded-full ${avatarBg} text-white font-bold text-[10px] flex items-center justify-center shrink-0`}
                      >
                        {post.author.name.charAt(0)}
                      </div>
                      <div className="truncate">
                        <span className="text-slate-800 font-bold block truncate">{post.author.name}</span>
                        <span className="text-[10px] text-slate-400 block truncate">{post.author.team}</span>
                      </div>
                    </div>

                    <span className="font-bold text-[#1a73e8] flex items-center gap-1 group-hover:translate-x-0.5 transition-transform shrink-0">
                      <span>Read</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
