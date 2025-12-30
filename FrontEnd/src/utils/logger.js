/**
 * Application Logger wrapper
 * Use this instead of console.log to allow for different log levels and environments.
 */

const LOG_LEVELS = {
    DEBUG: 0,
    INFO: 1,
    WARN: 2,
    ERROR: 3,
  };
  
  // You might want to get this from your config/env
  const CURRENT_LEVEL = import.meta.env.DEV ? LOG_LEVELS.DEBUG : LOG_LEVELS.WARN;
  
  const logger = {
    debug: (...args) => {
      if (CURRENT_LEVEL <= LOG_LEVELS.DEBUG) {
        console.debug('[DEBUG]', ...args);
      }
    },
    info: (...args) => {
      if (CURRENT_LEVEL <= LOG_LEVELS.INFO) {
        console.info('[INFO]', ...args);
      }
    },
    warn: (...args) => {
      if (CURRENT_LEVEL <= LOG_LEVELS.WARN) {
        console.warn('[WARN]', ...args);
      }
    },
    error: (...args) => {
      if (CURRENT_LEVEL <= LOG_LEVELS.ERROR) {
        console.error('[ERROR]', ...args);
      }
    },
  };
  
  export default logger;
  
