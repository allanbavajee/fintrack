/* pages/quotes/index.jsx */
import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "../../lib/supabaseClient";

export default function QuotesList() {
  const [quotes, setQuotes] = useState([]);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);

      if (session) {
        const { data, error } = await supabase
          .from("quotes")
          .select("id, description, amount, created_at, clients(name)")
          .eq("user_id", session.user.id)
          .order("created_at", { ascending: false });

        if (!error) setQuotes(data || []);
      }
      setLoading(false);
    };

    load();
  }, []);

  if (loading) return <p>Chargement...</p>;

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto" }}>
      <h2>Devis</h2>
      <Link href="/quotes/create">
        <button>➕ Créer un devis</button>
      </Link>
      {quotes.length === 0 ? (
        <p>Aucun devis trouvé.</p>
      ) : (
        <table border="1" cellPadding="5" style={{ marginTop: "20px", width: "100%" }}>
          <thead>
            <tr>
              <th>Client</th>
              <th>Description</th>
              <th>Montant</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {quotes.map((q) => (
              <tr key={q.id}>
                <td>{q.clients?.name || "Inconnu"}</td>
                <td>{q.description}</td>
                <td>{q.amount} €</td>
                <td>{new Date(q.created_at).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
