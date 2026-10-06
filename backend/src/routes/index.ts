import { Router } from 'express';
import authRoutes from './authRoutes.js';
import profileRoutes from './profileRoutes.js';
import productsRoutes from './productsRoutes.js';
import ordersRoutes from './ordersRoutes.js';
import analyticsRoutes from './analyticsRoutes.js';

const apiRouter = Router();

apiRouter.use('/auth', authRoutes);
apiRouter.use('/profile', profileRoutes);
apiRouter.use('/products', productsRoutes);
apiRouter.use('/orders', ordersRoutes);
apiRouter.use('/analytics', analyticsRoutes);

export default apiRouter;
