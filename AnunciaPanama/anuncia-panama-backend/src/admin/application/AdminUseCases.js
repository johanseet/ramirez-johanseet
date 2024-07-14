import bcrypt from 'bcryptjs';
import { createUser, findUserByEmail } from '../../auth/infrastructure/models/userModel.js';
import { createAdminData } from '../infrastructure/models/administratorModel.js';
import Admin from '../domain/Admin.js';

const registerAdmin = async (adminDetails) => {
  const { username, email, password, fullName, phoneNumber } = adminDetails;

  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    throw new Error('El email ya está registrado');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await createUser({ email, password: hashedPassword, role: 'administrator', username });

  const admin = new Admin(user.id, fullName, phoneNumber, new Date());
  await createAdminData(admin);

  return user.id;
};

export {
  registerAdmin
};
