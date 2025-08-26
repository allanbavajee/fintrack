// pages/api/invoices/index.js
import { supabaseServer } from "../../../lib/supabaseServer";

export default async function handler(req, res) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: "Missing Authorization header" });

    const token = authHeader.replace("Bearer ", "");
    const { data: { user }, error: userError } = await supabaseServer.auth.getUser(token);
    if (userError || !user) return res.status(401).json({ error: "Unauthorized" });

    const userId = user.id;

    if (req.method === "GET") {
      const { data, error } = await supabaseServer
        .from("invoices")
        .select("*")
        .eq("user_id", userId);

      if (error) return res.status(400).json({ error: error.message });
      return res.status(200).json(data);
    }

    if (req.method === "POST") {
      const { client_id, date, description, quantity, amount, status } = req.body;
      if (!client_id || !date || !description) return res.status(400).json({ error: "client_id, date, and description are required" });

      const { data, error } = await supabaseServer
        .from("invoices")
        .insert([{ client_id, date, description, quantity, amount, status, user_id: userId }])
        .select()
        .single();

      if (error) return res.status(400).json({ error: error.message });
      return res.status(201).json(data);
    }

    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
}
