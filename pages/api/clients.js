// pages/api/clients.js
import { supabaseAdmin, getUserClient } from '../../lib/supabaseServer'

export default async function handler(req, res) {
  try {
    const authHeader = req.headers.authorization
    if (!authHeader) return res.status(401).json({ error: 'Missing Authorization header' })
    const token = authHeader.replace('Bearer ', '')

    const { data: { user }, error: userError } = await supabaseAdmin.auth.getUser(token)
    if (userError || !user) return res.status(401).json({ error: 'Unauthorized' })

    const supa = getUserClient(token)

    if (req.method === 'GET') {
      const { data, error } = await supa.from('clients').select('*').eq('user_id', user.id).order('created_at', { ascending: false })
      if (error) return res.status(400).json({ error: error.message })
      return res.status(200).json(data)
    }

    if (req.method === 'POST') {
      const { company_name, brn, email, phone, contact_name } = req.body || {}
      if (!company_name || !brn || !email || !phone || !contact_name) {
        return res.status(400).json({ error: 'All fields are required' })
      }
      const { data, error } = await supa
        .from('clients')
        .insert([{ company_name, brn, email, phone, contact_name, user_id: user.id }])
        .select()
        .single()
      if (error) return res.status(400).json({ error: error.message })
      return res.status(201).json(data)
    }

    res.setHeader('Allow', ['GET', 'POST'])
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` })
  } catch (e) {
    console.error('API /clients error:', e)
    return res.status(500).json({ error: 'Internal Server Error' })
  }
}
