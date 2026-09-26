import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BookOpen, 
  Bookmark, 
  Award, 
  CheckSquare, 
  FileText, 
  Layers, 
  Wrench, 
  Settings, 
  User, 
  Bell, 
  LogOut, 
  Sparkles, 
  ShieldAlert, 
  Users, 
  BarChart3, 
  Menu, 
  X, 
  GraduationCap,
  Flame,
  FolderTree,
  CreditCard
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { Badge } from '../common/Badge';

export const DashboardLayout = ({ children, title = "Dashboard", subtitle = "" }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { userProfile, isPremium, isAdmin, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  // Navigation config based on role / membership
  const getNavSections = () => {
    if (isAdmin) {
      return [
        {
          title: "Platform Administration",
          items: [
            { label: "Admin Overview", path: "/admin", icon: LayoutDashboard },
            { label: "User Management", path: "/admin/users", icon: Users },
            { label: "Payment & Revenue", path: "/admin/payments", icon: CreditCard },
            { label: "Course Management", path: "/admin/courses", icon: BookOpen },
            { label: "App Management", path: "/admin/apps", icon: Layers },
            { label: "Tool Management", path: "/admin/tools", icon: Wrench },
            { label: "Content Management", path: "/admin/content", icon: FileText },
            { label: "Category Management", path: "/admin/categories", icon: FolderTree }
          ]
        },

        {
          title: "Student View Portals",
          items: [
            { label: "Free Member View", path: "/dashboard/free", icon: LayoutDashboard },
            { label: "Premium Member View", path: "/dashboard/premium", icon: Sparkles }
          ]
        },
        {
          title: "Account",
          items: [
            { label: "Admin Profile", path: "/profile", icon: User },
            { label: "Settings", path: "/settings", icon: Settings }
          ]
        }
      ];
    }

    if (isPremium) {
      return [
        {
          title: "Premium Learning",
          items: [
            { label: "Premium Dashboard", path: "/dashboard/premium", icon: LayoutDashboard },
            { label: "My Enrolled Courses", path: "/dashboard/my-courses", icon: BookOpen },
            { label: "Certificates", path: "/dashboard/certificates", icon: Award },
            { label: "Saved & Bookmarks", path: "/dashboard/saved", icon: Bookmark },
            { label: "Quiz & Test Results", path: "/dashboard/quiz-results", icon: CheckSquare }
          ]
        },
        {
          title: "Resources & Tools",
          items: [
            { label: "Premium & Free Courses", path: "/courses", icon: BookOpen },
            { label: "Learning Apps Hub", path: "/apps", icon: Layers },
            { label: "Interactive Tools & Studio", path: "/tools", icon: Wrench },
            { label: "Study Materials & Notes", path: "/content", icon: FileText }
          ]
        },
        {
          title: "Account & Preferences",
          items: [
            { label: "Student Profile", path: "/profile", icon: User },
            { label: "Notifications", path: "/notifications", icon: Bell },
            { label: "Settings", path: "/settings", icon: Settings }
          ]
        }
      ];
    }

    // Free Member
    return [
      {
        title: "Student Portal",
        items: [
          { label: "Dashboard", path: "/dashboard/free", icon: LayoutDashboard },
          { label: "My Courses", path: "/dashboard/my-courses", icon: BookOpen },
          { label: "Saved Courses", path: "/dashboard/saved", icon: Bookmark },
          { label: "Quiz Results", path: "/dashboard/quiz-results", icon: CheckSquare }
        ]
      },
      {
        title: "Free Resources",
        items: [
          { label: "Free Courses", path: "/courses", icon: BookOpen },
          { label: "Free Apps", path: "/apps", icon: Layers },
          { label: "Free Tools", path: "/tools", icon: Wrench },
          { label: "Educational Content", path: "/content", icon: FileText }
        ]
      },
      {
        title: "Account",
        items: [
          { label: "Profile", path: "/profile", icon: User },
          { label: "Notifications", path: "/notifications", icon: Bell },
          { label: "Settings", path: "/settings", icon: Settings }
        ]
      }
    ];
  };

  const navSections = getNavSections();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex transition-colors">
      
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex-shrink-0">
        
        {/* Sidebar Brand Header */}
        <div className="h-16 px-6 flex items-center justify-between border-b border-slate-200 dark:border-slate-800">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-brand-600 to-purple flex items-center justify-center text-white shadow-sm">
              <GraduationCap className="w-5 h-5" />
            </div>
            <span className="font-black text-lg tracking-tight text-slate-900 dark:text-white">
              D.TEN
            </span>
          </Link>
          {isAdmin ? (
            <Badge type="admin" size="xs">Admin</Badge>
          ) : isPremium ? (
            <Badge type="premium" size="xs">PRO</Badge>
          ) : (
            <Badge type="free" size="xs">Free</Badge>
          )}
        </div>

        {/* User Quick Info */}
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-purple text-white flex items-center justify-center font-bold text-sm shadow">
            {userProfile?.name?.charAt(0) || 'U'}
          </div>
          <div className="overflow-hidden">
            <p className="font-bold text-sm text-slate-900 dark:text-white truncate">
              {userProfile?.name || 'Ahmed Khan'}
            </p>
            <p className="text-xs text-slate-500 capitalize truncate">
              {isAdmin ? 'Super Admin' : isPremium ? 'Premium Member' : 'Free Member'}
            </p>
          </div>
        </div>

        {/* Navigation Sections */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
          {navSections.map((section, sIdx) => (
            <div key={sIdx}>
              <h5 className="px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                {section.title}
              </h5>
              <div className="space-y-1">
                {section.items.map((item, iIdx) => {
                  const Icon = item.icon;
                  const active = isActive(item.path);
                  return (
                    <Link
                      key={iIdx}
                      to={item.path}
                      className={`flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition ${
                        active
                          ? 'bg-brand-50 dark:bg-brand-950/50 text-brand-600 dark:text-brand-400 shadow-sm'
                          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      <Icon className={`w-4 h-4 ${active ? 'text-brand-600 dark:text-brand-400' : 'text-slate-400'}`} />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}

          {/* Upgrade prompt in sidebar for free members */}
          {!isPremium && !isAdmin && (
            <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-transparent border border-amber-500/20 text-center">
              <Sparkles className="w-6 h-6 text-amber-500 mx-auto mb-2" />
              <h6 className="font-bold text-xs text-slate-900 dark:text-white mb-1">Upgrade to Premium</h6>
              <p className="text-[11px] text-slate-500 mb-3">Unlock all pro courses, tools, and verified certificates.</p>
              <Link
                to="/pricing"
                className="inline-block w-full py-1.5 px-3 rounded-lg bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-sm transition"
              >
                Go Premium
              </Link>
            </div>
          )}
        </div>

        {/* Sidebar Footer */}
        <div className="p-3 border-t border-slate-200 dark:border-slate-800">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition text-left"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* Top Header */}
        <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 sm:px-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-lg font-bold text-slate-900 dark:text-white truncate">
                {title}
              </h1>
              {subtitle && (
                <p className="text-xs text-slate-500 dark:text-slate-400 hidden sm:block truncate">
                  {subtitle}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Quick public site return */}
            <Link
              to="/"
              className="text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-brand-600 px-2.5 py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition hidden sm:block"
            >
              Public Site ↗
            </Link>

            {/* Notifications quick button */}
            <Link
              to="/notifications"
              className="p-2 rounded-xl text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition relative"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-brand-600" />
            </Link>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              {theme === 'dark' ? <span className="text-xs">☀️</span> : <span className="text-xs">🌙</span>}
            </button>
          </div>
        </header>

        {/* Page Content Body */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>

      {/* Mobile Drawer Sidebar */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
          <div className="relative w-72 max-w-[80vw] bg-white dark:bg-slate-900 h-full flex flex-col border-r border-slate-200 dark:border-slate-800 shadow-2xl animate-in slide-in-from-left duration-200">
            <div className="h-16 px-4 flex items-center justify-between border-b border-slate-200 dark:border-slate-800">
              <span className="font-extrabold text-lg text-slate-900 dark:text-white">D.TEN Academy</span>
              <button onClick={() => setSidebarOpen(false)} className="p-1 rounded-lg text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-3 space-y-4">
              {navSections.map((section, sIdx) => (
                <div key={sIdx}>
                  <h5 className="px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                    {section.title}
                  </h5>
                  <div className="space-y-1">
                    {section.items.map((item, iIdx) => (
                      <Link
                        key={iIdx}
                        to={item.path}
                        onClick={() => setSidebarOpen(false)}
                        className={`flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold ${
                          isActive(item.path)
                            ? 'bg-brand-50 text-brand-600 dark:bg-brand-950/50 dark:text-brand-400'
                            : 'text-slate-600 dark:text-slate-400'
                        }`}
                      >
                        <item.icon className="w-4 h-4" />
                        <span>{item.label}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
