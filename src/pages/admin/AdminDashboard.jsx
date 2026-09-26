import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  BookOpen,
  Layers,
  Wrench,
  FileText,
  CheckCircle2,
  Database,
  Sparkles,
  ShieldAlert,
  ArrowUpRight,
  FolderTree,
  CreditCard
} from 'lucide-react';

import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { getAllUsers, getCourses, getApps, getTools, getContent } from '../../services/firebaseService';
import { useAuth } from '../../context/AuthContext';


export const AdminDashboard = () => {
  const { userProfile, isSuperAdmin } = useAuth();
  const [users,   setUsers]   = useState([]);
  const [courses, setCourses] = useState([]);
  const [apps,    setApps]    = useState([]);
  const [tools,   setTools]   = useState([]);
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    const [u, c, a, t, cnt] = await Promise.all([
      getAllUsers(),
      getCourses(),
      getApps(),
      getTools(),
      getContent()
    ]);
    setUsers(u);
    setCourses(c);
    setApps(a);
    setTools(t);
    setContent(cnt);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  // Real stats from Firestore
  const totalUsers     = users.length;
  const freeMembers    = users.filter(u => u.membership === 'free').length;
  const premiumMembers = users.filter(u => u.membership === 'premium' || u.role === 'admin' || u.role === 'super_admin').length;
  const adminCount     = users.filter(u => u.role === 'admin' || u.role === 'super_admin').length;

  const freeCourses    = courses.filter(c => c.membership === 'free').length;
  const premiumCourses = courses.filter(c => c.membership === 'premium').length;

  return (
    <DashboardLayout 
      title="Platform Admin Control Center" 
      subtitle="Complete oversight of users, courses, educational apps, tools, and content catalog."
    >
      <div className="space-y-8">

        {/* Platform Status Banner */}
        <div className="p-6 rounded-3xl bg-slate-900 text-white border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 shadow-md">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-brand-500/20 text-brand-400 flex items-center justify-center">
              <Database className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base text-white">D.TEN Academy — Live Platform</h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400 uppercase">
                  Production
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Firebase Firestore backend active. All data is live and real-time.
              </p>
            </div>
          </div>
          <Link
            to="/admin/users"
            className="px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-md transition flex items-center gap-2 whitespace-nowrap"
          >
            <Users className="w-4 h-4" />
            Manage Users
          </Link>
        </div>

        {/* Primary Metric KPI Cards */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
            Platform Membership Overview
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
              <div>
                <div className="text-2xl font-black text-slate-900 dark:text-white">{totalUsers}</div>
                <div className="text-xs text-slate-500 font-medium">Total Registered Users</div>
              </div>
              <div className="w-12 h-12 rounded-xl bg-purple/10 text-purple flex items-center justify-center font-bold">
                <Users className="w-6 h-6" />
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
              <div>
                <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400">{freeMembers}</div>
                <div className="text-xs text-slate-500 font-medium">Free Member Tier</div>
              </div>
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
                <CheckCircle2 className="w-6 h-6" />
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
              <div>
                <div className="text-2xl font-black text-amber-500">{premiumMembers}</div>
                <div className="text-xs text-slate-500 font-medium">Premium Members</div>
              </div>
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center font-bold">
                <Sparkles className="w-6 h-6 fill-amber-500" />
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
              <div>
                <div className="text-2xl font-black text-brand-600 dark:text-brand-400">{adminCount}</div>
                <div className="text-xs text-slate-500 font-medium">Admin Accounts</div>
              </div>
              <div className="w-12 h-12 rounded-xl bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 flex items-center justify-center font-bold">
                <ShieldAlert className="w-6 h-6" />
              </div>
            </div>
          </div>
        </div>

        {/* Content & Catalog KPI Cards */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
            Curriculum & Resources Inventory
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <Link
              to="/admin/courses"
              className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-brand-500 transition group block"
            >
              <div className="flex items-center justify-between mb-2">
                <BookOpen className="w-5 h-5 text-brand-600" />
                <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-brand-600 transition" />
              </div>
              <div className="text-2xl font-black text-slate-900 dark:text-white">{courses.length}</div>
              <div className="text-xs text-slate-500 font-medium mt-1">
                Courses ({freeCourses} Free • {premiumCourses} Pro)
              </div>
            </Link>

            <Link
              to="/admin/apps"
              className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-purple transition group block"
            >
              <div className="flex items-center justify-between mb-2">
                <Layers className="w-5 h-5 text-purple" />
                <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-purple transition" />
              </div>
              <div className="text-2xl font-black text-slate-900 dark:text-white">{apps.length}</div>
              <div className="text-xs text-slate-500 font-medium mt-1">Learning Apps</div>
            </Link>

            <Link
              to="/admin/tools"
              className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-emerald-500 transition group block"
            >
              <div className="flex items-center justify-between mb-2">
                <Wrench className="w-5 h-5 text-emerald-600" />
                <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 transition" />
              </div>
              <div className="text-2xl font-black text-slate-900 dark:text-white">{tools.length}</div>
              <div className="text-xs text-slate-500 font-medium mt-1">Educational Tools</div>
            </Link>

            <Link
              to="/admin/content"
              className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-amber-500 transition group block"
            >
              <div className="flex items-center justify-between mb-2">
                <FileText className="w-5 h-5 text-amber-500" />
                <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-amber-500 transition" />
              </div>
              <div className="text-2xl font-black text-slate-900 dark:text-white">{content.length}</div>
              <div className="text-xs text-slate-500 font-medium mt-1">Articles & Guides</div>
            </Link>
          </div>
        </div>

        {/* Admin Quick Action Hub */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <h3 className="font-bold text-sm text-slate-900 dark:text-white mb-4">
            Management Consoles
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {[
              { label: "Users & Roles", path: "/admin/users", icon: Users },
              { label: "Payments & Revenue", path: "/admin/payments", icon: CreditCard },
              { label: "Courses & Curricula", path: "/admin/courses", icon: BookOpen },
              { label: "Learning Apps", path: "/admin/apps", icon: Layers },
              { label: "Educational Tools", path: "/admin/tools", icon: Wrench },
              { label: "Content Library", path: "/admin/content", icon: FileText },
              { label: "Categories", path: "/admin/categories", icon: FolderTree }
            ].map((action, i) => {

              const Icon = action.icon;
              return (
                <Link
                  key={i}
                  to={action.path}
                  className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 hover:bg-brand-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 text-center transition flex flex-col items-center justify-center gap-2 group"
                >
                  <Icon className="w-5 h-5 text-slate-600 dark:text-slate-400 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition" />
                  <span className="font-bold text-xs text-slate-800 dark:text-slate-200">
                    {action.label}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Recent Registrations Table */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">
              Recent User Registrations & Accounts
            </h3>
            <Link to="/admin/users" className="text-xs font-bold text-brand-600 hover:underline">
              View All Users →
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-400 text-xs uppercase tracking-wider font-bold">
                <tr>
                  <th className="py-3 px-5">User</th>
                  <th className="py-3 px-5">Email</th>
                  <th className="py-3 px-5 text-center">Membership</th>
                  <th className="py-3 px-5 text-center">Role</th>
                  <th className="py-3 px-5 text-center">Status</th>
                  <th className="py-3 px-5 text-right">Registered</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {users.slice(0, 5).map((u) => (
                  <tr key={u.uid} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                    <td className="py-3.5 px-5 font-bold text-slate-900 dark:text-white">
                      {u.name}
                    </td>
                    <td className="py-3.5 px-5 text-slate-500 font-mono text-xs">
                      {u.email}
                    </td>
                    <td className="py-3.5 px-5 text-center">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                        u.membership === 'premium' ? 'bg-amber-500/10 text-amber-600' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {u.membership}
                      </span>
                    </td>
                    <td className="py-3.5 px-5 text-center">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                        u.role === 'admin' ? 'bg-purple/10 text-purple' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="py-3.5 px-5 text-center">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        u.status === 'active' ? 'bg-emerald-500/10 text-emerald-600' : 'bg-rose-500/10 text-rose-600'
                      }`}>
                        {u.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-5 text-right text-xs text-slate-400">
                      {u.createdAt ? new Date(u.createdAt).toLocaleDateString() : 'Active'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
};
