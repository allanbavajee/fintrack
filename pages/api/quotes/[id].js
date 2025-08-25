import { supabase } from "@/lib/supabaseClient"

export default async function handler(req, res) {
  const userId = req.headers["x-user-id"] || "demo-user"
  const { id } = req.query

  if (req.method === "GET") {
    const { data, error } = await supabase
      .from("quotes")
      .select("*")
      .eq("id", id)
      .eq("user_id", userId)
      .single()
    if (error) return res.status(400).json({ error })
    return res.status(200).json(data)
  }

  if (req.method === "PUT") {
    const { date, description, quantity, price, status } = req.body
    const { data, error } = await supabase
      .from("quotes")
      .update({ date, description, quantity, price, total: quantity*price, status })
      .eq("id", id)
      .eq("user_id", userId)
      .select()
    if (error) return res.status(400).json({ error })
    return res.status(200).json(data[0])
  }

  if (req.method === "DELETE") {
    const { error } = await supabase
      .from("quotes")
      .delete()
      .eq("id", id)
      .eq("user_id", userId)
    if (error) return res.status(400).json({ error })
    return res.status(204).end()
  }

  res.status(405).json({ error: "Method not allowed" })
}
