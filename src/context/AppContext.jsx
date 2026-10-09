import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  INITIAL_WORKERS,
  INITIAL_PROJECTS,
  INITIAL_CONVERSATIONS,
  INITIAL_NOTIFICATIONS
} from '../data/seedData';
import { calculateMatchScore } from '../services/matchingEngine';

const AppContext = createContext();

export function AppProvider({ children }) {
  // Persistence with LocalStorage
  const [userRole, setUserRole] = useState(() => {
    return localStorage.getItem('skillmatch_role') || 'customer';
  });

  const [currentView, setCurrentView] = useState('landing');
  const [selectedWorkerId, setSelectedWorkerId] = useState('worker-1');
  const [selectedProjectId, setSelectedProjectId] = useState('proj-1');
  const [activeProjectForMatching, setActiveProjectForMatching] = useState(null);

  const [workers, setWorkers] = useState(() => {
    const saved = localStorage.getItem('skillmatch_workers');
    return saved ? JSON.parse(saved) : INITIAL_WORKERS;
  });

  const [projects, setProjects] = useState(() => {
    const saved = localStorage.getItem('skillmatch_projects');
    return saved ? JSON.parse(saved) : INITIAL_PROJECTS;
  });

  const [conversations, setConversations] = useState(() => {
    const saved = localStorage.getItem('skillmatch_conversations');
    return saved ? JSON.parse(saved) : INITIAL_CONVERSATIONS;
  });

  const [activeConversationId, setActiveConversationId] = useState('conv-1');

  const [shortlistedWorkerIds, setShortlistedWorkerIds] = useState(() => {
    const saved = localStorage.getItem('skillmatch_shortlists');
    return saved ? JSON.parse(saved) : ['worker-1', 'worker-2'];
  });

  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem('skillmatch_notifications');
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  // Current logged in identities
  const [customerUser, setCustomerUser] = useState({
    id: 'customer-1',
    name: 'Alex Morgan',
    email: 'alex@metricpulse.io',
    company: 'MetricPulse Inc.',
    role: 'customer',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&auto=format&fit=crop&q=80'
  });

  const [workerUser, setWorkerUser] = useState(() => {
    return workers.find(w => w.id === 'worker-1') || workers[0];
  });

  // Keep workerUser synchronized if worker-1 is edited
  useEffect(() => {
    const matched = workers.find(w => w.id === workerUser.id);
    if (matched) setWorkerUser(matched);
  }, [workers]);

  // Sync to LocalStorage
  useEffect(() => {
    localStorage.setItem('skillmatch_role', userRole);
  }, [userRole]);

  useEffect(() => {
    localStorage.setItem('skillmatch_workers', JSON.stringify(workers));
  }, [workers]);

  useEffect(() => {
    localStorage.setItem('skillmatch_projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('skillmatch_conversations', JSON.stringify(conversations));
  }, [conversations]);

  useEffect(() => {
    localStorage.setItem('skillmatch_shortlists', JSON.stringify(shortlistedWorkerIds));
  }, [shortlistedWorkerIds]);

  useEffect(() => {
    localStorage.setItem('skillmatch_notifications', JSON.stringify(notifications));
  }, [notifications]);

  // Actions
  const switchRole = (role) => {
    setUserRole(role);
    if (role === 'customer') {
      setCurrentView('customer-dashboard');
    } else {
      setCurrentView('worker-dashboard');
    }
  };

  const navigateTo = (view, params = {}) => {
    if (params.workerId) setSelectedWorkerId(params.workerId);
    if (params.projectId) setSelectedProjectId(params.projectId);
    if (params.projectForMatching) setActiveProjectForMatching(params.projectForMatching);
    if (params.conversationId) setActiveConversationId(params.conversationId);
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const addProject = (projectData) => {
    const newId = `proj-${Date.now()}`;
    const newProject = {
      ...projectData,
      id: newId,
      status: 'Open',
      clientId: customerUser.id,
      clientName: customerUser.name,
      clientCompany: customerUser.company,
      clientAvatar: customerUser.avatar,
      createdAt: new Date().toISOString().split('T')[0],
      progress: 0,
      assignedWorkerId: null,
      milestones: [
        { id: `m-${Date.now()}-1`, title: 'Discovery & Specifications', status: 'Pending', dueDate: 'In 5 days' },
        { id: `m-${Date.now()}-2`, title: 'Core Implementation', status: 'Pending', dueDate: 'In 2 weeks' },
        { id: `m-${Date.now()}-3`, title: 'Final Review & Handover', status: 'Pending', dueDate: 'In 3 weeks' }
      ]
    };

    setProjects(prev => [newProject, ...prev]);

    // Push notification
    addNotification({
      type: 'match',
      title: 'Project Created & Matching Ready',
      description: `Analysis completed for "${newProject.title}". View your top ranked talent now!`
    });

    setActiveProjectForMatching(newProject);
    return newProject;
  };

  const updateProjectStatus = (projectId, status, progress = null, assignedWorker = null) => {
    setProjects(prev => prev.map(p => {
      if (p.id === projectId) {
        return {
          ...p,
          status,
          ...(progress !== null ? { progress } : {}),
          ...(assignedWorker ? { assignedWorkerId: assignedWorker.id, assignedWorkerName: assignedWorker.name } : {})
        };
      }
      return p;
    }));

    addNotification({
      type: 'status',
      title: 'Project Status Updated',
      description: `Project status changed to "${status}".`
    });
  };

  const toggleShortlist = (workerId) => {
    setShortlistedWorkerIds(prev => {
      const exists = prev.includes(workerId);
      if (exists) {
        return prev.filter(id => id !== workerId);
      } else {
        return [...prev, workerId];
      }
    });
  };

  const updateWorkerProfile = (workerId, updatedData) => {
    setWorkers(prev => prev.map(w => {
      if (w.id === workerId) {
        return { ...w, ...updatedData };
      }
      return w;
    }));

    addNotification({
      type: 'profile',
      title: 'Profile Updated Successfully',
      description: 'Your changes have been saved and your profile strength recalculated.'
    });
  };

  const startConversationWithWorker = (worker, project = null) => {
    const existing = conversations.find(c => c.workerId === worker.id);
    if (existing) {
      setActiveConversationId(existing.id);
      navigateTo('messages');
      return existing.id;
    }

    const newConvId = `conv-${Date.now()}`;
    const newConv = {
      id: newConvId,
      workerId: worker.id,
      workerName: worker.name,
      workerAvatar: worker.avatar,
      clientId: customerUser.id,
      clientName: customerUser.name,
      clientAvatar: customerUser.avatar,
      projectId: project ? project.id : (projects[0]?.id || 'general'),
      projectTitle: project ? project.title : 'Direct Inquiry',
      lastMessage: `Hi ${worker.name}, I reviewed your profile and would love to discuss a project with you!`,
      lastMessageTime: 'Just now',
      unreadCount: 0,
      isOnline: true,
      messages: [
        {
          id: `msg-${Date.now()}`,
          senderId: customerUser.id,
          senderName: customerUser.name,
          text: `Hi ${worker.name}, I reviewed your profile on SkillMatch and would love to discuss working together!`,
          timestamp: 'Just now'
        }
      ]
    };

    setConversations(prev => [newConv, ...prev]);
    setActiveConversationId(newConvId);
    navigateTo('messages');
    return newConvId;
  };

  const sendMessage = (conversationId, text) => {
    if (!text.trim()) return;

    const currentSender = userRole === 'customer' ? customerUser : workerUser;

    setConversations(prev => prev.map(conv => {
      if (conv.id === conversationId) {
        const newMessage = {
          id: `msg-${Date.now()}`,
          senderId: currentSender.id,
          senderName: currentSender.name,
          text: text.trim(),
          timestamp: 'Just now'
        };

        return {
          ...conv,
          lastMessage: text.trim(),
          lastMessageTime: 'Just now',
          messages: [...conv.messages, newMessage]
        };
      }
      return conv;
    }));
  };

  const addReview = (workerId, { quality, communication, professionalism, timeliness, comment }) => {
    const avgCategory = (Number(quality) + Number(communication) + Number(professionalism) + Number(timeliness)) / 4;
    const roundedRating = Number(avgCategory.toFixed(1));

    const newReview = {
      id: `rev-${Date.now()}`,
      clientName: customerUser.name,
      clientCompany: customerUser.company,
      date: 'Today',
      rating: roundedRating,
      categories: { quality, communication, professionalism, timeliness },
      comment
    };

    setWorkers(prev => prev.map(w => {
      if (w.id === workerId) {
        const currentReviews = w.reviews || [];
        const updatedReviews = [newReview, ...currentReviews];
        const newTotalReviews = updatedReviews.length;
        const newRating = Number((updatedReviews.reduce((sum, r) => sum + r.rating, 0) / newTotalReviews).toFixed(2));

        return {
          ...w,
          reviews: updatedReviews,
          totalReviews: newTotalReviews,
          rating: newRating,
          completedProjects: (w.completedProjects || 0) + 1
        };
      }
      return w;
    }));

    addNotification({
      type: 'review',
      title: 'Review Published',
      description: `You rated your freelancer ${roundedRating} ⭐. Thank you for your feedback!`
    });
  };

  const addNotification = ({ type, title, description }) => {
    const newNotif = {
      id: `notif-${Date.now()}`,
      type,
      title,
      description,
      time: 'Just now',
      read: false
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const activeWorker = workers.find(w => w.id === selectedWorkerId) || workers[0];
  const activeProject = projects.find(p => p.id === selectedProjectId) || projects[0];

  return (
    <AppContext.Provider
      value={{
        userRole,
        switchRole,
        currentView,
        navigateTo,
        workers,
        setWorkers,
        projects,
        setProjects,
        conversations,
        activeConversationId,
        setActiveConversationId,
        shortlistedWorkerIds,
        toggleShortlist,
        notifications,
        markAllNotificationsRead,
        customerUser,
        workerUser,
        selectedWorkerId,
        setSelectedWorkerId,
        selectedProjectId,
        setSelectedProjectId,
        activeWorker,
        activeProject,
        activeProjectForMatching,
        setActiveProjectForMatching,
        addProject,
        updateProjectStatus,
        updateWorkerProfile,
        startConversationWithWorker,
        sendMessage,
        addReview,
        addNotification
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
