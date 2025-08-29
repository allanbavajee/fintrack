/* fintrack/pages/api/quotes/index.js */
import { supabaseServer } from "../../../lib/supabaseServer";

export default async function handler(req, res) {
  try {
    // Vérifie qu’un header Authorization est présent
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: "Missing Authorization header" });

    const token = authHeader.replace("Bearer ", "");
    
    // Récupère l’utilisateur via Supabase
    const { data: { user }, error: userError } = await supabaseServer.auth.getUser(token);
    if (userError || !user) {
      console.log("Erreur user:", userError);
      return res.status(401).json({ error: "Unauthorized" });
    }

    const userId = user.id;

    // GET → récupérer tous les devis de l’utilisateur
    if (req.method === "GET") {
      const { data, error } = await supabaseServer
        .from("quotes")
        .select("*")
        .eq("user_id", userId);

      if (error) {
        console.log("Erreur GET quotes:", error);
        return res.status(400).json({ error: error.message });
      }

      return res.status(200).json(data);
    }

    // POST → créer un nouveau devis
    if (req.method === "POST") {
      const { title, amount } = req.body;

      if (!title || !amount) {
        return res.status(400).json({ error: "Tous les champs sont requis" });
      }

      const { data, error } = await supabaseServer
        .from("quotes")
        .insert([{ title, amount, user_id: userId }])
        .select()
        .single();

      if (error) {
        console.log("Erreur POST quote:", error);
        return res.status(400).json({ error: error.message });
      }

      return res.status(201).json(data);
    }

    // Méthode non autorisée
    res.setHeader("Allow", ["GET", "POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);

  } catch (err) {
    console.log("Erreur serveur API quotes:", err.message);
    return res.status(500).json({ error: err.message });
  }
}
