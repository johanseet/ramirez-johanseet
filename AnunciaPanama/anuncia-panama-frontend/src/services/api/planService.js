// src/services/api/planService.js
import axiosInstance from '../axiosConfig';

export const getPlans = async () => {
  try {
    const response = await axiosInstance.get('/plans');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getPlanById = async (id) => {
  try {
    const response = await axiosInstance.get(`/plans/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createPlan = async (planData) => {
  try {
    const response = await axiosInstance.post('/plans', planData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updatePlan = async (id, planData) => {
  try {
    const response = await axiosInstance.put(`/plans/${id}`, planData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deletePlan = async (id) => {
  try {
    const response = await axiosInstance.delete(`/plans/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
