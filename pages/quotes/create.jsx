/* /pages/quotes/create.jsx */
import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabaseClient";
import { useRouter } from "next/router";

export default function CreateQuote() {
  const router = useRouter();
  const [session, setSession] = useState(null);
  const [clients, setClients] = useState([]);
  const [clientId, setClientId] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
    };
    getSession();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => setSession(session)
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (session) {
      const fetchClients = async () => {
        const { data, error } = await supabase
          .from("clients")
          .select("id, name")
          .eq("user_id", session.user.id);

        if (error) console.error(error);
        else setClients(data);
      };
      fetchClients();
    }
  }, [session]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!session) {
      setMessage("Vous devez être connecté pour créer un devis.");
      return;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/quotes`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
            Authorization: `Bearer ${session.access_token}`,
            Prefer: "return=representation",
          },
          body: JSON.stringify({
            client_id: clientId,
            description,
            amount,
            user_id: session.user.id,
          }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Erreur lors de l'insertion");
      }

      // 🔑 Vérifier si la réponse a du contenu avant de parser en JSON
      let data = null;
      const text = await response.text();
      if (text) {
        data = JSON.parse(text);
      }

      setMessage("✅ Devis créé avec succès !");
      console.log("Devis créé :", data);

      setClientId("");
      setDescription("");
      setAmount("");

      // Rediriger vers la liste
      router.push("/quotes");
    } catch (error) {
      setMessage(`Erreur : ${error.message}`);
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto" }}>
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
            <option value="">-- Sélectionner un client --</option>
            {clients.map((client) => (
              <option key={client.id} value={client.id}>
                {client.name}
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
          <label>Montant :</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <button type="submit">Créer devis</button>
      </form>
    </div>
  );
}
