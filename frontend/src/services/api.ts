import axios from 'axios';

// Detect environment and provide safe fallback for non-browser/non-vite contexts
const getBaseURL = () => {
  // Check for global mock or process.env (Jest)
  if (typeof (globalThis as any).VITE_API_URL !== 'undefined') {
    return (globalThis as any).VITE_API_URL;
  }
  
  // Use a string-based access to avoid parser errors for import.meta
  try {
    const metaEnv = (import.meta as any).env;
    if (metaEnv && metaEnv.VITE_API_URL) {
      return metaEnv.VITE_API_URL;
    }
  } catch (e) {
    // Parser error for import.meta in some environments
  }
  
  return 'http://localhost:8082/api';
};

const api = axios.create({
  baseURL: getBaseURL(),
});

export const getAIResponse = async (query: string, context?: Record<string, unknown>) => {
  try {
    const response = await api.post('/ask', { query, context });
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

export const uploadFile = async (file: File) => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    const response = await api.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Upload Error:', error);
    throw error;
  }
};
