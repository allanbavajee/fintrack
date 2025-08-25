// pages/dashboard.jsx
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import Link from "next/link";

export default function Dashboard() {
  const [clients, setClients] = useState([]);
  const [quotes, setQuotes] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setLoading(true);

    // Récupère la session pour inclure le token
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
      alert("You must be logged in");
      return;
    }

    const headers = { "Authorization": `Bearer ${session.access_token}` };

    // Récupérer clients
    const clientsRes = await fetch("/api/clients", { headers });
    const clientsData = await clientsRes.json();

    // Récupérer quotes
    const quotesRes = await fetch("/api/quotes", { headers });
    const quotesData = await quotesRes.json();

    // Récupérer invoices
    const invoicesRes = await fetch("/api/invoices", { headers });
    const invoicesData = await invoicesRes.json();

    setClients(clientsData || []);
    setQuotes(quotesData || []);
    setInvoices(invoicesData || []);
    setLoading(false);
  }

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>📊 Dashboard</h1>

      {/* Section Clients */}
      <section>
        <h2>👥 Clients</h2>
        <Link href="/clients/AddClient"><button>Add Client</button></Link>
        <ul>
          {clients.map(c => (
            <li key={c.id}>{c.name} ({c.email})</li>
          ))}
        </ul>
      </section>

      {/* Section Quotes */}
      <section>
        <h2>📝 Quotes</h2>
        <Link href="/quotes/AddQuote"><button>Add Quote</button></Link>
        <ul>
          {quotes.map(q => (
            <li key={q.id}>
              {q.description} – {q.status} – {q.amount}$
            </li>
          ))}
        </ul>
      </section>

      {/* Section Invoices */}
      <section>
        <h2>💰 Invoices</h2>
        <Link href="/invoices/AddInvoice"><button>Add Invoice</button></Link>
        <ul>
          {invoices.map(i => (
            <li key={i.id}>
              Invoice #{i.id} – {i.status} – {i.amount}$
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
