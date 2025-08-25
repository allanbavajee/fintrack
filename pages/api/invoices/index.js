import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  const userId = req.headers["x-user-id"];

  if (!userId) {
    return res.status(401).json({ error: "Missing user ID" });
  }

  if (req.method === "GET") {
    // Récupérer toutes les factures
    const { data, error } = await supabase
      .from("invoices")
      .select("*")
      .eq("user_id", userId);

    if (error) return res.status(400).json({ error });
    return res.status(200).json(data);
  }

  if (req.method === "POST") {
    const { client_id, date, description, quantity, amount, status } = req.body;

    if (!client_id || !date || !description) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const { data, error } = await supabase
      .from("invoices")
      .insert([
        {
          user_id: userId,
          client_id,
          date,
          description,
          quantity,
          amount,   // ✅ ici on utilise "amount"
          status
        }
      ])
      .select()
      .single();

    if (error) return res.status(400).json({ error });
    return res.status(200).json(data);
  }

  return res.status(405).json({ error: "Method not allowed" });
}
