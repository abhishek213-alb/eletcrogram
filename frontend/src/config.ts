export const API_URL = (() => {
  try {
    return eval('import.meta.env').VITE_API_URL || 'http://localhost:8080/api';
  } catch (e) {
    return typeof process !== 'undefined' && process.env.VITE_API_URL 
      ? process.env.VITE_API_URL 
      : 'http://localhost:8080/api';
  }
})();
