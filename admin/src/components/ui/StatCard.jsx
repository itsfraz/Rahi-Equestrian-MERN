/**
 * Stat Card Component
 * Modern, animated statistics card with gradient effects
 */

import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDownRight, Zap } from 'lucide-react';
import clsx from 'clsx';

const StatCard = ({ 
  title, 
  value, 
  change, 
  changeText, 
  icon: Icon, 
  iconColor = 'sky',
  delay = 0,
  loading = false
}) => {
  const isPositive = change >= 0;
  
  // Color variants for the icon background - modern gradient colors
  const iconColors = {
    sky: 'bg-gradient-to-br from-sky-100 to-sky-50 text-sky-600',
    emerald: 'bg-gradient-to-br from-emerald-100 to-emerald-50 text-emerald-600',
    purple: 'bg-gradient-to-br from-purple-100 to-purple-50 text-purple-600',
    amber: 'bg-gradient-to-br from-amber-100 to-amber-50 text-amber-600',
    rose: 'bg-gradient-to-br from-rose-100 to-rose-50 text-rose-600',
    violet: 'bg-gradient-to-br from-violet-100 to-violet-50 text-violet-600',
    blue: 'bg-gradient-to-br from-blue-100 to-blue-50 text-blue-600',
    indigo: 'bg-gradient-to-br from-indigo-100 to-indigo-50 text-indigo-600',
  };

  if (loading) {
    return (
      <div className="card p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="w-14 h-14 rounded-2xl bg-slate-200 animate-shimmer" />
          <div className="w-16 h-8 rounded-full bg-slate-200 animate-shimmer" />
        </div>
        <div className="h-5 w-24 rounded-lg bg-slate-200 animate-shimmer" />
        <div className="h-10 w-20 rounded-lg bg-slate-300 animate-shimmer" />
        <div className="h-4 w-32 rounded-lg bg-slate-200 animate-shimmer" />
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.5, 
        delay: delay * 0.08, 
        ease: [0.23, 1, 0.320, 1] 
      }}
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
      className="stat-card group"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-sky-500/0 via-sky-500/0 to-purple-500/0 group-hover:from-sky-500/5 group-hover:to-purple-500/5 transition-all duration-500" />
      
      {/* Content */}
      <div className="relative z-10">
        {/* Header with Icon and Change Badge */}
        <div className="flex items-center justify-between mb-6">
          {/* Icon Container */}
          <motion.div 
            className={clsx(
              'w-14 h-14 rounded-2xl flex items-center justify-center',
              'transition-all duration-300 group-hover:scale-115 group-hover:shadow-lg',
              iconColors[iconColor]
            )}
            whileHover={{ rotate: [0, -8, 8, -4, 0], transition: { duration: 0.6 } }}
          >
            <Icon className="w-7 h-7" strokeWidth={1.5} />
          </motion.div>

          {/* Change Badge */}
          {change !== undefined && (
            <motion.div 
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ 
                delay: delay * 0.08 + 0.25, 
                type: 'spring',
                stiffness: 200,
                damping: 15
              }}
              className={clsx(
                'flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-all',
                isPositive 
                  ? 'bg-gradient-to-r from-emerald-100 to-teal-50 text-emerald-700 shadow-sm shadow-emerald-200/50' 
                  : 'bg-gradient-to-r from-rose-100 to-pink-50 text-rose-700 shadow-sm shadow-rose-200/50'
              )}
            >
              {isPositive ? (
                <ArrowUpRight className="w-4 h-4" />
              ) : (
                <ArrowDownRight className="w-4 h-4" />
              )}
              <span className="font-bold">{Math.abs(change)}%</span>
            </motion.div>
          )}
        </div>

        {/* Title */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: delay * 0.08 + 0.1 }}
          className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 group-hover:text-slate-600 transition-colors"
        >
          {title}
        </motion.p>

        {/* Main Value */}
        <motion.p 
          className="text-4xl font-black text-slate-900 tracking-tighter leading-none mb-4"
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            delay: delay * 0.08 + 0.2,
            duration: 0.4,
            ease: 'easeOut'
          }}
        >
          {value}
        </motion.p>

        {/* Change Text */}
        {changeText && (
          <motion.p 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: delay * 0.08 + 0.3 }}
            className="text-xs font-semibold text-slate-500 flex items-center gap-1.5 group-hover:text-slate-700 transition-colors"
          >
            <Zap className="w-3.5 h-3.5 text-amber-500" />
            {changeText}
          </motion.p>
        )}
      </div>
    </motion.div>
  );
};

export default StatCard;
