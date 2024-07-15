import express from 'express';
import { register } from '../controllers/businessController.js';
import validateSchema from '../middlewares/validateSchema.js';

const router = express.Router();

router.post('/register', validateSchema, register);

export default router;
