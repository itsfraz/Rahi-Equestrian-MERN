/**
 * Empty State Component
 * Modern, attractive empty state UI for when no data exists
 */

import { Package, Users, ShoppingBag, BarChart3, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const EmptyState = ({ 
  icon: Icon = Package, 
  title = 'No data found', 
  description = 'There is no data to display at the moment.',
  action,
  actionLabel = 'Get Started'
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
      className="empty-state my-12"
    >
      {/* Decorative animated background */}
      <div className="absolute inset-0 flex items-center justify-center -z-10">
        <div className="absolute w-48 h-48 bg-gradient-to-br from-sky-100 to-sky-50 rounded-full blur-3xl opacity-30 -top-24 -right-24" />
        <div className="absolute w-64 h-64 bg-gradient-to-br from-purple-100 to-purple-50 rounded-full blur-3xl opacity-20 -bottom-32 -left-32" />
      </div>

      {/* Icon Container */}
      <motion.div 
        initial={{ scale: 0, y: 10 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        className="relative mb-6 inline-block"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-sky-200 to-purple-200 rounded-3xl blur-2xl opacity-30" />
        <div className="relative w-20 h-20 rounded-3xl bg-gradient-to-br from-sky-100 to-sky-50 flex items-center justify-center border border-sky-200/50 shadow-lg">
          <Icon className="w-10 h-10 text-sky-600" />
        </div>
      </motion.div>
      
      {/* Title */}
      <motion.h3 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="empty-state-title text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent"
      >
        {title}
      </motion.h3>

      {/* Description */}
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="empty-state-description text-slate-600 font-medium max-w-sm"
      >
        {description}
      </motion.p>
      
      {/* Action Button */}
      {action && (
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          whileHover={{ scale: 1.05 }}
          onClick={action}
          className="btn-primary mt-8 inline-flex items-center gap-2 group"
        >
          {actionLabel}
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </motion.button>
      )}
    </motion.div>
  );
};

// Preset empty states
export const EmptyProducts = ({ action }) => (
  <EmptyState
    icon={Package}
    title="No products yet"
    description="Start building your catalog by adding your first product. Click the button below to get started."
    action={action}
    actionLabel="Add your first product"
  />
);

export const EmptyUsers = () => (
  <EmptyState
    icon={Users}
    title="No users yet"
    description="Users who sign up for your platform will appear here. Invite your first users to get started."
  />
);

export const EmptyOrders = () => (
  <EmptyState
    icon={ShoppingBag}
    title="No orders yet"
    description="When customers place orders, they'll show up here with all the details."
  />
);

export const EmptyAnalytics = () => (
  <EmptyState
    icon={BarChart3}
    title="No analytics data"
    description="Analytics data will appear once your customers start engaging with products."
  />
);

export default EmptyState;
