import { supabase } from "../../../lib/supabaseClient";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { client_id, amount, status } = req.body;

    const { data, error } = await supabase
      .from("invoices")
      .insert([{ client_id, amount, status }]);

    if (error) return res.status(400).json({ error: error.message });
    return res.status(200).json({ data });
  }

  if (req.method === "GET") {
    const { data, error } = await supabase.from("invoices").select("*");
    if (error) return res.status(400).json({ error: error.message });
    return res.status(200).json({ data });
  }

  res.status(405).json({ error: "Method not allowed" });
}
