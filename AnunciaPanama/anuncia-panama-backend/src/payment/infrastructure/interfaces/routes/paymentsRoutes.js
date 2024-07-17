import express from 'express';
import { createProductAndPlanHandler, createSubscriptionHandler } from '../controllers/paymentController.js';

const router = express.Router();

router.post('/create-product-plan', createProductAndPlanHandler);
router.post('/create-subscription', createSubscriptionHandler);

export default router;
