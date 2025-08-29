/* fintrack/lib/supabaseServer.js */
import { createClient } from "@supabase/supabase-js";

// ⚠️ Ici on utilise la clé "service_role", uniquement côté serveur
const supabaseServer = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export { supabaseServer };
