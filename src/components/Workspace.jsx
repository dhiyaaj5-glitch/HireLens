import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import ReviewModal from './ReviewModal';
import { 
  Briefcase, 
  CheckCircle2, 
  Clock, 
  Star, 
  User, 
  DollarSign, 
  FileText, 
  MessageSquare, 
  ArrowLeft,
  ChevronRight,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';

export default function Workspace() {
  const { 
    projects, 
    activeProject, 
    updateProjectStatus, 
    workers, 
    navigateTo, 
    startConversationWithWorker, 
    userRole 
  } = useApp();

  const [selectedProjectId, setSelectedProjectId] = useState(activeProject?.id || projects[0]?.id);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);

  const currentProject = projects.find(p => p.id === selectedProjectId) || projects[0];

  if (!currentProject) {
    return (
      <div className="max-w-4xl mx-auto py-16 text-center space-y-4">
        <h2 className="text-xl font-bold text-slate-800">No Projects Available</h2>
        <button onClick={() => navigateTo('create-project')} className="px-4 py-2 bg-brand-600 text-white rounded-xl text-xs">
          Post a Project
        </button>
      </div>
    );
  }

  // Find assigned or default worker for this project
  const assignedWorker = workers.find(w => w.id === currentProject.assignedWorkerId) || workers[0];

  const handleProgressChange = (newProgress) => {
    let newStatus = currentProject.status;
    if (newProgress === 100) newStatus = 'Completed';
    else if (newProgress > 0 && currentProject.status === 'Open') newStatus = 'In Progress';
    updateProjectStatus(currentProject.id, newStatus, newProgress);
  };

  const handleStatusChange = (newStatus) => {
    let newProgress = currentProject.progress || 0;
    if (newStatus === 'Completed') newProgress = 100;
    updateProjectStatus(currentProject.id, newStatus, newProgress);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Workspace Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <button
            onClick={() => navigateTo(userRole === 'customer' ? 'customer-dashboard' : 'worker-dashboard')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition mb-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Dashboard</span>
          </button>
          <h1 className="text-2xl font-bold text-slate-900">Project Collaboration Workspace</h1>
          <p className="text-xs text-slate-500">Track deliverables, manage milestones, and finalize audited completions</p>
        </div>

        {/* Project Switcher */}
        {projects.length > 1 && (
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-slate-500">Select Project:</span>
            <select
              value={selectedProjectId}
              onChange={(e) => setSelectedProjectId(e.target.value)}
              className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500"
            >
              {projects.map(p => (
                <option key={p.id} value={p.id}>{p.title}</option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Main Project Overview Card */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700">
                {currentProject.domain}
              </span>
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                currentProject.status === 'Completed' ? 'bg-emerald-100 text-emerald-800' :
                currentProject.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                'bg-amber-100 text-amber-800'
              }`}>
                {currentProject.status}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">{currentProject.title}</h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-3xl">{currentProject.description}</p>
          </div>

          <div className="flex flex-col sm:items-end gap-2 text-left sm:text-right">
            <div>
              <span className="text-2xl font-bold text-slate-900">{currentProject.budget}</span>
              <span className="block text-[11px] text-slate-400">Total Agreed Budget</span>
            </div>

            {/* Status Dropdown */}
            <select
              value={currentProject.status}
              onChange={(e) => handleStatusChange(e.target.value)}
              className="text-xs px-3 py-1.5 border border-slate-200 rounded-xl font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white"
            >
              <option value="Open">Status: Open</option>
              <option value="In Progress">Status: In Progress</option>
              <option value="Under Review">Status: Under Review</option>
              <option value="Completed">Status: Completed</option>
            </select>
          </div>
        </div>

        {/* Progress Slider */}
        <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-800">Overall Deliverable Progress</span>
            <span className="font-extrabold text-brand-600 text-sm">{currentProject.progress || 0}%</span>
          </div>

          <input
            type="range"
            min="0"
            max="100"
            step="5"
            value={currentProject.progress || 0}
            onChange={(e) => handleProgressChange(Number(e.target.value))}
            className="w-full accent-brand-600"
          />

          <div className="flex justify-between text-[10px] text-slate-400">
            <span>0% Kickoff</span>
            <span>50% Mid-point Sprint</span>
            <span>100% Final Delivery & Handover</span>
          </div>
        </div>

        {/* Completed Review Banner */}
        {currentProject.status === 'Completed' && (
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
              <div>
                <h4 className="font-bold text-emerald-900 text-xs sm:text-sm">Project Successfully Delivered!</h4>
                <p className="text-xs text-emerald-700">Submit a verified 4-category review to update the freelancer's public rating.</p>
              </div>
            </div>

            <button
              onClick={() => setReviewModalOpen(true)}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold shadow-xs transition shrink-0 flex items-center gap-1.5"
            >
              <Star className="w-3.5 h-3.5 fill-white" />
              <span>Leave Verified Review</span>
            </button>
          </div>
        )}
      </div>

      {/* Grid: Milestones & Collaborator Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Cols: Milestones */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900">Project Milestones & Deliverables</h3>
            <span className="text-xs text-slate-500">{(currentProject.milestones || []).length} Milestones</span>
          </div>

          <div className="space-y-3">
            {(currentProject.milestones || [
              { id: '1', title: 'Technical Architecture & Wireframes', status: 'Completed', dueDate: 'Completed' },
              { id: '2', title: 'Core Functionality & API Implementation', status: 'In Progress', dueDate: 'In 5 days' },
              { id: '3', title: 'Testing, Review & Production Deployment', status: 'Pending', dueDate: 'In 12 days' }
            ]).map((m, idx) => (
              <div 
                key={m.id || idx}
                className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold ${
                    m.status === 'Completed' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {idx + 1}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-xs sm:text-sm">{m.title}</h4>
                    <span className="text-[11px] text-slate-400">Target: {m.dueDate}</span>
                  </div>
                </div>

                <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${
                  m.status === 'Completed' ? 'bg-emerald-50 text-emerald-700' :
                  m.status === 'In Progress' ? 'bg-blue-50 text-blue-700' :
                  'bg-slate-100 text-slate-600'
                }`}>
                  {m.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Col: Collaborator Profile Card */}
        <div className="space-y-4">
          <h3 className="text-base font-bold text-slate-900">Assigned Specialist</h3>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center gap-3">
              <img src={assignedWorker.avatar} alt={assignedWorker.name} className="w-14 h-14 rounded-2xl object-cover border border-slate-100" />
              <div>
                <h4 className="font-bold text-slate-900 text-sm">{assignedWorker.name}</h4>
                <p className="text-xs text-brand-600 font-medium">{assignedWorker.title}</p>
                <div className="flex items-center gap-1 text-[11px] text-amber-500 font-bold mt-0.5">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span>{assignedWorker.rating}</span>
                  <span className="text-slate-400 font-normal">({assignedWorker.totalReviews} reviews)</span>
                </div>
              </div>
            </div>

            <div className="text-xs text-slate-600 space-y-1.5 pt-2 border-t border-slate-100">
              <div className="flex justify-between">
                <span className="text-slate-400">Hourly Rate:</span>
                <span className="font-bold text-slate-800">${assignedWorker.hourlyRate}/hr</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Response SLA:</span>
                <span className="font-semibold text-slate-800">{assignedWorker.responseTime}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Completed Projects:</span>
                <span className="font-semibold text-slate-800">{assignedWorker.completedProjects}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 grid grid-cols-2 gap-2">
              <button
                onClick={() => navigateTo('worker-profile', { workerId: assignedWorker.id })}
                className="py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-semibold transition"
              >
                Profile
              </button>
              <button
                onClick={() => startConversationWithWorker(assignedWorker, currentProject)}
                className="py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-semibold transition flex items-center justify-center gap-1"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Chat</span>
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* Review Modal */}
      {reviewModalOpen && (
        <ReviewModal
          isOpen={reviewModalOpen}
          onClose={() => setReviewModalOpen(false)}
          worker={assignedWorker}
        />
      )}

    </div>
  );
}
