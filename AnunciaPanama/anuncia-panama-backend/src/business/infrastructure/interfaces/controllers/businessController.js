import { registerBusiness } from '../../../application/BusinessUseCases.js';
import logger from '../../../../config/logger.js';

const register = async (req, res) => {
  console.log("Request recibido:", req.body);
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
    logger.error("Error durante el registro del comercio:", error);
    res.status(500).json({ error: 'Internal Service Error' });
  }
};

export {
  register
};
