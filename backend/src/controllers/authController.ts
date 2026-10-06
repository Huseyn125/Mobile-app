import { Request, Response, NextFunction } from 'express';
import { supabase, isSupabaseConfigured } from '../config/supabase.js';
import { profileService } from '../services/profileService.js';

export const authController = {
  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, password } = req.body;

      if (isSupabaseConfigured() && supabase) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          res.status(401).json({ success: false, error: error.message });
          return;
        }

        const profile = await profileService.getProfile();
        res.json({
          success: true,
          data: {
            session: data.session,
            user: profile,
          },
          message: 'Logged in successfully',
        });
        return;
      }

      // Offline / Development fallback
      const profile = await profileService.getProfile();
      res.json({
        success: true,
        data: {
          token: `mock-jwt-token-${Date.now()}`,
          user: { ...profile, email: email || profile.email },
        },
        message: 'Logged in successfully (Dev Mode)',
      });
    } catch (error) {
      next(error);
    }
  },

  async register(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { fullName, email, password, businessName, category } = req.body;

      if (isSupabaseConfigured() && supabase) {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              name: fullName,
              business_name: businessName,
              category,
            },
          },
        });

        if (error) {
          res.status(400).json({ success: false, error: error.message });
          return;
        }

        res.status(201).json({
          success: true,
          data: { session: data.session, user: data.user },
          message: 'Registration successful',
        });
        return;
      }

      // Offline / Development fallback
      const updatedProfile = await profileService.updateProfile({
        name: fullName,
        email,
        businessName: businessName || 'Nova Store',
        category: category || 'Retail',
      });

      res.status(201).json({
        success: true,
        data: {
          token: `mock-jwt-token-${Date.now()}`,
          user: updatedProfile,
        },
        message: 'Account registered successfully (Dev Mode)',
      });
    } catch (error) {
      next(error);
    }
  },

  async me(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const profile = await profileService.getProfile();
      res.json({ success: true, data: profile });
    } catch (error) {
      next(error);
    }
  },
};
