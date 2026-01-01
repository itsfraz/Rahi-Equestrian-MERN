/**
 * Skeleton Loader Components
 * Modern loading placeholders with shimmer animation
 */

import clsx from 'clsx';

// Base skeleton component
export const Skeleton = ({ className }) => (
  <div className={clsx('animate-shimmer bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 rounded-lg', className)} />
);

// Text skeleton
export const SkeletonText = ({ lines = 1, className }) => (
  <div className={clsx('space-y-3', className)}>
    {Array.from({ length: lines }).map((_, i) => (
      <div
        key={i}
        className={clsx(
          'skeleton-text animate-shimmer bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 rounded-lg h-4',
          i === lines - 1 && lines > 1 && 'w-4/5'
        )}
      />
    ))}
  </div>
);

// Avatar skeleton
export const SkeletonAvatar = ({ size = 'md', className }) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };

  return (
    <div className={clsx('skeleton-avatar rounded-full animate-shimmer bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200', sizeClasses[size], className)} />
  );
};

// Card skeleton
export const SkeletonCard = ({ className }) => (
  <div className={clsx('card p-6 space-y-4', className)}>
    <div className="flex items-center justify-between">
      <div className="w-14 h-14 rounded-xl animate-shimmer bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200" />
      <div className="w-20 h-8 rounded-lg animate-shimmer bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200" />
    </div>
    <div className="skeleton-text w-1/2 animate-shimmer bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200" />
    <div className="h-8 w-1/3 rounded-lg animate-shimmer bg-gradient-to-r from-slate-300 via-slate-200 to-slate-300" />
    <div className="skeleton-text w-2/3 animate-shimmer bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200" />
  </div>
);

// Stat card skeleton
export const SkeletonStatCard = () => (
  <div className="card p-6 space-y-4">
    <div className="flex items-center justify-between">
      <div className="w-14 h-14 rounded-2xl animate-shimmer bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200" />
      <div className="w-16 h-8 rounded-lg animate-shimmer bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200" />
    </div>
    <div className="h-4 w-24 rounded-lg animate-shimmer bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200" />
    <div className="h-10 w-20 rounded-lg animate-shimmer bg-gradient-to-r from-slate-300 via-slate-200 to-slate-300" />
    <div className="h-4 w-32 rounded-lg animate-shimmer bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200" />
  </div>
);

// Table row skeleton
export const SkeletonTableRow = ({ columns = 5 }) => (
  <tr className="table-row">
    {Array.from({ length: columns }).map((_, i) => (
      <td key={i} className="px-6 py-4">
        <div className={clsx(
          'rounded-lg animate-shimmer bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200',
          i === 0 ? 'w-10 h-10' : 'h-4 w-full'
        )} />
      </td>
    ))}
  </tr>
);

// Chart skeleton
export const SkeletonChart = ({ className }) => (
  <div className={clsx('card p-6', className)}>
    <div className="flex items-center justify-between mb-8">
      <div className="h-6 w-40 rounded-lg animate-shimmer bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200" />
      <div className="flex gap-4">
        <div className="h-6 w-24 rounded-lg animate-shimmer bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200" />
        <div className="h-6 w-24 rounded-lg animate-shimmer bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200" />
      </div>
    </div>
    <div className="space-y-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="flex items-end gap-2 h-8">
          <div className="w-8 h-3 rounded animate-shimmer bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200" />
          <div 
            className="flex-1 rounded animate-shimmer bg-gradient-to-r from-sky-200 via-sky-100 to-sky-200"
            style={{ height: `${Math.random() * 60 + 40}%` }}
          />
        </div>
      ))}
    </div>
  </div>
);

export default Skeleton;
