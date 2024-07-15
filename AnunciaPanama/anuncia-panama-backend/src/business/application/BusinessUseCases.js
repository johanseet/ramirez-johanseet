import bcrypt from 'bcryptjs';
import { findUserByEmail, findUserByUsername } from '../infrastructure/models/userModel.js';
import { registerBusinessTransaction } from '../infrastructure/models/transactionModel.js';
import { fetchBusinessTypesFromDB } from '../infrastructure/models/businessTypesModel.js';
import Client from '../domain/Client.js';
import Business from '../domain/Business.js';
import BusinessType from '../domain/BusinessType.js'
import User from '../domain/User.js';
import logger from '../../config/logger.js';

const registerBusiness = async (businessDetails) => {
  const {
    username, email, password, fullName, dateOfBirth, gender,
    businessName, businessTypeId, businessDescription, address, contactEmail,
    contactPhone, websiteUrl, socialNetworksUrl
  } = businessDetails;

  try {
  const existingUser = await findUserByUsername(username);
  if (existingUser) {
    logger.debug("El usuario ya está registrado");
    throw new Error('El usuario ya está registrado');
  }

  const existingEmail = await findUserByEmail(email);
  if (existingEmail) {
    logger.debug("El email ya está registrado");
    throw new Error('El email ya está registrado');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User(email, hashedPassword, 'business', username);
  const client = new Client(fullName, dateOfBirth, gender);
  const business = new Business(businessTypeId, businessName, businessDescription, address, contactEmail, contactPhone, websiteUrl, socialNetworksUrl);

  return await registerBusinessTransaction(user, client, business);
} catch (error) {
  logger.error("Error durante el registro del negocio:", error);
  throw new Error('Error durante el registro del negocio');
}
};

const fetchBusinessTypes = async () => {
  const businessTypeData = await fetchBusinessTypesFromDB();
  return businessTypeData.map(type => new BusinessType(type.id, type.name, type.description));
};

export {
  registerBusiness,
  fetchBusinessTypes
};
