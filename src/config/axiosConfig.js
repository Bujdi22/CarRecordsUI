import axios from 'axios';

// Create an Axios instance
const axiosInstance = axios.create();

// Add a request interceptor
axiosInstance.interceptors.request.use(config => {
    const token = localStorage.getItem('bearerToken');
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`; // Attach the token
    }
    return config;
}, error => {
    return Promise.reject(error);
});

// Optionally, you can add a response interceptor to handle responses globally
axiosInstance.interceptors.response.use(response => {
    return response;
}, error => {
    // Handle errors globally
    return Promise.reject(error);
});

// Export the Axios instance
export default axiosInstance;