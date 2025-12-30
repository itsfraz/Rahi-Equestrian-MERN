import React from 'react';
import { FiPackage } from 'react-icons/fi';

// Loading Skeleton for Product Cards
export const ProductCardSkeleton = () => (
  <div className="card-premium p-0 overflow-hidden animate-pulse">
    <div className="w-full aspect-square bg-linear-to-br from-gray-200 to-gray-100"></div>
    <div className="p-6 space-y-3">
      <div className="h-3 bg-gray-200 rounded-full w-1/3"></div>
      <div className="h-6 bg-gray-300 rounded-lg w-3/4"></div>
      <div className="h-4 bg-gray-200 rounded-full w-full"></div>
      <div className="h-4 bg-gray-200 rounded-full w-2/3"></div>
      <div className="flex justify-between items-center pt-4">
        <div className="h-8 bg-gray-300 rounded-lg w-1/3"></div>
        <div className="h-10 bg-gray-200 rounded-xl w-1/3"></div>
      </div>
    </div>
  </div>
);

// Loading Skeleton for Feature Cards
export const FeatureCardSkeleton = () => (
  <div className="card-premium p-8 animate-pulse">
    <div className="w-16 h-16 bg-gray-200 rounded-2xl mb-4"></div>
    <div className="h-6 bg-gray-300 rounded-lg w-2/3 mb-3"></div>
    <div className="space-y-2">
      <div className="h-4 bg-gray-200 rounded-full w-full"></div>
      <div className="h-4 bg-gray-200 rounded-full w-5/6"></div>
    </div>
  </div>
);

// Empty State Component
export const EmptyState = ({ icon, title, description, action }) => (
  <div className="flex flex-col items-center justify-center py-20 px-6 text-center animate-fade-in">
    <div className="text-7xl mb-6 opacity-30 animate-[float_3s_ease-in-out_infinite] text-gray-400">
      {icon || <FiPackage />}
    </div>
    <h3 className="text-2xl md:text-3xl font-display font-bold text-text mb-3">
      {title || 'No items found'}
    </h3>
    <p className="text-base md:text-lg text-text-light max-w-md mb-8 leading-relaxed">
      {description || 'Try adjusting your filters or check back later.'}
    </p>
    {action && (
      <button className="btn-premium bg-linear-to-r from-primary to-accent text-white py-3 px-8 rounded-xl font-semibold transition-all duration-300 hover:shadow-xl hover:scale-105 active:scale-95">
        {action}
      </button>
    )}
  </div>
);

// Loading Spinner
export const LoadingSpinner = ({ size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4 border-2',
    md: 'w-8 h-8 border-3',
    lg: 'w-12 h-12 border-4'
  };

  return (
    <div className="flex items-center justify-center py-12">
      <div className={`${sizeClasses[size]} border-primary border-t-transparent rounded-full animate-spin`}></div>
    </div>
  );
};

// Success Toast (can be used with a toast library)
export const SuccessMessage = ({ message }) => (
  <div className="fixed top-4 right-4 z-10000 animate-[slideIn_0.3s_ease-out]">
    <div className="bg-linear-to-r from-green-500 to-emerald-500 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3">
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
      <span className="font-semibold">{message}</span>
    </div>
  </div>
);

// Badge Component
export const Badge = ({ children, variant = 'primary', size = 'md' }) => {
  const variants = {
    primary: 'bg-linear-to-r from-primary/10 to-accent/10 text-primary',
    success: 'bg-green-100 text-green-700',
    warning: 'bg-yellow-100 text-yellow-700',
    error: 'bg-red-100 text-red-700',
    neutral: 'bg-gray-100 text-gray-700'
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-1.5 text-base'
  };

  return (
    <span className={`inline-flex items-center rounded-full font-semibold ${variants[variant]} ${sizes[size]}`}>
      {children}
    </span>
  );
};

export default {
  ProductCardSkeleton,
  FeatureCardSkeleton,
  EmptyState,
  LoadingSpinner,
  SuccessMessage,
  Badge
};
