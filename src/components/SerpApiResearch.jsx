import React, { useState, useEffect } from 'react';
import { fetchMarketIntelligence } from '../services/serpApiService';
import { 
  Globe, 
  Search, 
  Key, 
  TrendingUp, 
  DollarSign, 
  Sparkles, 
  ExternalLink, 
  CheckCircle2, 
  AlertCircle, 
  HelpCircle,
  Eye,
  EyeOff,
  Zap,
  RefreshCw
} from 'lucide-react';

export default function SerpApiResearch() {
  const [query, setQuery] = useState('React developer hourly rate 2026');
  const [apiKey, setApiKey] = useState(() => {
    return localStorage.getItem('skillmatch_serpapi_key') || '';
  });
  const [showKey, setShowKey] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  
  const [loading, setLoading] = useState(false);
  const [marketData, setMarketData] = useState(null);
  const [activeTab, setActiveTab] = useState('insights'); // 'insights' | 'raw'

  // Server health check to see if .env has SERPAPI_KEY configured
  const [serverHasKey, setServerHasKey] = useState(false);

  useEffect(() => {
    // Check if server / dev proxy has key loaded from .env
    fetch('/api/health')
      .then(res => res.json())
      .then(data => {
        if (data && data.hasSerpApiKey) {
          setServerHasKey(true);
        }
      })
      .catch(() => {});

    // Initial search
    handleSearch('React developer hourly rate 2026');
  }, []);

  const handleSaveKey = () => {
    localStorage.setItem('skillmatch_serpapi_key', apiKey.trim());
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  const handleSearch = async (searchTerm) => {
    const q = searchTerm || query;
    if (!q.trim()) return;

    setLoading(true);
    try {
      const res = await fetchMarketIntelligence(q, apiKey);
      setMarketData(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const presetQueries = [
    'React developer hourly rate 2026',
    'UI UX designer freelance rates',
    'AI engineer market demand',
    'Full stack developer salary benchmark',
    'Video editor freelance pricing'
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Page Title & Intro */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent-50 border border-accent-200 text-accent-700 text-xs font-semibold mb-2">
            <Globe className="w-3.5 h-3.5 text-accent-600" />
            <span>SerpApi Real-Time Market Intelligence</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
            External Talent & Skill Trend Research
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Query live Google search data and compensation indices to calibrate project budgets and hourly rates.
          </p>
        </div>

        {/* API Key Status Pill */}
        <div className={`px-4 py-2.5 rounded-2xl border text-xs font-semibold flex items-center gap-2 ${
          serverHasKey || apiKey 
            ? 'bg-emerald-50 border-emerald-200 text-emerald-800' 
            : 'bg-amber-50 border-amber-200 text-amber-800'
        }`}>
          {serverHasKey || apiKey ? (
            <>
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>SerpApi Active: {serverHasKey ? 'Loaded from .env' : 'Configured via UI'}</span>
            </>
          ) : (
            <>
              <AlertCircle className="w-4 h-4 text-amber-600" />
              <span>SerpApi: Add key below or in .env</span>
            </>
          )}
        </div>
      </div>

      {/* API Key Input / Configuration Box */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Key className="w-4 h-4 text-accent-600" />
            <h3 className="font-bold text-slate-900 text-sm">Your SerpApi Private Key</h3>
          </div>
          <span className="text-[11px] text-slate-400">
            You can enter your key here OR in the <code className="bg-slate-100 text-slate-700 px-1 py-0.5 rounded font-mono">.env</code> file (<code className="text-slate-700">SERPAPI_KEY=...</code>)
          </span>
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <input
              type={showKey ? 'text' : 'password'}
              placeholder="Paste your SerpApi private key here..."
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="w-full text-xs font-mono px-4 py-2.5 pr-10 border border-slate-200 rounded-xl focus:ring-2 focus:ring-accent-500 focus:outline-none"
            />
            <button
              type="button"
              onClick={() => setShowKey(!showKey)}
              className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
              title={showKey ? 'Hide Key' : 'Reveal Key'}
            >
              {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          <button
            onClick={handleSaveKey}
            className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold transition shrink-0 flex items-center justify-center gap-1.5 shadow-xs"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{isSaved ? 'Key Saved!' : 'Save Key in Browser'}</span>
          </button>
        </div>

        <p className="text-[11px] text-slate-500">
          💡 If you have a private key, add it above or in the <code className="font-semibold text-slate-700">.env</code> file in the project folder. Once added, live Google search metrics will be queried directly.
        </p>
      </div>

      {/* Live Market Query Search Bar */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
        <form onSubmit={(e) => { e.preventDefault(); handleSearch(); }} className="flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Query skill rates (e.g. React developer hourly rate 2026, Figma designer demand)..."
              className="w-full pl-10 pr-4 py-3 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-accent-500 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-accent-600 hover:bg-accent-700 text-white rounded-xl text-sm font-semibold transition flex items-center justify-center gap-2 shadow-md shadow-accent-600/20"
          >
            {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
            <span>{loading ? 'Searching...' : 'Run Market Search'}</span>
          </button>
        </form>

        {/* Preset Query Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-2">
          <span className="text-xs text-slate-400 font-medium">Trending Searches:</span>
          {presetQueries.map((pq, i) => (
            <button
              key={i}
              type="button"
              onClick={() => { setQuery(pq); handleSearch(pq); }}
              className="px-3 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium transition"
            >
              {pq}
            </button>
          ))}
        </div>
      </div>

      {/* Intelligence Display */}
      {marketData && (
        <div className="space-y-6">
          
          {/* Data Source Banner */}
          <div className="flex items-center justify-between text-xs text-slate-500 px-1">
            <span className="flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-accent-600" />
              <span>Intelligence Source: <strong className="text-slate-800">{marketData.source}</strong></span>
            </span>
            <span>Query: <strong className="text-slate-800">"{marketData.query}"</strong></span>
          </div>

          {/* Rate & Demand Highlights */}
          {marketData.results?.summary && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs">
                <span className="text-xs text-slate-400 font-medium block mb-1">Average Hourly Rate Benchmark</span>
                <div className="text-2xl font-bold text-slate-900">{marketData.results.summary.averageRate}</div>
                <span className="text-[11px] text-emerald-600 font-semibold">Verified Freelance Rate Index</span>
              </div>

              <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs">
                <span className="text-xs text-slate-400 font-medium block mb-1">Market Demand Velocity</span>
                <div className="text-2xl font-bold text-slate-900">{marketData.results.summary.demandLevel}</div>
                <span className="text-[11px] text-accent-600 font-semibold">{marketData.results.summary.growth}</span>
              </div>

              <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs">
                <span className="text-xs text-slate-400 font-medium block mb-2">High-Value Tech Keywords</span>
                <div className="flex flex-wrap gap-1">
                  {(marketData.results.summary.sampleSkills || []).map((sk, i) => (
                    <span key={i} className="px-2 py-0.5 bg-slate-100 text-slate-800 text-[11px] font-semibold rounded-md">
                      {sk}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* SerpApi Organic Search Results */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-base">SerpApi Market Results & Industry Publications</h3>
              <span className="text-xs text-slate-400">{marketData.results?.items?.length || 0} citations retrieved</span>
            </div>

            <div className="space-y-4">
              {(marketData.results?.items || []).map((item) => (
                <div key={item.id} className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 hover:border-slate-200 transition space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-accent-600 font-semibold truncate max-w-sm">{item.source}</span>
                    <span className="text-[10px] bg-white border border-slate-200 text-slate-600 px-2 py-0.5 rounded font-medium">
                      {item.type || 'SerpApi Result'}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-slate-900 hover:text-accent-600 transition">
                    <a href={item.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5">
                      <span>{item.title}</span>
                      <ExternalLink className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    </a>
                  </h4>

                  <p className="text-xs text-slate-600 leading-relaxed">{item.snippet}</p>
                </div>
              ))}
            </div>

            {/* Related Searches */}
            {marketData.results?.relatedSearches && marketData.results.relatedSearches.length > 0 && (
              <div className="pt-4 border-t border-slate-100">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">Related Market Queries</span>
                <div className="flex flex-wrap gap-2">
                  {marketData.results.relatedSearches.map((rel, i) => (
                    <button
                      key={i}
                      onClick={() => { setQuery(rel); handleSearch(rel); }}
                      className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs rounded-lg transition"
                    >
                      {rel}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

        </div>
      )}

    </div>
  );
}
