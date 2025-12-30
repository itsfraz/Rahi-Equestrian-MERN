/**
 * Configuration Module
 * Centralizes environment variable access and validation.
 */

const config = {
    app: {
      name: import.meta.env.VITE_APP_NAME || 'Rahi Equestrian',
      env: import.meta.env.MODE,
      isDev: import.meta.env.DEV,
      isProd: import.meta.env.PROD,
      baseUrl: import.meta.env.BASE_URL,
    },
    api: {
      // Example for future API integration
      // url: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
    },
    features: {
      // Example feature flags
      // enableDarkTheme: import.meta.env.VITE_ENABLE_DARK_THEME === 'true',
    }
  };
  
  // Validation (Optional but recommended)
  // if (!config.api.url && config.app.isProd) {
  //   console.warn("API URL is missing in production environment");
  // }
  
  export default config;
  
