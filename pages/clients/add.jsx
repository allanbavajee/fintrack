import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function AddClient() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [session, setSession] = useState(null);
  const [message, setMessage] = useState("");

  // Récupérer la session au chargement de la page
  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
    };
    getSession();

    // Écouter les changements de session
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

    const { data, error } = await supabase
      .from("clients")
      .insert([
        {
          name,
          email,
          user_id: session.user.id, // obligatoire pour RLS
        },
      ]);

    if (error) {
      setMessage(`Erreur : ${error.message}`);
    } else {
      setMessage("Client ajouté avec succès !");
      setName("");
      setEmail("");
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
