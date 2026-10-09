import React from 'react';
import { useApp } from '../context/AppContext';
import { POPULAR_CATEGORIES } from '../data/seedData';
import { 
  Sparkles, 
  Search, 
  ShieldCheck, 
  Cpu, 
  ArrowRight, 
  CheckCircle2, 
  Star, 
  Briefcase, 
  Users, 
  TrendingUp, 
  Award,
  Globe
} from 'lucide-react';

export default function LandingPage() {
  const { navigateTo, workers, switchRole } = useApp();
  const featuredWorkers = workers.slice(0, 4);

  return (
    <div className="space-y-16 pb-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 bg-gradient-to-b from-brand-50/50 via-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-100/80 border border-brand-200 text-brand-800 text-xs font-semibold shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-brand-600" />
              <span>Next-Gen Deterministic Talent Matching Engine</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Hire vetted talent with <span className="bg-gradient-to-r from-brand-600 to-accent-600 bg-clip-text text-transparent">zero guesswork</span>.
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
              SkillMatch replaces subjective hiring with a transparent 8-factor suitability scoring engine, AI-powered project brief decomposition, and live SerpApi market intelligence.
            </p>

            {/* Main Action CTAs */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <button
                onClick={() => {
                  switchRole('customer');
                  navigateTo('create-project');
                }}
                className="px-6 py-3.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold text-sm shadow-lg shadow-brand-600/25 transition flex items-center gap-2"
              >
                <span>Post a Project with AI</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => navigateTo('find-workers')}
                className="px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-semibold text-sm border border-slate-200 shadow-xs transition flex items-center gap-2"
              >
                <Search className="w-4 h-4 text-slate-500" />
                <span>Explore Top Talent</span>
              </button>

              <button
                onClick={() => navigateTo('serpapi-research')}
                className="px-5 py-3.5 rounded-xl bg-accent-50 hover:bg-accent-100 text-accent-700 font-semibold text-sm border border-accent-200 transition flex items-center gap-2"
              >
                <Globe className="w-4 h-4 text-accent-600" />
                <span>Market Intel</span>
              </button>
            </div>

            {/* Trust Badges */}
            <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500">
              <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-brand-600" /> 100% Identity Verified</span>
              <span className="flex items-center gap-1.5"><Cpu className="w-4 h-4 text-brand-600" /> 8-Factor Transparent Scoring</span>
              <span className="flex items-center gap-1.5"><Star className="w-4 h-4 text-amber-500 fill-amber-500" /> Multi-Category Rating Audit</span>
            </div>

          </div>
        </div>
      </section>

      {/* Key Innovation Pillars */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-xs hover:border-brand-200 transition space-y-3">
            <div className="w-12 h-12 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-lg">Deterministic Suitability Scoring</h3>
            <p className="text-slate-600 text-xs leading-relaxed">
              Every candidate score is auditable across skill overlap, domain relevance, verified experience, rate compatibility, and historic feedback.
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-xs hover:border-brand-200 transition space-y-3">
            <div className="w-12 h-12 rounded-xl bg-accent-50 text-accent-600 flex items-center justify-center">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-lg">AI Requirement Analyzer</h3>
            <p className="text-slate-600 text-xs leading-relaxed">
              Describe your project in plain natural language. Our brief parser extracts domain, required tech stack, estimated complexity, and ideal budget.
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-xs hover:border-brand-200 transition space-y-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Globe className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-lg">SerpApi Market Intelligence</h3>
            <p className="text-slate-600 text-xs leading-relaxed">
              Direct access to live Google and industry benchmarks. Track salary rates, trending competencies, and real-time hiring benchmarks.
            </p>
          </div>
        </div>
      </section>

      {/* Popular Skill Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Explore by Specialization</h2>
            <p className="text-xs text-slate-500">Over 10,000+ verified professionals ready for deployment</p>
          </div>
          <button 
            onClick={() => navigateTo('find-workers')}
            className="text-xs font-semibold text-brand-600 hover:text-brand-700 flex items-center gap-1"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {POPULAR_CATEGORIES.map(cat => (
            <div
              key={cat.id}
              onClick={() => navigateTo('find-workers')}
              className="p-4 bg-white border border-slate-200 rounded-xl hover:border-brand-500 hover:shadow-md cursor-pointer transition text-center group"
            >
              <div className="w-10 h-10 mx-auto rounded-lg bg-slate-50 group-hover:bg-brand-50 text-slate-700 group-hover:text-brand-600 flex items-center justify-center transition mb-2">
                <Briefcase className="w-5 h-5" />
              </div>
              <h4 className="text-xs font-semibold text-slate-900 group-hover:text-brand-600 transition truncate">{cat.name}</h4>
              <span className="text-[10px] text-slate-400">{cat.count}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Vetted Talent */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Top-Ranked Talent</h2>
            <p className="text-xs text-slate-500">Profiles with verified credentials and 95%+ client satisfaction</p>
          </div>
          <button 
            onClick={() => navigateTo('find-workers')}
            className="text-xs font-semibold text-brand-600 hover:text-brand-700 flex items-center gap-1"
          >
            <span>See 40+ Workers</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredWorkers.map(w => (
            <div 
              key={w.id} 
              className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:shadow-md hover:border-slate-300 transition flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <img src={w.avatar} alt={w.name} className="w-14 h-14 rounded-2xl object-cover border border-slate-100" />
                  <div className="text-right">
                    <span className="text-base font-bold text-slate-900">${w.hourlyRate}</span>
                    <span className="text-[11px] text-slate-400">/hr</span>
                  </div>
                </div>

                <h3 className="font-bold text-slate-900 text-sm">{w.name}</h3>
                <p className="text-xs text-brand-600 font-medium mb-2">{w.domain}</p>
                <p className="text-xs text-slate-500 line-clamp-2 mb-3 leading-relaxed">{w.bio}</p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {w.skills.slice(0, 3).map((s, i) => (
                    <span key={i} className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md font-medium">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <div className="flex items-center gap-1 text-slate-700 font-semibold">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{w.rating}</span>
                  <span className="text-slate-400 text-[10px]">({w.totalReviews})</span>
                </div>
                <button
                  onClick={() => navigateTo('worker-profile', { workerId: w.id })}
                  className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold transition"
                >
                  View Profile
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-slate-900 via-brand-950 to-slate-900 text-white relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Ready to find your perfect talent match?</h2>
            <p className="text-slate-300 text-xs sm:text-sm">
              Use our AI brief analyzer to define requirements and immediately see ranked compatibility scores across verified specialists.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => {
                switchRole('customer');
                navigateTo('create-project');
              }}
              className="px-6 py-3 bg-brand-500 hover:bg-brand-600 text-white font-semibold rounded-xl text-xs sm:text-sm shadow-md transition"
            >
              Post a Project Now
            </button>
            <button
              onClick={() => {
                switchRole('worker');
                navigateTo('worker-dashboard');
              }}
              className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl text-xs sm:text-sm border border-white/20 transition"
            >
              Join as Freelancer
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
