/* pages/quotes/add.jsx */
import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabaseClient";
import { useRouter } from "next/router";

export default function AddQuote() {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [clients, setClients] = useState([]);
  const [clientId, setClientId] = useState("");
  const [session, setSession] = useState(null);
  const [message, setMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      if (session) fetchClients(session);
    };
    getSession();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        if (session) fetchClients(session);
      }
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  const fetchClients = async (session) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/clients?select=id,name`,
      {
        headers: {
          apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
          Authorization: `Bearer ${session.access_token}`,
        },
      }
    );
    const data = await res.json();
    if (res.ok) setClients(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!session) {
      setMessage("Vous devez être connecté pour créer un devis.");
      return;
    }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/quotes`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
            Authorization: `Bearer ${session.access_token}`,
          },
          body: JSON.stringify({
            description,
            amount,
            client_id: clientId,
            user_id: session.user.id,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setMessage(`Erreur : ${JSON.stringify(data)}`);
      } else {
        setMessage("✅ Devis créé avec succès !");
        setTimeout(() => router.push("/quotes"), 1500);
      }
    } catch (err) {
      setMessage(`Erreur : ${err.message}`);
    }
  };

  if (!session) return <p>Vous devez être connecté.</p>;

  return (
    <div style={{ maxWidth: "500px", margin: "0 auto" }}>
      <h2>Créer un devis</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Client :</label>
          <select
            value={clientId}
            onChange={(e) => setClientId(e.target.value)}
            required
          >
            <option value="">-- Choisir un client --</option>
            {clients.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Description :</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Montant (€) :</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <button type="submit">Créer</button>
      </form>
    </div>
  );
}
