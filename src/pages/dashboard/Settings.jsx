import React, { useState } from 'react';
import { Settings as SettingsIcon, Bell, Moon, Sun, Shield, Check } from 'lucide-react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { useTheme } from '../../context/ThemeContext';

export const Settings = () => {
  const { theme, toggleTheme } = useTheme();
  const [courseUpdates, setCourseUpdates] = useState(true);
  const [quizReminders, setQuizReminders] = useState(true);
  const [marketingEmails, setMarketingEmails] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <DashboardLayout 
      title="Platform Settings" 
      subtitle="Configure notifications, appearance, and learning preferences."
    >
      <div className="max-w-3xl space-y-6">
        
        {saved && (
          <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-500/30 text-emerald-800 dark:text-emerald-200 text-xs font-bold flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-500" />
            <span>Preferences updated successfully!</span>
          </div>
        )}

        {/* Appearance Section */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
            <SettingsIcon className="w-4 h-4 text-brand-600" /> Interface Appearance
          </h3>
          <div className="flex items-center justify-between pt-2">
            <div>
              <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">Dark / Light Mode</p>
              <p className="text-[11px] text-slate-400">Toggle high-contrast dark theme for night study sessions</p>
            </div>
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 flex items-center gap-2 text-xs font-semibold"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
              <span className="capitalize">{theme} Theme</span>
            </button>
          </div>
        </div>

        {/* Notifications Section */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
            <Bell className="w-4 h-4 text-purple" /> Notification Preferences
          </h3>
          
          <div className="space-y-3 pt-2 divide-y divide-slate-100 dark:divide-slate-800 text-xs">
            <div className="flex items-center justify-between pt-3">
              <div>
                <span className="font-semibold text-slate-800 dark:text-slate-200 block">Course Progress & Milestone Alerts</span>
                <span className="text-slate-400 text-[11px]">Receive updates when completing 80% and 100% of a course</span>
              </div>
              <input
                type="checkbox"
                checked={courseUpdates}
                onChange={(e) => setCourseUpdates(e.target.checked)}
                className="w-4 h-4 rounded text-brand-600 focus:ring-brand-500"
              />
            </div>

            <div className="flex items-center justify-between pt-3">
              <div>
                <span className="font-semibold text-slate-800 dark:text-slate-200 block">Quiz Assessment Summaries</span>
                <span className="text-slate-400 text-[11px]">Score notifications and review feedback</span>
              </div>
              <input
                type="checkbox"
                checked={quizReminders}
                onChange={(e) => setQuizReminders(e.target.checked)}
                className="w-4 h-4 rounded text-brand-600 focus:ring-brand-500"
              />
            </div>

            <div className="flex items-center justify-between pt-3">
              <div>
                <span className="font-semibold text-slate-800 dark:text-slate-200 block">New Course & Tool Announcements</span>
                <span className="text-slate-400 text-[11px]">Weekly digests about newly published educational tools</span>
              </div>
              <input
                type="checkbox"
                checked={marketingEmails}
                onChange={(e) => setMarketingEmails(e.target.checked)}
                className="w-4 h-4 rounded text-brand-600 focus:ring-brand-500"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
            <button
              onClick={handleSave}
              className="px-5 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow transition"
            >
              Save Preferences
            </button>
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
};
