import bcrypt from 'bcryptjs';
import { createUser, findUserByEmail } from '../../business/infrastructure/models/userModel.js';
import { createBusinessData, linkSubscriptionToBusiness } from '../infrastructure/models/businessModel.js';
import Business from '../domain/Business.js';
import { createPayPalSubscription } from '../../payment/application/paymentUseCases.js';

const registerBusiness = async (businessDetails) => {
  const { username, email, password, fullName, businessTypeId, name, description, address, contactEmail, contactPhone, websiteUrl, logoUrl, planId } = businessDetails;

  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    throw new Error('El email ya está registrado');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await createUser({ email, password: hashedPassword, role: 'business', username });

  const businessData = new Business(user.id, businessTypeId, fullName, name, description, address, contactEmail, contactPhone, websiteUrl, logoUrl, null, new Date());

  await createBusinessData(businessData);

  if (planId !== 'freemium') {
    const subscription = await createPayPalSubscription(user.id, planId);
    await linkSubscriptionToBusiness(user.id, subscription.id);
  }

  return user.id;
};

export {
  registerBusiness
};
