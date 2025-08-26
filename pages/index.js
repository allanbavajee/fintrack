// pages/index.js
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function Dashboard() {
  const [user, setUser] = useState(null);

  // Clients
  const [clients, setClients] = useState([]);
  const [companyName, setCompanyName] = useState("");
  const [brn, setBrn] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [contactName, setContactName] = useState("");

  // Quotes
  const [quotes, setQuotes] = useState([]);
  const [quoteClientId, setQuoteClientId] = useState("");
  const [quoteDate, setQuoteDate] = useState("");
  const [quoteDescription, setQuoteDescription] = useState("");
  const [quoteQuantity, setQuoteQuantity] = useState(1);
  const [quoteAmount, setQuoteAmount] = useState(0);
  const [quoteStatus, setQuoteStatus] = useState("Draft");

  // Invoices
  const [invoices, setInvoices] = useState([]);
  const [invoiceClientId, setInvoiceClientId] = useState("");
  const [invoiceDate, setInvoiceDate] = useState("");
  const [invoiceDescription, setInvoiceDescription] = useState("");
  const [invoiceQuantity, setInvoiceQuantity] = useState(1);
  const [invoiceAmount, setInvoiceAmount] = useState(0);
  const [invoiceStatus, setInvoiceStatus] = useState("Draft");

  // Récupération utilisateur
  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data.user) setUser(data.user);
    };
    getUser();
  }, []);

  // Helper pour récupérer les données
  const fetchData = async (endpoint, setData) => {
    if (!user) return;
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return;

    try {
      const res = await fetch(`/api/${endpoint}`, {
        headers: { Authorization: `Bearer ${session.access_token}` },
      });
      const data = await res.json();
      if (!data.error) setData(data);
    } catch (err) {
      console.error(`Error fetching ${endpoint}:`, err);
    }
  };

  // Récupération après login
  useEffect(() => { fetchData("clients", setClients); }, [user]);
  useEffect(() => { fetchData("quotes", setQuotes); }, [user]);
  useEffect(() => { fetchData("invoices", setInvoices); }, [user]);

  // Ajouter une entité
  const handleAdd = async (endpoint, body, resetFields, setData, currentData) => {
    if (!user) return alert("You must be logged in");
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return alert("Session expired");

    try {
      const res = await fetch(`/api/${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      if (!data.error) {
        setData([...currentData, data]);
        resetFields();
      } else {
        alert(data.error.message || "Error");
      }
    } catch (err) {
      console.error(`Error adding ${endpoint}:`, err);
      alert("Server error");
    }
  };

  if (!user) return <div style={{ padding: "2rem" }}>You must login to see the dashboard</div>;

  return (
    <div style={{ padding: "2rem" }}>
      <h1>FinTrack Dashboard</h1>

      {/* Clients */}
      <h2>Add New Client</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px", maxWidth: "400px" }}>
        <input placeholder="Company Name" value={companyName} onChange={e => setCompanyName(e.target.value)} />
        <input placeholder="BRN" value={brn} onChange={e => setBrn(e.target.value)} />
        <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <input placeholder="Phone" value={phone} onChange={e => setPhone(e.target.value)} />
        <input placeholder="Contact Name" value={contactName} onChange={e => setContactName(e.target.value)} />
        <button onClick={() => handleAdd(
          "clients",
          { company_name: companyName, brn, email, phone, contact_name: contactName },
          () => { setCompanyName(""); setBrn(""); setEmail(""); setPhone(""); setContactName(""); },
          setClients,
          clients
        )}>Add Client</button>
      </div>

      <h3>All Clients</h3>
      <ul>{clients.map(c => <li key={c.id}>{c.company_name} - {c.brn} - {c.email}</li>)}</ul>

      {/* Quotes */}
      <h2>Add New Quote</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px", maxWidth: "400px" }}>
        <select value={quoteClientId} onChange={e => setQuoteClientId(e.target.value)}>
          <option value="">Select Client</option>
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
        <button onClick={() => handleAdd(
          "quotes",
          { client_id: quoteClientId, date: quoteDate, description: quoteDescription, quantity: quoteQuantity, amount: quoteAmount, status: quoteStatus },
          () => { setQuoteClientId(""); setQuoteDate(""); setQuoteDescription(""); setQuoteQuantity(1); setQuoteAmount(0); setQuoteStatus("Draft"); },
          setQuotes,
          quotes
        )}>Add Quote</button>
      </div>

      <h3>All Quotes</h3>
      <ul>{quotes.map(q => {
        const client = clients.find(c => c.id === q.client_id);
        return <li key={q.id}>{client?.company_name || "Unknown"} - {q.description} - {q.amount} - {q.status}</li>;
      })}</ul>

      {/* Invoices */}
      <h2>Add New Invoice</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px", maxWidth: "400px" }}>
        <select value={invoiceClientId} onChange={e => setInvoiceClientId(e.target.value)}>
          <option value="">Select Client</option>
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
        <button onClick={() => handleAdd(
          "invoices",
          { client_id: invoiceClientId, date: invoiceDate, description: invoiceDescription, quantity: invoiceQuantity, amount: invoiceAmount, status: invoiceStatus },
          () => { setInvoiceClientId(""); setInvoiceDate(""); setInvoiceDescription(""); setInvoiceQuantity(1); setInvoiceAmount(0); setInvoiceStatus("Draft"); },
          setInvoices,
          invoices
        )}>Add Invoice</button>
      </div>

      <h3>All Invoices</h3>
      <ul>{invoices.map(i => {
        const client = clients.find(c => c.id === i.client_id);
        return <li key={i.id}>{client?.company_name || "Unknown"} - {i.description} - {i.amount} - {i.status}</li>;
      })}</ul>
    </div>
  );
}
