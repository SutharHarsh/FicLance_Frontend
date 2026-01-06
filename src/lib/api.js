import axios from 'axios';

// FORCE LOCALHOST for debugging
// const API_URL = 'http://localhost:8080/api/v1';
// const API_URL = process.env.NEXT_PUBLIC_API_URL 
//   ? `${process.env.NEXT_PUBLIC_API_URL}/api/v1`
//   : 'http://localhost:8080/api/v1';

const API_URL = process.env.NEXT_PUBLIC_API_URL
  ? `${process.env.NEXT_PUBLIC_API_URL.replace(/\/$/, '')}`
  : "http://localhost:8080/api/v1";


console.log('🔗 API Configuration:', {
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  API_URL,
  nodeEnv: process.env.NODE_ENV
});

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Request interceptor to add access token
api.interceptors.request.use(
  (config) => {
    // Access token is dynamically set via setAuthToken helper
    if (config.url?.includes('/users/me') && config.method === 'put') {
      console.log("📡 API REQUEST INTERCEPTOR:", config.url);
      console.log("📦 Payload in Interceptor:", config.data);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

// Response interceptor for 401 handling
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Don't intercept refresh endpoint to prevent infinite loops
    if (originalRequest.url === '/auth/refresh') {
      return Promise.reject(error);
    }

    // Handle 401 (token expired) - attempt refresh ONCE
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (isRefreshing) {
        // Queue this request while refresh is in progress
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers['Authorization'] = 'Bearer ' + token;
            return api(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      isRefreshing = true;

      try {
        console.log("🔄 Token expired, attempting refresh...");
        const response = await api.post('/auth/refresh');
        const { access_token } = response.data.data;

        setAuthToken(access_token);
        originalRequest.headers['Authorization'] = 'Bearer ' + access_token;

        processQueue(null, access_token);

        console.log("✅ Token refreshed successfully, retrying request");
        return api(originalRequest);
      } catch (err) {
        console.error("❌ Refresh token failed, logging out");
        processQueue(err, null);
        // Emit logout event when refresh fails
        window.dispatchEvent(new Event('auth:logout'));
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    // Preserve backend error messages for display
    if (error.response?.data) {
      console.error('❌ API Error:', error.response.data);
      // Return structured error with backend message
      const backendError = new Error(
        error.response.data.error?.message || 
        error.response.data.message || 
        error.message
      );
      backendError.response = error.response;
      return Promise.reject(backendError);
    }

    return Promise.reject(error);
  }
);

export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

export default api;
