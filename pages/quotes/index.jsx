/* fintrack/pages/quotes/index.jsx */
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function Quotes() {
  const [quotes, setQuotes] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchQuotes = async () => {
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      if (sessionError || !session) {
        setMessage("Vous devez être connecté pour voir les devis.");
        return;
      }

      const token = session.access_token;

      try {
        const res = await fetch("/api/quotes", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          }
        });

        const data = await res.json();
        if (res.ok) {
          setQuotes(data);
        } else {
          setMessage("Erreur: " + (data.error || "Erreur inconnue"));
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setMessage("Erreur de connexion au serveur");
      }
    };

    fetchQuotes();
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Liste des devis</h1>
      {message && <p>{message}</p>}
      {quotes.length === 0 && <p>Aucun devis trouvé.</p>}
      <ul>
        {quotes.map(q => (
          <li key={q.id}>{q.title || "Sans titre"} - {q.amount || 0} €</li>
        ))}
      </ul>
    </div>
  );
}
