import React, { useState } from 'react';
import { Target, CheckCircle2 } from 'lucide-react';

export const LearningProgressCalculator = () => {
  const [totalItems, setTotalItems] = useState(48); // total lessons or pages
  const [completedItems, setCompletedItems] = useState(18);
  const [itemsPerDay, setItemsPerDay] = useState(3);

  const total = Number(totalItems) || 1;
  const done = Math.min(total, Number(completedItems) || 0);
  const daily = Math.max(1, Number(itemsPerDay) || 1);

  const remaining = Math.max(0, total - done);
  const percentage = Math.round((done / total) * 100);
  const daysNeeded = Math.ceil(remaining / daily);

  const completionDate = new Date();
  completionDate.setDate(completionDate.getDate() + daysNeeded);

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-purple/10 text-purple flex items-center justify-center font-bold">
          <Target className="w-5 h-5" />
        </div>
        <div>
          <h3 className="font-bold text-slate-900 dark:text-white text-lg">Learning Progress Calculator</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">Pace tracker & completion date forecaster</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
        <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
          <label className="text-xs text-slate-500 block mb-1">Total Lessons / Pages</label>
          <input
            type="number"
            value={totalItems}
            onChange={(e) => setTotalItems(e.target.value)}
            className="w-full px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm font-bold text-center"
          />
        </div>
        <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
          <label className="text-xs text-slate-500 block mb-1">Already Completed</label>
          <input
            type="number"
            value={completedItems}
            onChange={(e) => setCompletedItems(e.target.value)}
            className="w-full px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm font-bold text-center"
          />
        </div>
        <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
          <label className="text-xs text-slate-500 block mb-1">Pacing (Per Day)</label>
          <input
            type="number"
            value={itemsPerDay}
            onChange={(e) => setItemsPerDay(e.target.value)}
            className="w-full px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm font-bold text-center"
          />
        </div>
      </div>

      {/* Progress Bar & Forecast */}
      <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
        <div className="flex justify-between items-center text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
          <span>Overall Course Progress</span>
          <span className="text-brand-600 dark:text-brand-400 font-bold">{percentage}%</span>
        </div>
        <div className="w-full bg-slate-200 dark:bg-slate-700 h-3 rounded-full overflow-hidden mb-4">
          <div 
            className="bg-brand-600 h-full rounded-full transition-all duration-300"
            style={{ width: `${percentage}%` }}
          />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-center text-xs">
          <div className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800">
            <div className="font-black text-base text-slate-900 dark:text-white">{remaining}</div>
            <div className="text-slate-500">Items Left</div>
          </div>
          <div className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800">
            <div className="font-black text-base text-purple">{daysNeeded} Days</div>
            <div className="text-slate-500">Estimated Duration</div>
          </div>
          <div className="col-span-2 sm:col-span-1 p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800">
            <div className="font-black text-base text-emerald-600 dark:text-emerald-400">
              {completionDate.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
            </div>
            <div className="text-slate-500">Projected Finish</div>
          </div>
        </div>
      </div>
    </div>
  );
};
