import React from 'react';
import { Link } from 'react-router-dom';
import { FiHome } from 'react-icons/fi';

const NotFound = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 animate-fade-in">
      <h1 className="text-9xl font-display font-black text-gray-100 text-shadow-sm select-none">
        404
      </h1>
      <div className="absolute">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">Page Not Found</h2>
      </div>
      
      <p className="text-gray-500 max-w-md mx-auto mb-8 mt-4 text-lg">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>

      <Link 
        to="/" 
        className="btn-premium inline-flex items-center gap-2 bg-primary text-white px-8 py-3 rounded-full font-semibold hover:bg-primary-dark hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
      >
        <FiHome className="text-xl" />
        <span>Return to Home</span>
      </Link>
    </div>
  );
};

export default NotFound;
