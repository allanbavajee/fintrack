// lib/supabaseServer.js
import { createClient } from '@supabase/supabase-js'

const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const service = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!url || !service) {
  throw new Error('Missing server-side Supabase env vars (NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)')
}

// client admin (service role) — uniquement côté serveur
export const supabaseAdmin = createClient(url, service, {
  auth: { autoRefreshToken: false, persistSession: false }
})

// client "user" avec token fourni (utilisé pour respecter RLS côté API)
export const getUserClient = (accessToken) =>
  createClient(url, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY, {
    global: { headers: { Authorization: `Bearer ${accessToken}` } },
    auth: { autoRefreshToken: false, persistSession: false }
  })
