import { createClient } from '@supabase/supabase-js';

// Access environment variables using Vite's import.meta.env
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('ERROR: Missing Supabase Environment Variables. Check your .env file.');
}

// Initialize the singleton Supabase client
export const supabase = createClient(supabaseUrl || '', supabaseAnonKey || '');