import { registerBusiness, fetchBusinessTypes, registerSubscriptionCase } from '../../../application/BusinessUseCases.js';
import logger from '../../../../config/logger.js';

const register = async (req, res) => {
  try {
    const businessId = await registerBusiness(req.body);

    req.session.user = {
      id: businessId,
      username: req.body.username,
      email: req.body.email,
      role: 'business'
    };

    res.cookie('connect.sid', req.sessionID, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax'
    });

    res.status(201).json({ message: 'Comercio registrado exitosamente', businessId });
  } catch (error) {
    logger.error("Error durante ejecución del servicio:", error);
    res.status(500).json({ error: 'Internal Service Error' });
  }
};

const getBusinessTypes= async (req, res) => {
  try {
    const plans = await fetchBusinessTypes();
    res.status(200).json(plans);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const registerSubscription = async (req, res) => {
  try {
    const subscription = await registerSubscriptionCase(req.body);
    logger.debug("subscription: ", subscription)
    res.status(201).json({ message: 'Suscripción registrada exitosamente'});
  } catch (error) {
    logger.error("Error durante ejecución del servicio:", error);
    res.status(500).json({ error: 'Internal Service Error' });
  }
};

export {
  register,
  getBusinessTypes,
  registerSubscription
};
