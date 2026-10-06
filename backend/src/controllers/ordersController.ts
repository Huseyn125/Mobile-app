import { Request, Response, NextFunction } from 'express';
import { ordersService } from '../services/ordersService.js';

export const ordersController = {
  async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const orders = await ordersService.getAll();
      res.json({ success: true, data: orders });
    } catch (error) {
      next(error);
    }
  },

  async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const order = await ordersService.getById(req.params.id);
      if (!order) {
        res.status(404).json({ success: false, error: 'Order not found' });
        return;
      }
      res.json({ success: true, data: order });
    } catch (error) {
      next(error);
    }
  },

  async updateStatus(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { status } = req.body;
      const updated = await ordersService.updateStatus(req.params.id, status);
      if (!updated) {
        res.status(404).json({ success: false, error: 'Order not found' });
        return;
      }
      res.json({ success: true, data: updated });
    } catch (error) {
      next(error);
    }
  },
};
