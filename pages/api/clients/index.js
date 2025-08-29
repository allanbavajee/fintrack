/*fintrack/pages/api/clients/index.js*/
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { data, error } = await supabase.from("clients").select("*");
    if (error) return res.status(400).json({ error: error.message });
    return res.status(200).json(data);
  }

  if (req.method === "POST") {
    const { company_name, brn, email, phone, contact_name } = req.body;
    const { data, error } = await supabase.from("clients").insert([{ company_name, brn, email, phone, contact_name }]);
    if (error) return res.status(400).json({ error: error.message });
    return res.status(201).json(data[0]);
  }

  res.setHeader("Allow", ["GET", "POST"]);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}
