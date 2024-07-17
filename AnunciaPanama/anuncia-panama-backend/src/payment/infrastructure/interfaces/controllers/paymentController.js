import { createProductAndPlan, handleCreateSubscription } from '../../../application/PaymentUseCases.js';
import logger from '../../../../config/logger.js';

const createProductAndPlanHandler = async (req, res) => {
  const { name, description, planName, price } = req.body;
  try {
    const planId = await createProductAndPlan(name, description, planName, price);
    res.status(201).json({ planId });
  } catch (error) {
    logger.error("Error durante ejecución del servicio:", error);
    res.status(500).json({ error: error.message });
  }
};

const createSubscriptionHandler = async (req, res) => {
  const { planId, subscriber, startTime, shippingAmount, shippingAddress } = req.body;
  logger.debug(planId)
  try {
    const subscription = await handleCreateSubscription(planId, subscriber, startTime, shippingAmount, shippingAddress);
    res.status(201).json({ subscription });
  } catch (error) {
    logger.error("Error durante ejecución del servicio:", error);
    res.status(500).json({ error: error.message });
  }
};

export {
  createProductAndPlanHandler,
  createSubscriptionHandler
};
