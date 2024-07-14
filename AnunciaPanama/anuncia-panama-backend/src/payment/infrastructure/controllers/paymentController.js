import { createPayPalSubscription } from '../../application/paymentUseCases.js';

const createSubscription = async (req, res) => {
  try {
    const { businessId, planId } = req.body;
    const subscription = await createPayPalSubscription(businessId, planId);
    res.status(201).json({ message: 'Suscripción creada exitosamente', subscription });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export {
  createSubscription
};
