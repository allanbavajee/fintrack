/* fintrack/lib/supabaseClient.js */
import { createClient } from "@supabase/supabase-js";

// Clé publique (anonyme) → safe pour le frontend
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default supabase;
