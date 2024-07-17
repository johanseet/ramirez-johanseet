import express from 'express';
import { getPlans, getPlanByPayPalId } from '../controllers/planController.js';

const router = express.Router();

router.get('/', getPlans);
router.get('/:paypalId', getPlanByPayPalId);

export default router;
