import { createProduct, createPlan, createSubscription } from '../infrastructure/services/paypalService.js';
import { saveSubscription } from '../infrastructure/models/subscriptionModel.js';
import logger from '../../config/logger.js';

const createProductAndPlan = async (name, description, planName, price) => {
  const productId = await createProduct(name, description);
  const planId = await createPlan(productId, planName, price);
  return planId;
};

const handleCreateSubscription = async (planId, subscriber, startTime, shippingAmount, shippingAddress) => {
  try{
  const rSaveSubscription = await createSubscription(subscriptionData);
  logger.debug("Respuesta de saveSubscription:", rSaveSubscription)
  return subscription;
}catch(error){
  logger.error("Error durante ejecución del handleCreateSubscription:", error);
}
};

export {
  createProductAndPlan,
  handleCreateSubscription
};
