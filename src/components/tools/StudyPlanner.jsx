import React, { useState } from 'react';
import { Calendar, Clock, BookOpen, CheckCircle } from 'lucide-react';

export const StudyPlanner = () => {
  const [examDate, setExamDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 21);
    return d.toISOString().split('T')[0];
  });
  const [dailyHours, setDailyHours] = useState(3);
  const [subjects, setSubjects] = useState('English Grammar, Linear Algebra, Computer Architecture, Safety Protocols');

  const subjectList = subjects.split(',').map(s => s.trim()).filter(Boolean);
  
  const today = new Date();
  const target = new Date(examDate);
  const diffDays = Math.max(1, Math.ceil((target - today) / (1000 * 60 * 60 * 24)));
  const totalStudyHoursAvailable = diffDays * dailyHours;
  const hoursPerSubject = subjectList.length > 0 ? (totalStudyHoursAvailable / subjectList.length).toFixed(1) : 0;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
          <Calendar className="w-5 h-5" />
        </div>
        <div>
          <h3 className="font-bold text-slate-900 dark:text-white text-lg">Intelligent Study Planner</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">Generate realistic study timetables before target deadlines</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
          <label className="text-xs font-semibold text-slate-500 mb-1.5 block">Target Exam / Deadline Date</label>
          <input
            type="date"
            value={examDate}
            onChange={(e) => setExamDate(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm font-semibold"
          />
        </div>

        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
          <label className="text-xs font-semibold text-slate-500 mb-1.5 block">Daily Study Allocation (Hours)</label>
          <div className="flex items-center gap-2">
            <input
              type="range"
              min="1"
              max="10"
              value={dailyHours}
              onChange={(e) => setDailyHours(Number(e.target.value))}
              className="flex-1 accent-brand-600"
            />
            <span className="w-12 text-center font-black text-brand-600 dark:text-brand-400">{dailyHours} hrs</span>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <label className="text-xs font-semibold text-slate-500 mb-1.5 block">
          Subjects or Modules to Cover (comma separated)
        </label>
        <textarea
          rows={2}
          value={subjects}
          onChange={(e) => setSubjects(e.target.value)}
          className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm font-medium"
        />
      </div>

      {/* Summary Plan Output */}
      <div className="p-4 rounded-xl bg-brand-50/60 dark:bg-slate-800/80 border border-brand-200 dark:border-slate-700">
        <div className="grid grid-cols-3 gap-2 text-center mb-4 pb-4 border-b border-brand-200/60 dark:border-slate-700">
          <div>
            <div className="text-xl font-black text-slate-900 dark:text-white">{diffDays}</div>
            <div className="text-xs text-slate-500">Days Remaining</div>
          </div>
          <div>
            <div className="text-xl font-black text-brand-600 dark:text-brand-400">{totalStudyHoursAvailable}h</div>
            <div className="text-xs text-slate-500">Total Hours</div>
          </div>
          <div>
            <div className="text-xl font-black text-emerald-600 dark:text-emerald-400">{hoursPerSubject}h</div>
            <div className="text-xs text-slate-500">Per Subject</div>
          </div>
        </div>

        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Recommended Study Pacing</h4>
        <div className="space-y-2">
          {subjectList.map((subj, idx) => (
            <div key={idx} className="flex items-center justify-between text-xs bg-white dark:bg-slate-900 px-3 py-2 rounded-lg border border-slate-200/80 dark:border-slate-800">
              <span className="font-semibold text-slate-800 dark:text-slate-200">{subj}</span>
              <span className="text-slate-500">
                {hoursPerSubject} hours total (~{(hoursPerSubject / (diffDays / 7 || 1)).toFixed(1)} hrs/week)
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
