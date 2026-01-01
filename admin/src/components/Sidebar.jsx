/**
 * Sidebar Component
 * Premium collapsible sidebar with mobile responsiveness
 * Features: Smooth animations, icon + label navigation, mobile overlay
 */

import { useState, useContext, useEffect } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { 
  LayoutDashboard, 
  Package, 
  Users, 
  Settings, 
  LogOut,
  ShoppingBag,
  ChevronLeft,
  Menu,
  X,
  Sparkles,
  FolderTree
} from 'lucide-react';
import clsx from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';

// Sidebar Context for sharing state with Layout
import { createContext } from 'react';
export const SidebarContext = createContext();

const Sidebar = ({ isOpen, onClose, onToggle }) => {
  const { logout, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Navigation items configuration
  const navItems = [
    { 
      name: 'Dashboard', 
      path: '/', 
      icon: LayoutDashboard,
      description: 'Overview & Analytics'
    },
    { 
      name: 'Products', 
      path: '/products', 
      icon: Package,
      description: 'Manage Catalog'
    },
    { 
      name: 'Categories', 
      path: '/categories', 
      icon: FolderTree,
      description: 'Product Categories'
    },
    { 
      name: 'Users', 
      path: '/users', 
      icon: Users,
      description: 'Customer Management'
    },
    // Uncomment when ready
    // { 
    //   name: 'Orders', 
    //   path: '/orders', 
    //   icon: ShoppingBag,
    //   description: 'Sales & Orders'
    // },
    // { 
    //   name: 'Settings', 
    //   path: '/settings', 
    //   icon: Settings,
    //   description: 'App Configuration'
    // },
  ];

  // Animation variants
  const sidebarVariants = {
    open: { 
      x: 0,
      transition: { 
        type: 'spring', 
        stiffness: 300, 
        damping: 30 
      }
    },
    closed: { 
      x: '-100%',
      transition: { 
        type: 'spring', 
        stiffness: 300, 
        damping: 30 
      }
    }
  };

  const overlayVariants = {
    open: { opacity: 1, pointerEvents: 'auto' },
    closed: { opacity: 0, pointerEvents: 'none' }
  };

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={overlayVariants}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 lg:hidden"
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={isOpen ? 'open' : 'closed'}
        variants={sidebarVariants}
        className={clsx(
          'fixed left-0 top-0 h-screen z-50',
          'w-[280px] bg-slate-900',
          'flex flex-col',
          'border-r border-slate-800/50',
          'lg:translate-x-0 lg:static',
          // Remove motion on desktop
          'lg:!transform-none'
        )}
      >
        {/* Decorative glow effect */}
        <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-primary-600/10 to-transparent pointer-events-none" />
        <div className="absolute -top-32 -left-32 w-64 h-64 bg-primary-600/20 rounded-full blur-[100px] pointer-events-none" />

        {/* Header - Logo */}
        <div className="relative z-10 p-6 pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Logo Mark */}
              <div className="w-11 h-11 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center shadow-lg shadow-primary-500/30">
                <span className="text-white font-bold text-xl font-display">R</span>
              </div>
              
              {/* Logo Text */}
              <div>
                <h2 className="text-xl font-bold text-white tracking-tight font-display">
                  Rahi
                </h2>
                <p className="text-[11px] text-slate-400 font-medium tracking-wider uppercase">
                  Equestrian Admin
                </p>
              </div>
            </div>

            {/* Mobile Close Button */}
            <button 
              onClick={onClose}
              className="lg:hidden p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Divider */}
          <div className="mt-6 h-px bg-gradient-to-r from-transparent via-slate-700/50 to-transparent" />
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-2 space-y-1 overflow-y-auto scrollbar-hide relative z-10">
          <p className="px-3 mb-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
            Menu
          </p>
          
          {navItems.map((item, index) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={onClose}
              className={({ isActive }) =>
                clsx(
                  'sidebar-link group',
                  isActive && 'active'
                )
              }
            >
              {({ isActive }) => (
                <>
                  <item.icon 
                    className={clsx(
                      'w-5 h-5 transition-all duration-200',
                      isActive 
                        ? 'text-white' 
                        : 'text-slate-400 group-hover:text-white'
                    )} 
                  />
                  <div className="flex-1 min-w-0">
                    <span className="block font-medium truncate">{item.name}</span>
                  </div>
                  
                  {/* Active indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="w-1.5 h-1.5 rounded-full bg-white/80"
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* User Profile & Logout */}
        <div className="relative z-10 p-4 mt-auto">
          {/* User Info Card (optional - can show logged in user) */}
          {user && (
            <div className="mb-4 p-4 rounded-2xl bg-slate-800/50 border border-slate-700/50">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-bold text-sm">
                  {user.name?.charAt(0)?.toUpperCase() || 'A'}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white truncate">
                    {user.name || 'Admin'}
                  </p>
                  <p className="text-xs text-slate-400 truncate">
                    {user.email || 'admin@rahi.com'}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-xs font-medium text-amber-400">Pro Account</span>
              </div>
            </div>
          )}

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-all duration-200 group"
          >
            <div className="p-2 rounded-lg bg-slate-800 group-hover:bg-rose-500/20 transition-colors">
              <LogOut className="w-4 h-4" />
            </div>
            <span className="font-medium text-sm">Sign Out</span>
          </button>
        </div>
      </motion.aside>
    </>
  );
};

export default Sidebar;
