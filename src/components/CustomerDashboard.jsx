import React from 'react';
import { useApp } from '../context/AppContext';
import { calculateMatchScore } from '../services/matchingEngine';
import { 
  PlusCircle, 
  Briefcase, 
  Users, 
  Bookmark, 
  TrendingUp, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  ChevronRight,
  ExternalLink
} from 'lucide-react';

export default function CustomerDashboard() {
  const { 
    customerUser, 
    projects, 
    workers, 
    shortlistedWorkerIds, 
    navigateTo, 
    setActiveProjectForMatching 
  } = useApp();

  const activeProjects = projects.filter(p => p.status !== 'Completed');
  const completedProjects = projects.filter(p => p.status === 'Completed');

  // Compute top recommended candidates for first project
  const currentProject = projects[0];
  const rankedWorkers = workers.map(worker => {
    const match = calculateMatchScore(currentProject, worker);
    return { worker, match };
  }).sort((a, b) => b.match.totalScore - a.match.totalScore).slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-slate-900 to-brand-950 p-6 sm:p-8 rounded-3xl text-white shadow-md">
        <div className="flex items-center gap-4">
          <img 
            src={customerUser.avatar} 
            alt={customerUser.name} 
            className="w-14 h-14 rounded-2xl object-cover border-2 border-brand-400"
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold">Welcome back, {customerUser.name}</h1>
              <span className="px-2 py-0.5 rounded-full bg-brand-500/20 text-brand-300 text-[10px] font-semibold border border-brand-400/30">
                Client Portal
              </span>
            </div>
            <p className="text-xs text-slate-300">{customerUser.company} • Enterprise Hiring Dashboard</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigateTo('create-project')}
            className="px-4 py-2.5 bg-brand-500 hover:bg-brand-600 text-white rounded-xl text-xs font-semibold shadow transition flex items-center gap-1.5"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Post New Project</span>
          </button>
          <button
            onClick={() => navigateTo('find-workers')}
            className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-semibold border border-white/20 transition flex items-center gap-1.5"
          >
            <Users className="w-4 h-4" />
            <span>Browse All Talent</span>
          </button>
        </div>
      </div>

      {/* Quick Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium">Active Projects</span>
            <Briefcase className="w-4 h-4 text-brand-600" />
          </div>
          <div className="text-2xl font-bold text-slate-900">{activeProjects.length}</div>
          <span className="text-[10px] text-emerald-600 font-medium">Ongoing engagements</span>
        </div>

        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium">Shortlisted Talent</span>
            <Bookmark className="w-4 h-4 text-purple-600" />
          </div>
          <div className="text-2xl font-bold text-slate-900">{shortlistedWorkerIds.length}</div>
          <button 
            onClick={() => navigateTo('shortlist')}
            className="text-[10px] text-brand-600 hover:underline font-medium"
          >
            View saved candidates →
          </button>
        </div>

        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium">Completed Projects</span>
            <CheckCircle2 className="w-4 h-4 text-teal-600" />
          </div>
          <div className="text-2xl font-bold text-slate-900">{completedProjects.length}</div>
          <span className="text-[10px] text-slate-500 font-medium">Delivered & reviewed</span>
        </div>

        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium">Verified Pool</span>
            <Sparkles className="w-4 h-4 text-accent-600" />
          </div>
          <div className="text-2xl font-bold text-slate-900">{workers.length}</div>
          <span className="text-[10px] text-accent-600 font-medium">100% Deterministic match ready</span>
        </div>
      </div>

      {/* Main Content Split: Projects Table & Recommended Matches */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Cols: Client Projects */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Your Project Openings</h2>
              <p className="text-xs text-slate-500">Track milestones, status, and candidate rankings</p>
            </div>
            <button
              onClick={() => navigateTo('create-project')}
              className="text-xs font-semibold text-brand-600 hover:text-brand-700 flex items-center gap-1"
            >
              <span>Create New</span>
              <PlusCircle className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {projects.map((proj) => (
              <div 
                key={proj.id} 
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:border-slate-300 transition space-y-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700">
                        {proj.domain}
                      </span>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        proj.status === 'In Progress' ? 'bg-blue-100 text-blue-700' :
                        proj.status === 'Completed' ? 'bg-emerald-100 text-emerald-700' :
                        'bg-amber-100 text-amber-700'
                      }`}>
                        {proj.status}
                      </span>
                    </div>
                    <h3 className="font-bold text-slate-900 text-base">{proj.title}</h3>
                    <p className="text-xs text-slate-500 line-clamp-1">{proj.description}</p>
                  </div>

                  <div className="text-right">
                    <span className="text-sm font-bold text-slate-900">{proj.budget}</span>
                    <span className="block text-[10px] text-slate-400">Budget</span>
                  </div>
                </div>

                {/* Progress bar */}
                <div>
                  <div className="flex justify-between text-[11px] text-slate-500 mb-1">
                    <span>Project Progress</span>
                    <span className="font-semibold text-slate-700">{proj.progress || 0}%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div 
                      className="bg-brand-500 h-full rounded-full transition-all duration-300" 
                      style={{ width: `${proj.progress || 0}%` }}
                    />
                  </div>
                </div>

                {/* Actions & Skills */}
                <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div className="flex flex-wrap gap-1">
                    {(proj.skills || []).slice(0, 3).map((s, i) => (
                      <span key={i} className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 text-[10px]">
                        {s}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setActiveProjectForMatching(proj);
                        navigateTo('find-workers');
                      }}
                      className="px-3 py-1.5 bg-brand-50 text-brand-700 hover:bg-brand-100 rounded-lg text-xs font-semibold transition flex items-center gap-1"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Find Matches</span>
                    </button>
                    <button
                      onClick={() => navigateTo('workspace', { projectId: proj.id })}
                      className="px-3 py-1.5 bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-lg text-xs font-semibold transition"
                    >
                      Workspace
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Col: Top Recommended Matches for current opening */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900">Top AI Matches</h2>
            <span className="text-[11px] text-brand-600 font-semibold">For {currentProject?.title?.slice(0, 18)}...</span>
          </div>

          <div className="space-y-3">
            {rankedWorkers.map(({ worker, match }) => (
              <div 
                key={worker.id}
                className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs hover:border-brand-300 transition space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img src={worker.avatar} alt={worker.name} className="w-10 h-10 rounded-xl object-cover" />
                    <div>
                      <h4 className="font-bold text-slate-900 text-xs">{worker.name}</h4>
                      <p className="text-[11px] text-slate-500">{worker.title}</p>
                    </div>
                  </div>

                  <div className="px-2.5 py-1 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 font-bold text-xs text-center">
                    <span>{match.totalScore}%</span>
                    <span className="block text-[8px] uppercase tracking-wider font-semibold">Match</span>
                  </div>
                </div>

                <div className="text-[11px] text-slate-600 bg-slate-50 p-2 rounded-lg border border-slate-100">
                  <span className="font-semibold text-slate-800">Primary algorithmic match: </span>
                  {match.reasons?.[0] || 'High skill compatibility'}
                </div>

                <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-100">
                  <span className="font-bold text-slate-800">${worker.hourlyRate}/hr</span>
                  <button
                    onClick={() => navigateTo('worker-profile', { workerId: worker.id })}
                    className="text-brand-600 hover:text-brand-700 font-semibold flex items-center gap-1 text-[11px]"
                  >
                    <span>View Profile</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 bg-accent-50 rounded-2xl border border-accent-200/80 text-xs space-y-2">
            <div className="flex items-center gap-2 font-bold text-accent-900">
              <Sparkles className="w-4 h-4 text-accent-600" />
              <span>Market Rate Intelligence</span>
            </div>
            <p className="text-accent-800 text-[11px] leading-relaxed">
              Check live Google search and SerpApi freelance rate trends before extending an offer.
            </p>
            <button
              onClick={() => navigateTo('serpapi-research')}
              className="mt-1 text-accent-700 hover:text-accent-900 font-semibold underline text-[11px] block"
            >
              Open SerpApi Market Intel →
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
