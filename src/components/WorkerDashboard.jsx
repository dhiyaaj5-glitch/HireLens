import React from 'react';
import { useApp } from '../context/AppContext';
import { calculateProfileStrength } from '../services/profileStrength';
import { 
  Sparkles, 
  Award, 
  CheckCircle2, 
  Clock, 
  Briefcase, 
  Star, 
  TrendingUp, 
  ChevronRight, 
  ArrowUpRight, 
  ShieldCheck, 
  Edit3,
  Globe
} from 'lucide-react';

export default function WorkerDashboard() {
  const { workerUser, projects, navigateTo } = useApp();

  const profileStrength = calculateProfileStrength(workerUser);

  // Active client projects assigned to this worker or open in domain
  const myProjects = projects.filter(p => p.assignedWorkerId === workerUser.id || p.domain === workerUser.domain);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header Profile Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-brand-950 to-slate-900 p-6 sm:p-8 rounded-3xl text-white shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="relative">
            <img 
              src={workerUser.avatar} 
              alt={workerUser.name} 
              className="w-16 h-16 rounded-2xl object-cover border-2 border-brand-400"
            />
            {workerUser.verified?.identity && (
              <ShieldCheck className="w-5 h-5 text-brand-400 fill-brand-950 absolute -bottom-1 -right-1" />
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold">{workerUser.name}</h1>
              <span className="px-2.5 py-0.5 rounded-full bg-brand-500/20 text-brand-300 text-[10px] font-semibold border border-brand-400/30">
                Verified Freelancer
              </span>
            </div>
            <p className="text-xs text-slate-300">{workerUser.title}</p>
            <p className="text-[11px] text-slate-400 mt-1">{workerUser.location} • Rate: ${workerUser.hourlyRate}/hr</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigateTo('edit-worker-profile')}
            className="px-4 py-2.5 bg-brand-500 hover:bg-brand-600 text-white rounded-xl text-xs font-semibold shadow transition flex items-center gap-1.5"
          >
            <Edit3 className="w-4 h-4" />
            <span>Improve Profile</span>
          </button>
          <button
            onClick={() => navigateTo('worker-profile', { workerId: workerUser.id })}
            className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-semibold border border-white/20 transition"
          >
            Public Preview
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium">Profile Strength</span>
            <Sparkles className="w-4 h-4 text-brand-600" />
          </div>
          <div className="text-2xl font-bold text-slate-900">{profileStrength.score}%</div>
          <span className="text-[10px] text-emerald-600 font-medium">Algorithmic Match Boost</span>
        </div>

        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium">Client Rating</span>
            <Star className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-bold text-slate-900">{workerUser.rating} / 5.0</div>
          <span className="text-[10px] text-slate-400 font-medium">Based on {workerUser.totalReviews} reviews</span>
        </div>

        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium">Completed Deliveries</span>
            <CheckCircle2 className="w-4 h-4 text-teal-600" />
          </div>
          <div className="text-2xl font-bold text-slate-900">{workerUser.completedProjects}</div>
          <span className="text-[10px] text-teal-600 font-medium">100% on-time completion</span>
        </div>

        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium">Response SLA</span>
            <Clock className="w-4 h-4 text-sky-600" />
          </div>
          <div className="text-2xl font-bold text-slate-900">{workerUser.responseTime}</div>
          <span className="text-[10px] text-sky-600 font-medium">Top 5% response velocity</span>
        </div>
      </div>

      {/* Profile Strength Meter & Actionable Checklist */}
      <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Award className="w-5 h-5 text-brand-600" />
              <span>Multi-Factor Profile Strength Meter</span>
            </h2>
            <p className="text-xs text-slate-500">
              Profiles with 90%+ score receive 3.4x more invitations from high-budget clients
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm font-extrabold text-brand-600">{profileStrength.score}%</span>
            <button
              onClick={() => navigateTo('edit-worker-profile')}
              className="px-3 py-1 bg-brand-50 text-brand-700 hover:bg-brand-100 rounded-lg text-xs font-semibold transition"
            >
              Complete Checklist →
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
          <div 
            className="bg-brand-500 h-full rounded-full transition-all duration-500" 
            style={{ width: `${profileStrength.score}%` }}
          />
        </div>

        {/* Suggestions Checklist */}
        {profileStrength.suggestions.length > 0 ? (
          <div className="bg-amber-50/70 border border-amber-200 p-4 rounded-2xl space-y-2">
            <span className="text-xs font-bold text-amber-900 block">Recommendations to reach 100%:</span>
            <ul className="space-y-1 text-xs text-amber-800">
              {profileStrength.suggestions.map((sug, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="text-amber-500">•</span>
                  <span>{sug}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-2xl text-xs text-emerald-800 font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Your profile is 100% complete and fully optimized for top tier algorithm rankings!</span>
          </div>
        )}
      </div>

      {/* Main Split: Domain Projects & Client Reviews */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Cols: Matching Projects in Domain */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900">Recommended Project Openings</h2>
            <span className="text-xs text-slate-500">Matching your {workerUser.domain} domain</span>
          </div>

          <div className="space-y-3">
            {myProjects.map(proj => (
              <div 
                key={proj.id}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:border-slate-300 transition space-y-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700">
                      {proj.domain}
                    </span>
                    <h3 className="font-bold text-slate-900 text-sm mt-1">{proj.title}</h3>
                    <p className="text-xs text-slate-500 line-clamp-2 mt-0.5">{proj.description}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-bold text-slate-900">{proj.budget}</span>
                    <span className="block text-[10px] text-slate-400">Budget</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 text-slate-500">
                    <span className="text-slate-400">Client:</span>
                    <span className="font-semibold text-slate-700">{proj.clientCompany || proj.clientName}</span>
                  </div>
                  <button
                    onClick={() => navigateTo('workspace', { projectId: proj.id })}
                    className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold transition"
                  >
                    View Project Workspace
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Col: Client Feedback & Market Intel link */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-slate-900">Recent Client Reviews</h2>

          <div className="space-y-3">
            {(workerUser.reviews || []).slice(0, 2).map((rev) => (
              <div key={rev.id} className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 text-xs">{rev.clientName}</span>
                  <div className="flex items-center gap-1 text-xs text-amber-500 font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span>{rev.rating}</span>
                  </div>
                </div>
                <p className="text-xs text-slate-600 italic">"{rev.comment}"</p>
                <div className="flex justify-between text-[10px] text-slate-400 pt-1">
                  <span>{rev.clientCompany}</span>
                  <span>{rev.date}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="p-5 bg-accent-50 rounded-3xl border border-accent-200 text-xs space-y-2">
            <div className="flex items-center gap-2 font-bold text-accent-900">
              <Globe className="w-4 h-4 text-accent-600" />
              <span>Skill & Rate Intelligence</span>
            </div>
            <p className="text-accent-800 text-[11px] leading-relaxed">
              Research real-time market rates and trending skills using our SerpApi intelligence tool to optimize your hourly pricing.
            </p>
            <button
              onClick={() => navigateTo('serpapi-research')}
              className="text-accent-700 hover:text-accent-900 font-semibold underline text-[11px] block pt-1"
            >
              Open Market Intel →
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
