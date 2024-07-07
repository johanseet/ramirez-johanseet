import express from 'express';
import { registerAdmin, registerClient, registerBusiness, loginUser, logoutUser, getSession } from '../controllers/authController.js';

const router = express.Router();

router.post('/register/admin', registerAdmin);
router.post('/register/client', registerClient);
router.post('/register/business', registerBusiness);
router.post('/login', loginUser);
router.get('/logout', logoutUser);
router.get('/session', getSession);

export default router;
