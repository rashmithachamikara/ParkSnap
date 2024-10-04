//Axios is used for sending requests as it maintain auth headers in all requests once logged in

import axios from 'axios';
import config from './config'; // your config file for baseUrl

// Create an instance of axios
const axiosInstance = axios.create({
  baseURL: config.baseUrl,
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Get token from localStorage
    const token = localStorage.getItem('token');
    
    // If token exists, add it to the Authorization header
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
