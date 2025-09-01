/* /pages/quotes/create.jsx */
import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabaseClient";
import { useRouter } from "next/router";

export default function CreateQuote() {
  const [clientId, setClientId] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [clients, setClients] = useState([]);
  const [session, setSession] = useState(null);
  const [message, setMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    const load = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);

      if (session) {
        const { data, error } = await supabase
          .from("clients")
          .select("id, name")
          .eq("user_id", session.user.id)
          .order("name", { ascending: true });

        if (!error) setClients(data || []);
      }
    };
    load();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, s) => setSession(s)
    );
    return () => listener.subscription.unsubscribe();
  }, []);

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
            Prefer: "return=representation", // si possible, renvoie la ligne
          },
          body: JSON.stringify({
            client_id: clientId,
            description,
            amount,
            user_id: session.user.id,
          }),
        }
      );

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || "Erreur lors de la création du devis");
      }

      // ⚠️ NE PAS parser en JSON pour éviter "Unexpected end of JSON input"
      await res.text();

      setMessage("✅ Devis créé avec succès !");
      setClientId("");
      setDescription("");
      setAmount("");
      router.push("/quotes");
    } catch (err) {
      setMessage(`Erreur : ${err.message}`);
    }
  };

  if (!session) return <p>Vous devez être connecté.</p>;

  return (
    <div style={{ maxWidth: 600, margin: "0 auto" }}>
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
              <option key={c.id} value={c.id}>{c.name}</option>
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

