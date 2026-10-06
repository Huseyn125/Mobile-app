import { Router } from 'express';
import { z } from 'zod';
import { productsController } from '../controllers/productsController.js';
import { validateBody } from '../middleware/validate.js';

const router = Router();

const createProductSchema = z.object({
  name: z.string().min(1, 'Product name is required'),
  description: z.string().optional().default(''),
  price: z.number().positive('Price must be greater than 0'),
  category: z.string().min(1, 'Category is required'),
  stock: z.number().int().nonnegative('Stock must be non-negative'),
  image: z.string().optional(),
});

const updateProductSchema = createProductSchema.partial();

router.get('/', productsController.getAll);
router.get('/:id', productsController.getById);
router.post('/', validateBody(createProductSchema), productsController.create);
router.put('/:id', validateBody(updateProductSchema), productsController.update);
router.delete('/:id', productsController.delete);

export default router;
