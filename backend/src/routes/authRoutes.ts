import { Router } from 'express';
import { z } from 'zod';
import { authController } from '../controllers/authController.js';
import { validateBody } from '../middleware/validate.js';

const router = Router();

const loginSchema = z.object({
  email: z.string().email('Valid email is required'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const registerSchema = z.object({
  fullName: z.string().min(1, 'Full name is required'),
  email: z.string().email('Valid email is required'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  businessName: z.string().optional(),
  category: z.string().optional(),
});

router.post('/login', validateBody(loginSchema), authController.login);
router.post('/register', validateBody(registerSchema), authController.register);
router.get('/me', authController.me);

export default router;
