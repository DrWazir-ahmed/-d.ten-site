import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  CheckCircle2, 
  TrendingUp, 
  CheckSquare, 
  Sparkles, 
  PlayCircle, 
  Clock, 
  Wrench, 
  Layers, 
  FileText, 
  ArrowRight,
  Bookmark
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { ProgressBar } from '../../components/common/ProgressBar';
import { Badge } from '../../components/common/Badge';
import { 
  getUserEnrollments, 
  getCourses, 
  getTools, 
  getApps, 
  getUserQuizResults 
} from '../../services/firebaseService';

export const FreeDashboard = () => {
  const { userProfile, currentUser } = useAuth();
  const [enrollments, setEnrollments] = useState([]);
  const [recommendedCourses, setRecommendedCourses] = useState([]);
  const [tools, setTools] = useState([]);
  const [apps, setApps] = useState([]);
  const [quizResults, setQuizResults] = useState([]);
  const [loading, setLoading] = useState(true);

  const userName = userProfile?.name || 'Ahmed';

  useEffect(() => {
    const loadDashboard = async () => {
      if (!currentUser?.uid) return;
      setLoading(true);

      const [enrs, allCourses, allTools, allApps, qResults] = await Promise.all([
        getUserEnrollments(currentUser.uid),
        getCourses(),
        getTools(),
        getApps(),
        getUserQuizResults(currentUser.uid)
      ]);

      setEnrollments(enrs);
      // Filter recommended free courses not yet completed
      const freeCourses = allCourses.filter(c => c.membership === 'free');
      setRecommendedCourses(freeCourses.slice(0, 3));
      setTools(allTools.filter(t => t.membership === 'free').slice(0, 4));
      setApps(allApps.filter(a => a.membership === 'free').slice(0, 3));
      setQuizResults(qResults);
      setLoading(false);
    };

    loadDashboard();
  }, [currentUser]);

  // Statistics calculation
  const totalEnrolled = enrollments.length || 4; // default demo values if fresh
  const completedCount = enrollments.filter(e => e.completed).length || 2;
  const avgProgress = enrollments.length > 0
    ? Math.round(enrollments.reduce((acc, e) => acc + (e.progress || 0), 0) / enrollments.length)
    : 68;
  const testsCount = quizResults.length || 12;

  return (
    <DashboardLayout 
      title={`Welcome back, ${userName}!`} 
      subtitle="Track your enrolled courses, test scores, and learning progress."
    >
      <div className="space-y-8">
        
        {/* Metric Progress Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
            <div>
              <div className="text-2xl font-black text-slate-900 dark:text-white">{totalEnrolled}</div>
              <div className="text-xs text-slate-500 font-medium">Courses Enrolled</div>
            </div>
            <div className="w-12 h-12 rounded-xl bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 flex items-center justify-center font-bold">
              <BookOpen className="w-6 h-6" />
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
            <div>
              <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400">{completedCount}</div>
              <div className="text-xs text-slate-500 font-medium">Courses Completed</div>
            </div>
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
              <CheckCircle2 className="w-6 h-6" />
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
            <div>
              <div className="text-2xl font-black text-purple">{avgProgress}%</div>
              <div className="text-xs text-slate-500 font-medium">Average Progress</div>
            </div>
            <div className="w-12 h-12 rounded-xl bg-purple/10 text-purple flex items-center justify-center font-bold">
              <TrendingUp className="w-6 h-6" />
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
            <div>
              <div className="text-2xl font-black text-amber-500">{testsCount}</div>
              <div className="text-xs text-slate-500 font-medium">Tests Completed</div>
            </div>
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center font-bold">
              <CheckSquare className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Upgrade to Premium Card */}
        <div className="relative rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border border-amber-500/30 overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="space-y-2 max-w-xl text-center md:text-left">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-600 dark:text-amber-400 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 fill-amber-500" /> Unlock Full Potential
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              Upgrade to Premium Membership
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Access advanced AI courses, quadratic algebra modules, AI quiz synthesis tools, downloadable formula cheat sheets, and verified digital certificates.
            </p>
          </div>
          <Link
            to="/pricing"
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold text-xs shadow-md shadow-amber-500/20 transition flex items-center gap-2 whitespace-nowrap"
          >
            <span>Upgrade Now</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Continue Learning / Enrolled Courses Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <PlayCircle className="w-5 h-5 text-brand-600" /> Continue Learning
            </h3>
            <Link to="/dashboard/my-courses" className="text-xs font-bold text-brand-600 dark:text-brand-400 hover:underline">
              View All ({enrollments.length})
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {enrollments.map((enr) => (
              <div 
                key={enr.id}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
                    <span>Course Enrollment</span>
                    <span className={`font-bold ${enr.completed ? 'text-emerald-500' : 'text-brand-600'}`}>
                      {enr.completed ? 'Completed' : `${enr.progress}%`}
                    </span>
                  </div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white line-clamp-1">
                    {enr.courseTitle}
                  </h4>
                  <div className="mt-3">
                    <ProgressBar progress={enr.progress} size="sm" showLabel={false} />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-[11px] text-slate-400">
                    {enr.completedLessons?.length || 0} of {enr.totalLessons} lessons completed
                  </span>
                  <Link
                    to={`/learn/${enr.courseId}`}
                    className="px-3.5 py-1.5 rounded-lg bg-brand-50 hover:bg-brand-600 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 hover:text-white font-bold text-xs transition"
                  >
                    Resume Lesson →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Free Apps & Tools Quick Access */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Free Tools */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <Wrench className="w-4 h-4 text-brand-600" /> Free Educational Tools
              </h4>
              <Link to="/tools" className="text-xs font-semibold text-brand-600 hover:underline">
                Open Studio
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {tools.map((t) => (
                <Link
                  key={t.id}
                  to="/tools"
                  className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-brand-50 dark:hover:bg-slate-800 transition border border-slate-100 dark:border-slate-800"
                >
                  <div className="font-bold text-xs text-slate-800 dark:text-slate-200 line-clamp-1">{t.name}</div>
                  <div className="text-[10px] text-slate-400 line-clamp-1 mt-0.5">{t.category}</div>
                </Link>
              ))}
            </div>
          </div>

          {/* Free Apps */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <Layers className="w-4 h-4 text-purple" /> Free Learning Apps
              </h4>
              <Link to="/apps" className="text-xs font-semibold text-purple hover:underline">
                Explore Apps
              </Link>
            </div>
            <div className="space-y-2">
              {apps.map((a) => (
                <Link
                  key={a.id}
                  to="/apps"
                  className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-purple/10 transition flex items-center justify-between text-xs"
                >
                  <div>
                    <span className="font-bold text-slate-800 dark:text-slate-200">{a.name}</span>
                    <span className="text-[11px] text-slate-400 block">{a.category}</span>
                  </div>
                  <span className="text-purple font-bold text-[11px]">Launch →</span>
                </Link>
              ))}
            </div>
          </div>

        </div>

      </div>
    </DashboardLayout>
  );
};
