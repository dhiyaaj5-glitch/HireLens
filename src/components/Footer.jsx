import React from 'react';
import { Sparkles, Shield, Cpu, Users, Heart } from 'lucide-react';

export default function Footer({ onNavigate }) {
  return (
    <footer className="bg-slate-900 text-slate-400 text-sm border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Brand info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3 text-white">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-brand-500 to-accent-600 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold">SkillMatch</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Next-generation freelance marketplace powered by deterministic requirement matching and multi-factor suitability scoring.
            </p>
            <div className="flex items-center space-x-2 text-xs text-brand-400">
              <Cpu className="w-4 h-4" />
              <span>Deterministic AI Matching Engine</span>
            </div>
          </div>

          {/* For Customers */}
          <div>
            <h4 className="text-white font-semibold mb-3">For Clients</h4>
            <ul className="space-y-2 text-xs">
              <li><button onClick={() => onNavigate('create-project')} className="hover:text-white transition">Post a Project</button></li>
              <li><button onClick={() => onNavigate('find-workers')} className="hover:text-white transition">Browse Top Talent</button></li>
              <li><button onClick={() => onNavigate('customer-dashboard')} className="hover:text-white transition">Client Dashboard</button></li>
              <li><button onClick={() => onNavigate('serpapi-research')} className="hover:text-white transition">Market Rate Benchmarks</button></li>
            </ul>
          </div>

          {/* For Freelancers */}
          <div>
            <h4 className="text-white font-semibold mb-3">For Freelancers</h4>
            <ul className="space-y-2 text-xs">
              <li><button onClick={() => onNavigate('worker-dashboard')} className="hover:text-white transition">Freelancer Hub</button></li>
              <li><button onClick={() => onNavigate('edit-worker-profile')} className="hover:text-white transition">Profile Strength Meter</button></li>
              <li><button onClick={() => onNavigate('find-workers')} className="hover:text-white transition">Skill Directory</button></li>
              <li><button onClick={() => onNavigate('serpapi-research')} className="hover:text-white transition">Industry Trend Research</button></li>
            </ul>
          </div>

          {/* Core Trust Pillars */}
          <div>
            <h4 className="text-white font-semibold mb-3">Trust & Security</h4>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center gap-1.5"><Shield className="w-3.5 h-3.5 text-brand-400" /> Identity Verified Profiles</li>
              <li className="flex items-center gap-1.5"><Shield className="w-3.5 h-3.5 text-brand-400" /> Multi-Category Rating Audit</li>
              <li className="flex items-center gap-1.5"><Shield className="w-3.5 h-3.5 text-brand-400" /> 100% Transparent Match Scores</li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 SkillMatch Platform. Designed for modern freelance collaboration.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-slate-400 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-400 cursor-pointer">Terms of Service</span>
            <span className="hover:text-slate-400 cursor-pointer">Algorithm Transparency</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
