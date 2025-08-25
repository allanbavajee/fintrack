import { supabase } from "@/lib/supabaseClient";

export default async function handler(req, res) {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ error: "Missing Authorization header" });

    const { data: { user }, error: userError } = await supabase.auth.getUser(token);
    if (userError || !user) return res.status(401).json({ error: "Unauthorized" });

    if (req.method === "GET") {
      const { data, error } = await supabase
        .from("invoices")
        .select("*")
        .eq("user_id", user.id);

      if (error) return res.status(400).json({ error });
      return res.status(200).json(data);
    }

    if (req.method === "POST") {
      const { quote_id, client_id, date, amount, status } = req.body;

      const { data, error } = await supabase
        .from("invoices")
        .insert([{
          quote_id,
          client_id,
          date,
          amount,
          status,
          user_id: user.id
        }])
        .select()
        .single();

      if (error) return res.status(400).json({ error });
      return res.status(201).json(data);
    }

    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
}
