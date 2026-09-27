import React from 'react';
import { Sparkles, CheckCircle2, Shield, Lock } from 'lucide-react';

export const Badge = ({ type = 'free', children, size = 'sm', className = '' }) => {
  const sizeClasses = size === 'xs' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-xs font-semibold';

  if (type === 'premium') {
    return (
      <span className={`inline-flex items-center gap-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30 ${sizeClasses} ${className}`}>
        <Sparkles className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
        {children || 'Premium'}
      </span>
    );
  }

  if (type === 'free') {
    return (
      <span className={`inline-flex items-center gap-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 ${sizeClasses} ${className}`}>
        <CheckCircle2 className="w-3.5 h-3.5" />
        {children || 'Free'}
      </span>
    );
  }

  if (type === 'admin') {
    return (
      <span className={`inline-flex items-center gap-1 rounded-full bg-purple/10 text-purple border border-purple/30 ${sizeClasses} ${className}`}>
        <Shield className="w-3.5 h-3.5" />
        {children || 'Admin'}
      </span>
    );
  }

  if (type === 'creator' || type === 'course_creator') {
    return (
      <span className={`inline-flex items-center gap-1 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/30 ${sizeClasses} ${className}`}>
        <Sparkles className="w-3.5 h-3.5" />
        {children || 'Course Creator'}
      </span>
    );
  }

  if (type === 'pending' || type === 'pending_approval') {
    return (
      <span className={`inline-flex items-center gap-1 rounded-full bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/40 ${sizeClasses} ${className}`}>
        <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
        {children || 'Pending Approval'}
      </span>
    );
  }

  return (
    <span className={`inline-flex items-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 ${sizeClasses} ${className}`}>
      {children}
    </span>
  );
};
