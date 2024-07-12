import { registerClient } from '../../application/UserUseCases.js';

const register = async (req, res) => {
  try {
    const userId = await registerClient(req.body);
    res.status(201).json({ message: 'Cliente registrado exitosamente', userId });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export {
  register
};
