import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Heart, Mail, ShieldCheck, Globe } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 mb-12">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <img 
                src="/logo.png" 
                alt="D.TEN Logo" 
                className="w-10 h-10 object-contain" 
              />
              <span className="font-extrabold text-2xl tracking-tight text-slate-900 dark:text-white">
                D.TEN <span className="text-brand-600 dark:text-brand-400">Academy</span>
              </span>
            </Link>

            <p className="text-slate-500 dark:text-slate-400 text-sm max-w-sm leading-relaxed">
              Empowering global learners through modern interactive LMS courses, practical calculators, gamified learning apps, and comprehensive study materials.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-semibold border border-emerald-500/20">
                <ShieldCheck className="w-3.5 h-3.5" /> Firebase Secured
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-500/10 text-brand-600 dark:text-brand-400 text-xs font-semibold border border-brand-500/20">
                Production Ready
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-900 dark:text-white mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/courses" className="text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition">
                  All Courses
                </Link>
              </li>
              <li>
                <Link to="/apps" className="text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition">
                  Learning Apps
                </Link>
              </li>
              <li>
                <Link to="/tools" className="text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition">
                  Educational Tools
                </Link>
              </li>
              <li>
                <Link to="/content" className="text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition">
                  Study Guides & Notes
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition">
                  Membership Plans
                </Link>
              </li>
            </ul>
          </div>

          {/* Access Portals */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-900 dark:text-white mb-4">
              Portals
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/dashboard/free" className="text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition">
                  Free Member Dashboard
                </Link>
              </li>
              <li>
                <Link to="/dashboard/premium" className="text-slate-600 dark:text-slate-400 hover:text-amber-500 transition">
                  Premium Dashboard
                </Link>
              </li>
              <li>
                <Link to="/admin" className="text-slate-600 dark:text-slate-400 hover:text-purple transition">
                  Admin Control Panel
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition">
                  Sign In
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition">
                  Create Account
                </Link>
              </li>
            </ul>
          </div>

          {/* Institutional / Contact */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-900 dark:text-white mb-4">
              Company
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/about" className="text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition">
                  About D.TEN
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition">
                  Contact & Support
                </Link>
              </li>
              <li>
                <a href="#privacy" className="text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#terms" className="text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <div>
            © {new Date().getFullYear()} D.TEN Academy Inc. All rights reserved.
          </div>
          <div className="flex items-center gap-1">
            <span>Designed & Built with modern web standards</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
