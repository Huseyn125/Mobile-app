import { Router } from 'express';
import { z } from 'zod';
import { ordersController } from '../controllers/ordersController.js';
import { validateBody } from '../middleware/validate.js';

const router = Router();

const updateStatusSchema = z.object({
  status: z.enum(['Pending', 'Confirmed', 'Processing', 'Completed', 'Cancelled']),
});

router.get('/', ordersController.getAll);
router.get('/:id', ordersController.getById);
router.patch('/:id/status', validateBody(updateStatusSchema), ordersController.updateStatus);

export default router;
