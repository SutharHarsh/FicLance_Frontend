import axios from 'axios';

// FORCE LOCALHOST for debugging
const API_URL = 'http://localhost:8080/api/v1';
// const API_URL = process.env.NEXT_PUBLIC_API_URL 
//   ? `${process.env.NEXT_PUBLIC_API_URL}/api/v1`
//   : 'http://localhost:8080/api/v1';

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
    if (config.url?.includes('/users/me') && config.method === 'patch') {
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

    // CRITICAL FIX: Don't intercept refresh endpoint itself to prevent infinite loops
    if (originalRequest.url === '/auth/refresh') {
      return Promise.reject(error);
    }

    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
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

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        console.log("🔄 REFRESHING TOKEN...");
        // Call refresh endpoint
        const response = await api.post('/auth/refresh');
        const { access_token } = response.data.data;

        setAuthToken(access_token);
        originalRequest.headers['Authorization'] = 'Bearer ' + access_token;

        processQueue(null, access_token);

        console.log("🔄 RETRYING REQUEST WITH NEW TOKEN");
        console.log("📦 Retry Payload:", originalRequest.data);

        return api(originalRequest);
      } catch (err) {
        processQueue(err, null);
        // Emit logout event when refresh fails
        window.dispatchEvent(new Event('auth:logout'));
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
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
