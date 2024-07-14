import Joi from 'joi';

const businessSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  address: Joi.string().required(),
  contactEmail: Joi.string().email().required(),
  contactPhone: Joi.string().required(),
  websiteUrl: Joi.string().uri().optional(),
  logoUrl: Joi.string().uri().optional()
});

const validateBusinessData = (req, res, next) => {
  const { error } = businessSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

export default validateBusinessData;
