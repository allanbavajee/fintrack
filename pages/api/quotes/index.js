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
if (req.method === "POST") {
  const { client_id, date, description, quantity, price, status } = req.body

  // 1. Récupérer le client pour incrémenter quote_sequence
  const { data: client, error: clientError } = await supabase
    .from("clients")
    .select("*")
    .eq("id", client_id)
    .single()
  if (clientError) return res.status(400).json({ error: clientError })

  // 2. Incrémenter la séquence
  const newSequence = (client.quote_sequence || 0) + 1
  await supabase
    .from("clients")
    .update({ quote_sequence: newSequence })
    .eq("id", client_id)

  // 3. Générer le quote_number
  const quote_number = `${client.company_name.toUpperCase().slice(0,4)}/QTE/${String(newSequence).padStart(4,'0')}`

  // 4. Calculer total
  const total = quantity * price

  // 5. Créer le quote
  const { data, error } = await supabase
    .from("quotes")
    .insert([{
      client_id,
      date,
      description,
      quantity,
      price,
      total,
      quote_number,
      status,
      user_id: userId
    }])
    .select()

  if (error) return res.status(400).json({ error })

  return res.status(201).json(data[0])
}
