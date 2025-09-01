/* pages/clients/add.jsx */
import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function AddClientREST() {
  const [session, setSession] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
    };
    getSession();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => setSession(session)
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!session) {
      setMessage("Vous devez être connecté pour ajouter un client.");
      return;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/clients`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "apikey": process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
            "Authorization": `Bearer ${session.access_token}`,
            "Prefer": "return=representation"
          },
          body: JSON.stringify({
            name,
            email,
            user_id: session.user.id,
          }),
        }
      );

      let data;
      try { data = await response.json(); } catch { data = null; }

      if (!response.ok) setMessage(`Erreur : ${JSON.stringify(data) || response.statusText}`);
      else {
        setMessage("Client ajouté avec succès !");
        setName("");
        setEmail("");
      }
    } catch (error) {
      setMessage(`Erreur : ${error.message}`);
    }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "0 auto" }}>
      <h2>Ajouter un client</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Nom" value={name} onChange={e => setName(e.target.value)} required />
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
        <button type="submit">Ajouter</button>
      </form>
    </div>
  );
}
