import express from 'express';
import { register } from '../controllers/businessController.js';
import validateBusinessData from '../middlewares/validateBusinessData.js';

const router = express.Router();

router.post('/register', validateBusinessData, register);

export default router;
