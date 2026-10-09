import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Star, 
  MapPin, 
  Clock, 
  Briefcase, 
  CheckCircle2, 
  ShieldCheck, 
  Bookmark, 
  MessageSquare, 
  ExternalLink, 
  Award, 
  GraduationCap, 
  ArrowLeft,
  ChevronRight
} from 'lucide-react';

export default function WorkerProfile() {
  const { 
    activeWorker, 
    shortlistedWorkerIds, 
    toggleShortlist, 
    startConversationWithWorker, 
    navigateTo, 
    userRole 
  } = useApp();

  const [activePortfolioItem, setActivePortfolioItem] = useState(null);

  if (!activeWorker) {
    return (
      <div className="max-w-4xl mx-auto py-16 text-center space-y-4">
        <h2 className="text-xl font-bold text-slate-800">Profile Not Found</h2>
        <button onClick={() => navigateTo('find-workers')} className="px-4 py-2 bg-brand-600 text-white rounded-xl text-xs">
          Back to Directory
        </button>
      </div>
    );
  }

  const isShortlisted = shortlistedWorkerIds.includes(activeWorker.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Back button */}
      <div>
        <button
          onClick={() => navigateTo(userRole === 'worker' ? 'worker-dashboard' : 'find-workers')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to previous view</span>
        </button>
      </div>

      {/* Main Profile Header Card */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
          <div className="relative">
            <img 
              src={activeWorker.avatar} 
              alt={activeWorker.name} 
              className="w-24 h-24 rounded-3xl object-cover border-2 border-slate-100 shadow-sm"
            />
            {activeWorker.verified?.identity && (
              <ShieldCheck className="w-6 h-6 text-brand-600 fill-brand-50 absolute -bottom-1 -right-1" title="Identity Verified" />
            )}
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-slate-900">{activeWorker.name}</h1>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-brand-50 text-brand-700 border border-brand-200">
                {activeWorker.domain}
              </span>
            </div>

            <p className="text-sm font-medium text-slate-700">{activeWorker.title}</p>
            
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-1">
              <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {activeWorker.location}</span>
              <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> Responds {activeWorker.responseTime}</span>
              <span className="flex items-center gap-1 text-emerald-600 font-medium">⚡ {activeWorker.availability}</span>
            </div>
          </div>
        </div>

        {/* Action Controls & Rate */}
        <div className="flex flex-col sm:items-end gap-3 pt-4 md:pt-0 border-t md:border-t-0 border-slate-100">
          <div className="text-left sm:text-right">
            <span className="text-3xl font-extrabold text-slate-900">${activeWorker.hourlyRate}</span>
            <span className="text-xs text-slate-400"> / hour</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleShortlist(activeWorker.id)}
              className={`p-2.5 rounded-xl border transition ${
                isShortlisted 
                  ? 'bg-purple-50 border-purple-200 text-purple-600' 
                  : 'border-slate-200 text-slate-500 hover:bg-slate-50'
              }`}
              title={isShortlisted ? 'Remove Shortlist' : 'Add to Shortlist'}
            >
              <Bookmark className={`w-4 h-4 ${isShortlisted ? 'fill-purple-600' : ''}`} />
            </button>

            <button
              onClick={() => startConversationWithWorker(activeWorker)}
              className="px-5 py-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-semibold shadow-md shadow-brand-600/20 transition flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Contact / Hire</span>
            </button>
          </div>
        </div>

      </div>

      {/* Grid: Main Info & Right Side Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Cols */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* About Bio */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-3">
            <h2 className="text-base font-bold text-slate-900">Professional Overview</h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{activeWorker.bio}</p>
            
            <div className="pt-3 border-t border-slate-100">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Verified Technical Skills</h3>
              <div className="flex flex-wrap gap-2">
                {(activeWorker.skills || []).map((sk, i) => (
                  <span key={i} className="px-3 py-1 bg-slate-100 text-slate-800 text-xs rounded-lg font-medium">
                    {sk}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Portfolio Case Studies */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <h2 className="text-base font-bold text-slate-900">Featured Portfolio Work</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {(activeWorker.portfolio || []).map(item => (
                <div 
                  key={item.id}
                  onClick={() => setActivePortfolioItem(item)}
                  className="rounded-2xl border border-slate-200 overflow-hidden cursor-pointer hover:border-brand-500 hover:shadow-md transition group"
                >
                  <img src={item.image} alt={item.title} className="w-full h-40 object-cover group-hover:scale-105 transition duration-300" />
                  <div className="p-4 space-y-1.5">
                    <h3 className="font-bold text-slate-900 text-xs sm:text-sm group-hover:text-brand-600 transition">{item.title}</h3>
                    <p className="text-xs text-slate-500 line-clamp-2">{item.description}</p>
                    <span className="text-[10px] text-brand-600 font-semibold block pt-1">{item.result}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Experience & Education */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-6">
            <div>
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2 mb-4">
                <Briefcase className="w-4 h-4 text-brand-600" />
                <span>Work History & Positions</span>
              </h2>
              <div className="space-y-4">
                {(activeWorker.experience || []).map((exp, i) => (
                  <div key={i} className="border-l-2 border-brand-300 pl-4 space-y-1">
                    <h4 className="font-bold text-slate-900 text-xs sm:text-sm">{exp.title} • <span className="text-brand-600 font-semibold">{exp.company}</span></h4>
                    <span className="text-[11px] text-slate-400 block">{exp.period}</span>
                    <p className="text-xs text-slate-500 leading-relaxed">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2 mb-4">
                <GraduationCap className="w-4 h-4 text-purple-600" />
                <span>Education & Academic Background</span>
              </h2>
              <div className="space-y-3">
                {(activeWorker.education || []).map((edu, i) => (
                  <div key={i} className="text-xs">
                    <span className="font-bold text-slate-800">{edu.degree}</span>
                    <p className="text-slate-500">{edu.school} • Class of {edu.year}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Client Reviews */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-slate-900">Audited Client Reviews</h2>
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span>{activeWorker.rating} / 5.0</span>
                <span className="text-slate-400 text-[11px]">({activeWorker.totalReviews} total)</span>
              </div>
            </div>

            <div className="space-y-4">
              {(activeWorker.reviews || []).map((r) => (
                <div key={r.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-bold text-slate-900 text-xs">{r.clientName}</span>
                      <span className="text-[11px] text-slate-500 block">{r.clientCompany} • {r.date}</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-amber-500 font-bold">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <span>{r.rating}</span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 italic">"{r.comment}"</p>
                  
                  {r.categories && (
                    <div className="flex flex-wrap gap-2 pt-1 text-[10px] text-slate-500">
                      <span>Quality: <strong>{r.categories.quality}★</strong></span>
                      <span>Communication: <strong>{r.categories.communication}★</strong></span>
                      <span>Professionalism: <strong>{r.categories.professionalism}★</strong></span>
                      <span>Timeliness: <strong>{r.categories.timeliness}★</strong></span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Col: Trust & Stats Box */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900">Verified Platform Metrics</h3>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500">Completed Projects</span>
                <span className="font-bold text-slate-900">{activeWorker.completedProjects}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500">Years Experience</span>
                <span className="font-bold text-slate-900">{activeWorker.yearsExperience} years</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500">Availability</span>
                <span className="font-bold text-emerald-600">{activeWorker.availabilityHours}</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-slate-500">Timezone</span>
                <span className="font-bold text-slate-900">{activeWorker.timezone}</span>
              </div>
            </div>
          </div>

          {/* Certifications */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-3">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-brand-600" />
              <span>Verified Certifications</span>
            </h3>

            <div className="space-y-3">
              {(activeWorker.certifications || []).map((c, i) => (
                <div key={i} className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs">
                  <h4 className="font-bold text-slate-900">{c.name}</h4>
                  <p className="text-[11px] text-slate-500">{c.org} • {c.date}</p>
                  <span className="text-[10px] text-brand-600 font-mono">ID: {c.credentialId}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
