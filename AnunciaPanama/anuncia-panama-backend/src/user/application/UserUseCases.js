import bcrypt from 'bcryptjs';
import { createUser, findUserByEmail,findUserByUsername } from '../infrastructure/models/userModel.js';
import { createClientData } from '../infrastructure/models/clientModel.js';
import User from '../domain/User.js';
import Client from '../domain/Client.js';

const registerClient = async (clientDetails) => {
  const { username, email, password, fullName, dateOfBirth, gender } = clientDetails;

  const existingUser = await findUserByUsername(username);
  if (existingUser) {
    throw new Error('El usuario ya está registrado');
  }

  const existingEmail = await findUserByEmail(email);
  if (existingEmail) {
    throw new Error('El email ya está registrado');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User(null, email, hashedPassword, 'client', username, new Date());
  const createdUser = await createUser(user);
  console.log("***************", createdUser);

  const client = new Client(createdUser, fullName, dateOfBirth, gender, new Date());
  console.log("client", client);
  await createClientData(client);

  return createdUser.id;
};

export {
  registerClient
};
