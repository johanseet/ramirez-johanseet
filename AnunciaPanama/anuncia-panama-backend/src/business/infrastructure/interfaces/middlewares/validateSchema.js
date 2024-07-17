import Joi from 'joi';

const registerBusinessSchema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  fullName: Joi.string().required(),
  dateOfBirth: Joi.date().required(),
  gender: Joi.string().valid('male', 'female', 'other').required(),
  businessName: Joi.string().required(),
  businessTypeId: Joi.string().required(),
  businessDescription: Joi.string().optional(),
  address: Joi.string().required(),
  contactEmail: Joi.string().email().required(),
  contactPhone: Joi.string().required(),
  websiteUrl: Joi.string().uri().optional(),
  socialNetworksUrl: Joi.object().optional()
});

const registerSubscriptionSchema = Joi.object({
  businessId: Joi.string().required(),
  planId: Joi.string().required(),
  paypalSubscriptionId: Joi.string().required(),
  status: Joi.string().required(),
  statusUpdateTime: Joi.date().required(),
  startTime: Joi.date().required(),
  payerId: Joi.string().required(),
  createdAt: Joi.date().required(),
  cycleSequence: Joi.number().integer().required(),
  grossAmount: Joi.number().precision(2).required(),
  totalItemAmount: Joi.number().precision(2).required(),
  shippingAmount: Joi.number().precision(2).required(),
  taxAmount: Joi.number().precision(2).required(),
  paymentTime: Joi.date().required()
});

const validateBusinessSchema = (req, res, next) => {
  const { error } = registerBusinessSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

const validateSubscriptionSchema = (req, res, next) => {
  const { error } = registerSubscriptionSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

export {
  validateBusinessSchema,
  validateSubscriptionSchema
};
