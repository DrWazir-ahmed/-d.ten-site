import React, { useState } from 'react';
import { Calculator, RotateCcw } from 'lucide-react';

export const PercentageCalculator = () => {
  // Mode 1: What is X% of Y?
  const [p1, setP1] = useState(15);
  const [val1, setVal1] = useState(250);

  // Mode 2: X is what % of Y?
  const [x2, setX2] = useState(45);
  const [y2, setY2] = useState(180);

  // Mode 3: Percentage Increase / Decrease from X to Y
  const [fromVal, setFromVal] = useState(100);
  const [toVal, setToVal] = useState(135);

  const res1 = ((Number(p1) || 0) / 100) * (Number(val1) || 0);
  const res2 = y2 > 0 ? ((Number(x2) || 0) / (Number(y2) || 1)) * 100 : 0;
  const diff = (Number(toVal) || 0) - (Number(fromVal) || 0);
  const res3 = fromVal > 0 ? (diff / (Number(fromVal) || 1)) * 100 : 0;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-brand-50 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400 flex items-center justify-center font-bold">
          %
        </div>
        <div>
          <h3 className="font-bold text-slate-900 dark:text-white text-lg">Percentage Calculator</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">Quick calculations for proportions, discounts, and changes</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Calculation 1 */}
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2 block">
            What is <span className="text-brand-600 font-bold">{p1}%</span> of {val1}?
          </label>
          <div className="flex flex-wrap items-center gap-2">
            <span>What is</span>
            <input
              type="number"
              value={p1}
              onChange={(e) => setP1(e.target.value)}
              className="w-20 px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm font-semibold text-center"
            />
            <span>% of</span>
            <input
              type="number"
              value={val1}
              onChange={(e) => setVal1(e.target.value)}
              className="w-28 px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm font-semibold text-center"
            />
            <span className="font-bold">=</span>
            <div className="px-4 py-1.5 rounded-lg bg-brand-600 text-white font-bold text-base shadow-sm">
              {res1.toLocaleString(undefined, { maximumFractionDigits: 2 })}
            </div>
          </div>
        </div>

        {/* Calculation 2 */}
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2 block">
            {x2} is what percentage of {y2}?
          </label>
          <div className="flex flex-wrap items-center gap-2">
            <input
              type="number"
              value={x2}
              onChange={(e) => setX2(e.target.value)}
              className="w-24 px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm font-semibold text-center"
            />
            <span>is what % of</span>
            <input
              type="number"
              value={y2}
              onChange={(e) => setY2(e.target.value)}
              className="w-28 px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm font-semibold text-center"
            />
            <span className="font-bold">=</span>
            <div className="px-4 py-1.5 rounded-lg bg-purple text-white font-bold text-base shadow-sm">
              {res2.toFixed(2)}%
            </div>
          </div>
        </div>

        {/* Calculation 3 */}
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2 block">
            Percentage Increase / Decrease
          </label>
          <div className="flex flex-wrap items-center gap-2">
            <span>From</span>
            <input
              type="number"
              value={fromVal}
              onChange={(e) => setFromVal(e.target.value)}
              className="w-24 px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm font-semibold text-center"
            />
            <span>to</span>
            <input
              type="number"
              value={toVal}
              onChange={(e) => setToVal(e.target.value)}
              className="w-24 px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm font-semibold text-center"
            />
            <span className="font-bold">=</span>
            <div className={`px-4 py-1.5 rounded-lg font-bold text-base text-white shadow-sm ${res3 >= 0 ? 'bg-emerald-600' : 'bg-rose-600'}`}>
              {res3 >= 0 ? `+${res3.toFixed(2)}%` : `${res3.toFixed(2)}%`}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
