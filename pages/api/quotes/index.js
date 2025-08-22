import { supabase } from "../../../lib/supabaseClient"

export default async function handler(req, res) {
  const userId = req.headers["x-user-id"] || "demo-user"

  if (req.method === "GET") {
    const { data, error } = await supabase.from("quotes").select("*").eq("user_id", userId)
    if (error) return res.status(400).json({ error })
    return res.status(200).json(data)
  }

  if (req.method === "POST") {
    // Vérifier compteur
    const { data: usage } = await supabase
      .from("usage_counters")
      .select("*")
      .eq("user_id", userId)
      .single()

    if (usage && usage.quotes_count >= 15) {
      return res.status(403).json({ error: "Free limit reached (15 quotes)" })
    }

    const { client_id, total, status } = req.body

    const { data, error } = await supabase
      .from("quotes")
      .insert([{ client_id, total, status, user_id: userId }])
      .select()

    if (error) return res.status(400).json({ error })

    // Update compteur
    if (usage) {
      await supabase
        .from("usage_counters")
        .update({ quotes_count: usage.quotes_count + 1 })
        .eq("user_id", userId)
    } else {
      await supabase
        .from("usage_counters")
        .insert([{ user_id: userId, quotes_count: 1, invoices_count: 0 }])
    }

    return res.status(201).json(data[0])
  }

  res.status(405).json({ error: "Method not allowed" })
}
