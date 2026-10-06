import { Router } from 'express';
import { z } from 'zod';
import { profileController } from '../controllers/profileController.js';
import { validateBody } from '../middleware/validate.js';

const router = Router();

const updateProfileSchema = z.object({
  name: z.string().optional(),
  email: z.string().email().optional(),
  businessName: z.string().optional(),
  category: z.string().optional(),
  avatarUrl: z.string().optional(),
});

router.get('/', profileController.getProfile);
router.put('/', validateBody(updateProfileSchema), profileController.updateProfile);

export default router;
