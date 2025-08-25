import { supabase } from "@/lib/supabaseClient"

export default async function handler(req, res) {
  const userId = req.headers["x-user-id"] || "demo-user"

  if (req.method === "GET") {
    const { data, error } = await supabase
      .from("clients")
      .select("*")
      .eq("user_id", userId)

    if (error) return res.status(400).json({ error })
    return res.status(200).json(data)
  }

  if (req.method === "POST") {
    const { company_name, contact_name, email, phone } = req.body

    const { data, error } = await supabase.from("clients").select("*")
      .insert([{ company_name, contact_name, email, phone, user_id: userId }])
      .select()

    if (error) return res.status(400).json({ error })
    return res.status(201).json(data[0])
  }

  res.status(405).json({ error: "Method not allowed" })
}
