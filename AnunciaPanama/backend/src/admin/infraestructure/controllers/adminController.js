import { registerAdmin } from '../../application/AdminUseCases.js';

const register = async (req, res) => {
  try {
    const adminId = await registerAdmin(req.body);
    res.status(201).json({ message: 'Administrador registrado exitosamente', adminId });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export {
  register
};
