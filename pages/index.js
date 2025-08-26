import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function Home() {
  const [user, setUser] = useState(null);
  const [clients, setClients] = useState([]);
  const [clientName, setClientName] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data.user) setUser(data.user);
    };
    fetchUser();
  }, []);

  const fetchClients = async () => {
    if (!user) return;
    const { data: session } = await supabase.auth.getSession();
    const token = session?.access_token;
    const res = await fetch("/api/clients", {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await res.json();
    setClients(data);
  };

  useEffect(() => { fetchClients(); }, [user]);

  const handleAddClient = async () => {
    if (!clientName) return;
    setMessage("");
    const { data: session } = await supabase.auth.getSession();
    const token = session?.access_token;
    const res = await fetch("/api/clients", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ company_name: clientName })
    });
    const data = await res.json();
    if (res.ok) {
      setClients([...clients, data]);
      setClientName("");
      setMessage("Client added ✅");
    } else {
      setMessage(data.error?.message || "Error");
    }
  };

  if (!user) return <p>You must be logged in</p>;

  return (
    <div style={{ padding: "2rem" }}>
      <h1>FinTrack Dashboard</h1>
      <h2>Add Client</h2>
      <input placeholder="Company Name" value={clientName} onChange={e=>setClientName(e.target.value)} />
      <button onClick={handleAddClient}>Add Client</button>
      {message && <p>{message}</p>}
      <h2>All Clients</h2>
      <ul>{clients.map(c=><li key={c.id}>{c.company_name}</li>)}</ul>
    </div>
  );
}
