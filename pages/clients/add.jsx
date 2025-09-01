/* pages/clients/add.jsx */
import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabaseClient";
import { useRouter } from "next/router";

export default function AddClientREST() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [session, setSession] = useState(null);
  const [message, setMessage] = useState("");
  const router = useRouter();

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
            apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
            Authorization: `Bearer ${session.access_token}`,
          },
          body: JSON.stringify({
            name,
            email,
            user_id: session.user.id,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setMessage(`Erreur : ${JSON.stringify(data)}`);
      } else {
        setMessage("✅ Client ajouté avec succès !");
        setTimeout(() => router.push("/clients"), 1500);
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
        <div>
          <label>Nom :</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email :</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit">Ajouter</button>
      </form>
    </div>
  );
}
