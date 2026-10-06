import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { ENV } from './env.js';

let supabaseClient: SupabaseClient | null = null;

if (ENV.SUPABASE_URL && ENV.SUPABASE_ANON_KEY) {
  try {
    supabaseClient = createClient(ENV.SUPABASE_URL, ENV.SUPABASE_ANON_KEY);
    console.log('[Supabase] Client initialized successfully.');
  } catch (error) {
    console.warn('[Supabase] Failed to initialize Supabase client:', error);
  }
} else {
  console.log('[Supabase] Credentials not set in .env. Running in offline/in-memory mode for development.');
}

export const supabase = supabaseClient;
export const isSupabaseConfigured = (): boolean => Boolean(supabaseClient);
