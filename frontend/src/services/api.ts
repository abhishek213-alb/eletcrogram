import axios from 'axios';

/**
 * Simplified API Service
 * Points to the local backend by default for maximum reliability.
 */
const getBaseURL = (): string => {
  // Use relative path for Unified Architecture (Frontend served by Backend)
  // This works both in production and with Vite's proxy in development
  return '/api';
};

const api = axios.create({
  baseURL: getBaseURL(),
});

export const getAIResponse = async (query: string, context?: Record<string, unknown>) => {
  try {
    const response = await api.post('/ask', { query, context });
    return response.data;
  } catch (error) {
    console.error('AI Assistant Error:', error);
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

export const fetchJourney = async (userId: string) => {
  try {
    const response = await api.get(`/journey/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Fetch Journey Error:', error);
    throw error;
  }
};

export const updateChecklist = async (userId: string, itemId: string, completed: boolean) => {
  try {
    const response = await api.post(`/journey/${userId}/checklist`, { itemId, completed });
    return response.data;
  } catch (error) {
    console.error('Update Checklist Error:', error);
    throw error;
  }
};

export const updateScenario = async (userId: string, scenarioId: string, passed: boolean) => {
  try {
    const response = await api.post(`/journey/${userId}/scenario`, { scenarioId, passed });
    return response.data;
  } catch (error) {
    console.error('Update Scenario Error:', error);
    throw error;
  }
};
