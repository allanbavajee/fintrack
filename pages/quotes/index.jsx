/* pages/quotes/index.jsx */
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import Link from "next/link";

export default function QuotesPage() {
  const [quotes, setQuotes] = useState([]);
  const [session, setSession] = useState(null);

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      if (session) fetchQuotes(session);
    };
    getSession();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) fetchQuotes(session);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  const fetchQuotes = async (session) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/quotes?select=*`,
      {
        headers: {
          apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
          Authorization: `Bearer ${session.access_token}`,
        },
      }
    );
    const data = await res.json();
    if (res.ok) setQuotes(data);
  };

  if (!session) return <p>Vous devez être connecté.</p>;

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto" }}>
      <h2>Liste des devis</h2>
      <Link href="/quotes/add">➕ Créer un devis</Link>
      <ul>
        {quotes.map((q) => (
          <li key={q.id}>
            {q.description} - {q.amount}€
          </li>
        ))}
      </ul>
    </div>
  );
}
