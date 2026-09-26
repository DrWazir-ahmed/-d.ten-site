import React, { useState } from 'react';
import { Plus, Trash2, Award } from 'lucide-react';

export const GradeCalculator = () => {
  const [items, setItems] = useState([
    { id: 1, name: 'Midterm Exam', weight: 30, score: 85 },
    { id: 2, name: 'Assignments & Homework', weight: 25, score: 92 },
    { id: 3, name: 'Quizzes', weight: 15, score: 88 },
    { id: 4, name: 'Final Project', weight: 30, score: 90 }
  ]);

  const addItem = () => {
    setItems([
      ...items,
      { id: Date.now(), name: `Assessment ${items.length + 1}`, weight: 10, score: 85 }
    ]);
  };

  const removeItem = (id) => {
    if (items.length > 1) {
      setItems(items.filter(item => item.id !== id));
    }
  };

  const updateItem = (id, field, value) => {
    setItems(items.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  const totalWeight = items.reduce((acc, item) => acc + (Number(item.weight) || 0), 0);
  const weightedSum = items.reduce((acc, item) => {
    const w = Number(item.weight) || 0;
    const s = Number(item.score) || 0;
    return acc + (w * s);
  }, 0);

  const currentGrade = totalWeight > 0 ? (weightedSum / totalWeight).toFixed(1) : 0;

  const getLetterGrade = (score) => {
    if (score >= 90) return { letter: 'A', desc: 'Excellent' };
    if (score >= 80) return { letter: 'B', desc: 'Good' };
    if (score >= 70) return { letter: 'C', desc: 'Average' };
    if (score >= 60) return { letter: 'D', desc: 'Below Average' };
    return { letter: 'F', desc: 'Failing' };
  };

  const letterInfo = getLetterGrade(Number(currentGrade));

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple/10 text-purple flex items-center justify-center font-bold">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white text-lg">Weighted Grade Calculator</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Calculate cumulative weighted class grades & projections</p>
          </div>
        </div>

        {/* Grade badge */}
        <div className="text-right">
          <div className="text-2xl font-black text-brand-600 dark:text-brand-400">{currentGrade}%</div>
          <div className="text-xs font-semibold text-slate-500">Grade: {letterInfo.letter} ({letterInfo.desc})</div>
        </div>
      </div>

      {totalWeight !== 100 && (
        <div className="mb-4 text-xs font-medium text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 p-2.5 rounded-lg border border-amber-200 dark:border-amber-900/50">
          Note: Total weights currently sum to {totalWeight}% (Standard scale is 100%).
        </div>
      )}

      <div className="space-y-3 mb-4">
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-2 sm:gap-3 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
            <input
              type="text"
              value={item.name}
              onChange={(e) => updateItem(item.id, 'name', e.target.value)}
              placeholder="Assignment Name"
              className="flex-1 px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm font-medium"
            />
            <div className="flex items-center gap-1 w-24">
              <input
                type="number"
                value={item.weight}
                onChange={(e) => updateItem(item.id, 'weight', e.target.value)}
                placeholder="Weight"
                className="w-full px-2 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm font-semibold text-center"
              />
              <span className="text-xs text-slate-400">%</span>
            </div>
            <div className="flex items-center gap-1 w-28">
              <input
                type="number"
                value={item.score}
                onChange={(e) => updateItem(item.id, 'score', e.target.value)}
                placeholder="Score"
                className="w-full px-2 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm font-semibold text-center"
              />
              <span className="text-xs text-slate-400">pts</span>
            </div>
            <button
              onClick={() => removeItem(item.id)}
              className="p-1.5 text-slate-400 hover:text-rose-500 rounded-lg transition"
              title="Delete row"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      <button
        onClick={addItem}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold text-xs transition"
      >
        <Plus className="w-4 h-4" /> Add Assessment
      </button>
    </div>
  );
};
