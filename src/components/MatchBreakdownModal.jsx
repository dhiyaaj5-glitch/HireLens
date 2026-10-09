import React from 'react';
import { X, CheckCircle, Award, Target, Zap, Clock, DollarSign, Star, FileCheck } from 'lucide-react';

export default function MatchBreakdownModal({ isOpen, onClose, matchData, worker, project }) {
  if (!isOpen || !matchData || !worker) return null;

  const { totalScore, breakdown = {}, reasons = [] } = matchData;

  const scoreColor = 
    totalScore >= 85 ? 'text-emerald-600 bg-emerald-50 border-emerald-200' :
    totalScore >= 70 ? 'text-blue-600 bg-blue-50 border-blue-200' :
    'text-amber-600 bg-amber-50 border-amber-200';

  const progressColor = 
    totalScore >= 85 ? 'bg-emerald-500' :
    totalScore >= 70 ? 'bg-blue-500' :
    'bg-amber-500';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-100 p-6">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Deterministic Match Score</h3>
            <p className="text-xs text-slate-500">Auditable multi-factor suitability algorithm breakdown</p>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Worker & Project Summary */}
        <div className="flex items-center justify-between gap-4 py-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <img src={worker.avatar} alt={worker.name} className="w-12 h-12 rounded-xl object-cover border border-slate-200" />
            <div>
              <h4 className="font-semibold text-slate-900 text-sm">{worker.name}</h4>
              <p className="text-xs text-slate-500">{worker.title}</p>
            </div>
          </div>

          <div className={`px-4 py-2 rounded-xl border font-bold text-center ${scoreColor}`}>
            <span className="text-2xl">{totalScore}%</span>
            <span className="block text-[10px] uppercase font-bold tracking-wider">Match Score</span>
          </div>
        </div>

        {/* Target Project */}
        {project && (
          <div className="my-3 p-3 bg-slate-50 rounded-xl text-xs border border-slate-200/60">
            <span className="text-slate-400 font-medium">Evaluated against project: </span>
            <span className="font-semibold text-slate-800">{project.title}</span>
          </div>
        )}

        {/* Score Factor Breakdown */}
        <div className="py-4 space-y-3">
          <h5 className="text-xs font-bold uppercase tracking-wider text-slate-500">Criteria Breakdown</h5>
          
          <div className="grid grid-cols-2 gap-2 text-xs">
            <FactorCard 
              icon={<Zap className="w-3.5 h-3.5 text-indigo-500" />}
              label="Skill Overlap" 
              score={breakdown.skills || 0} 
              max={30} 
            />
            <FactorCard 
              icon={<Target className="w-3.5 h-3.5 text-blue-500" />}
              label="Domain Alignment" 
              score={breakdown.domain || 0} 
              max={15} 
            />
            <FactorCard 
              icon={<Award className="w-3.5 h-3.5 text-purple-500" />}
              label="Experience Depth" 
              score={breakdown.experience || 0} 
              max={15} 
            />
            <FactorCard 
              icon={<Clock className="w-3.5 h-3.5 text-emerald-500" />}
              label="Availability Match" 
              score={breakdown.availability || 0} 
              max={10} 
            />
            <FactorCard 
              icon={<Star className="w-3.5 h-3.5 text-amber-500" />}
              label="Reputation & Rating" 
              score={breakdown.rating || 0} 
              max={10} 
            />
            <FactorCard 
              icon={<FileCheck className="w-3.5 h-3.5 text-teal-500" />}
              label="Completed Projects" 
              score={breakdown.completedProjects || 0} 
              max={10} 
            />
            <FactorCard 
              icon={<DollarSign className="w-3.5 h-3.5 text-emerald-600" />}
              label="Budget Compatibility" 
              score={breakdown.budget || 0} 
              max={5} 
            />
            <FactorCard 
              icon={<Clock className="w-3.5 h-3.5 text-sky-500" />}
              label="Response Time" 
              score={breakdown.responseTime || 0} 
              max={5} 
            />
          </div>
        </div>

        {/* Algorithmic Reasons */}
        {reasons && reasons.length > 0 && (
          <div className="pt-3 border-t border-slate-100">
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Algorithm Audit Log</h5>
            <ul className="space-y-1.5 text-xs text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-100">
              {reasons.map((r, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-brand-600 font-bold">•</span>
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-5 pt-4 border-t border-slate-100 flex justify-end">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-semibold hover:bg-slate-800 transition"
          >
            Close Breakdown
          </button>
        </div>
      </div>
    </div>
  );
}

function FactorCard({ icon, label, score, max }) {
  const pct = Math.min(100, Math.round((score / max) * 100));
  return (
    <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200/70">
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-1.5 font-medium text-slate-700">
          {icon}
          <span>{label}</span>
        </div>
        <span className="font-bold text-slate-900">{score}/{max}</span>
      </div>
      <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
        <div className="bg-brand-500 h-full rounded-full transition-all duration-500" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
