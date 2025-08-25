import { supabase } from "@/lib/supabaseClient";

export default async function handler(req, res) {
  const userId = req.headers["x-user-id"];

  if (!userId) return res.status(400).json({ error: "Missing x-user-id header" });

  if (req.method === "GET") {
    const { data, error } = await supabase
      .from("clients")
      .select("*")
      .eq("user_id", userId);

    if (error) return res.status(400).json({ error });
    return res.status(200).json(data);
  }

  if (req.method === "POST") {
    const { company_name, brn, email, phone, contact_name } = req.body;

    const { data, error } = await supabase
      .from("clients")
      .insert([{ company_name, brn, email, phone, contact_name, user_id: userId }])
      .select()
      .single();

    if (error) return res.status(400).json({ error });
    return res.status(201).json(data);
  }

  res.setHeader("Allow", ["GET", "POST"]);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
