/* pages/invoices/index.jsx */
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import Link from "next/link";

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState([]);
  const [session, setSession] = useState(null);

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      if (session) fetchInvoices(session);
    };
    getSession();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) fetchInvoices(session);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  const fetchInvoices = async (session) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/invoices?select=*`,
      {
        headers: {
          apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
          Authorization: `Bearer ${session.access_token}`,
        },
      }
    );
    const data = await res.json();
    if (res.ok) setInvoices(data);
  };

  if (!session) return <p>Vous devez être connecté.</p>;

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto" }}>
      <h2>Liste des factures</h2>
      <Link href="/invoices/add">➕ Créer une facture</Link>
      <ul>
        {invoices.map((i) => (
          <li key={i.id}>
            Facture #{i.id} - {i.amount}€ - {i.status}
          </li>
        ))}
      </ul>
    </div>
  );
}
