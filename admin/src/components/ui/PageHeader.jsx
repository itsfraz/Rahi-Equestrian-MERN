/**
 * Page Header Component
 * Modern, bold header for all admin pages
 */

import { motion } from 'framer-motion';

const PageHeader = ({ 
  title, 
  description, 
  actions,
  breadcrumb
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: -15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="page-header"
    >
      <div className="flex-1">
        {breadcrumb && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="flex items-center gap-2 text-xs text-slate-500 font-bold uppercase tracking-wider mb-2"
          >
            {breadcrumb}
          </motion.div>
        )}
        
        <motion.h1 
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.05 }}
          className="text-4xl font-black bg-gradient-to-r from-slate-900 via-sky-800 to-slate-900 bg-clip-text text-transparent tracking-tight font-display mb-3"
        >
          {title}
        </motion.h1>
        
        {description && (
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
            className="text-slate-600 text-sm font-medium max-w-lg leading-relaxed"
          >
            {description}
          </motion.p>
        )}
      </div>
      
      {actions && (
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.3 }}
          className="flex items-center gap-3 flex-shrink-0 flex-wrap justify-end"
        >
          {actions}
        </motion.div>
      )}
    </motion.div>
  );
};

export default PageHeader;
