import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { calculateMatchScore } from '../services/matchingEngine';
import MatchBreakdownModal from './MatchBreakdownModal';
import { 
  Search, 
  Filter, 
  Star, 
  Bookmark, 
  MessageSquare, 
  CheckCircle, 
  SlidersHorizontal, 
  Sparkles, 
  ArrowUpDown, 
  MapPin, 
  Clock, 
  ShieldCheck 
} from 'lucide-react';

export default function FindWorkers() {
  const { 
    workers, 
    projects, 
    activeProjectForMatching, 
    setActiveProjectForMatching, 
    shortlistedWorkerIds, 
    toggleShortlist, 
    navigateTo, 
    startConversationWithWorker 
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDomain, setSelectedDomain] = useState('All');
  const [maxHourlyRate, setMaxHourlyRate] = useState(150);
  const [minRating, setMinRating] = useState(0);
  const [onlyAvailableNow, setOnlyAvailableNow] = useState(false);
  const [sortBy, setSortBy] = useState('match'); // 'match', 'rating', 'rate-low', 'experience'

  // Selected project for matching
  const [benchmarkProject, setBenchmarkProject] = useState(activeProjectForMatching || projects[0]);

  // Modal state
  const [selectedMatchModal, setSelectedMatchModal] = useState(null);

  // Domains list
  const domains = useMemo(() => {
    const list = ['All'];
    workers.forEach(w => {
      if (w.domain && !list.includes(w.domain)) list.push(w.domain);
    });
    return list;
  }, [workers]);

  // Filter & Rank Workers
  const processedWorkers = useMemo(() => {
    return workers
      .map(worker => {
        const matchData = calculateMatchScore(benchmarkProject, worker);
        return { ...worker, matchData };
      })
      .filter(w => {
        // Query match
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = w.name.toLowerCase().includes(q);
          const matchTitle = w.title.toLowerCase().includes(q);
          const matchSkills = (w.skills || []).some(s => s.toLowerCase().includes(q));
          if (!matchName && !matchTitle && !matchSkills) return false;
        }

        // Domain match
        if (selectedDomain !== 'All' && w.domain !== selectedDomain) return false;

        // Rate
        if (w.hourlyRate > maxHourlyRate) return false;

        // Rating
        if (w.rating < minRating) return false;

        // Availability
        if (onlyAvailableNow && !w.availability.toLowerCase().includes('available now')) return false;

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'match') return b.matchData.totalScore - a.matchData.totalScore;
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'rate-low') return a.hourlyRate - b.hourlyRate;
        if (sortBy === 'experience') return b.yearsExperience - a.yearsExperience;
        return 0;
      });
  }, [workers, benchmarkProject, searchQuery, selectedDomain, maxHourlyRate, minRating, onlyAvailableNow, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header and Project Matching Selector */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Find Vetted Freelance Specialists</h1>
          <p className="text-xs text-slate-500">
            Transparent deterministic suitability ranking across {workers.length} verified candidates
          </p>
        </div>

        {/* Project Selector for Match Benchmarking */}
        {projects.length > 0 && (
          <div className="flex items-center gap-2 bg-brand-50/70 border border-brand-200 p-2.5 rounded-2xl text-xs">
            <Sparkles className="w-4 h-4 text-brand-600 shrink-0" />
            <span className="font-semibold text-brand-900 whitespace-nowrap">Benchmark against:</span>
            <select
              value={benchmarkProject?.id}
              onChange={(e) => {
                const found = projects.find(p => p.id === e.target.value);
                setBenchmarkProject(found);
                setActiveProjectForMatching(found);
              }}
              className="bg-white border border-brand-200 rounded-lg px-2.5 py-1 text-xs text-slate-800 font-medium focus:outline-none focus:ring-1 focus:ring-brand-500"
            >
              {projects.map(p => (
                <option key={p.id} value={p.id}>{p.title} ({p.domain})</option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Search Box */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search by name, skill, or title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>

          {/* Domain Dropdown */}
          <div>
            <select
              value={selectedDomain}
              onChange={(e) => setSelectedDomain(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white"
            >
              {domains.map(d => (
                <option key={d} value={d}>{d === 'All' ? 'All Domains & Categories' : d}</option>
              ))}
            </select>
          </div>

          {/* Rate Slider */}
          <div className="flex flex-col justify-center px-1">
            <div className="flex justify-between text-xs text-slate-600 mb-1">
              <span>Max Rate</span>
              <span className="font-bold text-slate-900">${maxHourlyRate}/hr</span>
            </div>
            <input
              type="range"
              min="25"
              max="150"
              step="5"
              value={maxHourlyRate}
              onChange={(e) => setMaxHourlyRate(Number(e.target.value))}
              className="w-full accent-brand-600"
            />
          </div>

          {/* Sort By */}
          <div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white"
            >
              <option value="match">Sort by: AI Match Score</option>
              <option value="rating">Sort by: Highest Rating</option>
              <option value="rate-low">Sort by: Lowest Hourly Rate</option>
              <option value="experience">Sort by: Most Experience</option>
            </select>
          </div>

        </div>

        {/* Filter Quick Pills */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100 text-xs">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-slate-400 font-medium">Quick Filters:</span>
            <button
              onClick={() => setMinRating(prev => prev === 4.8 ? 0 : 4.8)}
              className={`px-2.5 py-1 rounded-lg border transition ${
                minRating === 4.8 ? 'bg-amber-50 border-amber-300 text-amber-800 font-semibold' : 'border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              ★ 4.8+ Top Rated
            </button>
            <button
              onClick={() => setOnlyAvailableNow(prev => !prev)}
              className={`px-2.5 py-1 rounded-lg border transition ${
                onlyAvailableNow ? 'bg-emerald-50 border-emerald-300 text-emerald-800 font-semibold' : 'border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              ⚡ Available Now
            </button>
          </div>

          <span className="text-slate-500">
            Showing <strong className="text-slate-900">{processedWorkers.length}</strong> matching specialists
          </span>
        </div>
      </div>

      {/* Workers Grid */}
      {processedWorkers.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 space-y-3">
          <SlidersHorizontal className="w-8 h-8 text-slate-300 mx-auto" />
          <h3 className="font-bold text-slate-800">No candidates match your criteria</h3>
          <p className="text-xs text-slate-500">Try broadening your search keywords, raising hourly rate, or resetting filters.</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedDomain('All');
              setMaxHourlyRate(150);
              setMinRating(0);
              setOnlyAvailableNow(false);
            }}
            className="px-4 py-2 bg-brand-600 text-white rounded-xl text-xs font-semibold hover:bg-brand-700 transition"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {processedWorkers.map(w => {
            const isShortlisted = shortlistedWorkerIds.includes(w.id);
            const score = w.matchData.totalScore;

            return (
              <div 
                key={w.id} 
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:border-slate-300 hover:shadow-md transition flex flex-col justify-between space-y-4"
              >
                <div>
                  {/* Card Header */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <img src={w.avatar} alt={w.name} className="w-14 h-14 rounded-2xl object-cover border border-slate-100" />
                        {w.verified?.identity && (
                          <ShieldCheck className="w-4 h-4 text-brand-600 fill-brand-100 absolute -bottom-1 -right-1" title="Identity Verified" />
                        )}
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900 text-sm">{w.name}</h3>
                        <p className="text-xs text-slate-500">{w.domain}</p>
                        <div className="flex items-center gap-1 text-[11px] text-slate-400 mt-0.5">
                          <MapPin className="w-3 h-3" />
                          <span className="truncate max-w-[120px]">{w.location}</span>
                        </div>
                      </div>
                    </div>

                    {/* Bookmark Toggle */}
                    <button
                      onClick={() => toggleShortlist(w.id)}
                      className={`p-2 rounded-xl transition ${
                        isShortlisted 
                          ? 'bg-purple-50 text-purple-600 hover:bg-purple-100' 
                          : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100'
                      }`}
                      title={isShortlisted ? 'Remove from shortlist' : 'Shortlist candidate'}
                    >
                      <Bookmark className={`w-4 h-4 ${isShortlisted ? 'fill-purple-600' : ''}`} />
                    </button>
                  </div>

                  <h4 className="text-xs font-semibold text-slate-800 line-clamp-1 mb-1">{w.title}</h4>
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-3">{w.bio}</p>

                  {/* Skills tags */}
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {(w.skills || []).slice(0, 4).map((s, idx) => (
                      <span key={idx} className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md font-medium">
                        {s}
                      </span>
                    ))}
                    {(w.skills || []).length > 4 && (
                      <span className="text-[10px] text-slate-400 self-center">
                        +{w.skills.length - 4} more
                      </span>
                    )}
                  </div>

                  {/* Algorithmic Match Score Pill */}
                  <div 
                    onClick={() => setSelectedMatchModal(w)}
                    className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 cursor-pointer hover:bg-brand-50/50 hover:border-brand-200 transition mb-3"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-brand-600" />
                        <span className="text-xs font-semibold text-slate-800">Match Compatibility</span>
                      </div>
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-md ${
                        score >= 80 ? 'bg-emerald-100 text-emerald-800' :
                        score >= 60 ? 'bg-blue-100 text-blue-800' :
                        'bg-amber-100 text-amber-800'
                      }`}>
                        {score}% Match
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-500 mt-1 truncate">
                      Click to inspect transparent 8-factor score breakdown →
                    </p>
                  </div>
                </div>

                {/* Footer Controls */}
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
                      View Profile
                    </button>
                    <button
                      onClick={() => startConversationWithWorker(w, benchmarkProject)}
                      className="w-full py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-semibold transition flex items-center justify-center gap-1.5 shadow-xs"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Message</span>
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      )}

      {/* Match Score Breakdown Modal */}
      {selectedMatchModal && (
        <MatchBreakdownModal
          isOpen={Boolean(selectedMatchModal)}
          onClose={() => setSelectedMatchModal(null)}
          worker={selectedMatchModal}
          project={benchmarkProject}
          matchData={selectedMatchModal.matchData}
        />
      )}

    </div>
  );
}
