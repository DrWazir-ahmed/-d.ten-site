import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  BookOpen, 
  Award, 
  Flame, 
  TrendingUp, 
  Wrench, 
  Layers, 
  FileText, 
  Download, 
  CheckCircle2, 
  PlayCircle,
  Bookmark,
  Bell,
  CheckSquare
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { ProgressBar } from '../../components/common/ProgressBar';
import { Badge } from '../../components/common/Badge';
import { 
  getUserEnrollments, 
  getCourses, 
  getUserCertificates, 
  getTools, 
  getContent, 
  getUserBookmarks 
} from '../../services/firebaseService';

export const PremiumDashboard = () => {
  const { userProfile, currentUser } = useAuth();
  const [enrollments, setEnrollments] = useState([]);
  const [premiumCourses, setPremiumCourses] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [premiumTools, setPremiumTools] = useState([]);
  const [premiumContent, setPremiumContent] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      if (!currentUser?.uid) return;
      setLoading(true);

      const [enrs, allCourses, certs, tools, cnt, bms] = await Promise.all([
        getUserEnrollments(currentUser.uid),
        getCourses(),
        getUserCertificates(currentUser.uid),
        getTools(),
        getContent(),
        getUserBookmarks(currentUser.uid)
      ]);

      setEnrollments(enrs);
      setPremiumCourses(allCourses.filter(c => c.membership === 'premium').slice(0, 3));
      setCertificates(certs);
      setPremiumTools(tools.filter(t => t.membership === 'premium'));
      setPremiumContent(cnt.filter(c => c.membership === 'premium'));
      setBookmarks(bms);
      setLoading(false);
    };

    load();
  }, [currentUser]);

  const userName = userProfile?.name || 'Elena';
  const learningStreakDays = 14; // Premium streak tracker
  const totalHoursStudied = 42;

  return (
    <DashboardLayout 
      title={`Premium Learning Hub • Welcome, ${userName}!`} 
      subtitle="Exclusive member access to advanced AI modules, verified certifications & priority analytics."
    >
      <div className="space-y-8">
        
        {/* Top Status Bar with prominent Premium Badge & Streak */}
        <div className="p-6 rounded-3xl bg-gradient-to-r from-amber-500/15 via-purple/10 to-brand-500/10 border border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-500 flex items-center justify-center font-bold">
              <Sparkles className="w-6 h-6 fill-amber-500" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-lg text-slate-900 dark:text-white">Active Premium Membership</span>
                <Badge type="premium" size="xs">PRO</Badge>
              </div>
              <p className="text-xs text-slate-500">Unrestricted access to all pro courses, tools, and printable credentials.</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-4 py-2 rounded-xl bg-white dark:bg-slate-900 border border-amber-500/30 flex items-center gap-2 text-xs font-bold text-slate-800 dark:text-slate-200">
              <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
              <span>{learningStreakDays} Day Streak 🔥</span>
            </div>
          </div>
        </div>

        {/* Learning Statistics Section */}
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-3">
            Learning Statistics & Analytics
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm text-center">
              <div className="text-3xl font-black text-brand-600 dark:text-brand-400">{enrollments.length}</div>
              <div className="text-xs text-slate-500 mt-1 font-medium">Courses Enrolled</div>
            </div>
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm text-center">
              <div className="text-3xl font-black text-emerald-600 dark:text-emerald-400">{certificates.length}</div>
              <div className="text-xs text-slate-500 mt-1 font-medium">Certificates Earned</div>
            </div>
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm text-center">
              <div className="text-3xl font-black text-purple">{totalHoursStudied}h</div>
              <div className="text-xs text-slate-500 mt-1 font-medium">Hours Studied</div>
            </div>
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm text-center">
              <div className="text-3xl font-black text-amber-500">96%</div>
              <div className="text-xs text-slate-500 mt-1 font-medium">Avg Assessment Score</div>
            </div>
          </div>
        </div>

        {/* Continue Learning Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <PlayCircle className="w-5 h-5 text-brand-600" /> Continue Learning
            </h3>
            <Link to="/dashboard/my-courses" className="text-xs font-bold text-brand-600 dark:text-brand-400 hover:underline">
              All Courses ({enrollments.length})
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
                    <span className="font-semibold text-brand-600 dark:text-brand-400">Current Pacing</span>
                    <span className="font-bold text-slate-700 dark:text-slate-300">{enr.progress}% Completed</span>
                  </div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white line-clamp-1">
                    {enr.courseTitle}
                  </h4>
                  <div className="mt-3">
                    <ProgressBar progress={enr.progress} size="sm" showLabel={false} color="amber" />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-[11px] text-slate-400">
                    {enr.completedLessons?.length || 0} / {enr.totalLessons} Lessons
                  </span>
                  <Link
                    to={`/learn/${enr.courseId}`}
                    className="px-4 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs transition shadow-sm"
                  >
                    Resume Module →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Premium Resources & Pro Tools Studio */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Pro Tools */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-amber-500/30 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 fill-amber-500 text-amber-500" /> Premium AI Tools & Studio
              </h4>
              <Badge type="premium" size="xs">Exclusive</Badge>
            </div>
            <div className="space-y-2.5">
              {premiumTools.map((t) => (
                <Link
                  key={t.id}
                  to="/tools"
                  className="p-3.5 rounded-2xl bg-amber-500/5 hover:bg-amber-500/10 border border-amber-500/20 transition flex items-center justify-between text-xs"
                >
                  <div>
                    <span className="font-bold text-slate-800 dark:text-slate-200">{t.name}</span>
                    <span className="text-[11px] text-slate-500 block">{t.description}</span>
                  </div>
                  <span className="text-amber-600 dark:text-amber-400 font-bold ml-2">Open Tool →</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Premium Content & Downloadable Materials */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <FileText className="w-4 h-4 text-brand-600" /> Downloadable Pro Guides & Notes
              </h4>
              <Link to="/content" className="text-xs font-semibold text-brand-600 hover:underline">
                View All
              </Link>
            </div>
            <div className="space-y-2.5">
              {premiumContent.map((c) => (
                <div
                  key={c.id}
                  className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs"
                >
                  <div className="pr-2">
                    <span className="font-bold text-slate-800 dark:text-slate-200 line-clamp-1">{c.title}</span>
                    <span className="text-[11px] text-slate-500 block">{c.contentType} • {c.category}</span>
                  </div>
                  <button
                    onClick={() => window.print()}
                    className="p-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:text-brand-600 transition flex items-center gap-1 text-[11px] font-semibold"
                  >
                    <Download className="w-3.5 h-3.5" /> PDF
                  </button>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Your Verified Certificates Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-500" /> Your Verified Certificates ({certificates.length})
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {certificates.map((cert) => (
              <div 
                key={cert.id}
                className="p-6 rounded-3xl bg-gradient-to-br from-amber-50 via-white to-amber-50/50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-850 border border-amber-400/40 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-[11px] text-amber-600 font-bold uppercase tracking-wider mb-2">
                    <span>Verified Credential</span>
                    <span>{cert.issuedDate}</span>
                  </div>
                  <h4 className="font-bold text-base text-slate-900 dark:text-white mb-1">
                    {cert.courseTitle}
                  </h4>
                  <p className="text-xs text-slate-500">Student: {cert.studentName}</p>
                  <p className="text-[11px] text-slate-400 mt-2 font-mono">ID: {cert.certificateNumber}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-amber-200 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-xs font-semibold text-emerald-600">{cert.grade}</span>
                  <button
                    onClick={() => window.print()}
                    className="px-3.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs flex items-center gap-1 shadow-sm transition"
                  >
                    <Download className="w-3.5 h-3.5" /> Print / Save PDF
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recommended Pro Courses */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple" /> Recommended for You
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {premiumCourses.map((c) => (
              <div key={c.id} className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
                <div>
                  <Badge type="premium" size="xs" />
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white mt-2 mb-1">{c.title}</h4>
                  <p className="text-xs text-slate-500 line-clamp-2">{c.description}</p>
                </div>
                <Link
                  to={`/courses/${c.id}`}
                  className="mt-4 w-full py-2 rounded-xl bg-purple hover:bg-purple/90 text-white font-bold text-xs text-center transition"
                >
                  Start Course →
                </Link>
              </div>
            ))}
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
};
