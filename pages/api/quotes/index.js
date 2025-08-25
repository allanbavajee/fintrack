import { supabase } from "@/lib/supabaseClient"

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { data, error } = await supabase
      .from("quotes")
      .select("*")
      .limit(20) // limite pour éviter surcharge

    if (error) return res.status(400).json({ error })
    return res.status(200).json(data)
  }

  if (req.method === "POST") {
    const { client_id, amount, status } = req.body
    const { data, error } = await supabase
      .from("quotes")
      .insert([{ client_id, amount, status }])

    if (error) return res.status(400).json({ error })
    return res.status(201).json(data)
  }

  return res.status(405).json({ error: "Method not allowed" })
}
