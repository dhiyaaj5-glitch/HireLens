import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { analyzeProjectBrief } from '../services/aiRequirementAnalyzer';
import { calculateMatchScore } from '../services/matchingEngine';
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle, 
  Plus, 
  X, 
  Cpu, 
  DollarSign, 
  Calendar, 
  Lightbulb, 
  Layers,
  CheckCircle2
} from 'lucide-react';

export default function CreateProject() {
  const { addProject, navigateTo, workers } = useApp();

  const [title, setTitle] = useState('');
  const [domain, setDomain] = useState('Web Development');
  const [description, setDescription] = useState('');
  const [budget, setBudget] = useState('$3,500 - $5,000');
  const [deadline, setDeadline] = useState('4 weeks');
  const [skillInput, setSkillInput] = useState('');
  const [skills, setSkills] = useState(['React', 'TypeScript', 'Tailwind CSS']);

  // AI Analyzer State
  const [analyzing, setAnalyzing] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState(null);

  const handleAddSkill = (e) => {
    e?.preventDefault();
    if (skillInput.trim() && !skills.includes(skillInput.trim())) {
      setSkills(prev => [...prev, skillInput.trim()]);
      setSkillInput('');
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setSkills(prev => prev.filter(s => s !== skillToRemove));
  };

  const handleRunAiAnalysis = () => {
    if (!description.trim()) {
      alert('Please enter a brief project description for the AI Analyzer to inspect.');
      return;
    }

    setAnalyzing(true);
    setTimeout(() => {
      const result = analyzeProjectBrief(description);
      setAiSuggestions(result);
      setAnalyzing(false);
    }, 600);
  };

  const handleApplyAiSuggestions = () => {
    if (!aiSuggestions) return;

    if (aiSuggestions.suggestedDomain) setDomain(aiSuggestions.suggestedDomain);
    if (aiSuggestions.suggestedBudget) setBudget(aiSuggestions.suggestedBudget);
    if (aiSuggestions.suggestedTimeline) setDeadline(aiSuggestions.suggestedTimeline);
    if (aiSuggestions.extractedSkills && aiSuggestions.extractedSkills.length > 0) {
      setSkills(Array.from(new Set([...skills, ...aiSuggestions.extractedSkills])));
    }
  };

  // Preview matching workers based on current draft
  const draftProject = { title, domain, description, budget, skills };
  const previewMatches = workers.map(w => ({
    worker: w,
    match: calculateMatchScore(draftProject, w)
  })).sort((a, b) => b.match.totalScore - a.match.totalScore).slice(0, 3);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      alert('Please provide a project title and description.');
      return;
    }

    const created = addProject({
      title: title.trim(),
      domain,
      description: description.trim(),
      budget,
      deadline,
      skills
    });

    navigateTo('find-workers', { projectForMatching: created });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="max-w-3xl">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 border border-brand-200 text-brand-700 text-xs font-semibold mb-3">
          <Sparkles className="w-3.5 h-3.5 text-brand-600" />
          <span>AI-Assisted Requirement Specification</span>
        </div>
        <h1 className="text-3xl font-bold text-slate-900">Post a Project & Auto-Match Talent</h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Provide your specifications or draft a rough idea. Our AI Brief Analyzer will extract technical competencies and benchmark suitable specialists in real time.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Cols: Form */}
        <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-6 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs">
          
          <div>
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">Project Title *</label>
            <input
              type="text"
              required
              placeholder="e.g. Modern SaaS Analytics Dashboard Redesign"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full text-sm px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">Domain Category</label>
            <select
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              className="w-full text-sm px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:outline-none bg-white"
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

          {/* Description & AI Trigger */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">Project Description / Brief *</label>
              <button
                type="button"
                onClick={handleRunAiAnalysis}
                disabled={analyzing}
                className="px-3 py-1 rounded-lg bg-accent-50 hover:bg-accent-100 text-accent-700 text-xs font-semibold border border-accent-200 transition flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-accent-600" />
                <span>{analyzing ? 'Analyzing with AI...' : '✨ Analyze Brief with AI'}</span>
              </button>
            </div>
            
            <textarea
              required
              rows={5}
              placeholder="Describe what you want built, target audience, technical preferences (e.g. We need a full-stack developer to build a subscription dashboard in React and Node.js with Stripe payment integration)..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full text-sm p-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:outline-none"
            />
          </div>

          {/* AI Analysis Result Card */}
          {aiSuggestions && (
            <div className="p-4 rounded-2xl bg-gradient-to-r from-accent-50 via-brand-50 to-emerald-50 border border-accent-200 space-y-3 animate-fadeIn">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-accent-700" />
                  <span className="font-bold text-slate-900 text-xs">AI Requirement Decomposition</span>
                </div>
                <button
                  type="button"
                  onClick={handleApplyAiSuggestions}
                  className="px-3 py-1 bg-accent-600 hover:bg-accent-700 text-white rounded-lg text-xs font-semibold shadow-xs transition"
                >
                  Apply All AI Suggestions
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                <div className="p-2 bg-white/80 rounded-lg">
                  <span className="text-[10px] text-slate-400 block font-medium">Domain</span>
                  <strong className="text-slate-800">{aiSuggestions.suggestedDomain}</strong>
                </div>
                <div className="p-2 bg-white/80 rounded-lg">
                  <span className="text-[10px] text-slate-400 block font-medium">Est. Complexity</span>
                  <strong className="text-slate-800">{aiSuggestions.estimatedComplexity}</strong>
                </div>
                <div className="p-2 bg-white/80 rounded-lg">
                  <span className="text-[10px] text-slate-400 block font-medium">Suggested Budget</span>
                  <strong className="text-emerald-700">{aiSuggestions.suggestedBudget}</strong>
                </div>
                <div className="p-2 bg-white/80 rounded-lg">
                  <span className="text-[10px] text-slate-400 block font-medium">Est. Timeline</span>
                  <strong className="text-slate-800">{aiSuggestions.suggestedTimeline}</strong>
                </div>
              </div>

              {aiSuggestions.extractedSkills && aiSuggestions.extractedSkills.length > 0 && (
                <div className="text-xs">
                  <span className="text-slate-600 font-medium">Extracted Tech Competencies: </span>
                  <div className="inline-flex flex-wrap gap-1 mt-1">
                    {aiSuggestions.extractedSkills.map((sk, i) => (
                      <span key={i} className="px-2 py-0.5 bg-white border border-slate-200 rounded text-[10px] text-slate-700 font-semibold">
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Budget & Timeline */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">Estimated Budget</label>
              <input
                type="text"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                placeholder="e.g. $4,000 or $50/hr"
                className="w-full text-sm px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">Target Timeline</label>
              <input
                type="text"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                placeholder="e.g. 3 weeks"
                className="w-full text-sm px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Required Skills */}
          <div>
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">Required Skills & Technologies</label>
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                placeholder="Type a skill (e.g. PostgreSQL, Figma, AWS) and press Add..."
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') handleAddSkill(e); }}
                className="flex-1 text-sm px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:outline-none"
              />
              <button
                type="button"
                onClick={handleAddSkill}
                className="px-4 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-semibold hover:bg-slate-800 transition"
              >
                Add Skill
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              {skills.map((s, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-50 border border-brand-200 text-brand-800 text-xs font-semibold rounded-lg"
                >
                  <span>{s}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(s)}
                    className="hover:text-red-500"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs text-slate-400">Deterministic scoring runs instantly upon submission</span>
            <button
              type="submit"
              className="px-6 py-3.5 bg-brand-600 hover:bg-brand-700 text-white font-semibold rounded-xl text-sm shadow-md shadow-brand-600/20 transition flex items-center gap-2"
            >
              <span>Post Project & View Matching Talent</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </form>

        {/* Right Col: Instant Live Match Preview */}
        <div className="space-y-4">
          <div className="bg-slate-900 text-white p-6 rounded-3xl shadow-md space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-brand-500 flex items-center justify-center text-slate-950 font-bold">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-sm">Live Matching Simulation</h3>
                <p className="text-[11px] text-slate-400">Updates as you edit title & skills</p>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              {previewMatches.map(({ worker, match }) => (
                <div key={worker.id} className="p-3 bg-slate-800/80 rounded-2xl border border-slate-700 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <img src={worker.avatar} alt={worker.name} className="w-10 h-10 rounded-xl object-cover" />
                    <div>
                      <h4 className="font-bold text-xs text-white">{worker.name}</h4>
                      <p className="text-[10px] text-slate-400">{worker.domain}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-xs font-bold text-emerald-400">{match.totalScore}%</span>
                    <span className="block text-[8px] uppercase tracking-wider text-slate-400">Match</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-800 text-[11px] text-slate-400 leading-relaxed">
              Upon posting, our 8-factor algorithm will transparently index the entire talent pool against your requirements.
            </div>
          </div>

          <div className="p-5 bg-white rounded-3xl border border-slate-200 text-xs space-y-2">
            <div className="flex items-center gap-2 font-bold text-slate-800">
              <Lightbulb className="w-4 h-4 text-amber-500" />
              <span>Pro Tip: Market Rates</span>
            </div>
            <p className="text-slate-500 text-[11px] leading-relaxed">
              Need to calibrate your budget against industry averages? Use the SerpApi Market Intelligence tab to view live Google compensation benchmarks.
            </p>
            <button
              onClick={() => navigateTo('serpapi-research')}
              className="text-brand-600 hover:text-brand-700 font-semibold text-[11px] underline block pt-1"
            >
              Open SerpApi Market Intel →
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
