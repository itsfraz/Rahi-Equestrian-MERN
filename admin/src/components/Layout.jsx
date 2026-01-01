/**
 * Layout Component
 * Main application layout with header, sidebar, and content area
 * Features: Responsive design, notifications, user dropdown, search
 */

import { useState, useContext, useRef, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import AuthContext from '../context/AuthContext';
import { 
  Search, 
  Bell, 
  Menu, 
  User,
  Settings,
  LogOut,
  ChevronDown,
  Moon,
  Sun,
  HelpCircle,
  MessageSquare,
  Check
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';

const Layout = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  
  // State management
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  
  // Refs for click outside detection
  const userMenuRef = useRef(null);
  const notificationsRef = useRef(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        setNotificationsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close sidebar on route change (mobile)
  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Mock notifications data
  const notifications = [
    { id: 1, title: 'New order received', message: 'Order #1234 has been placed', time: '2 min ago', read: false },
    { id: 2, title: 'Product low stock', message: 'Riding Boots is running low', time: '1 hour ago', read: false },
    { id: 3, title: 'New user registered', message: 'John Doe signed up', time: '3 hours ago', read: true },
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  // Dropdown animation variants
  const dropdownVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.95, 
      y: -10,
      transition: { duration: 0.1 }
    },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { duration: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <Sidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen">
        
        {/* Top Header / Navbar */}
        <header className="h-[72px] px-4 lg:px-8 flex items-center justify-between sticky top-0 z-30 bg-white/90 backdrop-blur-2xl border-b border-slate-100/50 shadow-sm">
          
          {/* Left Section */}
          <div className="flex items-center gap-4 flex-1">
            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2.5 text-slate-500 hover:text-sky-600 hover:bg-sky-50 rounded-xl transition-all duration-200"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Search Bar */}
            <div className={clsx(
              'relative hidden md:flex items-center flex-1 max-w-sm transition-all duration-300',
              searchFocused ? 'scale-105' : ''
            )}>
              <Search className={clsx(
                'absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors z-10',
                searchFocused ? 'text-sky-500' : 'text-slate-400'
              )} />
              <input 
                type="text" 
                placeholder="Search products, users..." 
                className="input-search w-full text-sm font-medium"
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
              />
              
              {/* Keyboard shortcut hint */}
              {!searchFocused && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <kbd className="hidden lg:inline-flex items-center gap-1 px-2 py-1 text-[10px] font-bold text-slate-400 bg-slate-100 rounded border border-slate-200 hover:border-slate-300 transition-colors">
                    ⌘K
                  </kbd>
                </div>
              )}
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-1">
            
            {/* Mobile Search Button */}
            <button className="md:hidden p-2.5 text-slate-500 hover:text-sky-600 hover:bg-sky-50 rounded-xl transition-all duration-200">
              <Search className="w-5 h-5" />
            </button>
            
            {/* Notifications */}
            <div className="relative" ref={notificationsRef}>
              <button 
                onClick={() => {
                  setNotificationsOpen(!notificationsOpen);
                  setUserMenuOpen(false);
                }}
                className={clsx(
                  'relative p-2.5 rounded-xl transition-all duration-200',
                  notificationsOpen 
                    ? 'bg-sky-100 text-sky-600 shadow-sm' 
                    : 'text-slate-500 hover:text-sky-600 hover:bg-sky-50'
                )}
              >
                <Bell className="w-5 h-5" />
                
                {/* Notification Badge */}
                {unreadCount > 0 && (
                  <motion.span 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-gradient-to-br from-red-500 to-rose-600 rounded-full ring-2 ring-white shadow-md shadow-red-500/50"
                  />
                )}
              </button>

              {/* Notifications Dropdown */}
              <AnimatePresence>
                {notificationsOpen && (
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={dropdownVariants}
                    className="absolute right-0 mt-3 w-96 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden z-50"
                  >
                    {/* Header */}
                    <div className="px-6 py-4 bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200 flex items-center justify-between">
                      <h3 className="font-bold text-slate-900">Notifications</h3>
                      {unreadCount > 0 && (
                        <span className="badge-info text-[10px] font-bold">{unreadCount} new</span>
                      )}
                    </div>
                    
                    {/* Notifications List */}
                    <div className="max-h-96 overflow-y-auto scrollbar-hide">
                      {notifications.map((notification, index) => (
                        <div 
                          key={notification.id}
                          className={clsx(
                            'px-6 py-4 border-b border-slate-100 hover:bg-slate-50/80 transition-colors cursor-pointer group',
                            index === notifications.length - 1 && 'border-0'
                          )}
                        >
                          <div className="flex items-start gap-3">
                            {/* Read indicator */}
                            {!notification.read && (
                              <div className="w-2.5 h-2.5 mt-1.5 rounded-full bg-gradient-to-br from-sky-400 to-sky-500 flex-shrink-0 animate-pulse-soft" />
                            )}
                            {notification.read && (
                              <div className="w-2.5 h-2.5 mt-1.5 rounded-full bg-slate-200 flex-shrink-0" />
                            )}
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-bold text-slate-900">
                                {notification.title}
                              </p>
                              <p className="text-xs text-slate-500 mt-0.5">
                                {notification.message}
                              </p>
                              <p className="text-[10px] text-slate-400 mt-2 font-medium">
                                {notification.time}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    {/* Footer */}
                    <div className="px-6 py-3 bg-slate-50 border-t border-slate-100">
                      <button className="w-full text-sm text-sky-600 font-bold hover:text-sky-700 transition-colors">
                        View all notifications →
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Divider */}
            <div className="hidden sm:block h-8 w-px bg-slate-200/50" />

            {/* User Menu */}
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => {
                  setUserMenuOpen(!userMenuOpen);
                  setNotificationsOpen(false);
                }}
                className={clsx(
                  'flex items-center gap-2 px-3 py-2 rounded-xl transition-all duration-200',
                  userMenuOpen 
                    ? 'bg-slate-100 shadow-sm' 
                    : 'hover:bg-slate-50'
                )}
              >
                {/* Avatar */}
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-sky-500 to-sky-600 flex items-center justify-center text-white font-bold text-sm shadow-md shadow-sky-500/25 group-hover:shadow-lg transition-shadow">
                  {user?.name?.charAt(0)?.toUpperCase() || 'A'}
                </div>
                
                {/* User Info */}
                <div className="hidden sm:block text-left">
                  <p className="text-sm font-bold text-slate-900 leading-tight">
                    {user?.name || 'Admin'}
                  </p>
                  <p className="text-[10px] text-slate-500 font-medium">
                    {user?.role || 'Administrator'}
                  </p>
                </div>
                
                <ChevronDown className={clsx(
                  'w-4 h-4 text-slate-400 transition-transform duration-200',
                  userMenuOpen && 'rotate-180'
                )} />
              </button>

              {/* User Dropdown Menu */}
              <AnimatePresence>
                {userMenuOpen && (
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={dropdownVariants}
                    className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden z-50"
                  >
                    {/* User Header */}
                    <div className="px-6 py-4 bg-gradient-to-r from-sky-50 to-blue-50 border-b border-slate-200">
                      <p className="text-sm font-bold text-slate-900">{user?.name || 'Admin'}</p>
                      <p className="text-xs text-slate-500 truncate mt-1">{user?.email || 'admin@rahi.com'}</p>
                    </div>
                    
                    {/* Menu Items */}
                    <div className="py-2">
                      <button className="dropdown-item">
                        <div className="w-8 h-8 rounded-lg bg-sky-100 flex items-center justify-center">
                          <User className="w-4 h-4 text-sky-600" />
                        </div>
                        <span>Profile</span>
                      </button>
                      <button className="dropdown-item">
                        <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center">
                          <Settings className="w-4 h-4 text-purple-600" />
                        </div>
                        <span>Settings</span>
                      </button>
                      <button className="dropdown-item">
                        <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center">
                          <HelpCircle className="w-4 h-4 text-amber-600" />
                        </div>
                        <span>Help & Support</span>
                      </button>
                    </div>
                    
                    {/* Logout */}
                    <div className="py-2 border-t border-slate-100">
                      <button 
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 text-sm text-rose-600 hover:bg-rose-50/80 font-bold transition-colors"
                      >
                        <div className="w-8 h-8 rounded-lg bg-rose-100 flex items-center justify-center">
                          <LogOut className="w-4 h-4" />
                        </div>
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-8 overflow-auto">
          <div className="max-w-7xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Outlet />
            </motion.div>
          </div>
        </main>

        {/* Footer */}
        <footer className="py-4 px-8 border-t border-slate-100 bg-white/80 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-medium">
            <p>© 2024 Rahi Equestrian. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <a href="#" className="hover:text-slate-700 transition-colors">Privacy</a>
              <a href="#" className="hover:text-slate-700 transition-colors">Terms</a>
              <a href="#" className="hover:text-slate-700 transition-colors">Help</a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Layout;
