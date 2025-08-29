/* fintrack/pages/api/clients/index.js */
import { supabaseServer } from "../../../lib/supabaseServer"; // serveur uniquement

export default async function handler(req, res) {
  try {
    if (req.method === "GET") {
      const { data, error } = await supabaseServer.from("clients").select("*");
      if (error) return res.status(400).json({ error: error.message });
      return res.status(200).json(data);
    }

    if (req.method === "POST") {
      const { name, email } = req.body;
      if (!name || !email) {
        return res.status(400).json({ error: "Nom et email sont requis" });
      }

      const { data, error } = await supabaseServer
        .from("clients")
        .insert([{ name, email }])
        .select()
        .single();

      if (error) return res.status(400).json({ error: error.message });
      return res.status(201).json(data);
    }

    res.setHeader("Allow", ["GET", "POST"]);
    return res.status(405).end(`Méthode ${req.method} non autorisée`);
  } catch (err) {
    console.error("Erreur API clients:", err.message);
    return res.status(500).json({ error: "Erreur serveur" });
  }
}
