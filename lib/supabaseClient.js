/* fintrack/lib/supabaseClient.js */
import { createClient } from "@supabase/supabase-js";

// ⚠️ Variables d’environnement (à mettre dans Vercel)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
