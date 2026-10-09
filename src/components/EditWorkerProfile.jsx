import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { calculateProfileStrength } from '../services/profileStrength';
import { 
  Award, 
  CheckCircle2, 
  Save, 
  X, 
  Plus, 
  ArrowLeft, 
  ShieldCheck, 
  AlertCircle 
} from 'lucide-react';

export default function EditWorkerProfile() {
  const { workerUser, updateWorkerProfile, navigateTo } = useApp();

  const [name, setName] = useState(workerUser.name || '');
  const [title, setTitle] = useState(workerUser.title || '');
  const [domain, setDomain] = useState(workerUser.domain || 'UI/UX Design');
  const [location, setLocation] = useState(workerUser.location || '');
  const [hourlyRate, setHourlyRate] = useState(workerUser.hourlyRate || 45);
  const [bio, setBio] = useState(workerUser.bio || '');
  const [availabilityHours, setAvailabilityHours] = useState(workerUser.availabilityHours || '35 hrs/week');
  const [skills, setSkills] = useState(workerUser.skills || []);
  const [newSkill, setNewSkill] = useState('');

  // Draft worker for live profile strength calculation
  const draftWorker = {
    ...workerUser,
    name,
    title,
    domain,
    location,
    hourlyRate: Number(hourlyRate),
    bio,
    availabilityHours,
    skills
  };

  const strength = calculateProfileStrength(draftWorker);

  const handleAddSkill = (e) => {
    e?.preventDefault();
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills(prev => [...prev, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setSkills(prev => prev.filter(s => s !== skillToRemove));
  };

  const handleSave = (e) => {
    e.preventDefault();
    updateWorkerProfile(workerUser.id, {
      name,
      title,
      domain,
      location,
      hourlyRate: Number(hourlyRate),
      bio,
      availabilityHours,
      skills
    });
    navigateTo('worker-dashboard');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      <div>
        <button
          onClick={() => navigateTo('worker-dashboard')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </button>
        <h1 className="text-2xl font-bold text-slate-900">Improve & Edit Profile</h1>
        <p className="text-xs text-slate-500">
          Optimize your profile factors to maximize algorithmic match rank and client visibility
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Cols: Form */}
        <form onSubmit={handleSave} className="lg:col-span-2 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Full Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full text-xs sm:text-sm px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Hourly Rate ($USD)</label>
              <input
                type="number"
                min="15"
                max="300"
                required
                value={hourlyRate}
                onChange={(e) => setHourlyRate(e.target.value)}
                className="w-full text-xs sm:text-sm px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Professional Headline / Title</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Senior Full-Stack Engineer"
                className="w-full text-xs sm:text-sm px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Domain Category</label>
              <select
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                className="w-full text-xs sm:text-sm px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:outline-none bg-white"
              >
                <option value="Web Development">Web Development</option>
                <option value="Mobile Development">Mobile Development</option>
                <option value="UI/UX Design">UI/UX Design</option>
                <option value="Graphic Design">Graphic Design</option>
                <option value="Data Science & AI">Data Science & AI</option>
                <option value="Content Writing">Content Writing</option>
                <option value="Digital Marketing">Digital Marketing</option>
                <option value="Video Editing">Video Editing</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Location</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full text-xs sm:text-sm px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Weekly Availability</label>
              <input
                type="text"
                value={availabilityHours}
                onChange={(e) => setAvailabilityHours(e.target.value)}
                placeholder="e.g. 35 hrs/week"
                className="w-full text-xs sm:text-sm px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Professional Bio</label>
              <span className={`text-[11px] ${bio.length >= 80 ? 'text-emerald-600 font-semibold' : 'text-amber-600'}`}>
                {bio.length}/80 characters minimum
              </span>
            </div>
            <textarea
              rows={4}
              required
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full text-xs sm:text-sm p-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Skills & Technologies (min 4 for 100%)</label>
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                placeholder="Add skill (e.g. Tailwind, Node.js, GraphQL)..."
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') handleAddSkill(e); }}
                className="flex-1 text-xs sm:text-sm px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:outline-none"
              />
              <button
                type="button"
                onClick={handleAddSkill}
                className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-semibold hover:bg-slate-800 transition"
              >
                Add
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              {skills.map((s, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-100 text-slate-800 text-xs font-medium rounded-lg"
                >
                  <span>{s}</span>
                  <button type="button" onClick={() => handleRemoveSkill(s)} className="hover:text-red-500">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => navigateTo('worker-dashboard')}
              className="px-4 py-2.5 border border-slate-200 text-slate-600 rounded-xl text-xs font-semibold hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-semibold shadow-md transition flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>Save & Update Profile</span>
            </button>
          </div>

        </form>

        {/* Right Col: Live Profile Strength Gauge */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-brand-600" />
                <h3 className="font-bold text-slate-900 text-sm">Live Profile Strength</h3>
              </div>
              <span className="text-xl font-extrabold text-brand-600">{strength.score}%</span>
            </div>

            <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
              <div 
                className="bg-brand-500 h-full rounded-full transition-all duration-300"
                style={{ width: `${strength.score}%` }}
              />
            </div>

            <div className="space-y-2 pt-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">Criteria Checklist</span>
              {(strength.sections || []).map((sec, i) => (
                <div key={i} className="flex items-center justify-between text-xs py-1 border-b border-slate-50">
                  <span className={sec.completed ? 'text-slate-800 font-medium' : 'text-slate-400'}>{sec.name}</span>
                  {sec.completed ? (
                    <span className="text-emerald-600 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      +{sec.weight}%
                    </span>
                  ) : (
                    <span className="text-slate-400 font-medium">0/{sec.weight}%</span>
                  )}
                </div>
              ))}
            </div>

            {strength.suggestions.length > 0 && (
              <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-800 space-y-1">
                <span className="font-bold flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                  Tips to reach 100%:
                </span>
                <p className="text-[11px] leading-relaxed">{strength.suggestions[0]}</p>
              </div>
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
