import express from 'express';
import { register } from '../controllers/userController.js';
import validateUserData from '../middlewares/validateUserData.js';

const router = express.Router();

router.post('/register', validateUserData, register);

export default router;
