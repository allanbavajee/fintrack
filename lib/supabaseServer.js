/* fintrack/lib/supabaseServer.js */
import { createClient } from "@supabase/supabase-js";

// Ces variables viennent de tes paramètres Vercel (Environment Variables)
const supabaseServer = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY // ⚠️ pas la clé publique, mais bien Service Role
);

export { supabaseServer };
