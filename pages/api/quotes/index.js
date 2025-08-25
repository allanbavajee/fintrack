import { supabase } from "@/lib/supabaseClient"

export default async function handler(req, res) {
  const userId = req.headers["x-user-id"] || "demo-user"

  if (req.method === "GET") {
    const { data, error } = await supabase
      .from("quotes")
      .select("*")
      .eq("user_id", userId)

    if (error) return res.status(400).json({ error })
    return res.status(200).json(data)
  }

  if (req.method === "POST") {
    const { client_id, date, description, quantity, price, status } = req.body

    // Vérification simple
    if (!client_id) return res.status(400).json({ error: { message: "client_id is required" } })
    if (!date || !description) return res.status(400).json({ error: { message: "date and description are required" } })

    // Vérifier le compteur gratuit
    const { data: usage } = await supabase
      .from("usage_counters")
      .select("*")
      .eq("user_id", userId)
      .single()

    if (usage && usage.quotes_count >= 15) {
      return res.status(403).json({ error: { message: "Free limit reached (15 quotes)" } })
    }

    const total = (quantity || 0) * (price || 0)

    const { data, error } = await supabase
      .from("quotes")
      .insert([{ client_id, date, description, quantity, price, total, status, user_id: userId }])
      .select()

    if (error) return res.status(400).json({ error })

    // Mettre à jour le compteur
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

  res.status(405).json({ error: { message: "Method not allowed" } })
}
