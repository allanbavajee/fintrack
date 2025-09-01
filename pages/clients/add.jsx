/* fintrack/pages/clients/add.jsx */
import { useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function AddClient() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      // Récupère la session actuelle
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      if (sessionError || !session) {
        setMessage("You must be logged in to create a client.");
        return;
      }

      const token = session.access_token;

      // Requête POST vers Supabase REST
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/clients`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "apikey": process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
            "Authorization": `Bearer ${token}`,
            "Prefer": "return=representation" // pour retourner la ligne insérée
          },
          body: JSON.stringify({
            name,
            email,
            user_id: session.user.id  // obligatoire pour RLS
          })
        }
      );

      const data = await res.json();

      if (res.ok) {
        setMessage("Client created ✅");
        setName("");
        setEmail("");
      } else {
        setMessage("Error: " + (data.message || JSON.stringify(data)));
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setMessage("Error connecting to server");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px", maxWidth: "400px" }}>
      <input placeholder="Client Name" value={name} onChange={e => setName(e.target.value)} required />
      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
      <button type="submit">Add Client</button>
      {message && <p>{message}</p>}
    </form>
  );
}
