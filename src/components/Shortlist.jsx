import React from 'react';
import { useApp } from '../context/AppContext';
import { Bookmark, Star, MessageSquare, Trash2, ArrowRight, MapPin, Clock } from 'lucide-react';

export default function Shortlist() {
  const { workers, shortlistedWorkerIds, toggleShortlist, navigateTo, startConversationWithWorker } = useApp();

  const shortlistedWorkers = workers.filter(w => shortlistedWorkerIds.includes(w.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      <div className="flex items-center justify-between pb-6 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Your Shortlisted Talent</h1>
          <p className="text-xs text-slate-500">
            Saved specialists for comparison and interview scheduling ({shortlistedWorkers.length} saved)
          </p>
        </div>

        <button
          onClick={() => navigateTo('find-workers')}
          className="px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-semibold transition flex items-center gap-1.5 shadow-xs"
        >
          <span>Browse More Talent</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {shortlistedWorkers.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 space-y-4">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center">
            <Bookmark className="w-7 h-7" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">No freelancers in your shortlist</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Browse our verified talent catalog and bookmark top specialists to easily compare rates, skills, and match ratings.
          </p>
          <button
            onClick={() => navigateTo('find-workers')}
            className="px-5 py-2.5 bg-brand-600 text-white rounded-xl text-xs font-semibold hover:bg-brand-700 transition"
          >
            Explore Talent Catalog
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {shortlistedWorkers.map(w => (
            <div 
              key={w.id}
              className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:shadow-md transition flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <img src={w.avatar} alt={w.name} className="w-14 h-14 rounded-2xl object-cover border border-slate-100" />
                    <div>
                      <h3 className="font-bold text-slate-900 text-sm">{w.name}</h3>
                      <p className="text-xs text-brand-600 font-medium">{w.domain}</p>
                      <div className="flex items-center gap-1 text-[11px] text-slate-400 mt-0.5">
                        <MapPin className="w-3 h-3" />
                        <span className="truncate max-w-[120px]">{w.location}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => toggleShortlist(w.id)}
                    className="p-2 rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50 transition"
                    title="Remove from shortlist"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <p className="text-xs text-slate-700 font-semibold mb-1 line-clamp-1">{w.title}</p>
                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-3">{w.bio}</p>

                <div className="flex flex-wrap gap-1.5 mb-2">
                  {(w.skills || []).slice(0, 3).map((s, idx) => (
                    <span key={idx} className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md font-medium">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <div>
                    <span className="text-base font-bold text-slate-900">${w.hourlyRate}</span>
                    <span className="text-slate-400 text-[11px]">/hr</span>
                  </div>

                  <div className="flex items-center gap-1 text-slate-700 font-semibold">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{w.rating}</span>
                    <span className="text-slate-400 text-[10px]">({w.totalReviews})</span>
                  </div>

                  <div className="text-[11px] text-emerald-600 font-medium flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{w.responseTime}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => navigateTo('worker-profile', { workerId: w.id })}
                    className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-semibold transition"
                  >
                    Full Profile
                  </button>
                  <button
                    onClick={() => startConversationWithWorker(w)}
                    className="w-full py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-semibold transition flex items-center justify-center gap-1.5"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Message</span>
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  );
}
