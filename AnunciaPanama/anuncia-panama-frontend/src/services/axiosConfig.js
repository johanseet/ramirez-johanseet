// src/services/axiosConfig.js
import axios from 'axios';

// instancia de Axios
const axiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_PREFIX_API}`,
  withCredentials: true,
  timeout: 10000, // Tiempo de espera de las solicitudes (en milisegundos)
});

axiosInstance.interceptors.request.use(
  (config) => {
    console.log('Starting Request', config);
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    console.log('Response:', response);
    return response;
  },
  (error) => {
    console.error('Response error:', error);
    return Promise.reject(error);
  }
);

export default axiosInstance;
