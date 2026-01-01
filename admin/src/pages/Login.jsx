/**
 * Login Page
 * Premium authentication page with glassmorphism and animations
 * Features: Floating input labels, gradient background, smooth transitions
 */

import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { toast } from 'react-toastify';
import { Lock, Mail, ArrowRight, Eye, EyeOff, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    const result = await login(email, password);
    setIsLoading(false);

    if (result.success) {
      toast.success('Welcome back!');
      navigate('/');
    } else {
      toast.error(result.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-slate-900">
      
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient Orbs */}
        <motion.div 
          animate={{ 
            x: [0, 50, 0], 
            y: [0, -30, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 15, 
            repeat: Infinity, 
            ease: 'easeInOut' 
          }}
          className="absolute -top-40 -left-40 w-96 h-96 bg-primary-600/30 rounded-full blur-[100px]"
        />
        <motion.div 
          animate={{ 
            x: [0, -40, 0], 
            y: [0, 40, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            duration: 18, 
            repeat: Infinity, 
            ease: 'easeInOut' 
          }}
          className="absolute top-1/2 -right-40 w-80 h-80 bg-violet-600/20 rounded-full blur-[80px]"
        />
        <motion.div 
          animate={{ 
            x: [0, 30, 0], 
            y: [0, -20, 0]
          }}
          transition={{ 
            duration: 12, 
            repeat: Infinity, 
            ease: 'easeInOut' 
          }}
          className="absolute -bottom-20 left-1/4 w-64 h-64 bg-emerald-600/20 rounded-full blur-[70px]"
        />
        
        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='white'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e")`,
          }}
        />
      </div>

      {/* Login Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="relative z-10 w-full max-w-md mx-4"
      >
        {/* Card */}
        <div className="bg-white/[0.08] backdrop-blur-2xl p-10 rounded-3xl border border-white/10 shadow-2xl">
          
          {/* Logo & Header */}
          <div className="text-center mb-10">
            <motion.div 
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl mx-auto flex items-center justify-center shadow-xl shadow-primary-500/30 mb-6"
            >
              <span className="text-white font-bold text-4xl font-display">R</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-3xl font-bold text-white tracking-tight font-display"
            >
              Welcome Back
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-slate-400 mt-2 font-medium"
            >
              Sign in to your admin dashboard
            </motion.p>
          </div>

          {/* Form */}
          <motion.form 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            onSubmit={submitHandler} 
            className="space-y-6"
          >
            {/* Email Field */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-300 ml-1">
                Email Address
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-slate-500 group-focus-within:text-primary-400 transition-colors" />
                </div>
                <input
                  type="email"
                  placeholder="admin@example.com"
                  className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:bg-white/10 focus:border-primary-500/50 focus:ring-4 focus:ring-primary-500/10 transition-all duration-200 font-medium"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-300 ml-1">
                Password
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-500 group-focus-within:text-primary-400 transition-colors" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-12 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:bg-white/10 focus:border-primary-500/50 focus:ring-4 focus:ring-primary-500/10 transition-all duration-200 font-medium"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-500 hover:text-slate-300 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input 
                  type="checkbox" 
                  className="w-4 h-4 rounded bg-white/10 border-white/20 text-primary-500 focus:ring-primary-500/20 focus:ring-offset-0" 
                />
                <span className="text-slate-400 group-hover:text-slate-300 transition-colors font-medium">
                  Remember me
                </span>
              </label>
              <a 
                href="#" 
                className="text-primary-400 font-semibold hover:text-primary-300 transition-colors"
              >
                Forgot password?
              </a>
            </div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-primary-600 to-primary-500 text-white py-4 rounded-xl shadow-xl shadow-primary-500/30 hover:shadow-primary-500/40 hover:from-primary-500 hover:to-primary-400 transition-all duration-200 font-bold text-lg flex justify-center items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Sign In
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </motion.button>
          </motion.form>

          {/* Security Notice */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-8 pt-6 border-t border-white/10"
          >
            <div className="flex items-center justify-center gap-2 text-slate-500 text-sm">
              <Shield className="w-4 h-4" />
              <span>Protected by enterprise-grade security</span>
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-8 text-center text-sm text-slate-500"
        >
          © 2024 Rahi Equestrian. All rights reserved.
        </motion.p>
      </motion.div>
    </div>
  );
};

export default Login;
