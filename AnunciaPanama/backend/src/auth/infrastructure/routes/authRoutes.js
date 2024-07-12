import express from 'express';
import { loginUser, logoutUser, getSession } from '../controllers/authController.js';

const router = express.Router();

router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.get('/session', getSession);

export default router;
