import { Request, Response, NextFunction } from 'express';
import { analyticsService } from '../services/analyticsService.js';
import { AnalyticsPeriod } from '../types/index.js';

export const analyticsController = {
  async getDashboard(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const period = (req.query.period as AnalyticsPeriod) || '30D';
      const data = await analyticsService.getDashboard(period);
      res.json({ success: true, data });
    } catch (error) {
      next(error);
    }
  },

  async getAnalytics(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const period = (req.query.period as AnalyticsPeriod) || '30D';
      const data = await analyticsService.getAnalytics(period);
      res.json({ success: true, data });
    } catch (error) {
      next(error);
    }
  },
};
