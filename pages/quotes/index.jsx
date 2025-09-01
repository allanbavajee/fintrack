/* pages/quotes/index.jsx */
import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function ListQuotes() {
  const [session, setSession] = useState(null);
  const [quotes, setQuotes] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      if (session) fetchQuotes(session);
    };
    getSession();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        if (session) fetchQuotes(session);
      }
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  const fetchQuotes = async (session) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/quotes?select=*`, {
        headers: {
          "apikey": process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
          "Authorization": `Bearer ${session.access_token}`
        }
      });

      const data = await res.json();
      if (!res.ok) setMessage(`Erreur : ${JSON.stringify(data)}`);
      else setQuotes(data);
    } catch (err) {
      setMessage(`Erreur : ${err.message}`);
    }
  };

  if (!session) return <p>Vous devez être connecté pour voir vos devis.</p>;

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto" }}>
      <h2>Liste des devis</h2>
      {message && <p>{message}</p>}
      {quotes.length === 0 ? (
        <p>Aucun devis trouvé.</p>
      ) : (
        <ul>
          {quotes.map((quote) => (
            <li key={quote.id}>
              {quote.description} - {quote.amount} €
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
