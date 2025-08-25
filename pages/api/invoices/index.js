import { supabase } from "@/lib/supabaseClient";

export default async function handler(req, res) {
  const userId = req.headers["x-user-id"];
  if (!userId) return res.status(400).json({ error: "Missing x-user-id header" });

  if (req.method === "GET") {
    const { data, error } = await supabase
      .from("invoices")
      .select("*")
      .eq("user_id", userId);

    if (error) return res.status(400).json({ error });
    return res.status(200).json(data);
  }

  if (req.method === "POST") {
    const { client_id, date, description, quantity, amount, status } = req.body;

    const { data, error } = await supabase
      .from("invoices")
      .insert([{ client_id, date, description, quantity, amount, status, user_id: userId }])
      .select()
      .single();

    if (error) return res.status(400).json({ error });
    return res.status(201).json(data);
  }

  res.setHeader("Allow", ["GET", "POST"]);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
