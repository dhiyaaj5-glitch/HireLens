import React from 'react';
import { useApp } from './context/AppContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Views
import LandingPage from './components/LandingPage';
import CustomerDashboard from './components/CustomerDashboard';
import FindWorkers from './components/FindWorkers';
import CreateProject from './components/CreateProject';
import Shortlist from './components/Shortlist';
import WorkerDashboard from './components/WorkerDashboard';
import WorkerProfile from './components/WorkerProfile';
import EditWorkerProfile from './components/EditWorkerProfile';
import Workspace from './components/Workspace';
import Messages from './components/Messages';
import SerpApiResearch from './components/SerpApiResearch';

export default function App() {
  const { currentView, navigateTo } = useApp();

  const renderCurrentView = () => {
    switch (currentView) {
      case 'landing':
        return <LandingPage />;
      case 'customer-dashboard':
        return <CustomerDashboard />;
      case 'find-workers':
        return <FindWorkers />;
      case 'create-project':
        return <CreateProject />;
      case 'shortlist':
        return <Shortlist />;
      case 'worker-dashboard':
        return <WorkerDashboard />;
      case 'worker-profile':
        return <WorkerProfile />;
      case 'edit-worker-profile':
        return <EditWorkerProfile />;
      case 'workspace':
        return <Workspace />;
      case 'messages':
        return <Messages />;
      case 'serpapi-research':
        return <SerpApiResearch />;
      default:
        return <LandingPage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-brand-500 selection:text-white font-sans">
      <Navbar />
      <main className="flex-1">
        {renderCurrentView()}
      </main>
      <Footer onNavigate={navigateTo} />
    </div>
  );
}
