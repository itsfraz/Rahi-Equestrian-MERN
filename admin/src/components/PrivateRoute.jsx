/**
 * Private Route Component
 * Protected route wrapper with premium loading state
 * Features: Authentication check, loading indicator, redirect handling
 */

import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

const PrivateRoute = () => {
  const { user, loading } = useContext(AuthContext);

  // Premium Loading State
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          {/* Logo Animation */}
          <motion.div
            animate={{ 
              rotate: [0, 360],
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              ease: 'linear' 
            }}
            className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl mx-auto flex items-center justify-center shadow-lg shadow-primary-500/30 mb-6"
          >
            <span className="text-white font-bold text-2xl font-display">R</span>
          </motion.div>

          {/* Loading Text */}
          <div className="flex items-center justify-center gap-2 text-slate-500">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span className="font-medium">Loading dashboard...</span>
          </div>
        </motion.div>
      </div>
    );
  }

  // Check authentication and admin status
  return user && user.isAdmin ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
