import express from 'express';
import { loginUser, logoutUser, getSession } from '../controllers/authController.js';
import sessionCheck from '../middlewares/sessionCheck.js';

const router = express.Router();

router.post('/login', loginUser);
router.post('/logout', sessionCheck, logoutUser);
router.get('/session', sessionCheck, getSession);

export default router;
