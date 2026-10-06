import { Request, Response, NextFunction } from 'express';
import { profileService } from '../services/profileService.js';

export const profileController = {
  async getProfile(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const profile = await profileService.getProfile();
      res.json({ success: true, data: profile });
    } catch (error) {
      next(error);
    }
  },

  async updateProfile(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const updated = await profileService.updateProfile(req.body);
      res.json({ success: true, data: updated, message: 'Profile updated successfully' });
    } catch (error) {
      next(error);
    }
  },
};
