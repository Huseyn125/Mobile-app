import { Router } from 'express';
import { analyticsController } from '../controllers/analyticsController.js';

const router = Router();

router.get('/dashboard', analyticsController.getDashboard);
router.get('/', analyticsController.getAnalytics);

export default router;
