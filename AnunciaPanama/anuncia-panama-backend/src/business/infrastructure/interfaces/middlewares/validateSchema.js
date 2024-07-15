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

const validateSchema = (req, res, next) => {
  const { error } = registerBusinessSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

export default validateSchema;
