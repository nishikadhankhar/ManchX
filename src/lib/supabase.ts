import { createClient } from '@supabase/supabase-js';

// These will be populated when you create your .env file
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Helper to validate URL format to prevent crashes
const isValidUrl = (url: string) => {
  try {
    return url && url.startsWith('http') && !url.includes('YOUR_API_KEY') && !url.includes('****');
  } catch {
    return false;
  }
};

// Export the client only if keys exist AND are valid, otherwise export null
// This allows the app to run in "Demo Mode" without crashing on placeholders
export const supabase = (isValidUrl(supabaseUrl) && supabaseAnonKey) 
  ? createClient(supabaseUrl, supabaseAnonKey) 
  : null;

export const isSupabaseConfigured = !!supabase;
