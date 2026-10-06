import { Request, Response, NextFunction } from 'express';
import { productsService } from '../services/productsService.js';

export const productsController = {
  async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const products = await productsService.getAll();
      res.json({ success: true, data: products });
    } catch (error) {
      next(error);
    }
  },

  async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const product = await productsService.getById(req.params.id);
      if (!product) {
        res.status(404).json({ success: false, error: 'Product not found' });
        return;
      }
      res.json({ success: true, data: product });
    } catch (error) {
      next(error);
    }
  },

  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const created = await productsService.create(req.body);
      res.status(201).json({ success: true, data: created });
    } catch (error) {
      next(error);
    }
  },

  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const updated = await productsService.update(req.params.id, req.body);
      if (!updated) {
        res.status(404).json({ success: false, error: 'Product not found' });
        return;
      }
      res.json({ success: true, data: updated });
    } catch (error) {
      next(error);
    }
  },

  async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const success = await productsService.delete(req.params.id);
      if (!success) {
        res.status(404).json({ success: false, error: 'Product not found' });
        return;
      }
      res.json({ success: true, message: 'Product deleted successfully' });
    } catch (error) {
      next(error);
    }
  },
};
