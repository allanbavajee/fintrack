// pages/api/quotes/index.js
import { supabase } from "@/lib/supabaseClient";

export default async function handler(req, res) {
  try {
    // Récupérer le token depuis le header Authorization
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ error: "Missing Authorization header" });

    // Vérifier le token et récupérer l'utilisateur
    const { data: { user }, error: userError } = await supabase.auth.getUser(token);
    if (userError || !user) return res.status(401).json({ error: "Unauthorized" });

    // GET : récupérer toutes les quotes de l'utilisateur
    if (req.method === "GET") {
      const { data, error } = await supabase
        .from("quotes")
        .select("*")
        .eq("user_id", user.id);

      if (error) return res.status(400).json({ error });
      return res.status(200).json(data);
    }

    // POST : créer une nouvelle quote
    if (req.method === "POST") {
      const { client_id, date, description, quantity, amount, status } = req.body;

      const { data, error } = await supabase
        .from("quotes")
        .insert([{
          client_id,
          date,
          description,
          quantity,
          amount,
          status,
          user_id: user.id
        }])
        .select()
        .single();

      if (error) return res.status(400).json({ error });
      return res.status(201).json(data);
    }

    // Méthode non autorisée
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
}
