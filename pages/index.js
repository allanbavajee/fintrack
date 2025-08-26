import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "../lib/supabaseClient";
import { useRouter } from "next/router";

export default function Home() {
  const [user, setUser] = useState(null);
  const [clients, setClients] = useState([]);
  const [quotes, setQuotes] = useState([]);
  const [invoices, setInvoices] = useState([]);

  // Formulaire Clients
  const [companyName, setCompanyName] = useState("");
  const [brn, setBrn] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [contactName, setContactName] = useState("");

  // Formulaire Quotes
  const [quoteClientId, setQuoteClientId] = useState("");
  const [quoteDate, setQuoteDate] = useState("");
  const [quoteDescription, setQuoteDescription] = useState("");
  const [quoteQuantity, setQuoteQuantity] = useState(1);
  const [quoteAmount, setQuoteAmount] = useState(0);
  const [quoteStatus, setQuoteStatus] = useState("Draft");

  // Formulaire Invoices
  const [invoiceClientId, setInvoiceClientId] = useState("");
  const [invoiceDate, setInvoiceDate] = useState("");
  const [invoiceDescription, setInvoiceDescription] = useState("");
  const [invoiceQuantity, setInvoiceQuantity] = useState(1);
  const [invoiceAmount, setInvoiceAmount] = useState(0);
  const [invoiceStatus, setInvoiceStatus] = useState("Draft");

  const router = useRouter();

  // Vérifie session et utilisateur connecté
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) setUser(session.user);
    });

    // Abonnement aux changements d'auth
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  // Redirige vers login si pas connecté
  useEffect(() => {
    if (user === null) return; // encore indéterminé
    if (!user) router.push("/login");
  }, [user]);

  // Fetch Clients
  useEffect(() => {
    if (!user) return;
    fetch("/api/clients", { headers: { "x-user-id": user.id } })
      .then(res => res.json())
      .then(data => setClients(Array.isArray(data) ? data : []));
  }, [user]);

  // Fetch Quotes
  useEffect(() => {
    if (!user) return;
    fetch("/api/quotes", { headers: { "x-user-id": user.id } })
      .then(res => res.json())
      .then(data => setQuotes(Array.isArray(data) ? data : []));
  }, [user]);

  // Fetch Invoices
  useEffect(() => {
    if (!user) return;
    fetch("/api/invoices", { headers: { "x-user-id": user.id } })
      .then(res => res.json())
      .then(data => setInvoices(Array.isArray(data) ? data : []));
  }, [user]);

  // Add Client
  const addClient = async () => {
    if (!companyName) return alert("Company name is required");
    const res = await fetch("/api/clients", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-user-id": user.id
      },
      body: JSON.stringify({ company_name: companyName, brn, email, phone, contact_name: contactName })
    });
    const data = await res.json();
    if (res.ok) {
      setClients([...clients, data]);
      setCompanyName(""); setBrn(""); setEmail(""); setPhone(""); setContactName("");
    } else alert(data.error?.message || "Error adding client");
  };

  // Add Quote
  const addQuote = async () => {
    if (!quoteClientId || !quoteDate || !quoteDescription) return alert("Client, date, and description are required");
    const res = await fetch("/api/quotes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-user-id": user.id
      },
      body: JSON.stringify({
        client_id: quoteClientId,
        date: quoteDate,
        description: quoteDescription,
        quantity: quoteQuantity,
        amount: quoteAmount,
        status: quoteStatus
      })
    });
    const data = await res.json();
    if (res.ok) {
      setQuotes([...quotes, data]);
      setQuoteDescription(""); setQuoteQuantity(1); setQuoteAmount(0);
    } else alert(data.error?.message || "Error adding quote");
  };

  // Add Invoice
  const addInvoice = async () => {
    if (!invoiceClientId || !invoiceDate || !invoiceDescription) return alert("Client, date, and description are required");
    const res = await fetch("/api/invoices", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-user-id": user.id
      },
      body: JSON.stringify({
        client_id: invoiceClientId,
        date: invoiceDate,
        description: invoiceDescription,
        quantity: invoiceQuantity,
        amount: invoiceAmount,
        status: invoiceStatus
      })
    });
    const data = await res.json();
    if (res.ok) {
      setInvoices([...invoices, data]);
      setInvoiceDescription(""); setInvoiceQuantity(1); setInvoiceAmount(0);
    } else alert(data.error?.message || "Error adding invoice");
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div style={{ padding: "2rem" }}>
      <h1>FinTrack Dashboard</h1>

      <button onClick={async () => { await supabase.auth.signOut(); router.push("/login"); }}>Logout</button>

      {/* Clients */}
      <h2>Add New Client</h2>
      <div>
        <input placeholder="Company Name" value={companyName} onChange={e => setCompanyName(e.target.value)} />
        <input placeholder="BRN" value={brn} onChange={e => setBrn(e.target.value)} />
        <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <input placeholder="Phone" value={phone} onChange={e => setPhone(e.target.value)} />
        <input placeholder="Contact Name" value={contactName} onChange={e => setContactName(e.target.value)} />
        <button onClick={addClient}>Add Client</button>
      </div>
      <h2>All Clients</h2>
      <ul>
        {clients.map(c => (
          <li key={c.id}>{c.company_name} - {c.brn} - {c.email} - {c.phone} - {c.contact_name}</li>
        ))}
      </ul>

      {/* Quotes */}
      <h2>Add New Quote</h2>
      <div>
        <select value={quoteClientId} onChange={e => setQuoteClientId(e.target.value)}>
          <option value="">Select client</option>
          {clients.map(c => <option key={c.id} value={c.id}>{c.company_name}</option>)}
        </select>
        <input type="date" value={quoteDate} onChange={e => setQuoteDate(e.target.value)} />
        <input placeholder="Description" value={quoteDescription} onChange={e => setQuoteDescription(e.target.value)} />
        <input type="number" value={quoteQuantity} onChange={e => setQuoteQuantity(Number(e.target.value))} />
        <input type="number" value={quoteAmount} onChange={e => setQuoteAmount(Number(e.target.value))} />
        <select value={quoteStatus} onChange={e => setQuoteStatus(e.target.value)}>
          <option value="Draft">Draft</option>
          <option value="Sent">Sent</option>
        </select>
        <button onClick={addQuote}>Add Quote</button>
      </div>
      <h2>All Quotes</h2>
      <ul>
        {quotes.map(q => {
          const client = clients.find(c => c.id === q.client_id);
          return (
            <li key={q.id}>
              {client ? client.company_name : "Unknown client"} - {q.description} - Qty: {q.quantity} - Amount: {q.amount} - Status: {q.status}
            </li>
          );
        })}
      </ul>

      {/* Invoices */}
      <h2>Add New Invoice</h2>
      <div>
        <select value={invoiceClientId} onChange={e => setInvoiceClientId(e.target.value)}>
          <option value="">Select client</option>
          {clients.map(c => <option key={c.id} value={c.id}>{c.company_name}</option>)}
        </select>
        <input type="date" value={invoiceDate} onChange={e => setInvoiceDate(e.target.value)} />
        <input placeholder="Description" value={invoiceDescription} onChange={e => setInvoiceDescription(e.target.value)} />
        <input type="number" value={invoiceQuantity} onChange={e => setInvoiceQuantity(Number(e.target.value))} />
        <input type="number" value={invoiceAmount} onChange={e => setInvoiceAmount(Number(e.target.value))} />
        <select value={invoiceStatus} onChange={e => setInvoiceStatus(e.target.value)}>
          <option value="Draft">Draft</option>
          <option value="Sent">Sent</option>
        </select>
        <button onClick={addInvoice}>Add Invoice</button>
      </div>
      <h2>All Invoices</h2>
      <ul>
        {invoices.map(i => {
          const client = clients.find(c => c.id === i.client_id);
          return (
            <li key={i.id}>
              {client ? client.company_name : "Unknown client"} - {i.description} - Qty: {i.quantity} - Amount: {i.amount} - Status: {i.status}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
