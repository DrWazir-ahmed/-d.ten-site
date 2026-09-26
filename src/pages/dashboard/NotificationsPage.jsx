import React, { useState, useEffect } from 'react';
import { Bell, CheckCircle2, Sparkles, Award, BookOpen, Clock } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { getUserNotifications, markNotificationRead } from '../../services/firebaseService';
import { EmptyState } from '../../components/common/EmptyState';

export const NotificationsPage = () => {
  const { currentUser } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      if (currentUser?.uid) {
        setLoading(true);
        const data = await getUserNotifications(currentUser.uid);
        setNotifications(data);
        setLoading(false);
      }
    };
    load();
  }, [currentUser]);

  const handleMarkRead = async (id) => {
    await markNotificationRead(id);
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const getIcon = (type) => {
    switch (type) {
      case 'certificate': return <Award className="w-5 h-5 text-amber-500" />;
      case 'completion': return <CheckCircle2 className="w-5 h-5 text-emerald-500" />;
      case 'progress': return <Sparkles className="w-5 h-5 text-brand-600" />;
      case 'welcome': return <Sparkles className="w-5 h-5 text-purple" />;
      default: return <Bell className="w-5 h-5 text-slate-500" />;
    }
  };

  return (
    <DashboardLayout 
      title="Notifications" 
      subtitle="Activity updates, course completion alerts, and certificates."
    >
      <div className="max-w-3xl space-y-4">
        {notifications.length === 0 ? (
          <EmptyState
            icon={Bell}
            title="No notifications"
            description="You are all caught up! Milestone updates and course progress notifications will appear here."
          />
        ) : (
          <div className="space-y-3">
            {notifications.map((notif) => (
              <div
                key={notif.id}
                onClick={() => handleMarkRead(notif.id)}
                className={`p-4 rounded-2xl border transition flex items-start gap-4 cursor-pointer ${
                  notif.read
                    ? 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 opacity-80'
                    : 'bg-brand-50/40 dark:bg-slate-800/80 border-brand-200 dark:border-slate-700 shadow-sm'
                }`}
              >
                <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center flex-shrink-0">
                  {getIcon(notif.type)}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                      {notif.title}
                    </h4>
                    <span className="text-[10px] text-slate-400">
                      {notif.createdAt ? new Date(notif.createdAt).toLocaleDateString() : 'Recent'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {notif.message}
                  </p>
                </div>

                {!notif.read && (
                  <span className="w-2.5 h-2.5 rounded-full bg-brand-600 flex-shrink-0 mt-1" />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};
