import React from 'react';

export const ProgressBar = ({ progress = 0, size = 'md', color = 'brand', showLabel = true, className = '' }) => {
  const clamped = Math.min(100, Math.max(0, Math.round(progress)));

  const heightClass = size === 'sm' ? 'h-1.5' : size === 'lg' ? 'h-3.5' : 'h-2.5';
  
  const colorMap = {
    brand: 'bg-brand-600',
    purple: 'bg-purple',
    emerald: 'bg-emerald-500',
    amber: 'bg-amber-500'
  };

  const bgBar = colorMap[color] || colorMap.brand;

  return (
    <div className={`w-full ${className}`}>
      {showLabel && (
        <div className="flex justify-between items-center text-xs font-medium text-slate-600 dark:text-slate-400 mb-1.5">
          <span>Progress</span>
          <span className="font-semibold text-slate-800 dark:text-slate-200">{clamped}%</span>
        </div>
      )}
      <div className={`w-full bg-slate-200 dark:bg-slate-700/60 rounded-full overflow-hidden ${heightClass}`}>
        <div
          className={`${bgBar} ${heightClass} rounded-full transition-all duration-500 ease-out`}
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
};
