// src/services/api/authService.js
import axiosInstance from '../axiosConfig';

export const login = async (email, password) => {
  try {
    const response = await axiosInstance.post('/auth/login', { email, password });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const logout = async () => {
  try {
    const response = await axiosInstance.post('/auth/logout');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getCurrentUser = async () => {
  try {
    const response = await axiosInstance.get('/auth/session');
    return response.data;
  } catch (error) {
    throw error;
  }
};
