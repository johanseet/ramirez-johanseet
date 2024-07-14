// src/services/api/paymentService.js
import axiosInstance from '../axiosConfig';

export const createPayment = async (paymentData) => {
  try {
    const response = await axiosInstance.post('/payments', paymentData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getPaymentById = async (id) => {
  try {
    const response = await axiosInstance.get(`/payments/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getPayments = async () => {
  try {
    const response = await axiosInstance.get('/payments');
    return response.data;
  } catch (error) {
    throw error;
  }
};
