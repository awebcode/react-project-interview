import axios from 'axios';

// Use BASE_API_URL from the environment variable
const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_API_URL,
  timeout: 6000, // Optional: Set a timeout (6 seconds)
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor for requests
api.interceptors.request.use(
  (config) => {
    // Optionally, add authentication token or other headers
    console.log(`Making request to: ${config.baseURL}${config.url}`);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor for responses
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export default api;
