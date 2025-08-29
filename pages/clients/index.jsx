/* fintrack/pages/api/clients/index.js */
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
      const { data, error } = await supabaseServer.from("clients").select("*").eq("user_id", userId);
      if (error) return res.status(400).json({ error: error.message });
      return res.status(200).json(data);
    }

    if (req.method === "POST") {
      const { company_name, brn, email, phone, contact_name } = req.body;
      if (!company_name || !brn || !email || !phone || !contact_name) {
        return res.status(400).json({ error: "Tous les champs sont requis" });
      }

      const { data, error } = await supabaseServer
        .from("clients")
        .insert([{ company_name, brn, email, phone, contact_name, user_id: userId }])
        .select()
        .single();

      if (error) return res.status(400).json({ error: error.message });
      return res.status(201).json(data);
    }

    res.setHeader("Allow", ["GET", "POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);

  } catch (err) {
    console.log("Erreur serveur API clients:", err.message);
    return res.status(500).json({ error: err.message });
  }
}
