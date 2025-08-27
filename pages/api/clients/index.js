import { supabase } from "../../../lib/supabaseClient";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { company_name, brn, email, phone, contact_name } = req.body;

    const { data, error } = await supabase
      .from("clients")
      .insert([{ company_name, brn, email, phone, contact_name }]);

    if (error) return res.status(400).json({ error: error.message });
    return res.status(200).json({ data });
  }

  if (req.method === "GET") {
    const { data, error } = await supabase.from("clients").select("*");
    if (error) return res.status(400).json({ error: error.message });
    return res.status(200).json({ data });
  }

  res.status(405).json({ error: "Method not allowed" });
}
