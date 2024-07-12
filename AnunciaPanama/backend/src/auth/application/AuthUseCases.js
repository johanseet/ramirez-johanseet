import bcrypt from 'bcryptjs';
import { findUserByEmail } from '../../user/infrastructure/models/userModel.js';

const authenticateUser = async (email, password) => {
  const user = await findUserByEmail(email);
  if (!user) {
    throw new Error('Credenciales inválidas');
  }
  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    throw new Error('Credenciales inválidas');
  }
  return user;
};

export {
  authenticateUser
};
