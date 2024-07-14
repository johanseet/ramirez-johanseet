//AnunciaPanama/anuncia-panama-frontend/src/config/api-config.js
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL + process.env.NEXT_PUBLIC_PREFIX_API,
});

export default api;