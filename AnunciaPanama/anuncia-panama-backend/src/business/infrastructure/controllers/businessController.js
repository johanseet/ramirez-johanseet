import { registerBusiness } from '../../application/BusinessUseCases.js';

const register = async (req, res) => {
  try {
    const businessId = await registerBusiness(req.body);
    res.status(201).json({ message: 'Comercio registrado exitosamente', businessId });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export {
  register
};
