import React, { useState } from 'react';
import { Plus, Trash2, GraduationCap } from 'lucide-react';

const GRADE_POINTS = {
  'A+': 4.0,
  'A': 4.0,
  'A-': 3.7,
  'B+': 3.3,
  'B': 3.0,
  'B-': 2.7,
  'C+': 2.3,
  'C': 2.0,
  'C-': 1.7,
  'D+': 1.3,
  'D': 1.0,
  'F': 0.0
};

export const GpaCalculator = () => {
  const [courses, setCourses] = useState([
    { id: 1, name: 'English Composition', credits: 3, grade: 'A' },
    { id: 2, name: 'Calculus I', credits: 4, grade: 'B+' },
    { id: 3, name: 'Computer Science Basics', credits: 3, grade: 'A' },
    { id: 4, name: 'General Physics', credits: 4, grade: 'A-' }
  ]);

  const addCourse = () => {
    setCourses([
      ...courses,
      { id: Date.now(), name: `Course ${courses.length + 1}`, credits: 3, grade: 'A' }
    ]);
  };

  const removeCourse = (id) => {
    if (courses.length > 1) {
      setCourses(courses.filter(c => c.id !== id));
    }
  };

  const updateCourse = (id, field, value) => {
    setCourses(courses.map(c => c.id === id ? { ...c, [field]: value } : c));
  };

  const totalCredits = courses.reduce((acc, c) => acc + (Number(c.credits) || 0), 0);
  const totalPoints = courses.reduce((acc, c) => {
    const cred = Number(c.credits) || 0;
    const pts = GRADE_POINTS[c.grade] || 0;
    return acc + (cred * pts);
  }, 0);

  const gpa = totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : '0.00';

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white text-lg">College GPA Calculator</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Standard 4.0 credit-weighted GPA scale</p>
          </div>
        </div>

        <div className="text-right">
          <div className="text-3xl font-black text-emerald-600 dark:text-emerald-400">{gpa}</div>
          <div className="text-xs font-semibold text-slate-500">{totalCredits} Total Credits</div>
        </div>
      </div>

      <div className="space-y-3 mb-4">
        {courses.map((course) => (
          <div key={course.id} className="flex items-center gap-2 sm:gap-3 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
            <input
              type="text"
              value={course.name}
              onChange={(e) => updateCourse(course.id, 'name', e.target.value)}
              placeholder="Course Title"
              className="flex-1 px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm font-medium"
            />
            <div className="flex items-center gap-1 w-24">
              <input
                type="number"
                min="1"
                max="6"
                value={course.credits}
                onChange={(e) => updateCourse(course.id, 'credits', e.target.value)}
                className="w-full px-2 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm font-semibold text-center"
              />
              <span className="text-xs text-slate-400">cr</span>
            </div>
            <select
              value={course.grade}
              onChange={(e) => updateCourse(course.id, 'grade', e.target.value)}
              className="w-24 px-2 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm font-semibold"
            >
              {Object.keys(GRADE_POINTS).map(g => (
                <option key={g} value={g}>{g} ({GRADE_POINTS[g].toFixed(1)})</option>
              ))}
            </select>
            <button
              onClick={() => removeCourse(course.id)}
              className="p-1.5 text-slate-400 hover:text-rose-500 rounded-lg transition"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      <button
        onClick={addCourse}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold text-xs transition"
      >
        <Plus className="w-4 h-4" /> Add Course
      </button>
    </div>
  );
};
