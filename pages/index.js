import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [clients, setClients] = useState([]);
  const [quotes, setQuotes] = useState([]);
  const [invoices, setInvoices] = useState([]);

  // Champs clients
  const [companyName, setCompanyName] = useState("");
  const [brn, setBrn] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [contactName, setContactName] = useState("");

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data.user) setUser(data.user);
    };
    getUser();
  }, []);

  const fetchData = async (endpoint, setData) => {
    if (!user) return;
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return;

    try {
      const res = await fetch(`/api/${endpoint}`, { headers: { Authorization: `Bearer ${session.access_token}` } });
      const data = await res.json();
      if (!data.error) setData(data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => { fetchData("clients", setClients); }, [user]);
  useEffect(() => { fetchData("quotes", setQuotes); }, [user]);
  useEffect(() => { fetchData("invoices", setInvoices); }, [user]);

  const handleAdd = async (endpoint, body, resetFields, setData, currentData) => {
    if (!user) return alert("You must be logged in");
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return alert("Session expired");

    try {
      const res = await fetch(`/api/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${session.access_token}` },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!data.error) {
        setData([...currentData, data]);
        resetFields();
      } else alert(data.error.message || data.error);
    } catch (err) {
      console.error(err);
      alert("Error connecting to server");
    }
  };

  if (!user) return <div style={{ padding: "2rem" }}>You must login to see the dashboard</div>;

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Dashboard</h1>
      {/* Add Client Form */}
      <div>
        <h2>Add Client</h2>
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
    </div>
  );
}
