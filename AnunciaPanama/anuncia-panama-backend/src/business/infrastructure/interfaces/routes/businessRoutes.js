import express from 'express';
import { register, getBusinessTypes, registerSubscription } from '../controllers/businessController.js';
import { validateBusinessSchema, validateSubscriptionSchema } from '../middlewares/validateSchema.js';

const router = express.Router();

router.post('/register', validateBusinessSchema, register);
router.post('/register/subscription', validateSubscriptionSchema, registerSubscription);
router.get('/types', getBusinessTypes);

export default router;
