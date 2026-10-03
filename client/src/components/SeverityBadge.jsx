import React from 'react';
import { ShieldCheck, AlertCircle, AlertTriangle, Flame } from 'lucide-react';

export const SeverityBadge = ({ severity = 'Moderate', status = 'Diseased', size = 'md' }) => {
  const sizeClasses = {
    sm: 'text-xs px-2.5 py-0.5 gap-1',
    md: 'text-xs md:text-sm px-3.5 py-1 gap-1.5',
    lg: 'text-sm md:text-base px-4 py-1.5 gap-2 font-semibold',
  };

  if (status === 'Healthy' || severity === 'Low' && status !== 'Diseased') {
    return (
      <span className={`inline-flex items-center rounded-full font-medium bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 ${sizeClasses[size]}`}>
        <ShieldCheck className={size === 'lg' ? 'w-5 h-5 text-emerald-400' : 'w-4 h-4 text-emerald-400'} />
        {status === 'Healthy' ? 'Healthy Crop' : 'Low Severity'}
      </span>
    );
  }

  if (severity === 'Moderate') {
    return (
      <span className={`inline-flex items-center rounded-full font-medium bg-amber-500/15 text-amber-300 border border-amber-500/30 ${sizeClasses[size]}`}>
        <AlertCircle className={size === 'lg' ? 'w-5 h-5 text-amber-400' : 'w-4 h-4 text-amber-400'} />
        Moderate Severity
      </span>
    );
  }

  if (severity === 'High') {
    return (
      <span className={`inline-flex items-center rounded-full font-medium bg-rose-500/15 text-rose-300 border border-rose-500/30 ${sizeClasses[size]}`}>
        <AlertTriangle className={size === 'lg' ? 'w-5 h-5 text-rose-400' : 'w-4 h-4 text-rose-400'} />
        High Severity
      </span>
    );
  }

  // Critical
  return (
    <span className={`inline-flex items-center rounded-full font-medium bg-red-600/25 text-red-300 border border-red-500/50 animate-pulse ${sizeClasses[size]}`}>
      <Flame className={size === 'lg' ? 'w-5 h-5 text-red-400' : 'w-4 h-4 text-red-400'} />
      Critical Alert
    </span>
  );
};
