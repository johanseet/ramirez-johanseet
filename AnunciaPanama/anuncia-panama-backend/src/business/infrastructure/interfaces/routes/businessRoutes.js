import express from 'express';
import { register, getBusinessTypes } from '../controllers/businessController.js';
import validateSchema from '../middlewares/validateSchema.js';

const router = express.Router();

router.post('/register', validateSchema, register);
router.get('/types', getBusinessTypes);

export default router;
