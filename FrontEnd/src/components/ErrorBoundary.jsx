import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Uncaught error:", error, errorInfo);
    // Here you would typically log to a service like Sentry or LogRocket
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center bg-gray-50">
          <h1 className="text-4xl font-display font-black text-gray-800 mb-4">Oops! Something went wrong.</h1>
          <p className="text-lg text-gray-600 mb-8 max-w-md">
            We're sorry for the inconvenience. Please try refreshing the page or come back later.
          </p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-6 py-3 bg-primary text-white rounded-full font-bold hover:bg-primary-dark transition-colors shadow-lg"
          >
            Refresh Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
