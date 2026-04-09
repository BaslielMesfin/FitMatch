import { createClient } from '@supabase/supabase-js'

// Direct connection to your Supabase project
// Using environment variables with hardcoded fallbacks to ensure the app never "silent-fails"
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Missing Supabase Environment Variables. Check your .env file.")
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
