import { supabase } from "@/lib/supabaseClient"

export default async function handler(req, res) {
  const userId = req.headers["x-user-id"] || "demo-user"

  if (req.method === "GET") {
    const { data, error } = await supabase
      .from("invoices")
      .select("*")
      .eq("user_id", userId)

    if (error) return res.status(400).json({ error })
    return res.status(200).json(data)
  }

  if (req.method === "POST") {
    const { quote_id, client_id, date, description, quantity, price, status } = req.body

    if (!client_id) return res.status(400).json({ error: { message: "client_id is required" } })
    if (!date || !description) return res.status(400).json({ error: { message: "date and description are required" } })

    // Vérifier compteur gratuit
    const { data: usage } = await supabase
      .from("usage_counters")
      .select("*")
      .eq("user_id", userId)
      .single()

    if (usage && usage.invoices_count >= 15) {
      return res.status(403).json({ error: { message: "Free limit reached (15 invoices)" } })
    }

    // Calcul total
    const total = (quantity || 0) * (price || 0)

    // Création de l’invoice
    const { data, error } = await supabase
      .from("invoices")
      .insert([{ quote_id, client_id, date, description, quantity, price, total, status, user_id: userId }])
      .select()

    if (error) return res.status(400).json({ error })

    // Mettre à jour compteur
    if (usage) {
      await supabase
        .from("usage_counters")
        .update({ invoices_count: usage.invoices_count + 1 })
        .eq("user_id", userId)
    } else {
      await supabase
        .from("usage_counters")
        .insert([{ user_id: userId, quotes_count: 0, invoices_count: 1 }])
    }

    return res.status(201).json(data[0])
  }

  res.status(405).json({ error: { message: "Method not allowed" } })
}
