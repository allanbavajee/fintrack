import { supabaseServer } from "../../../lib/supabaseServer";

export default async function handler(req, res) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: "Missing Authorization header" });

  const token = authHeader.replace("Bearer ", "");
  const { data: { user }, error: userError } = await supabaseServer.auth.getUser(token);
  if (userError || !user) return res.status(401).json({ error: "Unauthorized" });

  const userId = user.id;

  if (req.method === "GET") {
    const { data, error } = await supabaseServer
      .from("quotes")
      .select("*")
      .eq("user_id", userId);

    if (error) return res.status(400).json({ error });
    return res.status(200).json(data);
  }

  if (req.method === "POST") {
    const { client_id, date, description, quantity, amount, status } = req.body;

    const { data, error } = await supabaseServer
      .from("quotes")
      .insert([{ client_id, date, description, quantity, amount, status, user_id: userId }])
      .select()
      .single();

    if (error) return res.status(400).json({ error });
    return res.status(201).json(data);
  }

  res.setHeader("Allow", ["GET", "POST"]);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
