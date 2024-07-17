import axiosInstance from '../axiosConfig';

// Crear un producto y un plan
export const createProductAndPlan = async (name, description, planName, price) => {
  try {
    const response = await axiosInstance.post('/payment/create-product-plan', {
      name,
      description,
      planName,
      price,
    });
    return response.data;
  } catch (error) {
    throw new Error(`Error creando el producto y el plan: ${error.response ? error.response.data.error : error.message}`);
  }
};

// Crear una suscripción
export const createSubscription = async (planId, subscriber, shippingAmount, shippingAddress) => {
  try {
    const startTime = new Date().toISOString();
    const response = await axiosInstance.post('/payment/create-subscription', {
      planId,
      subscriber,
      startTime,
      shippingAmount,
      shippingAddress,
    });
    return response.data;
  } catch (error) {
    throw new Error(`Error creando subscription: ${error.response ? error.response.data.error : error.message}`);
  }
};
