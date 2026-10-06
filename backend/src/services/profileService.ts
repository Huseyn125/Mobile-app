import { UserProfile } from '../types/index.js';
import { supabase, isSupabaseConfigured } from '../config/supabase.js';
import { MOCK_USER } from '../data/mockData.js';

let inMemoryProfile: UserProfile = { ...MOCK_USER };

export const profileService = {
  async getProfile(): Promise<UserProfile> {
    if (isSupabaseConfigured() && supabase) {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .limit(1)
        .single();

      if (error) {
        console.warn('[ProfileService] Supabase query failed, using in-memory profile:', error.message);
        return inMemoryProfile;
      }
      return {
        id: data.id,
        name: data.name,
        email: data.email,
        businessName: data.business_name,
        category: data.category,
        avatarUrl: data.avatar_url,
        joinedAt: data.created_at,
      };
    }
    return inMemoryProfile;
  },

  async updateProfile(updates: Partial<UserProfile>): Promise<UserProfile> {
    if (isSupabaseConfigured() && supabase) {
      const dbPayload: any = {};
      if (updates.name !== undefined) dbPayload.name = updates.name;
      if (updates.email !== undefined) dbPayload.email = updates.email;
      if (updates.businessName !== undefined) dbPayload.business_name = updates.businessName;
      if (updates.category !== undefined) dbPayload.category = updates.category;
      if (updates.avatarUrl !== undefined) dbPayload.avatar_url = updates.avatarUrl;
      dbPayload.updated_at = new Date().toISOString();

      const { data, error } = await supabase
        .from('profiles')
        .update(dbPayload)
        .eq('id', inMemoryProfile.id)
        .select()
        .single();

      if (!error && data) {
        return {
          id: data.id,
          name: data.name,
          email: data.email,
          businessName: data.business_name,
          category: data.category,
          avatarUrl: data.avatar_url,
          joinedAt: data.created_at,
        };
      }
    }

    inMemoryProfile = { ...inMemoryProfile, ...updates };
    return inMemoryProfile;
  },
};
