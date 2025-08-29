/* fintrack/pages/quotes/index.jsx */
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function QuotesPage() {
  const [quotes, setQuotes] = useState([]);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");

  // Récupère les devis existants
  const fetchQuotes = async () => {
    const { data: sessionData } = await supabase.auth.getSession();
    const session = sessionData.session;
    if (!session) return;

    const token = session.access_token;

    try {
      const res = await fetch("/api/quotes", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (res.ok) setQuotes(data);
      else console.error("Erreur fetch quotes:", data.error);
    } catch (err) {
      console.error("Erreur serveur:", err);
    }
  };

  useEffect(() => {
    fetchQuotes();
  }, []);

  // Ajouter un nouveau devis
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    if (sessionError || !session) {
      setMessage("Vous devez être connecté pour créer un devis.");
      return;
    }

    const token = session.access_token;

    try {
      const res = await fetch("/api/quotes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ title, amount }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("Devis créé ✅");
        setTitle(""); setAmount("");
        fetchQuotes(); // Rafraîchit la liste
      } else {
        setMessage("Erreur: " + (data.error || "Erreur inconnue"));
      }
    } catch (err) {
      console.error("Erreur serveur:", err);
      setMessage("Erreur connexion serveur");
    }
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h1>Liste des devis</h1>

      {quotes.length === 0 ? <p>Aucun devis trouvé.</p> :
        <ul>
          {quotes.map((q) => (
            <li key={q.id}>{q.title} - {q.amount}</li>
          ))}
        </ul>
      }

      <h2>Ajouter un devis</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px", maxWidth: "400px" }}>
        <input placeholder="Titre" value={title} onChange={e => setTitle(e.target.value)} />
        <input placeholder="Montant" value={amount} onChange={e => setAmount(e.target.value)} />
        <button type="submit">Créer Devis</button>
        {message && <p>{message}</p>}
      </form>
    </div>
  );
}
