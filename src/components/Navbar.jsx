import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Briefcase, 
  Search, 
  MessageSquare, 
  Bell, 
  Bookmark, 
  User, 
  Sparkles, 
  Globe, 
  PlusCircle,
  CheckCircle,
  Menu,
  X
} from 'lucide-react';

export default function Navbar() {
  const { 
    userRole, 
    switchRole, 
    currentView, 
    navigateTo, 
    notifications, 
    markAllNotificationsRead,
    customerUser,
    workerUser,
    shortlistedWorkerIds
  } = useApp();

  const [showNotifications, setShowNotifications] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const unreadNotifs = notifications.filter(n => !n.read).length;
  const currentUser = userRole === 'customer' ? customerUser : workerUser;

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => navigateTo('landing')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-accent-600 flex items-center justify-center text-white shadow-md shadow-brand-500/20">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xl font-bold bg-gradient-to-r from-slate-900 via-brand-700 to-accent-600 bg-clip-text text-transparent">
                SkillMatch
              </span>
              <span className="block text-[10px] text-slate-400 font-semibold uppercase tracking-wider -mt-1">
                Intelligent Matching
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {userRole === 'customer' ? (
              <>
                <button
                  onClick={() => navigateTo('customer-dashboard')}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                    currentView === 'customer-dashboard' ? 'text-brand-600 bg-brand-50' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  Dashboard
                </button>
                <button
                  onClick={() => navigateTo('find-workers')}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                    currentView === 'find-workers' ? 'text-brand-600 bg-brand-50' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  Find Workers
                </button>
                <button
                  onClick={() => navigateTo('create-project')}
                  className="px-3 py-1.5 rounded-lg text-sm font-medium text-emerald-700 bg-emerald-50 hover:bg-emerald-100 transition flex items-center gap-1.5"
                >
                  <PlusCircle className="w-4 h-4" />
                  Post a Project
                </button>
                <button
                  onClick={() => navigateTo('shortlist')}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition flex items-center gap-1.5 ${
                    currentView === 'shortlist' ? 'text-brand-600 bg-brand-50' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Bookmark className="w-4 h-4" />
                  Shortlist ({shortlistedWorkerIds.length})
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => navigateTo('worker-dashboard')}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                    currentView === 'worker-dashboard' ? 'text-brand-600 bg-brand-50' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  Dashboard
                </button>
                <button
                  onClick={() => navigateTo('worker-profile', { workerId: workerUser.id })}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                    currentView === 'worker-profile' ? 'text-brand-600 bg-brand-50' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  My Profile
                </button>
                <button
                  onClick={() => navigateTo('edit-worker-profile')}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                    currentView === 'edit-worker-profile' ? 'text-brand-600 bg-brand-50' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  Improve Profile
                </button>
                <button
                  onClick={() => navigateTo('workspace')}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                    currentView === 'workspace' ? 'text-brand-600 bg-brand-50' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  Active Projects
                </button>
              </>
            )}

            {/* Common Links */}
            <button
              onClick={() => navigateTo('messages')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition flex items-center gap-1.5 ${
                currentView === 'messages' ? 'text-brand-600 bg-brand-50' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              Messages
            </button>
            <button
              onClick={() => navigateTo('serpapi-research')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition flex items-center gap-1.5 ${
                currentView === 'serpapi-research' ? 'text-accent-600 bg-accent-50' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
              title="External Skill & Market Intelligence"
            >
              <Globe className="w-4 h-4 text-accent-500" />
              Market Intel
            </button>
          </nav>

          {/* Right Controls: Role Switcher, Notifications & User Avatar */}
          <div className="flex items-center space-x-3">
            
            {/* Role Switcher Pill */}
            <div className="bg-slate-100 p-1 rounded-full flex items-center border border-slate-200">
              <button
                onClick={() => switchRole('customer')}
                className={`px-2.5 py-1 text-xs font-semibold rounded-full transition ${
                  userRole === 'customer'
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Customer
              </button>
              <button
                onClick={() => switchRole('worker')}
                className={`px-2.5 py-1 text-xs font-semibold rounded-full transition ${
                  userRole === 'worker'
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Freelancer
              </button>
            </div>

            {/* Notifications Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-full transition"
                aria-label="Notifications"
              >
                <Bell className="w-5 h-5" />
                {unreadNotifs > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-rose-500 rounded-full ring-2 ring-white"></span>
                )}
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 py-3 z-50">
                  <div className="flex items-center justify-between px-4 pb-2 border-b border-slate-100">
                    <span className="text-sm font-bold text-slate-900">Notifications</span>
                    <button
                      onClick={markAllNotificationsRead}
                      className="text-xs text-brand-600 hover:text-brand-700 font-semibold"
                    >
                      Mark all as read
                    </button>
                  </div>
                  <div className="max-h-72 overflow-y-auto divide-y divide-slate-100">
                    {notifications.map((notif) => (
                      <div
                        key={notif.id}
                        className={`p-3 text-xs hover:bg-slate-50 transition cursor-pointer ${
                          !notif.read ? 'bg-brand-50/40' : ''
                        }`}
                      >
                        <div className="flex items-center justify-between font-semibold text-slate-800">
                          <span>{notif.title}</span>
                          <span className="text-[10px] text-slate-400 font-normal">{notif.time}</span>
                        </div>
                        <p className="text-slate-600 mt-0.5 line-clamp-2">{notif.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Active User Avatar */}
            <div 
              className="flex items-center space-x-2 pl-2 border-l border-slate-200 cursor-pointer"
              onClick={() => {
                if (userRole === 'customer') navigateTo('customer-dashboard');
                else navigateTo('worker-profile', { workerId: workerUser.id });
              }}
            >
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-8 h-8 rounded-full object-cover border border-slate-200"
              />
              <div className="hidden lg:block text-left">
                <span className="block text-xs font-bold text-slate-900 leading-tight">
                  {currentUser.name}
                </span>
                <span className="block text-[10px] text-slate-500 capitalize">
                  {userRole}
                </span>
              </div>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-600 hover:text-slate-900"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-4 space-y-1">
          {userRole === 'customer' ? (
            <>
              <button
                onClick={() => { navigateTo('customer-dashboard'); setMobileMenuOpen(false); }}
                className="block w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-100"
              >
                Dashboard
              </button>
              <button
                onClick={() => { navigateTo('find-workers'); setMobileMenuOpen(false); }}
                className="block w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-100"
              >
                Find Workers
              </button>
              <button
                onClick={() => { navigateTo('create-project'); setMobileMenuOpen(false); }}
                className="block w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-emerald-700 bg-emerald-50"
              >
                Post a Project
              </button>
              <button
                onClick={() => { navigateTo('shortlist'); setMobileMenuOpen(false); }}
                className="block w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-100"
              >
                Shortlist ({shortlistedWorkerIds.length})
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => { navigateTo('worker-dashboard'); setMobileMenuOpen(false); }}
                className="block w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-100"
              >
                Dashboard
              </button>
              <button
                onClick={() => { navigateTo('worker-profile', { workerId: workerUser.id }); setMobileMenuOpen(false); }}
                className="block w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-100"
              >
                My Profile
              </button>
              <button
                onClick={() => { navigateTo('edit-worker-profile'); setMobileMenuOpen(false); }}
                className="block w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-100"
              >
                Improve Profile
              </button>
            </>
          )}
          <button
            onClick={() => { navigateTo('messages'); setMobileMenuOpen(false); }}
            className="block w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-100"
          >
            Messages
          </button>
          <button
            onClick={() => { navigateTo('serpapi-research'); setMobileMenuOpen(false); }}
            className="block w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-accent-700 bg-accent-50"
          >
            Market & Skill Intel (SerpApi)
          </button>
        </div>
      )}
    </header>
  );
}
