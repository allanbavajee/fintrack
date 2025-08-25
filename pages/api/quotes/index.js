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

    // Récupérer le client
    const { data: client, error: clientError } = await supabase
      .from("clients")
      .select("*")
      .eq("id", client_id)
      .single()
    if (clientError) return res.status(400).json({ error: clientError })

    // Incrémenter quote_sequence
    const newSequence = (client.quote_sequence || 0) + 1
    await supabase
      .from("clients")
      .update({ quote_sequence: newSequence })
      .eq("id", client_id)

    const quote_number = `${client.company_name.toUpperCase().slice(0,4)}/QTE/${String(newSequence).padStart(4,'0')}`
    const total = quantity * price

    const { data, error } = await supabase
      .from("quotes")
      .insert([{ client_id, date, description, quantity, price, total, quote_number, status, user_id: userId }])
      .select()
    if (error) return res.status(400).json({ error })
    return res.status(201).json(data[0])
  }

  res.status(405).json({ error: "Method not allowed" })
}
