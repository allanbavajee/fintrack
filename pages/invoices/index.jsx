/* pages/invoices/index.jsx */
import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabaseClient";
import Navbar from "../../components/Navbar";

export default function ListInvoices() {
  const [session, setSession] = useState(null);
  const [invoices, setInvoices] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      if (session) fetchInvoices(session);
    };
    getSession();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        if (session) fetchInvoices(session);
      }
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  const fetchInvoices = async (session) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/invoices?select=*`, {
        headers: {
          "apikey": process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
          "Authorization": `Bearer ${session.access_token}`
        }
      });

      const data = await res.json();
      if (!res.ok) setMessage(`Erreur : ${JSON.stringify(data)}`);
      else setInvoices(data);
    } catch (err) {
      setMessage(`Erreur : ${err.message}`);
    }
  };

  if (!session) return (
    <>
      <Navbar />
      <p>Vous devez être connecté pour voir vos factures.</p>
    </>
  );

  return (
    <>
      <Navbar />
      <div style={{ maxWidth: "600px", margin: "0 auto" }}>
        <h2>Liste des factures</h2>
        {message && <p>{message}</p>}
        {invoices.length === 0 ? (
          <p>Aucune facture trouvée.</p>
        ) : (
          <ul>
            {invoices.map((invoice) => (
              <li key={invoice.id}>
                {invoice.description} - {invoice.amount} €
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
