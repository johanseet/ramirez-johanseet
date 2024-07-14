// src/services/api/businessService.js
import axiosInstance from '../axiosConfig';

export const getBusinesses = async () => {
  try {
    const response = await axiosInstance.get('/businesses');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getBusinessById = async (id) => {
  try {
    const response = await axiosInstance.get(`/businesses/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createBusiness = async (businessData) => {
  try {
    const response = await axiosInstance.post('/businesses', businessData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateBusiness = async (id, businessData) => {
  try {
    const response = await axiosInstance.put(`/businesses/${id}`, businessData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteBusiness = async (id) => {
  try {
    const response = await axiosInstance.delete(`/businesses/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
