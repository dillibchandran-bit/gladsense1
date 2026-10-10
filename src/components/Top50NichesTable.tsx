import React, { useState } from 'react';
import { Search, ArrowUpDown, Filter, Download, Copy, Check, Sparkles, TrendingUp, DollarSign } from 'lucide-react';
import { KidExplainer } from './KidExplainer';

export interface NicheCpcRow {
  rank: number;
  niche: string;
  category: string;
  avgCpc: number;
  avgRpm: number;
  tier1Rpm: number;
  competition: 'Low' | 'Moderate' | 'High';
  approvalEase: 'High' | 'Moderate' | 'Strict';
  primaryToolType: string;
}

export const TOP_50_NICHES: NicheCpcRow[] = [
  { rank: 1, niche: 'Structured Settlement & Annuity Buyouts', category: 'Finance', avgCpc: 18.50, avgRpm: 68.00, tier1Rpm: 85.00, competition: 'High', approvalEase: 'Strict', primaryToolType: 'Lump Sum Present Value Calculator' },
  { rank: 2, niche: 'Mesothelioma & Mass Tort Legal Solvers', category: 'Legal', avgCpc: 16.80, avgRpm: 64.00, tier1Rpm: 80.00, competition: 'High', approvalEase: 'Strict', primaryToolType: 'Statute of Limitations Calculator' },
  { rank: 3, niche: 'Commercial Truck & Auto Accident Claims', category: 'Legal', avgCpc: 14.50, avgRpm: 58.00, tier1Rpm: 72.00, competition: 'High', approvalEase: 'Moderate', primaryToolType: 'Settlement Pain & Suffering Estimator' },
  { rank: 4, niche: 'Enterprise Cybersecurity & HIPAA Compliance', category: 'Tech & B2B', avgCpc: 12.20, avgRpm: 52.00, tier1Rpm: 65.00, competition: 'Moderate', approvalEase: 'High', primaryToolType: 'Risk Assessment Scorecard Tool' },
  { rank: 5, niche: 'Commercial Mortgage & Bridge Loans', category: 'Finance', avgCpc: 11.40, avgRpm: 48.00, tier1Rpm: 60.00, competition: 'Moderate', approvalEase: 'Moderate', primaryToolType: 'DSCR Loan Amortization Calculator' },
  { rank: 6, niche: 'Offshore Merchant Accounts & Payment Gateways', category: 'Finance', avgCpc: 9.80, avgRpm: 46.00, tier1Rpm: 58.00, competition: 'Moderate', approvalEase: 'Moderate', primaryToolType: 'Interchange Fee & Margin Calculator' },
  { rank: 7, niche: 'Cloud Infrastructure & AWS Cloud Cost Optimization', category: 'Tech & B2B', avgCpc: 8.90, avgRpm: 44.00, tier1Rpm: 55.00, competition: 'Low', approvalEase: 'High', primaryToolType: 'EC2 & S3 Bandwidth Transfer Sizer' },
  { rank: 8, niche: 'B2B CRM & Enterprise ERP Migration', category: 'Tech & B2B', avgCpc: 8.50, avgRpm: 42.00, tier1Rpm: 52.00, competition: 'Low', approvalEase: 'High', primaryToolType: 'Per-Seat Software Licensing TCO Calculator' },
  { rank: 9, niche: 'Solar Panel Grid-Tie & Battery Storage', category: 'Renewable Tech', avgCpc: 7.90, avgRpm: 39.00, tier1Rpm: 48.00, competition: 'Low', approvalEase: 'High', primaryToolType: 'Kilowatt-Hour Sizing & Net Metering Tool' },
  { rank: 10, niche: 'HVAC Load Sizing & Commercial Airflow (CFM)', category: 'Trades & Craft', avgCpc: 6.80, avgRpm: 36.00, tier1Rpm: 45.00, competition: 'Low', approvalEase: 'High', primaryToolType: 'Manual J Duct Friction & Room CFM Sizer' },
  { rank: 11, niche: 'Professional Licensure (Bar, CPA, NCLEX Prep)', category: 'Education', avgCpc: 6.20, avgRpm: 34.00, tier1Rpm: 42.00, competition: 'Low', approvalEase: 'High', primaryToolType: 'Exam Passing Score & Curve Calculator' },
  { rank: 12, niche: 'Cap Rate & Commercial Real Estate Cash-on-Cash', category: 'Real Estate', avgCpc: 5.90, avgRpm: 33.00, tier1Rpm: 41.00, competition: 'Low', approvalEase: 'High', primaryToolType: 'NOI & Rental Property Yield Modeler' },
  { rank: 13, niche: 'Private Student Loan Refinancing & Consolidation', category: 'Education & Finance', avgCpc: 5.50, avgRpm: 31.00, tier1Rpm: 39.00, competition: 'Moderate', approvalEase: 'High', primaryToolType: 'Interest Rate Payoff & Savings Solver' },
  { rank: 14, niche: 'Medical Malpractice Claim Viability & Timelines', category: 'Legal', avgCpc: 5.20, avgRpm: 30.00, tier1Rpm: 38.00, competition: 'Moderate', approvalEase: 'Moderate', primaryToolType: 'Procedural Notice Filing Countdown' },
  { rank: 15, niche: 'Epoxy Resin & Woodworking Volume Ratios', category: 'Trades & Craft', avgCpc: 4.80, avgRpm: 28.00, tier1Rpm: 35.00, competition: 'Low', approvalEase: 'High', primaryToolType: 'Deep Pour Liquid Volume & Weight Converter' },
  { rank: 16, niche: 'Higher Education GPA & ECTS European Credit Converter', category: 'Education', avgCpc: 4.50, avgRpm: 27.00, tier1Rpm: 34.00, competition: 'Low', approvalEase: 'High', primaryToolType: 'German Bavarian Formula Grade Converter' },
  { rank: 17, niche: 'Computer Science Big O & Regex Builders', category: 'Education & Tech', avgCpc: 4.20, avgRpm: 26.50, tier1Rpm: 32.00, competition: 'Low', approvalEase: 'High', primaryToolType: 'Regex Tester & Time Complexity Evaluator' },
  { rank: 18, niche: 'Concrete Slab Bag & Yardage Estimator', category: 'Trades & Craft', avgCpc: 3.90, avgRpm: 25.00, tier1Rpm: 31.00, competition: 'Low', approvalEase: 'High', primaryToolType: 'Cubic Yard Concrete & Rebar Grid Calculator' },
  { rank: 19, niche: 'Tire Size Speedometer Calibration & Gear Ratios', category: 'Automotive', avgCpc: 3.60, avgRpm: 24.00, tier1Rpm: 30.00, competition: 'Low', approvalEase: 'High', primaryToolType: 'Rim Offset & Speed Error Calculator' },
  { rank: 20, niche: 'Laboratory Serial Dilution & Buffer Chemistry', category: 'Education & Science', avgCpc: 3.40, avgRpm: 23.50, tier1Rpm: 29.00, competition: 'Low', approvalEase: 'High', primaryToolType: 'C1V1 = C2V2 Chemical Molarity Tool' },
  { rank: 21, niche: 'Schengen 90/180 Days Visa Stay Calculator', category: 'Travel & Civic', avgCpc: 3.20, avgRpm: 22.00, tier1Rpm: 28.00, competition: 'Low', approvalEase: 'High', primaryToolType: 'Rolling Visa Day Counter & Exit Date Alert' },
  { rank: 22, niche: 'TDEE & Caloric Deficit Macro Split', category: 'Health & Fitness', avgCpc: 3.00, avgRpm: 21.00, tier1Rpm: 26.00, competition: 'Moderate', approvalEase: 'High', primaryToolType: 'Katch-McArdle Body Fat & Calorie Calculator' },
  { rank: 23, niche: 'Land Subdivision & Topographical Acreage', category: 'Real Estate & Craft', avgCpc: 2.90, avgRpm: 20.50, tier1Rpm: 25.00, competition: 'Low', approvalEase: 'High', primaryToolType: 'Square Feet to Acreage Grid Calculator' },
  { rank: 24, niche: 'Sourdough Baker Percentages & Hydration', category: 'Food & Culinary', avgCpc: 2.70, avgRpm: 19.00, tier1Rpm: 24.00, competition: 'Low', approvalEase: 'High', primaryToolType: 'Flour Hydration & Starter Percentage Tool' },
  { rank: 25, niche: 'Statistical Sample Size & T-Test Power', category: 'Education & Science', avgCpc: 2.60, avgRpm: 18.50, tier1Rpm: 23.00, competition: 'Low', approvalEase: 'High', primaryToolType: 'Margin of Error & P-Value Statistical Solver' },
  { rank: 26, niche: 'Audio Decibel Attenuation & Speaker Wire Gauge', category: 'Audio & Media', avgCpc: 2.50, avgRpm: 18.00, tier1Rpm: 22.50, competition: 'Low', approvalEase: 'High', primaryToolType: 'Ohm Load & Speaker Cable Resistance Tool' },
  { rank: 27, niche: 'Aquarium Water Volume & Salt Salinity Specific Gravity', category: 'Hobby & Care', avgCpc: 2.40, avgRpm: 17.50, tier1Rpm: 22.00, competition: 'Low', approvalEase: 'High', primaryToolType: 'Reef Tank Salt Mix & Dosing Calculator' },
  { rank: 28, niche: 'Child Support Guidelines by State Worksheet', category: 'Civic & Legal', avgCpc: 2.30, avgRpm: 17.00, tier1Rpm: 21.00, competition: 'Low', approvalEase: 'High', primaryToolType: 'Net Disposable Income Support Estimator' },
  { rank: 29, niche: 'Dog Calorie Food Ration by Weight & Activity', category: 'Pet Care', avgCpc: 2.20, avgRpm: 16.50, tier1Rpm: 20.50, competition: 'Low', approvalEase: 'High', primaryToolType: 'Canine RER/MER Daily Grams Calculator' },
  { rank: 30, niche: 'Video Bitrate & Streaming Bandwidth Transfer', category: 'Tech & Media', avgCpc: 2.10, avgRpm: 16.00, tier1Rpm: 20.00, competition: 'Low', approvalEase: 'High', primaryToolType: 'OBS Bitrate & File Size Estimator' },
  { rank: 31, niche: 'Crochet Yarn Yardage & Stitch Count Scale', category: 'Hobby & Craft', avgCpc: 2.00, avgRpm: 15.50, tier1Rpm: 19.50, competition: 'Low', approvalEase: 'High', primaryToolType: 'Pattern Yarn Weight & Skein Calculator' },
  { rank: 32, niche: 'Gardening Soil Amendment & NPK Fertilizer Ratio', category: 'Gardening', avgCpc: 1.95, avgRpm: 15.00, tier1Rpm: 19.00, competition: 'Low', approvalEase: 'High', primaryToolType: 'Nitrogen-Phosphorus-Potassium Mix Sizer' },
  { rank: 33, niche: 'Horse Weight Estimator by Heart Girth Measurement', category: 'Pet & Farm', avgCpc: 1.90, avgRpm: 14.50, tier1Rpm: 18.50, competition: 'Low', approvalEase: 'High', primaryToolType: 'Equine Body Weight Formula Solver' },
  { rank: 34, niche: 'Candle Wax & Fragrance Oil Percentage Sizer', category: 'Hobby & Craft', avgCpc: 1.85, avgRpm: 14.00, tier1Rpm: 18.00, competition: 'Low', approvalEase: 'High', primaryToolType: 'Soy Wax Density & Fragrance Load Tool' },
  { rank: 35, niche: 'K-12 Triangle Trigonometry & Angle Solver', category: 'Education', avgCpc: 1.80, avgRpm: 13.80, tier1Rpm: 17.50, competition: 'Moderate', approvalEase: 'High', primaryToolType: 'SOH-CAH-TOA Step-by-Step Triangle Solver' },
  { rank: 36, niche: 'Sewing Quilt Binding & Yardage Cutting Grid', category: 'Hobby & Craft', avgCpc: 1.75, avgRpm: 13.50, tier1Rpm: 17.00, competition: 'Low', approvalEase: 'High', primaryToolType: 'Fabric Width & Fat Quarter Cutting Guide' },
  { rank: 37, niche: 'Beer Homebrewing Specific Gravity & ABV Sizer', category: 'Hobby & Craft', avgCpc: 1.70, avgRpm: 13.00, tier1Rpm: 16.50, competition: 'Low', approvalEase: 'High', primaryToolType: 'Original Gravity to Final Gravity Alcohol Tool' },
  { rank: 38, niche: 'Welding Gas Flow & Wire Feed Speed Sizer', category: 'Trades & Craft', avgCpc: 1.65, avgRpm: 12.80, tier1Rpm: 16.00, competition: 'Low', approvalEase: 'High', primaryToolType: 'MIG/TIG Amperage & Metal Thickness Guide' },
  { rank: 39, niche: 'Archery Arrow Spine & FOC Balance Estimator', category: 'Sports & Hobby', avgCpc: 1.60, avgRpm: 12.50, tier1Rpm: 15.50, competition: 'Low', approvalEase: 'High', primaryToolType: 'Draw Weight Arrow Spine Deflection Tool' },
  { rank: 40, niche: 'Micro-Hydro Turbine Water Flow & Head Pressure', category: 'Renewable Tech', avgCpc: 1.55, avgRpm: 12.20, tier1Rpm: 15.00, competition: 'Low', approvalEase: 'High', primaryToolType: 'GPM & Vertical Drop Wattage Generator' },
  { rank: 41, niche: 'Chicken Coop Square Footage & Roost Space Sizer', category: 'Hobby & Farm', avgCpc: 1.50, avgRpm: 12.00, tier1Rpm: 14.80, competition: 'Low', approvalEase: 'High', primaryToolType: 'Flock Size & Nesting Box Requirement Tool' },
  { rank: 42, niche: 'Photography Depth of Field & Hyperfocal Distance', category: 'Audio & Media', avgCpc: 1.45, avgRpm: 11.80, tier1Rpm: 14.50, competition: 'Low', approvalEase: 'High', primaryToolType: 'Sensor Crop Factor & Focal Length Sharpness' },
  { rank: 43, niche: 'Coffee Extraction Yield & Brew Water Ratio', category: 'Food & Culinary', avgCpc: 1.40, avgRpm: 11.50, tier1Rpm: 14.00, competition: 'Low', approvalEase: 'High', primaryToolType: 'Grams Coffee to Water Pour-Over Ratio' },
  { rank: 44, niche: 'Guitar String Tension & Scale Length Tuner', category: 'Audio & Media', avgCpc: 1.35, avgRpm: 11.20, tier1Rpm: 13.80, competition: 'Low', approvalEase: 'High', primaryToolType: 'Unit Weight & Drop Tuning String Guage Tool' },
  { rank: 45, niche: 'Lawn Mower Deck Belt Size & Pulley Ratio', category: 'DIY Home Care', avgCpc: 1.30, avgRpm: 11.00, tier1Rpm: 13.50, competition: 'Low', approvalEase: 'High', primaryToolType: 'Belt Circumference & Spindle RPM Sizer' },
  { rank: 46, niche: 'Ham Radio Antenna Length & Wavelength Resonance', category: 'Tech & Hobby', avgCpc: 1.25, avgRpm: 10.80, tier1Rpm: 13.20, competition: 'Low', approvalEase: 'High', primaryToolType: 'Dipole Wire Length MHz to Feet Calculator' },
  { rank: 47, niche: 'Soap Lye Water Ratio & Saponification Value', category: 'Hobby & Craft', avgCpc: 1.20, avgRpm: 10.50, tier1Rpm: 13.00, competition: 'Low', approvalEase: 'High', primaryToolType: 'Cold Process NaOH Lye Discount Calculator' },
  { rank: 48, niche: 'Model Rocket Altitude & Parachute Descent Time', category: 'Education & Hobby', avgCpc: 1.15, avgRpm: 10.20, tier1Rpm: 12.80, competition: 'Low', approvalEase: 'High', primaryToolType: 'Motor Impulse & Drift Distance Simulator' },
  { rank: 49, niche: 'Stained Glass Solder Weight & Copper Foil Sizer', category: 'Hobby & Craft', avgCpc: 1.10, avgRpm: 10.00, tier1Rpm: 12.50, competition: 'Low', approvalEase: 'High', primaryToolType: 'Linear Inches Lead Came & Solder Estimator' },
  { rank: 50, niche: 'Mushroom Monotub Grain to Substrate Ratio', category: 'Hobby & Care', avgCpc: 1.05, avgRpm: 9.80, tier1Rpm: 12.00, competition: 'Low', approvalEase: 'High', primaryToolType: 'Coco Coir & Vermiculite Field Capacity Sizer' }
];

export const Top50NichesTable: React.FC = () => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortField, setSortField] = useState<'cpc' | 'rpm' | 'rank'>('cpc');
  const [copied, setCopied] = useState(false);

  const categories = ['All', ...Array.from(new Set(TOP_50_NICHES.map((n) => n.category)))];

  const filtered = TOP_50_NICHES.filter((item) => {
    const matchesSearch =
      item.niche.toLowerCase().includes(search.toLowerCase()) ||
      item.category.toLowerCase().includes(search.toLowerCase()) ||
      item.primaryToolType.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  }).sort((a, b) => {
    if (sortField === 'cpc') return b.avgCpc - a.avgCpc;
    if (sortField === 'rpm') return b.avgRpm - a.avgRpm;
    return a.rank - b.rank;
  });

  const handleCopyTable = () => {
    const tsv = [
      ['Rank', 'Niche', 'Category', 'Avg CPC ($)', 'Page RPM ($)', 'Tier 1 RPM ($)', 'Competition', 'Primary Tool'].join('\t'),
      ...filtered.map((r) =>
        [r.rank, r.niche, r.category, r.avgCpc, r.avgRpm, r.tier1Rpm, r.competition, r.primaryToolType].join('\t')
      ),
    ].join('\n');
    navigator.clipboard.writeText(tsv);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-white border border-[#dadce0] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <span className="px-2.5 py-0.5 text-xs font-medium rounded-full bg-[#e8f0fe] text-[#1a73e8]">
              AdSense Market Intelligence
            </span>
            <span className="text-xs text-[#5f6368] font-normal">• KD: 21 • Top 50 Comprehensive Index</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#202124] tracking-tight font-['Google_Sans',sans-serif]">
            Top 50 Highest Paying AdSense Niches: 2026 CPC &amp; Profitability Table
          </h1>
          <p className="text-xs sm:text-sm text-[#5f6368] mt-1 max-w-3xl leading-relaxed">
            Curated database of the top 50 highest-yielding AdSense publishing niches. Filter by category, sort by click CPC and Page RPM, and discover low-competition utility tool opportunities.
          </p>
        </div>

        <button
          onClick={handleCopyTable}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-semibold hover:bg-slate-800 transition-colors shrink-0 cursor-pointer"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? 'Copied TSV to Clipboard!' : 'Copy Table Data'}</span>
        </button>
      </div>

      <KidExplainer
        title="How to Use the Top 50 High-Paying Niches Table"
        what="This table ranks the highest-paying Google AdSense categories from $18.50 CPC (Finance) down to $1.05 CPC (Specialty Hobbies)."
        why="High CPC niches allow you to earn a full-time income with only 15,000 to 30,000 monthly visitors, whereas low-paying niches like gaming require 500,000+ visitors to make the same money."
        how="Filter by 'Trades', 'Education', or 'Tech', sort by highest CPC, and build a free client-side calculator targeting that specific mathematical query."
        result="You launch directly into a high-demand, low-competition niche with verified advertiser bidding budgets."
      />

      {/* Filter and Search Controls */}
      <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        <div className="flex-1 flex items-center bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5">
          <Search className="w-4 h-4 text-slate-400 mr-2 shrink-0" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search all 50 niches by name, tool type, or category..."
            className="w-full bg-transparent text-xs sm:text-sm text-slate-800 focus:outline-none placeholder:text-slate-400"
          />
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-1.5 text-xs text-slate-600 font-semibold">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <span>Category:</span>
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs font-semibold text-slate-800 focus:outline-none"
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          <div className="flex items-center bg-slate-100 p-0.5 rounded-xl border border-slate-200 text-xs font-semibold ml-auto md:ml-0">
            <button
              onClick={() => setSortField('cpc')}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                sortField === 'cpc' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Sort by CPC
            </button>
            <button
              onClick={() => setSortField('rpm')}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                sortField === 'rpm' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Sort by RPM
            </button>
            <button
              onClick={() => setSortField('rank')}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                sortField === 'rank' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Rank #
            </button>
          </div>
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-700 border-b border-slate-200 font-semibold">
                <th className="py-3 px-3.5 w-12 text-center">#</th>
                <th className="py-3 px-3.5">Niche Name</th>
                <th className="py-3 px-3.5">Sector</th>
                <th className="py-3 px-3.5 text-right font-mono">Avg CPC</th>
                <th className="py-3 px-3.5 text-right font-mono">Page RPM</th>
                <th className="py-3 px-3.5 text-right font-mono">Tier 1 RPM</th>
                <th className="py-3 px-3.5 text-center">Competition</th>
                <th className="py-3 px-3.5">Recommended Micro-Tool</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-600">
              {filtered.map((item) => (
                <tr key={item.rank} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-2.5 px-3.5 text-center font-mono font-bold text-slate-400">
                    {item.rank}
                  </td>
                  <td className="py-2.5 px-3.5 font-semibold text-slate-900">
                    {item.niche}
                  </td>
                  <td className="py-2.5 px-3.5">
                    <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[11px] font-medium">
                      {item.category}
                    </span>
                  </td>
                  <td className="py-2.5 px-3.5 text-right font-mono font-bold text-blue-700">
                    ${item.avgCpc.toFixed(2)}
                  </td>
                  <td className="py-2.5 px-3.5 text-right font-mono font-bold text-emerald-700">
                    ${item.avgRpm.toFixed(2)}
                  </td>
                  <td className="py-2.5 px-3.5 text-right font-mono font-bold text-purple-700">
                    ${item.tier1Rpm.toFixed(2)}
                  </td>
                  <td className="py-2.5 px-3.5 text-center">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        item.competition === 'Low'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : item.competition === 'Moderate'
                          ? 'bg-amber-50 text-amber-700 border border-amber-200'
                          : 'bg-rose-50 text-rose-700 border border-rose-200'
                      }`}
                    >
                      {item.competition}
                    </span>
                  </td>
                  <td className="py-2.5 px-3.5 font-mono text-[11px] text-slate-700">
                    {item.primaryToolType}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
