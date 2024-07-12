import { Router } from 'express';
import authRoutes from './auth/infrastructure/routes/authRoutes.js';
import userRoutes from './user/infrastructure/routes/userRoutes.js';
import businessRoutes from './business/infrastructure/routes/businessRoutes.js';
import paymentRoutes from './payment/infrastructure/routes/paymentsRoutes.js';
import planRoutes from './plan/infrastructure/routes/planRoutes.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/business', businessRoutes);
router.use('/payment', paymentRoutes);
router.use('/plans', planRoutes);

export default router;

