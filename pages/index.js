import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { supabase } from '../lib/supabaseClient'

export default function Home() {
  const router = useRouter()
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      router.replace(data.user ? '/dashboard' : '/login')
    })
  }, [router])
  return <div style={{ padding: 24 }}>Loading…</div>
}
