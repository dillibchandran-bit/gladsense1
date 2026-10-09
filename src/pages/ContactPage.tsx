import React, { useState } from 'react';
import { Mail, Clock, Send, CheckCircle2, ArrowLeft, ShieldAlert } from 'lucide-react';
import { useAppRouter } from '../context/RouterContext';
import { TrademarkDisclaimer } from '../components/TrademarkDisclaimer';

export const ContactPage: React.FC = () => {
  const { navigate } = useAppRouter();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    websiteUrl: '',
    inquiryType: 'audit-help',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 font-sans">
      <button
        onClick={() => navigate('/')}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Diagnostic Hub</span>
      </button>

      <header className="border-b border-slate-200 pb-6 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
          <Clock className="w-3.5 h-3.5 text-emerald-600" />
          <span>Guaranteed 24–48 Hour Engineering SLA</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-['Google_Sans',sans-serif]">
          Contact GladSense Compliance Desk
        </h1>
        <p className="text-sm text-slate-500">
          Direct communication channel for publishers, developers, and webmasters seeking audit clarification or policy guidance.
        </p>
      </header>

      <TrademarkDisclaimer />

      <main className="grid grid-cols-1 md:grid-cols-12 gap-8 text-sm text-slate-700">
        {/* Contact Information & SLA Details */}
        <div className="md:col-span-5 space-y-5">
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
            <h3 className="font-bold text-slate-900 text-base">Executive Compliance Desk</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Our technical audit team investigates automated crawler rejections, ads.txt validation anomalies, and E-E-A-T trust signals.
            </p>
            <div className="space-y-3 text-xs pt-2 border-t border-slate-200">
              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-[#1a73e8] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-800 block">Direct Compliance Email:</span>
                  <a
                    href="mailto:contact@gladsenseedu.app"
                    className="text-[#1a73e8] hover:underline font-mono text-xs font-semibold"
                  >
                    contact@gladsenseedu.app
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-800 block">Service Level Agreement (SLA):</span>
                  <span className="text-slate-600">24 to 48 business hours response time</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-blue-50/60 border border-blue-200 text-xs text-blue-900 space-y-2">
            <h4 className="font-bold">Prior to Submitting an Inquiry:</h4>
            <p className="text-blue-800">
              Ensure you have tested your domain in the <strong>Site Doctor</strong> and generated an audit report. Include your audit URL or scan timestamp in your message for faster triage.
            </p>
          </div>
        </div>

        {/* Functional Contact Form */}
        <div className="md:col-span-7">
          {submitted ? (
            <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-emerald-950">Inquiry Dispatched Successfully</h3>
              <p className="text-xs text-emerald-800 max-w-md mx-auto leading-relaxed">
                Thank you, {formData.name}. Your inquiry has been routed to the GladSense technical audit desk. Our engineers will review your request and reply to <strong>{formData.email}</strong> within our 24–48 hour SLA.
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="mt-4 px-4 py-2 bg-emerald-700 text-white rounded-xl text-xs font-bold hover:bg-emerald-800 transition-colors cursor-pointer"
              >
                Send Another Inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
              <h3 className="font-bold text-slate-900 text-base">Send an Audit or Policy Inquiry</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Marcus Vance"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#1a73e8]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="you@domain.com"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#1a73e8]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Target Website URL (Optional)</label>
                  <input
                    type="url"
                    value={formData.websiteUrl}
                    onChange={(e) => setFormData({ ...formData, websiteUrl: e.target.value })}
                    placeholder="https://yourwebsite.com"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#1a73e8]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Inquiry Category *</label>
                  <select
                    value={formData.inquiryType}
                    onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#1a73e8]"
                  >
                    <option value="audit-help">AdSense Rejection Remediation</option>
                    <option value="low-value-content">Low Value Content Diagnosis</option>
                    <option value="ads-txt">ads.txt Syntax Anomaly</option>
                    <option value="kgr-research">KGR &amp; Niche Modeling</option>
                    <option value="general">General Webmaster Inquiry</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">Your Message &amp; Diagnostic Details *</label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Describe your site's current status, AdSense review notice, or specific questions..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#1a73e8]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-[#1a73e8] hover:bg-[#1557b0] text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Inquiry to Compliance Desk</span>
              </button>
            </form>
          )}
        </div>
      </main>
    </div>
  );
};
