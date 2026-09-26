import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, CheckCircle2, PlayCircle, Plus } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { getUserEnrollments } from '../../services/firebaseService';
import { ProgressBar } from '../../components/common/ProgressBar';
import { EmptyState } from '../../components/common/EmptyState';

export const MyCourses = () => {
  const { currentUser } = useAuth();
  const [enrollments, setEnrollments] = useState([]);
  const [filter, setFilter] = useState('all'); // all, active, completed
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      if (currentUser?.uid) {
        setLoading(true);
        const data = await getUserEnrollments(currentUser.uid);
        setEnrollments(data);
        setLoading(false);
      }
    };
    load();
  }, [currentUser]);

  const filtered = enrollments.filter(e => {
    if (filter === 'active') return !e.completed;
    if (filter === 'completed') return e.completed;
    return true;
  });

  return (
    <DashboardLayout 
      title="My Enrolled Courses" 
      subtitle="Track your curriculum progress and continue active modules."
    >
      <div className="space-y-6">
        
        {/* Filter bar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 bg-white dark:bg-slate-900 p-1 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-semibold">
            {['all', 'active', 'completed'].map(t => (
              <button
                key={t}
                onClick={() => setFilter(t)}
                className={`px-3 py-1.5 rounded-lg capitalize transition ${
                  filter === t
                    ? 'bg-brand-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                {t} ({
                  t === 'all' ? enrollments.length :
                  t === 'active' ? enrollments.filter(e => !e.completed).length :
                  enrollments.filter(e => e.completed).length
                })
              </button>
            ))}
          </div>

          <Link
            to="/courses"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold shadow-sm transition"
          >
            <Plus className="w-4 h-4" /> Browse Catalog
          </Link>
        </div>

        {/* List Grid */}
        {filtered.length === 0 ? (
          <EmptyState
            icon={BookOpen}
            title="No enrolled courses in this view"
            description="Explore our course catalog to find relevant curricula to start learning."
            actionLabel="Discover Courses"
            actionLink="/courses"
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filtered.map(enr => (
              <div 
                key={enr.id}
                className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                    <span className="font-semibold text-brand-600">{enr.completed ? '🎉 Completed' : 'In Progress'}</span>
                    <span>Enrolled: {enr.enrolledAt ? new Date(enr.enrolledAt).toLocaleDateString() : 'Active'}</span>
                  </div>

                  <h3 className="font-bold text-base text-slate-900 dark:text-white">
                    {enr.courseTitle}
                  </h3>

                  <div className="mt-4">
                    <ProgressBar progress={enr.progress} size="md" />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800">
                  <span className="text-xs text-slate-400">
                    {enr.completedLessons?.length || 0} of {enr.totalLessons} lessons finished
                  </span>
                  <Link
                    to={`/learn/${enr.courseId}`}
                    className="px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-sm transition flex items-center gap-1.5"
                  >
                    <PlayCircle className="w-4 h-4" />
                    <span>{enr.completed ? 'Review Material' : 'Continue Learning'}</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};
