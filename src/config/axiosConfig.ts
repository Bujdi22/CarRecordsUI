import axios, { AxiosInstance, AxiosRequestConfig, AxiosError } from 'axios';
import getBaseUrl from "@/utils/baseUrlProvider";

// Determine the base URL based on the environment
const baseURL: string = getBaseUrl()

console.log('Car records current endpoint = ', baseURL);

// Create an Axios instance with the dynamically determined base URL
const axiosInstance: AxiosInstance = axios.create({
    baseURL,
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
    (config: AxiosRequestConfig): AxiosRequestConfig => {
    const token = localStorage.getItem('bearerToken');
    if (token) {
        config.headers = {
            ...config.headers,
            Authorization: `Bearer ${token}`, // Attach the token
        };
    }
    return config;
},
    (error: AxiosError): Promise<AxiosError> => {
    return Promise.reject(error);
}
);

// Optionally, you can add a response interceptor to handle responses globally
axiosInstance.interceptors.response.use(
    response => response,
    (error: AxiosError): Promise<AxiosError> => {
    // Handle errors globally
    return Promise.reject(error);
}
);

// Export the Axios instance
export default axiosInstance;